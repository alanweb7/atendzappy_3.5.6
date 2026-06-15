import { Request, Response } from "express";
import { google } from "googleapis";
import { CheckCompanySetting } from "../helpers/CheckSettings";
import CompanyGoogleSheetsToken from "../models/CompanyGoogleSheetsToken";
import CompanyConnectedSheet from "../models/CompanyConnectedSheet";
import logger from "../utils/logger";

const SHEETS_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.readonly",
  "openid",
  "email",
  "profile"
];

const getSheetsRedirectUri = () =>
  process.env.GOOGLE_SHEETS_REDIRECT_URI ||
  `${process.env.BACKEND_URL}/google-sheets/oauth-callback`;

const createSheetsOAuth2Client = async (companyId: number) => {
  let clientId = process.env.GOOGLE_CLIENT_ID as string;
  let clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
  try {
    const sid = await CheckCompanySetting(companyId, "googleClientId", "");
    const ss = await CheckCompanySetting(companyId, "googleClientSecret", "");
    if (sid) clientId = sid;
    if (ss) clientSecret = ss;
  } catch { }
  return new google.auth.OAuth2(clientId, clientSecret, getSheetsRedirectUri());
};

const getTokenForSheet = async (companyId: number, tokenId?: number) => {
  if (tokenId) return CompanyGoogleSheetsToken.findOne({ where: { id: tokenId, companyId } });
  return CompanyGoogleSheetsToken.findOne({ where: { companyId } });
};

// GET /google-sheets/auth-url
export const getAuthUrl = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  try {
    const oauth2Client = await createSheetsOAuth2Client(companyId);
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SHEETS_SCOPES,
      state: `${req.user.id}-${companyId}`,
      prompt: "consent"
    });
    return res.json({ url });
  } catch (err: any) {
    logger.error("[GoogleSheets] getAuthUrl:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao gerar URL de autenticação" });
  }
};

// GET /google-sheets/oauth-callback
export const oauthCallback = async (req: Request, res: Response): Promise<void> => {
  const frontendUrl = process.env.FRONTEND_URL || "";
  try {
    const { code, state } = req.query as Record<string, string>;
    if (!code || !state) {
      res.redirect(`${frontendUrl}/planilhas?sheets-error=missing-params`);
      return;
    }

    const parts = state.split("-");
    const companyId = Number(parts[parts.length - 1]);
    const oauth2Client = await createSheetsOAuth2Client(companyId);
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    // Permite múltiplas contas — atualiza se já existe para este googleUserId
    const existing = await CompanyGoogleSheetsToken.findOne({
      where: { companyId, googleUserId: userInfo.id || "" }
    });

    if (existing) {
      await existing.update({
        email: userInfo.email || "",
        accessToken: tokens.access_token || existing.accessToken,
        refreshToken: tokens.refresh_token || existing.refreshToken,
        expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : existing.expiryDate
      });
    } else {
      await CompanyGoogleSheetsToken.create({
        companyId,
        googleUserId: userInfo.id || "",
        email: userInfo.email || "",
        accessToken: tokens.access_token || "",
        refreshToken: tokens.refresh_token || "",
        expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null
      });
    }

    res.redirect(`${frontendUrl}/planilhas?sheets-success=true`);
  } catch (err: any) {
    logger.error("[GoogleSheets] oauthCallback:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    res.redirect(`${process.env.FRONTEND_URL}/planilhas?sheets-error=oauth-failed`);
  }
};

// GET /google-sheets/status
export const getStatus = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  try {
    const tokens = await CompanyGoogleSheetsToken.findAll({ where: { companyId } });
    const sheets = await CompanyConnectedSheet.findAll({ where: { companyId, active: true } });
    return res.json({
      connected: tokens.length > 0,
      accounts: tokens.map(t => ({ id: t.id, email: t.email, googleUserId: t.googleUserId })),
      sheets
    });
  } catch (err: any) {
    logger.error("[GoogleSheets] getStatus:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao buscar status" });
  }
};

// DELETE /google-sheets/accounts/:id — desconecta uma conta específica
export const disconnectAccount = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;
  try {
    await CompanyConnectedSheet.destroy({ where: { companyId, tokenId: id } });
    await CompanyGoogleSheetsToken.destroy({ where: { id, companyId } });
    return res.json({ message: "Conta desconectada" });
  } catch {
    return res.status(500).json({ error: "Erro ao desconectar conta" });
  }
};

// DELETE /google-sheets/disconnect
export const disconnect = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  try {
    await CompanyConnectedSheet.destroy({ where: { companyId } });
    await CompanyGoogleSheetsToken.destroy({ where: { companyId } });
    return res.json({ message: "Desconectado com sucesso" });
  } catch {
    return res.status(500).json({ error: "Erro ao desconectar" });
  }
};

// GET /google-sheets/drive-sheets?tokenId=X
export const listDriveSheets = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { tokenId } = req.query as { tokenId?: string };
  try {
    const token = await getTokenForSheet(companyId, tokenId ? Number(tokenId) : undefined);
    if (!token) return res.status(400).json({ error: "Conta Google não conectada" });

    const oauth2Client = await createSheetsOAuth2Client(companyId);
    oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const { data } = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
      fields: "files(id,name,modifiedTime,webViewLink)",
      orderBy: "modifiedTime desc",
      pageSize: 50
    });
    return res.json(data.files || []);
  } catch (err: any) {
    logger.error("[GoogleSheets] listDriveSheets:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao listar planilhas do Drive" });
  }
};

// POST /google-sheets/sheets
export const addSheet = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { spreadsheetUrl, title, tokenId } = req.body;
  if (!spreadsheetUrl) return res.status(400).json({ error: "URL da planilha obrigatória" });

  try {
    const match = (spreadsheetUrl as string).match(/\/d\/([a-zA-Z0-9_-]+)/);
    const spreadsheetId = match ? match[1] : (spreadsheetUrl as string).trim();
    if (!spreadsheetId) return res.status(400).json({ error: "URL inválida" });

    const token = await getTokenForSheet(companyId, tokenId ? Number(tokenId) : undefined);
    if (!token) return res.status(400).json({ error: "Conta Google não conectada" });

    const existing = await CompanyConnectedSheet.findOne({ where: { companyId, spreadsheetId } });
    if (existing) return res.status(400).json({ error: "Esta planilha já está conectada" });

    const oauth2Client = await createSheetsOAuth2Client(companyId);
    oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });

    const sheetsApi = google.sheets({ version: "v4", auth: oauth2Client });
    let sheetTitle = title || spreadsheetId;
    let firstSheetName = "Plan1";

    try {
      const meta = await sheetsApi.spreadsheets.get({ spreadsheetId, fields: "properties,sheets.properties" });
      sheetTitle = title || meta.data.properties?.title || spreadsheetId;
      firstSheetName = meta.data.sheets?.[0]?.properties?.title || "Plan1";
    } catch { }

    const sheet = await CompanyConnectedSheet.create({
      companyId, tokenId: token.id, spreadsheetId,
      title: sheetTitle, sheetName: firstSheetName, active: true
    });

    return res.status(201).json(sheet);
  } catch (err: any) {
    logger.error("[GoogleSheets] addSheet:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao adicionar planilha" });
  }
};

// POST /google-sheets/create
export const createSpreadsheet = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { title, tokenId } = req.body;
  if (!title) return res.status(400).json({ error: "Título obrigatório" });

  try {
    const token = await getTokenForSheet(companyId, tokenId ? Number(tokenId) : undefined);
    if (!token) return res.status(400).json({ error: "Conta Google não conectada" });

    const oauth2Client = await createSheetsOAuth2Client(companyId);
    oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });

    const sheetsApi = google.sheets({ version: "v4", auth: oauth2Client });
    const { data } = await sheetsApi.spreadsheets.create({
      requestBody: { properties: { title }, sheets: [{ properties: { title: "Plan1" } }] }
    });

    const sheet = await CompanyConnectedSheet.create({
      companyId, tokenId: token.id,
      spreadsheetId: data.spreadsheetId,
      title: data.properties?.title || title,
      sheetName: "Plan1", active: true
    });

    return res.status(201).json({
      sheet,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}`
    });
  } catch (err: any) {
    logger.error("[GoogleSheets] createSpreadsheet:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao criar planilha" });
  }
};

// POST /google-sheets/import-file — importa CSV/XLSX sem precisar de conta Google
export const importFile = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { title } = req.body;
  const file = (req as any).file;
  if (!file) return res.status(400).json({ error: "Arquivo obrigatório" });

  try {
    const sheet = await CompanyConnectedSheet.create({
      companyId,
      tokenId: null,
      spreadsheetId: `local_${Date.now()}`,
      title: title || file.originalname.replace(/\.[^.]+$/, ""),
      sheetName: "Plan1",
      active: true
    });
    return res.status(201).json(sheet);
  } catch (err: any) {
    logger.error("[GoogleSheets] importFile:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao importar arquivo" });
  }
};

// DELETE /google-sheets/sheets/:id
export const removeSheet = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;
  try {
    await CompanyConnectedSheet.destroy({ where: { id, companyId } });
    return res.json({ message: "Planilha removida" });
  } catch {
    return res.status(500).json({ error: "Erro ao remover planilha" });
  }
};

// PUT /google-sheets/sheets/:id
export const updateSheet = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;
  const { title, sheetName } = req.body;
  try {
    const sheet = await CompanyConnectedSheet.findOne({ where: { id, companyId } });
    if (!sheet) return res.status(404).json({ error: "Planilha não encontrada" });
    await sheet.update({ ...(title && { title }), ...(sheetName && { sheetName }) });
    return res.json(sheet);
  } catch {
    return res.status(500).json({ error: "Erro ao atualizar planilha" });
  }
};

// GET /google-sheets/sheets/:id/tabs
export const listTabs = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;
  try {
    const sheet = await CompanyConnectedSheet.findOne({ where: { id, companyId } });
    if (!sheet) return res.status(404).json({ error: "Planilha não encontrada" });
    if (!sheet.tokenId) return res.json([{ id: 0, title: sheet.sheetName, index: 0 }]);

    const token = await CompanyGoogleSheetsToken.findOne({ where: { id: sheet.tokenId, companyId } });
    if (!token) return res.status(400).json({ error: "Conta Google não encontrada" });

    const oauth2Client = await createSheetsOAuth2Client(companyId);
    oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });

    const sheetsApi = google.sheets({ version: "v4", auth: oauth2Client });
    const meta = await sheetsApi.spreadsheets.get({ spreadsheetId: sheet.spreadsheetId, fields: "sheets.properties" });
    return res.json((meta.data.sheets || []).map(s => ({
      id: s.properties?.sheetId, title: s.properties?.title, index: s.properties?.index
    })));
  } catch (err: any) {
    logger.error("[GoogleSheets] listTabs:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao listar abas" });
  }
};

// GET /google-sheets/sheets/:id/preview
export const previewSheet = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { id } = req.params;
  const { tab } = req.query as { tab?: string };
  try {
    const sheet = await CompanyConnectedSheet.findOne({ where: { id, companyId } });
    if (!sheet) return res.status(404).json({ error: "Planilha não encontrada" });
    if (!sheet.tokenId) return res.json({ values: [], tabName: sheet.sheetName });

    const token = await CompanyGoogleSheetsToken.findOne({ where: { id: sheet.tokenId, companyId } });
    if (!token) return res.status(400).json({ error: "Conta Google não encontrada" });

    const oauth2Client = await createSheetsOAuth2Client(companyId);
    oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });

    const sheetsApi = google.sheets({ version: "v4", auth: oauth2Client });
    const tabName = tab || sheet.sheetName;
    const { data } = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: sheet.spreadsheetId,
      range: `${tabName}!A1:Z10`
    });
    return res.json({ values: data.values || [], tabName });
  } catch (err: any) {
    logger.error("[GoogleSheets] previewSheet:", err?.message || err?.errors?.[0]?.message || JSON.stringify(err?.response?.data || err));
    return res.status(500).json({ error: "Erro ao carregar prévia" });
  }
};
