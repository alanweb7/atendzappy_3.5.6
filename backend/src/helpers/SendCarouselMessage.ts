import { loadBaileys } from "../utils/loadBaileys";
import * as fs from "fs";
import * as path from "path";
import Ticket from "../models/Ticket";
import GetTicketWbot from "./GetTicketWbot";
import { delay } from "bluebird";
import { typeSimulation } from "../services/WbotServices/SendWhatsAppMediaFlow";
import logger from "../utils/logger";

export interface CarouselButton {
  type: "cta_url" | "cta_copy" | "quick_reply";
  text: string;
  value: string;
}

export interface CarouselCard {
  title: string;
  description?: string;
  price?: string;
  image?: string; // filename relativo (salvo em public/company{id}/) ou URL
  buttons?: CarouselButton[];
  button?: { text: string; value: string }; // legado
}

interface CarouselData {
  ticket?: Ticket;
  wbot?: any;
  jid?: string;
  title: string;
  cards: CarouselCard[];
  companyId?: number;
}

const buildCardButton = (btn: CarouselButton) => {
  if (btn.type === "cta_url") {
    return {
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: btn.text,
        url: btn.value,
        merchant_url: btn.value
      })
    };
  }
  if (btn.type === "cta_copy") {
    return {
      name: "cta_copy",
      buttonParamsJson: JSON.stringify({
        display_text: btn.text,
        copy_code: btn.value
      })
    };
  }
  return {
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
      display_text: btn.text,
      id: btn.value
    })
  };
};

const resolveCardButtons = (card: CarouselCard) => {
  if (card.buttons && card.buttons.length > 0) {
    return card.buttons.slice(0, 2).map(buildCardButton);
  }
  if (card.button) {
    const isUrl = card.button.value?.startsWith("http://") || card.button.value?.startsWith("https://");
    return [buildCardButton({
      type: isUrl ? "cta_url" : "quick_reply",
      text: card.button.text,
      value: card.button.value
    })];
  }
  return [];
};

const prepareCardImage = async (
  wbot: any,
  card: CarouselCard,
  companyId: number
): Promise<any> => {
  if (!card.image) return null;

  try {
    // prepareWAMessageMedia não é exportada pelo index principal do Baileys v7 — importar direto do Utils
    const { prepareWAMessageMedia } = await import("@whiskeysockets/baileys/lib/Utils/messages.js" as any);

    let imageSource: any;

    if (card.image.startsWith("http://") || card.image.startsWith("https://")) {
      imageSource = { url: card.image };
    } else {
      // dist/helpers/ → dois níveis acima → backend/ → public/
      const publicFolder = path.resolve(__dirname, "../..", "public");
      const filePath = path.join(publicFolder, `company${companyId}`, card.image);
      logger.info(`🖼️ Preparando imagem do card: ${filePath}`);
      if (!fs.existsSync(filePath)) {
        logger.warn(`⚠️ Arquivo não encontrado: ${filePath}`);
        return null;
      }
      imageSource = { buffer: fs.readFileSync(filePath) };
    }

    const prepared = await prepareWAMessageMedia(
      { image: imageSource },
      { upload: wbot.waUploadToServer }
    );

    logger.info(`✅ Imagem do card preparada com sucesso`);
    return prepared.imageMessage || null;
  } catch (err) {
    logger.warn(`⚠️ Falha ao preparar imagem do card "${card.title}":`, err);
    return null;
  }
};

export const SendCarouselMessage = async ({
  ticket,
  wbot: wbotParam,
  jid: jidParam,
  title,
  cards,
  companyId
}: CarouselData): Promise<void> => {
  if (cards.length < 2) throw new Error("Carrossel requer mínimo 2 cards");
  if (cards.length > 10) throw new Error("Carrossel suporta no máximo 10 cards");

  const { generateWAMessageFromContent } = await loadBaileys();

  const effectiveCompanyId = companyId ?? ticket?.companyId;
  const wbot = wbotParam ?? await GetTicketWbot(ticket);
  const jid = jidParam ?? `${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;

  logger.info(`🎠 Preparando carrossel — ticket ${ticket.id}, ${cards.length} cards, empresa ${effectiveCompanyId}`);

  const preparedImages = await Promise.all(
    cards.map(card => prepareCardImage(wbot, card, effectiveCompanyId))
  );

  const missingImages = preparedImages.filter(img => !img).length;
  if (missingImages > 0) {
    throw new Error(`${missingImages}/${cards.length} cards sem imagem válida — carousel requer imagem em todos os cards`);
  }

  const carouselCards = cards.map((card, i) => {
    const cardButtons = resolveCardButtons(card);
    return {
      header: { hasMediaAttachment: true, imageMessage: preparedImages[i] },
      body: { text: `${card.title}${card.description ? `\n${card.description}` : ""}` },
      ...(card.price ? { footer: { text: card.price } } : {}),
      ...(cardButtons.length > 0 ? { nativeFlowMessage: { buttons: cardButtons } } : {})
    };
  });

  const interactiveMsg = {
    interactiveMessage: {
      header: { title: title.trim() },
      body: { text: title.trim() },
      carouselMessage: { cards: carouselCards }
    }
  };

  if (ticket) {
    await typeSimulation(ticket, "composing");
    await delay(1500);
    await typeSimulation(ticket, "paused");
  }

  const newMsg = generateWAMessageFromContent(jid, interactiveMsg, {
    userJid: wbot.user?.id
  });

  const decisionId = Math.random().toString(16).slice(2, 18);

  await wbot.relayMessage(jid, newMsg.message, {
    messageId: newMsg.key.id,
    additionalNodes: [
      {
        tag: "biz",
        attrs: {},
        content: [
          {
            tag: "interactive",
            attrs: { type: "native_flow", v: "1" },
            content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
          },
          {
            tag: "quality_control",
            attrs: { decision_id: decisionId },
            content: [{ tag: "decision_source", attrs: { value: "df" } }]
          }
        ]
      }
    ]
  });

  try { await wbot.upsertMessage(newMsg, "notify"); } catch (_) {}

  logger.info(`✅ Carrossel enviado com sucesso — ${ticket ? `ticket ${ticket.id}` : `jid ${jid}`}`);
};

export const SendCarouselAsText = async ({
  ticket,
  wbot: wbotParam,
  jid: jidParam,
  title,
  cards
}: CarouselData): Promise<void> => {
  let text = `${title}\n\n`;
  cards.forEach((card, i) => {
    text += `*${i + 1}. ${card.title}*\n`;
    if (card.description) text += `${card.description}\n`;
    if (card.price) text += `💰 ${card.price}\n`;
    text += "\n";
  });

  if (ticket) {
    const SendWhatsAppMessage = (await import("../services/WbotServices/SendWhatsAppMessage")).default;
    const ShowTicketService = (await import("../services/TicketServices/ShowTicketService")).default;
    const ticketDetails = await ShowTicketService(ticket.id, ticket.companyId);
    await typeSimulation(ticket, "composing");
    await delay(1500);
    await typeSimulation(ticket, "paused");
    await SendWhatsAppMessage({ body: text, ticket: ticketDetails, quotedMsg: null });
    logger.info(`📝 Carrossel enviado como texto (fallback) — ticket ${ticket.id}`);
  } else {
    const wbot = wbotParam;
    const jid = jidParam;
    await wbot.sendMessage(jid, { text });
    logger.info(`📝 Carrossel enviado como texto (fallback) — jid ${jid}`);
  }
};

export const SendCarouselWithFallback = async (data: CarouselData): Promise<void> => {
  try {
    await SendCarouselMessage(data);
  } catch (err) {
    logger.warn(`⚠️ Carrossel nativo falhou, usando fallback textual — ticket ${data.ticket.id}:`, err);
    await SendCarouselAsText(data);
  }
};
