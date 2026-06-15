import { Op } from "sequelize";
import sequelize from "../../database";
import AiCreditsUsage from "../../models/AiCreditsUsage";
import Company from "../../models/Company";
import Plan from "../../models/Plan";

const TOKENS_PER_INTERACTION = 1800; // fixo por resposta

const currentPeriod = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

/** Retorna ou cria o registro de uso do mês atual */
const getOrCreateUsage = async (companyId: number): Promise<AiCreditsUsage> => {
  const period = currentPeriod();
  const [record] = await AiCreditsUsage.findOrCreate({
    where: { companyId, period },
    defaults: { companyId, period, tokensUsed: 0, extraCredits: 0 }
  });
  return record;
};

/** Limite efetivo considerando trial */
export const getAiCreditLimit = async (companyId: number): Promise<number> => {
  const company = await Company.findByPk(companyId, {
    include: [{ model: Plan, as: "plan" }]
  });
  if (!company?.plan) return 0;

  const plan = company.plan as Plan & { aiCreditsLimit: number; aiCreditsTrial: number };

  // Determina se está em trial: plan.trial=true e ainda dentro dos dias
  if (plan.trial && plan.trialDays > 0) {
    const createdAt = new Date(company.createdAt);
    const trialEnd = new Date(createdAt.getTime() + plan.trialDays * 24 * 60 * 60 * 1000);
    if (new Date() < trialEnd) {
      return plan.aiCreditsTrial || 0;
    }
  }

  return plan.aiCreditsLimit || 0;
};

/** Uso atual do mês (tokens consumidos - extra) */
export const getAiCreditUsage = async (companyId: number): Promise<{
  period: string;
  tokensUsed: number;
  extraCredits: number;
  limit: number;
  remaining: number;
  hasOwnKey: boolean;
}> => {
  const Setting = (await import("../../models/Setting")).default;
  const [usage, limit] = await Promise.all([
    getOrCreateUsage(companyId),
    getAiCreditLimit(companyId)
  ]);

  const [openaiKey, geminiKey] = await Promise.all([
    Setting.findOne({ where: { companyId, key: "openaiApiKey" } }),
    Setting.findOne({ where: { companyId, key: "geminiApiKey" } })
  ]);
  const hasOwnKey = !!(openaiKey?.value || geminiKey?.value);

  const effective = usage.tokensUsed - usage.extraCredits;
  const remaining = Math.max(0, limit - effective);

  return {
    period: usage.period,
    tokensUsed: usage.tokensUsed,
    extraCredits: usage.extraCredits,
    limit,
    remaining,
    hasOwnKey
  };
};

/** Verifica se a empresa pode usar a chave global do sistema */
export const hasAiCreditsAvailable = async (companyId: number): Promise<boolean> => {
  const { remaining, hasOwnKey } = await getAiCreditUsage(companyId);
  if (hasOwnKey) return true; // chave própria: sem limite do sistema
  return remaining > 0;
};

/** Debita 1800 tokens fixos após uma resposta de IA usando chave do sistema */
export const debitAiInteraction = async (companyId: number): Promise<void> => {
  try {
    const usage = await getOrCreateUsage(companyId);
    await usage.increment("tokensUsed", { by: TOKENS_PER_INTERACTION });
  } catch (err) {
    // Nunca travar a resposta da IA por falha de contagem
    console.error("[AiCredits] Falha ao debitar créditos:", err);
  }
};

/** Adiciona créditos extras (chamado após pagamento confirmado) */
export const addExtraCredits = async (companyId: number, credits: number): Promise<void> => {
  const usage = await getOrCreateUsage(companyId);
  await usage.increment("extraCredits", { by: credits });
};

/** Adiciona créditos manualmente pelo super admin */
export const grantCreditsAdmin = async (companyId: number, credits: number): Promise<void> => {
  await addExtraCredits(companyId, credits);
};
