import path from "path";
import fs from "fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Whatsapp from "../../models/Whatsapp";
import Ticket from "../../models/Ticket";
import CreateMessageService from "../MessageServices/CreateMessageService";
import CreateOrUpdateTicketService from "../../HubEcosystem/services/CreateOrUpdateTicketService";
import FindOrCreateContactService from "../../HubEcosystem/services/FindOrCreateContactService";
import { buildGraphClient, extractGraphError } from "../WhatsappCoexistence/graphApiHelper";
import { FlowBuilderModel as FlowBuilder } from "../../models/FlowBuilder";
import { ActionsWebhookService } from "../WebhookService/ActionsWebhookService";
import Message from "../../models/Message";
import Contact from "../../models/Contact";
import Queue from "../../models/Queue";
import User from "../../models/User";
import { getIO } from "../../libs/socket";

interface OfficialWebhookMessage {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      field: "messages";
      value: {
        messaging_product: "whatsapp";
        metadata: {
          phone_number_id: string;
          display_phone_number: string;
        };
        contacts?: Array<{
          wa_id: string;
          profile: { name: string };
        }>;
        messages: Array<{
          from: string;
          id: string;
          timestamp: string;
          type: "text" | "image" | "video" | "audio" | "document" | "sticker" | "location" | "interactive" | "button" | "reaction" | "order" | string;
          text?: { body: string };
          image?: { id: string; caption?: string; mime_type?: string };
          video?: { id: string; caption?: string; mime_type?: string };
          audio?: { id: string; mime_type?: string };
          document?: { id: string; caption?: string; filename?: string; mime_type?: string };
          sticker?: { id: string; mime_type?: string };
          location?: { latitude: number; longitude: number; name?: string; address?: string };
          reaction?: { message_id: string; emoji: string };
          context?: { from: string; id: string };
          // Resposta a botão interativo (reply button ou list)
          interactive?: {
            type: "button_reply" | "list_reply";
            button_reply?: { id: string; title: string };
            list_reply?: { id: string; title: string; description?: string };
          };
          // Resposta a template button
          button?: { payload: string; text: string };
        }>;
        statuses?: Array<{
          id: string;
          status: "sent" | "delivered" | "read" | "failed";
          timestamp: string;
          recipient_id: string;
        }>;
      };
    }>;
  }>;
}

// Busca a URL real do arquivo na Graph API e faz o download para disco
const downloadOfficialMedia = async (
  mediaId: string,
  token: string,
  companyId: number,
  mimeType?: string
): Promise<string | null> => {
  try {
    const client = buildGraphClient(token);

    // Passo 1: obter URL de download
    console.log(`[OfficialMessageListener][download] Buscando URL para mediaId=${mediaId} companyId=${companyId}`);
    const metaRes = await client.get<{ url: string; mime_type: string }>(mediaId);
    const { url, mime_type } = metaRes.data;
    const resolvedMime = mimeType || mime_type || "application/octet-stream";
    console.log(`[OfficialMessageListener][download] mime resolvido: ${resolvedMime}`);

    // Determinar extensão a partir do mime type (ex: "audio/ogg; codecs=opus" → "ogg")
    const ext = resolvedMime.split("/")[1]?.split(";")[0]?.trim() || "bin";
    const filename = `${uuidv4()}.${ext}`;

    // Salvar no diretório correto: public/company{companyId}/
    const destDir = path.resolve(__dirname, "..", "..", "..", "public", `company${companyId}`);
    const destPath = path.join(destDir, filename);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      fs.chmodSync(destDir, 0o777);
    }

    // Passo 2: download do arquivo com o mesmo token
    const fileRes = await axios.get(url, {
      responseType: "stream",
      headers: { Authorization: `Bearer ${token}` }
    });

    await new Promise<void>((resolve, reject) => {
      const writer = fs.createWriteStream(destPath);
      fileRes.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`[OfficialMessageListener][download] Arquivo salvo: ${destPath} (${filename})`);
    return filename;
  } catch (error) {
    console.error("[OfficialMessageListener][download] ERRO ao baixar mídia:", extractGraphError(error), { mediaId, companyId });
    return null;
  }
};

// Dispara fluxo do FlowBuilder para canal oficial (igual ao wbotMessageListener)
const triggerOfficialFlow = async ({
  connection,
  ticket,
  contact,
  msgBody,
  from,
  wasReopened
}: {
  connection: Whatsapp;
  ticket: any;
  contact: any;
  msgBody: string;
  from: string;
  wasReopened: boolean;
}) => {
  try {
    // Recarrega conexão com campos de fluxo
    const fullConnection = await Whatsapp.findByPk(connection.id, {
      attributes: ["id", "companyId", "flowIdWelcome", "flowIdNotPhrase"]
    });
    if (!fullConnection) return;

    // Recarrega ticket para verificar se já tem fluxo ativo
    const fullTicket = await Ticket.findByPk(ticket.id, {
      attributes: ["id", "flowWebhook", "lastFlowId", "flowStopped", "dataWebhook", "companyId", "whatsappId"]
    });
    if (!fullTicket) return;

    const mountDataContact = { number: from, name: contact.name || from, email: "" };

    // Se ticket já tem fluxo ativo — continua o fluxo atual
    if (fullTicket.flowWebhook && fullTicket.lastFlowId && fullTicket.flowStopped) {
      if (!msgBody.trim()) {
        console.log("[OfficialFlow] Mensagem vazia ignorada — aguardando resposta do usuário");
        return;
      }

      const flow = await FlowBuilder.findOne({ where: { id: fullTicket.flowStopped } });
      if (flow) {
        const nodes = flow.flow["nodes"] || [];
        const connections = flow.flow["connections"] || [];
        await ActionsWebhookService(
          fullConnection.id,
          parseInt(String(fullTicket.flowStopped)),
          fullConnection.companyId,
          nodes,
          connections,
          fullTicket.lastFlowId,
          fullTicket.dataWebhook,
          "",
          "",
          msgBody,
          fullTicket.id,
          mountDataContact,
          null
        );
        return;
      }
    }

    // Ticket reaberto (estava fechado) → tenta flowIdNotPhrase, fallback para flowIdWelcome
    if (wasReopened) {
      // Limpa estado do fluxo anterior para iniciar do zero
      await fullTicket.update({ flowStopped: null, lastFlowId: null, flowWebhook: false, dataWebhook: null });
      const flowId = fullConnection.flowIdNotPhrase || fullConnection.flowIdWelcome;
      if (flowId) {
        console.log(`[OfficialFlow] Ticket reaberto — disparando fluxo ${flowId} (notPhrase=${fullConnection.flowIdNotPhrase}, welcome=${fullConnection.flowIdWelcome})`);
        const flow = await FlowBuilder.findOne({ where: { id: flowId } });
        if (flow) {
          const nodes = flow.flow["nodes"] || [];
          const connections = flow.flow["connections"] || [];
          await ActionsWebhookService(
            fullConnection.id,
            flowId,
            fullConnection.companyId,
            nodes,
            connections,
            flow.flow["nodes"][0]?.id || "1",
            null,
            "",
            "",
            null,
            fullTicket.id,
            mountDataContact,
            null
          );
          return;
        }
      }
    }

    // Ticket novo (primeiro contato) → dispara flowIdWelcome
    if (!wasReopened && fullConnection.flowIdWelcome) {
      const flow = await FlowBuilder.findOne({ where: { id: fullConnection.flowIdWelcome } });
      if (flow) {
        const nodes = flow.flow["nodes"] || [];
        const connections = flow.flow["connections"] || [];
        await ActionsWebhookService(
          fullConnection.id,
          fullConnection.flowIdWelcome,
          fullConnection.companyId,
          nodes,
          connections,
          flow.flow["nodes"][0]?.id || "1",
          null,
          "",
          "",
          null,
          fullTicket.id,
          mountDataContact,
          null
        );
      }
    }
  } catch (error) {
    console.error("[OfficialMessageListener] Erro ao disparar fluxo:", error);
  }
};

export const OfficialMessageListener = async (body: OfficialWebhookMessage) => {
  if (!body.entry || !Array.isArray(body.entry)) return;

  for (const entryItem of body.entry) {
    const { changes } = entryItem;
    if (!changes || !Array.isArray(changes)) continue;

    for (const change of changes) {
      if (change.field !== "messages") continue;

      const { value } = change;

      // Processa confirmações de entrega/leitura (statuses)
      if (value.statuses && Array.isArray(value.statuses)) {
        for (const status of value.statuses) {
          try {
            // Mapeia status Meta → ACK: sent=1, delivered=2, read=3, failed=-1
            const ackMap: Record<string, number> = {
              sent: 1,
              delivered: 2,
              read: 3,
              failed: -1
            };
            const ack = ackMap[status.status];
            if (ack === undefined) continue;

            const msg = await Message.findOne({ where: { wid: status.id } });
            if (!msg) continue;

            await msg.update({ ack });

            const io = getIO();
            io.to(`company-${msg.companyId}-mainchannel`).emit(`company-${msg.companyId}-appMessage`, {
              action: "update",
              message: msg
            });
          } catch (err) {
            console.error("[OfficialMessageListener] Erro ao atualizar status:", err);
          }
        }
      }

      if (!value.messages || !Array.isArray(value.messages)) continue;

      const connection = await Whatsapp.findOne({
        where: {
          coexistencePhoneNumberId: value.metadata.phone_number_id,
          channel: "whatsapp_official"
        }
      });

      if (!connection) {
        console.warn("[OfficialMessageListener] Conexão não encontrada para phone_number_id:", value.metadata.phone_number_id);
        continue;
      }

      for (const message of value.messages) {
        if (!message.from) continue;

        const from = message.from;
        const messageId = message.id;

        // Nome real vem do array contacts do payload da Meta
        const contactProfile = value.contacts?.find(c => c.wa_id === from);
        const contactName = contactProfile?.profile?.name || from;

        let msgBody = "";
        let mediaUrl: string | null = null;
        let mediaType = "";

        switch (message.type) {
          case "text":
            msgBody = message.text?.body || "";
            break;

          case "image":
            msgBody = message.image?.caption || "";
            mediaType = "image";
            mediaUrl = await downloadOfficialMedia(
              message.image!.id,
              connection.coexistencePermanentToken,
              connection.companyId,
              message.image?.mime_type
            );
            break;

          case "video":
            msgBody = message.video?.caption || "";
            mediaType = "video";
            mediaUrl = await downloadOfficialMedia(
              message.video!.id,
              connection.coexistencePermanentToken,
              connection.companyId,
              message.video?.mime_type
            );
            break;

          case "audio":
            mediaType = "audio";
            mediaUrl = await downloadOfficialMedia(
              message.audio!.id,
              connection.coexistencePermanentToken,
              connection.companyId,
              message.audio?.mime_type
            );
            break;

          case "document":
            msgBody = message.document?.caption || message.document?.filename || "";
            mediaType = "document";
            mediaUrl = await downloadOfficialMedia(
              message.document!.id,
              connection.coexistencePermanentToken,
              connection.companyId,
              message.document?.mime_type
            );
            break;

          case "interactive":
            // Resposta a botão de reply ou lista — extrai o ID (número da opção no fluxo)
            if (message.interactive?.type === "button_reply") {
              msgBody = message.interactive.button_reply?.id || message.interactive.button_reply?.title || "";
            } else if (message.interactive?.type === "list_reply") {
              msgBody = message.interactive.list_reply?.id || message.interactive.list_reply?.title || "";
            }
            break;

          case "button":
            // Resposta a template button — usa o payload ou o texto do botão
            msgBody = message.button?.payload || message.button?.text || "";
            break;

          case "sticker":
            mediaType = "sticker";
            mediaUrl = await downloadOfficialMedia(
              message.sticker!.id,
              connection.coexistencePermanentToken,
              connection.companyId,
              message.sticker?.mime_type
            );
            break;

          case "location":
            msgBody = [
              message.location?.name,
              message.location?.address,
              `Lat: ${message.location?.latitude}, Lng: ${message.location?.longitude}`
            ].filter(Boolean).join(" | ");
            break;

          case "reaction":
            // Reação não gera mensagem nova — ignora silenciosamente
            continue;

          default:
            // Tipo não suportado — registra log e ignora
            console.log(`[OfficialMessageListener] Tipo de mensagem não suportado: ${message.type}`);
            continue;
        }

        try {
          const contact = await FindOrCreateContactService({
            name: contactName,
            firstName: contactName,
            lastName: "",
            picture: "",
            from,
            connection
          });

          // Verificar status antes de reabrir para saber qual fluxo disparar
          const existingTicket = await Ticket.findOne({
            where: { contactId: contact.id, channel: "whatsapp_official", whatsappId: connection.id, companyId: connection.companyId },
            attributes: ["status", "userId", "queueId"]
          });
          // Só dispara fluxo ao reabrir se o ticket não tinha agente nem fila vinculada
          const wasReopened = existingTicket?.status === "closed"
            && !existingTicket?.userId
            && !existingTicket?.queueId;

          const ticket = await CreateOrUpdateTicketService({
            contactId: contact.id,
            channel: "whatsapp_official",
            contents: [{ type: message.type as any, text: msgBody }],
            connection
          });

          // Resolver quotedMsgId se a mensagem é uma resposta (context.id = wid da citada)
          let quotedMsgId: number | undefined;
          if (message.context?.id) {
            const quotedMsg = await Message.findOne({
              where: { wid: message.context.id },
              attributes: ["id"]
            });
            if (quotedMsg) quotedMsgId = quotedMsg.id;
          }

          const messageData: any = {
            wid: messageId,
            contactId: contact.id,
            body: msgBody || `Mídia ${message.type}`,
            ticketId: ticket.id,
            fromMe: false,
            ack: 1,
            read: false,
            ...(quotedMsgId && { quotedMsgId })
          };

          if (mediaUrl) {
            messageData.mediaUrl = mediaUrl;
            messageData.mediaType = mediaType;
          }

          let createdMessage: any = null;
          try {
            createdMessage = await CreateMessageService({
              messageData,
              companyId: connection.companyId
            });
          } catch (msgError) {
            console.error("[OfficialMessageListener] Erro em CreateMessageService:", msgError);
          }

          // Emite socket — garante tempo real independente de falha no CreateMessageService
          try {
            const io = getIO();
            const companyId = connection.companyId;

            // Recarrega ticket com associações completas
            const ticketWithAssoc = await Ticket.findByPk(ticket.id, {
              include: [
                { model: Contact, as: "contact" },
                { model: Queue, as: "queue" },
                { model: Whatsapp, as: "whatsapp", attributes: ["id", "name", "channel"] },
                { model: User, as: "user", attributes: ["id", "name"] }
              ]
            });

            // Se CreateMessageService falhou, tenta buscar a mensagem no banco pelo wid
            let finalMessage = createdMessage;
            if (!finalMessage) {
              finalMessage = await Message.findOne({
                where: { wid: messageId },
                include: [
                  "contact",
                  { model: Ticket, as: "ticket", include: [{ model: Contact, as: "contact" }] },
                  { model: Message, as: "quotedMsg", include: ["contact"] }
                ]
              }).catch(() => null);
            }

            if (ticketWithAssoc) {
              if (finalMessage) {
                io.of(String(companyId)).emit(`company-${companyId}-appMessage`, {
                  action: "create",
                  message: finalMessage,
                  ticket: ticketWithAssoc,
                  contact
                });
              }

              io.of(String(companyId)).emit(`company-${companyId}-ticket`, {
                action: "update",
                ticket: ticketWithAssoc
              });
            }
          } catch (socketError) {
            console.error("[OfficialMessageListener] Erro ao emitir socket:", socketError);
          }

          // Disparar fluxo do FlowBuilder se configurado na conexão
          await triggerOfficialFlow({
            connection,
            ticket,
            contact,
            msgBody,
            from,
            wasReopened
          });

        } catch (error) {
          console.error("[OfficialMessageListener] Erro ao processar mensagem:", error);
        }
      }
    }
  }
};
