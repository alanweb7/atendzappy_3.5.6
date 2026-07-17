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
// @ts-nocheck
var baileys_1 = require("@whiskeysockets/baileys");
var Sentry = __importStar(require("@sentry/node"));
var fs_1 = __importDefault(require("fs"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var CallRecord_1 = __importDefault(require("../../models/CallRecord"));
var logger_1 = __importDefault(require("../../utils/logger"));
var CreateOrUpdateBaileysService_1 = __importDefault(require("../BaileysServices/CreateOrUpdateBaileysService"));
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var socket_1 = require("../../libs/socket");
var path_1 = __importDefault(require("path"));
var wbotMessageListener_1 = require("./wbotMessageListener");
var FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
var i = 0;
setInterval(function () {
    i = 0;
}, 5000);
var wbotMonitor = function (wbot, whatsapp, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    function cleanStringForJSON(str) {
        // Remove caracteres de controle, ", \ e '
        return str.replace(/[\x00-\x1F"\\']/g, "");
    }
    var activeCalls_1;
    return __generator(this, function (_a) {
        try {
            activeCalls_1 = new Map();
            wbot.ws.on("CB:call", function (node) { return __awaiter(void 0, void 0, void 0, function () {
                var content, callId, fromJid, toJid, number, io, contact, isOutgoing, targetNumber, callType, existingRecord, _a, _b, _c, callRecord, existingRecord, _d, _e, _f, existingRecord, _g, _h, _j, startTime, duration, reason, callStatus, existingRecord, updatedRecord, settings, sentMessage, ticket, date, hours, minutes, body, messageData, err_1;
                var _k, _l, _m;
                var _o, _p, _q, _r;
                return __generator(this, function (_s) {
                    switch (_s.label) {
                        case 0:
                            content = node.content[0];
                            callId = (_o = content === null || content === void 0 ? void 0 : content.attrs) === null || _o === void 0 ? void 0 : _o["call-id"];
                            fromJid = node.attrs.from;
                            toJid = node.attrs.to;
                            if (!fromJid || fromJid.includes("@call"))
                                return [2 /*return*/];
                            return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, i * 650); })];
                        case 1:
                            _s.sent();
                            i++;
                            number = fromJid.split("@")[0].split(":")[0].replace(/\D/g, "");
                            io = (0, socket_1.getIO)();
                            _s.label = 2;
                        case 2:
                            _s.trys.push([2, 34, , 35]);
                            return [4 /*yield*/, Contact_1["default"].findOne({
                                    where: { companyId: companyId, number: number }
                                })];
                        case 3:
                            contact = _s.sent();
                            isOutgoing = fromJid === ((_p = wbot.user) === null || _p === void 0 ? void 0 : _p.id);
                            targetNumber = isOutgoing ? toJid === null || toJid === void 0 ? void 0 : toJid.split("@")[0].split(":")[0].replace(/\D/g, "") : number;
                            if (!(content.tag === "offer")) return [3 /*break*/, 10];
                            callType = ((_q = content.attrs) === null || _q === void 0 ? void 0 : _q["call-type"]) === "video" ? "video" : "voice";
                            activeCalls_1.set(callId, new Date());
                            if (!isOutgoing) return [3 /*break*/, 8];
                            // Chamada ativa (outgoing)
                            logger_1["default"].info("[CallRecord] Chamada ".concat(callType, " ativa para ").concat(targetNumber, " (callId: ").concat(callId, ")"));
                            return [4 /*yield*/, CallRecord_1["default"].findOne({ where: { callId: callId, companyId: companyId } })];
                        case 4:
                            existingRecord = _s.sent();
                            if (!existingRecord) return [3 /*break*/, 7];
                            // Atualizar status para "ringing"
                            return [4 /*yield*/, existingRecord.update({ status: "ringing" })];
                        case 5:
                            // Atualizar status para "ringing"
                            _s.sent();
                            _b = (_a = io.of(String(companyId))).emit;
                            _c = ["company-".concat(companyId, "-call")];
                            _k = {
                                action: "outgoing-ringing"
                            };
                            return [4 /*yield*/, CallRecord_1["default"].findByPk(existingRecord.id, {
                                    include: [{ model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "profilePicUrl"] }]
                                })];
                        case 6:
                            _b.apply(_a, _c.concat([(_k.callRecord = _s.sent(),
                                    _k)]));
                            _s.label = 7;
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            // Chamada recebida (incoming)
                            logger_1["default"].info("[CallRecord] Chamada ".concat(callType, " recebida de ").concat(number, " (callId: ").concat(callId, ")"));
                            return [4 /*yield*/, CallRecord_1["default"].create({
                                    callId: callId,
                                    type: "incoming",
                                    status: "ringing",
                                    fromNumber: number,
                                    toNumber: whatsapp.number || "",
                                    duration: 0,
                                    contactId: (contact === null || contact === void 0 ? void 0 : contact.id) || null,
                                    whatsappId: whatsapp.id,
                                    companyId: companyId,
                                    callStartedAt: new Date()
                                })];
                        case 9:
                            callRecord = _s.sent();
                            // Emitir evento socket para atualização em tempo real
                            io.of(String(companyId)).emit("company-".concat(companyId, "-call"), {
                                action: "incoming-ringing",
                                callRecord: __assign(__assign({}, callRecord.toJSON()), { contact: contact ? { id: contact.id, name: contact.name, number: contact.number, profilePicUrl: contact.profilePicUrl } : null })
                            });
                            _s.label = 10;
                        case 10:
                            if (!(content.tag === "accept")) return [3 /*break*/, 14];
                            logger_1["default"].info("[CallRecord] Chamada aceita (callId: ".concat(callId, ")"));
                            return [4 /*yield*/, CallRecord_1["default"].findOne({ where: { callId: callId, companyId: companyId } })];
                        case 11:
                            existingRecord = _s.sent();
                            if (!existingRecord) return [3 /*break*/, 14];
                            return [4 /*yield*/, existingRecord.update({ status: "answered" })];
                        case 12:
                            _s.sent();
                            _e = (_d = io.of(String(companyId))).emit;
                            _f = ["company-".concat(companyId, "-call")];
                            _l = {
                                action: "call-accepted"
                            };
                            return [4 /*yield*/, CallRecord_1["default"].findByPk(existingRecord.id, {
                                    include: [{ model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "profilePicUrl"] }]
                                })];
                        case 13:
                            _e.apply(_d, _f.concat([(_l.callRecord = _s.sent(),
                                    _l)]));
                            _s.label = 14;
                        case 14:
                            if (!(content.tag === "reject")) return [3 /*break*/, 19];
                            logger_1["default"].info("[CallRecord] Chamada rejeitada (callId: ".concat(callId, ")"));
                            return [4 /*yield*/, CallRecord_1["default"].findOne({ where: { callId: callId, companyId: companyId } })];
                        case 15:
                            existingRecord = _s.sent();
                            if (!existingRecord) return [3 /*break*/, 18];
                            return [4 /*yield*/, existingRecord.update({
                                    status: "rejected",
                                    callEndedAt: new Date()
                                })];
                        case 16:
                            _s.sent();
                            _h = (_g = io.of(String(companyId))).emit;
                            _j = ["company-".concat(companyId, "-call")];
                            _m = {
                                action: "call-rejected"
                            };
                            return [4 /*yield*/, CallRecord_1["default"].findByPk(existingRecord.id, {
                                    include: [{ model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "profilePicUrl"] }]
                                })];
                        case 17:
                            _h.apply(_g, _j.concat([(_m.callRecord = _s.sent(),
                                    _m)]));
                            _s.label = 18;
                        case 18:
                            activeCalls_1["delete"](callId);
                            _s.label = 19;
                        case 19:
                            if (!(content.tag === "terminate")) return [3 /*break*/, 33];
                            startTime = activeCalls_1.get(callId);
                            duration = startTime ? Math.round((Date.now() - startTime.getTime()) / 1000) : 0;
                            activeCalls_1["delete"](callId);
                            reason = (_r = content.attrs) === null || _r === void 0 ? void 0 : _r.reason;
                            callStatus = "missed";
                            if (reason === "busy")
                                callStatus = "busy";
                            else if (reason === "timeout")
                                callStatus = "missed";
                            else if (duration > 3)
                                callStatus = "answered";
                            logger_1["default"].info("[CallRecord] Chamada encerrada de ".concat(number, " - status: ").concat(callStatus, ", dura\u00E7\u00E3o: ").concat(duration, "s (callId: ").concat(callId, ")"));
                            return [4 /*yield*/, CallRecord_1["default"].findOne({ where: { callId: callId, companyId: companyId } })];
                        case 20:
                            existingRecord = _s.sent();
                            if (!existingRecord) return [3 /*break*/, 22];
                            return [4 /*yield*/, existingRecord.update({
                                    status: callStatus,
                                    duration: duration,
                                    callEndedAt: new Date()
                                })];
                        case 21:
                            _s.sent();
                            return [3 /*break*/, 24];
                        case 22: return [4 /*yield*/, CallRecord_1["default"].create({
                                callId: callId,
                                type: "incoming",
                                status: callStatus,
                                fromNumber: number,
                                toNumber: whatsapp.number || "",
                                duration: duration,
                                contactId: (contact === null || contact === void 0 ? void 0 : contact.id) || null,
                                whatsappId: whatsapp.id,
                                companyId: companyId,
                                callStartedAt: startTime || new Date(),
                                callEndedAt: new Date()
                            })];
                        case 23:
                            _s.sent();
                            _s.label = 24;
                        case 24: return [4 /*yield*/, CallRecord_1["default"].findOne({
                                where: { callId: callId, companyId: companyId },
                                include: [{ model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "profilePicUrl"] }]
                            })];
                        case 25:
                            updatedRecord = _s.sent();
                            io.of(String(companyId)).emit("company-".concat(companyId, "-call"), {
                                action: "ended",
                                callRecord: updatedRecord
                            });
                            return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                                    where: { companyId: companyId }
                                })];
                        case 26:
                            settings = _s.sent();
                            if (!((settings === null || settings === void 0 ? void 0 : settings.acceptCallWhatsapp) === "enabled")) return [3 /*break*/, 33];
                            return [4 /*yield*/, wbot.sendMessage(fromJid, {
                                    text: "\u200E ".concat(settings.AcceptCallWhatsappMessage)
                                })];
                        case 27:
                            sentMessage = _s.sent();
                            if (!contact)
                                return [2 /*return*/];
                            return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(contact, whatsapp, 0, companyId, undefined, undefined, undefined, "whatsapp", false, false, settings)];
                        case 28:
                            ticket = _s.sent();
                            if (!ticket)
                                return [2 /*return*/];
                            if (!updatedRecord) return [3 /*break*/, 30];
                            return [4 /*yield*/, updatedRecord.update({ ticketId: ticket.id })];
                        case 29:
                            _s.sent();
                            _s.label = 30;
                        case 30: return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage, ticket, contact)];
                        case 31:
                            _s.sent();
                            date = new Date();
                            hours = date.getHours();
                            minutes = date.getMinutes();
                            body = "Chamada de voz/v\u00EDdeo perdida \u00E0s ".concat(hours, ":").concat(minutes);
                            messageData = {
                                wid: callId,
                                ticketId: ticket.id,
                                contactId: contact.id,
                                body: body,
                                fromMe: false,
                                mediaType: "call_log",
                                read: true,
                                quotedMsgId: null,
                                ack: 1
                            };
                            return [4 /*yield*/, ticket.update({ lastMessage: body })];
                        case 32:
                            _s.sent();
                            return [2 /*return*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: companyId })];
                        case 33: return [3 /*break*/, 35];
                        case 34:
                            err_1 = _s.sent();
                            logger_1["default"].error("[CallRecord] Erro ao processar chamada: ".concat(err_1.message));
                            Sentry.captureException(err_1);
                            return [3 /*break*/, 35];
                        case 35: return [2 /*return*/];
                    }
                });
            }); });
            wbot.ev.on("contacts.upsert", function (contacts) { return __awaiter(void 0, void 0, void 0, function () {
                var filteredContacts, publicFolder, contatcJson, err_2, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('📥 [CONTACTS.UPSERT] Evento disparado! Total de contatos recebidos:', (contacts === null || contacts === void 0 ? void 0 : contacts.length) || 0);
                            filteredContacts = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            Promise.all(contacts.map(function (contact) { return __awaiter(void 0, void 0, void 0, function () {
                                var contactArray;
                                return __generator(this, function (_a) {
                                    console.log('🔍 [CONTACT CHECK] Analisando contato:', {
                                        id: contact.id,
                                        name: contact.name,
                                        isBroadcast: (0, baileys_1.isJidBroadcast)(contact.id),
                                        isStatusBroadcast: (0, baileys_1.isJidStatusBroadcast)(contact.id),
                                        isLid: (0, baileys_1.isLidUser)(contact.id)
                                    });
                                    if (!(0, baileys_1.isJidBroadcast)(contact.id) &&
                                        !(0, baileys_1.isJidStatusBroadcast)(contact.id) &&
                                        !(0, baileys_1.isLidUser)(contact.id) // **CORREÇÃO: Remover dupla negação para EXCLUIR LID users**
                                    ) {
                                        contactArray = {
                                            'id': contact.id,
                                            'name': contact.name ? cleanStringForJSON(contact.name) : contact.id.split('@')[0].split(':')[0]
                                        };
                                        console.log('✅ [CONTACT ACCEPTED] Contato aceito:', contactArray);
                                        filteredContacts.push(contactArray);
                                    }
                                    return [2 /*return*/];
                                });
                            }); }));
                            publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                            if (!fs_1["default"].existsSync(path_1["default"].join(publicFolder, "company".concat(companyId)))) {
                                fs_1["default"].mkdirSync(path_1["default"].join(publicFolder, "company".concat(companyId)), { recursive: true });
                                fs_1["default"].chmodSync(path_1["default"].join(publicFolder, "company".concat(companyId)), 511);
                            }
                            contatcJson = path_1["default"].join(publicFolder, "company".concat(companyId), "contactJson.txt");
                            if (!fs_1["default"].existsSync(contatcJson)) return [3 /*break*/, 3];
                            return [4 /*yield*/, fs_1["default"].unlinkSync(contatcJson)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, fs_1["default"].promises.writeFile(contatcJson, JSON.stringify(filteredContacts, null, 2))];
                        case 4:
                            _a.sent();
                            console.log('💾 [CONTACTS SAVED] Contatos salvos em arquivo:', {
                                total: filteredContacts.length,
                                path: contatcJson
                            });
                            return [3 /*break*/, 6];
                        case 5:
                            err_2 = _a.sent();
                            Sentry.captureException(err_2);
                            logger_1["default"].error("Erro contacts.upsert: ".concat(JSON.stringify(err_2)));
                            return [3 /*break*/, 6];
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            console.log('📤 [BAILEYS SAVE] Salvando contatos no banco Baileys...', {
                                whatsappId: whatsapp.id,
                                totalContacts: filteredContacts.length
                            });
                            return [4 /*yield*/, (0, CreateOrUpdateBaileysService_1["default"])({
                                    whatsappId: whatsapp.id,
                                    contacts: filteredContacts
                                })];
                        case 7:
                            _a.sent();
                            console.log('✅ [BAILEYS SAVED] Contatos salvos com sucesso no banco Baileys!');
                            return [3 /*break*/, 9];
                        case 8:
                            err_3 = _a.sent();
                            console.log('❌ [BAILEYS ERROR] Erro ao salvar contatos:', err_3);
                            console.log('Contatos que tentaram ser salvos:', filteredContacts);
                            logger_1["default"].error(err_3);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (err) {
            Sentry.captureException(err);
            logger_1["default"].error(err);
        }
        return [2 /*return*/];
    });
}); };
exports["default"] = wbotMonitor;
