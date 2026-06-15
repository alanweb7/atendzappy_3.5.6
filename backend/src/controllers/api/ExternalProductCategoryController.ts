import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import ListService from "../../services/ProdutoCategoriaService/ListService";
import ShowService from "../../services/ProdutoCategoriaService/ShowService";
import CreateService from "../../services/ProdutoCategoriaService/CreateService";
import UpdateService from "../../services/ProdutoCategoriaService/UpdateService";
import DeleteService from "../../services/ProdutoCategoriaService/DeleteService";
import triggerExternalWebhook from "../../services/ExternalWebhook/triggerExternalWebhook";

const ensureExternalAuth = (req: Request) => {
  if (!req.externalAuth) {
    throw new AppError("ERR_EXTERNAL_AUTH_REQUIRED", 401);
  }
  return req.externalAuth;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = ensureExternalAuth(req);
  const categories = await ListService({ companyId });
  return res.json({ categories });
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = ensureExternalAuth(req);
  const { id } = req.params;
  const category = await ShowService({ id: Number(id), companyId });
  return res.json(category);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const externalAuth = ensureExternalAuth(req);
  const { nome, slug, descricao } = req.body;

  const category = await CreateService({
    companyId: externalAuth.companyId,
    nome,
    slug,
    descricao
  });

  await triggerExternalWebhook({
    url: externalAuth.webhookUrl,
    secret: externalAuth.webhookSecret,
    event: "product_category.created",
    data: {
      apiKeyId: externalAuth.apiKeyId,
      category
    }
  });

  return res.status(201).json(category);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const externalAuth = ensureExternalAuth(req);
  const { id } = req.params;
  const { nome, slug, descricao } = req.body;

  const category = await UpdateService({
    id: Number(id),
    companyId: externalAuth.companyId,
    nome,
    slug,
    descricao
  });

  await triggerExternalWebhook({
    url: externalAuth.webhookUrl,
    secret: externalAuth.webhookSecret,
    event: "product_category.updated",
    data: {
      apiKeyId: externalAuth.apiKeyId,
      category
    }
  });

  return res.json(category);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const externalAuth = ensureExternalAuth(req);
  const { id } = req.params;

  await DeleteService({ id: Number(id), companyId: externalAuth.companyId });

  await triggerExternalWebhook({
    url: externalAuth.webhookUrl,
    secret: externalAuth.webhookSecret,
    event: "product_category.deleted",
    data: {
      apiKeyId: externalAuth.apiKeyId,
      categoryId: Number(id)
    }
  });

  return res.status(204).send();
};
