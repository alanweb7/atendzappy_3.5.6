import Whatsapp from "../../models/Whatsapp";
import Contact from "../../models/Contact";
import CreateMessageService from "../MessageServices/CreateMessageService";
import { graphRequest, extractGraphError } from "../WhatsappCoexistence/graphApiHelper";

interface SendTextOfficialParams {
  body: string;
  ticketId: number;
  contact: Contact;
  connection: Whatsapp;
  quotedMsgWid?: string;
  quotedMsgId?: number;
}

export const SendTextOfficialService = async ({
  body,
  ticketId,
  contact,
  connection,
  quotedMsgWid,
  quotedMsgId
}: SendTextOfficialParams) => {
  if (!body?.trim()) {
    throw new Error("ERR_OFFICIAL_EMPTY_BODY");
  }

  if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
    throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
  }

  console.log("[WhatsAppOfficial][SendTextOfficial] connection", {
    whatsappId: connection.id,
    phoneNumberId: connection.coexistencePhoneNumberId,
    wabaId: connection.coexistenceWabaId,
    companyId: connection.companyId
  });

  // Meta Cloud API exige apenas dígitos no campo "to" (sem +, espaços ou traços)
  const toNumber = contact.number.replace(/\D/g, "");
  if (!toNumber) {
    throw new Error("ERR_OFFICIAL_INVALID_NUMBER");
  }

  const payload: any = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toNumber,
    type: "text",
    text: { preview_url: false, body }
  };

  // Resposta a mensagem específica (reply) — Meta Cloud API usa campo "context"
  if (quotedMsgWid) {
    payload.context = { message_id: quotedMsgWid };
  }

  try {
    const response = await graphRequest(
      connection.coexistencePermanentToken,
      "post",
      `${connection.coexistencePhoneNumberId}/messages`,
      payload
    );

    console.log("[WhatsAppOfficial][SendTextOfficial] graphResponse", {
      status: "success",
      messageId: response?.messages?.[0]?.id,
      raw: response
    });

    const messageId = response?.messages?.[0]?.id;

    if (!messageId) {
      throw new Error("ERR_OFFICIAL_NO_MESSAGE_ID");
    }

    const newMessage = await CreateMessageService({
      messageData: {
        wid: messageId,
        ticketId,
        contactId: contact.id,
        body,
        fromMe: true,
        read: true,
        ack: 2,
        ...(quotedMsgId && { quotedMsgId })
      } as any,
      companyId: connection.companyId
    });

    return newMessage;
  } catch (error) {
    const graphError = extractGraphError(error);
    console.error("[WhatsAppOfficial][SendTextOfficial] graphError", {
      status: "error",
      message: graphError,
      payload
    });
    throw new Error(`ERR_OFFICIAL_SEND_TEXT: ${graphError}`);
  }
};
