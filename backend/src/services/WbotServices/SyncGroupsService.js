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
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var wbot_1 = require("../../libs/wbot");
var FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var SyncGroupsService = function (whatsappId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsapp, wbot, groups, errors, ticketsCreated, contacts, i, contact, groupJid, groupMetadata, groupData, existingTicket, ticket, ticketError_1, groupError_1, error, existingGroupTickets, _loop_1, _i, existingGroupTickets_1, ticket, error_1, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 31, , 32]);
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _c.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("WhatsApp connection not found", 404);
                }
                wbot = (0, wbot_1.getWbot)(whatsappId);
                if (!wbot) {
                    throw new AppError_1["default"]("WhatsApp session not found", 404);
                }
                console.log("[SyncGroups] Iniciando sincroniza\u00E7\u00E3o de grupos para WhatsApp ".concat(whatsappId));
                groups = [];
                errors = [];
                ticketsCreated = 0;
                _c.label = 2;
            case 2:
                _c.trys.push([2, 29, , 30]);
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            isGroup: true
                        }
                    })];
            case 3:
                contacts = _c.sent();
                console.log("[SyncGroups] Encontrados ".concat(contacts.length, " contatos de grupos no banco"));
                i = 0;
                _c.label = 4;
            case 4:
                if (!(i < contacts.length)) return [3 /*break*/, 23];
                contact = contacts[i];
                console.log("[SyncGroups] Processando contato ".concat(i + 1, "/").concat(contacts.length, ": ").concat(contact.name));
                _c.label = 5;
            case 5:
                _c.trys.push([5, 20, , 21]);
                groupJid = "".concat(contact.number, "@g.us");
                console.log("[SyncGroups] Obtendo metadados para: ".concat(groupJid));
                return [4 /*yield*/, wbot.groupMetadata(groupJid)];
            case 6:
                groupMetadata = _c.sent();
                console.log("[SyncGroups] Metadados obtidos para: ".concat(groupMetadata.subject));
                groupData = {
                    id: groupJid,
                    name: groupMetadata.subject || contact.name,
                    participants: ((_a = groupMetadata.participants) === null || _a === void 0 ? void 0 : _a.length) || 0
                };
                groups.push(groupData);
                console.log("[SyncGroups] Grupo adicionado: ".concat(groupData.name, " (").concat(groupData.participants, " participantes)"));
                if (!(contact.name !== groupData.name)) return [3 /*break*/, 8];
                return [4 /*yield*/, contact.update({ name: groupData.name })];
            case 7:
                _c.sent();
                console.log("[SyncGroups] Nome do contato atualizado: ".concat(groupData.name));
                _c.label = 8;
            case 8:
                // **MUDANÇA CRÍTICA: Sempre criar ticket para grupos, mesmo que já exista**
                console.log("[SyncGroups] Criando/Garantindo ticket para: ".concat(groupData.name));
                _c.label = 9;
            case 9:
                _c.trys.push([9, 18, , 19]);
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: {
                            whatsappId: whatsappId,
                            companyId: companyId,
                            contactId: contact.id
                        }
                    })];
            case 10:
                existingTicket = _c.sent();
                ticket = void 0;
                if (!!existingTicket) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(contact, whatsapp, 0, // unreadMessages
                    companyId, null, // queueId
                    null, // userId
                    null, // groupContact
                    "whatsapp", // channel
                    false, // isImported
                    false, // isForward
                    null, // settings
                    false, // isTransfered
                    false // isCampaign
                    )];
            case 11:
                // Criar novo ticket
                ticket = _c.sent();
                ticketsCreated++;
                console.log("[SyncGroups] NOVO ticket criado para grupo: ".concat(groupData.name));
                return [3 /*break*/, 13];
            case 12:
                // Usar ticket existente
                ticket = existingTicket;
                console.log("[SyncGroups] Ticket existente encontrado para: ".concat(groupData.name));
                _c.label = 13;
            case 13:
                if (!(ticket.status !== "group")) return [3 /*break*/, 15];
                return [4 /*yield*/, ticket.update({ status: "group" })];
            case 14:
                _c.sent();
                console.log("[SyncGroups] Status do ticket atualizado para \"group\": ".concat(groupData.name));
                _c.label = 15;
            case 15:
                if (!!ticket.isGroup) return [3 /*break*/, 17];
                return [4 /*yield*/, ticket.update({ isGroup: true })];
            case 16:
                _c.sent();
                console.log("[SyncGroups] Ticket marcado como grupo: ".concat(groupData.name));
                _c.label = 17;
            case 17:
                console.log("[SyncGroups] Ticket garantido para grupo: ".concat(groupData.name));
                return [3 /*break*/, 19];
            case 18:
                ticketError_1 = _c.sent();
                console.error("[SyncGroups] Erro ao criar ticket para ".concat(groupData.name, ":"), ticketError_1.message);
                errors.push("Erro ao criar ticket para ".concat(groupData.name, ": ").concat(ticketError_1.message));
                return [3 /*break*/, 19];
            case 19: return [3 /*break*/, 21];
            case 20:
                groupError_1 = _c.sent();
                error = "Erro ao processar grupo ".concat(contact.name, ": ").concat(groupError_1.message);
                errors.push(error);
                console.error("[SyncGroups] ".concat(error));
                return [3 /*break*/, 21];
            case 21:
                console.log("[SyncGroups] Contato ".concat(i + 1, "/").concat(contacts.length, " processado"));
                _c.label = 22;
            case 22:
                i++;
                return [3 /*break*/, 4];
            case 23: return [4 /*yield*/, Ticket_1["default"].findAll({
                    where: {
                        whatsappId: whatsappId,
                        companyId: companyId,
                        isGroup: true
                    },
                    include: [
                        {
                            model: Contact_1["default"],
                            as: "contact",
                            required: true
                        }
                    ]
                })];
            case 24:
                existingGroupTickets = _c.sent();
                console.log("[SyncGroups] Verificando ".concat(existingGroupTickets.length, " tickets de grupos existentes"));
                _loop_1 = function (ticket) {
                    var groupJid, groupMetadata, groupData, groupError_2;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                groupJid = "".concat(ticket.contact.number, "@g.us");
                                if (!!groups.find(function (g) { return g.id === groupJid; })) return [3 /*break*/, 4];
                                _d.label = 1;
                            case 1:
                                _d.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, wbot.groupMetadata(groupJid)];
                            case 2:
                                groupMetadata = _d.sent();
                                groupData = {
                                    id: groupJid,
                                    name: groupMetadata.subject || ticket.contact.name,
                                    participants: ((_b = groupMetadata.participants) === null || _b === void 0 ? void 0 : _b.length) || 0
                                };
                                groups.push(groupData);
                                console.log("[SyncGroups] Grupo adicionado via ticket: ".concat(groupData.name));
                                return [3 /*break*/, 4];
                            case 3:
                                groupError_2 = _d.sent();
                                console.error("[SyncGroups] Erro ao obter metadados do grupo ".concat(ticket.contact.name, ": ").concat(groupError_2.message));
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, existingGroupTickets_1 = existingGroupTickets;
                _c.label = 25;
            case 25:
                if (!(_i < existingGroupTickets_1.length)) return [3 /*break*/, 28];
                ticket = existingGroupTickets_1[_i];
                return [5 /*yield**/, _loop_1(ticket)];
            case 26:
                _c.sent();
                _c.label = 27;
            case 27:
                _i++;
                return [3 /*break*/, 25];
            case 28: return [3 /*break*/, 30];
            case 29:
                error_1 = _c.sent();
                console.error("[SyncGroups] Erro ao buscar grupos:", error_1);
                errors.push("Erro ao buscar grupos: ".concat(error_1.message));
                return [3 /*break*/, 30];
            case 30:
                console.log("[SyncGroups] Sincroniza\u00E7\u00E3o conclu\u00EDda: ".concat(groups.length, " grupos encontrados, ").concat(ticketsCreated, " tickets criados"));
                return [2 /*return*/, {
                        groups: groups,
                        ticketsCreated: ticketsCreated,
                        errors: errors
                    }];
            case 31:
                error_2 = _c.sent();
                console.error("[SyncGroups] Erro geral:", error_2);
                throw new AppError_1["default"]("Erro ao sincronizar grupos: ".concat(error_2.message), 500);
            case 32: return [2 /*return*/];
        }
    });
}); };
exports["default"] = SyncGroupsService;
