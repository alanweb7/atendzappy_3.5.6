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
var queue_1 = __importDefault(require("../../libs/queue"));
var SendWhatsAppMediaFlow_1 = __importDefault(require("../WbotServices/SendWhatsAppMediaFlow"));
var SendMessage_1 = require("../../helpers/SendMessage");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var ActionsWebhookService_1 = require("../WebhookService/ActionsWebhookService");
var WaitQuestionService = /** @class */ (function () {
    function WaitQuestionService() {
    }
    // Agendar envio da pergunta
    WaitQuestionService.scheduleQuestionWithFollowUp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var delay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delay = data.delayMinutes * 60 * 1000;
                        return [4 /*yield*/, queue_1["default"].add("WaitQuestion/SendQuestion", {
                                ticketId: data.ticketId,
                                question: data.question,
                                mediaType: data.mediaType,
                                mediaUrl: data.mediaUrl,
                                mediaName: data.mediaName,
                                optionX: data.optionX,
                                optionY: data.optionY,
                                nodeId: data.nodeId,
                                companyId: data.companyId
                            }, {
                                delay: delay,
                                attempts: 3,
                                backoff: "exponential",
                                removeOnComplete: false
                            })];
                    case 1:
                        _a.sent();
                        console.log("[WaitQuestion] Pergunta agendada para ticket ".concat(data.ticketId, " em ").concat(data.delayMinutes, " minutos"));
                        return [2 /*return*/];
                }
            });
        });
    };
    // Enviar a pergunta (executado pela queue)
    WaitQuestionService.sendQuestion = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, Ticket_1["default"].findByPk(data.ticketId)];
                    case 1:
                        ticket = _a.sent();
                        if (!ticket) {
                            console.error("[WaitQuestion] Ticket ".concat(data.ticketId, " n\u00E3o encontrado"));
                            return [2 /*return*/];
                        }
                        if (!(data.mediaType && data.mediaType !== "none" && data.mediaUrl)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1["default"])({
                                ticket: ticket,
                                media: data.mediaUrl,
                                body: "",
                                isFlow: true
                            })];
                    case 3:
                        _a.sent();
                        console.log("[WaitQuestion] M\u00EDdia enviada para ticket ".concat(data.ticketId));
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("[WaitQuestion] Erro ao enviar m\u00EDdia:", error_1);
                        return [3 /*break*/, 5];
                    case 5:
                        if (!data.question) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, SendMessage_1.SendMessage)(ticket.whatsapp, {
                                number: ticket.contact.number,
                                body: data.question,
                                companyId: data.companyId
                            })];
                    case 6:
                        _a.sent();
                        console.log("[WaitQuestion] Pergunta enviada para ticket ".concat(data.ticketId));
                        _a.label = 7;
                    case 7: 
                    // Atualizar estado do ticket
                    return [4 /*yield*/, ticket.update({
                            waitingQuestion: true,
                            questionNodeId: data.nodeId,
                            questionOptions: {
                                optionX: data.optionX,
                                optionY: data.optionY
                            }
                        })];
                    case 8:
                        // Atualizar estado do ticket
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        console.error("[WaitQuestion] Erro ao enviar pergunta:", error_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // Agendar timeout
    WaitQuestionService.scheduleTimeoutAction = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var delay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delay = data.timeoutMinutes * 60 * 1000;
                        return [4 /*yield*/, queue_1["default"].add("WaitQuestion/TimeoutAction", {
                                ticketId: data.ticketId,
                                nodeId: data.nodeId,
                                action: data.action,
                                companyId: data.companyId,
                                transferQueueId: data.transferQueueId
                            }, {
                                delay: delay,
                                attempts: 3,
                                backoff: "exponential",
                                removeOnComplete: false
                            })];
                    case 1:
                        _a.sent();
                        console.log("[WaitQuestion] Timeout agendado para ticket ".concat(data.ticketId, " em ").concat(data.timeoutMinutes, " minutos"));
                        return [2 /*return*/];
                }
            });
        });
    };
    // Executar ação de timeout
    WaitQuestionService.executeTimeoutAction = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        return [4 /*yield*/, Ticket_1["default"].findByPk(data.ticketId)];
                    case 1:
                        ticket = _b.sent();
                        if (!ticket) {
                            console.error("[WaitQuestion] Ticket ".concat(data.ticketId, " n\u00E3o encontrado"));
                            return [2 /*return*/];
                        }
                        // Verificar se ainda está esperando resposta
                        if (!ticket.waitingQuestion || ticket.questionNodeId !== data.nodeId) {
                            console.log("[WaitQuestion] Ticket ".concat(data.ticketId, " n\u00E3o est\u00E1 mais aguardando resposta, ignorando timeout"));
                            return [2 /*return*/];
                        }
                        // Limpar estado de espera
                        return [4 /*yield*/, ticket.update({
                                waitingQuestion: false,
                                questionNodeId: null,
                                questionOptions: null,
                                timeoutEnabled: false,
                                timeoutAt: null
                            })];
                    case 2:
                        // Limpar estado de espera
                        _b.sent();
                        console.log("[WaitQuestion] Timeout executado para ticket ".concat(data.ticketId, ", a\u00E7\u00E3o: ").concat(data.action));
                        _a = data.action;
                        switch (_a) {
                            case "close": return [3 /*break*/, 3];
                            case "transfer": return [3 /*break*/, 5];
                            case "continue": return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 10];
                    case 3: return [4 /*yield*/, ticket.update({
                            status: "closed"
                        })];
                    case 4:
                        _b.sent();
                        console.log("[WaitQuestion] Ticket ".concat(data.ticketId, " fechado por timeout"));
                        return [3 /*break*/, 11];
                    case 5:
                        if (!data.transferQueueId) return [3 /*break*/, 7];
                        return [4 /*yield*/, ticket.update({
                                queueId: data.transferQueueId,
                                userId: null // Remover atendente atual
                            })];
                    case 6:
                        _b.sent();
                        console.log("[WaitQuestion] Ticket ".concat(data.ticketId, " transferido para fila ").concat(data.transferQueueId, " por timeout"));
                        _b.label = 7;
                    case 7: return [3 /*break*/, 11];
                    case 8: 
                    // Continuar fluxo pelo handle de timeout (left)
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(ticket.whatsappId, 0, // idFlowDb não necessário para continuar
                        data.companyId, [], // nodes não necessário
                        [], // connects não necessário
                        data.nodeId, // nextStage = nodeId atual para usar conexão left
                        ticket.dataWebhook || {}, {}, "", "", data.ticketId)];
                    case 9:
                        // Continuar fluxo pelo handle de timeout (left)
                        _b.sent();
                        console.log("[WaitQuestion] Fluxo continuado pelo handle de timeout para ticket ".concat(data.ticketId));
                        return [3 /*break*/, 11];
                    case 10:
                        console.log("[WaitQuestion] A\u00E7\u00E3o de timeout desconhecida: ".concat(data.action));
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_3 = _b.sent();
                        console.error("[WaitQuestion] Erro ao executar timeout:", error_3);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    // Normalizar texto para comparação
    WaitQuestionService.normalizeText = function (text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };
    // Verificar se resposta match com trigger
    WaitQuestionService.checkMatch = function (response, trigger, matchType) {
        var normalizedResponse = this.normalizeText(response);
        var normalizedTrigger = this.normalizeText(trigger);
        if (matchType === "exact") {
            return normalizedResponse === normalizedTrigger;
        }
        else if (matchType === "contains") {
            return normalizedResponse.includes(normalizedTrigger);
        }
        return false;
    };
    // Processar resposta do usuário
    // Processar resposta do usuário
    WaitQuestionService.processResponse = function (ticketId, response) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, questionOptions, savedNodeId, optionXKeywords, optionYKeywords, attemptCount, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId)];
                    case 1:
                        ticket = _a.sent();
                        if (!ticket || !ticket.waitingQuestion) {
                            return [2 /*return*/, null];
                        }
                        questionOptions = ticket.questionOptions;
                        if (!questionOptions || !questionOptions.optionX || !questionOptions.optionY) {
                            return [2 /*return*/, null];
                        }
                        savedNodeId = ticket.questionNodeId;
                        optionXKeywords = questionOptions.optionX.keywords || [questionOptions.optionX.label || questionOptions.optionX.trigger].filter(function (k) { return k && k.trim(); });
                        if (!optionXKeywords.some(function (keyword) { return _this.checkMatch(response, keyword, "contains"); })) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.clearWaitingState(ticket)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                option: "x",
                                action: questionOptions.optionX.action,
                                nodeId: savedNodeId
                            }];
                    case 3:
                        optionYKeywords = questionOptions.optionY.keywords || [questionOptions.optionY.label || questionOptions.optionY.trigger].filter(function (k) { return k && k.trim(); });
                        if (!optionYKeywords.some(function (keyword) { return _this.checkMatch(response, keyword, "contains"); })) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.clearWaitingState(ticket)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                option: "y",
                                action: questionOptions.optionY.action,
                                nodeId: savedNodeId
                            }];
                    case 5:
                        attemptCount = (ticket.questionAttempts || 0) + 1;
                        return [4 /*yield*/, ticket.update({ questionAttempts: attemptCount })];
                    case 6:
                        _a.sent();
                        console.log("[WaitQuestion] Resposta n\u00E3o reconhecida. Tentativa ".concat(attemptCount, " de ").concat(ticket.maxQuestionAttempts || 3));
                        if (!(attemptCount >= (ticket.maxQuestionAttempts || 3))) return [3 /*break*/, 8];
                        console.log("[WaitQuestion] Limite de tentativas atingido. Encerrando espera.");
                        return [4 /*yield*/, this.clearWaitingState(ticket)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, {
                                option: "timeout",
                                action: questionOptions.timeoutAction || "continue",
                                nodeId: savedNodeId
                            }];
                    case 8: return [2 /*return*/, null]; // Continuar esperando
                    case 9:
                        error_4 = _a.sent();
                        console.error("[WaitQuestion] Erro ao processar resposta:", error_4);
                        return [2 /*return*/, null];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // Limpar estado de espera
    WaitQuestionService.clearWaitingState = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket.update({
                            waitingQuestion: false,
                            questionNodeId: null,
                            questionOptions: null,
                            timeoutEnabled: false,
                            timeoutAt: null,
                            questionAttempts: 0
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WaitQuestionService;
}());
exports["default"] = WaitQuestionService;
