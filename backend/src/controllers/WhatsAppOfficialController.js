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
exports.webhookOfficial = exports.checkStatus = exports.listTemplates = exports.sendMessage = exports.removeOfficial = exports.showOfficial = exports.updateOfficial = exports.storeOfficial = void 0;
var crypto_1 = __importDefault(require("crypto"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var CreateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/CreateWhatsAppService"));
var ShowWhatsAppService_1 = __importDefault(require("../services/WhatsappService/ShowWhatsAppService"));
var UpdateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/UpdateWhatsAppService"));
var DeleteWhatsAppService_1 = __importDefault(require("../services/WhatsappService/DeleteWhatsAppService"));
var SendTextOfficialService_1 = require("../services/WhatsAppOfficial/SendTextOfficialService");
var SendMediaOfficialService_1 = require("../services/WhatsAppOfficial/SendMediaOfficialService");
var OfficialMessageListener_1 = require("../services/WhatsAppOfficial/OfficialMessageListener");
var ListTemplatesService_1 = require("../services/WhatsAppOfficial/ListTemplatesService");
var Ticket_1 = __importDefault(require("../models/Ticket"));
var Contact_1 = __importDefault(require("../models/Contact"));
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var graphApiHelper_1 = require("../services/WhatsappCoexistence/graphApiHelper");
var upload = (0, multer_1["default"])(upload_1["default"]);
var storeOfficial = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, _b, queueIds, greetingMessage, complationMessage, outOfHoursMessage, ratingMessage, _c, isDefault, _d, allowGroup, sendIdQueue, timeSendQueue, timeInactiveMessage, inactiveMessage, maxUseBotQueuesNPS, expiresTicketNPS, whenExpiresTicket, expiresInactiveMessage, groupAsTicket, importOldMessages, importRecentMessages, closedTicketsPostImported, importOldMessagesGroups, timeCreateNewTicket, schedules, promptId, collectiveVacationEnd, collectiveVacationMessage, collectiveVacationStart, queueIdImportMessages, flowIdNotPhrase, flowIdWelcome, coexistencePhoneNumberId, coexistenceWabaId, coexistencePermanentToken, _e, messageRoutingMode, _f, routingRules, companyId, whatsapp, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = req.body, name = _a.name, _b = _a.queueIds, queueIds = _b === void 0 ? [] : _b, greetingMessage = _a.greetingMessage, complationMessage = _a.complationMessage, outOfHoursMessage = _a.outOfHoursMessage, ratingMessage = _a.ratingMessage, _c = _a.isDefault, isDefault = _c === void 0 ? false : _c, _d = _a.allowGroup, allowGroup = _d === void 0 ? false : _d, sendIdQueue = _a.sendIdQueue, timeSendQueue = _a.timeSendQueue, timeInactiveMessage = _a.timeInactiveMessage, inactiveMessage = _a.inactiveMessage, maxUseBotQueuesNPS = _a.maxUseBotQueuesNPS, expiresTicketNPS = _a.expiresTicketNPS, whenExpiresTicket = _a.whenExpiresTicket, expiresInactiveMessage = _a.expiresInactiveMessage, groupAsTicket = _a.groupAsTicket, importOldMessages = _a.importOldMessages, importRecentMessages = _a.importRecentMessages, closedTicketsPostImported = _a.closedTicketsPostImported, importOldMessagesGroups = _a.importOldMessagesGroups, timeCreateNewTicket = _a.timeCreateNewTicket, schedules = _a.schedules, promptId = _a.promptId, collectiveVacationEnd = _a.collectiveVacationEnd, collectiveVacationMessage = _a.collectiveVacationMessage, collectiveVacationStart = _a.collectiveVacationStart, queueIdImportMessages = _a.queueIdImportMessages, flowIdNotPhrase = _a.flowIdNotPhrase, flowIdWelcome = _a.flowIdWelcome, coexistencePhoneNumberId = _a.coexistencePhoneNumberId, coexistenceWabaId = _a.coexistenceWabaId, coexistencePermanentToken = _a.coexistencePermanentToken, _e = _a.messageRoutingMode, messageRoutingMode = _e === void 0 ? "automatic" : _e, _f = _a.routingRules, routingRules = _f === void 0 ? null : _f;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateWhatsAppService_1["default"])({
                        name: name,
                        status: "DISCONNECTED",
                        isDefault: isDefault,
                        greetingMessage: greetingMessage,
                        complationMessage: complationMessage,
                        outOfHoursMessage: outOfHoursMessage,
                        ratingMessage: ratingMessage,
                        queueIds: queueIds,
                        companyId: companyId,
                        channel: "whatsapp_official",
                        allowGroup: allowGroup,
                        sendIdQueue: sendIdQueue,
                        timeSendQueue: timeSendQueue,
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
                        schedules: schedules,
                        promptId: promptId,
                        collectiveVacationEnd: collectiveVacationEnd,
                        collectiveVacationMessage: collectiveVacationMessage,
                        collectiveVacationStart: collectiveVacationStart,
                        queueIdImportMessages: queueIdImportMessages,
                        flowIdNotPhrase: flowIdNotPhrase,
                        flowIdWelcome: flowIdWelcome
                    })];
            case 1:
                whatsapp = (_h.sent()).whatsapp;
                // Atualiza campos específicos da API oficial
                return [4 /*yield*/, whatsapp.update({
                        coexistenceEnabled: true,
                        coexistencePhoneNumberId: coexistencePhoneNumberId,
                        coexistenceWabaId: coexistenceWabaId,
                        coexistencePermanentToken: coexistencePermanentToken,
                        messageRoutingMode: messageRoutingMode,
                        routingRules: routingRules,
                        businessAppConnected: false
                    })];
            case 2:
                // Atualiza campos específicos da API oficial
                _h.sent();
                _h.label = 3;
            case 3:
                _h.trys.push([3, 6, , 8]);
                return [4 /*yield*/, (0, graphApiHelper_1.graphRequest)(coexistencePermanentToken, "get", "".concat(coexistencePhoneNumberId, "?fields=id"))];
            case 4:
                _h.sent();
                return [4 /*yield*/, whatsapp.update({ status: "CONNECTED" })];
            case 5:
                _h.sent();
                return [3 /*break*/, 8];
            case 6:
                _g = _h.sent();
                return [4 /*yield*/, whatsapp.update({ status: "DISCONNECTED" })];
            case 7:
                _h.sent();
                return [3 /*break*/, 8];
            case 8: return [4 /*yield*/, whatsapp.reload()];
            case 9:
                _h.sent();
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.storeOfficial = storeOfficial;
var updateOfficial = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, whatsappData, companyId, whatsapp, updated, _a, coexistencePhoneNumberId, coexistenceWabaId, coexistencePermanentToken, messageRoutingMode, routingRules, phoneId, token, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                whatsappData = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _c.sent();
                if (!whatsapp || whatsapp.channel !== "whatsapp_official") {
                    throw new AppError_1["default"]("ERR_OFFICIAL_CONNECTION_NOT_FOUND", 404);
                }
                return [4 /*yield*/, (0, UpdateWhatsAppService_1["default"])({
                        whatsappData: whatsappData,
                        whatsappId: whatsappId,
                        companyId: companyId
                    })];
            case 2:
                updated = (_c.sent()).whatsapp;
                _a = req.body, coexistencePhoneNumberId = _a.coexistencePhoneNumberId, coexistenceWabaId = _a.coexistenceWabaId, coexistencePermanentToken = _a.coexistencePermanentToken, messageRoutingMode = _a.messageRoutingMode, routingRules = _a.routingRules;
                if (!(coexistencePhoneNumberId || coexistenceWabaId || coexistencePermanentToken || messageRoutingMode || routingRules)) return [3 /*break*/, 11];
                return [4 /*yield*/, updated.update(__assign(__assign(__assign(__assign(__assign({}, (coexistencePhoneNumberId && { coexistencePhoneNumberId: coexistencePhoneNumberId })), (coexistenceWabaId && { coexistenceWabaId: coexistenceWabaId })), (coexistencePermanentToken && { coexistencePermanentToken: coexistencePermanentToken })), (messageRoutingMode && { messageRoutingMode: messageRoutingMode })), (routingRules && { routingRules: routingRules })))];
            case 3:
                _c.sent();
                phoneId = coexistencePhoneNumberId || whatsapp.coexistencePhoneNumberId;
                token = coexistencePermanentToken || whatsapp.coexistencePermanentToken;
                _c.label = 4;
            case 4:
                _c.trys.push([4, 7, , 9]);
                return [4 /*yield*/, (0, graphApiHelper_1.graphRequest)(token, "get", "".concat(phoneId, "?fields=id"))];
            case 5:
                _c.sent();
                return [4 /*yield*/, updated.update({ status: "CONNECTED" })];
            case 6:
                _c.sent();
                return [3 /*break*/, 9];
            case 7:
                _b = _c.sent();
                return [4 /*yield*/, updated.update({ status: "DISCONNECTED" })];
            case 8:
                _c.sent();
                return [3 /*break*/, 9];
            case 9: return [4 /*yield*/, updated.reload()];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11: return [2 /*return*/, res.status(200).json(updated)];
        }
    });
}); };
exports.updateOfficial = updateOfficial;
var showOfficial = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp || whatsapp.channel !== "whatsapp_official") {
                    throw new AppError_1["default"]("ERR_OFFICIAL_CONNECTION_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.showOfficial = showOfficial;
var removeOfficial = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, _a, companyId, profile, whatsapp;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                _a = req.user, companyId = _a.companyId, profile = _a.profile;
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _b.sent();
                if (!whatsapp || whatsapp.channel !== "whatsapp_official") {
                    throw new AppError_1["default"]("ERR_OFFICIAL_CONNECTION_NOT_FOUND", 404);
                }
                return [4 /*yield*/, (0, DeleteWhatsAppService_1["default"])(whatsappId)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "WhatsApp Oficial removido" })];
        }
    });
}); };
exports.removeOfficial = removeOfficial;
var sendMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, ticketId, medias, companyId, ticket, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                message = req.body.body;
                ticketId = req.params.ticketId;
                medias = req.files;
                companyId = req.user.companyId;
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId, {
                        include: [
                            { model: Contact_1["default"], as: "contact", attributes: ["number"] },
                            { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "token", "channel", "companyId", "coexistencePhoneNumberId", "coexistencePermanentToken"] }
                        ]
                    })];
            case 1:
                ticket = _a.sent();
                if (!ticket || ticket.whatsapp.channel !== "whatsapp_official") {
                    throw new AppError_1["default"]("ERR_OFFICIAL_TICKET_NOT_FOUND", 404);
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                if (!(medias && medias.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, SendMediaOfficialService_1.SendMediaOfficialService)({
                                        media: media,
                                        body: message,
                                        ticketId: ticket.id,
                                        contact: ticket.contact,
                                        connection: ticket.whatsapp
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({
                    body: message,
                    ticketId: ticket.id,
                    contact: ticket.contact,
                    connection: ticket.whatsapp
                })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, res.status(200).json({ message: "Mensagem enviada com sucesso" })];
            case 7:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).json({ message: error_1 })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var listTemplates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, templates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListTemplatesService_1.ListTemplatesService)(Number(whatsappId), companyId)];
            case 1:
                templates = _a.sent();
                return [2 /*return*/, res.status(200).json(templates)];
        }
    });
}); };
exports.listTemplates = listTemplates;
var validateWebhookSignature = function (req) {
    var appSecret = process.env.FACEBOOK_APP_SECRET;
    if (!appSecret)
        return true; // sem secret configurado, pula validação
    var signature = req.headers["x-hub-signature-256"];
    if (!signature)
        return false;
    var rawBody = req.rawBody;
    if (!rawBody)
        return false;
    var expected = "sha256=".concat(crypto_1["default"]
        .createHmac("sha256", appSecret)
        .update(rawBody)
        .digest("hex"));
    return crypto_1["default"].timingSafeEqual(Buffer.from(signature, "utf8"), Buffer.from(expected, "utf8"));
};
var checkStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, whatsapp, token, phoneNumberId, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { id: id, companyId: companyId, channel: "whatsapp_official" } })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp)
                    throw new AppError_1["default"]("Conexão não encontrada", 404);
                token = whatsapp.coexistencePermanentToken;
                phoneNumberId = whatsapp.coexistencePhoneNumberId;
                if (!(!token || !phoneNumberId)) return [3 /*break*/, 3];
                return [4 /*yield*/, whatsapp.update({ status: "DISCONNECTED" })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ status: "DISCONNECTED", reason: "Credenciais não configuradas" })];
            case 3:
                _a.trys.push([3, 6, , 8]);
                return [4 /*yield*/, (0, graphApiHelper_1.graphRequest)(token, "get", "".concat(phoneNumberId, "?fields=id,display_phone_number"))];
            case 4:
                _a.sent();
                return [4 /*yield*/, whatsapp.update({ status: "CONNECTED" })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.json({ status: "CONNECTED" })];
            case 6:
                e_1 = _a.sent();
                return [4 /*yield*/, whatsapp.update({ status: "DISCONNECTED" })];
            case 7:
                _a.sent();
                return [2 /*return*/, res.json({ status: "DISCONNECTED", reason: (0, graphApiHelper_1.extractGraphError)(e_1) })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.checkStatus = checkStatus;
var webhookOfficial = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var challenge;
    return __generator(this, function (_a) {
        challenge = req.query["hub.challenge"];
        // Verificação de registro do webhook pelo parceiro/Meta — devolve o challenge em texto puro
        if (challenge) {
            return [2 /*return*/, res.status(200).send(String(challenge))];
        }
        // Validar assinatura HMAC-SHA256 antes de processar eventos POST
        if (!validateWebhookSignature(req)) {
            return [2 /*return*/, res.status(403).send("Invalid signature")];
        }
        // Meta exige resposta 200 imediata (timeout ~5s). Processa em background.
        res.status(200).send("EVENT_RECEIVED");
        (0, OfficialMessageListener_1.OfficialMessageListener)(req.body)["catch"](function (error) {
            return console.error("[webhookOfficial] Erro ao processar evento:", error);
        });
        return [2 /*return*/, res];
    });
}); };
exports.webhookOfficial = webhookOfficial;
