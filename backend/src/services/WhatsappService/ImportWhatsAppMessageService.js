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
exports.closeTicketsImported = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var socket_1 = require("../../libs/socket");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var sequelize_1 = require("sequelize");
var date_fns_1 = require("date-fns");
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var wbot_1 = require("../../libs/wbot");
var wbotMessageListener_1 = require("../WbotServices/wbotMessageListener");
var moment_1 = __importDefault(require("moment"));
var addLogs_1 = require("../../helpers/addLogs");
var closeTicketsImported = function (whatsappId) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets, _i, tickets_1, ticket, whatsApp, io;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Ticket_1["default"].findAll({
                    where: {
                        status: 'pending',
                        whatsappId: whatsappId,
                        imported: (_a = {}, _a[sequelize_1.Op.lt] = +(0, date_fns_1.add)(new Date(), { hours: +5 }), _a)
                    }
                })];
            case 1:
                tickets = _b.sent();
                _i = 0, tickets_1 = tickets;
                _b.label = 2;
            case 2:
                if (!(_i < tickets_1.length)) return [3 /*break*/, 6];
                ticket = tickets_1[_i];
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 330); })];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({ ticketData: { status: "closed" }, ticketId: ticket.id, companyId: ticket.companyId })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
            case 7:
                whatsApp = _b.sent();
                whatsApp.update({ statusImportMessages: null });
                io = (0, socket_1.getIO)();
                io.of(whatsApp.companyId.toString())
                    .emit("importMessages-".concat(whatsApp.companyId), {
                    action: "refresh"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.closeTicketsImported = closeTicketsImported;
function sortByMessageTimestamp(a, b) {
    return b.messageTimestamp - a.messageTimestamp;
}
function cleaner(array) {
    var mapa = new Map();
    var resultado = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var objeto = array_1[_i];
        var valorChave = objeto['key']['id'];
        if (!mapa.has(valorChave)) {
            mapa.set(valorChave, true);
            resultado.push(objeto);
        }
    }
    return resultado.sort(sortByMessageTimestamp);
}
var ImportWhatsAppMessageService = function (whatsappId) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsApp, wbot, io, messages, dateOldLimit, dateRecentLimit, qtd, i, msg, timestampMsg, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
            case 1:
                whatsApp = _a.sent();
                wbot = (0, wbot_1.getWbot)(whatsApp.id);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 13, , 14]);
                io = (0, socket_1.getIO)();
                messages = cleaner(wbot_1.dataMessages[whatsappId]);
                dateOldLimit = new Date(whatsApp.importOldMessages).getTime();
                dateRecentLimit = new Date(whatsApp.importRecentMessages).getTime();
                (0, addLogs_1.addLogs)({
                    fileName: "processImportMessagesWppId".concat(whatsappId, ".txt"), forceNewFile: true,
                    text: "Aguardando conex\u00E3o para iniciar a importa\u00E7\u00E3o de mensagens:\n    Whatsapp nome: ".concat(whatsApp.name, "\n    Whatsapp Id: ").concat(whatsApp.id, "\n    Cria\u00E7\u00E3o do arquivo de logs: ").concat((0, moment_1["default"])().format("DD/MM/YYYY HH:mm:ss"), "\n    Selecionado Data de inicio de importa\u00E7\u00E3o: ").concat((0, moment_1["default"])(dateOldLimit).format("DD/MM/YYYY HH:mm:ss"), " \n    Selecionado Data final da importa\u00E7\u00E3o: ").concat((0, moment_1["default"])(dateRecentLimit).format("DD/MM/YYYY HH:mm:ss"), " \n    ")
                });
                qtd = messages.length;
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < qtd)) return [3 /*break*/, 12];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 10, , 11]);
                msg = messages[i];
                (0, addLogs_1.addLogs)({
                    fileName: "processImportMessagesWppId".concat(whatsappId, ".txt"), text: "\nMensagem ".concat(i + 1, " de ").concat(qtd, "\n              ")
                });
                return [4 /*yield*/, (0, wbotMessageListener_1.handleMessage)(msg, wbot, whatsApp.companyId, true)];
            case 5:
                _a.sent();
                if (i % 2 === 0) {
                    timestampMsg = Math.floor(msg.messageTimestamp["low"] * 1000);
                    io.of(whatsApp.companyId.toString())
                        .emit("importMessages-".concat(whatsApp.companyId), {
                        action: "update",
                        status: { "this": i + 1, all: qtd, date: (0, moment_1["default"])(timestampMsg).format("DD/MM/YY HH:mm:ss") }
                    });
                }
                if (!(i + 1 === qtd)) return [3 /*break*/, 9];
                wbot_1.dataMessages[whatsappId] = [];
                if (!whatsApp.closedTicketsPostImported) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, exports.closeTicketsImported)(whatsappId)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, whatsApp.update({
                    statusImportMessages: whatsApp.closedTicketsPostImported ? null : "renderButtonCloseTickets",
                    importOldMessages: null,
                    importRecentMessages: null
                })];
            case 8:
                _a.sent();
                io.of(whatsApp.companyId.toString())
                    .emit("importMessages-".concat(whatsApp.companyId), {
                    action: "refresh"
                });
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                return [3 /*break*/, 11];
            case 11:
                i++;
                return [3 /*break*/, 3];
            case 12: return [3 /*break*/, 14];
            case 13:
                error_2 = _a.sent();
                throw new AppError_1["default"]("ERR_NOT_MESSAGE_TO_IMPORT", 403);
            case 14: return [2 /*return*/, "whatsapps"];
        }
    });
}); };
exports["default"] = ImportWhatsAppMessageService;
