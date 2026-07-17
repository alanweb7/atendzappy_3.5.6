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
var sequelize_1 = require("sequelize");
var date_fns_1 = require("date-fns");
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
var lodash_1 = require("lodash");
var socket_1 = require("../../libs/socket");
var logger_1 = __importDefault(require("../../utils/logger"));
var CreateLogTicketService_1 = __importDefault(require("./CreateLogTicketService"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var resolveLeadClientForContact_1 = __importDefault(require("./helpers/resolveLeadClientForContact"));
var ContactDeduplicationService_1 = require("../ContactServices/ContactDeduplicationService");
// interface Response {
//   ticket: Ticket;
//   // isCreated: boolean;
// }
var FindOrCreateTicketService = function (contact, whatsapp, unreadMessages, companyId, queueId, userId, groupContact, channel, isImported, isForward, settings, isTransfered, isCampaign) {
    if (queueId === void 0) { queueId = null; }
    if (userId === void 0) { userId = null; }
    if (isCampaign === void 0) { isCampaign = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var openAsLGPD, io, betterContact, DirectTicketsToWallets, baseContactId, _a, leadId, clientId, ticket, contactsWithSameLid, _i, contactsWithSameLid_1, lidContact, lidTicket, lidDigits, contactsByRemoteJid, _b, contactsByRemoteJid_1, remoteJidContact, remoteJidTicket, shouldOpenAsLGPD, defaultStatus, ticketData, wallet, wallets, reusedTicket, baseWhere, reopenData, reopenData, recentTicket;
        var _c, _d, _e, _f, _g, _h, _j;
        var _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    openAsLGPD = false;
                    if (settings.enableLGPD) {
                        //adicionar lgpdMessage
                        openAsLGPD =
                            !isCampaign &&
                                !isTransfered &&
                                settings.enableLGPD === "enabled" &&
                                settings.lgpdMessage !== "" &&
                                (settings.lgpdConsent === "enabled" ||
                                    (settings.lgpdConsent === "disabled" &&
                                        (0, lodash_1.isNil)(contact === null || contact === void 0 ? void 0 : contact.lgpdAcceptedAt)));
                    }
                    io = (0, socket_1.getIO)();
                    return [4 /*yield*/, (0, ContactDeduplicationService_1.FindDuplicateContact)({
                            number: contact.number,
                            lid: contact.lid,
                            remoteJid: contact.remoteJid,
                            companyId: companyId,
                            excludeId: contact.id
                        })];
                case 1:
                    betterContact = _o.sent();
                    if (betterContact && betterContact.id !== contact.id) {
                        logger_1["default"].info("Using better contact for ticket: ".concat(betterContact.id, " instead of ").concat(contact.id));
                        contact = betterContact;
                    }
                    DirectTicketsToWallets = settings.DirectTicketsToWallets;
                    baseContactId = groupContact ? groupContact.id : contact.id;
                    return [4 /*yield*/, (0, resolveLeadClientForContact_1["default"])(baseContactId, companyId)];
                case 2:
                    _a = _o.sent(), leadId = _a.leadId, clientId = _a.clientId;
                    ticket = null;
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                status: (_c = {},
                                    _c[sequelize_1.Op.or] = ["open", "pending", "group", "nps", "lgpd"],
                                    _c),
                                contactId: baseContactId,
                                companyId: companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["id", "DESC"]]
                        })];
                case 3:
                    // 1️⃣ Busca principal por contactId
                    ticket = _o.sent();
                    if (!(!ticket && contact.lid)) return [3 /*break*/, 9];
                    logger_1["default"].info("\uD83D\uDD0D Buscando ticket por LID: ".concat(contact.lid));
                    return [4 /*yield*/, Contact_1["default"].findAll({
                            where: {
                                lid: contact.lid,
                                companyId: companyId,
                                id: (_d = {}, _d[sequelize_1.Op.ne] = contact.id, _d) // Excluir contato atual
                            }
                        })];
                case 4:
                    contactsWithSameLid = _o.sent();
                    _i = 0, contactsWithSameLid_1 = contactsWithSameLid;
                    _o.label = 5;
                case 5:
                    if (!(_i < contactsWithSameLid_1.length)) return [3 /*break*/, 9];
                    lidContact = contactsWithSameLid_1[_i];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                status: (_e = {},
                                    _e[sequelize_1.Op.or] = ["open", "pending", "group", "nps", "lgpd"],
                                    _e),
                                contactId: lidContact.id,
                                companyId: companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["id", "DESC"]]
                        })];
                case 6:
                    lidTicket = _o.sent();
                    if (!lidTicket) return [3 /*break*/, 8];
                    logger_1["default"].info("\u2705 Ticket encontrado por LID: ".concat(lidTicket.id, " (contactId: ").concat(lidContact.id, ")"));
                    ticket = lidTicket;
                    // 🔄 ATUALIZAR TICKET para usar o contato correto
                    return [4 /*yield*/, ticket.update({
                            contactId: baseContactId // Usa o contactId correto
                        })];
                case 7:
                    // 🔄 ATUALIZAR TICKET para usar o contato correto
                    _o.sent();
                    return [3 /*break*/, 9]; // Encontrou, para de buscar
                case 8:
                    _i++;
                    return [3 /*break*/, 5];
                case 9:
                    if (!(!ticket && contact.remoteJid && contact.remoteJid.includes("@lid"))) return [3 /*break*/, 15];
                    logger_1["default"].info("\uD83D\uDD0D Buscando ticket por remoteJid @lid: ".concat(contact.remoteJid));
                    lidDigits = contact.remoteJid.split("@")[0];
                    return [4 /*yield*/, Contact_1["default"].findAll({
                            where: {
                                remoteJid: (_f = {}, _f[sequelize_1.Op.like] = "%".concat(lidDigits, "@%"), _f),
                                companyId: companyId,
                                id: (_g = {}, _g[sequelize_1.Op.ne] = contact.id, _g)
                            }
                        })];
                case 10:
                    contactsByRemoteJid = _o.sent();
                    _b = 0, contactsByRemoteJid_1 = contactsByRemoteJid;
                    _o.label = 11;
                case 11:
                    if (!(_b < contactsByRemoteJid_1.length)) return [3 /*break*/, 15];
                    remoteJidContact = contactsByRemoteJid_1[_b];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                status: (_h = {},
                                    _h[sequelize_1.Op.or] = ["open", "pending", "group", "nps", "lgpd"],
                                    _h),
                                contactId: remoteJidContact.id,
                                companyId: companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["id", "DESC"]]
                        })];
                case 12:
                    remoteJidTicket = _o.sent();
                    if (!remoteJidTicket) return [3 /*break*/, 14];
                    logger_1["default"].info("\u2705 Ticket encontrado por remoteJid: ".concat(remoteJidTicket.id, " (contactId: ").concat(remoteJidContact.id, ")"));
                    ticket = remoteJidTicket;
                    // 🔄 ATUALIZAR TICKET para usar o contato correto
                    return [4 /*yield*/, ticket.update({
                            contactId: baseContactId
                        })];
                case 13:
                    // 🔄 ATUALIZAR TICKET para usar o contato correto
                    _o.sent();
                    return [3 /*break*/, 15];
                case 14:
                    _b++;
                    return [3 /*break*/, 11];
                case 15:
                    if (!ticket) return [3 /*break*/, 21];
                    if (!isCampaign) return [3 /*break*/, 17];
                    return [4 /*yield*/, ticket.update({
                            userId: userId !== ticket.userId ? ticket.userId : userId,
                            queueId: queueId !== ticket.queueId ? ticket.queueId : queueId
                        })];
                case 16:
                    _o.sent();
                    return [3 /*break*/, 19];
                case 17: return [4 /*yield*/, ticket.update({
                        unreadMessages: unreadMessages,
                        isBot: false,
                        crmLeadId: leadId !== null && leadId !== void 0 ? leadId : ticket.crmLeadId,
                        crmClientId: clientId !== null && clientId !== void 0 ? clientId : ticket.crmClientId
                    })];
                case 18:
                    _o.sent();
                    _o.label = 19;
                case 19: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 20:
                    ticket = _o.sent();
                    // console.log(ticket.id)
                    if (!isCampaign && !isForward) {
                        // @ts-ignore: Unreachable code error
                        if ((Number(ticket === null || ticket === void 0 ? void 0 : ticket.userId) !== Number(userId) &&
                            Number(userId) !== 0 &&
                            !(0, lodash_1.isNil)(userId) &&
                            !ticket.isGroup) ||
                            // @ts-ignore: Unreachable code error
                            (Number(ticket === null || ticket === void 0 ? void 0 : ticket.queueId) !== Number(queueId) &&
                                Number(queueId) !== 0 &&
                                !(0, lodash_1.isNil)(queueId))) {
                            throw new AppError_1["default"]("Ticket em outro atendimento. ".concat("Atendente: " + ((_k = ticket === null || ticket === void 0 ? void 0 : ticket.user) === null || _k === void 0 ? void 0 : _k.name), " - ").concat("Fila: " + ((_l = ticket === null || ticket === void 0 ? void 0 : ticket.queue) === null || _l === void 0 ? void 0 : _l.name)));
                        }
                    }
                    // isCreated = true;
                    return [2 /*return*/, ticket];
                case 21:
                    shouldOpenAsLGPD = !isImported &&
                        !(0, lodash_1.isNil)(settings.enableLGPD) &&
                        openAsLGPD &&
                        !groupContact;
                    defaultStatus = shouldOpenAsLGPD
                        ? "lgpd"
                        : whatsapp.groupAsTicket === "enabled" || !groupContact
                            ? "pending"
                            : "group";
                    ticketData = {
                        contactId: baseContactId,
                        status: defaultStatus,
                        isGroup: !!groupContact,
                        unreadMessages: unreadMessages,
                        whatsappId: whatsapp.id,
                        companyId: companyId,
                        isBot: groupContact ? false : true,
                        channel: channel,
                        imported: isImported ? new Date() : null,
                        isActiveDemand: false,
                        crmLeadId: leadId,
                        crmClientId: clientId
                    };
                    if (!(DirectTicketsToWallets && contact.id)) return [3 /*break*/, 23];
                    wallet = contact;
                    return [4 /*yield*/, wallet.getWallets()];
                case 22:
                    wallets = _o.sent();
                    if (wallets && ((_m = wallets[0]) === null || _m === void 0 ? void 0 : _m.id)) {
                        ticketData.status = shouldOpenAsLGPD
                            ? "lgpd"
                            : whatsapp.groupAsTicket === "enabled" || !groupContact
                                ? "open"
                                : "group";
                        ticketData.userId = wallets[0].id;
                    }
                    _o.label = 23;
                case 23:
                    reusedTicket = false;
                    if (!!ticket) return [3 /*break*/, 27];
                    baseWhere = {
                        contactId: contact.id,
                        companyId: companyId
                    };
                    if (channel === "facebook" || channel === "instagram") {
                        baseWhere.channel = channel;
                    }
                    else {
                        baseWhere.whatsappId = whatsapp.id;
                    }
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: baseWhere,
                            order: [["updatedAt", "DESC"]]
                        })];
                case 24:
                    ticket = _o.sent();
                    if (!(ticket && ["closed", "nps", "lgpd"].includes(ticket.status))) return [3 /*break*/, 27];
                    reopenData = {
                        status: "pending",
                        unreadMessages: unreadMessages,
                        companyId: companyId,
                        isBot: false,
                        crmLeadId: leadId !== null && leadId !== void 0 ? leadId : ticket.crmLeadId,
                        crmClientId: clientId !== null && clientId !== void 0 ? clientId : ticket.crmClientId
                    };
                    // Tratar queueId = 0 como "sem fila" para não violar FK
                    if (queueId != 0 && !(0, lodash_1.isNil)(queueId)) {
                        reopenData.queueId = queueId;
                    }
                    // Tratar userId = 0 como "sem usuário" para não violar FK
                    if (userId != 0 && !(0, lodash_1.isNil)(userId)) {
                        reopenData.userId = userId;
                    }
                    return [4 /*yield*/, ticket.update(reopenData)];
                case 25:
                    _o.sent();
                    return [4 /*yield*/, ticket.reload()];
                case 26:
                    _o.sent();
                    reusedTicket = true;
                    _o.label = 27;
                case 27:
                    if (!!ticket) return [3 /*break*/, 31];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: baseContactId,
                                companyId: companyId
                            },
                            order: [["updatedAt", "DESC"]]
                        })];
                case 28:
                    ticket = _o.sent();
                    if (!ticket) return [3 /*break*/, 31];
                    reopenData = __assign(__assign({}, ticketData), { status: ticketData.status === "group" && !ticket.isGroup ? "pending" : ticketData.status, isBot: groupContact ? false : false });
                    if (!(0, lodash_1.isNil)(queueId)) {
                        reopenData.queueId = queueId;
                    }
                    if (!(0, lodash_1.isNil)(userId)) {
                        reopenData.userId = userId;
                    }
                    return [4 /*yield*/, ticket.update(reopenData)];
                case 29:
                    _o.sent();
                    return [4 /*yield*/, ticket.reload()];
                case 30:
                    _o.sent();
                    reusedTicket = true;
                    _o.label = 31;
                case 31:
                    if (!!ticket) return [3 /*break*/, 35];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: baseContactId,
                                companyId: companyId,
                                whatsappId: whatsapp.id,
                                createdAt: (_j = {}, _j[sequelize_1.Op.gte] = (0, date_fns_1.sub)(new Date(), { seconds: 30 }), _j)
                            },
                            order: [["id", "DESC"]]
                        })];
                case 32:
                    recentTicket = _o.sent();
                    if (!recentTicket) return [3 /*break*/, 33];
                    logger_1["default"].info("[FindOrCreateTicket] Ticket recente encontrado (anti-race): ".concat(recentTicket.id, " \u2014 reutilizando em vez de criar novo"));
                    ticket = recentTicket;
                    reusedTicket = true;
                    return [3 /*break*/, 35];
                case 33:
                    console.log("Criando ticket", ticketData);
                    return [4 /*yield*/, Ticket_1["default"].create(ticketData)];
                case 34:
                    ticket = _o.sent();
                    _o.label = 35;
                case 35:
                    if (!(queueId != 0 && !(0, lodash_1.isNil)(queueId))) return [3 /*break*/, 37];
                    //Determina qual a fila esse ticket pertence.
                    return [4 /*yield*/, ticket.update({ queueId: queueId })];
                case 36:
                    //Determina qual a fila esse ticket pertence.
                    _o.sent();
                    _o.label = 37;
                case 37:
                    if (!(userId != 0 && !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 39];
                    //Determina qual a fila esse ticket pertence.
                    return [4 /*yield*/, ticket.update({ userId: userId })];
                case 38:
                    //Determina qual a fila esse ticket pertence.
                    _o.sent();
                    _o.label = 39;
                case 39: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 40:
                    ticket = _o.sent();
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            ticketId: ticket.id,
                            type: shouldOpenAsLGPD ? "lgpd" : reusedTicket ? "reopen" : "create"
                        })];
                case 41:
                    _o.sent();
                    return [2 /*return*/, ticket];
            }
        });
    });
};
exports["default"] = FindOrCreateTicketService;
