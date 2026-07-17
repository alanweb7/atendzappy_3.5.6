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
exports.__esModule = true;
exports.deleteGoogleCalendarEvent = exports.updateGoogleCalendarEvent = exports.createGoogleCalendarEvent = exports.buildCalendarClient = exports.getTokensFromCode = exports.getGoogleAuthUrl = exports.createOAuth2Client = void 0;
var googleapis_1 = require("googleapis");
var CheckSettings_1 = require("./CheckSettings");
// Função para obter credenciais do Google (settings ou .env)
var getGoogleCredentials = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, clientSecret, redirectUri, settingClientId, settingClientSecret, settingRedirectUri, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientId = "";
                clientSecret = "";
                redirectUri = "";
                if (!companyId) return [3 /*break*/, 6];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, CheckSettings_1.CheckCompanySetting)(companyId, "googleClientId", "")];
            case 2:
                settingClientId = _a.sent();
                return [4 /*yield*/, (0, CheckSettings_1.CheckCompanySetting)(companyId, "googleClientSecret", "")];
            case 3:
                settingClientSecret = _a.sent();
                return [4 /*yield*/, (0, CheckSettings_1.CheckCompanySetting)(companyId, "googleRedirectUri", "")];
            case 4:
                settingRedirectUri = _a.sent();
                // Usar settings se estiverem preenchidas
                if (settingClientId)
                    clientId = settingClientId;
                if (settingClientSecret)
                    clientSecret = settingClientSecret;
                if (settingRedirectUri)
                    redirectUri = settingRedirectUri;
                console.log("DEBUG - Credenciais das settings carregadas");
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("DEBUG - Erro ao buscar settings, usando .env como fallback");
                return [3 /*break*/, 6];
            case 6:
                // Usar .env como fallback APENAS se as settings estiverem vazias
                if (!clientId) {
                    clientId = process.env.GOOGLE_CLIENT_ID;
                    console.log("DEBUG - Usando GOOGLE_CLIENT_ID do .env");
                }
                if (!clientSecret) {
                    clientSecret = process.env.GOOGLE_CLIENT_SECRET;
                    console.log("DEBUG - Usando GOOGLE_CLIENT_SECRET do .env");
                }
                if (!redirectUri) {
                    redirectUri = process.env.GOOGLE_REDIRECT_URI;
                    console.log("DEBUG - Usando GOOGLE_REDIRECT_URI do .env");
                }
                return [2 /*return*/, { clientId: clientId, clientSecret: clientSecret, redirectUri: redirectUri }];
        }
    });
}); };
var createOAuth2Client = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clientId, clientSecret, redirectUri, oauth2Client;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getGoogleCredentials(companyId)];
            case 1:
                _a = _b.sent(), clientId = _a.clientId, clientSecret = _a.clientSecret, redirectUri = _a.redirectUri;
                oauth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, redirectUri);
                return [2 /*return*/, oauth2Client];
        }
    });
}); };
exports.createOAuth2Client = createOAuth2Client;
var getGoogleAuthUrl = function (scopes, state, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clientId, clientSecret, redirectUri, oauth2Client, url;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getGoogleCredentials(companyId)];
            case 1:
                _a = _b.sent(), clientId = _a.clientId, clientSecret = _a.clientSecret, redirectUri = _a.redirectUri;
                console.log("DEBUG getGoogleAuthUrl - Credenciais:");
                console.log("  clientId:", clientId ? "".concat(clientId.substring(0, 20), "...") : "VAZIO");
                console.log("  clientSecret:", clientSecret ? "PRESENTE" : "VAZIO");
                console.log("  redirectUri:", redirectUri || "VAZIO");
                console.log("  companyId:", companyId);
                return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
            case 2:
                oauth2Client = _b.sent();
                url = oauth2Client.generateAuthUrl({
                    access_type: "offline",
                    scope: scopes,
                    prompt: "consent",
                    state: state,
                    redirect_uri: redirectUri // Adicionar explicitamente conforme documentação oficial
                });
                console.log("DEBUG getGoogleAuthUrl - URL gerada:", url.substring(0, 100) + "...");
                return [2 /*return*/, url];
        }
    });
}); };
exports.getGoogleAuthUrl = getGoogleAuthUrl;
var getTokensFromCode = function (code, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var oauth2Client, tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
            case 1:
                oauth2Client = _a.sent();
                return [4 /*yield*/, oauth2Client.getToken(code)];
            case 2:
                tokens = (_a.sent()).tokens;
                return [2 /*return*/, tokens];
        }
    });
}); };
exports.getTokensFromCode = getTokensFromCode;
var buildCalendarClient = function (tokens, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var oauth2Client, calendar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
            case 1:
                oauth2Client = _a.sent();
                oauth2Client.setCredentials(tokens);
                calendar = googleapis_1.google.calendar({ version: "v3", auth: oauth2Client });
                return [2 /*return*/, calendar];
        }
    });
}); };
exports.buildCalendarClient = buildCalendarClient;
var createGoogleCalendarEvent = function (accessToken, refreshToken, eventData, calendarId, companyId) {
    if (refreshToken === void 0) { refreshToken = null; }
    if (calendarId === void 0) { calendarId = "primary"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var oauth2Client, credentials, calendar, event_1, error_2, oauth2Client, credentials, refreshError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 10]);
                    return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
                case 1:
                    oauth2Client = _a.sent();
                    credentials = { access_token: accessToken };
                    if (refreshToken) {
                        credentials.refresh_token = refreshToken;
                    }
                    oauth2Client.setCredentials(credentials);
                    // Configurar refresh automático se tiver refresh token
                    if (refreshToken) {
                        oauth2Client.on('tokens', function (tokens) {
                            if (tokens.refresh_token) {
                                // Aqui você poderia salvar o novo refresh token no banco
                                console.log("DEBUG - Novos tokens recebidos:", tokens);
                            }
                        });
                    }
                    calendar = googleapis_1.google.calendar({ version: "v3", auth: oauth2Client });
                    return [4 /*yield*/, calendar.events.insert({
                            calendarId: calendarId,
                            requestBody: eventData
                        })];
                case 2:
                    event_1 = _a.sent();
                    return [2 /*return*/, event_1.data];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao criar evento no Google Calendar:", error_2);
                    if (!(error_2.code === 401 && refreshToken)) return [3 /*break*/, 9];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 8, , 9]);
                    console.log("DEBUG - Tentando refresh do token...");
                    return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
                case 5:
                    oauth2Client = _a.sent();
                    oauth2Client.setCredentials({ refresh_token: refreshToken });
                    return [4 /*yield*/, oauth2Client.refreshAccessToken()];
                case 6:
                    credentials = (_a.sent()).credentials;
                    return [4 /*yield*/, (0, exports.createGoogleCalendarEvent)(credentials.access_token, refreshToken, eventData, calendarId, companyId)];
                case 7: 
                // Tentar novamente com o novo token
                return [2 /*return*/, _a.sent()];
                case 8:
                    refreshError_1 = _a.sent();
                    console.error("ERROR - Falha no refresh do token:", refreshError_1);
                    throw refreshError_1;
                case 9: throw error_2;
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.createGoogleCalendarEvent = createGoogleCalendarEvent;
var updateGoogleCalendarEvent = function (accessToken, refreshToken, eventId, eventData, calendarId, companyId) {
    if (refreshToken === void 0) { refreshToken = null; }
    if (calendarId === void 0) { calendarId = "primary"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var oauth2Client, credentials, calendar, event_2, error_3, oauth2Client, credentials, refreshError_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 10]);
                    return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
                case 1:
                    oauth2Client = _a.sent();
                    credentials = { access_token: accessToken };
                    if (refreshToken) {
                        credentials.refresh_token = refreshToken;
                    }
                    oauth2Client.setCredentials(credentials);
                    calendar = googleapis_1.google.calendar({ version: "v3", auth: oauth2Client });
                    return [4 /*yield*/, calendar.events.update({
                            calendarId: calendarId,
                            eventId: eventId,
                            requestBody: eventData
                        })];
                case 2:
                    event_2 = _a.sent();
                    return [2 /*return*/, event_2.data];
                case 3:
                    error_3 = _a.sent();
                    console.error("Erro ao atualizar evento no Google Calendar:", error_3);
                    if (!(error_3.code === 401 && refreshToken)) return [3 /*break*/, 9];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 8, , 9]);
                    console.log("DEBUG - Tentando refresh do token para update...");
                    return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
                case 5:
                    oauth2Client = _a.sent();
                    oauth2Client.setCredentials({ refresh_token: refreshToken });
                    return [4 /*yield*/, oauth2Client.refreshAccessToken()];
                case 6:
                    credentials = (_a.sent()).credentials;
                    return [4 /*yield*/, (0, exports.updateGoogleCalendarEvent)(credentials.access_token, refreshToken, eventId, eventData, calendarId, companyId)];
                case 7: 
                // Tentar novamente com o novo token
                return [2 /*return*/, _a.sent()];
                case 8:
                    refreshError_2 = _a.sent();
                    console.error("ERROR - Falha no refresh do token para update:", refreshError_2);
                    throw refreshError_2;
                case 9: throw error_3;
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.updateGoogleCalendarEvent = updateGoogleCalendarEvent;
var deleteGoogleCalendarEvent = function (accessToken, refreshToken, eventId, calendarId, companyId) {
    if (refreshToken === void 0) { refreshToken = null; }
    if (calendarId === void 0) { calendarId = "primary"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var oauth2Client, credentials, calendar, error_4, oauth2Client, credentials, refreshError_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 10]);
                    return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
                case 1:
                    oauth2Client = _a.sent();
                    credentials = { access_token: accessToken };
                    if (refreshToken) {
                        credentials.refresh_token = refreshToken;
                    }
                    oauth2Client.setCredentials(credentials);
                    calendar = googleapis_1.google.calendar({ version: "v3", auth: oauth2Client });
                    return [4 /*yield*/, calendar.events["delete"]({
                            calendarId: calendarId,
                            eventId: eventId
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_4 = _a.sent();
                    console.error("Erro ao excluir evento no Google Calendar:", error_4);
                    if (!(error_4.code === 401 && refreshToken)) return [3 /*break*/, 9];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 8, , 9]);
                    console.log("DEBUG - Tentando refresh do token para delete...");
                    return [4 /*yield*/, (0, exports.createOAuth2Client)(companyId)];
                case 5:
                    oauth2Client = _a.sent();
                    oauth2Client.setCredentials({ refresh_token: refreshToken });
                    return [4 /*yield*/, oauth2Client.refreshAccessToken()];
                case 6:
                    credentials = (_a.sent()).credentials;
                    return [4 /*yield*/, (0, exports.deleteGoogleCalendarEvent)(credentials.access_token, refreshToken, eventId, calendarId, companyId)];
                case 7: 
                // Tentar novamente com o novo token
                return [2 /*return*/, _a.sent()];
                case 8:
                    refreshError_3 = _a.sent();
                    console.error("ERROR - Falha no refresh do token para delete:", refreshError_3);
                    throw refreshError_3;
                case 9: throw error_4;
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.deleteGoogleCalendarEvent = deleteGoogleCalendarEvent;
