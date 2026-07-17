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
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var lodash_1 = require("lodash");
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateService_1 = __importDefault(require("../services/ScheduledMessagesService/CreateService"));
var ListService_1 = __importDefault(require("../services/ScheduledMessagesService/ListService"));
var UpdateService_1 = __importDefault(require("../services/ScheduledMessagesService/UpdateService"));
var ShowService_1 = __importDefault(require("../services/ScheduledMessagesService/ShowService"));
var DeleteService_1 = __importDefault(require("../services/ScheduledMessagesService/DeleteService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNumber, searchParam, companyId, _b, schedules, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, pageNumber = _a.pageNumber, searchParam = _a.searchParam;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListService_1["default"])({ searchParam: searchParam, pageNumber: pageNumber, companyId: companyId })];
            case 1:
                _b = _c.sent(), schedules = _b.schedules, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ schedules: schedules, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data_mensagem_programada, id_conexao, intervalo, valor_intervalo, mensagem, tipo_dias_envio, mostrar_usuario_mensagem, criar_ticket, contatos, tags, nome, tipo_arquivo, usuario_envio, enviar_quantas_vezes, companyId, files, file, schedule;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, data_mensagem_programada = _a.data_mensagem_programada, id_conexao = _a.id_conexao, intervalo = _a.intervalo, valor_intervalo = _a.valor_intervalo, mensagem = _a.mensagem, tipo_dias_envio = _a.tipo_dias_envio, mostrar_usuario_mensagem = _a.mostrar_usuario_mensagem, criar_ticket = _a.criar_ticket, contatos = _a.contatos, tags = _a.tags, nome = _a.nome, tipo_arquivo = _a.tipo_arquivo, usuario_envio = _a.usuario_envio, enviar_quantas_vezes = _a.enviar_quantas_vezes;
                companyId = req.user.companyId;
                files = req.files;
                file = (0, lodash_1.head)(files);
                return [4 /*yield*/, (0, CreateService_1["default"])({
                        data_mensagem_programada: data_mensagem_programada,
                        id_conexao: id_conexao,
                        intervalo: intervalo,
                        valor_intervalo: valor_intervalo,
                        mensagem: mensagem,
                        tipo_dias_envio: tipo_dias_envio,
                        mostrar_usuario_mensagem: mostrar_usuario_mensagem,
                        criar_ticket: criar_ticket,
                        contatos: String(contatos).split(','),
                        tags: String(tags).split(','),
                        nome: nome,
                        tipo_arquivo: tipo_arquivo,
                        usuario_envio: usuario_envio,
                        enviar_quantas_vezes: enviar_quantas_vezes,
                        companyId: companyId,
                        mediaPath: file === null || file === void 0 ? void 0 : file.filename,
                        mediaName: file === null || file === void 0 ? void 0 : file.originalname
                    })];
            case 1:
                schedule = _b.sent();
                return [2 /*return*/, res.status(200).json(schedule)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var scheduleId, companyId, schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scheduleId = req.params.scheduleId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowService_1["default"])(scheduleId)];
            case 1:
                schedule = _a.sent();
                return [2 /*return*/, res.status(200).json(schedule)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var scheduleId, scheduleData, files, file, schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                scheduleId = req.params.scheduleId;
                scheduleData = req.body;
                files = req.files;
                file = (0, lodash_1.head)(files);
                return [4 /*yield*/, (0, UpdateService_1["default"])({ scheduleData: scheduleData, id: scheduleId, mediaPath: !!file ? file === null || file === void 0 ? void 0 : file.filename : null, mediaName: !!file ? file === null || file === void 0 ? void 0 : file.originalname : null })];
            case 1:
                schedule = _a.sent();
                return [2 /*return*/, res.status(200).json(schedule)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var scheduleId, companyId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scheduleId = req.params.scheduleId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteService_1["default"])(+scheduleId, +companyId)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Schedule deleted" })];
        }
    });
}); };
exports.remove = remove;
