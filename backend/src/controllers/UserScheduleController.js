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
exports.linkGoogleIntegration = exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var CreateUserScheduleService_1 = __importDefault(require("../services/UserScheduleServices/CreateUserScheduleService"));
var ListUserSchedulesService_1 = __importDefault(require("../services/UserScheduleServices/ListUserSchedulesService"));
var ShowUserScheduleService_1 = __importDefault(require("../services/UserScheduleServices/ShowUserScheduleService"));
var UpdateUserScheduleService_1 = __importDefault(require("../services/UserScheduleServices/UpdateUserScheduleService"));
var DeleteUserScheduleService_1 = __importDefault(require("../services/UserScheduleServices/DeleteUserScheduleService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, profile, userType, _b, searchParam, active, pageNumber, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id, profile = _a.profile;
                userType = req.user.userType || "";
                _b = req.query, searchParam = _b.searchParam, active = _b.active, pageNumber = _b.pageNumber;
                return [4 /*yield*/, (0, ListUserSchedulesService_1["default"])({
                        companyId: Number(companyId),
                        userId: Number(userId),
                        profile: profile,
                        userType: userType,
                        searchParam: searchParam,
                        active: active,
                        pageNumber: pageNumber
                    })];
            case 1:
                result = _c.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, ShowUserScheduleService_1["default"])(id, Number(companyId))];
            case 1:
                schedule = _a.sent();
                return [2 /*return*/, res.json(schedule)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, currentUserId, profile, userType, _b, name, description, active, userId, targetUserId, schedule;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, currentUserId = _a.id, profile = _a.profile;
                userType = req.user.userType || "";
                _b = req.body, name = _b.name, description = _b.description, active = _b.active, userId = _b.userId;
                targetUserId = userId;
                if (profile !== "admin" && userType !== "admin") {
                    targetUserId = Number(currentUserId);
                }
                return [4 /*yield*/, (0, CreateUserScheduleService_1["default"])({
                        name: name,
                        description: description,
                        active: active,
                        userId: targetUserId,
                        companyId: Number(companyId)
                    })];
            case 1:
                schedule = _c.sent();
                return [2 /*return*/, res.status(201).json(schedule)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a, name, description, active, schedule;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, active = _a.active;
                return [4 /*yield*/, (0, UpdateUserScheduleService_1["default"])({
                        id: id,
                        name: name,
                        description: description,
                        active: active,
                        companyId: Number(companyId)
                    })];
            case 1:
                schedule = _b.sent();
                return [2 /*return*/, res.json(schedule)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, DeleteUserScheduleService_1["default"])(id, Number(companyId))];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
var linkGoogleIntegration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, scheduleId, userGoogleCalendarIntegrationId, UserGoogleCalendarIntegration, UserSchedule, integration, schedule, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                scheduleId = req.params.id;
                userGoogleCalendarIntegrationId = req.body.userGoogleCalendarIntegrationId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                UserGoogleCalendarIntegration = require("../models/UserGoogleCalendarIntegration")["default"];
                UserSchedule = require("../models/UserSchedule")["default"];
                return [4 /*yield*/, UserGoogleCalendarIntegration.findOne({
                        where: {
                            id: userGoogleCalendarIntegrationId,
                            userId: userId
                        }
                    })];
            case 2:
                integration = _b.sent();
                if (!integration) {
                    return [2 /*return*/, res.status(404).json({ error: "Integração não encontrada ou não pertence ao usuário" })];
                }
                return [4 /*yield*/, UserSchedule.findOne({
                        where: { id: scheduleId, companyId: companyId }
                    })];
            case 3:
                schedule = _b.sent();
                if (!schedule) {
                    return [2 /*return*/, res.status(404).json({ error: "Agenda não encontrada" })];
                }
                // Vincular a integração à agenda
                return [4 /*yield*/, schedule.update({ userGoogleCalendarIntegrationId: userGoogleCalendarIntegrationId })];
            case 4:
                // Vincular a integração à agenda
                _b.sent();
                return [2 /*return*/, res.json({
                        message: "Agenda vinculada ao Google Calendar com sucesso",
                        schedule: schedule
                    })];
            case 5:
                error_1 = _b.sent();
                console.error("Erro ao vincular integração Google Calendar:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao vincular integração" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.linkGoogleIntegration = linkGoogleIntegration;
