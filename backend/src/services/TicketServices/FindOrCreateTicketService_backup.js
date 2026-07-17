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
var sequelize_1 = require("sequelize");
var date_fns_1 = require("date-fns");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
var lodash_1 = require("lodash");
var socket_1 = require("../../libs/socket");
var CreateLogTicketService_1 = __importDefault(require("./CreateLogTicketService"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
// interface Response {
//   ticket: Ticket;
//   // isCreated: boolean;
// }
var FindOrCreateTicketService = function (contact, whatsapp, unreadMessages, companyId, queueId, userId, groupContact, channel, isImported, isForward, settings, isTransfered, isCampaign) {
    if (queueId === void 0) { queueId = null; }
    if (userId === void 0) { userId = null; }
    if (isCampaign === void 0) { isCampaign = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var openAsLGPD, io, DirectTicketsToWallets, ticket, timeCreateNewTicket, ticketData, wallet, wallets;
        var _a, _b;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    openAsLGPD = false;
                    if (settings.enableLGPD) { //adicionar lgpdMessage
                        openAsLGPD = !isCampaign &&
                            !isTransfered &&
                            settings.enableLGPD === "enabled" &&
                            settings.lgpdMessage !== "" &&
                            (settings.lgpdConsent === "enabled" ||
                                (settings.lgpdConsent === "disabled" && (0, lodash_1.isNil)(contact === null || contact === void 0 ? void 0 : contact.lgpdAcceptedAt)));
                    }
                    io = (0, socket_1.getIO)();
                    DirectTicketsToWallets = settings.DirectTicketsToWallets;
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                status: (_a = {},
                                    _a[sequelize_1.Op.or] = ["open", "pending", "group", "nps", "lgpd"],
                                    _a),
                                contactId: groupContact ? groupContact.id : contact.id,
                                companyId: companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["id", "DESC"]]
                        })];
                case 1:
                    ticket = _f.sent();
                    if (!ticket) return [3 /*break*/, 7];
                    if (!isCampaign) return [3 /*break*/, 3];
                    return [4 /*yield*/, ticket.update({
                            userId: userId !== ticket.userId ? ticket.userId : userId,
                            queueId: queueId !== ticket.queueId ? ticket.queueId : queueId
                        })];
                case 2:
                    _f.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ticket.update({ unreadMessages: unreadMessages, isBot: false })];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 6:
                    ticket = _f.sent();
                    // console.log(ticket.id)
                    if (!isCampaign && !isForward) {
                        // @ts-ignore: Unreachable code error
                        if ((Number(ticket === null || ticket === void 0 ? void 0 : ticket.userId) !== Number(userId) && userId !== 0 && userId !== "" && userId !== "0" && !(0, lodash_1.isNil)(userId) && !ticket.isGroup)
                            // @ts-ignore: Unreachable code error 
                            || (queueId !== 0 && Number(ticket === null || ticket === void 0 ? void 0 : ticket.queueId) !== Number(queueId) && queueId !== "" && queueId !== "0" && !(0, lodash_1.isNil)(queueId))) {
                            throw new AppError_1["default"]("Ticket em outro atendimento. ".concat("Atendente: " + ((_c = ticket === null || ticket === void 0 ? void 0 : ticket.user) === null || _c === void 0 ? void 0 : _c.name), " - ").concat("Fila: " + ((_d = ticket === null || ticket === void 0 ? void 0 : ticket.queue) === null || _d === void 0 ? void 0 : _d.name)));
                        }
                    }
                    // isCreated = true;
                    return [2 /*return*/, ticket];
                case 7:
                    timeCreateNewTicket = whatsapp.timeCreateNewTicket;
                    if (!(!ticket && timeCreateNewTicket !== 0)) return [3 /*break*/, 11];
                    if (!(timeCreateNewTicket !== 0 && timeCreateNewTicket !== "0")) return [3 /*break*/, 9];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                updatedAt: (_b = {},
                                    _b[sequelize_1.Op.between] = [
                                        +(0, date_fns_1.sub)(new Date(), {
                                            minutes: Number(timeCreateNewTicket)
                                        }),
                                        +new Date()
                                    ],
                                    _b),
                                contactId: contact.id,
                                companyId: companyId,
                                whatsappId: whatsapp.id
                            },
                            order: [["updatedAt", "DESC"]]
                        })];
                case 8:
                    ticket = _f.sent();
                    _f.label = 9;
                case 9:
                    if (!(ticket && ticket.status !== "nps")) return [3 /*break*/, 11];
                    return [4 /*yield*/, ticket.update({
                            status: "pending",
                            unreadMessages: unreadMessages,
                            companyId: companyId
                        })];
                case 10:
                    _f.sent();
                    _f.label = 11;
                case 11:
                    if (!!ticket) return [3 /*break*/, 15];
                    ticketData = {
                        contactId: groupContact ? groupContact.id : contact.id,
                        status: (!isImported && !(0, lodash_1.isNil)(settings.enableLGPD)
                            && openAsLGPD && !groupContact) ? //verifica se lgpd está habilitada e não é grupo e se tem a mensagem e link da política
                            "lgpd" : //abre como LGPD caso habilitado parâmetro
                            (whatsapp.groupAsTicket === "enabled" || !groupContact) ? // se lgpd estiver desabilitado, verifica se é para tratar ticket como grupo ou se é contato normal
                                "pending" : //caso  é para tratar grupo como ticket ou não é grupo, abre como pendente
                                "group",
                        isGroup: !!groupContact,
                        unreadMessages: unreadMessages,
                        whatsappId: whatsapp.id,
                        companyId: companyId,
                        isBot: groupContact ? false : true,
                        channel: channel,
                        imported: isImported ? new Date() : null,
                        isActiveDemand: false
                    };
                    if (!(DirectTicketsToWallets && contact.id)) return [3 /*break*/, 13];
                    wallet = contact;
                    return [4 /*yield*/, wallet.getWallets()];
                case 12:
                    wallets = _f.sent();
                    if (wallets && ((_e = wallets[0]) === null || _e === void 0 ? void 0 : _e.id)) {
                        ticketData.status = (!isImported && !(0, lodash_1.isNil)(settings.enableLGPD)
                            && openAsLGPD && !groupContact) ? //verifica se lgpd está habilitada e não é grupo e se tem a mensagem e link da política
                            "lgpd" : //abre como LGPD caso habilitado parâmetro
                            (whatsapp.groupAsTicket === "enabled" || !groupContact) ? // se lgpd estiver desabilitado, verifica se é para tratar ticket como grupo ou se é contato normal
                                "open" : //caso  é para tratar grupo como ticket ou não é grupo, abre como pendente
                                "group", // se não é para tratar grupo como ticket, vai direto para grupos
                            ticketData.userId = wallets[0].id;
                    }
                    _f.label = 13;
                case 13: return [4 /*yield*/, Ticket_1["default"].create(ticketData)];
                case 14:
                    ticket = _f.sent();
                    _f.label = 15;
                case 15:
                    if (!(queueId != 0 && !(0, lodash_1.isNil)(queueId))) return [3 /*break*/, 17];
                    //Determina qual a fila esse ticket pertence.
                    return [4 /*yield*/, ticket.update({ queueId: queueId })];
                case 16:
                    //Determina qual a fila esse ticket pertence.
                    _f.sent();
                    _f.label = 17;
                case 17:
                    if (!(userId != 0 && !(0, lodash_1.isNil)(userId))) return [3 /*break*/, 19];
                    //Determina qual a fila esse ticket pertence.
                    return [4 /*yield*/, ticket.update({ userId: userId })];
                case 18:
                    //Determina qual a fila esse ticket pertence.
                    _f.sent();
                    _f.label = 19;
                case 19: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 20:
                    ticket = _f.sent();
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            ticketId: ticket.id,
                            type: openAsLGPD ? "lgpd" : "create"
                        })];
                case 21:
                    _f.sent();
                    return [2 /*return*/, ticket];
            }
        });
    });
};
exports["default"] = FindOrCreateTicketService;
