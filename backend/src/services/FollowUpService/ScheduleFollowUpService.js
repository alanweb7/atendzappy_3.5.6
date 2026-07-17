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
var FollowUp_1 = __importDefault(require("../../models/FollowUp"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var sequelize_1 = require("sequelize");
var moment_1 = __importDefault(require("moment"));
var logger_1 = __importDefault(require("../../utils/logger"));
var ShowTicketService_1 = __importDefault(require("../TicketServices/ShowTicketService"));
var SendWhatsAppMessage_1 = __importDefault(require("../WbotServices/SendWhatsAppMessage"));
var ScheduleFollowUpService = /** @class */ (function () {
    function ScheduleFollowUpService() {
    }
    ScheduleFollowUpService.prototype.scheduleFollowUp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var delayMinutes, action, ticketId, companyId, flowNodeId, scheduledAt, followUp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delayMinutes = data.delayMinutes, action = data.action, ticketId = data.ticketId, companyId = data.companyId, flowNodeId = data.flowNodeId;
                        scheduledAt = (0, moment_1["default"])().add(delayMinutes, 'minutes').toDate();
                        return [4 /*yield*/, FollowUp_1["default"].create({
                                ticketId: ticketId,
                                companyId: companyId,
                                flowNodeId: flowNodeId,
                                actionType: action.type,
                                actionPayload: action.payload,
                                scheduledAt: scheduledAt,
                                status: 'pending'
                            })];
                    case 1:
                        followUp = _a.sent();
                        logger_1["default"].info("Follow-up scheduled: ".concat(followUp.id, " for ticket ").concat(ticketId, " at ").concat(scheduledAt));
                        return [2 /*return*/, followUp];
                }
            });
        });
    };
    ScheduleFollowUpService.prototype.processPendingFollowUps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, pendingFollowUps, _i, pendingFollowUps_1, followUp, error_1, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        now = (0, moment_1["default"])().toDate();
                        return [4 /*yield*/, FollowUp_1["default"].findAll({
                                where: {
                                    status: 'pending',
                                    scheduledAt: (_a = {},
                                        _a[sequelize_1.Op.lte] = now,
                                        _a)
                                },
                                include: [
                                    {
                                        model: Ticket_1["default"],
                                        as: 'ticket',
                                        include: [
                                            {
                                                model: Contact_1["default"],
                                                as: 'contact'
                                            },
                                            {
                                                model: Whatsapp_1["default"],
                                                as: 'whatsapp'
                                            },
                                            {
                                                model: Queue_1["default"],
                                                as: 'queue'
                                            }
                                        ]
                                    }
                                ]
                            })];
                    case 1:
                        pendingFollowUps = _b.sent();
                        logger_1["default"].info("Processing ".concat(pendingFollowUps.length, " pending follow-ups"));
                        _i = 0, pendingFollowUps_1 = pendingFollowUps;
                        _b.label = 2;
                    case 2:
                        if (!(_i < pendingFollowUps_1.length)) return [3 /*break*/, 9];
                        followUp = pendingFollowUps_1[_i];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 8]);
                        return [4 /*yield*/, this.executeFollowUp(followUp)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, followUp.update({ status: 'completed', executedAt: new Date() })];
                    case 5:
                        _b.sent();
                        logger_1["default"].info("Follow-up ".concat(followUp.id, " executed successfully"));
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _b.sent();
                        return [4 /*yield*/, followUp.update({
                                status: 'failed',
                                executedAt: new Date(),
                                error: error_1.message
                            })];
                    case 7:
                        _b.sent();
                        logger_1["default"].error("Failed to execute follow-up ".concat(followUp.id, ": ").concat(error_1.message));
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 2];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_2 = _b.sent();
                        logger_1["default"].error("Error processing pending follow-ups: ".concat(error_2.message));
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleFollowUpService.prototype.executeFollowUp = function (followUp) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, actionType, actionPayload, actionData, _a, messageText, ticketDetails, error_3, Tag_1, TicketTag, ContactTag, _i, _b, tagId, tag, error_4, Tag_2, TicketTag, ContactTag, kanbanTag, existingKanbanTags, _c, existingKanbanTags_1, existingTag, error_5, Queue_2, queue, error_6, error_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ticket = followUp.ticket, actionType = followUp.actionType, actionPayload = followUp.actionPayload;
                        if (!ticket) {
                            throw new Error('Ticket not found for follow-up');
                        }
                        actionData = __assign({ ticket: ticket, contact: ticket.contact, whatsapp: ticket.whatsapp, queue: ticket.queue, companyId: ticket.companyId }, actionPayload);
                        _a = actionType;
                        switch (_a) {
                            case 'sendMessageFlow': return [3 /*break*/, 1];
                            case 'sendMessageFlowWithMenu': return [3 /*break*/, 1];
                            case 'addTag': return [3 /*break*/, 8];
                            case 'addTagKanban': return [3 /*break*/, 18];
                            case 'transferQueue': return [3 /*break*/, 32];
                            case 'closeTicket': return [3 /*break*/, 39];
                            case 'transferFlow': return [3 /*break*/, 43];
                        }
                        return [3 /*break*/, 44];
                    case 1:
                        messageText = ((actionPayload === null || actionPayload === void 0 ? void 0 : actionPayload.text) || (actionPayload === null || actionPayload === void 0 ? void 0 : actionPayload.body) || "").toString().trim();
                        if (!messageText) {
                            logger_1["default"].warn("Follow-up ".concat(followUp.id, " sem texto para enviar."));
                            return [3 /*break*/, 45];
                        }
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, ticket.companyId)];
                    case 3:
                        ticketDetails = _d.sent();
                        return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                                body: messageText,
                                ticket: ticketDetails,
                                quotedMsg: null
                            })];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, ticketDetails.update({ lastMessage: messageText })];
                    case 5:
                        _d.sent();
                        logger_1["default"].info("Follow-up ".concat(followUp.id, " enviou mensagem para ticket ").concat(ticket.id));
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _d.sent();
                        logger_1["default"].error("Erro ao enviar mensagem do follow-up ".concat(followUp.id, ": ").concat(error_3.message));
                        throw error_3;
                    case 7: return [3 /*break*/, 45];
                    case 8:
                        if (!(actionPayload.tags && Array.isArray(actionPayload.tags))) return [3 /*break*/, 17];
                        Tag_1 = require("../../models/Tag")["default"];
                        TicketTag = require("../../models/TicketTag")["default"];
                        ContactTag = require("../../models/ContactTag")["default"];
                        _i = 0, _b = actionPayload.tags;
                        _d.label = 9;
                    case 9:
                        if (!(_i < _b.length)) return [3 /*break*/, 17];
                        tagId = _b[_i];
                        _d.label = 10;
                    case 10:
                        _d.trys.push([10, 15, , 16]);
                        return [4 /*yield*/, Tag_1.findByPk(tagId)];
                    case 11:
                        tag = _d.sent();
                        if (!(tag && tag.kanban === 0)) return [3 /*break*/, 14];
                        // Adicionar tag ao ticket
                        return [4 /*yield*/, TicketTag.findOrCreate({
                                where: { ticketId: ticket.id, tagId: tagId },
                                defaults: { ticketId: ticket.id, tagId: tagId }
                            })];
                    case 12:
                        // Adicionar tag ao ticket
                        _d.sent();
                        // Adicionar tag ao contato
                        return [4 /*yield*/, ContactTag.findOrCreate({
                                where: { contactId: ticket.contactId, tagId: tagId },
                                defaults: { contactId: ticket.contactId, tagId: tagId }
                            })];
                    case 13:
                        // Adicionar tag ao contato
                        _d.sent();
                        logger_1["default"].info("Tag ".concat(tag.name, " added to ticket ").concat(ticket.id));
                        _d.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_4 = _d.sent();
                        logger_1["default"].error("Error adding tag ".concat(tagId, " to ticket ").concat(ticket.id, ":"), error_4);
                        return [3 /*break*/, 16];
                    case 16:
                        _i++;
                        return [3 /*break*/, 9];
                    case 17: return [3 /*break*/, 45];
                    case 18:
                        if (!actionPayload.kanbanTagId) return [3 /*break*/, 31];
                        Tag_2 = require("../../models/Tag")["default"];
                        TicketTag = require("../../models/TicketTag")["default"];
                        ContactTag = require("../../models/ContactTag")["default"];
                        _d.label = 19;
                    case 19:
                        _d.trys.push([19, 30, , 31]);
                        return [4 /*yield*/, Tag_2.findByPk(actionPayload.kanbanTagId)];
                    case 20:
                        kanbanTag = _d.sent();
                        if (!(kanbanTag && kanbanTag.kanban === 1)) return [3 /*break*/, 29];
                        return [4 /*yield*/, Tag_2.findAll({
                                where: { kanban: 1 },
                                include: [{
                                        model: TicketTag,
                                        where: { ticketId: ticket.id },
                                        required: true
                                    }]
                            })];
                    case 21:
                        existingKanbanTags = _d.sent();
                        _c = 0, existingKanbanTags_1 = existingKanbanTags;
                        _d.label = 22;
                    case 22:
                        if (!(_c < existingKanbanTags_1.length)) return [3 /*break*/, 26];
                        existingTag = existingKanbanTags_1[_c];
                        return [4 /*yield*/, TicketTag.destroy({
                                where: { ticketId: ticket.id, tagId: existingTag.id }
                            })];
                    case 23:
                        _d.sent();
                        return [4 /*yield*/, ContactTag.destroy({
                                where: { contactId: ticket.contactId, tagId: existingTag.id }
                            })];
                    case 24:
                        _d.sent();
                        _d.label = 25;
                    case 25:
                        _c++;
                        return [3 /*break*/, 22];
                    case 26: 
                    // Adicionar nova tag kanban
                    return [4 /*yield*/, TicketTag.findOrCreate({
                            where: { ticketId: ticket.id, tagId: kanbanTag.id },
                            defaults: { ticketId: ticket.id, tagId: kanbanTag.id }
                        })];
                    case 27:
                        // Adicionar nova tag kanban
                        _d.sent();
                        return [4 /*yield*/, ContactTag.findOrCreate({
                                where: { contactId: ticket.contactId, tagId: kanbanTag.id },
                                defaults: { contactId: ticket.contactId, tagId: kanbanTag.id }
                            })];
                    case 28:
                        _d.sent();
                        logger_1["default"].info("Kanban tag ".concat(kanbanTag.name, " set for ticket ").concat(ticket.id));
                        _d.label = 29;
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        error_5 = _d.sent();
                        logger_1["default"].error("Error setting kanban tag for ticket ".concat(ticket.id, ":"), error_5);
                        return [3 /*break*/, 31];
                    case 31: return [3 /*break*/, 45];
                    case 32:
                        if (!actionPayload.queueId) return [3 /*break*/, 38];
                        Queue_2 = require("../../models/Queue")["default"];
                        _d.label = 33;
                    case 33:
                        _d.trys.push([33, 37, , 38]);
                        return [4 /*yield*/, Queue_2.findByPk(actionPayload.queueId)];
                    case 34:
                        queue = _d.sent();
                        if (!queue) return [3 /*break*/, 36];
                        return [4 /*yield*/, ticket.update({
                                queueId: queue.id,
                                userId: null // Limpa usuário ao transferir para fila
                            })];
                    case 35:
                        _d.sent();
                        logger_1["default"].info("Ticket ".concat(ticket.id, " transferred to queue ").concat(queue.name));
                        _d.label = 36;
                    case 36: return [3 /*break*/, 38];
                    case 37:
                        error_6 = _d.sent();
                        logger_1["default"].error("Error transferring ticket ".concat(ticket.id, " to queue ").concat(actionPayload.queueId, ":"), error_6);
                        return [3 /*break*/, 38];
                    case 38: return [3 /*break*/, 45];
                    case 39:
                        _d.trys.push([39, 41, , 42]);
                        return [4 /*yield*/, ticket.update({
                                status: 'closed',
                                closedAt: new Date()
                            })];
                    case 40:
                        _d.sent();
                        logger_1["default"].info("Ticket ".concat(ticket.id, " closed"));
                        return [3 /*break*/, 42];
                    case 41:
                        error_7 = _d.sent();
                        logger_1["default"].error("Error closing ticket ".concat(ticket.id, ":"), error_7);
                        return [3 /*break*/, 42];
                    case 42: return [3 /*break*/, 45];
                    case 43:
                        // Implement transferFlow logic - Transferir para outro fluxo
                        if (actionPayload.flowId) {
                            // TODO: Implementar transferência de fluxo
                            // Isso pode precisar de integração com o Flow Builder
                            logger_1["default"].info("Transfer flow action for ticket ".concat(ticket.id, " to flow ").concat(actionPayload.flowId));
                        }
                        return [3 /*break*/, 45];
                    case 44: throw new Error("Unsupported action type: ".concat(actionType));
                    case 45: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleFollowUpService.prototype.cancelFollowUp = function (followUpId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var followUp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FollowUp_1["default"].findOne({
                            where: {
                                id: followUpId,
                                companyId: companyId,
                                status: 'pending'
                            }
                        })];
                    case 1:
                        followUp = _a.sent();
                        if (!followUp) {
                            throw new Error('Pending follow-up not found');
                        }
                        return [4 /*yield*/, followUp.update({ status: 'cancelled' })];
                    case 2:
                        _a.sent();
                        logger_1["default"].info("Follow-up ".concat(followUpId, " cancelled"));
                        return [2 /*return*/];
                }
            });
        });
    };
    ScheduleFollowUpService.prototype.getFollowUpsByTicket = function (ticketId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FollowUp_1["default"].findAll({
                            where: {
                                ticketId: ticketId,
                                companyId: companyId
                            },
                            order: [['createdAt', 'DESC']]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ScheduleFollowUpService.prototype.resetFollowUpVariables = function (ticketId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var followUps, _i, followUps_1, followUp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FollowUp_1["default"].findAll({
                            where: {
                                ticketId: ticketId,
                                companyId: companyId,
                                status: ['pending', 'failed']
                            }
                        })];
                    case 1:
                        followUps = _a.sent();
                        _i = 0, followUps_1 = followUps;
                        _a.label = 2;
                    case 2:
                        if (!(_i < followUps_1.length)) return [3 /*break*/, 5];
                        followUp = followUps_1[_i];
                        return [4 /*yield*/, followUp.update({ status: 'cancelled' })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        logger_1["default"].info("Reset ".concat(followUps.length, " follow-ups for ticket ").concat(ticketId));
                        return [2 /*return*/];
                }
            });
        });
    };
    return ScheduleFollowUpService;
}());
exports["default"] = ScheduleFollowUpService;
