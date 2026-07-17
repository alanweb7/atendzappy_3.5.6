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
var ListService_1 = __importDefault(require("../../services/TagServices/ListService"));
var ShowService_1 = __importDefault(require("../../services/TagServices/ShowService"));
var CreateService_1 = __importDefault(require("../../services/TagServices/CreateService"));
var UpdateService_1 = __importDefault(require("../../services/TagServices/UpdateService"));
var DeleteService_1 = __importDefault(require("../../services/TagServices/DeleteService"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, searchParam, pageNumber, limit, kanban, tagId, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber, limit = _a.limit, kanban = _a.kanban, tagId = _a.tagId;
                return [4 /*yield*/, (0, ListService_1["default"])({
                        companyId: companyId,
                        searchParam: searchParam,
                        pageNumber: pageNumber ? Number(pageNumber) : undefined,
                        limit: limit ? Number(limit) : undefined,
                        kanban: kanban ? Number(kanban) : undefined,
                        tagId: tagId ? Number(tagId) : undefined
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, ShowService_1["default"])(id, companyId)];
            case 1:
                tag = _a.sent();
                return [2 /*return*/, res.json(tag)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, name, color, kanban, timeLane, nextLaneId, greetingMessageLane, rollbackLaneId, tag;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.body, name = _a.name, color = _a.color, kanban = _a.kanban, timeLane = _a.timeLane, nextLaneId = _a.nextLaneId, greetingMessageLane = _a.greetingMessageLane, rollbackLaneId = _a.rollbackLaneId;
                return [4 /*yield*/, (0, CreateService_1["default"])({
                        name: name,
                        color: color,
                        kanban: kanban,
                        companyId: externalAuth.companyId,
                        timeLane: timeLane,
                        nextLaneId: nextLaneId,
                        greetingMessageLane: greetingMessageLane,
                        rollbackLaneId: rollbackLaneId
                    })];
            case 1:
                tag = _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "tag.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            tag: tag
                        }
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).json(tag)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, tagData, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                tagData = req.body;
                return [4 /*yield*/, (0, UpdateService_1["default"])({
                        tagData: tagData,
                        id: id,
                        companyId: externalAuth.companyId
                    })];
            case 1:
                tag = _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "tag.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            tag: tag
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json(tag)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, (0, ShowService_1["default"])(id, externalAuth.companyId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, DeleteService_1["default"])({ id: id, companyId: externalAuth.companyId })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "tag.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            tagId: Number(id)
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
