"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.grantCreditsAdmin = exports.addExtraCredits = exports.debitAiInteraction = exports.hasAiCreditsAvailable = exports.getAiCreditUsage = exports.getAiCreditLimit = void 0;
var AiCreditsUsage_1 = __importDefault(require("../../models/AiCreditsUsage"));
var Company_1 = __importDefault(require("../../models/Company"));
var Plan_1 = __importDefault(require("../../models/Plan"));
var TOKENS_PER_INTERACTION = 1800; // fixo por resposta
var currentPeriod = function () {
    var now = new Date();
    return "".concat(now.getFullYear(), "-").concat(String(now.getMonth() + 1).padStart(2, "0"));
};
/** Retorna ou cria o registro de uso do mês atual */
var getOrCreateUsage = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var period, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                period = currentPeriod();
                return [4 /*yield*/, AiCreditsUsage_1["default"].findOrCreate({
                        where: { companyId: companyId, period: period },
                        defaults: { companyId: companyId, period: period, tokensUsed: 0, extraCredits: 0 }
                    })];
            case 1:
                record = (_a.sent())[0];
                return [2 /*return*/, record];
        }
    });
}); };
/** Limite efetivo considerando trial */
var getAiCreditLimit = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var company, plan, createdAt, trialEnd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Company_1["default"].findByPk(companyId, {
                    include: [{ model: Plan_1["default"], as: "plan" }]
                })];
            case 1:
                company = _a.sent();
                if (!(company === null || company === void 0 ? void 0 : company.plan))
                    return [2 /*return*/, 0];
                plan = company.plan;
                // Determina se está em trial: plan.trial=true e ainda dentro dos dias
                if (plan.trial && plan.trialDays > 0) {
                    createdAt = new Date(company.createdAt);
                    trialEnd = new Date(createdAt.getTime() + plan.trialDays * 24 * 60 * 60 * 1000);
                    if (new Date() < trialEnd) {
                        return [2 /*return*/, plan.aiCreditsTrial || 0];
                    }
                }
                return [2 /*return*/, plan.aiCreditsLimit || 0];
        }
    });
}); };
exports.getAiCreditLimit = getAiCreditLimit;
/** Uso atual do mês (tokens consumidos - extra) */
var getAiCreditUsage = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var Setting, _a, usage, limit, _b, openaiKey, geminiKey, hasOwnKey, effective, remaining;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../../models/Setting")); })];
            case 1:
                Setting = (_c.sent())["default"];
                return [4 /*yield*/, Promise.all([
                        getOrCreateUsage(companyId),
                        (0, exports.getAiCreditLimit)(companyId)
                    ])];
            case 2:
                _a = _c.sent(), usage = _a[0], limit = _a[1];
                return [4 /*yield*/, Promise.all([
                        Setting.findOne({ where: { companyId: companyId, key: "openaiApiKey" } }),
                        Setting.findOne({ where: { companyId: companyId, key: "geminiApiKey" } })
                    ])];
            case 3:
                _b = _c.sent(), openaiKey = _b[0], geminiKey = _b[1];
                hasOwnKey = !!((openaiKey === null || openaiKey === void 0 ? void 0 : openaiKey.value) || (geminiKey === null || geminiKey === void 0 ? void 0 : geminiKey.value));
                effective = usage.tokensUsed - usage.extraCredits;
                remaining = Math.max(0, limit - effective);
                return [2 /*return*/, {
                        period: usage.period,
                        tokensUsed: usage.tokensUsed,
                        extraCredits: usage.extraCredits,
                        limit: limit,
                        remaining: remaining,
                        hasOwnKey: hasOwnKey
                    }];
        }
    });
}); };
exports.getAiCreditUsage = getAiCreditUsage;
/** Verifica se a empresa pode usar a chave global do sistema */
var hasAiCreditsAvailable = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, remaining, hasOwnKey;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.getAiCreditUsage)(companyId)];
            case 1:
                _a = _b.sent(), remaining = _a.remaining, hasOwnKey = _a.hasOwnKey;
                if (hasOwnKey)
                    return [2 /*return*/, true]; // chave própria: sem limite do sistema
                return [2 /*return*/, remaining > 0];
        }
    });
}); };
exports.hasAiCreditsAvailable = hasAiCreditsAvailable;
/** Debita 1800 tokens fixos após uma resposta de IA usando chave do sistema */
var debitAiInteraction = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var usage, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getOrCreateUsage(companyId)];
            case 1:
                usage = _a.sent();
                return [4 /*yield*/, usage.increment("tokensUsed", { by: TOKENS_PER_INTERACTION })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                // Nunca travar a resposta da IA por falha de contagem
                console.error("[AiCredits] Falha ao debitar créditos:", err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.debitAiInteraction = debitAiInteraction;
/** Adiciona créditos extras (chamado após pagamento confirmado) */
var addExtraCredits = function (companyId, credits) { return __awaiter(void 0, void 0, void 0, function () {
    var usage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getOrCreateUsage(companyId)];
            case 1:
                usage = _a.sent();
                return [4 /*yield*/, usage.increment("extraCredits", { by: credits })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addExtraCredits = addExtraCredits;
/** Adiciona créditos manualmente pelo super admin */
var grantCreditsAdmin = function (companyId, credits) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.addExtraCredits)(companyId, credits)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.grantCreditsAdmin = grantCreditsAdmin;
