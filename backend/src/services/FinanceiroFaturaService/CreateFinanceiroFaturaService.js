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
var Yup = __importStar(require("yup"));
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var socket_1 = require("../../libs/socket");
var PaymentGatewayService_1 = require("../PaymentGatewayService");
var generateCheckoutToken_1 = __importDefault(require("./helpers/generateCheckoutToken"));
var SendMessage_1 = require("../../helpers/SendMessage");
var schema = Yup.object().shape({
    companyId: Yup.number().required(),
    clientId: Yup.number().required(),
    descricao: Yup.string().required().max(5000),
    valor: Yup.number().required().moreThan(0),
    status: Yup.string()
        .oneOf(["aberta", "paga", "vencida", "cancelada"])["default"]("aberta"),
    dataVencimento: Yup.date().required(),
    dataPagamento: Yup.date().nullable(),
    tipoReferencia: Yup.string().oneOf(["servico", "produto", "ordem_servico"]).nullable(),
    referenciaId: Yup.number().nullable(),
    tipoRecorrencia: Yup.string()
        .oneOf(["unica", "mensal", "anual"])["default"]("unica"),
    quantidadeCiclos: Yup.number().nullable(),
    cicloAtual: Yup.number()["default"](1),
    dataInicio: Yup.date()["default"](new Date()),
    dataFim: Yup.date().nullable(),
    ativa: Yup.boolean()["default"](true),
    observacoes: Yup.string().nullable(),
    paymentProvider: Yup.mixed()
        .oneOf(["asaas", "mercadopago"])
        .nullable(),
    projectId: Yup.number().nullable()
});
// 🎯 Função para enviar mensagem WhatsApp da fatura
var sendFaturaWhatsAppMessage = function (fatura, client) { return __awaiter(void 0, void 0, void 0, function () {
    var Whatsapp, whatsapp, faturaId, dataVenc, dataFormatada, mensagem, Servico, servico, Produto, produto, ServiceOrder, ordem, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[FATURA-WHATSAPP] \uD83D\uDCCB INICIANDO FUN\u00C7\u00C3O");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                // Verificar se o cliente tem telefone
                if (!client.phone) {
                    console.log("[FATURA-WHATSAPP] ❌ Cliente não tem telefone cadastrado, pulando envio");
                    return [2 /*return*/];
                }
                console.log("[FATURA-WHATSAPP] \uD83D\uDCF1 Cliente tem telefone: ".concat(client.phone));
                Whatsapp = require("../../models/Whatsapp")["default"];
                console.log("[FATURA-WHATSAPP] \uD83D\uDD0D Buscando WhatsApp padr\u00E3o para company: ".concat(fatura.companyId));
                return [4 /*yield*/, Whatsapp.findOne({
                        where: {
                            companyId: fatura.companyId,
                            isDefault: true
                        }
                    })];
            case 2:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    console.log("[FATURA-WHATSAPP] \u274C WhatsApp padr\u00E3o n\u00E3o encontrado para a empresa ".concat(fatura.companyId));
                    return [2 /*return*/];
                }
                console.log("[FATURA-WHATSAPP] \u2705 WhatsApp padr\u00E3o encontrado: ID ".concat(whatsapp.id, ", Nome: ").concat(whatsapp.name));
                faturaId = "FAT-".concat(String(fatura.id).padStart(4, '0'));
                dataVenc = new Date(fatura.dataVencimento);
                dataFormatada = dataVenc.toLocaleDateString('pt-BR');
                mensagem = "\uD83D\uDCB0 *NOVA FATURA GERADA*\n\n";
                mensagem += "\uD83D\uDD22 *Fatura:* ".concat(faturaId, "\n");
                mensagem += "\uD83D\uDCB5 *Valor:* R$ ".concat(parseFloat(fatura.valor).toFixed(2), "\n");
                mensagem += "\uD83D\uDCC5 *Vencimento:* ".concat(dataFormatada, "\n\n");
                if (!(fatura.tipoReferencia && fatura.referenciaId)) return [3 /*break*/, 11];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 10, , 11]);
                if (!(fatura.tipoReferencia === "servico")) return [3 /*break*/, 5];
                Servico = require("../../models/Servico")["default"];
                return [4 /*yield*/, Servico.findOne({
                        where: { id: fatura.referenciaId, companyId: fatura.companyId }
                    })];
            case 4:
                servico = _a.sent();
                if (servico) {
                    mensagem += "\uD83D\uDEE0\uFE0F *Servi\u00E7o:* ".concat(servico.nome, "\n");
                }
                return [3 /*break*/, 9];
            case 5:
                if (!(fatura.tipoReferencia === "produto")) return [3 /*break*/, 7];
                Produto = require("../../models/Produto")["default"];
                return [4 /*yield*/, Produto.findOne({
                        where: { id: fatura.referenciaId, companyId: fatura.companyId }
                    })];
            case 6:
                produto = _a.sent();
                if (produto) {
                    mensagem += "\uD83D\uDCE6 *Produto:* ".concat(produto.nome, "\n");
                }
                return [3 /*break*/, 9];
            case 7:
                if (!(fatura.tipoReferencia === "ordem_servico")) return [3 /*break*/, 9];
                ServiceOrder = require("../../models/ServiceOrder")["default"];
                return [4 /*yield*/, ServiceOrder.findOne({
                        where: { id: fatura.referenciaId, companyId: fatura.companyId }
                    })];
            case 8:
                ordem = _a.sent();
                if (ordem) {
                    mensagem += "\uD83D\uDD27 *Ordem de Servi\u00E7o:* OS-".concat(String(ordem.id).padStart(4, '0'), "\n");
                }
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                console.log("[FATURA-WHATSAPP] Erro ao buscar referência:", error_1);
                return [3 /*break*/, 11];
            case 11:
                // Adicionar link de pagamento se existir
                if (fatura.paymentLink) {
                    mensagem += "\n\uD83D\uDCB3 *Link para Pagamento:*\n".concat(fatura.paymentLink, "\n\n");
                    mensagem += "\uD83D\uDC46 Clique no link acima para pagar sua fatura";
                }
                else {
                    mensagem += "\n\uD83D\uDCA1 *Entre em contato para formas de pagamento*";
                }
                console.log("[FATURA-WHATSAPP] \uD83D\uDCDD Mensagem montada, enviando para ".concat(client.phone));
                console.log("[FATURA-WHATSAPP] \uD83D\uDCDD Mensagem: ".concat(mensagem.substring(0, 100), "..."));
                // Enviar mensagem direto sem criar ticket
                return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                        number: client.phone,
                        body: mensagem
                    })];
            case 12:
                // Enviar mensagem direto sem criar ticket
                _a.sent();
                console.log("[FATURA-WHATSAPP] \u2705 Mensagem enviada com sucesso para ".concat(client.name));
                return [3 /*break*/, 14];
            case 13:
                error_2 = _a.sent();
                console.error("[FATURA-WHATSAPP] ❌ ERRO AO ENVIAR MENSAGEM:", error_2);
                console.error("[FATURA-WHATSAPP] ❌ STACK COMPLETO:", error_2.stack);
                throw error_2;
            case 14: return [2 /*return*/];
        }
    });
}); };
var CreateFinanceiroFaturaService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, client, record, checkoutToken, paymentData, error_3, io, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, schema.validate(data, { abortEarly: false })];
            case 1:
                payload = _b.sent();
                if ((payload.tipoReferencia && !payload.referenciaId) ||
                    (!payload.tipoReferencia && payload.referenciaId)) {
                    throw new AppError_1["default"]("Para vincular uma referência é necessário informar tipo_referencia e referencia_id.", 400);
                }
                if (payload.tipoRecorrencia === "unica" &&
                    (payload.quantidadeCiclos || payload.dataFim)) {
                    throw new AppError_1["default"]("Faturas com recorrência 'unica' não devem possuir quantidade_ciclos ou data_fim.", 400);
                }
                return [4 /*yield*/, CrmClient_1["default"].findOne({
                        where: { id: payload.clientId, companyId: payload.companyId }
                    })];
            case 2:
                client = _b.sent();
                if (!client) {
                    throw new AppError_1["default"]("Cliente não encontrado para esta empresa.", 404);
                }
                return [4 /*yield*/, FinanceiroFatura_1["default"].create({
                        clientId: payload.clientId,
                        descricao: payload.descricao,
                        valor: payload.valor,
                        status: payload.status || "aberta",
                        dataVencimento: payload.dataVencimento,
                        dataPagamento: payload.dataPagamento,
                        tipoRecorrencia: payload.tipoRecorrencia || "unica",
                        quantidadeCiclos: payload.quantidadeCiclos,
                        cicloAtual: payload.cicloAtual || 1,
                        ativa: (_a = payload.ativa) !== null && _a !== void 0 ? _a : true,
                        dataInicio: payload.dataInicio || new Date(),
                        observacoes: payload.observacoes,
                        tipoReferencia: payload.tipoReferencia,
                        referenciaId: payload.referenciaId,
                        paymentProvider: payload.paymentProvider,
                        projectId: payload.projectId,
                        companyId: payload.companyId
                    }, { transaction: payload.transaction })];
            case 3:
                record = _b.sent();
                console.log("✅ [CREATE-FATURA] Fatura criada no banco:", {
                    id: record.id,
                    valor: record.valor
                });
                if (!payload.paymentProvider) return [3 /*break*/, 10];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 9, , 10]);
                checkoutToken = record.checkoutToken;
                if (!!checkoutToken) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, generateCheckoutToken_1["default"])()];
            case 5:
                checkoutToken = _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, (0, PaymentGatewayService_1.generatePaymentLink)({
                    invoice: record,
                    provider: payload.paymentProvider
                })];
            case 7:
                paymentData = _b.sent();
                return [4 /*yield*/, record.update({
                        paymentProvider: payload.paymentProvider,
                        paymentLink: paymentData.paymentLink,
                        paymentExternalId: paymentData.paymentExternalId,
                        checkoutToken: checkoutToken
                    })];
            case 8:
                record = _b.sent();
                return [3 /*break*/, 10];
            case 9:
                error_3 = _b.sent();
                console.error("Erro ao gerar link de pagamento:", error_3);
                return [3 /*break*/, 10];
            case 10:
                io = (0, socket_1.getIO)();
                io.of(String(payload.companyId)).emit("company-".concat(payload.companyId, "-financeiro"), {
                    action: "fatura:created",
                    payload: record
                });
                // 🎯 Enviar mensagem WhatsApp para o cliente
                console.log("[FATURA-WHATSAPP] INICIANDO ENVIO - Fatura ID: ".concat(record.id, ", Cliente: ").concat(client.name));
                console.log("[FATURA-WHATSAPP] Cliente phone: ".concat(client.phone));
                console.log("[FATURA-WHATSAPP] Company ID: ".concat(record.companyId));
                _b.label = 11;
            case 11:
                _b.trys.push([11, 13, , 14]);
                return [4 /*yield*/, sendFaturaWhatsAppMessage(record, client)];
            case 12:
                _b.sent();
                console.log("[FATURA-WHATSAPP] \u2705 ENVIO CONCLU\u00CDDO COM SUCESSO");
                return [3 /*break*/, 14];
            case 13:
                error_4 = _b.sent();
                console.error("[FATURA-WHATSAPP] ❌ ERRO NO ENVIO:", error_4);
                console.error("[FATURA-WHATSAPP] ❌ STACK:", error_4.stack);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/, record];
        }
    });
}); };
exports["default"] = CreateFinanceiroFaturaService;
