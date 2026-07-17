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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ScheduledMessages_1 = __importDefault(require("../../models/ScheduledMessages"));
var CreateService = function (_a) {
    var data_mensagem_programada = _a.data_mensagem_programada, id_conexao = _a.id_conexao, intervalo = _a.intervalo, valor_intervalo = _a.valor_intervalo, mensagem = _a.mensagem, tipo_dias_envio = _a.tipo_dias_envio, mostrar_usuario_mensagem = _a.mostrar_usuario_mensagem, criar_ticket = _a.criar_ticket, contatos = _a.contatos, tags = _a.tags, companyId = _a.companyId, nome = _a.nome, mediaPath = _a.mediaPath, mediaName = _a.mediaName, tipo_arquivo = _a.tipo_arquivo, usuario_envio = _a.usuario_envio, enviar_quantas_vezes = _a.enviar_quantas_vezes;
    return __awaiter(void 0, void 0, void 0, function () {
        var schema, err_1, schedule;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = Yup.object().shape({
                        data_mensagem_programada: Yup.date().required(),
                        nome: Yup.string().required(),
                        intervalo: Yup.string().required(),
                        valor_intervalo: Yup.string().required(),
                        mensagem: Yup.string().required(),
                        tipo_dias_envio: Yup.string().required(),
                        mostrar_usuario_mensagem: Yup.boolean().required(),
                        criar_ticket: Yup.boolean().required(),
                        companyId: Yup.number().required(),
                        enviar_quantas_vezes: Yup.string().required(),
                        mediaPath: Yup.string(),
                        mediaName: Yup.string(),
                        tipo_arquivo: Yup.string(),
                        usuario_envio: Yup.string()
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, schema.validate({
                            data_mensagem_programada: data_mensagem_programada,
                            id_conexao: id_conexao,
                            intervalo: intervalo,
                            valor_intervalo: valor_intervalo,
                            mensagem: mensagem,
                            tipo_dias_envio: tipo_dias_envio,
                            mostrar_usuario_mensagem: mostrar_usuario_mensagem,
                            criar_ticket: criar_ticket,
                            contatos: contatos,
                            tags: tags,
                            companyId: companyId,
                            nome: nome,
                            mediaPath: mediaPath,
                            mediaName: mediaName,
                            tipo_arquivo: tipo_arquivo,
                            usuario_envio: usuario_envio,
                            enviar_quantas_vezes: enviar_quantas_vezes
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    throw new AppError_1["default"](err_1.message);
                case 4: return [4 /*yield*/, ScheduledMessages_1["default"].create({
                        data_mensagem_programada: data_mensagem_programada,
                        id_conexao: id_conexao,
                        intervalo: intervalo,
                        valor_intervalo: valor_intervalo,
                        mensagem: mensagem,
                        tipo_dias_envio: tipo_dias_envio,
                        mostrar_usuario_mensagem: mostrar_usuario_mensagem,
                        criar_ticket: criar_ticket,
                        contatos: contatos,
                        tags: tags,
                        companyId: companyId,
                        nome: nome,
                        mediaPath: mediaPath,
                        mediaName: mediaName,
                        tipo_arquivo: tipo_arquivo,
                        usuario_envio: usuario_envio,
                        enviar_quantas_vezes: enviar_quantas_vezes
                    })];
                case 5:
                    schedule = _b.sent();
                    return [4 /*yield*/, schedule.reload()];
                case 6:
                    _b.sent();
                    return [2 /*return*/, schedule];
            }
        });
    });
};
exports["default"] = CreateService;
