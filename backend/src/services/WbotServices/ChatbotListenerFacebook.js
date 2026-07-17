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
exports.sayChatbot = exports.deleteAndCreateDialogStage = void 0;
var ShowDialogChatBotsServices_1 = __importDefault(require("../DialogChatBotsServices/ShowDialogChatBotsServices"));
var ShowQueueService_1 = __importDefault(require("../QueueService/ShowQueueService"));
var ShowChatBotServices_1 = __importDefault(require("../ChatBotServices/ShowChatBotServices"));
var DeleteDialogChatBotsServices_1 = __importDefault(require("../DialogChatBotsServices/DeleteDialogChatBotsServices"));
var ShowChatBotByChatbotIdServices_1 = __importDefault(require("../ChatBotServices/ShowChatBotByChatbotIdServices"));
var CreateDialogChatBotsServices_1 = __importDefault(require("../DialogChatBotsServices/CreateDialogChatBotsServices"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var User_1 = __importDefault(require("../../models/User"));
var graphAPI_1 = require("../FacebookServices/graphAPI");
var isNumeric = function (value) { return /^-?\d+$/.test(value); };
var deleteAndCreateDialogStage = function (contact, chatbotId, ticket) { return __awaiter(void 0, void 0, void 0, function () {
    var bots, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 8]);
                return [4 /*yield*/, (0, DeleteDialogChatBotsServices_1["default"])(contact.id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, ShowChatBotByChatbotIdServices_1["default"])(chatbotId)];
            case 2:
                bots = _a.sent();
                if (!!bots) return [3 /*break*/, 4];
                return [4 /*yield*/, ticket.update({ isBot: false })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, (0, CreateDialogChatBotsServices_1["default"])({
                    awaiting: 1,
                    contactId: contact.id,
                    chatbotId: chatbotId,
                    queueId: bots.queueId
                })];
            case 5: return [2 /*return*/, _a.sent()];
            case 6:
                error_1 = _a.sent();
                return [4 /*yield*/, ticket.update({ isBot: false })];
            case 7:
                _a.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deleteAndCreateDialogStage = deleteAndCreateDialogStage;
var sendMessage = function (wbot, contact, ticket, body) { return __awaiter(void 0, void 0, void 0, function () {
    var sentMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, graphAPI_1.sendText)(contact.number, (0, Mustache_1["default"])(body, ticket), ticket.whatsapp.facebookUserToken)];
            case 1:
                sentMessage = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var sendDialog = function (choosenQueue, contact, ticket) { return __awaiter(void 0, void 0, void 0, function () {
    var showChatBots, options_1, optionsBack_1, body_1, sendOption, body_2, send_1, options, optionsBack, body_3, sendOption, body, send;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, ShowChatBotServices_1["default"])(choosenQueue.id)];
            case 1:
                showChatBots = _a.sent();
                if (!showChatBots.options) return [3 /*break*/, 5];
                options_1 = "";
                showChatBots.options.forEach(function (option, index) {
                    options_1 += "*".concat(index + 1, "* - ").concat(option.name, "\n");
                });
                optionsBack_1 = options_1.length > 0
                    ? "".concat(options_1, "\n*#* Voltar para o menu principal")
                    : options_1;
                if (!(options_1.length > 0)) return [3 /*break*/, 3];
                body_1 = "\u200E".concat(choosenQueue.greetingMessage, "\n\n").concat(optionsBack_1);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact.number, (0, Mustache_1["default"])(body_1, ticket), ticket.whatsapp.facebookUserToken)];
            case 2:
                sendOption = _a.sent();
                return [2 /*return*/, sendOption];
            case 3:
                body_2 = "\u200E".concat(choosenQueue.greetingMessage);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact.number, (0, Mustache_1["default"])(body_2, ticket), ticket.whatsapp.facebookUserToken)];
            case 4:
                send_1 = _a.sent();
                return [2 /*return*/, send_1];
            case 5:
                options = "";
                showChatBots.options.forEach(function (option, index) {
                    options += "*".concat(index + 1, "* - ").concat(option.name, "\n");
                });
                optionsBack = options.length > 0
                    ? "".concat(options, "\n*#* Voltar para o menu principal")
                    : options;
                if (!(options.length > 0)) return [3 /*break*/, 7];
                body_3 = "\u200E".concat(choosenQueue.greetingMessage, "\n\n").concat(optionsBack);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact.number, (0, Mustache_1["default"])(body_3, ticket), ticket.whatsapp.facebookUserToken)];
            case 6:
                sendOption = _a.sent();
                return [2 /*return*/, sendOption];
            case 7:
                body = "\u200E".concat(choosenQueue.greetingMessage);
                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact.number, (0, Mustache_1["default"])(body, ticket), ticket.whatsapp.facebookUserToken)];
            case 8:
                send = _a.sent();
                return [2 /*return*/, send];
        }
    });
}); };
var backToMainMenu = function (wbot, contact, ticket) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, queues, greetingMessage, options, body, deleteDialog;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                    ticketData: { queueId: null },
                    ticketId: ticket.id,
                    companyId: ticket.companyId
                })];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(wbot.id, ticket.companyId)];
            case 2:
                _a = _b.sent(), queues = _a.queues, greetingMessage = _a.greetingMessage;
                options = "";
                queues.forEach(function (option, index) {
                    options += "*".concat(index + 1, "* - ").concat(option.name, "\n");
                });
                body = (0, Mustache_1["default"])("\u200E".concat(greetingMessage, "\n\n").concat(options), ticket);
                return [4 /*yield*/, sendMessage(wbot, contact, ticket, body)];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, DeleteDialogChatBotsServices_1["default"])(contact.id)];
            case 4:
                deleteDialog = _b.sent();
                return [2 /*return*/, deleteDialog];
        }
    });
}); };
var sayChatbot = function (queueId, wbot, ticket, contact, msg) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedOption, getStageBot, backTo, queue, selectedOption_1, choosenQueue, getUserByName, ticketUpdateAgent, send, selected, bots, choosenQueue, getUserByName, ticketUpdateAgent, send;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                selectedOption = msg.text;
                if (!queueId && selectedOption && msg.is_echo)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, ShowDialogChatBotsServices_1["default"])(contact.id)];
            case 1:
                getStageBot = _a.sent();
                if (!(selectedOption === "#")) return [3 /*break*/, 3];
                return [4 /*yield*/, backToMainMenu(wbot, contact, ticket)];
            case 2:
                backTo = _a.sent();
                return [2 /*return*/, backTo];
            case 3:
                if (!!getStageBot) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, ShowQueueService_1["default"])(queueId, ticket.companyId)];
            case 4:
                queue = _a.sent();
                selectedOption_1 = msg.text;
                choosenQueue = queue.chatbots[+selectedOption_1 - 1];
                if (!!(choosenQueue === null || choosenQueue === void 0 ? void 0 : choosenQueue.greetingMessage)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, DeleteDialogChatBotsServices_1["default"])(contact.id)];
            case 5:
                _a.sent();
                return [2 /*return*/];
            case 6:
                if (!choosenQueue) return [3 /*break*/, 12];
                if (!choosenQueue.isAgent) return [3 /*break*/, 9];
                return [4 /*yield*/, User_1["default"].findOne({
                        where: {
                            name: choosenQueue.name
                        }
                    })];
            case 7:
                getUserByName = _a.sent();
                ticketUpdateAgent = {
                    ticketData: {
                        userId: getUserByName.id,
                        status: "open"
                    },
                    ticketId: ticket.id,
                    companyId: ticket.companyId
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])(ticketUpdateAgent)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 10:
                _a.sent();
                return [4 /*yield*/, sendDialog(choosenQueue, contact, ticket)];
            case 11:
                send = _a.sent();
                return [2 /*return*/, send];
            case 12:
                if (!getStageBot) return [3 /*break*/, 21];
                selected = isNumeric(selectedOption) ? selectedOption : 1;
                return [4 /*yield*/, (0, ShowChatBotServices_1["default"])(getStageBot.chatbotId)];
            case 13:
                bots = _a.sent();
                choosenQueue = bots.options[+selected - 1]
                    ? bots.options[+selected - 1]
                    : bots.options[0];
                if (!!choosenQueue.greetingMessage) return [3 /*break*/, 15];
                return [4 /*yield*/, (0, DeleteDialogChatBotsServices_1["default"])(contact.id)];
            case 14:
                _a.sent();
                return [2 /*return*/];
            case 15:
                if (!choosenQueue) return [3 /*break*/, 21];
                if (!choosenQueue.isAgent) return [3 /*break*/, 18];
                return [4 /*yield*/, User_1["default"].findOne({
                        where: {
                            name: choosenQueue.name
                        }
                    })];
            case 16:
                getUserByName = _a.sent();
                ticketUpdateAgent = {
                    ticketData: {
                        userId: getUserByName.id,
                        status: "open"
                    },
                    ticketId: ticket.id,
                    companyId: ticket.companyId
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])(ticketUpdateAgent)];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18: return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 19:
                _a.sent();
                return [4 /*yield*/, sendDialog(choosenQueue, contact, ticket)];
            case 20:
                send = _a.sent();
                return [2 /*return*/, send];
            case 21: return [2 /*return*/];
        }
    });
}); };
exports.sayChatbot = sayChatbot;
