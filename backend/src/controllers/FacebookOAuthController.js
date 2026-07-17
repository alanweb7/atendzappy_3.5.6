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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.instagramCallback = exports.facebookCallback = void 0;
var socket_1 = require("../libs/socket");
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var graphAPI_1 = require("../services/FacebookServices/graphAPI");
var ShowCompanyService_1 = __importDefault(require("../services/CompanyService/ShowCompanyService"));
var ShowPlanService_1 = __importDefault(require("../services/PlanService/ShowPlanService"));
var WhitelabelService_1 = require("../services/SettingService/WhitelabelService");
var facebookCallback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var frontendUrl, _a, code, state, error, error_code, companyId, company, plan, config, facebookAppId, facebookAppSecret, backendUrl, redirectUri, tokenResponse, tokenData, userToken, pages, io, createdConnections, _b, pages_1, pages_1_1, page, name_1, access_token, id, instagram_business_account, pageToken, facebookConnection, instagramId, username, instagramName, instagramConnection, e_1_1, error_1;
    var _c, e_1, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                frontendUrl = process.env.FRONTEND_URL;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 27, , 28]);
                _a = req.query, code = _a.code, state = _a.state, error = _a.error, error_code = _a.error_code;
                // Facebook enviou erro (URI bloqueada, usuário cancelou, etc.)
                if (error || error_code) {
                    console.warn("Facebook OAuth retornou erro:", error || error_code);
                    res.redirect("".concat(frontendUrl, "/canais?error=facebook-oauth-denied"));
                    return [2 /*return*/];
                }
                if (!code || typeof code !== "string") {
                    res.redirect("".concat(frontendUrl, "/canais?error=facebook-missing-code"));
                    return [2 /*return*/];
                }
                if (!state || typeof state !== "string") {
                    res.redirect("".concat(frontendUrl, "/canais?error=facebook-missing-state"));
                    return [2 /*return*/];
                }
                companyId = state;
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(companyId)];
            case 2:
                company = _f.sent();
                return [4 /*yield*/, (0, ShowPlanService_1["default"])(company.planId)];
            case 3:
                plan = _f.sent();
                if (!plan.useFacebook) {
                    res.status(400).json({ error: "Empresa não possui permissão para Facebook" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(parseInt(companyId))];
            case 4:
                config = _f.sent();
                facebookAppId = config.facebookAppId;
                facebookAppSecret = config.facebookAppSecret;
                if (!facebookAppId || !facebookAppSecret) {
                    res.redirect("".concat(config.frontendUrl || process.env.FRONTEND_URL, "/canais?error=facebook-not-configured"));
                    return [2 /*return*/];
                }
                backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
                redirectUri = "".concat(backendUrl, "/facebook-callback");
                return [4 /*yield*/, fetch("https://graph.facebook.com/v18.0/oauth/access_token?client_id=".concat(facebookAppId, "&client_secret=").concat(facebookAppSecret, "&redirect_uri=").concat(encodeURIComponent(redirectUri), "&code=").concat(code))];
            case 5:
                tokenResponse = _f.sent();
                return [4 /*yield*/, tokenResponse.json()];
            case 6:
                tokenData = _f.sent();
                if (!tokenData.access_token) {
                    console.error("Erro ao obter access token:", tokenData);
                    res.status(400).json({ error: "Erro ao obter token de acesso" });
                    return [2 /*return*/];
                }
                userToken = tokenData.access_token;
                return [4 /*yield*/, (0, graphAPI_1.getPageProfile)(tokenData.user_id || "me", userToken)];
            case 7:
                pages = _f.sent();
                if (pages.length === 0) {
                    res.status(400).json({ error: "Nenhuma página encontrada" });
                    return [2 /*return*/];
                }
                io = (0, socket_1.getIO)();
                createdConnections = [];
                _f.label = 8;
            case 8:
                _f.trys.push([8, 20, 21, 26]);
                _b = true, pages_1 = __asyncValues(pages);
                _f.label = 9;
            case 9: return [4 /*yield*/, pages_1.next()];
            case 10:
                if (!(pages_1_1 = _f.sent(), _c = pages_1_1.done, !_c)) return [3 /*break*/, 19];
                _e = pages_1_1.value;
                _b = false;
                _f.label = 11;
            case 11:
                _f.trys.push([11, , 17, 18]);
                page = _e;
                name_1 = page.name, access_token = page.access_token, id = page.id, instagram_business_account = page.instagram_business_account;
                return [4 /*yield*/, (0, graphAPI_1.getAccessTokenFromPage)(access_token)];
            case 12:
                pageToken = _f.sent();
                return [4 /*yield*/, Whatsapp_1["default"].create({
                        companyId: companyId,
                        name: "FB ".concat(name_1),
                        facebookUserId: tokenData.user_id || "me",
                        facebookPageUserId: id,
                        facebookUserToken: pageToken,
                        tokenMeta: userToken,
                        isDefault: false,
                        channel: "facebook",
                        status: "CONNECTED",
                        greetingMessage: "",
                        farewellMessage: "",
                        queueIds: [],
                        isMultidevice: false
                    })];
            case 13:
                facebookConnection = _f.sent();
                // Inscrever webhook
                return [4 /*yield*/, (0, graphAPI_1.subscribeApp)(id, pageToken)];
            case 14:
                // Inscrever webhook
                _f.sent();
                createdConnections.push(facebookConnection);
                if (!instagram_business_account) return [3 /*break*/, 16];
                instagramId = instagram_business_account.id, username = instagram_business_account.username, instagramName = instagram_business_account.name;
                return [4 /*yield*/, Whatsapp_1["default"].create({
                        companyId: companyId,
                        name: "Insta ".concat(username || instagramName),
                        facebookUserId: tokenData.user_id || "me",
                        facebookPageUserId: instagramId,
                        facebookUserToken: pageToken,
                        tokenMeta: userToken,
                        isDefault: false,
                        channel: "instagram",
                        status: "CONNECTED",
                        greetingMessage: "",
                        farewellMessage: "",
                        queueIds: [],
                        isMultidevice: false
                    })];
            case 15:
                instagramConnection = _f.sent();
                createdConnections.push(instagramConnection);
                _f.label = 16;
            case 16: return [3 /*break*/, 18];
            case 17:
                _b = true;
                return [7 /*endfinally*/];
            case 18: return [3 /*break*/, 9];
            case 19: return [3 /*break*/, 26];
            case 20:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 26];
            case 21:
                _f.trys.push([21, , 24, 25]);
                if (!(!_b && !_c && (_d = pages_1["return"]))) return [3 /*break*/, 23];
                return [4 /*yield*/, _d.call(pages_1)];
            case 22:
                _f.sent();
                _f.label = 23;
            case 23: return [3 /*break*/, 25];
            case 24:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 25: return [7 /*endfinally*/];
            case 26:
                // Emitir evento para atualizar frontend
                io.to("company-".concat(companyId)).emit("whatsapp", {
                    action: "update",
                    whatsapp: createdConnections
                });
                // Redirecionar para frontend com sucesso
                res.redirect("".concat(process.env.FRONTEND_URL, "/canais?success=facebook-connected"));
                return [3 /*break*/, 28];
            case 27:
                error_1 = _f.sent();
                console.error("Erro no Facebook OAuth callback:", error_1);
                res.redirect("".concat(process.env.FRONTEND_URL, "/canais?error=facebook-failed"));
                return [3 /*break*/, 28];
            case 28: return [2 /*return*/];
        }
    });
}); };
exports.facebookCallback = facebookCallback;
var instagramCallback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var frontendUrl, _a, code, state, error, error_code, companyId, company, plan, config, instagramAppId, instagramAppSecret, backendUrl, redirectUri, tokenResponse, tokenData, userToken, pages, io, createdConnections, _b, pages_2, pages_2_1, page, name_2, access_token, id, instagram_business_account, instagramId, username, instagramName, pageToken, instagramConnection, e_2_1, error_2;
    var _c, e_2, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                frontendUrl = process.env.FRONTEND_URL;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 26, , 27]);
                _a = req.query, code = _a.code, state = _a.state, error = _a.error, error_code = _a.error_code;
                if (error || error_code) {
                    console.warn("Instagram OAuth retornou erro:", error || error_code);
                    res.redirect("".concat(frontendUrl, "/canais?error=instagram-oauth-denied"));
                    return [2 /*return*/];
                }
                if (!code || typeof code !== "string") {
                    res.redirect("".concat(frontendUrl, "/canais?error=instagram-missing-code"));
                    return [2 /*return*/];
                }
                if (!state || typeof state !== "string") {
                    res.redirect("".concat(frontendUrl, "/canais?error=instagram-missing-state"));
                    return [2 /*return*/];
                }
                companyId = state;
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(companyId)];
            case 2:
                company = _f.sent();
                return [4 /*yield*/, (0, ShowPlanService_1["default"])(company.planId)];
            case 3:
                plan = _f.sent();
                if (!plan.useInstagram) {
                    res.status(400).json({ error: "Empresa não possui permissão para Instagram" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(parseInt(companyId))];
            case 4:
                config = _f.sent();
                instagramAppId = config.instagramAppId;
                instagramAppSecret = config.instagramAppSecret;
                if (!instagramAppId || !instagramAppSecret) {
                    res.redirect("".concat(process.env.FRONTEND_URL, "/canais?error=instagram-not-configured"));
                    return [2 /*return*/];
                }
                backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
                redirectUri = "".concat(backendUrl, "/instagram-callback");
                return [4 /*yield*/, fetch("https://graph.facebook.com/v18.0/oauth/access_token?client_id=".concat(instagramAppId, "&client_secret=").concat(instagramAppSecret, "&redirect_uri=").concat(encodeURIComponent(redirectUri), "&code=").concat(code))];
            case 5:
                tokenResponse = _f.sent();
                return [4 /*yield*/, tokenResponse.json()];
            case 6:
                tokenData = _f.sent();
                if (!tokenData.access_token) {
                    console.error("Erro ao obter access token:", tokenData);
                    res.status(400).json({ error: "Erro ao obter token de acesso" });
                    return [2 /*return*/];
                }
                userToken = tokenData.access_token;
                return [4 /*yield*/, (0, graphAPI_1.getPageProfile)(tokenData.user_id || "me", userToken)];
            case 7:
                pages = _f.sent();
                if (pages.length === 0) {
                    res.status(400).json({ error: "Nenhuma página com Instagram encontrada" });
                    return [2 /*return*/];
                }
                io = (0, socket_1.getIO)();
                createdConnections = [];
                _f.label = 8;
            case 8:
                _f.trys.push([8, 19, 20, 25]);
                _b = true, pages_2 = __asyncValues(pages);
                _f.label = 9;
            case 9: return [4 /*yield*/, pages_2.next()];
            case 10:
                if (!(pages_2_1 = _f.sent(), _c = pages_2_1.done, !_c)) return [3 /*break*/, 18];
                _e = pages_2_1.value;
                _b = false;
                _f.label = 11;
            case 11:
                _f.trys.push([11, , 16, 17]);
                page = _e;
                name_2 = page.name, access_token = page.access_token, id = page.id, instagram_business_account = page.instagram_business_account;
                if (!instagram_business_account) return [3 /*break*/, 15];
                instagramId = instagram_business_account.id, username = instagram_business_account.username, instagramName = instagram_business_account.name;
                return [4 /*yield*/, (0, graphAPI_1.getAccessTokenFromPage)(access_token)];
            case 12:
                pageToken = _f.sent();
                return [4 /*yield*/, Whatsapp_1["default"].create({
                        companyId: companyId,
                        name: "Insta ".concat(username || instagramName),
                        facebookUserId: tokenData.user_id || "me",
                        facebookPageUserId: instagramId,
                        facebookUserToken: pageToken,
                        tokenMeta: userToken,
                        isDefault: false,
                        channel: "instagram",
                        status: "CONNECTED",
                        greetingMessage: "",
                        farewellMessage: "",
                        queueIds: [],
                        isMultidevice: false
                    })];
            case 13:
                instagramConnection = _f.sent();
                createdConnections.push(instagramConnection);
                // Inscrever webhook
                return [4 /*yield*/, (0, graphAPI_1.subscribeApp)(id, pageToken)];
            case 14:
                // Inscrever webhook
                _f.sent();
                _f.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                _b = true;
                return [7 /*endfinally*/];
            case 17: return [3 /*break*/, 9];
            case 18: return [3 /*break*/, 25];
            case 19:
                e_2_1 = _f.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 25];
            case 20:
                _f.trys.push([20, , 23, 24]);
                if (!(!_b && !_c && (_d = pages_2["return"]))) return [3 /*break*/, 22];
                return [4 /*yield*/, _d.call(pages_2)];
            case 21:
                _f.sent();
                _f.label = 22;
            case 22: return [3 /*break*/, 24];
            case 23:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 24: return [7 /*endfinally*/];
            case 25:
                if (createdConnections.length === 0) {
                    res.status(400).json({ error: "Nenhuma conta Instagram Business encontrada" });
                    return [2 /*return*/];
                }
                // Emitir evento para atualizar frontend
                io.to("company-".concat(companyId)).emit("whatsapp", {
                    action: "update",
                    whatsapp: createdConnections
                });
                // Redirecionar para frontend com sucesso
                res.redirect("".concat(process.env.FRONTEND_URL, "/canais?success=instagram-connected"));
                return [3 /*break*/, 27];
            case 26:
                error_2 = _f.sent();
                console.error("Erro no Instagram OAuth callback:", error_2);
                res.redirect("".concat(process.env.FRONTEND_URL, "/canais?error=instagram-failed"));
                return [3 /*break*/, 27];
            case 27: return [2 /*return*/];
        }
    });
}); };
exports.instagramCallback = instagramCallback;
