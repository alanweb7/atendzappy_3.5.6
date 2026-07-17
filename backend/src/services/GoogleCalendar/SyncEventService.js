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
var GetUserGoogleCalendarIntegrationService_1 = __importDefault(require("../UserGoogleCalendarServices/GetUserGoogleCalendarIntegrationService"));
var googleCalendarClient_1 = require("../../helpers/googleCalendarClient");
var SyncEventService = function (_a) {
    var schedule = _a.schedule;
    return __awaiter(void 0, void 0, void 0, function () {
        var companyId, userId, integration, accessToken, refreshToken, expiryDate, calendarId, tokens, calendar, calendarIdToUse, event, googleEventId, response, createdEvent, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    companyId = schedule.companyId;
                    userId = schedule.userId;
                    console.log("SyncEventService - iniciando sincronização com Google Calendar", "scheduleId:", schedule.id, "userId:", userId, "companyId:", companyId);
                    if (!userId) {
                        console.log("SyncEventService - schedule sem userId definido, não é possível sincronizar", "scheduleId:", schedule.id);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, GetUserGoogleCalendarIntegrationService_1["default"])(userId)];
                case 1:
                    integration = _b.sent();
                    if (!integration) {
                        console.log("SyncEventService - nenhuma integração Google Calendar encontrada para userId", userId);
                        return [2 /*return*/];
                    }
                    accessToken = integration.accessToken, refreshToken = integration.refreshToken, expiryDate = integration.expiryDate, calendarId = integration.calendarId;
                    tokens = {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        expiry_date: expiryDate ? expiryDate.getTime() : undefined
                    };
                    return [4 /*yield*/, (0, googleCalendarClient_1.buildCalendarClient)(tokens, companyId)];
                case 2:
                    calendar = _b.sent();
                    calendarIdToUse = calendarId || "primary";
                    event = {
                        summary: schedule.body || "Compromisso",
                        start: {
                            dateTime: schedule.sendAt,
                            timeZone: "America/Sao_Paulo"
                        },
                        end: {
                            dateTime: schedule.sendAt,
                            timeZone: "America/Sao_Paulo"
                        }
                    };
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 9, , 10]);
                    googleEventId = schedule.googleEventId;
                    console.log("SyncEventService - googleEventId atual do schedule", schedule.id, "=", googleEventId);
                    if (!googleEventId) return [3 /*break*/, 5];
                    console.log("SyncEventService - fazendo UPDATE de evento no Google Calendar para schedule", schedule.id, "eventId:", googleEventId);
                    return [4 /*yield*/, calendar.events.update({
                            calendarId: calendarIdToUse,
                            eventId: googleEventId,
                            requestBody: event
                        })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, calendar.events.insert({
                        calendarId: calendarIdToUse,
                        requestBody: event
                    })];
                case 6:
                    response = _b.sent();
                    createdEvent = response.data;
                    if (!(createdEvent && createdEvent.id)) return [3 /*break*/, 8];
                    console.log("SyncEventService - EVENTO CRIADO no Google Calendar para schedule", schedule.id, "eventId:", createdEvent.id);
                    schedule.googleEventId = createdEvent.id;
                    return [4 /*yield*/, schedule.save()];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    // Em caso de erro na integração, não quebra o fluxo principal.
                    console.error("Erro ao sincronizar evento com Google Calendar", err_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = SyncEventService;
