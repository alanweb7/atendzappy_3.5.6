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
var FinanceiroFornecedor_1 = __importDefault(require("../../models/FinanceiroFornecedor"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var socket_1 = require("../../libs/socket");
var schema = Yup.object().shape({
    companyId: Yup.number().required(),
    nome: Yup.string().required().max(150),
    documento: Yup.string().max(30).nullable(),
    email: Yup.string().email().max(150).nullable(),
    telefone: Yup.string().max(30).nullable(),
    endereco: Yup.string().max(255).nullable(),
    numero: Yup.string().max(20).nullable(),
    complemento: Yup.string().max(100).nullable(),
    bairro: Yup.string().max(100).nullable(),
    cidade: Yup.string().max(100).nullable(),
    estado: Yup.string().max(2).nullable(),
    cep: Yup.string().max(10).nullable(),
    categoria: Yup.string().max(50).nullable(),
    observacoes: Yup.string().nullable(),
    ativo: Yup.boolean()["default"](true)
});
var CreateFinanceiroFornecedorService = function (_a) {
    var companyId = _a.companyId, nome = _a.nome, documento = _a.documento, email = _a.email, telefone = _a.telefone, endereco = _a.endereco, numero = _a.numero, complemento = _a.complemento, bairro = _a.bairro, cidade = _a.cidade, estado = _a.estado, cep = _a.cep, categoria = _a.categoria, observacoes = _a.observacoes, _b = _a.ativo, ativo = _b === void 0 ? true : _b, transaction = _a.transaction;
    return __awaiter(void 0, void 0, void 0, function () {
        var err_1, existingFornecedor, fornecedor, io;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, schema.validate({
                            companyId: companyId,
                            nome: nome,
                            documento: documento,
                            email: email,
                            telefone: telefone,
                            endereco: endereco,
                            numero: numero,
                            complemento: complemento,
                            bairro: bairro,
                            cidade: cidade,
                            estado: estado,
                            cep: cep,
                            categoria: categoria,
                            observacoes: observacoes,
                            ativo: ativo
                        })];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _c.sent();
                    throw new AppError_1["default"](err_1.message);
                case 3:
                    if (!documento) return [3 /*break*/, 5];
                    return [4 /*yield*/, FinanceiroFornecedor_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                documento: documento.trim()
                            },
                            transaction: transaction
                        })];
                case 4:
                    existingFornecedor = _c.sent();
                    if (existingFornecedor) {
                        throw new AppError_1["default"]("Já existe um fornecedor com este documento.");
                    }
                    _c.label = 5;
                case 5: return [4 /*yield*/, FinanceiroFornecedor_1["default"].create({
                        companyId: companyId,
                        nome: nome.trim(),
                        documento: (documento === null || documento === void 0 ? void 0 : documento.trim()) || null,
                        email: (email === null || email === void 0 ? void 0 : email.trim()) || null,
                        telefone: (telefone === null || telefone === void 0 ? void 0 : telefone.trim()) || null,
                        endereco: (endereco === null || endereco === void 0 ? void 0 : endereco.trim()) || null,
                        numero: (numero === null || numero === void 0 ? void 0 : numero.trim()) || null,
                        complemento: (complemento === null || complemento === void 0 ? void 0 : complemento.trim()) || null,
                        bairro: (bairro === null || bairro === void 0 ? void 0 : bairro.trim()) || null,
                        cidade: (cidade === null || cidade === void 0 ? void 0 : cidade.trim()) || null,
                        estado: (estado === null || estado === void 0 ? void 0 : estado.trim()) || null,
                        cep: (cep === null || cep === void 0 ? void 0 : cep.trim()) || null,
                        categoria: (categoria === null || categoria === void 0 ? void 0 : categoria.trim()) || null,
                        observacoes: (observacoes === null || observacoes === void 0 ? void 0 : observacoes.trim()) || null,
                        ativo: ativo
                    }, {
                        transaction: transaction
                    })];
                case 6:
                    fornecedor = _c.sent();
                    io = (0, socket_1.getIO)();
                    io.to("company-".concat(companyId)).emit("financeiro_fornecedor", {
                        action: "create",
                        data: fornecedor
                    });
                    return [2 /*return*/, fornecedor];
            }
        });
    });
};
exports["default"] = CreateFinanceiroFornecedorService;
