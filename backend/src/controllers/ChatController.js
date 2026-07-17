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
exports.messages = exports.checkAsRead = exports.saveMessage = exports.remove = exports.show = exports.update = exports.store = exports.index = void 0;
var socket_1 = require("../libs/socket");
var CreateService_1 = __importDefault(require("../services/ChatService/CreateService"));
var ListService_1 = __importDefault(require("../services/ChatService/ListService"));
var ShowFromUuidService_1 = __importDefault(require("../services/ChatService/ShowFromUuidService"));
var DeleteService_1 = __importDefault(require("../services/ChatService/DeleteService"));
var FindMessages_1 = __importDefault(require("../services/ChatService/FindMessages"));
var UpdateService_1 = __importDefault(require("../services/ChatService/UpdateService"));
var Chat_1 = __importDefault(require("../models/Chat"));
var CreateMessageService_1 = __importDefault(require("../services/ChatService/CreateMessageService"));
var User_1 = __importDefault(require("../models/User"));
var ChatUser_1 = __importDefault(require("../models/ChatUser"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, ownerId, _a, records, count, hasMore;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pageNumber = req.query.pageNumber;
                ownerId = +req.user.id;
                return [4 /*yield*/, (0, ListService_1["default"])({
                        ownerId: ownerId,
                        pageNumber: pageNumber
                    })];
            case 1:
                _a = _b.sent(), records = _a.records, count = _a.count, hasMore = _a.hasMore;
                return [2 /*return*/, res.json({ records: records, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, ownerId, data, record, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                ownerId = +req.user.id;
                data = req.body;
                return [4 /*yield*/, (0, CreateService_1["default"])(__assign(__assign({}, data), { ownerId: ownerId, companyId: companyId }))];
            case 1:
                record = _a.sent();
                io = (0, socket_1.getIO)();
                record.users.forEach(function (user) {
                    console.log(user.id);
                    io.of(String(companyId)).emit("company-".concat(companyId, "-chat-user-").concat(user.id), {
                        action: "create",
                        record: record
                    });
                });
                return [2 /*return*/, res.status(200).json(record)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, data, id, record, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                data = req.body;
                id = req.params.id;
                return [4 /*yield*/, (0, UpdateService_1["default"])(__assign(__assign({}, data), { id: +id }))];
            case 1:
                record = _a.sent();
                io = (0, socket_1.getIO)();
                record.users.forEach(function (user) {
                    io.of(String(companyId)).emit("company-".concat(companyId, "-chat-user-").concat(user.id), {
                        action: "update",
                        record: record,
                        userId: user.userId
                    });
                });
                return [2 /*return*/, res.status(200).json(record)];
        }
    });
}); };
exports.update = update;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, ShowFromUuidService_1["default"])(id)];
            case 1:
                record = _a.sent();
                return [2 /*return*/, res.status(200).json(record)];
        }
    });
}); };
exports.show = show;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteService_1["default"])(id)];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-chat"), {
                    action: "delete",
                    id: id
                });
                return [2 /*return*/, res.status(200).json({ message: "Chat deleted" })];
        }
    });
}); };
exports.remove = remove;
var saveMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, message, id, senderId, chatId, medias, newMessage, chat, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                message = req.body.message;
                id = req.params.id;
                senderId = +req.user.id;
                chatId = +id;
                medias = req.files;
                return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                        chatId: chatId,
                        senderId: senderId,
                        message: message,
                        medias: medias
                    })];
            case 1:
                newMessage = _a.sent();
                return [4 /*yield*/, Chat_1["default"].findByPk(chatId, {
                        include: [
                            { model: User_1["default"], as: "owner" },
                            { model: ChatUser_1["default"], as: "users" }
                        ]
                    })];
            case 2:
                chat = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-chat-").concat(chatId), {
                    action: "new-message",
                    newMessage: newMessage,
                    chat: chat
                });
                io.of(String(companyId)).emit("company-".concat(companyId, "-chat"), {
                    action: "new-message",
                    newMessage: newMessage,
                    chat: chat
                });
                return [2 /*return*/, res.json(newMessage)];
        }
    });
}); };
exports.saveMessage = saveMessage;
var checkAsRead = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, userId, id, chatUser, chat, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                userId = req.body.userId;
                id = req.params.id;
                return [4 /*yield*/, ChatUser_1["default"].findOne({ where: { chatId: id, userId: userId } })];
            case 1:
                chatUser = _a.sent();
                return [4 /*yield*/, chatUser.update({ unreads: 0 })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Chat_1["default"].findByPk(id, {
                        include: [
                            { model: User_1["default"], as: "owner" },
                            { model: ChatUser_1["default"], as: "users" }
                        ]
                    })];
            case 3:
                chat = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-chat-").concat(id), {
                    action: "update",
                    chat: chat
                });
                io.of(String(companyId)).emit("company-".concat(companyId, "-chat"), {
                    action: "update",
                    chat: chat
                });
                return [2 /*return*/, res.json(chat)];
        }
    });
}); };
exports.checkAsRead = checkAsRead;
var messages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, chatId, ownerId, _a, records, count, hasMore;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pageNumber = req.query.pageNumber;
                chatId = req.params.id;
                ownerId = +req.user.id;
                return [4 /*yield*/, (0, FindMessages_1["default"])({
                        chatId: chatId,
                        ownerId: ownerId,
                        pageNumber: pageNumber
                    })];
            case 1:
                _a = _b.sent(), records = _a.records, count = _a.count, hasMore = _a.hasMore;
                return [2 /*return*/, res.json({ records: records, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.messages = messages;
