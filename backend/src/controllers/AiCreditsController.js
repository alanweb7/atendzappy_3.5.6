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
exports.systemProviders = exports.deletePackage = exports.updatePackage = exports.createPackage = exports.adminListUsage = exports.grantCredits = exports.webhook = exports.verifyOrder = exports.listOrders = exports.purchasePackage = exports.listPackages = exports.getUsage = void 0;
var AiCreditPackage_1 = __importDefault(require("../models/AiCreditPackage"));
var AiCreditOrder_1 = __importDefault(require("../models/AiCreditOrder"));
var User_1 = __importDefault(require("../models/User"));
var AiCreditsService_1 = require("../services/AiCredits/AiCreditsService");
var AiCreditOrderService_1 = require("../services/AiCredits/AiCreditOrderService");
var logger_1 = __importDefault(require("../utils/logger"));
var isSuperUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1["default"].findByPk(userId, { attributes: ["super"] })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, (user === null || user === void 0 ? void 0 : user["super"]) === true];
        }
    });
}); };
// GET /ai-credits/usage — uso atual da empresa logada
var getUsage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, usage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, AiCreditsService_1.getAiCreditUsage)(companyId)];
            case 1:
                usage = _a.sent();
                return [2 /*return*/, res.json(usage)];
        }
    });
}); };
exports.getUsage = getUsage;
// GET /ai-credits/packages — lista pacotes disponíveis
var listPackages = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var packages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AiCreditPackage_1["default"].findAll({ where: { isActive: true }, order: [["credits", "ASC"]] })];
            case 1:
                packages = _a.sent();
                return [2 /*return*/, res.json(packages)];
        }
    });
}); };
exports.listPackages = listPackages;
// POST /ai-credits/purchase/:packageId — cria link de checkout
var purchasePackage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, packageId, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                companyId = req.user.companyId;
                packageId = Number(req.params.packageId);
                return [4 /*yield*/, (0, AiCreditOrderService_1.createCreditCheckout)(companyId, packageId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ error: err_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.purchasePackage = purchasePackage;
// GET /ai-credits/orders — pedidos da empresa
var listOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, AiCreditOrder_1["default"].findAll({
                        where: { companyId: companyId },
                        include: [{ model: AiCreditPackage_1["default"], as: "package" }],
                        order: [["createdAt", "DESC"]],
                        limit: 50
                    })];
            case 1:
                orders = _a.sent();
                return [2 /*return*/, res.json(orders)];
        }
    });
}); };
exports.listOrders = listOrders;
// GET /ai-credits/orders/:orderId/verify — verifica status manualmente
var verifyOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, AiCreditOrderService_1.verifyOrderPayment)(Number(req.params.orderId))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(400).json({ error: err_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyOrder = verifyOrder;
// POST /ai-credits/webhook — webhook InfinitePay (sem autenticação)
var webhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, AiCreditOrderService_1.processPaymentWebhook)(req.body)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ ok: true })];
            case 2:
                err_3 = _a.sent();
                logger_1["default"].error("[AiCredits] Webhook error:", err_3);
                return [2 /*return*/, res.status(400).json({ error: err_3.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.webhook = webhook;
// POST /ai-credits/grant — super admin concede créditos manualmente
var grantCredits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, credits;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, isSuperUser(req.user.id)];
            case 1:
                if (!(_b.sent()))
                    return [2 /*return*/, res.status(403).json({ error: "Sem permissão" })];
                _a = req.body, companyId = _a.companyId, credits = _a.credits;
                return [4 /*yield*/, (0, AiCreditsService_1.grantCreditsAdmin)(Number(companyId), Number(credits))];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ ok: true })];
        }
    });
}); };
exports.grantCredits = grantCredits;
// GET /ai-credits/admin/usage — super admin: uso de todas as empresas
var adminListUsage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var QueryTypes, sequelize, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, isSuperUser(req.user.id)];
            case 1:
                if (!(_a.sent()))
                    return [2 /*return*/, res.status(403).json({ error: "Sem permissão" })];
                QueryTypes = require("sequelize").QueryTypes;
                sequelize = require("../database")["default"];
                return [4 /*yield*/, sequelize.query("SELECT u.*, c.name as \"companyName\"\n     FROM \"AiCreditsUsage\" u\n     JOIN \"Companies\" c ON c.id = u.\"companyId\"\n     WHERE u.period = TO_CHAR(NOW(), 'YYYY-MM')\n     ORDER BY u.\"tokensUsed\" DESC", { type: QueryTypes.SELECT })];
            case 2:
                rows = _a.sent();
                return [2 /*return*/, res.json(rows)];
        }
    });
}); };
exports.adminListUsage = adminListUsage;
// Packages CRUD (super admin)
var createPackage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pkg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, isSuperUser(req.user.id)];
            case 1:
                if (!(_a.sent()))
                    return [2 /*return*/, res.status(403).json({ error: "Sem permissão" })];
                return [4 /*yield*/, AiCreditPackage_1["default"].create(req.body)];
            case 2:
                pkg = _a.sent();
                return [2 /*return*/, res.status(201).json(pkg)];
        }
    });
}); };
exports.createPackage = createPackage;
var updatePackage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pkg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, isSuperUser(req.user.id)];
            case 1:
                if (!(_a.sent()))
                    return [2 /*return*/, res.status(403).json({ error: "Sem permissão" })];
                return [4 /*yield*/, AiCreditPackage_1["default"].findByPk(req.params.id)];
            case 2:
                pkg = _a.sent();
                if (!pkg)
                    return [2 /*return*/, res.status(404).json({ error: "Não encontrado" })];
                return [4 /*yield*/, pkg.update(req.body)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json(pkg)];
        }
    });
}); };
exports.updatePackage = updatePackage;
var deletePackage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pkg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, isSuperUser(req.user.id)];
            case 1:
                if (!(_a.sent()))
                    return [2 /*return*/, res.status(403).json({ error: "Sem permissão" })];
                return [4 /*yield*/, AiCreditPackage_1["default"].findByPk(req.params.id)];
            case 2:
                pkg = _a.sent();
                if (!pkg)
                    return [2 /*return*/, res.status(404).json({ error: "Não encontrado" })];
                return [4 /*yield*/, pkg.update({ isActive: false })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ ok: true })];
        }
    });
}); };
exports.deletePackage = deletePackage;
// GET /ai-credits/system-providers — quais provedores têm chave do sistema configurada (não verifica créditos)
var systemProviders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Setting, _a, openaiSetting, geminiSetting;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../models/Setting")); })];
            case 1:
                Setting = (_b.sent())["default"];
                return [4 /*yield*/, Promise.all([
                        Setting.findOne({ where: { companyId: 1, key: "openaiApiKey" } }),
                        Setting.findOne({ where: { companyId: 1, key: "geminiApiKey" } }),
                    ])];
            case 2:
                _a = _b.sent(), openaiSetting = _a[0], geminiSetting = _a[1];
                return [2 /*return*/, res.json({
                        openai: !!(openaiSetting === null || openaiSetting === void 0 ? void 0 : openaiSetting.value) || !!(process.env.OPENAI_API_KEY),
                        gemini: !!(geminiSetting === null || geminiSetting === void 0 ? void 0 : geminiSetting.value) || !!(process.env.GEMINI_API_KEY)
                    })];
        }
    });
}); };
exports.systemProviders = systemProviders;
