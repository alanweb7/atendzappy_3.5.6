import { generateWAMessageFromContent, WAMessage } from "@whiskeysockets/baileys";
import Ticket from "../models/Ticket";
import Whatsapp from "../models/Whatsapp";
import GetTicketWbot from "./GetTicketWbot";
import { delay } from "bluebird";
import { typeSimulation } from "../services/WbotServices/SendWhatsAppMediaFlow";
import logger from "../utils/logger";
import CreateMessageService from "../services/MessageServices/CreateMessageService";
import { buildGraphClient } from "../services/WhatsappCoexistence/graphApiHelper";
import { SendTextOfficialService } from "../services/WhatsAppOfficial/SendTextOfficialService";

interface InteractiveMenuData {
  ticket: Ticket;
  menuMessage: string;
  arrayOption: Array<{
    number: string;
    value: string;
    next?: string;
  }>;
  menuType?: "buttons" | "text" | "list";
}

export const SendInteractiveMenu = async ({
  ticket,
  menuMessage,
  arrayOption
}: InteractiveMenuData): Promise<void> => {
  try {
    const wbot = await GetTicketWbot(ticket);
    const jid = `${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;

    if (arrayOption.length > 3) {
      logger.warn(`⚠️ Menu com ${arrayOption.length} opções excede o limite de 3, usando fallback textual`);
      throw new Error("Too many options for interactive menu");
    }

    const buttons = arrayOption.map((option) => ({
      name: "quick_reply" as const,
      buttonParamsJson: JSON.stringify({
        display_text: option.value.trim(),
        id: option.number.toString()
      })
    }));

    const interactiveMsg = {
      interactiveMessage: {
        body: {
          text: menuMessage.trim()
        },
        nativeFlowMessage: {
          buttons: buttons,
          messageParamsJson: JSON.stringify({
            from: "apiv2",
            templateId: "4194019344155670"
          })
        }
      }
    };

    await typeSimulation(ticket, "composing");
    await delay(2000);
    await typeSimulation(ticket, "paused");

    const newMsg = generateWAMessageFromContent(jid, interactiveMsg, {
      userJid: wbot.user.id
    }) as WAMessage;

    const additionalNodes = [
      {
        tag: "biz",
        attrs: {},
        content: [
          {
            tag: "interactive",
            attrs: { type: "native_flow", v: "1" },
            content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
          }
        ]
      }
    ];

    await wbot.relayMessage(jid, newMsg.message!, {
      messageId: newMsg.key.id,
      additionalNodes
    });

    if (newMsg) {
      await wbot.upsertMessage(newMsg, "notify");
    }

    // Salva no banco para aparecer no chat interno
    try {
      const buttonsData = arrayOption.map(option => ({
        name: "quick_reply",
        displayText: option.value.trim(),
        id: option.number.toString(),
        url: "",
        copyCode: "",
        phoneNumber: ""
      }));
      await CreateMessageService({
        messageData: {
          wid: newMsg.key.id,
          ticketId: ticket.id,
          contactId: undefined,
          body: menuMessage.trim() || "📋",
          fromMe: true,
          read: true,
          mediaType: "interactiveMessage",
          ack: 2,
          fromAgent: false,
          buttonsData,
        },
        companyId: ticket.companyId,
      });
    } catch (err) {
      logger.warn(`[SendInteractiveMenu] Falha ao salvar mensagem no banco: ${err}`);
    }

    logger.info(`📱 Menu interativo enviado para ticket ${ticket.id} com ${buttons.length} botões`);

  } catch (error) {
    logger.error(`❌ Erro ao enviar menu interativo para ticket ${ticket.id}:`, error);
    throw error;
  }
};

export const SendMenuAsText = async ({
  ticket,
  menuMessage,
  arrayOption
}: InteractiveMenuData): Promise<void> => {
  try {
    let optionsMenu = "";
    arrayOption.forEach(item => {
      optionsMenu += `[${item.number}] ${item.value}\n`;
    });

    const menuText = `${menuMessage}\n\n${optionsMenu}`;

    const SendWhatsAppMessage = (await import("../services/WbotServices/SendWhatsAppMessage")).default;
    const ShowTicketService = (await import("../services/TicketServices/ShowTicketService")).default;

    const ticketDetails = await ShowTicketService(ticket.id, ticket.companyId);

    await typeSimulation(ticket, "composing");
    await delay(2000);
    await typeSimulation(ticket, "paused");

    await SendWhatsAppMessage({
      body: menuText,
      ticket: ticketDetails,
      quotedMsg: null
    });

    logger.info(`📝 Menu textual enviado para ticket ${ticket.id}`);

  } catch (error) {
    logger.error(`❌ Erro ao enviar menu textual para ticket ${ticket.id}:`, error);
    throw error;
  }
};

interface CTAButton {
  type: "cta_url" | "cta_copy";
  displayText: string;
  value: string;
}

interface CTAButtonsData {
  ticket: Ticket;
  messageText: string;
  buttons: CTAButton[];
}

export const SendCTAButtons = async ({
  ticket,
  messageText,
  buttons
}: CTAButtonsData): Promise<void> => {
  if (buttons.length === 0 || buttons.length > 3) {
    throw new Error(`SendCTAButtons: esperado 1-3 botões, recebido ${buttons.length}`);
  }

  // Canal API Oficial — delega automaticamente para a implementação oficial
  const channel = (ticket as any).whatsapp?.channel;
  if (channel === "whatsapp_official") {
    let connection = (ticket as any).whatsapp as Whatsapp;
    if (!connection?.coexistencePermanentToken) {
      const full = await Whatsapp.findByPk(ticket.whatsappId, {
        attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
      });
      if (full) connection = full;
    }
    return await SendCTAButtonsOfficial({ ticket, messageText, buttons, connection });
  }

  const wbot = await GetTicketWbot(ticket);
  const jid = `${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;

  const nativeButtons = buttons.map(btn => {
    if (btn.type === "cta_url") {
      return {
        name: "cta_url" as const,
        buttonParamsJson: JSON.stringify({
          display_text: btn.displayText.trim(),
          url: btn.value.trim(),
          merchant_url: btn.value.trim()
        })
      };
    } else {
      return {
        name: "cta_copy" as const,
        buttonParamsJson: JSON.stringify({
          display_text: btn.displayText.trim(),
          copy_code: btn.value.trim()
        })
      };
    }
  });

  const interactiveMsg = {
    interactiveMessage: {
      body: {
        text: messageText.trim()
      },
      nativeFlowMessage: {
        buttons: nativeButtons,
        messageParamsJson: JSON.stringify({
          from: "apiv2",
          templateId: "4194019344155670"
        })
      }
    }
  };

  const newMsg = generateWAMessageFromContent(jid, interactiveMsg, {
    userJid: wbot.user.id
  }) as WAMessage;

  const additionalNodes = [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
        }
      ]
    }
  ];

  await wbot.relayMessage(jid, newMsg.message!, {
    messageId: newMsg.key.id,
    additionalNodes
  });

  if (newMsg) {
    await wbot.upsertMessage(newMsg, "notify");
  }

  // Salva no banco para aparecer no chat interno
  try {
    const buttonsData = buttons.map(btn => ({
      name: btn.type,
      displayText: btn.displayText,
      url: btn.type === "cta_url" ? btn.value : "",
      copyCode: btn.type === "cta_copy" ? btn.value : "",
      id: "",
      phoneNumber: ""
    }));
    await CreateMessageService({
      messageData: {
        wid: newMsg.key.id,
        ticketId: ticket.id,
        contactId: undefined,
        body: messageText.trim() || "📲",
        fromMe: true,
        read: true,
        mediaType: "interactiveMessage",
        ack: 2,
        fromAgent: false,
        buttonsData,
      },
      companyId: ticket.companyId,
    });
  } catch (err) {
    logger.warn(`[SendCTAButtons] Falha ao salvar mensagem no banco: ${err}`);
  }

  logger.info(`🔗 Botões CTA enviados para ticket ${ticket.id} (${buttons.length} botão/botões)`);
};

interface CTAButtonsOfficialData {
  ticket: Ticket;
  messageText: string;
  buttons: CTAButton[];
  connection: Whatsapp;
}

export const SendCTAButtonsOfficial = async ({
  ticket,
  messageText,
  buttons,
  connection
}: CTAButtonsOfficialData): Promise<void> => {
  if (buttons.length === 0 || buttons.length > 3) {
    throw new Error(`SendCTAButtonsOfficial: esperado 1-3 botões, recebido ${buttons.length}`);
  }

  if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
    throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
  }

  const client = buildGraphClient(connection.coexistencePermanentToken);
  const to = ticket.contact.number;
  const contact = ticket.contact as any;

  const urlButtons = buttons.filter(b => b.type === "cta_url");
  const copyButtons = buttons.filter(b => b.type === "cta_copy");

  // Corpo base para mensagens com URL (copy values embutidos para quando há mix)
  let fullBody = messageText.trim();
  if (urlButtons.length > 0 && copyButtons.length > 0) {
    fullBody += "\n\n" + copyButtons.map(b => `📋 *${b.displayText}*: ${b.value}`).join("\n");
  }

  const saveMessage = async (wid: string, body: string, btns: CTAButton[]) => {
    const buttonsData = btns.map(btn => ({
      name: btn.type,
      displayText: btn.displayText,
      url: btn.type === "cta_url" ? btn.value : "",
      copyCode: btn.type === "cta_copy" ? btn.value : "",
      id: "",
      phoneNumber: ""
    }));
    await CreateMessageService({
      messageData: {
        wid,
        ticketId: ticket.id,
        contactId: undefined,
        body,
        fromMe: true,
        read: true,
        mediaType: "interactiveMessage",
        ack: 2,
        fromAgent: false,
        buttonsData
      },
      companyId: connection.companyId
    });
  };

  if (urlButtons.length === 0) {
    // Tenta copy_code nativo — se a conta não suportar (400), cai em texto com valor embutido
    let copyCodeSupported = true;
    for (const btn of copyButtons) {
      if (!copyCodeSupported) break;
      try {
        const res = await client.post(`${connection.coexistencePhoneNumberId}/messages`, {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to,
          type: "interactive",
          interactive: {
            type: "copy_code",
            body: { text: copyButtons.indexOf(btn) === 0 ? messageText.trim() : `📋 ${btn.displayText}` },
            action: {
              name: "copy_code",
              parameters: { code: btn.value }
            }
          }
        });
        const msgId = res.data?.messages?.[0]?.id;
        if (msgId) await saveMessage(msgId, messageText.trim(), [btn]);
      } catch (copyErr: any) {
        // copy_code não suportado nesta conta — fallback para texto
        copyCodeSupported = false;
        logger.warn(`[SendCTAButtonsOfficial] copy_code não suportado, usando fallback textual: ${copyErr?.message}`);
      }
    }

    if (!copyCodeSupported) {
      // Fallback: envia texto com os valores de cópia embutidos
      const fallbackBody = messageText.trim() + "\n\n" +
        copyButtons.map(b => `📋 *${b.displayText}*: ${b.value}`).join("\n");
      await SendTextOfficialService({
        body: fallbackBody,
        ticketId: ticket.id,
        contact,
        connection
      });
    }
  } else if (urlButtons.length === 1 && copyButtons.length === 0) {
    // Um único cta_url sem copy → tipo nativo cta_url da Cloud API
    const res = await client.post(`${connection.coexistencePhoneNumberId}/messages`, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "cta_url",
        body: { text: fullBody },
        action: {
          name: "cta_url",
          parameters: {
            display_text: urlButtons[0].displayText.trim(),
            url: urlButtons[0].value.trim()
          }
        }
      }
    });
    const msgId = res.data?.messages?.[0]?.id;
    if (msgId) await saveMessage(msgId, fullBody, buttons);
  } else {
    // Múltiplos cta_url ou mix com cta_copy:
    // 1ª mensagem: texto completo (copy embutido) + primeiro botão URL
    // Mensagens adicionais: uma por botão URL restante
    for (let i = 0; i < urlButtons.length; i++) {
      const body = i === 0 ? fullBody : `🔗 ${urlButtons[i].displayText}`;
      const res = await client.post(`${connection.coexistencePhoneNumberId}/messages`, {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "interactive",
        interactive: {
          type: "cta_url",
          body: { text: body },
          action: {
            name: "cta_url",
            parameters: {
              display_text: urlButtons[i].displayText.trim(),
              url: urlButtons[i].value.trim()
            }
          }
        }
      });
      const msgId = res.data?.messages?.[0]?.id;
      if (msgId) await saveMessage(msgId, body, i === 0 ? buttons : [urlButtons[i]]);
    }
  }

  logger.info(`🔗 [Official] Botões CTA enviados para ticket ${ticket.id} — ${urlButtons.length} URL + ${copyButtons.length} copy`);
};

// Menu interativo via Cloud API:
// ≤3 opções → reply buttons | >3 opções → list message (max 10 itens)
export const SendInteractiveMenuOfficial = async ({
  ticket,
  menuMessage,
  arrayOption,
  connection,
  forceList = false
}: {
  ticket: Ticket;
  menuMessage: string;
  arrayOption: Array<{ number: string; value: string; next?: string }>;
  connection: Whatsapp;
  forceList?: boolean;
}): Promise<void> => {
  if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
    throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
  }

  const client = buildGraphClient(connection.coexistencePermanentToken);
  const to = ticket.contact.number;

  let interactive: any;

  if (!forceList && arrayOption.length <= 3) {
    // Cloud API reply buttons (máximo 3, título máximo 20 chars)
    interactive = {
      type: "button",
      body: { text: menuMessage.trim() },
      action: {
        buttons: arrayOption.map(option => ({
          type: "reply",
          reply: {
            id: option.number.toString(),
            title: option.value.trim().substring(0, 20)
          }
        }))
      }
    };
  } else {
    // Cloud API list message — ativado com forceList=true ou >3 opções (máximo 10 por seção)
    interactive = {
      type: "list",
      body: { text: menuMessage.trim() },
      action: {
        button: "Ver opções",
        sections: [{
          title: "Opções",
          rows: arrayOption.slice(0, 10).map(option => ({
            id: option.number.toString(),
            title: option.value.trim().substring(0, 24)
          }))
        }]
      }
    };
  }

  const response = await client.post(`${connection.coexistencePhoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "interactive",
    interactive
  });

  const messageId = response.data?.messages?.[0]?.id;
  if (messageId) {
    const buttonsData = arrayOption.map(option => ({
      name: "quick_reply",
      displayText: option.value.trim(),
      id: option.number.toString(),
      url: "",
      copyCode: "",
      phoneNumber: ""
    }));
    await CreateMessageService({
      messageData: {
        wid: messageId,
        ticketId: ticket.id,
        contactId: undefined,
        body: menuMessage.trim() || "📋",
        fromMe: true,
        read: true,
        mediaType: "interactiveMessage",
        ack: 2,
        fromAgent: false,
        buttonsData
      },
      companyId: connection.companyId
    });
  }

  logger.info(`📱 [Official] Menu enviado para ticket ${ticket.id} (${arrayOption.length} opções)`);
};

export const SendMenuWithFallback = async (data: InteractiveMenuData): Promise<void> => {
  const menuType = data.menuType || "buttons";

  // Canal API Oficial — usa Cloud API interactive messages
  const channel = (data.ticket as any).whatsapp?.channel;
  if (channel === "whatsapp_official") {
    let connection = (data.ticket as any).whatsapp as Whatsapp;
    if (!connection?.coexistencePermanentToken) {
      const full = await Whatsapp.findByPk(data.ticket.whatsappId, {
        attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
      });
      if (full) connection = full;
    }
    try {
      await SendInteractiveMenuOfficial({
        ticket: data.ticket,
        menuMessage: data.menuMessage,
        arrayOption: data.arrayOption,
        connection,
        forceList: menuType === "list"
      });
    } catch (error) {
      logger.warn(`⚠️ Menu oficial falhou ticket ${data.ticket.id}, fallback textual:`, error);
      await SendMenuAsText(data);
    }
    return;
  }

  // menuType === "list" em conexão Baileys: fallback automático para texto
  if (menuType === "list") {
    logger.warn(`⚠️ Lista interativa não suportada em Baileys (ticket ${data.ticket.id}), usando texto`);
    await SendMenuAsText(data);
    return;
  }

  if (menuType === "text") {
    await SendMenuAsText(data);
    return;
  }

  // Baileys: tenta quick_reply (≤3), cai em texto se falhar ou exceder
  if (data.arrayOption.length <= 3) {
    try {
      await SendInteractiveMenu(data);
      return;
    } catch (error) {
      logger.warn(`⚠️ Quick reply falhou para ticket ${data.ticket.id}, usando fallback textual:`, error);
    }
  } else {
    logger.warn(`⚠️ Menu com ${data.arrayOption.length} opções excede limite de 3, usando fallback textual`);
  }

  await SendMenuAsText(data);
};
