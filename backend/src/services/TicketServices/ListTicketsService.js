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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var date_fns_1 = require("date-fns");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Message_1 = __importDefault(require("../../models/Message"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var User_1 = __importDefault(require("../../models/User"));
var ShowUserService_1 = __importDefault(require("../UserServices/ShowUserService"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var lodash_1 = require("lodash");
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var remove_accents_1 = __importDefault(require("remove-accents"));
var FindCompanySettingOneService_1 = __importDefault(require("../CompaniesSettings/FindCompanySettingOneService"));
var normalizeEnabled = function (value) {
    if (typeof value === "string") {
        var normalized = value.toLowerCase();
        return ["enabled", "enable", "true", "1"].includes(normalized);
    }
    return Boolean(value);
};
var ListTicketsService = function (_a) {
    var _b = _a.searchParam, searchParam = _b === void 0 ? "" : _b, _c = _a.pageNumber, pageNumber = _c === void 0 ? "1" : _c, pageSize = _a.pageSize, queueIds = _a.queueIds, tags = _a.tags, users = _a.users, status = _a.status, date = _a.date, dateStart = _a.dateStart, dateEnd = _a.dateEnd, updatedAt = _a.updatedAt, showAll = _a.showAll, userId = _a.userId, _d = _a.withUnreadMessages, withUnreadMessages = _d === void 0 ? "false" : _d, whatsappIds = _a.whatsappIds, statusFilters = _a.statusFilters, companyId = _a.companyId, _e = _a.sortTickets, sortTickets = _e === void 0 ? "DESC" : _e, _f = _a.searchOnMessages, searchOnMessages = _f === void 0 ? "false" : _f, pendingType = _a.pendingType;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, hasAllTicketPermission, hasAllUserChatPermission, hasAllQueuesPermission, showTicketAllQueues, showTicketWithoutQueue, showGroups, canSeeOtherUsersTickets, showPendingNotification, showNotificationPendingValue, userQueueIds, effectiveQueueIds, whereCondition, includeCondition, TicketsUserFilter, ticketsIds, ticketsIntersection, TicketsUserFilter, ticketsIds, ticketsIntersection, latestTickets, whereCondition2, whereCondition2, ticketIds, latestTickets, whereCondition2, ticketIds, sanitizedSearchParam, contactTagFilter, contactTags, contactsIntersection, contactTagFilter, contactTags, contactsIntersection, DEFAULT_TICKET_LIMIT, normalizedPage, sanitizedSearchParam_1, currentPage, limit, offset, allowedQueueIdsForPermission, permissionClause, _g, count, tickets, hasMore, safeTickets;
        var _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35;
        return __generator(this, function (_36) {
            switch (_36.label) {
                case 0: return [4 /*yield*/, (0, ShowUserService_1["default"])(userId, companyId)];
                case 1:
                    user = _36.sent();
                    hasAllTicketPermission = normalizeEnabled(user.allTicket);
                    hasAllUserChatPermission = normalizeEnabled(user.allUserChat);
                    hasAllQueuesPermission = normalizeEnabled(user.allHistoric);
                    showTicketAllQueues = hasAllQueuesPermission;
                    showTicketWithoutQueue = hasAllTicketPermission;
                    showGroups = Boolean(user.allowGroup);
                    canSeeOtherUsersTickets = hasAllUserChatPermission || hasAllTicketPermission;
                    return [4 /*yield*/, (0, FindCompanySettingOneService_1["default"])({ companyId: companyId, column: "showNotificationPending" })];
                case 2:
                    showPendingNotification = _36.sent();
                    showNotificationPendingValue = showPendingNotification[0].showNotificationPending;
                    userQueueIds = user.queues.map(function (queue) { return queue.id; });
                    effectiveQueueIds = queueIds && queueIds.length > 0 ? queueIds : userQueueIds;
                    whereCondition = (_h = {},
                        _h[sequelize_1.Op.or] = [{ userId: userId }, { status: "pending" }],
                        _h.queueId = showTicketWithoutQueue ? (_j = {}, _j[sequelize_1.Op.or] = [effectiveQueueIds, null], _j) : (_k = {}, _k[sequelize_1.Op.or] = [effectiveQueueIds], _k),
                        _h.companyId = companyId,
                        _h);
                    includeCondition = [
                        {
                            model: Contact_1["default"],
                            as: "contact",
                            attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
                            include: ["extraInfo", "tags"]
                        },
                        {
                            model: Queue_1["default"],
                            as: "queue",
                            attributes: ["id", "name", "color"]
                        },
                        {
                            model: User_1["default"],
                            as: "user",
                            attributes: ["id", "name"]
                        },
                        {
                            model: Tag_1["default"],
                            as: "tags",
                            attributes: ["id", "name", "color", "kanban"]
                        },
                        {
                            model: Whatsapp_1["default"],
                            as: "whatsapp",
                            attributes: ["id", "name", "expiresTicket", "groupAsTicket"]
                        },
                        {
                            model: Message_1["default"],
                            as: "messages",
                            attributes: ["fromMe"],
                            limit: 1,
                            order: [["createdAt", "DESC"]],
                            separate: true
                        }
                    ];
                    if (!(status === "open")) return [3 /*break*/, 3];
                    whereCondition = __assign(__assign({}, whereCondition), { userId: userId, queueId: (_l = {}, _l[sequelize_1.Op["in"]] = queueIds, _l), isGroup: false });
                    return [3 /*break*/, 14];
                case 3:
                    if (!(status === "group")) return [3 /*break*/, 4];
                    console.log("📍 Buscando TODOS OS GRUPOS da empresa");
                    console.log("📍 allowGroup do usuário:", showGroups);
                    // **VERIFICAÇÃO CRÍTICA**: Só retorna grupos se usuário tiver allowGroup
                    if (!showGroups) {
                        console.log("❌ Usuário não tem allowGroup, retornando lista vazia");
                        return [2 /*return*/, {
                                tickets: [],
                                count: 0,
                                hasMore: false
                            }];
                    }
                    // Busca TODOS os grupos da empresa, sem restrição de usuário ou fila
                    whereCondition = {
                        companyId: companyId,
                        isGroup: true,
                        status: (_m = {}, _m[sequelize_1.Op.notIn] = ["closed", "lgpd", "nps"], _m) // Apenas grupos ativos
                    };
                    console.log("🔍 WhereCondition para grupos:", JSON.stringify(whereCondition, null, 2));
                    return [3 /*break*/, 14];
                case 4:
                    if (!(user.profile === "user" && status === "pending" && showTicketWithoutQueue)) return [3 /*break*/, 9];
                    TicketsUserFilter = [];
                    ticketsIds = [];
                    if (!!showTicketAllQueues) return [3 /*break*/, 6];
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            where: {
                                userId: (_o = {}, _o[sequelize_1.Op.or] = [user.id, null], _o),
                                queueId: (_p = {}, _p[sequelize_1.Op.or] = [effectiveQueueIds, null], _p),
                                status: "pending",
                                companyId: companyId
                            }
                        })];
                case 5:
                    ticketsIds = _36.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: {
                            userId: (_q = {}, _q[sequelize_1.Op.or] = [user.id, null], _q),
                            status: "pending",
                            companyId: companyId
                        }
                    })];
                case 7:
                    ticketsIds = _36.sent();
                    _36.label = 8;
                case 8:
                    if (ticketsIds) {
                        TicketsUserFilter.push(ticketsIds.map(function (t) { return t.id; }));
                    }
                    ticketsIntersection = lodash_1.intersection.apply(void 0, TicketsUserFilter);
                    whereCondition = __assign(__assign({}, whereCondition), { id: ticketsIntersection });
                    return [3 /*break*/, 14];
                case 9:
                    if (!(user.profile === "user" && status === "pending" && !showTicketWithoutQueue)) return [3 /*break*/, 14];
                    TicketsUserFilter = [];
                    ticketsIds = [];
                    if (!!showTicketAllQueues) return [3 /*break*/, 11];
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            where: {
                                companyId: companyId,
                                userId: (_r = {}, _r[sequelize_1.Op.or] = [user.id, null], _r),
                                status: "pending",
                                queueId: (_s = {}, _s[sequelize_1.Op["in"]] = effectiveQueueIds, _s)
                            }
                        })];
                case 10:
                    ticketsIds = _36.sent();
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            userId: (_t = {}, _t[sequelize_1.Op.or] = [user.id, null], _t),
                            status: "pending"
                        }
                    })];
                case 12:
                    ticketsIds = _36.sent();
                    _36.label = 13;
                case 13:
                    if (ticketsIds) {
                        TicketsUserFilter.push(ticketsIds.map(function (t) { return t.id; }));
                    }
                    ticketsIntersection = lodash_1.intersection.apply(void 0, TicketsUserFilter);
                    whereCondition = __assign(__assign({}, whereCondition), { id: ticketsIntersection });
                    _36.label = 14;
                case 14:
                    if (showAll === "true" && canSeeOtherUsersTickets && status !== "search") {
                        if (user.allHistoric === "enabled" && showTicketWithoutQueue) {
                            whereCondition = { companyId: companyId };
                        }
                        else if (user.allHistoric === "enabled" && !showTicketWithoutQueue) {
                            whereCondition = { companyId: companyId, queueId: (_u = {}, _u[sequelize_1.Op.ne] = null, _u) };
                        }
                        else if (user.allHistoric === "disabled" && showTicketWithoutQueue) {
                            whereCondition = { companyId: companyId, queueId: (_v = {}, _v[sequelize_1.Op.or] = [queueIds, null], _v) };
                        }
                        else if (user.allHistoric === "disabled" && !showTicketWithoutQueue) {
                            whereCondition = { companyId: companyId, queueId: queueIds };
                        }
                    }
                    if (status && status !== "search") {
                        whereCondition = __assign(__assign({}, whereCondition), { status: showAll === "true" && status === "pending" ? (_w = {}, _w[sequelize_1.Op.or] = [status, "lgpd"], _w) : status });
                    }
                    // Aplicar filtro de whatsappIds ANTES de processar status específicos
                    if (Array.isArray(whatsappIds) && whatsappIds.length > 0) {
                        console.log("🔍 Aplicando filtro de whatsappIds GLOBAL:", whatsappIds);
                        whereCondition = __assign(__assign({}, whereCondition), { whatsappId: (_x = {}, _x[sequelize_1.Op["in"]] = whatsappIds, _x) });
                    }
                    if (!(status === "closed")) return [3 /*break*/, 19];
                    latestTickets = void 0;
                    if (!!showTicketAllQueues) return [3 /*break*/, 16];
                    whereCondition2 = {
                        companyId: companyId,
                        status: "closed"
                    };
                    if (showAll === "false" && !canSeeOtherUsersTickets) {
                        whereCondition2 = __assign(__assign({}, whereCondition2), { queueId: queueIds, userId: userId });
                    }
                    else {
                        whereCondition2 = __assign(__assign({}, whereCondition2), { queueId: showAll === "true" || showTicketWithoutQueue ? (_y = {}, _y[sequelize_1.Op.or] = [queueIds, null], _y) : queueIds });
                    }
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            attributes: ['companyId', 'contactId', 'whatsappId', [(0, sequelize_1.literal)('MAX("id")'), 'id']],
                            where: whereCondition2,
                            group: ['companyId', 'contactId', 'whatsappId']
                        })];
                case 15:
                    latestTickets = _36.sent();
                    return [3 /*break*/, 18];
                case 16:
                    whereCondition2 = {
                        companyId: companyId,
                        status: "closed"
                    };
                    if (showAll === "false" && !canSeeOtherUsersTickets) {
                        whereCondition2 = __assign(__assign({}, whereCondition2), { queueId: queueIds, userId: userId });
                    }
                    else {
                        whereCondition2 = __assign(__assign({}, whereCondition2), { queueId: showAll === "true" || showTicketWithoutQueue ? (_z = {}, _z[sequelize_1.Op.or] = [queueIds, null], _z) : queueIds });
                    }
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            attributes: ['companyId', 'contactId', 'whatsappId', [(0, sequelize_1.literal)('MAX("id")'), 'id']],
                            where: whereCondition2,
                            group: ['companyId', 'contactId', 'whatsappId']
                        })];
                case 17:
                    latestTickets = _36.sent();
                    _36.label = 18;
                case 18:
                    ticketIds = latestTickets.map(function (t) { return t.id; });
                    whereCondition = {
                        id: ticketIds
                    };
                    return [3 /*break*/, 27];
                case 19:
                    if (!(status === "search")) return [3 /*break*/, 26];
                    whereCondition = {
                        companyId: companyId
                    };
                    latestTickets = void 0;
                    if (!(!showTicketAllQueues && user.profile === "user")) return [3 /*break*/, 21];
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            attributes: ['companyId', 'contactId', 'whatsappId', [(0, sequelize_1.literal)('MAX("id")'), 'id']],
                            where: (_0 = {},
                                _0[sequelize_1.Op.or] = [{ userId: userId }, { status: ["pending", "closed", "group"] }],
                                _0.queueId = showAll === "true" || showTicketWithoutQueue ? (_1 = {}, _1[sequelize_1.Op.or] = [queueIds, null], _1) : queueIds,
                                _0.companyId = companyId,
                                _0),
                            group: ['companyId', 'contactId', 'whatsappId']
                        })];
                case 20:
                    latestTickets = _36.sent();
                    return [3 /*break*/, 23];
                case 21:
                    whereCondition2 = (_2 = {
                            companyId: companyId
                        },
                        _2[sequelize_1.Op.or] = [{ userId: userId }, { status: ["pending", "closed", "group"] }],
                        _2);
                    if (showAll === "false" && !canSeeOtherUsersTickets) {
                        whereCondition2 = __assign(__assign({}, whereCondition2), { queueId: queueIds });
                    }
                    else if (showAll === "true" && canSeeOtherUsersTickets) {
                        whereCondition2 = {
                            companyId: companyId,
                            queueId: (_3 = {}, _3[sequelize_1.Op.or] = [queueIds, null], _3)
                        };
                    }
                    return [4 /*yield*/, Ticket_1["default"].findAll({
                            attributes: ['companyId', 'contactId', 'whatsappId', [(0, sequelize_1.literal)('MAX("id")'), 'id']],
                            where: whereCondition2,
                            group: ['companyId', 'contactId', 'whatsappId']
                        })];
                case 22:
                    latestTickets = _36.sent();
                    _36.label = 23;
                case 23:
                    ticketIds = latestTickets.map(function (t) { return t.id; });
                    whereCondition = __assign(__assign({}, whereCondition), { id: ticketIds });
                    // if (date) {
                    //   whereCondition = {
                    //     createdAt: {
                    //       [Op.between]: [+startOfDay(parseISO(date)), +endOfDay(parseISO(date))]
                    //     }
                    //   };
                    // }
                    if (dateStart && dateEnd) {
                        whereCondition = __assign(__assign({}, whereCondition), { updatedAt: (_4 = {},
                                _4[sequelize_1.Op.between] = [+(0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(dateStart)), +(0, date_fns_1.endOfDay)((0, date_fns_1.parseISO)(dateEnd))],
                                _4) });
                    }
                    if (updatedAt) {
                        whereCondition = __assign(__assign({}, whereCondition), { updatedAt: (_5 = {},
                                _5[sequelize_1.Op.between] = [
                                    +(0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(updatedAt)),
                                    +(0, date_fns_1.endOfDay)((0, date_fns_1.parseISO)(updatedAt))
                                ],
                                _5) });
                    }
                    if (searchParam) {
                        sanitizedSearchParam = (0, remove_accents_1["default"])(searchParam.toLocaleLowerCase().trim());
                        if (searchOnMessages === "true") {
                            includeCondition = __spreadArray(__spreadArray([], includeCondition, true), [
                                {
                                    model: Message_1["default"],
                                    as: "messages",
                                    attributes: ["id", "body"],
                                    where: {
                                        body: (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)('unaccent', (0, sequelize_1.col)("body"))), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                                    },
                                    required: false,
                                    duplicating: false
                                }
                            ], false);
                            whereCondition = __assign(__assign({}, whereCondition), (_6 = {}, _6[sequelize_1.Op.or] = [
                                {
                                    "$contact.name$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("contact.name"))), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                                },
                                { "$contact.number$": (_7 = {}, _7[sequelize_1.Op.like] = "%".concat(sanitizedSearchParam, "%"), _7) },
                                {
                                    "$message.body$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("body"))), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                                }
                            ], _6));
                        }
                        else {
                            whereCondition = __assign(__assign({}, whereCondition), (_8 = {}, _8[sequelize_1.Op.or] = [
                                {
                                    "$contact.name$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("contact.name"))), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                                },
                                { "$contact.number$": (_9 = {}, _9[sequelize_1.Op.like] = "%".concat(sanitizedSearchParam, "%"), _9) },
                                // {
                                //   "$message.body$": where(
                                //     fn("LOWER", fn("unaccent", col("body"))),
                                //     "LIKE",
                                //     `%${sanitizedSearchParam}%`
                                //   )
                                // }
                            ], _8));
                        }
                    }
                    if (!(Array.isArray(tags) && tags.length > 0)) return [3 /*break*/, 25];
                    contactTagFilter = [];
                    return [4 /*yield*/, ContactTag_1["default"].findAll({
                            where: { tagId: tags }
                        })];
                case 24:
                    contactTags = _36.sent();
                    if (contactTags) {
                        contactTagFilter.push(contactTags.map(function (t) { return t.contactId; }));
                    }
                    contactsIntersection = lodash_1.intersection.apply(void 0, contactTagFilter);
                    whereCondition = __assign(__assign({}, whereCondition), { contactId: contactsIntersection });
                    _36.label = 25;
                case 25:
                    if (Array.isArray(users) && users.length > 0) {
                        whereCondition = __assign(__assign({}, whereCondition), { userId: users });
                    }
                    // Filtro de whatsappIds já aplicado globalmente acima
                    if (Array.isArray(statusFilters) && statusFilters.length > 0) {
                        whereCondition = __assign(__assign({}, whereCondition), { status: (_10 = {}, _10[sequelize_1.Op["in"]] = statusFilters, _10) });
                    }
                    return [3 /*break*/, 27];
                case 26:
                    if (withUnreadMessages === "true") {
                        // console.log(showNotificationPendingValue)
                        whereCondition = (_11 = {},
                            _11[sequelize_1.Op.or] = [
                                {
                                    userId: userId,
                                    status: showNotificationPendingValue ? (_12 = {}, _12[sequelize_1.Op.notIn] = ["closed", "lgpd", "nps"], _12) : (_13 = {}, _13[sequelize_1.Op.notIn] = ["pending", "closed", "lgpd", "nps", "group"], _13),
                                    queueId: (_14 = {}, _14[sequelize_1.Op["in"]] = userQueueIds, _14),
                                    unreadMessages: (_15 = {}, _15[sequelize_1.Op.gt] = 0, _15),
                                    companyId: companyId,
                                    isGroup: showGroups ? (_16 = {}, _16[sequelize_1.Op.or] = [true, false], _16) : false
                                },
                                {
                                    status: showNotificationPendingValue ? (_17 = {}, _17[sequelize_1.Op["in"]] = ["pending", "group"], _17) : (_18 = {}, _18[sequelize_1.Op["in"]] = ["group"], _18),
                                    queueId: showTicketWithoutQueue ? (_19 = {}, _19[sequelize_1.Op.or] = [userQueueIds, null], _19) : (_20 = {}, _20[sequelize_1.Op.or] = [userQueueIds], _20),
                                    unreadMessages: (_21 = {}, _21[sequelize_1.Op.gt] = 0, _21),
                                    companyId: companyId,
                                    isGroup: showGroups ? (_22 = {}, _22[sequelize_1.Op.or] = [true, false], _22) : false
                                }
                            ],
                            _11);
                        if (status === "group" && (user.allowGroup || showAll === "true")) {
                            whereCondition = __assign(__assign({}, whereCondition), { queueId: (_23 = {}, _23[sequelize_1.Op.or] = [userQueueIds, null], _23) });
                        }
                    }
                    _36.label = 27;
                case 27:
                    // Aplicar filtros de fila e usuário selecionados (se houver)
                    if (Array.isArray(queueIds) && queueIds.length > 0 && status !== "search") {
                        whereCondition = __assign(__assign({}, whereCondition), { queueId: queueIds });
                    }
                    if (Array.isArray(users) && users.length > 0 && status !== "search") {
                        whereCondition = __assign(__assign({}, whereCondition), { userId: users });
                    }
                    if (!(Array.isArray(tags) && tags.length > 0 && status !== "search")) return [3 /*break*/, 29];
                    contactTagFilter = [];
                    return [4 /*yield*/, ContactTag_1["default"].findAll({
                            where: { tagId: tags }
                        })];
                case 28:
                    contactTags = _36.sent();
                    if (contactTags) {
                        contactTagFilter.push(contactTags.map(function (t) { return t.contactId; }));
                    }
                    contactsIntersection = lodash_1.intersection.apply(void 0, contactTagFilter);
                    whereCondition = __assign(__assign({}, whereCondition), { contactId: contactsIntersection });
                    _36.label = 29;
                case 29:
                    if (Array.isArray(users) && users.length > 0) {
                        whereCondition = __assign(__assign({}, whereCondition), { userId: users });
                    }
                    DEFAULT_TICKET_LIMIT = Number(process.env.TICKET_PAGE_LIMIT) || 350;
                    normalizedPage = function (value) {
                        var page = Number(value);
                        if (!page || page < 1) {
                            return 1;
                        }
                        return page;
                    };
                    // Adicionar filtro de busca se existir
                    if (searchParam) {
                        sanitizedSearchParam_1 = (0, remove_accents_1["default"])(searchParam.toLocaleLowerCase().trim());
                        // Substituir o include 'messages' existente em vez de duplicar
                        includeCondition = includeCondition.map(function (inc) {
                            if (inc.as === "messages") {
                                return {
                                    model: Message_1["default"],
                                    as: "messages",
                                    attributes: ["id", "body"],
                                    where: {
                                        body: (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)('unaccent', (0, sequelize_1.col)("messages.body"))), "LIKE", "%".concat(sanitizedSearchParam_1, "%"))
                                    },
                                    required: false,
                                    duplicating: false
                                };
                            }
                            return inc;
                        });
                        whereCondition = __assign(__assign({}, whereCondition), (_24 = {}, _24[sequelize_1.Op.or] = [
                            {
                                "$contact.name$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("contact.name"))), "LIKE", "%".concat(sanitizedSearchParam_1, "%"))
                            },
                            { "$contact.number$": (_25 = {}, _25[sequelize_1.Op.like] = "%".concat(sanitizedSearchParam_1, "%"), _25) },
                            {
                                "$messages.body$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("messages.body"))), "LIKE", "%".concat(sanitizedSearchParam_1, "%"))
                            }
                        ], _24));
                    }
                    // Filtros de status
                    if (Array.isArray(statusFilters) && statusFilters.length > 0) {
                        whereCondition = __assign(__assign({}, whereCondition), { status: (_26 = {}, _26[sequelize_1.Op["in"]] = statusFilters, _26) });
                    }
                    // Filtro de subtipo de pending: automação (sem user/fila) ou aguardando (com user ou fila)
                    if (pendingType === "automation") {
                        whereCondition = __assign(__assign({}, whereCondition), { userId: null, queueId: null });
                    }
                    else if (pendingType === "assigned") {
                        whereCondition = __assign(__assign({}, whereCondition), (_27 = {}, _27[sequelize_1.Op.or] = [
                            { userId: (_28 = {}, _28[sequelize_1.Op.ne] = null, _28) },
                            { queueId: (_29 = {}, _29[sequelize_1.Op.ne] = null, _29) },
                        ], _27));
                    }
                    // Filtro de período por data de CRIAÇÃO do ticket (quando a conversa iniciou)
                    if (dateStart && dateEnd) {
                        whereCondition = __assign(__assign({}, whereCondition), { createdAt: (_30 = {},
                                _30[sequelize_1.Op.between] = [+(0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(dateStart)), +(0, date_fns_1.endOfDay)((0, date_fns_1.parseISO)(dateEnd))],
                                _30) });
                    }
                    else if (updatedAt) {
                        whereCondition = __assign(__assign({}, whereCondition), { updatedAt: (_31 = {},
                                _31[sequelize_1.Op.between] = [+(0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(updatedAt)), +(0, date_fns_1.endOfDay)((0, date_fns_1.parseISO)(updatedAt))],
                                _31) });
                    }
                    currentPage = normalizedPage(pageNumber);
                    limit = pageSize ? Number(pageSize) : DEFAULT_TICKET_LIMIT;
                    offset = limit * (currentPage - 1);
                    allowedQueueIdsForPermission = __spreadArray([], userQueueIds, true);
                    if (showTicketWithoutQueue) {
                        allowedQueueIdsForPermission.push(null);
                    }
                    if (!canSeeOtherUsersTickets) {
                        permissionClause = (_32 = {},
                            _32[sequelize_1.Op.or] = [
                                { userId: user.id },
                                (_33 = {},
                                    _33[sequelize_1.Op.and] = [
                                        { userId: null },
                                        { status: "pending" },
                                        allowedQueueIdsForPermission.length > 0
                                            ? { queueId: (_34 = {}, _34[sequelize_1.Op.or] = allowedQueueIdsForPermission, _34) }
                                            : {}
                                    ],
                                    _33)
                            ],
                            _32);
                        whereCondition = (_35 = {},
                            _35[sequelize_1.Op.and] = [
                                whereCondition,
                                permissionClause
                            ],
                            _35);
                    }
                    return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                            where: whereCondition,
                            include: includeCondition,
                            attributes: [
                                "id",
                                "status",
                                "contactId",
                                "userId",
                                "queueId",
                                "createdAt",
                                "updatedAt",
                                "lastMessage",
                                "unreadMessages",
                                "isGroup",
                                "fromMe",
                                "channel",
                                "useIntegration",
                                "integrationId",
                                "crmClientId"
                            ],
                            distinct: true,
                            limit: limit,
                            offset: offset,
                            order: [["updatedAt", sortTickets]],
                            subQuery: false
                        })];
                case 30:
                    _g = _36.sent(), count = _g.count, tickets = _g.rows;
                    hasMore = count > offset + tickets.length;
                    safeTickets = tickets.map(function (ticket) {
                        var ticketJSON = ticket.toJSON();
                        // Se user for null, criar objeto placeholder
                        if (!ticketJSON.user) {
                            ticketJSON.user = { id: null, name: "Sem usuário" };
                        }
                        // Se queue for null, criar objeto placeholder
                        if (!ticketJSON.queue) {
                            ticketJSON.queue = { id: null, name: "Sem fila", color: "#999" };
                        }
                        // Se contact for null, criar objeto placeholder
                        if (!ticketJSON.contact) {
                            ticketJSON.contact = {
                                id: null,
                                name: "Contato removido",
                                number: "",
                                profilePicUrl: null,
                                email: null
                            };
                        }
                        // Garantir que tags seja sempre um array
                        if (!ticketJSON.tags || !Array.isArray(ticketJSON.tags)) {
                            ticketJSON.tags = [];
                        }
                        else {
                            // Filtrar tags nulas ou inválidas e garantir campos necessários
                            ticketJSON.tags = ticketJSON.tags
                                .filter(function (tag) { return tag && tag.name; })
                                .map(function (tag) { return ({
                                id: tag.id || null,
                                name: tag.name || "Tag sem nome",
                                color: tag.color || "#999999",
                                kanban: tag.kanban || 0
                            }); });
                        }
                        // Garantir que whatsapp não seja null
                        if (!ticketJSON.whatsapp) {
                            ticketJSON.whatsapp = {
                                id: null,
                                name: "WhatsApp desconectado",
                                expiresTicket: null,
                                groupAsTicket: null
                            };
                        }
                        // Adicionar campo lastMessageFromMe baseado na última mensagem
                        if (ticketJSON.messages && ticketJSON.messages.length > 0) {
                            ticketJSON.lastMessageFromMe = ticketJSON.messages[0].fromMe;
                            delete ticketJSON.messages; // Remove messages do retorno para não sobrecarregar
                        }
                        else {
                            ticketJSON.lastMessageFromMe = null;
                        }
                        return ticketJSON;
                    });
                    return [2 /*return*/, {
                            tickets: safeTickets,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListTicketsService;
