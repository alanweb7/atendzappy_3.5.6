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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Appointment_1 = __importDefault(require("../../models/Appointment"));
var UserSchedule_1 = __importDefault(require("../../models/UserSchedule"));
var UserGoogleCalendarIntegration_1 = __importDefault(require("../../models/UserGoogleCalendarIntegration"));
var googleCalendarClient_1 = require("../../helpers/googleCalendarClient");
var DeleteAppointmentService = function (id, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var appointment, schedule, integration, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Appointment_1["default"].findOne({
                    where: { id: id, companyId: companyId }
                })];
            case 1:
                appointment = _a.sent();
                if (!appointment) {
                    throw new AppError_1["default"]("Compromisso não encontrado", 404);
                }
                console.log("DEBUG - Excluindo appointment:", {
                    id: appointment.id,
                    title: appointment.title,
                    googleEventId: appointment.googleEventId,
                    scheduleId: appointment.scheduleId
                });
                if (!appointment.googleEventId) return [3 /*break*/, 12];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 10, , 11]);
                console.log("DEBUG - Excluindo evento no Google Calendar:", appointment.googleEventId);
                return [4 /*yield*/, UserSchedule_1["default"].findOne({
                        where: { id: appointment.scheduleId }
                    })];
            case 3:
                schedule = _a.sent();
                console.log("DEBUG - Schedule encontrada:", {
                    id: schedule === null || schedule === void 0 ? void 0 : schedule.id,
                    userGoogleCalendarIntegrationId: schedule === null || schedule === void 0 ? void 0 : schedule.userGoogleCalendarIntegrationId
                });
                if (!(schedule === null || schedule === void 0 ? void 0 : schedule.userGoogleCalendarIntegrationId)) return [3 /*break*/, 8];
                return [4 /*yield*/, UserGoogleCalendarIntegration_1["default"].findOne({
                        where: { id: schedule.userGoogleCalendarIntegrationId }
                    })];
            case 4:
                integration = _a.sent();
                console.log("DEBUG - Integração encontrada:", {
                    id: integration === null || integration === void 0 ? void 0 : integration.id,
                    email: integration === null || integration === void 0 ? void 0 : integration.email,
                    hasAccessToken: !!(integration === null || integration === void 0 ? void 0 : integration.accessToken),
                    hasRefreshToken: !!(integration === null || integration === void 0 ? void 0 : integration.refreshToken),
                    calendarId: integration === null || integration === void 0 ? void 0 : integration.calendarId
                });
                if (!(integration && integration.accessToken)) return [3 /*break*/, 6];
                console.log("DEBUG - Chamando deleteGoogleCalendarEvent...");
                return [4 /*yield*/, (0, googleCalendarClient_1.deleteGoogleCalendarEvent)(integration.accessToken, integration.refreshToken, appointment.googleEventId, integration.calendarId, appointment.companyId)];
            case 5:
                _a.sent();
                console.log("DEBUG - Evento excluído do Google Calendar:", appointment.googleEventId);
                return [3 /*break*/, 7];
            case 6:
                console.log("DEBUG - Integração não encontrada ou sem accessToken");
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                console.log("DEBUG - Schedule não tem integração vinculada");
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                console.error("ERROR - Falha ao excluir evento do Google Calendar:", error_1);
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 13];
            case 12:
                console.log("DEBUG - Appointment não tem googleEventId para excluir");
                _a.label = 13;
            case 13: return [4 /*yield*/, appointment.destroy()];
            case 14:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = DeleteAppointmentService;
