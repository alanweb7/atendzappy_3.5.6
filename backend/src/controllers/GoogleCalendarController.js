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
exports.disconnectIntegration = exports.getIntegrations = exports.getIntegration = exports.oauthCallback = exports.getAuthUrl = void 0;
var googleCalendarClient_1 = require("../helpers/googleCalendarClient");
var UpsertIntegrationService_1 = __importDefault(require("../services/GoogleCalendar/UpsertIntegrationService"));
var GetIntegrationService_1 = __importDefault(require("../services/GoogleCalendar/GetIntegrationService"));
var GoogleCalendarIntegration_1 = __importDefault(require("../models/GoogleCalendarIntegration"));
var SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "openid",
    "email",
    "profile"
];
var getAuthUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, state, url;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                state = "".concat(userId, "-").concat(companyId);
                return [4 /*yield*/, (0, googleCalendarClient_1.getGoogleAuthUrl)(SCOPES, state, companyId)];
            case 1:
                url = _b.sent();
                return [2 /*return*/, res.status(200).json({ url: url })];
        }
    });
}); };
exports.getAuthUrl = getAuthUrl;
var oauthCallback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, code, state, userIdFromState, companyIdFromState, tokens, googleUserId, email, _b, payload, decoded, accessToken, refreshToken, expiryDate, integrationData, redirectUrl, err_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.query, code = _a.code, state = _a.state;
                console.log("DEBUG Google OAuth Callback - code:", code ? "present" : "missing");
                console.log("DEBUG Google OAuth Callback - state:", state);
                if (!code || typeof code !== "string") {
                    res.status(400).json({ error: "Missing code" });
                    return [2 /*return*/];
                }
                userIdFromState = void 0, companyIdFromState = void 0;
                if (state && !state.includes("-")) {
                    // Formato antigo: apenas companyId
                    companyIdFromState = state;
                    userIdFromState = null;
                    console.log("DEBUG Google OAuth Callback - Usando formato antigo (apenas companyId)");
                }
                else {
                    // Formato novo: userId-companyId
                    _c = state ? state.split("-") : [null, null], userIdFromState = _c[0], companyIdFromState = _c[1];
                    console.log("DEBUG Google OAuth Callback - Usando formato novo (userId-companyId)");
                }
                if (!companyIdFromState) {
                    res.status(400).json({ error: "Missing companyId in state" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, googleCalendarClient_1.getTokensFromCode)(code, Number(companyIdFromState))];
            case 1:
                tokens = _d.sent();
                googleUserId = "";
                email = "";
                if (tokens.id_token) {
                    try {
                        _b = tokens.id_token.split("."), payload = _b[1];
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
                integrationData = {
                    companyId: Number(companyIdFromState),
                    googleUserId: googleUserId,
                    email: email,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expiryDate: expiryDate,
                    calendarId: "primary"
                };
                if (userIdFromState) {
                    integrationData.userId = Number(userIdFromState);
                }
                console.log("DEBUG Google OAuth Callback - integrationData:", integrationData);
                return [4 /*yield*/, (0, UpsertIntegrationService_1["default"])(integrationData)];
            case 2:
                _d.sent();
                redirectUrl = process.env.FRONTEND_URL
                    ? "".concat(process.env.FRONTEND_URL, "/integrations/google-calendar/success")
                    : "/";
                res.redirect(redirectUrl);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _d.sent();
                console.error("Erro no oauthCallback do Google Calendar", err_1);
                res.status(500).json({ error: "Erro ao integrar com Google Calendar" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.oauthCallback = oauthCallback;
var getIntegration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, integration;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, GetIntegrationService_1["default"])(companyId)];
            case 1:
                integration = _a.sent();
                if (!integration) {
                    return [2 /*return*/, res.status(200).json(null)];
                }
                return [2 /*return*/, res.status(200).json({
                        email: integration.email,
                        calendarId: integration.calendarId
                    })];
        }
    });
}); };
exports.getIntegration = getIntegration;
var getIntegrations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, integrations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, GoogleCalendarIntegration_1["default"].findAll({
                        where: { companyId: companyId },
                        include: [
                            {
                                model: (require("../models/User"))["default"],
                                attributes: ["id", "name", "email"]
                            }
                        ]
                    })];
            case 1:
                integrations = _a.sent();
                return [2 /*return*/, res.status(200).json(integrations)];
        }
    });
}); };
exports.getIntegrations = getIntegrations;
var disconnectIntegration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, GoogleCalendarIntegration_1["default"].destroy({ where: { companyId: companyId } })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true })];
        }
    });
}); };
exports.disconnectIntegration = disconnectIntegration;
