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
exports.SendMenuWithFallback = exports.SendInteractiveMenuOfficial = exports.SendCTAButtonsOfficial = exports.SendCTAButtons = exports.SendMenuAsText = exports.SendInteractiveMenu = void 0;
var baileys_1 = require("@whiskeysockets/baileys");
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var GetTicketWbot_1 = __importDefault(require("./GetTicketWbot"));
var bluebird_1 = require("bluebird");
var SendWhatsAppMediaFlow_1 = require("../services/WbotServices/SendWhatsAppMediaFlow");
var logger_1 = __importDefault(require("../utils/logger"));
var CreateMessageService_1 = __importDefault(require("../services/MessageServices/CreateMessageService"));
var graphApiHelper_1 = require("../services/WhatsappCoexistence/graphApiHelper");
var SendTextOfficialService_1 = require("../services/WhatsAppOfficial/SendTextOfficialService");
var SendInteractiveMenu = function (_a) {
    var ticket = _a.ticket, menuMessage = _a.menuMessage, arrayOption = _a.arrayOption;
    return __awaiter(void 0, void 0, void 0, function () {
        var wbot, jid, buttons, interactiveMsg, newMsg, additionalNodes, buttonsData, err_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 1:
                    wbot = _b.sent();
                    jid = "".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                    if (arrayOption.length > 3) {
                        logger_1["default"].warn("\u26A0\uFE0F Menu com ".concat(arrayOption.length, " op\u00E7\u00F5es excede o limite de 3, usando fallback textual"));
                        throw new Error("Too many options for interactive menu");
                    }
                    buttons = arrayOption.map(function (option) { return ({
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: option.value.trim(),
                            id: option.number.toString()
                        })
                    }); });
                    interactiveMsg = {
                        interactiveMessage: {
                            body: {
                                text: menuMessage.trim()
                            },
                            nativeFlowMessage: {
                                buttons: buttons,
                                messageParamsJson: JSON.stringify({
                                    from: "apiv2",
                                    templateId: "4194019344155670"
                                })
                            }
                        }
                    };
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "composing")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, bluebird_1.delay)(2000)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "paused")];
                case 4:
                    _b.sent();
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
                case 5:
                    _b.sent();
                    if (!newMsg) return [3 /*break*/, 7];
                    return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    buttonsData = arrayOption.map(function (option) { return ({
                        name: "quick_reply",
                        displayText: option.value.trim(),
                        id: option.number.toString(),
                        url: "",
                        copyCode: "",
                        phoneNumber: ""
                    }); });
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: {
                                wid: newMsg.key.id,
                                ticketId: ticket.id,
                                contactId: undefined,
                                body: menuMessage.trim() || "📋",
                                fromMe: true,
                                read: true,
                                mediaType: "interactiveMessage",
                                ack: 2,
                                fromAgent: false,
                                buttonsData: buttonsData
                            },
                            companyId: ticket.companyId
                        })];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    logger_1["default"].warn("[SendInteractiveMenu] Falha ao salvar mensagem no banco: ".concat(err_1));
                    return [3 /*break*/, 10];
                case 10:
                    logger_1["default"].info("\uD83D\uDCF1 Menu interativo enviado para ticket ".concat(ticket.id, " com ").concat(buttons.length, " bot\u00F5es"));
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _b.sent();
                    logger_1["default"].error("\u274C Erro ao enviar menu interativo para ticket ".concat(ticket.id, ":"), error_1);
                    throw error_1;
                case 12: return [2 /*return*/];
            }
        });
    });
};
exports.SendInteractiveMenu = SendInteractiveMenu;
var SendMenuAsText = function (_a) {
    var ticket = _a.ticket, menuMessage = _a.menuMessage, arrayOption = _a.arrayOption;
    return __awaiter(void 0, void 0, void 0, function () {
        var optionsMenu_1, menuText, SendWhatsAppMessage, ShowTicketService, ticketDetails, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    optionsMenu_1 = "";
                    arrayOption.forEach(function (item) {
                        optionsMenu_1 += "[".concat(item.number, "] ").concat(item.value, "\n");
                    });
                    menuText = "".concat(menuMessage, "\n\n").concat(optionsMenu_1);
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/WbotServices/SendWhatsAppMessage")); })];
                case 1:
                    SendWhatsAppMessage = (_b.sent())["default"];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/TicketServices/ShowTicketService")); })];
                case 2:
                    ShowTicketService = (_b.sent())["default"];
                    return [4 /*yield*/, ShowTicketService(ticket.id, ticket.companyId)];
                case 3:
                    ticketDetails = _b.sent();
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "composing")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, bluebird_1.delay)(2000)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "paused")];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, SendWhatsAppMessage({
                            body: menuText,
                            ticket: ticketDetails,
                            quotedMsg: null
                        })];
                case 7:
                    _b.sent();
                    logger_1["default"].info("\uD83D\uDCDD Menu textual enviado para ticket ".concat(ticket.id));
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _b.sent();
                    logger_1["default"].error("\u274C Erro ao enviar menu textual para ticket ".concat(ticket.id, ":"), error_2);
                    throw error_2;
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.SendMenuAsText = SendMenuAsText;
var SendCTAButtons = function (_a) {
    var ticket = _a.ticket, messageText = _a.messageText, buttons = _a.buttons;
    return __awaiter(void 0, void 0, void 0, function () {
        var channel, connection, full, wbot, jid, nativeButtons, interactiveMsg, newMsg, additionalNodes, buttonsData, err_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (buttons.length === 0 || buttons.length > 3) {
                        throw new Error("SendCTAButtons: esperado 1-3 bot\u00F5es, recebido ".concat(buttons.length));
                    }
                    channel = (_b = ticket.whatsapp) === null || _b === void 0 ? void 0 : _b.channel;
                    if (!(channel === "whatsapp_official")) return [3 /*break*/, 4];
                    connection = ticket.whatsapp;
                    if (!!(connection === null || connection === void 0 ? void 0 : connection.coexistencePermanentToken)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId, {
                            attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
                        })];
                case 1:
                    full = _c.sent();
                    if (full)
                        connection = full;
                    _c.label = 2;
                case 2: return [4 /*yield*/, (0, exports.SendCTAButtonsOfficial)({ ticket: ticket, messageText: messageText, buttons: buttons, connection: connection })];
                case 3: return [2 /*return*/, _c.sent()];
                case 4: return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 5:
                    wbot = _c.sent();
                    jid = "".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                    nativeButtons = buttons.map(function (btn) {
                        if (btn.type === "cta_url") {
                            return {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: btn.displayText.trim(),
                                    url: btn.value.trim(),
                                    merchant_url: btn.value.trim()
                                })
                            };
                        }
                        else {
                            return {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: btn.displayText.trim(),
                                    copy_code: btn.value.trim()
                                })
                            };
                        }
                    });
                    interactiveMsg = {
                        interactiveMessage: {
                            body: {
                                text: messageText.trim()
                            },
                            nativeFlowMessage: {
                                buttons: nativeButtons,
                                messageParamsJson: JSON.stringify({
                                    from: "apiv2",
                                    templateId: "4194019344155670"
                                })
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
                case 6:
                    _c.sent();
                    if (!newMsg) return [3 /*break*/, 8];
                    return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    buttonsData = buttons.map(function (btn) { return ({
                        name: btn.type,
                        displayText: btn.displayText,
                        url: btn.type === "cta_url" ? btn.value : "",
                        copyCode: btn.type === "cta_copy" ? btn.value : "",
                        id: "",
                        phoneNumber: ""
                    }); });
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: {
                                wid: newMsg.key.id,
                                ticketId: ticket.id,
                                contactId: undefined,
                                body: messageText.trim() || "📲",
                                fromMe: true,
                                read: true,
                                mediaType: "interactiveMessage",
                                ack: 2,
                                fromAgent: false,
                                buttonsData: buttonsData
                            },
                            companyId: ticket.companyId
                        })];
                case 9:
                    _c.sent();
                    return [3 /*break*/, 11];
                case 10:
                    err_2 = _c.sent();
                    logger_1["default"].warn("[SendCTAButtons] Falha ao salvar mensagem no banco: ".concat(err_2));
                    return [3 /*break*/, 11];
                case 11:
                    logger_1["default"].info("\uD83D\uDD17 Bot\u00F5es CTA enviados para ticket ".concat(ticket.id, " (").concat(buttons.length, " bot\u00E3o/bot\u00F5es)"));
                    return [2 /*return*/];
            }
        });
    });
};
exports.SendCTAButtons = SendCTAButtons;
var SendCTAButtonsOfficial = function (_a) {
    var ticket = _a.ticket, messageText = _a.messageText, buttons = _a.buttons, connection = _a.connection;
    return __awaiter(void 0, void 0, void 0, function () {
        var client, to, contact, urlButtons, copyButtons, fullBody, saveMessage, copyCodeSupported, _i, copyButtons_1, btn, res, msgId, copyErr_1, fallbackBody, res, msgId, i, body, res, msgId;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    if (buttons.length === 0 || buttons.length > 3) {
                        throw new Error("SendCTAButtonsOfficial: esperado 1-3 bot\u00F5es, recebido ".concat(buttons.length));
                    }
                    if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
                        throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
                    }
                    client = (0, graphApiHelper_1.buildGraphClient)(connection.coexistencePermanentToken);
                    to = ticket.contact.number;
                    contact = ticket.contact;
                    urlButtons = buttons.filter(function (b) { return b.type === "cta_url"; });
                    copyButtons = buttons.filter(function (b) { return b.type === "cta_copy"; });
                    fullBody = messageText.trim();
                    if (urlButtons.length > 0 && copyButtons.length > 0) {
                        fullBody += "\n\n" + copyButtons.map(function (b) { return "\uD83D\uDCCB *".concat(b.displayText, "*: ").concat(b.value); }).join("\n");
                    }
                    saveMessage = function (wid, body, btns) { return __awaiter(void 0, void 0, void 0, function () {
                        var buttonsData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    buttonsData = btns.map(function (btn) { return ({
                                        name: btn.type,
                                        displayText: btn.displayText,
                                        url: btn.type === "cta_url" ? btn.value : "",
                                        copyCode: btn.type === "cta_copy" ? btn.value : "",
                                        id: "",
                                        phoneNumber: ""
                                    }); });
                                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                                            messageData: {
                                                wid: wid,
                                                ticketId: ticket.id,
                                                contactId: undefined,
                                                body: body,
                                                fromMe: true,
                                                read: true,
                                                mediaType: "interactiveMessage",
                                                ack: 2,
                                                fromAgent: false,
                                                buttonsData: buttonsData
                                            },
                                            companyId: connection.companyId
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(urlButtons.length === 0)) return [3 /*break*/, 11];
                    copyCodeSupported = true;
                    _i = 0, copyButtons_1 = copyButtons;
                    _l.label = 1;
                case 1:
                    if (!(_i < copyButtons_1.length)) return [3 /*break*/, 8];
                    btn = copyButtons_1[_i];
                    if (!copyCodeSupported)
                        return [3 /*break*/, 8];
                    _l.label = 2;
                case 2:
                    _l.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, client.post("".concat(connection.coexistencePhoneNumberId, "/messages"), {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: to,
                            type: "interactive",
                            interactive: {
                                type: "copy_code",
                                body: { text: copyButtons.indexOf(btn) === 0 ? messageText.trim() : "\uD83D\uDCCB ".concat(btn.displayText) },
                                action: {
                                    name: "copy_code",
                                    parameters: { code: btn.value }
                                }
                            }
                        })];
                case 3:
                    res = _l.sent();
                    msgId = (_d = (_c = (_b = res.data) === null || _b === void 0 ? void 0 : _b.messages) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id;
                    if (!msgId) return [3 /*break*/, 5];
                    return [4 /*yield*/, saveMessage(msgId, messageText.trim(), [btn])];
                case 4:
                    _l.sent();
                    _l.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    copyErr_1 = _l.sent();
                    // copy_code não suportado nesta conta — fallback para texto
                    copyCodeSupported = false;
                    logger_1["default"].warn("[SendCTAButtonsOfficial] copy_code n\u00E3o suportado, usando fallback textual: ".concat(copyErr_1 === null || copyErr_1 === void 0 ? void 0 : copyErr_1.message));
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8:
                    if (!!copyCodeSupported) return [3 /*break*/, 10];
                    fallbackBody = messageText.trim() + "\n\n" +
                        copyButtons.map(function (b) { return "\uD83D\uDCCB *".concat(b.displayText, "*: ").concat(b.value); }).join("\n");
                    return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({
                            body: fallbackBody,
                            ticketId: ticket.id,
                            contact: contact,
                            connection: connection
                        })];
                case 9:
                    _l.sent();
                    _l.label = 10;
                case 10: return [3 /*break*/, 20];
                case 11:
                    if (!(urlButtons.length === 1 && copyButtons.length === 0)) return [3 /*break*/, 15];
                    return [4 /*yield*/, client.post("".concat(connection.coexistencePhoneNumberId, "/messages"), {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: to,
                            type: "interactive",
                            interactive: {
                                type: "cta_url",
                                body: { text: fullBody },
                                action: {
                                    name: "cta_url",
                                    parameters: {
                                        display_text: urlButtons[0].displayText.trim(),
                                        url: urlButtons[0].value.trim()
                                    }
                                }
                            }
                        })];
                case 12:
                    res = _l.sent();
                    msgId = (_g = (_f = (_e = res.data) === null || _e === void 0 ? void 0 : _e.messages) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.id;
                    if (!msgId) return [3 /*break*/, 14];
                    return [4 /*yield*/, saveMessage(msgId, fullBody, buttons)];
                case 13:
                    _l.sent();
                    _l.label = 14;
                case 14: return [3 /*break*/, 20];
                case 15:
                    i = 0;
                    _l.label = 16;
                case 16:
                    if (!(i < urlButtons.length)) return [3 /*break*/, 20];
                    body = i === 0 ? fullBody : "\uD83D\uDD17 ".concat(urlButtons[i].displayText);
                    return [4 /*yield*/, client.post("".concat(connection.coexistencePhoneNumberId, "/messages"), {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: to,
                            type: "interactive",
                            interactive: {
                                type: "cta_url",
                                body: { text: body },
                                action: {
                                    name: "cta_url",
                                    parameters: {
                                        display_text: urlButtons[i].displayText.trim(),
                                        url: urlButtons[i].value.trim()
                                    }
                                }
                            }
                        })];
                case 17:
                    res = _l.sent();
                    msgId = (_k = (_j = (_h = res.data) === null || _h === void 0 ? void 0 : _h.messages) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.id;
                    if (!msgId) return [3 /*break*/, 19];
                    return [4 /*yield*/, saveMessage(msgId, body, i === 0 ? buttons : [urlButtons[i]])];
                case 18:
                    _l.sent();
                    _l.label = 19;
                case 19:
                    i++;
                    return [3 /*break*/, 16];
                case 20:
                    logger_1["default"].info("\uD83D\uDD17 [Official] Bot\u00F5es CTA enviados para ticket ".concat(ticket.id, " \u2014 ").concat(urlButtons.length, " URL + ").concat(copyButtons.length, " copy"));
                    return [2 /*return*/];
            }
        });
    });
};
exports.SendCTAButtonsOfficial = SendCTAButtonsOfficial;
// Menu interativo via Cloud API:
// ≤3 opções → reply buttons | >3 opções → list message (max 10 itens)
var SendInteractiveMenuOfficial = function (_a) {
    var ticket = _a.ticket, menuMessage = _a.menuMessage, arrayOption = _a.arrayOption, connection = _a.connection, _b = _a.forceList, forceList = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var client, to, interactive, response, messageId, buttonsData;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
                        throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
                    }
                    client = (0, graphApiHelper_1.buildGraphClient)(connection.coexistencePermanentToken);
                    to = ticket.contact.number;
                    if (!forceList && arrayOption.length <= 3) {
                        // Cloud API reply buttons (máximo 3, título máximo 20 chars)
                        interactive = {
                            type: "button",
                            body: { text: menuMessage.trim() },
                            action: {
                                buttons: arrayOption.map(function (option) { return ({
                                    type: "reply",
                                    reply: {
                                        id: option.number.toString(),
                                        title: option.value.trim().substring(0, 20)
                                    }
                                }); })
                            }
                        };
                    }
                    else {
                        // Cloud API list message — ativado com forceList=true ou >3 opções (máximo 10 por seção)
                        interactive = {
                            type: "list",
                            body: { text: menuMessage.trim() },
                            action: {
                                button: "Ver opções",
                                sections: [{
                                        title: "Opções",
                                        rows: arrayOption.slice(0, 10).map(function (option) { return ({
                                            id: option.number.toString(),
                                            title: option.value.trim().substring(0, 24)
                                        }); })
                                    }]
                            }
                        };
                    }
                    return [4 /*yield*/, client.post("".concat(connection.coexistencePhoneNumberId, "/messages"), {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: to,
                            type: "interactive",
                            interactive: interactive
                        })];
                case 1:
                    response = _f.sent();
                    messageId = (_e = (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.messages) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.id;
                    if (!messageId) return [3 /*break*/, 3];
                    buttonsData = arrayOption.map(function (option) { return ({
                        name: "quick_reply",
                        displayText: option.value.trim(),
                        id: option.number.toString(),
                        url: "",
                        copyCode: "",
                        phoneNumber: ""
                    }); });
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: {
                                wid: messageId,
                                ticketId: ticket.id,
                                contactId: undefined,
                                body: menuMessage.trim() || "📋",
                                fromMe: true,
                                read: true,
                                mediaType: "interactiveMessage",
                                ack: 2,
                                fromAgent: false,
                                buttonsData: buttonsData
                            },
                            companyId: connection.companyId
                        })];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    logger_1["default"].info("\uD83D\uDCF1 [Official] Menu enviado para ticket ".concat(ticket.id, " (").concat(arrayOption.length, " op\u00E7\u00F5es)"));
                    return [2 /*return*/];
            }
        });
    });
};
exports.SendInteractiveMenuOfficial = SendInteractiveMenuOfficial;
var SendMenuWithFallback = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var menuType, channel, connection, full, error_3, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                menuType = data.menuType || "buttons";
                channel = (_a = data.ticket.whatsapp) === null || _a === void 0 ? void 0 : _a.channel;
                if (!(channel === "whatsapp_official")) return [3 /*break*/, 7];
                connection = data.ticket.whatsapp;
                if (!!(connection === null || connection === void 0 ? void 0 : connection.coexistencePermanentToken)) return [3 /*break*/, 2];
                return [4 /*yield*/, Whatsapp_1["default"].findByPk(data.ticket.whatsappId, {
                        attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
                    })];
            case 1:
                full = _b.sent();
                if (full)
                    connection = full;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 6]);
                return [4 /*yield*/, (0, exports.SendInteractiveMenuOfficial)({
                        ticket: data.ticket,
                        menuMessage: data.menuMessage,
                        arrayOption: data.arrayOption,
                        connection: connection,
                        forceList: menuType === "list"
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4:
                error_3 = _b.sent();
                logger_1["default"].warn("\u26A0\uFE0F Menu oficial falhou ticket ".concat(data.ticket.id, ", fallback textual:"), error_3);
                return [4 /*yield*/, (0, exports.SendMenuAsText)(data)];
            case 5:
                _b.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
            case 7:
                if (!(menuType === "list")) return [3 /*break*/, 9];
                logger_1["default"].warn("\u26A0\uFE0F Lista interativa n\u00E3o suportada em Baileys (ticket ".concat(data.ticket.id, "), usando texto"));
                return [4 /*yield*/, (0, exports.SendMenuAsText)(data)];
            case 8:
                _b.sent();
                return [2 /*return*/];
            case 9:
                if (!(menuType === "text")) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, exports.SendMenuAsText)(data)];
            case 10:
                _b.sent();
                return [2 /*return*/];
            case 11:
                if (!(data.arrayOption.length <= 3)) return [3 /*break*/, 16];
                _b.label = 12;
            case 12:
                _b.trys.push([12, 14, , 15]);
                return [4 /*yield*/, (0, exports.SendInteractiveMenu)(data)];
            case 13:
                _b.sent();
                return [2 /*return*/];
            case 14:
                error_4 = _b.sent();
                logger_1["default"].warn("\u26A0\uFE0F Quick reply falhou para ticket ".concat(data.ticket.id, ", usando fallback textual:"), error_4);
                return [3 /*break*/, 15];
            case 15: return [3 /*break*/, 17];
            case 16:
                logger_1["default"].warn("\u26A0\uFE0F Menu com ".concat(data.arrayOption.length, " op\u00E7\u00F5es excede limite de 3, usando fallback textual"));
                _b.label = 17;
            case 17: return [4 /*yield*/, (0, exports.SendMenuAsText)(data)];
            case 18:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.SendMenuWithFallback = SendMenuWithFallback;
