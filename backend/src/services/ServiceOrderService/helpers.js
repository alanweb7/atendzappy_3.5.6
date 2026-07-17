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
exports.applyStockAdjustments = exports.withTransaction = exports.recalcOrderTotals = exports.buildItemPayload = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../../database"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ServiceOrder_1 = __importDefault(require("../../models/ServiceOrder"));
var ServiceOrderItem_1 = __importDefault(require("../../models/ServiceOrderItem"));
var Produto_1 = __importDefault(require("../../models/Produto"));
var Servico_1 = __importDefault(require("../../models/Servico"));
var buildItemPayload = function (_a) {
    var companyId = _a.companyId, input = _a.input;
    return __awaiter(void 0, void 0, void 0, function () {
        var quantity, discount, service, unitPrice_1, product, unitPrice;
        var _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    quantity = Number((_b = input.quantity) !== null && _b !== void 0 ? _b : 1);
                    if (quantity <= 0) {
                        throw new AppError_1["default"]("ERR_SERVICE_ORDER_INVALID_QUANTITY", 400);
                    }
                    discount = Number((_c = input.discount) !== null && _c !== void 0 ? _c : 0);
                    if (!(input.itemType === "service")) return [3 /*break*/, 2];
                    if (!input.serviceId) {
                        throw new AppError_1["default"]("ERR_SERVICE_ORDER_SERVICE_REQUIRED", 400);
                    }
                    return [4 /*yield*/, Servico_1["default"].findOne({ where: { id: input.serviceId, companyId: companyId } })];
                case 1:
                    service = _j.sent();
                    if (!service) {
                        throw new AppError_1["default"]("ERR_SERVICE_NOT_FOUND", 404);
                    }
                    unitPrice_1 = Number((_e = (_d = input.unitPrice) !== null && _d !== void 0 ? _d : service.valorOriginal) !== null && _e !== void 0 ? _e : 0);
                    return [2 /*return*/, {
                            payload: {
                                itemType: "service",
                                serviceId: service.id,
                                productId: null,
                                description: input.description || service.nome,
                                quantity: quantity,
                                unitPrice: unitPrice_1,
                                discount: discount,
                                total: quantity * unitPrice_1 - discount
                            }
                        }];
                case 2:
                    if (!input.productId) {
                        throw new AppError_1["default"]("ERR_SERVICE_ORDER_PRODUCT_REQUIRED", 400);
                    }
                    return [4 /*yield*/, Produto_1["default"].findOne({ where: { id: input.productId, companyId: companyId } })];
                case 3:
                    product = _j.sent();
                    if (!product) {
                        throw new AppError_1["default"]("ERR_PRODUCT_NOT_FOUND", 404);
                    }
                    if (product.controleEstoque && quantity > ((_f = product.estoqueAtual) !== null && _f !== void 0 ? _f : 0)) {
                        throw new AppError_1["default"]("ERR_PRODUCT_STOCK_UNAVAILABLE", 400);
                    }
                    unitPrice = Number((_h = (_g = input.unitPrice) !== null && _g !== void 0 ? _g : product.valor) !== null && _h !== void 0 ? _h : 0);
                    return [2 /*return*/, {
                            payload: {
                                itemType: "product",
                                productId: product.id,
                                serviceId: null,
                                description: input.description || product.nome,
                                quantity: quantity,
                                unitPrice: unitPrice,
                                discount: discount,
                                total: quantity * unitPrice - discount
                            },
                            stockDiscount: product.controleEstoque
                                ? {
                                    productId: product.id,
                                    quantity: quantity
                                }
                                : undefined
                        }];
            }
        });
    });
};
exports.buildItemPayload = buildItemPayload;
var recalcOrderTotals = function (orderId, transaction) { return __awaiter(void 0, void 0, void 0, function () {
    var items, subtotal, descontos, total;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ServiceOrderItem_1["default"].findAll({ where: { serviceOrderId: orderId }, transaction: transaction })];
            case 1:
                items = _a.sent();
                subtotal = items.reduce(function (acc, item) { return acc + Number(item.unitPrice) * Number(item.quantity); }, 0);
                descontos = items.reduce(function (acc, item) { var _a; return acc + Number((_a = item.discount) !== null && _a !== void 0 ? _a : 0); }, 0);
                total = items.reduce(function (acc, item) { var _a; return acc + Number((_a = item.total) !== null && _a !== void 0 ? _a : 0); }, 0);
                return [4 /*yield*/, ServiceOrder_1["default"].update({ subtotal: subtotal, descontos: descontos, total: total }, { where: { id: orderId }, transaction: transaction })];
            case 2:
                _a.sent();
                return [2 /*return*/, { subtotal: subtotal, descontos: descontos, total: total }];
        }
    });
}); };
exports.recalcOrderTotals = recalcOrderTotals;
var withTransaction = function (fn) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1["default"].transaction()];
            case 1:
                transaction = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 7]);
                return [4 /*yield*/, fn(transaction)];
            case 3:
                result = _a.sent();
                return [4 /*yield*/, transaction.commit()];
            case 4:
                _a.sent();
                return [2 /*return*/, result];
            case 5:
                error_1 = _a.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 6:
                _a.sent();
                throw error_1;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.withTransaction = withTransaction;
var applyStockAdjustments = function (companyId, adjustments, transaction) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, adjustments_1, adj, expression;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, adjustments_1 = adjustments;
                _a.label = 1;
            case 1:
                if (!(_i < adjustments_1.length)) return [3 /*break*/, 4];
                adj = adjustments_1[_i];
                expression = adj.type === "decrement"
                    ? (0, sequelize_1.literal)("GREATEST(0, \"estoqueAtual\" - ".concat(adj.quantity, ")"))
                    : (0, sequelize_1.literal)("COALESCE(\"estoqueAtual\", 0) + ".concat(adj.quantity));
                return [4 /*yield*/, Produto_1["default"].update({ estoqueAtual: expression }, { where: { id: adj.productId, companyId: companyId }, transaction: transaction })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.applyStockAdjustments = applyStockAdjustments;
