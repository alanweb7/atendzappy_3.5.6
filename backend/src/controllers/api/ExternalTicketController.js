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
exports.transfer = exports.reopen = exports.close = exports.update = exports.messages = exports.show = exports.index = void 0;
var sequelize_1 = require("sequelize");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var User_1 = __importDefault(require("../../models/User"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var Message_1 = __importDefault(require("../../models/Message"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var serializeTicket = function (ticket) {
    var _a;
    return ({
        id: ticket.id,
        uuid: ticket.uuid,
        status: ticket.status,
        channel: ticket.channel,
        lastMessage: ticket.lastMessage,
        isGroup: ticket.isGroup,
        unreadMessages: ticket.unreadMessages,
        contactId: ticket.contactId,
        contact: ticket.contact ? {
            id: ticket.contact.id,
            name: ticket.contact.name,
            number: ticket.contact.number,
            email: ticket.contact.email,
            profilePicUrl: ticket.contact.profilePicUrl
        } : null,
        userId: ticket.userId,
        user: ticket.user ? {
            id: ticket.user.id,
            name: ticket.user.name,
            email: ticket.user.email
        } : null,
        queueId: ticket.queueId,
        queue: ticket.queue ? {
            id: ticket.queue.id,
            name: ticket.queue.name,
            color: ticket.queue.color
        } : null,
        whatsappId: ticket.whatsappId,
        whatsapp: ticket.whatsapp ? {
            id: ticket.whatsapp.id,
            name: ticket.whatsapp.name
        } : null,
        tags: ((_a = ticket.tags) === null || _a === void 0 ? void 0 : _a.map(function (t) { return ({ id: t.id, name: t.name, color: t.color }); })) || [],
        isBot: ticket.isBot,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    });
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, pageNumber, status, queueId, userId, contactId, whatsappId, isGroup, searchParam, startDate, endDate, limit, offset, whereCondition, includeCondition, _b, count, tickets, hasMore;
    var _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                _a = req.query, pageNumber = _a.pageNumber, status = _a.status, queueId = _a.queueId, userId = _a.userId, contactId = _a.contactId, whatsappId = _a.whatsappId, isGroup = _a.isGroup, searchParam = _a.searchParam, startDate = _a.startDate, endDate = _a.endDate;
                limit = 50;
                offset = pageNumber ? (Number(pageNumber) - 1) * limit : 0;
                whereCondition = { companyId: companyId };
                if (status) {
                    whereCondition.status = status;
                }
                if (queueId) {
                    whereCondition.queueId = Number(queueId);
                }
                if (userId) {
                    whereCondition.userId = Number(userId);
                }
                if (contactId) {
                    whereCondition.contactId = Number(contactId);
                }
                if (whatsappId) {
                    whereCondition.whatsappId = Number(whatsappId);
                }
                if (isGroup !== undefined) {
                    whereCondition.isGroup = isGroup === "true";
                }
                if (startDate && endDate) {
                    whereCondition.createdAt = (_c = {},
                        _c[sequelize_1.Op.between] = [new Date(startDate), new Date(endDate)],
                        _c);
                }
                else if (startDate) {
                    whereCondition.createdAt = (_d = {},
                        _d[sequelize_1.Op.gte] = new Date(startDate),
                        _d);
                }
                else if (endDate) {
                    whereCondition.createdAt = (_e = {},
                        _e[sequelize_1.Op.lte] = new Date(endDate),
                        _e);
                }
                includeCondition = [
                    {
                        model: Contact_1["default"],
                        as: "contact",
                        attributes: ["id", "name", "number", "email", "profilePicUrl"]
                    },
                    {
                        model: User_1["default"],
                        as: "user",
                        attributes: ["id", "name", "email"]
                    },
                    {
                        model: Queue_1["default"],
                        as: "queue",
                        attributes: ["id", "name", "color"]
                    },
                    {
                        model: Whatsapp_1["default"],
                        as: "whatsapp",
                        attributes: ["id", "name"]
                    },
                    {
                        model: Tag_1["default"],
                        as: "tags",
                        attributes: ["id", "name", "color"],
                        through: { attributes: [] }
                    }
                ];
                // Filtrar por nome/número do contato
                if (searchParam) {
                    includeCondition[0].where = (_f = {},
                        _f[sequelize_1.Op.or] = [
                            { name: (_g = {}, _g[sequelize_1.Op.iLike] = "%".concat(searchParam, "%"), _g) },
                            { number: (_h = {}, _h[sequelize_1.Op.iLike] = "%".concat(searchParam, "%"), _h) }
                        ],
                        _f);
                    includeCondition[0].required = true;
                }
                return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                        where: whereCondition,
                        include: includeCondition,
                        order: [["updatedAt", "DESC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 1:
                _b = _j.sent(), count = _b.count, tickets = _b.rows;
                hasMore = count > offset + tickets.length;
                return [2 /*return*/, res.json({
                        tickets: tickets.map(serializeTicket),
                        count: count,
                        hasMore: hasMore
                    })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId },
                        include: [
                            {
                                model: Contact_1["default"],
                                as: "contact",
                                attributes: ["id", "name", "number", "email", "profilePicUrl"]
                            },
                            {
                                model: User_1["default"],
                                as: "user",
                                attributes: ["id", "name", "email"]
                            },
                            {
                                model: Queue_1["default"],
                                as: "queue",
                                attributes: ["id", "name", "color"]
                            },
                            {
                                model: Whatsapp_1["default"],
                                as: "whatsapp",
                                attributes: ["id", "name"]
                            },
                            {
                                model: Tag_1["default"],
                                as: "tags",
                                attributes: ["id", "name", "color"],
                                through: { attributes: [] }
                            }
                        ]
                    })];
            case 1:
                ticket = _a.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json(serializeTicket(ticket))];
        }
    });
}); };
exports.show = show;
var messages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, pageNumber, limit, offset, ticket, _a, count, messagesList, hasMore;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                pageNumber = req.query.pageNumber;
                limit = 50;
                offset = pageNumber ? (Number(pageNumber) - 1) * limit : 0;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId }
                    })];
            case 1:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                return [4 /*yield*/, Message_1["default"].findAndCountAll({
                        where: { ticketId: ticket.id },
                        order: [["createdAt", "DESC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 2:
                _a = _b.sent(), count = _a.count, messagesList = _a.rows;
                hasMore = count > offset + messagesList.length;
                return [2 /*return*/, res.json({
                        messages: messagesList.map(function (m) { return ({
                            id: m.id,
                            body: m.body,
                            read: m.read,
                            mediaType: m.mediaType,
                            mediaUrl: m.mediaUrl,
                            fromMe: m.fromMe,
                            isDeleted: m.isDeleted,
                            createdAt: m.createdAt
                        }); }),
                        count: count,
                        hasMore: hasMore
                    })];
        }
    });
}); };
exports.messages = messages;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, status, userId, queueId, tagIds, ticket, updateData, validStatuses, user, queue, _i, tagIds_1, tagId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, status = _a.status, userId = _a.userId, queueId = _a.queueId, tagIds = _a.tagIds;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                updateData = {};
                if (status !== undefined) {
                    validStatuses = ["open", "pending", "closed"];
                    if (!validStatuses.includes(status)) {
                        throw new AppError_1["default"]("ERR_INVALID_STATUS", 400);
                    }
                    updateData.status = status;
                }
                if (!(userId !== undefined)) return [3 /*break*/, 4];
                if (!(userId === null)) return [3 /*break*/, 2];
                updateData.userId = null;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, User_1["default"].findOne({
                    where: { id: userId, companyId: externalAuth.companyId }
                })];
            case 3:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                updateData.userId = userId;
                _b.label = 4;
            case 4:
                if (!(queueId !== undefined)) return [3 /*break*/, 7];
                if (!(queueId === null)) return [3 /*break*/, 5];
                updateData.queueId = null;
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Queue_1["default"].findOne({
                    where: { id: queueId, companyId: externalAuth.companyId }
                })];
            case 6:
                queue = _b.sent();
                if (!queue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NOT_FOUND", 404);
                }
                updateData.queueId = queueId;
                _b.label = 7;
            case 7: return [4 /*yield*/, ticket.update(updateData)];
            case 8:
                _b.sent();
                if (!(tagIds !== undefined && Array.isArray(tagIds))) return [3 /*break*/, 13];
                return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: ticket.id } })];
            case 9:
                _b.sent();
                _i = 0, tagIds_1 = tagIds;
                _b.label = 10;
            case 10:
                if (!(_i < tagIds_1.length)) return [3 /*break*/, 13];
                tagId = tagIds_1[_i];
                return [4 /*yield*/, TicketTag_1["default"].create({
                        ticketId: ticket.id,
                        tagId: tagId
                    })];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 10];
            case 13: return [4 /*yield*/, ticket.reload({
                    include: [
                        { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "email", "profilePicUrl"] },
                        { model: User_1["default"], as: "user", attributes: ["id", "name", "email"] },
                        { model: Queue_1["default"], as: "queue", attributes: ["id", "name", "color"] },
                        { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "name"] },
                        { model: Tag_1["default"], as: "tags", attributes: ["id", "name", "color"], through: { attributes: [] } }
                    ]
                })];
            case 14:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "ticket.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            ticket: serializeTicket(ticket)
                        }
                    })];
            case 15:
                _b.sent();
                return [2 /*return*/, res.json(serializeTicket(ticket))];
        }
    });
}); };
exports.update = update;
var close = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                ticket = _a.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                return [4 /*yield*/, ticket.update({ status: "closed" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, ticket.reload({
                        include: [
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "email", "profilePicUrl"] },
                            { model: User_1["default"], as: "user", attributes: ["id", "name", "email"] },
                            { model: Queue_1["default"], as: "queue", attributes: ["id", "name", "color"] },
                            { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "name"] },
                            { model: Tag_1["default"], as: "tags", attributes: ["id", "name", "color"], through: { attributes: [] } }
                        ]
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "ticket.closed",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            ticket: serializeTicket(ticket)
                        }
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json(serializeTicket(ticket))];
        }
    });
}); };
exports.close = close;
var reopen = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                ticket = _a.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                return [4 /*yield*/, ticket.update({ status: "open" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, ticket.reload({
                        include: [
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "email", "profilePicUrl"] },
                            { model: User_1["default"], as: "user", attributes: ["id", "name", "email"] },
                            { model: Queue_1["default"], as: "queue", attributes: ["id", "name", "color"] },
                            { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "name"] },
                            { model: Tag_1["default"], as: "tags", attributes: ["id", "name", "color"], through: { attributes: [] } }
                        ]
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "ticket.reopened",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            ticket: serializeTicket(ticket)
                        }
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json(serializeTicket(ticket))];
        }
    });
}); };
exports.reopen = reopen;
var transfer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, userId, queueId, ticket, updateData, user, queue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, userId = _a.userId, queueId = _a.queueId;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                ticket = _b.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_TICKET_NOT_FOUND", 404);
                }
                updateData = { status: "pending" };
                if (!userId) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: userId, companyId: externalAuth.companyId }
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                updateData.userId = userId;
                updateData.status = "open";
                _b.label = 3;
            case 3:
                if (!queueId) return [3 /*break*/, 5];
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { id: queueId, companyId: externalAuth.companyId }
                    })];
            case 4:
                queue = _b.sent();
                if (!queue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NOT_FOUND", 404);
                }
                updateData.queueId = queueId;
                _b.label = 5;
            case 5: return [4 /*yield*/, ticket.update(updateData)];
            case 6:
                _b.sent();
                return [4 /*yield*/, ticket.reload({
                        include: [
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number", "email", "profilePicUrl"] },
                            { model: User_1["default"], as: "user", attributes: ["id", "name", "email"] },
                            { model: Queue_1["default"], as: "queue", attributes: ["id", "name", "color"] },
                            { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "name"] },
                            { model: Tag_1["default"], as: "tags", attributes: ["id", "name", "color"], through: { attributes: [] } }
                        ]
                    })];
            case 7:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "ticket.transferred",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            ticket: serializeTicket(ticket)
                        }
                    })];
            case 8:
                _b.sent();
                return [2 /*return*/, res.json(serializeTicket(ticket))];
        }
    });
}); };
exports.transfer = transfer;
