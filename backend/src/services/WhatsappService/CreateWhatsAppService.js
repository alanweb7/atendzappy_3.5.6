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
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Company_1 = __importDefault(require("../../models/Company"));
var Plan_1 = __importDefault(require("../../models/Plan"));
var AssociateWhatsappQueue_1 = __importDefault(require("./AssociateWhatsappQueue"));
var CreateWhatsAppService = function (_a) {
    var name = _a.name, _b = _a.status, status = _b === void 0 ? "OPENING" : _b, _c = _a.queueIds, queueIds = _c === void 0 ? [] : _c, greetingMessage = _a.greetingMessage, complationMessage = _a.complationMessage, outOfHoursMessage = _a.outOfHoursMessage, _d = _a.isDefault, isDefault = _d === void 0 ? false : _d, companyId = _a.companyId, _e = _a.token, token = _e === void 0 ? "" : _e, _f = _a.provider, provider = _f === void 0 ? "beta" : _f, facebookUserId = _a.facebookUserId, facebookUserToken = _a.facebookUserToken, facebookPageUserId = _a.facebookPageUserId, tokenMeta = _a.tokenMeta, _g = _a.channel, channel = _g === void 0 ? "whatsapp" : _g, maxUseBotQueues = _a.maxUseBotQueues, timeUseBotQueues = _a.timeUseBotQueues, expiresTicket = _a.expiresTicket, _h = _a.allowGroup, allowGroup = _h === void 0 ? false : _h, timeSendQueue = _a.timeSendQueue, sendIdQueue = _a.sendIdQueue, timeInactiveMessage = _a.timeInactiveMessage, inactiveMessage = _a.inactiveMessage, ratingMessage = _a.ratingMessage, maxUseBotQueuesNPS = _a.maxUseBotQueuesNPS, expiresTicketNPS = _a.expiresTicketNPS, whenExpiresTicket = _a.whenExpiresTicket, expiresInactiveMessage = _a.expiresInactiveMessage, groupAsTicket = _a.groupAsTicket, importOldMessages = _a.importOldMessages, importRecentMessages = _a.importRecentMessages, closedTicketsPostImported = _a.closedTicketsPostImported, importOldMessagesGroups = _a.importOldMessagesGroups, timeCreateNewTicket = _a.timeCreateNewTicket, integrationId = _a.integrationId, schedules = _a.schedules, promptId = _a.promptId, collectiveVacationEnd = _a.collectiveVacationEnd, collectiveVacationMessage = _a.collectiveVacationMessage, collectiveVacationStart = _a.collectiveVacationStart, queueIdImportMessages = _a.queueIdImportMessages, flowIdNotPhrase = _a.flowIdNotPhrase, flowIdWelcome = _a.flowIdWelcome, wavoip = _a.wavoip;
    return __awaiter(void 0, void 0, void 0, function () {
        var company, whatsappCount, schema, err_1, whatsappFound, oldDefaultWhatsapp, tokenSchema, err_2, whatsapp;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, Company_1["default"].findOne({
                        where: {
                            id: companyId
                        },
                        include: [{ model: Plan_1["default"], as: "plan" }]
                    })];
                case 1:
                    company = _j.sent();
                    if (!(company !== null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Whatsapp_1["default"].count({
                            where: {
                                companyId: companyId,
                                channel: channel
                            }
                        })];
                case 2:
                    whatsappCount = _j.sent();
                    if (whatsappCount >= company.plan.connections) {
                        throw new AppError_1["default"]("N\u00FAmero m\u00E1ximo de conex\u00F5es j\u00E1 alcan\u00E7ado: ".concat(whatsappCount));
                    }
                    _j.label = 3;
                case 3:
                    schema = Yup.object().shape({
                        name: Yup.string()
                            .required()
                            .min(2)
                            .test("Check-name", "Esse nome já está sendo utilizado por outra conexão", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                            var nameExists;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!value)
                                            return [2 /*return*/, false];
                                        return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                where: { name: value, channel: channel, companyId: companyId }
                                            })];
                                    case 1:
                                        nameExists = _a.sent();
                                        return [2 /*return*/, !nameExists];
                                }
                            });
                        }); }),
                        isDefault: Yup.boolean().required()
                    });
                    _j.label = 4;
                case 4:
                    _j.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, schema.validate({ name: name, status: status, isDefault: isDefault })];
                case 5:
                    _j.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _j.sent();
                    throw new AppError_1["default"](err_1.message);
                case 7: return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { companyId: companyId } })];
                case 8:
                    whatsappFound = _j.sent();
                    isDefault = channel === "whatsapp" ? !whatsappFound : false;
                    oldDefaultWhatsapp = null;
                    if (!(channel === 'whatsapp' && isDefault)) return [3 /*break*/, 11];
                    return [4 /*yield*/, Whatsapp_1["default"].findOne({
                            where: { isDefault: true, companyId: companyId, channel: channel }
                        })];
                case 9:
                    oldDefaultWhatsapp = _j.sent();
                    if (!oldDefaultWhatsapp) return [3 /*break*/, 11];
                    return [4 /*yield*/, oldDefaultWhatsapp.update({ isDefault: false, companyId: companyId })];
                case 10:
                    _j.sent();
                    _j.label = 11;
                case 11:
                    if (queueIds.length > 1 && !greetingMessage) {
                        throw new AppError_1["default"]("ERR_WAPP_GREETING_REQUIRED");
                    }
                    if (!(token !== null && token !== "")) return [3 /*break*/, 15];
                    tokenSchema = Yup.object().shape({
                        token: Yup.string()
                            .required()
                            .min(2)
                            .test("Check-token", "This whatsapp token is already used.", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                            var tokenExists;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!value)
                                            return [2 /*return*/, false];
                                        return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                where: { token: value, channel: channel }
                                            })];
                                    case 1:
                                        tokenExists = _a.sent();
                                        return [2 /*return*/, !tokenExists];
                                }
                            });
                        }); })
                    });
                    _j.label = 12;
                case 12:
                    _j.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, tokenSchema.validate({ token: token })];
                case 13:
                    _j.sent();
                    return [3 /*break*/, 15];
                case 14:
                    err_2 = _j.sent();
                    throw new AppError_1["default"](err_2.message);
                case 15: return [4 /*yield*/, Whatsapp_1["default"].create({
                        name: name,
                        status: status,
                        greetingMessage: greetingMessage,
                        complationMessage: complationMessage,
                        outOfHoursMessage: outOfHoursMessage,
                        ratingMessage: ratingMessage,
                        isDefault: isDefault,
                        companyId: companyId,
                        token: token,
                        wavoip: wavoip,
                        provider: provider,
                        channel: channel,
                        facebookUserId: facebookUserId,
                        facebookUserToken: facebookUserToken,
                        facebookPageUserId: facebookPageUserId,
                        tokenMeta: tokenMeta,
                        maxUseBotQueues: maxUseBotQueues,
                        timeUseBotQueues: timeUseBotQueues,
                        expiresTicket: expiresTicket,
                        allowGroup: allowGroup,
                        timeSendQueue: timeSendQueue,
                        sendIdQueue: sendIdQueue,
                        timeInactiveMessage: timeInactiveMessage,
                        inactiveMessage: inactiveMessage,
                        maxUseBotQueuesNPS: maxUseBotQueuesNPS,
                        expiresTicketNPS: expiresTicketNPS,
                        whenExpiresTicket: whenExpiresTicket,
                        expiresInactiveMessage: expiresInactiveMessage,
                        groupAsTicket: groupAsTicket,
                        importOldMessages: importOldMessages,
                        importRecentMessages: importRecentMessages,
                        closedTicketsPostImported: closedTicketsPostImported,
                        importOldMessagesGroups: importOldMessagesGroups,
                        timeCreateNewTicket: timeCreateNewTicket,
                        integrationId: integrationId,
                        schedules: schedules,
                        promptId: promptId,
                        collectiveVacationEnd: collectiveVacationEnd,
                        collectiveVacationMessage: collectiveVacationMessage,
                        collectiveVacationStart: collectiveVacationStart,
                        queueIdImportMessages: queueIdImportMessages,
                        flowIdNotPhrase: flowIdNotPhrase,
                        flowIdWelcome: flowIdWelcome
                    }, { include: ["queues"] })];
                case 16:
                    whatsapp = _j.sent();
                    return [4 /*yield*/, (0, AssociateWhatsappQueue_1["default"])(whatsapp, queueIds)];
                case 17:
                    _j.sent();
                    return [2 /*return*/, { whatsapp: whatsapp, oldDefaultWhatsapp: oldDefaultWhatsapp }];
            }
        });
    });
};
exports["default"] = CreateWhatsAppService;
