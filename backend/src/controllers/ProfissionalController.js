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
var ListProfissionaisService_1 = __importDefault(require("../services/ProfissionalService/ListProfissionaisService"));
var CreateProfissionalService_1 = __importDefault(require("../services/ProfissionalService/CreateProfissionalService"));
var ShowProfissionalService_1 = __importDefault(require("../services/ProfissionalService/ShowProfissionalService"));
var UpdateProfissionalService_1 = __importDefault(require("../services/ProfissionalService/UpdateProfissionalService"));
var DeleteProfissionalService_1 = __importDefault(require("../services/ProfissionalService/DeleteProfissionalService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, profissionais;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListProfissionaisService_1["default"])({ companyId: companyId })];
            case 1:
                profissionais = _a.sent();
                return [2 /*return*/, res.json(profissionais)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, profissionalId, profissional;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                profissionalId = req.params.profissionalId;
                return [4 /*yield*/, (0, ShowProfissionalService_1["default"])({ id: profissionalId, companyId: companyId })];
            case 1:
                profissional = _a.sent();
                return [2 /*return*/, res.json(profissional)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, nome, servicos, agenda, ativo, comissao, valorEmAberto, valoresRecebidos, valoresAReceber, profissional;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, nome = _a.nome, servicos = _a.servicos, agenda = _a.agenda, ativo = _a.ativo, comissao = _a.comissao, valorEmAberto = _a.valorEmAberto, valoresRecebidos = _a.valoresRecebidos, valoresAReceber = _a.valoresAReceber;
                return [4 /*yield*/, (0, CreateProfissionalService_1["default"])({
                        companyId: companyId,
                        nome: nome,
                        servicos: servicos,
                        agenda: agenda,
                        ativo: ativo,
                        comissao: comissao,
                        valorEmAberto: valorEmAberto,
                        valoresRecebidos: valoresRecebidos,
                        valoresAReceber: valoresAReceber
                    })];
            case 1:
                profissional = _b.sent();
                return [2 /*return*/, res.status(201).json(profissional)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, profissionalId, _a, nome, servicos, agenda, ativo, comissao, valorEmAberto, valoresRecebidos, valoresAReceber, profissional;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                profissionalId = req.params.profissionalId;
                _a = req.body, nome = _a.nome, servicos = _a.servicos, agenda = _a.agenda, ativo = _a.ativo, comissao = _a.comissao, valorEmAberto = _a.valorEmAberto, valoresRecebidos = _a.valoresRecebidos, valoresAReceber = _a.valoresAReceber;
                return [4 /*yield*/, (0, UpdateProfissionalService_1["default"])({
                        id: profissionalId,
                        companyId: companyId,
                        nome: nome,
                        servicos: servicos,
                        agenda: agenda,
                        ativo: ativo,
                        comissao: comissao,
                        valorEmAberto: valorEmAberto,
                        valoresRecebidos: valoresRecebidos,
                        valoresAReceber: valoresAReceber
                    })];
            case 1:
                profissional = _b.sent();
                return [2 /*return*/, res.json(profissional)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, profissionalId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                profissionalId = req.params.profissionalId;
                return [4 /*yield*/, (0, DeleteProfissionalService_1["default"])({ id: profissionalId, companyId: companyId })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Profissional removido com sucesso" })];
        }
    });
}); };
exports.remove = remove;
