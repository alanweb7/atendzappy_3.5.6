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
exports.sendMessageFlow = exports.edit = exports.send = exports.allMe = exports.remove = exports.forwardMessage = exports.store = exports.index = exports.transcribeAudioMessage = exports.sendPIXMessage = exports.sendURLMessage = exports.sendCALLMessage = exports.sendCopyMessage = exports.sendListMessage = void 0;
var AppError_1 = __importDefault(require("../errors/AppError"));
var fs_1 = __importDefault(require("fs"));
var GetTicketWbot_1 = __importDefault(require("../helpers/GetTicketWbot"));
var SetTicketMessagesAsRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsRead"));
var socket_1 = require("../libs/socket");
var Message_1 = __importDefault(require("../models/Message"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var Queue_1 = __importDefault(require("../models/Queue"));
var User_1 = __importDefault(require("../models/User"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var path_1 = __importDefault(require("path"));
var lodash_1 = require("lodash");
var async_mutex_1 = require("async-mutex");
var ListMessagesService_1 = __importDefault(require("../services/MessageServices/ListMessagesService"));
var ShowTicketService_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));
var DeleteWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/DeleteWhatsAppMessage"));
var SendWhatsAppMedia_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia"));
var SendWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMessage"));
var CreateMessageService_1 = __importDefault(require("../services/MessageServices/CreateMessageService"));
var sendFacebookMessageMedia_1 = require("../services/FacebookServices/sendFacebookMessageMedia");
var sendFacebookMessage_1 = __importDefault(require("../services/FacebookServices/sendFacebookMessage"));
var SendTextOfficialService_1 = require("../services/WhatsAppOfficial/SendTextOfficialService");
var SendMediaOfficialService_1 = require("../services/WhatsAppOfficial/SendMediaOfficialService");
var ShowPlanCompanyService_1 = __importDefault(require("../services/CompanyService/ShowPlanCompanyService"));
var ListMessagesServiceAll_1 = __importDefault(require("../services/MessageServices/ListMessagesServiceAll"));
var ShowContactService_1 = __importDefault(require("../services/ContactServices/ShowContactService"));
var FindOrCreateTicketService_1 = __importDefault(require("../services/TicketServices/FindOrCreateTicketService"));
var Contact_1 = __importDefault(require("../models/Contact"));
var QuickMessage_1 = __importDefault(require("../models/QuickMessage"));
var SendMessage_1 = require("../helpers/SendMessage");
var SendInteractiveMenu_1 = require("../helpers/SendInteractiveMenu");
var logger_1 = __importDefault(require("../utils/logger"));
var wbotMessageListener_1 = require("../services/WbotServices/wbotMessageListener");
var UpdateTicketService_1 = __importDefault(require("../services/TicketServices/UpdateTicketService"));
var ShowMessageService_1 = __importStar(require("../services/MessageServices/ShowMessageService"));
var CompaniesSettings_1 = __importDefault(require("../models/CompaniesSettings"));
var facebookMessageListener_1 = require("../services/FacebookServices/facebookMessageListener");
var EditWhatsAppMessage_1 = __importDefault(require("../services/MessageServices/EditWhatsAppMessage"));
var CheckNumber_1 = __importDefault(require("../services/WbotServices/CheckNumber"));
var TranscribeAudioMessageService_1 = __importDefault(require("../services/MessageServices/TranscribeAudioMessageService"));
var baileys_1 = require("@whiskeysockets/baileys");
var NotificationController_1 = require("./NotificationController");
;
// adicionar funções de botões, pix, etc.
var sendListMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, title, text, buttonText, footer, sections, ticket, contact, wbot, listMessage, number, sendMsg, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.body, title = _a.title, text = _a.text, buttonText = _a.buttonText, footer = _a.footer, sections = _a.sections;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId)];
            case 2:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Ticket not found", 404);
                }
                return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
            case 3:
                contact = _b.sent();
                if (!contact) {
                    throw new AppError_1["default"]("Contact not found", 404);
                }
                return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
            case 4:
                wbot = _b.sent();
                listMessage = {
                    text: text,
                    title: title,
                    buttonText: buttonText,
                    footer: footer,
                    sections: sections
                };
                number = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                console.log('Numero do cliente:', number);
                return [4 /*yield*/, wbot.sendMessage(number, listMessage)];
            case 5:
                sendMsg = _b.sent();
                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sendMsg, ticket, contact)];
            case 6:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "List message sent successfully", sendMsg: sendMsg })];
            case 7:
                err_1 = _b.sent();
                console.error("Error sending list message: ", err_1);
                throw new AppError_1["default"]("Error sending list message", 500);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.sendListMessage = sendListMessage;
var sendCopyMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, title, description, buttonText, copyText, ticket, contact, whatsapp, botNumber, wbot, copyMessage, number, newMsg, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.body, title = _a.title, description = _a.description, buttonText = _a.buttonText, copyText = _a.copyText;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId)];
            case 2:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Ticket not found", 404);
                }
                return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
            case 3:
                contact = _b.sent();
                if (!contact) {
                    throw new AppError_1["default"]("Contact not found", 404);
                }
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { id: ticket.whatsappId } })];
            case 4:
                whatsapp = _b.sent();
                if (!whatsapp || !whatsapp.number) {
                    console.error('Número de WhatsApp não encontrado para o ticket:', ticket.whatsappId);
                    throw new Error('Número de WhatsApp não encontrado');
                }
                botNumber = whatsapp.number;
                return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
            case 5:
                wbot = _b.sent();
                copyMessage = {
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                body: {
                                    text: title || 'Botão copiar'
                                },
                                footer: {
                                    text: description || 'Botão copiar'
                                },
                                nativeFlowMessage: {
                                    buttons: [
                                        {
                                            name: 'cta_copy',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: buttonText || 'Botão copiar',
                                                copy_code: copyText || 'Botão copiar'
                                            })
                                        },
                                    ],
                                    messageParamsJson: JSON.stringify({
                                        from: 'apiv2',
                                        templateId: '4194019344155670'
                                    })
                                }
                            }
                        }
                    }
                };
                number = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                newMsg = (0, baileys_1.generateWAMessageFromContent)(number, copyMessage, {
                    userJid: botNumber
                });
                return [4 /*yield*/, wbot.relayMessage(number, newMsg.message, { messageId: newMsg.key.id })];
            case 6:
                _b.sent();
                if (!newMsg) return [3 /*break*/, 8];
                return [4 /*yield*/, wbot.upsertMessage(newMsg, 'notify')];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: return [2 /*return*/, res.status(200).json({ message: "Copy message sent successfully", newMsg: newMsg })];
            case 9:
                error_1 = _b.sent();
                console.error('Erro ao enviar a mensagem de cópia:', error_1);
                throw new AppError_1["default"]("Error sending copy message", 500);
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.sendCopyMessage = sendCopyMessage;
var sendCALLMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, title, description, buttonText, copyText, ticket, contact, whatsapp, botNumber, wbot, copyMessage, number, newMsg, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.body, title = _a.title, description = _a.description, buttonText = _a.buttonText, copyText = _a.copyText;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId)];
            case 2:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Ticket not found", 404);
                }
                return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
            case 3:
                contact = _b.sent();
                if (!contact) {
                    throw new AppError_1["default"]("Contact not found", 404);
                }
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { id: ticket.whatsappId } })];
            case 4:
                whatsapp = _b.sent();
                if (!whatsapp || !whatsapp.number) {
                    console.error('Número de WhatsApp não encontrado para o ticket:', ticket.whatsappId);
                    throw new Error('Número de WhatsApp não encontrado');
                }
                botNumber = whatsapp.number;
                return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
            case 5:
                wbot = _b.sent();
                copyMessage = {
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                body: {
                                    text: title || 'Botão copiar'
                                },
                                footer: {
                                    text: description || 'Botão copiar'
                                },
                                nativeFlowMessage: {
                                    buttons: [
                                        {
                                            name: 'cta_call',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: buttonText || 'Botão copiar',
                                                phoneNumber: copyText || 'Botão copiar'
                                            })
                                        },
                                    ],
                                    messageParamsJson: JSON.stringify({
                                        from: 'apiv2',
                                        templateId: '4194019344155670'
                                    })
                                }
                            }
                        }
                    }
                };
                number = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                newMsg = (0, baileys_1.generateWAMessageFromContent)(number, copyMessage, {
                    userJid: botNumber
                });
                return [4 /*yield*/, wbot.relayMessage(number, newMsg.message, { messageId: newMsg.key.id })];
            case 6:
                _b.sent();
                if (!newMsg) return [3 /*break*/, 8];
                return [4 /*yield*/, wbot.upsertMessage(newMsg, 'notify')];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: return [2 /*return*/, res.status(200).json({ message: "Copy message sent successfully", newMsg: newMsg })];
            case 9:
                error_2 = _b.sent();
                console.error('Erro ao enviar a mensagem de cópia:', error_2);
                throw new AppError_1["default"]("Error sending copy message", 500);
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.sendCALLMessage = sendCALLMessage;
var sendURLMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, image, title, description, buttonText, copyText, ticket, contact, whatsapp, botNumber, wbot, copyMessage, base64Image, imageMessageContent, number, newMsg, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.body, image = _a.image, title = _a.title, description = _a.description, buttonText = _a.buttonText, copyText = _a.copyText;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId)];
            case 2:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Ticket not found", 404);
                }
                return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
            case 3:
                contact = _b.sent();
                if (!contact) {
                    throw new AppError_1["default"]("Contact not found", 404);
                }
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { id: ticket.whatsappId } })];
            case 4:
                whatsapp = _b.sent();
                if (!whatsapp || !whatsapp.number) {
                    console.error('Número de WhatsApp não encontrado para o ticket:', ticket.whatsappId);
                    throw new Error('Número de WhatsApp não encontrado');
                }
                botNumber = whatsapp.number;
                return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
            case 5:
                wbot = _b.sent();
                copyMessage = void 0;
                if (!image) return [3 /*break*/, 7];
                base64Image = image.split(',')[1];
                return [4 /*yield*/, (0, baileys_1.generateWAMessageContent)({
                        image: {
                            url: "data:image/png;base64,".concat(base64Image)
                        }
                    }, { upload: wbot.waUploadToServer })];
            case 6:
                imageMessageContent = _b.sent();
                // Crie a estrutura com o header e a imagem
                copyMessage = {
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                body: {
                                    text: title || 'Botão copiar'
                                },
                                footer: {
                                    text: description || 'Botão copiar'
                                },
                                header: {
                                    imageMessage: imageMessageContent,
                                    hasMediaAttachment: true
                                },
                                nativeFlowMessage: {
                                    buttons: [
                                        {
                                            name: 'cta_url',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: buttonText || 'Botão copiar',
                                                url: copyText || 'Botão copiar'
                                            })
                                        },
                                    ],
                                    messageParamsJson: JSON.stringify({
                                        from: 'apiv2',
                                        templateId: '4194019344155670'
                                    })
                                }
                            }
                        }
                    }
                };
                return [3 /*break*/, 8];
            case 7:
                copyMessage = {
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                body: {
                                    text: title || 'Botão copiar'
                                },
                                footer: {
                                    text: description || 'Botão copiar'
                                },
                                nativeFlowMessage: {
                                    buttons: [
                                        {
                                            name: 'cta_url',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: buttonText || 'Botão copiar',
                                                url: copyText || 'Botão copiar'
                                            })
                                        },
                                    ],
                                    messageParamsJson: JSON.stringify({
                                        from: 'apiv2',
                                        templateId: '4194019344155670'
                                    })
                                }
                            }
                        }
                    }
                };
                _b.label = 8;
            case 8:
                number = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                newMsg = (0, baileys_1.generateWAMessageFromContent)(number, copyMessage, {
                    userJid: botNumber
                });
                return [4 /*yield*/, wbot.relayMessage(number, newMsg.message, { messageId: newMsg.key.id })];
            case 9:
                _b.sent();
                if (!newMsg) return [3 /*break*/, 11];
                return [4 /*yield*/, wbot.upsertMessage(newMsg, 'notify')];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [2 /*return*/, res.status(200).json({ message: "Copy message sent successfully", newMsg: newMsg })];
            case 12:
                error_3 = _b.sent();
                console.error('Erro ao enviar a mensagem de cópia:', error_3);
                throw new AppError_1["default"]("Error sending copy message", 500);
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.sendURLMessage = sendURLMessage;
var sendPIXMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, sendkey_type, sendmerchant_name, title, sendvalue, sendKey, ticket, contact, whatsapp, number, botNumber, wbot, interactiveMsg, newMsg, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.body, sendkey_type = _a.sendkey_type, sendmerchant_name = _a.sendmerchant_name, title = _a.title, sendvalue = _a.sendvalue, sendKey = _a.sendKey;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId)];
            case 2:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Ticket not found", 404);
                }
                return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
            case 3:
                contact = _b.sent();
                if (!contact) {
                    throw new AppError_1["default"]("Contact not found", 404);
                }
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { id: ticket.whatsappId } })];
            case 4:
                whatsapp = _b.sent();
                if (!whatsapp || !whatsapp.number) {
                    throw new Error('Número de WhatsApp não encontrado');
                }
                number = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                botNumber = whatsapp.number;
                return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
            case 5:
                wbot = _b.sent();
                interactiveMsg = {
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                nativeFlowMessage: {
                                    buttons: [
                                        {
                                            name: "review_and_pay",
                                            buttonParamsJson: JSON.stringify({
                                                reference_id: generateRandomCode(),
                                                type: 'physical-goods',
                                                payment_configuration: 'merchant_categorization_code',
                                                payment_settings: [
                                                    {
                                                        type: "pix_static_code",
                                                        pix_static_code: {
                                                            key: sendKey,
                                                            merchant_name: sendmerchant_name,
                                                            key_type: sendkey_type
                                                        }
                                                    },
                                                    {
                                                        type: "cards",
                                                        cards: { enabled: false }
                                                    }
                                                ],
                                                currency: "BRL",
                                                total_amount: {
                                                    value: sendvalue * 100,
                                                    offset: 100
                                                },
                                                order: {
                                                    status: 'payment_requested',
                                                    items: [{
                                                            retailer_id: "custom-item",
                                                            name: title,
                                                            amount: {
                                                                value: sendvalue * 100,
                                                                offset: 100
                                                            },
                                                            quantity: 1,
                                                            isCustomItem: true,
                                                            isQuantitySet: true
                                                        }],
                                                    subtotal: {
                                                        value: sendvalue * 100,
                                                        offset: 100
                                                    },
                                                    tax: null,
                                                    shipping: null,
                                                    discount: null,
                                                    order_type: "ORDER"
                                                },
                                                native_payment_methods: []
                                            })
                                        }
                                    ]
                                }
                            }
                        }
                    }
                };
                newMsg = (0, baileys_1.generateWAMessageFromContent)(number, interactiveMsg, { userJid: botNumber });
                // Envio da mensagem
                return [4 /*yield*/, wbot.relayMessage(number, newMsg.message, { messageId: newMsg.key.id })];
            case 6:
                // Envio da mensagem
                _b.sent();
                return [4 /*yield*/, wbot.upsertMessage(newMsg, 'notify')];
            case 7:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Mensagem enviada com sucesso", newMsg: newMsg })];
            case 8:
                error_4 = _b.sent();
                console.error('Erro ao enviar a mensagem:', error_4);
                return [2 /*return*/, res.status(500).json({ message: "Erro ao enviar a mensagem" })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.sendPIXMessage = sendPIXMessage;
var generateRandomCode = function (length) {
    if (length === void 0) { length = 11; }
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
};
//Transcrição de Audio
var transcribeAudioMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, companyId, transcribedText, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req.params.fileName;
                companyId = req.user.companyId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, TranscribeAudioMessageService_1["default"])(fileName, companyId)];
            case 2:
                transcribedText = _a.sent();
                if (typeof transcribedText === 'string') {
                    return [2 /*return*/, res.status(500).send({ error: transcribedText })];
                }
                return [2 /*return*/, res.send(transcribedText)];
            case 3:
                error_5 = _a.sent();
                console.error(error_5);
                return [2 /*return*/, res.status(500).send({ error: 'Erro ao transcrever a mensagem de áudio.' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.transcribeAudioMessage = transcribeAudioMessage;
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, pageNumber, queueIdsStringified, _b, companyId, profile, queues, user, _c, count, messages, ticket, hasMore;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.query, pageNumber = _a.pageNumber, queueIdsStringified = _a.selectedQueues;
                _b = req.user, companyId = _b.companyId, profile = _b.profile;
                queues = [];
                return [4 /*yield*/, User_1["default"].findByPk(req.user.id, {
                        include: [{ model: Queue_1["default"], as: "queues" }]
                    })];
            case 1:
                user = _d.sent();
                if (queueIdsStringified) {
                    queues = JSON.parse(queueIdsStringified);
                }
                else {
                    user.queues.forEach(function (queue) {
                        queues.push(queue.id);
                    });
                }
                return [4 /*yield*/, (0, ListMessagesService_1["default"])({
                        pageNumber: pageNumber,
                        ticketId: ticketId,
                        companyId: companyId,
                        queues: queues,
                        user: user
                    })];
            case 2:
                _c = _d.sent(), count = _c.count, messages = _c.messages, ticket = _c.ticket, hasMore = _c.hasMore;
                if (ticket.channel === "whatsapp" && ticket.whatsappId) {
                    (0, SetTicketMessagesAsRead_1["default"])(ticket);
                }
                return [2 /*return*/, res.json({ count: count, messages: messages, ticket: ticket, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
function obterNomeEExtensaoDoArquivo(url) {
    var urlObj = new URL(url);
    var pathname = urlObj.pathname;
    var filename = pathname.split('/').pop();
    var parts = filename.split('.');
    var nomeDoArquivo = parts[0];
    var extensao = parts[1];
    return "".concat(nomeDoArquivo, ".").concat(extensao);
}
// Função para processar comando de resposta rápida #{ "resp": "1" }
var processQuickMessageCommand = function (body, ticket) { return __awaiter(void 0, void 0, void 0, function () {
    var respMatch, respId, quickMessage, whatsapp, messageData, localPath, absolutePath, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                respMatch = body.match(/#\{\s*"resp"\s*:\s*"(\d+)"\s*\}/);
                if (!respMatch) {
                    return [2 /*return*/, { processed: false }];
                }
                respId = parseInt(respMatch[1]);
                console.log("[processQuickMessageCommand] Detectado comando resp: ".concat(respId));
                return [4 /*yield*/, QuickMessage_1["default"].findOne({
                        where: { id: respId, companyId: ticket.companyId }
                    })];
            case 1:
                quickMessage = _b.sent();
                if (!quickMessage) {
                    console.warn("[processQuickMessageCommand] Resposta r\u00E1pida ID ".concat(respId, " n\u00E3o encontrada"));
                    return [2 /*return*/, { processed: false }];
                }
                console.log("[processQuickMessageCommand] Resposta r\u00E1pida encontrada: ".concat(quickMessage.shortcode));
                return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId, {
                        attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
                    })];
            case 2:
                whatsapp = _b.sent();
                if (!whatsapp) {
                    console.error("[processQuickMessageCommand] WhatsApp ID ".concat(ticket.whatsappId, " n\u00E3o encontrado"));
                    return [2 /*return*/, { processed: false }];
                }
                if (!(quickMessage.messageType === "buttons" && ((_a = quickMessage.buttons) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 7];
                if (!(whatsapp.channel === "whatsapp_official")) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, SendInteractiveMenu_1.SendCTAButtonsOfficial)({
                        ticket: ticket,
                        messageText: quickMessage.message || "",
                        buttons: quickMessage.buttons,
                        connection: whatsapp
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, (0, SendInteractiveMenu_1.SendCTAButtons)({
                    ticket: ticket,
                    messageText: quickMessage.message || "",
                    buttons: quickMessage.buttons
                })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                console.log("[processQuickMessageCommand] Bot\u00F5es CTA enviados para \"".concat(quickMessage.shortcode, "\""));
                return [2 /*return*/, { processed: true, newBody: quickMessage.message }];
            case 7:
                messageData = {
                    number: ticket.contact.number,
                    body: quickMessage.message || "",
                    companyId: ticket.companyId,
                    ticketId: ticket.id // necessário para canal oficial registrar a mensagem
                };
                // Se tem mídia anexada — usa path absoluto para garantir existsSync no SendMessage
                if (quickMessage.mediaPath && quickMessage.mediaName) {
                    localPath = quickMessage.getDataValue("mediaPath");
                    if (localPath) {
                        absolutePath = path_1["default"].resolve(process.cwd(), "public/company".concat(ticket.companyId, "/quickMessage/").concat(localPath));
                        messageData.mediaPath = absolutePath;
                        messageData.mediaName = quickMessage.mediaName;
                        console.log("[processQuickMessageCommand] Enviando com m\u00EDdia: ".concat(quickMessage.mediaName, " \u2192 ").concat(absolutePath));
                    }
                }
                // Enviar mensagem — passa o ticket para o canal oficial usar ticketId correto
                return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, messageData, false, ticket)];
            case 8:
                // Enviar mensagem — passa o ticket para o canal oficial usar ticketId correto
                _b.sent();
                console.log("[processQuickMessageCommand] Resposta r\u00E1pida \"".concat(quickMessage.shortcode, "\" enviada com sucesso"));
                return [2 /*return*/, { processed: true, newBody: quickMessage.message }];
            case 9:
                error_6 = _b.sent();
                console.error("[processQuickMessageCommand] Erro ao processar comando:", error_6);
                return [2 /*return*/, { processed: false }];
            case 10: return [2 /*return*/];
        }
    });
}); };
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, body, quotedMsg, vCard, _b, isPrivate, location, medias, companyId, userId, ticket, _c, messageType, buttons, conn, error_7, error_8, quickMessageId, result, error_9, result, messageData, message, sendText, buildGraphClient, conn, client, locRes, locMsgId, buildGraphClient, conn, client, c, contactPayload, ctRes, ctMsgId, quotedMsgWid, quotedMsgDbId, qMsg, error_10;
    var _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.body, body = _a.body, quotedMsg = _a.quotedMsg, vCard = _a.vCard, _b = _a.isPrivate, isPrivate = _b === void 0 ? "false" : _b, location = _a.location;
                medias = req.files;
                companyId = req.user.companyId;
                userId = Number(req.user.id);
                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticketId, companyId, userId)];
            case 1:
                ticket = _l.sent();
                if (ticket.channel === "whatsapp" && ticket.whatsappId) {
                    (0, SetTicketMessagesAsRead_1["default"])(ticket);
                }
                _c = req.body, messageType = _c.messageType, buttons = _c.buttons;
                if (!(messageType === "buttons" && Array.isArray(buttons) && buttons.length > 0)) return [3 /*break*/, 11];
                if (!(ticket.channel === "whatsapp_official")) return [3 /*break*/, 7];
                _l.label = 2;
            case 2:
                _l.trys.push([2, 5, , 6]);
                return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId, {
                        attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistencePermanentToken"]
                    })];
            case 3:
                conn = _l.sent();
                return [4 /*yield*/, (0, SendInteractiveMenu_1.SendCTAButtonsOfficial)({ ticket: ticket, messageText: body || "", buttons: buttons, connection: conn })];
            case 4:
                _l.sent();
                return [2 /*return*/, res.send()];
            case 5:
                error_7 = _l.sent();
                logger_1["default"].error("[store] Erro ao enviar bot\u00F5es CTA oficial ticket ".concat(ticket.id, ":"), error_7);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao enviar botões interativos" })];
            case 6: return [3 /*break*/, 11];
            case 7:
                if (!(ticket.channel === "whatsapp")) return [3 /*break*/, 11];
                _l.label = 8;
            case 8:
                _l.trys.push([8, 10, , 11]);
                return [4 /*yield*/, (0, SendInteractiveMenu_1.SendCTAButtons)({ ticket: ticket, messageText: body || "", buttons: buttons })];
            case 9:
                _l.sent();
                return [2 /*return*/, res.send()];
            case 10:
                error_8 = _l.sent();
                logger_1["default"].error("[store] Erro ao enviar bot\u00F5es CTA ticket ".concat(ticket.id, ":"), error_8);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao enviar botões interativos" })];
            case 11:
                quickMessageId = req.body.quickMessageId;
                if (!quickMessageId) return [3 /*break*/, 15];
                _l.label = 12;
            case 12:
                _l.trys.push([12, 14, , 15]);
                return [4 /*yield*/, processQuickMessageCommand("#{ \"resp\": \"".concat(quickMessageId, "\" }"), ticket)];
            case 13:
                result = _l.sent();
                if (result.processed)
                    return [2 /*return*/, res.send()];
                return [3 /*break*/, 15];
            case 14:
                error_9 = _l.sent();
                logger_1["default"].error("[store] Erro ao enviar m\u00EDdia de resposta r\u00E1pida ticket ".concat(ticket.id, ":"), error_9);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao enviar mídia da resposta rápida" })];
            case 15:
                if (!(!medias && body)) return [3 /*break*/, 17];
                return [4 /*yield*/, processQuickMessageCommand(body, ticket)];
            case 16:
                result = _l.sent();
                if (result.processed) {
                    // Se processou a resposta rápida, retorna sucesso sem enviar a mensagem original
                    return [2 /*return*/, res.send()];
                }
                _l.label = 17;
            case 17:
                _l.trys.push([17, 42, , 43]);
                if (!medias) return [3 /*break*/, 19];
                return [4 /*yield*/, Promise.all(medias.map(function (media, index) { return __awaiter(void 0, void 0, void 0, function () {
                        var sentMedia, error_11, quotedMsgWid, quotedMsgDbId, qMsg, audioVideoExt, filePath, fileExists;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(ticket.channel === "whatsapp")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({ media: media, ticket: ticket, body: Array.isArray(body) ? body[index] : body, isPrivate: isPrivate === "true", isForwarded: false })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!["facebook", "instagram"].includes(ticket.channel)) return [3 /*break*/, 7];
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 6, , 7]);
                                    return [4 /*yield*/, (0, sendFacebookMessageMedia_1.sendFacebookMessageMedia)({
                                            media: media,
                                            ticket: ticket,
                                            body: Array.isArray(body) ? body[index] : body
                                        })];
                                case 4:
                                    sentMedia = _a.sent();
                                    // Registrar a mídia enviada no histórico do ticket para ambos os canais
                                    return [4 /*yield*/, (0, facebookMessageListener_1.verifyMessageMedia)(sentMedia, ticket, ticket.contact, true)];
                                case 5:
                                    // Registrar a mídia enviada no histórico do ticket para ambos os canais
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    error_11 = _a.sent();
                                    console.log(error_11);
                                    return [3 /*break*/, 7];
                                case 7:
                                    if (!(ticket.channel === "whatsapp_official")) return [3 /*break*/, 11];
                                    quotedMsgWid = void 0;
                                    quotedMsgDbId = void 0;
                                    if (!(quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, Message_1["default"].findByPk(quotedMsg.id, { attributes: ["id", "wid"] })];
                                case 8:
                                    qMsg = _a.sent();
                                    if (qMsg) {
                                        quotedMsgWid = qMsg.wid;
                                        quotedMsgDbId = qMsg.id;
                                    }
                                    _a.label = 9;
                                case 9: return [4 /*yield*/, (0, SendMediaOfficialService_1.SendMediaOfficialService)({
                                        media: media,
                                        body: Array.isArray(body) ? body[index] : body,
                                        ticketId: ticket.id,
                                        contact: ticket.contact,
                                        connection: ticket.whatsapp,
                                        quotedMsgWid: quotedMsgWid,
                                        quotedMsgId: quotedMsgDbId
                                    })];
                                case 10:
                                    _a.sent();
                                    _a.label = 11;
                                case 11:
                                    // Não deletar arquivos da API oficial — o getter do modelo Message monta a URL
                                    // apontando para o arquivo no nosso servidor; deletar causa 404 no chat
                                    if (ticket.channel !== "whatsapp_official") {
                                        audioVideoExt = /\.(mp3|ogg|opus|wav|aac|m4a|mp4|webm|3gp|mov)$/i;
                                        if (!audioVideoExt.test(media.filename)) {
                                            filePath = path_1["default"].resolve("public", "company".concat(companyId), media.filename);
                                            fileExists = fs_1["default"].existsSync(filePath);
                                            if (fileExists && isPrivate === "false") {
                                                fs_1["default"].unlinkSync(filePath);
                                            }
                                        }
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 18:
                _l.sent();
                return [3 /*break*/, 41];
            case 19:
                if (!(ticket.channel === "whatsapp" && isPrivate === "false")) return [3 /*break*/, 21];
                return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: body, ticket: ticket, quotedMsg: quotedMsg, vCard: vCard, location: location })];
            case 20:
                _l.sent();
                return [3 /*break*/, 41];
            case 21:
                if (!(ticket.channel === "whatsapp" && isPrivate === "true")) return [3 /*break*/, 24];
                messageData = {
                    wid: "PVT".concat(ticket.updatedAt.toString().replace(' ', '')),
                    ticketId: ticket.id,
                    contactId: undefined,
                    body: body,
                    fromMe: true,
                    mediaType: !(0, lodash_1.isNil)(vCard) ? 'contactMessage' : 'extendedTextMessage',
                    read: true,
                    quotedMsgId: null,
                    ack: 2,
                    remoteJid: (_d = ticket.contact) === null || _d === void 0 ? void 0 : _d.remoteJid,
                    participant: null,
                    dataJson: null,
                    ticketTrakingId: null,
                    isPrivate: isPrivate === "true",
                    userId: req.user.id
                };
                return [4 /*yield*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: ticket.companyId })];
            case 22:
                message = _l.sent();
                // Enviar notificação push para dispositivos móveis
                return [4 /*yield*/, (0, NotificationController_1.notifyNewMessage)(message)];
            case 23:
                // Enviar notificação push para dispositivos móveis
                _l.sent();
                return [3 /*break*/, 41];
            case 24:
                if (!["facebook", "instagram"].includes(ticket.channel)) return [3 /*break*/, 27];
                return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({ body: body, ticket: ticket, quotedMsg: quotedMsg })];
            case 25:
                sendText = _l.sent();
                // Registrar texto enviado no histórico do ticket para ambos os canais
                return [4 /*yield*/, (0, facebookMessageListener_1.verifyMessageFace)(sendText, body, ticket, ticket.contact, true)];
            case 26:
                // Registrar texto enviado no histórico do ticket para ambos os canais
                _l.sent();
                return [3 /*break*/, 41];
            case 27:
                if (!(ticket.channel === "whatsapp_official")) return [3 /*break*/, 41];
                if (!((location === null || location === void 0 ? void 0 : location.latitude) && (location === null || location === void 0 ? void 0 : location.longitude))) return [3 /*break*/, 32];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/WhatsappCoexistence/graphApiHelper")); })];
            case 28:
                buildGraphClient = (_l.sent()).buildGraphClient;
                conn = ticket.whatsapp;
                client = buildGraphClient(conn.coexistencePermanentToken);
                return [4 /*yield*/, client.post("".concat(conn.coexistencePhoneNumberId, "/messages"), {
                        messaging_product: "whatsapp",
                        recipient_type: "individual",
                        to: ticket.contact.number,
                        type: "location",
                        location: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            name: location.address || "",
                            address: location.address || ""
                        }
                    })];
            case 29:
                locRes = _l.sent();
                locMsgId = (_g = (_f = (_e = locRes.data) === null || _e === void 0 ? void 0 : _e.messages) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.id;
                if (!locMsgId) return [3 /*break*/, 31];
                return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                        messageData: {
                            wid: locMsgId,
                            ticketId: ticket.id,
                            contactId: undefined,
                            body: location.address || "".concat(location.latitude, ",").concat(location.longitude),
                            fromMe: true,
                            read: true,
                            mediaType: "locationMessage",
                            ack: 2
                        },
                        companyId: ticket.companyId
                    })];
            case 30:
                _l.sent();
                _l.label = 31;
            case 31: return [3 /*break*/, 41];
            case 32:
                if (!vCard) return [3 /*break*/, 37];
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/WhatsappCoexistence/graphApiHelper")); })];
            case 33:
                buildGraphClient = (_l.sent()).buildGraphClient;
                conn = ticket.whatsapp;
                client = buildGraphClient(conn.coexistencePermanentToken);
                c = vCard;
                contactPayload = {
                    name: {
                        formatted_name: c.name || c.number || "Contato",
                        first_name: c.name || ""
                    },
                    phones: c.number ? [{ phone: c.number, type: "CELL" }] : []
                };
                if (c.email)
                    contactPayload.emails = [{ email: c.email, type: "WORK" }];
                return [4 /*yield*/, client.post("".concat(conn.coexistencePhoneNumberId, "/messages"), {
                        messaging_product: "whatsapp",
                        recipient_type: "individual",
                        to: ticket.contact.number,
                        type: "contacts",
                        contacts: [contactPayload]
                    })];
            case 34:
                ctRes = _l.sent();
                ctMsgId = (_k = (_j = (_h = ctRes.data) === null || _h === void 0 ? void 0 : _h.messages) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.id;
                if (!ctMsgId) return [3 /*break*/, 36];
                return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                        messageData: {
                            wid: ctMsgId,
                            ticketId: ticket.id,
                            contactId: undefined,
                            body: c.name || c.number || "Contato",
                            fromMe: true,
                            read: true,
                            mediaType: "contactMessage",
                            ack: 2
                        },
                        companyId: ticket.companyId
                    })];
            case 35:
                _l.sent();
                _l.label = 36;
            case 36: return [3 /*break*/, 41];
            case 37:
                if (!(body === null || body === void 0 ? void 0 : body.trim())) return [3 /*break*/, 41];
                quotedMsgWid = void 0;
                quotedMsgDbId = void 0;
                if (!(quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id)) return [3 /*break*/, 39];
                return [4 /*yield*/, Message_1["default"].findByPk(quotedMsg.id, { attributes: ["id", "wid"] })];
            case 38:
                qMsg = _l.sent();
                if (qMsg) {
                    quotedMsgWid = qMsg.wid;
                    quotedMsgDbId = qMsg.id;
                }
                _l.label = 39;
            case 39: return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({
                    body: body,
                    ticketId: ticket.id,
                    contact: ticket.contact,
                    connection: ticket.whatsapp,
                    quotedMsgWid: quotedMsgWid,
                    quotedMsgId: quotedMsgDbId
                })];
            case 40:
                _l.sent();
                _l.label = 41;
            case 41: return [2 /*return*/, res.send()];
            case 42:
                error_10 = _l.sent();
                console.log(error_10);
                return [2 /*return*/, res.status(400).json({ error: error_10.message })];
            case 43: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var forwardMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, quotedMsg, signMessage, messageId, contactId, _b, userId, companyId, requestUser, message, contact, settings, whatsAppConnectionId, ticket, mutex, createTicket, ticketData, body, mediaUrl, fileName, publicFolder, filePath, mediaSrc;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, quotedMsg = _a.quotedMsg, signMessage = _a.signMessage, messageId = _a.messageId, contactId = _a.contactId;
                _b = req.user, userId = _b.id, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(userId)];
            case 1:
                requestUser = _c.sent();
                if (!messageId || !contactId) {
                    return [2 /*return*/, res.status(200).send("MessageId or ContactId not found")];
                }
                return [4 /*yield*/, (0, ShowMessageService_1["default"])(messageId)];
            case 2:
                message = _c.sent();
                return [4 /*yield*/, (0, ShowContactService_1["default"])(contactId, companyId)];
            case 3:
                contact = _c.sent();
                if (!message) {
                    return [2 /*return*/, res.status(404).send("Message not found")];
                }
                if (!contact) {
                    return [2 /*return*/, res.status(404).send("Contact not found")];
                }
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 4:
                settings = _c.sent();
                return [4 /*yield*/, (0, ShowMessageService_1.GetWhatsAppFromMessage)(message)];
            case 5:
                whatsAppConnectionId = _c.sent();
                if (!whatsAppConnectionId) {
                    return [2 /*return*/, res.status(404).send('Whatsapp from message not found')];
                }
                return [4 /*yield*/, (0, ShowTicketService_1["default"])(message.ticketId, message.companyId)];
            case 6:
                ticket = _c.sent();
                mutex = new async_mutex_1.Mutex();
                return [4 /*yield*/, mutex.runExclusive(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(contact, ticket === null || ticket === void 0 ? void 0 : ticket.whatsapp, 0, ticket.companyId, ticket.queueId, requestUser.id, contact.isGroup ? contact : null, "whatsapp", null, true, settings, false, false)];
                                case 1:
                                    result = _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    }); })];
            case 7:
                createTicket = _c.sent();
                if ((0, lodash_1.isNil)(createTicket === null || createTicket === void 0 ? void 0 : createTicket.queueId)) {
                    ticketData = {
                        status: createTicket.isGroup ? "group" : "open",
                        userId: requestUser.id,
                        queueId: ticket.queueId
                    };
                }
                else {
                    ticketData = {
                        status: createTicket.isGroup ? "group" : "open",
                        userId: requestUser.id
                    };
                }
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: ticketData,
                        ticketId: createTicket.id,
                        companyId: createTicket.companyId
                    })];
            case 8:
                _c.sent();
                body = message.body;
                if (!(message.mediaType === 'conversation' || message.mediaType === 'extendedTextMessage')) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: body, ticket: createTicket, quotedMsg: quotedMsg, isForwarded: message.fromMe ? false : true })];
            case 9:
                _c.sent();
                return [3 /*break*/, 12];
            case 10:
                mediaUrl = message.mediaUrl.replace(":".concat(process.env.PORT), '');
                fileName = obterNomeEExtensaoDoArquivo(mediaUrl);
                if (body === fileName) {
                    body = "";
                }
                publicFolder = path_1["default"].join(__dirname, '..', '..', '..', 'backend', 'public');
                filePath = path_1["default"].join(publicFolder, "company".concat(createTicket.companyId), fileName);
                mediaSrc = {
                    fieldname: 'medias',
                    originalname: fileName,
                    encoding: '7bit',
                    mimetype: message.mediaType,
                    filename: fileName,
                    path: filePath
                };
                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({ media: mediaSrc, ticket: createTicket, body: body, isForwarded: message.fromMe ? false : true })];
            case 11:
                _c.sent();
                _c.label = 12;
            case 12: return [2 /*return*/, res.send()];
        }
    });
}); };
exports.forwardMessage = forwardMessage;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messageId, companyId, message, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageId = req.params.messageId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteWhatsAppMessage_1["default"])(messageId, companyId)];
            case 1:
                message = _a.sent();
                io = (0, socket_1.getIO)();
                if (!message.isPrivate) return [3 /*break*/, 3];
                return [4 /*yield*/, Message_1["default"].destroy({
                        where: {
                            id: message.id
                        }
                    })];
            case 2:
                _a.sent();
                io.of(String(companyId))
                    // .to(message.ticketId.toString())
                    .emit("company-".concat(companyId, "-appMessage"), {
                    action: "delete",
                    message: message
                });
                _a.label = 3;
            case 3:
                io.of(String(companyId))
                    // .to(message.ticketId.toString())
                    .emit("company-".concat(companyId, "-appMessage"), {
                    action: "update",
                    message: message
                });
                return [2 /*return*/, res.send()];
        }
    });
}); };
exports.remove = remove;
var allMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dateStart, dateEnd, fromMe, companyId, count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dateStart = req.query.dateStart;
                dateEnd = req.query.dateEnd;
                fromMe = req.query.fromMe;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListMessagesServiceAll_1["default"])({
                        companyId: companyId,
                        fromMe: fromMe,
                        dateStart: dateStart,
                        dateEnd: dateEnd
                    })];
            case 1:
                count = (_a.sent()).count;
                return [2 /*return*/, res.json({ count: count })];
        }
    });
}); };
exports.allMe = allMe;
var send = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messageData, medias, authHeader, _a, token, whatsapp_1, companyId, company, sendMessageWithExternalApi, number_1, body, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                messageData = req.body;
                medias = req.files;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { token: token } })];
            case 2:
                whatsapp_1 = _b.sent();
                companyId = whatsapp_1.companyId;
                return [4 /*yield*/, (0, ShowPlanCompanyService_1["default"])(companyId)];
            case 3:
                company = _b.sent();
                sendMessageWithExternalApi = company.plan.useExternalApi;
                if (!sendMessageWithExternalApi) return [3 /*break*/, 7];
                if (!whatsapp_1) {
                    throw new Error("Não foi possível realizar a operação");
                }
                if (messageData.number === undefined) {
                    throw new Error("O número é obrigatório");
                }
                number_1 = messageData.number;
                body = messageData.body;
                if (!medias) return [3 /*break*/, 5];
                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            req.app.get("queues").messageQueue.add("SendMessage", {
                                whatsappId: whatsapp_1.id,
                                data: {
                                    number: number_1,
                                    body: media.originalname.replace('/', '-'),
                                    mediaPath: media.path
                                }
                            }, { removeOnComplete: true, attempts: 3 });
                            return [2 /*return*/];
                        });
                    }); }))];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                req.app.get("queues").messageQueue.add("SendMessage", {
                    whatsappId: whatsapp_1.id,
                    data: {
                        number: number_1,
                        body: body
                    }
                }, { removeOnComplete: true, attempts: 3 });
                _b.label = 6;
            case 6: return [2 /*return*/, res.send({ mensagem: "Mensagem enviada!" })];
            case 7: return [2 /*return*/, res.status(400).json({ error: 'Essa empresa não tem permissão para usar a API Externa. Entre em contato com o Suporte para verificar nossos planos!' })];
            case 8:
                err_2 = _b.sent();
                console.log(err_2);
                if (Object.keys(err_2).length === 0) {
                    throw new AppError_1["default"]("Não foi possível enviar a mensagem, tente novamente em alguns instantes");
                }
                else {
                    throw new AppError_1["default"](err_2.message);
                }
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.send = send;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messageId, companyId, body, _a, ticket, message, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                messageId = req.params.messageId;
                companyId = req.user.companyId;
                body = req.body.body;
                return [4 /*yield*/, (0, EditWhatsAppMessage_1["default"])({ messageId: messageId, body: body })];
            case 1:
                _a = _b.sent(), ticket = _a.ticket, message = _a.message;
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    // .to(String(ticket.id))
                    .emit("company-".concat(companyId, "-appMessage"), {
                    action: "update",
                    message: message
                });
                io.of(String(companyId))
                    // .to(ticket.status)
                    // .to("notification")
                    // .to(String(ticket.id))
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "update",
                    ticket: ticket
                });
                return [2 /*return*/, res.send()];
        }
    });
}); };
exports.edit = edit;
var sendMessageFlow = function (whatsappId, body, req, files) { return __awaiter(void 0, void 0, void 0, function () {
    var messageData, medias, whatsapp, numberToTest, body_1, companyId, CheckValidNumber, number_2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageData = body;
                medias = files;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
            case 2:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new Error("Não foi possível realizar a operação");
                }
                if (messageData.number === undefined) {
                    throw new Error("O número é obrigatório");
                }
                numberToTest = messageData.number;
                body_1 = messageData.body;
                companyId = messageData.companyId;
                return [4 /*yield*/, (0, CheckNumber_1["default"])(numberToTest, companyId)];
            case 3:
                CheckValidNumber = _a.sent();
                number_2 = CheckValidNumber.replace(/\D/g, "");
                if (!medias) return [3 /*break*/, 5];
                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, req.app.get("queues").messageQueue.add("SendMessage", {
                                        whatsappId: whatsappId,
                                        data: {
                                            number: number_2,
                                            body: media.originalname,
                                            mediaPath: media.path
                                        }
                                    }, { removeOnComplete: true, attempts: 3 })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                req.app.get("queues").messageQueue.add("SendMessage", {
                    whatsappId: whatsappId,
                    data: {
                        number: number_2,
                        body: body_1
                    }
                }, { removeOnComplete: false, attempts: 3 });
                _a.label = 6;
            case 6: return [2 /*return*/, "Mensagem enviada"];
            case 7:
                err_3 = _a.sent();
                if (Object.keys(err_3).length === 0) {
                    throw new AppError_1["default"]("Não foi possível enviar a mensagem, tente novamente em alguns instantes");
                }
                else {
                    throw new AppError_1["default"](err_3.message);
                }
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.sendMessageFlow = sendMessageFlow;
