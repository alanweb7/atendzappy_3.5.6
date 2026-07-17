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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.startQueueProcess = exports.randomValue = exports.parseToMilliseconds = exports.messageQueue = exports.queueMonitor = exports.campaignQueue = exports.sendScheduledMessages = exports.scheduleMonitor = exports.userMonitor = void 0;
// @ts-nocheck
var Sentry = __importStar(require("@sentry/node"));
var bull_1 = __importDefault(require("bull"));
var SendMessage_1 = require("./helpers/SendMessage");
var Whatsapp_1 = __importDefault(require("./models/Whatsapp"));
var logger_1 = __importDefault(require("./utils/logger"));
var moment_1 = __importDefault(require("moment"));
var Schedule_1 = __importDefault(require("./models/Schedule"));
var sequelize_1 = require("sequelize");
var GetDefaultWhatsApp_1 = __importDefault(require("./helpers/GetDefaultWhatsApp"));
var Campaign_1 = __importDefault(require("./models/Campaign"));
var CampaignSetting_1 = __importDefault(require("./models/CampaignSetting"));
var CampaignShipping_1 = __importDefault(require("./models/CampaignShipping"));
var Contact_1 = __importDefault(require("./models/Contact"));
var ContactList_1 = __importDefault(require("./models/ContactList"));
var ContactListItem_1 = __importDefault(require("./models/ContactListItem"));
var ContactTag_1 = __importDefault(require("./models/ContactTag"));
var Queue_1 = __importDefault(require("./models/Queue"));
var Queue_2 = __importDefault(require("./models/Queue"));
var Tag_1 = __importDefault(require("./models/Tag"));
var Ticket_1 = __importDefault(require("./models/Ticket"));
var TicketTag_1 = __importDefault(require("./models/TicketTag"));
var User_1 = __importDefault(require("./models/User"));
var wbot_1 = require("./libs/wbot");
var baileys_1 = require("@whiskeysockets/baileys");
var GetWhatsappWbot_1 = __importDefault(require("./helpers/GetWhatsappWbot"));
var database_1 = __importDefault(require("./database"));
var SendWhatsAppMedia_1 = require("./services/WbotServices/SendWhatsAppMedia");
var socket_1 = require("./libs/socket");
var path_1 = __importDefault(require("path"));
var lodash_1 = require("lodash");
var wbotClosedTickets_1 = require("./services/WbotServices/wbotClosedTickets");
var ShowContactService_1 = __importDefault(require("./services/ContactServices/ShowContactService"));
var UserQueue_1 = __importDefault(require("./models/UserQueue"));
var ShowTicketService_1 = __importDefault(require("./services/TicketServices/ShowTicketService"));
var SendWhatsAppMessage_1 = __importDefault(require("./services/WbotServices/SendWhatsAppMessage"));
var UpdateTicketService_1 = __importDefault(require("./services/TicketServices/UpdateTicketService"));
var EmailAccount_1 = __importDefault(require("./models/EmailAccount"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var date_fns_1 = require("date-fns");
var GetWhatsapp_1 = require("./helpers/GetWhatsapp");
var Company_1 = __importDefault(require("./models/Company"));
var CronJob = require('cron').CronJob;
var CompaniesSettings_1 = __importDefault(require("./models/CompaniesSettings"));
var wbotMessageListener_1 = require("./services/WbotServices/wbotMessageListener");
var CreateLogTicketService_1 = __importDefault(require("./services/TicketServices/CreateLogTicketService"));
var Mustache_1 = __importDefault(require("./helpers/Mustache"));
var Plan_1 = __importDefault(require("./models/Plan"));
var ExecuteAutomationsJob_1 = __importStar(require("./services/AutomationServices/ExecuteAutomationsJob"));
var DispatchSchedulerService_1 = __importDefault(require("./services/ScheduledDispatcherService/DispatchSchedulerService"));
var DispatchProcessorService_1 = __importDefault(require("./services/ScheduledDispatcherService/DispatchProcessorService"));
var googleMapsScrapeQueue_1 = require("./queues/googleMapsScrapeQueue");
var GoogleMapsPlacesService_1 = __importDefault(require("./services/ContactServices/GoogleMapsPlacesService"));
var GoogleMapsScrapeService_1 = __importDefault(require("./services/ContactServices/GoogleMapsScrapeService"));
var CleanLidContactsRunner_1 = require("./services/ContactServices/CleanLidContactsRunner");
var graphApiHelper_1 = require("./services/WhatsappCoexistence/graphApiHelper");
var SendTextOfficialService_1 = require("./services/WhatsAppOfficial/SendTextOfficialService");
var SendMediaOfficialService_1 = require("./services/WhatsAppOfficial/SendMediaOfficialService");
var fs_1 = __importDefault(require("fs"));
var mime_types_1 = __importDefault(require("mime-types"));
var connection = process.env.REDIS_URI || "";
var limiterMax = process.env.REDIS_OPT_LIMITER_MAX || 1;
var limiterDuration = process.env.REDIS_OPT_LIMITER_DURATION || 3000;
exports.userMonitor = new bull_1["default"]("UserMonitor", connection);
exports.scheduleMonitor = new bull_1["default"]("ScheduleMonitor", connection);
exports.sendScheduledMessages = new bull_1["default"]("SendScheduledMessages", connection);
exports.campaignQueue = new bull_1["default"]("CampaignQueue", connection);
exports.queueMonitor = new bull_1["default"]("QueueMonitor", connection);
exports.messageQueue = new bull_1["default"]("MessageQueue", connection, {
    limiter: {
        max: limiterMax,
        duration: limiterDuration
    }
});
var isProcessing = false;
function handleSendMessage(job) {
    return __awaiter(this, void 0, void 0, function () {
        var data, whatsapp, messageData, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    data = job.data;
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(data.whatsappId)];
                case 1:
                    whatsapp = _a.sent();
                    if (whatsapp === null) {
                        throw Error("Whatsapp não identificado");
                    }
                    messageData = data.data;
                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, messageData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    Sentry.captureException(e_1);
                    logger_1["default"].error("MessageQueue -> SendMessage: error", e_1.message);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleVerifySchedules(job) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, count, schedules, promises, e_2;
        var _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    logger_1["default"].info("[SendScheduledMessage -> Verify] Buscando schedules pendentes...");
                    return [4 /*yield*/, Schedule_1["default"].findAndCountAll({
                            where: {
                                status: "PENDENTE",
                                sentAt: null,
                                sendAt: (_b = {},
                                    _b[sequelize_1.Op.lte] = (0, moment_1["default"])().toDate() // Buscar lembretes que já passaram ou estão na hora
                                ,
                                    _b)
                            },
                            include: [
                                { model: Contact_1["default"], as: "contact", required: false },
                                { model: User_1["default"], as: "user", attributes: ["name"], required: false }
                            ],
                            distinct: true,
                            subQuery: false
                        })];
                case 1:
                    _a = _c.sent(), count = _a.count, schedules = _a.rows;
                    logger_1["default"].info("[SendScheduledMessage -> Verify] Encontrados ".concat(count, " agendamentos para processar"));
                    if (!(count > 0)) return [3 /*break*/, 3];
                    logger_1["default"].info("Encontrados ".concat(count, " agendamentos para processar"));
                    promises = schedules.map(function (schedule) { return __awaiter(_this, void 0, void 0, function () {
                        var now, sendAt, delay_1, contactName, err_1, contactName;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 2, , 4]);
                                    return [4 /*yield*/, schedule.update({
                                            status: "AGENDADA"
                                        })];
                                case 1:
                                    _c.sent();
                                    now = (0, moment_1["default"])();
                                    sendAt = (0, moment_1["default"])(schedule.sendAt);
                                    delay_1 = Math.max(0, sendAt.diff(now, "milliseconds"));
                                    exports.sendScheduledMessages.add("SendMessage", { schedule: schedule }, { delay: delay_1 } // Usar delay calculado em vez de 40 segundos fixos
                                    );
                                    contactName = ((_a = schedule.contact) === null || _a === void 0 ? void 0 : _a.name) || "ID: ".concat(schedule.contactId || 'N/A');
                                    logger_1["default"].info("[SendScheduledMessage] Job adicionado \u00E0 fila para: ".concat(contactName, " em ").concat(delay_1, "ms"));
                                    logger_1["default"].info("Disparo agendado para: ".concat(contactName, " em ").concat(delay_1, "ms"));
                                    return [3 /*break*/, 4];
                                case 2:
                                    err_1 = _c.sent();
                                    contactName = ((_b = schedule.contact) === null || _b === void 0 ? void 0 : _b.name) || "ID: ".concat(schedule.contactId || 'N/A');
                                    logger_1["default"].error("Erro ao agendar disparo para ".concat(contactName, ": ").concat(err_1.message));
                                    // Atualizar status para não tentar novamente
                                    return [4 /*yield*/, schedule.update({ status: "ERRO" })];
                                case 3:
                                    // Atualizar status para não tentar novamente
                                    _c.sent();
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_2 = _c.sent();
                    Sentry.captureException(e_2);
                    logger_1["default"].error("SendScheduledMessage -> Verify: error", e_2.message);
                    logger_1["default"].error("SendScheduledMessage -> Verify: error stack", e_2.stack);
                    logger_1["default"].error("SendScheduledMessage -> Verify: error name", e_2.name);
                    logger_1["default"].error("SendScheduledMessage -> Verify: error details", JSON.stringify(e_2));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function handleSendScheduledMessage(job) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        function isDiaUtil(date) {
            var dayOfWeek = date.day();
            return dayOfWeek >= 1 && dayOfWeek <= 5; // 1 é segunda-feira, 5 é sexta-feira
        }
        function proximoDiaUtil(date) {
            var proximoDia = date.clone();
            do {
                proximoDia.add(1, 'day');
            } while (!isDiaUtil(proximoDia));
            return proximoDia;
        }
        // Função para encontrar o dia útil anterior
        function diaUtilAnterior(date) {
            var diaAnterior = date.clone();
            do {
                diaAnterior.subtract(1, 'day');
            } while (!isDiaUtil(diaAnterior));
            return diaAnterior;
        }
        var schedule, scheduleRecord, e_3, whatsapp, filePath, ticket, bodyMessage, SendMenuWithFallback, error_1, sentMessage, sentMessage, wbot, jid, buttons, interactiveMsg, newMsg, additionalNodes, error_2, sentMessage, sentMessage, unidadeIntervalo, dataExistente, hora, fusoHorario, novaData, updatedSchedule, io, eventName, action, ticket, contact, executeStartFlow, error_3, e_4, updatedSchedule, io;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    logger_1["default"].info("[SendScheduledMessage] Iniciando envio de mensagem agendada...");
                    schedule = job.data.schedule;
                    scheduleRecord = null;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Schedule_1["default"].findByPk(schedule.id)];
                case 2:
                    scheduleRecord = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _d.sent();
                    Sentry.captureException(e_3);
                    logger_1["default"].info("Erro ao tentar consultar agendamento: ".concat(schedule.id));
                    return [3 /*break*/, 4];
                case 4:
                    if (!(!schedule.contact || !schedule.contact.id)) return [3 /*break*/, 7];
                    logger_1["default"].error("[SendScheduledMessage] Schedule ".concat(schedule.id, " n\u00E3o tem contato associado. Marcando como ERRO."));
                    if (!scheduleRecord) return [3 /*break*/, 6];
                    return [4 /*yield*/, scheduleRecord.update({
                            status: "ERRO"
                        })];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6: return [2 /*return*/];
                case 7:
                    _d.trys.push([7, 62, , 66]);
                    whatsapp = void 0;
                    if (!!(0, lodash_1.isNil)(schedule.whatsappId)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(schedule.whatsappId)];
                case 8:
                    whatsapp = _d.sent();
                    _d.label = 9;
                case 9:
                    if (!!whatsapp) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(null, schedule.companyId)];
                case 10:
                    whatsapp = _d.sent();
                    _d.label = 11;
                case 11:
                    filePath = null;
                    if (schedule.mediaPath) {
                        filePath = path_1["default"].resolve("public", "company".concat(schedule.companyId), schedule.mediaPath);
                    }
                    if (!(schedule.openTicket === "enabled")) return [3 /*break*/, 35];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: schedule.contact.id,
                                companyId: schedule.companyId,
                                whatsappId: whatsapp.id,
                                status: ["open", "pending"]
                            }
                        })];
                case 12:
                    ticket = _d.sent();
                    if (!!ticket) return [3 /*break*/, 15];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: schedule.contact.id,
                                companyId: schedule.companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["updatedAt", "DESC"]]
                        })];
                case 13:
                    ticket = _d.sent();
                    if (!ticket) return [3 /*break*/, 15];
                    return [4 /*yield*/, ticket.update({
                            queueId: schedule.queueId,
                            userId: schedule.ticketUserId,
                            status: schedule.statusTicket
                        })];
                case 14:
                    _d.sent();
                    _d.label = 15;
                case 15:
                    if (!!ticket) return [3 /*break*/, 17];
                    return [4 /*yield*/, Ticket_1["default"].create({
                            companyId: schedule.companyId,
                            contactId: schedule.contactId,
                            whatsappId: whatsapp.id,
                            queueId: schedule.queueId,
                            userId: schedule.ticketUserId,
                            status: schedule.statusTicket
                        })];
                case 16:
                    ticket = _d.sent();
                    _d.label = 17;
                case 17: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, schedule.companyId)];
                case 18:
                    ticket = _d.sent();
                    bodyMessage = void 0;
                    // @ts-ignore: Unreachable code error
                    if (schedule.assinar && !(0, lodash_1.isNil)(schedule.userId)) {
                        bodyMessage = "*".concat((_a = schedule === null || schedule === void 0 ? void 0 : schedule.user) === null || _a === void 0 ? void 0 : _a.name, ":*\n").concat(schedule.body.trim());
                    }
                    else {
                        bodyMessage = schedule.body.trim();
                    }
                    logger_1["default"].info("[SendScheduledMessage] Enviando mensagem COM ticket - Ticket: ".concat(ticket.id, ", N\u00FAmero: ").concat(schedule.contact.number, ", WhatsApp: ").concat(whatsapp.id));
                    if (!(schedule.arrayOption && schedule.arrayOption.length > 0)) return [3 /*break*/, 29];
                    _d.label = 19;
                case 19:
                    _d.trys.push([19, 22, , 28]);
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./helpers/SendInteractiveMenu")); })];
                case 20:
                    SendMenuWithFallback = (_d.sent()).SendMenuWithFallback;
                    return [4 /*yield*/, SendMenuWithFallback({
                            ticket: ticket,
                            menuMessage: (0, Mustache_1["default"])(bodyMessage, ticket),
                            arrayOption: schedule.arrayOption,
                            menuType: "buttons"
                        })];
                case 21:
                    _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Mensagem com menu enviada usando SendInteractiveMenu");
                    return [3 /*break*/, 28];
                case 22:
                    error_1 = _d.sent();
                    logger_1["default"].error("[SendScheduledMessage] Erro ao enviar menu interativo, usando fallback: ".concat(error_1.message));
                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                            number: schedule.contact.number,
                            body: "\u200E ".concat((0, Mustache_1["default"])(bodyMessage, ticket)),
                            mediaPath: filePath,
                            companyId: schedule.companyId
                        }, schedule.contact.isGroup)];
                case 23:
                    sentMessage = _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Mensagem enviada (fallback sem bot\u00F5es) - ID: ".concat((sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.id) || 'N/A', ", Key: ").concat(((_b = sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.key) === null || _b === void 0 ? void 0 : _b.id) || 'N/A'));
                    if (!schedule.mediaPath) return [3 /*break*/, 25];
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMediaMessage)(sentMessage, ticket, ticket.contact, null, true, false, whatsapp)];
                case 24:
                    _d.sent();
                    return [3 /*break*/, 27];
                case 25: return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, ticket.contact, null, true, false)];
                case 26:
                    _d.sent();
                    _d.label = 27;
                case 27: return [3 /*break*/, 28];
                case 28: return [3 /*break*/, 34];
                case 29: return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                        number: schedule.contact.number,
                        body: "\u200E ".concat((0, Mustache_1["default"])(bodyMessage, ticket)),
                        mediaPath: filePath,
                        companyId: schedule.companyId
                    }, schedule.contact.isGroup)];
                case 30:
                    sentMessage = _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Mensagem enviada - ID: ".concat((sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.id) || 'N/A', ", Key: ").concat(((_c = sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.key) === null || _c === void 0 ? void 0 : _c.id) || 'N/A'));
                    if (!schedule.mediaPath) return [3 /*break*/, 32];
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMediaMessage)(sentMessage, ticket, ticket.contact, null, true, false, whatsapp)];
                case 31:
                    _d.sent();
                    return [3 /*break*/, 34];
                case 32: return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, ticket.contact, null, true, false)];
                case 33:
                    _d.sent();
                    _d.label = 34;
                case 34: return [3 /*break*/, 46];
                case 35:
                    logger_1["default"].info("[SendScheduledMessage] Enviando mensagem sem ticket - N\u00FAmero: ".concat(schedule.contact.number, ", WhatsApp: ").concat(whatsapp.id, ", Corpo: ").concat(schedule.body.substring(0, 50), "..."));
                    if (!(schedule.arrayOption && schedule.arrayOption.length > 0)) return [3 /*break*/, 44];
                    _d.label = 36;
                case 36:
                    _d.trys.push([36, 41, , 43]);
                    return [4 /*yield*/, (0, GetWhatsappWbot_1["default"])(whatsapp)];
                case 37:
                    wbot = _d.sent();
                    jid = "".concat(schedule.contact.number, "@").concat(schedule.contact.isGroup ? 'g.us' : 's.whatsapp.net');
                    // Validar número de opções (máximo 3 para quick_reply)
                    if (schedule.arrayOption.length > 3) {
                        logger_1["default"].warn("[SendScheduledMessage] Menu com ".concat(schedule.arrayOption.length, " op\u00E7\u00F5es excede o limite de 3, usando fallback textual"));
                        throw new Error("Too many options for interactive menu");
                    }
                    buttons = schedule.arrayOption.map(function (option, index) { return ({
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: option.value.trim(),
                            id: option.number.toString()
                        })
                    }); });
                    interactiveMsg = {
                        viewOnceMessage: {
                            message: {
                                interactiveMessage: {
                                    body: {
                                        text: "\u200E".concat(schedule.body.trim())
                                    },
                                    nativeFlowMessage: {
                                        buttons: buttons,
                                        messageParamsJson: JSON.stringify({
                                            from: "apiv2",
                                            templateId: "4194019344155670"
                                        })
                                    }
                                }
                            }
                        }
                    };
                    newMsg = (0, baileys_1.generateWAMessageFromContent)(jid, interactiveMsg, {
                        userJid: wbot.user.id
                    });
                    additionalNodes = [
                        {
                            tag: "biz",
                            attrs: {},
                            content: [
                                {
                                    tag: "interactive",
                                    attrs: { type: "native_flow", v: "1" },
                                    content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
                                }
                            ]
                        }
                    ];
                    return [4 /*yield*/, wbot.relayMessage(jid, newMsg.message, {
                            messageId: newMsg.key.id,
                            additionalNodes: additionalNodes
                        })];
                case 38:
                    _d.sent();
                    if (!newMsg) return [3 /*break*/, 40];
                    return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                case 39:
                    _d.sent();
                    _d.label = 40;
                case 40:
                    logger_1["default"].info("[SendScheduledMessage] Mensagem com menu enviada (sem ticket) usando interactiveMessage");
                    return [3 /*break*/, 43];
                case 41:
                    error_2 = _d.sent();
                    logger_1["default"].error("[SendScheduledMessage] Erro ao enviar menu interativo sem ticket, usando fallback: ".concat(error_2.message));
                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                            number: schedule.contact.number,
                            body: "\u200E ".concat(schedule.body),
                            mediaPath: filePath,
                            companyId: schedule.companyId
                        }, schedule.contact.isGroup)];
                case 42:
                    sentMessage = _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Mensagem enviada (fallback sem bot\u00F5es) - ID: ".concat((sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.id) || 'N/A', ", Status: ").concat((sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.status) || 'N/A'));
                    return [3 /*break*/, 43];
                case 43: return [3 /*break*/, 46];
                case 44: return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                        number: schedule.contact.number,
                        body: "\u200E ".concat(schedule.body),
                        mediaPath: filePath,
                        companyId: schedule.companyId
                    }, schedule.contact.isGroup)];
                case 45:
                    sentMessage = _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Mensagem enviada - ID: ".concat((sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.id) || 'N/A', ", Status: ").concat((sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.status) || 'N/A'));
                    _d.label = 46;
                case 46:
                    if (!(schedule.valorIntervalo > 0 && ((0, lodash_1.isNil)(schedule.contadorEnvio) || schedule.contadorEnvio < schedule.enviarQuantasVezes))) return [3 /*break*/, 48];
                    unidadeIntervalo = void 0;
                    switch (schedule.intervalo) {
                        case 1:
                            unidadeIntervalo = 'days';
                            break;
                        case 2:
                            unidadeIntervalo = 'weeks';
                            break;
                        case 3:
                            unidadeIntervalo = 'months';
                            break;
                        case 4:
                            unidadeIntervalo = 'minuts';
                            break;
                        default:
                            throw new Error('Intervalo inválido');
                    }
                    dataExistente = new Date(schedule.sendAt);
                    hora = dataExistente.getHours();
                    fusoHorario = dataExistente.getTimezoneOffset();
                    novaData = new Date(dataExistente);
                    console.log(unidadeIntervalo);
                    if (unidadeIntervalo !== "minuts") {
                        novaData.setDate(novaData.getDate() + schedule.valorIntervalo * (unidadeIntervalo === 'days' ? 1 : unidadeIntervalo === 'weeks' ? 7 : 30));
                    }
                    else {
                        novaData.setMinutes(novaData.getMinutes() + Number(schedule.valorIntervalo));
                        console.log(novaData);
                    }
                    if (schedule.tipoDias === 5 && !isDiaUtil(novaData)) {
                        novaData = diaUtilAnterior(novaData);
                    }
                    else if (schedule.tipoDias === 6 && !isDiaUtil(novaData)) {
                        novaData = proximoDiaUtil(novaData);
                    }
                    novaData.setHours(hora);
                    novaData.setMinutes(novaData.getMinutes() - fusoHorario);
                    return [4 /*yield*/, (scheduleRecord === null || scheduleRecord === void 0 ? void 0 : scheduleRecord.update({
                            status: "PENDENTE",
                            contadorEnvio: schedule.contadorEnvio + 1,
                            sendAt: new Date(novaData.toISOString().slice(0, 19).replace('T', ' ')) // Mantendo o formato de hora
                        }))];
                case 47:
                    _d.sent();
                    return [3 /*break*/, 50];
                case 48: return [4 /*yield*/, (scheduleRecord === null || scheduleRecord === void 0 ? void 0 : scheduleRecord.update({
                        sentAt: new Date((0, moment_1["default"])().format("YYYY-MM-DD HH:mm")),
                        status: "ENVIADA"
                    }))];
                case 49:
                    _d.sent();
                    _d.label = 50;
                case 50:
                    if (!scheduleRecord) return [3 /*break*/, 52];
                    return [4 /*yield*/, Schedule_1["default"].findByPk(scheduleRecord.id, {
                            include: [
                                { model: Contact_1["default"], as: "contact" },
                                { model: User_1["default"], as: "user" }
                            ]
                        })];
                case 51:
                    updatedSchedule = _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Schedule ".concat(scheduleRecord.id, " status: ").concat(updatedSchedule === null || updatedSchedule === void 0 ? void 0 : updatedSchedule.status, " - Emitindo socket company").concat(schedule.companyId, "-schedule"));
                    if (updatedSchedule) {
                        io = (0, socket_1.getIO)();
                        eventName = "company".concat(schedule.companyId, "-schedule");
                        logger_1["default"].info("[SendScheduledMessage] Emitindo evento: ".concat(eventName, " action=update id=").concat(updatedSchedule.id, " status=").concat(updatedSchedule.status));
                        io.of(String(schedule.companyId))
                            .emit(eventName, {
                            action: "update",
                            schedule: updatedSchedule
                        });
                    }
                    _d.label = 52;
                case 52:
                    if (!(schedule.tagIds && typeof schedule.tagIds === 'object' && schedule.tagIds.startFlow && schedule.tagIds.flowId)) return [3 /*break*/, 61];
                    _d.label = 53;
                case 53:
                    _d.trys.push([53, 60, , 61]);
                    logger_1["default"].info("[SendScheduledMessage] Iniciando fluxo ".concat(schedule.tagIds.flowId, " ap\u00F3s envio da mensagem"));
                    action = {
                        type: "startFlow",
                        flowId: schedule.tagIds.flowId.toString()
                    };
                    return [4 /*yield*/, Ticket_1["default"].findByPk(schedule.ticketId)];
                case 54:
                    ticket = _d.sent();
                    return [4 /*yield*/, Contact_1["default"].findByPk(schedule.contactId)];
                case 55:
                    contact = _d.sent();
                    if (!(ticket && contact)) return [3 /*break*/, 58];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./services/ExecuteTagAutoActionsService")); })];
                case 56:
                    executeStartFlow = (_d.sent()).executeStartFlow;
                    return [4 /*yield*/, executeStartFlow(action, contact, ticket, schedule.companyId)];
                case 57:
                    _d.sent();
                    logger_1["default"].info("[SendScheduledMessage] Fluxo iniciado com sucesso");
                    return [3 /*break*/, 59];
                case 58:
                    logger_1["default"].error("[SendScheduledMessage] N\u00E3o foi poss\u00EDvel iniciar fluxo - Ticket ou Contact n\u00E3o encontrado");
                    _d.label = 59;
                case 59: return [3 /*break*/, 61];
                case 60:
                    error_3 = _d.sent();
                    logger_1["default"].error("[SendScheduledMessage] Erro ao iniciar fluxo ap\u00F3s mensagem: ".concat(error_3.message));
                    return [3 /*break*/, 61];
                case 61:
                    logger_1["default"].info("Mensagem agendada enviada para: ".concat(schedule.contact.name));
                    exports.sendScheduledMessages.clean(15000, "completed");
                    return [3 /*break*/, 66];
                case 62:
                    e_4 = _d.sent();
                    Sentry.captureException(e_4);
                    return [4 /*yield*/, (scheduleRecord === null || scheduleRecord === void 0 ? void 0 : scheduleRecord.update({
                            status: "ERRO"
                        }))];
                case 63:
                    _d.sent();
                    logger_1["default"].error("SendScheduledMessage -> SendMessage: error", e_4.message);
                    if (!((schedule === null || schedule === void 0 ? void 0 : schedule.companyId) && scheduleRecord)) return [3 /*break*/, 65];
                    return [4 /*yield*/, Schedule_1["default"].findByPk(scheduleRecord.id, {
                            include: [
                                { model: Contact_1["default"], as: "contact" },
                                { model: User_1["default"], as: "user" }
                            ]
                        })];
                case 64:
                    updatedSchedule = _d.sent();
                    if (updatedSchedule) {
                        io = (0, socket_1.getIO)();
                        io.of(String(schedule.companyId))
                            .emit("company".concat(schedule.companyId, "-schedule"), {
                            action: "update",
                            schedule: updatedSchedule
                        });
                    }
                    _d.label = 65;
                case 65:
                    logger_1["default"].error("SendScheduledMessage -> SendMessage: error", e_4.message);
                    return [3 /*break*/, 66];
                case 66: return [2 /*return*/];
            }
        });
    });
}
function handleVerifyCampaigns(job) {
    return __awaiter(this, void 0, void 0, function () {
        var campaigns, promises, err_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isProcessing) {
                        // logger.warn('A campaign verification process is already running.');
                        return [2 /*return*/];
                    }
                    isProcessing = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1500); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("SELECT id, \"scheduledAt\" FROM \"Campaigns\" c\n        WHERE \"scheduledAt\" BETWEEN NOW() AND NOW() + INTERVAL '3 hour' AND status = 'PROGRAMADA'", { type: sequelize_1.QueryTypes.SELECT })];
                case 3:
                    campaigns = _a.sent();
                    if (!(campaigns.length > 0)) return [3 /*break*/, 5];
                    logger_1["default"].info("Campanhas encontradas: ".concat(campaigns.length));
                    promises = campaigns.map(function (campaign) { return __awaiter(_this, void 0, void 0, function () {
                        var now, scheduledAt, delay_2, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, database_1["default"].query("UPDATE \"Campaigns\" SET status = 'EM_ANDAMENTO' WHERE id = ".concat(campaign.id))];
                                case 1:
                                    _a.sent();
                                    now = (0, moment_1["default"])();
                                    scheduledAt = (0, moment_1["default"])(campaign.scheduledAt);
                                    delay_2 = scheduledAt.diff(now, "milliseconds");
                                    logger_1["default"].info("Campanha enviada para a fila de processamento: Campanha=".concat(campaign.id, ", Delay Inicial=").concat(delay_2));
                                    return [2 /*return*/, exports.campaignQueue.add("ProcessCampaign", { id: campaign.id, delay: delay_2 }, { priority: 3, removeOnComplete: { age: 60 * 60, count: 10 }, removeOnFail: { age: 60 * 60, count: 10 } })];
                                case 2:
                                    err_3 = _a.sent();
                                    Sentry.captureException(err_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 4:
                    _a.sent();
                    logger_1["default"].info('Todas as campanhas foram processadas e adicionadas à fila.');
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_2 = _a.sent();
                    Sentry.captureException(err_2);
                    logger_1["default"].error("Error processing campaigns: ".concat(err_2.message));
                    return [3 /*break*/, 8];
                case 7:
                    isProcessing = false;
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getCampaign(id) {
    return __awaiter(this, void 0, void 0, function () {
        var campaign, include, isEmailCampaign, isOfficialCampaign, contactWhere;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Campaign_1["default"].findByPk(id)];
                case 1:
                    campaign = _a.sent();
                    include = [
                        {
                            model: Whatsapp_1["default"],
                            as: "whatsapp",
                            attributes: ["id", "name", "channel", "coexistencePhoneNumberId", "coexistencePermanentToken"]
                        }
                    ];
                    // Incluir ContactList apenas quando for campanha por lista
                    if (campaign === null || campaign === void 0 ? void 0 : campaign.contactListId) {
                        isEmailCampaign = campaign.channel === "email";
                        isOfficialCampaign = campaign.channel === "whatsapp_official";
                        contactWhere = (isEmailCampaign || isOfficialCampaign)
                            ? {}
                            : { isWhatsappValid: true };
                        include.push({
                            model: ContactList_1["default"],
                            as: "contactList",
                            attributes: ["id", "name"],
                            include: [
                                {
                                    model: ContactListItem_1["default"],
                                    as: "contacts",
                                    attributes: ["id", "name", "number", "email", "isWhatsappValid", "isGroup"],
                                    where: contactWhere
                                }
                            ]
                        });
                    }
                    return [4 /*yield*/, Campaign_1["default"].findOne({
                            where: { id: id },
                            include: include
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getContact(id, isTagCampaign) {
    if (isTagCampaign === void 0) { isTagCampaign = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isTagCampaign) return [3 /*break*/, 2];
                    return [4 /*yield*/, Contact_1["default"].findByPk(id, {
                            attributes: ["id", "name", "number", "email", "isGroup"]
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, ContactListItem_1["default"].findByPk(id, {
                        attributes: ["id", "name", "number", "email", "isGroup"]
                    })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getSettings(campaign) {
    return __awaiter(this, void 0, void 0, function () {
        var settings, messageInterval_1, longerIntervalAfter_1, greaterInterval_1, variables_1, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, CampaignSetting_1["default"].findAll({
                            where: { companyId: campaign.companyId },
                            attributes: ["key", "value"]
                        })];
                case 1:
                    settings = _a.sent();
                    messageInterval_1 = 20;
                    longerIntervalAfter_1 = 20;
                    greaterInterval_1 = 60;
                    variables_1 = [];
                    settings.forEach(function (setting) {
                        if (setting.key === "messageInterval") {
                            messageInterval_1 = JSON.parse(setting.value);
                        }
                        if (setting.key === "longerIntervalAfter") {
                            longerIntervalAfter_1 = JSON.parse(setting.value);
                        }
                        if (setting.key === "greaterInterval") {
                            greaterInterval_1 = JSON.parse(setting.value);
                        }
                        if (setting.key === "variables") {
                            variables_1 = JSON.parse(setting.value);
                        }
                    });
                    return [2 /*return*/, {
                            messageInterval: messageInterval_1,
                            longerIntervalAfter: longerIntervalAfter_1,
                            greaterInterval: greaterInterval_1,
                            variables: variables_1
                        }];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    throw error_4; // rejeita a Promise com o erro original
                case 3: return [2 /*return*/];
            }
        });
    });
}
function parseToMilliseconds(seconds) {
    return seconds * 1000;
}
exports.parseToMilliseconds = parseToMilliseconds;
function sleep(seconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            logger_1["default"].info("Sleep de ".concat(seconds, " segundos iniciado: ").concat((0, moment_1["default"])().format("HH:mm:ss")));
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        logger_1["default"].info("Sleep de ".concat(seconds, " segundos finalizado: ").concat((0, moment_1["default"])().format("HH:mm:ss")));
                        resolve(true);
                    }, parseToMilliseconds(seconds));
                })];
        });
    });
}
function sendCampaignTemplateBlocks(wbot, chatId, campaign, message, ticket, contact, variables) {
    var _a;
    if (variables === void 0) { variables = []; }
    return __awaiter(this, void 0, void 0, function () {
        var publicFolder, blocks, _i, blocks_1, block, text, caption, body, sent, filePath, options, sent, cards, SendCarouselWithFallback, err_4, buttons, bodyText, msg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    publicFolder = path_1["default"].resolve(__dirname, "..", "public");
                    blocks = campaign.templateData;
                    _i = 0, blocks_1 = blocks;
                    _b.label = 1;
                case 1:
                    if (!(_i < blocks_1.length)) return [3 /*break*/, 28];
                    block = blocks_1[_i];
                    text = block.text ? getProcessedMessage(block.text, variables, contact || {}) : "";
                    caption = block.caption ? getProcessedMessage(block.caption, variables, contact || {}) : "";
                    if (!(block.type === "text")) return [3 /*break*/, 7];
                    if (!text)
                        return [3 /*break*/, 27];
                    body = "\u200C ".concat(text);
                    if (!(ticket && contact)) return [3 /*break*/, 4];
                    return [4 /*yield*/, wbot.sendMessage(chatId, { text: body })];
                case 2:
                    sent = _b.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sent, ticket, contact, null, true, false)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, wbot.sendMessage(chatId, { text: body })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 25];
                case 7:
                    if (!(block.type === "image" || block.type === "video" || block.type === "file")) return [3 /*break*/, 14];
                    if (!block.mediaPath)
                        return [3 /*break*/, 27];
                    filePath = path_1["default"].join(publicFolder, "company".concat(campaign.companyId), block.mediaPath);
                    return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(block.mediaName || block.mediaPath, filePath, String(campaign.companyId), caption || "\u200C ".concat(message))];
                case 8:
                    options = _b.sent();
                    if (!Object.keys(options).length) return [3 /*break*/, 13];
                    if (!(ticket && contact)) return [3 /*break*/, 11];
                    return [4 /*yield*/, wbot.sendMessage(chatId, __assign({}, options))];
                case 9:
                    sent = _b.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMediaMessage)(sent, ticket, ticket.contact, null, false, true, wbot)];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, wbot.sendMessage(chatId, __assign({}, options))];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 25];
                case 14:
                    if (!(block.type === "carousel")) return [3 /*break*/, 23];
                    cards = block.cards || [];
                    if (cards.length < 2)
                        return [3 /*break*/, 27];
                    _b.label = 15;
                case 15:
                    _b.trys.push([15, 21, , 22]);
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./helpers/SendCarouselMessage")); })];
                case 16:
                    SendCarouselWithFallback = (_b.sent()).SendCarouselWithFallback;
                    if (!ticket) return [3 /*break*/, 18];
                    return [4 /*yield*/, SendCarouselWithFallback({ ticket: ticket, title: block.title || "", cards: cards, companyId: campaign.companyId })];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 18: 
                // Sem ticket — usa wbot + chatId direto
                return [4 /*yield*/, SendCarouselWithFallback({ wbot: wbot, jid: chatId, title: block.title || "", cards: cards, companyId: campaign.companyId })];
                case 19:
                    // Sem ticket — usa wbot + chatId direto
                    _b.sent();
                    _b.label = 20;
                case 20: return [3 /*break*/, 22];
                case 21:
                    err_4 = _b.sent();
                    logger_1["default"].error("\u274C Erro ao enviar carrossel na campanha:", err_4);
                    return [3 /*break*/, 22];
                case 22: return [3 /*break*/, 25];
                case 23:
                    if (!(block.type === "buttons")) return [3 /*break*/, 25];
                    buttons = (block.buttons || []).map(function (btn, btnIdx) {
                        var params;
                        if (btn.type === "quick_reply") {
                            params = { display_text: btn.displayText, id: String(btnIdx + 1) };
                        }
                        else if (btn.type === "cta_url") {
                            params = { display_text: btn.displayText, url: btn.value, merchant_url: btn.value };
                        }
                        else if (btn.type === "cta_call") {
                            params = { display_text: btn.displayText, phone_number: btn.value };
                        }
                        else {
                            params = { display_text: btn.displayText, copy_code: btn.value };
                        }
                        return { name: btn.type, buttonParamsJson: JSON.stringify(params) };
                    });
                    if (!buttons.length)
                        return [3 /*break*/, 27];
                    bodyText = text || "\u200C ".concat(message);
                    msg = (0, baileys_1.generateWAMessageFromContent)(chatId, {
                        interactiveMessage: {
                            body: { text: bodyText },
                            footer: { text: "" },
                            header: {},
                            nativeFlowMessage: {
                                buttons: buttons,
                                messageParamsJson: JSON.stringify({ from: "apiv2", templateId: "4194019344155670" })
                            }
                        }
                    }, { userJid: (_a = wbot.user) === null || _a === void 0 ? void 0 : _a.id });
                    return [4 /*yield*/, wbot.relayMessage(chatId, msg.message, {
                            messageId: msg.key.id,
                            additionalNodes: [
                                {
                                    tag: "biz",
                                    attrs: {},
                                    content: [
                                        {
                                            tag: "interactive",
                                            attrs: { type: "native_flow", v: "1" },
                                            content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
                                        }
                                    ]
                                }
                            ]
                        })];
                case 24:
                    _b.sent();
                    _b.label = 25;
                case 25: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 26:
                    _b.sent();
                    _b.label = 27;
                case 27:
                    _i++;
                    return [3 /*break*/, 1];
                case 28: return [2 /*return*/];
            }
        });
    });
}
function getCampaignValidMessages(campaign) {
    var messages = [];
    if (!(0, lodash_1.isEmpty)(campaign.message1) && !(0, lodash_1.isNil)(campaign.message1)) {
        messages.push(campaign.message1);
    }
    if (!(0, lodash_1.isEmpty)(campaign.message2) && !(0, lodash_1.isNil)(campaign.message2)) {
        messages.push(campaign.message2);
    }
    if (!(0, lodash_1.isEmpty)(campaign.message3) && !(0, lodash_1.isNil)(campaign.message3)) {
        messages.push(campaign.message3);
    }
    if (!(0, lodash_1.isEmpty)(campaign.message4) && !(0, lodash_1.isNil)(campaign.message4)) {
        messages.push(campaign.message4);
    }
    if (!(0, lodash_1.isEmpty)(campaign.message5) && !(0, lodash_1.isNil)(campaign.message5)) {
        messages.push(campaign.message5);
    }
    return messages;
}
function getCampaignValidConfirmationMessages(campaign) {
    var messages = [];
    if (!(0, lodash_1.isEmpty)(campaign.confirmationMessage1) &&
        !(0, lodash_1.isNil)(campaign.confirmationMessage1)) {
        messages.push(campaign.confirmationMessage1);
    }
    if (!(0, lodash_1.isEmpty)(campaign.confirmationMessage2) &&
        !(0, lodash_1.isNil)(campaign.confirmationMessage2)) {
        messages.push(campaign.confirmationMessage2);
    }
    if (!(0, lodash_1.isEmpty)(campaign.confirmationMessage3) &&
        !(0, lodash_1.isNil)(campaign.confirmationMessage3)) {
        messages.push(campaign.confirmationMessage3);
    }
    if (!(0, lodash_1.isEmpty)(campaign.confirmationMessage4) &&
        !(0, lodash_1.isNil)(campaign.confirmationMessage4)) {
        messages.push(campaign.confirmationMessage4);
    }
    if (!(0, lodash_1.isEmpty)(campaign.confirmationMessage5) &&
        !(0, lodash_1.isNil)(campaign.confirmationMessage5)) {
        messages.push(campaign.confirmationMessage5);
    }
    return messages;
}
function getProcessedMessage(msg, variables, contact) {
    var _a;
    var finalMessage = msg;
    if (finalMessage.includes("{nome}")) {
        finalMessage = finalMessage.replace(/{nome}/g, contact.name);
    }
    if (finalMessage.includes("{email}")) {
        finalMessage = finalMessage.replace(/{email}/g, contact.email);
    }
    if (finalMessage.includes("{numero}")) {
        finalMessage = finalMessage.replace(/{numero}/g, contact.number);
    }
    if (((_a = variables[0]) === null || _a === void 0 ? void 0 : _a.value) !== '[]') {
        variables.forEach(function (variable) {
            if (finalMessage.includes("{".concat(variable.key, "}"))) {
                var regex = new RegExp("{".concat(variable.key, "}"), "g");
                finalMessage = finalMessage.replace(regex, variable.value);
            }
        });
    }
    return finalMessage;
}
var checkerWeek = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sab, dom, sabado, domingo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sab = (0, moment_1["default"])().day() === 6;
                dom = (0, moment_1["default"])().day() === 0;
                return [4 /*yield*/, CampaignSetting_1["default"].findOne({
                        where: { key: "sabado" }
                    })];
            case 1:
                sabado = _a.sent();
                return [4 /*yield*/, CampaignSetting_1["default"].findOne({
                        where: { key: "domingo" }
                    })];
            case 2:
                domingo = _a.sent();
                if ((sabado === null || sabado === void 0 ? void 0 : sabado.value) === "false" && sab) {
                    exports.messageQueue.pause();
                    return [2 /*return*/, true];
                }
                if ((domingo === null || domingo === void 0 ? void 0 : domingo.value) === "false" && dom) {
                    exports.messageQueue.pause();
                    return [2 /*return*/, true];
                }
                exports.messageQueue.resume();
                return [2 /*return*/, false];
        }
    });
}); };
var checkTime = function () { return __awaiter(void 0, void 0, void 0, function () {
    var startHour, endHour, hour, endHours, timeNow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CampaignSetting_1["default"].findOne({
                    where: {
                        key: "startHour"
                    }
                })];
            case 1:
                startHour = _a.sent();
                return [4 /*yield*/, CampaignSetting_1["default"].findOne({
                        where: {
                            key: "endHour"
                        }
                    })];
            case 2:
                endHour = _a.sent();
                hour = startHour.value;
                endHours = endHour.value;
                timeNow = (0, moment_1["default"])().format("HH:mm");
                if (timeNow <= endHours && timeNow >= hour) {
                    exports.messageQueue.resume();
                    return [2 /*return*/, true];
                }
                logger_1["default"].info("Envio inicia as ".concat(hour, " e termina as ").concat(endHours, ", hora atual ").concat(timeNow, " n\u00E3o est\u00E1 dentro do hor\u00E1rio"));
                exports.messageQueue.clean(0, "delayed");
                exports.messageQueue.clean(0, "wait");
                exports.messageQueue.clean(0, "active");
                exports.messageQueue.clean(0, "completed");
                exports.messageQueue.clean(0, "failed");
                exports.messageQueue.pause();
                return [2 /*return*/, false];
        }
    });
}); };
// const checkerLimitToday = async (whatsappId: number) => {
//   try {
//     const setting = await SettingMessage.findOne({
//       where: { whatsappId: whatsappId }
//     });
//     const lastUpdate = moment(setting.dateStart);
//     const now = moment();
//     const passou = now.isAfter(lastUpdate, "day");
//     if (setting.sendToday <= setting.limit) {
//       await setting.update({
//         dateStart: moment().format()
//       });
//       return true;
//     }
//     const zerar = true
//     if(passou) {
//       await setting.update({
//         sendToday: 0,
//         dateStart: moment().format()
//       });
//       setting.reload();
//     }
//     setting.reload();
//     logger.info(`Enviada hoje ${setting.sendToday} limite ${setting.limit}`);
//     // sendMassMessage.clean(0, "delayed");
//     // sendMassMessage.clean(0, "wait");
//     // sendMassMessage.clean(0, "active");
//     // sendMassMessage.clean(0, "completed");
//     // sendMassMessage.clean(0, "failed");
//     // sendMassMessage.pause();
//     return false;
//   } catch (error) {
//     logger.error("conexão não tem configuração de envio.");
//   }
// };
function randomValue(min, max) {
    return Math.floor(Math.random() * max) + min;
}
exports.randomValue = randomValue;
function verifyAndFinalizeCampaign(campaign) {
    return __awaiter(this, void 0, void 0, function () {
        var count1, companyId, contacts, count2, io;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    count1 = 0;
                    companyId = campaign.companyId;
                    if (!(campaign.contactListId && campaign.contactList)) return [3 /*break*/, 1];
                    contacts = campaign.contactList.contacts;
                    count1 = contacts.length;
                    return [3 /*break*/, 3];
                case 1:
                    if (!campaign.tagListId) return [3 /*break*/, 3];
                    return [4 /*yield*/, CampaignShipping_1["default"].count({
                            where: {
                                campaignId: campaign.id
                            }
                        })];
                case 2:
                    count1 = _c.sent();
                    _c.label = 3;
                case 3: return [4 /*yield*/, CampaignShipping_1["default"].count({
                        where: {
                            campaignId: campaign.id,
                            deliveredAt: (_a = {},
                                _a[sequelize_1.Op.ne] = null,
                                _a),
                            confirmation: campaign.confirmation ? true : (_b = {}, _b[sequelize_1.Op.or] = [null, false], _b)
                        }
                    })];
                case 4:
                    count2 = _c.sent();
                    if (!(count1 === count2 && count1 > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, campaign.update({ status: "FINALIZADA", completedAt: (0, moment_1["default"])() })];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    io = (0, socket_1.getIO)();
                    io.of(String(companyId))
                        .emit("company-".concat(campaign.companyId, "-campaign"), {
                        action: "update",
                        record: campaign
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function handleProcessCampaign(job) {
    return __awaiter(this, void 0, void 0, function () {
        var id, campaign_1, settings_1, contacts, contactTags, ticketTags, allContacts, uniqueContacts, contactData, longerIntervalAfter, greaterInterval, messageInterval, baseDelay, queuePromises, i, _a, contactId, campaignId, variables, delay_3, queuePromise, err_5, updateErr_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 15]);
                    id = job.data.id;
                    return [4 /*yield*/, getCampaign(id)];
                case 1:
                    campaign_1 = _b.sent();
                    return [4 /*yield*/, getSettings(campaign_1)];
                case 2:
                    settings_1 = _b.sent();
                    if (!campaign_1) return [3 /*break*/, 8];
                    contacts = null;
                    if (!(campaign_1.contactListId && campaign_1.contactList)) return [3 /*break*/, 3];
                    contacts = campaign_1.contactList.contacts;
                    return [3 /*break*/, 6];
                case 3:
                    if (!campaign_1.tagListId) return [3 /*break*/, 6];
                    return [4 /*yield*/, ContactTag_1["default"].findAll({
                            where: { tagId: campaign_1.tagListId },
                            include: [{
                                    model: Contact_1["default"],
                                    as: "contact",
                                    attributes: ["id", "name", "number", "email", "isGroup"]
                                }]
                        })];
                case 4:
                    contactTags = _b.sent();
                    return [4 /*yield*/, TicketTag_1["default"].findAll({
                            where: { tagId: campaign_1.tagListId },
                            include: [{
                                    model: Ticket_1["default"],
                                    as: "ticket",
                                    include: [{
                                            model: Contact_1["default"],
                                            as: "contact",
                                            attributes: ["id", "name", "number", "email", "isGroup"]
                                        }]
                                }]
                        })];
                case 5:
                    ticketTags = _b.sent();
                    allContacts = __spreadArray(__spreadArray([], contactTags.map(function (ct) { return ct.contact; }).filter(function (c) { return c != null; }), true), ticketTags.map(function (tt) { var _a; return (_a = tt.ticket) === null || _a === void 0 ? void 0 : _a.contact; }).filter(function (c) { return c != null; }), true);
                    uniqueContacts = allContacts.filter(function (contact, index, self) {
                        return contact && index === self.findIndex(function (c) { return c && c.id === contact.id; });
                    });
                    contacts = uniqueContacts;
                    _b.label = 6;
                case 6:
                    if (!(0, lodash_1.isArray)(contacts)) return [3 /*break*/, 8];
                    contactData = contacts.map(function (contact) { return ({
                        contactId: contact.id,
                        campaignId: campaign_1.id,
                        variables: settings_1.variables,
                        isGroup: contact.isGroup
                    }); });
                    longerIntervalAfter = parseToMilliseconds(settings_1.longerIntervalAfter);
                    greaterInterval = parseToMilliseconds(settings_1.greaterInterval);
                    messageInterval = settings_1.messageInterval;
                    baseDelay = campaign_1.scheduledAt;
                    queuePromises = [];
                    for (i = 0; i < contactData.length; i++) {
                        baseDelay = (0, date_fns_1.addSeconds)(baseDelay, i > longerIntervalAfter ? greaterInterval : messageInterval);
                        _a = contactData[i], contactId = _a.contactId, campaignId = _a.campaignId, variables = _a.variables;
                        delay_3 = calculateDelay(i, baseDelay, longerIntervalAfter, greaterInterval, messageInterval);
                        queuePromise = exports.campaignQueue.add("PrepareContact", { contactId: contactId, campaignId: campaignId, variables: variables, delay: delay_3 }, { removeOnComplete: true });
                        queuePromises.push(queuePromise);
                        logger_1["default"].info("Registro enviado pra fila de disparo: Campanha=".concat(campaign_1.id, ";Contato=").concat(contacts[i].name, ";delay=").concat(delay_3));
                        // }
                    }
                    return [4 /*yield*/, Promise.all(queuePromises)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 15];
                case 9:
                    err_5 = _b.sent();
                    Sentry.captureException(err_5);
                    logger_1["default"].error("campaignQueue -> ProcessCampaign -> error: ".concat(err_5.message));
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 13, , 14]);
                    if (!id) return [3 /*break*/, 12];
                    return [4 /*yield*/, Campaign_1["default"].update({
                            status: "CANCELADA"
                        }, { where: { id: id } })];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    updateErr_1 = _b.sent();
                    logger_1["default"].error("campaignQueue -> ProcessCampaign -> update error: ".concat(updateErr_1.message));
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function calculateDelay(index, baseDelay, longerIntervalAfter, greaterInterval, messageInterval) {
    var diffSeconds = (0, date_fns_1.differenceInSeconds)(baseDelay, new Date());
    if (index > longerIntervalAfter) {
        return diffSeconds * 1000 + greaterInterval;
    }
    else {
        return diffSeconds * 1000 + messageInterval;
    }
}
function handlePrepareContact(job) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, contactId, campaignId, delay_4, variables, campaign, contact, campaignShipping, messages, radomIndex, message, confirmationMessages, radomIndex, message, alreadySentByNumber, _b, record, created, nextJob, err_6, updateErr_2;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 13, , 19]);
                    _a = job.data, contactId = _a.contactId, campaignId = _a.campaignId, delay_4 = _a.delay, variables = _a.variables;
                    if (!contactId) {
                        logger_1["default"].error("campaignQueue -> PrepareContact -> contactId inv\u00E1lido: ".concat(contactId));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getCampaign(campaignId)];
                case 1:
                    campaign = _f.sent();
                    return [4 /*yield*/, getContact(contactId, false)];
                case 2:
                    contact = _f.sent();
                    if (!!contact) return [3 /*break*/, 4];
                    return [4 /*yield*/, getContact(contactId, true)];
                case 3:
                    contact = _f.sent(); // Contact direto
                    _f.label = 4;
                case 4:
                    if (!contact) {
                        logger_1["default"].warn("campaignQueue -> PrepareContact -> contato n\u00E3o encontrado: id=".concat(contactId));
                        return [2 /*return*/];
                    }
                    campaignShipping = {};
                    campaignShipping.number = contact.number;
                    campaignShipping.contactId = contactId;
                    campaignShipping.campaignId = campaignId;
                    messages = getCampaignValidMessages(campaign);
                    if (messages.length >= 0) {
                        radomIndex = randomValue(0, messages.length);
                        message = getProcessedMessage(messages[radomIndex] || "", variables, contact);
                        campaignShipping.message = message === null ? "" : "\u200C ".concat(message);
                    }
                    if (campaign.confirmation) {
                        confirmationMessages = getCampaignValidConfirmationMessages(campaign);
                        if (confirmationMessages.length) {
                            radomIndex = randomValue(0, confirmationMessages.length);
                            message = getProcessedMessage(confirmationMessages[radomIndex] || "", variables, contact);
                            campaignShipping.confirmationMessage = "\u200C ".concat(message);
                        }
                    }
                    return [4 /*yield*/, CampaignShipping_1["default"].findOne({
                            where: (_c = {
                                    campaignId: campaignShipping.campaignId,
                                    number: campaignShipping.number
                                },
                                _c[sequelize_1.Op.or] = [
                                    { deliveredAt: (_d = {}, _d[sequelize_1.Op.ne] = null, _d) },
                                    { jobId: (_e = {}, _e[sequelize_1.Op.ne] = null, _e) }
                                ],
                                _c)
                        })];
                case 5:
                    alreadySentByNumber = _f.sent();
                    if (alreadySentByNumber) {
                        logger_1["default"].info("campaignQueue -> PrepareContact -> n\u00FAmero ".concat(campaignShipping.number, " j\u00E1 disparado/agendado para campanha ").concat(campaignId, ", pulando duplicata"));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, CampaignShipping_1["default"].findOrCreate({
                            where: {
                                campaignId: campaignShipping.campaignId,
                                contactId: campaignShipping.contactId
                            },
                            defaults: campaignShipping
                        })];
                case 6:
                    _b = _f.sent(), record = _b[0], created = _b[1];
                    if (!(!created &&
                        record.deliveredAt === null &&
                        record.confirmationRequestedAt === null)) return [3 /*break*/, 8];
                    record.set(campaignShipping);
                    return [4 /*yield*/, record.save()];
                case 7:
                    _f.sent();
                    _f.label = 8;
                case 8:
                    if (!(record.deliveredAt === null &&
                        record.confirmationRequestedAt === null &&
                        !record.jobId)) return [3 /*break*/, 11];
                    return [4 /*yield*/, exports.campaignQueue.add("DispatchCampaign", {
                            campaignId: campaign.id,
                            campaignShippingId: record.id,
                            contactListItemId: contactId
                        }, {
                            delay: delay_4
                        })];
                case 9:
                    nextJob = _f.sent();
                    return [4 /*yield*/, record.update({ jobId: String(nextJob.id) })];
                case 10:
                    _f.sent();
                    _f.label = 11;
                case 11: return [4 /*yield*/, verifyAndFinalizeCampaign(campaign)];
                case 12:
                    _f.sent();
                    return [3 /*break*/, 19];
                case 13:
                    err_6 = _f.sent();
                    Sentry.captureException(err_6);
                    logger_1["default"].error("campaignQueue -> PrepareContact -> error: ".concat(err_6.message));
                    _f.label = 14;
                case 14:
                    _f.trys.push([14, 17, , 18]);
                    if (!(contactId && campaignId)) return [3 /*break*/, 16];
                    return [4 /*yield*/, CampaignShipping_1["default"].update({
                            deliveredAt: (0, moment_1["default"])()
                        }, {
                            where: {
                                contactId: contactId,
                                campaignId: campaignId
                            }
                        })];
                case 15:
                    _f.sent();
                    _f.label = 16;
                case 16: return [3 /*break*/, 18];
                case 17:
                    updateErr_2 = _f.sent();
                    logger_1["default"].error("campaignQueue -> PrepareContact -> update error: ".concat(updateErr_2.message));
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    });
}
function handleDispatchOfficialCampaign(campaign, campaignShippingId) {
    return __awaiter(this, void 0, void 0, function () {
        var campaignShipping, isTagCampaign, contactData, item, _a, coexistencePhoneNumberId, coexistencePermanentToken, phone, client, fakeContact, message, filePath, filename, mimeType, fakeFile, err_7, io;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, CampaignShipping_1["default"].findByPk(campaignShippingId)];
                case 1:
                    campaignShipping = _b.sent();
                    if (!campaignShipping) {
                        logger_1["default"].error("[OfficialCampaign] CampaignShipping ".concat(campaignShippingId, " n\u00E3o encontrado"));
                        return [2 /*return*/];
                    }
                    isTagCampaign = !!campaign.tagListId;
                    if (!isTagCampaign) return [3 /*break*/, 3];
                    return [4 /*yield*/, Contact_1["default"].findByPk(campaignShipping.contactId, {
                            attributes: ["id", "name", "number", "email"]
                        })];
                case 2:
                    contactData = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ContactListItem_1["default"].findByPk(campaignShipping.contactId)];
                case 4:
                    item = _b.sent();
                    if (item) {
                        contactData = { id: item.id, name: item.name, number: item.number, email: item.email };
                    }
                    _b.label = 5;
                case 5:
                    if (!contactData) {
                        logger_1["default"].error("[OfficialCampaign] Contato n\u00E3o encontrado para campaignShipping=".concat(campaignShippingId));
                        return [2 /*return*/];
                    }
                    _a = campaign.whatsapp, coexistencePhoneNumberId = _a.coexistencePhoneNumberId, coexistencePermanentToken = _a.coexistencePermanentToken;
                    if (!coexistencePhoneNumberId || !coexistencePermanentToken) {
                        logger_1["default"].error("[OfficialCampaign] Conex\u00E3o oficial sem phoneNumberId/token: whatsappId=".concat(campaign.whatsappId));
                        return [2 /*return*/];
                    }
                    phone = campaignShipping.number || contactData.number;
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 17, , 18]);
                    if (!campaign.templateName) return [3 /*break*/, 8];
                    client = (0, graphApiHelper_1.buildGraphClient)(coexistencePermanentToken);
                    return [4 /*yield*/, client.post("".concat(coexistencePhoneNumberId, "/messages"), {
                            messaging_product: "whatsapp",
                            to: phone,
                            type: "template",
                            template: {
                                name: campaign.templateName,
                                language: { code: campaign.templateLanguage || "pt_BR" },
                                components: campaign.templateParams || []
                            }
                        })];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 8:
                    fakeContact = { id: contactData.id, number: phone, companyId: campaign.companyId };
                    message = campaignShipping.message || "";
                    if (!campaign.mediaPath) return [3 /*break*/, 13];
                    filePath = path_1["default"].resolve(process.cwd(), "public", "company".concat(campaign.companyId), campaign.mediaPath);
                    if (!fs_1["default"].existsSync(filePath)) return [3 /*break*/, 10];
                    filename = path_1["default"].basename(filePath);
                    mimeType = (mime_types_1["default"].lookup(filename) || "application/octet-stream");
                    fakeFile = {
                        fieldname: "medias",
                        originalname: campaign.mediaName || filename,
                        encoding: "7bit",
                        mimetype: mimeType,
                        destination: path_1["default"].dirname(filePath),
                        filename: filename,
                        path: filePath,
                        size: fs_1["default"].statSync(filePath).size,
                        buffer: null,
                        stream: null
                    };
                    return [4 /*yield*/, (0, SendMediaOfficialService_1.SendMediaOfficialService)({
                            media: fakeFile,
                            body: message,
                            ticketId: 0,
                            contact: fakeContact,
                            connection: campaign.whatsapp,
                            passVerification: true
                        })];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 10:
                    logger_1["default"].warn("[OfficialCampaign] Arquivo n\u00E3o encontrado: ".concat(filePath, ", enviando s\u00F3 texto"));
                    return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({ body: message, ticketId: 0, contact: fakeContact, connection: campaign.whatsapp })];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12: return [3 /*break*/, 15];
                case 13: return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({ body: message, ticketId: 0, contact: fakeContact, connection: campaign.whatsapp })];
                case 14:
                    _b.sent();
                    _b.label = 15;
                case 15: return [4 /*yield*/, campaignShipping.update({ deliveredAt: (0, moment_1["default"])() })];
                case 16:
                    _b.sent();
                    logger_1["default"].info("[OfficialCampaign] Enviado para ".concat(phone, " | campanha=").concat(campaign.id));
                    return [3 /*break*/, 18];
                case 17:
                    err_7 = _b.sent();
                    logger_1["default"].error("[OfficialCampaign] Erro ao enviar para ".concat(phone, ": ").concat(err_7.message));
                    throw err_7;
                case 18: return [4 /*yield*/, verifyAndFinalizeCampaign(campaign)];
                case 19:
                    _b.sent();
                    io = (0, socket_1.getIO)();
                    io.of(String(campaign.companyId))
                        .emit("company-".concat(campaign.companyId, "-campaign"), {
                        action: "update",
                        record: campaign
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function handleDispatchEmailCampaign(campaign, campaignShippingId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var campaignShipping, contactEmail, emailAccount, transporter, contactName, bodyHtml;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, CampaignShipping_1["default"].findByPk(campaignShippingId, {
                        include: [{ model: Contact_1["default"], as: "contact", attributes: ["id", "name", "email"] }]
                    })];
                case 1:
                    campaignShipping = _c.sent();
                    if (!campaignShipping) {
                        logger_1["default"].error("campaignQueue -> DispatchEmailCampaign -> campaignShipping ".concat(campaignShippingId, " not found"));
                        return [2 /*return*/];
                    }
                    contactEmail = ((_a = campaignShipping.contact) === null || _a === void 0 ? void 0 : _a.email) || campaignShipping.email;
                    if (!!contactEmail) return [3 /*break*/, 3];
                    logger_1["default"].warn("campaignQueue -> DispatchEmailCampaign -> sem email para shipping ".concat(campaignShippingId));
                    return [4 /*yield*/, campaignShipping.update({ deliveredAt: new Date() })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, EmailAccount_1["default"].findByPk(campaign.emailAccountId)];
                case 4:
                    emailAccount = _c.sent();
                    if (!emailAccount) {
                        logger_1["default"].error("campaignQueue -> DispatchEmailCampaign -> emailAccount ".concat(campaign.emailAccountId, " not found"));
                        return [2 /*return*/];
                    }
                    transporter = nodemailer_1["default"].createTransport({
                        host: emailAccount.smtpHost,
                        port: emailAccount.smtpPort,
                        secure: emailAccount.smtpSecure,
                        auth: { user: emailAccount.email, pass: emailAccount.password }
                    });
                    contactName = ((_b = campaignShipping.contact) === null || _b === void 0 ? void 0 : _b.name) || "Cliente";
                    bodyHtml = (campaign.message1 || "")
                        .replace(/\{nome\}/gi, contactName)
                        .replace(/\{name\}/gi, contactName);
                    return [4 /*yield*/, transporter.sendMail({
                            from: "\"".concat(emailAccount.name, "\" <").concat(emailAccount.email, ">"),
                            to: contactEmail,
                            subject: campaign.subject || campaign.name,
                            html: bodyHtml,
                            text: bodyHtml.replace(/<[^>]+>/g, "")
                        })];
                case 5:
                    _c.sent();
                    logger_1["default"].info("campaignQueue -> DispatchEmailCampaign -> enviado para ".concat(contactEmail, " (shipping ").concat(campaignShippingId, ")"));
                    return [4 /*yield*/, campaignShipping.update({ deliveredAt: new Date() })];
                case 6:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleDispatchCampaign(job) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var data, campaignShippingId, campaignId, campaign, wbot, campaignShipping, contactData, item, contact, chatId, contact, whatsapp, ticket, confirmationMessage, sentMessage, publicFolder, filePath, options, audioMessage, sentMessage, publicFolder, filePath, options, io, err_8, updateErr_3;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 54, , 60]);
                    data = job.data;
                    campaignShippingId = data.campaignShippingId, campaignId = data.campaignId;
                    return [4 /*yield*/, getCampaign(campaignId)];
                case 1:
                    campaign = _e.sent();
                    logger_1["default"].info("[CAROUSEL DEBUG] Campanha ".concat(campaignId, " templateData: ").concat((_a = JSON.stringify(campaign.templateData)) === null || _a === void 0 ? void 0 : _a.substring(0, 200)));
                    if (!(campaign.channel === "email")) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleDispatchEmailCampaign(campaign, campaignShippingId)];
                case 2:
                    _e.sent();
                    return [2 /*return*/];
                case 3:
                    if (!campaign.whatsapp) {
                        logger_1["default"].error("campaignQueue -> DispatchCampaign -> error: whatsapp not found");
                        return [2 /*return*/];
                    }
                    if (!(campaign.channel === "whatsapp_official")) return [3 /*break*/, 5];
                    return [4 /*yield*/, handleDispatchOfficialCampaign(campaign, campaignShippingId)];
                case 4:
                    _e.sent();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, (0, GetWhatsappWbot_1["default"])(campaign.whatsapp)];
                case 6:
                    wbot = _e.sent();
                    if (!wbot) {
                        logger_1["default"].error("campaignQueue -> DispatchCampaign -> error: wbot not found");
                        return [2 /*return*/];
                    }
                    if (!((_b = wbot === null || wbot === void 0 ? void 0 : wbot.user) === null || _b === void 0 ? void 0 : _b.id)) {
                        logger_1["default"].error("campaignQueue -> DispatchCampaign -> error: wbot user not found");
                        return [2 /*return*/];
                    }
                    logger_1["default"].info("Disparo de campanha solicitado: Campanha=".concat(campaignId, ";Registro=").concat(campaignShippingId));
                    return [4 /*yield*/, CampaignShipping_1["default"].findByPk(campaignShippingId)];
                case 7:
                    campaignShipping = _e.sent();
                    if (!campaignShipping) {
                        logger_1["default"].error("campaignQueue -> DispatchCampaign -> error: campaignShipping ".concat(campaignShippingId, " not found"));
                        return [2 /*return*/];
                    }
                    contactData = void 0;
                    return [4 /*yield*/, ContactListItem_1["default"].findByPk(campaignShipping.contactId)];
                case 8:
                    item = _e.sent();
                    if (item) {
                        contactData = { id: item.id, name: item.name, number: item.number, email: item.email, isGroup: item.isGroup };
                    }
                    if (!!contactData) return [3 /*break*/, 10];
                    return [4 /*yield*/, Contact_1["default"].findByPk(campaignShipping.contactId, {
                            attributes: ["id", "name", "number", "email", "isGroup"]
                        })];
                case 9:
                    contact = _e.sent();
                    if (contact)
                        contactData = contact;
                    _e.label = 10;
                case 10:
                    if (!contactData) {
                        logger_1["default"].error("campaignQueue -> DispatchCampaign -> error: contact not found for contactId=".concat(campaignShipping.contactId));
                        return [2 /*return*/];
                    }
                    chatId = contactData.isGroup ? "".concat(campaignShipping.number, "@g.us") : "".concat(campaignShipping.number, "@s.whatsapp.net");
                    if (!(campaign.openTicket === "enabled")) return [3 /*break*/, 38];
                    return [4 /*yield*/, Contact_1["default"].findOrCreate({
                            where: {
                                number: campaignShipping.number,
                                companyId: campaign.companyId
                            },
                            defaults: {
                                companyId: campaign.companyId,
                                name: contactData.name,
                                number: campaignShipping.number,
                                email: contactData.email,
                                whatsappId: campaign.whatsappId,
                                profilePicUrl: ""
                            }
                        })];
                case 11:
                    contact = (_e.sent())[0];
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(campaign.whatsappId)];
                case 12:
                    whatsapp = _e.sent();
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: contact.id,
                                companyId: campaign.companyId,
                                whatsappId: whatsapp.id,
                                status: ["open", "pending"]
                            }
                        })];
                case 13:
                    ticket = _e.sent();
                    if (!!ticket) return [3 /*break*/, 16];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: contact.id,
                                companyId: campaign.companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["updatedAt", "DESC"]]
                        })];
                case 14:
                    ticket = _e.sent();
                    if (!ticket) return [3 /*break*/, 16];
                    return [4 /*yield*/, ticket.update({
                            queueId: campaign === null || campaign === void 0 ? void 0 : campaign.queueId,
                            userId: campaign === null || campaign === void 0 ? void 0 : campaign.userId,
                            status: campaign === null || campaign === void 0 ? void 0 : campaign.statusTicket
                        })];
                case 15:
                    _e.sent();
                    _e.label = 16;
                case 16:
                    if (!!ticket) return [3 /*break*/, 18];
                    return [4 /*yield*/, Ticket_1["default"].create({
                            companyId: campaign.companyId,
                            contactId: contact.id,
                            whatsappId: whatsapp.id,
                            queueId: campaign === null || campaign === void 0 ? void 0 : campaign.queueId,
                            userId: campaign === null || campaign === void 0 ? void 0 : campaign.userId,
                            status: campaign === null || campaign === void 0 ? void 0 : campaign.statusTicket
                        })];
                case 17:
                    ticket = _e.sent();
                    _e.label = 18;
                case 18: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, campaign.companyId)];
                case 19:
                    ticket = _e.sent();
                    if (!(whatsapp.status === "CONNECTED")) return [3 /*break*/, 37];
                    if (!(campaign.confirmation && campaignShipping.confirmation === null)) return [3 /*break*/, 23];
                    return [4 /*yield*/, wbot.sendMessage(chatId, {
                            text: "\u200C ".concat(campaignShipping.confirmationMessage)
                        })];
                case 20:
                    confirmationMessage = _e.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(confirmationMessage, ticket, contact, null, true, false)];
                case 21:
                    _e.sent();
                    return [4 /*yield*/, campaignShipping.update({ confirmationRequestedAt: (0, moment_1["default"])() })];
                case 22:
                    _e.sent();
                    return [3 /*break*/, 35];
                case 23:
                    if (!((_c = campaign.templateData) === null || _c === void 0 ? void 0 : _c.length)) return [3 /*break*/, 25];
                    return [4 /*yield*/, sendCampaignTemplateBlocks(wbot, chatId, campaign, campaignShipping.message, ticket, contact)];
                case 24:
                    _e.sent();
                    return [3 /*break*/, 35];
                case 25:
                    if (!!campaign.mediaPath) return [3 /*break*/, 28];
                    return [4 /*yield*/, wbot.sendMessage(chatId, {
                            text: "\u200C ".concat(campaignShipping.message)
                        })];
                case 26:
                    sentMessage = _e.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contact, null, true, false)];
                case 27:
                    _e.sent();
                    return [3 /*break*/, 35];
                case 28:
                    publicFolder = path_1["default"].resolve(__dirname, "..", "public");
                    filePath = path_1["default"].join(publicFolder, "company".concat(campaign.companyId), campaign.mediaPath);
                    return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(campaign.mediaName, filePath, String(campaign.companyId), "\u200C ".concat(campaignShipping.message))];
                case 29:
                    options = _e.sent();
                    if (!Object.keys(options).length) return [3 /*break*/, 35];
                    if (!(options.mimetype === "audio/mp4")) return [3 /*break*/, 32];
                    return [4 /*yield*/, wbot.sendMessage(chatId, {
                            text: "\u200C ".concat(campaignShipping.message)
                        })];
                case 30:
                    audioMessage = _e.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(audioMessage, ticket, contact, null, true, false)];
                case 31:
                    _e.sent();
                    _e.label = 32;
                case 32: return [4 /*yield*/, wbot.sendMessage(chatId, __assign({}, options))];
                case 33:
                    sentMessage = _e.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMediaMessage)(sentMessage, ticket, ticket.contact, null, false, true, wbot)];
                case 34:
                    _e.sent();
                    _e.label = 35;
                case 35: return [4 /*yield*/, campaignShipping.update({ deliveredAt: (0, moment_1["default"])() })];
                case 36:
                    _e.sent();
                    _e.label = 37;
                case 37: return [3 /*break*/, 52];
                case 38:
                    if (!(campaign.confirmation && campaignShipping.confirmation === null)) return [3 /*break*/, 41];
                    return [4 /*yield*/, wbot.sendMessage(chatId, {
                            text: campaignShipping.confirmationMessage
                        })];
                case 39:
                    _e.sent();
                    return [4 /*yield*/, campaignShipping.update({ confirmationRequestedAt: (0, moment_1["default"])() })];
                case 40:
                    _e.sent();
                    return [3 /*break*/, 50];
                case 41:
                    if (!((_d = campaign.templateData) === null || _d === void 0 ? void 0 : _d.length)) return [3 /*break*/, 43];
                    return [4 /*yield*/, sendCampaignTemplateBlocks(wbot, chatId, campaign, campaignShipping.message, undefined, contactData)];
                case 42:
                    _e.sent();
                    return [3 /*break*/, 50];
                case 43:
                    if (!!campaign.mediaPath) return [3 /*break*/, 45];
                    return [4 /*yield*/, wbot.sendMessage(chatId, {
                            text: campaignShipping.message
                        })];
                case 44:
                    _e.sent();
                    return [3 /*break*/, 50];
                case 45:
                    publicFolder = path_1["default"].resolve(__dirname, "..", "public");
                    filePath = path_1["default"].join(publicFolder, "company".concat(campaign.companyId), campaign.mediaPath);
                    return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(campaign.mediaName, filePath, String(campaign.companyId), campaignShipping.message)];
                case 46:
                    options = _e.sent();
                    if (!Object.keys(options).length) return [3 /*break*/, 50];
                    if (!(options.mimetype === "audio/mp4")) return [3 /*break*/, 48];
                    return [4 /*yield*/, wbot.sendMessage(chatId, {
                            text: campaignShipping.message
                        })];
                case 47:
                    _e.sent();
                    _e.label = 48;
                case 48: return [4 /*yield*/, wbot.sendMessage(chatId, __assign({}, options))];
                case 49:
                    _e.sent();
                    _e.label = 50;
                case 50: return [4 /*yield*/, campaignShipping.update({ deliveredAt: (0, moment_1["default"])() })];
                case 51:
                    _e.sent();
                    _e.label = 52;
                case 52: return [4 /*yield*/, verifyAndFinalizeCampaign(campaign)];
                case 53:
                    _e.sent();
                    io = (0, socket_1.getIO)();
                    io.of(String(campaign.companyId))
                        .emit("company-".concat(campaign.companyId, "-campaign"), {
                        action: "update",
                        record: campaign
                    });
                    logger_1["default"].info("Campanha enviada para: Campanha=".concat(campaignId, ";Contato=").concat(contactData.name));
                    return [3 /*break*/, 60];
                case 54:
                    err_8 = _e.sent();
                    Sentry.captureException(err_8);
                    logger_1["default"].error("campaignQueue -> DispatchCampaign -> error: ".concat(err_8.message));
                    console.log(err_8.stack);
                    _e.label = 55;
                case 55:
                    _e.trys.push([55, 58, , 59]);
                    if (!campaignShippingId) return [3 /*break*/, 57];
                    return [4 /*yield*/, CampaignShipping_1["default"].update({
                            deliveredAt: (0, moment_1["default"])()
                        }, { where: { id: campaignShippingId } })];
                case 56:
                    _e.sent();
                    _e.label = 57;
                case 57: return [3 /*break*/, 59];
                case 58:
                    updateErr_3 = _e.sent();
                    logger_1["default"].error("campaignQueue -> DispatchCampaign -> update error: ".concat(updateErr_3.message));
                    return [3 /*break*/, 59];
                case 59: return [3 /*break*/, 60];
                case 60: return [2 /*return*/];
            }
        });
    });
}
function handleLoginStatus(job) {
    return __awaiter(this, void 0, void 0, function () {
        var thresholdTime;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    thresholdTime = new Date();
                    thresholdTime.setMinutes(thresholdTime.getMinutes() - 5);
                    return [4 /*yield*/, User_1["default"].update({ online: false }, {
                            where: {
                                updatedAt: (_a = {}, _a[sequelize_1.Op.lt] = thresholdTime, _a),
                                online: true
                            }
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleResumeTicketsOutOfHour(job) {
    return __awaiter(this, void 0, void 0, function () {
        var companies, e_5;
        var _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Company_1["default"].findAll({
                            attributes: ['id', 'name'],
                            where: {
                                status: true
                            },
                            include: [
                                {
                                    model: Whatsapp_1["default"],
                                    attributes: ["id", "name", "status", "timeSendQueue", "sendIdQueue"],
                                    where: {
                                        timeSendQueue: (_a = {}, _a[sequelize_1.Op.gt] = 0, _a)
                                    }
                                },
                            ]
                        })];
                case 1:
                    companies = _b.sent();
                    companies.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            c.whatsapps.map(function (w) { return __awaiter(_this, void 0, void 0, function () {
                                var companyId, moveQueue, moveQueueId, moveQueueTime, idQueue_1, timeQueue, tempoPassado, _a, count, tickets;
                                var _b;
                                var _this = this;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            if (!(w.status === "CONNECTED")) return [3 /*break*/, 3];
                                            companyId = c.id;
                                            moveQueue = w.timeSendQueue ? w.timeSendQueue : 0;
                                            moveQueueId = w.sendIdQueue;
                                            moveQueueTime = moveQueue;
                                            idQueue_1 = moveQueueId;
                                            timeQueue = moveQueueTime;
                                            if (!(moveQueue > 0)) return [3 /*break*/, 3];
                                            if (!(!isNaN(idQueue_1) && Number.isInteger(idQueue_1) && !isNaN(timeQueue) && Number.isInteger(timeQueue))) return [3 /*break*/, 2];
                                            tempoPassado = (0, moment_1["default"])().subtract(timeQueue, "minutes").utc().format();
                                            return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                                    attributes: ["id"],
                                                    where: {
                                                        status: "pending",
                                                        queueId: null,
                                                        companyId: companyId,
                                                        whatsappId: w.id,
                                                        updatedAt: (_b = {},
                                                            _b[sequelize_1.Op.lt] = tempoPassado,
                                                            _b)
                                                    },
                                                    include: [
                                                        {
                                                            model: Contact_1["default"],
                                                            as: "contact",
                                                            attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "disableBot", "urlPicture", "lgpdAcceptedAt", "companyId"],
                                                            include: ["extraInfo", "tags"]
                                                        },
                                                        {
                                                            model: Queue_1["default"],
                                                            as: "queue",
                                                            attributes: ["id", "name", "color"]
                                                        },
                                                        {
                                                            model: Whatsapp_1["default"],
                                                            as: "whatsapp",
                                                            attributes: ["id", "name", "expiresTicket", "groupAsTicket"]
                                                        }
                                                    ]
                                                })];
                                        case 1:
                                            _a = _c.sent(), count = _a.count, tickets = _a.rows;
                                            if (count > 0) {
                                                tickets.map(function (ticket) { return __awaiter(_this, void 0, void 0, function () {
                                                    var io;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, ticket.update({
                                                                    queueId: idQueue_1
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [4 /*yield*/, ticket.reload()];
                                                            case 2:
                                                                _a.sent();
                                                                io = (0, socket_1.getIO)();
                                                                io.of(String(companyId))
                                                                    // .to("notification")
                                                                    // .to(ticket.id.toString())
                                                                    .emit("company-".concat(companyId, "-ticket"), {
                                                                    action: "update",
                                                                    ticket: ticket,
                                                                    ticketId: ticket.id
                                                                });
                                                                // io.to("pending").emit(`company-${companyId}-ticket`, {
                                                                //   action: "update",
                                                                //   ticket,
                                                                // });
                                                                logger_1["default"].info("Atendimento Perdido: ".concat(ticket.id, " - Empresa: ").concat(companyId));
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            logger_1["default"].info("Condi\u00E7\u00E3o n\u00E3o respeitada - Empresa: ".concat(companyId));
                                            _c.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _b.sent();
                    Sentry.captureException(e_5);
                    logger_1["default"].error("SearchForQueue -> VerifyQueue: error", e_5.message);
                    throw e_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
function handleVerifyQueue(job) {
    return __awaiter(this, void 0, void 0, function () {
        var companies, e_6;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Company_1["default"].findAll({
                            attributes: ['id', 'name'],
                            where: {
                                status: true
                            },
                            include: [
                                {
                                    model: Whatsapp_1["default"],
                                    attributes: ["id", "name", "status", "timeSendQueue", "sendIdQueue"]
                                },
                            ]
                        })];
                case 1:
                    companies = _a.sent();
                    companies.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            c.whatsapps.map(function (w) { return __awaiter(_this, void 0, void 0, function () {
                                var companyId, moveQueue, moveQueueId, moveQueueTime, idQueue_2, timeQueue, tempoPassado, _a, count, tickets;
                                var _b;
                                var _this = this;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            if (!(w.status === "CONNECTED")) return [3 /*break*/, 3];
                                            companyId = c.id;
                                            moveQueue = w.timeSendQueue ? w.timeSendQueue : 0;
                                            moveQueueId = w.sendIdQueue;
                                            moveQueueTime = moveQueue;
                                            idQueue_2 = moveQueueId;
                                            timeQueue = moveQueueTime;
                                            if (!(moveQueue > 0)) return [3 /*break*/, 3];
                                            if (!(!isNaN(idQueue_2) && Number.isInteger(idQueue_2) && !isNaN(timeQueue) && Number.isInteger(timeQueue))) return [3 /*break*/, 2];
                                            tempoPassado = (0, moment_1["default"])().subtract(timeQueue, "minutes").utc().format();
                                            return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                                    attributes: ["id"],
                                                    where: {
                                                        status: "pending",
                                                        queueId: null,
                                                        companyId: companyId,
                                                        whatsappId: w.id,
                                                        updatedAt: (_b = {},
                                                            _b[sequelize_1.Op.lt] = tempoPassado,
                                                            _b)
                                                    },
                                                    include: [
                                                        {
                                                            model: Contact_1["default"],
                                                            as: "contact",
                                                            attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "disableBot", "urlPicture", "lgpdAcceptedAt", "companyId"],
                                                            include: ["extraInfo", "tags"]
                                                        },
                                                        {
                                                            model: Queue_1["default"],
                                                            as: "queue",
                                                            attributes: ["id", "name", "color"]
                                                        },
                                                        {
                                                            model: Whatsapp_1["default"],
                                                            as: "whatsapp",
                                                            attributes: ["id", "name", "expiresTicket", "groupAsTicket"]
                                                        }
                                                    ]
                                                })];
                                        case 1:
                                            _a = _c.sent(), count = _a.count, tickets = _a.rows;
                                            if (count > 0) {
                                                tickets.map(function (ticket) { return __awaiter(_this, void 0, void 0, function () {
                                                    var io;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, ticket.update({
                                                                    queueId: idQueue_2
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                                                        userId: null,
                                                                        queueId: idQueue_2,
                                                                        ticketId: ticket.id,
                                                                        type: "redirect"
                                                                    })];
                                                            case 2:
                                                                _a.sent();
                                                                return [4 /*yield*/, ticket.reload()];
                                                            case 3:
                                                                _a.sent();
                                                                io = (0, socket_1.getIO)();
                                                                io.of(String(companyId))
                                                                    // .to("notification")
                                                                    // .to(ticket.id.toString())
                                                                    .emit("company-".concat(companyId, "-ticket"), {
                                                                    action: "update",
                                                                    ticket: ticket,
                                                                    ticketId: ticket.id
                                                                });
                                                                // io.to("pending").emit(`company-${companyId}-ticket`, {
                                                                //   action: "update",
                                                                //   ticket,
                                                                // });
                                                                logger_1["default"].info("Atendimento Perdido: ".concat(ticket.id, " - Empresa: ").concat(companyId));
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            logger_1["default"].info("Condi\u00E7\u00E3o n\u00E3o respeitada - Empresa: ".concat(companyId));
                                            _c.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    Sentry.captureException(e_6);
                    logger_1["default"].error("SearchForQueue -> VerifyQueue: error", e_6.message);
                    throw e_6;
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
function handleRandomUser() {
    return __awaiter(this, void 0, void 0, function () {
        var jobR;
        var _this = this;
        return __generator(this, function (_a) {
            jobR = new CronJob('0 */2 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var companies, e_7;
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Company_1["default"].findAll({
                                    attributes: ['id', 'name'],
                                    where: {
                                        status: true
                                    },
                                    include: [
                                        {
                                            model: Queue_2["default"],
                                            attributes: ["id", "name", "ativarRoteador", "tempoRoteador"],
                                            where: {
                                                ativarRoteador: true,
                                                tempoRoteador: (_a = {},
                                                    _a[sequelize_1.Op.ne] = 0,
                                                    _a)
                                            }
                                        },
                                    ]
                                })];
                        case 1:
                            companies = _b.sent();
                            if (companies) {
                                companies.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        c.queues.map(function (q) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, count, tickets, getRandomUserId, findUserById, _loop_1, _i, tickets_1, ticket;
                                            var _this = this;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                                            where: {
                                                                companyId: c.id,
                                                                status: "pending",
                                                                queueId: q.id
                                                            }
                                                        })];
                                                    case 1:
                                                        _a = _b.sent(), count = _a.count, tickets = _a.rows;
                                                        getRandomUserId = function (userIds) {
                                                            var randomIndex = Math.floor(Math.random() * userIds.length);
                                                            return userIds[randomIndex];
                                                        };
                                                        findUserById = function (userId, companyId) { return __awaiter(_this, void 0, void 0, function () {
                                                            var user, errorV_1;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        _a.trys.push([0, 2, , 3]);
                                                                        return [4 /*yield*/, User_1["default"].findOne({
                                                                                where: {
                                                                                    id: userId,
                                                                                    companyId: companyId
                                                                                }
                                                                            })];
                                                                    case 1:
                                                                        user = _a.sent();
                                                                        if (user && (user === null || user === void 0 ? void 0 : user.profile) === "user") {
                                                                            if (user.online === true) {
                                                                                return [2 /*return*/, user.id];
                                                                            }
                                                                            else {
                                                                                // logger.info("USER OFFLINE");
                                                                                return [2 /*return*/, 0];
                                                                            }
                                                                        }
                                                                        else {
                                                                            // logger.info("ADMIN");
                                                                            return [2 /*return*/, 0];
                                                                        }
                                                                        return [3 /*break*/, 3];
                                                                    case 2:
                                                                        errorV_1 = _a.sent();
                                                                        Sentry.captureException(errorV_1);
                                                                        logger_1["default"].error("SearchForUsersRandom -> VerifyUsersRandom: error", errorV_1.message);
                                                                        throw errorV_1;
                                                                    case 3: return [2 /*return*/];
                                                                }
                                                            });
                                                        }); };
                                                        if (!(count > 0)) return [3 /*break*/, 5];
                                                        _loop_1 = function (ticket) {
                                                            var queueId, userId, tempoRoteador, userQueues, contact, userIds, tempoPassadoB, updatedAtV, settings, sendGreetingMessageOneQueues, randomUserId, _c, ticketToSend, availableUserIds, randomUserId, _d, ticketToSend;
                                                            return __generator(this, function (_e) {
                                                                switch (_e.label) {
                                                                    case 0:
                                                                        queueId = ticket.queueId, userId = ticket.userId;
                                                                        tempoRoteador = q.tempoRoteador;
                                                                        return [4 /*yield*/, UserQueue_1["default"].findAll({
                                                                                where: {
                                                                                    queueId: queueId
                                                                                }
                                                                            })];
                                                                    case 1:
                                                                        userQueues = _e.sent();
                                                                        return [4 /*yield*/, (0, ShowContactService_1["default"])(ticket.contactId, ticket.companyId)];
                                                                    case 2:
                                                                        contact = _e.sent();
                                                                        userIds = userQueues.map(function (userQueue) { return userQueue.userId; });
                                                                        tempoPassadoB = (0, moment_1["default"])().subtract(tempoRoteador, "minutes").utc().toDate();
                                                                        updatedAtV = new Date(ticket.updatedAt);
                                                                        return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                                                                                where: {
                                                                                    companyId: ticket.companyId
                                                                                }
                                                                            })];
                                                                    case 3:
                                                                        settings = _e.sent();
                                                                        sendGreetingMessageOneQueues = settings.sendGreetingMessageOneQueues === "enabled" || false;
                                                                        if (!!userId) return [3 /*break*/, 11];
                                                                        randomUserId = getRandomUserId(userIds);
                                                                        _c = randomUserId !== undefined;
                                                                        if (!_c) return [3 /*break*/, 5];
                                                                        return [4 /*yield*/, findUserById(randomUserId, ticket.companyId)];
                                                                    case 4:
                                                                        _c = (_e.sent()) > 0;
                                                                        _e.label = 5;
                                                                    case 5:
                                                                        if (!_c) return [3 /*break*/, 10];
                                                                        if (!sendGreetingMessageOneQueues) return [3 /*break*/, 8];
                                                                        return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, ticket.companyId)];
                                                                    case 6:
                                                                        ticketToSend = _e.sent();
                                                                        return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: "\u200E *Assistente Virtual*:\nAguarde enquanto localizamos um atendente... Voc\u00EA ser\u00E1 atendido em breve!", ticket: ticketToSend })];
                                                                    case 7:
                                                                        _e.sent();
                                                                        _e.label = 8;
                                                                    case 8: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                                                            ticketData: { status: "pending", userId: randomUserId },
                                                                            ticketId: ticket.id,
                                                                            companyId: ticket.companyId
                                                                        })];
                                                                    case 9:
                                                                        _e.sent();
                                                                        //await ticket.reload();
                                                                        logger_1["default"].info("Ticket ID ".concat(ticket.id, " atualizado para UserId ").concat(randomUserId, " - ").concat(ticket.updatedAt));
                                                                        return [3 /*break*/, 10];
                                                                    case 10: return [3 /*break*/, 18];
                                                                    case 11:
                                                                        if (!userIds.includes(userId)) return [3 /*break*/, 18];
                                                                        if (!(tempoPassadoB > updatedAtV)) return [3 /*break*/, 18];
                                                                        availableUserIds = userIds.filter(function (id) { return id !== userId; });
                                                                        if (!(availableUserIds.length > 0)) return [3 /*break*/, 18];
                                                                        randomUserId = getRandomUserId(availableUserIds);
                                                                        _d = randomUserId !== undefined;
                                                                        if (!_d) return [3 /*break*/, 13];
                                                                        return [4 /*yield*/, findUserById(randomUserId, ticket.companyId)];
                                                                    case 12:
                                                                        _d = (_e.sent()) > 0;
                                                                        _e.label = 13;
                                                                    case 13:
                                                                        if (!_d) return [3 /*break*/, 18];
                                                                        if (!sendGreetingMessageOneQueues) return [3 /*break*/, 16];
                                                                        return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, ticket.companyId)];
                                                                    case 14:
                                                                        ticketToSend = _e.sent();
                                                                        return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: "*Assistente Virtual*:\nAguarde enquanto localizamos um atendente... Você será atendido em breve!", ticket: ticketToSend })];
                                                                    case 15:
                                                                        _e.sent();
                                                                        _e.label = 16;
                                                                    case 16:
                                                                        ;
                                                                        return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                                                                ticketData: { status: "pending", userId: randomUserId },
                                                                                ticketId: ticket.id,
                                                                                companyId: ticket.companyId
                                                                            })];
                                                                    case 17:
                                                                        _e.sent();
                                                                        logger_1["default"].info("Ticket ID ".concat(ticket.id, " atualizado para UserId ").concat(randomUserId, " - ").concat(ticket.updatedAt));
                                                                        return [3 /*break*/, 18];
                                                                    case 18: return [2 /*return*/];
                                                                }
                                                            });
                                                        };
                                                        _i = 0, tickets_1 = tickets;
                                                        _b.label = 2;
                                                    case 2:
                                                        if (!(_i < tickets_1.length)) return [3 /*break*/, 5];
                                                        ticket = tickets_1[_i];
                                                        return [5 /*yield**/, _loop_1(ticket)];
                                                    case 3:
                                                        _b.sent();
                                                        _b.label = 4;
                                                    case 4:
                                                        _i++;
                                                        return [3 /*break*/, 2];
                                                    case 5: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_7 = _b.sent();
                            Sentry.captureException(e_7);
                            logger_1["default"].error("SearchForUsersRandom -> VerifyUsersRandom: error", e_7.message);
                            throw e_7;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            jobR.start();
            return [2 /*return*/];
        });
    });
}
function handleProcessLanes() {
    return __awaiter(this, void 0, void 0, function () {
        var job;
        var _this = this;
        return __generator(this, function (_a) {
            job = new CronJob('*/1 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var companies;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Company_1["default"].findAll({
                                include: [
                                    {
                                        model: Plan_1["default"],
                                        as: "plan",
                                        attributes: ["id", "name", "useKanban"],
                                        where: {
                                            useKanban: true
                                        }
                                    },
                                ]
                            })];
                        case 1:
                            companies = _a.sent();
                            companies.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                var companyId_1, ticketTags, e_8;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            companyId_1 = c.id;
                                            return [4 /*yield*/, TicketTag_1["default"].findAll({
                                                    include: [{
                                                            model: Ticket_1["default"],
                                                            as: "ticket",
                                                            where: {
                                                                status: "open",
                                                                fromMe: true,
                                                                companyId: companyId_1
                                                            },
                                                            attributes: ["id", "contactId", "updatedAt", "whatsappId"]
                                                        }, {
                                                            model: Tag_1["default"],
                                                            as: "tag",
                                                            attributes: ["id", "timeLane", "nextLaneId", "greetingMessageLane"],
                                                            where: {
                                                                companyId: companyId_1
                                                            }
                                                        }]
                                                })];
                                        case 1:
                                            ticketTags = _a.sent();
                                            if (ticketTags.length > 0) {
                                                ticketTags.map(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                                    var nextTag, dataLimite, dataUltimaInteracaoChamado, whatsapp, bodyMessage, contact, ticketUpdate;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(!(0, lodash_1.isNil)(t === null || t === void 0 ? void 0 : t.tag.nextLaneId) && (t === null || t === void 0 ? void 0 : t.tag.nextLaneId) > 0 && (t === null || t === void 0 ? void 0 : t.tag.timeLane) > 0)) return [3 /*break*/, 8];
                                                                return [4 /*yield*/, Tag_1["default"].findByPk(t === null || t === void 0 ? void 0 : t.tag.nextLaneId)];
                                                            case 1:
                                                                nextTag = _a.sent();
                                                                dataLimite = new Date();
                                                                dataLimite.setHours(dataLimite.getHours() - Number(t.tag.timeLane));
                                                                dataUltimaInteracaoChamado = new Date(t.ticket.updatedAt);
                                                                if (!(dataUltimaInteracaoChamado < dataLimite)) return [3 /*break*/, 8];
                                                                return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: t.ticketId, tagId: t.tagId } })];
                                                            case 2:
                                                                _a.sent();
                                                                return [4 /*yield*/, TicketTag_1["default"].create({ ticketId: t.ticketId, tagId: nextTag.id })];
                                                            case 3:
                                                                _a.sent();
                                                                return [4 /*yield*/, Whatsapp_1["default"].findByPk(t.ticket.whatsappId)];
                                                            case 4:
                                                                whatsapp = _a.sent();
                                                                if (!(!(0, lodash_1.isNil)(nextTag.greetingMessageLane) && nextTag.greetingMessageLane !== "")) return [3 /*break*/, 8];
                                                                bodyMessage = nextTag.greetingMessageLane;
                                                                return [4 /*yield*/, Contact_1["default"].findByPk(t.ticket.contactId)];
                                                            case 5:
                                                                contact = _a.sent();
                                                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(t.ticketId, companyId_1)];
                                                            case 6:
                                                                ticketUpdate = _a.sent();
                                                                return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                                                                        number: contact.number,
                                                                        body: "".concat((0, Mustache_1["default"])(bodyMessage, ticketUpdate)),
                                                                        mediaPath: null,
                                                                        companyId: companyId_1
                                                                    }, contact.isGroup)];
                                                            case 7:
                                                                _a.sent();
                                                                _a.label = 8;
                                                            case 8: return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_8 = _a.sent();
                                            Sentry.captureException(e_8);
                                            logger_1["default"].error("Process Lanes -> Verify: error", e_8.message);
                                            throw e_8;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            }); });
            job.start();
            return [2 /*return*/];
        });
    });
}
function handleCloseTicketsAutomatic() {
    return __awaiter(this, void 0, void 0, function () {
        var job;
        var _this = this;
        return __generator(this, function (_a) {
            job = new CronJob('*/1 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var companies;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Company_1["default"].findAll({
                                where: {
                                    status: true
                                }
                            })];
                        case 1:
                            companies = _a.sent();
                            companies.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                var companyId, e_9;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            companyId = c.id;
                                            return [4 /*yield*/, (0, wbotClosedTickets_1.ClosedAllOpenTickets)(companyId)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_9 = _a.sent();
                                            Sentry.captureException(e_9);
                                            logger_1["default"].error("ClosedAllOpenTickets -> Verify: error", e_9.message);
                                            throw e_9;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            }); });
            job.start();
            return [2 /*return*/];
        });
    });
}
function handleWhatsapp() {
    return __awaiter(this, void 0, void 0, function () {
        var jobW;
        var _this = this;
        return __generator(this, function (_a) {
            jobW = new CronJob('* 15 3 * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //*Whatsapp
                    (0, GetWhatsapp_1.GetWhatsapp)();
                    jobW.stop();
                    return [2 /*return*/];
                });
            }); }, null, false, 'America/Sao_Paulo');
            jobW.start();
            return [2 /*return*/];
        });
    });
}
function handleInvoiceCreate() {
    return __awaiter(this, void 0, void 0, function () {
        var job;
        var _this = this;
        return __generator(this, function (_a) {
            logger_1["default"].info("GERANDO RECEITA...");
            job = new CronJob('*/30 * * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var companies;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Company_1["default"].findAll()];
                        case 1:
                            companies = _a.sent();
                            companies.map(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                var status, dueDate, date, timestamp, hoje, vencimento, diff, dias, whatsapps, _i, whatsapps_1, whatsapp, wbot, error_5, plan, sql, openInvoices, existingInvoice, updateSql, valuePlan, sql_1, invoiceInsert;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            status = c.status;
                                            dueDate = c.dueDate;
                                            date = (0, moment_1["default"])(dueDate).format();
                                            timestamp = (0, moment_1["default"])().format();
                                            hoje = (0, moment_1["default"])().format("DD/MM/yyyy");
                                            vencimento = (0, moment_1["default"])(dueDate).format("DD/MM/yyyy");
                                            diff = (0, moment_1["default"])(vencimento, "DD/MM/yyyy").diff((0, moment_1["default"])(hoje, "DD/MM/yyyy"));
                                            dias = moment_1["default"].duration(diff).asDays();
                                            if (!(status === true)) return [3 /*break*/, 19];
                                            if (!(dias <= -3)) return [3 /*break*/, 11];
                                            logger_1["default"].info("EMPRESA: ".concat(c.id, " est\u00E1 VENCIDA A MAIS DE 3 DIAS... INATIVANDO... ").concat(dias));
                                            c.status = false;
                                            return [4 /*yield*/, c.save()];
                                        case 1:
                                            _a.sent(); // Save the updated company record
                                            logger_1["default"].info("EMPRESA: ".concat(c.id, " foi INATIVADA."));
                                            logger_1["default"].info("EMPRESA: ".concat(c.id, " Desativando conex\u00F5es com o WhatsApp..."));
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 9, , 10]);
                                            return [4 /*yield*/, Whatsapp_1["default"].findAll({
                                                    where: {
                                                        companyId: c.id
                                                    },
                                                    attributes: ['id', 'status', 'session']
                                                })];
                                        case 3:
                                            whatsapps = _a.sent();
                                            _i = 0, whatsapps_1 = whatsapps;
                                            _a.label = 4;
                                        case 4:
                                            if (!(_i < whatsapps_1.length)) return [3 /*break*/, 8];
                                            whatsapp = whatsapps_1[_i];
                                            if (!whatsapp.session) return [3 /*break*/, 7];
                                            return [4 /*yield*/, whatsapp.update({ status: "DISCONNECTED", session: "" })];
                                        case 5:
                                            _a.sent();
                                            wbot = (0, wbot_1.getWbot)(whatsapp.id);
                                            return [4 /*yield*/, wbot.logout()];
                                        case 6:
                                            _a.sent();
                                            logger_1["default"].info("EMPRESA: ".concat(c.id, " teve o WhatsApp ").concat(whatsapp.id, " desconectado..."));
                                            _a.label = 7;
                                        case 7:
                                            _i++;
                                            return [3 /*break*/, 4];
                                        case 8: return [3 /*break*/, 10];
                                        case 9:
                                            error_5 = _a.sent();
                                            // Lidar com erros, se houver
                                            console.error('Erro ao buscar os IDs de WhatsApp:', error_5);
                                            throw error_5;
                                        case 10: return [3 /*break*/, 18];
                                        case 11: return [4 /*yield*/, Plan_1["default"].findByPk(c.planId)];
                                        case 12:
                                            plan = _a.sent();
                                            sql = "SELECT * FROM \"Invoices\" WHERE \"companyId\" = ".concat(c.id, " AND \"status\" = 'open';");
                                            return [4 /*yield*/, database_1["default"].query(sql, { type: sequelize_1.QueryTypes.SELECT })];
                                        case 13:
                                            openInvoices = _a.sent();
                                            existingInvoice = openInvoices.find(function (invoice) { return (0, moment_1["default"])(invoice.dueDate).format("DD/MM/yyyy") === vencimento; });
                                            if (!existingInvoice) return [3 /*break*/, 14];
                                            return [3 /*break*/, 18];
                                        case 14:
                                            if (!(openInvoices.length > 0)) return [3 /*break*/, 16];
                                            updateSql = "UPDATE \"Invoices\" SET \"dueDate\" = '".concat(date, "' WHERE \"id\" = ").concat(openInvoices[0].id, ";");
                                            return [4 /*yield*/, database_1["default"].query(updateSql, { type: sequelize_1.QueryTypes.UPDATE })];
                                        case 15:
                                            _a.sent();
                                            logger_1["default"].info("Fatura Atualizada ID: ".concat(openInvoices[0].id));
                                            return [3 /*break*/, 18];
                                        case 16:
                                            valuePlan = plan.amount.replace(",", ".");
                                            sql_1 = "INSERT INTO \"Invoices\" (\"companyId\", \"dueDate\", detail, status, value, users, connections, queues, \"updatedAt\", \"createdAt\")\n            VALUES (".concat(c.id, ", '").concat(date, "', '").concat(plan.name, "', 'open', ").concat(valuePlan, ", ").concat(plan.users, ", ").concat(plan.connections, ", ").concat(plan.queues, ", '").concat(timestamp, "', '").concat(timestamp, "');");
                                            return [4 /*yield*/, database_1["default"].query(sql_1, { type: sequelize_1.QueryTypes.INSERT })];
                                        case 17:
                                            invoiceInsert = _a.sent();
                                            logger_1["default"].info("Fatura Gerada para o cliente: ".concat(c.id));
                                            _a.label = 18;
                                        case 18: return [3 /*break*/, 19];
                                        case 19: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            }); });
            job.start();
            return [2 /*return*/];
        });
    });
}
handleInvoiceCreate();
handleWhatsapp();
handleProcessLanes();
handleCloseTicketsAutomatic();
handleRandomUser();
function startQueueProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var automationJob, allAutomationsJob, birthdayJob, kanbanJob, noResponseJob, dispatchJob, cleanContactsJob, mapsService;
        var _this = this;
        return __generator(this, function (_a) {
            logger_1["default"].info("Iniciando processamento de filas");
            exports.messageQueue.process("SendMessage", handleSendMessage);
            exports.scheduleMonitor.process("Verify", handleVerifySchedules);
            exports.sendScheduledMessages.process("SendMessage", handleSendScheduledMessage);
            // Logs de erro para sendScheduledMessages
            exports.sendScheduledMessages.on("failed", function (job, err) {
                logger_1["default"].error("[SendScheduledMessages] Job ".concat(job.id, " falhou: ").concat(err.message));
            });
            exports.sendScheduledMessages.on("error", function (error) {
                logger_1["default"].error("[SendScheduledMessages] Erro na fila: ".concat(error.message));
            });
            exports.sendScheduledMessages.on("completed", function (job) {
                logger_1["default"].info("[SendScheduledMessages] Job ".concat(job.id, " completado com sucesso"));
            });
            exports.campaignQueue.process("VerifyCampaignsDaatabase", handleVerifyCampaigns);
            exports.campaignQueue.process("ProcessCampaign", handleProcessCampaign);
            exports.campaignQueue.process("PrepareContact", handlePrepareContact);
            exports.campaignQueue.process("DispatchCampaign", handleDispatchCampaign);
            exports.userMonitor.process("VerifyLoginStatus", handleLoginStatus);
            exports.queueMonitor.process("VerifyQueueStatus", handleVerifyQueue);
            exports.scheduleMonitor.add("Verify", {}, {
                repeat: { cron: "*/30 * * * * *", key: "verify" },
                removeOnComplete: true
            });
            exports.campaignQueue.add("VerifyCampaignsDaatabase", {}, {
                repeat: { cron: "*/20 * * * * *", key: "verify-campaing" },
                removeOnComplete: true
            });
            exports.userMonitor.add("VerifyLoginStatus", {}, {
                repeat: { cron: "* * * * *", key: "verify-login" },
                removeOnComplete: true
            });
            exports.queueMonitor.add("VerifyQueueStatus", {}, {
                repeat: { cron: "0 * * * * *", key: "verify-queue" },
                removeOnComplete: true
            });
            automationJob = new CronJob('*/2 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, ExecuteAutomationsJob_1["default"])()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            logger_1["default"].error("[Automation Job] Erro: ".concat(error_6));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            automationJob.start();
            logger_1["default"].info("[Automation Job] Execuções agendadas - a cada 2 minutos");
            allAutomationsJob = new CronJob('* * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, ExecuteAutomationsJob_1.runAllAutomationsJob)()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_7 = _a.sent();
                            logger_1["default"].error("[All Automations Job] Erro: ".concat(error_7));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            allAutomationsJob.start();
            logger_1["default"].info("[All Automations Job] Processamento geral - a cada 1 minuto");
            birthdayJob = new CronJob('0 9 * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, ExecuteAutomationsJob_1.runBirthdayAutomationJob)()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            logger_1["default"].error("[Automation Birthday Job] Erro: ".concat(error_8));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            birthdayJob.start();
            logger_1["default"].info("[Automation Birthday Job] Iniciado - diária às 09:00");
            kanbanJob = new CronJob('*/10 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, ExecuteAutomationsJob_1.runKanbanAutomationJob)()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_9 = _a.sent();
                            logger_1["default"].error("[Automation Kanban Job] Erro: ".concat(error_9));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            kanbanJob.start();
            logger_1["default"].info("[Automation Kanban Job] Iniciado - a cada 10 minutos");
            noResponseJob = new CronJob('*/15 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, ExecuteAutomationsJob_1.runNoResponseAutomationJob)()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_10 = _a.sent();
                            logger_1["default"].error("[Automation NoResponse Job] Erro: ".concat(error_10));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            noResponseJob.start();
            logger_1["default"].info("[Automation NoResponse Job] Iniciado - a cada 15 minutos");
            dispatchJob = new CronJob('*/5 * * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, DispatchSchedulerService_1["default"])()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_11 = _a.sent();
                            logger_1["default"].error("[Scheduled Dispatch Job] Erro: ".concat(error_11));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            dispatchJob.start();
            logger_1["default"].info("[Scheduled Dispatch Job] Iniciado - a cada 5 minutos");
            cleanContactsJob = new CronJob('0 7,19 * * *', function () { return __awaiter(_this, void 0, void 0, function () {
                var error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            logger_1["default"].info("[cleanLidContacts Job] Iniciando execução agendada");
                            return [4 /*yield*/, (0, CleanLidContactsRunner_1.runCleanLidContacts)()];
                        case 1:
                            _a.sent();
                            logger_1["default"].info("[cleanLidContacts Job] Execução concluída");
                            return [3 /*break*/, 3];
                        case 2:
                            error_12 = _a.sent();
                            logger_1["default"].error("[cleanLidContacts Job] Erro: ".concat(error_12));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            cleanContactsJob.start();
            logger_1["default"].info("[cleanLidContacts Job] Agendado para 07:00 e 19:00 diariamente");
            (0, DispatchProcessorService_1["default"])();
            mapsService = process.env.GOOGLE_PLACES_API_KEY
                ? GoogleMapsPlacesService_1["default"]
                : GoogleMapsScrapeService_1["default"];
            (0, googleMapsScrapeQueue_1.processGoogleMapsScrapeQueue)(mapsService);
            logger_1["default"].info("[GoogleMapsScrape] Queue processor iniciado (modo: ".concat(process.env.GOOGLE_PLACES_API_KEY ? "Places API" : "Puppeteer", ")"));
            return [2 /*return*/];
        });
    });
}
exports.startQueueProcess = startQueueProcess;
