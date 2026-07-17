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
exports.removeContactTag = exports.syncTagsWithTicket = exports.syncTags = exports.kanban = exports.list = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var socket_1 = require("../libs/socket");
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateService_1 = __importDefault(require("../services/TagServices/CreateService"));
var ListService_1 = __importDefault(require("../services/TagServices/ListService"));
var UpdateService_1 = __importDefault(require("../services/TagServices/UpdateService"));
var ShowService_1 = __importDefault(require("../services/TagServices/ShowService"));
var DeleteService_1 = __importDefault(require("../services/TagServices/DeleteService"));
var SimpleListService_1 = __importDefault(require("../services/TagServices/SimpleListService"));
var SyncTagsService_1 = __importDefault(require("../services/TagServices/SyncTagsService"));
var KanbanListService_1 = __importDefault(require("../services/TagServices/KanbanListService"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var Negocio_1 = __importDefault(require("../models/Negocio"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNumber, searchParam, kanban, tagId, companyId, _b, tags, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, pageNumber = _a.pageNumber, searchParam = _a.searchParam, kanban = _a.kanban, tagId = _a.tagId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: companyId,
                        kanban: kanban,
                        tagId: tagId
                    })];
            case 1:
                _b = _c.sent(), tags = _b.tags, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ tags: tags, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, color, kanban, timeLane, nextLaneId, greetingMessageLane, rollbackLaneId, autoActions, companyId, tag, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, color = _a.color, kanban = _a.kanban, timeLane = _a.timeLane, nextLaneId = _a.nextLaneId, greetingMessageLane = _a.greetingMessageLane, rollbackLaneId = _a.rollbackLaneId, autoActions = _a.autoActions;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateService_1["default"])({
                        name: name,
                        color: color,
                        kanban: kanban,
                        companyId: companyId,
                        timeLane: timeLane,
                        nextLaneId: nextLaneId,
                        greetingMessageLane: greetingMessageLane,
                        rollbackLaneId: rollbackLaneId,
                        autoActions: autoActions
                    })];
            case 1:
                tag = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-tag"), {
                    action: "create",
                    tag: tag
                });
                return [2 /*return*/, res.status(200).json(tag)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tagId, companyId, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tagId = req.params.tagId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowService_1["default"])(tagId, companyId)];
            case 1:
                tag = _a.sent();
                return [2 /*return*/, res.status(200).json(tag)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var kanban, tagId, tagData, companyId, tag, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                kanban = req.body.kanban;
                //console.log(kanban)
                if (req.user.profile !== "admin" && kanban === 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                tagId = req.params.tagId;
                tagData = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateService_1["default"])({ tagData: tagData, id: tagId, companyId: companyId })];
            case 1:
                tag = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-tag"), {
                    action: "update",
                    tag: tag
                });
                return [2 /*return*/, res.status(200).json(tag)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tagId, companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tagId = req.params.tagId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteService_1["default"])({ id: tagId, companyId: companyId })];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-tag"), {
                    action: "delete",
                    tagId: tagId
                });
                return [2 /*return*/, res.status(200).json({ message: "Tag deleted" })];
        }
    });
}); };
exports.remove = remove;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, kanban, companyId, tags;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, kanban = _a.kanban;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, SimpleListService_1["default"])({ searchParam: searchParam, kanban: kanban, companyId: companyId })];
            case 1:
                tags = _b.sent();
                return [2 /*return*/, res.json(tags)];
        }
    });
}); };
exports.list = list;
var kanban = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, negocioId, tags, negocio, allowedIds, filtered;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                negocioId = req.query.negocioId;
                return [4 /*yield*/, (0, KanbanListService_1["default"])({ companyId: companyId })];
            case 1:
                tags = _a.sent();
                if (!negocioId) {
                    return [2 /*return*/, res.json({ lista: tags })];
                }
                return [4 /*yield*/, Negocio_1["default"].findOne({
                        where: { id: negocioId, companyId: companyId }
                    })];
            case 2:
                negocio = _a.sent();
                if (!negocio || !negocio.kanbanBoards) {
                    return [2 /*return*/, res.json({ lista: [] })];
                }
                allowedIds = Array.isArray(negocio.kanbanBoards)
                    ? negocio.kanbanBoards
                    : [];
                filtered = tags.filter(function (tag) { return allowedIds.includes(tag.id); });
                return [2 /*return*/, res.json({ lista: filtered })];
        }
    });
}); };
exports.kanban = kanban;
var syncTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, companyId, tags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, SyncTagsService_1["default"])(__assign(__assign({}, data), { companyId: companyId }))];
            case 1:
                tags = _a.sent();
                return [2 /*return*/, res.json(tags)];
        }
    });
}); };
exports.syncTags = syncTags;
var syncTagsWithTicket = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, data, companyId, contact, Ticket, Tag, Contact, ticket, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketId = req.params.ticketId;
                data = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, SyncTagsService_1["default"])(__assign(__assign({}, data), { companyId: companyId, ticketId: ticketId }))];
            case 1:
                contact = _a.sent();
                Ticket = require("../models/Ticket")["default"];
                Tag = require("../models/Tag")["default"];
                Contact = require("../models/Contact")["default"];
                return [4 /*yield*/, Ticket.findByPk(ticketId, {
                        include: [
                            {
                                model: Contact,
                                as: "contact",
                                attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
                                include: ["extraInfo", "tags"]
                            },
                            { model: Tag, as: "tags", attributes: ["id", "name", "color"] }
                        ]
                    })];
            case 2:
                ticket = _a.sent();
                if (ticket) {
                    io = (0, socket_1.getIO)();
                    io.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                }
                return [2 /*return*/, res.json(contact)];
        }
    });
}); };
exports.syncTagsWithTicket = syncTagsWithTicket;
var removeContactTag = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tagId, contactId, companyId, tag, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, tagId = _a.tagId, contactId = _a.contactId;
                companyId = req.user.companyId;
                console.log(tagId, contactId);
                return [4 /*yield*/, ContactTag_1["default"].destroy({
                        where: {
                            tagId: tagId,
                            contactId: contactId
                        }
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, ShowService_1["default"])(tagId)];
            case 2:
                tag = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-tag"), {
                    action: "update",
                    tag: tag
                });
                return [2 /*return*/, res.status(200).json({ message: "Tag deleted" })];
        }
    });
}); };
exports.removeContactTag = removeContactTag;
