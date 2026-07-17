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
var UserSchedule_1 = __importDefault(require("../../models/UserSchedule"));
var Appointment_1 = __importDefault(require("../../models/Appointment"));
var User_1 = __importDefault(require("../../models/User"));
var sequelize_1 = require("sequelize");
var moment_1 = __importDefault(require("moment"));
var ScheduleAppointmentService = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var action, companyId, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                action = params.action, companyId = params.companyId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                _a = action;
                switch (_a) {
                    case "list_user_schedules": return [3 /*break*/, 2];
                    case "list_schedule_appointments": return [3 /*break*/, 4];
                    case "check_schedule_availability": return [3 /*break*/, 6];
                    case "create_schedule_appointment": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2: return [4 /*yield*/, listUserSchedules(companyId, params.activeOnly)];
            case 3: return [2 /*return*/, _b.sent()];
            case 4: return [4 /*yield*/, listScheduleAppointments(params)];
            case 5: return [2 /*return*/, _b.sent()];
            case 6: return [4 /*yield*/, checkScheduleAvailability(params)];
            case 7: return [2 /*return*/, _b.sent()];
            case 8: return [4 /*yield*/, createScheduleAppointment(params)];
            case 9: return [2 /*return*/, _b.sent()];
            case 10: return [2 /*return*/, {
                    success: false,
                    error: "Ação inválida"
                }];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _b.sent();
                console.error("[SCHEDULE_APPOINTMENT] Erro:", error_1);
                return [2 /*return*/, {
                        success: false,
                        error: error_1.message || "Erro ao processar solicitação"
                    }];
            case 13: return [2 /*return*/];
        }
    });
}); };
// 1. Listar todas as agendas ativas da empresa
function listUserSchedules(companyId, activeOnly) {
    if (activeOnly === void 0) { activeOnly = true; }
    return __awaiter(this, void 0, void 0, function () {
        var whereClause, schedules;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    whereClause = { companyId: companyId };
                    if (activeOnly) {
                        whereClause.active = true;
                    }
                    return [4 /*yield*/, UserSchedule_1["default"].findAll({
                            where: whereClause,
                            include: [
                                {
                                    model: User_1["default"],
                                    as: "user",
                                    attributes: ["id", "name", "email"]
                                }
                            ],
                            attributes: ["id", "name", "description", "userId", "active"]
                        })];
                case 1:
                    schedules = _a.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: schedules.map(function (s) { return ({
                                id: s.id,
                                name: s.name,
                                description: s.description,
                                active: s.active,
                                user: {
                                    id: s.user.id,
                                    name: s.user.name,
                                    email: s.user.email
                                }
                            }); }),
                            message: "Encontradas ".concat(schedules.length, " agenda(s)")
                        }];
            }
        });
    });
}
// 2. Listar compromissos de uma agenda em uma data específica
function listScheduleAppointments(params) {
    return __awaiter(this, void 0, void 0, function () {
        var scheduleId, date, companyId, schedule, startOfDay, endOfDay, appointments;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    scheduleId = params.scheduleId, date = params.date, companyId = params.companyId;
                    if (!scheduleId || !date) {
                        return [2 /*return*/, {
                                success: false,
                                error: "scheduleId e date são obrigatórios"
                            }];
                    }
                    return [4 /*yield*/, UserSchedule_1["default"].findOne({
                            where: { id: scheduleId, companyId: companyId },
                            include: [{ model: User_1["default"], as: "user", attributes: ["name"] }]
                        })];
                case 1:
                    schedule = _c.sent();
                    if (!schedule) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Agenda não encontrada"
                            }];
                    }
                    startOfDay = (0, moment_1["default"])(date).startOf("day").toDate();
                    endOfDay = (0, moment_1["default"])(date).endOf("day").toDate();
                    return [4 /*yield*/, Appointment_1["default"].findAll({
                            where: {
                                scheduleId: scheduleId,
                                startDatetime: (_a = {},
                                    _a[sequelize_1.Op.between] = [startOfDay, endOfDay],
                                    _a),
                                status: (_b = {},
                                    _b[sequelize_1.Op.notIn] = ["cancelled", "no_show"],
                                    _b)
                            },
                            order: [["startDatetime", "ASC"]],
                            attributes: ["id", "title", "description", "startDatetime", "durationMinutes", "status"]
                        })];
                case 2:
                    appointments = _c.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                schedule: {
                                    id: schedule.id,
                                    name: schedule.name,
                                    user: schedule.user.name
                                },
                                date: date,
                                appointments: appointments.map(function (a) { return ({
                                    id: a.id,
                                    title: a.title,
                                    description: a.description,
                                    startTime: (0, moment_1["default"])(a.startDatetime).format("HH:mm"),
                                    endTime: (0, moment_1["default"])(a.startDatetime).add(a.durationMinutes, "minutes").format("HH:mm"),
                                    durationMinutes: a.durationMinutes,
                                    status: a.status
                                }); })
                            },
                            message: "Encontrados ".concat(appointments.length, " compromisso(s) em ").concat((0, moment_1["default"])(date).format("DD/MM/YYYY"))
                        }];
            }
        });
    });
}
// 3. Verificar disponibilidade de horários
function checkScheduleAvailability(params) {
    return __awaiter(this, void 0, void 0, function () {
        var scheduleId, date, companyId, schedule, workingHours, startOfDay, endOfDay, appointments, availableSlots, occupiedSlots, currentTime, endTime, lunchStart, lunchEnd, slotTime, appointment;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    scheduleId = params.scheduleId, date = params.date, companyId = params.companyId;
                    if (!scheduleId || !date) {
                        return [2 /*return*/, {
                                success: false,
                                error: "scheduleId e date são obrigatórios"
                            }];
                    }
                    return [4 /*yield*/, UserSchedule_1["default"].findOne({
                            where: { id: scheduleId, companyId: companyId },
                            include: [{ model: User_1["default"], as: "user", attributes: ["name"] }]
                        })];
                case 1:
                    schedule = _c.sent();
                    if (!schedule) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Agenda não encontrada"
                            }];
                    }
                    workingHours = {
                        start: "08:00",
                        end: "18:00",
                        lunchStart: "12:00",
                        lunchEnd: "13:00"
                    };
                    startOfDay = (0, moment_1["default"])(date).startOf("day").toDate();
                    endOfDay = (0, moment_1["default"])(date).endOf("day").toDate();
                    return [4 /*yield*/, Appointment_1["default"].findAll({
                            where: {
                                scheduleId: scheduleId,
                                startDatetime: (_a = {},
                                    _a[sequelize_1.Op.between] = [startOfDay, endOfDay],
                                    _a),
                                status: (_b = {},
                                    _b[sequelize_1.Op.notIn] = ["cancelled", "no_show"],
                                    _b)
                            },
                            order: [["startDatetime", "ASC"]]
                        })];
                case 2:
                    appointments = _c.sent();
                    availableSlots = [];
                    occupiedSlots = [];
                    currentTime = (0, moment_1["default"])("".concat(date, " ").concat(workingHours.start), "YYYY-MM-DD HH:mm");
                    endTime = (0, moment_1["default"])("".concat(date, " ").concat(workingHours.end), "YYYY-MM-DD HH:mm");
                    lunchStart = (0, moment_1["default"])("".concat(date, " ").concat(workingHours.lunchStart), "YYYY-MM-DD HH:mm");
                    lunchEnd = (0, moment_1["default"])("".concat(date, " ").concat(workingHours.lunchEnd), "YYYY-MM-DD HH:mm");
                    while (currentTime.isBefore(endTime)) {
                        slotTime = currentTime.format("HH:mm");
                        // Pular horário de almoço
                        if (currentTime.isBetween(lunchStart, lunchEnd, null, "[)")) {
                            currentTime.add(30, "minutes");
                            continue;
                        }
                        appointment = appointments.find(function (apt) {
                            var aptStart = (0, moment_1["default"])(apt.startDatetime);
                            var aptEnd = (0, moment_1["default"])(apt.startDatetime).add(apt.durationMinutes, "minutes");
                            return currentTime.isBetween(aptStart, aptEnd, null, "[)");
                        });
                        if (appointment) {
                            occupiedSlots.push({
                                time: slotTime,
                                title: appointment.title
                            });
                        }
                        else {
                            availableSlots.push(slotTime);
                        }
                        currentTime.add(30, "minutes");
                    }
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                schedule: {
                                    id: schedule.id,
                                    name: schedule.name,
                                    user: schedule.user.name
                                },
                                date: (0, moment_1["default"])(date).format("DD/MM/YYYY"),
                                workingHours: {
                                    start: workingHours.start,
                                    end: workingHours.end,
                                    lunch: "".concat(workingHours.lunchStart, " - ").concat(workingHours.lunchEnd)
                                },
                                availableSlots: availableSlots,
                                occupiedSlots: occupiedSlots,
                                summary: {
                                    totalSlots: availableSlots.length + occupiedSlots.length,
                                    available: availableSlots.length,
                                    occupied: occupiedSlots.length
                                }
                            },
                            message: "".concat(availableSlots.length, " hor\u00E1rio(s) dispon\u00EDvel(is) em ").concat((0, moment_1["default"])(date).format("DD/MM/YYYY"))
                        }];
            }
        });
    });
}
// 4. Criar novo compromisso
function createScheduleAppointment(params) {
    return __awaiter(this, void 0, void 0, function () {
        var scheduleId, date, startTime, _a, durationMinutes, title, description, contactId, companyId, schedule, startDatetime, endDatetime, workStart, workEnd, lunchStart, lunchEnd, conflictingAppointments, hasConflict, appointment;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    scheduleId = params.scheduleId, date = params.date, startTime = params.startTime, _a = params.durationMinutes, durationMinutes = _a === void 0 ? 60 : _a, title = params.title, description = params.description, contactId = params.contactId, companyId = params.companyId;
                    // Validações
                    if (!scheduleId || !date || !startTime || !title) {
                        return [2 /*return*/, {
                                success: false,
                                error: "scheduleId, date, startTime e title são obrigatórios"
                            }];
                    }
                    return [4 /*yield*/, UserSchedule_1["default"].findOne({
                            where: { id: scheduleId, companyId: companyId },
                            include: [{ model: User_1["default"], as: "user", attributes: ["name"] }]
                        })];
                case 1:
                    schedule = _g.sent();
                    if (!schedule) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Agenda não encontrada"
                            }];
                    }
                    startDatetime = (0, moment_1["default"])("".concat(date, " ").concat(startTime), "YYYY-MM-DD HH:mm").toDate();
                    endDatetime = (0, moment_1["default"])(startDatetime).add(durationMinutes, "minutes").toDate();
                    workStart = (0, moment_1["default"])("".concat(date, " 08:00"), "YYYY-MM-DD HH:mm");
                    workEnd = (0, moment_1["default"])("".concat(date, " 18:00"), "YYYY-MM-DD HH:mm");
                    lunchStart = (0, moment_1["default"])("".concat(date, " 12:00"), "YYYY-MM-DD HH:mm");
                    lunchEnd = (0, moment_1["default"])("".concat(date, " 13:00"), "YYYY-MM-DD HH:mm");
                    if ((0, moment_1["default"])(startDatetime).isBefore(workStart) || (0, moment_1["default"])(endDatetime).isAfter(workEnd)) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Hor\u00E1rio fora do expediente. Hor\u00E1rio de trabalho: 08:00 - 18:00"
                            }];
                    }
                    if ((0, moment_1["default"])(startDatetime).isBetween(lunchStart, lunchEnd, null, "[)")) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Hor\u00E1rio de almo\u00E7o (12:00 - 13:00). Escolha outro hor\u00E1rio."
                            }];
                    }
                    return [4 /*yield*/, Appointment_1["default"].findAll({
                            where: (_b = {
                                    scheduleId: scheduleId,
                                    status: (_c = {},
                                        _c[sequelize_1.Op.notIn] = ["cancelled", "no_show"],
                                        _c)
                                },
                                _b[sequelize_1.Op.or] = [
                                    {
                                        startDatetime: (_d = {},
                                            _d[sequelize_1.Op.between] = [startDatetime, endDatetime],
                                            _d)
                                    },
                                    (_e = {},
                                        _e[sequelize_1.Op.and] = [
                                            {
                                                startDatetime: (_f = {},
                                                    _f[sequelize_1.Op.lte] = startDatetime,
                                                    _f)
                                            }
                                        ],
                                        _e)
                                ],
                                _b)
                        })];
                case 2:
                    conflictingAppointments = _g.sent();
                    hasConflict = conflictingAppointments.some(function (apt) {
                        var aptEnd = (0, moment_1["default"])(apt.startDatetime).add(apt.durationMinutes, "minutes");
                        return (0, moment_1["default"])(startDatetime).isBefore(aptEnd);
                    });
                    if (hasConflict) {
                        return [2 /*return*/, {
                                success: false,
                                error: "J\u00E1 existe um compromisso agendado neste hor\u00E1rio. Verifique os hor\u00E1rios dispon\u00EDveis."
                            }];
                    }
                    return [4 /*yield*/, Appointment_1["default"].create({
                            scheduleId: scheduleId,
                            title: title,
                            description: description || "",
                            startDatetime: startDatetime,
                            durationMinutes: durationMinutes,
                            status: "scheduled",
                            contactId: contactId || null,
                            companyId: companyId
                        })];
                case 3:
                    appointment = _g.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                id: appointment.id,
                                title: appointment.title,
                                description: appointment.description,
                                schedule: {
                                    id: schedule.id,
                                    name: schedule.name,
                                    user: schedule.user.name
                                },
                                date: (0, moment_1["default"])(startDatetime).format("DD/MM/YYYY"),
                                startTime: (0, moment_1["default"])(startDatetime).format("HH:mm"),
                                endTime: (0, moment_1["default"])(startDatetime).add(durationMinutes, "minutes").format("HH:mm"),
                                durationMinutes: appointment.durationMinutes,
                                status: appointment.status
                            },
                            message: "\u2705 Compromisso criado com sucesso para ".concat((0, moment_1["default"])(startDatetime).format("DD/MM/YYYY [às] HH:mm"))
                        }];
            }
        });
    });
}
exports["default"] = ScheduleAppointmentService;
