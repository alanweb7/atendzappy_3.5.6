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
var mustache_1 = __importDefault(require("mustache"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var ScheduledDispatchLog_1 = __importDefault(require("../../models/ScheduledDispatchLog"));
var ScheduledDispatcher_1 = __importDefault(require("../../models/ScheduledDispatcher"));
var Company_1 = __importDefault(require("../../models/Company"));
var FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
var SendWhatsAppMessage_1 = __importDefault(require("../WbotServices/SendWhatsAppMessage"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var dispatchQueue_1 = require("../../queues/dispatchQueue");
var logger_1 = __importDefault(require("../../utils/logger"));
var ensureTicket = function (contact, whatsapp, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, FindOrCreateTicketService_1["default"])(contact, whatsapp, 0, companyId, null, null, undefined, undefined, false)];
    });
}); };
var renderMessage = function (template, variables, ticket) {
    var filledTemplate = mustache_1["default"].render(template, variables || {});
    return (0, Mustache_1["default"])(filledTemplate, ticket);
};
var handleDispatchJob = function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, logId, dispatcherId, companyId, contactId, whatsappId, template, variables, log, dispatcher, contact, whatsapp, ticket, message, err_1, errorMessage;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = job.data, logId = _a.logId, dispatcherId = _a.dispatcherId, companyId = _a.companyId, contactId = _a.contactId, whatsappId = _a.whatsappId, template = _a.template, variables = _a.variables;
                return [4 /*yield*/, ScheduledDispatchLog_1["default"].findByPk(logId)];
            case 1:
                log = _b.sent();
                if (!log) {
                    logger_1["default"].warn("[DispatchQueue] Log ".concat(logId, " n\u00E3o encontrado, ignorando job"));
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 9, , 11]);
                return [4 /*yield*/, ScheduledDispatcher_1["default"].findByPk(dispatcherId)];
            case 3:
                dispatcher = _b.sent();
                if (!dispatcher) {
                    throw new Error("Dispatcher ".concat(dispatcherId, " n\u00E3o encontrado"));
                }
                return [4 /*yield*/, Contact_1["default"].findByPk(contactId, {
                        include: [Company_1["default"]]
                    })];
            case 4:
                contact = _b.sent();
                if (!contact) {
                    throw new Error("Contato ".concat(contactId, " n\u00E3o encontrado"));
                }
                if (!contact.number) {
                    throw new Error("Contato ".concat(contactId, " sem n\u00FAmero v\u00E1lido"));
                }
                return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
            case 5:
                whatsapp = _b.sent();
                if (!whatsapp) {
                    throw new Error("WhatsApp ".concat(whatsappId, " n\u00E3o encontrado"));
                }
                return [4 /*yield*/, ensureTicket(contact, whatsapp, companyId)];
            case 6:
                ticket = _b.sent();
                message = renderMessage(template, variables, ticket);
                if (!message || !message.trim()) {
                    throw new Error("Template de mensagem vazio após renderização");
                }
                return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                        body: message,
                        ticket: ticket
                    })];
            case 7:
                _b.sent();
                return [4 /*yield*/, log.update({
                        status: "sent",
                        ticketId: ticket.id,
                        sentAt: new Date(),
                        errorMessage: null
                    })];
            case 8:
                _b.sent();
                return [3 /*break*/, 11];
            case 9:
                err_1 = _b.sent();
                errorMessage = (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || JSON.stringify(err_1);
                return [4 /*yield*/, log.update({
                        status: "error",
                        errorMessage: errorMessage
                    })];
            case 10:
                _b.sent();
                logger_1["default"].error("[DispatchQueue] Falha no job ".concat(job.id, ": ").concat(errorMessage));
                throw err_1;
            case 11: return [2 /*return*/];
        }
    });
}); };
var startDispatchProcessor = function () {
    (0, dispatchQueue_1.processDispatchQueue)(handleDispatchJob);
    logger_1["default"].info("[DispatchQueue] Processor iniciado");
};
exports["default"] = startDispatchProcessor;
