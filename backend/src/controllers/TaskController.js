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
exports.remove = exports.update = exports.store = exports.byProject = exports.index = void 0;
var Task_1 = __importDefault(require("../models/Task"));
var User_1 = __importDefault(require("../models/User"));
var Contact_1 = __importDefault(require("../models/Contact"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var enrichWithUsers = function (tasks, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var allUserIds, users, _a, userMap;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                allUserIds = __spreadArray([], new Set(tasks.flatMap(function (t) { return t.assignedTo || []; })), true);
                if (!allUserIds.length) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1["default"].findAll({ where: { id: allUserIds, companyId: companyId }, attributes: ["id", "name"] })];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = [];
                _b.label = 3;
            case 3:
                users = _a;
                userMap = {};
                users.forEach(function (u) { userMap[u.id] = u; });
                return [2 /*return*/, tasks.map(function (t) { return (__assign(__assign({}, t.toJSON()), { assignedUsers: (t.assignedTo || []).map(function (id) { return userMap[id]; }).filter(Boolean) })); })];
        }
    });
}); };
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, userType, isRestricted, allTasks, filtered, enriched;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                userType = (req.user.userType || "").toLowerCase();
                isRestricted = !["administrador", "gerente", "manager", "administrator"].includes(userType);
                return [4 /*yield*/, Task_1["default"].findAll({
                        where: { companyId: companyId },
                        include: [
                            { model: User_1["default"], as: "creator", attributes: ["id", "name"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] },
                        ],
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                allTasks = _b.sent();
                filtered = isRestricted
                    ? allTasks.filter(function (t) { return (t.assignedTo || []).map(Number).includes(Number(userId)); })
                    : allTasks;
                return [4 /*yield*/, enrichWithUsers(filtered, Number(companyId))];
            case 2:
                enriched = _b.sent();
                return [2 /*return*/, res.json(enriched)];
        }
    });
}); };
exports.index = index;
var byProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, tasks, enriched;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                return [4 /*yield*/, Task_1["default"].findAll({
                        where: { companyId: companyId, projectId: Number(projectId) },
                        include: [
                            { model: User_1["default"], as: "creator", attributes: ["id", "name"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] },
                        ],
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                tasks = _a.sent();
                return [4 /*yield*/, enrichWithUsers(tasks, Number(companyId))];
            case 2:
                enriched = _a.sent();
                return [2 /*return*/, res.json(enriched)];
        }
    });
}); };
exports.byProject = byProject;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, _b, title, description, status, priority, dueDate, progress, assignedTo, contactId, projectId, task, full, enriched;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                _b = req.body, title = _b.title, description = _b.description, status = _b.status, priority = _b.priority, dueDate = _b.dueDate, progress = _b.progress, assignedTo = _b.assignedTo, contactId = _b.contactId, projectId = _b.projectId;
                if (!title)
                    throw new AppError_1["default"]("Título é obrigatório", 400);
                return [4 /*yield*/, Task_1["default"].create({
                        title: title,
                        description: description,
                        status: status || "todo",
                        priority: priority || "medium",
                        dueDate: dueDate || null,
                        progress: progress || 0,
                        assignedTo: Array.isArray(assignedTo) ? assignedTo.map(Number) : [],
                        contactId: contactId || null,
                        projectId: projectId || null,
                        companyId: companyId,
                        createdBy: userId
                    })];
            case 1:
                task = _c.sent();
                return [4 /*yield*/, Task_1["default"].findByPk(task.id, {
                        include: [
                            { model: User_1["default"], as: "creator", attributes: ["id", "name"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] },
                        ]
                    })];
            case 2:
                full = _c.sent();
                return [4 /*yield*/, enrichWithUsers([full], Number(companyId))];
            case 3:
                enriched = (_c.sent())[0];
                return [2 /*return*/, res.status(201).json(enriched)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, task, body, full, enriched;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, Task_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                task = _a.sent();
                if (!task)
                    throw new AppError_1["default"]("Tarefa não encontrada", 404);
                body = __assign({}, req.body);
                if (body.assignedTo !== undefined) {
                    body.assignedTo = Array.isArray(body.assignedTo) ? body.assignedTo.map(Number) : [];
                }
                return [4 /*yield*/, task.update(body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Task_1["default"].findByPk(task.id, {
                        include: [
                            { model: User_1["default"], as: "creator", attributes: ["id", "name"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] },
                        ]
                    })];
            case 3:
                full = _a.sent();
                return [4 /*yield*/, enrichWithUsers([full], Number(companyId))];
            case 4:
                enriched = (_a.sent())[0];
                return [2 /*return*/, res.json(enriched)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, Task_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                task = _a.sent();
                if (!task)
                    throw new AppError_1["default"]("Tarefa não encontrada", 404);
                return [4 /*yield*/, task.destroy()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Tarefa removida" })];
        }
    });
}); };
exports.remove = remove;
