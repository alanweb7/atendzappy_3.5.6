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
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var ListServicosService_1 = __importDefault(require("../services/ServicoService/ListServicosService"));
var CreateServicoService_1 = __importDefault(require("../services/ServicoService/CreateServicoService"));
var ShowServicoService_1 = __importDefault(require("../services/ServicoService/ShowServicoService"));
var UpdateServicoService_1 = __importDefault(require("../services/ServicoService/UpdateServicoService"));
var DeleteServicoService_1 = __importDefault(require("../services/ServicoService/DeleteServicoService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, servicos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListServicosService_1["default"])({ companyId: companyId })];
            case 1:
                servicos = _a.sent();
                return [2 /*return*/, res.json({ services: servicos, servicos: servicos })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, servicoId, servico;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                servicoId = req.params.servicoId;
                return [4 /*yield*/, (0, ShowServicoService_1["default"])({ id: servicoId, companyId: companyId })];
            case 1:
                servico = _a.sent();
                return [2 /*return*/, res.json(servico)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, nome, descricao, valorOriginal, tempoAtendimento, imagem, servico;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, nome = _a.nome, descricao = _a.descricao, valorOriginal = _a.valorOriginal, tempoAtendimento = _a.tempoAtendimento, imagem = _a.imagem;
                return [4 /*yield*/, (0, CreateServicoService_1["default"])({
                        companyId: companyId,
                        nome: nome,
                        descricao: descricao,
                        valorOriginal: valorOriginal,
                        tempoAtendimento: tempoAtendimento,
                        imagem: imagem
                    })];
            case 1:
                servico = _b.sent();
                return [2 /*return*/, res.status(201).json(servico)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, servicoId, _a, nome, descricao, valorOriginal, tempoAtendimento, imagem, servico;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                servicoId = req.params.servicoId;
                _a = req.body, nome = _a.nome, descricao = _a.descricao, valorOriginal = _a.valorOriginal, tempoAtendimento = _a.tempoAtendimento, imagem = _a.imagem;
                return [4 /*yield*/, (0, UpdateServicoService_1["default"])({
                        id: servicoId,
                        companyId: companyId,
                        nome: nome,
                        descricao: descricao,
                        valorOriginal: valorOriginal,
                        tempoAtendimento: tempoAtendimento,
                        imagem: imagem
                    })];
            case 1:
                servico = _b.sent();
                return [2 /*return*/, res.json(servico)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, servicoId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                servicoId = req.params.servicoId;
                return [4 /*yield*/, (0, DeleteServicoService_1["default"])({ id: servicoId, companyId: companyId })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Serviço removido com sucesso" })];
        }
    });
}); };
exports.remove = remove;
