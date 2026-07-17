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
exports.processNoResponseAutomations = void 0;
var sequelize_1 = require("sequelize");
var moment_1 = __importDefault(require("moment"));
var Automation_1 = __importDefault(require("../../models/Automation"));
var AutomationAction_1 = __importDefault(require("../../models/AutomationAction"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Message_1 = __importDefault(require("../../models/Message"));
var logger_1 = __importDefault(require("../../utils/logger"));
var ProcessAutomationService_1 = require("./ProcessAutomationService");
// Processar automações de "sem resposta" (lead não respondeu há X horas)
var processNoResponseAutomations = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var automations, _i, automations_1, automation, _a, hoursWithoutResponse, onlyOpenTickets, limitDate, statusCondition, tickets, _b, tickets_1, ticket, lastMessage, messageDate, hoursSinceMessage, error_1, error_2;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 12, , 13]);
                return [4 /*yield*/, Automation_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            triggerType: "no_response",
                            isActive: true
                        },
                        include: [
                            {
                                model: AutomationAction_1["default"],
                                as: "actions",
                                separate: true,
                                order: [["order", "ASC"]]
                            }
                        ]
                    })];
            case 1:
                automations = _e.sent();
                if (automations.length === 0) {
                    return [2 /*return*/];
                }
                _i = 0, automations_1 = automations;
                _e.label = 2;
            case 2:
                if (!(_i < automations_1.length)) return [3 /*break*/, 11];
                automation = automations_1[_i];
                _a = automation.triggerConfig || {}, hoursWithoutResponse = _a.hoursWithoutResponse, onlyOpenTickets = _a.onlyOpenTickets;
                if (!hoursWithoutResponse) {
                    return [3 /*break*/, 10];
                }
                limitDate = (0, moment_1["default"])().subtract(hoursWithoutResponse, "hours").toDate();
                statusCondition = onlyOpenTickets
                    ? { status: "open" }
                    : { status: (_c = {}, _c[sequelize_1.Op.notIn] = ["closed", "lgpd", "nps"], _c) };
                return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: __assign(__assign({ companyId: companyId }, statusCondition), { updatedAt: (_d = {}, _d[sequelize_1.Op.lte] = limitDate, _d) }),
                        include: [
                            { model: Contact_1["default"], as: "contact" }
                        ]
                    })];
            case 3:
                tickets = _e.sent();
                _b = 0, tickets_1 = tickets;
                _e.label = 4;
            case 4:
                if (!(_b < tickets_1.length)) return [3 /*break*/, 10];
                ticket = tickets_1[_b];
                return [4 /*yield*/, Message_1["default"].findOne({
                        where: { ticketId: ticket.id },
                        order: [["createdAt", "DESC"]]
                    })];
            case 5:
                lastMessage = _e.sent();
                // Se a última mensagem foi do cliente, não disparar
                if (lastMessage && !lastMessage.fromMe) {
                    return [3 /*break*/, 9];
                }
                if (!(lastMessage && lastMessage.fromMe)) return [3 /*break*/, 9];
                messageDate = (0, moment_1["default"])(lastMessage.createdAt);
                hoursSinceMessage = (0, moment_1["default"])().diff(messageDate, "hours");
                if (!(hoursSinceMessage >= hoursWithoutResponse)) return [3 /*break*/, 9];
                _e.label = 6;
            case 6:
                _e.trys.push([6, 8, , 9]);
                return [4 /*yield*/, (0, ProcessAutomationService_1.processAutomationForContact)(automation, ticket.contact, ticket)];
            case 7:
                _e.sent();
                logger_1["default"].info("[Automation NoResponse] Automa\u00E7\u00E3o ".concat(automation.id, " processada para ticket ").concat(ticket.id));
                return [3 /*break*/, 9];
            case 8:
                error_1 = _e.sent();
                logger_1["default"].error("[Automation NoResponse] Erro: ".concat(error_1.message));
                return [3 /*break*/, 9];
            case 9:
                _b++;
                return [3 /*break*/, 4];
            case 10:
                _i++;
                return [3 /*break*/, 2];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_2 = _e.sent();
                logger_1["default"].error("[Automation NoResponse] Erro geral: ".concat(error_2.message));
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.processNoResponseAutomations = processNoResponseAutomations;
exports["default"] = exports.processNoResponseAutomations;
