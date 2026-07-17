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
exports.asaasWebhook = exports.mercadoPagoWebhook = void 0;
var Sentry = __importStar(require("@sentry/node"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var HandlePaymentGatewayUpdateService_1 = __importDefault(require("../services/FinanceiroFaturaService/HandlePaymentGatewayUpdateService"));
var PaymentGatewayService_1 = require("../services/PaymentGatewayService");
var FinanceiroFatura_1 = __importDefault(require("../models/FinanceiroFatura"));
var mercadopago = require("mercadopago");
var safeNumber = function (value) {
    if (typeof value === "number" && !Number.isNaN(value)) {
        return value;
    }
    if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
        return Number(value);
    }
    return undefined;
};
var findInvoiceCompany = function (invoiceId) { return __awaiter(void 0, void 0, void 0, function () {
    var record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!invoiceId) {
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, FinanceiroFatura_1["default"].findByPk(invoiceId)];
            case 1:
                record = _a.sent();
                return [2 /*return*/, record === null || record === void 0 ? void 0 : record.companyId];
        }
    });
}); };
var mercadoPagoWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentId, invoiceIdParam, companyId, tokenRecord, payment, paymentBody, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                paymentId = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.id) || ((_c = req.body) === null || _c === void 0 ? void 0 : _c.id);
                if (!paymentId) {
                    return [2 /*return*/, res.status(200).json({ ignored: true })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, , 8]);
                invoiceIdParam = safeNumber(req.query.invoiceId);
                companyId = safeNumber(req.query.companyId);
                if (!(!companyId && invoiceIdParam)) return [3 /*break*/, 3];
                return [4 /*yield*/, findInvoiceCompany(invoiceIdParam)];
            case 2:
                companyId = _d.sent();
                _d.label = 3;
            case 3:
                if (!companyId) {
                    throw new AppError_1["default"]("companyId não informado no webhook.", 400);
                }
                return [4 /*yield*/, (0, PaymentGatewayService_1.getCompanyPaymentToken)(companyId, "mercadopago")];
            case 4:
                tokenRecord = _d.sent();
                mercadopago.configure({
                    access_token: tokenRecord.token
                });
                return [4 /*yield*/, mercadopago.payment.get(paymentId)];
            case 5:
                payment = _d.sent();
                paymentBody = payment === null || payment === void 0 ? void 0 : payment.body;
                return [4 /*yield*/, (0, HandlePaymentGatewayUpdateService_1["default"])({
                        provider: "mercadopago",
                        invoiceId: invoiceIdParam || (paymentBody === null || paymentBody === void 0 ? void 0 : paymentBody.external_reference),
                        paymentExternalId: paymentBody === null || paymentBody === void 0 ? void 0 : paymentBody.id,
                        status: paymentBody === null || paymentBody === void 0 ? void 0 : paymentBody.status,
                        paidAmount: paymentBody === null || paymentBody === void 0 ? void 0 : paymentBody.transaction_amount,
                        paymentDate: paymentBody === null || paymentBody === void 0 ? void 0 : paymentBody.date_approved
                    })];
            case 6:
                _d.sent();
                return [2 /*return*/, res.status(200).json({ ok: true })];
            case 7:
                error_1 = _d.sent();
                Sentry.captureException(error_1);
                console.error("MercadoPago webhook error:", error_1);
                return [2 /*return*/, res.status(200).json({ ok: false })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.mercadoPagoWebhook = mercadoPagoWebhook;
var asaasWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, payment, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                payload = req.body;
                payment = (payload === null || payload === void 0 ? void 0 : payload.payment) || ((_a = payload === null || payload === void 0 ? void 0 : payload.data) === null || _a === void 0 ? void 0 : _a.payment) || payload;
                if (!payment) {
                    return [2 /*return*/, res.status(200).json({ ignored: true })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, HandlePaymentGatewayUpdateService_1["default"])({
                        provider: "asaas",
                        invoiceId: payment.externalReference,
                        paymentExternalId: payment.id,
                        status: payment.status || (payload === null || payload === void 0 ? void 0 : payload.event),
                        paidAmount: payment.value,
                        paymentDate: payment.receivedDate ||
                            payment.confirmedDate ||
                            payment.paymentDate ||
                            payment.dateCreated
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ ok: true })];
            case 3:
                error_2 = _b.sent();
                Sentry.captureException(error_2);
                console.error("Asaas webhook error:", error_2);
                return [2 /*return*/, res.status(200).json({ ok: false })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.asaasWebhook = asaasWebhook;
