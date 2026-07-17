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
exports.testSession = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var socket_1 = require("../libs/socket");
var CreateQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/CreateQueueIntegrationService"));
var DeleteQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/DeleteQueueIntegrationService"));
var ListQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/ListQueueIntegrationService"));
var ShowQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/ShowQueueIntegrationService"));
var TestSessionDialogflowService_1 = __importDefault(require("../services/QueueIntegrationServices/TestSessionDialogflowService"));
var UpdateQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/UpdateQueueIntegrationService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, companyId, _b, queueIntegrations, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListQueueIntegrationService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: companyId
                    })];
            case 1:
                _b = _c.sent(), queueIntegrations = _b.queueIntegrations, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.status(200).json({ queueIntegrations: queueIntegrations, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, name, projectName, jsonContent, language, urlN8N, typebotExpires, typebotKeywordFinish, typebotSlug, typebotUnknownMessage, typebotDelayMessage, typebotKeywordRestart, typebotRestartMessage, companyId, queueIntegration, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, type = _a.type, name = _a.name, projectName = _a.projectName, jsonContent = _a.jsonContent, language = _a.language, urlN8N = _a.urlN8N, typebotExpires = _a.typebotExpires, typebotKeywordFinish = _a.typebotKeywordFinish, typebotSlug = _a.typebotSlug, typebotUnknownMessage = _a.typebotUnknownMessage, typebotDelayMessage = _a.typebotDelayMessage, typebotKeywordRestart = _a.typebotKeywordRestart, typebotRestartMessage = _a.typebotRestartMessage;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateQueueIntegrationService_1["default"])({
                        type: type,
                        name: name,
                        projectName: projectName,
                        jsonContent: jsonContent,
                        language: language,
                        urlN8N: urlN8N,
                        companyId: companyId,
                        typebotExpires: typebotExpires,
                        typebotKeywordFinish: typebotKeywordFinish,
                        typebotSlug: typebotSlug,
                        typebotUnknownMessage: typebotUnknownMessage,
                        typebotDelayMessage: typebotDelayMessage,
                        typebotKeywordRestart: typebotKeywordRestart,
                        typebotRestartMessage: typebotRestartMessage
                    })];
            case 1:
                queueIntegration = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-queueIntegration"), {
                    action: "create",
                    queueIntegration: queueIntegration
                });
                return [2 /*return*/, res.status(200).json(queueIntegration)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var integrationId, companyId, queueIntegration;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                integrationId = req.params.integrationId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowQueueIntegrationService_1["default"])(integrationId, companyId)];
            case 1:
                queueIntegration = _a.sent();
                return [2 /*return*/, res.status(200).json(queueIntegration)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var integrationId, integrationData, companyId, queueIntegration, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                integrationId = req.params.integrationId;
                integrationData = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateQueueIntegrationService_1["default"])({ integrationData: integrationData, integrationId: integrationId, companyId: companyId })];
            case 1:
                queueIntegration = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-queueIntegration"), {
                    action: "update",
                    queueIntegration: queueIntegration
                });
                return [2 /*return*/, res.status(201).json(queueIntegration)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var integrationId, companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                integrationId = req.params.integrationId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteQueueIntegrationService_1["default"])(integrationId)];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-queueIntegration"), {
                    action: "delete",
                    integrationId: +integrationId
                });
                return [2 /*return*/, res.status(200).send()];
        }
    });
}); };
exports.remove = remove;
var testSession = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectName, jsonContent, language, companyId, response, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, projectName = _a.projectName, jsonContent = _a.jsonContent, language = _a.language;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, TestSessionDialogflowService_1["default"])({ projectName: projectName, jsonContent: jsonContent, language: language })];
            case 1:
                response = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-queueIntegration"), {
                    action: "testSession",
                    response: response
                });
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.testSession = testSession;
