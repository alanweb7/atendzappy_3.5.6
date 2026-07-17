"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Appointment_1 = __importDefault(require("../../models/Appointment"));
var UserSchedule_1 = __importDefault(require("../../models/UserSchedule"));
var User_1 = __importDefault(require("../../models/User"));
var UserGoogleCalendarIntegration_1 = __importDefault(require("../../models/UserGoogleCalendarIntegration"));
var sequelize_1 = require("sequelize");
var googleCalendarClient_1 = require("../../helpers/googleCalendarClient");
var CreateAppointmentService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, err_1, vinculosCount, schedule, startDatetime, endDatetime, user, userStartWork, userEndWork, userWorkDays, userLunchStart, userLunchEnd, dayOfWeek, workDaysArray, dayNames_1, startTime, endTime, lunchStartMinutes, lunchEndMinutes, appointmentStartMinutes, appointmentEndMinutes, overlapsLunch, existingAppointments, _i, existingAppointments_1, existing, existingStart, existingEnd, newStart, newEnd, appointment, integration, fullDescription, googleEvent, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schema = Yup.object().shape({
                    title: Yup.string().required("Título é obrigatório").max(200),
                    description: Yup.string().nullable(),
                    startDatetime: Yup.date().required("Data/hora de início é obrigatória"),
                    durationMinutes: Yup.number().required("Duração é obrigatória").min(1),
                    status: Yup.string().oneOf(["scheduled", "confirmed", "completed", "cancelled", "no_show"])["default"]("scheduled"),
                    scheduleId: Yup.number().required("Agenda é obrigatória"),
                    serviceId: Yup.number().nullable(),
                    clientId: Yup.number().nullable(),
                    contactId: Yup.number().nullable(),
                    leadId: Yup.number().nullable(),
                    companyId: Yup.number().required()
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(data)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                throw new AppError_1["default"](err_1.message);
            case 4:
                vinculosCount = [data.contactId, data.leadId, data.clientId].filter(function (id) { return id !== null && id !== undefined; }).length;
                if (vinculosCount > 1) {
                    throw new AppError_1["default"]("Você pode vincular apenas um: Contato, Lead ou Cliente", 400);
                }
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { id: data.scheduleId, companyId: data.companyId },
                        include: [{ model: User_1["default"], as: "user" }]
                    })];
            case 5:
                schedule = _b.sent();
                if (!schedule) {
                    throw new AppError_1["default"]("Agenda não encontrada", 404);
                }
                if (!schedule.active) {
                    throw new AppError_1["default"]("Esta agenda não está ativa", 400);
                }
                startDatetime = new Date(data.startDatetime);
                endDatetime = new Date(startDatetime.getTime() + data.durationMinutes * 60000);
                user = schedule.user;
                userStartWork = (user === null || user === void 0 ? void 0 : user.startWork) || "00:00";
                userEndWork = (user === null || user === void 0 ? void 0 : user.endWork) || "23:59";
                userWorkDays = (user === null || user === void 0 ? void 0 : user.workDays) || "0,1,2,3,4,5,6";
                userLunchStart = (user === null || user === void 0 ? void 0 : user.lunchStart) || null;
                userLunchEnd = (user === null || user === void 0 ? void 0 : user.lunchEnd) || null;
                dayOfWeek = startDatetime.getDay();
                workDaysArray = userWorkDays.split(",").map(function (d) { return parseInt(d.trim(), 10); });
                if (!workDaysArray.includes(dayOfWeek)) {
                    dayNames_1 = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
                    throw new AppError_1["default"]("O profissional n\u00E3o trabalha neste dia (".concat(dayNames_1[dayOfWeek], "). Dias de trabalho: ").concat(workDaysArray.map(function (d) { return dayNames_1[d]; }).join(", ")), 400);
                }
                startTime = startDatetime.toTimeString().substring(0, 5);
                endTime = endDatetime.toTimeString().substring(0, 5);
                if (startTime < userStartWork || endTime > userEndWork) {
                    throw new AppError_1["default"]("O compromisso deve estar dentro do hor\u00E1rio de trabalho do profissional (".concat(userStartWork, " - ").concat(userEndWork, ")"), 400);
                }
                // Validar horário de almoço
                if (userLunchStart && userLunchEnd) {
                    lunchStartMinutes = parseInt(userLunchStart.split(":")[0], 10) * 60 + parseInt(userLunchStart.split(":")[1], 10);
                    lunchEndMinutes = parseInt(userLunchEnd.split(":")[0], 10) * 60 + parseInt(userLunchEnd.split(":")[1], 10);
                    appointmentStartMinutes = startDatetime.getHours() * 60 + startDatetime.getMinutes();
                    appointmentEndMinutes = endDatetime.getHours() * 60 + endDatetime.getMinutes();
                    overlapsLunch = ((appointmentStartMinutes >= lunchStartMinutes && appointmentStartMinutes < lunchEndMinutes) ||
                        (appointmentEndMinutes > lunchStartMinutes && appointmentEndMinutes <= lunchEndMinutes) ||
                        (appointmentStartMinutes <= lunchStartMinutes && appointmentEndMinutes >= lunchEndMinutes));
                    if (overlapsLunch) {
                        throw new AppError_1["default"]("O compromisso n\u00E3o pode ser agendado durante o hor\u00E1rio de almo\u00E7o do profissional (".concat(userLunchStart, " - ").concat(userLunchEnd, ")"), 400);
                    }
                }
                return [4 /*yield*/, Appointment_1["default"].findAll({
                        where: {
                            scheduleId: data.scheduleId,
                            status: (_a = {}, _a[sequelize_1.Op.notIn] = ["cancelled", "no_show"], _a)
                        }
                    })];
            case 6:
                existingAppointments = _b.sent();
                for (_i = 0, existingAppointments_1 = existingAppointments; _i < existingAppointments_1.length; _i++) {
                    existing = existingAppointments_1[_i];
                    existingStart = new Date(existing.startDatetime).getTime();
                    existingEnd = existingStart + existing.durationMinutes * 60000;
                    newStart = startDatetime.getTime();
                    newEnd = endDatetime.getTime();
                    if ((newStart >= existingStart && newStart < existingEnd) ||
                        (newEnd > existingStart && newEnd <= existingEnd) ||
                        (newStart <= existingStart && newEnd >= existingEnd)) {
                        throw new AppError_1["default"]("Já existe um compromisso neste horário", 400);
                    }
                }
                return [4 /*yield*/, Appointment_1["default"].create({
                        title: data.title,
                        description: data.description || null,
                        startDatetime: startDatetime,
                        durationMinutes: data.durationMinutes,
                        status: data.status || "scheduled",
                        scheduleId: data.scheduleId,
                        serviceId: data.serviceId || null,
                        clientId: data.clientId || null,
                        contactId: data.contactId || null,
                        leadId: data.leadId || null,
                        companyId: data.companyId
                    })];
            case 7:
                appointment = _b.sent();
                if (!(schedule.userGoogleCalendarIntegrationId && appointment.status === 'confirmed')) return [3 /*break*/, 14];
                _b.label = 8;
            case 8:
                _b.trys.push([8, 13, , 14]);
                console.log("DEBUG - Criando evento no Google Calendar para appointment:", appointment.id);
                return [4 /*yield*/, UserGoogleCalendarIntegration_1["default"].findOne({
                        where: { id: schedule.userGoogleCalendarIntegrationId }
                    })];
            case 9:
                integration = _b.sent();
                if (!(integration && integration.accessToken)) return [3 /*break*/, 12];
                console.log("DEBUG - Usando integração:", {
                    email: integration.email,
                    calendarId: integration.calendarId,
                    googleUserId: integration.googleUserId
                });
                fullDescription = data.description || "";
                if (data.serviceId) {
                    // TODO: Buscar informações do serviço
                    fullDescription += fullDescription ? "\n\n" : "";
                    fullDescription += "Servi\u00E7o ID: ".concat(data.serviceId);
                }
                if (data.clientId) {
                    // TODO: Buscar informações do cliente
                    fullDescription += fullDescription ? "\n\n" : "";
                    fullDescription += "Cliente ID: ".concat(data.clientId);
                }
                if (data.contactId) {
                    // TODO: Buscar informações do contato
                    fullDescription += fullDescription ? "\n\n" : "";
                    fullDescription += "Contato ID: ".concat(data.contactId);
                }
                if (data.leadId) {
                    // TODO: Buscar informações do lead
                    fullDescription += fullDescription ? "\n\n" : "";
                    fullDescription += "Lead ID: ".concat(data.leadId);
                }
                fullDescription += fullDescription ? "\n\n" : "";
                fullDescription += "Status: ".concat(appointment.status);
                fullDescription += "\nAgendado via sistema em: ".concat(appointment.createdAt.toLocaleDateString('pt-BR'));
                return [4 /*yield*/, (0, googleCalendarClient_1.createGoogleCalendarEvent)(integration.accessToken, integration.refreshToken, {
                        summary: data.title,
                        description: fullDescription,
                        start: {
                            dateTime: startDatetime.toISOString(),
                            timeZone: 'America/Sao_Paulo'
                        },
                        end: {
                            dateTime: endDatetime.toISOString(),
                            timeZone: 'America/Sao_Paulo'
                        }
                    }, integration.calendarId, data.companyId)];
            case 10:
                googleEvent = _b.sent();
                if (!(googleEvent && googleEvent.id)) return [3 /*break*/, 12];
                // Salvar o ID do evento do Google Calendar
                return [4 /*yield*/, appointment.update({ googleEventId: googleEvent.id })];
            case 11:
                // Salvar o ID do evento do Google Calendar
                _b.sent();
                console.log("DEBUG - Evento criado no Google Calendar:", googleEvent.id);
                _b.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_1 = _b.sent();
                console.error("ERROR - Falha ao criar evento no Google Calendar:", error_1);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/, appointment];
        }
    });
}); };
exports["default"] = CreateAppointmentService;
