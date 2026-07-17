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
var sequelize_1 = require("sequelize");
var FinanceiroCategoria_1 = __importDefault(require("../../models/FinanceiroCategoria"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var socket_1 = require("../../libs/socket");
var schema = Yup.object().shape({
    id: Yup.number().required(),
    companyId: Yup.number().required(),
    nome: Yup.string().max(100),
    tipo: Yup.string().oneOf(["despesa", "receita"]),
    paiId: Yup.number().nullable(),
    cor: Yup.string().max(7),
    ativo: Yup.boolean()
});
var UpdateFinanceiroCategoriaService = function (_a) {
    var id = _a.id, companyId = _a.companyId, nome = _a.nome, tipo = _a.tipo, paiId = _a.paiId, cor = _a.cor, ativo = _a.ativo, transaction = _a.transaction;
    return __awaiter(void 0, void 0, void 0, function () {
        var err_1, categoria, categoriaPai, existingCategoria, io;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, schema.validate({
                            id: Number(id),
                            companyId: companyId,
                            nome: nome,
                            tipo: tipo,
                            paiId: paiId,
                            cor: cor,
                            ativo: ativo
                        })];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _c.sent();
                    throw new AppError_1["default"](err_1.message);
                case 3: return [4 /*yield*/, FinanceiroCategoria_1["default"].findByPk(id, {
                        transaction: transaction
                    })];
                case 4:
                    categoria = _c.sent();
                    if (!categoria) {
                        throw new AppError_1["default"]("ERR_NO_FINANCEIRO_CATEGORIA_FOUND", 404);
                    }
                    if (!(paiId !== undefined && paiId !== null)) return [3 /*break*/, 6];
                    if (paiId === categoria.id) {
                        throw new AppError_1["default"]("Uma categoria não pode ser pai de si mesma.");
                    }
                    return [4 /*yield*/, FinanceiroCategoria_1["default"].findByPk(paiId, {
                            transaction: transaction
                        })];
                case 5:
                    categoriaPai = _c.sent();
                    if (!categoriaPai) {
                        throw new AppError_1["default"]("Categoria pai não encontrada.");
                    }
                    if (categoriaPai.companyId !== companyId) {
                        throw new AppError_1["default"]("Categoria pai não pertence a esta empresa.");
                    }
                    if (categoriaPai.tipo !== (tipo || categoria.tipo)) {
                        throw new AppError_1["default"]("Categoria pai deve ser do mesmo tipo.");
                    }
                    _c.label = 6;
                case 6:
                    if (!(nome && nome.trim() !== categoria.nome)) return [3 /*break*/, 8];
                    return [4 /*yield*/, FinanceiroCategoria_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                nome: nome.trim(),
                                tipo: tipo || categoria.tipo,
                                id: (_b = {}, _b[sequelize_1.Op.ne] = categoria.id, _b)
                            },
                            transaction: transaction
                        })];
                case 7:
                    existingCategoria = _c.sent();
                    if (existingCategoria) {
                        throw new AppError_1["default"]("Já existe uma categoria com este nome para este tipo.");
                    }
                    _c.label = 8;
                case 8: return [4 /*yield*/, categoria.update({
                        nome: (nome === null || nome === void 0 ? void 0 : nome.trim()) || categoria.nome,
                        tipo: tipo || categoria.tipo,
                        paiId: paiId !== undefined ? paiId : categoria.paiId,
                        cor: cor || categoria.cor,
                        ativo: ativo !== undefined ? ativo : categoria.ativo
                    }, {
                        transaction: transaction
                    })];
                case 9:
                    _c.sent();
                    io = (0, socket_1.getIO)();
                    io.to("company-".concat(companyId)).emit("financeiro_categoria", {
                        action: "update",
                        data: categoria
                    });
                    return [2 /*return*/, categoria];
            }
        });
    });
};
exports["default"] = UpdateFinanceiroCategoriaService;
