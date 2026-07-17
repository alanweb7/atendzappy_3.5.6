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
exports.toggleActive = exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var CreateAutomationService_1 = __importDefault(require("../services/AutomationServices/CreateAutomationService"));
var UpdateAutomationService_1 = __importDefault(require("../services/AutomationServices/UpdateAutomationService"));
var DeleteAutomationService_1 = __importDefault(require("../services/AutomationServices/DeleteAutomationService"));
var ListAutomationsService_1 = __importDefault(require("../services/AutomationServices/ListAutomationsService"));
var ShowAutomationService_1 = __importDefault(require("../services/AutomationServices/ShowAutomationService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, searchParam, triggerType, isActive, pageNumber, _b, automations, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, searchParam = _a.searchParam, triggerType = _a.triggerType, isActive = _a.isActive, pageNumber = _a.pageNumber;
                return [4 /*yield*/, (0, ListAutomationsService_1["default"])({
                        companyId: companyId,
                        searchParam: searchParam,
                        triggerType: triggerType,
                        isActive: isActive === "true" ? true : isActive === "false" ? false : undefined,
                        pageNumber: pageNumber
                    })];
            case 1:
                _b = _c.sent(), automations = _b.automations, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ automations: automations, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, automationId, automation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                automationId = req.params.automationId;
                return [4 /*yield*/, (0, ShowAutomationService_1["default"])({
                        id: Number(automationId),
                        companyId: companyId
                    })];
            case 1:
                automation = _a.sent();
                return [2 /*return*/, res.json(automation)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, name, description, triggerType, triggerConfig, isActive, actions, automation;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, name = _a.name, description = _a.description, triggerType = _a.triggerType, triggerConfig = _a.triggerConfig, isActive = _a.isActive, actions = _a.actions;
                return [4 /*yield*/, (0, CreateAutomationService_1["default"])({
                        companyId: companyId,
                        name: name,
                        description: description,
                        triggerType: triggerType,
                        triggerConfig: triggerConfig,
                        isActive: isActive,
                        actions: actions
                    })];
            case 1:
                automation = _b.sent();
                return [2 /*return*/, res.status(201).json(automation)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, automationId, _a, name, description, triggerType, triggerConfig, isActive, actions, automation;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                automationId = req.params.automationId;
                _a = req.body, name = _a.name, description = _a.description, triggerType = _a.triggerType, triggerConfig = _a.triggerConfig, isActive = _a.isActive, actions = _a.actions;
                return [4 /*yield*/, (0, UpdateAutomationService_1["default"])({
                        id: Number(automationId),
                        companyId: companyId,
                        name: name,
                        description: description,
                        triggerType: triggerType,
                        triggerConfig: triggerConfig,
                        isActive: isActive,
                        actions: actions
                    })];
            case 1:
                automation = _b.sent();
                return [2 /*return*/, res.json(automation)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, automationId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                automationId = req.params.automationId;
                return [4 /*yield*/, (0, DeleteAutomationService_1["default"])({
                        id: Number(automationId),
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Automação removida com sucesso" })];
        }
    });
}); };
exports.remove = remove;
var toggleActive = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, automationId, isActive, automation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                automationId = req.params.automationId;
                isActive = req.body.isActive;
                return [4 /*yield*/, (0, UpdateAutomationService_1["default"])({
                        id: Number(automationId),
                        companyId: companyId,
                        isActive: isActive
                    })];
            case 1:
                automation = _a.sent();
                return [2 /*return*/, res.json(automation)];
        }
    });
}); };
exports.toggleActive = toggleActive;
