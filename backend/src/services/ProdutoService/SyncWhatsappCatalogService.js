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
exports.deleteProdutoFromWhatsapp = exports.syncProdutoToWhatsapp = void 0;
// @ts-nocheck
var ProdutoWhatsappSync_1 = __importDefault(require("../../models/ProdutoWhatsappSync"));
var Produto_1 = __importDefault(require("../../models/Produto"));
var wbot_1 = require("../../libs/wbot");
var logger_1 = __importDefault(require("../../utils/logger"));
var buildCatalogPayload = function (produto) {
    var payload = {
        name: produto.nome,
        description: produto.descricao || "",
        price: produto.valor ? Math.round(Number(produto.valor) * 100) : undefined,
        currency: "BRL",
        url: produto.linkCompra || undefined,
        retailerId: String(produto.id)
    };
    if (produto.imagem_principal) {
        var baseUrl = (process.env.BACKEND_URL || "").replace(/\/$/, "");
        // imagem_principal já contém o caminho relativo completo (ex: company1/produtos/arquivo.png)
        var imageUrl = "".concat(baseUrl, "/public/").concat(produto.imagem_principal);
        payload.images = [{ url: imageUrl }];
    }
    return payload;
};
var syncConnection = function (wbot, produto, syncRecord, operation) { return __awaiter(void 0, void 0, void 0, function () {
    var catalogPayload, whatsappProductId, result, err_1, errorMsg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                catalogPayload = buildCatalogPayload(produto);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 13]);
                whatsappProductId = syncRecord.whatsappProductId;
                if (!(operation === "delete")) return [3 /*break*/, 5];
                if (!!whatsappProductId) return [3 /*break*/, 3];
                return [4 /*yield*/, syncRecord.update({ syncStatus: "synced", syncError: null, lastSyncAt: new Date() })];
            case 2:
                _a.sent();
                return [2 /*return*/];
            case 3: return [4 /*yield*/, wbot.productDelete([whatsappProductId])];
            case 4:
                _a.sent();
                return [3 /*break*/, 9];
            case 5:
                if (!(operation === "create" || !whatsappProductId)) return [3 /*break*/, 7];
                return [4 /*yield*/, wbot.productCreate(catalogPayload)];
            case 6:
                result = _a.sent();
                whatsappProductId = (result === null || result === void 0 ? void 0 : result.id) || (result === null || result === void 0 ? void 0 : result.productId) || null;
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, wbot.productUpdate(whatsappProductId, catalogPayload)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, syncRecord.update({
                    whatsappProductId: whatsappProductId,
                    syncStatus: "synced",
                    syncError: null,
                    lastSyncAt: new Date()
                })];
            case 10:
                _a.sent();
                logger_1["default"].info("[CatalogSync] produto=".concat(produto.id, " whatsapp=").concat(syncRecord.whatsappId, " op=").concat(operation, " ok"));
                return [3 /*break*/, 13];
            case 11:
                err_1 = _a.sent();
                errorMsg = (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || String(err_1);
                logger_1["default"].error("[CatalogSync] erro produto=".concat(produto.id, " whatsapp=").concat(syncRecord.whatsappId, ": ").concat(errorMsg));
                return [4 /*yield*/, syncRecord.update({
                        syncStatus: "error",
                        syncError: errorMsg,
                        lastSyncAt: new Date()
                    })];
            case 12:
                _a.sent();
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
var syncProdutoToWhatsapp = function (_a) {
    var produtoId = _a.produtoId, companyId = _a.companyId, whatsappIds = _a.whatsappIds;
    return __awaiter(void 0, void 0, void 0, function () {
        var produto, existingSyncs, existingMap, newIds, oldIds, _i, oldIds_1, whatsappId, syncRecord, wbot, _b, _c, newIds_1, whatsappId, syncRecord, wbot, operation, err_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Produto_1["default"].findOne({ where: { id: produtoId, companyId: companyId } })];
                case 1:
                    produto = _d.sent();
                    if (!produto)
                        return [2 /*return*/];
                    return [4 /*yield*/, ProdutoWhatsappSync_1["default"].findAll({ where: { produtoId: produtoId } })];
                case 2:
                    existingSyncs = _d.sent();
                    existingMap = new Map(existingSyncs.map(function (s) { return [s.whatsappId, s]; }));
                    newIds = new Set(whatsappIds);
                    oldIds = new Set(existingMap.keys());
                    _i = 0, oldIds_1 = oldIds;
                    _d.label = 3;
                case 3:
                    if (!(_i < oldIds_1.length)) return [3 /*break*/, 10];
                    whatsappId = oldIds_1[_i];
                    if (!!newIds.has(whatsappId)) return [3 /*break*/, 9];
                    syncRecord = existingMap.get(whatsappId);
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 6, , 7]);
                    wbot = (0, wbot_1.getWbot)(whatsappId);
                    return [4 /*yield*/, syncConnection(wbot, produto, syncRecord, "delete")];
                case 5:
                    _d.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _b = _d.sent();
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, syncRecord.destroy()];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10:
                    _c = 0, newIds_1 = newIds;
                    _d.label = 11;
                case 11:
                    if (!(_c < newIds_1.length)) return [3 /*break*/, 18];
                    whatsappId = newIds_1[_c];
                    syncRecord = existingMap.get(whatsappId);
                    if (!!syncRecord) return [3 /*break*/, 13];
                    return [4 /*yield*/, ProdutoWhatsappSync_1["default"].create({
                            produtoId: produtoId,
                            whatsappId: whatsappId,
                            syncStatus: "pending"
                        })];
                case 12:
                    syncRecord = _d.sent();
                    _d.label = 13;
                case 13:
                    _d.trys.push([13, 15, , 17]);
                    wbot = (0, wbot_1.getWbot)(whatsappId);
                    operation = syncRecord.whatsappProductId ? "update" : "create";
                    return [4 /*yield*/, syncConnection(wbot, produto, syncRecord, operation)];
                case 14:
                    _d.sent();
                    return [3 /*break*/, 17];
                case 15:
                    err_2 = _d.sent();
                    logger_1["default"].warn("[CatalogSync] wbot ".concat(whatsappId, " n\u00E3o dispon\u00EDvel: ").concat(err_2 === null || err_2 === void 0 ? void 0 : err_2.message));
                    return [4 /*yield*/, syncRecord.update({ syncStatus: "error", syncError: "Conexão não disponível", lastSyncAt: new Date() })];
                case 16:
                    _d.sent();
                    return [3 /*break*/, 17];
                case 17:
                    _c++;
                    return [3 /*break*/, 11];
                case 18: return [2 /*return*/];
            }
        });
    });
};
exports.syncProdutoToWhatsapp = syncProdutoToWhatsapp;
var deleteProdutoFromWhatsapp = function (produtoId) { return __awaiter(void 0, void 0, void 0, function () {
    var syncs, _i, syncs_1, syncRecord, wbot, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProdutoWhatsappSync_1["default"].findAll({ where: { produtoId: produtoId } })];
            case 1:
                syncs = _a.sent();
                _i = 0, syncs_1 = syncs;
                _a.label = 2;
            case 2:
                if (!(_i < syncs_1.length)) return [3 /*break*/, 10];
                syncRecord = syncs_1[_i];
                if (!!syncRecord.whatsappProductId) return [3 /*break*/, 4];
                return [4 /*yield*/, syncRecord.destroy()];
            case 3:
                _a.sent();
                return [3 /*break*/, 9];
            case 4:
                _a.trys.push([4, 6, , 7]);
                wbot = (0, wbot_1.getWbot)(syncRecord.whatsappId);
                return [4 /*yield*/, wbot.productDelete([syncRecord.whatsappProductId])];
            case 5:
                _a.sent();
                logger_1["default"].info("[CatalogSync] delete produto=".concat(produtoId, " whatsapp=").concat(syncRecord.whatsappId, " ok"));
                return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                logger_1["default"].warn("[CatalogSync] delete falhou produto=".concat(produtoId, " whatsapp=").concat(syncRecord.whatsappId, ": ").concat(err_3 === null || err_3 === void 0 ? void 0 : err_3.message));
                return [3 /*break*/, 7];
            case 7: return [4 /*yield*/, syncRecord.destroy()];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 2];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.deleteProdutoFromWhatsapp = deleteProdutoFromWhatsapp;
