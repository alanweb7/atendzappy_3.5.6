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
var sequelize_1 = require("sequelize");
var GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
var GetDefaultWhatsAppByUser_1 = __importDefault(require("../../helpers/GetDefaultWhatsAppByUser"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var ShowContactService_1 = __importDefault(require("../ContactServices/ShowContactService"));
var socket_1 = require("../../libs/socket");
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var resolveLeadClientForContact_1 = __importDefault(require("./helpers/resolveLeadClientForContact"));
var CreateLogTicketService_1 = __importDefault(require("./CreateLogTicketService"));
var ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
var CreateTicketService = function (_a) {
    var contactId = _a.contactId, lid = _a.lid, status = _a.status, userId = _a.userId, queueId = _a.queueId, companyId = _a.companyId, _b = _a.whatsappId, whatsappId = _b === void 0 ? "" : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var io, _c, leadId, clientId, contact, whatsapp, defaultWhatsapp, existingTicket, isGroup, ticket, shouldUpdateLid;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    io = (0, socket_1.getIO)();
                    return [4 /*yield*/, (0, resolveLeadClientForContact_1["default"])(contactId, companyId)];
                case 1:
                    _c = _e.sent(), leadId = _c.leadId, clientId = _c.clientId;
                    return [4 /*yield*/, (0, ShowContactService_1["default"])(contactId, companyId)];
                case 2:
                    contact = _e.sent();
                    if (!(whatsappId !== "undefined" && whatsappId !== null && whatsappId !== "")) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
                case 3:
                    // console.log("GETTING WHATSAPP CREATE TICKETSERVICE", whatsappId)
                    whatsapp = _e.sent();
                    _e.label = 4;
                case 4: return [4 /*yield*/, (0, GetDefaultWhatsAppByUser_1["default"])(userId)];
                case 5:
                    defaultWhatsapp = _e.sent();
                    if (whatsapp) {
                        defaultWhatsapp = whatsapp;
                    }
                    if (!!defaultWhatsapp) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(whatsapp.id, companyId)];
                case 6:
                    defaultWhatsapp = _e.sent();
                    _e.label = 7;
                case 7: return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: {
                            contactId: contactId,
                            whatsappId: defaultWhatsapp.id,
                            companyId: companyId,
                            status: (_d = {}, _d[sequelize_1.Op.or] = ["open", "pending", "group"], _d)
                        }
                    })];
                case 8:
                    existingTicket = _e.sent();
                    if (!existingTicket) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(existingTicket.id, companyId)];
                case 9: return [2 /*return*/, _e.sent()];
                case 10:
                    isGroup = contact.isGroup;
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: contactId,
                                companyId: companyId,
                                whatsappId: defaultWhatsapp.id
                            },
                            order: [["updatedAt", "DESC"]]
                        })];
                case 11:
                    ticket = _e.sent();
                    if (!(ticket && ["closed", "nps", "lgpd"].includes(ticket.status))) return [3 /*break*/, 13];
                    return [4 /*yield*/, ticket.update({
                            whatsappId: defaultWhatsapp.id,
                            channel: defaultWhatsapp.channel,
                            isGroup: isGroup,
                            userId: userId,
                            queueId: queueId,
                            status: isGroup ? "group" : "open",
                            isBot: true,
                            isActiveDemand: true,
                            crmLeadId: leadId !== null && leadId !== void 0 ? leadId : ticket.crmLeadId,
                            crmClientId: clientId !== null && clientId !== void 0 ? clientId : ticket.crmClientId
                        })];
                case 12:
                    _e.sent();
                    return [3 /*break*/, 15];
                case 13:
                    if (!(ticket && (!ticket.crmLeadId || !ticket.crmClientId))) return [3 /*break*/, 15];
                    return [4 /*yield*/, ticket.update({
                            crmLeadId: leadId !== null && leadId !== void 0 ? leadId : ticket.crmLeadId,
                            crmClientId: clientId !== null && clientId !== void 0 ? clientId : ticket.crmClientId
                        })];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15:
                    if (!!ticket) return [3 /*break*/, 17];
                    return [4 /*yield*/, Ticket_1["default"].create({
                            contactId: contactId,
                            lid: (contact === null || contact === void 0 ? void 0 : contact.lid) || lid || null,
                            companyId: companyId,
                            whatsappId: defaultWhatsapp.id,
                            channel: defaultWhatsapp.channel,
                            isGroup: isGroup,
                            userId: userId,
                            isBot: true,
                            queueId: queueId,
                            status: isGroup ? "group" : "open",
                            isActiveDemand: true,
                            crmLeadId: leadId,
                            crmClientId: clientId
                        })];
                case 16:
                    ticket = _e.sent();
                    _e.label = 17;
                case 17: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 18:
                    // await Ticket.update(
                    //   { companyId, queueId, userId, status: isGroup? "group": "open", isBot: true },
                    //   { where: { id } }
                    // );
                    ticket = _e.sent();
                    if (!ticket) {
                        throw new AppError_1["default"]("ERR_CREATING_TICKET");
                    }
                    shouldUpdateLid = ((contact === null || contact === void 0 ? void 0 : contact.lid) && (contact === null || contact === void 0 ? void 0 : contact.lid) !== ticket.lid) ||
                        (lid && lid !== ticket.lid);
                    if (!shouldUpdateLid) return [3 /*break*/, 20];
                    return [4 /*yield*/, ticket.update({ lid: (contact === null || contact === void 0 ? void 0 : contact.lid) || lid || null })];
                case 19:
                    _e.sent();
                    _e.label = 20;
                case 20: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                case 21:
                    ticket = _e.sent();
                    if (!ticket) {
                        throw new AppError_1["default"]("ERR_CREATING_TICKET");
                    }
                    io.of(String(companyId))
                        // .to(ticket.status)
                        // .to("notification")
                        // .to(ticket.id.toString())
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            userId: userId,
                            queueId: queueId,
                            ticketId: ticket.id,
                            type: "create"
                        })];
                case 22:
                    _e.sent();
                    return [2 /*return*/, ticket];
            }
        });
    });
};
exports["default"] = CreateTicketService;
