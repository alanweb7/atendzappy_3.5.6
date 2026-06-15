import { Request, Response } from "express";
import AiCreditPackage from "../models/AiCreditPackage";
import AiCreditOrder from "../models/AiCreditOrder";
import User from "../models/User";
import { getAiCreditUsage, grantCreditsAdmin } from "../services/AiCredits/AiCreditsService";
import { createCreditCheckout, processPaymentWebhook, verifyOrderPayment } from "../services/AiCredits/AiCreditOrderService";
import logger from "../utils/logger";

const isSuperUser = async (userId: string | number): Promise<boolean> => {
  const user = await User.findByPk(userId, { attributes: ["super"] });
  return user?.super === true;
};

// GET /ai-credits/usage — uso atual da empresa logada
export const getUsage = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const usage = await getAiCreditUsage(companyId);
  return res.json(usage);
};

// GET /ai-credits/packages — lista pacotes disponíveis
export const listPackages = async (_req: Request, res: Response): Promise<Response> => {
  const packages = await AiCreditPackage.findAll({ where: { isActive: true }, order: [["credits", "ASC"]] });
  return res.json(packages);
};

// POST /ai-credits/purchase/:packageId — cria link de checkout
export const purchasePackage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { companyId } = req.user;
    const packageId = Number(req.params.packageId);
    const result = await createCreditCheckout(companyId, packageId);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

// GET /ai-credits/orders — pedidos da empresa
export const listOrders = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const orders = await AiCreditOrder.findAll({
    where: { companyId },
    include: [{ model: AiCreditPackage, as: "package" }],
    order: [["createdAt", "DESC"]],
    limit: 50
  });
  return res.json(orders);
};

// GET /ai-credits/orders/:orderId/verify — verifica status manualmente
export const verifyOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await verifyOrderPayment(Number(req.params.orderId));
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

// POST /ai-credits/webhook — webhook InfinitePay (sem autenticação)
export const webhook = async (req: Request, res: Response): Promise<Response> => {
  try {
    await processPaymentWebhook(req.body);
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    logger.error("[AiCredits] Webhook error:", err);
    return res.status(400).json({ error: err.message });
  }
};

// POST /ai-credits/grant — super admin concede créditos manualmente
export const grantCredits = async (req: Request, res: Response): Promise<Response> => {
  if (!await isSuperUser(req.user.id)) return res.status(403).json({ error: "Sem permissão" });
  const { companyId, credits } = req.body;
  await grantCreditsAdmin(Number(companyId), Number(credits));
  return res.json({ ok: true });
};

// GET /ai-credits/admin/usage — super admin: uso de todas as empresas
export const adminListUsage = async (req: Request, res: Response): Promise<Response> => {
  if (!await isSuperUser(req.user.id)) return res.status(403).json({ error: "Sem permissão" });
  const { QueryTypes } = require("sequelize");
  const sequelize = require("../database").default;
  const rows = await sequelize.query(
    `SELECT u.*, c.name as "companyName"
     FROM "AiCreditsUsage" u
     JOIN "Companies" c ON c.id = u."companyId"
     WHERE u.period = TO_CHAR(NOW(), 'YYYY-MM')
     ORDER BY u."tokensUsed" DESC`,
    { type: QueryTypes.SELECT }
  );
  return res.json(rows);
};

// Packages CRUD (super admin)
export const createPackage = async (req: Request, res: Response): Promise<Response> => {
  if (!await isSuperUser(req.user.id)) return res.status(403).json({ error: "Sem permissão" });
  const pkg = await AiCreditPackage.create(req.body);
  return res.status(201).json(pkg);
};

export const updatePackage = async (req: Request, res: Response): Promise<Response> => {
  if (!await isSuperUser(req.user.id)) return res.status(403).json({ error: "Sem permissão" });
  const pkg = await AiCreditPackage.findByPk(req.params.id);
  if (!pkg) return res.status(404).json({ error: "Não encontrado" });
  await pkg.update(req.body);
  return res.json(pkg);
};

export const deletePackage = async (req: Request, res: Response): Promise<Response> => {
  if (!await isSuperUser(req.user.id)) return res.status(403).json({ error: "Sem permissão" });
  const pkg = await AiCreditPackage.findByPk(req.params.id);
  if (!pkg) return res.status(404).json({ error: "Não encontrado" });
  await pkg.update({ isActive: false });
  return res.json({ ok: true });
};

// GET /ai-credits/system-providers — quais provedores têm chave do sistema configurada (não verifica créditos)
export const systemProviders = async (_req: Request, res: Response): Promise<Response> => {
  // Busca as chaves da companyId 1 (super admin / sistema) sem verificar créditos
  const Setting = (await import("../models/Setting")).default;
  const [openaiSetting, geminiSetting] = await Promise.all([
    Setting.findOne({ where: { companyId: 1, key: "openaiApiKey" } }),
    Setting.findOne({ where: { companyId: 1, key: "geminiApiKey" } }),
  ]);
  return res.json({
    openai: !!(openaiSetting?.value) || !!(process.env.OPENAI_API_KEY),
    gemini: !!(geminiSetting?.value) || !!(process.env.GEMINI_API_KEY),
  });
};
