import moment from "moment";
import { Op } from "sequelize";
import * as Sentry from "@sentry/node";
import Invoices from "../../models/Invoices";
import Company from "../../models/Company";
import Setting from "../../models/Setting";
import { generateSimpleAsaasPaymentLink } from "../PaymentGatewayService";
import { SendMailWithSettings } from "../../helpers/SendMailWithSettings";
import FindCompaniesWhatsappService from "../CompanyService/FindCompaniesWhatsappService";
import { getWbot } from "../../libs/wbot";
import logger from "../../utils/logger";

// Dias antes do vencimento para disparar aviso (invoiceMsgAviso)
const NOTIFY_DAYS_BEFORE = [5, 3, 1];
// Dias após vencimento para disparar atrasada (invoiceMsgAtrasada) — máx 2 pois no 3° a empresa é inativada
const NOTIFY_OVERDUE_DAYS = [1, 2];

const formatPhoneToWhatsappJid = (rawPhone?: string): string | null => {
  if (!rawPhone) return null;
  let digits = rawPhone.replace(/\D/g, "");
  if (!digits) return null;
  if (!digits.startsWith("55")) digits = "55" + digits;
  return digits + "@s.whatsapp.net";
};

export const sendAutoBillingNotifications = async (): Promise<void> => {
  const hoje = moment().startOf("day");

  // Montar lista de dueDates a notificar hoje
  const dueDates: string[] = [];
  for (const d of NOTIFY_DAYS_BEFORE) {
    dueDates.push(hoje.clone().add(d, "days").format("YYYY-MM-DD"));
  }
  dueDates.push(hoje.format("YYYY-MM-DD")); // vence hoje
  for (const d of NOTIFY_OVERDUE_DAYS) {
    dueDates.push(hoje.clone().subtract(d, "days").format("YYYY-MM-DD"));
  }

  const invoices = await Invoices.findAll({
    where: {
      status: "open",
      dueDate: { [Op.in]: dueDates }
    },
    include: [
      {
        model: Company,
        as: "company",
        where: { status: true, id: { [Op.ne]: 1 } },
        required: true
      }
    ]
  });

  if (!invoices.length) {
    logger.info("[AutoBilling] Nenhuma fatura para notificar hoje.");
    return;
  }

  // Carregar configurações uma única vez
  let appName = "Sistema";
  let msgAviso = "";
  let msgDia = "";
  let msgAtrasada = "";

  try {
    const settings = await Setting.findAll({
      where: {
        companyId: 1,
        key: ["appName", "invoiceMsgAviso", "invoiceMsgDia", "invoiceMsgAtrasada"]
      }
    });
    appName = settings.find(s => s.key === "appName")?.value || "Sistema";
    msgAviso = settings.find(s => s.key === "invoiceMsgAviso")?.value || "";
    msgDia = settings.find(s => s.key === "invoiceMsgDia")?.value || "";
    msgAtrasada = settings.find(s => s.key === "invoiceMsgAtrasada")?.value || "";
  } catch (e) {
    Sentry.captureException(e);
  }

  // WhatsApp admin conectado (companyId=1)
  let wbot: any = null;
  try {
    const adminCompany: any = await FindCompaniesWhatsappService(1);
    const firstWpp = adminCompany?.whatsapps?.[0];
    if (firstWpp?.status === "CONNECTED") {
      wbot = getWbot(firstWpp.id);
    }
  } catch (e) {
    Sentry.captureException(e);
    logger.warn("[AutoBilling] WhatsApp admin indisponível.");
  }

  logger.info(`[AutoBilling] Disparando notificações para ${invoices.length} fatura(s)...`);

  for (const invoice of invoices) {
    try {
      const targetCompany = invoice.company;
      if (!targetCompany) continue;

      const venc = moment(invoice.dueDate).startOf("day");
      const dias = venc.diff(hoje, "days");

      let msgTemplate = msgAviso;
      if (dias < 0) msgTemplate = msgAtrasada;
      else if (dias === 0) msgTemplate = msgDia;

      const dueDateFmt = moment(invoice.dueDate).format("DD/MM/YYYY");
      const valueFmt = Number(invoice.value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });

      // Reusar link existente ou gerar novo via Asaas
      let paymentLink = invoice.linkInvoice || "";
      if (!paymentLink) {
        try {
          const linkResult = await generateSimpleAsaasPaymentLink({
            companyId: 1,
            invoiceId: invoice.id,
            value: invoice.value,
            description: invoice.detail || `Fatura #${invoice.id}`,
            dueDate: dueDateFmt
          });
          paymentLink = linkResult.paymentLink || "";
          if (paymentLink) {
            invoice.linkInvoice = paymentLink;
            await invoice.save();
          }
        } catch (err: any) {
          logger.warn(`[AutoBilling] Falha ao gerar link Asaas para fatura ${invoice.id}: ${err?.message}`);
        }
      }

      const replaceVars = (text: string) =>
        text
          .replace(/\{empresa\}/g, targetCompany.name || "")
          .replace(/\{plano\}/g, invoice.detail || "")
          .replace(/\{valor\}/g, valueFmt)
          .replace(/\{vencimento\}/g, dueDateFmt)
          .replace(/\{link\}/g, paymentLink);

      const paymentLinkText = paymentLink
        ? `\n\n🔗 *Link de Pagamento:*\n${paymentLink}`
        : "";

      const defaultBody =
        `*Aviso de Cobrança - ${appName}*\n\n` +
        `Olá *${targetCompany.name}*,\n\n` +
        `A fatura abaixo encontra-se em aberto:\n\n` +
        `*Detalhes:* ${invoice.detail}\n` +
        `*Valor:* ${valueFmt}\n` +
        `*Vencimento:* ${dueDateFmt}` +
        `${paymentLinkText}\n\n` +
        `Regularize o pagamento para evitar a suspensão dos serviços.\n\n` +
        `Atenciosamente,\n*${appName}*`;

      const whatsappBody = msgTemplate ? replaceVars(msgTemplate) : defaultBody;

      // Enviar WhatsApp
      if (wbot && targetCompany.phone) {
        try {
          const phoneJid = formatPhoneToWhatsappJid(targetCompany.phone);
          if (phoneJid) {
            await wbot.sendMessage(phoneJid, { text: whatsappBody });
            logger.info(
              `[AutoBilling] WhatsApp enviado → empresa ${targetCompany.id}, fatura ${invoice.id}, dias=${dias}`
            );
          }
        } catch (err: any) {
          Sentry.captureException(err);
          logger.error(
            `[AutoBilling] Falha WhatsApp → empresa ${targetCompany.id}: ${err?.message}`
          );
        }
      }

      // Enviar email
      if (targetCompany.email) {
        try {
          const paymentLinkHtml = paymentLink
            ? `<p><strong>🔗 Link de Pagamento:</strong><br>` +
              `<a href="${paymentLink}" style="color:#1976d2">${paymentLink}</a></p>`
            : "";

          const emailHtml = `
            <h2>Aviso de Cobrança — ${appName}</h2>
            <p>Olá <strong>${targetCompany.name}</strong>,</p>
            <p>A fatura abaixo encontra-se em aberto:</p>
            <table style="border-collapse:collapse;margin:16px 0">
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Detalhes</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${invoice.detail}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Valor</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${valueFmt}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Vencimento</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${dueDateFmt}</td>
              </tr>
            </table>
            ${paymentLinkHtml}
            <p>Regularize o pagamento para evitar a suspensão dos serviços.</p>
            <p>Em caso de dúvidas, entre em contato conosco.</p>
            <br>
            <p>Atenciosamente,<br><strong>${appName}</strong></p>
          `;

          await SendMailWithSettings({
            to: targetCompany.email,
            subject: `Aviso de Cobrança — ${invoice.detail} — ${appName}`,
            html: emailHtml
          });
          logger.info(
            `[AutoBilling] Email enviado → empresa ${targetCompany.id}, fatura ${invoice.id}`
          );
        } catch (err: any) {
          Sentry.captureException(err);
          logger.error(
            `[AutoBilling] Falha email → empresa ${targetCompany.id}: ${err?.message}`
          );
        }
      }
    } catch (err: any) {
      Sentry.captureException(err);
      logger.error(`[AutoBilling] Erro ao processar fatura ${invoice.id}: ${err?.message}`);
    }
  }

  logger.info("[AutoBilling] Ciclo concluído.");
};
