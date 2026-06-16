import { Request, Response } from "express";
import axios from "axios";
import ListCompanyPaymentSettingsService from "../services/CompanyPaymentSettingService/ListCompanyPaymentSettingsService";
import UpsertCompanyPaymentSettingService from "../services/CompanyPaymentSettingService/UpsertCompanyPaymentSettingService";
import DeleteCompanyPaymentSettingService from "../services/CompanyPaymentSettingService/DeleteCompanyPaymentSettingService";
import AppError from "../errors/AppError";
import CompanyPaymentSetting from "../models/CompanyPaymentSetting";

const ensureCompanyScope = (requestCompanyId: number, targetCompanyId?: number) => {
  if (targetCompanyId && targetCompanyId !== requestCompanyId) {
    throw new AppError("Acesso negado.", 403);
  }
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  const records = await ListCompanyPaymentSettingsService({
    companyId: Number(companyId)
  });

  return res.json(records);
};

export const upsert = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;

  ensureCompanyScope(Number(companyId));

  const record = await UpsertCompanyPaymentSettingService({
    id: id ? Number(id) : undefined,
    companyId: Number(companyId),
    ...req.body
  });

  return res.json(record);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;

  ensureCompanyScope(Number(companyId));

  await DeleteCompanyPaymentSettingService({
    id: Number(id),
    companyId: Number(companyId)
  });

  return res.status(204).send();
};

export const testConnection = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { provider } = req.params;

  const setting = await CompanyPaymentSetting.findOne({
    where: { companyId: Number(companyId), provider, active: true }
  });

  if (!setting || !setting.token) {
    throw new AppError("Configuração não encontrada ou token vazio.", 400);
  }

  if (provider === "asaas") {
    try {
      const response = await axios.get("https://api.asaas.com/v3/account", {
        headers: {
          "Content-Type": "application/json",
          "access-token": setting.token
        },
        timeout: 10000
      });

      return res.json({
        success: true,
        message: `Conexão bem-sucedida! Conta: ${response.data.name || "Asaas"}`,
        data: {
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone
        }
      });
    } catch (error: any) {
      const status = error?.response?.status || 500;
      const message =
        status === 401
          ? "Token inválido ou expirado."
          : status === 429
          ? "Muitas requisições. Tente novamente em alguns segundos."
          : `Erro ao conectar ao Asaas: ${error?.response?.data?.message || error?.message}`;

      return res.status(status).json({
        success: false,
        message
      });
    }
  }

  if (provider === "mercadopago") {
    return res.json({
      success: false,
      message: "Teste de conexão não implementado para Mercado Pago ainda."
    });
  }

  throw new AppError("Gateway não suportado.", 400);
};

export const generatePaymentLink = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { provider } = req.params;
  const { name, description, value, dueDateLimitDays = 7 } = req.body;

  if (!name || !value) {
    throw new AppError("Nome e valor são obrigatórios.", 400);
  }

  const setting = await CompanyPaymentSetting.findOne({
    where: { companyId: Number(companyId), provider, active: true }
  });

  if (!setting || !setting.token) {
    throw new AppError("Configuração de pagamento não encontrada.", 400);
  }

  if (provider === "asaas") {
    try {
      const payload = {
        name,
        description: description || name,
        billingType: "UNDEFINED",
        chargeType: "DETACHED",
        value: Number(value),
        dueDateLimitDays: Number(dueDateLimitDays)
      };

      const response = await axios.post(
        "https://api.asaas.com/v3/paymentLinks",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": setting.token,
            "User-Agent": "Wesender/1.0.0"
          },
          timeout: 10000
        }
      );

      return res.json({
        success: true,
        paymentLink: response.data.url || `https://www.asaas.com/c/${response.data.id}`,
        linkId: response.data.id,
        data: response.data
      });
    } catch (error: any) {
      const status = error?.response?.status || 500;
      const message =
        status === 401
          ? "Token inválido ou expirado."
          : `Erro ao gerar link: ${error?.response?.data?.message || error?.message}`;

      return res.status(status).json({
        success: false,
        message
      });
    }
  }

  throw new AppError("Gateway não suportado.", 400);
};
