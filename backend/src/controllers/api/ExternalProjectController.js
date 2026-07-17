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
var Project_1 = __importDefault(require("../../models/Project"));
var ProjectUser_1 = __importDefault(require("../../models/ProjectUser"));
var ProjectTask_1 = __importDefault(require("../../models/ProjectTask"));
var User_1 = __importDefault(require("../../models/User"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, pageNumber, searchParam, status, clientId, limit, offset, whereCondition, _b, count, projects, hasMore;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                _a = req.query, pageNumber = _a.pageNumber, searchParam = _a.searchParam, status = _a.status, clientId = _a.clientId;
                limit = 50;
                offset = pageNumber ? (Number(pageNumber) - 1) * limit : 0;
                whereCondition = { companyId: companyId };
                if (searchParam) {
                    whereCondition.name = (_c = {},
                        _c[require("sequelize").Op.iLike] = "%".concat(searchParam, "%"),
                        _c);
                }
                if (status) {
                    whereCondition.status = status;
                }
                if (clientId) {
                    whereCondition.clientId = Number(clientId);
                }
                return [4 /*yield*/, Project_1["default"].findAndCountAll({
                        where: whereCondition,
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email"]
                            },
                            {
                                model: ProjectUser_1["default"],
                                as: "users",
                                include: [{
                                        model: User_1["default"],
                                        attributes: ["id", "name", "email"]
                                    }]
                            }
                        ],
                        order: [["createdAt", "DESC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 1:
                _b = _d.sent(), count = _b.count, projects = _b.rows;
                hasMore = count > offset + projects.length;
                return [2 /*return*/, res.json({ projects: projects, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, Project_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId },
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phoneNumber"]
                            },
                            {
                                model: ProjectUser_1["default"],
                                as: "users",
                                include: [{
                                        model: User_1["default"],
                                        attributes: ["id", "name", "email"]
                                    }]
                            },
                            {
                                model: ProjectTask_1["default"],
                                as: "tasks",
                                include: [{
                                        model: User_1["default"],
                                        as: "assignedUsers",
                                        attributes: ["id", "name", "email"],
                                        through: { attributes: [] }
                                    }]
                            }
                        ]
                    })];
            case 1:
                project = _a.sent();
                if (!project) {
                    throw new AppError_1["default"]("ERR_PROJECT_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json(project)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, name, description, clientId, status, startDate, endDate, deliveryTime, warranty, terms, userIds, project, _i, userIds_1, userId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.body, name = _a.name, description = _a.description, clientId = _a.clientId, status = _a.status, startDate = _a.startDate, endDate = _a.endDate, deliveryTime = _a.deliveryTime, warranty = _a.warranty, terms = _a.terms, userIds = _a.userIds;
                if (!name) {
                    throw new AppError_1["default"]("ERR_PROJECT_NAME_REQUIRED", 400);
                }
                return [4 /*yield*/, Project_1["default"].create({
                        name: name,
                        description: description || null,
                        clientId: clientId || null,
                        status: status || "draft",
                        startDate: startDate || null,
                        endDate: endDate || null,
                        deliveryTime: deliveryTime || null,
                        warranty: warranty || null,
                        terms: terms || null,
                        companyId: externalAuth.companyId
                    })];
            case 1:
                project = _b.sent();
                if (!(userIds && Array.isArray(userIds))) return [3 /*break*/, 5];
                _i = 0, userIds_1 = userIds;
                _b.label = 2;
            case 2:
                if (!(_i < userIds_1.length)) return [3 /*break*/, 5];
                userId = userIds_1[_i];
                return [4 /*yield*/, ProjectUser_1["default"].create({
                        projectId: project.id,
                        userId: userId,
                        companyId: externalAuth.companyId
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, project.reload({
                    include: [
                        { model: CrmClient_1["default"], as: "client", attributes: ["id", "name", "email"] },
                        { model: ProjectUser_1["default"], as: "users", include: [{ model: User_1["default"], attributes: ["id", "name", "email"] }] }
                    ]
                })];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "project.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            project: project
                        }
                    })];
            case 7:
                _b.sent();
                return [2 /*return*/, res.status(201).json(project)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, name, description, clientId, status, startDate, endDate, deliveryTime, warranty, terms, userIds, project, _i, userIds_2, userId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, clientId = _a.clientId, status = _a.status, startDate = _a.startDate, endDate = _a.endDate, deliveryTime = _a.deliveryTime, warranty = _a.warranty, terms = _a.terms, userIds = _a.userIds;
                return [4 /*yield*/, Project_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                project = _b.sent();
                if (!project) {
                    throw new AppError_1["default"]("ERR_PROJECT_NOT_FOUND", 404);
                }
                return [4 /*yield*/, project.update({
                        name: name !== undefined ? name : project.name,
                        description: description !== undefined ? description : project.description,
                        clientId: clientId !== undefined ? clientId : project.clientId,
                        status: status !== undefined ? status : project.status,
                        startDate: startDate !== undefined ? startDate : project.startDate,
                        endDate: endDate !== undefined ? endDate : project.endDate,
                        deliveryTime: deliveryTime !== undefined ? deliveryTime : project.deliveryTime,
                        warranty: warranty !== undefined ? warranty : project.warranty,
                        terms: terms !== undefined ? terms : project.terms
                    })];
            case 2:
                _b.sent();
                if (!(userIds !== undefined && Array.isArray(userIds))) return [3 /*break*/, 7];
                return [4 /*yield*/, ProjectUser_1["default"].destroy({ where: { projectId: project.id } })];
            case 3:
                _b.sent();
                _i = 0, userIds_2 = userIds;
                _b.label = 4;
            case 4:
                if (!(_i < userIds_2.length)) return [3 /*break*/, 7];
                userId = userIds_2[_i];
                return [4 /*yield*/, ProjectUser_1["default"].create({
                        projectId: project.id,
                        userId: userId,
                        companyId: externalAuth.companyId
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, project.reload({
                    include: [
                        { model: CrmClient_1["default"], as: "client", attributes: ["id", "name", "email"] },
                        { model: ProjectUser_1["default"], as: "users", include: [{ model: User_1["default"], attributes: ["id", "name", "email"] }] }
                    ]
                })];
            case 8:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "project.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            project: project
                        }
                    })];
            case 9:
                _b.sent();
                return [2 /*return*/, res.json(project)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Project_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                project = _a.sent();
                if (!project) {
                    throw new AppError_1["default"]("ERR_PROJECT_NOT_FOUND", 404);
                }
                // Remover usuários e tarefas relacionadas
                return [4 /*yield*/, ProjectUser_1["default"].destroy({ where: { projectId: project.id } })];
            case 2:
                // Remover usuários e tarefas relacionadas
                _a.sent();
                return [4 /*yield*/, ProjectTask_1["default"].destroy({ where: { projectId: project.id } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, project.destroy()];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "project.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            projectId: Number(id)
                        }
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
