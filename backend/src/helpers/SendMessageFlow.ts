import Whatsapp from "../models/Whatsapp";
import Contact from "../models/Contact";
import GetWhatsappWbot from "./GetWhatsappWbot";
import { SendTextOfficialService } from "../services/WhatsAppOfficial/SendTextOfficialService";

export type MessageData = {
  number: number | string;
  body: string;
  mediaPath?: string;
  ticketId?: number;
  contact?: Contact;
};

export const SendMessageFlow = async (
  whatsapp: Whatsapp,
  messageData: MessageData,
  isFlow: boolean = false,
  isRecord: boolean = false
): Promise<any> => {
  try {
    // Canal API Oficial: usa Graph API
    if (whatsapp.channel === "whatsapp_official") {
      let connection = whatsapp;
      if (!connection.coexistencePermanentToken || !connection.coexistencePhoneNumberId) {
        const full = await Whatsapp.findByPk(whatsapp.id, {
          attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
        });
        if (full) connection = full;
      }

      let contact = messageData.contact;
      if (!contact) {
        contact = await Contact.findOne({
          where: { number: String(messageData.number), companyId: whatsapp.companyId },
          attributes: ["id", "number", "companyId"]
        });
      }
      if (!contact) {
        contact = { id: 0, number: String(messageData.number), companyId: whatsapp.companyId } as Contact;
      }

      return await SendTextOfficialService({
        body: messageData.body,
        ticketId: messageData.ticketId || 0,
        contact,
        connection
      });
    }

    // Canal Baileys (padrão)
    const wbot = await GetWhatsappWbot(whatsapp);
    const chatId = `${messageData.number}@s.whatsapp.net`;
    const body = `\u200E${messageData.body}`;
    return await wbot.sendMessage(chatId, { text: body });
  } catch (err: any) {
    throw new Error(err);
  }
};
