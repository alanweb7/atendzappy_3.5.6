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
exports.SendCarouselWithFallback = exports.SendCarouselAsText = exports.SendCarouselMessage = void 0;
var loadBaileys_1 = require("../utils/loadBaileys");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var GetTicketWbot_1 = __importDefault(require("./GetTicketWbot"));
var bluebird_1 = require("bluebird");
var SendWhatsAppMediaFlow_1 = require("../services/WbotServices/SendWhatsAppMediaFlow");
var logger_1 = __importDefault(require("../utils/logger"));
var buildCardButton = function (btn) {
    if (btn.type === "cta_url") {
        return {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: btn.text,
                url: btn.value,
                merchant_url: btn.value
            })
        };
    }
    if (btn.type === "cta_copy") {
        return {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
                display_text: btn.text,
                copy_code: btn.value
            })
        };
    }
    return {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
            display_text: btn.text,
            id: btn.value
        })
    };
};
var resolveCardButtons = function (card) {
    var _a, _b;
    if (card.buttons && card.buttons.length > 0) {
        return card.buttons.slice(0, 2).map(buildCardButton);
    }
    if (card.button) {
        var isUrl = ((_a = card.button.value) === null || _a === void 0 ? void 0 : _a.startsWith("http://")) || ((_b = card.button.value) === null || _b === void 0 ? void 0 : _b.startsWith("https://"));
        return [buildCardButton({
                type: isUrl ? "cta_url" : "quick_reply",
                text: card.button.text,
                value: card.button.value
            })];
    }
    return [];
};
var prepareCardImage = function (wbot, card, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var prepareWAMessageMedia, imageSource, publicFolder, filePath, prepared, err_1;
    return __generator(this, function (_a) {
        var _b;
        switch (_a.label) {
            case 0:
                if (!card.image)
                    return [2 /*return*/, null];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (_b = "@whiskeysockets/baileys/lib/Utils/messages.js", Promise.resolve().then(function () { return __importStar(require(_b)); }))];
            case 2:
                prepareWAMessageMedia = (_a.sent()).prepareWAMessageMedia;
                imageSource = void 0;
                if (card.image.startsWith("http://") || card.image.startsWith("https://")) {
                    imageSource = { url: card.image };
                }
                else {
                    publicFolder = path.resolve(__dirname, "../..", "public");
                    filePath = path.join(publicFolder, "company".concat(companyId), card.image);
                    logger_1["default"].info("\uD83D\uDDBC\uFE0F Preparando imagem do card: ".concat(filePath));
                    if (!fs.existsSync(filePath)) {
                        logger_1["default"].warn("\u26A0\uFE0F Arquivo n\u00E3o encontrado: ".concat(filePath));
                        return [2 /*return*/, null];
                    }
                    imageSource = { buffer: fs.readFileSync(filePath) };
                }
                return [4 /*yield*/, prepareWAMessageMedia({ image: imageSource }, { upload: wbot.waUploadToServer })];
            case 3:
                prepared = _a.sent();
                logger_1["default"].info("\u2705 Imagem do card preparada com sucesso");
                return [2 /*return*/, prepared.imageMessage || null];
            case 4:
                err_1 = _a.sent();
                logger_1["default"].warn("\u26A0\uFE0F Falha ao preparar imagem do card \"".concat(card.title, "\":"), err_1);
                return [2 /*return*/, null];
            case 5: return [2 /*return*/];
        }
    });
}); };
var SendCarouselMessage = function (_a) {
    var ticket = _a.ticket, wbotParam = _a.wbot, jidParam = _a.jid, title = _a.title, cards = _a.cards, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var generateWAMessageFromContent, effectiveCompanyId, wbot, _b, jid, preparedImages, missingImages, carouselCards, interactiveMsg, newMsg, decisionId, _1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (cards.length < 2)
                        throw new Error("Carrossel requer mínimo 2 cards");
                    if (cards.length > 10)
                        throw new Error("Carrossel suporta no máximo 10 cards");
                    return [4 /*yield*/, (0, loadBaileys_1.loadBaileys)()];
                case 1:
                    generateWAMessageFromContent = (_d.sent()).generateWAMessageFromContent;
                    effectiveCompanyId = companyId !== null && companyId !== void 0 ? companyId : ticket === null || ticket === void 0 ? void 0 : ticket.companyId;
                    if (!(wbotParam !== null && wbotParam !== void 0)) return [3 /*break*/, 2];
                    _b = wbotParam;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 3:
                    _b = _d.sent();
                    _d.label = 4;
                case 4:
                    wbot = _b;
                    jid = jidParam !== null && jidParam !== void 0 ? jidParam : "".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                    logger_1["default"].info("\uD83C\uDFA0 Preparando carrossel \u2014 ticket ".concat(ticket.id, ", ").concat(cards.length, " cards, empresa ").concat(effectiveCompanyId));
                    return [4 /*yield*/, Promise.all(cards.map(function (card) { return prepareCardImage(wbot, card, effectiveCompanyId); }))];
                case 5:
                    preparedImages = _d.sent();
                    missingImages = preparedImages.filter(function (img) { return !img; }).length;
                    if (missingImages > 0) {
                        throw new Error("".concat(missingImages, "/").concat(cards.length, " cards sem imagem v\u00E1lida \u2014 carousel requer imagem em todos os cards"));
                    }
                    carouselCards = cards.map(function (card, i) {
                        var cardButtons = resolveCardButtons(card);
                        return __assign(__assign({ header: { hasMediaAttachment: true, imageMessage: preparedImages[i] }, body: { text: "".concat(card.title).concat(card.description ? "\n".concat(card.description) : "") } }, (card.price ? { footer: { text: card.price } } : {})), (cardButtons.length > 0 ? { nativeFlowMessage: { buttons: cardButtons } } : {}));
                    });
                    interactiveMsg = {
                        interactiveMessage: {
                            header: { title: title.trim() },
                            body: { text: title.trim() },
                            carouselMessage: { cards: carouselCards }
                        }
                    };
                    if (!ticket) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "composing")];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, (0, bluebird_1.delay)(1500)];
                case 7:
                    _d.sent();
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "paused")];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9:
                    newMsg = generateWAMessageFromContent(jid, interactiveMsg, {
                        userJid: (_c = wbot.user) === null || _c === void 0 ? void 0 : _c.id
                    });
                    decisionId = Math.random().toString(16).slice(2, 18);
                    return [4 /*yield*/, wbot.relayMessage(jid, newMsg.message, {
                            messageId: newMsg.key.id,
                            additionalNodes: [
                                {
                                    tag: "biz",
                                    attrs: {},
                                    content: [
                                        {
                                            tag: "interactive",
                                            attrs: { type: "native_flow", v: "1" },
                                            content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
                                        },
                                        {
                                            tag: "quality_control",
                                            attrs: { decision_id: decisionId },
                                            content: [{ tag: "decision_source", attrs: { value: "df" } }]
                                        }
                                    ]
                                }
                            ]
                        })];
                case 10:
                    _d.sent();
                    _d.label = 11;
                case 11:
                    _d.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                case 12:
                    _d.sent();
                    return [3 /*break*/, 14];
                case 13:
                    _1 = _d.sent();
                    return [3 /*break*/, 14];
                case 14:
                    logger_1["default"].info("\u2705 Carrossel enviado com sucesso \u2014 ".concat(ticket ? "ticket ".concat(ticket.id) : "jid ".concat(jid)));
                    return [2 /*return*/];
            }
        });
    });
};
exports.SendCarouselMessage = SendCarouselMessage;
var SendCarouselAsText = function (_a) {
    var ticket = _a.ticket, wbotParam = _a.wbot, jidParam = _a.jid, title = _a.title, cards = _a.cards;
    return __awaiter(void 0, void 0, void 0, function () {
        var text, SendWhatsAppMessage, ShowTicketService, ticketDetails, wbot, jid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    text = "".concat(title, "\n\n");
                    cards.forEach(function (card, i) {
                        text += "*".concat(i + 1, ". ").concat(card.title, "*\n");
                        if (card.description)
                            text += "".concat(card.description, "\n");
                        if (card.price)
                            text += "\uD83D\uDCB0 ".concat(card.price, "\n");
                        text += "\n";
                    });
                    if (!ticket) return [3 /*break*/, 8];
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
                    return [4 /*yield*/, (0, bluebird_1.delay)(1500)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket, "paused")];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, SendWhatsAppMessage({ body: text, ticket: ticketDetails, quotedMsg: null })];
                case 7:
                    _b.sent();
                    logger_1["default"].info("\uD83D\uDCDD Carrossel enviado como texto (fallback) \u2014 ticket ".concat(ticket.id));
                    return [3 /*break*/, 10];
                case 8:
                    wbot = wbotParam;
                    jid = jidParam;
                    return [4 /*yield*/, wbot.sendMessage(jid, { text: text })];
                case 9:
                    _b.sent();
                    logger_1["default"].info("\uD83D\uDCDD Carrossel enviado como texto (fallback) \u2014 jid ".concat(jid));
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.SendCarouselAsText = SendCarouselAsText;
var SendCarouselWithFallback = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                return [4 /*yield*/, (0, exports.SendCarouselMessage)(data)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                err_2 = _a.sent();
                logger_1["default"].warn("\u26A0\uFE0F Carrossel nativo falhou, usando fallback textual \u2014 ticket ".concat(data.ticket.id, ":"), err_2);
                return [4 /*yield*/, (0, exports.SendCarouselAsText)(data)];
            case 3:
                _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.SendCarouselWithFallback = SendCarouselWithFallback;
