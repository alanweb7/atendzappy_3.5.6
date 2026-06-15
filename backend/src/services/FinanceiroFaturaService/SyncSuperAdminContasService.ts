import AppError from "../../errors/AppError";
import FinanceiroFatura from "../../models/FinanceiroFatura";
import Invoices from "../../models/Invoices";
import AiCreditOrder from "../../models/AiCreditOrder";
import Company from "../../models/Company";
import AiCreditPackage from "../../models/AiCreditPackage";

const STATUS_MAP: Record<string, "aberta" | "paga" | "vencida" | "cancelada"> = {
  paid: "paga",
  unpaid: "aberta",
  open: "aberta",
  overdue: "vencida",
  expired: "vencida",
  canceled: "cancelada",
  cancelled: "cancelada",
};

const SyncSuperAdminContasService = async (companyId: number) => {
  if (companyId !== 1) {
    throw new AppError("Acesso negado", 403);
  }

  let created = 0;
  let updated = 0;

  // 1. Sincronizar faturas de planos (Invoices)
  const invoices = await Invoices.findAll({
    include: [{ model: Company, as: "company" }],
  });

  for (const invoice of invoices) {
    const statusFatura = STATUS_MAP[invoice.status] || "aberta";
    const companyName = (invoice as any).company?.name || "Empresa";

    const existing = await FinanceiroFatura.findOne({
      where: { companyId: 1, tipoReferencia: "invoice_plano" as any, referenciaId: invoice.id },
    });

    if (!existing) {
      await FinanceiroFatura.create({
        companyId: 1,
        descricao: `${companyName} — ${invoice.detail || "Assinatura de Plano"}`,
        valor: invoice.value || 0,
        dataVencimento: invoice.dueDate,
        status: statusFatura,
        tipoReferencia: "invoice_plano" as any,
        referenciaId: invoice.id,
        ativa: true,
      } as any);
      created++;
    } else if (existing.status !== statusFatura) {
      await existing.update({ status: statusFatura });
      updated++;
    }
  }

  // 2. Sincronizar compras de créditos IA (AiCreditOrders pagos)
  const orders = await AiCreditOrder.findAll({
    where: { status: "paid" },
    include: [
      { model: Company },
      { model: AiCreditPackage },
    ],
  });

  for (const order of orders) {
    const existing = await FinanceiroFatura.findOne({
      where: { companyId: 1, tipoReferencia: "credito_ia" as any, referenciaId: order.id },
    });

    if (!existing) {
      const companyName = (order as any).company?.name || "Empresa";
      const dataPagamento = order.paidAt || order.createdAt;

      await FinanceiroFatura.create({
        companyId: 1,
        descricao: `Créditos IA — ${order.credits} créditos — ${companyName}`,
        valor: order.amountInCents / 100,
        dataVencimento: dataPagamento,
        status: "paga",
        dataPagamento,
        tipoReferencia: "credito_ia" as any,
        referenciaId: order.id,
        ativa: true,
      } as any);
      created++;
    }
  }

  return { created, updated };
};

export default SyncSuperAdminContasService;
