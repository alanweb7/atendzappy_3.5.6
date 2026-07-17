"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var ServiceOrder_1 = __importDefault(require("../../models/ServiceOrder"));
var ServiceOrderItem_1 = __importDefault(require("../../models/ServiceOrderItem"));
var Produto_1 = __importDefault(require("../../models/Produto"));
var helpers_1 = require("./helpers");
var ShowServiceOrderService_1 = __importDefault(require("./ShowServiceOrderService"));
var schema = Yup.object().shape({
    companyId: Yup.number().required(),
    orderId: Yup.number().required(),
    customerId: Yup.number().optional(),
    ticketId: Yup.number().optional().nullable(),
    status: Yup.string()
        .oneOf(["aberta", "em_execucao", "concluida", "entregue", "cancelada"])
        .optional(),
    garantiaPrazoDias: Yup.number().optional().nullable(),
    entregaPrevista: Yup.date().optional().nullable()
});
var UpdateServiceOrderService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, orderId, customerId, ticketId, status, garantiaFlag, garantiaPrazoDias, garantiaDescricao, entregaPrevista, pagamentoTipo, gerarFatura, pagamentoManualReferencia, observacoesInternas, observacoesCliente, items, order, customer, ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, schema.validate(data)];
            case 1:
                _a.sent();
                companyId = data.companyId, orderId = data.orderId, customerId = data.customerId, ticketId = data.ticketId, status = data.status, garantiaFlag = data.garantiaFlag, garantiaPrazoDias = data.garantiaPrazoDias, garantiaDescricao = data.garantiaDescricao, entregaPrevista = data.entregaPrevista, pagamentoTipo = data.pagamentoTipo, gerarFatura = data.gerarFatura, pagamentoManualReferencia = data.pagamentoManualReferencia, observacoesInternas = data.observacoesInternas, observacoesCliente = data.observacoesCliente, items = data.items;
                return [4 /*yield*/, ServiceOrder_1["default"].findOne({
                        where: { id: orderId, companyId: companyId },
                        include: [
                            {
                                model: ServiceOrderItem_1["default"],
                                as: "items",
                                include: [
                                    {
                                        model: Produto_1["default"],
                                        as: "product",
                                        attributes: ["id", "controleEstoque"]
                                    }
                                ]
                            }
                        ]
                    })];
            case 2:
                order = _a.sent();
                if (!order) {
                    throw new AppError_1["default"]("ERR_SERVICE_ORDER_NOT_FOUND", 404);
                }
                if (!customerId) return [3 /*break*/, 4];
                return [4 /*yield*/, CrmClient_1["default"].findOne({ where: { id: customerId, companyId: companyId } })];
            case 3:
                customer = _a.sent();
                if (!customer) {
                    throw new AppError_1["default"]("ERR_CLIENT_NOT_FOUND", 404);
                }
                _a.label = 4;
            case 4:
                if (!ticketId) return [3 /*break*/, 6];
                return [4 /*yield*/, Ticket_1["default"].findOne({ where: { id: ticketId, companyId: companyId } })];
            case 5:
                ticket = _a.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                _a.label = 6;
            case 6: return [4 /*yield*/, (0, helpers_1.withTransaction)(function (transaction) { return __awaiter(void 0, void 0, void 0, function () {
                    var adjustments_1, _i, items_1, rawItem, built;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, order.update({
                                    customerId: customerId !== null && customerId !== void 0 ? customerId : order.customerId,
                                    ticketId: ticketId === undefined ? order.ticketId : ticketId,
                                    status: status !== null && status !== void 0 ? status : order.status,
                                    garantiaFlag: garantiaFlag !== null && garantiaFlag !== void 0 ? garantiaFlag : order.garantiaFlag,
                                    garantiaPrazoDias: garantiaPrazoDias !== null && garantiaPrazoDias !== void 0 ? garantiaPrazoDias : order.garantiaPrazoDias,
                                    garantiaDescricao: garantiaDescricao !== null && garantiaDescricao !== void 0 ? garantiaDescricao : order.garantiaDescricao,
                                    entregaPrevista: entregaPrevista !== null && entregaPrevista !== void 0 ? entregaPrevista : order.entregaPrevista,
                                    pagamentoTipo: pagamentoTipo !== null && pagamentoTipo !== void 0 ? pagamentoTipo : order.pagamentoTipo,
                                    gerarFatura: gerarFatura !== null && gerarFatura !== void 0 ? gerarFatura : order.gerarFatura,
                                    pagamentoManualReferencia: pagamentoManualReferencia !== null && pagamentoManualReferencia !== void 0 ? pagamentoManualReferencia : order.pagamentoManualReferencia,
                                    observacoesInternas: observacoesInternas !== null && observacoesInternas !== void 0 ? observacoesInternas : order.observacoesInternas,
                                    observacoesCliente: observacoesCliente !== null && observacoesCliente !== void 0 ? observacoesCliente : order.observacoesCliente
                                }, { transaction: transaction })];
                            case 1:
                                _a.sent();
                                if (!Array.isArray(items)) return [3 /*break*/, 11];
                                adjustments_1 = [];
                                order.items.forEach(function (item) {
                                    var _a;
                                    if (item.itemType === "product" && item.productId && ((_a = item.product) === null || _a === void 0 ? void 0 : _a.controleEstoque)) {
                                        adjustments_1.push({
                                            productId: item.productId,
                                            quantity: Number(item.quantity),
                                            type: "increment"
                                        });
                                    }
                                });
                                return [4 /*yield*/, ServiceOrderItem_1["default"].destroy({ where: { serviceOrderId: order.id }, transaction: transaction })];
                            case 2:
                                _a.sent();
                                _i = 0, items_1 = items;
                                _a.label = 3;
                            case 3:
                                if (!(_i < items_1.length)) return [3 /*break*/, 7];
                                rawItem = items_1[_i];
                                return [4 /*yield*/, (0, helpers_1.buildItemPayload)({ companyId: companyId, input: rawItem })];
                            case 4:
                                built = _a.sent();
                                return [4 /*yield*/, ServiceOrderItem_1["default"].create(__assign(__assign({}, built.payload), { serviceOrderId: order.id, companyId: companyId }), { transaction: transaction })];
                            case 5:
                                _a.sent();
                                if (built.stockDiscount) {
                                    adjustments_1.push({
                                        productId: built.stockDiscount.productId,
                                        quantity: built.stockDiscount.quantity,
                                        type: "decrement"
                                    });
                                }
                                _a.label = 6;
                            case 6:
                                _i++;
                                return [3 /*break*/, 3];
                            case 7:
                                if (!adjustments_1.length) return [3 /*break*/, 9];
                                return [4 /*yield*/, (0, helpers_1.applyStockAdjustments)(companyId, adjustments_1, transaction)];
                            case 8:
                                _a.sent();
                                _a.label = 9;
                            case 9: return [4 /*yield*/, (0, helpers_1.recalcOrderTotals)(order.id, transaction)];
                            case 10:
                                _a.sent();
                                _a.label = 11;
                            case 11: return [2 /*return*/];
                        }
                    });
                }); })];
            case 7:
                _a.sent();
                return [2 /*return*/, (0, ShowServiceOrderService_1["default"])({ companyId: companyId, orderId: order.id })];
        }
    });
}); };
exports["default"] = UpdateServiceOrderService;
