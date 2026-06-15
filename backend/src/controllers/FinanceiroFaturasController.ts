import { Request, Response } from "express";
import CreateFinanceiroFaturaService from "../services/FinanceiroFaturaService/CreateFinanceiroFaturaService";
import ListFinanceiroFaturasService from "../services/FinanceiroFaturaService/ListFinanceiroFaturasService";
import ShowFinanceiroFaturaService from "../services/FinanceiroFaturaService/ShowFinanceiroFaturaService";
import UpdateFinanceiroFaturaService from "../services/FinanceiroFaturaService/UpdateFinanceiroFaturaService";
import DeleteFinanceiroFaturaService from "../services/FinanceiroFaturaService/DeleteFinanceiroFaturaService";
import GetFinanceiroDashboardService from "../services/FinanceiroFaturaService/GetFinanceiroDashboardService";
import SyncSuperAdminContasService from "../services/FinanceiroFaturaService/SyncSuperAdminContasService";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const {
    searchParam,
    status,
    tipoRecorrencia,
    ativa,
    clientId,
    projectId,
    pageNumber
  } = req.query as Record<string, string>;

  const result = await ListFinanceiroFaturasService({
    companyId: Number(companyId),
    searchParam,
    status,
    tipoRecorrencia,
    ativa,
    clientId,
    projectId,
    pageNumber
  });

  return res.json(result);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;

  const record = await ShowFinanceiroFaturaService(id, Number(companyId));

  return res.json(record);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  const record = await CreateFinanceiroFaturaService({
    ...req.body,
    companyId: Number(companyId)
  });

  return res.status(201).json(record);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;

  const record = await UpdateFinanceiroFaturaService({
    id,
    companyId: Number(companyId),
    ...req.body
  });

  return res.json(record);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;

  await DeleteFinanceiroFaturaService(id, Number(companyId));

  return res.status(204).send();
};

export const dashboard = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const result = await GetFinanceiroDashboardService(Number(companyId));
  return res.json(result);
};

export const syncSuperAdmin = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const result = await SyncSuperAdminContasService(Number(companyId));
  return res.json(result);
};
