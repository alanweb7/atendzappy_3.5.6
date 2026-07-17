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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var wbot_1 = require("../../libs/wbot");
var ExportGroupContactsService = function (ticketId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, wbot, groupJid, groupMetadata, participants, errors, i, participant, realNumber, contactName, contactByRemoteJid, extractedNumber, contactByNumber, nameContact, participantData, participantError_1, error, processingError_1, metadataError_1, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 22, , 23]);
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: {
                            id: ticketId,
                            companyId: companyId,
                            isGroup: true
                        },
                        include: [
                            {
                                model: Contact_1["default"],
                                as: "contact",
                                required: true
                            },
                            {
                                model: Whatsapp_1["default"],
                                as: "whatsapp",
                                required: true
                            }
                        ]
                    })];
            case 1:
                ticket = _c.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Grupo não encontrado", 404);
                }
                console.log("[ExportGroupContacts] Iniciando exporta\u00E7\u00E3o para grupo: ".concat(ticket.contact.name));
                wbot = (0, wbot_1.getWbot)(ticket.whatsappId);
                if (!wbot) {
                    throw new AppError_1["default"]("Sessão WhatsApp não encontrada", 404);
                }
                console.log("[ExportGroupContacts] Sess\u00E3o WhatsApp obtida para: ".concat(ticket.whatsapp.name));
                groupJid = "".concat(ticket.contact.number, "@g.us");
                console.log("[ExportGroupContacts] Buscando metadados para: ".concat(groupJid));
                _c.label = 2;
            case 2:
                _c.trys.push([2, 20, , 21]);
                return [4 /*yield*/, wbot.groupMetadata(groupJid)];
            case 3:
                groupMetadata = _c.sent();
                console.log("[ExportGroupContacts] Grupo encontrado: ".concat(groupMetadata.subject));
                console.log("[ExportGroupContacts] Total de participantes: ".concat(((_a = groupMetadata.participants) === null || _a === void 0 ? void 0 : _a.length) || 0));
                console.log("[ExportGroupContacts] Estrutura de participantes:", Object.keys(((_b = groupMetadata.participants) === null || _b === void 0 ? void 0 : _b[0]) || {}));
                participants = [];
                errors = [];
                _c.label = 4;
            case 4:
                _c.trys.push([4, 18, , 19]);
                if (!groupMetadata.participants) return [3 /*break*/, 17];
                console.log("[ExportGroupContacts] Iniciando processamento de ".concat(groupMetadata.participants.length, " participantes"));
                i = 0;
                _c.label = 5;
            case 5:
                if (!(i < groupMetadata.participants.length)) return [3 /*break*/, 17];
                participant = groupMetadata.participants[i];
                console.log("[ExportGroupContacts] Processando participante ".concat(i + 1, "/").concat(groupMetadata.participants.length, ": ").concat(participant.id));
                _c.label = 6;
            case 6:
                _c.trys.push([6, 14, , 15]);
                realNumber = null;
                contactName = null;
                console.log("[ExportGroupContacts] Processando participante: ".concat(participant.id));
                if (!participant.id.includes('@s.whatsapp.net')) return [3 /*break*/, 7];
                realNumber = participant.id.replace('@s.whatsapp.net', '');
                console.log("[ExportGroupContacts] N\u00FAmero real @s.whatsapp.net: ".concat(realNumber));
                return [3 /*break*/, 11];
            case 7:
                if (!participant.id.includes('@lid')) return [3 /*break*/, 11];
                console.log("[ExportGroupContacts] @lid detectado, buscando no banco: ".concat(participant.id));
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            remoteJid: participant.id
                        }
                    })];
            case 8:
                contactByRemoteJid = _c.sent();
                if (!(contactByRemoteJid && contactByRemoteJid.number)) return [3 /*break*/, 9];
                realNumber = contactByRemoteJid.number;
                contactName = contactByRemoteJid.name;
                console.log("[ExportGroupContacts] Encontrado via remoteJid: ".concat(realNumber));
                return [3 /*break*/, 11];
            case 9:
                extractedNumber = participant.id.replace('@lid', '');
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            number: extractedNumber
                        }
                    })];
            case 10:
                contactByNumber = _c.sent();
                if (contactByNumber) {
                    realNumber = contactByNumber.number;
                    contactName = contactByNumber.name;
                    console.log("[ExportGroupContacts] Encontrado via n\u00FAmero: ".concat(realNumber));
                }
                else {
                    console.log("[ExportGroupContacts] @lid n\u00E3o mapeado, pulando: ".concat(participant.id));
                    return [3 /*break*/, 16]; // Pular se não encontrar
                }
                _c.label = 11;
            case 11:
                // Validar número
                if (!realNumber || !realNumber.match(/^\d+$/)) {
                    console.log("[ExportGroupContacts] N\u00FAmero inv\u00E1lido, pulando: ".concat(realNumber));
                    return [3 /*break*/, 16];
                }
                if (!!contactName) return [3 /*break*/, 13];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            number: realNumber,
                            companyId: companyId
                        }
                    })];
            case 12:
                nameContact = _c.sent();
                if (nameContact && nameContact.name) {
                    contactName = nameContact.name;
                }
                _c.label = 13;
            case 13:
                console.log("[ExportGroupContacts] Adicionando: ".concat(contactName || 'Sem Nome', " - ").concat(realNumber));
                participantData = {
                    id: participant.id,
                    name: contactName,
                    number: realNumber,
                    isAdmin: participant.admin === 'admin' || participant.admin === 'superadmin',
                    isSuperAdmin: participant.admin === 'superadmin'
                };
                participants.push(participantData);
                return [3 /*break*/, 15];
            case 14:
                participantError_1 = _c.sent();
                error = "Erro ao processar participante ".concat(participant.id, ": ").concat(participantError_1.message);
                errors.push(error);
                console.error("[ExportGroupContacts] ".concat(error));
                return [3 /*break*/, 15];
            case 15:
                console.log("[ExportGroupContacts] Participante ".concat(i + 1, "/").concat(groupMetadata.participants.length, " processado"));
                _c.label = 16;
            case 16:
                i++;
                return [3 /*break*/, 5];
            case 17:
                console.log("[ExportGroupContacts] Processamento conclu\u00EDdo: ".concat(participants.length, " participantes, ").concat(errors.length, " erros"));
                return [3 /*break*/, 19];
            case 18:
                processingError_1 = _c.sent();
                console.error("[ExportGroupContacts] Erro ao processar participantes:", processingError_1);
                throw new AppError_1["default"]("Erro ao processar participantes: ".concat(processingError_1.message), 500);
            case 19: return [2 /*return*/, {
                    participants: participants,
                    totalParticipants: participants.length,
                    groupName: groupMetadata.subject || ticket.contact.name,
                    errors: errors
                }];
            case 20:
                metadataError_1 = _c.sent();
                console.error("[ExportGroupContacts] Erro ao obter metadados do grupo:", metadataError_1);
                throw new AppError_1["default"]("Erro ao obter metadados do grupo: ".concat(metadataError_1.message), 500);
            case 21: return [3 /*break*/, 23];
            case 22:
                error_1 = _c.sent();
                console.error("[ExportGroupContacts] Erro geral:", error_1);
                throw new AppError_1["default"]("Erro ao exportar contatos do grupo: ".concat(error_1.message), 500);
            case 23: return [2 /*return*/];
        }
    });
}); };
exports["default"] = ExportGroupContactsService;
