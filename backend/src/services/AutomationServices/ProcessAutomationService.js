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
exports.getAutomationsByTrigger = exports.processAutomationForContact = exports.executeAction = exports.getNextDispatchDate = exports.isWithinDispatchHours = exports.getCampaignSettings = void 0;
var Automation_1 = __importDefault(require("../../models/Automation"));
var AutomationAction_1 = __importDefault(require("../../models/AutomationAction"));
var AutomationExecution_1 = __importDefault(require("../../models/AutomationExecution"));
var AutomationLog_1 = __importDefault(require("../../models/AutomationLog"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var CampaignSetting_1 = __importDefault(require("../../models/CampaignSetting"));
var SendWhatsAppMessage_1 = __importDefault(require("../WbotServices/SendWhatsAppMessage"));
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var logger_1 = __importDefault(require("../../utils/logger"));
var moment_1 = __importDefault(require("moment"));
var AUTOMATION_WINDOW_REGEX = /^automation_(.+)_(startHour|endHour|sabado|domingo)$/;
var INSTANT_ACTIONS = new Set([
    "add_tag",
    "remove_tag",
    "move_kanban",
    "transfer_queue",
    "transfer_user",
    "close_ticket"
]);
// Buscar configurações de disparo da empresa
var getCampaignSettings = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var settings, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CampaignSetting_1["default"].findAll({
                    where: { companyId: companyId },
                    attributes: ["key", "value"]
                })];
            case 1:
                settings = _a.sent();
                config = {
                    messageInterval: 20,
                    longerIntervalAfter: 20,
                    greaterInterval: 60,
                    sabado: false,
                    domingo: false,
                    startHour: "08:00",
                    endHour: "18:00",
                    automationWindows: {}
                };
                settings.forEach(function (setting) {
                    try {
                        var automationMatch = setting.key.match(AUTOMATION_WINDOW_REGEX);
                        if (automationMatch) {
                            var triggerType = automationMatch[1], field = automationMatch[2];
                            var windowConfig = config.automationWindows[triggerType] ||
                                (config.automationWindows[triggerType] = {});
                            if (field === "startHour" || field === "endHour") {
                                windowConfig[field] = setting.value;
                            }
                            else {
                                windowConfig[field] = JSON.parse(setting.value);
                            }
                            return;
                        }
                        if (setting.key === "messageInterval")
                            config.messageInterval = JSON.parse(setting.value);
                        if (setting.key === "longerIntervalAfter")
                            config.longerIntervalAfter = JSON.parse(setting.value);
                        if (setting.key === "greaterInterval")
                            config.greaterInterval = JSON.parse(setting.value);
                        if (setting.key === "sabado")
                            config.sabado = JSON.parse(setting.value);
                        if (setting.key === "domingo")
                            config.domingo = JSON.parse(setting.value);
                        if (setting.key === "startHour")
                            config.startHour = setting.value;
                        if (setting.key === "endHour")
                            config.endHour = setting.value;
                    }
                    catch (e) { }
                });
                return [2 /*return*/, config];
        }
    });
}); };
exports.getCampaignSettings = getCampaignSettings;
var resolveWindow = function (settings, triggerType) {
    var _a, _b, _c, _d;
    var windowConfig = (triggerType && settings.automationWindows[triggerType]) || {};
    return {
        startHour: (_a = windowConfig.startHour) !== null && _a !== void 0 ? _a : settings.startHour,
        endHour: (_b = windowConfig.endHour) !== null && _b !== void 0 ? _b : settings.endHour,
        sabado: (_c = windowConfig.sabado) !== null && _c !== void 0 ? _c : settings.sabado,
        domingo: (_d = windowConfig.domingo) !== null && _d !== void 0 ? _d : settings.domingo
    };
};
// Verificar se está dentro do horário de disparo
var isWithinDispatchHours = function (settings, triggerType) {
    var windowConfig = resolveWindow(settings, triggerType);
    var now = (0, moment_1["default"])();
    var dayOfWeek = now.day();
    // Verificar sábado e domingo
    if (dayOfWeek === 6 && !windowConfig.sabado)
        return false;
    if (dayOfWeek === 0 && !windowConfig.domingo)
        return false;
    // Verificar horário
    var currentTime = now.format("HH:mm");
    return currentTime >= windowConfig.startHour && currentTime <= windowConfig.endHour;
};
exports.isWithinDispatchHours = isWithinDispatchHours;
var getNextDispatchDate = function (settings, triggerType) {
    var windowConfig = resolveWindow(settings, triggerType);
    var next = (0, moment_1["default"])();
    var _a = windowConfig.startHour.split(":").map(Number), startHour = _a[0], startMinute = _a[1];
    var _b = windowConfig.endHour.split(":").map(Number), endHour = _b[0], endMinute = _b[1];
    while (true) {
        var day = next.day();
        if ((day === 6 && !windowConfig.sabado) || (day === 0 && !windowConfig.domingo)) {
            next.add(1, "day").startOf("day");
            continue;
        }
        var startOfWindow = next.clone().startOf("day").add(startHour, "hours").add(startMinute, "minutes");
        var endOfWindow = next.clone().startOf("day").add(endHour, "hours").add(endMinute, "minutes");
        if (next.isBefore(startOfWindow)) {
            return startOfWindow.toDate();
        }
        if (next.isBefore(endOfWindow)) {
            return next.toDate();
        }
        next.add(1, "day").startOf("day");
    }
};
exports.getNextDispatchDate = getNextDispatchDate;
// Calcular delay baseado nas configurações
var calculateDelay = function (settings, messageCount) {
    if (messageCount >= settings.longerIntervalAfter) {
        return settings.greaterInterval;
    }
    return settings.messageInterval;
};
// Executar ação de enviar mensagem
var executeActionSendMessage = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, mediaUrl, finalMessage, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = action.actionConfig, message = _a.message, mediaUrl = _a.mediaUrl;
                if (!ticket) {
                    return [2 /*return*/, { success: false, message: "Ticket não encontrado" }];
                }
                finalMessage = message || "";
                finalMessage = finalMessage.replace(/\{\{nome\}\}/gi, contact.name || "");
                finalMessage = finalMessage.replace(/\{\{numero\}\}/gi, contact.number || "");
                finalMessage = finalMessage.replace(/\{\{email\}\}/gi, contact.email || "");
                return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: finalMessage, ticket: ticket })];
            case 1:
                _b.sent();
                return [2 /*return*/, { success: true, message: "Mensagem enviada com sucesso" }];
            case 2:
                error_1 = _b.sent();
                logger_1["default"].error("[Automation] Erro ao enviar mensagem: ".concat(error_1.message));
                return [2 /*return*/, { success: false, message: error_1.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Executar ação de adicionar tag
var executeActionAddTag = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tagId, tag, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                tagId = action.actionConfig.tagId;
                if (!tagId) {
                    return [2 /*return*/, { success: false, message: "Tag não especificada" }];
                }
                return [4 /*yield*/, Tag_1["default"].findOne({ where: { id: tagId, companyId: companyId } })];
            case 1:
                tag = _a.sent();
                if (!tag) {
                    return [2 /*return*/, { success: false, message: "Tag não encontrada" }];
                }
                // Adicionar tag ao contato
                return [4 /*yield*/, ContactTag_1["default"].findOrCreate({
                        where: { contactId: contact.id, tagId: tag.id },
                        defaults: { contactId: contact.id, tagId: tag.id }
                    })];
            case 2:
                // Adicionar tag ao contato
                _a.sent();
                if (!ticket) return [3 /*break*/, 4];
                return [4 /*yield*/, TicketTag_1["default"].findOrCreate({
                        where: { ticketId: ticket.id, tagId: tag.id },
                        defaults: { ticketId: ticket.id, tagId: tag.id }
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, { success: true, message: "Tag \"".concat(tag.name, "\" adicionada") }];
            case 5:
                error_2 = _a.sent();
                logger_1["default"].error("[Automation] Erro ao adicionar tag: ".concat(error_2.message));
                return [2 /*return*/, { success: false, message: error_2.message }];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Executar ação de remover tag
var executeActionRemoveTag = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tagId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                tagId = action.actionConfig.tagId;
                if (!tagId) {
                    return [2 /*return*/, { success: false, message: "Tag não especificada" }];
                }
                return [4 /*yield*/, ContactTag_1["default"].destroy({
                        where: { contactId: contact.id, tagId: tagId }
                    })];
            case 1:
                _a.sent();
                if (!ticket) return [3 /*break*/, 3];
                return [4 /*yield*/, TicketTag_1["default"].destroy({
                        where: { ticketId: ticket.id, tagId: tagId }
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, { success: true, message: "Tag removida" }];
            case 4:
                error_3 = _a.sent();
                logger_1["default"].error("[Automation] Erro ao remover tag: ".concat(error_3.message));
                return [2 /*return*/, { success: false, message: error_3.message }];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Executar ação de mover no Kanban
var executeActionMoveKanban = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tagId, tag, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                tagId = action.actionConfig.tagId;
                if (!ticket) {
                    return [2 /*return*/, { success: false, message: "Ticket não encontrado" }];
                }
                return [4 /*yield*/, Tag_1["default"].findOne({ where: { id: tagId, companyId: companyId } })];
            case 1:
                tag = _a.sent();
                if (!tag) {
                    return [2 /*return*/, { success: false, message: "Lane do Kanban não encontrada" }];
                }
                // Remover tags kanban anteriores
                return [4 /*yield*/, TicketTag_1["default"].destroy({
                        where: { ticketId: ticket.id }
                    })];
            case 2:
                // Remover tags kanban anteriores
                _a.sent();
                // Adicionar nova tag kanban
                return [4 /*yield*/, TicketTag_1["default"].create({
                        ticketId: ticket.id,
                        tagId: tag.id
                    })];
            case 3:
                // Adicionar nova tag kanban
                _a.sent();
                return [2 /*return*/, { success: true, message: "Movido para \"".concat(tag.name, "\"") }];
            case 4:
                error_4 = _a.sent();
                logger_1["default"].error("[Automation] Erro ao mover no Kanban: ".concat(error_4.message));
                return [2 /*return*/, { success: false, message: error_4.message }];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Executar ação de transferir para fila
var executeActionTransferQueue = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var queueId, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                queueId = action.actionConfig.queueId;
                if (!ticket) {
                    return [2 /*return*/, { success: false, message: "Ticket não encontrado" }];
                }
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { queueId: queueId },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, { success: true, message: "Transferido para fila" }];
            case 2:
                error_5 = _a.sent();
                logger_1["default"].error("[Automation] Erro ao transferir para fila: ".concat(error_5.message));
                return [2 /*return*/, { success: false, message: error_5.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Executar ação de transferir para usuário
var executeActionTransferUser = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = action.actionConfig.userId;
                if (!ticket) {
                    return [2 /*return*/, { success: false, message: "Ticket não encontrado" }];
                }
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { userId: userId, status: "open" },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, { success: true, message: "Transferido para atendente" }];
            case 2:
                error_6 = _a.sent();
                logger_1["default"].error("[Automation] Erro ao transferir para usu\u00E1rio: ".concat(error_6.message));
                return [2 /*return*/, { success: false, message: error_6.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Executar ação de fechar ticket
var executeActionCloseTicket = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!ticket) {
                    return [2 /*return*/, { success: false, message: "Ticket não encontrado" }];
                }
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { status: "closed" },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, { success: true, message: "Ticket fechado" }];
            case 2:
                error_7 = _a.sent();
                logger_1["default"].error("[Automation] Erro ao fechar ticket: ".concat(error_7.message));
                return [2 /*return*/, { success: false, message: error_7.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Executar uma ação específica
var executeAction = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (action.actionType) {
            case "send_message":
                return [2 /*return*/, executeActionSendMessage(action, contact, ticket, companyId)];
            case "add_tag":
                return [2 /*return*/, executeActionAddTag(action, contact, ticket, companyId)];
            case "remove_tag":
                return [2 /*return*/, executeActionRemoveTag(action, contact, ticket, companyId)];
            case "move_kanban":
                return [2 /*return*/, executeActionMoveKanban(action, contact, ticket, companyId)];
            case "transfer_queue":
                return [2 /*return*/, executeActionTransferQueue(action, contact, ticket, companyId)];
            case "transfer_user":
                return [2 /*return*/, executeActionTransferUser(action, contact, ticket, companyId)];
            case "close_ticket":
                return [2 /*return*/, executeActionCloseTicket(action, contact, ticket, companyId)];
            case "wait":
                return [2 /*return*/, { success: true, message: "Aguardando..." }];
            default:
                return [2 /*return*/, { success: false, message: "A\u00E7\u00E3o desconhecida: ".concat(action.actionType) }];
        }
        return [2 /*return*/];
    });
}); };
exports.executeAction = executeAction;
// Processar automação completa para um contato
var processAutomationForContact = function (automation, contact, ticket) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, settings, actions, messageCount, _i, actions_1, action, isInstantAction, result, anchorMoment, delaySeconds, scheduledAt, execution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = automation.companyId;
                return [4 /*yield*/, (0, exports.getCampaignSettings)(companyId)];
            case 1:
                settings = _a.sent();
                return [4 /*yield*/, AutomationAction_1["default"].findAll({
                        where: { automationId: automation.id },
                        order: [["order", "ASC"]]
                    })];
            case 2:
                actions = _a.sent();
                messageCount = 0;
                _i = 0, actions_1 = actions;
                _a.label = 3;
            case 3:
                if (!(_i < actions_1.length)) return [3 /*break*/, 10];
                action = actions_1[_i];
                isInstantAction = INSTANT_ACTIONS.has(action.actionType);
                if (!isInstantAction) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, exports.executeAction)(action, contact, ticket, companyId)];
            case 4:
                result = _a.sent();
                return [4 /*yield*/, AutomationLog_1["default"].create({
                        automationId: automation.id,
                        contactId: contact.id,
                        ticketId: ticket === null || ticket === void 0 ? void 0 : ticket.id,
                        status: result.success ? "completed" : "failed",
                        executedAt: new Date(),
                        result: result,
                        error: result.success ? null : result.message
                    })];
            case 5:
                _a.sent();
                if (!result.success) {
                    logger_1["default"].warn("[Automation] A\u00E7\u00E3o instant\u00E2nea ".concat(action.actionType, " falhou: ").concat(result.message));
                }
                return [3 /*break*/, 9];
            case 6:
                anchorMoment = (0, exports.isWithinDispatchHours)(settings, automation.triggerType)
                    ? (0, moment_1["default"])()
                    : (0, moment_1["default"])((0, exports.getNextDispatchDate)(settings, automation.triggerType));
                delaySeconds = action.delayMinutes > 0
                    ? action.delayMinutes * 60
                    : calculateDelay(settings, messageCount);
                scheduledAt = anchorMoment.clone().add(delaySeconds, "seconds").toDate();
                return [4 /*yield*/, AutomationExecution_1["default"].create({
                        automationId: automation.id,
                        automationActionId: action.id,
                        contactId: contact.id,
                        ticketId: ticket === null || ticket === void 0 ? void 0 : ticket.id,
                        scheduledAt: scheduledAt,
                        status: "scheduled",
                        metadata: { actionType: action.actionType }
                    })];
            case 7:
                execution = _a.sent();
                return [4 /*yield*/, AutomationLog_1["default"].create({
                        automationId: automation.id,
                        contactId: contact.id,
                        ticketId: ticket === null || ticket === void 0 ? void 0 : ticket.id,
                        status: "pending",
                        result: { executionId: execution.id, actionType: action.actionType }
                    })];
            case 8:
                _a.sent();
                if (action.actionType === "send_message") {
                    messageCount++;
                }
                _a.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 3];
            case 10:
                logger_1["default"].info("[Automation] ".concat(actions.length, " a\u00E7\u00F5es agendadas para automa\u00E7\u00E3o ").concat(automation.id, ", contato ").concat(contact.id));
                return [2 /*return*/];
        }
    });
}); };
exports.processAutomationForContact = processAutomationForContact;
// Buscar automações por gatilho
var getAutomationsByTrigger = function (companyId, triggerType) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, Automation_1["default"].findAll({
                where: {
                    companyId: companyId,
                    triggerType: triggerType,
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
    });
}); };
exports.getAutomationsByTrigger = getAutomationsByTrigger;
