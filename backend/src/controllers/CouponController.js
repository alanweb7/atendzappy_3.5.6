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
exports.deleteCoupon = exports.updateCoupon = exports.createCoupon = exports.listCoupons = exports.validateCoupon = void 0;
var Coupon_1 = __importDefault(require("../models/Coupon"));
var affiliateUtils_1 = require("../utils/affiliateUtils");
// Validar cupom (público)
var validateCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, planAmount, validation, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                code = req.params.code;
                planAmount = req.query.planAmount;
                if (!code) {
                    return [2 /*return*/, res.status(400).json({ error: "Código do cupom não fornecido" })];
                }
                return [4 /*yield*/, (0, affiliateUtils_1.validateCoupon)(code, parseFloat(planAmount))];
            case 1:
                validation = _a.sent();
                return [2 /*return*/, res.json(validation)];
            case 2:
                error_1 = _a.sent();
                console.error("Error validating coupon:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validateCoupon = validateCoupon;
// Listar cupons (super admin)
var listCoupons = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coupons, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Coupon_1["default"].findAll({
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                coupons = _a.sent();
                return [2 /*return*/, res.json(coupons)];
            case 2:
                error_2 = _a.sent();
                console.error("Error listing coupons:", error_2);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listCoupons = listCoupons;
// Criar cupom (super admin)
var createCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, code, _b, discountType, discountValue, _c, minPlanAmount, maxUses, validUntil, _d, isActive, description, existingCoupon, coupon, error_3;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                _a = req.body, name_1 = _a.name, code = _a.code, _b = _a.discountType, discountType = _b === void 0 ? "percentage" : _b, discountValue = _a.discountValue, _c = _a.minPlanAmount, minPlanAmount = _c === void 0 ? 0 : _c, maxUses = _a.maxUses, validUntil = _a.validUntil, _d = _a.isActive, isActive = _d === void 0 ? true : _d, description = _a.description;
                return [4 /*yield*/, Coupon_1["default"].findOne({
                        where: { code: code.toUpperCase() }
                    })];
            case 1:
                existingCoupon = _e.sent();
                if (existingCoupon) {
                    return [2 /*return*/, res.status(400).json({ error: "Código de cupom já existe" })];
                }
                return [4 /*yield*/, Coupon_1["default"].create({
                        name: name_1,
                        code: code.toUpperCase(),
                        discountType: discountType,
                        discountValue: discountValue,
                        minPlanAmount: minPlanAmount,
                        maxUses: maxUses,
                        usedCount: 0,
                        validUntil: validUntil,
                        isActive: isActive,
                        description: description
                    })];
            case 2:
                coupon = _e.sent();
                return [2 /*return*/, res.status(201).json(coupon)];
            case 3:
                error_3 = _e.sent();
                console.error("Error creating coupon:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCoupon = createCoupon;
// Atualizar cupom (super admin)
var updateCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, code, discountType, discountValue, minPlanAmount, maxUses, validUntil, isActive, description, coupon, existingCoupon, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                id = req.params.id;
                _a = req.body, name_2 = _a.name, code = _a.code, discountType = _a.discountType, discountValue = _a.discountValue, minPlanAmount = _a.minPlanAmount, maxUses = _a.maxUses, validUntil = _a.validUntil, isActive = _a.isActive, description = _a.description;
                return [4 /*yield*/, Coupon_1["default"].findByPk(id)];
            case 1:
                coupon = _b.sent();
                if (!coupon) {
                    return [2 /*return*/, res.status(404).json({ error: "Cupom não encontrado" })];
                }
                if (!(code && code !== coupon.code)) return [3 /*break*/, 3];
                return [4 /*yield*/, Coupon_1["default"].findOne({
                        where: { code: code.toUpperCase() }
                    })];
            case 2:
                existingCoupon = _b.sent();
                if (existingCoupon) {
                    return [2 /*return*/, res.status(400).json({ error: "Código de cupom já existe" })];
                }
                _b.label = 3;
            case 3: return [4 /*yield*/, coupon.update({
                    name: name_2 || coupon.name,
                    code: code ? code.toUpperCase() : coupon.code,
                    discountType: discountType || coupon.discountType,
                    discountValue: discountValue || coupon.discountValue,
                    minPlanAmount: minPlanAmount !== undefined ? minPlanAmount : coupon.minPlanAmount,
                    maxUses: maxUses !== undefined ? maxUses : coupon.maxUses,
                    validUntil: validUntil || coupon.validUntil,
                    isActive: isActive !== undefined ? isActive : coupon.isActive,
                    description: description !== undefined ? description : coupon.description
                })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json(coupon)];
            case 5:
                error_4 = _b.sent();
                console.error("Error updating coupon:", error_4);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateCoupon = updateCoupon;
// Deletar cupom (super admin)
var deleteCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, coupon, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Coupon_1["default"].findByPk(id)];
            case 1:
                coupon = _a.sent();
                if (!coupon) {
                    return [2 /*return*/, res.status(404).json({ error: "Cupom não encontrado" })];
                }
                return [4 /*yield*/, coupon.destroy()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
            case 3:
                error_5 = _a.sent();
                console.error("Error deleting coupon:", error_5);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCoupon = deleteCoupon;
