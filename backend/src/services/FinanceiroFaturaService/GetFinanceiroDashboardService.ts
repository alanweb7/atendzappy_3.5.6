import { Op } from "sequelize";
import FinanceiroFatura from "../../models/FinanceiroFatura";
import FinanceiroDespesa from "../../models/FinanceiroDespesa";

const GetFinanceiroDashboardService = async (companyId: number) => {
  const hoje = new Date();
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const [
    totalAReceber,
    totalVencidoReceber,
    recebidoMes,
    totalFaturasAberto,
    totalAPagar,
    totalVencidoPagar,
    pagoMes,
  ] = await Promise.all([
    FinanceiroFatura.sum("valor", {
      where: { companyId, status: { [Op.in]: ["aberta", "vencida"] }, ativa: true },
    }),
    FinanceiroFatura.sum("valor", {
      where: { companyId, status: "vencida", ativa: true },
    }),
    FinanceiroFatura.sum("valorPago", {
      where: {
        companyId,
        status: "paga",
        dataPagamento: { [Op.gte]: inicioMes },
      },
    }),
    FinanceiroFatura.count({
      where: { companyId, status: { [Op.in]: ["aberta", "vencida"] }, ativa: true },
    }),
    FinanceiroDespesa.sum("valor", {
      where: { companyId, status: { [Op.in]: ["aberta", "vencida"] } },
    }),
    FinanceiroDespesa.sum("valor", {
      where: { companyId, status: "vencida" },
    }),
    FinanceiroDespesa.sum("valorPago", {
      where: {
        companyId,
        status: "paga",
        dataPagamento: { [Op.gte]: inicioMes },
      },
    }),
  ]);

  const receber = Number(totalAReceber) || 0;
  const pagar = Number(totalAPagar) || 0;

  return {
    totalAReceber: receber,
    totalAPagar: pagar,
    totalVencidoReceber: Number(totalVencidoReceber) || 0,
    totalVencidoPagar: Number(totalVencidoPagar) || 0,
    recebidoMes: Number(recebidoMes) || 0,
    pagoMes: Number(pagoMes) || 0,
    saldoProjetado: receber - pagar,
    totalFaturasAberto: totalFaturasAberto || 0,
  };
};

export default GetFinanceiroDashboardService;
