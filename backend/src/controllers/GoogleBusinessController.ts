import { Request, Response } from "express";
import axios from "axios";
import GoogleBusinessAccount from "../models/GoogleBusinessAccount";
import { getWhitelabelConfig } from "../services/SettingService/WhitelabelService";
import logger from "../utils/logger";

const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_BUSINESS_BASE = "https://mybusinessaccountmanagement.googleapis.com/v1";
const GOOGLE_MYBUSINESS_BASE = "https://mybusiness.googleapis.com/v4";
const GOOGLE_REVIEWS_BASE = "https://mybusinessreviews.googleapis.com/v1";
const GOOGLE_POSTS_BASE = "https://mybusinessnotifications.googleapis.com/v1";

const SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
  "https://www.googleapis.com/auth/plus.business.manage"
].join(" ");

// ────────── OAuth ──────────

export const getOAuthUrl = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const config = await getWhitelabelConfig(Number(companyId));
  const clientId = config.googleClientId;

  if (!clientId) {
    return res.status(400).json({ error: "Google Client ID não configurado. Configure em Configurações → Whitelabel → Google." });
  }

  const backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
  const redirectUri = `${backendUrl}/google-business-callback`;

  const url = `${GOOGLE_OAUTH_URL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(SCOPES)}&response_type=code&access_type=offline&prompt=consent&state=${companyId}`;
  return res.json({ url });
};

export const callback = async (req: Request, res: Response): Promise<void> => {
  const frontendUrl = process.env.FRONTEND_URL;
  try {
    const { code, state, error } = req.query as any;

    if (error || !code || !state) {
      res.redirect(`${frontendUrl}/marketing/google-meu-negocio?error=oauth-denied`);
      return;
    }

    const companyId = parseInt(state, 10);
    const config = await getWhitelabelConfig(companyId);
    const clientId = config.googleClientId;
    const clientSecret = config.googleClientSecret;

    if (!clientId || !clientSecret) {
      res.redirect(`${frontendUrl}/marketing/google-meu-negocio?error=not-configured`);
      return;
    }

    const backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
    const redirectUri = `${backendUrl}/google-business-callback`;

    // Trocar code por tokens
    const tokenRes = await axios.post(GOOGLE_TOKEN_URL, {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });

    const { access_token, refresh_token, expires_in } = tokenRes.data;
    const tokenExpiry = new Date(Date.now() + expires_in * 1000);

    // Buscar contas do Business Profile
    const accountsRes = await axios.get(`${GOOGLE_BUSINESS_BASE}/accounts`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const accounts = accountsRes.data.accounts || [];
    if (accounts.length === 0) {
      res.redirect(`${frontendUrl}/marketing/google-meu-negocio?error=no-accounts`);
      return;
    }

    // Usar a primeira conta (ou criar múltiplos registros)
    for (const account of accounts) {
      // Buscar localizações da conta
      let locationId = null;
      let locationName = null;
      try {
        const locRes = await axios.get(`${GOOGLE_BUSINESS_BASE}/${account.name}/locations`, {
          headers: { Authorization: `Bearer ${access_token}` }
        });
        const locations = locRes.data.locations || [];
        if (locations[0]) {
          locationId = locations[0].name;
          locationName = locations[0].title || locations[0].name;
        }
      } catch {
        // localização opcional
      }

      // Verificar se já existe conexão para essa conta
      const existing = await GoogleBusinessAccount.findOne({
        where: { companyId, accountId: account.name }
      });

      if (existing) {
        await existing.update({ accessToken: access_token, refreshToken: refresh_token, tokenExpiry, status: "CONNECTED", locationId, locationName });
      } else {
        await GoogleBusinessAccount.create({
          companyId,
          name: account.accountName || account.name,
          accountId: account.name,
          locationId,
          locationName,
          accessToken: access_token,
          refreshToken: refresh_token,
          tokenExpiry,
          status: "CONNECTED"
        });
      }
    }

    res.redirect(`${frontendUrl}/marketing/google-meu-negocio?success=connected`);
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    const errStatus = err?.response?.status;
    const errData = JSON.stringify(err?.response?.data);
    logger.error(`[GoogleBusiness] callback error: ${errMsg} | status=${errStatus} | data=${errData}`);
    const frontendUrl = process.env.FRONTEND_URL;
    res.redirect(`${frontendUrl}/marketing/google-meu-negocio?error=oauth-failed`);
  }
};

// ────────── Accounts ──────────

export const listAccounts = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const accounts = await GoogleBusinessAccount.findAll({ where: { companyId } });
  return res.json(accounts);
};

export const deleteAccount = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;
  await GoogleBusinessAccount.destroy({ where: { id, companyId } });
  return res.status(204).send();
};

// ────────── Helper: token válido ──────────

const getValidToken = async (account: GoogleBusinessAccount, companyId: number): Promise<string> => {
  if (account.tokenExpiry && new Date() < account.tokenExpiry) {
    return account.accessToken;
  }
  // Renovar token
  const config = await getWhitelabelConfig(companyId);
  const tokenRes = await axios.post(GOOGLE_TOKEN_URL, {
    refresh_token: account.refreshToken,
    client_id: config.googleClientId || process.env.GOOGLE_CLIENT_ID,
    client_secret: config.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "refresh_token"
  });
  const { access_token, expires_in } = tokenRes.data;
  await account.update({
    accessToken: access_token,
    tokenExpiry: new Date(Date.now() + expires_in * 1000)
  });
  return access_token;
};

// ────────── Reviews ──────────

export const listReviews = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId } = req.params;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const locationName = account.locationId || `${account.accountId}/locations`;
    const r = await axios.get(`https://mybusiness.googleapis.com/v4/${locationName}/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao buscar avaliações" });
  }
};

export const replyReview = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId, reviewId } = req.params;
  const { comment } = req.body;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const r = await axios.put(
      `https://mybusiness.googleapis.com/v4/${account.locationId}/reviews/${reviewId}/reply`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao responder avaliação" });
  }
};

// ────────── Metrics / Insights ──────────

export const getMetrics = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId } = req.params;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account || !account.locationId) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const endTime = new Date().toISOString();
    const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const r = await axios.post(
      `https://businessprofileperformance.googleapis.com/v1/${account.locationId}:fetchMultiDailyMetricsTimeSeries`,
      {
        dailyMetric: ["WEBSITE_CLICKS", "CALL_CLICKS", "BUSINESS_DIRECTION_REQUESTS", "BUSINESS_IMPRESSIONS_DESKTOP_MAPS", "BUSINESS_IMPRESSIONS_MOBILE_MAPS"],
        dailyRange: { startDate: { year: new Date(startTime).getFullYear(), month: new Date(startTime).getMonth() + 1, day: new Date(startTime).getDate() }, endDate: { year: new Date(endTime).getFullYear(), month: new Date(endTime).getMonth() + 1, day: new Date(endTime).getDate() } }
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao buscar métricas" });
  }
};

// ────────── Posts (Local Posts) ──────────

export const listPosts = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId } = req.params;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account || !account.locationId) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const r = await axios.get(
      `https://mybusiness.googleapis.com/v4/${account.locationId}/localPosts`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao buscar posts" });
  }
};

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId } = req.params;
  const { summary, callToActionType, callToActionUrl, mediaUrl } = req.body;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account || !account.locationId) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const postData: any = { languageCode: "pt-BR", summary, topicType: "STANDARD" };
    if (callToActionType && callToActionUrl) postData.callToAction = { actionType: callToActionType, url: callToActionUrl };
    if (mediaUrl) postData.media = [{ mediaFormat: "PHOTO", sourceUrl: mediaUrl }];

    const r = await axios.post(
      `https://mybusiness.googleapis.com/v4/${account.locationId}/localPosts`,
      postData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.status(201).json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao criar post" });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId, postName } = req.params;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    await axios.delete(
      `https://mybusiness.googleapis.com/v4/${postName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao excluir post" });
  }
};

// ────────── Business Info ──────────

export const getBusinessInfo = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId } = req.params;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account || !account.locationId) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const r = await axios.get(
      `https://mybusiness.googleapis.com/v4/${account.locationId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao buscar informações" });
  }
};

export const updateBusinessInfo = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { accountId } = req.params;
  const account = await GoogleBusinessAccount.findOne({ where: { id: accountId, companyId } });
  if (!account || !account.locationId) return res.status(404).json({ error: "Conta não encontrada" });

  try {
    const token = await getValidToken(account, Number(companyId));
    const { phoneNumbers, regularHours, websiteUri, profile } = req.body;
    const updateMask = Object.keys(req.body).join(",");

    const r = await axios.patch(
      `https://mybusiness.googleapis.com/v4/${account.locationId}?updateMask=${updateMask}`,
      { phoneNumbers, regularHours, websiteUri, profile },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.json(r.data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Erro ao atualizar informações" });
  }
};
