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
exports.uploadImagem = exports.listWhatsappSyncs = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var ListService_1 = __importDefault(require("../services/ProdutoService/ListService"));
var CreateService_1 = __importDefault(require("../services/ProdutoService/CreateService"));
var ShowService_1 = __importDefault(require("../services/ProdutoService/ShowService"));
var UpdateService_1 = __importDefault(require("../services/ProdutoService/UpdateService"));
var DeleteService_1 = __importDefault(require("../services/ProdutoService/DeleteService"));
var SyncWhatsappCatalogService_1 = require("../services/ProdutoService/SyncWhatsappCatalogService");
var ProdutoWhatsappSync_1 = __importDefault(require("../models/ProdutoWhatsappSync"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, tipo, categoriaId, produtos;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, tipo = _a.tipo, categoriaId = _a.categoriaId;
                return [4 /*yield*/, (0, ListService_1["default"])({
                        companyId: companyId,
                        tipo: tipo,
                        categoriaId: categoriaId ? Number(categoriaId) : undefined
                    })];
            case 1:
                produtos = _b.sent();
                return [2 /*return*/, res.json(produtos)];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, whatsappIds, data, produto;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, whatsappIds = _a.whatsappIds, data = __rest(_a, ["whatsappIds"]);
                console.log("Dados recebidos no controller:", data);
                return [4 /*yield*/, (0, CreateService_1["default"])(__assign(__assign({}, data), { categoriaId: data.categoriaId ? Number(data.categoriaId) : null, marcaId: data.marcaId ? Number(data.marcaId) : null, customFields: data.customFields || [], companyId: companyId }))];
            case 1:
                produto = _b.sent();
                if (Array.isArray(whatsappIds) && whatsappIds.length > 0) {
                    (0, SyncWhatsappCatalogService_1.syncProdutoToWhatsapp)({ produtoId: produto.id, companyId: companyId, whatsappIds: whatsappIds.map(Number) })["catch"](function () { });
                }
                return [2 /*return*/, res.status(200).json(produto)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, produtoId, produto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                produtoId = req.params.produtoId;
                return [4 /*yield*/, (0, ShowService_1["default"])(produtoId, companyId)];
            case 1:
                produto = _a.sent();
                return [2 /*return*/, res.status(200).json(produto)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, produtoId, _a, whatsappIds, data, produto;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                produtoId = req.params.produtoId;
                _a = req.body, whatsappIds = _a.whatsappIds, data = __rest(_a, ["whatsappIds"]);
                console.log("Dados recebidos no update:", data);
                return [4 /*yield*/, (0, UpdateService_1["default"])(produtoId, companyId, __assign(__assign({}, data), { categoriaId: data.hasOwnProperty("categoriaId") && data.categoriaId !== undefined
                            ? data.categoriaId
                                ? Number(data.categoriaId)
                                : null
                            : undefined, marcaId: data.hasOwnProperty("marcaId") && data.marcaId !== undefined
                            ? data.marcaId
                                ? Number(data.marcaId)
                                : null
                            : undefined, customFields: data.customFields || [] }))];
            case 1:
                produto = _b.sent();
                if (Array.isArray(whatsappIds)) {
                    (0, SyncWhatsappCatalogService_1.syncProdutoToWhatsapp)({ produtoId: produto.id, companyId: companyId, whatsappIds: whatsappIds.map(Number) })["catch"](function () { });
                }
                return [2 /*return*/, res.status(200).json(produto)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, produtoId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                produtoId = req.params.produtoId;
                return [4 /*yield*/, (0, SyncWhatsappCatalogService_1.deleteProdutoFromWhatsapp)(Number(produtoId))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, DeleteService_1["default"])(produtoId, companyId)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Produto deleted" })];
        }
    });
}); };
exports.remove = remove;
var listWhatsappSyncs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var produtoId, syncs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                produtoId = req.params.produtoId;
                return [4 /*yield*/, ProdutoWhatsappSync_1["default"].findAll({ where: { produtoId: Number(produtoId) } })];
            case 1:
                syncs = _a.sent();
                return [2 /*return*/, res.status(200).json(syncs)];
        }
    });
}); };
exports.listWhatsappSyncs = listWhatsappSyncs;
var uploadImagem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, companyId, typeArch, relativePath;
    return __generator(this, function (_a) {
        file = req.file;
        if (!file) {
            return [2 /*return*/, res.status(400).json({ error: "Nenhum arquivo enviado" })];
        }
        companyId = (req.user || {}).companyId;
        typeArch = (req.body || {}).typeArch;
        relativePath = file.filename;
        if (typeArch && typeArch !== "announcements" && typeArch !== "logo" && companyId) {
            // espelha a lógica de upload.ts (company{companyId}/typeArch/filename)
            relativePath = "company".concat(companyId, "/").concat(typeArch, "/").concat(file.filename);
        }
        return [2 /*return*/, res.status(200).json({ filename: relativePath })];
    });
}); };
exports.uploadImagem = uploadImagem;
