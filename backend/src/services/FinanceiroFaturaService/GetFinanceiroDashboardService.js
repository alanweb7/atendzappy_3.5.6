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
var sequelize_1 = require("sequelize");
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var FinanceiroDespesa_1 = __importDefault(require("../../models/FinanceiroDespesa"));
var GetFinanceiroDashboardService = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var hoje, inicioMes, _a, totalAReceber, totalVencidoReceber, recebidoMes, totalFaturasAberto, totalAPagar, totalVencidoPagar, pagoMes, receber, pagar;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                hoje = new Date();
                inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
                return [4 /*yield*/, Promise.all([
                        FinanceiroFatura_1["default"].sum("valor", {
                            where: { companyId: companyId, status: (_b = {}, _b[sequelize_1.Op["in"]] = ["aberta", "vencida"], _b), ativa: true }
                        }),
                        FinanceiroFatura_1["default"].sum("valor", {
                            where: { companyId: companyId, status: "vencida", ativa: true }
                        }),
                        FinanceiroFatura_1["default"].sum("valorPago", {
                            where: {
                                companyId: companyId,
                                status: "paga",
                                dataPagamento: (_c = {}, _c[sequelize_1.Op.gte] = inicioMes, _c)
                            }
                        }),
                        FinanceiroFatura_1["default"].count({
                            where: { companyId: companyId, status: (_d = {}, _d[sequelize_1.Op["in"]] = ["aberta", "vencida"], _d), ativa: true }
                        }),
                        FinanceiroDespesa_1["default"].sum("valor", {
                            where: { companyId: companyId, status: (_e = {}, _e[sequelize_1.Op["in"]] = ["aberta", "vencida"], _e) }
                        }),
                        FinanceiroDespesa_1["default"].sum("valor", {
                            where: { companyId: companyId, status: "vencida" }
                        }),
                        FinanceiroDespesa_1["default"].sum("valorPago", {
                            where: {
                                companyId: companyId,
                                status: "paga",
                                dataPagamento: (_f = {}, _f[sequelize_1.Op.gte] = inicioMes, _f)
                            }
                        }),
                    ])];
            case 1:
                _a = _g.sent(), totalAReceber = _a[0], totalVencidoReceber = _a[1], recebidoMes = _a[2], totalFaturasAberto = _a[3], totalAPagar = _a[4], totalVencidoPagar = _a[5], pagoMes = _a[6];
                receber = Number(totalAReceber) || 0;
                pagar = Number(totalAPagar) || 0;
                return [2 /*return*/, {
                        totalAReceber: receber,
                        totalAPagar: pagar,
                        totalVencidoReceber: Number(totalVencidoReceber) || 0,
                        totalVencidoPagar: Number(totalVencidoPagar) || 0,
                        recebidoMes: Number(recebidoMes) || 0,
                        pagoMes: Number(pagoMes) || 0,
                        saldoProjetado: receber - pagar,
                        totalFaturasAberto: totalFaturasAberto || 0
                    }];
        }
    });
}); };
exports["default"] = GetFinanceiroDashboardService;
