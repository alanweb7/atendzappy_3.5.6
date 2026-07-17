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
var moment_1 = __importDefault(require("moment"));
var Sentry = __importStar(require("@sentry/node"));
var sequelize_1 = require("sequelize");
var SetTicketMessagesAsRead_1 = __importDefault(require("../../helpers/SetTicketMessagesAsRead"));
var socket_1 = require("../../libs/socket");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var SendWhatsAppMessage_1 = __importDefault(require("../WbotServices/SendWhatsAppMessage"));
var FindOrCreateATicketTrakingService_1 = __importDefault(require("./FindOrCreateATicketTrakingService"));
var GetTicketWbot_1 = __importDefault(require("../../helpers/GetTicketWbot"));
var wbotMessageListener_1 = require("../WbotServices/wbotMessageListener");
var lodash_1 = require("lodash");
var sendFacebookMessage_1 = __importDefault(require("../FacebookServices/sendFacebookMessage"));
var facebookMessageListener_1 = require("../FacebookServices/facebookMessageListener");
var User_1 = __importDefault(require("../../models/User"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var CreateLogTicketService_1 = __importDefault(require("./CreateLogTicketService"));
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var FindOrCreateTicketService_1 = __importDefault(require("./FindOrCreateTicketService"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var UpdateTicketService = function (_a) {
    var ticketData = _a.ticketData, ticketId = _a.ticketId, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var queueId_1, userId, whatsappId, _b, sendFarewellMessage, amountUsedBotQueues, lastMessage, integrationId, useIntegration, unreadMessages, leadValue, msgTransfer, _c, isTransfered, status_1, isBot, queueOptionId, io, settings, ticket, oldStatus, oldUserId, oldQueueId, oldWhatsappId, client, clientOwner, userInTargetQueue, shouldClearAssignments, otherTicket, ticketTraking, _d, complationMessage, ratingMessage, groupAsTicket, _userId, user, ratingTxt, bodyRatingMessage, msg, msg, body, sentMessage, sentMessage, updatePayload, queue, newTicketTransfer, messageData, newTicketUpdateData, wbot, msgtxt, queueChangedMessage, wbot, msgtxt, queueChangedMessage, messageData, isClosingTicketFinal, nextQueueId, nextUserId, isOnlyQueueOrUserChange, ticketUpdateData, isClosingTicket, err_1;
        var _e;
        var _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _m.trys.push([0, 89, , 90]);
                    queueId_1 = ticketData.queueId, userId = ticketData.userId, whatsappId = ticketData.whatsappId, _b = ticketData.sendFarewellMessage, sendFarewellMessage = _b === void 0 ? true : _b, amountUsedBotQueues = ticketData.amountUsedBotQueues, lastMessage = ticketData.lastMessage, integrationId = ticketData.integrationId, useIntegration = ticketData.useIntegration, unreadMessages = ticketData.unreadMessages, leadValue = ticketData.leadValue, msgTransfer = ticketData.msgTransfer, _c = ticketData.isTransfered, isTransfered = _c === void 0 ? false : _c, status_1 = ticketData.status;
                    isBot = ticketData.isBot || false;
                    queueOptionId = ticketData.queueOptionId || null;
                    // queueId = 0 viola FK (Queues.id nunca é 0) — tratar como "sem fila"
                    if (queueId_1 === 0 || queueId_1 === "0")
                        queueId_1 = null;
                    io = (0, socket_1.getIO)();
                    return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                            where: {
                                companyId: companyId
                            }
                        })];
                case 1:
                    settings = _m.sent();
                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticketId, companyId)];
                case 2:
                    ticket = _m.sent();
                    if (ticket.channel === "whatsapp" && ticket.whatsappId) {
                        (0, SetTicketMessagesAsRead_1["default"])(ticket);
                    }
                    oldStatus = ticket === null || ticket === void 0 ? void 0 : ticket.status;
                    oldUserId = (_f = ticket.user) === null || _f === void 0 ? void 0 : _f.id;
                    oldQueueId = ticket === null || ticket === void 0 ? void 0 : ticket.queueId;
                    oldWhatsappId = ticket === null || ticket === void 0 ? void 0 : ticket.whatsappId;
                    // **LOG: Alteração de conexão WhatsApp**
                    if (whatsappId && whatsappId !== oldWhatsappId) {
                        console.log("\uD83D\uDD04 ALTERANDO CONEX\u00C3O: Ticket ".concat(ticket.id, " \u2192 WhatsApp ").concat(oldWhatsappId, " para ").concat(whatsappId));
                    }
                    if (!(isTransfered && queueId_1 && !userId)) return [3 /*break*/, 4];
                    console.log("\uD83D\uDD04 VERIFICANDO VINCULA\u00C7\u00C3O AUTOM\u00C1TICA: Ticket ".concat(ticket.id, " \u2192 Fila ").concat(queueId_1));
                    return [4 /*yield*/, CrmClient_1["default"].findOne({
                            where: {
                                companyId: ticket.companyId,
                                contactId: ticket.contactId
                            },
                            include: [
                                {
                                    model: User_1["default"],
                                    as: 'owner',
                                    attributes: ['id', 'name'],
                                    include: [
                                        {
                                            model: require("../../models/Queue")["default"],
                                            as: 'queues',
                                            attributes: ['id'],
                                            through: { attributes: [] }
                                        }
                                    ]
                                }
                            ]
                        })];
                case 3:
                    client = _m.sent();
                    if (client && client.owner) {
                        clientOwner = client.owner;
                        console.log("\uD83D\uDC64 Cliente encontrado: ".concat(client.name, " \u2192 Respons\u00E1vel: ").concat(clientOwner.name));
                        userInTargetQueue = (_g = clientOwner.queues) === null || _g === void 0 ? void 0 : _g.some(function (queue) { return queue.id === queueId_1; });
                        if (userInTargetQueue) {
                            console.log("\u2705 VINCULA\u00C7\u00C3O AUTOM\u00C1TICA: Usu\u00E1rio ".concat(clientOwner.name, " est\u00E1 na fila ").concat(queueId_1));
                            userId = clientOwner.id; // Vincula automaticamente ao usuário responsável
                        }
                        else {
                            console.log("\u274C VINCULA\u00C7\u00C3O N\u00C3O APLICADA: Usu\u00E1rio ".concat(clientOwner.name, " n\u00E3o est\u00E1 na fila ").concat(queueId_1));
                        }
                    }
                    else {
                        console.log("\uD83D\uDCCB Sem cliente vinculado ou sem respons\u00E1vel - fluxo normal");
                    }
                    _m.label = 4;
                case 4:
                    shouldClearAssignments = status_1 === "closed" &&
                        ticket.status !== "closed";
                    if (!((0, lodash_1.isNil)(ticket.whatsappId) && status_1 === "closed")) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: ticket.queueId,
                            ticketId: ticketId,
                            type: "closed"
                        })];
                case 5:
                    _m.sent();
                    return [4 /*yield*/, ticket.update({
                            status: "closed",
                            userId: null,
                            queueId: null
                        })];
                case 6:
                    _m.sent();
                    // KANBAN FIX: Emitir update ao invés de delete para manter ticket visível no Kanban
                    io.of(String(companyId))
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    console.log("🔴 KANBAN FIX: Ticket sem whatsappId encerrado - emitindo UPDATE ao invés de DELETE");
                    return [2 /*return*/, { ticket: ticket, oldStatus: oldStatus, oldUserId: oldUserId }];
                case 7:
                    if (!(oldStatus === "closed")) return [3 /*break*/, 11];
                    console.log(122, "UpdateTicketService");
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: ticket.contactId,
                                status: (_e = {}, _e[sequelize_1.Op.or] = ["open", "pending", "group"], _e),
                                whatsappId: ticket.whatsappId
                            }
                        })];
                case 8:
                    otherTicket = _m.sent();
                    if (!otherTicket) return [3 /*break*/, 10];
                    if (!(otherTicket.id !== ticket.id)) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(otherTicket.id, companyId)];
                case 9:
                    otherTicket = _m.sent();
                    return [2 /*return*/, { ticket: otherTicket, oldStatus: oldStatus, oldUserId: oldUserId }];
                case 10:
                    // await CheckContactOpenTickets(ticket.contactId, ticket.whatsappId );
                    isBot = false;
                    _m.label = 11;
                case 11: return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                        ticketId: ticketId,
                        companyId: companyId,
                        whatsappId: ticket === null || ticket === void 0 ? void 0 : ticket.whatsappId
                    })];
                case 12:
                    ticketTraking = _m.sent();
                    return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(ticket === null || ticket === void 0 ? void 0 : ticket.whatsappId, companyId)];
                case 13:
                    _d = _m.sent(), complationMessage = _d.complationMessage, ratingMessage = _d.ratingMessage, groupAsTicket = _d.groupAsTicket;
                    if (!(status_1 !== undefined && ["closed"].indexOf(status_1) > -1)) return [3 /*break*/, 34];
                    _userId = ticket.userId || userId;
                    user = void 0;
                    if (!_userId) return [3 /*break*/, 15];
                    return [4 /*yield*/, User_1["default"].findByPk(_userId)];
                case 14:
                    user = _m.sent();
                    _m.label = 15;
                case 15:
                    if (!(settings.userRating === "enabled" &&
                        (sendFarewellMessage || sendFarewellMessage === undefined) &&
                        !(0, lodash_1.isNil)(ratingMessage) &&
                        ratingMessage !== "" &&
                        !ticket.isGroup)) return [3 /*break*/, 25];
                    if (!(ticketTraking.ratingAt == null)) return [3 /*break*/, 25];
                    ratingTxt = ratingMessage || "";
                    bodyRatingMessage = "\u200E ".concat(ratingTxt, "\n");
                    if (!(ticket.channel === "whatsapp" &&
                        ticket.whatsapp.status === "CONNECTED")) return [3 /*break*/, 18];
                    console.log("UpdateTicketService1: ", bodyRatingMessage);
                    return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                            body: bodyRatingMessage,
                            ticket: ticket,
                            isForwarded: false
                        })];
                case 16:
                    msg = _m.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(msg, ticket, ticket.contact)];
                case 17:
                    _m.sent();
                    return [3 /*break*/, 21];
                case 18:
                    if (!["facebook", "instagram"].includes(ticket.channel)) return [3 /*break*/, 21];
                    return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({
                            body: bodyRatingMessage,
                            ticket: ticket
                        })];
                case 19:
                    msg = _m.sent();
                    return [4 /*yield*/, (0, facebookMessageListener_1.verifyMessageFace)(msg, bodyRatingMessage, ticket, ticket.contact)];
                case 20:
                    _m.sent();
                    _m.label = 21;
                case 21: return [4 /*yield*/, ticketTraking.update({
                        userId: ticket.userId,
                        closedAt: (0, moment_1["default"])().toDate()
                    })];
                case 22:
                    _m.sent();
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: ticket.userId,
                            queueId: ticket.queueId,
                            ticketId: ticketId,
                            type: "nps"
                        })];
                case 23:
                    _m.sent();
                    // try {
                    //   // Retrieve tagIds associated with the provided ticketId from TicketTags
                    //   const ticketTags = await TicketTag.findAll({ where: { ticketId } });
                    //   const tagIds = ticketTags.map((ticketTag) => ticketTag.tagId);
                    //   // Find the tagIds with kanban = 1 in the Tags table
                    //   const tagsWithKanbanOne = await Tag.findAll({
                    //     where: {
                    //       id: tagIds,
                    //       kanban: 1,
                    //     },
                    //   });
                    //   // Remove the tagIds with kanban = 1 from TicketTags
                    //   const tagIdsWithKanbanOne = tagsWithKanbanOne.map((tag) => tag.id);
                    //   if (tagIdsWithKanbanOne)
                    //     await TicketTag.destroy({ where: { ticketId, tagId: tagIdsWithKanbanOne } });
                    // } catch (error) {
                    //   Sentry.captureException(error);
                    // }
                    return [4 /*yield*/, ticket.update({
                            status: "nps",
                            amountUsedBotQueuesNPS: 1,
                            queueId: null,
                            userId: null
                        })];
                case 24:
                    // try {
                    //   // Retrieve tagIds associated with the provided ticketId from TicketTags
                    //   const ticketTags = await TicketTag.findAll({ where: { ticketId } });
                    //   const tagIds = ticketTags.map((ticketTag) => ticketTag.tagId);
                    //   // Find the tagIds with kanban = 1 in the Tags table
                    //   const tagsWithKanbanOne = await Tag.findAll({
                    //     where: {
                    //       id: tagIds,
                    //       kanban: 1,
                    //     },
                    //   });
                    //   // Remove the tagIds with kanban = 1 from TicketTags
                    //   const tagIdsWithKanbanOne = tagsWithKanbanOne.map((tag) => tag.id);
                    //   if (tagIdsWithKanbanOne)
                    //     await TicketTag.destroy({ where: { ticketId, tagId: tagIdsWithKanbanOne } });
                    // } catch (error) {
                    //   Sentry.captureException(error);
                    // }
                    _m.sent();
                    io.of(String(companyId))
                        // .to(oldStatus)
                        // .to(ticketId.toString())
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "delete",
                        ticketId: ticket.id
                    });
                    console.log(277, "UpdateTicketService");
                    return [2 /*return*/, { ticket: ticket, oldStatus: oldStatus, oldUserId: oldUserId }];
                case 25:
                    if (!(((!(0, lodash_1.isNil)(user === null || user === void 0 ? void 0 : user.farewellMessage) && (user === null || user === void 0 ? void 0 : user.farewellMessage) !== "") ||
                        (!(0, lodash_1.isNil)(complationMessage) && complationMessage !== "")) &&
                        (sendFarewellMessage || sendFarewellMessage === undefined))) return [3 /*break*/, 30];
                    body = void 0;
                    if (!(ticket.status !== "pending" ||
                        (ticket.status === "pending" &&
                            settings.sendFarewellWaitingTicket === "enabled"))) return [3 /*break*/, 30];
                    if (!(0, lodash_1.isNil)(user) &&
                        !(0, lodash_1.isNil)(user === null || user === void 0 ? void 0 : user.farewellMessage) &&
                        (user === null || user === void 0 ? void 0 : user.farewellMessage) !== "") {
                        body = "\u200E ".concat(user.farewellMessage);
                    }
                    else {
                        body = "\u200E ".concat(complationMessage);
                    }
                    if (!(ticket.channel === "whatsapp" &&
                        (!ticket.isGroup || groupAsTicket === "enabled") &&
                        ticket.whatsapp.status === "CONNECTED")) return [3 /*break*/, 28];
                    return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                            body: body,
                            ticket: ticket,
                            isForwarded: false
                        })];
                case 26:
                    sentMessage = _m.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, ticket.contact)];
                case 27:
                    _m.sent();
                    _m.label = 28;
                case 28:
                    if (!(["facebook", "instagram"].includes(ticket.channel) &&
                        (!ticket.isGroup || groupAsTicket === "enabled"))) return [3 /*break*/, 30];
                    return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({ body: body, ticket: ticket })];
                case 29:
                    sentMessage = _m.sent();
                    _m.label = 30;
                case 30:
                    ticketTraking.finishedAt = (0, moment_1["default"])().toDate();
                    ticketTraking.closedAt = (0, moment_1["default"])().toDate();
                    ticketTraking.whatsappId = ticket === null || ticket === void 0 ? void 0 : ticket.whatsappId;
                    ticketTraking.userId = ticket.userId;
                    // queueId = null;
                    // userId = null;
                    //loga fim de atendimento
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: ticket.queueId,
                            ticketId: ticketId,
                            type: "closed"
                        })];
                case 31:
                    // queueId = null;
                    // userId = null;
                    //loga fim de atendimento
                    _m.sent();
                    // try {
                    //   // Retrieve tagIds associated with the provided ticketId from TicketTags
                    //   const ticketTags = await TicketTag.findAll({ where: { ticketId } });
                    //   const tagIds = ticketTags.map((ticketTag) => ticketTag.tagId);
                    //   // Find the tagIds with kanban = 1 in the Tags table
                    //   const tagsWithKanbanOne = await Tag.findAll({
                    //     where: {
                    //       id: tagIds,
                    //       kanban: 1,
                    //     },
                    //   });
                    //   // Remove the tagIds with kanban = 1 from TicketTags
                    //   const tagIdsWithKanbanOne = tagsWithKanbanOne.map((tag) => tag.id);
                    //   if (tagIdsWithKanbanOne)
                    //     await TicketTag.destroy({ where: { ticketId, tagId: tagIdsWithKanbanOne } });
                    // } catch (error) {
                    //   Sentry.captureException(error);
                    // }
                    return [4 /*yield*/, ticketTraking.save()];
                case 32:
                    // try {
                    //   // Retrieve tagIds associated with the provided ticketId from TicketTags
                    //   const ticketTags = await TicketTag.findAll({ where: { ticketId } });
                    //   const tagIds = ticketTags.map((ticketTag) => ticketTag.tagId);
                    //   // Find the tagIds with kanban = 1 in the Tags table
                    //   const tagsWithKanbanOne = await Tag.findAll({
                    //     where: {
                    //       id: tagIds,
                    //       kanban: 1,
                    //     },
                    //   });
                    //   // Remove the tagIds with kanban = 1 from TicketTags
                    //   const tagIdsWithKanbanOne = tagsWithKanbanOne.map((tag) => tag.id);
                    //   if (tagIdsWithKanbanOne)
                    //     await TicketTag.destroy({ where: { ticketId, tagId: tagIdsWithKanbanOne } });
                    // } catch (error) {
                    //   Sentry.captureException(error);
                    // }
                    _m.sent();
                    updatePayload = {
                        status: "closed",
                        lastFlowId: ticket.flowWebhook ? ticket.lastFlowId : null,
                        dataWebhook: null,
                        hashFlowId: ticket.flowWebhook ? ticket.hashFlowId : null
                    };
                    if (shouldClearAssignments) {
                        updatePayload.queueId = null;
                        updatePayload.userId = null;
                    }
                    return [4 /*yield*/, ticket.update(updatePayload)];
                case 33:
                    _m.sent();
                    // KANBAN FIX: Emitir update ao invés de delete para manter ticket visível no Kanban
                    io.of(String(companyId))
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    console.log("🔴 KANBAN FIX: Ticket encerrado (status=closed) - emitindo UPDATE ao invés de DELETE");
                    return [2 /*return*/, { ticket: ticket, oldStatus: oldStatus, oldUserId: oldUserId }];
                case 34:
                    queue = void 0;
                    if (!!(0, lodash_1.isNil)(queueId_1)) return [3 /*break*/, 36];
                    return [4 /*yield*/, Queue_1["default"].findByPk(queueId_1)];
                case 35:
                    queue = _m.sent();
                    ticketTraking.queuedAt = (0, moment_1["default"])().toDate();
                    _m.label = 36;
                case 36:
                    if (!isTransfered) return [3 /*break*/, 78];
                    if (!settings.closeTicketOnTransfer) return [3 /*break*/, 62];
                    newTicketTransfer = ticket;
                    if (!(oldQueueId !== queueId_1)) return [3 /*break*/, 41];
                    return [4 /*yield*/, ticket.update({
                            status: "closed",
                            userId: null,
                            queueId: null
                        })];
                case 37:
                    _m.sent();
                    return [4 /*yield*/, ticket.reload()];
                case 38:
                    _m.sent();
                    // KANBAN FIX: Emitir update ao invés de delete para manter ticket visível no Kanban
                    io.of(String(companyId))
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    console.log("🔴 KANBAN FIX: Ticket encerrado na transferência - emitindo UPDATE ao invés de DELETE");
                    return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(ticket.contact, ticket.whatsapp, 1, ticket.companyId, queueId_1, userId, null, ticket.channel, false, false, settings, isTransfered)];
                case 39:
                    newTicketTransfer = _m.sent();
                    return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                            ticketId: newTicketTransfer.id,
                            companyId: companyId,
                            whatsappId: ticket.whatsapp.id,
                            userId: userId
                        })];
                case 40:
                    _m.sent();
                    _m.label = 41;
                case 41:
                    if (!!(0, lodash_1.isNil)(msgTransfer)) return [3 /*break*/, 43];
                    messageData = {
                        wid: "PVT".concat(newTicketTransfer.updatedAt
                            .toString()
                            .replace(" ", "")),
                        ticketId: newTicketTransfer.id,
                        contactId: undefined,
                        body: msgTransfer,
                        fromMe: true,
                        mediaType: "extendedTextMessage",
                        read: true,
                        quotedMsgId: null,
                        ack: 2,
                        remoteJid: (_h = newTicketTransfer.contact) === null || _h === void 0 ? void 0 : _h.remoteJid,
                        participant: null,
                        dataJson: null,
                        ticketTrakingId: null,
                        isPrivate: true
                    };
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: messageData,
                            companyId: ticket.companyId
                        })];
                case 42:
                    _m.sent();
                    _m.label = 43;
                case 43:
                    newTicketUpdateData = {
                        queueId: queueId_1,
                        status: status_1
                    };
                    if (userId !== undefined && userId !== null) {
                        newTicketUpdateData.userId = userId;
                    }
                    return [4 /*yield*/, newTicketTransfer.update(newTicketUpdateData)];
                case 44:
                    _m.sent();
                    return [4 /*yield*/, newTicketTransfer.reload()];
                case 45:
                    _m.sent();
                    if (!(settings.sendMsgTransfTicket === "enabled")) return [3 /*break*/, 49];
                    if (!((oldQueueId !== queueId_1 || oldUserId !== userId) &&
                        !(0, lodash_1.isNil)(oldQueueId) &&
                        !(0, lodash_1.isNil)(queueId_1) &&
                        !(0, lodash_1.isNil)(queueId_1) &&
                        ticket.whatsapp.status === "CONNECTED")) return [3 /*break*/, 49];
                    return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 46:
                    wbot = _m.sent();
                    msgtxt = (0, Mustache_1["default"])("\u200E ".concat(settings.transferMessage.replace("${queue.name}", queue === null || queue === void 0 ? void 0 : queue.name)), ticket);
                    return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                            text: msgtxt
                        })];
                case 47:
                    queueChangedMessage = _m.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(queueChangedMessage, ticket, ticket.contact, ticketTraking)];
                case 48:
                    _m.sent();
                    _m.label = 49;
                case 49:
                    if (!(oldUserId !== userId &&
                        oldQueueId === queueId_1 &&
                        !(0, lodash_1.isNil)(oldUserId) &&
                        !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 51];
                    //transferiu o atendimento para fila
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 50:
                    //transferiu o atendimento para fila
                    _m.sent();
                    return [3 /*break*/, 59];
                case 51:
                    if (!(oldUserId !== userId &&
                        oldQueueId === queueId_1 &&
                        !(0, lodash_1.isNil)(oldUserId) &&
                        !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 54];
                    //transferiu o atendimento para atendente na mesma fila
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 52:
                    //transferiu o atendimento para atendente na mesma fila
                    _m.sent();
                    //recebeu atendimento
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: oldQueueId,
                            ticketId: newTicketTransfer.id,
                            type: "receivedTransfer"
                        })];
                case 53:
                    //recebeu atendimento
                    _m.sent();
                    return [3 /*break*/, 59];
                case 54:
                    if (!(oldUserId !== userId &&
                        oldQueueId !== queueId_1 &&
                        !(0, lodash_1.isNil)(oldUserId) &&
                        !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 57];
                    //transferiu o atendimento para fila e atendente
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 55:
                    //transferiu o atendimento para fila e atendente
                    _m.sent();
                    //recebeu atendimento
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: queueId_1,
                            ticketId: newTicketTransfer.id,
                            type: "receivedTransfer"
                        })];
                case 56:
                    //recebeu atendimento
                    _m.sent();
                    return [3 /*break*/, 59];
                case 57:
                    if (!(oldUserId !== undefined &&
                        (0, lodash_1.isNil)(userId) &&
                        oldQueueId !== queueId_1 &&
                        !(0, lodash_1.isNil)(queueId_1))) return [3 /*break*/, 59];
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 58:
                    _m.sent();
                    _m.label = 59;
                case 59:
                    if (!(newTicketTransfer.status !== oldStatus ||
                        ((_j = newTicketTransfer.user) === null || _j === void 0 ? void 0 : _j.id) !== oldUserId)) return [3 /*break*/, 61];
                    return [4 /*yield*/, ticketTraking.update({
                            userId: newTicketTransfer.userId
                        })];
                case 60:
                    _m.sent();
                    // console.log("emitiu socket 497", ticket.id, newTicketTransfer.id)
                    io.of(String(companyId))
                        // .to(oldStatus)
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "delete",
                        ticketId: newTicketTransfer.id
                    });
                    _m.label = 61;
                case 61:
                    io.of(String(companyId))
                        // .to(newTicketTransfer.status)
                        // .to("notification")
                        // .to(newTicketTransfer.id.toString())
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "update",
                        ticket: newTicketTransfer
                    });
                    return [2 /*return*/, { ticket: newTicketTransfer, oldStatus: oldStatus, oldUserId: oldUserId }];
                case 62:
                    if (!(settings.sendMsgTransfTicket === "enabled")) return [3 /*break*/, 66];
                    if (!(oldQueueId !== queueId_1 ||
                        (oldUserId !== userId &&
                            !(0, lodash_1.isNil)(oldQueueId) &&
                            !(0, lodash_1.isNil)(queueId_1) &&
                            ticket.whatsapp.status === "CONNECTED"))) return [3 /*break*/, 66];
                    return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 63:
                    wbot = _m.sent();
                    msgtxt = (0, Mustache_1["default"])("\u200E ".concat(settings.transferMessage.replace("${queue.name}", queue === null || queue === void 0 ? void 0 : queue.name)), ticket);
                    return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                            text: msgtxt
                        })];
                case 64:
                    queueChangedMessage = _m.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(queueChangedMessage, ticket, ticket.contact, ticketTraking)];
                case 65:
                    _m.sent();
                    _m.label = 66;
                case 66:
                    if (!!(0, lodash_1.isNil)(msgTransfer)) return [3 /*break*/, 68];
                    messageData = {
                        wid: "PVT".concat(ticket.updatedAt.toString().replace(" ", "")),
                        ticketId: ticket.id,
                        contactId: undefined,
                        body: msgTransfer,
                        fromMe: true,
                        mediaType: "extendedTextMessage",
                        read: true,
                        quotedMsgId: null,
                        ack: 2,
                        remoteJid: (_k = ticket.contact) === null || _k === void 0 ? void 0 : _k.remoteJid,
                        participant: null,
                        dataJson: null,
                        ticketTrakingId: null,
                        isPrivate: true
                    };
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: messageData,
                            companyId: ticket.companyId
                        })];
                case 67:
                    _m.sent();
                    _m.label = 68;
                case 68:
                    if (!(oldUserId !== userId &&
                        oldQueueId === queueId_1 &&
                        !(0, lodash_1.isNil)(oldUserId) &&
                        !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 70];
                    //transferiu o atendimento para fila
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 69:
                    //transferiu o atendimento para fila
                    _m.sent();
                    return [3 /*break*/, 78];
                case 70:
                    if (!(oldUserId !== userId &&
                        oldQueueId === queueId_1 &&
                        !(0, lodash_1.isNil)(oldUserId) &&
                        !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 73];
                    //transferiu o atendimento para atendente na mesma fila
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 71:
                    //transferiu o atendimento para atendente na mesma fila
                    _m.sent();
                    //recebeu atendimento
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: oldQueueId,
                            ticketId: ticket.id,
                            type: "receivedTransfer"
                        })];
                case 72:
                    //recebeu atendimento
                    _m.sent();
                    return [3 /*break*/, 78];
                case 73:
                    if (!(oldUserId !== userId &&
                        oldQueueId !== queueId_1 &&
                        !(0, lodash_1.isNil)(oldUserId) &&
                        !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 76];
                    //transferiu o atendimento para fila e atendente
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 74:
                    //transferiu o atendimento para fila e atendente
                    _m.sent();
                    //recebeu atendimento
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: queueId_1,
                            ticketId: ticket.id,
                            type: "receivedTransfer"
                        })];
                case 75:
                    //recebeu atendimento
                    _m.sent();
                    return [3 /*break*/, 78];
                case 76:
                    if (!(oldUserId !== undefined &&
                        (0, lodash_1.isNil)(userId) &&
                        oldQueueId !== queueId_1 &&
                        !(0, lodash_1.isNil)(queueId_1))) return [3 /*break*/, 78];
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            queueId: oldQueueId,
                            ticketId: ticketId,
                            type: "transfered"
                        })];
                case 77:
                    _m.sent();
                    _m.label = 78;
                case 78:
                    status_1 = queue && queue.closeTicket ? "closed" : status_1;
                    isClosingTicketFinal = status_1 === "closed";
                    nextQueueId = isClosingTicketFinal
                        ? null
                        : queueId_1 !== undefined
                            ? queueId_1
                            : ticket.queueId;
                    nextUserId = isClosingTicketFinal
                        ? null
                        : userId !== undefined
                            ? userId
                            : ticket.userId;
                    isOnlyQueueOrUserChange = status_1 === ticket.status &&
                        !lastMessage &&
                        oldQueueId !== nextQueueId;
                    ticketUpdateData = {
                        status: status_1,
                        queueId: nextQueueId,
                        isBot: isBot,
                        queueOptionId: queueOptionId,
                        amountUsedBotQueues: status_1 === "closed"
                            ? 0
                            : amountUsedBotQueues
                                ? amountUsedBotQueues
                                : ticket.amountUsedBotQueues,
                        lastMessage: lastMessage ? lastMessage : ticket.lastMessage,
                        useIntegration: useIntegration,
                        integrationId: integrationId,
                        typebotSessionId: !useIntegration ? null : ticket.typebotSessionId,
                        typebotStatus: useIntegration,
                        unreadMessages: unreadMessages,
                        leadValue: leadValue !== undefined ? leadValue : ticket.leadValue
                    };
                    if (nextUserId !== undefined) {
                        ticketUpdateData.userId = nextUserId;
                    }
                    // **ATUALIZAR CONEXÃO WHATSAPP SE FORNECIDA**
                    if (whatsappId !== undefined && whatsappId !== null) {
                        ticketUpdateData.whatsappId = whatsappId;
                    }
                    return [4 /*yield*/, ticket.update(ticketUpdateData, {
                            // Não atualiza updatedAt se for apenas mudança de fila/usuário
                            silent: isOnlyQueueOrUserChange
                        })];
                case 79:
                    _m.sent();
                    ticketTraking.queuedAt = (0, moment_1["default"])().toDate();
                    ticketTraking.queueId = queueId_1;
                    return [4 /*yield*/, ticket.reload()];
                case 80:
                    _m.sent();
                    if (!(status_1 === "pending")) return [3 /*break*/, 83];
                    //ticket voltou para fila
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: oldUserId,
                            ticketId: ticketId,
                            type: "pending"
                        })];
                case 81:
                    //ticket voltou para fila
                    _m.sent();
                    return [4 /*yield*/, ticketTraking.update({
                            whatsappId: ticket.whatsappId,
                            startedAt: null,
                            userId: null
                        })];
                case 82:
                    _m.sent();
                    _m.label = 83;
                case 83:
                    if (!(status_1 === "open")) return [3 /*break*/, 87];
                    console.log("Ticket sendo aceito - mudando de", oldStatus, "para open");
                    return [4 /*yield*/, ticketTraking.update({
                            startedAt: (0, moment_1["default"])().toDate(),
                            ratingAt: null,
                            rated: false,
                            whatsappId: ticket.whatsappId,
                            userId: ticket.userId,
                            queueId: ticket.queueId
                        })];
                case 84:
                    _m.sent();
                    //loga inicio de atendimento
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: ticket.queueId,
                            ticketId: ticketId,
                            type: oldStatus === "pending" ? "open" : "reopen"
                        })];
                case 85:
                    //loga inicio de atendimento
                    _m.sent();
                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 86:
                    // Força reload completo do ticket com todas as associações
                    ticket = _m.sent();
                    _m.label = 87;
                case 87: return [4 /*yield*/, ticketTraking.save()];
                case 88:
                    _m.sent();
                    isClosingTicket = ticket.status === "closed" && oldStatus !== "closed";
                    if (isClosingTicket) {
                        console.log("\uD83D\uDD34 KANBAN FIX: Ticket ".concat(ticket.id, " sendo ENCERRADO (").concat(oldStatus, " -> closed) - N\u00C3O emitindo delete para manter no Kanban"));
                    }
                    if ((ticket.status !== oldStatus ||
                        ((_l = ticket.user) === null || _l === void 0 ? void 0 : _l.id) !== oldUserId ||
                        ticket.queueId !== oldQueueId) &&
                        !isClosingTicket) {
                        console.log("Emitindo delete para ticket ".concat(ticket.id, " - Status mudou de ").concat(oldStatus, " para ").concat(ticket.status));
                        // Emite delete para remover da aba antiga
                        io.of(String(companyId))
                            .emit("company-".concat(companyId, "-ticket"), {
                            action: "delete",
                            ticketId: ticket.id
                        });
                    }
                    console.log("Emitindo update para ticket ".concat(ticket.id, " - Status: ").concat(ticket.status, ", User: ").concat(ticket.userId));
                    // Emite update para adicionar na nova aba
                    io.of(String(companyId))
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    // Emite evento específico para mudança de status
                    if (oldStatus === "pending" && status_1 === "open") {
                        console.log("Ticket ".concat(ticket.id, " aceito - emitindo evento de aceita\u00E7\u00E3o"));
                        io.of(String(companyId))
                            .emit("company-".concat(companyId, "-ticket"), {
                            action: "accept",
                            ticketId: ticket.id,
                            ticket: ticket
                        });
                    }
                    return [2 /*return*/, { ticket: ticket, oldStatus: oldStatus, oldUserId: oldUserId }];
                case 89:
                    err_1 = _m.sent();
                    console.log("erro ao atualizar o ticket", ticketId, "ticketData", ticketData);
                    Sentry.captureException(err_1);
                    return [3 /*break*/, 90];
                case 90: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = UpdateTicketService;
