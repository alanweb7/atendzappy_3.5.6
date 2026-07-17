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
exports.executeStartFlow = exports.ExecuteTagAutoActions = void 0;
var Tag_1 = __importDefault(require("../models/Tag"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var TicketTag_1 = __importDefault(require("../models/TicketTag"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var Contact_1 = __importDefault(require("../models/Contact"));
var User_1 = __importDefault(require("../models/User"));
var Queue_1 = __importDefault(require("../models/Queue"));
var Schedule_1 = __importDefault(require("../models/Schedule"));
var CrmLead_1 = __importDefault(require("../models/CrmLead"));
var FlowBuilder_1 = require("../models/FlowBuilder");
var randomCode_1 = require("../utils/randomCode");
var socket_1 = require("../libs/socket");
var logger_1 = __importDefault(require("../utils/logger"));
var ActionsWebhookService_1 = require("./WebhookService/ActionsWebhookService");
var ExecuteTagAutoActions = function (tagId, ticketId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, ticket, contact, _i, _a, action, io, ticketJSON, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                logger_1["default"].info("[ExecuteTagAutoActions] Iniciando execu\u00E7\u00E3o - tagId=".concat(tagId, ", ticketId=").concat(ticketId, ", companyId=").concat(companyId));
                return [4 /*yield*/, Tag_1["default"].findOne({
                        where: { id: tagId, companyId: companyId }
                    })];
            case 1:
                tag = _b.sent();
                if (!tag) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] Tag ".concat(tagId, " n\u00E3o encontrada"));
                    return [2 /*return*/];
                }
                if (!tag.autoActions || !Array.isArray(tag.autoActions) || tag.autoActions.length === 0) {
                    logger_1["default"].info("[ExecuteTagAutoActions] Tag ".concat(tagId, " n\u00E3o tem a\u00E7\u00F5es autom\u00E1ticas configuradas"));
                    return [2 /*return*/];
                }
                logger_1["default"].info("[ExecuteTagAutoActions] Tag ".concat(tagId, " tem ").concat(tag.autoActions.length, " a\u00E7\u00F5es configuradas"));
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId, {
                        include: [
                            { model: Tag_1["default"], as: "tags" },
                            { model: Contact_1["default"], as: "contact" },
                            { model: User_1["default"], as: "user" },
                            { model: Queue_1["default"], as: "queue" }
                        ]
                    })];
            case 2:
                ticket = _b.sent();
                if (!ticket) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] Ticket ".concat(ticketId, " n\u00E3o encontrado"));
                    return [2 /*return*/];
                }
                contact = ticket.contact;
                if (!contact) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] Ticket ".concat(ticketId, " n\u00E3o tem contato associado"));
                    return [2 /*return*/];
                }
                logger_1["default"].info("[ExecuteTagAutoActions] Ticket encontrado com contactId=".concat(contact.id));
                logger_1["default"].info("[ExecuteTagAutoActions] Executando ".concat(tag.autoActions.length, " a\u00E7\u00F5es para tag ").concat(tagId, ", ticket ").concat(ticketId));
                _i = 0, _a = tag.autoActions;
                _b.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                action = _a[_i];
                logger_1["default"].info("[ExecuteTagAutoActions] Executando a\u00E7\u00E3o type=".concat(action.type, ", id=").concat(action.id));
                return [4 /*yield*/, executeAction(action, ticket, contact, companyId)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                logger_1["default"].info("[ExecuteTagAutoActions] Execu\u00E7\u00E3o conclu\u00EDda com sucesso");
                io = (0, socket_1.getIO)();
                ticketJSON = ticket.toJSON();
                if (!ticketJSON.tags)
                    ticketJSON.tags = [];
                ticketJSON.tags = ticketJSON.tags.filter(function (t) { return t && t.name; });
                io.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), {
                    action: "update",
                    ticket: ticketJSON
                });
                logger_1["default"].info("[ExecuteTagAutoActions] A\u00E7\u00F5es executadas com sucesso para ticket ".concat(ticketId));
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                logger_1["default"].error("[ExecuteTagAutoActions] Erro ao executar a\u00E7\u00F5es:", error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.ExecuteTagAutoActions = ExecuteTagAutoActions;
var executeAction = function (action, ticket, contact, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = action.type;
                switch (_a) {
                    case "addTag": return [3 /*break*/, 1];
                    case "transferQueue": return [3 /*break*/, 3];
                    case "transferUser": return [3 /*break*/, 5];
                    case "transferQueueUser": return [3 /*break*/, 7];
                    case "closeTicket": return [3 /*break*/, 9];
                    case "setLeadStatus": return [3 /*break*/, 11];
                    case "startFlow": return [3 /*break*/, 13];
                    case "scheduleMessage": return [3 /*break*/, 15];
                }
                return [3 /*break*/, 17];
            case 1: return [4 /*yield*/, executeAddTag(action, ticket, contact, companyId)];
            case 2:
                _b.sent();
                return [3 /*break*/, 18];
            case 3: return [4 /*yield*/, executeTransferQueue(action, ticket, companyId)];
            case 4:
                _b.sent();
                return [3 /*break*/, 18];
            case 5: return [4 /*yield*/, executeTransferUser(action, ticket, companyId)];
            case 6:
                _b.sent();
                return [3 /*break*/, 18];
            case 7: return [4 /*yield*/, executeTransferQueueUser(action, ticket, companyId)];
            case 8:
                _b.sent();
                return [3 /*break*/, 18];
            case 9: return [4 /*yield*/, executeCloseTicket(ticket, companyId)];
            case 10:
                _b.sent();
                return [3 /*break*/, 18];
            case 11: return [4 /*yield*/, executeSetLeadStatus(action, contact, companyId)];
            case 12:
                _b.sent();
                return [3 /*break*/, 18];
            case 13: return [4 /*yield*/, (0, exports.executeStartFlow)(action, contact, ticket, companyId)];
            case 14:
                _b.sent();
                return [3 /*break*/, 18];
            case 15: return [4 /*yield*/, executeScheduleMessage(action, ticket, contact, companyId)];
            case 16:
                _b.sent();
                return [3 /*break*/, 18];
            case 17:
                logger_1["default"].warn("[ExecuteTagAutoActions] Tipo de a\u00E7\u00E3o desconhecido: ".concat(action.type));
                _b.label = 18;
            case 18: return [2 /*return*/];
        }
    });
}); };
var executeAddTag = function (action, ticket, contact, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tagId, tag, _a, ticketTag, created, error_2, _b, contactTag, created, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!action.tagId) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] addTag: tagId n\u00E3o fornecido");
                    return [2 /*return*/];
                }
                tagId = parseInt(action.tagId);
                return [4 /*yield*/, Tag_1["default"].findOne({
                        where: { id: tagId, companyId: companyId }
                    })];
            case 1:
                tag = _c.sent();
                if (!tag) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] addTag: Tag ".concat(tagId, " n\u00E3o encontrada"));
                    return [2 /*return*/];
                }
                logger_1["default"].info("[ExecuteTagAutoActions] Tag \"".concat(tag.name, "\" encontrada"));
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                logger_1["default"].info("[ExecuteTagAutoActions] addTag: Adicionando tag ao ticket ".concat(ticket.id));
                return [4 /*yield*/, TicketTag_1["default"].findOrCreate({
                        where: { ticketId: ticket.id, tagId: tag.id }
                    })];
            case 3:
                _a = _c.sent(), ticketTag = _a[0], created = _a[1];
                logger_1["default"].info("[ExecuteTagAutoActions] addTag: TicketTag ".concat(created ? 'criado' : 'já existia'));
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                logger_1["default"].error("[ExecuteTagAutoActions] addTag: Erro ao adicionar tag ao ticket:", error_2.message);
                return [3 /*break*/, 5];
            case 5:
                _c.trys.push([5, 7, , 8]);
                logger_1["default"].info("[ExecuteTagAutoActions] addTag: Adicionando tag ao contato ".concat(contact.id));
                return [4 /*yield*/, ContactTag_1["default"].findOrCreate({
                        where: { contactId: contact.id, tagId: tag.id, companyId: companyId }
                    })];
            case 6:
                _b = _c.sent(), contactTag = _b[0], created = _b[1];
                logger_1["default"].info("[ExecuteTagAutoActions] addTag: ContactTag ".concat(created ? 'criado' : 'já existia'));
                return [3 /*break*/, 8];
            case 7:
                error_3 = _c.sent();
                logger_1["default"].error("[ExecuteTagAutoActions] addTag: Erro ao adicionar tag ao contato:", error_3.message);
                return [3 /*break*/, 8];
            case 8:
                logger_1["default"].info("[ExecuteTagAutoActions] Tag \"".concat(tag.name, "\" adicionada ao ticket ").concat(ticket.id));
                return [2 /*return*/];
        }
    });
}); };
var executeTransferQueue = function (action, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var queueId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!action.queueId) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] transferQueue: queueId n\u00E3o fornecido");
                    return [2 /*return*/];
                }
                queueId = parseInt(action.queueId);
                ticket.queueId = queueId;
                return [4 /*yield*/, ticket.save()];
            case 1:
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] Ticket ".concat(ticket.id, " transferido para fila ").concat(queueId));
                return [2 /*return*/];
        }
    });
}); };
var executeTransferUser = function (action, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!action.userId) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] transferUser: userId n\u00E3o fornecido");
                    return [2 /*return*/];
                }
                userId = parseInt(action.userId);
                ticket.userId = userId;
                return [4 /*yield*/, ticket.save()];
            case 1:
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] Ticket ".concat(ticket.id, " atribu\u00EDdo ao usu\u00E1rio ").concat(userId));
                return [2 /*return*/];
        }
    });
}); };
var executeTransferQueueUser = function (action, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var queueId, userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!action.queueId || !action.userId) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] transferQueueUser: queueId ou userId n\u00E3o fornecido");
                    return [2 /*return*/];
                }
                queueId = parseInt(action.queueId);
                userId = parseInt(action.userId);
                ticket.queueId = queueId;
                ticket.userId = userId;
                return [4 /*yield*/, ticket.save()];
            case 1:
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] Ticket ".concat(ticket.id, " transferido para fila ").concat(queueId, " e usu\u00E1rio ").concat(userId));
                return [2 /*return*/];
        }
    });
}); };
var executeCloseTicket = function (ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketVerificado, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1["default"].info("[ExecuteTagAutoActions] closeTicket: Status ANTES: ".concat(ticket.status));
                return [4 /*yield*/, Ticket_1["default"].update({ status: "closed", queueId: null, userId: null }, { where: { id: ticket.id } })];
            case 1:
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] closeTicket: Ticket ".concat(ticket.id, " atualizado para closed"));
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticket.id)];
            case 2:
                ticketVerificado = _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] closeTicket: Status NO BANCO: ".concat(ticketVerificado === null || ticketVerificado === void 0 ? void 0 : ticketVerificado.status));
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), {
                    action: "delete",
                    ticketId: ticket.id
                });
                logger_1["default"].info("[ExecuteTagAutoActions] Ticket ".concat(ticket.id, " encerrado"));
                return [2 /*return*/];
        }
    });
}); };
var executeSetLeadStatus = function (action, contact, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var lead, leadVerificado, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!action.leadStatus) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] setLeadStatus: leadStatus n\u00E3o fornecido");
                    return [2 /*return*/];
                }
                logger_1["default"].info("[ExecuteTagAutoActions] setLeadStatus: Buscando lead para contactId=".concat(contact.id, ", companyId=").concat(companyId));
                return [4 /*yield*/, CrmLead_1["default"].findOne({
                        where: { contactId: contact.id, companyId: companyId }
                    })];
            case 1:
                lead = _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] setLeadStatus: Lead encontrado? ".concat(!!lead, ", ID: ").concat(lead === null || lead === void 0 ? void 0 : lead.id));
                if (!lead) return [3 /*break*/, 4];
                logger_1["default"].info("[ExecuteTagAutoActions] setLeadStatus: Status ATUAL do lead: \"".concat(lead.leadStatus, "\""));
                logger_1["default"].info("[ExecuteTagAutoActions] setLeadStatus: Status NOVO do lead: \"".concat(action.leadStatus, "\""));
                lead.leadStatus = action.leadStatus;
                return [4 /*yield*/, lead.save()];
            case 2:
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] Lead ".concat(lead.id, " status alterado para ").concat(action.leadStatus));
                return [4 /*yield*/, CrmLead_1["default"].findByPk(lead.id)];
            case 3:
                leadVerificado = _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] setLeadStatus: Status AP\u00D3S salvar: \"".concat(leadVerificado === null || leadVerificado === void 0 ? void 0 : leadVerificado.leadStatus, "\""));
                io = (0, socket_1.getIO)();
                io.emit("company-".concat(companyId, "-crm-lead"), {
                    action: "update",
                    lead: leadVerificado
                });
                logger_1["default"].info("[ExecuteTagAutoActions] Evento socket emitido para atualizar lead ".concat(lead.id));
                return [3 /*break*/, 5];
            case 4:
                logger_1["default"].warn("[ExecuteTagAutoActions] Lead n\u00E3o encontrado para contato ".concat(contact.id));
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var executeScheduleMessage = function (action, ticket, contact, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var delay, unit, sendAt, tagIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!action.scheduleDelay) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] scheduleMessage: dados incompletos");
                    return [2 /*return*/];
                }
                delay = parseInt(action.scheduleDelay);
                unit = action.scheduleDelayUnit || "hours";
                sendAt = new Date();
                if (unit === "minutes") {
                    sendAt.setMinutes(sendAt.getMinutes() + delay);
                }
                else if (unit === "hours") {
                    sendAt.setHours(sendAt.getHours() + delay);
                }
                else {
                    sendAt.setDate(sendAt.getDate() + delay);
                }
                tagIds = action.scheduleStartFlow && action.scheduleFlowId
                    ? { flowId: action.scheduleFlowId, startFlow: true }
                    : [];
                // Criar agendamento
                return [4 /*yield*/, Schedule_1["default"].create({
                        body: action.scheduleMessageText || "",
                        sendAt: sendAt,
                        contactId: contact.id,
                        ticketId: ticket.id,
                        companyId: companyId,
                        status: "PENDENTE",
                        whatsappId: ticket.whatsappId,
                        tagIds: tagIds
                    })];
            case 1:
                // Criar agendamento
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] Mensagem agendada para ".concat(sendAt.toISOString()));
                if (action.scheduleStartFlow) {
                    logger_1["default"].info("[ExecuteTagAutoActions] Fluxo ".concat(action.scheduleFlowId, " ser\u00E1 iniciado ap\u00F3s envio da mensagem"));
                }
                return [2 /*return*/];
        }
    });
}); };
var executeStartFlow = function (action, contact, ticket, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var flow, flowData, nodes, connections, startNode_1, startConnection, newHashFlowId, mountDataContact, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!action.flowId) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] startFlow: flowId n\u00E3o fornecido");
                    return [2 /*return*/];
                }
                logger_1["default"].info("[ExecuteTagAutoActions] startFlow: Iniciando fluxo ".concat(action.flowId, " para ticket ").concat(ticket.id));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: { id: action.flowId, company_id: companyId }
                    })];
            case 2:
                flow = _a.sent();
                if (!flow || !flow.flow) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] startFlow: Fluxo n\u00E3o encontrado ou sem dados");
                    return [2 /*return*/];
                }
                flowData = typeof flow.flow === 'string'
                    ? JSON.parse(flow.flow)
                    : flow.flow;
                nodes = flowData.nodes || [];
                connections = flowData.connections || [];
                startNode_1 = nodes.find(function (n) { return n.type === "start"; });
                if (!startNode_1) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] startFlow: N\u00F3 start n\u00E3o encontrado");
                    return [2 /*return*/];
                }
                startConnection = connections.find(function (c) { return c.source === startNode_1.id; });
                if (!startConnection) {
                    logger_1["default"].warn("[ExecuteTagAutoActions] startFlow: Conex\u00E3o start n\u00E3o encontrada");
                    return [2 /*return*/];
                }
                newHashFlowId = (0, randomCode_1.randomString)(42);
                // Atualizar ticket com o fluxo
                return [4 /*yield*/, ticket.update({
                        flowWebhook: true,
                        lastFlowId: startConnection.target,
                        hashFlowId: newHashFlowId,
                        flowStopped: action.flowId.toString()
                    })];
            case 3:
                // Atualizar ticket com o fluxo
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] startFlow: Ticket atualizado, executando primeiro n\u00F3...");
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email || ""
                };
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(ticket.whatsappId, parseInt(action.flowId), companyId, nodes, connections, startConnection.target, null, "", newHashFlowId, null, ticket.id, mountDataContact)];
            case 4:
                _a.sent();
                logger_1["default"].info("[ExecuteTagAutoActions] startFlow: Fluxo iniciado e primeiro n\u00F3 executado para ticket ".concat(ticket.id));
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                logger_1["default"].error("[ExecuteTagAutoActions] startFlow: Erro ao iniciar fluxo:", error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.executeStartFlow = executeStartFlow;
