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
var baileys_1 = require("@whiskeysockets/baileys");
var Sentry = __importStar(require("@sentry/node"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var GetTicketWbot_1 = __importDefault(require("../../helpers/GetTicketWbot"));
var Message_1 = __importDefault(require("../../models/Message"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var lodash_1 = require("lodash");
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var wbotMessageListener_1 = require("./wbotMessageListener");
var systemMessageCache_1 = require("../../helpers/systemMessageCache");
var SendWhatsAppMessage = function (_a) {
    var body = _a.body, ticket = _a.ticket, quotedMsg = _a.quotedMsg, msdelay = _a.msdelay, vCard = _a.vCard, _b = _a.isForwarded, isForwarded = _b === void 0 ? false : _b, location = _a.location;
    return __awaiter(void 0, void 0, void 0, function () {
        var options, wbot, contactNumber, correctContact, correctContact, number, chatMessages, msgFound, sentMessage, displayAddress, err_1, numberContact, contactName, nameParts, firstName, lastName, vcard, sentMessage, err_2, sentMessage, err_3;
        var _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    console.log("== BODY SEND MESSAGE ==", body);
                    options = {};
                    return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 1:
                    wbot = _f.sent();
                    return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
                case 2:
                    contactNumber = _f.sent();
                    if (!(contactNumber && contactNumber.remoteJid && contactNumber.remoteJid.startsWith("temp-"))) return [3 /*break*/, 8];
                    console.log("[SEND MESSAGE] Contato com temp- detectado, buscando contato correto...");
                    if (!contactNumber.lid) return [3 /*break*/, 5];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: {
                                companyId: ticket.companyId,
                                lid: contactNumber.lid,
                                remoteJid: (_c = {},
                                    _c[require("sequelize").Op.notLike] = "temp-%",
                                    _c)
                            }
                        })];
                case 3:
                    correctContact = _f.sent();
                    if (!correctContact) return [3 /*break*/, 5];
                    console.log("[SEND MESSAGE] Contato correto encontrado por LID:", correctContact.remoteJid);
                    contactNumber = correctContact;
                    // Atualizar o ticket para apontar para o contato correto
                    return [4 /*yield*/, ticket.update({ contactId: correctContact.id })];
                case 4:
                    // Atualizar o ticket para apontar para o contato correto
                    _f.sent();
                    console.log("[SEND MESSAGE] Ticket atualizado para contato ID:", correctContact.id);
                    _f.label = 5;
                case 5:
                    if (!(contactNumber.remoteJid.startsWith("temp-") && contactNumber.number)) return [3 /*break*/, 8];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: {
                                companyId: ticket.companyId,
                                number: contactNumber.number,
                                remoteJid: (_d = {},
                                    _d[require("sequelize").Op.notLike] = "temp-%",
                                    _d)
                            }
                        })];
                case 6:
                    correctContact = _f.sent();
                    if (!correctContact) return [3 /*break*/, 8];
                    console.log("[SEND MESSAGE] Contato correto encontrado por número:", correctContact.remoteJid);
                    contactNumber = correctContact;
                    // Atualizar o ticket para apontar para o contato correto
                    return [4 /*yield*/, ticket.update({ contactId: correctContact.id })];
                case 7:
                    // Atualizar o ticket para apontar para o contato correto
                    _f.sent();
                    console.log("[SEND MESSAGE] Ticket atualizado para contato ID:", correctContact.id);
                    _f.label = 8;
                case 8:
                    console.log("[SEND MESSAGE] Ticket isGroup:", ticket.isGroup);
                    console.log("[SEND MESSAGE] Contact remoteJid:", contactNumber.remoteJid);
                    console.log("[SEND MESSAGE] Contact number:", contactNumber.number);
                    console.log("[SEND MESSAGE] Contact LID:", contactNumber.lid);
                    /// verificar se a mensagem é vazia, para não enviar mensagem vazia
                    /// EXCETO se for vCard ou location (que não precisam de body)
                    if (!vCard && !location && (body === "" || body === undefined || (0, Mustache_1["default"])(body, ticket) === "")) {
                        console.log("== BODY SEND MESSAGE == vazio");
                        console.log("Mensagem vazia, não enviar");
                        return [2 /*return*/, {}];
                    }
                    // **CORREÇÃO BAILEYS 6.8.0: Sempre usar PN (Phone Number) em vez de LID**
                    // LID não é confiável para envio de mensagens individuais
                    if (ticket.isGroup) {
                        // Para grupos, usar o remoteJid do grupo
                        number = contactNumber.remoteJid;
                        console.log("[SEND MESSAGE] Grupo - Usando remoteJid:", number);
                    }
                    else {
                        // Para contatos individuais, SEMPRE usar o número (PN)
                        if (contactNumber.number && contactNumber.number !== "") {
                            // Construir JID com o número de telefone
                            number = "".concat(contactNumber.number, "@s.whatsapp.net");
                            console.log("[SEND MESSAGE] Individual - Usando PN (Phone Number):", number);
                        }
                        else if (contactNumber.remoteJid && contactNumber.remoteJid.includes("@s.whatsapp.net")) {
                            // Fallback: Se não tem number mas tem remoteJid válido com @s.whatsapp.net
                            number = contactNumber.remoteJid;
                            console.log("[SEND MESSAGE] Individual - Usando remoteJid (fallback):", number);
                        }
                        else {
                            console.error("[SEND MESSAGE] ERRO: Contato sem número válido!");
                            console.error("[SEND MESSAGE] Contact data:", {
                                id: contactNumber.id,
                                number: contactNumber.number,
                                remoteJid: contactNumber.remoteJid,
                                lid: contactNumber.lid
                            });
                            throw new Error("Contato sem número válido para envio de mensagem");
                        }
                    }
                    if (!quotedMsg) return [3 /*break*/, 10];
                    return [4 /*yield*/, Message_1["default"].findOne({
                            where: {
                                id: quotedMsg.id
                            }
                        })];
                case 9:
                    chatMessages = _f.sent();
                    if (chatMessages && chatMessages.dataJson) {
                        try {
                            msgFound = JSON.parse(chatMessages.dataJson);
                            if (msgFound && msgFound.key && msgFound.message) {
                                options = {
                                    quoted: {
                                        key: msgFound.key,
                                        message: msgFound.message
                                    }
                                };
                            }
                        }
                        catch (parseErr) {
                            console.warn("[SendWhatsAppMessage] Falha ao parsear dataJson da mensagem citada:", parseErr);
                        }
                    }
                    _f.label = 10;
                case 10:
                    if (!!(0, lodash_1.isNil)(location)) return [3 /*break*/, 17];
                    _f.label = 11;
                case 11:
                    _f.trys.push([11, 16, , 17]);
                    return [4 /*yield*/, (0, baileys_1.delay)(msdelay)];
                case 12:
                    _f.sent();
                    return [4 /*yield*/, wbot.sendMessage(number, {
                            location: {
                                degreesLatitude: location.latitude,
                                degreesLongitude: location.longitude,
                                name: location.address || "".concat(location.latitude, ", ").concat(location.longitude),
                                address: location.address || ""
                            }
                        })];
                case 13:
                    sentMessage = _f.sent();
                    displayAddress = location.address || "".concat(location.latitude, ", ").concat(location.longitude);
                    return [4 /*yield*/, ticket.update({
                            lastMessage: "\uD83D\uDCCD ".concat(displayAddress),
                            imported: null
                        })];
                case 14:
                    _f.sent();
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contactNumber)];
                case 15:
                    _f.sent();
                    return [2 /*return*/, sentMessage];
                case 16:
                    err_1 = _f.sent();
                    Sentry.captureException(err_1);
                    console.log(err_1);
                    throw new AppError_1["default"]("ERR_SENDING_WAPP_MSG");
                case 17:
                    if (!!(0, lodash_1.isNil)(vCard)) return [3 /*break*/, 24];
                    numberContact = vCard.number;
                    contactName = vCard.name || numberContact || "Contato";
                    nameParts = contactName.split(" ");
                    firstName = nameParts[0] || contactName;
                    lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
                    vcard = "BEGIN:VCARD\n" +
                        "VERSION:3.0\n" +
                        "N:".concat(lastName, ";").concat(firstName, ";;;\n") +
                        "FN:".concat(contactName, "\n") +
                        "TEL;type=CELL;waid=".concat(numberContact, ":+").concat(numberContact, "\n") +
                        "END:VCARD";
                    _f.label = 18;
                case 18:
                    _f.trys.push([18, 23, , 24]);
                    return [4 /*yield*/, (0, baileys_1.delay)(msdelay)];
                case 19:
                    _f.sent();
                    return [4 /*yield*/, wbot.sendMessage(number, {
                            contacts: {
                                displayName: contactName,
                                contacts: [{ vcard: vcard }]
                            }
                        })];
                case 20:
                    sentMessage = _f.sent();
                    return [4 /*yield*/, ticket.update({
                            lastMessage: "\uD83D\uDCC7 ".concat(contactName),
                            imported: null
                        })];
                case 21:
                    _f.sent();
                    // **Salvar mensagem enviada no banco**
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contactNumber)];
                case 22:
                    // **Salvar mensagem enviada no banco**
                    _f.sent();
                    return [2 /*return*/, sentMessage];
                case 23:
                    err_2 = _f.sent();
                    Sentry.captureException(err_2);
                    console.log(err_2);
                    throw new AppError_1["default"]("ERR_SENDING_WAPP_MSG");
                case 24:
                    _f.trys.push([24, 29, , 30]);
                    return [4 /*yield*/, (0, baileys_1.delay)(msdelay)];
                case 25:
                    _f.sent();
                    return [4 /*yield*/, wbot.sendMessage(number, {
                            text: (0, Mustache_1["default"])(body, ticket),
                            contextInfo: {
                                forwardingScore: isForwarded ? 2 : 0,
                                isForwarded: isForwarded ? true : false
                            }
                        }, __assign({}, options))];
                case 26:
                    sentMessage = _f.sent();
                    return [4 /*yield*/, ticket.update({
                            lastMessage: (0, Mustache_1["default"])(body, ticket),
                            imported: null
                        })];
                case 27:
                    _f.sent();
                    // Marca ID no cache para que o listener não trate como envio manual
                    if ((_e = sentMessage === null || sentMessage === void 0 ? void 0 : sentMessage.key) === null || _e === void 0 ? void 0 : _e.id)
                        (0, systemMessageCache_1.markSystemMessage)(sentMessage.key.id);
                    // **Salvar mensagem enviada no banco e emitir socket**
                    return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contactNumber, undefined, false, false, false, true, ticket.userId)];
                case 28:
                    // **Salvar mensagem enviada no banco e emitir socket**
                    _f.sent();
                    return [2 /*return*/, sentMessage];
                case 29:
                    err_3 = _f.sent();
                    console.log("erro ao enviar mensagem na company ".concat(ticket.companyId, " - "), body, ticket, quotedMsg, msdelay, vCard, isForwarded);
                    Sentry.captureException(err_3);
                    console.log(err_3);
                    throw new AppError_1["default"]("ERR_SENDING_WAPP_MSG");
                case 30: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = SendWhatsAppMessage;
