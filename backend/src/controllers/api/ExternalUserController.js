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
exports.updateAppointmentStatus = exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.listAppointments = exports.updateSchedule = exports.createSchedule = exports.getSchedule = exports.setServices = exports.removeServices = exports.addServices = exports.listServices = exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var User_1 = __importDefault(require("../../models/User"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var UserQueue_1 = __importDefault(require("../../models/UserQueue"));
var Servico_1 = __importDefault(require("../../models/Servico"));
var UserService_1 = __importDefault(require("../../models/UserService"));
var UserSchedule_1 = __importDefault(require("../../models/UserSchedule"));
var Appointment_1 = __importDefault(require("../../models/Appointment"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var sequelize_1 = require("sequelize");
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var serializeUser = function (user, includeServices) {
    var _a;
    if (includeServices === void 0) { includeServices = false; }
    var result = {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        profileImage: user.profileImage,
        whatsappId: user.whatsappId,
        online: user.online,
        startWork: user.startWork,
        endWork: user.endWork,
        userType: user.userType,
        workDays: user.workDays,
        lunchStart: user.lunchStart,
        lunchEnd: user.lunchEnd,
        color: user.color,
        allTicket: user.allTicket,
        allowGroup: user.allowGroup,
        farewellMessage: user.farewellMessage,
        allHistoric: user.allHistoric,
        allUserChat: user.allUserChat,
        userClosePendingTicket: user.userClosePendingTicket,
        showDashboard: user.showDashboard,
        allowRealTime: user.allowRealTime,
        allowConnections: user.allowConnections,
        queues: (_a = user.queues) === null || _a === void 0 ? void 0 : _a.map(function (q) { return ({ id: q.id, name: q.name, color: q.color }); }),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    if (includeServices && user.services) {
        result.services = user.services.map(function (s) { return ({
            id: s.id,
            nome: s.nome,
            descricao: s.descricao,
            valorOriginal: s.valorOriginal,
            tempoAtendimento: s.tempoAtendimento,
            imagem: s.imagem
        }); });
    }
    return result;
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, pageNumber, searchParam, profile, limit, offset, whereCondition, Op_1, _b, count, users, hasMore;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                _a = req.query, pageNumber = _a.pageNumber, searchParam = _a.searchParam, profile = _a.profile;
                limit = 50;
                offset = pageNumber ? (Number(pageNumber) - 1) * limit : 0;
                whereCondition = { companyId: companyId };
                if (searchParam) {
                    Op_1 = require("sequelize").Op;
                    whereCondition[Op_1.or] = [
                        { name: (_c = {}, _c[Op_1.iLike] = "%".concat(searchParam, "%"), _c) },
                        { email: (_d = {}, _d[Op_1.iLike] = "%".concat(searchParam, "%"), _d) }
                    ];
                }
                if (profile) {
                    whereCondition.profile = profile;
                }
                return [4 /*yield*/, User_1["default"].findAndCountAll({
                        where: whereCondition,
                        include: [
                            {
                                model: Queue_1["default"],
                                as: "queues",
                                attributes: ["id", "name", "color"],
                                through: { attributes: [] }
                            }
                        ],
                        attributes: { exclude: ["passwordHash", "tokenVersion"] },
                        order: [["name", "ASC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 1:
                _b = _e.sent(), count = _b.count, users = _b.rows;
                hasMore = count > offset + users.length;
                return [2 /*return*/, res.json({
                        users: users.map(function (user) { return serializeUser(user); }),
                        count: count,
                        hasMore: hasMore
                    })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId },
                        include: [
                            {
                                model: Queue_1["default"],
                                as: "queues",
                                attributes: ["id", "name", "color"],
                                through: { attributes: [] }
                            }
                        ],
                        attributes: { exclude: ["passwordHash", "tokenVersion"] }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json(serializeUser(user))];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, name, email, password, profile, whatsappId, startWork, endWork, userType, workDays, lunchStart, lunchEnd, color, allTicket, allowGroup, farewellMessage, allHistoric, allUserChat, userClosePendingTicket, showDashboard, allowRealTime, allowConnections, queueIds, existingUser, user, _i, queueIds_1, queueId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, profile = _a.profile, whatsappId = _a.whatsappId, startWork = _a.startWork, endWork = _a.endWork, userType = _a.userType, workDays = _a.workDays, lunchStart = _a.lunchStart, lunchEnd = _a.lunchEnd, color = _a.color, allTicket = _a.allTicket, allowGroup = _a.allowGroup, farewellMessage = _a.farewellMessage, allHistoric = _a.allHistoric, allUserChat = _a.allUserChat, userClosePendingTicket = _a.userClosePendingTicket, showDashboard = _a.showDashboard, allowRealTime = _a.allowRealTime, allowConnections = _a.allowConnections, queueIds = _a.queueIds;
                if (!name) {
                    throw new AppError_1["default"]("ERR_USER_NAME_REQUIRED", 400);
                }
                if (!email) {
                    throw new AppError_1["default"]("ERR_USER_EMAIL_REQUIRED", 400);
                }
                if (!password) {
                    throw new AppError_1["default"]("ERR_USER_PASSWORD_REQUIRED", 400);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { email: email, companyId: externalAuth.companyId }
                    })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    throw new AppError_1["default"]("ERR_USER_EMAIL_ALREADY_EXISTS", 400);
                }
                return [4 /*yield*/, User_1["default"].create({
                        name: name,
                        email: email,
                        password: password,
                        profile: profile || "user",
                        whatsappId: whatsappId || null,
                        startWork: startWork || "00:00",
                        endWork: endWork || "23:59",
                        userType: userType || "attendant",
                        workDays: workDays || "1,2,3,4,5",
                        lunchStart: lunchStart || null,
                        lunchEnd: lunchEnd || null,
                        color: color || "",
                        allTicket: allTicket || "disable",
                        allowGroup: allowGroup || false,
                        farewellMessage: farewellMessage || "",
                        allHistoric: allHistoric || "disabled",
                        allUserChat: allUserChat || "disabled",
                        userClosePendingTicket: userClosePendingTicket || "enabled",
                        showDashboard: showDashboard || "disabled",
                        allowRealTime: allowRealTime || "disable",
                        allowConnections: allowConnections || "disable",
                        companyId: externalAuth.companyId
                    })];
            case 2:
                user = _b.sent();
                if (!(queueIds && Array.isArray(queueIds))) return [3 /*break*/, 6];
                _i = 0, queueIds_1 = queueIds;
                _b.label = 3;
            case 3:
                if (!(_i < queueIds_1.length)) return [3 /*break*/, 6];
                queueId = queueIds_1[_i];
                return [4 /*yield*/, UserQueue_1["default"].create({
                        userId: user.id,
                        queueId: queueId
                    })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, user.reload({
                    include: [
                        { model: Queue_1["default"], as: "queues", attributes: ["id", "name", "color"], through: { attributes: [] } }
                    ],
                    attributes: { exclude: ["passwordHash", "tokenVersion"] }
                })];
            case 7:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            user: serializeUser(user)
                        }
                    })];
            case 8:
                _b.sent();
                return [2 /*return*/, res.status(201).json(serializeUser(user))];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, name, email, password, profile, whatsappId, startWork, endWork, userType, workDays, lunchStart, lunchEnd, color, allTicket, allowGroup, farewellMessage, allHistoric, allUserChat, userClosePendingTicket, showDashboard, allowRealTime, allowConnections, queueIds, user, existingUser, updateData, _i, queueIds_2, queueId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, profile = _a.profile, whatsappId = _a.whatsappId, startWork = _a.startWork, endWork = _a.endWork, userType = _a.userType, workDays = _a.workDays, lunchStart = _a.lunchStart, lunchEnd = _a.lunchEnd, color = _a.color, allTicket = _a.allTicket, allowGroup = _a.allowGroup, farewellMessage = _a.farewellMessage, allHistoric = _a.allHistoric, allUserChat = _a.allUserChat, userClosePendingTicket = _a.userClosePendingTicket, showDashboard = _a.showDashboard, allowRealTime = _a.allowRealTime, allowConnections = _a.allowConnections, queueIds = _a.queueIds;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                if (!(email && email !== user.email)) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { email: email, companyId: externalAuth.companyId }
                    })];
            case 2:
                existingUser = _b.sent();
                if (existingUser && existingUser.id !== user.id) {
                    throw new AppError_1["default"]("ERR_USER_EMAIL_ALREADY_EXISTS", 400);
                }
                _b.label = 3;
            case 3:
                updateData = {};
                if (name !== undefined)
                    updateData.name = name;
                if (email !== undefined)
                    updateData.email = email;
                if (password !== undefined)
                    updateData.password = password;
                if (profile !== undefined)
                    updateData.profile = profile;
                if (whatsappId !== undefined)
                    updateData.whatsappId = whatsappId;
                if (startWork !== undefined)
                    updateData.startWork = startWork;
                if (endWork !== undefined)
                    updateData.endWork = endWork;
                if (userType !== undefined)
                    updateData.userType = userType;
                if (workDays !== undefined)
                    updateData.workDays = workDays;
                if (lunchStart !== undefined)
                    updateData.lunchStart = lunchStart;
                if (lunchEnd !== undefined)
                    updateData.lunchEnd = lunchEnd;
                if (color !== undefined)
                    updateData.color = color;
                if (allTicket !== undefined)
                    updateData.allTicket = allTicket;
                if (allowGroup !== undefined)
                    updateData.allowGroup = allowGroup;
                if (farewellMessage !== undefined)
                    updateData.farewellMessage = farewellMessage;
                if (allHistoric !== undefined)
                    updateData.allHistoric = allHistoric;
                if (allUserChat !== undefined)
                    updateData.allUserChat = allUserChat;
                if (userClosePendingTicket !== undefined)
                    updateData.userClosePendingTicket = userClosePendingTicket;
                if (showDashboard !== undefined)
                    updateData.showDashboard = showDashboard;
                if (allowRealTime !== undefined)
                    updateData.allowRealTime = allowRealTime;
                if (allowConnections !== undefined)
                    updateData.allowConnections = allowConnections;
                return [4 /*yield*/, user.update(updateData)];
            case 4:
                _b.sent();
                if (!(queueIds !== undefined && Array.isArray(queueIds))) return [3 /*break*/, 9];
                return [4 /*yield*/, UserQueue_1["default"].destroy({ where: { userId: user.id } })];
            case 5:
                _b.sent();
                _i = 0, queueIds_2 = queueIds;
                _b.label = 6;
            case 6:
                if (!(_i < queueIds_2.length)) return [3 /*break*/, 9];
                queueId = queueIds_2[_i];
                return [4 /*yield*/, UserQueue_1["default"].create({
                        userId: user.id,
                        queueId: queueId
                    })];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 6];
            case 9: return [4 /*yield*/, user.reload({
                    include: [
                        { model: Queue_1["default"], as: "queues", attributes: ["id", "name", "color"], through: { attributes: [] } }
                    ],
                    attributes: { exclude: ["passwordHash", "tokenVersion"] }
                })];
            case 10:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            user: serializeUser(user)
                        }
                    })];
            case 11:
                _b.sent();
                return [2 /*return*/, res.json(serializeUser(user))];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                // Remover filas do usuário
                return [4 /*yield*/, UserQueue_1["default"].destroy({ where: { userId: user.id } })];
            case 2:
                // Remover filas do usuário
                _a.sent();
                return [4 /*yield*/, user.destroy()];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: Number(id)
                        }
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
// ==================== SERVIÇOS DO USUÁRIO ====================
var listServices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId },
                        include: [
                            {
                                model: Servico_1["default"],
                                as: "services",
                                through: { attributes: [] }
                            }
                        ]
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json({
                        services: ((_a = user.services) === null || _a === void 0 ? void 0 : _a.map(function (s) { return ({
                            id: s.id,
                            nome: s.nome,
                            descricao: s.descricao,
                            valorOriginal: s.valorOriginal,
                            tempoAtendimento: s.tempoAtendimento,
                            imagem: s.imagem
                        }); })) || []
                    })];
        }
    });
}); };
exports.listServices = listServices;
var addServices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, serviceIds, user, services, _i, services_1, service, existing;
    var _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                serviceIds = req.body.serviceIds;
                if (!serviceIds || !Array.isArray(serviceIds)) {
                    throw new AppError_1["default"]("ERR_SERVICE_IDS_REQUIRED", 400);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _d.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, Servico_1["default"].findAll({
                        where: { id: (_a = {}, _a[sequelize_1.Op["in"]] = serviceIds, _a), companyId: externalAuth.companyId }
                    })];
            case 2:
                services = _d.sent();
                if (services.length === 0) {
                    throw new AppError_1["default"]("ERR_SERVICES_NOT_FOUND", 404);
                }
                _i = 0, services_1 = services;
                _d.label = 3;
            case 3:
                if (!(_i < services_1.length)) return [3 /*break*/, 7];
                service = services_1[_i];
                return [4 /*yield*/, UserService_1["default"].findOne({
                        where: { userId: user.id, serviceId: service.id }
                    })];
            case 4:
                existing = _d.sent();
                if (!!existing) return [3 /*break*/, 6];
                return [4 /*yield*/, UserService_1["default"].create({
                        userId: user.id,
                        serviceId: service.id
                    })];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, user.reload({
                    include: [
                        { model: Servico_1["default"], as: "services", through: { attributes: [] } }
                    ]
                })];
            case 8:
                _d.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.services.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            services: (_b = user.services) === null || _b === void 0 ? void 0 : _b.map(function (s) { return ({ id: s.id, nome: s.nome }); })
                        }
                    })];
            case 9:
                _d.sent();
                return [2 /*return*/, res.json({
                        message: "Serviços adicionados com sucesso",
                        services: ((_c = user.services) === null || _c === void 0 ? void 0 : _c.map(function (s) { return ({
                            id: s.id,
                            nome: s.nome,
                            descricao: s.descricao,
                            valorOriginal: s.valorOriginal,
                            tempoAtendimento: s.tempoAtendimento,
                            imagem: s.imagem
                        }); })) || []
                    })];
        }
    });
}); };
exports.addServices = addServices;
var removeServices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, serviceIds, user;
    var _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                serviceIds = req.body.serviceIds;
                if (!serviceIds || !Array.isArray(serviceIds)) {
                    throw new AppError_1["default"]("ERR_SERVICE_IDS_REQUIRED", 400);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _d.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserService_1["default"].destroy({
                        where: { userId: user.id, serviceId: (_a = {}, _a[sequelize_1.Op["in"]] = serviceIds, _a) }
                    })];
            case 2:
                _d.sent();
                return [4 /*yield*/, user.reload({
                        include: [
                            { model: Servico_1["default"], as: "services", through: { attributes: [] } }
                        ]
                    })];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.services.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            services: (_b = user.services) === null || _b === void 0 ? void 0 : _b.map(function (s) { return ({ id: s.id, nome: s.nome }); })
                        }
                    })];
            case 4:
                _d.sent();
                return [2 /*return*/, res.json({
                        message: "Serviços removidos com sucesso",
                        services: ((_c = user.services) === null || _c === void 0 ? void 0 : _c.map(function (s) { return ({
                            id: s.id,
                            nome: s.nome
                        }); })) || []
                    })];
        }
    });
}); };
exports.removeServices = removeServices;
var setServices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, serviceIds, user, _i, serviceIds_1, serviceId, service;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                serviceIds = req.body.serviceIds;
                if (!serviceIds || !Array.isArray(serviceIds)) {
                    throw new AppError_1["default"]("ERR_SERVICE_IDS_REQUIRED", 400);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                // Remover todos os serviços atuais
                return [4 /*yield*/, UserService_1["default"].destroy({ where: { userId: user.id } })];
            case 2:
                // Remover todos os serviços atuais
                _c.sent();
                _i = 0, serviceIds_1 = serviceIds;
                _c.label = 3;
            case 3:
                if (!(_i < serviceIds_1.length)) return [3 /*break*/, 7];
                serviceId = serviceIds_1[_i];
                return [4 /*yield*/, Servico_1["default"].findOne({
                        where: { id: serviceId, companyId: externalAuth.companyId }
                    })];
            case 4:
                service = _c.sent();
                if (!service) return [3 /*break*/, 6];
                return [4 /*yield*/, UserService_1["default"].create({
                        userId: user.id,
                        serviceId: service.id
                    })];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, user.reload({
                    include: [
                        { model: Servico_1["default"], as: "services", through: { attributes: [] } }
                    ]
                })];
            case 8:
                _c.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.services.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            services: (_a = user.services) === null || _a === void 0 ? void 0 : _a.map(function (s) { return ({ id: s.id, nome: s.nome }); })
                        }
                    })];
            case 9:
                _c.sent();
                return [2 /*return*/, res.json({
                        message: "Serviços atualizados com sucesso",
                        services: ((_b = user.services) === null || _b === void 0 ? void 0 : _b.map(function (s) { return ({
                            id: s.id,
                            nome: s.nome,
                            descricao: s.descricao,
                            valorOriginal: s.valorOriginal,
                            tempoAtendimento: s.tempoAtendimento,
                            imagem: s.imagem
                        }); })) || []
                    })];
        }
    });
}); };
exports.setServices = setServices;
// ==================== AGENDA DO USUÁRIO ====================
var getSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, user, schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: companyId }
                    })];
            case 2:
                schedule = _a.sent();
                if (!schedule) {
                    return [2 /*return*/, res.json({
                            schedule: null,
                            message: "Usuário não possui agenda configurada"
                        })];
                }
                return [2 /*return*/, res.json({
                        schedule: {
                            id: schedule.id,
                            name: schedule.name,
                            description: schedule.description,
                            active: schedule.active,
                            userId: schedule.userId,
                            createdAt: schedule.createdAt,
                            updatedAt: schedule.updatedAt
                        }
                    })];
        }
    });
}); };
exports.getSchedule = getSchedule;
var createSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, name, description, active, user, existingSchedule, schedule;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, active = _a.active;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id }
                    })];
            case 2:
                existingSchedule = _b.sent();
                if (existingSchedule) {
                    throw new AppError_1["default"]("ERR_USER_SCHEDULE_ALREADY_EXISTS", 400);
                }
                return [4 /*yield*/, UserSchedule_1["default"].create({
                        name: name || "Agenda de ".concat(user.name),
                        description: description || "",
                        active: active !== false,
                        userId: user.id,
                        companyId: externalAuth.companyId
                    })];
            case 3:
                schedule = _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.schedule.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            schedule: {
                                id: schedule.id,
                                name: schedule.name,
                                active: schedule.active
                            }
                        }
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        schedule: {
                            id: schedule.id,
                            name: schedule.name,
                            description: schedule.description,
                            active: schedule.active,
                            userId: schedule.userId,
                            createdAt: schedule.createdAt
                        }
                    })];
        }
    });
}); };
exports.createSchedule = createSchedule;
var updateSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, name, description, active, user, schedule, updateData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, active = _a.active;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: externalAuth.companyId }
                    })];
            case 2:
                schedule = _b.sent();
                if (!schedule) {
                    throw new AppError_1["default"]("ERR_USER_SCHEDULE_NOT_FOUND", 404);
                }
                updateData = {};
                if (name !== undefined)
                    updateData.name = name;
                if (description !== undefined)
                    updateData.description = description;
                if (active !== undefined)
                    updateData.active = active;
                return [4 /*yield*/, schedule.update(updateData)];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.schedule.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            schedule: {
                                id: schedule.id,
                                name: schedule.name,
                                active: schedule.active
                            }
                        }
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json({
                        schedule: {
                            id: schedule.id,
                            name: schedule.name,
                            description: schedule.description,
                            active: schedule.active,
                            userId: schedule.userId,
                            updatedAt: schedule.updatedAt
                        }
                    })];
        }
    });
}); };
exports.updateSchedule = updateSchedule;
// ==================== COMPROMISSOS DO USUÁRIO ====================
var listAppointments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a, status, startDate, endDate, _b, pageNumber, user, schedule, whereCondition, limit, offset, _c, count, appointments;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                _a = req.query, status = _a.status, startDate = _a.startDate, endDate = _a.endDate, _b = _a.pageNumber, pageNumber = _b === void 0 ? "1" : _b;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId }
                    })];
            case 1:
                user = _f.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: companyId }
                    })];
            case 2:
                schedule = _f.sent();
                if (!schedule) {
                    return [2 /*return*/, res.json({
                            appointments: [],
                            count: 0,
                            message: "Usuário não possui agenda configurada"
                        })];
                }
                whereCondition = { scheduleId: schedule.id };
                if (status) {
                    whereCondition.status = status;
                }
                if (startDate) {
                    whereCondition.startDatetime = __assign(__assign({}, whereCondition.startDatetime), (_d = {}, _d[sequelize_1.Op.gte] = new Date(startDate), _d));
                }
                if (endDate) {
                    whereCondition.startDatetime = __assign(__assign({}, whereCondition.startDatetime), (_e = {}, _e[sequelize_1.Op.lte] = new Date(endDate), _e));
                }
                limit = 50;
                offset = (Number(pageNumber) - 1) * limit;
                return [4 /*yield*/, Appointment_1["default"].findAndCountAll({
                        where: whereCondition,
                        include: [
                            { model: Servico_1["default"], as: "service", attributes: ["id", "nome", "valorOriginal"] },
                            { model: CrmClient_1["default"], as: "client", attributes: ["id", "name", "email", "phone"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] }
                        ],
                        order: [["startDatetime", "ASC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 3:
                _c = _f.sent(), count = _c.count, appointments = _c.rows;
                return [2 /*return*/, res.json({
                        appointments: appointments.map(function (a) { return ({
                            id: a.id,
                            title: a.title,
                            description: a.description,
                            startDatetime: a.startDatetime,
                            durationMinutes: a.durationMinutes,
                            status: a.status,
                            service: a.service ? { id: a.service.id, nome: a.service.nome, valor: a.service.valorOriginal } : null,
                            client: a.client ? { id: a.client.id, name: a.client.name, email: a.client.email } : null,
                            contact: a.contact ? { id: a.contact.id, name: a.contact.name, number: a.contact.number } : null,
                            createdAt: a.createdAt
                        }); }),
                        count: count,
                        hasMore: offset + appointments.length < count
                    })];
        }
    });
}); };
exports.listAppointments = listAppointments;
var createAppointment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, title, description, startDatetime, durationMinutes, serviceId, clientId, contactId, user, schedule, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, startDatetime = _a.startDatetime, durationMinutes = _a.durationMinutes, serviceId = _a.serviceId, clientId = _a.clientId, contactId = _a.contactId;
                if (!startDatetime) {
                    throw new AppError_1["default"]("ERR_START_DATETIME_REQUIRED", 400);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: externalAuth.companyId }
                    })];
            case 2:
                schedule = _b.sent();
                if (!!schedule) return [3 /*break*/, 4];
                return [4 /*yield*/, UserSchedule_1["default"].create({
                        name: "Agenda de ".concat(user.name),
                        description: "",
                        active: true,
                        userId: user.id,
                        companyId: externalAuth.companyId
                    })];
            case 3:
                schedule = _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, Appointment_1["default"].create({
                    title: title || "Compromisso",
                    description: description || "",
                    startDatetime: new Date(startDatetime),
                    durationMinutes: durationMinutes || 60,
                    status: "scheduled",
                    scheduleId: schedule.id,
                    serviceId: serviceId || null,
                    clientId: clientId || null,
                    contactId: contactId || null,
                    companyId: externalAuth.companyId
                })];
            case 5:
                appointment = _b.sent();
                return [4 /*yield*/, appointment.reload({
                        include: [
                            { model: Servico_1["default"], as: "service", attributes: ["id", "nome", "valorOriginal"] },
                            { model: CrmClient_1["default"], as: "client", attributes: ["id", "name", "email", "phone"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] }
                        ]
                    })];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.appointment.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            appointment: {
                                id: appointment.id,
                                title: appointment.title,
                                startDatetime: appointment.startDatetime,
                                status: appointment.status
                            }
                        }
                    })];
            case 7:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        id: appointment.id,
                        title: appointment.title,
                        description: appointment.description,
                        startDatetime: appointment.startDatetime,
                        durationMinutes: appointment.durationMinutes,
                        status: appointment.status,
                        service: appointment.service ? { id: appointment.service.id, nome: appointment.service.nome } : null,
                        client: appointment.client ? { id: appointment.client.id, name: appointment.client.name } : null,
                        contact: appointment.contact ? { id: appointment.contact.id, name: appointment.contact.name } : null,
                        createdAt: appointment.createdAt
                    })];
        }
    });
}); };
exports.createAppointment = createAppointment;
var updateAppointment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, id, appointmentId, _b, title, description, startDatetime, durationMinutes, status, serviceId, clientId, contactId, user, schedule, appointment, updateData;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.params, id = _a.id, appointmentId = _a.appointmentId;
                _b = req.body, title = _b.title, description = _b.description, startDatetime = _b.startDatetime, durationMinutes = _b.durationMinutes, status = _b.status, serviceId = _b.serviceId, clientId = _b.clientId, contactId = _b.contactId;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: externalAuth.companyId }
                    })];
            case 2:
                schedule = _c.sent();
                if (!schedule) {
                    throw new AppError_1["default"]("ERR_USER_SCHEDULE_NOT_FOUND", 404);
                }
                return [4 /*yield*/, Appointment_1["default"].findOne({
                        where: { id: Number(appointmentId), scheduleId: schedule.id }
                    })];
            case 3:
                appointment = _c.sent();
                if (!appointment) {
                    throw new AppError_1["default"]("ERR_APPOINTMENT_NOT_FOUND", 404);
                }
                updateData = {};
                if (title !== undefined)
                    updateData.title = title;
                if (description !== undefined)
                    updateData.description = description;
                if (startDatetime !== undefined)
                    updateData.startDatetime = new Date(startDatetime);
                if (durationMinutes !== undefined)
                    updateData.durationMinutes = durationMinutes;
                if (status !== undefined)
                    updateData.status = status;
                if (serviceId !== undefined)
                    updateData.serviceId = serviceId;
                if (clientId !== undefined)
                    updateData.clientId = clientId;
                if (contactId !== undefined)
                    updateData.contactId = contactId;
                return [4 /*yield*/, appointment.update(updateData)];
            case 4:
                _c.sent();
                return [4 /*yield*/, appointment.reload({
                        include: [
                            { model: Servico_1["default"], as: "service", attributes: ["id", "nome", "valorOriginal"] },
                            { model: CrmClient_1["default"], as: "client", attributes: ["id", "name", "email", "phone"] },
                            { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] }
                        ]
                    })];
            case 5:
                _c.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.appointment.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            appointment: {
                                id: appointment.id,
                                title: appointment.title,
                                startDatetime: appointment.startDatetime,
                                status: appointment.status
                            }
                        }
                    })];
            case 6:
                _c.sent();
                return [2 /*return*/, res.json({
                        id: appointment.id,
                        title: appointment.title,
                        description: appointment.description,
                        startDatetime: appointment.startDatetime,
                        durationMinutes: appointment.durationMinutes,
                        status: appointment.status,
                        service: appointment.service ? { id: appointment.service.id, nome: appointment.service.nome } : null,
                        client: appointment.client ? { id: appointment.client.id, name: appointment.client.name } : null,
                        contact: appointment.contact ? { id: appointment.contact.id, name: appointment.contact.name } : null,
                        updatedAt: appointment.updatedAt
                    })];
        }
    });
}); };
exports.updateAppointment = updateAppointment;
var deleteAppointment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, id, appointmentId, user, schedule, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.params, id = _a.id, appointmentId = _a.appointmentId;
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: externalAuth.companyId }
                    })];
            case 2:
                schedule = _b.sent();
                if (!schedule) {
                    throw new AppError_1["default"]("ERR_USER_SCHEDULE_NOT_FOUND", 404);
                }
                return [4 /*yield*/, Appointment_1["default"].findOne({
                        where: { id: Number(appointmentId), scheduleId: schedule.id }
                    })];
            case 3:
                appointment = _b.sent();
                if (!appointment) {
                    throw new AppError_1["default"]("ERR_APPOINTMENT_NOT_FOUND", 404);
                }
                return [4 /*yield*/, appointment.destroy()];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.appointment.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            appointmentId: Number(appointmentId)
                        }
                    })];
            case 5:
                _b.sent();
                return [2 /*return*/, res.json({ message: "Compromisso removido com sucesso" })];
        }
    });
}); };
exports.deleteAppointment = deleteAppointment;
var updateAppointmentStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, id, appointmentId, status, validStatuses, user, schedule, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.params, id = _a.id, appointmentId = _a.appointmentId;
                status = req.body.status;
                validStatuses = ["scheduled", "confirmed", "completed", "cancelled", "no_show"];
                if (!status || !validStatuses.includes(status)) {
                    throw new AppError_1["default"]("ERR_INVALID_STATUS", 400);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_USER_NOT_FOUND", 404);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { userId: user.id, companyId: externalAuth.companyId }
                    })];
            case 2:
                schedule = _b.sent();
                if (!schedule) {
                    throw new AppError_1["default"]("ERR_USER_SCHEDULE_NOT_FOUND", 404);
                }
                return [4 /*yield*/, Appointment_1["default"].findOne({
                        where: { id: Number(appointmentId), scheduleId: schedule.id }
                    })];
            case 3:
                appointment = _b.sent();
                if (!appointment) {
                    throw new AppError_1["default"]("ERR_APPOINTMENT_NOT_FOUND", 404);
                }
                return [4 /*yield*/, appointment.update({ status: status })];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "user.appointment.".concat(status),
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            userId: user.id,
                            appointmentId: appointment.id,
                            status: status
                        }
                    })];
            case 5:
                _b.sent();
                return [2 /*return*/, res.json({
                        id: appointment.id,
                        title: appointment.title,
                        status: appointment.status,
                        message: "Status atualizado para ".concat(status)
                    })];
        }
    });
}); };
exports.updateAppointmentStatus = updateAppointmentStatus;
