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
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var socket_1 = require("../../libs/socket");
var Company_1 = __importDefault(require("../../models/Company"));
var AffiliateCommission_1 = __importDefault(require("../../models/AffiliateCommission"));
var getAffiliateModel = function () { return require("../../models/Affiliate")["default"]; };
var statusMap = {
    mercadopago: {
        approved: "paga",
        authorized: "paga",
        in_process: "aberta",
        pending: "aberta",
        in_mediation: "aberta",
        rejected: "cancelada",
        cancelled: "cancelada",
        refunded: "cancelada",
        charged_back: "cancelada"
    },
    asaas: {
        pending: "aberta",
        awaiting: "aberta",
        received: "paga",
        confirmed: "paga",
        received_in_cash: "paga",
        overdue: "vencida",
        expired: "vencida",
        cancelled: "cancelada",
        refunded: "cancelada",
        chargeback_requested: "cancelada",
        chargeback_dispute: "cancelada",
        payment_pending: "aberta",
        payment_awaiting: "aberta",
        payment_overdue: "vencida",
        payment_expired: "vencida",
        payment_cancelled: "cancelada",
        payment_deleted: "cancelada",
        payment_refunded: "cancelada",
        payment_chargeback_requested: "cancelada",
        payment_chargeback_dispute: "cancelada",
        payment_confirmed: "paga",
        payment_received: "paga",
        payment_received_in_cash: "paga"
    }
};
var normalizeStatus = function (provider, status) {
    var _a;
    if (!status) {
        return undefined;
    }
    var normalized = status.toLowerCase();
    return (_a = statusMap[provider]) === null || _a === void 0 ? void 0 : _a[normalized];
};
var HandlePaymentGatewayUpdateService = function (_a) {
    var provider = _a.provider, invoiceId = _a.invoiceId, paymentExternalId = _a.paymentExternalId, status = _a.status, paidAmount = _a.paidAmount, paymentDate = _a.paymentDate;
    return __awaiter(void 0, void 0, void 0, function () {
        var where, fatura, updates, mappedStatus, amount, previousStatus, err_1, io;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    where = {};
                    if (invoiceId) {
                        where.id = Number(invoiceId);
                    }
                    if (!where.id && paymentExternalId) {
                        where.paymentExternalId = String(paymentExternalId);
                    }
                    else if (paymentExternalId) {
                        where.paymentExternalId = String(paymentExternalId);
                    }
                    if (!where.id && !where.paymentExternalId) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({ where: where })];
                case 1:
                    fatura = _b.sent();
                    if (!fatura) {
                        return [2 /*return*/, null];
                    }
                    updates = {};
                    mappedStatus = normalizeStatus(provider, status);
                    if (paymentExternalId) {
                        updates.paymentExternalId = String(paymentExternalId);
                    }
                    if (typeof paidAmount !== "undefined" && paidAmount !== null) {
                        amount = Number(paidAmount);
                        if (!Number.isNaN(amount)) {
                            updates.valorPago = amount.toFixed(2);
                        }
                    }
                    if (mappedStatus) {
                        updates.status = mappedStatus;
                        if (mappedStatus === "paga") {
                            updates.dataPagamento = paymentDate
                                ? new Date(paymentDate)
                                : new Date();
                            if (typeof updates.valorPago === "undefined") {
                                updates.valorPago = Number(fatura.valor || 0).toFixed(2);
                            }
                        }
                        else {
                            updates.dataPagamento = null;
                        }
                    }
                    if (Object.keys(updates).length === 0) {
                        return [2 /*return*/, fatura];
                    }
                    previousStatus = fatura.status;
                    return [4 /*yield*/, fatura.update(updates)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, fatura.reload()];
                case 3:
                    _b.sent();
                    if (!(mappedStatus === "paga" && previousStatus !== "paga")) return [3 /*break*/, 7];
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, createAffiliateCommission(fatura)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.error("Error creating affiliate commission:", err_1);
                    return [3 /*break*/, 7];
                case 7:
                    io = (0, socket_1.getIO)();
                    io.of(String(fatura.companyId)).emit("company-".concat(fatura.companyId, "-financeiro"), {
                        action: "fatura:updated",
                        payload: fatura
                    });
                    return [2 /*return*/, fatura];
            }
        });
    });
};
var createAffiliateCommission = function (fatura) { return __awaiter(void 0, void 0, void 0, function () {
    var company, Affiliate, affiliate, existingCommission, faturaValue, commissionRate, commissionAmount, currentTotal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Company_1["default"].findByPk(fatura.companyId)];
            case 1:
                company = _a.sent();
                if (!company || !company.affiliateId) {
                    return [2 /*return*/]; // Empresa não foi indicada por nenhum afiliado
                }
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findByPk(company.affiliateId)];
            case 2:
                affiliate = _a.sent();
                if (!affiliate || affiliate.status !== "active") {
                    return [2 /*return*/]; // Afiliado não existe ou está inativo
                }
                return [4 /*yield*/, AffiliateCommission_1["default"].findOne({
                        where: {
                            affiliateId: affiliate.id,
                            faturaId: fatura.id
                        }
                    })];
            case 3:
                existingCommission = _a.sent();
                if (existingCommission) {
                    return [2 /*return*/]; // Comissão já foi criada para esta fatura
                }
                faturaValue = parseFloat(String(fatura.valorPago || fatura.valor || 0));
                if (faturaValue <= 0) {
                    return [2 /*return*/];
                }
                commissionRate = parseFloat(String(affiliate.commissionRate || 10));
                commissionAmount = (faturaValue * commissionRate) / 100;
                // Criar comissão
                return [4 /*yield*/, AffiliateCommission_1["default"].create({
                        affiliateId: affiliate.id,
                        referredCompanyId: company.id,
                        faturaId: fatura.id,
                        commissionAmount: commissionAmount.toFixed(2),
                        commissionRate: commissionRate.toFixed(2),
                        status: "pending",
                        notes: "Comiss\u00E3o autom\u00E1tica - Fatura #".concat(fatura.id, " paga por ").concat(company.name),
                        metadata: {
                            faturaValor: faturaValue,
                            faturaDescricao: fatura.descricao,
                            faturaDataPagamento: fatura.dataPagamento,
                            companyName: company.name
                        }
                    })];
            case 4:
                // Criar comissão
                _a.sent();
                currentTotal = parseFloat(String(affiliate.totalEarned || 0));
                return [4 /*yield*/, affiliate.update({
                        totalEarned: (currentTotal + commissionAmount).toFixed(2)
                    })];
            case 5:
                _a.sent();
                console.log("[AFFILIATE] Commission created: R$".concat(commissionAmount.toFixed(2), " for affiliate #").concat(affiliate.id, " from company #").concat(company.id, " (fatura #").concat(fatura.id, ")"));
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = HandlePaymentGatewayUpdateService;
