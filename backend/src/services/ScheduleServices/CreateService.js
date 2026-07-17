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
var Schedule_1 = __importDefault(require("../../models/Schedule"));
var SyncEventService_1 = __importDefault(require("../GoogleCalendar/SyncEventService"));
var CreateService = function (_a) {
    var body = _a.body, sendAt = _a.sendAt, contactId = _a.contactId, companyId = _a.companyId, userId = _a.userId, ticketUserId = _a.ticketUserId, queueId = _a.queueId, openTicket = _a.openTicket, statusTicket = _a.statusTicket, whatsappId = _a.whatsappId, intervalo = _a.intervalo, valorIntervalo = _a.valorIntervalo, enviarQuantasVezes = _a.enviarQuantasVezes, tipoDias = _a.tipoDias, assinar = _a.assinar, contadorEnvio = _a.contadorEnvio, _b = _a.mediaType, mediaType = _b === void 0 ? "image" : _b, _c = _a.arrayOption, arrayOption = _c === void 0 ? [] : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var schema, err_1, scheduleData, schedule;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    schema = Yup.object().shape({
                        body: Yup.string().required().min(5),
                        sendAt: Yup.string().required()
                    });
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, schema.validate({ body: body, sendAt: sendAt })];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _d.sent();
                    throw new AppError_1["default"](err_1.message);
                case 4:
                    scheduleData = {
                        body: body,
                        sendAt: sendAt,
                        companyId: companyId,
                        status: 'PENDENTE',
                        intervalo: intervalo,
                        valorIntervalo: valorIntervalo,
                        enviarQuantasVezes: enviarQuantasVezes,
                        tipoDias: tipoDias,
                        assinar: assinar,
                        contadorEnvio: contadorEnvio,
                        mediaType: mediaType,
                        arrayOption: arrayOption
                    };
                    // Apenas incluir campos não nulos
                    if (contactId) {
                        scheduleData.contactId = contactId;
                    }
                    if (userId) {
                        scheduleData.userId = userId;
                    }
                    if (ticketUserId) {
                        scheduleData.ticketUserId = ticketUserId;
                    }
                    if (queueId) {
                        scheduleData.queueId = queueId;
                    }
                    if (openTicket) {
                        scheduleData.openTicket = openTicket;
                    }
                    if (statusTicket) {
                        scheduleData.statusTicket = statusTicket;
                    }
                    if (whatsappId) {
                        scheduleData.whatsappId = whatsappId;
                    }
                    return [4 /*yield*/, Schedule_1["default"].create(scheduleData)];
                case 5:
                    schedule = _d.sent();
                    return [4 /*yield*/, schedule.reload()];
                case 6:
                    _d.sent();
                    // Sincroniza com Google Calendar, se houver integração configurada para a empresa
                    console.log("CreateService - chamando SyncEventService para schedule", schedule.id, "companyId:", companyId);
                    return [4 /*yield*/, (0, SyncEventService_1["default"])({ schedule: schedule })];
                case 7:
                    _d.sent();
                    console.log("CreateService - SyncEventService finalizado para schedule", schedule.id);
                    return [2 /*return*/, schedule];
            }
        });
    });
};
exports["default"] = CreateService;
