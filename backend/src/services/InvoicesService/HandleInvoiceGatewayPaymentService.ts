import moment from "moment";
import Invoices from "../../models/Invoices";
import Company from "../../models/Company";
import { getIO } from "../../libs/socket";

// Statuses from Asaas that mean the payment was effectively received
const PAID_STATUSES = new Set([
  "received",
  "confirmed",
  "received_in_cash",
  "payment_confirmed",
  "payment_received",
  "payment_received_in_cash"
]);

interface Params {
  invoiceId?: number | string | null;
  status?: string;
}

const HandleInvoiceGatewayPaymentService = async ({
  invoiceId,
  status
}: Params): Promise<void> => {
  if (!invoiceId || !status) return;

  const normalized = status.toLowerCase();
  if (!PAID_STATUSES.has(normalized)) return;

  const invoice = await Invoices.findByPk(Number(invoiceId), {
    include: [{ model: Company, as: "company" }]
  });

  if (!invoice) return;
  if (invoice.status === "paid") return;

  await invoice.update({ status: "paid" });

  const company = (invoice as any).company as Company | null;
  if (company) {
    const currentDueDate = moment(company.dueDate);
    const today = moment();
    const base = currentDueDate.isAfter(today) ? currentDueDate : today;
    const newDueDate = base.add(30, "days").format("YYYY-MM-DD");
    await company.update({ dueDate: newDueDate });

    console.log(
      `[InvoiceWebhook] Invoice #${invoice.id} paid. Company #${company.id} dueDate → ${newDueDate}`
    );
  }

  try {
    const io = getIO();
    // Notify admin panel
    io.of("1").emit("company-1-invoices", {
      action: "invoice:paid",
      payload: { id: invoice.id, status: "paid", companyId: invoice.companyId }
    });
    // Notify the client company
    io.of(String(invoice.companyId)).emit(
      `company-${invoice.companyId}-invoices`,
      { action: "invoice:paid", payload: { id: invoice.id, status: "paid" } }
    );
  } catch (_) {}
};

export default HandleInvoiceGatewayPaymentService;
