// @ts-nocheck
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import fs from "fs";
import GetTicketWbot from "../helpers/GetTicketWbot";
import SetTicketMessagesAsRead from "../helpers/SetTicketMessagesAsRead";
import { getIO } from "../libs/socket";
import Message from "../models/Message";
import Ticket from "../models/Ticket";
import Queue from "../models/Queue";
import User from "../models/User";
import Whatsapp from "../models/Whatsapp";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import path from "path";
import { isNil, isNull } from "lodash";
import { Mutex } from "async-mutex";

import ListMessagesService from "../services/MessageServices/ListMessagesService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import DeleteWhatsAppMessage from "../services/WbotServices/DeleteWhatsAppMessage";
import SendWhatsAppMedia from "../services/WbotServices/SendWhatsAppMedia";
import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";
import CreateMessageService from "../services/MessageServices/CreateMessageService";

import { sendFacebookMessageMedia } from "../services/FacebookServices/sendFacebookMessageMedia";
import sendFaceMessage from "../services/FacebookServices/sendFacebookMessage";
import { SendTextOfficialService } from "../services/WhatsAppOfficial/SendTextOfficialService";
import { SendMediaOfficialService } from "../services/WhatsAppOfficial/SendMediaOfficialService";

import ShowPlanCompanyService from "../services/CompanyService/ShowPlanCompanyService";
import ListMessagesServiceAll from "../services/MessageServices/ListMessagesServiceAll";
import ShowContactService from "../services/ContactServices/ShowContactService";
import FindOrCreateTicketService from "../services/TicketServices/FindOrCreateTicketService";

import Contact from "../models/Contact";
import QuickMessage from "../models/QuickMessage";
import { SendMessage } from "../helpers/SendMessage";
import { SendCTAButtons, SendCTAButtonsOfficial } from "../helpers/SendInteractiveMenu";
import logger from "../utils/logger";
import { verifyMessage,  } from "../services/WbotServices/wbotMessageListener";
import UpdateTicketService from "../services/TicketServices/UpdateTicketService";
import ListSettingsService from "../services/SettingServices/ListSettingsService";
import ShowMessageService, { GetWhatsAppFromMessage } from "../services/MessageServices/ShowMessageService";
import CompaniesSettings from "../models/CompaniesSettings";
import { verifyMessageFace, verifyMessageMedia } from "../services/FacebookServices/facebookMessageListener";
import EditWhatsAppMessage from "../services/MessageServices/EditWhatsAppMessage";
import CheckContactNumber from "../services/WbotServices/CheckNumber";
import TranscribeAudioMessageToText from "../services/MessageServices/TranscribeAudioMessageService";
import { generateWAMessageFromContent, generateWAMessageContent } from "@whiskeysockets/baileys";
import { notifyNewMessage } from "./NotificationController";

type IndexQuery = {
  pageNumber: string;
  ticketTrakingId: string;
  selectedQueues?: string;
};

interface TokenPayload {
  id: string;
  username: string;
  profile: string;
  companyId: number;
  iat: number;
  exp: number;
}


interface MessageData {
  body: string;
  fromMe: boolean;
  read: boolean;
  quotedMsg?: Message;
  number?: string;
  isPrivate?: string;
  vCard?: Contact;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
};

// adicionar funções de botões, pix, etc.
export const sendListMessage = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { title, text, buttonText, footer, sections } = req.body;

  try {
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    const contact = await Contact.findByPk(ticket.contactId);

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }
    const wbot = await GetTicketWbot(ticket);
    const listMessage = {
      text,
      title,
      buttonText,
      footer,
      sections
    };

    const number = `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;
    console.log('Numero do cliente:', number);

    const sendMsg = await wbot.sendMessage(number, listMessage);
    await verifyMessage(sendMsg, ticket, contact);

    return res.status(200).json({ message: "List message sent successfully", sendMsg });
  } catch (err) {
    console.error("Error sending list message: ", err);
    throw new AppError("Error sending list message", 500);
  }
};

export const sendCopyMessage = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { title, description, buttonText, copyText } = req.body;

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    const contact = await Contact.findByPk(ticket.contactId);
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }
    const whatsapp = await Whatsapp.findOne({ where: { id: ticket.whatsappId } });
    if (!whatsapp || !whatsapp.number) {
      console.error('Número de WhatsApp não encontrado para o ticket:', ticket.whatsappId);
      throw new Error('Número de WhatsApp não encontrado');
    }

    const botNumber = whatsapp.number;
    const wbot = await GetTicketWbot(ticket);
    const copyMessage = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: title || 'Botão copiar',  
            },
            footer: {
              text: description || 'Botão copiar',  
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'cta_copy',
                  buttonParamsJson: JSON.stringify({
                    display_text: buttonText || 'Botão copiar',  
                    copy_code: copyText || 'Botão copiar',  
                  }),
                },
              ],
              messageParamsJson: JSON.stringify({
                from: 'apiv2',
                templateId: '4194019344155670',
              }),
            },
          },
        },
      },
    };
    const number = `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;
    const newMsg = generateWAMessageFromContent(number, copyMessage, {
      userJid: botNumber,
    });
    await wbot.relayMessage(number, newMsg.message!,{ messageId: newMsg.key.id });
    if (newMsg) {
      await wbot.upsertMessage(newMsg, 'notify');
    }
    return res.status(200).json({ message: "Copy message sent successfully", newMsg });

  } catch (error) {
    console.error('Erro ao enviar a mensagem de cópia:', error);
    throw new AppError("Error sending copy message", 500);
  }
};

export const sendCALLMessage = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { title, description, buttonText, copyText } = req.body;

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    const contact = await Contact.findByPk(ticket.contactId);
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }
    const whatsapp = await Whatsapp.findOne({ where: { id: ticket.whatsappId } });
    if (!whatsapp || !whatsapp.number) {
      console.error('Número de WhatsApp não encontrado para o ticket:', ticket.whatsappId);
      throw new Error('Número de WhatsApp não encontrado');
    }

    const botNumber = whatsapp.number;
    const wbot = await GetTicketWbot(ticket);
    const copyMessage = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: title || 'Botão copiar', 
            },
            footer: {
              text: description || 'Botão copiar',  
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'cta_call',
                  buttonParamsJson: JSON.stringify({
                    display_text:  buttonText || 'Botão copiar',
                    phoneNumber: copyText || 'Botão copiar',
                  })
                },
              ],
              messageParamsJson: JSON.stringify({
                from: 'apiv2',
                templateId: '4194019344155670',
              }),
            },
          },
        },
      },
    };
    const number = `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;
    const newMsg = generateWAMessageFromContent(number, copyMessage, {
      userJid: botNumber,
    });
    await wbot.relayMessage(number, newMsg.message!,{ messageId: newMsg.key.id });
    if (newMsg) {
      await wbot.upsertMessage(newMsg, 'notify');
    }
    return res.status(200).json({ message: "Copy message sent successfully", newMsg });

  } catch (error) {
    console.error('Erro ao enviar a mensagem de cópia:', error);
    throw new AppError("Error sending copy message", 500);
  }
};

export const sendURLMessage = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { image, title, description, buttonText, copyText } = req.body;
  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    const contact = await Contact.findByPk(ticket.contactId);
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }
    const whatsapp = await Whatsapp.findOne({ where: { id: ticket.whatsappId } });
    if (!whatsapp || !whatsapp.number) {
      console.error('Número de WhatsApp não encontrado para o ticket:', ticket.whatsappId);
      throw new Error('Número de WhatsApp não encontrado');
    }

    const botNumber = whatsapp.number;
    const wbot = await GetTicketWbot(ticket);
    let copyMessage: any;

    if (image) {
      const base64Image = image.split(',')[1]; 
      const imageMessageContent = await generateWAMessageContent(
        {
          image: {
            url: `data:image/png;base64,${base64Image}`, // Use a URL data para imagem
          },
        },
        { upload: wbot.waUploadToServer! }
      );

      // Crie a estrutura com o header e a imagem
      copyMessage = {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: title || 'Botão copiar',  // Título da mensagem
              },
              footer: {
                text: description || 'Botão copiar',  // Descrição da mensagem
              },
              header: {
                imageMessage: imageMessageContent,
                hasMediaAttachment: true,
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: buttonText || 'Botão copiar',
                      url: copyText || 'Botão copiar',
                    })
                  },
                ],
                messageParamsJson: JSON.stringify({
                  from: 'apiv2',
                  templateId: '4194019344155670',
                }),
              },
            },
          },
        },
      };
    } else {

      copyMessage = {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: title || 'Botão copiar', 
              },
              footer: {
                text: description || 'Botão copiar',  
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: buttonText || 'Botão copiar',
                      url: copyText || 'Botão copiar',
                    })
                  },
                ],
                messageParamsJson: JSON.stringify({
                  from: 'apiv2',
                  templateId: '4194019344155670',
                }),
              },
            },
          },
        },
      };
    }
    const number = `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;
    const newMsg = generateWAMessageFromContent(number, copyMessage, {
      userJid: botNumber,
    });
    await wbot.relayMessage(number, newMsg.message!,{ messageId: newMsg.key.id });
    if (newMsg) {
      await wbot.upsertMessage(newMsg, 'notify');
    }
    return res.status(200).json({ message: "Copy message sent successfully", newMsg });

  } catch (error) {
    console.error('Erro ao enviar a mensagem de cópia:', error);
    throw new AppError("Error sending copy message", 500);
  }
};

export const sendPIXMessage = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const {
    sendkey_type,
    sendmerchant_name,
    title,
    sendvalue,
    sendKey
  }: {
    sendkey_type: string;
    sendmerchant_name: string;
    title: string;
    sendvalue: number;
    sendKey: string;
  } = req.body;

  try {
       const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    const contact = await Contact.findByPk(ticket.contactId);
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    const whatsapp = await Whatsapp.findOne({ where: { id: ticket.whatsappId } });
    if (!whatsapp || !whatsapp.number) {
      throw new Error('Número de WhatsApp não encontrado');
    }

    const number = `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;
    const botNumber = whatsapp.number;
    const wbot = await GetTicketWbot(ticket);
    const interactiveMsg = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            nativeFlowMessage: {
              buttons: [
                {
                  name: "review_and_pay",
                  buttonParamsJson: JSON.stringify({
                    reference_id: generateRandomCode(),
                    type: 'physical-goods',
                    payment_configuration: 'merchant_categorization_code',
                    payment_settings: [
                      {
                        type: "pix_static_code",
                        pix_static_code: {
                          key: sendKey, 
                          merchant_name: sendmerchant_name,
                          key_type: sendkey_type
                        }
                      },
                      {
                        type: "cards",
                        cards: { enabled: false }
                      }
                    ],
                    currency: "BRL",
                    total_amount: {
                      value: sendvalue * 100,
                      offset: 100,
                    },
                    order: {
                      status: 'payment_requested',
                      items: [{
                        retailer_id: "custom-item",
                        name: title,
                        amount: {
                          value: sendvalue * 100, 
                          offset: 100,
                        },
                        quantity: 1,
                        isCustomItem: true,
                        isQuantitySet: true,
                      }],
                      subtotal: {
                        value: sendvalue * 100, 
                        offset: 100,
                      },
                      tax: null,
                      shipping: null,
                      discount: null,
                      order_type: "ORDER",
                    },
                    native_payment_methods: []
                  })
                }
              ],
            },
          },
        },
      },
    };

    const newMsg = generateWAMessageFromContent(number, interactiveMsg, { userJid: botNumber });
    
    // Envio da mensagem
    await wbot.relayMessage(number, newMsg.message!,{ messageId: newMsg.key.id });
    await wbot.upsertMessage(newMsg, 'notify');

    return res.status(200).json({ message: "Mensagem enviada com sucesso", newMsg });
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
    return res.status(500).json({ message: "Erro ao enviar a mensagem" });
  }
};

const generateRandomCode = (length: number = 11): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

//Transcrição de Audio
export const transcribeAudioMessage = async (req: Request, res: Response): Promise<Response> => {
  const { fileName } = req.params;
  const { companyId } = req.user;
  try {
    const transcribedText = await TranscribeAudioMessageToText(fileName, companyId);
    if (typeof transcribedText === 'string') {
      return res.status(500).send({ error: transcribedText });
    }
    return res.send(transcribedText);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Erro ao transcrever a mensagem de áudio.' });
  }
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { pageNumber, selectedQueues: queueIdsStringified } = req.query as IndexQuery;
  const { companyId, profile } = req.user;
  let queues: number[] = [];

  const user = await User.findByPk(req.user.id, {
    include: [{ model: Queue, as: "queues" }]
  });

  if (queueIdsStringified) {
    queues = JSON.parse(queueIdsStringified);
  } else {
    user.queues.forEach(queue => {
      queues.push(queue.id);
    });
  }

  const { count, messages, ticket, hasMore } = await ListMessagesService({
    pageNumber,
    ticketId,
    companyId,
    queues,
    user
  });

  if (ticket.channel === "whatsapp" && ticket.whatsappId) {
    SetTicketMessagesAsRead(ticket);
  }

  return res.json({ count, messages, ticket, hasMore });
};

function obterNomeEExtensaoDoArquivo(url) {
  var urlObj = new URL(url);
  var pathname = urlObj.pathname;
  var filename = pathname.split('/').pop();
  var parts = filename.split('.');

  var nomeDoArquivo = parts[0];
  var extensao = parts[1];

  return `${nomeDoArquivo}.${extensao}`;
}

// Função para processar comando de resposta rápida #{ "resp": "1" }
const processQuickMessageCommand = async (
  body: string,
  ticket: Ticket
): Promise<{ processed: boolean; newBody?: string }> => {
  try {
    // Verificar se o corpo da mensagem contém o comando #{ "resp": "X" }
    const respMatch = body.match(/#\{\s*"resp"\s*:\s*"(\d+)"\s*\}/);
    if (!respMatch) {
      return { processed: false };
    }

    const respId = parseInt(respMatch[1]);
    console.log(`[processQuickMessageCommand] Detectado comando resp: ${respId}`);

    // Buscar resposta rápida
    const quickMessage = await QuickMessage.findOne({
      where: { id: respId, companyId: ticket.companyId }
    });

    if (!quickMessage) {
      console.warn(`[processQuickMessageCommand] Resposta rápida ID ${respId} não encontrada`);
      return { processed: false };
    }

    console.log(`[processQuickMessageCommand] Resposta rápida encontrada: ${quickMessage.shortcode}`);

    // Buscar o WhatsApp do ticket com credenciais completas
    const whatsapp = await Whatsapp.findByPk(ticket.whatsappId, {
      attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
    });
    if (!whatsapp) {
      console.error(`[processQuickMessageCommand] WhatsApp ID ${ticket.whatsappId} não encontrado`);
      return { processed: false };
    }

    // Resposta rápida com botões CTA — bifurca por canal
    if (quickMessage.messageType === "buttons" && quickMessage.buttons?.length) {
      if (whatsapp.channel === "whatsapp_official") {
        await SendCTAButtonsOfficial({
          ticket,
          messageText: quickMessage.message || "",
          buttons: quickMessage.buttons,
          connection: whatsapp
        });
      } else {
        await SendCTAButtons({
          ticket,
          messageText: quickMessage.message || "",
          buttons: quickMessage.buttons
        });
      }
      console.log(`[processQuickMessageCommand] Botões CTA enviados para "${quickMessage.shortcode}"`);
      return { processed: true, newBody: quickMessage.message };
    }

    // Preparar dados da mensagem
    const messageData: any = {
      number: ticket.contact.number,
      body: quickMessage.message || "",
      companyId: ticket.companyId,
      ticketId: ticket.id    // necessário para canal oficial registrar a mensagem
    };

    // Se tem mídia anexada — usa path absoluto para garantir existsSync no SendMessage
    if (quickMessage.mediaPath && quickMessage.mediaName) {
      const localPath = (quickMessage as any).getDataValue("mediaPath");
      if (localPath) {
        const absolutePath = path.resolve(process.cwd(), `public/company${ticket.companyId}/quickMessage/${localPath}`);
        messageData.mediaPath = absolutePath;
        messageData.mediaName = quickMessage.mediaName;
        console.log(`[processQuickMessageCommand] Enviando com mídia: ${quickMessage.mediaName} → ${absolutePath}`);
      }
    }

    // Enviar mensagem — passa o ticket para o canal oficial usar ticketId correto
    await SendMessage(whatsapp, messageData, false, ticket);
    console.log(`[processQuickMessageCommand] Resposta rápida "${quickMessage.shortcode}" enviada com sucesso`);

    return { processed: true, newBody: quickMessage.message };
  } catch (error) {
    console.error(`[processQuickMessageCommand] Erro ao processar comando:`, error);
    return { processed: false };
  }
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;

  let { body, quotedMsg, vCard, isPrivate = "false", location }: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];
  const { companyId } = req.user;
  const userId = Number(req.user.id);

  const ticket = await ShowTicketService(ticketId, companyId, userId);

  if (ticket.channel === "whatsapp" && ticket.whatsappId) {
    SetTicketMessagesAsRead(ticket);
  }

  // Envio direto de botões CTA (sem passar por processQuickMessageCommand)
  const { messageType, buttons } = req.body;
  if (messageType === "buttons" && Array.isArray(buttons) && buttons.length > 0) {
    if (ticket.channel === "whatsapp_official") {
      try {
        const conn = await Whatsapp.findByPk(ticket.whatsappId, {
          attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistencePermanentToken"]
        });
        await SendCTAButtonsOfficial({ ticket, messageText: body || "", buttons, connection: conn });
        return res.send();
      } catch (error) {
        logger.error(`[store] Erro ao enviar botões CTA oficial ticket ${ticket.id}:`, error);
        return res.status(500).json({ error: "Erro ao enviar botões interativos" });
      }
    } else if (ticket.channel === "whatsapp") {
      try {
        await SendCTAButtons({ ticket, messageText: body || "", buttons });
        return res.send();
      } catch (error) {
        logger.error(`[store] Erro ao enviar botões CTA ticket ${ticket.id}:`, error);
        return res.status(500).json({ error: "Erro ao enviar botões interativos" });
      }
    }
  }

  // Resposta rápida com mídia: delega ao processQuickMessageCommand via ID
  const { quickMessageId } = req.body;
  if (quickMessageId) {
    try {
      const result = await processQuickMessageCommand(`#{ "resp": "${quickMessageId}" }`, ticket);
      if (result.processed) return res.send();
    } catch (error) {
      logger.error(`[store] Erro ao enviar mídia de resposta rápida ticket ${ticket.id}:`, error);
      return res.status(500).json({ error: "Erro ao enviar mídia da resposta rápida" });
    }
  }

  // Verificar se é comando de resposta rápida (apenas se não tem mídia)
  if (!medias && body) {
    const result = await processQuickMessageCommand(body, ticket);
    if (result.processed) {
      // Se processou a resposta rápida, retorna sucesso sem enviar a mensagem original
      return res.send();
    }
  }

  try {
    if (medias) {
      await Promise.all(
        medias.map(async (media: Express.Multer.File, index) => {
          if (ticket.channel === "whatsapp") {
            await SendWhatsAppMedia({ media, ticket, body: Array.isArray(body) ? body[index] : body, isPrivate: isPrivate === "true", isForwarded: false });
          }

          if (["facebook", "instagram"].includes(ticket.channel)) {
            try {
              const sentMedia = await sendFacebookMessageMedia({
                media,
                ticket,
                body: Array.isArray(body) ? body[index] : body
              });

              // Registrar a mídia enviada no histórico do ticket para ambos os canais
              await verifyMessageMedia(sentMedia, ticket, ticket.contact, true);
            } catch (error) {
              console.log(error);
            }
          }

          if (ticket.channel === "whatsapp_official") {
            let quotedMsgWid: string | undefined;
            let quotedMsgDbId: number | undefined;
            if (quotedMsg?.id) {
              const qMsg = await Message.findByPk(quotedMsg.id, { attributes: ["id", "wid"] });
              if (qMsg) { quotedMsgWid = qMsg.wid; quotedMsgDbId = qMsg.id; }
            }
            await SendMediaOfficialService({
              media,
              body: Array.isArray(body) ? body[index] : body,
              ticketId: ticket.id,
              contact: ticket.contact,
              connection: ticket.whatsapp,
              quotedMsgWid,
              quotedMsgId: quotedMsgDbId
            });
          }

          // Não deletar arquivos da API oficial — o getter do modelo Message monta a URL
          // apontando para o arquivo no nosso servidor; deletar causa 404 no chat
          if (ticket.channel !== "whatsapp_official") {
            // Não deletar áudio/vídeo — necessário para reprodução no chat
            // Deletar apenas imagens e documentos que não precisam de playback
            const audioVideoExt = /\.(mp3|ogg|opus|wav|aac|m4a|mp4|webm|3gp|mov)$/i;
            if (!audioVideoExt.test(media.filename)) {
              const filePath = path.resolve("public", `company${companyId}`, media.filename);
              const fileExists = fs.existsSync(filePath);
              if (fileExists && isPrivate === "false") {
                fs.unlinkSync(filePath);
              }
            }
          }
        })
      );
    } else {
      if (ticket.channel === "whatsapp" && isPrivate === "false") {
        await SendWhatsAppMessage({ body, ticket, quotedMsg, vCard, location });
      } else if (ticket.channel === "whatsapp" && isPrivate === "true") {
        const messageData = {
          wid: `PVT${ticket.updatedAt.toString().replace(' ', '')}`,
          ticketId: ticket.id,
          contactId: undefined,
          body,
          fromMe: true,
          mediaType: !isNil(vCard) ? 'contactMessage' : 'extendedTextMessage',
          read: true,
          quotedMsgId: null,
          ack: 2,
          remoteJid: ticket.contact?.remoteJid,
          participant: null,
          dataJson: null,
          ticketTrakingId: null,
          isPrivate: isPrivate === "true",
          userId: req.user.id
        };

        const message = await CreateMessageService({ messageData, companyId: ticket.companyId });
        
        // Enviar notificação push para dispositivos móveis
        await notifyNewMessage(message);

      } else if (["facebook", "instagram"].includes(ticket.channel)) {
        const sendText = await sendFaceMessage({ body, ticket, quotedMsg });
        // Registrar texto enviado no histórico do ticket para ambos os canais
        await verifyMessageFace(sendText, body, ticket, ticket.contact, true);
      } else if (ticket.channel === "whatsapp_official") {
        if (location?.latitude && location?.longitude) {
          // Enviar como location card na Cloud API
          const { buildGraphClient } = await import("../services/WhatsappCoexistence/graphApiHelper");
          const conn = ticket.whatsapp as any;
          const client = buildGraphClient(conn.coexistencePermanentToken);
          const locRes = await client.post(`${conn.coexistencePhoneNumberId}/messages`, {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: ticket.contact.number,
            type: "location",
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
              name: location.address || "",
              address: location.address || ""
            }
          });
          const locMsgId = locRes.data?.messages?.[0]?.id;
          if (locMsgId) {
            await CreateMessageService({
              messageData: {
                wid: locMsgId,
                ticketId: ticket.id,
                contactId: undefined,
                body: location.address || `${location.latitude},${location.longitude}`,
                fromMe: true,
                read: true,
                mediaType: "locationMessage",
                ack: 2
              },
              companyId: ticket.companyId
            });
          }
        } else if (vCard) {
          // Contato: Cloud API suporta contact card nativo via type: "contacts"
          const { buildGraphClient } = await import("../services/WhatsappCoexistence/graphApiHelper");
          const conn = ticket.whatsapp as any;
          const client = buildGraphClient(conn.coexistencePermanentToken);
          const c = vCard as any;
          const contactPayload: any = {
            name: {
              formatted_name: c.name || c.number || "Contato",
              first_name: c.name || ""
            },
            phones: c.number ? [{ phone: c.number, type: "CELL" }] : []
          };
          if (c.email) contactPayload.emails = [{ email: c.email, type: "WORK" }];

          const ctRes = await client.post(`${conn.coexistencePhoneNumberId}/messages`, {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: ticket.contact.number,
            type: "contacts",
            contacts: [contactPayload]
          });
          const ctMsgId = ctRes.data?.messages?.[0]?.id;
          if (ctMsgId) {
            await CreateMessageService({
              messageData: {
                wid: ctMsgId,
                ticketId: ticket.id,
                contactId: undefined,
                body: c.name || c.number || "Contato",
                fromMe: true,
                read: true,
                mediaType: "contactMessage",
                ack: 2
              },
              companyId: ticket.companyId
            });
          }
        } else if (body?.trim()) {
          let quotedMsgWid: string | undefined;
          let quotedMsgDbId: number | undefined;
          if (quotedMsg?.id) {
            const qMsg = await Message.findByPk(quotedMsg.id, { attributes: ["id", "wid"] });
            if (qMsg) { quotedMsgWid = qMsg.wid; quotedMsgDbId = qMsg.id; }
          }
          await SendTextOfficialService({
            body,
            ticketId: ticket.id,
            contact: ticket.contact,
            connection: ticket.whatsapp,
            quotedMsgWid,
            quotedMsgId: quotedMsgDbId
          });
        }
      }
    }
    return res.send();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const forwardMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const { quotedMsg, signMessage, messageId, contactId } = req.body;
  const { id: userId, companyId } = req.user;
  const requestUser = await User.findByPk(userId);

  if (!messageId || !contactId) {
    return res.status(200).send("MessageId or ContactId not found");
  }
  const message = await ShowMessageService(messageId);
  const contact = await ShowContactService(contactId, companyId);

  if (!message) {
    return res.status(404).send("Message not found");
  }
  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  const settings = await CompaniesSettings.findOne({
    where: { companyId }
  }
  )

  const whatsAppConnectionId = await GetWhatsAppFromMessage(message);
  if (!whatsAppConnectionId) {
    return res.status(404).send('Whatsapp from message not found');
  }

  const ticket = await ShowTicketService(message.ticketId, message.companyId);

  const mutex = new Mutex();

  const createTicket = await mutex.runExclusive(async () => {
    const result = await FindOrCreateTicketService(
      contact,
      ticket?.whatsapp,
      0,
      ticket.companyId,
      ticket.queueId,
      requestUser.id,
      contact.isGroup ? contact : null,
      "whatsapp",
      null,
      true,
      settings,
      false,
      false
    );

    return result;
  });

  let ticketData;

  if (isNil(createTicket?.queueId)) {
    ticketData = {
      status: createTicket.isGroup ? "group" : "open",
      userId: requestUser.id,
      queueId: ticket.queueId
    }
  } else {
    ticketData = {
      status: createTicket.isGroup ? "group" : "open",
      userId: requestUser.id
    }
  }

  await UpdateTicketService({
    ticketData,
    ticketId: createTicket.id,
    companyId: createTicket.companyId
  });

  let body = message.body;
  if (message.mediaType === 'conversation' || message.mediaType === 'extendedTextMessage') {
    await SendWhatsAppMessage({ body, ticket: createTicket, quotedMsg, isForwarded: message.fromMe ? false : true });
  } else {

    const mediaUrl = message.mediaUrl.replace(`:${process.env.PORT}`, '');
    const fileName = obterNomeEExtensaoDoArquivo(mediaUrl);

    if (body === fileName) {
      body = "";
    }

    const publicFolder = path.join(__dirname, '..', '..', '..', 'backend', 'public');

    const filePath = path.join(publicFolder, `company${createTicket.companyId}`, fileName)

    const mediaSrc = {
      fieldname: 'medias',
      originalname: fileName,
      encoding: '7bit',
      mimetype: message.mediaType,
      filename: fileName,
      path: filePath
    } as Express.Multer.File

    await SendWhatsAppMedia({ media: mediaSrc, ticket: createTicket, body, isForwarded: message.fromMe ? false : true });
  }

  return res.send();
}

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { messageId } = req.params;
  const { companyId } = req.user;

  const message = await DeleteWhatsAppMessage(messageId, companyId);
  const io = getIO();

  if (message.isPrivate) {
    await Message.destroy({
      where: {
        id: message.id
      }
    });
    io.of(String(companyId))
      // .to(message.ticketId.toString())
      .emit(`company-${companyId}-appMessage`, {
        action: "delete",
        message
      });
  }

  io.of(String(companyId))
    // .to(message.ticketId.toString())
    .emit(`company-${companyId}-appMessage`, {
      action: "update",
      message
    });

  return res.send();
};

export const allMe = async (req: Request, res: Response): Promise<Response> => {

  const dateStart: any = req.query.dateStart;
  const dateEnd: any = req.query.dateEnd;
  const fromMe: any = req.query.fromMe;

  const { companyId } = req.user;

  const { count } = await ListMessagesServiceAll({
    companyId,
    fromMe,
    dateStart,
    dateEnd
  });

  return res.json({ count });
};

export const send = async (req: Request, res: Response): Promise<Response> => {
  const messageData: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];

  try {

    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");

    const whatsapp = await Whatsapp.findOne({ where: { token } });
    const companyId = whatsapp.companyId;
    const company = await ShowPlanCompanyService(companyId);
    const sendMessageWithExternalApi = company.plan.useExternalApi

    if (sendMessageWithExternalApi) {

      if (!whatsapp) {
        throw new Error("Não foi possível realizar a operação");
      }

      if (messageData.number === undefined) {
        throw new Error("O número é obrigatório");
      }

      const number = messageData.number;
      const body = messageData.body;

      if (medias) {
        await Promise.all(
          medias.map(async (media: Express.Multer.File) => {
            req.app.get("queues").messageQueue.add(
              "SendMessage",
              {
                whatsappId: whatsapp.id,
                data: {
                  number,
                  body: media.originalname.replace('/', '-'),
                  mediaPath: media.path
                }
              },
              { removeOnComplete: true, attempts: 3 }
            );
          })
        );
      } else {
        req.app.get("queues").messageQueue.add(
          "SendMessage",
          {
            whatsappId: whatsapp.id,
            data: {
              number,
              body
            }
          },
          { removeOnComplete: true, attempts: 3 }
        );
      }
      return res.send({ mensagem: "Mensagem enviada!" });
    }
    return res.status(400).json({ error: 'Essa empresa não tem permissão para usar a API Externa. Entre em contato com o Suporte para verificar nossos planos!' });

  } catch (err: any) {

    console.log(err);
    if (Object.keys(err).length === 0) {
      throw new AppError(
        "Não foi possível enviar a mensagem, tente novamente em alguns instantes"
      );
    } else {
      throw new AppError(err.message);
    }
  }
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
  const { messageId } = req.params;
  const { companyId } = req.user;
  const { body }: MessageData = req.body;

  const { ticket, message } = await EditWhatsAppMessage({ messageId, body });

  const io = getIO();
  io.of(String(companyId))
    // .to(String(ticket.id))
    .emit(`company-${companyId}-appMessage`, {
      action: "update",
      message
    });

  io.of(String(companyId))
    // .to(ticket.status)
    // .to("notification")
    // .to(String(ticket.id))
    .emit(`company-${companyId}-ticket`, {
      action: "update",
      ticket
    });
  return res.send();
}

export const sendMessageFlow = async (
  whatsappId: number,
  body: any,
  req: Request,
  files?: Express.Multer.File[]
): Promise<String> => {
  const messageData = body;
  const medias = files;

  try {
    const whatsapp = await Whatsapp.findByPk(whatsappId);

    if (!whatsapp) {
      throw new Error("Não foi possível realizar a operação");
    }

    if (messageData.number === undefined) {
      throw new Error("O número é obrigatório");
    }

    const numberToTest = messageData.number;
    const body = messageData.body;

    const companyId = messageData.companyId;

    const CheckValidNumber = await CheckContactNumber(numberToTest, companyId);
    const number = CheckValidNumber.replace(/\D/g, "");

    if (medias) {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          await req.app.get("queues").messageQueue.add(
            "SendMessage",
            {
              whatsappId,
              data: {
                number,
                body: media.originalname,
                mediaPath: media.path
              }
            },
            { removeOnComplete: true, attempts: 3 }
          );
        })
      );
    } else {
      req.app.get("queues").messageQueue.add(
        "SendMessage",
        {
          whatsappId,
          data: {
            number,
            body
          }
        },

        { removeOnComplete: false, attempts: 3 }
      );
    }

    return "Mensagem enviada";
  } catch (err: any) {
    if (Object.keys(err).length === 0) {
      throw new AppError(
        "Não foi possível enviar a mensagem, tente novamente em alguns instantes"
      );
    } else {
      throw new AppError(err.message);
    }
  }
};