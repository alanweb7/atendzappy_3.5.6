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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var Invoices_1 = __importDefault(require("../../models/Invoices"));
var AiCreditOrder_1 = __importDefault(require("../../models/AiCreditOrder"));
var Company_1 = __importDefault(require("../../models/Company"));
var AiCreditPackage_1 = __importDefault(require("../../models/AiCreditPackage"));
var STATUS_MAP = {
    paid: "paga",
    unpaid: "aberta",
    open: "aberta",
    overdue: "vencida",
    expired: "vencida",
    canceled: "cancelada",
    cancelled: "cancelada"
};
var SyncSuperAdminContasService = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var created, updated, invoices, _i, invoices_1, invoice, statusFatura, companyName, existing, orders, _a, orders_1, order, existing, companyName, dataPagamento;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (companyId !== 1) {
                    throw new AppError_1["default"]("Acesso negado", 403);
                }
                created = 0;
                updated = 0;
                return [4 /*yield*/, Invoices_1["default"].findAll({
                        include: [{ model: Company_1["default"], as: "company" }]
                    })];
            case 1:
                invoices = _d.sent();
                _i = 0, invoices_1 = invoices;
                _d.label = 2;
            case 2:
                if (!(_i < invoices_1.length)) return [3 /*break*/, 8];
                invoice = invoices_1[_i];
                statusFatura = STATUS_MAP[invoice.status] || "aberta";
                companyName = ((_b = invoice.company) === null || _b === void 0 ? void 0 : _b.name) || "Empresa";
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { companyId: 1, tipoReferencia: "invoice_plano", referenciaId: invoice.id }
                    })];
            case 3:
                existing = _d.sent();
                if (!!existing) return [3 /*break*/, 5];
                return [4 /*yield*/, FinanceiroFatura_1["default"].create({
                        companyId: 1,
                        descricao: "".concat(companyName, " \u2014 ").concat(invoice.detail || "Assinatura de Plano"),
                        valor: invoice.value || 0,
                        dataVencimento: invoice.dueDate,
                        status: statusFatura,
                        tipoReferencia: "invoice_plano",
                        referenciaId: invoice.id,
                        ativa: true
                    })];
            case 4:
                _d.sent();
                created++;
                return [3 /*break*/, 7];
            case 5:
                if (!(existing.status !== statusFatura)) return [3 /*break*/, 7];
                return [4 /*yield*/, existing.update({ status: statusFatura })];
            case 6:
                _d.sent();
                updated++;
                _d.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [4 /*yield*/, AiCreditOrder_1["default"].findAll({
                    where: { status: "paid" },
                    include: [
                        { model: Company_1["default"] },
                        { model: AiCreditPackage_1["default"] },
                    ]
                })];
            case 9:
                orders = _d.sent();
                _a = 0, orders_1 = orders;
                _d.label = 10;
            case 10:
                if (!(_a < orders_1.length)) return [3 /*break*/, 14];
                order = orders_1[_a];
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { companyId: 1, tipoReferencia: "credito_ia", referenciaId: order.id }
                    })];
            case 11:
                existing = _d.sent();
                if (!!existing) return [3 /*break*/, 13];
                companyName = ((_c = order.company) === null || _c === void 0 ? void 0 : _c.name) || "Empresa";
                dataPagamento = order.paidAt || order.createdAt;
                return [4 /*yield*/, FinanceiroFatura_1["default"].create({
                        companyId: 1,
                        descricao: "Cr\u00E9ditos IA \u2014 ".concat(order.credits, " cr\u00E9ditos \u2014 ").concat(companyName),
                        valor: order.amountInCents / 100,
                        dataVencimento: dataPagamento,
                        status: "paga",
                        dataPagamento: dataPagamento,
                        tipoReferencia: "credito_ia",
                        referenciaId: order.id,
                        ativa: true
                    })];
            case 12:
                _d.sent();
                created++;
                _d.label = 13;
            case 13:
                _a++;
                return [3 /*break*/, 10];
            case 14: return [2 /*return*/, { created: created, updated: updated }];
        }
    });
}); };
exports["default"] = SyncSuperAdminContasService;
