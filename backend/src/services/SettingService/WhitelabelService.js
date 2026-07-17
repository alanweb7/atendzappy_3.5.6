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
exports.getWhitelabelSettingByKey = exports.getWhitelabelConfig = void 0;
var Setting_1 = __importDefault(require("../../models/Setting"));
var AiCreditsService_1 = require("../AiCredits/AiCreditsService");
var getSetting = function (companyId, key) { return __awaiter(void 0, void 0, void 0, function () {
    var setting, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Setting_1["default"].findOne({ where: { companyId: companyId, key: key } })];
            case 1:
                setting = _b.sent();
                return [2 /*return*/, (setting === null || setting === void 0 ? void 0 : setting.value) || null];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getWhitelabelConfig = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, facebookAppId, facebookAppSecret, facebookVerifyToken, instagramAppId, instagramAppSecret, instagramVerifyToken, googleMyBusinessClientId, googleMyBusinessClientSecret, backendUrl, frontendUrl, verifyToken, googleClientId, googleClientSecret, googleRedirectUri, openaiApiKey, geminiApiKey, aiUseOwnKey, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    getSetting(companyId, "facebookAppId"),
                    getSetting(companyId, "facebookAppSecret"),
                    getSetting(companyId, "facebookVerifyToken"),
                    getSetting(companyId, "instagramAppId"),
                    getSetting(companyId, "instagramAppSecret"),
                    getSetting(companyId, "instagramVerifyToken"),
                    getSetting(companyId, "googleMyBusinessClientId"),
                    getSetting(companyId, "googleMyBusinessClientSecret"),
                    getSetting(companyId, "backendUrl"),
                    getSetting(companyId, "frontendUrl"),
                    getSetting(companyId, "verifyToken"),
                    getSetting(companyId, "googleClientId"),
                    getSetting(companyId, "googleClientSecret"),
                    getSetting(companyId, "googleRedirectUri"),
                    getSetting(companyId, "openaiApiKey"),
                    getSetting(companyId, "geminiApiKey"),
                    getSetting(companyId, "aiUseOwnKey"),
                ])];
            case 1:
                _a = _g.sent(), facebookAppId = _a[0], facebookAppSecret = _a[1], facebookVerifyToken = _a[2], instagramAppId = _a[3], instagramAppSecret = _a[4], instagramVerifyToken = _a[5], googleMyBusinessClientId = _a[6], googleMyBusinessClientSecret = _a[7], backendUrl = _a[8], frontendUrl = _a[9], verifyToken = _a[10], googleClientId = _a[11], googleClientSecret = _a[12], googleRedirectUri = _a[13], openaiApiKey = _a[14], geminiApiKey = _a[15], aiUseOwnKey = _a[16];
                _f = {
                    // Facebook — SEM fallback .env. Empresa DEVE configurar no modal.
                    facebookAppId: facebookAppId || undefined,
                    facebookAppSecret: facebookAppSecret || undefined,
                    facebookVerifyToken: facebookVerifyToken || verifyToken || undefined,
                    // Instagram — SEM fallback .env. Empresa DEVE configurar no modal.
                    instagramAppId: instagramAppId || undefined,
                    instagramAppSecret: instagramAppSecret || undefined,
                    instagramVerifyToken: instagramVerifyToken || undefined,
                    // Google Meu Negócio — SEM fallback .env
                    googleMyBusinessClientId: googleMyBusinessClientId || undefined,
                    googleMyBusinessClientSecret: googleMyBusinessClientSecret || undefined,
                    // Infraestrutura — usa .env como fallback (correto)
                    backendUrl: backendUrl || process.env.BACKEND_URL,
                    frontendUrl: frontendUrl || process.env.FRONTEND_URL,
                    verifyToken: verifyToken || undefined,
                    // Google
                    googleClientId: googleClientId || process.env.GOOGLE_CLIENT_ID,
                    googleClientSecret: googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
                    googleRedirectUri: googleRedirectUri || process.env.GOOGLE_REDIRECT_URI
                };
                if (!(aiUseOwnKey === "own")) return [3 /*break*/, 2];
                _b = (openaiApiKey || undefined);
                return [3 /*break*/, 5];
            case 2:
                _c = openaiApiKey;
                if (_c) return [3 /*break*/, 4];
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var ok;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!process.env.OPENAI_API_KEY)
                                        return [2 /*return*/, undefined];
                                    return [4 /*yield*/, (0, AiCreditsService_1.hasAiCreditsAvailable)(companyId)];
                                case 1:
                                    ok = _a.sent();
                                    return [2 /*return*/, ok ? process.env.OPENAI_API_KEY : undefined];
                            }
                        });
                    }); })()];
            case 3:
                _c = (_g.sent());
                _g.label = 4;
            case 4:
                _b = (_c);
                _g.label = 5;
            case 5:
                // IA: empresa escolhe o modo via aiUseOwnKey
                // "own" = usa chave própria configurada (sem consumir créditos do plano)
                // "system" (padrão) = usa chave global do sistema, consumindo créditos do plano
                _f.openaiApiKey = _b;
                if (!(aiUseOwnKey === "own")) return [3 /*break*/, 6];
                _d = (geminiApiKey || undefined);
                return [3 /*break*/, 9];
            case 6:
                _e = geminiApiKey;
                if (_e) return [3 /*break*/, 8];
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var ok;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!process.env.GEMINI_API_KEY)
                                        return [2 /*return*/, undefined];
                                    return [4 /*yield*/, (0, AiCreditsService_1.hasAiCreditsAvailable)(companyId)];
                                case 1:
                                    ok = _a.sent();
                                    return [2 /*return*/, ok ? process.env.GEMINI_API_KEY : undefined];
                            }
                        });
                    }); })()];
            case 7:
                _e = (_g.sent());
                _g.label = 8;
            case 8:
                _d = (_e);
                _g.label = 9;
            case 9: return [2 /*return*/, (_f.geminiApiKey = _d,
                    _f)];
        }
    });
}); };
exports.getWhitelabelConfig = getWhitelabelConfig;
var getWhitelabelSettingByKey = function (companyId, key) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getWhitelabelConfig)(companyId)];
            case 1:
                config = _a.sent();
                return [2 /*return*/, config[key] || ""];
        }
    });
}); };
exports.getWhitelabelSettingByKey = getWhitelabelSettingByKey;
