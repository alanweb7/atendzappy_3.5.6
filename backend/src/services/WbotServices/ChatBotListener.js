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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sayChatbot = exports.deleteAndCreateDialogStage = void 0;
var path_1 = __importDefault(require("path"));
var wbotMessageListener_1 = require("./wbotMessageListener");
var ShowDialogChatBotsServices_1 = __importDefault(require("../DialogChatBotsServices/ShowDialogChatBotsServices"));
var ShowQueueService_1 = __importDefault(require("../QueueService/ShowQueueService"));
var ShowChatBotServices_1 = __importDefault(require("../ChatBotServices/ShowChatBotServices"));
var DeleteDialogChatBotsServices_1 = __importDefault(require("../DialogChatBotsServices/DeleteDialogChatBotsServices"));
var ShowChatBotByChatbotIdServices_1 = __importDefault(require("../ChatBotServices/ShowChatBotByChatbotIdServices"));
var CreateDialogChatBotsServices_1 = __importDefault(require("../DialogChatBotsServices/CreateDialogChatBotsServices"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var ShowService_1 = __importDefault(require("../FileServices/ShowService"));
var SendWhatsAppMedia_1 = __importStar(require("./SendWhatsAppMedia"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var fs = require('fs');
var axios = require('axios');
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
            case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                    text: (0, Mustache_1["default"])(body, ticket)
                })];
            case 1:
                sentMessage = _a.sent();
                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contact)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var sendMessageLink = function (wbot, contact, ticket, url, caption) { return __awaiter(void 0, void 0, void 0, function () {
    var sentMessage, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                        document: url ? { url: url } : { url: "public/temp/".concat(caption, "-").concat(makeid(10)) },
                        fileName: caption,
                        mimetype: 'application/pdf'
                    })];
            case 1:
                sentMessage = _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_2 = _a.sent();
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                        text: (0, Mustache_1["default"])('\u200eNão consegui enviar o PDF, tente novamente!', ticket)
                    })];
            case 3:
                sentMessage = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contact)];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var sendMessageImage = function (wbot, contact, ticket, url, caption) { return __awaiter(void 0, void 0, void 0, function () {
    var sentMessage, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                        image: url ? { url: url } : { url: "public/temp/".concat(caption, "-").concat(makeid(10)) },
                        fileName: caption,
                        caption: caption,
                        mimetype: 'image/jpeg'
                    })];
            case 1:
                sentMessage = _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_3 = _a.sent();
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                        text: (0, Mustache_1["default"])('Não consegui enviar o PDF, tente novamente!', ticket)
                    })];
            case 3:
                sentMessage = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contact)];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// const sendDialog = async (
//   choosenQueue: Chatbot,
//   wbot: Session,
//   contact: Contact,
//   ticket: Ticket
// ) => {
//   const showChatBots = await ShowChatBotServices(choosenQueue.id);
//   if (showChatBots.options) {
//     const buttonActive = await Setting.findOne({
//       where: {
//         key: "chatBotType",
//         companyId: ticket.companyId
//       }
//     });
//     const typeBot = buttonActive?.value || "text";
//     const botText = async () => {
//       let options = "";
//       showChatBots.options.forEach((option, index) => {
//         options += `*${index + 1}* - ${option.name}\n`;
//       });
//       const optionsBack =
//         options.length > 0
//           ? `${options}\n*#* Voltar para o menu principal`
//           : options;
//       if (options.length > 0) {
//         const body = `\u200e${choosenQueue.greetingMessage}\n\n${optionsBack}`;
//         const sendOption = await sendMessage(wbot, contact, ticket, body);
//         return sendOption;
//       }
//       const body = `\u200e${choosenQueue.greetingMessage}`;
//       const send = await sendMessage(wbot, contact, ticket, body);
//       return send;
//     };
//     const botButton = async () => {
//       const buttons = [];
//       showChatBots.options.forEach((option, index) => {
//         buttons.push({
//           buttonId: `${index + 1}`,
//           buttonText: { displayText: option.name },
//           type: 1
//         });
//       });
//       if (buttons.length > 0) {
//         const buttonMessage = {
//           text: `\u200e${choosenQueue.greetingMessage}`,
//           buttons,
//           headerType: 1
//         };
//         // const send = await wbot.sendMessage(
//         //   `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
//         //   buttonMessage
//         // );
//         await wbot.presenceSubscribe(`${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,)
//         await sleep(1500)
//         await wbot.sendPresenceUpdate('composing', `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,)
//         await sleep(1000)
//         await wbot.sendPresenceUpdate('paused', `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,)
//         const send = await wbot.sendMessage(
//           `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
//           buttonMessage
//         );
//         await verifyMessage(send, ticket, contact);
//         return send;
//       }
//       const body = `\u200e${choosenQueue.greetingMessage}`;
//       const send = await sendMessage(wbot, contact, ticket, body);
//       return send;
//     };
//     const botList = async () => {
//       const sectionsRows = [];
//       showChatBots.options.forEach((queue, index) => {
//         sectionsRows.push({
//           title: queue.name,
//           rowId: `${index + 1}`
//         });
//       });
//       if (sectionsRows.length > 0) {
//         const sections = [
//           {
//             title: "Menu",
//             rows: sectionsRows
//           }
//         ];
//         const listMessage = {
//           text: formatBody(`\u200e${choosenQueue.greetingMessage}`, ticket),
//           buttonText: "Escolha uma opção",
//           sections
//         };
//         await wbot.presenceSubscribe(`${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,)
//         await sleep(1500)
//         await wbot.sendPresenceUpdate('composing', `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,)
//         await sleep(1000)
//         await wbot.sendPresenceUpdate('paused', `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,)
//         const sendMsg = await wbot.sendMessage(
//           `${contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
//           listMessage
//         );
//         await verifyMessage(sendMsg, ticket, contact);
//         return sendMsg;
//       }
//       const body = `\u200e${choosenQueue.greetingMessage}`;
//       const send = await sendMessage(wbot, contact, ticket, body);
//       return send;
//     };
//     if (typeBot === "text") {
//       return botText();
//     }
//     if (typeBot === "button" && showChatBots.options.length > 3) {
//       return botText();
//     }
//     if (typeBot === "button" && showChatBots.options.length <= 3) {
//       return botButton();
//     }
//     if (typeBot === "list") {
//       return botList();
//     }
//   }
// };
var sendDialog = function (choosenQueue, wbot, contact, ticket) { return __awaiter(void 0, void 0, void 0, function () {
    var showChatBots, companyId, buttonActive, typeBot, botText, botButton, botList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, ShowChatBotServices_1["default"])(choosenQueue.id)];
            case 1:
                showChatBots = _a.sent();
                if (!showChatBots.options) return [3 /*break*/, 10];
                companyId = ticket.companyId;
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 2:
                buttonActive = _a.sent();
                typeBot = (buttonActive === null || buttonActive === void 0 ? void 0 : buttonActive.chatBotType) || "text";
                botText = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var options, optionsBack, body_1, sendOption, body, send;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                options = "";
                                showChatBots.options.forEach(function (option, index) {
                                    options += "*[ ".concat(index + 1, " ]* - ").concat(option.name, "\n");
                                });
                                optionsBack = options.length > 0
                                    ? "".concat(options, "\n*[ # ]* Voltar para o menu principal\n*[ Sair ]* Encerrar atendimento")
                                    : "".concat(options, "\n*[ Sair ]* Encerrar atendimento");
                                if (!(options.length > 0)) return [3 /*break*/, 2];
                                body_1 = (0, Mustache_1["default"])("\u200E ".concat(choosenQueue.greetingMessage, "\n\n").concat(optionsBack), ticket);
                                return [4 /*yield*/, sendMessage(wbot, contact, ticket, body_1)];
                            case 1:
                                sendOption = _a.sent();
                                return [2 /*return*/, sendOption];
                            case 2:
                                body = (0, Mustache_1["default"])("\u200E ".concat(choosenQueue.greetingMessage), ticket);
                                return [4 /*yield*/, sendMessage(wbot, contact, ticket, body)];
                            case 3:
                                send = _a.sent();
                                // if (choosenQueue.closeTicket) {
                                //   await sendMsgAndCloseTicket(wbot, ticket.contact, ticket);
                                // }
                                return [2 /*return*/, send];
                        }
                    });
                }); };
                botButton = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var buttons, buttonMessage, send_1, body, send;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                buttons = [];
                                showChatBots.options.forEach(function (option, index) {
                                    buttons.push({
                                        buttonId: "".concat(index + 1),
                                        buttonText: { displayText: option.name },
                                        type: 1
                                    });
                                });
                                if (!(buttons.length > 0)) return [3 /*break*/, 3];
                                buttonMessage = {
                                    text: "\u200E".concat(choosenQueue.greetingMessage),
                                    buttons: buttons,
                                    headerType: 1
                                };
                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), buttonMessage)];
                            case 1:
                                send_1 = _a.sent();
                                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(send_1, ticket, contact)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, send_1];
                            case 3:
                                body = "\u200E".concat(choosenQueue.greetingMessage);
                                return [4 /*yield*/, sendMessage(wbot, contact, ticket, body)];
                            case 4:
                                send = _a.sent();
                                return [2 /*return*/, send];
                        }
                    });
                }); };
                botList = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var sectionsRows, sections, listMessage, sendMsg, body, send;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                sectionsRows = [];
                                showChatBots.options.forEach(function (queue, index) {
                                    sectionsRows.push({
                                        title: queue.name,
                                        rowId: "".concat(index + 1)
                                    });
                                });
                                if (!(sectionsRows.length > 0)) return [3 /*break*/, 3];
                                sections = [
                                    {
                                        title: "Menu",
                                        rows: sectionsRows
                                    }
                                ];
                                listMessage = {
                                    text: (0, Mustache_1["default"])("\u200E".concat(choosenQueue.greetingMessage), ticket),
                                    buttonText: "Escolha uma opção",
                                    sections: sections
                                };
                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), listMessage)];
                            case 1:
                                sendMsg = _a.sent();
                                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sendMsg, ticket, contact)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, sendMsg];
                            case 3:
                                body = "\u200E".concat(choosenQueue.greetingMessage);
                                return [4 /*yield*/, sendMessage(wbot, contact, ticket, body)];
                            case 4:
                                send = _a.sent();
                                return [2 /*return*/, send];
                        }
                    });
                }); };
                if (!(typeBot === "text")) return [3 /*break*/, 4];
                return [4 /*yield*/, botText()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                if (!(typeBot === "button" && showChatBots.options.length > 4)) return [3 /*break*/, 6];
                return [4 /*yield*/, botText()];
            case 5: return [2 /*return*/, _a.sent()];
            case 6:
                if (!(typeBot === "button" && showChatBots.options.length <= 4)) return [3 /*break*/, 8];
                return [4 /*yield*/, botButton()];
            case 7: return [2 /*return*/, _a.sent()];
            case 8:
                if (!(typeBot === "list")) return [3 /*break*/, 10];
                return [4 /*yield*/, botList()];
            case 9: return [2 /*return*/, _a.sent()];
            case 10: return [2 /*return*/];
        }
    });
}); };
var backToMainMenu = function (wbot, contact, ticket, ticketTraking) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, queues, greetingMessage, greetingMediaAttachment, buttonActive, botText;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                    ticketData: { queueId: null, userId: null },
                    ticketId: ticket.id,
                    companyId: ticket.companyId
                })];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(wbot.id, ticket.companyId)];
            case 2:
                _a = _b.sent(), queues = _a.queues, greetingMessage = _a.greetingMessage, greetingMediaAttachment = _a.greetingMediaAttachment;
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: {
                            companyId: ticket.companyId
                        }
                    })];
            case 3:
                buttonActive = _b.sent();
                botText = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var options, body, filePath, messagePath, optionsMsg, sentMessage, sentMessage, deleteDialog;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                options = "";
                                queues.forEach(function (option, index) {
                                    options += "*[ ".concat(index + 1, " ]* - ").concat(option.name, "\n");
                                });
                                options += "\n*[ Sair ]* - Encerrar Atendimento";
                                body = (0, Mustache_1["default"])("\u200E ".concat(greetingMessage, "\n\n").concat(options), ticket);
                                if (!(greetingMediaAttachment !== null)) return [3 /*break*/, 4];
                                filePath = path_1["default"].resolve("public", "company".concat(ticket.companyId), ticket.whatsapp.greetingMediaAttachment);
                                messagePath = ticket.whatsapp.greetingMediaAttachment;
                                return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(messagePath, filePath, String(ticket.companyId), body)];
                            case 1:
                                optionsMsg = _a.sent();
                                return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), __assign({}, optionsMsg))];
                            case 2:
                                sentMessage = _a.sent();
                                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMediaMessage)(sentMessage, ticket, contact, ticketTraking, false, false, wbot)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 7];
                            case 4: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                    text: body
                                })];
                            case 5:
                                sentMessage = _a.sent();
                                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contact)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: return [4 /*yield*/, (0, DeleteDialogChatBotsServices_1["default"])(contact.id)];
                            case 8:
                                deleteDialog = _a.sent();
                                return [2 /*return*/, deleteDialog];
                        }
                    });
                }); };
                if (buttonActive.chatBotType === "text") {
                    return [2 /*return*/, botText()];
                }
                return [2 /*return*/];
        }
    });
}); };
function validaCpfCnpj(val) {
    if (val.length == 11) {
        var cpf = val.trim();
        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.split('');
        var v1 = 0;
        var v2 = 0;
        var aux = false;
        for (var i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) {
                aux = true;
            }
        }
        if (aux == false) {
            return false;
        }
        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }
        v1 = ((v1 * 10) % 11);
        if (v1 == 10) {
            v1 = 0;
        }
        if (v1 != cpf[9]) {
            return false;
        }
        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }
        v2 = ((v2 * 10) % 11);
        if (v2 == 10) {
            v2 = 0;
        }
        if (v2 != cpf[10]) {
            return false;
        }
        else {
            return true;
        }
    }
    else if (val.length == 14) {
        var cnpj = val.trim();
        cnpj = cnpj.replace(/\./g, '');
        cnpj = cnpj.replace('-', '');
        cnpj = cnpj.replace('/', '');
        cnpj = cnpj.split('');
        var v1 = 0;
        var v2 = 0;
        var aux = false;
        for (var i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
                aux = true;
            }
        }
        if (aux == false) {
            return false;
        }
        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            }
            else {
                v1 += cnpj[i] * p2;
            }
        }
        v1 = (v1 % 11);
        if (v1 < 2) {
            v1 = 0;
        }
        else {
            v1 = (11 - v1);
        }
        if (v1 != cnpj[12]) {
            return false;
        }
        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            }
            else {
                v2 += cnpj[i] * p2;
            }
        }
        v2 = (v2 % 11);
        if (v2 < 2) {
            v2 = 0;
        }
        else {
            v2 = (11 - v2);
        }
        if (v2 != cnpj[13]) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
function timeout(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function sleep(time) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, timeout(time)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function firstDayOfMonth(month) {
    var now = new Date();
    var firstDay = new Date(now.getFullYear(), now.getMonth() - month, 1);
    return firstDay;
}
;
function lastDayOfMonth(month) {
    var now = new Date();
    var lastDay = new Date(now.getFullYear(), now.getMonth() + month, 0);
    return lastDay;
}
;
function dataAtualFormatada(data) {
    var dia = data.getDate().toString(), diaF = (dia.length == 1) ? '0' + dia : dia, mes = (data.getMonth() + 1).toString(), mesF = (mes.length == 1) ? '0' + mes : mes, anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function formatDate(date) {
    return date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4);
}
function sortfunction(a, b) {
    return a.dueDate.localeCompare(b.dueDate);
}
function sendMsgAndCloseTicket(wbot, contact, ticket) {
    return __awaiter(this, void 0, void 0, function () {
        var ticketUpdateAgent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ticketUpdateAgent = {
                        ticketData: {
                            status: "closed",
                            userId: (ticket === null || ticket === void 0 ? void 0 : ticket.userId) || null,
                            sendFarewellMessage: false,
                            amountUsedBotQueues: 0
                        },
                        ticketId: ticket.id,
                        companyId: ticket.companyId
                    };
                    return [4 /*yield*/, sleep(2000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])(ticketUpdateAgent)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var sayChatbot = function (queueId, wbot, ticket, contact, msg, ticketTraking) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedOption, getStageBot, ticketUpdateAgent, backTo, queue, selectedOptions, choosenQueue, error_4, ticketUpdateAgent, error_5, ticketUpdateAgent, error_6, send, publicFolder, files, folder, _i, _a, _b, index, file, mediaSrc, error_7, selected, bots, choosenQueue, ticketUpdateAgent, error_8, ticketUpdateAgent, error_9, ticketUpdateAgent, error_10, publicFolder, files, folder, _c, _d, _e, index, file, mediaSrc, error_11, send;
    var _f, _g, _h, _j, _k, _l, _m, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                selectedOption = ((_g = (_f = msg === null || msg === void 0 ? void 0 : msg.message) === null || _f === void 0 ? void 0 : _f.buttonsResponseMessage) === null || _g === void 0 ? void 0 : _g.selectedButtonId) ||
                    ((_j = (_h = msg === null || msg === void 0 ? void 0 : msg.message) === null || _h === void 0 ? void 0 : _h.listResponseMessage) === null || _j === void 0 ? void 0 : _j.singleSelectReply.selectedRowId) ||
                    (0, wbotMessageListener_1.getBodyMessage)(msg);
                if (!queueId && selectedOption && msg.key.fromMe)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, ShowDialogChatBotsServices_1["default"])(contact.id)];
            case 1:
                getStageBot = _p.sent();
                if (!(String(selectedOption).toLocaleLowerCase() === "sair")) return [3 /*break*/, 3];
                ticketUpdateAgent = {
                    ticketData: {
                        status: "closed",
                        sendFarewellMessage: true,
                        amountUsedBotQueues: 0
                    },
                    ticketId: ticket.id,
                    companyId: ticket.companyId
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])(ticketUpdateAgent)];
            case 2:
                _p.sent();
                // const complationMessage = ticket.whatsapp?.complationMessage;
                // const textMessage = {
                //   text: formatBody(`\u200e${complationMessage}`, ticket),
                // };
                // if (!isNil(complationMessage)) {
                //   const sendMsg = await wbot.sendMessage(
                //     `${ticket?.contact?.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
                //     textMessage
                //   );
                //   await verifyMessage(sendMsg, ticket, ticket.contact);
                // }
                return [2 /*return*/];
            case 3:
                if (!(selectedOption === "#")) return [3 /*break*/, 5];
                return [4 /*yield*/, backToMainMenu(wbot, contact, ticket, ticketTraking)];
            case 4:
                backTo = _p.sent();
                return [2 /*return*/];
            case 5:
                if (!!getStageBot) return [3 /*break*/, 38];
                return [4 /*yield*/, (0, ShowQueueService_1["default"])(queueId, ticket.companyId)];
            case 6:
                queue = _p.sent();
                selectedOptions = ((_l = (_k = msg === null || msg === void 0 ? void 0 : msg.message) === null || _k === void 0 ? void 0 : _k.buttonsResponseMessage) === null || _l === void 0 ? void 0 : _l.selectedButtonId) ||
                    ((_o = (_m = msg === null || msg === void 0 ? void 0 : msg.message) === null || _m === void 0 ? void 0 : _m.listResponseMessage) === null || _o === void 0 ? void 0 : _o.singleSelectReply.selectedRowId) ||
                    (0, wbotMessageListener_1.getBodyMessage)(msg);
                choosenQueue = queue.chatbots[+selectedOptions - 1];
                if (!choosenQueue) return [3 /*break*/, 38];
                if (!(choosenQueue.queueType === "integration")) return [3 /*break*/, 12];
                _p.label = 7;
            case 7:
                _p.trys.push([7, 9, , 11]);
                return [4 /*yield*/, ticket.update({
                        integrationId: choosenQueue.optIntegrationId,
                        useIntegration: true,
                        status: "pending",
                        queueId: null
                    })];
            case 8:
                _p.sent();
                return [3 /*break*/, 11];
            case 9:
                error_4 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 10:
                _p.sent();
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 23];
            case 12:
                if (!(choosenQueue.queueType === "queue")) return [3 /*break*/, 18];
                _p.label = 13;
            case 13:
                _p.trys.push([13, 15, , 17]);
                ticketUpdateAgent = {
                    ticketData: {
                        queueId: choosenQueue.optQueueId,
                        status: "pending"
                    },
                    ticketId: ticket.id
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: __assign({}, ticketUpdateAgent.ticketData),
                        ticketId: ticketUpdateAgent.ticketId,
                        companyId: ticket.companyId
                    })];
            case 14:
                _p.sent();
                return [3 /*break*/, 17];
            case 15:
                error_5 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 16:
                _p.sent();
                return [3 /*break*/, 17];
            case 17: return [3 /*break*/, 23];
            case 18:
                if (!(choosenQueue.queueType === "attendent")) return [3 /*break*/, 23];
                _p.label = 19;
            case 19:
                _p.trys.push([19, 21, , 23]);
                ticketUpdateAgent = {
                    ticketData: {
                        queueId: choosenQueue.optQueueId,
                        userId: choosenQueue.optUserId,
                        status: "pending"
                    },
                    ticketId: ticket.id
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: __assign({}, ticketUpdateAgent.ticketData),
                        ticketId: ticketUpdateAgent.ticketId,
                        companyId: ticket.companyId
                    })];
            case 20:
                _p.sent();
                return [3 /*break*/, 23];
            case 21:
                error_6 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 22:
                _p.sent();
                return [3 /*break*/, 23];
            case 23: return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 24:
                _p.sent();
                send = void 0;
                if (!((choosenQueue === null || choosenQueue === void 0 ? void 0 : choosenQueue.greetingMessage) && (!choosenQueue.optIntegrationId || ticket.typebotSessionTime === null))) return [3 /*break*/, 26];
                return [4 /*yield*/, sendDialog(choosenQueue, wbot, contact, ticket)];
            case 25:
                send = _p.sent();
                _p.label = 26;
            case 26:
                if (!(choosenQueue.queueType === "file")) return [3 /*break*/, 35];
                _p.label = 27;
            case 27:
                _p.trys.push([27, 33, , 35]);
                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                return [4 /*yield*/, (0, ShowService_1["default"])(choosenQueue.optFileId, ticket.companyId)];
            case 28:
                files = _p.sent();
                folder = path_1["default"].resolve(publicFolder, "company".concat(ticket.companyId), "fileList", String(files.id));
                _i = 0, _a = files.options.entries();
                _p.label = 29;
            case 29:
                if (!(_i < _a.length)) return [3 /*break*/, 32];
                _b = _a[_i], index = _b[0], file = _b[1];
                mediaSrc = {
                    fieldname: 'medias',
                    originalname: file.path,
                    encoding: '7bit',
                    mimetype: file.mediaType,
                    filename: file.path,
                    path: path_1["default"].resolve(folder, file.path)
                };
                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({ media: mediaSrc, ticket: ticket, body: file.name, isForwarded: false })];
            case 30:
                _p.sent();
                _p.label = 31;
            case 31:
                _i++;
                return [3 /*break*/, 29];
            case 32:
                ;
                return [3 /*break*/, 35];
            case 33:
                error_7 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 34:
                _p.sent();
                return [3 /*break*/, 35];
            case 35:
                if (!choosenQueue.closeTicket) return [3 /*break*/, 37];
                return [4 /*yield*/, sendMsgAndCloseTicket(wbot, ticket.contact, ticket)];
            case 36:
                _p.sent();
                _p.label = 37;
            case 37: return [2 /*return*/, send];
            case 38:
                if (!getStageBot) return [3 /*break*/, 73];
                selected = isNumeric(selectedOption) ? selectedOption : 1;
                return [4 /*yield*/, (0, ShowChatBotServices_1["default"])(getStageBot.chatbotId)];
            case 39:
                bots = _p.sent();
                choosenQueue = bots.options[+selected - 1]
                    ? bots.options[+selected - 1]
                    : bots.options[0];
                if (!!choosenQueue.greetingMessage) return [3 /*break*/, 41];
                return [4 /*yield*/, (0, DeleteDialogChatBotsServices_1["default"])(contact.id)];
            case 40:
                _p.sent();
                return [2 /*return*/];
            case 41:
                if (!choosenQueue) return [3 /*break*/, 73];
                if (!(choosenQueue.queueType === "integration")) return [3 /*break*/, 47];
                _p.label = 42;
            case 42:
                _p.trys.push([42, 44, , 46]);
                ticketUpdateAgent = {
                    ticketData: {
                        integrationId: choosenQueue.optIntegrationId,
                        useIntegration: true,
                        status: "pending"
                    },
                    ticketId: ticket.id
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: __assign({}, ticketUpdateAgent.ticketData),
                        ticketId: ticketUpdateAgent.ticketId,
                        companyId: ticket.companyId
                    })];
            case 43:
                _p.sent();
                return [3 /*break*/, 46];
            case 44:
                error_8 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 45:
                _p.sent();
                return [3 /*break*/, 46];
            case 46: return [3 /*break*/, 58];
            case 47:
                if (!(choosenQueue.queueType === "queue")) return [3 /*break*/, 53];
                _p.label = 48;
            case 48:
                _p.trys.push([48, 50, , 52]);
                ticketUpdateAgent = {
                    ticketData: {
                        queueId: choosenQueue.optQueueId,
                        status: "pending"
                    },
                    ticketId: ticket.id
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: __assign({}, ticketUpdateAgent.ticketData),
                        ticketId: ticketUpdateAgent.ticketId,
                        companyId: ticket.companyId
                    })];
            case 49:
                _p.sent();
                return [3 /*break*/, 52];
            case 50:
                error_9 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 51:
                _p.sent();
                return [3 /*break*/, 52];
            case 52: return [3 /*break*/, 58];
            case 53:
                if (!(choosenQueue.queueType === "attendent")) return [3 /*break*/, 58];
                _p.label = 54;
            case 54:
                _p.trys.push([54, 56, , 58]);
                ticketUpdateAgent = {
                    ticketData: {
                        queueId: choosenQueue.optQueueId,
                        userId: choosenQueue.optUserId,
                        status: "pending"
                    },
                    ticketId: ticket.id
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: __assign({}, ticketUpdateAgent.ticketData),
                        ticketId: ticketUpdateAgent.ticketId,
                        companyId: ticket.companyId
                    })];
            case 55:
                _p.sent();
                return [3 /*break*/, 58];
            case 56:
                error_10 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 57:
                _p.sent();
                return [3 /*break*/, 58];
            case 58: return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 59:
                _p.sent();
                if (!(choosenQueue.queueType === "file")) return [3 /*break*/, 68];
                _p.label = 60;
            case 60:
                _p.trys.push([60, 66, , 68]);
                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                return [4 /*yield*/, (0, ShowService_1["default"])(choosenQueue.optFileId, ticket.companyId)];
            case 61:
                files = _p.sent();
                folder = path_1["default"].resolve(publicFolder, "company".concat(ticket.companyId), "fileList", String(files.id));
                _c = 0, _d = files.options.entries();
                _p.label = 62;
            case 62:
                if (!(_c < _d.length)) return [3 /*break*/, 65];
                _e = _d[_c], index = _e[0], file = _e[1];
                mediaSrc = {
                    fieldname: 'medias',
                    originalname: file.path,
                    encoding: '7bit',
                    mimetype: file.mediaType,
                    filename: file.path,
                    path: path_1["default"].resolve(folder, file.path)
                };
                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({ media: mediaSrc, ticket: ticket, body: file.name, isForwarded: false })];
            case 63:
                _p.sent();
                _p.label = 64;
            case 64:
                _c++;
                return [3 /*break*/, 62];
            case 65:
                ;
                return [3 /*break*/, 68];
            case 66:
                error_11 = _p.sent();
                return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 67:
                _p.sent();
                return [3 /*break*/, 68];
            case 68:
                if (!choosenQueue.closeTicket) return [3 /*break*/, 70];
                return [4 /*yield*/, sendMsgAndCloseTicket(wbot, ticket.contact, ticket)];
            case 69:
                _p.sent();
                _p.label = 70;
            case 70: return [4 /*yield*/, (0, exports.deleteAndCreateDialogStage)(contact, choosenQueue.id, ticket)];
            case 71:
                _p.sent();
                return [4 /*yield*/, sendDialog(choosenQueue, wbot, contact, ticket)];
            case 72:
                send = _p.sent();
                return [2 /*return*/, send];
            case 73: return [2 /*return*/];
        }
    });
}); };
exports.sayChatbot = sayChatbot;
