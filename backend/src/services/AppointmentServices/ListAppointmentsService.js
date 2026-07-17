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
var sequelize_1 = require("sequelize");
var Appointment_1 = __importDefault(require("../../models/Appointment"));
var UserSchedule_1 = __importDefault(require("../../models/UserSchedule"));
var User_1 = __importDefault(require("../../models/User"));
var Servico_1 = __importDefault(require("../../models/Servico"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var ListAppointmentsService = function (_a) {
    var companyId = _a.companyId, userId = _a.userId, profile = _a.profile, userType = _a.userType, scheduleId = _a.scheduleId, status = _a.status, startDate = _a.startDate, endDate = _a.endDate, _b = _a.pageNumber, pageNumber = _b === void 0 ? "1" : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var where, normalizedUserType, normalizedProfile, canViewAllSchedules, shouldRestrictByUser, userSchedules, scheduleIds, limit, offset, _c, rows, count;
        var _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    where = { companyId: companyId };
                    normalizedUserType = (userType || "").toLowerCase();
                    normalizedProfile = (profile || "").toLowerCase();
                    canViewAllSchedules = ["administrador", "gerente", "admin", "manager", "administrator"].includes(normalizedUserType)
                        || normalizedProfile === "admin";
                    shouldRestrictByUser = !canViewAllSchedules;
                    if (!(shouldRestrictByUser && userId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserSchedule_1["default"].findAll({
                            where: { userId: userId, companyId: companyId },
                            attributes: ["id"]
                        })];
                case 1:
                    userSchedules = _h.sent();
                    scheduleIds = userSchedules.map(function (s) { return s.id; });
                    // Sempre restringe ao scheduleId do próprio usuário — mesmo se a lista for vazia
                    where.scheduleId = scheduleIds.length > 0
                        ? (_d = {}, _d[sequelize_1.Op["in"]] = scheduleIds, _d) : -1; // força retorno vazio se não tiver agenda
                    return [3 /*break*/, 3];
                case 2:
                    if (scheduleId) {
                        // Admin pode ver qualquer agenda
                        where.scheduleId = scheduleId;
                    }
                    _h.label = 3;
                case 3:
                    if (status) {
                        where.status = status;
                    }
                    if (startDate && endDate) {
                        where.startDatetime = (_e = {},
                            _e[sequelize_1.Op.between] = [new Date(startDate), new Date(endDate)],
                            _e);
                    }
                    else if (startDate) {
                        where.startDatetime = (_f = {},
                            _f[sequelize_1.Op.gte] = new Date(startDate),
                            _f);
                    }
                    else if (endDate) {
                        where.startDatetime = (_g = {},
                            _g[sequelize_1.Op.lte] = new Date(endDate),
                            _g);
                    }
                    limit = 50;
                    offset = limit * (Number(pageNumber) - 1);
                    return [4 /*yield*/, Appointment_1["default"].findAndCountAll({
                            where: where,
                            include: [
                                __assign(__assign({ model: UserSchedule_1["default"], as: "schedule" }, (shouldRestrictByUser && userId ? { where: { userId: userId } } : {})), { include: [
                                        {
                                            model: User_1["default"],
                                            as: "user",
                                            attributes: ["id", "name", "email"]
                                        }
                                    ] }),
                                {
                                    model: Servico_1["default"],
                                    as: "service",
                                    attributes: ["id", "nome", "valorOriginal", "tempoAtendimento", "imagem"]
                                },
                                {
                                    model: CrmClient_1["default"],
                                    as: "client",
                                    attributes: ["id", "name", "email", "phone"]
                                },
                                {
                                    model: Contact_1["default"],
                                    as: "contact",
                                    attributes: ["id", "name", "number"]
                                }
                            ],
                            limit: limit,
                            offset: offset,
                            order: [["startDatetime", "ASC"]]
                        })];
                case 4:
                    _c = _h.sent(), rows = _c.rows, count = _c.count;
                    return [2 /*return*/, {
                            appointments: rows,
                            count: count,
                            hasMore: count > offset + rows.length
                        }];
            }
        });
    });
};
exports["default"] = ListAppointmentsService;
