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
exports.deleteOpcao = exports.updateOpcao = exports.createOpcao = exports.deleteGrupo = exports.updateGrupo = exports.createGrupo = exports.listGrupos = void 0;
var ListService_1 = __importDefault(require("../services/ProdutoVariacaoGrupoService/ListService"));
var CreateService_1 = __importDefault(require("../services/ProdutoVariacaoGrupoService/CreateService"));
var UpdateService_1 = __importDefault(require("../services/ProdutoVariacaoGrupoService/UpdateService"));
var DeleteService_1 = __importDefault(require("../services/ProdutoVariacaoGrupoService/DeleteService"));
var CreateService_2 = __importDefault(require("../services/ProdutoVariacaoOpcaoService/CreateService"));
var UpdateService_2 = __importDefault(require("../services/ProdutoVariacaoOpcaoService/UpdateService"));
var DeleteService_2 = __importDefault(require("../services/ProdutoVariacaoOpcaoService/DeleteService"));
var listGrupos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, grupos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListService_1["default"])(companyId)];
            case 1:
                grupos = _a.sent();
                return [2 /*return*/, res.json(grupos)];
        }
    });
}); };
exports.listGrupos = listGrupos;
var createGrupo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, nome, grupo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                nome = req.body.nome;
                return [4 /*yield*/, (0, CreateService_1["default"])({ companyId: companyId, nome: nome })];
            case 1:
                grupo = _a.sent();
                return [2 /*return*/, res.status(201).json(grupo)];
        }
    });
}); };
exports.createGrupo = createGrupo;
var updateGrupo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, grupoId, nome, grupo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                grupoId = req.params.grupoId;
                nome = req.body.nome;
                return [4 /*yield*/, (0, UpdateService_1["default"])({
                        companyId: companyId,
                        grupoId: Number(grupoId),
                        nome: nome
                    })];
            case 1:
                grupo = _a.sent();
                return [2 /*return*/, res.json(grupo)];
        }
    });
}); };
exports.updateGrupo = updateGrupo;
var deleteGrupo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, grupoId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                grupoId = req.params.grupoId;
                return [4 /*yield*/, (0, DeleteService_1["default"])({ companyId: companyId, grupoId: Number(grupoId) })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.deleteGrupo = deleteGrupo;
var createOpcao = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, grupoId, nome, ordem, opcao;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, grupoId = _a.grupoId, nome = _a.nome, ordem = _a.ordem;
                return [4 /*yield*/, (0, CreateService_2["default"])({
                        companyId: companyId,
                        grupoId: Number(grupoId),
                        nome: nome,
                        ordem: ordem !== undefined ? Number(ordem) : undefined
                    })];
            case 1:
                opcao = _b.sent();
                return [2 /*return*/, res.status(201).json(opcao)];
        }
    });
}); };
exports.createOpcao = createOpcao;
var updateOpcao = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, opcaoId, _a, nome, ordem, opcao;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                opcaoId = req.params.opcaoId;
                _a = req.body, nome = _a.nome, ordem = _a.ordem;
                return [4 /*yield*/, (0, UpdateService_2["default"])({
                        companyId: companyId,
                        opcaoId: Number(opcaoId),
                        nome: nome,
                        ordem: ordem !== undefined ? Number(ordem) : undefined
                    })];
            case 1:
                opcao = _b.sent();
                return [2 /*return*/, res.json(opcao)];
        }
    });
}); };
exports.updateOpcao = updateOpcao;
var deleteOpcao = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, opcaoId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                opcaoId = req.params.opcaoId;
                return [4 /*yield*/, (0, DeleteService_2["default"])({ companyId: companyId, opcaoId: Number(opcaoId) })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.deleteOpcao = deleteOpcao;
