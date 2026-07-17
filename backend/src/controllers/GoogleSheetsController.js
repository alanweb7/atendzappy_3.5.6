"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.previewSheet = exports.listTabs = exports.updateSheet = exports.removeSheet = exports.importFile = exports.createSpreadsheet = exports.addSheet = exports.listDriveSheets = exports.disconnect = exports.disconnectAccount = exports.getStatus = exports.oauthCallback = exports.getAuthUrl = void 0;
var googleapis_1 = require("googleapis");
var CheckSettings_1 = require("../helpers/CheckSettings");
var CompanyGoogleSheetsToken_1 = __importDefault(require("../models/CompanyGoogleSheetsToken"));
var CompanyConnectedSheet_1 = __importDefault(require("../models/CompanyConnectedSheet"));
var logger_1 = __importDefault(require("../utils/logger"));
var SHEETS_SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly",
    "openid",
    "email",
    "profile"
];
var getSheetsRedirectUri = function () {
    return process.env.GOOGLE_SHEETS_REDIRECT_URI ||
        "".concat(process.env.BACKEND_URL, "/google-sheets/oauth-callback");
};
var createSheetsOAuth2Client = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, clientSecret, sid, ss, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                clientId = process.env.GOOGLE_CLIENT_ID;
                clientSecret = process.env.GOOGLE_CLIENT_SECRET;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, CheckSettings_1.CheckCompanySetting)(companyId, "googleClientId", "")];
            case 2:
                sid = _b.sent();
                return [4 /*yield*/, (0, CheckSettings_1.CheckCompanySetting)(companyId, "googleClientSecret", "")];
            case 3:
                ss = _b.sent();
                if (sid)
                    clientId = sid;
                if (ss)
                    clientSecret = ss;
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, new googleapis_1.google.auth.OAuth2(clientId, clientSecret, getSheetsRedirectUri())];
        }
    });
}); };
var getTokenForSheet = function (companyId, tokenId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (tokenId)
            return [2 /*return*/, CompanyGoogleSheetsToken_1["default"].findOne({ where: { id: tokenId, companyId: companyId } })];
        return [2 /*return*/, CompanyGoogleSheetsToken_1["default"].findOne({ where: { companyId: companyId } })];
    });
}); };
// GET /google-sheets/auth-url
var getAuthUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, oauth2Client, url, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 2:
                oauth2Client = _d.sent();
                url = oauth2Client.generateAuthUrl({
                    access_type: "offline",
                    scope: SHEETS_SCOPES,
                    state: "".concat(req.user.id, "-").concat(companyId),
                    prompt: "consent"
                });
                return [2 /*return*/, res.json({ url: url })];
            case 3:
                err_1 = _d.sent();
                logger_1["default"].error("[GoogleSheets] getAuthUrl:", (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || ((_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || JSON.stringify(((_c = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _c === void 0 ? void 0 : _c.data) || err_1));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao gerar URL de autenticação" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAuthUrl = getAuthUrl;
// GET /google-sheets/oauth-callback
var oauthCallback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var frontendUrl, _a, code, state, parts, companyId, oauth2Client, tokens, oauth2, userInfo, existing, err_2;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                frontendUrl = process.env.FRONTEND_URL || "";
                _e.label = 1;
            case 1:
                _e.trys.push([1, 10, , 11]);
                _a = req.query, code = _a.code, state = _a.state;
                if (!code || !state) {
                    res.redirect("".concat(frontendUrl, "/planilhas?sheets-error=missing-params"));
                    return [2 /*return*/];
                }
                parts = state.split("-");
                companyId = Number(parts[parts.length - 1]);
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 2:
                oauth2Client = _e.sent();
                return [4 /*yield*/, oauth2Client.getToken(code)];
            case 3:
                tokens = (_e.sent()).tokens;
                oauth2Client.setCredentials(tokens);
                oauth2 = googleapis_1.google.oauth2({ version: "v2", auth: oauth2Client });
                return [4 /*yield*/, oauth2.userinfo.get()];
            case 4:
                userInfo = (_e.sent()).data;
                return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].findOne({
                        where: { companyId: companyId, googleUserId: userInfo.id || "" }
                    })];
            case 5:
                existing = _e.sent();
                if (!existing) return [3 /*break*/, 7];
                return [4 /*yield*/, existing.update({
                        email: userInfo.email || "",
                        accessToken: tokens.access_token || existing.accessToken,
                        refreshToken: tokens.refresh_token || existing.refreshToken,
                        expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : existing.expiryDate
                    })];
            case 6:
                _e.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].create({
                    companyId: companyId,
                    googleUserId: userInfo.id || "",
                    email: userInfo.email || "",
                    accessToken: tokens.access_token || "",
                    refreshToken: tokens.refresh_token || "",
                    expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null
                })];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9:
                res.redirect("".concat(frontendUrl, "/planilhas?sheets-success=true"));
                return [3 /*break*/, 11];
            case 10:
                err_2 = _e.sent();
                logger_1["default"].error("[GoogleSheets] oauthCallback:", (err_2 === null || err_2 === void 0 ? void 0 : err_2.message) || ((_c = (_b = err_2 === null || err_2 === void 0 ? void 0 : err_2.errors) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) || JSON.stringify(((_d = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _d === void 0 ? void 0 : _d.data) || err_2));
                res.redirect("".concat(process.env.FRONTEND_URL, "/planilhas?sheets-error=oauth-failed"));
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.oauthCallback = oauthCallback;
// GET /google-sheets/status
var getStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, tokens, sheets, err_3;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].findAll({ where: { companyId: companyId } })];
            case 2:
                tokens = _d.sent();
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].findAll({ where: { companyId: companyId, active: true } })];
            case 3:
                sheets = _d.sent();
                return [2 /*return*/, res.json({
                        connected: tokens.length > 0,
                        accounts: tokens.map(function (t) { return ({ id: t.id, email: t.email, googleUserId: t.googleUserId }); }),
                        sheets: sheets
                    })];
            case 4:
                err_3 = _d.sent();
                logger_1["default"].error("[GoogleSheets] getStatus:", (err_3 === null || err_3 === void 0 ? void 0 : err_3.message) || ((_b = (_a = err_3 === null || err_3 === void 0 ? void 0 : err_3.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || JSON.stringify(((_c = err_3 === null || err_3 === void 0 ? void 0 : err_3.response) === null || _c === void 0 ? void 0 : _c.data) || err_3));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao buscar status" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getStatus = getStatus;
// DELETE /google-sheets/accounts/:id — desconecta uma conta específica
var disconnectAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].destroy({ where: { companyId: companyId, tokenId: id } })];
            case 2:
                _b.sent();
                return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].destroy({ where: { id: id, companyId: companyId } })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ message: "Conta desconectada" })];
            case 4:
                _a = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao desconectar conta" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.disconnectAccount = disconnectAccount;
// DELETE /google-sheets/disconnect
var disconnect = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].destroy({ where: { companyId: companyId } })];
            case 2:
                _b.sent();
                return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].destroy({ where: { companyId: companyId } })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ message: "Desconectado com sucesso" })];
            case 4:
                _a = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao desconectar" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.disconnect = disconnect;
// GET /google-sheets/drive-sheets?tokenId=X
var listDriveSheets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, tokenId, token, oauth2Client, drive, data, err_4;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                tokenId = req.query.tokenId;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getTokenForSheet(companyId, tokenId ? Number(tokenId) : undefined)];
            case 2:
                token = _d.sent();
                if (!token)
                    return [2 /*return*/, res.status(400).json({ error: "Conta Google não conectada" })];
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 3:
                oauth2Client = _d.sent();
                oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });
                drive = googleapis_1.google.drive({ version: "v3", auth: oauth2Client });
                return [4 /*yield*/, drive.files.list({
                        q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
                        fields: "files(id,name,modifiedTime,webViewLink)",
                        orderBy: "modifiedTime desc",
                        pageSize: 50
                    })];
            case 4:
                data = (_d.sent()).data;
                return [2 /*return*/, res.json(data.files || [])];
            case 5:
                err_4 = _d.sent();
                logger_1["default"].error("[GoogleSheets] listDriveSheets:", (err_4 === null || err_4 === void 0 ? void 0 : err_4.message) || ((_b = (_a = err_4 === null || err_4 === void 0 ? void 0 : err_4.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || JSON.stringify(((_c = err_4 === null || err_4 === void 0 ? void 0 : err_4.response) === null || _c === void 0 ? void 0 : _c.data) || err_4));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao listar planilhas do Drive" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.listDriveSheets = listDriveSheets;
// POST /google-sheets/sheets
var addSheet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, spreadsheetUrl, title, tokenId, match, spreadsheetId, token, existing, oauth2Client, sheetsApi, sheetTitle, firstSheetName, meta, _b, sheet, err_5;
    var _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, spreadsheetUrl = _a.spreadsheetUrl, title = _a.title, tokenId = _a.tokenId;
                if (!spreadsheetUrl)
                    return [2 /*return*/, res.status(400).json({ error: "URL da planilha obrigatória" })];
                _k.label = 1;
            case 1:
                _k.trys.push([1, 10, , 11]);
                match = spreadsheetUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                spreadsheetId = match ? match[1] : spreadsheetUrl.trim();
                if (!spreadsheetId)
                    return [2 /*return*/, res.status(400).json({ error: "URL inválida" })];
                return [4 /*yield*/, getTokenForSheet(companyId, tokenId ? Number(tokenId) : undefined)];
            case 2:
                token = _k.sent();
                if (!token)
                    return [2 /*return*/, res.status(400).json({ error: "Conta Google não conectada" })];
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].findOne({ where: { companyId: companyId, spreadsheetId: spreadsheetId } })];
            case 3:
                existing = _k.sent();
                if (existing)
                    return [2 /*return*/, res.status(400).json({ error: "Esta planilha já está conectada" })];
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 4:
                oauth2Client = _k.sent();
                oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });
                sheetsApi = googleapis_1.google.sheets({ version: "v4", auth: oauth2Client });
                sheetTitle = title || spreadsheetId;
                firstSheetName = "Plan1";
                _k.label = 5;
            case 5:
                _k.trys.push([5, 7, , 8]);
                return [4 /*yield*/, sheetsApi.spreadsheets.get({ spreadsheetId: spreadsheetId, fields: "properties,sheets.properties" })];
            case 6:
                meta = _k.sent();
                sheetTitle = title || ((_c = meta.data.properties) === null || _c === void 0 ? void 0 : _c.title) || spreadsheetId;
                firstSheetName = ((_f = (_e = (_d = meta.data.sheets) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.properties) === null || _f === void 0 ? void 0 : _f.title) || "Plan1";
                return [3 /*break*/, 8];
            case 7:
                _b = _k.sent();
                return [3 /*break*/, 8];
            case 8: return [4 /*yield*/, CompanyConnectedSheet_1["default"].create({
                    companyId: companyId,
                    tokenId: token.id,
                    spreadsheetId: spreadsheetId,
                    title: sheetTitle, sheetName: firstSheetName, active: true
                })];
            case 9:
                sheet = _k.sent();
                return [2 /*return*/, res.status(201).json(sheet)];
            case 10:
                err_5 = _k.sent();
                logger_1["default"].error("[GoogleSheets] addSheet:", (err_5 === null || err_5 === void 0 ? void 0 : err_5.message) || ((_h = (_g = err_5 === null || err_5 === void 0 ? void 0 : err_5.errors) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.message) || JSON.stringify(((_j = err_5 === null || err_5 === void 0 ? void 0 : err_5.response) === null || _j === void 0 ? void 0 : _j.data) || err_5));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao adicionar planilha" })];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.addSheet = addSheet;
// POST /google-sheets/create
var createSpreadsheet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, title, tokenId, token, oauth2Client, sheetsApi, data, sheet, err_6;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, title = _a.title, tokenId = _a.tokenId;
                if (!title)
                    return [2 /*return*/, res.status(400).json({ error: "Título obrigatório" })];
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, , 7]);
                return [4 /*yield*/, getTokenForSheet(companyId, tokenId ? Number(tokenId) : undefined)];
            case 2:
                token = _f.sent();
                if (!token)
                    return [2 /*return*/, res.status(400).json({ error: "Conta Google não conectada" })];
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 3:
                oauth2Client = _f.sent();
                oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });
                sheetsApi = googleapis_1.google.sheets({ version: "v4", auth: oauth2Client });
                return [4 /*yield*/, sheetsApi.spreadsheets.create({
                        requestBody: { properties: { title: title }, sheets: [{ properties: { title: "Plan1" } }] }
                    })];
            case 4:
                data = (_f.sent()).data;
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].create({
                        companyId: companyId,
                        tokenId: token.id,
                        spreadsheetId: data.spreadsheetId,
                        title: ((_b = data.properties) === null || _b === void 0 ? void 0 : _b.title) || title,
                        sheetName: "Plan1", active: true
                    })];
            case 5:
                sheet = _f.sent();
                return [2 /*return*/, res.status(201).json({
                        sheet: sheet,
                        spreadsheetUrl: "https://docs.google.com/spreadsheets/d/".concat(data.spreadsheetId)
                    })];
            case 6:
                err_6 = _f.sent();
                logger_1["default"].error("[GoogleSheets] createSpreadsheet:", (err_6 === null || err_6 === void 0 ? void 0 : err_6.message) || ((_d = (_c = err_6 === null || err_6 === void 0 ? void 0 : err_6.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) || JSON.stringify(((_e = err_6 === null || err_6 === void 0 ? void 0 : err_6.response) === null || _e === void 0 ? void 0 : _e.data) || err_6));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao criar planilha" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createSpreadsheet = createSpreadsheet;
// POST /google-sheets/import-file — importa CSV/XLSX sem precisar de conta Google
var importFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, title, file, sheet, err_7;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                title = req.body.title;
                file = req.file;
                if (!file)
                    return [2 /*return*/, res.status(400).json({ error: "Arquivo obrigatório" })];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].create({
                        companyId: companyId,
                        tokenId: null,
                        spreadsheetId: "local_".concat(Date.now()),
                        title: title || file.originalname.replace(/\.[^.]+$/, ""),
                        sheetName: "Plan1",
                        active: true
                    })];
            case 2:
                sheet = _d.sent();
                return [2 /*return*/, res.status(201).json(sheet)];
            case 3:
                err_7 = _d.sent();
                logger_1["default"].error("[GoogleSheets] importFile:", (err_7 === null || err_7 === void 0 ? void 0 : err_7.message) || ((_b = (_a = err_7 === null || err_7 === void 0 ? void 0 : err_7.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || JSON.stringify(((_c = err_7 === null || err_7 === void 0 ? void 0 : err_7.response) === null || _c === void 0 ? void 0 : _c.data) || err_7));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao importar arquivo" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.importFile = importFile;
// DELETE /google-sheets/sheets/:id
var removeSheet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].destroy({ where: { id: id, companyId: companyId } })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ message: "Planilha removida" })];
            case 3:
                _a = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao remover planilha" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeSheet = removeSheet;
// PUT /google-sheets/sheets/:id
var updateSheet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a, title, sheetName, sheet, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _a = req.body, title = _a.title, sheetName = _a.sheetName;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 2:
                sheet = _c.sent();
                if (!sheet)
                    return [2 /*return*/, res.status(404).json({ error: "Planilha não encontrada" })];
                return [4 /*yield*/, sheet.update(__assign(__assign({}, (title && { title: title })), (sheetName && { sheetName: sheetName })))];
            case 3:
                _c.sent();
                return [2 /*return*/, res.json(sheet)];
            case 4:
                _b = _c.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao atualizar planilha" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateSheet = updateSheet;
// GET /google-sheets/sheets/:id/tabs
var listTabs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, sheet, token, oauth2Client, sheetsApi, meta, err_8;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, , 7]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 2:
                sheet = _d.sent();
                if (!sheet)
                    return [2 /*return*/, res.status(404).json({ error: "Planilha não encontrada" })];
                if (!sheet.tokenId)
                    return [2 /*return*/, res.json([{ id: 0, title: sheet.sheetName, index: 0 }])];
                return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].findOne({ where: { id: sheet.tokenId, companyId: companyId } })];
            case 3:
                token = _d.sent();
                if (!token)
                    return [2 /*return*/, res.status(400).json({ error: "Conta Google não encontrada" })];
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 4:
                oauth2Client = _d.sent();
                oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });
                sheetsApi = googleapis_1.google.sheets({ version: "v4", auth: oauth2Client });
                return [4 /*yield*/, sheetsApi.spreadsheets.get({ spreadsheetId: sheet.spreadsheetId, fields: "sheets.properties" })];
            case 5:
                meta = _d.sent();
                return [2 /*return*/, res.json((meta.data.sheets || []).map(function (s) {
                        var _a, _b, _c;
                        return ({
                            id: (_a = s.properties) === null || _a === void 0 ? void 0 : _a.sheetId, title: (_b = s.properties) === null || _b === void 0 ? void 0 : _b.title, index: (_c = s.properties) === null || _c === void 0 ? void 0 : _c.index
                        });
                    }))];
            case 6:
                err_8 = _d.sent();
                logger_1["default"].error("[GoogleSheets] listTabs:", (err_8 === null || err_8 === void 0 ? void 0 : err_8.message) || ((_b = (_a = err_8 === null || err_8 === void 0 ? void 0 : err_8.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || JSON.stringify(((_c = err_8 === null || err_8 === void 0 ? void 0 : err_8.response) === null || _c === void 0 ? void 0 : _c.data) || err_8));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao listar abas" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.listTabs = listTabs;
// GET /google-sheets/sheets/:id/preview
var previewSheet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, tab, sheet, token, oauth2Client, sheetsApi, tabName, data, err_9;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                tab = req.query.tab;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, , 7]);
                return [4 /*yield*/, CompanyConnectedSheet_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 2:
                sheet = _d.sent();
                if (!sheet)
                    return [2 /*return*/, res.status(404).json({ error: "Planilha não encontrada" })];
                if (!sheet.tokenId)
                    return [2 /*return*/, res.json({ values: [], tabName: sheet.sheetName })];
                return [4 /*yield*/, CompanyGoogleSheetsToken_1["default"].findOne({ where: { id: sheet.tokenId, companyId: companyId } })];
            case 3:
                token = _d.sent();
                if (!token)
                    return [2 /*return*/, res.status(400).json({ error: "Conta Google não encontrada" })];
                return [4 /*yield*/, createSheetsOAuth2Client(companyId)];
            case 4:
                oauth2Client = _d.sent();
                oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });
                sheetsApi = googleapis_1.google.sheets({ version: "v4", auth: oauth2Client });
                tabName = tab || sheet.sheetName;
                return [4 /*yield*/, sheetsApi.spreadsheets.values.get({
                        spreadsheetId: sheet.spreadsheetId,
                        range: "".concat(tabName, "!A1:Z10")
                    })];
            case 5:
                data = (_d.sent()).data;
                return [2 /*return*/, res.json({ values: data.values || [], tabName: tabName })];
            case 6:
                err_9 = _d.sent();
                logger_1["default"].error("[GoogleSheets] previewSheet:", (err_9 === null || err_9 === void 0 ? void 0 : err_9.message) || ((_b = (_a = err_9 === null || err_9 === void 0 ? void 0 : err_9.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || JSON.stringify(((_c = err_9 === null || err_9 === void 0 ? void 0 : err_9.response) === null || _c === void 0 ? void 0 : _c.data) || err_9));
                return [2 /*return*/, res.status(500).json({ error: "Erro ao carregar prévia" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.previewSheet = previewSheet;
