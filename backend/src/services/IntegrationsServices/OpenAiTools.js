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
exports.formatMessageWithVariables = exports.isValidQueue = exports.isValidTag = exports.getToolInstructions = exports.executeOpenAiTool = exports.openAiTools = void 0;
var Tag_1 = __importDefault(require("../../models/Tag"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var User_1 = __importDefault(require("../../models/User"));
var Ferramenta_1 = __importDefault(require("../../models/Ferramenta"));
var QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
var socket_1 = require("../../libs/socket");
var logger_1 = __importDefault(require("../../utils/logger"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var AiToolGenerators_1 = require("./AiToolGenerators");
var SendMessage_1 = require("../../helpers/SendMessage");
var SendInteractiveMenu_1 = require("../../helpers/SendInteractiveMenu");
// Definição das ferramentas disponíveis para a IA (geradas a partir do catálogo)
exports.openAiTools = (0, AiToolGenerators_1.buildOpenAiToolDeclarationsFromCatalog)();
// Funções auxiliares de validação
var validateCPFCNPJ = function (value) {
    var cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 11) {
        // Validar CPF
        if (/^(\d)\1{10}$/.test(cleaned))
            return { valid: false, type: 'CPF', formatted: value };
        var sum = 0;
        for (var i = 0; i < 9; i++)
            sum += parseInt(cleaned.charAt(i)) * (10 - i);
        var digit = 11 - (sum % 11);
        if (digit >= 10)
            digit = 0;
        if (digit !== parseInt(cleaned.charAt(9)))
            return { valid: false, type: 'CPF', formatted: value };
        sum = 0;
        for (var i = 0; i < 10; i++)
            sum += parseInt(cleaned.charAt(i)) * (11 - i);
        digit = 11 - (sum % 11);
        if (digit >= 10)
            digit = 0;
        if (digit !== parseInt(cleaned.charAt(10)))
            return { valid: false, type: 'CPF', formatted: value };
        var formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        return { valid: true, type: 'CPF', formatted: formatted };
    }
    else if (cleaned.length === 14) {
        // Validar CNPJ
        if (/^(\d)\1{13}$/.test(cleaned))
            return { valid: false, type: 'CNPJ', formatted: value };
        var sum = 0;
        var pos = 5;
        for (var i = 0; i < 12; i++) {
            sum += parseInt(cleaned.charAt(i)) * pos;
            pos = pos === 2 ? 9 : pos - 1;
        }
        var digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (digit !== parseInt(cleaned.charAt(12)))
            return { valid: false, type: 'CNPJ', formatted: value };
        sum = 0;
        pos = 6;
        for (var i = 0; i < 13; i++) {
            sum += parseInt(cleaned.charAt(i)) * pos;
            pos = pos === 2 ? 9 : pos - 1;
        }
        digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (digit !== parseInt(cleaned.charAt(13)))
            return { valid: false, type: 'CNPJ', formatted: value };
        var formatted = cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return { valid: true, type: 'CNPJ', formatted: formatted };
    }
    return { valid: false, type: 'UNKNOWN', formatted: value };
};
var validateEmailAddress = function (email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { valid: regex.test(email), email: email };
};
var validatePhoneNumber = function (phone) {
    var cleaned = phone.replace(/\D/g, '');
    // Validar formato brasileiro: DDD (2 dígitos) + número (8 ou 9 dígitos)
    if (cleaned.length === 10 || cleaned.length === 11) {
        var ddd = cleaned.substring(0, 2);
        var number = cleaned.substring(2);
        var formatted = '';
        if (cleaned.length === 11) {
            formatted = "(".concat(ddd, ") ").concat(number.substring(0, 5), "-").concat(number.substring(5));
        }
        else {
            formatted = "(".concat(ddd, ") ").concat(number.substring(0, 4), "-").concat(number.substring(4));
        }
        return { valid: true, formatted: formatted, ddd: ddd };
    }
    return { valid: false, formatted: phone, ddd: '' };
};
// Função para executar as ferramentas
var normalizeToolName = function (name) {
    return name ? name.trim().toLowerCase() : null;
};
var buildAllowedToolSet = function (allowedTools) {
    if (!allowedTools || allowedTools.length === 0) {
        return null;
    }
    var normalized = allowedTools
        .map(function (tool) { return normalizeToolName(tool); })
        .filter(Boolean);
    return new Set(normalized);
};
function executeOpenAiTool(toolName, args, ticket, contact, availableTags, allQueues, allowedTools, wbot, msg) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var result, allowedSet, normalizedToolName, _b, commandData, commandMatch, results, userId, user, queueId_1, queue, userId, user, tagId, tag, updatedTicket, ticketJSON, respId, quickMessage, whatsapp, messageData, localPath, error_1, allResults, allSuccessful, _i, _c, cmd, cmdResult, error_2, activeTools, normalizePlaceholderList_1, toolsList, error_3, flowId, FlowBuilderModel, targetFlow, flowData, newNodes, newConnects, startNode_1, startConnection, crypto_1, hashWebhookId, flowDetails, ActionsWebhookService, error_4, pauseMinutes, pauseUntil, error_5, locationData, _d, lat, lng, name_1, latitude, longitude, error_6, nodeId, error_7, notifyUserId, notifyMsg, userToNotify, error_8, cpfValue, validation, emailValue, validation, phoneValue, validation, scheduleTime, messageContent, scheduledDate, error_9;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    result = { success: false };
                    allowedSet = buildAllowedToolSet(allowedTools);
                    normalizedToolName = normalizeToolName(toolName);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 80, , 81]);
                    if (allowedSet && (!normalizedToolName || !allowedSet.has(normalizedToolName))) {
                        logger_1["default"].warn("[TOOLS] Execu\u00E7\u00E3o bloqueada para tool \"".concat(toolName, "\" no ticket ").concat(ticket.id, " (companyId=").concat(ticket.companyId, ")"));
                        return [2 /*return*/, {
                                success: false,
                                reason: "Ferramenta desabilitada para este prompt/empresa"
                            }];
                    }
                    _b = toolName;
                    switch (_b) {
                        case "execute_command": return [3 /*break*/, 2];
                        case "execute_multiple_commands": return [3 /*break*/, 31];
                        case "list_available_tools": return [3 /*break*/, 38];
                        case "call_prompt_agent": return [3 /*break*/, 42];
                        case "call_flow_builder": return [3 /*break*/, 43];
                        case "pause_bot": return [3 /*break*/, 57];
                        case "send_location": return [3 /*break*/, 61];
                        case "jump_to_node": return [3 /*break*/, 65];
                        case "notify_user": return [3 /*break*/, 69];
                        case "validate_cpf": return [3 /*break*/, 73];
                        case "validate_email": return [3 /*break*/, 74];
                        case "validate_phone": return [3 /*break*/, 75];
                        case "schedule_message": return [3 /*break*/, 76];
                        case "send_product": return [3 /*break*/, 77];
                        case "execute_tool": return [3 /*break*/, 77];
                        case "like_message": return [3 /*break*/, 77];
                        case "send_contact_file": return [3 /*break*/, 77];
                        case "send_emoji": return [3 /*break*/, 77];
                        case "get_company_schedule": return [3 /*break*/, 77];
                        case "get_contact_schedules": return [3 /*break*/, 77];
                        case "create_contact_schedule": return [3 /*break*/, 77];
                        case "update_contact_schedule": return [3 /*break*/, 77];
                        case "get_contact_info": return [3 /*break*/, 77];
                        case "update_contact_info": return [3 /*break*/, 77];
                        case "get_company_groups": return [3 /*break*/, 77];
                        case "send_group_message": return [3 /*break*/, 77];
                        case "allow_product_resend": return [3 /*break*/, 77];
                        case "list_professionals": return [3 /*break*/, 77];
                        case "list_user_schedules": return [3 /*break*/, 77];
                        case "list_schedule_appointments": return [3 /*break*/, 77];
                        case "check_schedule_availability": return [3 /*break*/, 77];
                        case "create_schedule_appointment": return [3 /*break*/, 77];
                    }
                    return [3 /*break*/, 78];
                case 2:
                    _e.trys.push([2, 29, , 30]);
                    commandData = {};
                    if (args.command) {
                        commandMatch = args.command.match(/#\{([^}]+)\}/);
                        if (commandMatch) {
                            try {
                                commandData = JSON.parse("{".concat(commandMatch[1], "}"));
                            }
                            catch (parseError) {
                                logger_1["default"].error("Erro ao fazer parse do comando: ".concat(args.command), parseError);
                                result = { success: false, error: "Formato de comando inválido" };
                                return [3 /*break*/, 79];
                            }
                        }
                    }
                    if (args.queueId)
                        commandData.queueId = args.queueId;
                    if (args.userId)
                        commandData.userId = args.userId;
                    if (args.tagId)
                        commandData.tagId = args.tagId;
                    if (args.closeTicket)
                        commandData.closeTicket = "1";
                    if (args.resp)
                        commandData.resp = args.resp;
                    results = [];
                    if (!(commandData.userId && !commandData.queueId)) return [3 /*break*/, 6];
                    userId = parseInt(commandData.userId);
                    return [4 /*yield*/, User_1["default"].findOne({
                            where: { id: userId, companyId: ticket.companyId }
                        })];
                case 3:
                    user = _e.sent();
                    if (!user) return [3 /*break*/, 5];
                    ticket.userId = userId;
                    // Mantém status como "pending" - só muda para "open" quando usuário aceitar manualmente
                    // ticket.status = "open"; // REMOVIDO: não muda status automaticamente
                    return [4 /*yield*/, ticket.save()];
                case 4:
                    // Mantém status como "pending" - só muda para "open" quando usuário aceitar manualmente
                    // ticket.status = "open"; // REMOVIDO: não muda status automaticamente
                    _e.sent();
                    results.push("Transferido para ".concat(user.name, " (aguardando aceita\u00E7\u00E3o)"));
                    (0, socket_1.getIO)()
                        .of(String(ticket.companyId))
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    return [3 /*break*/, 6];
                case 5:
                    results.push("Usu\u00E1rio ID ".concat(userId, " n\u00E3o encontrado"));
                    _e.label = 6;
                case 6:
                    if (!commandData.queueId) return [3 /*break*/, 11];
                    queueId_1 = parseInt(commandData.queueId);
                    queue = allQueues.find(function (q) { return q.id === queueId_1 && q.companyId === ticket.companyId; });
                    if (!queue) return [3 /*break*/, 10];
                    // Não sobrescrever flowStopped se já foi definido por call_flow_builder
                    if (!ticket.flowStopped) {
                        ticket.queueId = queueId_1;
                    }
                    results.push("Fila alterada para ".concat(queue.name));
                    if (!commandData.userId) return [3 /*break*/, 8];
                    userId = parseInt(commandData.userId);
                    return [4 /*yield*/, User_1["default"].findOne({
                            where: { id: userId, companyId: ticket.companyId }
                        })];
                case 7:
                    user = _e.sent();
                    if (user) {
                        ticket.userId = userId;
                        results.push("Atendente alterado para ".concat(user.name));
                    }
                    else {
                        results.push("Usu\u00E1rio ID ".concat(userId, " n\u00E3o encontrado"));
                    }
                    _e.label = 8;
                case 8: return [4 /*yield*/, ticket.save()];
                case 9:
                    _e.sent();
                    (0, socket_1.getIO)()
                        .of(String(ticket.companyId))
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                    return [3 /*break*/, 11];
                case 10:
                    results.push("Fila ID ".concat(queueId_1, " n\u00E3o encontrada"));
                    _e.label = 11;
                case 11:
                    if (!commandData.tagId) return [3 /*break*/, 17];
                    tagId = parseInt(commandData.tagId);
                    return [4 /*yield*/, Tag_1["default"].findOne({
                            where: { id: tagId, companyId: ticket.companyId }
                        })];
                case 12:
                    tag = _e.sent();
                    if (!tag) return [3 /*break*/, 16];
                    return [4 /*yield*/, TicketTag_1["default"].findOrCreate({
                            where: { ticketId: ticket.id, tagId: tag.id }
                        })];
                case 13:
                    _e.sent();
                    return [4 /*yield*/, ContactTag_1["default"].findOrCreate({
                            where: { contactId: contact.id, tagId: tag.id }
                        })];
                case 14:
                    _e.sent();
                    results.push("Tag \"".concat(tag.name, "\" adicionada"));
                    return [4 /*yield*/, Ticket_1["default"].findByPk(ticket.id, {
                            include: [
                                { model: Tag_1["default"], as: "tags", attributes: ["id", "name", "color"] },
                                { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "number"] },
                                { model: User_1["default"], as: "user", attributes: ["id", "name"] },
                                { model: Queue_1["default"], as: "queue", attributes: ["id", "name", "color"] }
                            ]
                        })];
                case 15:
                    updatedTicket = _e.sent();
                    if (updatedTicket) {
                        ticketJSON = updatedTicket.toJSON();
                        if (!ticketJSON.tags)
                            ticketJSON.tags = [];
                        ticketJSON.tags = ticketJSON.tags.filter(function (tag) { return tag && tag.name; });
                        (0, socket_1.getIO)()
                            .of(String(ticket.companyId))
                            .emit("company-".concat(ticket.companyId, "-ticket"), {
                            action: "update",
                            ticket: ticketJSON
                        });
                    }
                    return [3 /*break*/, 17];
                case 16:
                    results.push("Tag ID ".concat(tagId, " n\u00E3o encontrada"));
                    _e.label = 17;
                case 17:
                    if (!(commandData.closeTicket === "1" || commandData.closeTicket === true)) return [3 /*break*/, 19];
                    ticket.status = "closed";
                    return [4 /*yield*/, ticket.save()];
                case 18:
                    _e.sent();
                    results.push("Atendimento finalizado");
                    (0, socket_1.getIO)()
                        .of(String(ticket.companyId))
                        .emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "delete",
                        ticketId: ticket.id
                    });
                    _e.label = 19;
                case 19:
                    if (!commandData.resp) return [3 /*break*/, 28];
                    respId = parseInt(commandData.resp);
                    logger_1["default"].info("Processando resposta r\u00E1pida ID: ".concat(respId));
                    return [4 /*yield*/, QuickMessage_1["default"].findOne({
                            where: { id: respId, companyId: ticket.companyId }
                        })];
                case 20:
                    quickMessage = _e.sent();
                    if (!quickMessage) return [3 /*break*/, 27];
                    logger_1["default"].info("Resposta r\u00E1pida encontrada: ".concat(quickMessage.shortcode));
                    if (!(quickMessage.messageType === "buttons" && ((_a = quickMessage.buttons) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 22];
                    // Garante que o ticket tem o contact carregado (necessário para SendCTAButtons)
                    if (!ticket.contact)
                        ticket.contact = contact;
                    return [4 /*yield*/, (0, SendInteractiveMenu_1.SendCTAButtons)({
                            ticket: ticket,
                            messageText: quickMessage.message || "",
                            buttons: quickMessage.buttons
                        })];
                case 21:
                    _e.sent();
                    results.push("Resposta r\u00E1pida \"".concat(quickMessage.shortcode, "\" enviada"));
                    logger_1["default"].info("Resposta r\u00E1pida enviada com sucesso");
                    return [3 /*break*/, 26];
                case 22: return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId)];
                case 23:
                    whatsapp = _e.sent();
                    if (!whatsapp) return [3 /*break*/, 25];
                    messageData = {
                        number: contact.number,
                        body: quickMessage.message || "",
                        companyId: ticket.companyId
                    };
                    // Caminho relativo ao CWD — compatível com Baileys no Windows
                    if (quickMessage.mediaPath && quickMessage.mediaName) {
                        localPath = quickMessage.getDataValue("mediaPath");
                        if (localPath) {
                            messageData.mediaPath = "public/company".concat(ticket.companyId, "/quickMessage/").concat(localPath);
                            messageData.mediaName = quickMessage.mediaName;
                        }
                    }
                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, messageData, false, ticket)];
                case 24:
                    _e.sent();
                    results.push("Resposta r\u00E1pida \"".concat(quickMessage.shortcode, "\" enviada"));
                    logger_1["default"].info("Resposta r\u00E1pida enviada com sucesso");
                    return [3 /*break*/, 26];
                case 25:
                    results.push("WhatsApp do ticket não encontrado");
                    logger_1["default"].error("WhatsApp ID ".concat(ticket.whatsappId, " n\u00E3o encontrado"));
                    _e.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    results.push("Resposta r\u00E1pida ID ".concat(respId, " n\u00E3o encontrada"));
                    logger_1["default"].warn("Resposta r\u00E1pida ID ".concat(respId, " n\u00E3o encontrada para company ").concat(ticket.companyId));
                    _e.label = 28;
                case 28:
                    result = {
                        success: results.length > 0 && !results.some(function (r) { return r.includes("não encontrado"); }),
                        message: results.join(", "),
                        commandExecuted: commandData
                    };
                    logger_1["default"].info("Comando executado: ".concat(JSON.stringify(commandData)));
                    return [3 /*break*/, 30];
                case 29:
                    error_1 = _e.sent();
                    logger_1["default"].error("Erro ao executar comando:", error_1);
                    result = {
                        success: false,
                        error: error_1 instanceof Error ? error_1.message : "Erro ao executar comando"
                    };
                    return [3 /*break*/, 30];
                case 30: return [3 /*break*/, 79];
                case 31:
                    _e.trys.push([31, 36, , 37]);
                    if (!args.commands || !Array.isArray(args.commands)) {
                        result = { success: false, error: "commands deve ser um array" };
                        return [3 /*break*/, 79];
                    }
                    allResults = [];
                    allSuccessful = true;
                    _i = 0, _c = args.commands;
                    _e.label = 32;
                case 32:
                    if (!(_i < _c.length)) return [3 /*break*/, 35];
                    cmd = _c[_i];
                    return [4 /*yield*/, executeOpenAiTool("execute_command", cmd, ticket, contact, availableTags, allQueues, allowedTools, wbot, msg)];
                case 33:
                    cmdResult = _e.sent();
                    if (cmdResult.message) {
                        allResults.push(cmdResult.message);
                    }
                    if (!cmdResult.success) {
                        allSuccessful = false;
                    }
                    _e.label = 34;
                case 34:
                    _i++;
                    return [3 /*break*/, 32];
                case 35:
                    result = {
                        success: allSuccessful,
                        message: allResults.join("; "),
                        commandsExecuted: args.commands.length
                    };
                    logger_1["default"].info("M\u00FAltiplos comandos executados: ".concat(args.commands.length, " comandos"));
                    return [3 /*break*/, 37];
                case 36:
                    error_2 = _e.sent();
                    logger_1["default"].error("Erro ao executar m\u00FAltiplos comandos:", error_2);
                    result = {
                        success: false,
                        error: error_2 instanceof Error ? error_2.message : "Erro ao executar múltiplos comandos"
                    };
                    return [3 /*break*/, 37];
                case 37: return [3 /*break*/, 79];
                case 38:
                    _e.trys.push([38, 40, , 41]);
                    return [4 /*yield*/, Ferramenta_1["default"].findAll({
                            where: {
                                companyId: ticket.companyId,
                                status: 'ativo'
                            },
                            order: [["nome", "ASC"]]
                        })];
                case 39:
                    activeTools = _e.sent();
                    normalizePlaceholderList_1 = function (rawValue) {
                        if (!rawValue)
                            return [];
                        if (Array.isArray(rawValue)) {
                            return rawValue
                                .map(function (item) {
                                if (typeof item === 'string')
                                    return item.trim();
                                if (item && typeof item === 'object') {
                                    return item.key || item.name || item.placeholder || '';
                                }
                                return '';
                            })
                                .filter(Boolean);
                        }
                        if (typeof rawValue === 'object') {
                            return Object.keys(rawValue).filter(function (key) { return key.trim(); });
                        }
                        return [];
                    };
                    toolsList = activeTools.map(function (t) { return ({
                        nome: t.nome,
                        descricao: t.descricao || 'Sem descrição',
                        metodo: t.metodo,
                        placeholders: normalizePlaceholderList_1(t.placeholders)
                    }); });
                    result = {
                        success: true,
                        tools: toolsList,
                        count: toolsList.length,
                        message: "".concat(toolsList.length, " ferramenta(s) dispon\u00EDvel(is)")
                    };
                    logger_1["default"].info("[TOOLS] Listadas ".concat(toolsList.length, " ferramentas ativas para companyId ").concat(ticket.companyId));
                    return [3 /*break*/, 41];
                case 40:
                    error_3 = _e.sent();
                    logger_1["default"].error("[TOOLS] Erro ao listar ferramentas:", error_3);
                    result = {
                        success: false,
                        error: error_3 instanceof Error ? error_3.message : "Erro ao listar ferramentas"
                    };
                    return [3 /*break*/, 41];
                case 41: return [3 /*break*/, 79];
                case 42:
                    if (!args.alias || !args.pergunta) {
                        result = {
                            success: false,
                            reason: "Parâmetros 'alias' e 'pergunta' são obrigatórios"
                        };
                    }
                    else {
                        logger_1["default"].info("call_prompt_agent solicitado com alias=".concat(args.alias, " para ticket ").concat(ticket.id));
                        result = {
                            success: true,
                            message: "Solicitação registrada. Será tratada pelo orquestrador de IA."
                        };
                    }
                    return [3 /*break*/, 79];
                case 43:
                    _e.trys.push([43, 55, , 56]);
                    flowId = parseInt(args.flowId);
                    if (!flowId || isNaN(flowId)) {
                        result = { success: false, error: "flowId inválido ou não fornecido" };
                        return [3 /*break*/, 79];
                    }
                    // Implementação exata como o nó transferFlow
                    console.log("TransferFlow: Transferindo para fluxo ID ".concat(flowId));
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../../models/FlowBuilder")); })];
                case 44:
                    FlowBuilderModel = (_e.sent()).FlowBuilderModel;
                    return [4 /*yield*/, FlowBuilderModel.findOne({
                            where: { id: flowId, company_id: ticket.companyId }
                        })];
                case 45:
                    targetFlow = _e.sent();
                    if (!(targetFlow && targetFlow.flow)) return [3 /*break*/, 53];
                    console.log("TransferFlow: Fluxo encontrado, processando dados...");
                    flowData = typeof targetFlow.flow === 'string'
                        ? JSON.parse(targetFlow.flow)
                        : targetFlow.flow;
                    newNodes = flowData.nodes || [];
                    newConnects = flowData.connections || [];
                    console.log("TransferFlow: N\u00F3 encontrados: ".concat(newNodes.length, ", Conex\u00F5es: ").concat(newConnects.length));
                    startNode_1 = newNodes.find(function (n) { return n.type === "start"; });
                    console.log("TransferFlow: N\u00F3 start encontrado: ".concat(startNode_1 ? startNode_1.id : 'NÃO'));
                    if (!startNode_1) return [3 /*break*/, 51];
                    startConnection = newConnects.find(function (c) { return c.source === startNode_1.id; });
                    console.log("TransferFlow: Conex\u00E3o start encontrada: ".concat(startConnection ? startConnection.target : 'NÃO'));
                    if (!startConnection) return [3 /*break*/, 49];
                    crypto_1 = require('crypto');
                    hashWebhookId = crypto_1.randomBytes(6).toString('hex');
                    // Atualizar ticket com novo fluxo (exatamente como o nó)
                    return [4 /*yield*/, ticket.update({
                            flowWebhook: true,
                            lastFlowId: startConnection.target,
                            hashFlowId: hashWebhookId,
                            flowStopped: flowId.toString()
                        })];
                case 46:
                    // Atualizar ticket com novo fluxo (exatamente como o nó)
                    _e.sent();
                    flowDetails = {
                        inputs: [],
                        keysFull: []
                    };
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../WebhookService/ActionsWebhookService")); })];
                case 47:
                    ActionsWebhookService = (_e.sent()).ActionsWebhookService;
                    return [4 /*yield*/, ActionsWebhookService(ticket.whatsappId, flowId, ticket.companyId, newNodes, newConnects, startConnection.target, {}, flowDetails, hashWebhookId, undefined, ticket.id, "", msg)];
                case 48:
                    _e.sent();
                    // Retornar sucesso silencioso
                    result = {
                        success: true,
                        silent: true,
                        message: "TransferFlow: Cliente transferido para o flow builder ".concat(flowId)
                    };
                    console.log("TransferFlow: Cliente transferido para o flow builder ".concat(flowId));
                    return [3 /*break*/, 50];
                case 49:
                    result = { success: false, error: "Conexão de início não encontrada no fluxo" };
                    _e.label = 50;
                case 50: return [3 /*break*/, 52];
                case 51:
                    result = { success: false, error: "Nó de início não encontrado no fluxo" };
                    _e.label = 52;
                case 52: return [3 /*break*/, 54];
                case 53:
                    result = { success: false, error: "Fluxo não encontrado" };
                    _e.label = 54;
                case 54: return [3 /*break*/, 56];
                case 55:
                    error_4 = _e.sent();
                    console.error("TransferFlow: Erro ao transferir para flow builder:", error_4);
                    result = { success: false, error: "Erro ao transferir para fluxo" };
                    return [3 /*break*/, 56];
                case 56: return [3 /*break*/, 79];
                case 57:
                    _e.trys.push([57, 59, , 60]);
                    pauseMinutes = parseInt(String(args.pauseBot));
                    pauseUntil = new Date(Date.now() + pauseMinutes * 60 * 1000);
                    return [4 /*yield*/, ticket.update({
                            isBot: false,
                            botPausedUntil: pauseUntil
                        })];
                case 58:
                    _e.sent();
                    result = {
                        success: true,
                        message: "Bot pausado por ".concat(pauseMinutes, " minutos at\u00E9 ").concat(pauseUntil.toLocaleTimeString('pt-BR'))
                    };
                    logger_1["default"].info("Bot pausado para ticket ".concat(ticket.id, " por ").concat(pauseMinutes, " minutos"));
                    return [3 /*break*/, 60];
                case 59:
                    error_5 = _e.sent();
                    logger_1["default"].error("Erro ao pausar bot:", error_5);
                    result = { success: false, error: "Erro ao pausar bot" };
                    return [3 /*break*/, 60];
                case 60: return [3 /*break*/, 79];
                case 61:
                    _e.trys.push([61, 63, , 64]);
                    if (!wbot) {
                        result = { success: false, error: "WhatsApp bot não disponível" };
                        return [3 /*break*/, 79];
                    }
                    locationData = args.sendLocation || "";
                    _d = locationData.split(",").map(function (s) { return s.trim(); }), lat = _d[0], lng = _d[1], name_1 = _d[2];
                    if (!lat || !lng) {
                        result = { success: false, error: "Latitude e longitude são obrigatórias" };
                        return [3 /*break*/, 79];
                    }
                    latitude = parseFloat(lat);
                    longitude = parseFloat(lng);
                    if (isNaN(latitude) || isNaN(longitude)) {
                        result = { success: false, error: "Latitude ou longitude inválidas" };
                        return [3 /*break*/, 79];
                    }
                    return [4 /*yield*/, wbot.sendMessage(msg === null || msg === void 0 ? void 0 : msg.key.remoteJid, {
                            location: {
                                degreesLatitude: latitude,
                                degreesLongitude: longitude,
                                name: name_1 || "Localização"
                            }
                        })];
                case 62:
                    _e.sent();
                    result = {
                        success: true,
                        message: "Localiza\u00E7\u00E3o enviada: ".concat(name_1 || "Localização"),
                        latitude: latitude,
                        longitude: longitude
                    };
                    logger_1["default"].info("Localiza\u00E7\u00E3o enviada para ticket ".concat(ticket.id));
                    return [3 /*break*/, 64];
                case 63:
                    error_6 = _e.sent();
                    logger_1["default"].error("Erro ao enviar localiza\u00E7\u00E3o:", error_6);
                    result = { success: false, error: "Erro ao enviar localização" };
                    return [3 /*break*/, 64];
                case 64: return [3 /*break*/, 79];
                case 65:
                    _e.trys.push([65, 67, , 68]);
                    nodeId = args.jumpToNode;
                    if (!nodeId) {
                        result = { success: false, error: "ID do nó não fornecido" };
                        return [3 /*break*/, 79];
                    }
                    return [4 /*yield*/, ticket.update({
                            lastFlowId: nodeId
                        })];
                case 66:
                    _e.sent();
                    result = {
                        success: true,
                        message: "Fluxo redirecionado para n\u00F3 ".concat(nodeId),
                        nodeId: nodeId
                    };
                    logger_1["default"].info("Fluxo redirecionado para n\u00F3 ".concat(nodeId, " no ticket ").concat(ticket.id));
                    return [3 /*break*/, 68];
                case 67:
                    error_7 = _e.sent();
                    logger_1["default"].error("Erro ao pular para n\u00F3:", error_7);
                    result = { success: false, error: "Erro ao redirecionar fluxo" };
                    return [3 /*break*/, 68];
                case 68: return [3 /*break*/, 79];
                case 69:
                    _e.trys.push([69, 71, , 72]);
                    notifyUserId = parseInt(String(args.notifyUser));
                    notifyMsg = args.notifyMessage || "Notificação do sistema";
                    return [4 /*yield*/, User_1["default"].findOne({
                            where: { id: notifyUserId, companyId: ticket.companyId }
                        })];
                case 70:
                    userToNotify = _e.sent();
                    if (!userToNotify) {
                        result = { success: false, error: "Usu\u00E1rio ID ".concat(notifyUserId, " n\u00E3o encontrado") };
                        return [3 /*break*/, 79];
                    }
                    (0, socket_1.getIO)()
                        .of(String(ticket.companyId))
                        .to("user-".concat(notifyUserId))
                        .emit("company-".concat(ticket.companyId, "-notification"), {
                        action: "notify",
                        ticketId: ticket.id,
                        userId: notifyUserId,
                        message: notifyMsg,
                        timestamp: new Date()
                    });
                    result = {
                        success: true,
                        message: "Notifica\u00E7\u00E3o enviada para ".concat(userToNotify.name),
                        userId: notifyUserId
                    };
                    logger_1["default"].info("Notifica\u00E7\u00E3o enviada para usu\u00E1rio ".concat(notifyUserId, " sobre ticket ").concat(ticket.id));
                    return [3 /*break*/, 72];
                case 71:
                    error_8 = _e.sent();
                    logger_1["default"].error("Erro ao notificar usu\u00E1rio:", error_8);
                    result = { success: false, error: "Erro ao enviar notificação" };
                    return [3 /*break*/, 72];
                case 72: return [3 /*break*/, 79];
                case 73:
                    try {
                        cpfValue = args.validateCPF || "";
                        validation = validateCPFCNPJ(cpfValue);
                        result = {
                            success: true,
                            valid: validation.valid,
                            type: validation.type,
                            formatted: validation.formatted,
                            message: validation.valid
                                ? "".concat(validation.type, " v\u00E1lido: ").concat(validation.formatted)
                                : "".concat(validation.type, " inv\u00E1lido")
                        };
                        logger_1["default"].info("Valida\u00E7\u00E3o de CPF/CNPJ: ".concat(validation.valid ? 'válido' : 'inválido'));
                    }
                    catch (error) {
                        logger_1["default"].error("Erro ao validar CPF/CNPJ:", error);
                        result = { success: false, error: "Erro ao validar CPF/CNPJ" };
                    }
                    return [3 /*break*/, 79];
                case 74:
                    try {
                        emailValue = args.validateEmail || "";
                        validation = validateEmailAddress(emailValue);
                        result = {
                            success: true,
                            valid: validation.valid,
                            email: validation.email,
                            message: validation.valid
                                ? "Email v\u00E1lido: ".concat(validation.email)
                                : "Email inv\u00E1lido: ".concat(validation.email)
                        };
                        logger_1["default"].info("Valida\u00E7\u00E3o de email: ".concat(validation.valid ? 'válido' : 'inválido'));
                    }
                    catch (error) {
                        logger_1["default"].error("Erro ao validar email:", error);
                        result = { success: false, error: "Erro ao validar email" };
                    }
                    return [3 /*break*/, 79];
                case 75:
                    try {
                        phoneValue = args.validatePhone || "";
                        validation = validatePhoneNumber(phoneValue);
                        result = {
                            success: true,
                            valid: validation.valid,
                            formatted: validation.formatted,
                            ddd: validation.ddd,
                            message: validation.valid
                                ? "Telefone v\u00E1lido: ".concat(validation.formatted)
                                : "Telefone inv\u00E1lido: ".concat(validation.formatted)
                        };
                        logger_1["default"].info("Valida\u00E7\u00E3o de telefone: ".concat(validation.valid ? 'válido' : 'inválido'));
                    }
                    catch (error) {
                        logger_1["default"].error("Erro ao validar telefone:", error);
                        result = { success: false, error: "Erro ao validar telefone" };
                    }
                    return [3 /*break*/, 79];
                case 76:
                    try {
                        scheduleTime = args.scheduleMessage;
                        messageContent = args.messageText;
                        if (!scheduleTime || !messageContent) {
                            result = { success: false, error: "Data/hora e mensagem são obrigatórias" };
                            return [3 /*break*/, 79];
                        }
                        scheduledDate = new Date(scheduleTime);
                        if (isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
                            result = { success: false, error: "Data/hora inválida ou no passado" };
                            return [3 /*break*/, 79];
                        }
                        // TODO: Implementar tabela de agendamentos ou usar job scheduler
                        // Por enquanto, apenas retorna sucesso com informações
                        result = {
                            success: true,
                            message: "Mensagem agendada para ".concat(scheduledDate.toLocaleString('pt-BR')),
                            scheduledFor: scheduledDate.toISOString(),
                            messageText: messageContent,
                            note: "Funcionalidade de agendamento em desenvolvimento"
                        };
                        logger_1["default"].info("Mensagem agendada para ".concat(scheduledDate.toISOString(), " no ticket ").concat(ticket.id));
                    }
                    catch (error) {
                        logger_1["default"].error("Erro ao agendar mensagem:", error);
                        result = { success: false, error: "Erro ao agendar mensagem" };
                    }
                    return [3 /*break*/, 79];
                case 77:
                    result = {
                        success: false,
                        reason: "".concat(toolName, " precisa ser executado no contexto do OpenAiService")
                    };
                    logger_1["default"].info("Ferramenta ".concat(toolName, " chamada - delegada ao contexto principal"));
                    return [3 /*break*/, 79];
                case 78:
                    result = {
                        success: false,
                        reason: "Ferramenta desconhecida: ".concat(toolName)
                    };
                    _e.label = 79;
                case 79: return [3 /*break*/, 81];
                case 80:
                    error_9 = _e.sent();
                    logger_1["default"].error("Erro ao executar ferramenta ".concat(toolName, ":"), error_9);
                    result = {
                        success: false,
                        error: error_9 instanceof Error ? error_9.message : "Erro desconhecido"
                    };
                    return [3 /*break*/, 81];
                case 81: return [2 /*return*/, result];
            }
        });
    });
}
exports.executeOpenAiTool = executeOpenAiTool;
function getToolInstructions(availableTags, queueNames) {
    return "\nFERRAMENTAS DISPON\u00CDVEIS:\n\n1. TRANSFERIR PARA FLUXO (call_flow_builder):\n   - Transfere o cliente para um fluxo automatizado espec\u00EDfico\n   - Par\u00E2metro: flowId (ID do fluxo)\n   - Exemplo: flowId: 31\n\n2. FORMATAR MENSAGEM (format_message):\n   - Personaliza mensagens com vari\u00E1veis din\u00E2micas\n   - Vari\u00E1veis dispon\u00EDveis:\n     * {{ms}} - Sauda\u00E7\u00E3o autom\u00E1tica (Bom dia/tarde/noite/madrugada)\n     * {{name}} / {{firstName}} - Nome completo ou primeiro nome do contato\n     * {{userName}} - Nome do atendente atual\n     * {{date}} - Data atual\n     * {{ticket_id}} - N\u00FAmero do chamado\n     * {{queue}} - Nome da fila/setor (configuradas: ".concat(queueNames.join(", ") || "nenhuma", ")\n     * {{connection}} - Nome da conex\u00E3o WhatsApp\n     * {{protocol}} - Protocolo \u00FAnico do atendimento\n     * {{hora}} - Hora atual (HH:MM:SS)\n   - Exemplo: \"{{ms}}  {{firstName}}! Seu protocolo \u00E9 {{protocol}}\"\n\n3. EXECUTAR COMANDO (execute_command):\n   - Executa comandos administrativos (transfer\u00EAncias, tags, encerrar, resposta r\u00E1pida)\n   - Formato: JSON entre #{ ... }\n   - Exemplos:\n     * Transferir fila: #{ \"queueId\":\"5\" }\n     * Transferir para atendente: #{ \"queueId\":\"5\", \"userId\":\"12\" }\n     * Adicionar tag: #{ \"tagId\":\"14\" }\n     * Encerrar ticket: #{ \"closeTicket\":\"1\" }\n     * Enviar resposta r\u00E1pida: #{ \"resp\":\"1\" } (ID da QuickMessage)\n   - Tags dispon\u00EDveis: ").concat(availableTags.join(", ") || "nenhuma", "\n\n4. LISTAR FERRAMENTAS (list_available_tools):\n   - Lista todas as ferramentas/APIs pr\u00E9-configuradas e ativas\n   - Use ANTES de executar qualquer ferramenta para saber quais est\u00E3o dispon\u00EDveis\n   - Retorna: nome, descri\u00E7\u00E3o, m\u00E9todo e placeholders necess\u00E1rios\n   - N\u00E3o requer par\u00E2metros\n\n5. EXECUTAR FERRAMENTA (execute_tool):\n   - Executa ferramentas/APIs pr\u00E9-configuradas no sistema\n   - IMPORTANTE: Use list_available_tools primeiro para ver ferramentas dispon\u00EDveis\n   - Preencha APENAS os placeholders necess\u00E1rios (n\u00E3o altere URL/headers/m\u00E9todo)\n   - Par\u00E2metros: ferramentaNome e placeholders (ex: {cep: \"01001000\"})\n   \n   INTERPRETA\u00C7\u00C3O DE RESPOSTAS (CR\u00CDTICO):\n   - NUNCA mostre JSON cru da API ao usu\u00E1rio\n   - SEMPRE interprete a resposta e responda de forma natural\n   - Adapte o tom conforme o contexto da conversa\n   \n   Exemplos corretos:\n   * API: {\"status\": \"success\", \"id\": 8472}\n     Voc\u00EA: \"Seu cadastro foi realizado com sucesso! \"\n   \n   * API: {\"status\": \"error\", \"message\": \"CPF inv\u00E1lido\"}\n     Voc\u00EA: \"O CPF informado parece ser inv\u00E1lido. Pode conferir e me enviar novamente?\"\n   \n   Exemplo ERRADO:\n   * Voc\u00EA: {\"status\": \"success\", \"id\": 8472} \n\nREGRAS IMPORTANTES:\n- Utilize apenas IDs confirmados nas instru\u00E7\u00F5es personalizadas ou no prompt.\n- Se n\u00E3o tiver certeza do ID correto, pe\u00E7a confirma\u00E7\u00E3o antes de executar.\n- Para ferramentas: liste primeiro, execute depois, interprete sempre.\n- NUNCA exponha JSON cru ao usu\u00E1rio - sempre traduza para linguagem natural.\n");
}
exports.getToolInstructions = getToolInstructions;
function isValidTag(tagName, availableTags) {
    return availableTags.includes(tagName);
}
exports.isValidTag = isValidTag;
function isValidQueue(queueName, allQueues, companyId) {
    return allQueues.some(function (q) { return q.name === queueName && q.companyId === companyId; });
}
exports.isValidQueue = isValidQueue;
function formatMessageWithVariables(message, ticket, contact, user, queue, customVariables) {
    var _a, _b, _c;
    var formattedMessage = message;
    var hour = new Date().getHours();
    var greeting = "Boa noite";
    if (hour >= 5 && hour < 12)
        greeting = "Bom dia";
    else if (hour >= 12 && hour < 18)
        greeting = "Boa tarde";
    else if (hour >= 0 && hour < 5)
        greeting = "Boa madrugada";
    formattedMessage = formattedMessage.replace(/\{\{ms\}\}/g, greeting);
    if (contact === null || contact === void 0 ? void 0 : contact.name) {
        formattedMessage = formattedMessage.replace(/\{\{name\}\}/g, contact.name);
        var firstName = contact.name.split(' ')[0];
        formattedMessage = formattedMessage.replace(/\{\{firstName\}\}/g, firstName);
    }
    if (user === null || user === void 0 ? void 0 : user.name) {
        formattedMessage = formattedMessage.replace(/\{\{userName\}\}/g, user.name);
    }
    var date = new Date().toLocaleDateString('pt-BR');
    formattedMessage = formattedMessage.replace(/\{\{date\}\}/g, date);
    if (ticket === null || ticket === void 0 ? void 0 : ticket.id) {
        formattedMessage = formattedMessage.replace(/\{\{ticket_id\}\}/g, ticket.id.toString());
    }
    if ((queue === null || queue === void 0 ? void 0 : queue.name) || ((_a = ticket === null || ticket === void 0 ? void 0 : ticket.queue) === null || _a === void 0 ? void 0 : _a.name)) {
        var queueName = (queue === null || queue === void 0 ? void 0 : queue.name) || ((_b = ticket === null || ticket === void 0 ? void 0 : ticket.queue) === null || _b === void 0 ? void 0 : _b.name) || "Sem fila";
        formattedMessage = formattedMessage.replace(/\{\{queue\}\}/g, queueName);
    }
    if ((_c = ticket === null || ticket === void 0 ? void 0 : ticket.whatsapp) === null || _c === void 0 ? void 0 : _c.name) {
        formattedMessage = formattedMessage.replace(/\{\{connection\}\}/g, ticket.whatsapp.name);
    }
    if ((ticket === null || ticket === void 0 ? void 0 : ticket.id) && (ticket === null || ticket === void 0 ? void 0 : ticket.createdAt)) {
        var protocol = "".concat(ticket.id).concat(new Date(ticket.createdAt).getTime());
        formattedMessage = formattedMessage.replace(/\{\{protocol\}\}/g, protocol);
    }
    var hora = new Date().toLocaleTimeString('pt-BR');
    formattedMessage = formattedMessage.replace(/\{\{hora\}\}/g, hora);
    if (customVariables) {
        Object.keys(customVariables).forEach(function (key) {
            var regex = new RegExp("\\{\\{".concat(key, "\\}\\}"), 'g');
            formattedMessage = formattedMessage.replace(regex, customVariables[key]);
        });
    }
    return formattedMessage;
}
exports.formatMessageWithVariables = formatMessageWithVariables;
