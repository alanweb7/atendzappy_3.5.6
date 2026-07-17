"use strict";
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
exports.unlinkCalendarFromSchedule = exports.linkCalendarToSchedule = exports.createFromCompanyIntegration = exports.disconnectUserIntegration = exports.getUserIntegration = exports.userOauthCallback = exports.getUserAuthUrl = void 0;
var googleCalendarClient_1 = require("../helpers/googleCalendarClient");
var CreateUserGoogleCalendarIntegrationService_1 = __importDefault(require("../services/UserGoogleCalendarServices/CreateUserGoogleCalendarIntegrationService"));
var GetUserGoogleCalendarIntegrationService_1 = __importDefault(require("../services/UserGoogleCalendarServices/GetUserGoogleCalendarIntegrationService"));
var DeleteUserGoogleCalendarIntegrationService_1 = __importDefault(require("../services/UserGoogleCalendarServices/DeleteUserGoogleCalendarIntegrationService"));
var LinkGoogleCalendarToScheduleService_1 = require("../services/UserGoogleCalendarServices/LinkGoogleCalendarToScheduleService");
var GoogleCalendarIntegration_1 = __importDefault(require("../models/GoogleCalendarIntegration"));
var SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "openid",
    "email",
    "profile"
];
var getUserAuthUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, state, url;
    return __generator(this, function (_a) {
        userId = req.user.id;
        companyId = req.user.companyId;
        if (!companyId) {
            return [2 /*return*/, res.status(400).json({ error: "User does not have companyId" })];
        }
        state = "".concat(userId, "-").concat(companyId);
        console.log("DEBUG Generated state:", state);
        url = (0, googleCalendarClient_1.getGoogleAuthUrl)(SCOPES, state);
        return [2 /*return*/, res.status(200).json({ url: url })];
    });
}); };
exports.getUserAuthUrl = getUserAuthUrl;
var userOauthCallback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, code, state, _b, userId, companyId, tokens, googleUserId, email, _c, payload, decoded, accessToken, refreshToken, expiryDate, redirectUrl, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.query, code = _a.code, state = _a.state;
                console.log("DEBUG OAuth Callback - code:", code ? "present" : "missing");
                console.log("DEBUG OAuth Callback - state:", state);
                console.log("DEBUG OAuth Callback - full query:", req.query);
                if (!code || typeof code !== "string") {
                    res.status(400).json({ error: "Missing code" });
                    return [2 /*return*/];
                }
                _b = state.split("-"), userId = _b[0], companyId = _b[1];
                console.log("DEBUG OAuth Callback - parsed userId:", userId);
                console.log("DEBUG OAuth Callback - parsed companyId:", companyId);
                if (!userId || !companyId) {
                    res.status(400).json({ error: "Missing userId or companyId in state" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, googleCalendarClient_1.getTokensFromCode)(code)];
            case 1:
                tokens = _d.sent();
                googleUserId = "";
                email = "";
                if (tokens.id_token) {
                    try {
                        _c = tokens.id_token.split("."), payload = _c[1];
                        decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
                        googleUserId = decoded.sub || "";
                        email = decoded.email || "";
                    }
                    catch (e) {
                        console.error("Erro ao decodificar id_token do Google", e);
                    }
                }
                accessToken = tokens.access_token;
                refreshToken = (tokens.refresh_token || "");
                expiryDate = tokens.expiry_date ? new Date(tokens.expiry_date) : null;
                return [4 /*yield*/, (0, CreateUserGoogleCalendarIntegrationService_1["default"])({
                        userId: Number(userId),
                        companyId: Number(companyId),
                        googleUserId: googleUserId,
                        email: email,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        expiryDate: expiryDate,
                        calendarId: "primary"
                    })];
            case 2:
                _d.sent();
                redirectUrl = process.env.FRONTEND_URL
                    ? "".concat(process.env.FRONTEND_URL, "/user-schedules?google-calendar-success=true")
                    : "/";
                res.redirect(redirectUrl);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _d.sent();
                console.error("Erro no userOauthCallback do Google Calendar", err_1);
                res.status(500).json({ error: "Erro ao integrar com Google Calendar" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userOauthCallback = userOauthCallback;
var getUserIntegration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, integration, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                console.log("DEBUG getUserIntegration - userId:", userId);
                return [4 /*yield*/, (0, GetUserGoogleCalendarIntegrationService_1["default"])(Number(userId))];
            case 1:
                integration = _a.sent();
                console.log("DEBUG getUserIntegration - integration:", integration);
                if (!integration) {
                    return [2 /*return*/, res.status(200).json(null)];
                }
                return [2 /*return*/, res.status(200).json({
                        id: integration.id,
                        email: integration.email,
                        calendarId: integration.calendarId,
                        active: integration.active,
                        lastSyncAt: integration.lastSyncAt
                    })];
            case 2:
                err_2 = _a.sent();
                console.error("DEBUG getUserIntegration - Erro:", err_2);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao buscar integração do usuário" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserIntegration = getUserIntegration;
var disconnectUserIntegration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                return [4 /*yield*/, (0, DeleteUserGoogleCalendarIntegrationService_1["default"])(Number(userId))];
            case 1:
                success = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: success })];
        }
    });
}); };
exports.disconnectUserIntegration = disconnectUserIntegration;
var createFromCompanyIntegration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, companyIntegration, userIntegration, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.user.id;
                companyId = req.user.companyId;
                console.log("DEBUG createFromCompanyIntegration - userId:", userId);
                console.log("DEBUG createFromCompanyIntegration - companyId:", companyId);
                return [4 /*yield*/, GoogleCalendarIntegration_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                companyIntegration = _a.sent();
                console.log("DEBUG createFromCompanyIntegration - companyIntegration:", companyIntegration);
                if (!companyIntegration) {
                    console.log("DEBUG createFromCompanyIntegration - Integração empresarial não encontrada");
                    return [2 /*return*/, res.status(400).json({ error: "Integração empresarial não encontrada" })];
                }
                // Criar integração para o usuário baseada na empresarial
                console.log("DEBUG createFromCompanyIntegration - Criando integração para usuário...");
                return [4 /*yield*/, (0, CreateUserGoogleCalendarIntegrationService_1["default"])({
                        userId: Number(userId),
                        companyId: Number(companyId),
                        googleUserId: companyIntegration.googleUserId,
                        email: companyIntegration.email,
                        accessToken: companyIntegration.accessToken,
                        refreshToken: companyIntegration.refreshToken,
                        expiryDate: companyIntegration.expiryDate,
                        calendarId: companyIntegration.calendarId
                    })];
            case 2:
                userIntegration = _a.sent();
                console.log("DEBUG createFromCompanyIntegration - Integração criada:", userIntegration);
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        integration: {
                            id: userIntegration.id,
                            email: userIntegration.email,
                            calendarId: userIntegration.calendarId
                        }
                    })];
            case 3:
                err_3 = _a.sent();
                console.error("DEBUG createFromCompanyIntegration - Erro:", err_3);
                return [2 /*return*/, res.status(400).json({
                        error: err_3.message || "Erro ao criar integração do usuário"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createFromCompanyIntegration = createFromCompanyIntegration;
var linkCalendarToSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, scheduleId, schedule, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                scheduleId = req.body.scheduleId;
                return [4 /*yield*/, (0, LinkGoogleCalendarToScheduleService_1.LinkGoogleCalendarToScheduleService)(Number(userId), Number(scheduleId))];
            case 1:
                schedule = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        schedule: {
                            id: schedule.id,
                            name: schedule.name,
                            googleCalendarIntegrationId: schedule.userGoogleCalendarIntegrationId
                        }
                    })];
            case 2:
                err_4 = _a.sent();
                console.error("Erro ao vincular Google Calendar à agenda:", err_4);
                return [2 /*return*/, res.status(400).json({
                        error: err_4.message || "Erro ao vincular Google Calendar à agenda"
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.linkCalendarToSchedule = linkCalendarToSchedule;
var unlinkCalendarFromSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, scheduleId, schedule, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                scheduleId = req.body.scheduleId;
                return [4 /*yield*/, (0, LinkGoogleCalendarToScheduleService_1.UnlinkGoogleCalendarFromScheduleService)(Number(userId), Number(scheduleId))];
            case 1:
                schedule = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        schedule: {
                            id: schedule.id,
                            name: schedule.name,
                            googleCalendarIntegrationId: schedule.userGoogleCalendarIntegrationId
                        }
                    })];
            case 2:
                err_5 = _a.sent();
                console.error("Erro ao desvincular Google Calendar da agenda:", err_5);
                return [2 /*return*/, res.status(400).json({
                        error: err_5.message || "Erro ao desvincular Google Calendar da agenda"
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unlinkCalendarFromSchedule = unlinkCalendarFromSchedule;
