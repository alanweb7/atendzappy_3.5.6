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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.showAdmin = exports.removeAdmin = exports.updateAdmin = exports.listAll = exports.restart = exports.remove = exports.closedTickets = exports.update = exports.show = exports.storeFacebook = exports.store = exports.indexFilter = exports.index = void 0;
var socket_1 = require("../libs/socket");
var cache_1 = __importDefault(require("../libs/cache"));
var wbot_1 = require("../libs/wbot");
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var DeleteBaileysService_1 = __importDefault(require("../services/BaileysServices/DeleteBaileysService"));
var ShowCompanyService_1 = __importDefault(require("../services/CompanyService/ShowCompanyService"));
var graphAPI_1 = require("../services/FacebookServices/graphAPI");
var ShowPlanService_1 = __importDefault(require("../services/PlanService/ShowPlanService"));
var StartWhatsAppSession_1 = require("../services/WbotServices/StartWhatsAppSession");
var CreateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/CreateWhatsAppService"));
var DeleteWhatsAppService_1 = __importDefault(require("../services/WhatsappService/DeleteWhatsAppService"));
var ListWhatsAppsService_1 = __importDefault(require("../services/WhatsappService/ListWhatsAppsService"));
var ShowWhatsAppService_1 = __importDefault(require("../services/WhatsappService/ShowWhatsAppService"));
var UpdateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/UpdateWhatsAppService"));
var ImportWhatsAppMessageService_1 = require("../services/WhatsappService/ImportWhatsAppMessageService");
var ShowWhatsAppServiceAdmin_1 = __importDefault(require("../services/WhatsappService/ShowWhatsAppServiceAdmin"));
var UpdateWhatsAppServiceAdmin_1 = __importDefault(require("../services/WhatsappService/UpdateWhatsAppServiceAdmin"));
var ListAllWhatsAppService_1 = __importDefault(require("../services/WhatsappService/ListAllWhatsAppService"));
var ListFilterWhatsAppsService_1 = __importDefault(require("../services/WhatsappService/ListFilterWhatsAppsService"));
var User_1 = __importDefault(require("../models/User"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, session, whatsapps, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                companyId = req.user.companyId;
                session = req.query.session;
                return [4 /*yield*/, (0, ListWhatsAppsService_1["default"])({ companyId: companyId, session: session })];
            case 1:
                whatsapps = _a.sent();
                return [2 /*return*/, res.status(200).json(whatsapps)];
            case 2:
                error_1 = _a.sent();
                console.error("Error in WhatsAppController.index:", error_1);
                if (!res.headersSent) {
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var indexFilter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, session, channel, whatsapps;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, session = _a.session, channel = _a.channel;
                return [4 /*yield*/, (0, ListFilterWhatsAppsService_1["default"])({ companyId: companyId, session: session, channel: channel })];
            case 1:
                whatsapps = _b.sent();
                return [2 /*return*/, res.status(200).json(whatsapps)];
        }
    });
}); };
exports.indexFilter = indexFilter;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, status, isDefault, greetingMessage, complationMessage, outOfHoursMessage, queueIds, token, maxUseBotQueues, timeUseBotQueues, expiresTicket, allowGroup, timeSendQueue, sendIdQueue, timeInactiveMessage, inactiveMessage, ratingMessage, maxUseBotQueuesNPS, expiresTicketNPS, whenExpiresTicket, expiresInactiveMessage, importOldMessages, importRecentMessages, closedTicketsPostImported, importOldMessagesGroups, groupAsTicket, timeCreateNewTicket, schedules, promptId, collectiveVacationEnd, collectiveVacationMessage, collectiveVacationStart, queueIdImportMessages, flowIdNotPhrase, flowIdWelcome, companyId, company, plan, _b, whatsapp, oldDefaultWhatsapp, io;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, status = _a.status, isDefault = _a.isDefault, greetingMessage = _a.greetingMessage, complationMessage = _a.complationMessage, outOfHoursMessage = _a.outOfHoursMessage, queueIds = _a.queueIds, token = _a.token, maxUseBotQueues = _a.maxUseBotQueues, timeUseBotQueues = _a.timeUseBotQueues, expiresTicket = _a.expiresTicket, allowGroup = _a.allowGroup, timeSendQueue = _a.timeSendQueue, sendIdQueue = _a.sendIdQueue, timeInactiveMessage = _a.timeInactiveMessage, inactiveMessage = _a.inactiveMessage, ratingMessage = _a.ratingMessage, maxUseBotQueuesNPS = _a.maxUseBotQueuesNPS, expiresTicketNPS = _a.expiresTicketNPS, whenExpiresTicket = _a.whenExpiresTicket, expiresInactiveMessage = _a.expiresInactiveMessage, importOldMessages = _a.importOldMessages, importRecentMessages = _a.importRecentMessages, closedTicketsPostImported = _a.closedTicketsPostImported, importOldMessagesGroups = _a.importOldMessagesGroups, groupAsTicket = _a.groupAsTicket, timeCreateNewTicket = _a.timeCreateNewTicket, schedules = _a.schedules, promptId = _a.promptId, collectiveVacationEnd = _a.collectiveVacationEnd, collectiveVacationMessage = _a.collectiveVacationMessage, collectiveVacationStart = _a.collectiveVacationStart, queueIdImportMessages = _a.queueIdImportMessages, flowIdNotPhrase = _a.flowIdNotPhrase, flowIdWelcome = _a.flowIdWelcome;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(companyId)];
            case 1:
                company = _c.sent();
                return [4 /*yield*/, (0, ShowPlanService_1["default"])(company.planId)];
            case 2:
                plan = _c.sent();
                if (!plan.useWhatsapp) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Você não possui permissão para acessar este recurso!"
                        })];
                }
                console.log("================ WhatsAppController ==============");
                console.log(req.body);
                console.log("==================================================");
                return [4 /*yield*/, (0, CreateWhatsAppService_1["default"])({
                        name: name,
                        status: status,
                        isDefault: isDefault,
                        greetingMessage: greetingMessage,
                        complationMessage: complationMessage,
                        outOfHoursMessage: outOfHoursMessage,
                        queueIds: queueIds,
                        companyId: companyId,
                        token: token,
                        maxUseBotQueues: maxUseBotQueues,
                        timeUseBotQueues: timeUseBotQueues,
                        expiresTicket: expiresTicket,
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
                        importOldMessages: importOldMessages,
                        importRecentMessages: importRecentMessages,
                        closedTicketsPostImported: closedTicketsPostImported,
                        importOldMessagesGroups: importOldMessagesGroups,
                        groupAsTicket: groupAsTicket,
                        timeCreateNewTicket: timeCreateNewTicket,
                        schedules: schedules,
                        promptId: promptId,
                        collectiveVacationEnd: collectiveVacationEnd,
                        collectiveVacationMessage: collectiveVacationMessage,
                        collectiveVacationStart: collectiveVacationStart,
                        queueIdImportMessages: queueIdImportMessages,
                        flowIdNotPhrase: flowIdNotPhrase,
                        flowIdWelcome: flowIdWelcome
                    })];
            case 3:
                _b = _c.sent(), whatsapp = _b.whatsapp, oldDefaultWhatsapp = _b.oldDefaultWhatsapp;
                (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, companyId);
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-whatsapp"), {
                    action: "update",
                    whatsapp: whatsapp
                });
                if (oldDefaultWhatsapp) {
                    io.of(String(companyId))
                        .emit("company-".concat(companyId, "-whatsapp"), {
                        action: "update",
                        whatsapp: oldDefaultWhatsapp
                    });
                }
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.store = store;
var storeFacebook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, facebookUserId, facebookUserToken, addInstagram, companyId, data, io, pages, _b, data_1, data_1_1, page, name_1, access_token, id, instagram_business_account, acessTokenPage, instagramId, username, instagramName, e_1_1, _c, pages_1, pages_1_1, pageConection, exist, whatsapp, e_2_1, error_2;
    var _d, e_1, _e, _f, _g, e_2, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 39, , 40]);
                _a = req.body, facebookUserId = _a.facebookUserId, facebookUserToken = _a.facebookUserToken, addInstagram = _a.addInstagram;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, graphAPI_1.getPageProfile)(facebookUserId, facebookUserToken)];
            case 1:
                data = (_k.sent()).data;
                if (data.length === 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Facebook page not found 1"
                        })];
                }
                io = (0, socket_1.getIO)();
                pages = [];
                _k.label = 2;
            case 2:
                _k.trys.push([2, 14, 15, 20]);
                _b = true, data_1 = __asyncValues(data);
                _k.label = 3;
            case 3: return [4 /*yield*/, data_1.next()];
            case 4:
                if (!(data_1_1 = _k.sent(), _d = data_1_1.done, !_d)) return [3 /*break*/, 13];
                _f = data_1_1.value;
                _b = false;
                _k.label = 5;
            case 5:
                _k.trys.push([5, , 11, 12]);
                page = _f;
                name_1 = page.name, access_token = page.access_token, id = page.id, instagram_business_account = page.instagram_business_account;
                return [4 /*yield*/, (0, graphAPI_1.getAccessTokenFromPage)(access_token)];
            case 6:
                acessTokenPage = _k.sent();
                if (!(instagram_business_account && addInstagram)) return [3 /*break*/, 8];
                instagramId = instagram_business_account.id, username = instagram_business_account.username, instagramName = instagram_business_account.name;
                pages.push({
                    companyId: companyId,
                    name: "Insta ".concat(username || instagramName),
                    facebookUserId: facebookUserId,
                    facebookPageUserId: instagramId,
                    facebookUserToken: acessTokenPage,
                    tokenMeta: facebookUserToken,
                    isDefault: false,
                    channel: "instagram",
                    status: "CONNECTED",
                    greetingMessage: "",
                    farewellMessage: "",
                    queueIds: [],
                    isMultidevice: false
                });
                // Para conexões iniciadas pelo fluxo de Instagram (addInstagram = true),
                // criamos apenas o canal "instagram" e não adicionamos uma conexão
                // extra de Facebook para a mesma página.
                return [4 /*yield*/, (0, graphAPI_1.subscribeApp)(id, acessTokenPage)];
            case 7:
                // Para conexões iniciadas pelo fluxo de Instagram (addInstagram = true),
                // criamos apenas o canal "instagram" e não adicionamos uma conexão
                // extra de Facebook para a mesma página.
                _k.sent();
                _k.label = 8;
            case 8:
                if (!!instagram_business_account) return [3 /*break*/, 10];
                pages.push({
                    companyId: companyId,
                    name: name_1,
                    facebookUserId: facebookUserId,
                    facebookPageUserId: id,
                    facebookUserToken: acessTokenPage,
                    tokenMeta: facebookUserToken,
                    isDefault: false,
                    channel: "facebook",
                    status: "CONNECTED",
                    greetingMessage: "",
                    farewellMessage: "",
                    queueIds: [],
                    isMultidevice: false
                });
                return [4 /*yield*/, (0, graphAPI_1.subscribeApp)(page.id, acessTokenPage)];
            case 9:
                _k.sent();
                _k.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                _b = true;
                return [7 /*endfinally*/];
            case 12: return [3 /*break*/, 3];
            case 13: return [3 /*break*/, 20];
            case 14:
                e_1_1 = _k.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 20];
            case 15:
                _k.trys.push([15, , 18, 19]);
                if (!(!_b && !_d && (_e = data_1["return"]))) return [3 /*break*/, 17];
                return [4 /*yield*/, _e.call(data_1)];
            case 16:
                _k.sent();
                _k.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 19: return [7 /*endfinally*/];
            case 20:
                _k.trys.push([20, 32, 33, 38]);
                _c = true, pages_1 = __asyncValues(pages);
                _k.label = 21;
            case 21: return [4 /*yield*/, pages_1.next()];
            case 22:
                if (!(pages_1_1 = _k.sent(), _g = pages_1_1.done, !_g)) return [3 /*break*/, 31];
                _j = pages_1_1.value;
                _c = false;
                _k.label = 23;
            case 23:
                _k.trys.push([23, , 29, 30]);
                pageConection = _j;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            facebookPageUserId: pageConection.facebookPageUserId
                        }
                    })];
            case 24:
                exist = _k.sent();
                if (!exist) return [3 /*break*/, 26];
                return [4 /*yield*/, exist.update(__assign({}, pageConection))];
            case 25:
                _k.sent();
                _k.label = 26;
            case 26:
                if (!!exist) return [3 /*break*/, 28];
                return [4 /*yield*/, (0, CreateWhatsAppService_1["default"])(pageConection)];
            case 27:
                whatsapp = (_k.sent()).whatsapp;
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-whatsapp"), {
                    action: "update",
                    whatsapp: whatsapp
                });
                _k.label = 28;
            case 28: return [3 /*break*/, 30];
            case 29:
                _c = true;
                return [7 /*endfinally*/];
            case 30: return [3 /*break*/, 21];
            case 31: return [3 /*break*/, 38];
            case 32:
                e_2_1 = _k.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 38];
            case 33:
                _k.trys.push([33, , 36, 37]);
                if (!(!_c && !_g && (_h = pages_1["return"]))) return [3 /*break*/, 35];
                return [4 /*yield*/, _h.call(pages_1)];
            case 34:
                _k.sent();
                _k.label = 35;
            case 35: return [3 /*break*/, 37];
            case 36:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 37: return [7 /*endfinally*/];
            case 38: return [2 /*return*/, res.status(200)];
            case 39:
                error_2 = _k.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(400).json({
                        error: "Facebook page not found 2"
                    })];
            case 40: return [2 /*return*/];
        }
    });
}); };
exports.storeFacebook = storeFacebook;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, session, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                session = req.query.session;
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId, session)];
            case 1:
                whatsapp = _a.sent();
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, whatsappData, companyId, _a, whatsapp, oldDefaultWhatsapp, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                whatsappData = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateWhatsAppService_1["default"])({
                        whatsappData: whatsappData,
                        whatsappId: whatsappId,
                        companyId: companyId
                    })];
            case 1:
                _a = _b.sent(), whatsapp = _a.whatsapp, oldDefaultWhatsapp = _a.oldDefaultWhatsapp;
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-whatsapp"), {
                    action: "update",
                    whatsapp: whatsapp
                });
                if (oldDefaultWhatsapp) {
                    io.of(String(companyId))
                        .emit("company-".concat(companyId, "-whatsapp"), {
                        action: "update",
                        whatsapp: oldDefaultWhatsapp
                    });
                }
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.update = update;
var closedTickets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId;
    return __generator(this, function (_a) {
        whatsappId = req.params.whatsappId;
        (0, ImportWhatsAppMessageService_1.closeTicketsImported)(whatsappId);
        return [2 /*return*/, res.status(200).json("whatsapp")];
    });
}); };
exports.closedTickets = closedTickets;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, _a, companyId, profile, io, whatsapp, id, token, facebookUserToken, getAllSameToken, _b, getAllSameToken_1, getAllSameToken_1_1, whatsapp_1, e_3_1;
    var _c, e_3, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                _a = req.user, companyId = _a.companyId, profile = _a.profile;
                io = (0, socket_1.getIO)();
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                console.log("REMOVING WHATSAPP", whatsappId);
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _f.sent();
                if (!(whatsapp.notificameHub === true)) return [3 /*break*/, 3];
                id = whatsapp.id, token = whatsapp.token;
                return [4 /*yield*/, Whatsapp_1["default"].destroy({
                        where: {
                            id: id,
                            token: token
                        }
                    })];
            case 2:
                _f.sent();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-whatsapp"), {
                    action: "delete",
                    whatsappId: id
                });
                _f.label = 3;
            case 3:
                if (!(whatsapp.channel === "whatsapp")) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, DeleteBaileysService_1["default"])(whatsappId)];
            case 4:
                _f.sent();
                return [4 /*yield*/, (0, DeleteWhatsAppService_1["default"])(whatsappId)];
            case 5:
                _f.sent();
                return [4 /*yield*/, cache_1["default"].delFromPattern("sessions:".concat(whatsappId, ":*"))];
            case 6:
                _f.sent();
                (0, wbot_1.removeWbot)(+whatsappId);
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-whatsapp"), {
                    action: "delete",
                    whatsappId: +whatsappId
                });
                _f.label = 7;
            case 7:
                if (!(whatsapp.channel === "facebook" || whatsapp.channel === "instagram")) return [3 /*break*/, 21];
                facebookUserToken = whatsapp.facebookUserToken;
                return [4 /*yield*/, Whatsapp_1["default"].findAll({
                        where: {
                            facebookUserToken: facebookUserToken
                        }
                    })];
            case 8:
                getAllSameToken = _f.sent();
                return [4 /*yield*/, Whatsapp_1["default"].destroy({
                        where: {
                            facebookUserToken: facebookUserToken
                        }
                    })];
            case 9:
                _f.sent();
                _f.label = 10;
            case 10:
                _f.trys.push([10, 15, 16, 21]);
                _b = true, getAllSameToken_1 = __asyncValues(getAllSameToken);
                _f.label = 11;
            case 11: return [4 /*yield*/, getAllSameToken_1.next()];
            case 12:
                if (!(getAllSameToken_1_1 = _f.sent(), _c = getAllSameToken_1_1.done, !_c)) return [3 /*break*/, 14];
                _e = getAllSameToken_1_1.value;
                _b = false;
                try {
                    whatsapp_1 = _e;
                    io.of(String(companyId))
                        .emit("company-".concat(companyId, "-whatsapp"), {
                        action: "delete",
                        whatsappId: whatsapp_1.id
                    });
                }
                finally {
                    _b = true;
                }
                _f.label = 13;
            case 13: return [3 /*break*/, 11];
            case 14: return [3 /*break*/, 21];
            case 15:
                e_3_1 = _f.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 21];
            case 16:
                _f.trys.push([16, , 19, 20]);
                if (!(!_b && !_c && (_d = getAllSameToken_1["return"]))) return [3 /*break*/, 18];
                return [4 /*yield*/, _d.call(getAllSameToken_1)];
            case 17:
                _f.sent();
                _f.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 20: return [7 /*endfinally*/];
            case 21: return [2 /*return*/, res.status(200).json({ message: "Session disconnected." })];
        }
    });
}); };
exports.remove = remove;
var restart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, profile, id, user, allowConnections;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, profile = _a.profile, id = _a.id;
                return [4 /*yield*/, User_1["default"].findByPk(id)];
            case 1:
                user = _b.sent();
                allowConnections = user.allowConnections;
                if (profile !== "admin" && allowConnections === "disabled") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                return [4 /*yield*/, (0, wbot_1.restartWbot)(companyId)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Whatsapp restart." })];
        }
    });
}); };
exports.restart = restart;
var listAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, session, whatsapps;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                session = req.query.session;
                return [4 /*yield*/, (0, ListAllWhatsAppService_1["default"])({ session: session })];
            case 1:
                whatsapps = _a.sent();
                return [2 /*return*/, res.status(200).json(whatsapps)];
        }
    });
}); };
exports.listAll = listAll;
var updateAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, whatsappData, companyId, _a, whatsapp, oldDefaultWhatsapp, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                whatsappData = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateWhatsAppServiceAdmin_1["default"])({
                        whatsappData: whatsappData,
                        whatsappId: whatsappId,
                        companyId: companyId
                    })];
            case 1:
                _a = _b.sent(), whatsapp = _a.whatsapp, oldDefaultWhatsapp = _a.oldDefaultWhatsapp;
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("admin-whatsapp", {
                    action: "update",
                    whatsapp: whatsapp
                });
                if (oldDefaultWhatsapp) {
                    io.of(String(companyId))
                        .emit("admin-whatsapp", {
                        action: "update",
                        whatsapp: oldDefaultWhatsapp
                    });
                }
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.updateAdmin = updateAdmin;
var removeAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, io, whatsapp, facebookUserToken, getAllSameToken, _a, getAllSameToken_2, getAllSameToken_2_1, whatsapp_2, e_4_1;
    var _b, e_4, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                io = (0, socket_1.getIO)();
                console.log("REMOVING WHATSAPP ADMIN", whatsappId);
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _e.sent();
                if (!(whatsapp.channel === "whatsapp")) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, DeleteBaileysService_1["default"])(whatsappId)];
            case 2:
                _e.sent();
                return [4 /*yield*/, (0, DeleteWhatsAppService_1["default"])(whatsappId)];
            case 3:
                _e.sent();
                return [4 /*yield*/, cache_1["default"].delFromPattern("sessions:".concat(whatsappId, ":*"))];
            case 4:
                _e.sent();
                (0, wbot_1.removeWbot)(+whatsappId);
                io.of(String(companyId))
                    .emit("admin-whatsapp", {
                    action: "delete",
                    whatsappId: +whatsappId
                });
                _e.label = 5;
            case 5:
                if (!(whatsapp.channel === "facebook" || whatsapp.channel === "instagram")) return [3 /*break*/, 19];
                facebookUserToken = whatsapp.facebookUserToken;
                return [4 /*yield*/, Whatsapp_1["default"].findAll({
                        where: {
                            facebookUserToken: facebookUserToken
                        }
                    })];
            case 6:
                getAllSameToken = _e.sent();
                return [4 /*yield*/, Whatsapp_1["default"].destroy({
                        where: {
                            facebookUserToken: facebookUserToken
                        }
                    })];
            case 7:
                _e.sent();
                _e.label = 8;
            case 8:
                _e.trys.push([8, 13, 14, 19]);
                _a = true, getAllSameToken_2 = __asyncValues(getAllSameToken);
                _e.label = 9;
            case 9: return [4 /*yield*/, getAllSameToken_2.next()];
            case 10:
                if (!(getAllSameToken_2_1 = _e.sent(), _b = getAllSameToken_2_1.done, !_b)) return [3 /*break*/, 12];
                _d = getAllSameToken_2_1.value;
                _a = false;
                try {
                    whatsapp_2 = _d;
                    io.of(String(companyId))
                        .emit("company-".concat(companyId, "-whatsapp"), {
                        action: "delete",
                        whatsappId: whatsapp_2.id
                    });
                }
                finally {
                    _a = true;
                }
                _e.label = 11;
            case 11: return [3 /*break*/, 9];
            case 12: return [3 /*break*/, 19];
            case 13:
                e_4_1 = _e.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 19];
            case 14:
                _e.trys.push([14, , 17, 18]);
                if (!(!_a && !_b && (_c = getAllSameToken_2["return"]))) return [3 /*break*/, 16];
                return [4 /*yield*/, _c.call(getAllSameToken_2)];
            case 15:
                _e.sent();
                _e.label = 16;
            case 16: return [3 /*break*/, 18];
            case 17:
                if (e_4) throw e_4.error;
                return [7 /*endfinally*/];
            case 18: return [7 /*endfinally*/];
            case 19: return [2 /*return*/, res.status(200).json({ message: "Session disconnected." })];
        }
    });
}); };
exports.removeAdmin = removeAdmin;
var showAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowWhatsAppServiceAdmin_1["default"])(whatsappId)];
            case 1:
                whatsapp = _a.sent();
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.showAdmin = showAdmin;
