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
// @ts-nocheck
var axios_1 = __importDefault(require("axios"));
var baileys_1 = require("@whiskeysockets/baileys");
var wbotMessageListener_1 = require("../WbotServices/wbotMessageListener");
var logger_1 = __importDefault(require("../../utils/logger"));
var lodash_1 = require("lodash");
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var moment_1 = __importDefault(require("moment"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var typebotListener = function (_a) {
    var wbot = _a.wbot, msg = _a.msg, ticket = _a.ticket, typebot = _a.typebot;
    return __awaiter(void 0, void 0, void 0, function () {
        function createSession(msg, typebot, number) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var id, reqData, config, request, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            id = Math.floor(Math.random() * 10000000000).toString();
                            reqData = JSON.stringify({
                                "isStreamEnabled": true,
                                "message": "string",
                                "resultId": "string",
                                "isOnlyRegistering": false,
                                "prefilledVariables": {
                                    "number": number,
                                    "pushName": msg.pushName || "",
                                    "remoteJid": (_a = ticket === null || ticket === void 0 ? void 0 : ticket.contact) === null || _a === void 0 ? void 0 : _a.remoteJid
                                }
                            });
                            config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: "".concat(url, "/api/v1/typebots/").concat(typebotSlug, "/startChat"),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                data: reqData
                            };
                            return [4 /*yield*/, axios_1["default"].request(config)];
                        case 1:
                            request = _b.sent();
                            return [2 /*return*/, request.data];
                        case 2:
                            err_2 = _b.sent();
                            logger_1["default"].info("Erro ao criar sessão do typebot: ", err_2);
                            throw err_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var keyAny, remoteJid, url, typebotExpires, typebotKeywordFinish, typebotKeywordRestart, typebotUnknownMessage, typebotSlug, typebotDelayMessage, typebotRestartMessage, number, body, sessionId, dataStart, status, Agora, requestContinue, messages, input, clientSideActions, reqData, config, _i, messages_1, message, formattedText, linkPreview, _b, _c, richText, _d, _e, element, text, _f, _g, subelement, text_1, _h, _j, subelement2, text_2, linkText, linkText, linkText, gatilho, jsonGatilho, err_1, media, media, media, _k, clientSideActions_1, action, error_1;
        var _l, _m, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    keyAny = msg.key;
                    remoteJid = (_l = keyAny.remoteJidAlt) !== null && _l !== void 0 ? _l : msg.key.remoteJid;
                    if (remoteJid === 'status@broadcast')
                        return [2 /*return*/];
                    url = typebot.urlN8N, typebotExpires = typebot.typebotExpires, typebotKeywordFinish = typebot.typebotKeywordFinish, typebotKeywordRestart = typebot.typebotKeywordRestart, typebotUnknownMessage = typebot.typebotUnknownMessage, typebotSlug = typebot.typebotSlug, typebotDelayMessage = typebot.typebotDelayMessage, typebotRestartMessage = typebot.typebotRestartMessage;
                    number = remoteJid.replace(/\D/g, '');
                    body = (0, wbotMessageListener_1.getBodyMessage)(msg);
                    status = false;
                    _q.label = 1;
                case 1:
                    _q.trys.push([1, 60, , 62]);
                    Agora = new Date();
                    Agora.setMinutes(Agora.getMinutes() - Number(typebotExpires));
                    if (!(typebotExpires > 0 && Agora > ticket.typebotSessionTime)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ticket.update({
                            typebotSessionId: null,
                            typebotSessionTime: null,
                            isBot: true
                        })];
                case 2:
                    _q.sent();
                    return [4 /*yield*/, ticket.reload()];
                case 3:
                    _q.sent();
                    _q.label = 4;
                case 4:
                    if (!(0, lodash_1.isNil)(ticket.typebotSessionId)) return [3 /*break*/, 8];
                    return [4 /*yield*/, createSession(msg, typebot, number)];
                case 5:
                    dataStart = _q.sent();
                    sessionId = dataStart.sessionId;
                    status = true;
                    return [4 /*yield*/, ticket.update({
                            typebotSessionId: sessionId,
                            typebotStatus: true,
                            useIntegration: true,
                            integrationId: typebot.id,
                            typebotSessionTime: (0, moment_1["default"])().toDate()
                        })];
                case 6:
                    _q.sent();
                    return [4 /*yield*/, ticket.reload()];
                case 7:
                    _q.sent();
                    return [3 /*break*/, 9];
                case 8:
                    sessionId = ticket.typebotSessionId;
                    status = ticket.typebotStatus;
                    _q.label = 9;
                case 9:
                    if (!status)
                        return [2 /*return*/];
                    if (!(body.toLocaleLowerCase().trim() !== typebotKeywordFinish.toLocaleLowerCase().trim() && body.toLocaleLowerCase().trim() !== typebotKeywordRestart.toLocaleLowerCase().trim())) return [3 /*break*/, 53];
                    requestContinue = void 0;
                    messages = void 0;
                    input = void 0;
                    clientSideActions = void 0;
                    if (!((dataStart === null || dataStart === void 0 ? void 0 : dataStart.messages.length) === 0 || dataStart === undefined)) return [3 /*break*/, 11];
                    reqData = JSON.stringify({
                        "message": body
                    });
                    config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: "".concat(url, "/api/v1/sessions/").concat(sessionId, "/continueChat"),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: reqData
                    };
                    return [4 /*yield*/, axios_1["default"].request(config)];
                case 10:
                    requestContinue = _q.sent();
                    console.log(146, "typebotListener");
                    messages = (_m = requestContinue.data) === null || _m === void 0 ? void 0 : _m.messages;
                    input = (_o = requestContinue.data) === null || _o === void 0 ? void 0 : _o.input;
                    clientSideActions = (_p = requestContinue.data) === null || _p === void 0 ? void 0 : _p.clientSideActions;
                    return [3 /*break*/, 12];
                case 11:
                    console.log(153, "typebotListener");
                    messages = dataStart === null || dataStart === void 0 ? void 0 : dataStart.messages;
                    input = dataStart === null || dataStart === void 0 ? void 0 : dataStart.input;
                    clientSideActions = dataStart === null || dataStart === void 0 ? void 0 : dataStart.clientSideActions;
                    _q.label = 12;
                case 12:
                    if (!((messages === null || messages === void 0 ? void 0 : messages.length) === 0)) return [3 /*break*/, 14];
                    console.log(160, "typebotListener");
                    return [4 /*yield*/, wbot.sendMessage("".concat(number, "@c.us"), { text: typebotUnknownMessage })];
                case 13:
                    _q.sent();
                    return [3 /*break*/, 53];
                case 14:
                    console.log(163, "typebotListener");
                    _i = 0, messages_1 = messages;
                    _q.label = 15;
                case 15:
                    if (!(_i < messages_1.length)) return [3 /*break*/, 53];
                    message = messages_1[_i];
                    if (!(message.type === 'text')) return [3 /*break*/, 30];
                    formattedText = '';
                    linkPreview = false;
                    for (_b = 0, _c = message.content.richText; _b < _c.length; _b++) {
                        richText = _c[_b];
                        for (_d = 0, _e = richText.children; _d < _e.length; _d++) {
                            element = _e[_d];
                            text = '';
                            if (element.text) {
                                console.log(173, "typebotListener");
                                text = element.text;
                            }
                            if (element.type && element.children) {
                                for (_f = 0, _g = element.children; _f < _g.length; _f++) {
                                    subelement = _g[_f];
                                    text_1 = '';
                                    if (subelement.text) {
                                        console.log(181, "typebotListener");
                                        text_1 = subelement.text;
                                    }
                                    if (subelement.type && subelement.children) {
                                        for (_h = 0, _j = subelement.children; _h < _j.length; _h++) {
                                            subelement2 = _j[_h];
                                            text_2 = '';
                                            console.log(188, "typebotListener");
                                            if (subelement2.text) {
                                                text_2 = subelement2.text;
                                            }
                                            if (subelement2.bold) {
                                                text_2 = "*".concat(text_2, "*");
                                            }
                                            if (subelement2.italic) {
                                                text_2 = "_".concat(text_2, "_");
                                            }
                                            if (subelement2.underline) {
                                                text_2 = "~".concat(text_2, "~");
                                            }
                                            if (subelement2.url) {
                                                linkText = subelement2.children[0].text;
                                                text_2 = "[".concat(linkText, "](").concat(subelement2.url, ")");
                                                linkPreview = true;
                                            }
                                            formattedText += text_2;
                                        }
                                    }
                                    if (subelement.bold) {
                                        text_1 = "*".concat(text_1, "*");
                                    }
                                    if (subelement.italic) {
                                        text_1 = "_".concat(text_1, "_");
                                    }
                                    if (subelement.underline) {
                                        text_1 = "~".concat(text_1, "~");
                                    }
                                    if (subelement.url) {
                                        linkText = subelement.children[0].text;
                                        text_1 = "[".concat(linkText, "](").concat(subelement.url, ")");
                                        linkPreview = true;
                                    }
                                    formattedText += text_1;
                                }
                            }
                            if (element.bold) {
                                text = "*".concat(text, "*");
                            }
                            if (element.italic) {
                                text = "_".concat(text, "_");
                            }
                            if (element.underline) {
                                text = "~".concat(text, "~");
                            }
                            if (element.url) {
                                linkText = element.children[0].text;
                                text = "[".concat(linkText, "](").concat(element.url, ")");
                                linkPreview = true;
                            }
                            formattedText += text;
                        }
                        formattedText += '\n';
                    }
                    formattedText = formattedText.replace('**', '').replace(/\n$/, '');
                    if (formattedText === "Invalid message. Please, try again.") {
                        formattedText = typebotUnknownMessage;
                    }
                    if (!formattedText.startsWith("#")) return [3 /*break*/, 24];
                    gatilho = formattedText.replace("#", "");
                    _q.label = 16;
                case 16:
                    _q.trys.push([16, 23, , 24]);
                    jsonGatilho = JSON.parse(gatilho);
                    if (!(jsonGatilho.stopBot && (0, lodash_1.isNil)(jsonGatilho.userId) && (0, lodash_1.isNil)(jsonGatilho.queueId))) return [3 /*break*/, 18];
                    return [4 /*yield*/, ticket.update({
                            useIntegration: false,
                            isBot: false
                        })];
                case 17:
                    _q.sent();
                    return [2 /*return*/];
                case 18:
                    if (!(!(0, lodash_1.isNil)(jsonGatilho.queueId) && jsonGatilho.queueId > 0 && (0, lodash_1.isNil)(jsonGatilho.userId))) return [3 /*break*/, 20];
                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                            ticketData: {
                                queueId: jsonGatilho.queueId,
                                isBot: false,
                                useIntegration: false,
                                integrationId: null
                            },
                            ticketId: ticket.id,
                            companyId: ticket.companyId
                        })];
                case 19:
                    _q.sent();
                    return [2 /*return*/];
                case 20:
                    if (!(!(0, lodash_1.isNil)(jsonGatilho.queueId) && jsonGatilho.queueId > 0 && !(0, lodash_1.isNil)(jsonGatilho.userId) && jsonGatilho.userId > 0)) return [3 /*break*/, 22];
                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                            ticketData: {
                                queueId: jsonGatilho.queueId,
                                userId: jsonGatilho.userId,
                                isBot: false,
                                useIntegration: false,
                                integrationId: null
                            },
                            ticketId: ticket.id,
                            companyId: ticket.companyId
                        })];
                case 21:
                    _q.sent();
                    return [2 /*return*/];
                case 22: return [3 /*break*/, 24];
                case 23:
                    err_1 = _q.sent();
                    throw err_1;
                case 24: return [4 /*yield*/, wbot.presenceSubscribe(msg.key.remoteJid)
                    //await delay(2000)
                ];
                case 25:
                    _q.sent();
                    //await delay(2000)
                    return [4 /*yield*/, wbot.sendPresenceUpdate('composing', msg.key.remoteJid)];
                case 26:
                    //await delay(2000)
                    _q.sent();
                    return [4 /*yield*/, (0, baileys_1.delay)(typebotDelayMessage)];
                case 27:
                    _q.sent();
                    return [4 /*yield*/, wbot.sendPresenceUpdate('paused', msg.key.remoteJid)];
                case 28:
                    _q.sent();
                    return [4 /*yield*/, wbot.sendMessage(msg.key.remoteJid, { text: (0, Mustache_1["default"])(formattedText, ticket) })];
                case 29:
                    _q.sent();
                    _q.label = 30;
                case 30:
                    if (!(message.type === 'audio')) return [3 /*break*/, 36];
                    return [4 /*yield*/, wbot.presenceSubscribe(msg.key.remoteJid)
                        //await delay(2000)
                    ];
                case 31:
                    _q.sent();
                    //await delay(2000)
                    return [4 /*yield*/, wbot.sendPresenceUpdate('composing', msg.key.remoteJid)];
                case 32:
                    //await delay(2000)
                    _q.sent();
                    return [4 /*yield*/, (0, baileys_1.delay)(typebotDelayMessage)];
                case 33:
                    _q.sent();
                    return [4 /*yield*/, wbot.sendPresenceUpdate('paused', msg.key.remoteJid)];
                case 34:
                    _q.sent();
                    media = {
                        audio: {
                            url: message.content.url
                        },
                        mimetype: 'audio/mp4',
                        ptt: true
                    };
                    return [4 /*yield*/, wbot.sendMessage(msg.key.remoteJid, media)];
                case 35:
                    _q.sent();
                    _q.label = 36;
                case 36:
                    if (!(message.type === 'image')) return [3 /*break*/, 42];
                    return [4 /*yield*/, wbot.presenceSubscribe(msg.key.remoteJid)
                        //await delay(2000)
                    ];
                case 37:
                    _q.sent();
                    //await delay(2000)
                    return [4 /*yield*/, wbot.sendPresenceUpdate('composing', msg.key.remoteJid)];
                case 38:
                    //await delay(2000)
                    _q.sent();
                    return [4 /*yield*/, (0, baileys_1.delay)(typebotDelayMessage)];
                case 39:
                    _q.sent();
                    return [4 /*yield*/, wbot.sendPresenceUpdate('paused', msg.key.remoteJid)];
                case 40:
                    _q.sent();
                    media = {
                        image: {
                            url: message.content.url
                        }
                    };
                    return [4 /*yield*/, wbot.sendMessage(msg.key.remoteJid, media)];
                case 41:
                    _q.sent();
                    _q.label = 42;
                case 42:
                    if (!(message.type === 'video')) return [3 /*break*/, 48];
                    return [4 /*yield*/, wbot.presenceSubscribe(msg.key.remoteJid)
                        //await delay(2000)
                    ];
                case 43:
                    _q.sent();
                    //await delay(2000)
                    return [4 /*yield*/, wbot.sendPresenceUpdate('composing', msg.key.remoteJid)];
                case 44:
                    //await delay(2000)
                    _q.sent();
                    return [4 /*yield*/, (0, baileys_1.delay)(typebotDelayMessage)];
                case 45:
                    _q.sent();
                    return [4 /*yield*/, wbot.sendPresenceUpdate('paused', msg.key.remoteJid)];
                case 46:
                    _q.sent();
                    media = {
                        video: {
                            url: message.content.url
                        }
                    };
                    return [4 /*yield*/, wbot.sendMessage(msg.key.remoteJid, media)];
                case 47:
                    _q.sent();
                    _q.label = 48;
                case 48:
                    if (!clientSideActions) return [3 /*break*/, 52];
                    _k = 0, clientSideActions_1 = clientSideActions;
                    _q.label = 49;
                case 49:
                    if (!(_k < clientSideActions_1.length)) return [3 /*break*/, 52];
                    action = clientSideActions_1[_k];
                    if (!((action === null || action === void 0 ? void 0 : action.lastBubbleBlockId) === message.id)) return [3 /*break*/, 51];
                    if (!action.wait) return [3 /*break*/, 51];
                    return [4 /*yield*/, (0, baileys_1.delay)(action.wait.secondsToWaitFor * 1000)];
                case 50:
                    _q.sent();
                    _q.label = 51;
                case 51:
                    _k++;
                    return [3 /*break*/, 49];
                case 52:
                    _i++;
                    return [3 /*break*/, 15];
                case 53:
                    console.log(373, "typebotListener", JSON.stringify(dataStart, null, 4));
                    if (!(body.toLocaleLowerCase().trim() === typebotKeywordRestart.toLocaleLowerCase().trim())) return [3 /*break*/, 57];
                    return [4 /*yield*/, ticket.update({
                            isBot: true,
                            typebotSessionId: null
                        })];
                case 54:
                    _q.sent();
                    console.log(380, "typebotListener");
                    return [4 /*yield*/, ticket.reload()];
                case 55:
                    _q.sent();
                    return [4 /*yield*/, wbot.sendMessage("".concat(number, "@c.us"), { text: typebotRestartMessage })];
                case 56:
                    _q.sent();
                    _q.label = 57;
                case 57:
                    console.log(386, "typebotListener");
                    if (!(body.toLocaleLowerCase().trim() === typebotKeywordFinish.toLocaleLowerCase().trim())) return [3 /*break*/, 59];
                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                            ticketData: {
                                status: "closed",
                                useIntegration: false,
                                integrationId: null,
                                sendFarewellMessage: true
                            },
                            ticketId: ticket.id,
                            companyId: ticket.companyId
                        })];
                case 58:
                    _q.sent();
                    console.log(398, "typebotListener");
                    return [2 /*return*/];
                case 59:
                    console.log(402, "typebotListener");
                    return [3 /*break*/, 62];
                case 60:
                    error_1 = _q.sent();
                    logger_1["default"].info("Error on typebotListener: ", error_1);
                    return [4 /*yield*/, ticket.update({
                            typebotSessionId: null
                        })];
                case 61:
                    _q.sent();
                    throw error_1;
                case 62: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = typebotListener;
