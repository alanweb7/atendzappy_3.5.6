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
var Schedule_1 = __importDefault(require("../../models/Schedule"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var CreateBulkService = function (_a) {
    var body = _a.body, sendAt = _a.sendAt, companyId = _a.companyId, userId = _a.userId, whatsappId = _a.whatsappId, ticketUserId = _a.ticketUserId, queueId = _a.queueId, _b = _a.openTicket, openTicket = _b === void 0 ? "enabled" : _b, _c = _a.statusTicket, statusTicket = _c === void 0 ? "closed" : _c, _d = _a.intervalo, intervalo = _d === void 0 ? 1 : _d, _e = _a.valorIntervalo, valorIntervalo = _e === void 0 ? 0 : _e, _f = _a.enviarQuantasVezes, enviarQuantasVezes = _f === void 0 ? 1 : _f, _g = _a.tipoDias, tipoDias = _g === void 0 ? 4 : _g, _h = _a.contadorEnvio, contadorEnvio = _h === void 0 ? 0 : _h, _j = _a.assinar, assinar = _j === void 0 ? false : _j, sendType = _a.sendType, _k = _a.contactIds, contactIds = _k === void 0 ? [] : _k, _l = _a.tagIds, tagIds = _l === void 0 ? [] : _l, _m = _a.mediaType, mediaType = _m === void 0 ? "image" : _m, _o = _a.arrayOption, arrayOption = _o === void 0 ? [] : _o;
    return __awaiter(void 0, void 0, void 0, function () {
        var targetContactIds, contactTags, ticketTags, allContactIds, schedules, _i, targetContactIds_1, contactId, scheduleData, schedule;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    targetContactIds = [];
                    if (!(sendType === "multiple")) return [3 /*break*/, 1];
                    targetContactIds = contactIds;
                    return [3 /*break*/, 4];
                case 1:
                    if (!(sendType === "tag")) return [3 /*break*/, 4];
                    return [4 /*yield*/, ContactTag_1["default"].findAll({
                            where: {
                                tagId: tagIds
                            },
                            include: [{
                                    model: Contact_1["default"],
                                    as: "contact",
                                    where: {
                                        companyId: companyId
                                    },
                                    attributes: ["id"]
                                }],
                            attributes: ["contactId"],
                            raw: true
                        })];
                case 2:
                    contactTags = _p.sent();
                    return [4 /*yield*/, TicketTag_1["default"].findAll({
                            where: {
                                tagId: tagIds
                            },
                            include: [{
                                    model: Ticket_1["default"],
                                    as: "ticket",
                                    required: true,
                                    include: [{
                                            model: Contact_1["default"],
                                            as: "contact",
                                            where: {
                                                companyId: companyId
                                            },
                                            attributes: ["id"]
                                        }]
                                }],
                            attributes: ["ticketId"]
                        })];
                case 3:
                    ticketTags = _p.sent();
                    allContactIds = __spreadArray(__spreadArray([], contactTags.map(function (ct) { return ct.contactId; }), true), ticketTags.map(function (tt) { var _a, _b; return (_b = (_a = tt.ticket) === null || _a === void 0 ? void 0 : _a.contact) === null || _b === void 0 ? void 0 : _b.id; }).filter(Boolean), true);
                    targetContactIds = __spreadArray([], new Set(allContactIds), true);
                    _p.label = 4;
                case 4:
                    if (targetContactIds.length === 0) {
                        throw new AppError_1["default"]("Nenhum contato encontrado para envio", 400);
                    }
                    schedules = [];
                    _i = 0, targetContactIds_1 = targetContactIds;
                    _p.label = 5;
                case 5:
                    if (!(_i < targetContactIds_1.length)) return [3 /*break*/, 8];
                    contactId = targetContactIds_1[_i];
                    scheduleData = {
                        body: body,
                        sendAt: sendAt,
                        contactId: contactId,
                        companyId: companyId,
                        status: "PENDENTE",
                        intervalo: intervalo,
                        valorIntervalo: valorIntervalo,
                        enviarQuantasVezes: enviarQuantasVezes,
                        tipoDias: tipoDias,
                        contadorEnvio: contadorEnvio,
                        assinar: assinar,
                        tagIds: tagIds,
                        mediaType: mediaType,
                        arrayOption: arrayOption
                    };
                    // Apenas incluir campos não nulos
                    if (userId) {
                        scheduleData.userId = userId;
                    }
                    if (whatsappId) {
                        scheduleData.whatsappId = whatsappId;
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
                    return [4 /*yield*/, Schedule_1["default"].create(scheduleData)];
                case 6:
                    schedule = _p.sent();
                    schedules.push(schedule);
                    _p.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/, {
                        schedules: schedules,
                        count: schedules.length
                    }];
            }
        });
    });
};
exports["default"] = CreateBulkService;
