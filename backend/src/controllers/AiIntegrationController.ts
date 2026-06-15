import { Request, Response } from "express";
import AiIntegrationSetting from "../models/AiIntegrationSetting";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const settings = await AiIntegrationSetting.findAll({ where: { companyId } });
  return res.json(settings);
};

export const upsert = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { provider, apiKey, active } = req.body;

  if (!provider || !apiKey) {
    return res.status(400).json({ error: "provider e apiKey são obrigatórios" });
  }

  const [record, created] = await AiIntegrationSetting.findOrCreate({
    where: { companyId, provider },
    defaults: { companyId, provider, apiKey, active: active !== false },
  });

  if (!created) {
    await record.update({ apiKey, active: active !== false });
  }

  return res.status(200).json(record);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { provider } = req.params;

  await AiIntegrationSetting.destroy({ where: { companyId, provider } });
  return res.status(200).json({ message: "Integração removida" });
};
