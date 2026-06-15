import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import CompanyFiscalConfig from "../models/CompanyFiscalConfig";
import Company from "../models/Company";
import Plan from "../models/Plan";
import logger from "../utils/logger";

const ENCRYPTION_KEY = process.env.APP_KEY || "atendzappy-fiscal-key-32chars!!";
const IV_LENGTH = 16;

const encrypt = (text: string): string => {
  const key = Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32));
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text: string): string => {
  try {
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32));
    const [ivHex, encryptedHex] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
  } catch {
    return "";
  }
};

// GET /fiscal/config — retorna config + dados do plano
export const getConfig = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  try {
    const [config, company] = await Promise.all([
      CompanyFiscalConfig.findOne({ where: { companyId } }),
      Company.findByPk(companyId, { include: [{ model: Plan, as: "plan" }] })
    ]);

    const plan = (company as any)?.plan;

    return res.json({
      // Configuração do certificado
      hasCertificate: !!(config?.certificatePath && fs.existsSync(config.certificatePath)),
      certificateExpiry: config?.certificateExpiry || null,
      isActive: config?.isActive ?? true,

      // Dados do plano
      nfLimit: plan?.nfLimit ?? 0,
      nfBillingEnabled: plan?.nfBillingEnabled ?? false,
      nfPricePerExtra: plan?.nfPricePerExtra ?? 0,
      nfCurrentCount: plan?.nfCurrentCount ?? 0,
      nfLastResetDate: plan?.nfLastResetDate ?? null,

      // Extras acumulados
      nfExtraCount: config?.nfExtraCount ?? 0,
      nfExtraTotal: ((config?.nfExtraCount ?? 0) * (plan?.nfPricePerExtra ?? 0)),

      // Disponível
      nfAvailable: Math.max(0, (plan?.nfLimit ?? 0) - (plan?.nfCurrentCount ?? 0)),
    });
  } catch (err: any) {
    logger.error("[Fiscal] getConfig error:", err.message);
    return res.status(500).json({ error: "Erro ao buscar configuração fiscal" });
  }
};

// POST /fiscal/certificate — upload do certificado A1
export const uploadCertificate = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { password } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "Nenhum arquivo enviado" });
  if (!password) return res.status(400).json({ error: "Senha do certificado é obrigatória" });

  try {
    // Pasta de destino
    const destDir = path.resolve("public", `company${companyId}`, "fiscal");
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const destPath = path.join(destDir, `certificate_${companyId}.pfx`);

    // Move o arquivo para o destino final
    fs.copyFileSync(file.path, destPath);
    fs.unlinkSync(file.path);

    // Tenta ler a data de validade do certificado (básico — pelo nome ou deixa null)
    const encryptedPassword = encrypt(password);

    await CompanyFiscalConfig.upsert({
      companyId,
      certificatePath: destPath,
      certificatePassword: encryptedPassword,
      certificateExpiry: null,
      isActive: true,
    });

    return res.json({ message: "Certificado enviado com sucesso" });
  } catch (err: any) {
    logger.error("[Fiscal] uploadCertificate error:", err.message);
    return res.status(500).json({ error: "Erro ao salvar certificado" });
  }
};

// DELETE /fiscal/certificate — remove o certificado
export const deleteCertificate = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  try {
    const config = await CompanyFiscalConfig.findOne({ where: { companyId } });
    if (config?.certificatePath && fs.existsSync(config.certificatePath)) {
      fs.unlinkSync(config.certificatePath);
    }
    await CompanyFiscalConfig.update(
      { certificatePath: null, certificatePassword: null, certificateExpiry: null },
      { where: { companyId } }
    );
    return res.json({ message: "Certificado removido" });
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao remover certificado" });
  }
};

// PUT /fiscal/password — atualiza apenas a senha
export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Senha obrigatória" });

  try {
    const encryptedPassword = encrypt(password);
    await CompanyFiscalConfig.upsert({ companyId, certificatePassword: encryptedPassword });
    return res.json({ message: "Senha atualizada" });
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao atualizar senha" });
  }
};
