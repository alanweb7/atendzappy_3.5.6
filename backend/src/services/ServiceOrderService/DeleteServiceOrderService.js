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
var ServiceOrder_1 = __importDefault(require("../../models/ServiceOrder"));
var ServiceOrderItem_1 = __importDefault(require("../../models/ServiceOrderItem"));
var Produto_1 = __importDefault(require("../../models/Produto"));
var helpers_1 = require("./helpers");
var DeleteServiceOrderService = function (_a) {
    var companyId = _a.companyId, orderId = _a.orderId;
    return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ServiceOrder_1["default"].findOne({
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
                case 1:
                    order = _b.sent();
                    if (!order) {
                        throw new AppError_1["default"]("ERR_SERVICE_ORDER_NOT_FOUND", 404);
                    }
                    return [4 /*yield*/, (0, helpers_1.withTransaction)(function (transaction) { return __awaiter(void 0, void 0, void 0, function () {
                            var adjustments;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        adjustments = [];
                                        order.items.forEach(function (item) {
                                            var _a;
                                            if (item.itemType === "product" && item.productId && ((_a = item.product) === null || _a === void 0 ? void 0 : _a.controleEstoque)) {
                                                adjustments.push({
                                                    productId: item.productId,
                                                    quantity: Number(item.quantity),
                                                    type: "increment"
                                                });
                                            }
                                        });
                                        return [4 /*yield*/, ServiceOrderItem_1["default"].destroy({ where: { serviceOrderId: order.id }, transaction: transaction })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, order.destroy({ transaction: transaction })];
                                    case 2:
                                        _a.sent();
                                        if (!adjustments.length) return [3 /*break*/, 4];
                                        return [4 /*yield*/, (0, helpers_1.applyStockAdjustments)(companyId, adjustments, transaction)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports["default"] = DeleteServiceOrderService;
