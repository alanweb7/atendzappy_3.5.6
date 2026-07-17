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
exports.handleMessage = exports.verifyQuotedMessage = exports.verifyMessageMedia = exports.verifyMessageFace = void 0;
var fs_1 = require("fs");
var fs_2 = __importDefault(require("fs"));
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var path_1 = require("path");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var CreateOrUpdateContactService_1 = __importDefault(require("../ContactServices/CreateOrUpdateContactService"));
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
var graphAPI_1 = require("./graphAPI");
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var Chatbot_1 = __importDefault(require("../../models/Chatbot"));
var Message_1 = __importDefault(require("../../models/Message"));
var ChatbotListenerFacebook_1 = require("../WbotServices/ChatbotListenerFacebook");
var lodash_1 = require("lodash");
var FindOrCreateATicketTrakingService_1 = __importDefault(require("../TicketServices/FindOrCreateATicketTrakingService"));
var wbotMessageListener_1 = require("../WbotServices/wbotMessageListener");
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var sendFacebookMessage_1 = __importDefault(require("./sendFacebookMessage"));
var async_mutex_1 = require("async-mutex");
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var ShowQueueIntegrationService_1 = __importDefault(require("../QueueIntegrationServices/ShowQueueIntegrationService"));
var FlowBuilder_1 = require("../../models/FlowBuilder");
var date_fns_1 = require("date-fns");
var ActionsWebhookFacebookService_1 = require("./WebhookFacebookServices/ActionsWebhookFacebookService");
var verifyContact = function (msgContact, token, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var contactData, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!msgContact)
                    return [2 /*return*/, null];
                contactData = {
                    name: (msgContact === null || msgContact === void 0 ? void 0 : msgContact.name) || "".concat(msgContact === null || msgContact === void 0 ? void 0 : msgContact.first_name, " ").concat(msgContact === null || msgContact === void 0 ? void 0 : msgContact.last_name),
                    number: msgContact.id,
                    profilePicUrl: msgContact.profile_pic,
                    isGroup: false,
                    companyId: companyId,
                    channel: token.channel,
                    whatsappId: token.id
                };
                return [4 /*yield*/, (0, CreateOrUpdateContactService_1["default"])(contactData)];
            case 1:
                contact = _a.sent();
                return [2 /*return*/, contact];
        }
    });
}); };
var verifyMessageFace = function (msg, body, ticket, contact, fromMe) {
    if (fromMe === void 0) { fromMe = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var safeMsg, quotedMsg, wid, isEcho, textBody, messageData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    safeMsg = msg || {};
                    return [4 /*yield*/, (0, exports.verifyQuotedMessage)(safeMsg)];
                case 1:
                    quotedMsg = _b.sent();
                    wid = safeMsg.mid || safeMsg.message_id || "".concat(ticket.id, "-").concat(Date.now());
                    isEcho = (_a = safeMsg.is_echo) !== null && _a !== void 0 ? _a : false;
                    textBody = safeMsg.text || body;
                    messageData = {
                        wid: wid,
                        ticketId: ticket.id,
                        contactId: fromMe ? undefined : isEcho ? undefined : contact.id,
                        body: textBody,
                        fromMe: fromMe ? fromMe : isEcho ? true : false,
                        read: fromMe ? fromMe : isEcho,
                        quotedMsgId: quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id,
                        ack: 3,
                        dataJson: JSON.stringify(safeMsg),
                        channel: ticket.channel
                    };
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: ticket.companyId })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.verifyMessageFace = verifyMessageFace;
var verifyMessageMedia = function (msg, ticket, contact, fromMe) {
    if (fromMe === void 0) { fromMe = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, fileTypeFromBuffer, type, fileName, folder, safeMsg, wid, isEcho, messageData;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(msg.attachments[0].payload.url, {
                        responseType: "arraybuffer"
                    })];
                case 1:
                    data = (_d.sent()).data;
                    return [4 /*yield*/, eval('import("file-type")')];
                case 2:
                    fileTypeFromBuffer = (_d.sent()).fileTypeFromBuffer;
                    return [4 /*yield*/, fileTypeFromBuffer(data)];
                case 3:
                    type = _d.sent();
                    fileName = "".concat(new Date().getTime(), ".").concat(type.ext);
                    folder = "public/company".concat(ticket.companyId);
                    if (!fs_2["default"].existsSync(folder)) {
                        fs_2["default"].mkdirSync(folder);
                        fs_2["default"].chmodSync(folder, 511);
                    }
                    (0, fs_1.writeFileSync)((0, path_1.join)(__dirname, "..", "..", "..", folder, fileName), data, "base64");
                    safeMsg = msg || {};
                    wid = safeMsg.mid || safeMsg.message_id || "".concat(ticket.id, "-").concat(Date.now());
                    isEcho = (_a = safeMsg.is_echo) !== null && _a !== void 0 ? _a : false;
                    messageData = {
                        wid: wid,
                        ticketId: ticket.id,
                        contactId: fromMe ? undefined : isEcho ? undefined : contact.id,
                        body: safeMsg.text || fileName,
                        fromMe: fromMe ? fromMe : isEcho ? true : false,
                        mediaType: (_c = (_b = safeMsg.attachments) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.type,
                        mediaUrl: fileName,
                        read: fromMe ? fromMe : isEcho,
                        quotedMsgId: null,
                        ack: 3,
                        dataJson: JSON.stringify(safeMsg),
                        channel: ticket.channel
                    };
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: ticket.companyId })];
                case 4:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.verifyMessageMedia = verifyMessageMedia;
var verifyQuotedMessage = function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var quoted, quotedMsg;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!msg)
                    return [2 /*return*/, null];
                quoted = (_a = msg === null || msg === void 0 ? void 0 : msg.reply_to) === null || _a === void 0 ? void 0 : _a.mid;
                if (!quoted)
                    return [2 /*return*/, null];
                return [4 /*yield*/, Message_1["default"].findOne({
                        where: { wid: quoted }
                    })];
            case 1:
                quotedMsg = _b.sent();
                if (!quotedMsg)
                    return [2 /*return*/, null];
                return [2 /*return*/, quotedMsg];
        }
    });
}); };
exports.verifyQuotedMessage = verifyQuotedMessage;
var flowBuilderQueue = function (ticket, message, getSession, companyId, contact, isFirstMsg) { return __awaiter(void 0, void 0, void 0, function () {
    var flow, mountDataContact, nodes, connections;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                    where: {
                        id: ticket.flowStopped
                    }
                })];
            case 1:
                flow = _a.sent();
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                console.log("======================================");
                console.log("|         flowBuilderQueue           |");
                console.log("======================================");
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                if (!ticket.lastFlowId) {
                    return [2 /*return*/];
                }
                if (!ticket.flowWebhook) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ActionsWebhookFacebookService_1.ActionsWebhookFacebookService)(getSession, parseInt(ticket.flowStopped), ticket.companyId, nodes, connections, ticket.lastFlowId, null, "", "", message.text, ticket.id, mountDataContact)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var flowbuilderIntegration = function (ticket, companyId, isFirstMsg, getSession, contact, message) { return __awaiter(void 0, void 0, void 0, function () {
    var flow, nodes, connections, mountDataContact, dateTicket, dateNow, diferencaEmMilissegundos, seisHorasEmMilissegundos, flow, nodes, connections, mountDataContact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("======================================");
                console.log("|      flowbuilderIntegration        |");
                console.log("======================================");
                return [4 /*yield*/, ticket.update({
                        lastMessage: message.text
                    })];
            case 1:
                _a.sent();
                if (!!isFirstMsg) return [3 /*break*/, 4];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: getSession.flowIdWelcome
                        }
                    })];
            case 2:
                flow = _a.sent();
                if (!flow) return [3 /*break*/, 4];
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                return [4 /*yield*/, (0, ActionsWebhookFacebookService_1.ActionsWebhookFacebookService)(getSession, getSession.flowIdWelcome, ticket.companyId, nodes, connections, flow.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContact)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                dateTicket = new Date(isFirstMsg ? isFirstMsg.updatedAt : "");
                dateNow = new Date();
                diferencaEmMilissegundos = Math.abs((0, date_fns_1.differenceInMilliseconds)(dateTicket, dateNow));
                seisHorasEmMilissegundos = 2 * 1000;
                if (!(!ticket.fromMe &&
                    isFirstMsg &&
                    diferencaEmMilissegundos >= seisHorasEmMilissegundos)) return [3 /*break*/, 7];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: getSession.flowIdNotPhrase
                        }
                    })];
            case 5:
                flow = _a.sent();
                if (!flow) return [3 /*break*/, 7];
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                return [4 /*yield*/, (0, ActionsWebhookFacebookService_1.ActionsWebhookFacebookService)(getSession, getSession.flowIdNotPhrase, ticket.companyId, nodes, connections, flow.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContact)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var handleMessage = function (token, webhookEvent, channel, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var msgContact, senderPsid, recipientPsid, message, fromMe, bodyMessage, contact_1, unreadCount_1, getSession_1, settings_1, isFirstMsg, mutex, ticket_1, bodyRollbackTag, bodyNextTag, rollbackTag, nextTag, ticketTag, tag, ticketTraking, bodyErrorRating, sentMessage, bodyRatingMessage, msg, enableLGPD, choosenOption, sentMessage, bodyMessageLGPD, sentMessage, bodyLink, sentMessage, bodyBot, sentMessageBot, e_1, flow, isMenu, integrations, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 82, , 83]);
                console.log("[FACEBOOK] Processando webhook event:", JSON.stringify(webhookEvent, null, 2));
                if (!webhookEvent.message) return [3 /*break*/, 81];
                msgContact = void 0;
                senderPsid = webhookEvent.sender.id;
                recipientPsid = webhookEvent.recipient.id;
                message = webhookEvent.message;
                fromMe = message.is_echo;
                bodyMessage = message.text;
                console.log("[FACEBOOK] Mensagem recebida - fromMe: ".concat(fromMe, ", bodyMessage: \"").concat(bodyMessage, "\""));
                if (!fromMe) return [3 /*break*/, 2];
                console.log("[FACEBOOK] Mensagem de echo (sistema) - bodyMessage: \"".concat(bodyMessage, "\""));
                return [4 /*yield*/, (0, graphAPI_1.profilePsid)(recipientPsid, token.facebookUserToken)];
            case 1:
                // Apenas logar, não bloquear
                msgContact = _d.sent();
                return [3 /*break*/, 4];
            case 2:
                console.log("[FACEBOOK] Mensagem de usu\u00E1rio - senderPsid: ".concat(senderPsid));
                return [4 /*yield*/, (0, graphAPI_1.profilePsid)(senderPsid, token.facebookUserToken)];
            case 3:
                msgContact = _d.sent();
                _d.label = 4;
            case 4: return [4 /*yield*/, verifyContact(msgContact, token, companyId)];
            case 5:
                contact_1 = _d.sent();
                unreadCount_1 = fromMe ? 0 : 1;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            facebookPageUserId: token.facebookPageUserId
                        },
                        include: [
                            {
                                model: Queue_1["default"],
                                as: "queues",
                                attributes: ["id", "name", "color", "greetingMessage"],
                                include: [
                                    {
                                        model: Chatbot_1["default"],
                                        as: "chatbots",
                                        attributes: ["id", "name", "greetingMessage"]
                                    }
                                ]
                            }
                        ],
                        order: [
                            ["queues", "id", "ASC"],
                            ["queues", "chatbots", "id", "ASC"]
                        ]
                    })];
            case 6:
                getSession_1 = _d.sent();
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 7:
                settings_1 = _d.sent();
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: {
                            contactId: contact_1.id,
                            companyId: companyId
                        },
                        order: [["id", "DESC"]]
                    })];
            case 8:
                isFirstMsg = _d.sent();
                mutex = new async_mutex_1.Mutex();
                return [4 /*yield*/, mutex.runExclusive(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var createTicket;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(contact_1, getSession_1, unreadCount_1, companyId, 0, 0, null, channel, null, false, settings_1)];
                                case 1:
                                    createTicket = _a.sent();
                                    return [2 /*return*/, createTicket];
                            }
                        });
                    }); })];
            case 9:
                ticket_1 = _d.sent();
                bodyRollbackTag = "";
                bodyNextTag = "";
                rollbackTag = void 0;
                nextTag = void 0;
                ticketTag = undefined;
                if (!((_b = (_a = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.company) === null || _a === void 0 ? void 0 : _a.plan) === null || _b === void 0 ? void 0 : _b.useKanban)) return [3 /*break*/, 15];
                return [4 /*yield*/, TicketTag_1["default"].findOne({
                        where: {
                            ticketId: ticket_1.id
                        }
                    })];
            case 10:
                ticketTag = _d.sent();
                if (!ticketTag) return [3 /*break*/, 15];
                return [4 /*yield*/, Tag_1["default"].findByPk(ticketTag.tagId)];
            case 11:
                tag = _d.sent();
                if (!tag.nextLaneId) return [3 /*break*/, 13];
                return [4 /*yield*/, Tag_1["default"].findByPk(tag.nextLaneId)];
            case 12:
                nextTag = _d.sent();
                bodyNextTag = nextTag.greetingMessageLane;
                _d.label = 13;
            case 13:
                if (!tag.rollbackLaneId) return [3 /*break*/, 15];
                return [4 /*yield*/, Tag_1["default"].findByPk(tag.rollbackLaneId)];
            case 14:
                rollbackTag = _d.sent();
                bodyRollbackTag = rollbackTag.greetingMessageLane;
                _d.label = 15;
            case 15: return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                    ticketId: ticket_1.id,
                    companyId: companyId,
                    whatsappId: getSession_1 === null || getSession_1 === void 0 ? void 0 : getSession_1.id,
                    userId: ticket_1.userId
                })];
            case 16:
                ticketTraking = _d.sent();
                if ((getSession_1.farewellMessage &&
                    (0, Mustache_1["default"])(getSession_1.farewellMessage, ticket_1) === message.text) ||
                    (getSession_1.ratingMessage &&
                        (0, Mustache_1["default"])(getSession_1.ratingMessage, ticket_1) === message.text))
                    return [2 /*return*/];
                if (!(rollbackTag &&
                    (0, Mustache_1["default"])(bodyNextTag, ticket_1) !== bodyMessage &&
                    (0, Mustache_1["default"])(bodyRollbackTag, ticket_1) !== bodyMessage)) return [3 /*break*/, 19];
                return [4 /*yield*/, TicketTag_1["default"].destroy({
                        where: { ticketId: ticket_1.id, tagId: ticketTag.tagId }
                    })];
            case 17:
                _d.sent();
                return [4 /*yield*/, TicketTag_1["default"].create({ ticketId: ticket_1.id, tagId: rollbackTag.id })];
            case 18:
                _d.sent();
                _d.label = 19;
            case 19: return [4 /*yield*/, ticket_1.update({
                    lastMessage: message.text
                })];
            case 20:
                _d.sent();
                _d.label = 21;
            case 21:
                _d.trys.push([21, 61, , 62]);
                if (!!fromMe) return [3 /*break*/, 60];
                if (!(ticket_1.status === "nps" &&
                    ticketTraking !== null &&
                    (0, wbotMessageListener_1.verifyRating)(ticketTraking))) return [3 /*break*/, 30];
                if (!!isNaN(parseFloat(bodyMessage))) return [3 /*break*/, 23];
                (0, wbotMessageListener_1.handleRating)(parseFloat(bodyMessage), ticket_1, ticketTraking);
                return [4 /*yield*/, ticketTraking.update({
                        ratingAt: (0, moment_1["default"])().toDate(),
                        finishedAt: (0, moment_1["default"])().toDate(),
                        rated: true
                    })];
            case 22:
                _d.sent();
                return [2 /*return*/];
            case 23:
                if (!(ticket_1.amountUsedBotQueuesNPS < getSession_1.maxUseBotQueuesNPS)) return [3 /*break*/, 29];
                bodyErrorRating = "\u200EOp\u00E7\u00E3o inv\u00E1lida, tente novamente.\n";
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact_1.number, bodyErrorRating, getSession_1.facebookUserToken)];
            case 24:
                sentMessage = _d.sent();
                return [4 /*yield*/, (0, exports.verifyMessageFace)(sentMessage, bodyErrorRating, ticket_1, contact_1)];
            case 25:
                _d.sent();
                bodyRatingMessage = "\u200E".concat(getSession_1.ratingMessage, "\n");
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact_1.number, bodyRatingMessage, getSession_1.facebookUserToken)];
            case 26:
                msg = _d.sent();
                return [4 /*yield*/, (0, exports.verifyMessageFace)(sentMessage, bodyRatingMessage, ticket_1, contact_1)];
            case 27:
                _d.sent();
                return [4 /*yield*/, ticket_1.update({
                        amountUsedBotQueuesNPS: ticket_1.amountUsedBotQueuesNPS + 1
                    })];
            case 28:
                _d.sent();
                _d.label = 29;
            case 29: return [2 /*return*/];
            case 30:
                enableLGPD = settings_1.enableLGPD === "enabled";
                if (!(enableLGPD && ticket_1.status === "lgpd")) return [3 /*break*/, 60];
                if (!((0, lodash_1.isNil)(ticket_1.lgpdAcceptedAt) &&
                    !(0, lodash_1.isNil)(ticket_1.lgpdSendMessageAt))) return [3 /*break*/, 44];
                choosenOption = null;
                if (!isNaN(parseFloat(bodyMessage))) {
                    choosenOption = parseFloat(bodyMessage);
                }
                if (!(!Number.isNaN(choosenOption) &&
                    Number.isInteger(choosenOption) &&
                    !(0, lodash_1.isNull)(choosenOption) &&
                    choosenOption > 0)) return [3 /*break*/, 42];
                if (!(choosenOption === 1)) return [3 /*break*/, 33];
                return [4 /*yield*/, contact_1.update({
                        lgpdAcceptedAt: (0, moment_1["default"])().toDate()
                    })];
            case 31:
                _d.sent();
                return [4 /*yield*/, ticket_1.update({
                        lgpdAcceptedAt: (0, moment_1["default"])().toDate(),
                        amountUsedBotQueues: 0
                    })];
            case 32:
                _d.sent();
                return [3 /*break*/, 41];
            case 33:
                if (!(choosenOption === 2)) return [3 /*break*/, 39];
                if (!(getSession_1.complationMessage !== "" &&
                    getSession_1.complationMessage !== undefined)) return [3 /*break*/, 36];
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact_1.number, "\u200E".concat(getSession_1.complationMessage), getSession_1.facebookUserToken)];
            case 34:
                sentMessage = _d.sent();
                return [4 /*yield*/, (0, exports.verifyMessageFace)(sentMessage, "\u200E".concat(getSession_1.complationMessage), ticket_1, contact_1)];
            case 35:
                _d.sent();
                _d.label = 36;
            case 36: return [4 /*yield*/, ticket_1.update({
                    status: "closed",
                    amountUsedBotQueues: 0
                })];
            case 37:
                _d.sent();
                return [4 /*yield*/, ticketTraking.destroy];
            case 38:
                _d.sent();
                return [2 /*return*/];
            case 39:
                if (!(ticket_1.amountUsedBotQueues < getSession_1.maxUseBotQueues)) return [3 /*break*/, 41];
                return [4 /*yield*/, ticket_1.update({
                        amountUsedBotQueues: ticket_1.amountUsedBotQueues + 1,
                        lgpdSendMessageAt: null
                    })];
            case 40:
                _d.sent();
                _d.label = 41;
            case 41: return [3 /*break*/, 44];
            case 42:
                if (!(ticket_1.amountUsedBotQueues < getSession_1.maxUseBotQueues)) return [3 /*break*/, 44];
                return [4 /*yield*/, ticket_1.update({
                        amountUsedBotQueues: ticket_1.amountUsedBotQueues + 1,
                        lgpdSendMessageAt: null
                    })];
            case 43:
                _d.sent();
                _d.label = 44;
            case 44:
                if (!((contact_1.lgpdAcceptedAt === null ||
                    (settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.lgpdConsent) === "enabled") &&
                    !contact_1.isGroup &&
                    (0, lodash_1.isNil)(ticket_1.lgpdSendMessageAt) &&
                    ticket_1.amountUsedBotQueues <= getSession_1.maxUseBotQueues &&
                    !(0, lodash_1.isNil)(settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.lgpdMessage))) return [3 /*break*/, 59];
                if (!message.attachments) return [3 /*break*/, 46];
                return [4 /*yield*/, (0, exports.verifyMessageMedia)(message, ticket_1, contact_1)];
            case 45:
                _d.sent();
                return [3 /*break*/, 48];
            case 46: return [4 /*yield*/, (0, exports.verifyMessageFace)(message, message.text, ticket_1, contact_1)];
            case 47:
                _d.sent();
                _d.label = 48;
            case 48:
                if (!(!(0, lodash_1.isNil)(settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.lgpdMessage) &&
                    settings_1.lgpdMessage !== "")) return [3 /*break*/, 51];
                bodyMessageLGPD = (0, Mustache_1["default"])("\u200E".concat(settings_1.lgpdMessage), ticket_1);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact_1.number, bodyMessageLGPD, getSession_1.facebookUserToken)];
            case 49:
                sentMessage = _d.sent();
                return [4 /*yield*/, (0, exports.verifyMessageFace)(sentMessage, bodyMessageLGPD, ticket_1, contact_1)];
            case 50:
                _d.sent();
                _d.label = 51;
            case 51:
                if (!(!(0, lodash_1.isNil)(settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.lgpdLink) && (settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.lgpdLink) !== "")) return [3 /*break*/, 54];
                bodyLink = (0, Mustache_1["default"])("\u200E".concat(settings_1.lgpdLink), ticket_1);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact_1.number, bodyLink, getSession_1.facebookUserToken)];
            case 52:
                sentMessage = _d.sent();
                return [4 /*yield*/, (0, exports.verifyMessageFace)(sentMessage, bodyLink, ticket_1, contact_1)];
            case 53:
                _d.sent();
                _d.label = 54;
            case 54:
                bodyBot = (0, Mustache_1["default"])("\u200EEstou ciente sobre o tratamento dos meus dados pessoais. \n\n[1] Sim\n[2] N\u00E3o", ticket_1);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact_1.number, bodyBot, getSession_1.facebookUserToken)];
            case 55:
                sentMessageBot = _d.sent();
                return [4 /*yield*/, (0, exports.verifyMessageFace)(sentMessageBot, bodyBot, ticket_1, contact_1)];
            case 56:
                _d.sent();
                return [4 /*yield*/, ticket_1.update({
                        lgpdSendMessageAt: (0, moment_1["default"])().toDate(),
                        amountUsedBotQueues: ticket_1.amountUsedBotQueues + 1
                    })];
            case 57:
                _d.sent();
                return [4 /*yield*/, ticket_1.reload()];
            case 58:
                _d.sent();
                return [2 /*return*/];
            case 59:
                if (!(0, lodash_1.isNil)(ticket_1.lgpdSendMessageAt) &&
                    (0, lodash_1.isNil)(ticket_1.lgpdAcceptedAt))
                    return [2 /*return*/];
                _d.label = 60;
            case 60: return [3 /*break*/, 62];
            case 61:
                e_1 = _d.sent();
                throw new Error(e_1);
            case 62:
                if (!message.attachments) return [3 /*break*/, 64];
                return [4 /*yield*/, (0, exports.verifyMessageMedia)(message, ticket_1, contact_1)];
            case 63:
                _d.sent();
                return [3 /*break*/, 66];
            case 64: return [4 /*yield*/, (0, exports.verifyMessageFace)(message, message.text, ticket_1, contact_1)];
            case 65:
                _d.sent();
                _d.label = 66;
            case 66: return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                    where: {
                        id: ticket_1.flowStopped
                    }
                })];
            case 67:
                flow = _d.sent();
                isMenu = false;
                if (flow) {
                    isMenu =
                        ((_c = flow.flow["nodes"].find(function (node) { return node.id === ticket_1.lastFlowId; })) === null || _c === void 0 ? void 0 : _c.type) === "menu";
                }
                console.log({ ticket: ticket_1 });
                if (!(!ticket_1.fromMe && isMenu && !isNaN(message.text))) return [3 /*break*/, 70];
                console.log("[FACEBOOK] Processando menu - isMenu: ".concat(isMenu, ", message.text: \"").concat(message.text, "\""));
                return [4 /*yield*/, ticket_1.update({
                        queueId: ticket_1.queueId ? ticket_1.queueId : null
                    })];
            case 68:
                _d.sent();
                return [4 /*yield*/, flowBuilderQueue(ticket_1, message, getSession_1, companyId, contact_1, isFirstMsg)];
            case 69:
                _d.sent();
                _d.label = 70;
            case 70:
                // Log detalhado das condições de integração
                console.log("[FACEBOOK] Verificando condi\u00E7\u00F5es de integra\u00E7\u00E3o:\n        - ticket.imported: ".concat(ticket_1.imported, "\n        - fromMe: ").concat(fromMe, "\n        - ticket.isGroup: ").concat(ticket_1.isGroup, "\n        - ticket.queue: ").concat(ticket_1.queue, "\n        - ticket.user: ").concat(ticket_1.user, "\n        - isMenu: ").concat(isMenu, "\n        - ticket.dataWebhook: ").concat(JSON.stringify(ticket_1.dataWebhook), "\n        - getSession.integrationId: ").concat(getSession_1.integrationId, "\n        - ticket.useIntegration: ").concat(ticket_1.useIntegration, "\n      "));
                if (!(!ticket_1.imported &&
                    !fromMe &&
                    !ticket_1.isGroup &&
                    !ticket_1.queue &&
                    !ticket_1.user &&
                    !isMenu &&
                    (!ticket_1.dataWebhook || ticket_1.dataWebhook["status"] === "stopped") &&
                    !(0, lodash_1.isNil)(getSession_1.integrationId) &&
                    !ticket_1.useIntegration)) return [3 /*break*/, 76];
                console.log("[FACEBOOK] Condi\u00E7\u00F5es atendidas, processando integra\u00E7\u00E3o flowbuilder");
                return [4 /*yield*/, (0, ShowQueueIntegrationService_1["default"])(getSession_1.integrationId, companyId)];
            case 71:
                integrations = _d.sent();
                if (!(integrations.type === "flowbuilder")) return [3 /*break*/, 74];
                console.log("[FACEBOOK] Integra\u00E7\u00E3o flowbuilder detectada, atualizando ticket");
                return [4 /*yield*/, ticket_1.update({
                        queueId: ticket_1.queueId ? ticket_1.queueId : null,
                        dataWebhook: {
                            status: "process"
                        }
                    })];
            case 72:
                _d.sent();
                return [4 /*yield*/, flowbuilderIntegration(ticket_1, companyId, isFirstMsg, getSession_1, contact_1, message)];
            case 73:
                _d.sent();
                return [3 /*break*/, 75];
            case 74:
                console.log("[FACEBOOK] Integra\u00E7\u00E3o n\u00E3o \u00E9 flowbuilder: ".concat(integrations.type));
                _d.label = 75;
            case 75: return [3 /*break*/, 77];
            case 76:
                console.log("[FACEBOOK] Condi\u00E7\u00F5es N\u00C3O atendidas, ignorando integra\u00E7\u00E3o");
                _d.label = 77;
            case 77:
                if (!(!ticket_1.queue &&
                    !fromMe &&
                    !ticket_1.userId &&
                    getSession_1.queues.length >= 1)) return [3 /*break*/, 79];
                return [4 /*yield*/, verifyQueue(getSession_1, message, ticket_1, contact_1)];
            case 78:
                _d.sent();
                _d.label = 79;
            case 79:
                if (!(ticket_1.queue && ticket_1.queueId)) return [3 /*break*/, 81];
                if (!!ticket_1.user) return [3 /*break*/, 81];
                return [4 /*yield*/, (0, ChatbotListenerFacebook_1.sayChatbot)(ticket_1.queueId, getSession_1, ticket_1, contact_1, message)];
            case 80:
                _d.sent();
                _d.label = 81;
            case 81: return [2 /*return*/];
            case 82:
                error_1 = _d.sent();
                throw new Error(error_1);
            case 83: return [2 /*return*/];
        }
    });
}); };
exports.handleMessage = handleMessage;
var verifyQueue = function (getSession, msg, ticket, contact) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, queues, greetingMessage, firstQueue, chatbot, selectedOption, choosenQueue, options_1, body, sentMessage, body, sentMessage, options_2, body, sentMessage;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(getSession.id, ticket.companyId)];
            case 1:
                _a = _c.sent(), queues = _a.queues, greetingMessage = _a.greetingMessage;
                if (!(queues.length === 1)) return [3 /*break*/, 3];
                firstQueue = (0, lodash_1.head)(queues);
                chatbot = false;
                if (firstQueue === null || firstQueue === void 0 ? void 0 : firstQueue.chatbots) {
                    chatbot = ((_b = firstQueue === null || firstQueue === void 0 ? void 0 : firstQueue.chatbots) === null || _b === void 0 ? void 0 : _b.length) > 0;
                }
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { queueId: queues[0].id, isBot: chatbot },
                        ticketId: ticket.id,
                        companyId: ticket.companyId
                    })];
            case 2:
                _c.sent();
                return [2 /*return*/];
            case 3:
                selectedOption = "";
                if (!(ticket.status !== "lgpd")) return [3 /*break*/, 4];
                selectedOption = msg.text;
                return [3 /*break*/, 8];
            case 4:
                if (!!(0, lodash_1.isNil)(ticket.lgpdAcceptedAt)) return [3 /*break*/, 6];
                return [4 /*yield*/, ticket.update({
                        status: "pending"
                    })];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6: return [4 /*yield*/, ticket.reload()];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8:
                choosenQueue = queues[+selectedOption - 1];
                if (!choosenQueue) return [3 /*break*/, 14];
                console.log(585, "facebookMessageListener");
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { queueId: choosenQueue.id },
                        ticketId: ticket.id,
                        companyId: ticket.companyId
                    })];
            case 9:
                _c.sent();
                if (!(choosenQueue.chatbots.length > 0)) return [3 /*break*/, 11];
                options_1 = "";
                choosenQueue.chatbots.forEach(function (chatbot, index) {
                    options_1 += "[".concat(index + 1, "] - ").concat(chatbot.name, "\n");
                });
                body = "".concat(choosenQueue.greetingMessage, "\n\n").concat(options_1, "\n[#] Voltar para o menu principal");
                return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({
                        ticket: ticket,
                        body: body
                    })];
            case 10:
                sentMessage = _c.sent();
                _c.label = 11;
            case 11:
                if (!!choosenQueue.chatbots.length) return [3 /*break*/, 13];
                body = "".concat(choosenQueue.greetingMessage);
                return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({
                        ticket: ticket,
                        body: body
                    })];
            case 12:
                sentMessage = _c.sent();
                _c.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14:
                options_2 = "";
                queues.forEach(function (queue, index) {
                    options_2 += "[".concat(index + 1, "] - ").concat(queue.name, "\n");
                });
                body = "".concat(greetingMessage, "\n\n").concat(options_2);
                return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({
                        ticket: ticket,
                        body: body
                    })];
            case 15:
                sentMessage = _c.sent();
                _c.label = 16;
            case 16: return [2 /*return*/];
        }
    });
}); };
