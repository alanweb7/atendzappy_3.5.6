import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AiCreditOrder from "../../models/AiCreditOrder";
import AiCreditPackage from "../../models/AiCreditPackage";
import Company from "../../models/Company";
import { addExtraCredits } from "./AiCreditsService";
import logger from "../../utils/logger";

const INFINITEPAY_BASE = "https://api.checkout.infinitepay.io";
const INFINITEPAY_HANDLE = process.env.INFINITEPAY_HANDLE || "";

/** Cria link de checkout InfinitePay para um pacote de créditos */
export const createCreditCheckout = async (
  companyId: number,
  packageId: number
): Promise<{ checkoutUrl: string; orderId: number }> => {
  const pkg = await AiCreditPackage.findByPk(packageId);
  if (!pkg || !pkg.isActive) throw new Error("Pacote não encontrado ou inativo");

  const company = await Company.findByPk(companyId);
  if (!company) throw new Error("Empresa não encontrada");

  const orderNsu = `aicréditos-${companyId}-${Date.now()}`;

  const backendUrl = process.env.BACKEND_URL || "";
  const frontendUrl = process.env.FRONTEND_URL || "";

  const payload: any = {
    handle: INFINITEPAY_HANDLE,
    order_nsu: orderNsu,
    items: [
      {
        quantity: 1,
        price: pkg.priceInCents,
        description: `${pkg.name} — ${pkg.credits.toLocaleString("pt-BR")} créditos de IA`
      }
    ],
    redirect_url: `${frontendUrl}/creditos-ia?payment=success`,
    webhook_url: `${backendUrl}/ai-credits/webhook`,
    customer: {
      name: company.name,
      email: company.email,
      phone_number: company.phone || undefined
    }
  };

  const { data } = await axios.post(`${INFINITEPAY_BASE}/links`, payload, {
    headers: { "Content-Type": "application/json" }
  });

  const checkoutUrl = data?.url || data?.checkout_url || data?.link || "";

  const order = await AiCreditOrder.create({
    companyId,
    packageId,
    credits: pkg.credits,
    amountInCents: pkg.priceInCents,
    status: "pending",
    orderNsu,
    checkoutUrl
  });

  return { checkoutUrl, orderId: order.id };
};

/** Processa webhook de pagamento confirmado da InfinitePay */
export const processPaymentWebhook = async (body: {
  invoice_slug: string;
  order_nsu: string;
  transaction_nsu: string;
  amount: number;
  paid_amount: number;
  capture_method: string;
}): Promise<void> => {
  const { order_nsu, transaction_nsu, invoice_slug } = body;

  const order = await AiCreditOrder.findOne({ where: { orderNsu: order_nsu, status: "pending" } });
  if (!order) {
    logger.warn(`[AiCredits] Webhook: pedido não encontrado ou já processado: ${order_nsu}`);
    return;
  }

  await order.update({
    status: "paid",
    transactionNsu: transaction_nsu,
    invoiceSlug: invoice_slug,
    paidAt: new Date()
  });

  await addExtraCredits(order.companyId, order.credits);
  logger.info(`[AiCredits] Pagamento confirmado: empresa=${order.companyId}, créditos=${order.credits}`);
};

/** Verifica manualmente o status de um pedido na InfinitePay */
export const verifyOrderPayment = async (orderId: number): Promise<{ paid: boolean }> => {
  const order = await AiCreditOrder.findByPk(orderId);
  if (!order) throw new Error("Pedido não encontrado");

  if (order.status === "paid") return { paid: true };
  if (!order.transactionNsu && !order.invoiceSlug) return { paid: false };

  try {
    const { data } = await axios.post(`${INFINITEPAY_BASE}/payment_check`, {
      handle: INFINITEPAY_HANDLE,
      order_nsu: order.orderNsu,
      transaction_nsu: order.transactionNsu,
      slug: order.invoiceSlug
    });

    if (data?.paid) {
      await order.update({ status: "paid", paidAt: new Date() });
      await addExtraCredits(order.companyId, order.credits);
      return { paid: true };
    }
  } catch (err) {
    logger.error("[AiCredits] Erro ao verificar pagamento:", err);
  }

  return { paid: false };
};
