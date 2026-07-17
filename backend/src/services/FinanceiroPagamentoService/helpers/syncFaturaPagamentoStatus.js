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
var FinanceiroFatura_1 = __importDefault(require("../../../models/FinanceiroFatura"));
var FinanceiroPagamento_1 = __importDefault(require("../../../models/FinanceiroPagamento"));
var syncFaturaPagamentoStatus = function (_a) {
    var companyId = _a.companyId, faturaId = _a.faturaId, transaction = _a.transaction;
    return __awaiter(void 0, void 0, void 0, function () {
        var fatura, totalPagoRaw, totalPago, valorFatura, ultimoPagamento, novoStatus, dataPagamento, isCancelada, isTotalQuitado, venceu;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { id: faturaId, companyId: companyId },
                        transaction: transaction
                    })];
                case 1:
                    fatura = _b.sent();
                    if (!fatura) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, FinanceiroPagamento_1["default"].sum("valor", {
                            where: { companyId: companyId, faturaId: faturaId },
                            transaction: transaction
                        })];
                case 2:
                    totalPagoRaw = _b.sent();
                    totalPago = Number(totalPagoRaw || 0);
                    valorFatura = Number(fatura.valor || 0);
                    return [4 /*yield*/, FinanceiroPagamento_1["default"].findOne({
                            where: { companyId: companyId, faturaId: faturaId },
                            order: [
                                ["dataPagamento", "DESC"],
                                ["id", "DESC"]
                            ],
                            transaction: transaction
                        })];
                case 3:
                    ultimoPagamento = _b.sent();
                    novoStatus = fatura.status;
                    dataPagamento = (ultimoPagamento === null || ultimoPagamento === void 0 ? void 0 : ultimoPagamento.dataPagamento) || null;
                    isCancelada = fatura.status === "cancelada";
                    isTotalQuitado = valorFatura <= 0 || totalPago >= valorFatura;
                    venceu = !!fatura.dataVencimento &&
                        new Date(fatura.dataVencimento).setHours(0, 0, 0, 0) <
                            new Date().setHours(0, 0, 0, 0);
                    if (!isCancelada) {
                        if (isTotalQuitado) {
                            novoStatus = "paga";
                            if (!dataPagamento) {
                                dataPagamento = new Date();
                            }
                        }
                        else if (venceu) {
                            novoStatus = "vencida";
                            dataPagamento = null;
                        }
                        else {
                            novoStatus = "aberta";
                            dataPagamento = null;
                        }
                    }
                    return [4 /*yield*/, fatura.update({
                            status: novoStatus,
                            dataPagamento: dataPagamento,
                            valorPago: totalPago
                        }, { transaction: transaction })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports["default"] = syncFaturaPagamentoStatus;
