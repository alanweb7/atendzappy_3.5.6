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
exports.runNoResponseAutomationJob = exports.runKanbanAutomationJob = exports.runBirthdayAutomationJob = exports.runAutomationJob = exports.runAllAutomationsJob = exports.executeScheduledAutomations = void 0;
var sequelize_1 = require("sequelize");
var Company_1 = __importDefault(require("../../models/Company"));
var Automation_1 = __importDefault(require("../../models/Automation"));
var AutomationExecution_1 = __importDefault(require("../../models/AutomationExecution"));
var AutomationAction_1 = __importDefault(require("../../models/AutomationAction"));
var AutomationLog_1 = __importDefault(require("../../models/AutomationLog"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var logger_1 = __importDefault(require("../../utils/logger"));
var ProcessAutomationService_1 = require("./ProcessAutomationService");
var TriggerBirthdayService_1 = __importDefault(require("./TriggerBirthdayService"));
var TriggerKanbanService_1 = require("./TriggerKanbanService");
var TriggerNoResponseService_1 = __importDefault(require("./TriggerNoResponseService"));
// Executar automações agendadas que estão pendentes
var executeScheduledAutomations = function () { return __awaiter(void 0, void 0, void 0, function () {
    var now, executions, _i, executions_1, execution, action, contact, ticket, result, error_1, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 14, , 15]);
                now = new Date();
                return [4 /*yield*/, AutomationExecution_1["default"].findAll({
                        where: {
                            status: "scheduled",
                            scheduledAt: (_a = {}, _a[sequelize_1.Op.lte] = now, _a)
                        },
                        include: [
                            { model: AutomationAction_1["default"], as: "automationAction" },
                            { model: Contact_1["default"], as: "contact" },
                            { model: Ticket_1["default"], as: "ticket" }
                        ],
                        limit: 100,
                        order: [["scheduledAt", "ASC"]]
                    })];
            case 1:
                executions = _b.sent();
                if (executions.length === 0) {
                    return [2 /*return*/];
                }
                logger_1["default"].info("[Automation Job] Processando ".concat(executions.length, " execu\u00E7\u00F5es agendadas"));
                _i = 0, executions_1 = executions;
                _b.label = 2;
            case 2:
                if (!(_i < executions_1.length)) return [3 /*break*/, 13];
                execution = executions_1[_i];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 10, , 12]);
                // Marcar como em execução
                return [4 /*yield*/, execution.update({
                        status: "running",
                        attempts: execution.attempts + 1,
                        lastAttemptAt: new Date()
                    })];
            case 4:
                // Marcar como em execução
                _b.sent();
                action = execution.automationAction;
                contact = execution.contact;
                ticket = execution.ticket;
                if (!(!action || !contact)) return [3 /*break*/, 6];
                return [4 /*yield*/, execution.update({
                        status: "failed",
                        error: "Ação ou contato não encontrado"
                    })];
            case 5:
                _b.sent();
                return [3 /*break*/, 12];
            case 6: return [4 /*yield*/, (0, ProcessAutomationService_1.executeAction)(action, contact, ticket, contact.companyId)];
            case 7:
                result = _b.sent();
                // Atualizar execução
                return [4 /*yield*/, execution.update({
                        status: result.success ? "completed" : "failed",
                        completedAt: result.success ? new Date() : null,
                        error: result.success ? null : result.message
                    })];
            case 8:
                // Atualizar execução
                _b.sent();
                // Atualizar log
                return [4 /*yield*/, AutomationLog_1["default"].update({
                        status: result.success ? "completed" : "failed",
                        executedAt: new Date(),
                        result: result,
                        error: result.success ? null : result.message
                    }, {
                        where: {
                            automationId: execution.automationId,
                            contactId: contact.id,
                            status: "pending"
                        }
                    })];
            case 9:
                // Atualizar log
                _b.sent();
                logger_1["default"].info("[Automation Job] Execu\u00E7\u00E3o ".concat(execution.id, " ").concat(result.success ? "concluída" : "falhou", ": ").concat(result.message));
                return [3 /*break*/, 12];
            case 10:
                error_1 = _b.sent();
                return [4 /*yield*/, execution.update({
                        status: "failed",
                        error: error_1.message
                    })];
            case 11:
                _b.sent();
                logger_1["default"].error("[Automation Job] Erro na execu\u00E7\u00E3o ".concat(execution.id, ": ").concat(error_1.message));
                return [3 /*break*/, 12];
            case 12:
                _i++;
                return [3 /*break*/, 2];
            case 13: return [3 /*break*/, 15];
            case 14:
                error_2 = _b.sent();
                logger_1["default"].error("[Automation Job] Erro geral: ".concat(error_2.message));
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.executeScheduledAutomations = executeScheduledAutomations;
var getActiveCompanyIds = function () { return __awaiter(void 0, void 0, void 0, function () {
    var companies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Company_1["default"].findAll({
                    where: { status: true },
                    attributes: ["id"]
                })];
            case 1:
                companies = _a.sent();
                return [2 /*return*/, companies.map(function (company) { return company.id; })];
        }
    });
}); };
var runPerCompany = function (jobLabel, triggerType, handler) { return __awaiter(void 0, void 0, void 0, function () {
    var companyIds, _i, companyIds_1, companyId, settings, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getActiveCompanyIds()];
            case 1:
                companyIds = _a.sent();
                _i = 0, companyIds_1 = companyIds;
                _a.label = 2;
            case 2:
                if (!(_i < companyIds_1.length)) return [3 /*break*/, 8];
                companyId = companyIds_1[_i];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, (0, ProcessAutomationService_1.getCampaignSettings)(companyId)];
            case 4:
                settings = _a.sent();
                if (!(0, ProcessAutomationService_1.isWithinDispatchHours)(settings, triggerType)) {
                    logger_1["default"].debug("[Automation Job] Empresa ".concat(companyId, " fora da janela para ").concat(jobLabel, " (").concat(triggerType, ")"));
                    return [3 /*break*/, 7];
                }
                return [4 /*yield*/, handler(companyId)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                logger_1["default"].error("[Automation Job] Erro na empresa ".concat(companyId, " (").concat(jobLabel, "): ").concat(error_3.message));
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/];
        }
    });
}); };
// Processar todos os tipos de automações (exceto as que já têm jobs específicos)
var runAllAutomationsJob = function () { return __awaiter(void 0, void 0, void 0, function () {
    var companyIds, _i, companyIds_2, companyId, settings, automations, _a, automations_1, automation, contacts, _b, contacts_1, contact, error_4, error_5, error_6, error_7;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 20, , 21]);
                logger_1["default"].info("[Automation Job] Processando todos os tipos de automações...");
                return [4 /*yield*/, getActiveCompanyIds()];
            case 1:
                companyIds = _d.sent();
                _i = 0, companyIds_2 = companyIds;
                _d.label = 2;
            case 2:
                if (!(_i < companyIds_2.length)) return [3 /*break*/, 19];
                companyId = companyIds_2[_i];
                _d.label = 3;
            case 3:
                _d.trys.push([3, 17, , 18]);
                return [4 /*yield*/, (0, ProcessAutomationService_1.getCampaignSettings)(companyId)];
            case 4:
                settings = _d.sent();
                return [4 /*yield*/, Automation_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            isActive: true,
                            triggerType: (_c = {},
                                _c[sequelize_1.Op.notIn] = ["birthday", "no_response", "kanban_time", "kanban_stage"],
                                _c)
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
            case 5:
                automations = _d.sent();
                if (!(automations.length > 0)) return [3 /*break*/, 16];
                logger_1["default"].info("[Automation Job] ".concat(automations.length, " automa\u00E7\u00F5es encontradas para empresa ").concat(companyId));
                _a = 0, automations_1 = automations;
                _d.label = 6;
            case 6:
                if (!(_a < automations_1.length)) return [3 /*break*/, 16];
                automation = automations_1[_a];
                _d.label = 7;
            case 7:
                _d.trys.push([7, 14, , 15]);
                // Verificar janela de disparo
                if (!(0, ProcessAutomationService_1.isWithinDispatchHours)(settings, automation.triggerType)) {
                    logger_1["default"].debug("[Automation Job] Automa\u00E7\u00E3o ".concat(automation.id, " fora da janela de disparo"));
                    return [3 /*break*/, 15];
                }
                contacts = [];
                switch (automation.triggerType) {
                    case "message_received":
                        // Buscar contatos com mensagens recentes não processadas
                        break;
                    case "manual":
                        // Automações manuais são criadas sob demanda
                        return [3 /*break*/, 15];
                    default:
                        logger_1["default"].warn("[Automation Job] Trigger type n\u00E3o implementado: ".concat(automation.triggerType));
                        return [3 /*break*/, 15];
                }
                _b = 0, contacts_1 = contacts;
                _d.label = 8;
            case 8:
                if (!(_b < contacts_1.length)) return [3 /*break*/, 13];
                contact = contacts_1[_b];
                _d.label = 9;
            case 9:
                _d.trys.push([9, 11, , 12]);
                return [4 /*yield*/, (0, ProcessAutomationService_1.processAutomationForContact)(automation, contact, null)];
            case 10:
                _d.sent();
                logger_1["default"].info("[Automation Job] Automa\u00E7\u00E3o ".concat(automation.id, " processada para contato ").concat(contact.id));
                return [3 /*break*/, 12];
            case 11:
                error_4 = _d.sent();
                logger_1["default"].error("[Automation Job] Erro ao processar automa\u00E7\u00E3o ".concat(automation.id, " para contato ").concat(contact.id, ": ").concat(error_4.message));
                return [3 /*break*/, 12];
            case 12:
                _b++;
                return [3 /*break*/, 8];
            case 13: return [3 /*break*/, 15];
            case 14:
                error_5 = _d.sent();
                logger_1["default"].error("[Automation Job] Erro na automa\u00E7\u00E3o ".concat(automation.id, ": ").concat(error_5.message));
                return [3 /*break*/, 15];
            case 15:
                _a++;
                return [3 /*break*/, 6];
            case 16: return [3 /*break*/, 18];
            case 17:
                error_6 = _d.sent();
                logger_1["default"].error("[Automation Job] Erro na empresa ".concat(companyId, ": ").concat(error_6.message));
                return [3 /*break*/, 18];
            case 18:
                _i++;
                return [3 /*break*/, 2];
            case 19:
                logger_1["default"].info("[Automation Job] Processamento de todas as automações concluído");
                return [3 /*break*/, 21];
            case 20:
                error_7 = _d.sent();
                logger_1["default"].error("[Automation Job] Erro geral: ".concat(error_7.message));
                return [3 /*break*/, 21];
            case 21: return [2 /*return*/];
        }
    });
}); };
exports.runAllAutomationsJob = runAllAutomationsJob;
// Apenas processa execuções agendadas
var runAutomationJob = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logger_1["default"].info("[Automation Job] Executando fila de execuções agendadas...");
                return [4 /*yield*/, (0, exports.executeScheduledAutomations)()];
            case 1:
                _a.sent();
                logger_1["default"].info("[Automation Job] Execuções agendadas concluídas");
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                logger_1["default"].error("[Automation Job] Erro geral: ".concat(error_8.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.runAutomationJob = runAutomationJob;
var runBirthdayAutomationJob = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1["default"].info("[Automation Birthday Job] Iniciando processamento...");
                return [4 /*yield*/, runPerCompany("birthday", "birthday", TriggerBirthdayService_1["default"])];
            case 1:
                _a.sent();
                logger_1["default"].info("[Automation Birthday Job] Processamento concluído");
                return [2 /*return*/];
        }
    });
}); };
exports.runBirthdayAutomationJob = runBirthdayAutomationJob;
var runKanbanAutomationJob = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1["default"].info("[Automation Kanban Job] Iniciando processamento...");
                return [4 /*yield*/, runPerCompany("kanban_time", "kanban_time", TriggerKanbanService_1.processKanbanTimeAutomations)];
            case 1:
                _a.sent();
                logger_1["default"].info("[Automation Kanban Job] Processamento concluído");
                return [2 /*return*/];
        }
    });
}); };
exports.runKanbanAutomationJob = runKanbanAutomationJob;
var runNoResponseAutomationJob = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1["default"].info("[Automation NoResponse Job] Iniciando processamento...");
                return [4 /*yield*/, runPerCompany("no_response", "no_response", TriggerNoResponseService_1["default"])];
            case 1:
                _a.sent();
                logger_1["default"].info("[Automation NoResponse Job] Processamento concluído");
                return [2 /*return*/];
        }
    });
}); };
exports.runNoResponseAutomationJob = runNoResponseAutomationJob;
exports["default"] = exports.runAutomationJob;
