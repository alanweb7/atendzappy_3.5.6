import { Request, Response } from "express";
import crypto from "crypto";
import AppError from "../errors/AppError";
import Whatsapp from "../models/Whatsapp";
import CreateWhatsAppService from "../services/WhatsappService/CreateWhatsAppService";
import ShowWhatsAppService from "../services/WhatsappService/ShowWhatsAppService";
import UpdateWhatsAppService from "../services/WhatsappService/UpdateWhatsAppService";
import DeleteWhatsAppService from "../services/WhatsappService/DeleteWhatsAppService";
import { SendTextOfficialService } from "../services/WhatsAppOfficial/SendTextOfficialService";
import { SendMediaOfficialService } from "../services/WhatsAppOfficial/SendMediaOfficialService";
import { OfficialMessageListener } from "../services/WhatsAppOfficial/OfficialMessageListener";
import { ListTemplatesService } from "../services/WhatsAppOfficial/ListTemplatesService";
import Ticket from "../models/Ticket";
import Contact from "../models/Contact";
import multer from "multer";
import uploadConfig from "../config/upload";
import { graphRequest, extractGraphError } from "../services/WhatsappCoexistence/graphApiHelper";

const upload = multer(uploadConfig);

interface OfficialConnectionData {
  name: string;
  companyId: number;
  queueIds?: number[];
  greetingMessage?: string;
  complationMessage?: string;
  outOfHoursMessage?: string;
  ratingMessage?: string;
  status?: string;
  isDefault?: boolean;
  allowGroup?: boolean;
  sendIdQueue?: number;
  timeSendQueue?: number;
  timeInactiveMessage?: string;
  inactiveMessage?: string;
  maxUseBotQueuesNPS?: number;
  expiresTicketNPS?: number;
  whenExpiresTicket?: string;
  expiresInactiveMessage?: string;
  groupAsTicket?: string;
  importOldMessages?: string;
  importRecentMessages?: string;
  closedTicketsPostImported?: boolean;
  importOldMessagesGroups?: boolean;
  timeCreateNewTicket?: number;
  schedules?: any[];
  promptId?: number;
  collectiveVacationMessage?: string;
  collectiveVacationStart?: string;
  collectiveVacationEnd?: string;
  queueIdImportMessages?: number;
  flowIdNotPhrase?: number;
  flowIdWelcome?: number;
  // Campos oficiais
  coexistencePhoneNumberId: string;
  coexistenceWabaId: string;
  coexistencePermanentToken: string;
  messageRoutingMode?: "automatic" | "manual" | "balanced";
  routingRules?: any[] | null;
}



export const storeOfficial = async (req: Request, res: Response): Promise<Response> => {
  const {
    name,
    queueIds = [],
    greetingMessage,
    complationMessage,
    outOfHoursMessage,
    ratingMessage,
    isDefault = false,
    allowGroup = false,
    sendIdQueue,
    timeSendQueue,
    timeInactiveMessage,
    inactiveMessage,
    maxUseBotQueuesNPS,
    expiresTicketNPS,
    whenExpiresTicket,
    expiresInactiveMessage,
    groupAsTicket,
    importOldMessages,
    importRecentMessages,
    closedTicketsPostImported,
    importOldMessagesGroups,
    timeCreateNewTicket,
    schedules,
    promptId,
    collectiveVacationEnd,
    collectiveVacationMessage,
    collectiveVacationStart,
    queueIdImportMessages,
    flowIdNotPhrase,
    flowIdWelcome,
    coexistencePhoneNumberId,
    coexistenceWabaId,
    coexistencePermanentToken,
    messageRoutingMode = "automatic",
    routingRules = null
  }: OfficialConnectionData = req.body;

  const { companyId } = req.user;

  const { whatsapp } = await CreateWhatsAppService({
    name,
    status: "DISCONNECTED",
    isDefault,
    greetingMessage,
    complationMessage,
    outOfHoursMessage,
    ratingMessage,
    queueIds,
    companyId,
    channel: "whatsapp_official",
    allowGroup,
    sendIdQueue,
    timeSendQueue,
    timeInactiveMessage,
    inactiveMessage,
    maxUseBotQueuesNPS,
    expiresTicketNPS,
    whenExpiresTicket,
    expiresInactiveMessage,
    groupAsTicket,
    importOldMessages,
    importRecentMessages,
    closedTicketsPostImported,
    importOldMessagesGroups,
    timeCreateNewTicket,
    schedules,
    promptId,
    collectiveVacationEnd,
    collectiveVacationMessage,
    collectiveVacationStart,
    queueIdImportMessages,
    flowIdNotPhrase,
    flowIdWelcome
  });

  // Atualiza campos específicos da API oficial
  await whatsapp.update({
    coexistenceEnabled: true,
    coexistencePhoneNumberId,
    coexistenceWabaId,
    coexistencePermanentToken,
    messageRoutingMode,
    routingRules,
    businessAppConnected: false
  });

  // Valida credenciais na Meta e atualiza status real
  try {
    await graphRequest(coexistencePermanentToken, "get", `${coexistencePhoneNumberId}?fields=id`);
    await whatsapp.update({ status: "CONNECTED" });
  } catch {
    await whatsapp.update({ status: "DISCONNECTED" });
  }

  await whatsapp.reload();
  return res.status(200).json(whatsapp);
};

export const updateOfficial = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params;
  const whatsappData = req.body;
  const { companyId } = req.user;

  const whatsapp = await ShowWhatsAppService(whatsappId, companyId);
  if (!whatsapp || whatsapp.channel !== "whatsapp_official") {
    throw new AppError("ERR_OFFICIAL_CONNECTION_NOT_FOUND", 404);
  }

  const { whatsapp: updated } = await UpdateWhatsAppService({
    whatsappData,
    whatsappId,
    companyId
  });

  // Atualiza campos específicos se enviados
  const {
    coexistencePhoneNumberId,
    coexistenceWabaId,
    coexistencePermanentToken,
    messageRoutingMode,
    routingRules
  } = req.body;

  if (coexistencePhoneNumberId || coexistenceWabaId || coexistencePermanentToken || messageRoutingMode || routingRules) {
    await updated.update({
      ...(coexistencePhoneNumberId && { coexistencePhoneNumberId }),
      ...(coexistenceWabaId && { coexistenceWabaId }),
      ...(coexistencePermanentToken && { coexistencePermanentToken }),
      ...(messageRoutingMode && { messageRoutingMode }),
      ...(routingRules && { routingRules })
    });

    // Re-valida credenciais na Meta sempre que forem alteradas
    const phoneId = coexistencePhoneNumberId || whatsapp.coexistencePhoneNumberId;
    const token = coexistencePermanentToken || whatsapp.coexistencePermanentToken;
    try {
      await graphRequest(token, "get", `${phoneId}?fields=id`);
      await updated.update({ status: "CONNECTED" });
    } catch {
      await updated.update({ status: "DISCONNECTED" });
    }
    await updated.reload();
  }

  return res.status(200).json(updated);
};

export const showOfficial = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params;
  const { companyId } = req.user;

  const whatsapp = await ShowWhatsAppService(whatsappId, companyId);
  if (!whatsapp || whatsapp.channel !== "whatsapp_official") {
    throw new AppError("ERR_OFFICIAL_CONNECTION_NOT_FOUND", 404);
  }

  return res.status(200).json(whatsapp);
};

export const removeOfficial = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params;
  const { companyId, profile } = req.user;

  if (profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const whatsapp = await ShowWhatsAppService(whatsappId, companyId);
  if (!whatsapp || whatsapp.channel !== "whatsapp_official") {
    throw new AppError("ERR_OFFICIAL_CONNECTION_NOT_FOUND", 404);
  }

  await DeleteWhatsAppService(whatsappId);

  return res.status(200).json({ message: "WhatsApp Oficial removido" });
};

export const sendMessage = async (req: Request, res: Response): Promise<Response> => {
  const { body: message } = req.body;
  const { ticketId } = req.params;
  const medias = req.files as Express.Multer.File[];
  const { companyId } = req.user;

  const ticket = await Ticket.findByPk(ticketId, {
    include: [
      { model: Contact, as: "contact", attributes: ["number"] },
      { model: Whatsapp, as: "whatsapp", attributes: ["id", "token", "channel", "companyId", "coexistencePhoneNumberId", "coexistencePermanentToken"] }
    ]
  });

  if (!ticket || ticket.whatsapp.channel !== "whatsapp_official") {
    throw new AppError("ERR_OFFICIAL_TICKET_NOT_FOUND", 404);
  }

  try {
    if (medias && medias.length > 0) {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          await SendMediaOfficialService({
            media,
            body: message,
            ticketId: ticket.id,
            contact: ticket.contact,
            connection: ticket.whatsapp
          });
        })
      );
    } else {
      await SendTextOfficialService({
        body: message,
        ticketId: ticket.id,
        contact: ticket.contact,
        connection: ticket.whatsapp
      });
    }

    return res.status(200).json({ message: "Mensagem enviada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error });
  }
};

export const listTemplates = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params;
  const { companyId } = req.user;
  const templates = await ListTemplatesService(Number(whatsappId), companyId);
  return res.status(200).json(templates);
};

const validateWebhookSignature = (req: Request): boolean => {
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (!appSecret) return true; // sem secret configurado, pula validação

  const signature = req.headers["x-hub-signature-256"] as string;
  if (!signature) return false;

  const rawBody = (req as any).rawBody;
  if (!rawBody) return false;

  const expected = `sha256=${crypto
    .createHmac("sha256", appSecret)
    .update(rawBody as unknown as crypto.BinaryLike)
    .digest("hex")}`;

  return crypto.timingSafeEqual(
    Buffer.from(signature, "utf8") as any,
    Buffer.from(expected, "utf8") as any
  );
};

export const checkStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;

  const whatsapp = await Whatsapp.findOne({ where: { id, companyId, channel: "whatsapp_official" } });
  if (!whatsapp) throw new AppError("Conexão não encontrada", 404);

  const token = whatsapp.coexistencePermanentToken;
  const phoneNumberId = whatsapp.coexistencePhoneNumberId;

  if (!token || !phoneNumberId) {
    await whatsapp.update({ status: "DISCONNECTED" });
    return res.json({ status: "DISCONNECTED", reason: "Credenciais não configuradas" });
  }

  try {
    await graphRequest(token, "get", `${phoneNumberId}?fields=id,display_phone_number`);
    await whatsapp.update({ status: "CONNECTED" });
    return res.json({ status: "CONNECTED" });
  } catch (e: any) {
    await whatsapp.update({ status: "DISCONNECTED" });
    return res.json({ status: "DISCONNECTED", reason: extractGraphError(e) });
  }
};

export const webhookOfficial = async (req: Request, res: Response): Promise<Response> => {
  const { "hub.challenge": challenge } = req.query;

  // Verificação de registro do webhook pelo parceiro/Meta — devolve o challenge em texto puro
  if (challenge) {
    return res.status(200).send(String(challenge));
  }

  // Validar assinatura HMAC-SHA256 antes de processar eventos POST
  if (!validateWebhookSignature(req)) {
    return res.status(403).send("Invalid signature");
  }

  // Meta exige resposta 200 imediata (timeout ~5s). Processa em background.
  res.status(200).send("EVENT_RECEIVED");
  OfficialMessageListener(req.body).catch(error =>
    console.error("[webhookOfficial] Erro ao processar evento:", error)
  );
  return res;
};
