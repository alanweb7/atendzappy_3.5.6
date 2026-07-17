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
exports.DashTicketsQueues = exports.reportsDay = exports.reportsUsers = exports.charts = exports.index = void 0;
var sequelize_1 = require("sequelize");
var DashbardDataService_1 = __importDefault(require("../services/ReportService/DashbardDataService"));
var TicketsAttendance_1 = require("../services/ReportService/TicketsAttendance");
var TicketsDayService_1 = require("../services/ReportService/TicketsDayService");
var TicketsQueuesService_1 = __importDefault(require("../services/TicketServices/TicketsQueuesService"));
var Tag_1 = __importDefault(require("../models/Tag"));
var TicketTag_1 = __importDefault(require("../models/TicketTag"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, companyId, daysInterval, dashboardData, totalTags, kanbanTags, kanbanSummary, tagsSummary, tagsWithContacts, tagsContactsSummary, now, date7d, date15d, date30d, contactsByTag7d, contactsByTag15d, contactsByTag30d, trendMap_1, tagsContactsTrend, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                params = req.query;
                companyId = req.user.companyId;
                daysInterval = 3;
                return [4 /*yield*/, (0, DashbardDataService_1["default"])(companyId, params)];
            case 1:
                dashboardData = _d.sent();
                _d.label = 2;
            case 2:
                _d.trys.push([2, 9, , 10]);
                return [4 /*yield*/, Tag_1["default"].count({ where: { companyId: companyId } })];
            case 3:
                totalTags = _d.sent();
                return [4 /*yield*/, Tag_1["default"].findAll({
                        where: { companyId: companyId, kanban: 1 },
                        include: [
                            {
                                model: TicketTag_1["default"],
                                as: "ticketTags",
                                attributes: []
                            }
                        ],
                        attributes: [
                            "id",
                            "name",
                            "color",
                            [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("ticketTags.ticketId")), "ticketsCount"]
                        ],
                        group: ["Tag.id"],
                        order: [["id", "ASC"]]
                    })];
            case 4:
                kanbanTags = _d.sent();
                kanbanSummary = kanbanTags.map(function (tag) { return ({
                    id: tag.id,
                    name: tag.name,
                    color: tag.color,
                    ticketsCount: Number(tag.get("ticketsCount") || 0)
                }); });
                tagsSummary = {
                    totalTags: totalTags,
                    totalKanbanTags: kanbanSummary.length
                };
                return [4 /*yield*/, Tag_1["default"].findAll({
                        where: { companyId: companyId },
                        include: [
                            {
                                model: ContactTag_1["default"],
                                as: "contactTags",
                                attributes: []
                            }
                        ],
                        attributes: [
                            "id",
                            "name",
                            "color",
                            "kanban",
                            [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("contactTags.contactId")), "contactsCount"]
                        ],
                        group: ["Tag.id"],
                        order: [["name", "ASC"]]
                    })];
            case 5:
                tagsWithContacts = _d.sent();
                tagsContactsSummary = tagsWithContacts.map(function (tag) { return ({
                    id: tag.id,
                    name: tag.name,
                    color: tag.color,
                    kanban: tag.kanban,
                    contactsCount: Number(tag.get("contactsCount") || 0)
                }); });
                now = new Date();
                date7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                date15d = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
                date30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return [4 /*yield*/, ContactTag_1["default"].findAll({
                        include: [
                            {
                                model: Tag_1["default"],
                                as: "tags",
                                where: { companyId: companyId },
                                attributes: []
                            }
                        ],
                        attributes: [["tagId", "tagId"], [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("contactId")), "count7d"]],
                        where: {
                            createdAt: (_a = {}, _a[sequelize_1.Op.gte] = date7d, _a)
                        },
                        group: ["ContactTag.tagId"]
                    })];
            case 6:
                contactsByTag7d = _d.sent();
                return [4 /*yield*/, ContactTag_1["default"].findAll({
                        include: [
                            {
                                model: Tag_1["default"],
                                as: "tags",
                                where: { companyId: companyId },
                                attributes: []
                            }
                        ],
                        attributes: [["tagId", "tagId"], [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("contactId")), "count15d"]],
                        where: {
                            createdAt: (_b = {}, _b[sequelize_1.Op.gte] = date15d, _b)
                        },
                        group: ["ContactTag.tagId"]
                    })];
            case 7:
                contactsByTag15d = _d.sent();
                return [4 /*yield*/, ContactTag_1["default"].findAll({
                        include: [
                            {
                                model: Tag_1["default"],
                                as: "tags",
                                where: { companyId: companyId },
                                attributes: []
                            }
                        ],
                        attributes: [["tagId", "tagId"], [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("contactId")), "count30d"]],
                        where: {
                            createdAt: (_c = {}, _c[sequelize_1.Op.gte] = date30d, _c)
                        },
                        group: ["ContactTag.tagId"]
                    })];
            case 8:
                contactsByTag30d = _d.sent();
                trendMap_1 = {};
                contactsByTag7d.forEach(function (row) {
                    var tagId = row.get("tagId");
                    if (!trendMap_1[tagId])
                        trendMap_1[tagId] = { contacts7d: 0, contacts15d: 0, contacts30d: 0 };
                    trendMap_1[tagId].contacts7d = Number(row.get("count7d") || 0);
                });
                contactsByTag15d.forEach(function (row) {
                    var tagId = row.get("tagId");
                    if (!trendMap_1[tagId])
                        trendMap_1[tagId] = { contacts7d: 0, contacts15d: 0, contacts30d: 0 };
                    trendMap_1[tagId].contacts15d = Number(row.get("count15d") || 0);
                });
                contactsByTag30d.forEach(function (row) {
                    var tagId = row.get("tagId");
                    if (!trendMap_1[tagId])
                        trendMap_1[tagId] = { contacts7d: 0, contacts15d: 0, contacts30d: 0 };
                    trendMap_1[tagId].contacts30d = Number(row.get("count30d") || 0);
                });
                tagsContactsTrend = tagsContactsSummary.map(function (tag) {
                    var _a, _b, _c;
                    return (__assign(__assign({}, tag), { contacts7d: ((_a = trendMap_1[tag.id]) === null || _a === void 0 ? void 0 : _a.contacts7d) || 0, contacts15d: ((_b = trendMap_1[tag.id]) === null || _b === void 0 ? void 0 : _b.contacts15d) || 0, contacts30d: ((_c = trendMap_1[tag.id]) === null || _c === void 0 ? void 0 : _c.contacts30d) || 0 }));
                });
                return [2 /*return*/, res.status(200).json(__assign(__assign({}, dashboardData), { tagsSummary: tagsSummary, kanbanSummary: kanbanSummary, tagsContactsSummary: tagsContactsSummary, tagsContactsTrend: tagsContactsTrend }))];
            case 9:
                err_1 = _d.sent();
                // Em caso de erro nas métricas adicionais, ainda retornamos o dashboard básico
                console.error("Erro ao carregar métricas de tags/kanban para o dashboard:", err_1);
                return [2 /*return*/, res.status(200).json(dashboardData)];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
// Mapeamento DDD → Estado brasileiro
var dddToState = {
    "11": "SP", "12": "SP", "13": "SP", "14": "SP", "15": "SP", "16": "SP", "17": "SP", "18": "SP", "19": "SP",
    "21": "RJ", "22": "RJ", "24": "RJ",
    "27": "ES", "28": "ES",
    "31": "MG", "32": "MG", "33": "MG", "34": "MG", "35": "MG", "37": "MG", "38": "MG",
    "41": "PR", "42": "PR", "43": "PR", "44": "PR", "45": "PR", "46": "PR",
    "47": "SC", "48": "SC", "49": "SC",
    "51": "RS", "53": "RS", "54": "RS", "55": "RS",
    "61": "DF",
    "62": "GO", "64": "GO",
    "63": "TO",
    "65": "MT", "66": "MT",
    "67": "MS",
    "68": "AC",
    "69": "RO",
    "71": "BA", "73": "BA", "74": "BA", "75": "BA", "77": "BA",
    "79": "SE",
    "81": "PE", "87": "PE",
    "82": "AL",
    "83": "PB",
    "84": "RN",
    "85": "CE", "88": "CE",
    "86": "PI", "89": "PI",
    "91": "PA", "93": "PA", "94": "PA",
    "92": "AM", "97": "AM",
    "95": "RR",
    "96": "AP",
    "98": "MA", "99": "MA"
};
var charts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Contact, now, twelveMonthsAgo, contactsByMonth, monthsData, monthNames, _loop_1, i, totalContacts, startOfMonth, newContactsThisMonth, startOfPrevMonth, endOfPrevMonth, newContactsPrevMonth, tagsWithContacts, tagsSummary, allContacts, stateCount_1, contactsByState, err_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../models/Contact")); })];
            case 2:
                Contact = (_d.sent())["default"];
                now = new Date();
                twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
                return [4 /*yield*/, Contact.findAll({
                        where: {
                            companyId: companyId,
                            createdAt: (_a = {}, _a[sequelize_1.Op.gte] = twelveMonthsAgo, _a)
                        },
                        attributes: [
                            [(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("createdAt")), "month"],
                            [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("id")), "count"]
                        ],
                        group: [(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("createdAt"))],
                        order: [[(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("createdAt")), "ASC"]],
                        raw: true
                    })];
            case 3:
                contactsByMonth = _d.sent();
                monthsData = [];
                monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
                _loop_1 = function (i) {
                    var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    var key = "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"));
                    var found = contactsByMonth.find(function (r) {
                        var rDate = new Date(r.month);
                        return rDate.getFullYear() === d.getFullYear() && rDate.getMonth() === d.getMonth();
                    });
                    monthsData.push({
                        month: key,
                        label: monthNames[d.getMonth()],
                        count: found ? Number(found.count) : 0
                    });
                };
                for (i = 11; i >= 0; i--) {
                    _loop_1(i);
                }
                return [4 /*yield*/, Contact.count({ where: { companyId: companyId } })];
            case 4:
                totalContacts = _d.sent();
                startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                return [4 /*yield*/, Contact.count({
                        where: { companyId: companyId, createdAt: (_b = {}, _b[sequelize_1.Op.gte] = startOfMonth, _b) }
                    })];
            case 5:
                newContactsThisMonth = _d.sent();
                startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
                return [4 /*yield*/, Contact.count({
                        where: {
                            companyId: companyId,
                            createdAt: (_c = {},
                                _c[sequelize_1.Op.gte] = startOfPrevMonth,
                                _c[sequelize_1.Op.lte] = endOfPrevMonth,
                                _c)
                        }
                    })];
            case 6:
                newContactsPrevMonth = _d.sent();
                return [4 /*yield*/, Tag_1["default"].findAll({
                        where: { companyId: companyId },
                        include: [{ model: ContactTag_1["default"], as: "contactTags", attributes: [] }],
                        attributes: [
                            "id", "name", "color",
                            [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("contactTags.contactId")), "contactsCount"]
                        ],
                        group: ["Tag.id"],
                        order: [[(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("contactTags.contactId")), "DESC"]],
                        limit: 5,
                        subQuery: false
                    })];
            case 7:
                tagsWithContacts = _d.sent();
                tagsSummary = tagsWithContacts.map(function (tag) { return ({
                    id: tag.id,
                    name: tag.name,
                    color: tag.color || "#3b82f6",
                    count: Number(tag.get("contactsCount") || 0)
                }); });
                return [4 /*yield*/, Contact.findAll({
                        where: { companyId: companyId, isGroup: false },
                        attributes: ["number"],
                        raw: true
                    })];
            case 8:
                allContacts = _d.sent();
                stateCount_1 = {};
                allContacts.forEach(function (c) {
                    if (!c.number)
                        return;
                    // Número brasileiro: 55 + DDD + número
                    var num = c.number.replace(/\D/g, "");
                    if (num.startsWith("55") && num.length >= 12) {
                        var ddd = num.substring(2, 4);
                        var state = dddToState[ddd];
                        if (state) {
                            stateCount_1[state] = (stateCount_1[state] || 0) + 1;
                        }
                    }
                });
                contactsByState = Object.entries(stateCount_1)
                    .map(function (_a) {
                    var state = _a[0], count = _a[1];
                    return ({ state: state, count: count });
                })
                    .sort(function (a, b) { return b.count - a.count; });
                return [2 /*return*/, res.json({
                        contactsByMonth: monthsData,
                        totalContacts: totalContacts,
                        newContactsThisMonth: newContactsThisMonth,
                        newContactsPrevMonth: newContactsPrevMonth,
                        tagsSummary: tagsSummary,
                        contactsByState: contactsByState
                    })];
            case 9:
                err_2 = _d.sent();
                console.error("Erro ao carregar dados dos gráficos:", err_2);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao carregar dados dos gráficos" })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.charts = charts;
var reportsUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, initialDate, finalDate, companyId, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, initialDate = _a.initialDate, finalDate = _a.finalDate, companyId = _a.companyId;
                return [4 /*yield*/, (0, TicketsAttendance_1.TicketsAttendance)({ initialDate: initialDate, finalDate: finalDate, companyId: companyId })];
            case 1:
                data = (_b.sent()).data;
                return [2 /*return*/, res.json({ data: data })];
        }
    });
}); };
exports.reportsUsers = reportsUsers;
var reportsDay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, initialDate, finalDate, companyId, _b, count, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, initialDate = _a.initialDate, finalDate = _a.finalDate, companyId = _a.companyId;
                return [4 /*yield*/, (0, TicketsDayService_1.TicketsDayService)({ initialDate: initialDate, finalDate: finalDate, companyId: companyId })];
            case 1:
                _b = _c.sent(), count = _b.count, data = _b.data;
                return [2 /*return*/, res.json({ count: count, data: data })];
        }
    });
}); };
exports.reportsDay = reportsDay;
var DashTicketsQueues = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, profile, userId, _b, dateStart, dateEnd, status, queuesIds, showAll, tickets;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, profile = _a.profile, userId = _a.id;
                _b = req.query, dateStart = _b.dateStart, dateEnd = _b.dateEnd, status = _b.status, queuesIds = _b.queuesIds, showAll = _b.showAll;
                return [4 /*yield*/, (0, TicketsQueuesService_1["default"])({
                        showAll: profile === "admin" ? showAll : false,
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        status: status,
                        queuesIds: queuesIds,
                        userId: userId,
                        companyId: companyId,
                        profile: profile
                    })];
            case 1:
                tickets = _c.sent();
                return [2 /*return*/, res.status(200).json(tickets)];
        }
    });
}); };
exports.DashTicketsQueues = DashTicketsQueues;
