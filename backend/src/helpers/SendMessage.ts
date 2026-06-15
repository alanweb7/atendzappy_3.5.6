import Whatsapp from "../models/Whatsapp";
import Ticket from "../models/Ticket";
import Contact from "../models/Contact";
import GetWhatsappWbot from "./GetWhatsappWbot";
import fs from "fs";
import path from "path";
import formatBody from "./Mustache";
import mime from "mime-types";

import { getMessageOptions } from "../services/WbotServices/SendWhatsAppMedia";
import { SendTextOfficialService } from "../services/WhatsAppOfficial/SendTextOfficialService";
import { SendMediaOfficialService } from "../services/WhatsAppOfficial/SendMediaOfficialService";

export type MessageData = {
  number: number | string;
  body: string;
  mediaPath?: string;
  companyId?: number;
  mediaName?: string;
};

export const SendMessage = async (
  whatsapp: Whatsapp,
  messageData: MessageData,
  isGroup: boolean = false,
  ticket?: Ticket
): Promise<any> => {
  try {
    // Canal API Oficial: usa Graph API em vez de Baileys
    if (whatsapp.channel === "whatsapp_official") {
      const formattedBody = formatBody(messageData.body, ticket);

      // Busca credenciais completas se não estiverem no objeto
      let connection = whatsapp;
      if (!connection.coexistencePermanentToken || !connection.coexistencePhoneNumberId) {
        const full = await Whatsapp.findByPk(whatsapp.id, {
          attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
        });
        if (full) connection = full;
      }

      // Busca ou monta o contact a partir do número
      let contact: Contact;
      if (ticket?.contact) {
        contact = ticket.contact as Contact;
      } else {
        contact = await Contact.findOne({
          where: { number: String(messageData.number), companyId: whatsapp.companyId || messageData.companyId },
          attributes: ["id", "number", "companyId"]
        });
      }

      if (!contact) {
        // Cria contact mínimo com o número
        contact = { id: 0, number: String(messageData.number), companyId: whatsapp.companyId || messageData.companyId } as Contact;
      }

      const ticketId = ticket?.id || (messageData as any).ticketId || 0;

      // Se tem mídia — monta objeto compatível com Express.Multer.File
      if (messageData.mediaPath && fs.existsSync(messageData.mediaPath)) {
        const absPath = path.resolve(messageData.mediaPath);
        const filename = path.basename(absPath);
        const mimeType = (mime.lookup(filename) || "application/octet-stream") as string;
        const stat = fs.statSync(absPath);

        const fakeFile: Express.Multer.File = {
          fieldname: "medias",
          originalname: messageData.mediaName || filename,
          encoding: "7bit",
          mimetype: mimeType,
          destination: path.dirname(absPath),
          filename,
          path: absPath,
          size: stat.size,
          buffer: null,
          stream: null
        };

        return await SendMediaOfficialService({
          media: fakeFile,
          body: formattedBody,
          ticketId,
          contact,
          connection,
          passVerification: true
        });
      }

      return await SendTextOfficialService({
        body: formattedBody,
        ticketId,
        contact,
        connection
      });
    }

    // Canal Baileys (padrão)
    const wbot = await GetWhatsappWbot(whatsapp);
    const chatId = `${messageData.number}@${!!isGroup ? 'g.us' : 's.whatsapp.net'}`;
    const companyId = messageData?.companyId ? messageData.companyId.toString() : null;

    let message;
    const formattedBody = formatBody(messageData.body, ticket);

    if (messageData.mediaPath) {
      const options = await getMessageOptions(
        messageData.mediaName,
        messageData.mediaPath,
        companyId,
        formattedBody,
      );
      if (options) {
        const body = fs.readFileSync(messageData.mediaPath);
        message = await wbot.sendMessage(chatId, { ...options });
      }
    } else {
      message = await wbot.sendMessage(chatId, { text: formattedBody });
    }

    return message;
  } catch (err: any) {
    throw new Error(err);
  }
};
