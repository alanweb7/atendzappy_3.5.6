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
var sequelize_1 = require("sequelize");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var ShowWhatsAppService_1 = __importDefault(require("./ShowWhatsAppService"));
var AssociateWhatsappQueue_1 = __importDefault(require("./AssociateWhatsappQueue"));
var UpdateWhatsAppService = function (_a) {
    var whatsappData = _a.whatsappData, whatsappId = _a.whatsappId, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var schema, name, status, isDefault, session, greetingMessage, complationMessage, outOfHoursMessage, _b, queueIds, token, _c, maxUseBotQueues, _d, timeUseBotQueues, _e, expiresTicket, allowGroup, _f, timeSendQueue, _g, sendIdQueue, _h, timeInactiveMessage, inactiveMessage, ratingMessage, maxUseBotQueuesNPS, _j, expiresTicketNPS, whenExpiresTicket, expiresInactiveMessage, groupAsTicket, importOldMessages, importRecentMessages, closedTicketsPostImported, importOldMessagesGroups, _k, timeCreateNewTicket, integrationId, schedules, promptId, _l, requestQR, collectiveVacationEnd, collectiveVacationMessage, collectiveVacationStart, queueIdImportMessages, flowIdNotPhrase, flowIdWelcome, wavoip, outOfHoursQueueId, outOfHoursFlowId, err_1, oldDefaultWhatsapp, whatsapp;
        var _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    schema = Yup.object().shape({
                        name: Yup.string().min(2),
                        status: Yup.string(),
                        isDefault: Yup.boolean()
                    });
                    name = whatsappData.name, status = whatsappData.status, isDefault = whatsappData.isDefault, session = whatsappData.session, greetingMessage = whatsappData.greetingMessage, complationMessage = whatsappData.complationMessage, outOfHoursMessage = whatsappData.outOfHoursMessage, _b = whatsappData.queueIds, queueIds = _b === void 0 ? [] : _b, token = whatsappData.token, _c = whatsappData.maxUseBotQueues, maxUseBotQueues = _c === void 0 ? 0 : _c, _d = whatsappData.timeUseBotQueues, timeUseBotQueues = _d === void 0 ? 0 : _d, _e = whatsappData.expiresTicket, expiresTicket = _e === void 0 ? 0 : _e, allowGroup = whatsappData.allowGroup, _f = whatsappData.timeSendQueue, timeSendQueue = _f === void 0 ? 0 : _f, _g = whatsappData.sendIdQueue, sendIdQueue = _g === void 0 ? null : _g, _h = whatsappData.timeInactiveMessage, timeInactiveMessage = _h === void 0 ? 0 : _h, inactiveMessage = whatsappData.inactiveMessage, ratingMessage = whatsappData.ratingMessage, maxUseBotQueuesNPS = whatsappData.maxUseBotQueuesNPS, _j = whatsappData.expiresTicketNPS, expiresTicketNPS = _j === void 0 ? 0 : _j, whenExpiresTicket = whatsappData.whenExpiresTicket, expiresInactiveMessage = whatsappData.expiresInactiveMessage, groupAsTicket = whatsappData.groupAsTicket, importOldMessages = whatsappData.importOldMessages, importRecentMessages = whatsappData.importRecentMessages, closedTicketsPostImported = whatsappData.closedTicketsPostImported, importOldMessagesGroups = whatsappData.importOldMessagesGroups, _k = whatsappData.timeCreateNewTicket, timeCreateNewTicket = _k === void 0 ? null : _k, integrationId = whatsappData.integrationId, schedules = whatsappData.schedules, promptId = whatsappData.promptId, _l = whatsappData.requestQR, requestQR = _l === void 0 ? false : _l, collectiveVacationEnd = whatsappData.collectiveVacationEnd, collectiveVacationMessage = whatsappData.collectiveVacationMessage, collectiveVacationStart = whatsappData.collectiveVacationStart, queueIdImportMessages = whatsappData.queueIdImportMessages, flowIdNotPhrase = whatsappData.flowIdNotPhrase, flowIdWelcome = whatsappData.flowIdWelcome, wavoip = whatsappData.wavoip, outOfHoursQueueId = whatsappData.outOfHoursQueueId, outOfHoursFlowId = whatsappData.outOfHoursFlowId;
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, schema.validate({ name: name, status: status, isDefault: isDefault })];
                case 2:
                    _o.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _o.sent();
                    throw new AppError_1["default"](err_1.message);
                case 4:
                    if (queueIds.length > 1 && !greetingMessage) {
                        throw new AppError_1["default"]("ERR_WAPP_GREETING_REQUIRED");
                    }
                    oldDefaultWhatsapp = null;
                    if (!isDefault) return [3 /*break*/, 7];
                    return [4 /*yield*/, Whatsapp_1["default"].findOne({
                            where: {
                                isDefault: true,
                                id: (_m = {}, _m[sequelize_1.Op.not] = whatsappId, _m),
                                companyId: companyId
                            }
                        })];
                case 5:
                    oldDefaultWhatsapp = _o.sent();
                    if (!oldDefaultWhatsapp) return [3 /*break*/, 7];
                    return [4 /*yield*/, oldDefaultWhatsapp.update({ isDefault: false })];
                case 6:
                    _o.sent();
                    _o.label = 7;
                case 7: return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
                case 8:
                    whatsapp = _o.sent();
                    return [4 /*yield*/, whatsapp.update({
                            name: name,
                            status: status,
                            session: session,
                            greetingMessage: greetingMessage,
                            complationMessage: complationMessage,
                            outOfHoursMessage: outOfHoursMessage,
                            isDefault: isDefault,
                            companyId: companyId,
                            token: token,
                            maxUseBotQueues: maxUseBotQueues || 0,
                            timeUseBotQueues: timeUseBotQueues || 0,
                            expiresTicket: expiresTicket || 0,
                            allowGroup: allowGroup,
                            timeSendQueue: timeSendQueue,
                            sendIdQueue: sendIdQueue,
                            timeInactiveMessage: timeInactiveMessage,
                            inactiveMessage: inactiveMessage,
                            ratingMessage: ratingMessage,
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
                            flowIdWelcome: flowIdWelcome,
                            wavoip: wavoip,
                            outOfHoursQueueId: outOfHoursQueueId !== null && outOfHoursQueueId !== void 0 ? outOfHoursQueueId : null,
                            outOfHoursFlowId: outOfHoursFlowId !== null && outOfHoursFlowId !== void 0 ? outOfHoursFlowId : null
                        })];
                case 9:
                    _o.sent();
                    if (!!requestQR) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, AssociateWhatsappQueue_1["default"])(whatsapp, queueIds)];
                case 10:
                    _o.sent();
                    _o.label = 11;
                case 11: return [2 /*return*/, { whatsapp: whatsapp, oldDefaultWhatsapp: oldDefaultWhatsapp }];
            }
        });
    });
};
exports["default"] = UpdateWhatsAppService;
