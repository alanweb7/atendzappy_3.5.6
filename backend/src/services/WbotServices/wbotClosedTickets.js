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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ClosedAllOpenTickets = void 0;
var sequelize_1 = require("sequelize");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var socket_1 = require("../../libs/socket");
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var SendWhatsAppMessage_1 = __importDefault(require("./SendWhatsAppMessage"));
var moment_1 = __importDefault(require("moment"));
var wbotMessageListener_1 = require("./wbotMessageListener");
var TicketTraking_1 = __importDefault(require("../../models/TicketTraking"));
var CreateLogTicketService_1 = __importDefault(require("../TicketServices/CreateLogTicketService"));
var logger_1 = __importDefault(require("../../utils/logger"));
var lodash_1 = require("lodash");
var date_fns_1 = require("date-fns");
var closeTicket = function (ticket, body) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ticket.update({
                    status: "closed",
                    lastMessage: body,
                    unreadMessages: 0,
                    amountUsedBotQueues: 0
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                        userId: ticket.userId || null,
                        queueId: ticket.queueId || null,
                        ticketId: ticket.id,
                        type: "autoClose"
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var handleOpenTickets = function (companyId, whatsapp) { return __awaiter(void 0, void 0, void 0, function () {
    var currentTime, brazilTimeZoneOffset, currentTimeBrazil, timeInactiveMessage, expiresTime, whereCondition1, ticketsForInactiveMessage, whereCondition, ticketsToClose, _i, ticketsToClose_1, ticket, ticketTraking, bodyExpiresMessageInactive, sentMessage, io;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                currentTime = new Date();
                brazilTimeZoneOffset = -3 * 60;
                currentTimeBrazil = new Date(currentTime.getTime() + brazilTimeZoneOffset * 60000);
                timeInactiveMessage = Number(whatsapp.timeInactiveMessage || 0);
                expiresTime = Number(whatsapp.expiresTicket || 0);
                if (!(!(0, lodash_1.isNil)(expiresTime) && expiresTime > 0)) return [3 /*break*/, 15];
                if (!(!(0, lodash_1.isNil)(timeInactiveMessage) && timeInactiveMessage > 0)) return [3 /*break*/, 4];
                whereCondition1 = void 0;
                whereCondition1 = {
                    status: "open",
                    companyId: companyId,
                    whatsappId: whatsapp.id,
                    updatedAt: (_a = {},
                        _a[sequelize_1.Op.lt] = +(0, date_fns_1.sub)(new Date(), {
                            minutes: Number(timeInactiveMessage)
                        }),
                        _a),
                    imported: null,
                    sendInactiveMessage: false
                };
                if (Number(whatsapp.whenExpiresTicket) === 1) {
                    whereCondition1 = __assign(__assign({}, whereCondition1), { fromMe: true });
                }
                return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: whereCondition1
                    })];
            case 1:
                ticketsForInactiveMessage = _c.sent();
                if (!(ticketsForInactiveMessage && ticketsForInactiveMessage.length > 0)) return [3 /*break*/, 3];
                logger_1["default"].info("Encontrou ".concat(ticketsForInactiveMessage.length, " atendimentos para enviar mensagem de inatividade na empresa ").concat(companyId, "- na conex\u00E3o ").concat(whatsapp.name, "!"));
                return [4 /*yield*/, Promise.all(ticketsForInactiveMessage.map(function (ticket) { return __awaiter(void 0, void 0, void 0, function () {
                        var bodyMessageInactive, sentMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ticket.reload()];
                                case 1:
                                    _a.sent();
                                    if (!!ticket.sendInactiveMessage) return [3 /*break*/, 5];
                                    bodyMessageInactive = (0, Mustache_1["default"])("\u200E ".concat(whatsapp.inactiveMessage), ticket);
                                    console.log("wbotClosedTickets1: ", bodyMessageInactive);
                                    return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                                            body: bodyMessageInactive,
                                            ticket: ticket
                                        })];
                                case 2:
                                    sentMessage = _a.sent();
                                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, ticket.contact)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, ticket.update({ sendInactiveMessage: true, fromMe: true })];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                expiresTime += timeInactiveMessage; // Adicionando o tempo de inatividade ao tempo de expiração
                _c.label = 4;
            case 4:
                whereCondition = void 0;
                whereCondition = {
                    status: "open",
                    companyId: companyId,
                    whatsappId: whatsapp.id,
                    updatedAt: (_b = {},
                        _b[sequelize_1.Op.lt] = +(0, date_fns_1.sub)(new Date(), {
                            minutes: Number(expiresTime)
                        }),
                        _b),
                    imported: null
                };
                if (timeInactiveMessage > 0) {
                    whereCondition = __assign(__assign({}, whereCondition), { sendInactiveMessage: true });
                }
                if (Number(whatsapp.whenExpiresTicket) === 1) {
                    whereCondition = __assign(__assign({}, whereCondition), { fromMe: true });
                }
                return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: whereCondition
                    })];
            case 5:
                ticketsToClose = _c.sent();
                if (!(ticketsToClose && ticketsToClose.length > 0)) return [3 /*break*/, 15];
                logger_1["default"].info("Encontrou ".concat(ticketsToClose.length, " atendimentos para encerrar na empresa ").concat(companyId, " - na conex\u00E3o ").concat(whatsapp.name, "!"));
                _i = 0, ticketsToClose_1 = ticketsToClose;
                _c.label = 6;
            case 6:
                if (!(_i < ticketsToClose_1.length)) return [3 /*break*/, 15];
                ticket = ticketsToClose_1[_i];
                return [4 /*yield*/, ticket.reload()];
            case 7:
                _c.sent();
                return [4 /*yield*/, TicketTraking_1["default"].findOne({
                        where: { ticketId: ticket.id, finishedAt: null }
                    })];
            case 8:
                ticketTraking = _c.sent();
                bodyExpiresMessageInactive = "";
                if (!(!(0, lodash_1.isNil)(whatsapp.expiresInactiveMessage) &&
                    whatsapp.expiresInactiveMessage !== "")) return [3 /*break*/, 11];
                bodyExpiresMessageInactive = (0, Mustache_1["default"])("\u200E".concat(whatsapp.expiresInactiveMessage), ticket);
                console.log("wbotClosedTickets2: ", bodyExpiresMessageInactive);
                return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                        body: bodyExpiresMessageInactive,
                        ticket: ticket
                    })];
            case 9:
                sentMessage = _c.sent();
                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, ticket.contact)];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11: 
            // Como o campo sendInactiveMessage foi atualizado, podemos garantir que a mensagem foi enviada
            return [4 /*yield*/, closeTicket(ticket, bodyExpiresMessageInactive)];
            case 12:
                // Como o campo sendInactiveMessage foi atualizado, podemos garantir que a mensagem foi enviada
                _c.sent();
                return [4 /*yield*/, ticketTraking.update({
                        finishedAt: new Date(),
                        closedAt: new Date(),
                        whatsappId: ticket.whatsappId,
                        userId: ticket.userId
                    })];
            case 13:
                _c.sent();
                io = (0, socket_1.getIO)();
                io.of(companyId.toString()).emit("company-".concat(companyId, "-ticket"), {
                    action: "delete",
                    ticketId: ticket.id
                });
                _c.label = 14;
            case 14:
                _i++;
                return [3 /*break*/, 6];
            case 15: return [2 /*return*/];
        }
    });
}); };
var handleNPSTickets = function (companyId, whatsapp) { return __awaiter(void 0, void 0, void 0, function () {
    var expiresTime, dataLimite, ticketsToClose;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                expiresTime = Number(whatsapp.expiresTicketNPS);
                dataLimite = (0, moment_1["default"])().subtract(expiresTime, "minutes");
                return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: {
                            status: "nps",
                            companyId: companyId,
                            whatsappId: whatsapp.id,
                            updatedAt: (_a = {}, _a[sequelize_1.Op.lt] = dataLimite.toDate(), _a),
                            imported: null
                        }
                    })];
            case 1:
                ticketsToClose = _b.sent();
                if (!(ticketsToClose && ticketsToClose.length > 0)) return [3 /*break*/, 3];
                logger_1["default"].info("Encontrou ".concat(ticketsToClose.length, " atendimentos para encerrar NPS na empresa ").concat(companyId, " - na conex\u00E3o ").concat(whatsapp.name, "!"));
                return [4 /*yield*/, Promise.all(ticketsToClose.map(function (ticket) { return __awaiter(void 0, void 0, void 0, function () {
                        var ticketTraking, bodyComplationMessage, sentMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ticket.reload()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, TicketTraking_1["default"].findOne({
                                            where: { ticketId: ticket.id, finishedAt: null }
                                        })];
                                case 2:
                                    ticketTraking = _a.sent();
                                    bodyComplationMessage = "";
                                    if (!(!(0, lodash_1.isNil)(whatsapp.complationMessage) &&
                                        whatsapp.complationMessage !== "")) return [3 /*break*/, 5];
                                    bodyComplationMessage = (0, Mustache_1["default"])("\u200E".concat(whatsapp.complationMessage), ticket);
                                    console.log("wbotClosedTickets3: ", bodyComplationMessage);
                                    return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                                            body: bodyComplationMessage,
                                            ticket: ticket
                                        })];
                                case 3:
                                    sentMessage = _a.sent();
                                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, ticket.contact)];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [4 /*yield*/, closeTicket(ticket, bodyComplationMessage)];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, ticketTraking.update({
                                            finishedAt: (0, moment_1["default"])().toDate(),
                                            closedAt: (0, moment_1["default"])().toDate(),
                                            whatsappId: ticket.whatsappId,
                                            userId: ticket.userId
                                        })];
                                case 7:
                                    _a.sent();
                                    (0, socket_1.getIO)().of(companyId.toString()).emit("company-".concat(companyId, "-ticket"), {
                                        action: "delete",
                                        ticketId: ticket.id
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var ClosedAllOpenTickets = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsapps, _i, whatsapps_1, whatsapp, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 8, , 9]);
                return [4 /*yield*/, Whatsapp_1["default"].findAll({
                        attributes: [
                            "id",
                            "name",
                            "status",
                            "timeSendQueue",
                            "sendIdQueue",
                            "timeInactiveMessage",
                            "expiresInactiveMessage",
                            "inactiveMessage",
                            "expiresTicket",
                            "expiresTicketNPS",
                            "whenExpiresTicket",
                            "complationMessage"
                        ],
                        where: (_a = {},
                            _a[sequelize_1.Op.or] = [
                                { expiresTicket: (_b = {}, _b[sequelize_1.Op.gt] = "0", _b) },
                                { expiresTicketNPS: (_c = {}, _c[sequelize_1.Op.gt] = "0", _c) }
                            ],
                            _a.companyId = companyId,
                            _a.status = "CONNECTED",
                            _a)
                    })];
            case 1:
                whatsapps = _d.sent();
                if (!(whatsapps.length > 0)) return [3 /*break*/, 7];
                _i = 0, whatsapps_1 = whatsapps;
                _d.label = 2;
            case 2:
                if (!(_i < whatsapps_1.length)) return [3 /*break*/, 7];
                whatsapp = whatsapps_1[_i];
                if (!whatsapp.expiresTicket) return [3 /*break*/, 4];
                return [4 /*yield*/, handleOpenTickets(companyId, whatsapp)];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4:
                if (!whatsapp.expiresTicketNPS) return [3 /*break*/, 6];
                return [4 /*yield*/, handleNPSTickets(companyId, whatsapp)];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _d.sent();
                console.error("Erro:", error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.ClosedAllOpenTickets = ClosedAllOpenTickets;
