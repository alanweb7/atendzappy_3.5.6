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
exports.processKanbanStageAutomation = exports.processKanbanTimeAutomations = void 0;
var sequelize_1 = require("sequelize");
var moment_1 = __importDefault(require("moment"));
var Automation_1 = __importDefault(require("../../models/Automation"));
var AutomationAction_1 = __importDefault(require("../../models/AutomationAction"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var logger_1 = __importDefault(require("../../utils/logger"));
var ProcessAutomationService_1 = require("./ProcessAutomationService");
// Processar automações de tempo no Kanban (lead está X horas em uma fase)
var processKanbanTimeAutomations = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var automations, _i, automations_1, automation, _a, tagId, hoursInStage, limitDate, ticketTags, _b, ticketTags_1, ticketTag, ticket, error_1, error_2;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 11, , 12]);
                return [4 /*yield*/, Automation_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            triggerType: "kanban_time",
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
                if (!(_i < automations_1.length)) return [3 /*break*/, 10];
                automation = automations_1[_i];
                _a = automation.triggerConfig || {}, tagId = _a.tagId, hoursInStage = _a.hoursInStage;
                if (!tagId || !hoursInStage) {
                    return [3 /*break*/, 9];
                }
                limitDate = (0, moment_1["default"])().subtract(hoursInStage, "hours").toDate();
                return [4 /*yield*/, TicketTag_1["default"].findAll({
                        where: {
                            tagId: tagId,
                            createdAt: (_c = {}, _c[sequelize_1.Op.lte] = limitDate, _c)
                        },
                        include: [
                            {
                                model: Ticket_1["default"],
                                as: "ticket",
                                where: {
                                    companyId: companyId,
                                    status: (_d = {}, _d[sequelize_1.Op.notIn] = ["closed", "lgpd", "nps"], _d)
                                },
                                include: [
                                    { model: Contact_1["default"], as: "contact" }
                                ]
                            }
                        ]
                    })];
            case 3:
                ticketTags = _e.sent();
                _b = 0, ticketTags_1 = ticketTags;
                _e.label = 4;
            case 4:
                if (!(_b < ticketTags_1.length)) return [3 /*break*/, 9];
                ticketTag = ticketTags_1[_b];
                ticket = ticketTag.ticket;
                if (!ticket || !ticket.contact)
                    return [3 /*break*/, 8];
                _e.label = 5;
            case 5:
                _e.trys.push([5, 7, , 8]);
                return [4 /*yield*/, (0, ProcessAutomationService_1.processAutomationForContact)(automation, ticket.contact, ticket)];
            case 6:
                _e.sent();
                logger_1["default"].info("[Automation KanbanTime] Automa\u00E7\u00E3o ".concat(automation.id, " processada para ticket ").concat(ticket.id));
                return [3 /*break*/, 8];
            case 7:
                error_1 = _e.sent();
                logger_1["default"].error("[Automation KanbanTime] Erro: ".concat(error_1.message));
                return [3 /*break*/, 8];
            case 8:
                _b++;
                return [3 /*break*/, 4];
            case 9:
                _i++;
                return [3 /*break*/, 2];
            case 10: return [3 /*break*/, 12];
            case 11:
                error_2 = _e.sent();
                logger_1["default"].error("[Automation KanbanTime] Erro geral: ".concat(error_2.message));
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.processKanbanTimeAutomations = processKanbanTimeAutomations;
// Processar automações quando lead entra em uma fase do Kanban
var processKanbanStageAutomation = function (ticketId, tagId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var automations, matchingAutomations, ticket, _i, matchingAutomations_1, automation, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, Automation_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            triggerType: "kanban_stage",
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
                automations = _a.sent();
                matchingAutomations = automations.filter(function (a) {
                    var _a;
                    var config = a.triggerConfig || {};
                    return config.tagId === tagId || ((_a = config.tagIds) === null || _a === void 0 ? void 0 : _a.includes(tagId));
                });
                if (matchingAutomations.length === 0) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId, {
                        include: [{ model: Contact_1["default"], as: "contact" }]
                    })];
            case 2:
                ticket = _a.sent();
                if (!ticket || !ticket.contact) {
                    return [2 /*return*/];
                }
                _i = 0, matchingAutomations_1 = matchingAutomations;
                _a.label = 3;
            case 3:
                if (!(_i < matchingAutomations_1.length)) return [3 /*break*/, 8];
                automation = matchingAutomations_1[_i];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, (0, ProcessAutomationService_1.processAutomationForContact)(automation, ticket.contact, ticket)];
            case 5:
                _a.sent();
                logger_1["default"].info("[Automation KanbanStage] Automa\u00E7\u00E3o ".concat(automation.id, " processada para ticket ").concat(ticketId));
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                logger_1["default"].error("[Automation KanbanStage] Erro: ".concat(error_3.message));
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_4 = _a.sent();
                logger_1["default"].error("[Automation KanbanStage] Erro geral: ".concat(error_4.message));
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.processKanbanStageAutomation = processKanbanStageAutomation;
exports["default"] = {
    processKanbanTimeAutomations: exports.processKanbanTimeAutomations,
    processKanbanStageAutomation: exports.processKanbanStageAutomation
};
