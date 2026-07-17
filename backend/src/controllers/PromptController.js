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
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var socket_1 = require("../libs/socket");
var CreatePromptService_1 = __importDefault(require("../services/PromptServices/CreatePromptService"));
var DeletePromptService_1 = __importDefault(require("../services/PromptServices/DeletePromptService"));
var ListPromptsService_1 = __importDefault(require("../services/PromptServices/ListPromptsService"));
var ShowPromptService_1 = __importDefault(require("../services/PromptServices/ShowPromptService"));
var UpdatePromptService_1 = __importDefault(require("../services/PromptServices/UpdatePromptService"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNumber, searchParam, authHeader, _b, token, decoded, companyId, _c, prompts, count, hasMore;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, pageNumber = _a.pageNumber, searchParam = _a.searchParam;
                authHeader = req.headers.authorization;
                _b = authHeader.split(" "), token = _b[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                companyId = decoded.companyId;
                return [4 /*yield*/, (0, ListPromptsService_1["default"])({ searchParam: searchParam, pageNumber: pageNumber, companyId: companyId })];
            case 1:
                _c = _d.sent(), prompts = _c.prompts, count = _c.count, hasMore = _c.hasMore;
                return [2 /*return*/, res.status(200).json({ prompts: prompts, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, _a, token, decoded, companyId, _b, name, apiKey, prompt, maxTokens, temperature, promptTokens, completionTokens, totalTokens, queueId, maxMessages, voice, voiceKey, voiceRegion, provider, model, toolsEnabled, knowledgeBase, promptTable, io;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("[PromptController.store] Received request body:", JSON.stringify(req.body, null, 2));
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                companyId = decoded.companyId;
                _b = req.body, name = _b.name, apiKey = _b.apiKey, prompt = _b.prompt, maxTokens = _b.maxTokens, temperature = _b.temperature, promptTokens = _b.promptTokens, completionTokens = _b.completionTokens, totalTokens = _b.totalTokens, queueId = _b.queueId, maxMessages = _b.maxMessages, voice = _b.voice, voiceKey = _b.voiceKey, voiceRegion = _b.voiceRegion, provider = _b.provider, model = _b.model, toolsEnabled = _b.toolsEnabled, knowledgeBase = _b.knowledgeBase;
                console.log("[PromptController.store] toolsEnabled:", toolsEnabled);
                return [4 /*yield*/, (0, CreatePromptService_1["default"])({
                        name: name,
                        apiKey: apiKey,
                        prompt: prompt,
                        maxTokens: maxTokens,
                        temperature: temperature,
                        promptTokens: promptTokens,
                        completionTokens: completionTokens,
                        totalTokens: totalTokens,
                        queueId: queueId,
                        maxMessages: maxMessages,
                        companyId: companyId,
                        voice: voice,
                        voiceKey: voiceKey,
                        voiceRegion: voiceRegion,
                        provider: provider,
                        model: model,
                        toolsEnabled: toolsEnabled,
                        knowledgeBase: knowledgeBase
                    })];
            case 1:
                promptTable = _c.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-prompt"), {
                    action: "update",
                    prompt: promptTable
                });
                return [2 /*return*/, res.status(200).json(promptTable)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var promptId, authHeader, _a, token, decoded, companyId, prompt;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                promptId = req.params.promptId;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                companyId = decoded.companyId;
                return [4 /*yield*/, (0, ShowPromptService_1["default"])({ promptId: promptId, companyId: companyId })];
            case 1:
                prompt = _b.sent();
                return [2 /*return*/, res.status(200).json(prompt)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var promptId, promptData, authHeader, _a, token, decoded, companyId, prompt, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("[PromptController.update] Received request body:", JSON.stringify(req.body, null, 2));
                promptId = req.params.promptId;
                promptData = req.body;
                console.log("[PromptController.update] promptId:", promptId, "toolsEnabled:", promptData.toolsEnabled);
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                companyId = decoded.companyId;
                return [4 /*yield*/, (0, UpdatePromptService_1["default"])({ promptData: promptData, promptId: promptId, companyId: companyId })];
            case 1:
                prompt = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-prompt"), {
                    action: "update",
                    prompt: prompt
                });
                return [2 /*return*/, res.status(200).json(prompt)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var promptId, authHeader, _a, token, decoded, companyId, count, io, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                promptId = req.params.promptId;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                companyId = decoded.companyId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Whatsapp_1["default"].findAndCountAll({ where: { promptId: +promptId, companyId: companyId } })];
            case 2:
                count = (_b.sent()).count;
                if (count > 0)
                    return [2 /*return*/, res.status(200).json({ message: "Não foi possível excluir! Verifique se este prompt está sendo usado nas conexões Whatsapp!" })];
                return [4 /*yield*/, (0, DeletePromptService_1["default"])(promptId, companyId)];
            case 3:
                _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-prompt"), {
                    action: "delete",
                    intelligenceId: +promptId
                });
                return [2 /*return*/, res.status(200).json({ message: "Prompt deleted" })];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "Não foi possível excluir! Verifique se este prompt está sendo usado!" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
