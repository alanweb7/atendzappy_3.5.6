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
var Message_1 = __importDefault(require("../../models/Message"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var sequelize_1 = require("sequelize");
var lodash_1 = require("lodash");
var User_1 = __importDefault(require("../../models/User"));
var isQueueIdHistoryBlocked_1 = __importDefault(require("../UserServices/isQueueIdHistoryBlocked"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var ListMessagesService = function (_a) {
    var _b = _a.pageNumber, pageNumber = _b === void 0 ? "1" : _b, ticketId = _a.ticketId, companyId = _a.companyId, _c = _a.queues, queues = _c === void 0 ? [] : _c, user = _a.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var uuid, ticket, ticketsFilter, isAllHistoricEnabled, ticketIds, tickets, limit, offset, _d, count, messages, hasMore;
        var _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    if (!!isNaN(Number(ticketId))) return [3 /*break*/, 2];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                id: ticketId,
                                companyId: companyId
                            },
                            attributes: ["uuid"]
                        })];
                case 1:
                    uuid = _j.sent();
                    ticketId = uuid.uuid;
                    _j.label = 2;
                case 2: return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: {
                            uuid: ticketId,
                            companyId: companyId
                        }
                    })];
                case 3:
                    ticket = _j.sent();
                    ticketsFilter = [];
                    return [4 /*yield*/, (0, isQueueIdHistoryBlocked_1["default"])({ userRequest: user.id })];
                case 4:
                    isAllHistoricEnabled = _j.sent();
                    ticketIds = [];
                    if (!!isAllHistoricEnabled) return [3 /*break*/, 6];
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            where: {
                                id: (_e = {}, _e[sequelize_1.Op.lte] = ticket.id, _e),
                                companyId: ticket.companyId,
                                contactId: ticket.contactId,
                                whatsappId: ticket.whatsappId,
                                isGroup: ticket.isGroup,
                                queueId: user.profile === "admin" || user.allTicket === "enable" || (ticket.isGroup && user.allowGroup) ? (_f = {},
                                    _f[sequelize_1.Op.or] = [queues, null],
                                    _f) : (_g = {}, _g[sequelize_1.Op["in"]] = queues, _g)
                            },
                            attributes: ["id"]
                        })];
                case 5:
                    ticketIds = _j.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: {
                            id: (_h = {}, _h[sequelize_1.Op.lte] = ticket.id, _h),
                            companyId: ticket.companyId,
                            contactId: ticket.contactId,
                            whatsappId: ticket.whatsappId,
                            isGroup: ticket.isGroup
                        },
                        attributes: ["id"]
                    })];
                case 7:
                    ticketIds = _j.sent();
                    _j.label = 8;
                case 8:
                    if (ticketIds) {
                        ticketsFilter.push(ticketIds.map(function (t) { return t.id; }));
                    }
                    tickets = lodash_1.intersection.apply(void 0, ticketsFilter);
                    if (!tickets) {
                        throw new AppError_1["default"]("ERR_NO_TICKET_FOUND", 404);
                    }
                    limit = 20;
                    offset = limit * (+pageNumber - 1);
                    return [4 /*yield*/, Message_1["default"].findAndCountAll({
                            where: { ticketId: tickets, companyId: companyId },
                            attributes: ["id", "fromMe", "mediaUrl", "body", "mediaType", "dataJson", "ack", "createdAt", "ticketId", "isDeleted", "queueId", "isForwarded", "isEdited", "isPrivate", "companyId", "fromAgent", "userId"],
                            limit: limit,
                            include: [
                                {
                                    model: Contact_1["default"],
                                    as: "contact",
                                    attributes: ["id", "name"]
                                },
                                {
                                    model: User_1["default"],
                                    as: "user",
                                    attributes: ["id", "name"],
                                    required: false
                                },
                                {
                                    model: Message_1["default"],
                                    attributes: ["id", "fromMe", "mediaUrl", "body", "mediaType", "companyId", "fromAgent", "userId"],
                                    as: "quotedMsg",
                                    include: [
                                        {
                                            model: Contact_1["default"],
                                            as: "contact",
                                            attributes: ["id", "name"]
                                        },
                                        {
                                            model: User_1["default"],
                                            as: "user",
                                            attributes: ["id", "name"],
                                            required: false
                                        }
                                    ],
                                    required: false
                                },
                                {
                                    model: Ticket_1["default"],
                                    required: true,
                                    attributes: ["id", "whatsappId", "queueId"],
                                    include: [
                                        {
                                            model: Queue_1["default"],
                                            as: "queue",
                                            attributes: ["id", "name", "color"]
                                        }
                                    ]
                                }
                            ],
                            distinct: true,
                            offset: offset,
                            subQuery: false,
                            order: [["createdAt", "DESC"]]
                        })];
                case 9:
                    _d = _j.sent(), count = _d.count, messages = _d.rows;
                    hasMore = count > offset + messages.length;
                    return [2 /*return*/, {
                            messages: messages.reverse(),
                            ticket: ticket,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListMessagesService;
