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
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var User_1 = __importDefault(require("../../models/User"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, pageNumber, limit, offset, _a, count, queues, hasMore;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                pageNumber = req.query.pageNumber;
                limit = 50;
                offset = pageNumber ? (Number(pageNumber) - 1) * limit : 0;
                return [4 /*yield*/, Queue_1["default"].findAndCountAll({
                        where: { companyId: companyId },
                        attributes: ["id", "name", "color", "greetingMessage", "outOfHoursMessage", "schedules", "orderQueue", "createdAt", "updatedAt"],
                        order: [["orderQueue", "ASC"], ["name", "ASC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 1:
                _a = _b.sent(), count = _a.count, queues = _a.rows;
                hasMore = count > offset + queues.length;
                return [2 /*return*/, res.json({ queues: queues, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, queue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId },
                        attributes: ["id", "name", "color", "greetingMessage", "outOfHoursMessage", "schedules", "orderQueue", "createdAt", "updatedAt"],
                        include: [
                            {
                                model: User_1["default"],
                                as: "users",
                                attributes: ["id", "name", "email"],
                                through: { attributes: [] }
                            }
                        ]
                    })];
            case 1:
                queue = _a.sent();
                if (!queue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json(queue)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, name, color, greetingMessage, outOfHoursMessage, schedules, orderQueue, existingQueue, existingColor, queue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.body, name = _a.name, color = _a.color, greetingMessage = _a.greetingMessage, outOfHoursMessage = _a.outOfHoursMessage, schedules = _a.schedules, orderQueue = _a.orderQueue;
                if (!name || !color) {
                    throw new AppError_1["default"]("ERR_QUEUE_NAME_COLOR_REQUIRED", 400);
                }
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { name: name, companyId: externalAuth.companyId }
                    })];
            case 1:
                existingQueue = _b.sent();
                if (existingQueue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NAME_ALREADY_EXISTS", 400);
                }
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { color: color, companyId: externalAuth.companyId }
                    })];
            case 2:
                existingColor = _b.sent();
                if (existingColor) {
                    throw new AppError_1["default"]("ERR_QUEUE_COLOR_ALREADY_EXISTS", 400);
                }
                return [4 /*yield*/, Queue_1["default"].create({
                        name: name,
                        color: color,
                        greetingMessage: greetingMessage || "",
                        outOfHoursMessage: outOfHoursMessage || "",
                        schedules: schedules || [],
                        orderQueue: orderQueue || 0,
                        companyId: externalAuth.companyId,
                        ativarRoteador: false,
                        tempoRoteador: 0
                    })];
            case 3:
                queue = _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "queue.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            queue: queue
                        }
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(201).json(queue)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, name, color, greetingMessage, outOfHoursMessage, schedules, orderQueue, queue, existingQueue, existingColor;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, name = _a.name, color = _a.color, greetingMessage = _a.greetingMessage, outOfHoursMessage = _a.outOfHoursMessage, schedules = _a.schedules, orderQueue = _a.orderQueue;
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                queue = _b.sent();
                if (!queue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NOT_FOUND", 404);
                }
                if (!(name && name !== queue.name)) return [3 /*break*/, 3];
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { name: name, companyId: externalAuth.companyId }
                    })];
            case 2:
                existingQueue = _b.sent();
                if (existingQueue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NAME_ALREADY_EXISTS", 400);
                }
                _b.label = 3;
            case 3:
                if (!(color && color !== queue.color)) return [3 /*break*/, 5];
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { color: color, companyId: externalAuth.companyId }
                    })];
            case 4:
                existingColor = _b.sent();
                if (existingColor) {
                    throw new AppError_1["default"]("ERR_QUEUE_COLOR_ALREADY_EXISTS", 400);
                }
                _b.label = 5;
            case 5: return [4 /*yield*/, queue.update({
                    name: name !== undefined ? name : queue.name,
                    color: color !== undefined ? color : queue.color,
                    greetingMessage: greetingMessage !== undefined ? greetingMessage : queue.greetingMessage,
                    outOfHoursMessage: outOfHoursMessage !== undefined ? outOfHoursMessage : queue.outOfHoursMessage,
                    schedules: schedules !== undefined ? schedules : queue.schedules,
                    orderQueue: orderQueue !== undefined ? orderQueue : queue.orderQueue
                })];
            case 6:
                _b.sent();
                return [4 /*yield*/, queue.reload()];
            case 7:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "queue.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            queue: queue
                        }
                    })];
            case 8:
                _b.sent();
                return [2 /*return*/, res.json(queue)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, queue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                queue = _a.sent();
                if (!queue) {
                    throw new AppError_1["default"]("ERR_QUEUE_NOT_FOUND", 404);
                }
                return [4 /*yield*/, queue.destroy()];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "queue.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            queueId: Number(id)
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
