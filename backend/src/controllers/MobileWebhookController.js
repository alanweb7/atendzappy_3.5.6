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
exports.sendMessageNotification = exports.testWebhook = exports.listWebhooks = exports.unregisterWebhook = exports.registerWebhook = void 0;
var axios_1 = __importDefault(require("axios"));
var MobileWebhook_1 = __importDefault(require("../models/MobileWebhook"));
// Registrar webhook para notificações mobile
var registerWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, webhookUrl, deviceToken, platform, user, existingWebhook, webhook, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, webhookUrl = _a.webhookUrl, deviceToken = _a.deviceToken, platform = _a.platform;
                user = req.user;
                if (!webhookUrl || !deviceToken || !platform) {
                    return [2 /*return*/, res.status(400).json({
                            error: "webhookUrl, deviceToken e platform são obrigatórios"
                        })];
                }
                return [4 /*yield*/, MobileWebhook_1["default"].findOne({
                        where: {
                            userId: user.id,
                            companyId: user.companyId,
                            deviceToken: deviceToken
                        }
                    })];
            case 1:
                existingWebhook = _b.sent();
                if (!existingWebhook) return [3 /*break*/, 3];
                // Atualizar webhook existente
                return [4 /*yield*/, existingWebhook.update({
                        webhookUrl: webhookUrl,
                        platform: platform,
                        isActive: true
                    })];
            case 2:
                // Atualizar webhook existente
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Webhook atualizado com sucesso",
                        webhook: existingWebhook
                    })];
            case 3: return [4 /*yield*/, MobileWebhook_1["default"].create({
                    userId: user.id,
                    companyId: user.companyId,
                    webhookUrl: webhookUrl,
                    deviceToken: deviceToken,
                    platform: platform,
                    isActive: true
                })];
            case 4:
                webhook = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Webhook registrado com sucesso",
                        webhook: webhook
                    })];
            case 5:
                error_1 = _b.sent();
                console.error("Erro ao registrar webhook:", error_1);
                return [2 /*return*/, res.status(500).json({
                        error: "Erro interno do servidor"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerWebhook = registerWebhook;
// Remover webhook
var unregisterWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deviceToken, user, webhook, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                deviceToken = req.body.deviceToken;
                user = req.user;
                if (!deviceToken) {
                    return [2 /*return*/, res.status(400).json({
                            error: "deviceToken é obrigatório"
                        })];
                }
                return [4 /*yield*/, MobileWebhook_1["default"].findOne({
                        where: {
                            userId: user.id,
                            companyId: user.companyId,
                            deviceToken: deviceToken
                        }
                    })];
            case 1:
                webhook = _a.sent();
                if (!webhook) {
                    return [2 /*return*/, res.status(404).json({
                            error: "Webhook não encontrado"
                        })];
                }
                return [4 /*yield*/, webhook.update({ isActive: false })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Webhook removido com sucesso"
                    })];
            case 3:
                error_2 = _a.sent();
                console.error("Erro ao remover webhook:", error_2);
                return [2 /*return*/, res.status(500).json({
                        error: "Erro interno do servidor"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.unregisterWebhook = unregisterWebhook;
// Listar webhooks do usuário
var listWebhooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, webhooks, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                return [4 /*yield*/, MobileWebhook_1["default"].findAll({
                        where: {
                            userId: user.id,
                            companyId: user.companyId,
                            isActive: true
                        }
                    })];
            case 1:
                webhooks = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        webhooks: webhooks
                    })];
            case 2:
                error_3 = _a.sent();
                console.error("Erro ao listar webhooks:", error_3);
                return [2 /*return*/, res.status(500).json({
                        error: "Erro interno do servidor"
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listWebhooks = listWebhooks;
// Testar webhook
var testWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deviceToken, user, webhook, testNotification, webhookError_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                deviceToken = req.body.deviceToken;
                user = req.user;
                if (!deviceToken) {
                    return [2 /*return*/, res.status(400).json({
                            error: "deviceToken é obrigatório"
                        })];
                }
                return [4 /*yield*/, MobileWebhook_1["default"].findOne({
                        where: {
                            userId: user.id,
                            companyId: user.companyId,
                            deviceToken: deviceToken,
                            isActive: true
                        }
                    })];
            case 1:
                webhook = _a.sent();
                if (!webhook) {
                    return [2 /*return*/, res.status(404).json({
                            error: "Webhook não encontrado"
                        })];
                }
                testNotification = {
                    type: "test",
                    title: "Teste de Notificação",
                    message: "Este é um teste do sistema de notificações mobile",
                    timestamp: new Date().toISOString(),
                    userId: user.id,
                    companyId: user.companyId
                };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, axios_1["default"].post(webhook.webhookUrl, testNotification, {
                        timeout: 5000,
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'Whaticket-Mobile-Webhook/1.0'
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Notificação de teste enviada com sucesso"
                    })];
            case 4:
                webhookError_1 = _a.sent();
                console.error("Erro ao enviar webhook de teste:", webhookError_1);
                return [2 /*return*/, res.status(400).json({
                        error: "Falha ao enviar notificação de teste",
                        details: webhookError_1.message
                    })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.error("Erro ao testar webhook:", error_4);
                return [2 /*return*/, res.status(500).json({
                        error: "Erro interno do servidor"
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.testWebhook = testWebhook;
// Função para enviar notificação de nova mensagem
var sendMessageNotification = function (messageData, companyId, ticketUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var whereClause, webhooks, notification_1, promises, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                whereClause = {
                    companyId: companyId,
                    isActive: true
                };
                // Se a mensagem tem um usuário específico, filtrar apenas para ele
                if (ticketUserId) {
                    whereClause.userId = ticketUserId;
                }
                return [4 /*yield*/, MobileWebhook_1["default"].findAll({
                        where: whereClause
                    })];
            case 1:
                webhooks = _c.sent();
                if (webhooks.length === 0) {
                    return [2 /*return*/];
                }
                notification_1 = {
                    type: "new_message",
                    title: "Nova mensagem - ".concat(((_a = messageData.contact) === null || _a === void 0 ? void 0 : _a.name) || "Contato"),
                    message: messageData.body || "Nova mensagem recebida",
                    timestamp: new Date().toISOString(),
                    companyId: companyId,
                    ticketId: messageData.ticketId,
                    contactId: messageData.contactId,
                    contactName: (_b = messageData.contact) === null || _b === void 0 ? void 0 : _b.name,
                    fromMe: messageData.fromMe,
                    messageId: messageData.id,
                    queueId: messageData.queueId
                };
                promises = webhooks.map(function (webhook) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_6;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 7]);
                                return [4 /*yield*/, axios_1["default"].post(webhook.webhookUrl, notification_1, {
                                        timeout: 5000,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'User-Agent': 'Whaticket-Mobile-Webhook/1.0'
                                        }
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Notifica\u00E7\u00E3o enviada para webhook ".concat(webhook.id));
                                return [3 /*break*/, 7];
                            case 2:
                                error_6 = _a.sent();
                                console.error("Erro ao enviar notifica\u00E7\u00E3o para webhook ".concat(webhook.id, ":"), error_6.message);
                                // Se o webhook falhar múltiplas vezes, desativar
                                webhook.failureCount = (webhook.failureCount || 0) + 1;
                                if (!(webhook.failureCount >= 5)) return [3 /*break*/, 4];
                                return [4 /*yield*/, webhook.update({ isActive: false })];
                            case 3:
                                _a.sent();
                                console.log("Webhook ".concat(webhook.id, " desativado ap\u00F3s m\u00FAltiplas falhas"));
                                return [3 /*break*/, 6];
                            case 4: return [4 /*yield*/, webhook.update({ failureCount: webhook.failureCount })];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6: return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.allSettled(promises)];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                console.error("Erro ao enviar notificações mobile:", error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendMessageNotification = sendMessageNotification;
