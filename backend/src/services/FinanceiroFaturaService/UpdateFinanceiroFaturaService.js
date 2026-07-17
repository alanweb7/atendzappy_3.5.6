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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Yup = __importStar(require("yup"));
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var socket_1 = require("../../libs/socket");
var PaymentGatewayService_1 = require("../PaymentGatewayService");
var generateCheckoutToken_1 = __importDefault(require("./helpers/generateCheckoutToken"));
var schema = Yup.object().shape({
    descricao: Yup.string().max(5000),
    valor: Yup.number().positive(),
    status: Yup.string().oneOf(["aberta", "paga", "vencida", "cancelada"]),
    dataVencimento: Yup.date(),
    dataPagamento: Yup.date().nullable(),
    tipoReferencia: Yup.string().oneOf(["servico", "produto", "ordem_servico"]).nullable(),
    referenciaId: Yup.number().nullable(),
    tipoRecorrencia: Yup.string().oneOf(["unica", "mensal", "anual"]),
    quantidadeCiclos: Yup.number().integer().positive().nullable(),
    cicloAtual: Yup.number().integer().min(1),
    dataInicio: Yup.date(),
    dataFim: Yup.date().nullable(),
    ativa: Yup.boolean(),
    observacoes: Yup.string().nullable(),
    paymentProvider: Yup.mixed()
        .oneOf(["asaas", "mercadopago"])
        .nullable()
});
var UpdateFinanceiroFaturaService = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var record, data, previousSnapshot, paymentProvider, updatableFields, providerChanged, checkoutToken, paymentData, statusChanged, baseFieldsChanged, canSyncAsaas, payload, paymentData, value, io;
    var id = _a.id, companyId = _a.companyId, fields = __rest(_a, ["id", "companyId"]);
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                    where: { id: id, companyId: companyId }
                })];
            case 1:
                record = _b.sent();
                if (!record) {
                    throw new AppError_1["default"]("Fatura não encontrada.", 404);
                }
                return [4 /*yield*/, schema.validate(fields, { abortEarly: false })];
            case 2:
                data = _b.sent();
                previousSnapshot = record.get({ plain: true });
                paymentProvider = data.paymentProvider, updatableFields = __rest(data, ["paymentProvider"]);
                if ((typeof data.tipoReferencia !== "undefined" ||
                    typeof data.referenciaId !== "undefined") &&
                    ((data.tipoReferencia && !data.referenciaId) ||
                        (!data.tipoReferencia && data.referenciaId))) {
                    throw new AppError_1["default"]("Para vincular uma referência é necessário informar tipo_referencia e referencia_id.", 400);
                }
                if (data.tipoRecorrencia === "unica" &&
                    (typeof data.quantidadeCiclos !== "undefined" ||
                        typeof data.dataFim !== "undefined")) {
                    throw new AppError_1["default"]("Faturas com recorrência 'unica' não devem possuir quantidade_ciclos ou data_fim.", 400);
                }
                if (!(Object.keys(updatableFields).length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, record.update(updatableFields)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!(typeof paymentProvider !== "undefined")) return [3 /*break*/, 13];
                providerChanged = record.paymentProvider &&
                    record.paymentExternalId &&
                    (paymentProvider !== record.paymentProvider || !paymentProvider);
                if (!providerChanged) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, PaymentGatewayService_1.cancelGatewayPayment)(record)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                if (!paymentProvider) return [3 /*break*/, 11];
                checkoutToken = record.checkoutToken;
                if (!!checkoutToken) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, generateCheckoutToken_1["default"])()];
            case 7:
                checkoutToken = _b.sent();
                _b.label = 8;
            case 8: return [4 /*yield*/, (0, PaymentGatewayService_1.generatePaymentLink)({
                    invoice: record,
                    provider: paymentProvider
                })];
            case 9:
                paymentData = _b.sent();
                return [4 /*yield*/, record.update({
                        paymentProvider: paymentProvider,
                        paymentLink: paymentData.paymentLink,
                        paymentExternalId: paymentData.paymentExternalId,
                        checkoutToken: checkoutToken
                    })];
            case 10:
                _b.sent();
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, record.update({
                    paymentProvider: null,
                    paymentLink: null,
                    paymentExternalId: null,
                    checkoutToken: null
                })];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [4 /*yield*/, record.reload()];
            case 14:
                _b.sent();
                statusChanged = typeof data.status !== "undefined" && data.status !== previousSnapshot.status;
                baseFieldsChanged = typeof data.valor !== "undefined" ||
                    typeof data.descricao !== "undefined" ||
                    typeof data.dataVencimento !== "undefined";
                canSyncAsaas = record.paymentProvider === "asaas" && Boolean(record.paymentExternalId);
                if (!baseFieldsChanged) return [3 /*break*/, 21];
                if (!canSyncAsaas) return [3 /*break*/, 17];
                payload = {};
                if (typeof data.valor !== "undefined") {
                    payload.value = Number(record.valor);
                }
                if (typeof data.descricao !== "undefined") {
                    payload.description = record.descricao;
                }
                if (typeof data.dataVencimento !== "undefined") {
                    payload.dueDate = record.dataVencimento
                        ? new Date(record.dataVencimento).toISOString().substring(0, 10)
                        : undefined;
                }
                if (!(Object.keys(payload).length > 0)) return [3 /*break*/, 16];
                return [4 /*yield*/, (0, PaymentGatewayService_1.updateAsaasPayment)(record, payload)];
            case 15:
                _b.sent();
                _b.label = 16;
            case 16: return [3 /*break*/, 21];
            case 17:
                if (!(record.paymentProvider === "mercadopago")) return [3 /*break*/, 21];
                return [4 /*yield*/, (0, PaymentGatewayService_1.cancelGatewayPayment)(record)];
            case 18:
                _b.sent();
                return [4 /*yield*/, (0, PaymentGatewayService_1.generatePaymentLink)({
                        invoice: record,
                        provider: "mercadopago"
                    })];
            case 19:
                paymentData = _b.sent();
                return [4 /*yield*/, record.update({
                        paymentLink: paymentData.paymentLink,
                        paymentExternalId: paymentData.paymentExternalId
                    })];
            case 20:
                _b.sent();
                _b.label = 21;
            case 21:
                if (!statusChanged) return [3 /*break*/, 26];
                if (!(record.status === "paga")) return [3 /*break*/, 24];
                if (!(record.paymentProvider === "asaas")) return [3 /*break*/, 23];
                value = Number(record.valorPago || record.valor || 0);
                return [4 /*yield*/, (0, PaymentGatewayService_1.receiveAsaasPayment)(record, {
                        value: value,
                        paymentDate: record.dataPagamento
                    })];
            case 22:
                _b.sent();
                _b.label = 23;
            case 23: return [3 /*break*/, 26];
            case 24:
                if (!(record.status === "cancelada")) return [3 /*break*/, 26];
                return [4 /*yield*/, (0, PaymentGatewayService_1.cancelGatewayPayment)(record)];
            case 25:
                _b.sent();
                _b.label = 26;
            case 26:
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-financeiro"), {
                    action: "fatura:updated",
                    payload: record
                });
                return [2 /*return*/, record];
        }
    });
}); };
exports["default"] = UpdateFinanceiroFaturaService;
