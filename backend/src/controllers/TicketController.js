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
exports.cleanupAll = exports.closeAll = exports.remove = exports.update = exports.showFromUUID = exports.showLog = exports.tagHistory = exports.show = exports.setunredmsg = exports.store = exports.kanban = exports.report = exports.index = void 0;
var socket_1 = require("../libs/socket");
var Ticket_1 = __importDefault(require("../models/Ticket"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateTicketService_1 = __importDefault(require("../services/TicketServices/CreateTicketService"));
var DeleteTicketService_1 = __importDefault(require("../services/TicketServices/DeleteTicketService"));
var ListTicketsService_1 = __importDefault(require("../services/TicketServices/ListTicketsService"));
var ShowTicketFromUUIDService_1 = __importDefault(require("../services/TicketServices/ShowTicketFromUUIDService"));
var ShowTicketService_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));
var UpdateTicketService_1 = __importDefault(require("../services/TicketServices/UpdateTicketService"));
var ListTicketsServiceKanban_1 = __importDefault(require("../services/TicketServices/ListTicketsServiceKanban"));
var CleanupCompanyTicketsService_1 = __importDefault(require("../services/TicketServices/CleanupCompanyTicketsService"));
var CreateLogTicketService_1 = __importDefault(require("../services/TicketServices/CreateLogTicketService"));
var ShowLogTicketService_1 = __importDefault(require("../services/TicketServices/ShowLogTicketService"));
var ListTicketsServiceReport_1 = __importDefault(require("../services/TicketServices/ListTicketsServiceReport"));
var SetTicketMessagesAsRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsRead"));
var SetTicketMessagesAsUnRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsUnRead"));
var async_mutex_1 = require("async-mutex");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNumber, status, date, dateStart, dateEnd, updatedAt, searchParam, showAll, queueIdsStringified, tagIdsStringified, userIdsStringified, withUnreadMessages, whatsappIdsStringified, statusStringfied, sortTickets, searchOnMessages, pageSize, pendingType, userId, companyId, queueIds, tagsIds, usersIds, whatsappIds, statusFilters, parsed, _b, tickets, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, pageNumber = _a.pageNumber, status = _a.status, date = _a.date, dateStart = _a.dateStart, dateEnd = _a.dateEnd, updatedAt = _a.updatedAt, searchParam = _a.searchParam, showAll = _a.showAll, queueIdsStringified = _a.queueIds, tagIdsStringified = _a.tags, userIdsStringified = _a.users, withUnreadMessages = _a.withUnreadMessages, whatsappIdsStringified = _a.whatsappIds, statusStringfied = _a.statusFilter, sortTickets = _a.sortTickets, searchOnMessages = _a.searchOnMessages, pageSize = _a.pageSize, pendingType = _a.pendingType;
                userId = Number(req.user.id);
                companyId = req.user.companyId;
                queueIds = [];
                tagsIds = [];
                usersIds = [];
                whatsappIds = [];
                statusFilters = [];
                if (queueIdsStringified) {
                    queueIds = JSON.parse(queueIdsStringified);
                }
                if (tagIdsStringified) {
                    tagsIds = JSON.parse(tagIdsStringified);
                }
                if (userIdsStringified) {
                    usersIds = JSON.parse(userIdsStringified);
                }
                if (whatsappIdsStringified) {
                    whatsappIds = JSON.parse(whatsappIdsStringified);
                    console.log("📡 Controller recebeu whatsappIds:", whatsappIds);
                }
                if (statusStringfied) {
                    try {
                        parsed = JSON.parse(statusStringfied);
                        if (Array.isArray(parsed)) {
                            statusFilters = parsed.filter(function (item) { return typeof item === "string" && item.trim().length > 0; });
                        }
                        else if (typeof parsed === "string" && parsed.trim().length > 0) {
                            statusFilters = [parsed.trim()];
                        }
                        else {
                            statusFilters = [];
                        }
                    }
                    catch (error) {
                        console.error("⚠️ Não foi possível parsear statusFilter:", statusStringfied, error);
                        statusFilters = [];
                    }
                }
                return [4 /*yield*/, (0, ListTicketsService_1["default"])({
                        searchParam: searchParam,
                        tags: tagsIds,
                        users: usersIds,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        pendingType: pendingType,
                        status: status,
                        date: date,
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        updatedAt: updatedAt,
                        showAll: showAll,
                        userId: userId,
                        queueIds: queueIds,
                        withUnreadMessages: withUnreadMessages,
                        whatsappIds: whatsappIds,
                        statusFilters: statusFilters,
                        companyId: companyId,
                        sortTickets: sortTickets,
                        searchOnMessages: searchOnMessages
                    })];
            case 1:
                _b = _c.sent(), tickets = _b.tickets, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.status(200).json({ tickets: tickets, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var report = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, contactId, whatsappIdsStringified, dateFrom, dateTo, statusStringified, queueIdsStringified, tagIdsStringified, userIdsStringified, pageNumber, pageSize, onlyRated, userId, companyId, queueIds, whatsappIds, tagsIds, usersIds, statusIds, _b, tickets, totalTickets;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, contactId = _a.contactId, whatsappIdsStringified = _a.whatsappId, dateFrom = _a.dateFrom, dateTo = _a.dateTo, statusStringified = _a.status, queueIdsStringified = _a.queueIds, tagIdsStringified = _a.tags, userIdsStringified = _a.users, pageNumber = _a.page, pageSize = _a.pageSize, onlyRated = _a.onlyRated;
                userId = req.user.id;
                companyId = req.user.companyId;
                queueIds = [];
                whatsappIds = [];
                tagsIds = [];
                usersIds = [];
                statusIds = [];
                if (statusStringified) {
                    statusIds = JSON.parse(statusStringified);
                }
                if (whatsappIdsStringified) {
                    whatsappIds = JSON.parse(whatsappIdsStringified);
                }
                if (queueIdsStringified) {
                    queueIds = JSON.parse(queueIdsStringified);
                }
                if (tagIdsStringified) {
                    tagsIds = JSON.parse(tagIdsStringified);
                }
                if (userIdsStringified) {
                    usersIds = JSON.parse(userIdsStringified);
                }
                return [4 /*yield*/, (0, ListTicketsServiceReport_1["default"])(companyId, {
                        searchParam: searchParam,
                        queueIds: queueIds,
                        tags: tagsIds,
                        users: usersIds,
                        status: statusIds,
                        dateFrom: dateFrom,
                        dateTo: dateTo,
                        userId: userId,
                        contactId: contactId,
                        whatsappId: whatsappIds,
                        onlyRated: onlyRated
                    }, +pageNumber, +pageSize)];
            case 1:
                _b = _c.sent(), tickets = _b.tickets, totalTickets = _b.totalTickets;
                return [2 /*return*/, res.status(200).json({ tickets: tickets, totalTickets: totalTickets })];
        }
    });
}); };
exports.report = report;
var kanban = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNumber, status, date, dateStart, dateEnd, updatedAt, searchParam, showAll, queueIdsStringified, tagIdsStringified, userIdsStringified, withUnreadMessages, userId, companyId, queueIds, tagsIds, usersIds, _b, tickets, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, pageNumber = _a.pageNumber, status = _a.status, date = _a.date, dateStart = _a.dateStart, dateEnd = _a.dateEnd, updatedAt = _a.updatedAt, searchParam = _a.searchParam, showAll = _a.showAll, queueIdsStringified = _a.queueIds, tagIdsStringified = _a.tags, userIdsStringified = _a.users, withUnreadMessages = _a.withUnreadMessages;
                userId = req.user.id;
                companyId = req.user.companyId;
                queueIds = [];
                tagsIds = [];
                usersIds = [];
                if (queueIdsStringified) {
                    queueIds = JSON.parse(queueIdsStringified);
                }
                if (tagIdsStringified) {
                    tagsIds = JSON.parse(tagIdsStringified);
                }
                if (userIdsStringified) {
                    usersIds = JSON.parse(userIdsStringified);
                }
                return [4 /*yield*/, (0, ListTicketsServiceKanban_1["default"])({
                        searchParam: searchParam,
                        tags: tagsIds,
                        users: usersIds,
                        pageNumber: pageNumber,
                        status: status,
                        date: date,
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        updatedAt: updatedAt,
                        showAll: showAll,
                        userId: userId,
                        queueIds: queueIds,
                        withUnreadMessages: withUnreadMessages,
                        companyId: companyId
                    })];
            case 1:
                _b = _c.sent(), tickets = _b.tickets, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.status(200).json({ tickets: tickets, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.kanban = kanban;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, contactId, status, userId, queueId, whatsappId, companyId, ticket, io, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, contactId = _a.contactId, status = _a.status, userId = _a.userId, queueId = _a.queueId, whatsappId = _a.whatsappId;
                companyId = req.user.companyId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, CreateTicketService_1["default"])({
                        contactId: contactId,
                        status: status,
                        userId: userId,
                        companyId: companyId,
                        queueId: queueId,
                        whatsappId: whatsappId
                    })];
            case 2:
                ticket = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "update",
                    ticket: ticket
                });
                return [2 /*return*/, res.status(200).json(ticket)];
            case 3:
                err_1 = _b.sent();
                if (err_1 instanceof AppError_1["default"]) {
                    return [2 /*return*/, res.status(err_1.statusCode).json({
                            error: err_1.message,
                            data: err_1.data
                        })];
                }
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var setunredmsg = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, userId, companyId, ticket;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.user, userId = _a.id, companyId = _a.companyId;
                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticketId, companyId, userId)];
            case 1:
                ticket = _b.sent();
                if (ticket.channel === "whatsapp" && ticket.whatsappId) {
                    (0, SetTicketMessagesAsUnRead_1["default"])(ticket);
                }
                return [2 /*return*/, res.status(200).json(ticket)];
        }
    });
}); };
exports.setunredmsg = setunredmsg;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, userId, companyId, contact;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.user, userId = _a.id, companyId = _a.companyId;
                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticketId, companyId, userId)];
            case 1:
                contact = _b.sent();
                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                        userId: userId,
                        ticketId: ticketId,
                        type: "access"
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.show = show;
var tagHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, companyId, TicketTagHistory, Tag, User, history;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketId = req.params.ticketId;
                companyId = req.user.companyId;
                TicketTagHistory = require("../models/TicketTagHistory")["default"];
                Tag = require("../models/Tag")["default"];
                User = require("../models/User")["default"];
                return [4 /*yield*/, TicketTagHistory.findAll({
                        where: { ticketId: ticketId },
                        include: [
                            { model: Tag, as: "tag", attributes: ["id", "name", "color", "kanban"] },
                            { model: User, as: "user", attributes: ["id", "name"] }
                        ],
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                history = _a.sent();
                return [2 /*return*/, res.status(200).json(history)];
        }
    });
}); };
exports.tagHistory = tagHistory;
var showLog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, userId, companyId, log;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.user, userId = _a.id, companyId = _a.companyId;
                return [4 /*yield*/, (0, ShowLogTicketService_1["default"])({ ticketId: ticketId, companyId: companyId })];
            case 1:
                log = _b.sent();
                return [2 /*return*/, res.status(200).json(log)];
        }
    });
}); };
exports.showLog = showLog;
var showFromUUID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uuid, _a, userId, companyId, ticket;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                uuid = req.params.uuid;
                _a = req.user, userId = _a.id, companyId = _a.companyId;
                return [4 /*yield*/, (0, ShowTicketFromUUIDService_1["default"])(uuid, companyId)];
            case 1:
                ticket = _b.sent();
                if (ticket.channel === "whatsapp" && ticket.whatsappId && ticket.unreadMessages > 0) {
                    (0, SetTicketMessagesAsRead_1["default"])(ticket);
                }
                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                        userId: userId,
                        ticketId: ticket.id,
                        type: "access"
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json(ticket)];
        }
    });
}); };
exports.showFromUUID = showFromUUID;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId_1, ticketData_1, companyId_1, mutex, result, ticket, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ticketId_1 = req.params.ticketId;
                ticketData_1 = req.body;
                companyId_1 = req.user.companyId;
                mutex = new async_mutex_1.Mutex();
                return [4 /*yield*/, mutex.runExclusive(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var ticketResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: ticketData_1,
                                        ticketId: ticketId_1,
                                        companyId: companyId_1
                                    })];
                                case 1:
                                    ticketResult = _a.sent();
                                    return [2 /*return*/, ticketResult];
                            }
                        });
                    }); })];
            case 1:
                result = _a.sent();
                ticket = (result || {}).ticket;
                // Verificar se resposta já foi enviada
                if (!res.headersSent) {
                    return [2 /*return*/, res.status(200).json(ticket)];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                // Verificar se resposta já foi enviada
                if (!res.headersSent) {
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, userId, companyId, ticket, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticketId;
                _a = req.user, userId = _a.id, companyId = _a.companyId;
                return [4 /*yield*/, (0, DeleteTicketService_1["default"])(ticketId, userId, companyId)];
            case 1:
                ticket = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    // .to(ticket.status)
                    // .to(ticketId)
                    // .to("notification")
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "delete",
                    ticketId: +ticketId
                });
                return [2 /*return*/, res.status(200).json({ message: "ticket deleted" })];
        }
    });
}); };
exports.remove = remove;
var closeAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, status, io, tickets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                status = req.body.status;
                io = (0, socket_1.getIO)();
                return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                        where: { companyId: companyId, status: status },
                        order: [["updatedAt", "DESC"]]
                    })];
            case 1:
                tickets = (_a.sent()).rows;
                tickets.forEach(function (ticket) { return __awaiter(void 0, void 0, void 0, function () {
                    var ticketData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                ticketData = {
                                    status: "closed",
                                    userId: ticket.userId || null,
                                    queueId: ticket.queueId || null,
                                    unreadMessages: 0,
                                    amountUsedBotQueues: 0,
                                    sendFarewellMessage: false
                                };
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({ ticketData: ticketData, ticketId: ticket.id, companyId: companyId })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, res.status(200).json()];
        }
    });
}); };
exports.closeAll = closeAll;
var cleanupAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CleanupCompanyTicketsService_1["default"])({ companyId: companyId })];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), {
                    action: "cleanup"
                });
                return [2 /*return*/, res.status(200).json({ message: "All tickets for this company have been deleted" })];
        }
    });
}); };
exports.cleanupAll = cleanupAll;
