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
exports.verifyOrderPayment = exports.processPaymentWebhook = exports.createCreditCheckout = void 0;
var axios_1 = __importDefault(require("axios"));
var AiCreditOrder_1 = __importDefault(require("../../models/AiCreditOrder"));
var AiCreditPackage_1 = __importDefault(require("../../models/AiCreditPackage"));
var Company_1 = __importDefault(require("../../models/Company"));
var AiCreditsService_1 = require("./AiCreditsService");
var logger_1 = __importDefault(require("../../utils/logger"));
var INFINITEPAY_BASE = "https://api.checkout.infinitepay.io";
var INFINITEPAY_HANDLE = process.env.INFINITEPAY_HANDLE || "";
/** Cria link de checkout InfinitePay para um pacote de créditos */
var createCreditCheckout = function (companyId, packageId) { return __awaiter(void 0, void 0, void 0, function () {
    var pkg, company, orderNsu, backendUrl, frontendUrl, payload, data, checkoutUrl, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AiCreditPackage_1["default"].findByPk(packageId)];
            case 1:
                pkg = _a.sent();
                if (!pkg || !pkg.isActive)
                    throw new Error("Pacote não encontrado ou inativo");
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 2:
                company = _a.sent();
                if (!company)
                    throw new Error("Empresa não encontrada");
                orderNsu = "aicr\u00E9ditos-".concat(companyId, "-").concat(Date.now());
                backendUrl = process.env.BACKEND_URL || "";
                frontendUrl = process.env.FRONTEND_URL || "";
                payload = {
                    handle: INFINITEPAY_HANDLE,
                    order_nsu: orderNsu,
                    items: [
                        {
                            quantity: 1,
                            price: pkg.priceInCents,
                            description: "".concat(pkg.name, " \u2014 ").concat(pkg.credits.toLocaleString("pt-BR"), " cr\u00E9ditos de IA")
                        }
                    ],
                    redirect_url: "".concat(frontendUrl, "/creditos-ia?payment=success"),
                    webhook_url: "".concat(backendUrl, "/ai-credits/webhook"),
                    customer: {
                        name: company.name,
                        email: company.email,
                        phone_number: company.phone || undefined
                    }
                };
                return [4 /*yield*/, axios_1["default"].post("".concat(INFINITEPAY_BASE, "/links"), payload, {
                        headers: { "Content-Type": "application/json" }
                    })];
            case 3:
                data = (_a.sent()).data;
                checkoutUrl = (data === null || data === void 0 ? void 0 : data.url) || (data === null || data === void 0 ? void 0 : data.checkout_url) || (data === null || data === void 0 ? void 0 : data.link) || "";
                return [4 /*yield*/, AiCreditOrder_1["default"].create({
                        companyId: companyId,
                        packageId: packageId,
                        credits: pkg.credits,
                        amountInCents: pkg.priceInCents,
                        status: "pending",
                        orderNsu: orderNsu,
                        checkoutUrl: checkoutUrl
                    })];
            case 4:
                order = _a.sent();
                return [2 /*return*/, { checkoutUrl: checkoutUrl, orderId: order.id }];
        }
    });
}); };
exports.createCreditCheckout = createCreditCheckout;
/** Processa webhook de pagamento confirmado da InfinitePay */
var processPaymentWebhook = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var order_nsu, transaction_nsu, invoice_slug, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_nsu = body.order_nsu, transaction_nsu = body.transaction_nsu, invoice_slug = body.invoice_slug;
                return [4 /*yield*/, AiCreditOrder_1["default"].findOne({ where: { orderNsu: order_nsu, status: "pending" } })];
            case 1:
                order = _a.sent();
                if (!order) {
                    logger_1["default"].warn("[AiCredits] Webhook: pedido n\u00E3o encontrado ou j\u00E1 processado: ".concat(order_nsu));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, order.update({
                        status: "paid",
                        transactionNsu: transaction_nsu,
                        invoiceSlug: invoice_slug,
                        paidAt: new Date()
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, AiCreditsService_1.addExtraCredits)(order.companyId, order.credits)];
            case 3:
                _a.sent();
                logger_1["default"].info("[AiCredits] Pagamento confirmado: empresa=".concat(order.companyId, ", cr\u00E9ditos=").concat(order.credits));
                return [2 /*return*/];
        }
    });
}); };
exports.processPaymentWebhook = processPaymentWebhook;
/** Verifica manualmente o status de um pedido na InfinitePay */
var verifyOrderPayment = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var order, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AiCreditOrder_1["default"].findByPk(orderId)];
            case 1:
                order = _a.sent();
                if (!order)
                    throw new Error("Pedido não encontrado");
                if (order.status === "paid")
                    return [2 /*return*/, { paid: true }];
                if (!order.transactionNsu && !order.invoiceSlug)
                    return [2 /*return*/, { paid: false }];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4 /*yield*/, axios_1["default"].post("".concat(INFINITEPAY_BASE, "/payment_check"), {
                        handle: INFINITEPAY_HANDLE,
                        order_nsu: order.orderNsu,
                        transaction_nsu: order.transactionNsu,
                        slug: order.invoiceSlug
                    })];
            case 3:
                data = (_a.sent()).data;
                if (!(data === null || data === void 0 ? void 0 : data.paid)) return [3 /*break*/, 6];
                return [4 /*yield*/, order.update({ status: "paid", paidAt: new Date() })];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, AiCreditsService_1.addExtraCredits)(order.companyId, order.credits)];
            case 5:
                _a.sent();
                return [2 /*return*/, { paid: true }];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                logger_1["default"].error("[AiCredits] Erro ao verificar pagamento:", err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, { paid: false }];
        }
    });
}); };
exports.verifyOrderPayment = verifyOrderPayment;
