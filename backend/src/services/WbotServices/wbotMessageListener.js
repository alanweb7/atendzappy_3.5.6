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
exports.handleMsgAck = exports.getTypeMessage = exports.isValidMsg = exports.handleMessage = exports.wbotMessageListener = exports.handleMessageIntegration = exports.transferQueue = exports.keepOnlySpecifiedChars = exports.convertTextToSpeechAndSaveToFile = exports.handleRating = exports.verifyRating = exports.verifyMessage = exports.verifyMediaMessage = exports.getQuotedMessageId = exports.getQuotedMessage = exports.getBodyMessage = void 0;
// @ts-nocheck
var path_1 = __importStar(require("path"));
var util_1 = require("util");
var fs_1 = require("fs");
var fs_2 = __importDefault(require("fs"));
var Sentry = __importStar(require("@sentry/node"));
var lodash_1 = require("lodash");
var async_mutex_1 = require("async-mutex");
var ShowPromptService_1 = __importDefault(require("../PromptServices/ShowPromptService"));
var WhitelabelService_1 = require("../SettingService/WhitelabelService");
var ListPromptToolSettingsService_1 = __importDefault(require("../PromptToolSettingService/ListPromptToolSettingsService"));
var redis_1 = require("../../config/redis");
var baileys_1 = require("@whiskeysockets/baileys");
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Message_1 = __importDefault(require("../../models/Message"));
var QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
var cache_1 = __importDefault(require("../../libs/cache"));
var socket_1 = require("../../libs/socket");
var logger_1 = __importDefault(require("../../utils/logger"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var WhatsAppMonitor_1 = __importDefault(require("./WhatsAppMonitor"));
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var CreateOrUpdateContactService_1 = __importDefault(require("../ContactServices/CreateOrUpdateContactService"));
var FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
var Debounce_1 = require("../../helpers/Debounce");
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var SendInteractiveMenu_1 = require("../../helpers/SendInteractiveMenu");
var UserRating_1 = __importDefault(require("../../models/UserRating"));
var SendWhatsAppMessage_1 = __importDefault(require("./SendWhatsAppMessage"));
var sendFacebookMessage_1 = __importDefault(require("../FacebookServices/sendFacebookMessage"));
// De-duplicação: Baileys pode entregar a mesma mensagem 2–4x simultaneamente.
// Mapa de msgId → timestamp de quando foi processada.
var processedMsgIds = new Map();
setInterval(function () {
    var cutoff = Date.now() - 60000; // limpa entradas com mais de 60s
    for (var _i = 0, _a = processedMsgIds.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], id = _b[0], ts = _b[1];
        if (ts < cutoff)
            processedMsgIds["delete"](id);
    }
}, 60000);
// Dispara flowIdNotPhrase (ou flowIdWelcome como fallback) ao reabrir ticket fechado
// Só dispara se o ticket não tem fila nem usuário vinculado
var triggerReopenFlow = function (ticket, whatsapp, contact, msg) { return __awaiter(void 0, void 0, void 0, function () {
    var flowId, flow, nodes, connections, mountDataContact, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (ticket.queueId || ticket.userId)
                    return [2 /*return*/];
                flowId = whatsapp.flowIdNotPhrase || whatsapp.flowIdWelcome;
                if (!flowId)
                    return [2 /*return*/];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: flowId } })];
            case 1:
                flow = _b.sent();
                if (!flow)
                    return [2 /*return*/];
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                mountDataContact = { number: contact.number, name: contact.name, email: contact.email || "" };
                console.log("[ReopenFlow] Disparando fluxo ".concat(flowId, " para ticket reaberto ").concat(ticket.id));
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, flowId, ticket.companyId, nodes, connections, ((_a = nodes[0]) === null || _a === void 0 ? void 0 : _a.id) || "1", null, "", "", null, ticket.id, mountDataContact, msg || null)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error("[ReopenFlow] Erro ao disparar fluxo de reabertura:", err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Sistema de agrupamento de mensagens para FlowBuilder
var flowBuilderMessageGroups = new Map();
// Limpar grupos antigos (executado a cada 5 minutos)
setInterval(function () {
    var now = Date.now();
    var groupsToRemove = [];
    flowBuilderMessageGroups.forEach(function (group, key) {
        // Se o grupo tem mais de 5 minutos, remover
        if (now - group.ticketId > 300000) {
            clearTimeout(group.timeout);
            groupsToRemove.push(key);
        }
    });
    groupsToRemove.forEach(function (key) {
        flowBuilderMessageGroups["delete"](key);
        console.log("[FlowBuilder] Limpado grupo antigo: ".concat(key));
    });
}, 300000); // 5 minutos
// Função para agrupar mensagens e processar juntas
var groupFlowBuilderMessages = function (ticketId, contactId, msg, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered) { return __awaiter(void 0, void 0, void 0, function () {
    var groupKey, body, group, timeout;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                groupKey = "".concat(ticketId, "_").concat(contactId);
                body = (0, exports.getBodyMessage)(msg);
                if (!(((_a = msg.message) === null || _a === void 0 ? void 0 : _a.audioMessage) || ((_b = msg.message) === null || _b === void 0 ? void 0 : _b.imageMessage))) return [3 /*break*/, 2];
                return [4 /*yield*/, flowbuilderIntegration(msg, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered)];
            case 1:
                _c.sent();
                return [2 /*return*/];
            case 2:
                // Se já existe um grupo, adicionar mensagem
                if (flowBuilderMessageGroups.has(groupKey)) {
                    group = flowBuilderMessageGroups.get(groupKey);
                    group.messages.push(body);
                    // Resetar timeout para esperar mais mensagens
                    clearTimeout(group.timeout);
                    group.timeout = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, processGroupedMessages(groupKey, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 2000); // 2 segundos (reduzido de 6 para melhorar performance)
                }
                else {
                    timeout = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, processGroupedMessages(groupKey, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 2000);
                    flowBuilderMessageGroups.set(groupKey, {
                        messages: [body],
                        timeout: timeout,
                        ticketId: ticketId,
                        contactId: contactId
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
// Função para processar mensagens agrupadas
var processGroupedMessages = function (groupKey, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered) { return __awaiter(void 0, void 0, void 0, function () {
    var group, combinedBody, firstMessage, virtualMsg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                group = flowBuilderMessageGroups.get(groupKey);
                if (!group)
                    return [2 /*return*/];
                // Remover grupo do mapa
                flowBuilderMessageGroups["delete"](groupKey);
                combinedBody = group.messages.join(' ');
                firstMessage = group.messages[0];
                virtualMsg = {
                    key: {
                        id: "grouped_".concat(Date.now(), "_").concat(group.ticketId),
                        remoteJid: "".concat(contact.number, "@s.whatsapp.net"),
                        fromMe: false,
                        participant: undefined
                    },
                    message: {
                        conversation: combinedBody,
                        extendedTextMessage: undefined
                    },
                    messageStubType: undefined,
                    messageTimestamp: Math.floor(Date.now() / 1000)
                };
                console.log("[FlowBuilder] Processando ".concat(group.messages.length, " mensagens agrupadas para ticket ").concat(group.ticketId));
                // Processar como uma única mensagem
                return [4 /*yield*/, flowbuilderIntegration(virtualMsg, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered)];
            case 1:
                // Processar como uma única mensagem
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var moment_1 = __importDefault(require("moment"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var FindOrCreateATicketTrakingService_1 = __importDefault(require("../TicketServices/FindOrCreateATicketTrakingService"));
var VerifyCurrentSchedule_1 = __importDefault(require("../CompanyService/VerifyCurrentSchedule"));
var Campaign_1 = __importDefault(require("../../models/Campaign"));
var CampaignShipping_1 = __importDefault(require("../../models/CampaignShipping"));
var sequelize_1 = require("sequelize");
var queues_1 = require("../../queues");
var User_1 = __importDefault(require("../../models/User"));
var ChatBotListener_1 = require("./ChatBotListener");
var MarkDeleteWhatsAppMessage_1 = __importDefault(require("./MarkDeleteWhatsAppMessage"));
var ListUserQueueServices_1 = __importDefault(require("../UserQueueServices/ListUserQueueServices"));
var SendWhatsAppMedia_1 = __importStar(require("./SendWhatsAppMedia"));
var normalizeContactNumber_1 = require("../../helpers/normalizeContactNumber");
var ShowQueueIntegrationService_1 = __importDefault(require("../QueueIntegrationServices/ShowQueueIntegrationService"));
var CreateSessionDialogflow_1 = require("../QueueIntegrationServices/CreateSessionDialogflow");
var QueryDialogflow_1 = require("../QueueIntegrationServices/QueryDialogflow");
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var CreateLogTicketService_1 = __importDefault(require("../TicketServices/CreateLogTicketService"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var ShowService_1 = __importDefault(require("../FileServices/ShowService"));
var ContactPhoneService_1 = require("../ContactServices/ContactPhoneService");
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
fluent_ffmpeg_1["default"].setFfmpegPath(ffmpeg_1["default"].path);
var microsoft_cognitiveservices_speech_sdk_1 = require("microsoft-cognitiveservices-speech-sdk");
var typebotListener_1 = __importDefault(require("../TypebotServices/typebotListener"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var queue_1 = __importDefault(require("../../libs/queue"));
var wbot_1 = require("../../libs/wbot");
var CheckSettings_1 = require("../../helpers/CheckSettings");
var FlowBuilder_1 = require("../../models/FlowBuilder");
var ActionsWebhookService_1 = require("../WebhookService/ActionsWebhookService");
var WaitQuestionService_1 = __importDefault(require("../FlowBuilderService/WaitQuestionService"));
var Webhook_1 = require("../../models/Webhook");
var date_fns_1 = require("date-fns");
var FlowCampaign_1 = require("../../models/FlowCampaign");
var OpenAiService_1 = require("../IntegrationsServices/OpenAiService");
var systemMessageCache_1 = require("../../helpers/systemMessageCache");
var DownloadProfilePic_1 = __importDefault(require("../../helpers/DownloadProfilePic"));
var os = require("os");
var request = require("request");
var i = 0;
setInterval(function () {
    i = 0;
}, 5000);
// === 🔁 Buffer temporário para agrupar mensagens antes de enviar à IA ===
var messageBuffer = {};
var sessionsOpenAi = [];
var ticketMutexes = new Map();
var getTicketMutex = function (key) {
    var mutex = ticketMutexes.get(key);
    if (!mutex) {
        mutex = new async_mutex_1.Mutex();
        ticketMutexes.set(key, mutex);
    }
    return mutex;
};
var writeFileAsync = (0, util_1.promisify)(fs_1.writeFile);
function removeFile(directory) {
    fs_2["default"].unlink(directory, function (error) {
        if (error)
            throw error;
    });
}
var getTimestampMessage = function (msgTimestamp) {
    return msgTimestamp * 1;
};
var multVecardGet = function (param) {
    var output = " ";
    var name = param
        .split("\n")[2]
        .replace(";;;", "\n")
        .replace("N:", "")
        .replace(";", "")
        .replace(";", " ")
        .replace(";;", " ")
        .replace("\n", "");
    var inicio = param.split("\n")[4].indexOf("=");
    var fim = param.split("\n")[4].indexOf(":");
    var contact = param
        .split("\n")[4]
        .substring(inicio + 1, fim)
        .replace(";", "");
    var contactSemWhats = param.split("\n")[4].replace("item1.TEL:", "");
    //console.log(contact);
    if (contact != "item1.TEL") {
        output = output + name + ": 📞" + contact + "" + "\n";
    }
    else
        output = output + name + ": 📞" + contactSemWhats + "" + "\n";
    return output;
};
var contactsArrayMessageGet = function (msg) {
    var _a, _b;
    var contactsArray = (_b = (_a = msg.message) === null || _a === void 0 ? void 0 : _a.contactsArrayMessage) === null || _b === void 0 ? void 0 : _b.contacts;
    var vcardMulti = contactsArray.map(function (item, indice) {
        return item.vcard;
    });
    var bodymessage = "";
    vcardMulti.forEach(function (vcard, indice) {
        bodymessage += vcard + "\n\n" + "";
    });
    var contacts = bodymessage.split("BEGIN:");
    contacts.shift();
    var finalContacts = "";
    for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
        var contact = contacts_1[_i];
        finalContacts = finalContacts + multVecardGet(contact);
    }
    return finalContacts;
};
var getTypeMessage = function (msg) {
    var _a, _b, _c, _d, _e, _f, _g;
    var msgType = (0, baileys_1.getContentType)(msg.message);
    if (((_a = msg.message) === null || _a === void 0 ? void 0 : _a.extendedTextMessage) &&
        ((_c = (_b = msg.message) === null || _b === void 0 ? void 0 : _b.extendedTextMessage) === null || _c === void 0 ? void 0 : _c.contextInfo) &&
        ((_f = (_e = (_d = msg.message) === null || _d === void 0 ? void 0 : _d.extendedTextMessage) === null || _e === void 0 ? void 0 : _e.contextInfo) === null || _f === void 0 ? void 0 : _f.externalAdReply)) {
        return "adMetaPreview"; // Adicionado para tratar mensagens de anúncios;
    }
    if ((_g = msg.message) === null || _g === void 0 ? void 0 : _g.viewOnceMessageV2) {
        return "viewOnceMessageV2";
    }
    return msgType;
};
exports.getTypeMessage = getTypeMessage;
var getAd = function (msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (msg.key.fromMe &&
        ((_c = (_b = (_a = msg.message) === null || _a === void 0 ? void 0 : _a.listResponseMessage) === null || _b === void 0 ? void 0 : _b.contextInfo) === null || _c === void 0 ? void 0 : _c.externalAdReply)) {
        var bodyMessage = "*".concat((_g = (_f = (_e = (_d = msg.message) === null || _d === void 0 ? void 0 : _d.listResponseMessage) === null || _e === void 0 ? void 0 : _e.contextInfo) === null || _f === void 0 ? void 0 : _f.externalAdReply) === null || _g === void 0 ? void 0 : _g.title, "*");
        bodyMessage += "\n\n".concat((_l = (_k = (_j = (_h = msg.message) === null || _h === void 0 ? void 0 : _h.listResponseMessage) === null || _j === void 0 ? void 0 : _j.contextInfo) === null || _k === void 0 ? void 0 : _k.externalAdReply) === null || _l === void 0 ? void 0 : _l.body);
        return bodyMessage;
    }
};
var getBodyButton = function (msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    try {
        // Resposta do usuário ao clicar botão nativeFlowMessage (quick_reply/cta_url/cta_copy)
        if ((_b = (_a = msg === null || msg === void 0 ? void 0 : msg.message) === null || _a === void 0 ? void 0 : _a.interactiveResponseMessage) === null || _b === void 0 ? void 0 : _b.nativeFlowResponseMessage) {
            try {
                var paramsJson = msg.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson;
                if (paramsJson) {
                    var params = JSON.parse(paramsJson);
                    // quick_reply: params.id contém o ID configurado no botão
                    var selectedId = params.id || params.display_text;
                    if (selectedId) {
                        console.log("[BOTOES] Bot\u00E3o nativeFlow clicado: ID=".concat(selectedId));
                        return String(selectedId);
                    }
                }
            }
            catch (_) { }
        }
        // Tratamento para templateButtonReplyMessage (resposta de botão interativo)
        if ((_c = msg === null || msg === void 0 ? void 0 : msg.message) === null || _c === void 0 ? void 0 : _c.templateButtonReplyMessage) {
            var selectedId = msg.message.templateButtonReplyMessage.selectedId;
            var selectedDisplayText = msg.message.templateButtonReplyMessage.selectedDisplayText;
            console.log("[BOTOES] Bot\u00E3o clicado: ID=".concat(selectedId, ", Texto=").concat(selectedDisplayText));
            // Para iOS, priorizar o texto exibido sobre o ID
            return selectedDisplayText || selectedId;
        }
        // Tratamento para buttonsResponseMessage (clique em botão)
        if ((_d = msg === null || msg === void 0 ? void 0 : msg.message) === null || _d === void 0 ? void 0 : _d.buttonsResponseMessage) {
            var selectedButtonId = msg.message.buttonsResponseMessage.selectedButtonId;
            var selectedDisplayText = msg.message.buttonsResponseMessage.selectedDisplayText;
            console.log("[BOTOES] Bot\u00E3o clicado (buttonsResponseMessage): ID=".concat(selectedButtonId, ", Texto=").concat(selectedDisplayText));
            // Para iOS, priorizar o texto exibido
            return selectedDisplayText || selectedButtonId;
        }
        // Tratamento para interactiveMessage com botões nativos
        // ATENÇÃO: só processar se a mensagem NÃO é do bot (fromMe=false).
        // Mensagens fromMe=true são o próprio bot enviando o menu — não é clique do usuário.
        if (!msg.key.fromMe && ((_g = (_f = (_e = msg === null || msg === void 0 ? void 0 : msg.message) === null || _e === void 0 ? void 0 : _e.interactiveMessage) === null || _f === void 0 ? void 0 : _f.nativeFlowMessage) === null || _g === void 0 ? void 0 : _g.buttons)) {
            var buttons = msg.message.interactiveMessage.nativeFlowMessage.buttons;
            if (buttons && buttons.length > 0) {
                var clickedButton = buttons[0];
                var params = JSON.parse(clickedButton.buttonParamsJson || "{}");
                var displayText = params.display_text;
                console.log("[BOTOES] Bot\u00E3o clicado (interactiveMessage): Texto=".concat(displayText));
                return displayText;
            }
        }
        // Tratamento para viewOnceMessage com botões (iOS)
        if (!msg.key.fromMe && ((_m = (_l = (_k = (_j = (_h = msg === null || msg === void 0 ? void 0 : msg.message) === null || _h === void 0 ? void 0 : _h.viewOnceMessage) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.interactiveMessage) === null || _l === void 0 ? void 0 : _l.nativeFlowMessage) === null || _m === void 0 ? void 0 : _m.buttons)) {
            var buttons = msg.message.viewOnceMessage.message.interactiveMessage.nativeFlowMessage.buttons;
            if (buttons && buttons.length > 0) {
                var clickedButton = buttons[0];
                var params = JSON.parse(clickedButton.buttonParamsJson || "{}");
                var displayText = params.display_text;
                console.log("[BOTOES] Bot\u00E3o clicado (viewOnceMessage): Texto=".concat(displayText));
                return displayText;
            }
        }
        if ((msg === null || msg === void 0 ? void 0 : msg.messageType) === "buttonsMessage" ||
            ((_p = (_o = msg === null || msg === void 0 ? void 0 : msg.message) === null || _o === void 0 ? void 0 : _o.buttonsMessage) === null || _p === void 0 ? void 0 : _p.contentText)) {
            var bodyMessage = "[BUTTON]\n\n*".concat((_r = (_q = msg === null || msg === void 0 ? void 0 : msg.message) === null || _q === void 0 ? void 0 : _q.buttonsMessage) === null || _r === void 0 ? void 0 : _r.contentText, "*\n\n");
            // eslint-disable-next-line no-restricted-syntax
            for (var _i = 0, _8 = (_t = (_s = msg.message) === null || _s === void 0 ? void 0 : _s.buttonsMessage) === null || _t === void 0 ? void 0 : _t.buttons; _i < _8.length; _i++) {
                var button = _8[_i];
                bodyMessage += "*".concat(button.buttonId, "* - ").concat(button.buttonText.displayText, "\n");
            }
            return bodyMessage;
        }
        if ((msg === null || msg === void 0 ? void 0 : msg.messageType) === "viewOnceMessage" ||
            ((_w = (_v = (_u = msg === null || msg === void 0 ? void 0 : msg.message) === null || _u === void 0 ? void 0 : _u.viewOnceMessage) === null || _v === void 0 ? void 0 : _v.message) === null || _w === void 0 ? void 0 : _w.interactiveMessage)) {
            var bodyMessage = "";
            var buttons = (_1 = (_0 = (_z = (_y = (_x = msg === null || msg === void 0 ? void 0 : msg.message) === null || _x === void 0 ? void 0 : _x.viewOnceMessage) === null || _y === void 0 ? void 0 : _y.message) === null || _z === void 0 ? void 0 : _z.interactiveMessage) === null || _0 === void 0 ? void 0 : _0.nativeFlowMessage) === null || _1 === void 0 ? void 0 : _1.buttons;
            var bodyTextWithPix = ((_2 = buttons === null || buttons === void 0 ? void 0 : buttons[0]) === null || _2 === void 0 ? void 0 : _2.name) === "review_and_pay";
            var bodyTextWithButtons = (_7 = (_6 = (_5 = (_4 = (_3 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _3 === void 0 ? void 0 : _3.viewOnceMessage) === null || _4 === void 0 ? void 0 : _4.message) === null || _5 === void 0 ? void 0 : _5.interactiveMessage) === null || _6 === void 0 ? void 0 : _6.body) === null || _7 === void 0 ? void 0 : _7.text;
            if (bodyTextWithPix) {
                bodyMessage += "[PIX]";
            }
            else if (bodyTextWithButtons) {
                bodyMessage += "[BOTOES]";
            }
            return bodyMessage;
        }
    }
    catch (error) {
        logger_1["default"].error(error);
    }
};
var msgLocation = function (image, latitude, longitude) {
    if (image) {
        var b64 = Buffer.from(image).toString("base64");
        var data = "data:image/png;base64, ".concat(b64, " | https://maps.google.com/maps?q=").concat(latitude, "%2C").concat(longitude, "&z=17&hl=pt-BR|").concat(latitude, ", ").concat(longitude, " ");
        return data;
    }
    // Retornar URL do Google Maps mesmo sem thumbnail
    if (latitude && longitude) {
        return "https://maps.google.com/maps?q=".concat(latitude, "%2C").concat(longitude, "&z=17&hl=pt-BR|").concat(latitude, ", ").concat(longitude);
    }
    return "Localização";
};
var getBodyMessage = function (msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79;
    try {
        var type_1 = getTypeMessage(msg);
        if (type_1 === undefined)
            console.log(JSON.stringify(msg));
        var types = {
            conversation: (_a = msg.message) === null || _a === void 0 ? void 0 : _a.conversation,
            imageMessage: (_c = (_b = msg.message) === null || _b === void 0 ? void 0 : _b.imageMessage) === null || _c === void 0 ? void 0 : _c.caption,
            videoMessage: (_e = (_d = msg.message) === null || _d === void 0 ? void 0 : _d.videoMessage) === null || _e === void 0 ? void 0 : _e.caption,
            ptvMessage: (_g = (_f = msg.message) === null || _f === void 0 ? void 0 : _f.ptvMessage) === null || _g === void 0 ? void 0 : _g.caption,
            extendedTextMessage: (_j = (_h = msg === null || msg === void 0 ? void 0 : msg.message) === null || _h === void 0 ? void 0 : _h.extendedTextMessage) === null || _j === void 0 ? void 0 : _j.text,
            buttonsResponseMessage: (_l = (_k = msg.message) === null || _k === void 0 ? void 0 : _k.buttonsResponseMessage) === null || _l === void 0 ? void 0 : _l.selectedDisplayText,
            listResponseMessage: ((_o = (_m = msg.message) === null || _m === void 0 ? void 0 : _m.listResponseMessage) === null || _o === void 0 ? void 0 : _o.title) ||
                ((_r = (_q = (_p = msg.message) === null || _p === void 0 ? void 0 : _p.listResponseMessage) === null || _q === void 0 ? void 0 : _q.singleSelectReply) === null || _r === void 0 ? void 0 : _r.selectedRowId),
            templateButtonReplyMessage: (_t = (_s = msg.message) === null || _s === void 0 ? void 0 : _s.templateButtonReplyMessage) === null || _t === void 0 ? void 0 : _t.selectedId,
            messageContextInfo: ((_v = (_u = msg.message) === null || _u === void 0 ? void 0 : _u.buttonsResponseMessage) === null || _v === void 0 ? void 0 : _v.selectedButtonId) ||
                ((_x = (_w = msg.message) === null || _w === void 0 ? void 0 : _w.listResponseMessage) === null || _x === void 0 ? void 0 : _x.title),
            buttonsMessage: getBodyButton(msg) || ((_z = (_y = msg.message) === null || _y === void 0 ? void 0 : _y.listResponseMessage) === null || _z === void 0 ? void 0 : _z.title),
            stickerMessage: "sticker",
            contactMessage: (_1 = (_0 = msg.message) === null || _0 === void 0 ? void 0 : _0.contactMessage) === null || _1 === void 0 ? void 0 : _1.vcard,
            contactsArrayMessage: ((_3 = (_2 = msg.message) === null || _2 === void 0 ? void 0 : _2.contactsArrayMessage) === null || _3 === void 0 ? void 0 : _3.contacts) &&
                contactsArrayMessageGet(msg),
            //locationMessage: `Latitude: ${msg.message.locationMessage?.degreesLatitude} - Longitude: ${msg.message.locationMessage?.degreesLongitude}`,
            locationMessage: msgLocation((_5 = (_4 = msg.message) === null || _4 === void 0 ? void 0 : _4.locationMessage) === null || _5 === void 0 ? void 0 : _5.jpegThumbnail, (_7 = (_6 = msg.message) === null || _6 === void 0 ? void 0 : _6.locationMessage) === null || _7 === void 0 ? void 0 : _7.degreesLatitude, (_9 = (_8 = msg.message) === null || _8 === void 0 ? void 0 : _8.locationMessage) === null || _9 === void 0 ? void 0 : _9.degreesLongitude),
            liveLocationMessage: "Latitude: ".concat((_11 = (_10 = msg.message) === null || _10 === void 0 ? void 0 : _10.liveLocationMessage) === null || _11 === void 0 ? void 0 : _11.degreesLatitude, " - Longitude: ").concat((_13 = (_12 = msg.message) === null || _12 === void 0 ? void 0 : _12.liveLocationMessage) === null || _13 === void 0 ? void 0 : _13.degreesLongitude),
            documentMessage: (_15 = (_14 = msg.message) === null || _14 === void 0 ? void 0 : _14.documentMessage) === null || _15 === void 0 ? void 0 : _15.caption,
            audioMessage: "Áudio",
            interactiveMessage: msg.key.fromMe
                ? (((_18 = (_17 = (_16 = msg.message) === null || _16 === void 0 ? void 0 : _16.interactiveMessage) === null || _17 === void 0 ? void 0 : _17.body) === null || _18 === void 0 ? void 0 : _18.text) || getBodyButton(msg))
                : getBodyButton(msg),
            interactiveResponseMessage: getBodyButton(msg),
            listMessage: getBodyButton(msg) || ((_20 = (_19 = msg.message) === null || _19 === void 0 ? void 0 : _19.listResponseMessage) === null || _20 === void 0 ? void 0 : _20.title),
            viewOnceMessage: getBodyButton(msg) ||
                ((_23 = (_22 = (_21 = msg.message) === null || _21 === void 0 ? void 0 : _21.listResponseMessage) === null || _22 === void 0 ? void 0 : _22.singleSelectReply) === null || _23 === void 0 ? void 0 : _23.selectedRowId),
            reactionMessage: ((_25 = (_24 = msg.message) === null || _24 === void 0 ? void 0 : _24.reactionMessage) === null || _25 === void 0 ? void 0 : _25.text) || "reaction",
            senderKeyDistributionMessage: (_27 = (_26 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _26 === void 0 ? void 0 : _26.senderKeyDistributionMessage) === null || _27 === void 0 ? void 0 : _27.axolotlSenderKeyDistributionMessage,
            documentWithCaptionMessage: (_31 = (_30 = (_29 = (_28 = msg.message) === null || _28 === void 0 ? void 0 : _28.documentWithCaptionMessage) === null || _29 === void 0 ? void 0 : _29.message) === null || _30 === void 0 ? void 0 : _30.documentMessage) === null || _31 === void 0 ? void 0 : _31.caption,
            viewOnceMessageV2: (_35 = (_34 = (_33 = (_32 = msg.message) === null || _32 === void 0 ? void 0 : _32.viewOnceMessageV2) === null || _33 === void 0 ? void 0 : _33.message) === null || _34 === void 0 ? void 0 : _34.imageMessage) === null || _35 === void 0 ? void 0 : _35.caption,
            adMetaPreview: msgAdMetaPreview((_39 = (_38 = (_37 = (_36 = msg.message) === null || _36 === void 0 ? void 0 : _36.extendedTextMessage) === null || _37 === void 0 ? void 0 : _37.contextInfo) === null || _38 === void 0 ? void 0 : _38.externalAdReply) === null || _39 === void 0 ? void 0 : _39.thumbnail, (_43 = (_42 = (_41 = (_40 = msg.message) === null || _40 === void 0 ? void 0 : _40.extendedTextMessage) === null || _41 === void 0 ? void 0 : _41.contextInfo) === null || _42 === void 0 ? void 0 : _42.externalAdReply) === null || _43 === void 0 ? void 0 : _43.title, (_47 = (_46 = (_45 = (_44 = msg.message) === null || _44 === void 0 ? void 0 : _44.extendedTextMessage) === null || _45 === void 0 ? void 0 : _45.contextInfo) === null || _46 === void 0 ? void 0 : _46.externalAdReply) === null || _47 === void 0 ? void 0 : _47.body, (_51 = (_50 = (_49 = (_48 = msg.message) === null || _48 === void 0 ? void 0 : _48.extendedTextMessage) === null || _49 === void 0 ? void 0 : _49.contextInfo) === null || _50 === void 0 ? void 0 : _50.externalAdReply) === null || _51 === void 0 ? void 0 : _51.sourceUrl, (_53 = (_52 = msg.message) === null || _52 === void 0 ? void 0 : _52.extendedTextMessage) === null || _53 === void 0 ? void 0 : _53.text),
            editedMessage: ((_56 = (_55 = (_54 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _54 === void 0 ? void 0 : _54.protocolMessage) === null || _55 === void 0 ? void 0 : _55.editedMessage) === null || _56 === void 0 ? void 0 : _56.conversation) ||
                ((_61 = (_60 = (_59 = (_58 = (_57 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _57 === void 0 ? void 0 : _57.editedMessage) === null || _58 === void 0 ? void 0 : _58.message) === null || _59 === void 0 ? void 0 : _59.protocolMessage) === null || _60 === void 0 ? void 0 : _60.editedMessage) === null || _61 === void 0 ? void 0 : _61.conversation),
            ephemeralMessage: (_65 = (_64 = (_63 = (_62 = msg.message) === null || _62 === void 0 ? void 0 : _62.ephemeralMessage) === null || _63 === void 0 ? void 0 : _63.message) === null || _64 === void 0 ? void 0 : _64.extendedTextMessage) === null || _65 === void 0 ? void 0 : _65.text,
            imageWhitCaptionMessage: (_68 = (_67 = (_66 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _66 === void 0 ? void 0 : _66.ephemeralMessage) === null || _67 === void 0 ? void 0 : _67.message) === null || _68 === void 0 ? void 0 : _68.imageMessage,
            highlyStructuredMessage: (_69 = msg.message) === null || _69 === void 0 ? void 0 : _69.highlyStructuredMessage,
            protocolMessage: (_72 = (_71 = (_70 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _70 === void 0 ? void 0 : _70.protocolMessage) === null || _71 === void 0 ? void 0 : _71.editedMessage) === null || _72 === void 0 ? void 0 : _72.conversation,
            advertising: getAd(msg) ||
                ((_76 = (_75 = (_74 = (_73 = msg.message) === null || _73 === void 0 ? void 0 : _73.listResponseMessage) === null || _74 === void 0 ? void 0 : _74.contextInfo) === null || _75 === void 0 ? void 0 : _75.externalAdReply) === null || _76 === void 0 ? void 0 : _76.title),
            pollCreationMessageV3: ((_77 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _77 === void 0 ? void 0 : _77.pollCreationMessageV3)
                ? "*Enquete*\n".concat(msg.message.pollCreationMessageV3.name, "\n\n").concat(msg.message.pollCreationMessageV3.options
                    .map(function (option) { return option.optionName; })
                    .join("\n"))
                : null,
            eventMessage: ((_79 = (_78 = msg === null || msg === void 0 ? void 0 : msg.message) === null || _78 === void 0 ? void 0 : _78.eventMessage) === null || _79 === void 0 ? void 0 : _79.name)
                ? "*Nome do Evento: ".concat(msg.message.eventMessage.name, "*\n")
                : "sem nome do evento\n"
        };
        var objKey = Object.keys(types).find(function (key) { return key === type_1; });
        if (!objKey) {
            logger_1["default"].warn("#### Nao achou o type 152: ".concat(type_1, " ").concat(JSON.stringify(msg.message)));
            Sentry.setExtra("Mensagem", { BodyMsg: msg.message, msg: msg, type: type_1 });
            Sentry.captureException(new Error("Novo Tipo de Mensagem em getTypeMessage"));
        }
        return types[type_1];
    }
    catch (error) {
        Sentry.setExtra("Error getTypeMessage", { msg: msg, BodyMsg: msg.message });
        Sentry.captureException(error);
        console.log(error);
    }
};
exports.getBodyMessage = getBodyMessage;
var msgAdMetaPreview = function (image, title, body, sourceUrl, messageUser) {
    if (image) {
        var b64 = Buffer.from(image).toString("base64");
        var data = "data:image/png;base64, ".concat(b64, " | ").concat(sourceUrl, " | ").concat(title, " | ").concat(body, " | ").concat(messageUser);
        return data;
    }
};
var getQuotedMessage = function (msg) {
    var _a, _b, _c;
    var body = (0, baileys_1.extractMessageContent)(msg.message)[Object.keys(msg === null || msg === void 0 ? void 0 : msg.message).values().next().value];
    if (!((_a = body === null || body === void 0 ? void 0 : body.contextInfo) === null || _a === void 0 ? void 0 : _a.quotedMessage))
        return;
    var quoted = (0, baileys_1.extractMessageContent)((_b = body === null || body === void 0 ? void 0 : body.contextInfo) === null || _b === void 0 ? void 0 : _b.quotedMessage[Object.keys((_c = body === null || body === void 0 ? void 0 : body.contextInfo) === null || _c === void 0 ? void 0 : _c.quotedMessage).values().next().value]);
    return quoted;
};
exports.getQuotedMessage = getQuotedMessage;
var getQuotedMessageId = function (msg) {
    var _a, _b, _c, _d, _e;
    var body = (0, baileys_1.extractMessageContent)(msg.message)[Object.keys(msg === null || msg === void 0 ? void 0 : msg.message).values().next().value];
    var reaction = ((_a = msg === null || msg === void 0 ? void 0 : msg.message) === null || _a === void 0 ? void 0 : _a.reactionMessage)
        ? (_d = (_c = (_b = msg === null || msg === void 0 ? void 0 : msg.message) === null || _b === void 0 ? void 0 : _b.reactionMessage) === null || _c === void 0 ? void 0 : _c.key) === null || _d === void 0 ? void 0 : _d.id
        : "";
    return reaction ? reaction : (_e = body === null || body === void 0 ? void 0 : body.contextInfo) === null || _e === void 0 ? void 0 : _e.stanzaId;
};
exports.getQuotedMessageId = getQuotedMessageId;
var getMeSocket = function (wbot) {
    return {
        id: (0, baileys_1.jidNormalizedUser)(wbot.user.id),
        name: wbot.user.name
    };
};
var getSenderMessage = function (msg, wbot) { return __awaiter(void 0, void 0, void 0, function () {
    var me, senderId, cleanNumber, cleanNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getMeSocket(wbot)];
            case 1:
                me = _a.sent();
                if (msg.key.fromMe)
                    return [2 /*return*/, me.id];
                // ✅ Usar extractCleanNumber para evitar DEVICE_ID
                if (msg.key.remoteJidAlt) {
                    cleanNumber = extractCleanNumber(msg.key.remoteJidAlt);
                    senderId = cleanNumber ? "".concat(cleanNumber, "@s.whatsapp.net") : msg.key.remoteJidAlt;
                }
                else if (msg.key.participantAlt) {
                    cleanNumber = extractCleanNumber(msg.key.participantAlt);
                    senderId = cleanNumber ? "".concat(cleanNumber, "@s.whatsapp.net") : msg.key.participantAlt;
                }
                else {
                    senderId = msg.participant || msg.key.participant || msg.key.remoteJid || undefined;
                }
                return [2 /*return*/, senderId && (0, baileys_1.jidNormalizedUser)(senderId)];
        }
    });
}); };
var getContactMessage = function (msg, wbot, senderPn) { return __awaiter(void 0, void 0, void 0, function () {
    var isGroup, isNewsletter, baseNumber, contactId, rawNumber, participantBase, senderDigits, senderId, result, groupMetadata, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1["default"].info("=== GET CONTACT MESSAGE START ===");
                logger_1["default"].info("Message key info:", {
                    remoteJid: msg.key.remoteJid,
                    remoteJidAlt: msg.key.remoteJidAlt,
                    fromMe: msg.key.fromMe,
                    participant: msg.key.participant,
                    participantAlt: msg.key.participantAlt,
                    addressingMode: msg.key.addressingMode
                });
                isGroup = msg.key.remoteJid.includes("g.us");
                isNewsletter = msg.key.remoteJid.includes("newsletter");
                // Ignorar mensagens de newsletter
                if (isNewsletter) {
                    logger_1["default"].info("[newsletter] Ignorando mensagem de newsletter: ".concat(msg.key.remoteJid));
                    return [2 /*return*/, null];
                }
                baseNumber = (0, normalizeContactNumber_1.resolveContactNumber)({
                    rawNumber: msg.key.remoteJidAlt || msg.key.remoteJid,
                    remoteJid: msg.key.remoteJid,
                    remoteJidAlt: msg.key.remoteJidAlt
                });
                contactId = isGroup
                    ? msg.key.remoteJid
                    : (0, normalizeContactNumber_1.sanitizeRemoteJid)(msg.key.remoteJidAlt || msg.key.remoteJid, baseNumber, false);
                rawNumber = baseNumber || (contactId || "").replace(/\D/g, "");
                logger_1["default"].info("Contact processing:", {
                    isGroup: isGroup,
                    rawNumber: rawNumber,
                    contactId: contactId,
                    addressingMode: msg.key.addressingMode,
                    hasRemoteJidAlt: !!msg.key.remoteJidAlt
                });
                participantBase = msg.key.participantAlt || msg.key.participant || msg.key.remoteJid;
                senderDigits = (0, normalizeContactNumber_1.resolveContactNumber)({
                    rawNumber: participantBase,
                    remoteJid: participantBase,
                    remoteJidAlt: msg.key.participantAlt
                });
                senderId = isGroup
                    ? participantBase
                    : (0, normalizeContactNumber_1.sanitizeRemoteJid)(msg.key.participantAlt || msg.key.participant || msg.key.remoteJid, senderDigits, false);
                result = isGroup
                    ? {
                        id: contactId,
                        name: msg.pushName,
                        remoteJidAlt: msg.key.remoteJidAlt,
                        addressingMode: msg.key.addressingMode
                    }
                    : {
                        id: contactId,
                        name: msg.key.fromMe ? rawNumber : msg.pushName,
                        remoteJidAlt: msg.key.remoteJidAlt || contactId,
                        addressingMode: msg.key.addressingMode
                    };
                if (!(isGroup && wbot)) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, wbot.groupMetadata(contactId)];
            case 2:
                groupMetadata = _a.sent();
                if (groupMetadata === null || groupMetadata === void 0 ? void 0 : groupMetadata.subject) {
                    result.name = groupMetadata.subject;
                    logger_1["default"].info("[GRUPO] Nome do grupo obtido: ".concat(groupMetadata.subject));
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                logger_1["default"].debug("[GRUPO] N\u00E3o foi poss\u00EDvel obter metadados do grupo: ".concat(err_2 === null || err_2 === void 0 ? void 0 : err_2.message));
                return [3 /*break*/, 4];
            case 4:
                logger_1["default"].debug("Contact message result:", result);
                logger_1["default"].debug("=== GET CONTACT MESSAGE END ===");
                return [2 /*return*/, result];
        }
    });
}); };
function findCaption(obj) {
    if (typeof obj !== "object" || obj === null) {
        return null;
    }
    for (var key in obj) {
        if (key === "caption" || key === "text" || key === "conversation") {
            return obj[key];
        }
        var result = findCaption(obj[key]);
        if (result) {
            return result;
        }
    }
    return null;
}
var getUnpackedMessage = function (msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    return (((_b = (_a = msg.message) === null || _a === void 0 ? void 0 : _a.documentWithCaptionMessage) === null || _b === void 0 ? void 0 : _b.message) ||
        ((_e = (_d = (_c = msg.message) === null || _c === void 0 ? void 0 : _c.extendedTextMessage) === null || _d === void 0 ? void 0 : _d.contextInfo) === null || _e === void 0 ? void 0 : _e.quotedMessage) ||
        ((_g = (_f = msg.message) === null || _f === void 0 ? void 0 : _f.ephemeralMessage) === null || _g === void 0 ? void 0 : _g.message) ||
        ((_j = (_h = msg.message) === null || _h === void 0 ? void 0 : _h.viewOnceMessage) === null || _j === void 0 ? void 0 : _j.message) ||
        ((_l = (_k = msg.message) === null || _k === void 0 ? void 0 : _k.viewOnceMessageV2) === null || _l === void 0 ? void 0 : _l.message) ||
        ((_o = (_m = msg.message) === null || _m === void 0 ? void 0 : _m.ephemeralMessage) === null || _o === void 0 ? void 0 : _o.message) ||
        ((_q = (_p = msg.message) === null || _p === void 0 ? void 0 : _p.templateMessage) === null || _q === void 0 ? void 0 : _q.hydratedTemplate) ||
        ((_s = (_r = msg.message) === null || _r === void 0 ? void 0 : _r.templateMessage) === null || _s === void 0 ? void 0 : _s.hydratedFourRowTemplate) ||
        ((_u = (_t = msg.message) === null || _t === void 0 ? void 0 : _t.templateMessage) === null || _u === void 0 ? void 0 : _u.fourRowTemplate) ||
        ((_w = (_v = msg.message) === null || _v === void 0 ? void 0 : _v.interactiveMessage) === null || _w === void 0 ? void 0 : _w.header) ||
        ((_z = (_y = (_x = msg.message) === null || _x === void 0 ? void 0 : _x.highlyStructuredMessage) === null || _y === void 0 ? void 0 : _y.hydratedHsm) === null || _z === void 0 ? void 0 : _z.hydratedTemplate) ||
        msg.message);
};
var getMessageMedia = function (message) {
    return ((message === null || message === void 0 ? void 0 : message.imageMessage) ||
        (message === null || message === void 0 ? void 0 : message.audioMessage) ||
        (message === null || message === void 0 ? void 0 : message.videoMessage) ||
        (message === null || message === void 0 ? void 0 : message.stickerMessage) ||
        (message === null || message === void 0 ? void 0 : message.documentMessage) ||
        null);
};
var downloadMedia = function (msg, isImported, wbot, ticket) {
    if (isImported === void 0) { isImported = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var unpackedMessage, message, fileLimit, _a, fileLimitMessage, sendMsg, urlAnt, directPath, newUrl, final, buffer, err_3, filename, mineType, ext, media;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102;
        return __generator(this, function (_103) {
            switch (_103.label) {
                case 0:
                    unpackedMessage = getUnpackedMessage(msg);
                    message = getMessageMedia(unpackedMessage);
                    if (!message) {
                        return [2 /*return*/, null];
                    }
                    _a = parseInt;
                    return [4 /*yield*/, (0, CheckSettings_1.CheckSettings1)("downloadLimit", "2048")];
                case 1:
                    fileLimit = _a.apply(void 0, [_103.sent(), 10]);
                    if (!(wbot &&
                        (message === null || message === void 0 ? void 0 : message.fileLength) &&
                        +message.fileLength > fileLimit * 1024 * 1024)) return [3 /*break*/, 4];
                    fileLimitMessage = {
                        text: "\u200E*Mensagem Autom\u00E1tica*:\nNosso sistema aceita apenas arquivos com no m\u00E1ximo ".concat(fileLimit, " MiB")
                    };
                    return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat("s.whatsapp.net"), fileLimitMessage)];
                case 2:
                    sendMsg = _103.sent();
                    sendMsg.message.extendedTextMessage.text =
                        "\u200e*Mensagem do sistema*:\nArquivo recebido além do limite de tamanho do sistema, se for necessário ele pode ser obtido no aplicativo do whatsapp.";
                    // eslint-disable-next-line no-use-before-define
                    return [4 /*yield*/, (0, exports.verifyMessage)(sendMsg, ticket, ticket.contact)];
                case 3:
                    // eslint-disable-next-line no-use-before-define
                    _103.sent();
                    throw new Error("ERR_FILESIZE_OVER_LIMIT");
                case 4:
                    if ((_b = msg.message) === null || _b === void 0 ? void 0 : _b.stickerMessage) {
                        urlAnt = "https://web.whatsapp.net";
                        directPath = (_d = (_c = msg.message) === null || _c === void 0 ? void 0 : _c.stickerMessage) === null || _d === void 0 ? void 0 : _d.directPath;
                        newUrl = "https://mmg.whatsapp.net";
                        final = newUrl + directPath;
                        if ((_g = (_f = (_e = msg.message) === null || _e === void 0 ? void 0 : _e.stickerMessage) === null || _f === void 0 ? void 0 : _f.url) === null || _g === void 0 ? void 0 : _g.includes(urlAnt)) {
                            msg.message.stickerMessage.url = (_h = msg.message) === null || _h === void 0 ? void 0 : _h.stickerMessage.url.replace(urlAnt, final);
                        }
                    }
                    _103.label = 5;
                case 5:
                    _103.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, (0, baileys_1.downloadMediaMessage)(msg, "buffer", {}, {
                            logger: logger_1["default"],
                            reuploadRequest: wbot.updateMediaMessage
                        })];
                case 6:
                    buffer = _103.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_3 = _103.sent();
                    if (isImported) {
                        console.log("Falha ao fazer o download de uma mensagem importada, provavelmente a mensagem já não esta mais disponível");
                    }
                    else {
                        console.error("Erro ao baixar mídia:", err_3);
                    }
                    return [3 /*break*/, 8];
                case 8:
                    filename = ((_k = (_j = msg.message) === null || _j === void 0 ? void 0 : _j.documentMessage) === null || _k === void 0 ? void 0 : _k.fileName) || "";
                    mineType = ((_l = msg.message) === null || _l === void 0 ? void 0 : _l.imageMessage) ||
                        ((_m = msg.message) === null || _m === void 0 ? void 0 : _m.audioMessage) ||
                        ((_o = msg.message) === null || _o === void 0 ? void 0 : _o.videoMessage) ||
                        ((_p = msg.message) === null || _p === void 0 ? void 0 : _p.stickerMessage) ||
                        ((_s = (_r = (_q = msg.message) === null || _q === void 0 ? void 0 : _q.ephemeralMessage) === null || _r === void 0 ? void 0 : _r.message) === null || _s === void 0 ? void 0 : _s.stickerMessage) ||
                        ((_t = msg.message) === null || _t === void 0 ? void 0 : _t.documentMessage) ||
                        ((_w = (_v = (_u = msg.message) === null || _u === void 0 ? void 0 : _u.documentWithCaptionMessage) === null || _v === void 0 ? void 0 : _v.message) === null || _w === void 0 ? void 0 : _w.documentMessage) ||
                        ((_z = (_y = (_x = msg.message) === null || _x === void 0 ? void 0 : _x.ephemeralMessage) === null || _y === void 0 ? void 0 : _y.message) === null || _z === void 0 ? void 0 : _z.audioMessage) ||
                        ((_2 = (_1 = (_0 = msg.message) === null || _0 === void 0 ? void 0 : _0.ephemeralMessage) === null || _1 === void 0 ? void 0 : _1.message) === null || _2 === void 0 ? void 0 : _2.documentMessage) ||
                        ((_5 = (_4 = (_3 = msg.message) === null || _3 === void 0 ? void 0 : _3.ephemeralMessage) === null || _4 === void 0 ? void 0 : _4.message) === null || _5 === void 0 ? void 0 : _5.videoMessage) ||
                        ((_8 = (_7 = (_6 = msg.message) === null || _6 === void 0 ? void 0 : _6.ephemeralMessage) === null || _7 === void 0 ? void 0 : _7.message) === null || _8 === void 0 ? void 0 : _8.imageMessage) ||
                        ((_11 = (_10 = (_9 = msg.message) === null || _9 === void 0 ? void 0 : _9.viewOnceMessage) === null || _10 === void 0 ? void 0 : _10.message) === null || _11 === void 0 ? void 0 : _11.imageMessage) ||
                        ((_14 = (_13 = (_12 = msg.message) === null || _12 === void 0 ? void 0 : _12.viewOnceMessage) === null || _13 === void 0 ? void 0 : _13.message) === null || _14 === void 0 ? void 0 : _14.videoMessage) ||
                        ((_17 = (_16 = (_15 = msg.message) === null || _15 === void 0 ? void 0 : _15.viewOnceMessageV2) === null || _16 === void 0 ? void 0 : _16.message) === null || _17 === void 0 ? void 0 : _17.imageMessage) ||
                        ((_20 = (_19 = (_18 = msg.message) === null || _18 === void 0 ? void 0 : _18.viewOnceMessageV2) === null || _19 === void 0 ? void 0 : _19.message) === null || _20 === void 0 ? void 0 : _20.videoMessage) ||
                        ((_23 = (_22 = (_21 = msg.message) === null || _21 === void 0 ? void 0 : _21.viewOnceMessageV2) === null || _22 === void 0 ? void 0 : _22.message) === null || _23 === void 0 ? void 0 : _23.audioMessage) ||
                        ((_26 = (_25 = (_24 = msg.message) === null || _24 === void 0 ? void 0 : _24.viewOnceMessageV2) === null || _25 === void 0 ? void 0 : _25.message) === null || _26 === void 0 ? void 0 : _26.documentMessage) ||
                        ((_31 = (_30 = (_29 = (_28 = (_27 = msg.message) === null || _27 === void 0 ? void 0 : _27.ephemeralMessage) === null || _28 === void 0 ? void 0 : _28.message) === null || _29 === void 0 ? void 0 : _29.viewOnceMessage) === null || _30 === void 0 ? void 0 : _30.message) === null || _31 === void 0 ? void 0 : _31.imageMessage) ||
                        ((_36 = (_35 = (_34 = (_33 = (_32 = msg.message) === null || _32 === void 0 ? void 0 : _32.ephemeralMessage) === null || _33 === void 0 ? void 0 : _33.message) === null || _34 === void 0 ? void 0 : _34.viewOnceMessage) === null || _35 === void 0 ? void 0 : _35.message) === null || _36 === void 0 ? void 0 : _36.videoMessage) ||
                        ((_41 = (_40 = (_39 = (_38 = (_37 = msg.message) === null || _37 === void 0 ? void 0 : _37.ephemeralMessage) === null || _38 === void 0 ? void 0 : _38.message) === null || _39 === void 0 ? void 0 : _39.viewOnceMessage) === null || _40 === void 0 ? void 0 : _40.message) === null || _41 === void 0 ? void 0 : _41.audioMessage) ||
                        ((_46 = (_45 = (_44 = (_43 = (_42 = msg.message) === null || _42 === void 0 ? void 0 : _42.ephemeralMessage) === null || _43 === void 0 ? void 0 : _43.message) === null || _44 === void 0 ? void 0 : _44.viewOnceMessage) === null || _45 === void 0 ? void 0 : _45.message) === null || _46 === void 0 ? void 0 : _46.documentMessage) ||
                        ((_51 = (_50 = (_49 = (_48 = (_47 = msg.message) === null || _47 === void 0 ? void 0 : _47.ephemeralMessage) === null || _48 === void 0 ? void 0 : _48.message) === null || _49 === void 0 ? void 0 : _49.viewOnceMessageV2) === null || _50 === void 0 ? void 0 : _50.message) === null || _51 === void 0 ? void 0 : _51.imageMessage) ||
                        ((_56 = (_55 = (_54 = (_53 = (_52 = msg.message) === null || _52 === void 0 ? void 0 : _52.ephemeralMessage) === null || _53 === void 0 ? void 0 : _53.message) === null || _54 === void 0 ? void 0 : _54.viewOnceMessageV2) === null || _55 === void 0 ? void 0 : _55.message) === null || _56 === void 0 ? void 0 : _56.videoMessage) ||
                        ((_61 = (_60 = (_59 = (_58 = (_57 = msg.message) === null || _57 === void 0 ? void 0 : _57.ephemeralMessage) === null || _58 === void 0 ? void 0 : _58.message) === null || _59 === void 0 ? void 0 : _59.viewOnceMessageV2) === null || _60 === void 0 ? void 0 : _60.message) === null || _61 === void 0 ? void 0 : _61.audioMessage) ||
                        ((_66 = (_65 = (_64 = (_63 = (_62 = msg.message) === null || _62 === void 0 ? void 0 : _62.ephemeralMessage) === null || _63 === void 0 ? void 0 : _63.message) === null || _64 === void 0 ? void 0 : _64.viewOnceMessageV2) === null || _65 === void 0 ? void 0 : _65.message) === null || _66 === void 0 ? void 0 : _66.documentMessage) ||
                        ((_69 = (_68 = (_67 = msg.message) === null || _67 === void 0 ? void 0 : _67.templateMessage) === null || _68 === void 0 ? void 0 : _68.hydratedTemplate) === null || _69 === void 0 ? void 0 : _69.imageMessage) ||
                        ((_72 = (_71 = (_70 = msg.message) === null || _70 === void 0 ? void 0 : _70.templateMessage) === null || _71 === void 0 ? void 0 : _71.hydratedTemplate) === null || _72 === void 0 ? void 0 : _72.documentMessage) ||
                        ((_75 = (_74 = (_73 = msg.message) === null || _73 === void 0 ? void 0 : _73.templateMessage) === null || _74 === void 0 ? void 0 : _74.hydratedTemplate) === null || _75 === void 0 ? void 0 : _75.videoMessage) ||
                        ((_78 = (_77 = (_76 = msg.message) === null || _76 === void 0 ? void 0 : _76.templateMessage) === null || _77 === void 0 ? void 0 : _77.hydratedFourRowTemplate) === null || _78 === void 0 ? void 0 : _78.imageMessage) ||
                        ((_81 = (_80 = (_79 = msg.message) === null || _79 === void 0 ? void 0 : _79.templateMessage) === null || _80 === void 0 ? void 0 : _80.hydratedFourRowTemplate) === null || _81 === void 0 ? void 0 : _81.documentMessage) ||
                        ((_84 = (_83 = (_82 = msg.message) === null || _82 === void 0 ? void 0 : _82.templateMessage) === null || _83 === void 0 ? void 0 : _83.hydratedFourRowTemplate) === null || _84 === void 0 ? void 0 : _84.videoMessage) ||
                        ((_87 = (_86 = (_85 = msg.message) === null || _85 === void 0 ? void 0 : _85.templateMessage) === null || _86 === void 0 ? void 0 : _86.fourRowTemplate) === null || _87 === void 0 ? void 0 : _87.imageMessage) ||
                        ((_90 = (_89 = (_88 = msg.message) === null || _88 === void 0 ? void 0 : _88.templateMessage) === null || _89 === void 0 ? void 0 : _89.fourRowTemplate) === null || _90 === void 0 ? void 0 : _90.documentMessage) ||
                        ((_93 = (_92 = (_91 = msg.message) === null || _91 === void 0 ? void 0 : _91.templateMessage) === null || _92 === void 0 ? void 0 : _92.fourRowTemplate) === null || _93 === void 0 ? void 0 : _93.videoMessage) ||
                        ((_96 = (_95 = (_94 = msg.message) === null || _94 === void 0 ? void 0 : _94.interactiveMessage) === null || _95 === void 0 ? void 0 : _95.header) === null || _96 === void 0 ? void 0 : _96.imageMessage) ||
                        ((_99 = (_98 = (_97 = msg.message) === null || _97 === void 0 ? void 0 : _97.interactiveMessage) === null || _98 === void 0 ? void 0 : _98.header) === null || _99 === void 0 ? void 0 : _99.documentMessage) ||
                        ((_102 = (_101 = (_100 = msg.message) === null || _100 === void 0 ? void 0 : _100.interactiveMessage) === null || _101 === void 0 ? void 0 : _101.header) === null || _102 === void 0 ? void 0 : _102.videoMessage);
                    if (!filename) {
                        ext = mineType.mimetype.split("/")[1].split(";")[0];
                        filename = "".concat(new Date().getTime(), ".").concat(ext);
                    }
                    else {
                        filename = "".concat(new Date().getTime(), "_").concat(filename);
                    }
                    media = {
                        data: buffer,
                        mimetype: mineType.mimetype,
                        filename: filename
                    };
                    return [2 /*return*/, media];
            }
        });
    });
};
var verifyContact = function (msgContact, wbot, companyId, msg) { return __awaiter(void 0, void 0, void 0, function () {
    var profilePicUrl, isGroup, number, name, remoteJid, existingContact, existingPic, cdnUrl, err_4, contactData, contact;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                logger_1["default"].info("=== VERIFY CONTACT START ===");
                logger_1["default"].info("msgContact received:", JSON.stringify(msgContact, null, 2));
                profilePicUrl = "";
                isGroup = (msgContact.id || "").includes("g.us");
                number = "";
                if (msgContact.id) {
                    // Extrair número do ID: 5524993959492@s.whatsapp.net -> 5524993959492
                    number = msgContact.id.split('@')[0];
                    logger_1["default"].info("🔥 Fallback direto do ID:", number);
                }
                // Tentar resolveContactNumber normal se fallback falhar
                if (!number) {
                    number = (0, normalizeContactNumber_1.resolveContactNumber)({
                        rawNumber: msgContact.remoteJidAlt || msgContact.id,
                        remoteJid: msgContact.id,
                        remoteJidAlt: msgContact.remoteJidAlt,
                        isGroup: isGroup // Passar isGroup para resolver ID do grupo corretamente
                    });
                }
                if (!number && !isGroup) {
                    logger_1["default"].warn("Não foi possível extrair número válido para contato LID", {
                        id: msgContact.id,
                        remoteJidAlt: msgContact.remoteJidAlt
                    });
                }
                logger_1["default"].info("Extracted number:", number);
                if (!number && !isGroup) {
                    logger_1["default"].warn("⚠️ Número não extraído para contato não-grupo, tentando fallback", {
                        id: msgContact.id,
                        remoteJidAlt: msgContact.remoteJidAlt,
                        isGroup: isGroup
                    });
                    // **Fallback: Priorizar remoteJidAlt (número real) ou usar msgContact.id**
                    number = msgContact.remoteJidAlt || ((_a = msgContact.id) === null || _a === void 0 ? void 0 : _a.split('@')[0]) || '';
                    logger_1["default"].info("🔄 Fallback number:", number);
                    // **NÃO RETORNAR NULL - CONTINUAR PROCESSAMENTO**
                    if (!number) {
                        logger_1["default"].error("❌ Usando ID vazio como último recurso");
                        number = msgContact.id || 'unknown';
                    }
                }
                name = (msgContact === null || msgContact === void 0 ? void 0 : msgContact.name) || number;
                logger_1["default"].info("📝 Nome do contato:", name);
                // **CORREÇÃO: Para grupos, usar o remoteJid original (msgContact.id) em vez de sanitizar**
                if (isGroup) {
                    remoteJid = msgContact.id; // Já está no formato correto: 120363...@g.us
                    console.log("[VERIFY CONTACT - GRUPO] Usando remoteJid original:", remoteJid);
                }
                else {
                    remoteJid = (0, normalizeContactNumber_1.sanitizeRemoteJid)(msgContact.id, number, isGroup);
                    logger_1["default"].info("🔗 RemoteJid construído:", remoteJid);
                }
                if (!wbot) return [3 /*break*/, 11];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: { number: number, companyId: companyId },
                        attributes: ["profilePicUrl"]
                    })];
            case 1:
                existingContact = _e.sent();
                existingPic = (_d = (_c = (_b = existingContact === null || existingContact === void 0 ? void 0 : existingContact.getDataValue) === null || _b === void 0 ? void 0 : _b.call(existingContact, "profilePicUrl")) !== null && _c !== void 0 ? _c : existingContact === null || existingContact === void 0 ? void 0 : existingContact.profilePicUrl) !== null && _d !== void 0 ? _d : "";
                if (!(existingPic && existingPic !== "no_photo")) return [3 /*break*/, 2];
                // Já tem foto válida — reutiliza sem chamar Baileys
                profilePicUrl = existingPic;
                return [3 /*break*/, 11];
            case 2:
                if (!!existingPic) return [3 /*break*/, 10];
                _e.label = 3;
            case 3:
                _e.trys.push([3, 8, , 9]);
                return [4 /*yield*/, wbot.profilePictureUrl(remoteJid, "image", 5000)];
            case 4:
                cdnUrl = _e.sent();
                if (!cdnUrl) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, DownloadProfilePic_1["default"])(cdnUrl, companyId, number)];
            case 5:
                profilePicUrl = _e.sent();
                logger_1["default"].info("\uD83D\uDCF8 Profile picture saved for ".concat(isGroup ? 'group' : 'contact', ": ").concat(profilePicUrl));
                return [3 /*break*/, 7];
            case 6:
                profilePicUrl = "no_photo";
                _e.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_4 = _e.sent();
                logger_1["default"].debug("Could not get profile picture for ".concat(isGroup ? 'group' : 'contact', ":"), err_4 === null || err_4 === void 0 ? void 0 : err_4.message);
                profilePicUrl = "no_photo";
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                // existingPic === "no_photo" — contato sem foto, não tenta de novo
                profilePicUrl = "no_photo";
                _e.label = 11;
            case 11:
                logger_1["default"].info("📋 Final contact data:", {
                    number: number,
                    remoteJid: remoteJid,
                    isGroup: isGroup,
                    addressingMode: msgContact.addressingMode
                });
                contactData = {
                    name: name,
                    number: number,
                    profilePicUrl: profilePicUrl,
                    isGroup: isGroup,
                    companyId: companyId,
                    remoteJid: msgContact.id,
                    remoteJidAlt: msgContact.remoteJidAlt,
                    whatsappId: wbot.id,
                    wbot: wbot,
                    addressingMode: msgContact.addressingMode,
                    msgBody: (msg === null || msg === void 0 ? void 0 : msg.body) || ""
                };
                if (contactData.isGroup) {
                    contactData.number = (0, normalizeContactNumber_1.resolveContactNumber)({
                        rawNumber: msgContact.id,
                        remoteJid: msgContact.id
                    });
                }
                logger_1["default"].info("💾 Salvando contato no banco...");
                return [4 /*yield*/, (0, CreateOrUpdateContactService_1["default"])(contactData)];
            case 12:
                contact = _e.sent();
                logger_1["default"].debug("Contact created/updated:", {
                    id: contact.id,
                    name: contact.name,
                    number: contact.number,
                    remoteJid: contact.remoteJid,
                    addressingMode: contact.addressingMode
                });
                logger_1["default"].debug("=== VERIFY CONTACT END ===");
                return [2 /*return*/, contact];
        }
    });
}); };
var verifyQuotedMessage = function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var quoted, quotedMsg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!msg)
                    return [2 /*return*/, null];
                quoted = (0, exports.getQuotedMessageId)(msg);
                if (!quoted)
                    return [2 /*return*/, null];
                return [4 /*yield*/, Message_1["default"].findOne({
                        where: { wid: quoted }
                    })];
            case 1:
                quotedMsg = _a.sent();
                if (!quotedMsg)
                    return [2 /*return*/, null];
                return [2 /*return*/, quotedMsg];
        }
    });
}); };
var verifyMediaMessage = function (msg, ticket, contact, ticketTraking, isForwarded, isPrivate, wbot, isMessageImported) {
    if (isForwarded === void 0) { isForwarded = false; }
    if (isPrivate === void 0) { isPrivate = false; }
    if (isMessageImported === void 0) { isMessageImported = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var io, quotedMsg, companyId, media_1, body_1, messageData_1, ext, ext, name_1, folder_1, err_5, body, messageData, newMessage, error_1;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    io = (0, socket_1.getIO)();
                    return [4 /*yield*/, verifyQuotedMessage(msg)];
                case 1:
                    quotedMsg = _g.sent();
                    companyId = ticket.companyId;
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 15, , 16]);
                    return [4 /*yield*/, downloadMedia(msg, ticket === null || ticket === void 0 ? void 0 : ticket.imported, wbot, ticket)];
                case 3:
                    media_1 = _g.sent();
                    if (!(!media_1 && ticket.imported)) return [3 /*break*/, 5];
                    body_1 = "*System:* \nFalha no download da mídia verifique no dispositivo";
                    messageData_1 = {
                        //mensagem de texto
                        wid: msg.key.id,
                        ticketId: ticket.id,
                        contactId: msg.key.fromMe ? undefined : ticket.contactId,
                        body: body_1,
                        reactionMessage: (_a = msg.message) === null || _a === void 0 ? void 0 : _a.reactionMessage,
                        fromMe: msg.key.fromMe,
                        mediaType: getTypeMessage(msg),
                        read: msg.key.fromMe,
                        quotedMsgId: (quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id) || ((_d = (_c = (_b = msg.message) === null || _b === void 0 ? void 0 : _b.reactionMessage) === null || _c === void 0 ? void 0 : _c.key) === null || _d === void 0 ? void 0 : _d.id),
                        ack: msg.status,
                        companyId: companyId,
                        remoteJid: msg.key.remoteJidAlt || msg.key.remoteJid,
                        participant: msg.key.participantAlt || msg.key.participant,
                        timestamp: getTimestampMessage(msg.messageTimestamp),
                        createdAt: new Date(Math.floor(getTimestampMessage(msg.messageTimestamp) * 1000)).toISOString(),
                        dataJson: JSON.stringify(msg),
                        ticketImported: isMessageImported,
                        isForwarded: isForwarded,
                        isPrivate: isPrivate
                    };
                    return [4 /*yield*/, ticket.update({
                            lastMessage: body_1
                        })];
                case 4:
                    _g.sent();
                    logger_1["default"].error(Error("ERR_WAPP_DOWNLOAD_MEDIA"));
                    return [2 /*return*/, (0, CreateMessageService_1["default"])({ messageData: messageData_1, companyId: companyId })];
                case 5:
                    if (!media_1) {
                        throw new Error("ERR_WAPP_DOWNLOAD_MEDIA");
                    }
                    // if (!media.filename || media.mimetype === "audio/mp4") {
                    //   const ext = media.mimetype === "audio/mp4" ? "m4a" : media.mimetype.split("/")[1].split(";")[0];
                    //   media.filename = `${new Date().getTime()}.${ext}`;
                    // } else {
                    //   // ext = tudo depois do ultimo .
                    //   const ext = media.filename.split(".").pop();
                    //   // name = tudo antes do ultimo .
                    //   const name = media.filename.split(".").slice(0, -1).join(".").replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    //   media.filename = `${name.trim()}_${new Date().getTime()}.${ext}`;
                    // }
                    if (!media_1.filename) {
                        ext = media_1.mimetype.split("/")[1].split(";")[0];
                        media_1.filename = "".concat(new Date().getTime(), ".").concat(ext);
                    }
                    else {
                        ext = media_1.filename.split(".").pop();
                        name_1 = media_1.filename
                            .split(".")
                            .slice(0, -1)
                            .join(".")
                            .replace(/\s/g, "_")
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        media_1.filename = "".concat(name_1.trim(), "_").concat(new Date().getTime(), ".").concat(ext);
                    }
                    _g.label = 6;
                case 6:
                    _g.trys.push([6, 8, , 9]);
                    folder_1 = path_1["default"].resolve(__dirname, "..", "..", "..", "public", "company".concat(companyId));
                    // const folder = `public/company${companyId}`; // Correção adicionada por Altemir 16-08-2023
                    if (!fs_2["default"].existsSync(folder_1)) {
                        fs_2["default"].mkdirSync(folder_1, { recursive: true }); // Correção adicionada por Altemir 16-08-2023
                        fs_2["default"].chmodSync(folder_1, 511);
                    }
                    return [4 /*yield*/, writeFileAsync((0, path_1.join)(folder_1, media_1.filename), media_1.data.toString("base64"), "base64") // Correção adicionada por Altemir 16-08-2023
                            .then(function () {
                            // console.log("Arquivo salvo com sucesso!");
                            if (media_1.mimetype.includes("audio")) {
                                console.log(media_1.mimetype);
                                var inputFile_1 = path_1["default"].join(folder_1, media_1.filename);
                                var outputFile_1;
                                if (inputFile_1.endsWith(".mpeg")) {
                                    outputFile_1 = inputFile_1.replace(".mpeg", ".mp3");
                                }
                                else if (inputFile_1.endsWith(".ogg")) {
                                    outputFile_1 = inputFile_1.replace(".ogg", ".mp3");
                                }
                                else {
                                    // Trate outros formatos de arquivo conforme necessário
                                    //console.error("Formato de arquivo não suportado:", inputFile);
                                    return;
                                }
                                return new Promise(function (resolve, reject) {
                                    (0, fluent_ffmpeg_1["default"])(inputFile_1)
                                        .toFormat("mp3")
                                        .save(outputFile_1)
                                        .on("end", function () {
                                        resolve();
                                    })
                                        .on("error", function (err) {
                                        reject(err);
                                    });
                                });
                            }
                        })];
                case 7:
                    _g.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_5 = _g.sent();
                    Sentry.setExtra("Erro media", {
                        companyId: companyId,
                        ticket: ticket,
                        contact: contact,
                        media: media_1,
                        quotedMsg: quotedMsg
                    });
                    Sentry.captureException(err_5);
                    logger_1["default"].error(err_5);
                    console.log(msg);
                    return [3 /*break*/, 9];
                case 9:
                    body = (0, exports.getBodyMessage)(msg);
                    messageData = {
                        wid: msg.key.id,
                        ticketId: ticket.id,
                        contactId: msg.key.fromMe ? undefined : contact.id,
                        body: body || media_1.filename,
                        fromMe: msg.key.fromMe,
                        read: msg.key.fromMe,
                        mediaUrl: media_1.filename,
                        mediaType: media_1.mimetype.split("/")[0],
                        quotedMsgId: quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id,
                        ack: Number(String(msg.status).replace("PENDING", "2").replace("NaN", "1")) || 2,
                        remoteJid: (_e = msg.key.remoteJidAlt) !== null && _e !== void 0 ? _e : msg.key.remoteJid,
                        participant: (_f = msg.key.participantAlt) !== null && _f !== void 0 ? _f : msg.key.participant,
                        dataJson: JSON.stringify(msg),
                        ticketTrakingId: ticketTraking === null || ticketTraking === void 0 ? void 0 : ticketTraking.id,
                        createdAt: new Date(Math.floor(getTimestampMessage(msg.messageTimestamp) * 1000)).toISOString(),
                        ticketImported: isMessageImported,
                        isForwarded: isForwarded,
                        isPrivate: isPrivate
                    };
                    return [4 /*yield*/, ticket.update({
                            lastMessage: body || media_1.filename
                        })];
                case 10:
                    _g.sent();
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: messageData,
                            companyId: companyId
                        })];
                case 11:
                    newMessage = _g.sent();
                    if (!(!msg.key.fromMe && ticket.status === "closed")) return [3 /*break*/, 14];
                    return [4 /*yield*/, ticket.update({ status: "pending" })];
                case 12:
                    _g.sent();
                    return [4 /*yield*/, ticket.reload({
                            attributes: [
                                "id",
                                "uuid",
                                "queueId",
                                "isGroup",
                                "channel",
                                "status",
                                "contactId",
                                "useIntegration",
                                "lastMessage",
                                "updatedAt",
                                "unreadMessages",
                                "companyId",
                                "whatsappId",
                                "imported",
                                "lgpdAcceptedAt",
                                "amountUsedBotQueues",
                                "useIntegration",
                                "integrationId",
                                "userId",
                                "amountUsedBotQueuesNPS",
                                "lgpdSendMessageAt",
                                "isBot"
                            ],
                            include: [
                                { model: Queue_1["default"], as: "queue" },
                                { model: User_1["default"], as: "user" },
                                { model: Contact_1["default"], as: "contact" },
                                { model: Whatsapp_1["default"], as: "whatsapp" }
                            ]
                        })];
                case 13:
                    _g.sent();
                    io.of(String(companyId))
                        // .to("closed")
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "delete",
                        ticket: ticket,
                        ticketId: ticket.id
                    });
                    // console.log("emitiu socket 902", ticket.id)
                    io.of(String(companyId))
                        // .to(ticket.status)
                        //   .to(ticket.id.toString())
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket,
                        ticketId: ticket.id
                    });
                    _g.label = 14;
                case 14: return [2 /*return*/, newMessage];
                case 15:
                    error_1 = _g.sent();
                    console.log(error_1);
                    logger_1["default"].warn("Erro ao baixar media: ", JSON.stringify(msg));
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
};
exports.verifyMediaMessage = verifyMediaMessage;
// Função para processar comando de resposta rápida #{ "resp": "1" }
var processQuickMessageCommand = function (body, ticket, contact) { return __awaiter(void 0, void 0, void 0, function () {
    var respMatch, respId, quickMessage, whatsapp, messageData, localPath, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                respMatch = body.match(/#\{\s*"resp"\s*:\s*"(\d+)"\s*\}/);
                if (!respMatch) {
                    return [2 /*return*/, false];
                }
                respId = parseInt(respMatch[1]);
                logger_1["default"].info("[processQuickMessageCommand] Detectado comando resp: ".concat(respId));
                return [4 /*yield*/, QuickMessage_1["default"].findOne({
                        where: { id: respId, companyId: ticket.companyId }
                    })];
            case 1:
                quickMessage = _b.sent();
                if (!quickMessage) {
                    logger_1["default"].warn("[processQuickMessageCommand] Resposta r\u00E1pida ID ".concat(respId, " n\u00E3o encontrada"));
                    return [2 /*return*/, false];
                }
                logger_1["default"].info("[processQuickMessageCommand] Resposta r\u00E1pida encontrada: ".concat(quickMessage.shortcode));
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(ticket.whatsappId, ticket.companyId)];
            case 2:
                whatsapp = _b.sent();
                if (!whatsapp) {
                    logger_1["default"].error("[processQuickMessageCommand] WhatsApp ID ".concat(ticket.whatsappId, " n\u00E3o encontrado"));
                    return [2 /*return*/, false];
                }
                if (!(quickMessage.messageType === "buttons" && ((_a = quickMessage.buttons) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, SendInteractiveMenu_1.SendCTAButtons)({
                        ticket: ticket,
                        messageText: quickMessage.message || "",
                        buttons: quickMessage.buttons
                    })];
            case 3:
                _b.sent();
                logger_1["default"].info("[processQuickMessageCommand] Bot\u00F5es CTA enviados para \"".concat(quickMessage.shortcode, "\""));
                return [2 /*return*/, true];
            case 4:
                messageData = {
                    number: contact.number,
                    body: quickMessage.message || "",
                    companyId: ticket.companyId
                };
                // Se tem mídia anexada — caminho relativo ao CWD (evita problema com paths absolutos no Windows/Baileys)
                if (quickMessage.mediaPath && quickMessage.mediaName) {
                    localPath = quickMessage.getDataValue("mediaPath");
                    if (localPath) {
                        messageData.mediaPath = "public/company".concat(ticket.companyId, "/quickMessage/").concat(localPath);
                        messageData.mediaName = quickMessage.mediaName;
                        logger_1["default"].info("[processQuickMessageCommand] Enviando com m\u00EDdia: ".concat(quickMessage.mediaName));
                    }
                }
                // Enviar mensagem
                return [4 /*yield*/, SendMessage(whatsapp, messageData, false, ticket)];
            case 5:
                // Enviar mensagem
                _b.sent();
                logger_1["default"].info("[processQuickMessageCommand] Resposta r\u00E1pida \"".concat(quickMessage.shortcode, "\" enviada com sucesso"));
                return [2 /*return*/, true];
            case 6:
                error_2 = _b.sent();
                logger_1["default"].error("[processQuickMessageCommand] Erro ao processar comando:", error_2);
                return [2 /*return*/, false];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Função auxiliar para extrair dados dos botões e carrossel
var getButtonsAndCarouselData = function (msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    try {
        var buttonsData = null;
        var carouselData = null;
        // Extrair de viewOnceMessage
        if ((msg === null || msg === void 0 ? void 0 : msg.messageType) === "viewOnceMessage" || ((_c = (_b = (_a = msg === null || msg === void 0 ? void 0 : msg.message) === null || _a === void 0 ? void 0 : _a.viewOnceMessage) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.interactiveMessage)) {
            var buttons = (_h = (_g = (_f = (_e = (_d = msg === null || msg === void 0 ? void 0 : msg.message) === null || _d === void 0 ? void 0 : _d.viewOnceMessage) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.interactiveMessage) === null || _g === void 0 ? void 0 : _g.nativeFlowMessage) === null || _h === void 0 ? void 0 : _h.buttons;
            if (buttons && buttons.length > 0) {
                buttonsData = buttons.map(function (btn) {
                    var params = JSON.parse(btn.buttonParamsJson || "{}");
                    return {
                        name: btn.name,
                        displayText: params.display_text || "",
                        id: params.id || "",
                        url: params.url || "",
                        phoneNumber: params.phone_number || ""
                    };
                });
            }
            var carouselMsg = (_m = (_l = (_k = (_j = msg === null || msg === void 0 ? void 0 : msg.message) === null || _j === void 0 ? void 0 : _j.viewOnceMessage) === null || _k === void 0 ? void 0 : _k.message) === null || _l === void 0 ? void 0 : _l.interactiveMessage) === null || _m === void 0 ? void 0 : _m.carouselMessage;
            if (carouselMsg && carouselMsg.cards) {
                carouselData = carouselMsg.cards.map(function (card) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    return ({
                        title: ((_a = card.header) === null || _a === void 0 ? void 0 : _a.title) || ((_c = (_b = card.header) === null || _b === void 0 ? void 0 : _b.imageMessage) === null || _c === void 0 ? void 0 : _c.caption) || "",
                        description: ((_d = card.body) === null || _d === void 0 ? void 0 : _d.text) || "",
                        price: ((_e = card.footer) === null || _e === void 0 ? void 0 : _e.text) || "",
                        image: ((_g = (_f = card.header) === null || _f === void 0 ? void 0 : _f.imageMessage) === null || _g === void 0 ? void 0 : _g.url) || "",
                        buttons: ((_j = (_h = card.nativeFlowMessage) === null || _h === void 0 ? void 0 : _h.buttons) === null || _j === void 0 ? void 0 : _j.map(function (btn) {
                            var params = JSON.parse(btn.buttonParamsJson || "{}");
                            return {
                                name: btn.name,
                                displayText: params.display_text || "",
                                id: params.id || "",
                                url: params.url || ""
                            };
                        })) || []
                    });
                });
            }
        }
        // Extrair de interactiveMessage direto
        if ((msg === null || msg === void 0 ? void 0 : msg.messageType) === "interactiveMessage" || ((_o = msg === null || msg === void 0 ? void 0 : msg.message) === null || _o === void 0 ? void 0 : _o.interactiveMessage)) {
            var buttons = (_r = (_q = (_p = msg === null || msg === void 0 ? void 0 : msg.message) === null || _p === void 0 ? void 0 : _p.interactiveMessage) === null || _q === void 0 ? void 0 : _q.nativeFlowMessage) === null || _r === void 0 ? void 0 : _r.buttons;
            if (buttons && buttons.length > 0) {
                buttonsData = buttons.map(function (btn) {
                    var params = JSON.parse(btn.buttonParamsJson || "{}");
                    return {
                        name: btn.name,
                        displayText: params.display_text || "",
                        id: params.id || "",
                        url: params.url || "",
                        phoneNumber: params.phone_number || ""
                    };
                });
            }
            var carouselMsg = (_t = (_s = msg === null || msg === void 0 ? void 0 : msg.message) === null || _s === void 0 ? void 0 : _s.interactiveMessage) === null || _t === void 0 ? void 0 : _t.carouselMessage;
            if (carouselMsg && carouselMsg.cards) {
                carouselData = carouselMsg.cards.map(function (card) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    return ({
                        title: ((_a = card.header) === null || _a === void 0 ? void 0 : _a.title) || ((_c = (_b = card.header) === null || _b === void 0 ? void 0 : _b.imageMessage) === null || _c === void 0 ? void 0 : _c.caption) || "",
                        description: ((_d = card.body) === null || _d === void 0 ? void 0 : _d.text) || "",
                        price: ((_e = card.footer) === null || _e === void 0 ? void 0 : _e.text) || "",
                        image: ((_g = (_f = card.header) === null || _f === void 0 ? void 0 : _f.imageMessage) === null || _g === void 0 ? void 0 : _g.url) || "",
                        buttons: ((_j = (_h = card.nativeFlowMessage) === null || _h === void 0 ? void 0 : _h.buttons) === null || _j === void 0 ? void 0 : _j.map(function (btn) {
                            var params = JSON.parse(btn.buttonParamsJson || "{}");
                            return {
                                name: btn.name,
                                displayText: params.display_text || "",
                                id: params.id || "",
                                url: params.url || ""
                            };
                        })) || []
                    });
                });
            }
        }
        return { buttonsData: buttonsData, carouselData: carouselData };
    }
    catch (error) {
        logger_1["default"].error("Erro ao extrair dados de bot\u00F5es/carrossel: ".concat(error));
        return { buttonsData: null, carouselData: null };
    }
};
var verifyMessage = function (msg, ticket, contact, ticketTraking, isPrivate, isForwarded, isMessageImported, fromAgent, userId) {
    if (isForwarded === void 0) { isForwarded = false; }
    if (isMessageImported === void 0) { isMessageImported = false; }
    if (fromAgent === void 0) { fromAgent = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var io, quotedMsg, body, companyId, processed, messageUserId, _a, buttonsData, carouselData, messageData, newMessage;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    io = (0, socket_1.getIO)();
                    return [4 /*yield*/, verifyQuotedMessage(msg)];
                case 1:
                    quotedMsg = _d.sent();
                    body = (0, exports.getBodyMessage)(msg);
                    companyId = ticket.companyId;
                    if (!(msg.key.fromMe && body)) return [3 /*break*/, 3];
                    return [4 /*yield*/, processQuickMessageCommand(body, ticket, contact)];
                case 2:
                    processed = _d.sent();
                    if (processed) {
                        // Se processou a resposta rápida, não salva a mensagem original #{ "resp": "X" }
                        logger_1["default"].info("[verifyMessage] Comando resp processado, mensagem original n\u00E3o ser\u00E1 salva");
                        return [2 /*return*/];
                    }
                    _d.label = 3;
                case 3:
                    messageUserId = userId || (msg.key.fromMe && !fromAgent ? ticket.userId : undefined);
                    _a = getButtonsAndCarouselData(msg), buttonsData = _a.buttonsData, carouselData = _a.carouselData;
                    messageData = {
                        wid: msg.key.id,
                        ticketId: ticket.id,
                        contactId: msg.key.fromMe ? undefined : contact.id,
                        body: body || "",
                        fromMe: msg.key.fromMe,
                        mediaType: getTypeMessage(msg),
                        read: msg.key.fromMe,
                        quotedMsgId: quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id,
                        ack: Number(String(msg.status).replace("PENDING", "2").replace("NaN", "1")) ||
                            2,
                        remoteJid: (_b = msg.key.remoteJidAlt) !== null && _b !== void 0 ? _b : msg.key.remoteJid,
                        participant: (_c = msg.key.participantAlt) !== null && _c !== void 0 ? _c : msg.key.participant,
                        dataJson: JSON.stringify(msg),
                        ticketTrakingId: ticketTraking === null || ticketTraking === void 0 ? void 0 : ticketTraking.id,
                        isPrivate: isPrivate,
                        createdAt: new Date(Math.floor(getTimestampMessage(msg.messageTimestamp) * 1000)).toISOString(),
                        ticketImported: isMessageImported,
                        isForwarded: isForwarded,
                        fromAgent: fromAgent,
                        userId: messageUserId,
                        buttonsData: buttonsData,
                        carouselData: carouselData
                    };
                    return [4 /*yield*/, ticket.update({
                            lastMessage: body
                        })];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: companyId })];
                case 5:
                    newMessage = _d.sent();
                    // **NOVO: Emitir socket para atualizar o frontend em tempo real**
                    io.of(String(companyId))
                        .emit("company-".concat(companyId, "-appMessage"), {
                        action: "create",
                        message: newMessage,
                        ticket: ticket,
                        contact: contact
                    });
                    if (!(!msg.key.fromMe && ticket.status === "closed")) return [3 /*break*/, 8];
                    console.log("===== CHANGE =====");
                    return [4 /*yield*/, ticket.update({ status: "pending" })];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, ticket.reload({
                            include: [
                                { model: Queue_1["default"], as: "queue" },
                                { model: User_1["default"], as: "user" },
                                { model: Contact_1["default"], as: "contact" },
                                { model: Whatsapp_1["default"], as: "whatsapp" }
                            ]
                        })];
                case 7:
                    _d.sent();
                    // io.to("closed").emit(`company-${companyId}-ticket`, {
                    //   action: "delete",
                    //   ticket,
                    //   ticketId: ticket.id
                    // });
                    if (!ticket.imported) {
                        io.of(String(companyId))
                            // .to(ticket.status)
                            // .to(ticket.id.toString())
                            .emit("company-".concat(companyId, "-ticket"), {
                            action: "update",
                            ticket: ticket,
                            ticketId: ticket.id
                        });
                    }
                    _d.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.verifyMessage = verifyMessage;
var isValidMsg = function (msg) {
    var _a;
    var keyAny = msg.key;
    var remoteJid = (_a = keyAny.remoteJidAlt) !== null && _a !== void 0 ? _a : msg.key.remoteJid;
    if (remoteJid === "status@broadcast")
        return false;
    try {
        var msgType = getTypeMessage(msg);
        if (!msgType) {
            return;
        }
        var ifType = msgType === "conversation" ||
            msgType === "extendedTextMessage" ||
            msgType === "audioMessage" ||
            msgType === "videoMessage" ||
            msgType === "ptvMessage" ||
            msgType === "imageMessage" ||
            msgType === "documentMessage" ||
            msgType === "stickerMessage" ||
            msgType === "buttonsResponseMessage" ||
            msgType === "buttonsMessage" ||
            msgType === "templateButtonReplyMessage" ||
            msgType === "messageContextInfo" ||
            msgType === "locationMessage" ||
            msgType === "liveLocationMessage" ||
            msgType === "contactMessage" ||
            msgType === "voiceMessage" ||
            msgType === "mediaMessage" ||
            msgType === "contactsArrayMessage" ||
            msgType === "reactionMessage" ||
            msgType === "ephemeralMessage" ||
            msgType === "protocolMessage" ||
            msgType === "listResponseMessage" ||
            msgType === "listMessage" ||
            msgType === "interactiveMessage" ||
            msgType === "interactiveResponseMessage" ||
            msgType === "pollCreationMessageV3" ||
            msgType === "viewOnceMessage" ||
            msgType === "documentWithCaptionMessage" ||
            msgType === "viewOnceMessageV2" ||
            msgType === "editedMessage" ||
            msgType === "advertisingMessage" ||
            msgType === "highlyStructuredMessage" ||
            msgType === "eventMessage" ||
            msgType === "adMetaPreview"; // Adicionado para tratar mensagens de anúncios
        if (!ifType) {
            logger_1["default"].warn("#### Nao achou o type em isValidMsg: ".concat(msgType, "\n").concat(JSON.stringify(msg === null || msg === void 0 ? void 0 : msg.message)));
            Sentry.setExtra("Mensagem", { BodyMsg: msg.message, msg: msg, msgType: msgType });
            Sentry.captureException(new Error("Novo Tipo de Mensagem em isValidMsg"));
        }
        return !!ifType;
    }
    catch (error) {
        Sentry.setExtra("Error isValidMsg", { msg: msg });
        Sentry.captureException(error);
    }
};
exports.isValidMsg = isValidMsg;
var sendDialogflowAwswer = function (wbot, ticket, msg, contact, inputAudio, companyId, queueIntegration) { return __awaiter(void 0, void 0, void 0, function () {
    var session, dialogFlowReply, bodyDuvida, sentMessage, image, react, audio, lastMessage, _i, _a, message, _b, _c, message;
    var _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0: return [4 /*yield*/, (0, CreateSessionDialogflow_1.createDialogflowSessionWithModel)(queueIntegration)];
            case 1:
                session = _j.sent();
                if (session === undefined) {
                    return [2 /*return*/];
                }
                wbot.presenceSubscribe(contact.remoteJid);
                return [4 /*yield*/, (0, baileys_1.delay)(500)];
            case 2:
                _j.sent();
                return [4 /*yield*/, (0, QueryDialogflow_1.queryDialogFlow)(session, queueIntegration.projectName, contact.remoteJid, (0, exports.getBodyMessage)(msg), queueIntegration.language, inputAudio)];
            case 3:
                dialogFlowReply = _j.sent();
                if (!!dialogFlowReply) return [3 /*break*/, 8];
                wbot.sendPresenceUpdate("composing", contact.remoteJid);
                bodyDuvida = (0, Mustache_1["default"])("\u200E *".concat(queueIntegration === null || queueIntegration === void 0 ? void 0 : queueIntegration.name, ":* N\u00E3o consegui entender sua d\u00FAvida."));
                return [4 /*yield*/, (0, baileys_1.delay)(1000)];
            case 4:
                _j.sent();
                return [4 /*yield*/, wbot.sendPresenceUpdate("paused", contact.remoteJid)];
            case 5:
                _j.sent();
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@c.us"), {
                        text: bodyDuvida
                    })];
            case 6:
                sentMessage = _j.sent();
                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact)];
            case 7:
                _j.sent();
                return [2 /*return*/];
            case 8:
                if (!dialogFlowReply.endConversation) return [3 /*break*/, 10];
                return [4 /*yield*/, ticket.update({
                        contactId: ticket.contact.id,
                        useIntegration: false
                    })];
            case 9:
                _j.sent();
                _j.label = 10;
            case 10:
                image = (_e = (_d = dialogFlowReply.parameters.image) === null || _d === void 0 ? void 0 : _d.stringValue) !== null && _e !== void 0 ? _e : undefined;
                react = (_g = (_f = dialogFlowReply.parameters.react) === null || _f === void 0 ? void 0 : _f.stringValue) !== null && _g !== void 0 ? _g : undefined;
                audio = (_h = dialogFlowReply.encodedAudio.toString("base64")) !== null && _h !== void 0 ? _h : undefined;
                wbot.sendPresenceUpdate("composing", contact.remoteJid);
                return [4 /*yield*/, (0, baileys_1.delay)(500)];
            case 11:
                _j.sent();
                for (_i = 0, _a = dialogFlowReply.responses; _i < _a.length; _i++) {
                    message = _a[_i];
                    lastMessage = message.text.text[0] ? message.text.text[0] : lastMessage;
                }
                _b = 0, _c = dialogFlowReply.responses;
                _j.label = 12;
            case 12:
                if (!(_b < _c.length)) return [3 /*break*/, 15];
                message = _c[_b];
                if (!message.text) return [3 /*break*/, 14];
                return [4 /*yield*/, sendDelayedMessages(wbot, ticket, contact, message.text.text[0], lastMessage, audio, queueIntegration)];
            case 13:
                _j.sent();
                _j.label = 14;
            case 14:
                _b++;
                return [3 /*break*/, 12];
            case 15: return [2 /*return*/];
        }
    });
}); };
function sendDelayedMessages(wbot, ticket, contact, message, lastMessage, audio, queueIntegration) {
    return __awaiter(this, void 0, void 0, function () {
        var companyId, whatsapp, farewellMessage, sentMessage;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    companyId = ticket.companyId;
                    return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(wbot.id, companyId)];
                case 1:
                    whatsapp = _a.sent();
                    farewellMessage = whatsapp.farewellMessage.replace(/[_*]/g, "");
                    return [4 /*yield*/, wbot.sendMessage(contact.remoteJid, {
                            text: "\u200E *".concat(queueIntegration === null || queueIntegration === void 0 ? void 0 : queueIntegration.name, ":* ") + message
                        })];
                case 2:
                    sentMessage = _a.sent();
                    return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact)];
                case 3:
                    _a.sent();
                    if (!(message != lastMessage)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, baileys_1.delay)(500)];
                case 4:
                    _a.sent();
                    wbot.sendPresenceUpdate("composing", contact.remoteJid);
                    return [3 /*break*/, 8];
                case 5:
                    if (!audio) return [3 /*break*/, 8];
                    wbot.sendPresenceUpdate("recording", contact.remoteJid);
                    return [4 /*yield*/, (0, baileys_1.delay)(500)];
                case 6:
                    _a.sent();
                    if (!(farewellMessage && message.includes(farewellMessage))) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, baileys_1.delay)(1000)];
                case 7:
                    _a.sent();
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ticket.update({
                                        contactId: ticket.contact.id,
                                        useIntegration: true
                                    })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketId: ticket.id,
                                            ticketData: { status: "closed" },
                                            companyId: companyId
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 3000);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
var verifyQueue = function (wbot, msg, ticket, contact, settings, ticketTraking) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, queues, greetingMessage, maxUseBotQueues, timeUseBotQueues, chatbot, enableQueuePosition, hasWhatsappSchedules, isCurrentlyOutOfHour, schedCheck, sendGreetingMessageOneQueues, integrations, body, filePath, fileExists, messagePath, optionsMsg_1, debouncedSentgreetingMediaAttachment, publicFolder, files, folder, _i, _b, _c, index, file, mediaSrc, error_3, count, qtd, msgFila, bodyFila_1, debouncedSentMessagePosicao, selectedOption, ticketData, choosenQueue, typeBot, randomUserId, userQueue, error_4, botText, botList, botButton;
    var _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                companyId = ticket.companyId;
                console.log("verifyQueue");
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(wbot.id, companyId)];
            case 1:
                _a = _j.sent(), queues = _a.queues, greetingMessage = _a.greetingMessage, maxUseBotQueues = _a.maxUseBotQueues, timeUseBotQueues = _a.timeUseBotQueues;
                chatbot = false;
                if (queues.length === 1) {
                    console.log("log... 1186");
                    chatbot = ((_d = queues[0]) === null || _d === void 0 ? void 0 : _d.chatbots.length) > 1;
                }
                enableQueuePosition = settings.sendQueuePosition;
                hasWhatsappSchedules = Array.isArray(whatsapp.schedules) && whatsapp.schedules.length > 0;
                isCurrentlyOutOfHour = false;
                if (!(hasWhatsappSchedules && !msg.key.fromMe)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, 0, whatsapp.id)];
            case 2:
                schedCheck = _j.sent();
                isCurrentlyOutOfHour = !schedCheck || schedCheck.inActivity === false;
                _j.label = 3;
            case 3:
                if (!(queues.length === 1 && !chatbot && !whatsapp.flowIdWelcome && !isCurrentlyOutOfHour)) return [3 /*break*/, 30];
                sendGreetingMessageOneQueues = settings.sendGreetingMessageOneQueues;
                console.log("log... 1195");
                if (!(!msg.key.fromMe && !ticket.isGroup && queues[0].integrationId)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, ShowQueueIntegrationService_1["default"])(queues[0].integrationId, companyId)];
            case 4:
                integrations = _j.sent();
                console.log("log... 1206");
                return [4 /*yield*/, (0, exports.handleMessageIntegration)(msg, wbot, companyId, integrations, ticket, null, null, null, null)];
            case 5:
                _j.sent();
                if (!msg.key.fromMe) return [3 /*break*/, 7];
                console.log("log... 1211");
                return [4 /*yield*/, ticket.update({
                        typebotSessionTime: (0, moment_1["default"])().toDate(),
                        useIntegration: true,
                        integrationId: integrations.id
                    })];
            case 6:
                _j.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, ticket.update({
                    useIntegration: true,
                    integrationId: integrations.id
                })];
            case 8:
                _j.sent();
                _j.label = 9;
            case 9:
                if (!(greetingMessage.length > 1 && sendGreetingMessageOneQueues)) return [3 /*break*/, 16];
                console.log("log... 1226");
                body = (0, Mustache_1["default"])("".concat(greetingMessage), ticket);
                if (!(ticket.whatsapp.greetingMediaAttachment !== null)) return [3 /*break*/, 14];
                filePath = path_1["default"].resolve("public", "company".concat(companyId), ticket.whatsapp.greetingMediaAttachment);
                fileExists = fs_2["default"].existsSync(filePath);
                if (!fileExists) return [3 /*break*/, 11];
                console.log("log... 1235");
                messagePath = ticket.whatsapp.greetingMediaAttachment;
                return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(messagePath, filePath, String(companyId), body)];
            case 10:
                optionsMsg_1 = _j.sent();
                debouncedSentgreetingMediaAttachment = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var sentMessage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), __assign({}, optionsMsg_1))];
                            case 1:
                                sentMessage = _a.sent();
                                return [4 /*yield*/, (0, exports.verifyMediaMessage)(sentMessage, ticket, contact, ticketTraking, false, false, wbot)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000, ticket.id);
                debouncedSentgreetingMediaAttachment();
                return [3 /*break*/, 13];
            case 11:
                console.log("log... 1250");
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                        text: body
                    })];
            case 12:
                _j.sent();
                _j.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14:
                console.log("log... 1259");
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                        text: body
                    })];
            case 15:
                _j.sent();
                _j.label = 16;
            case 16:
                if (!!(0, lodash_1.isNil)(queues[0].fileListId)) return [3 /*break*/, 24];
                console.log("log... 1278");
                _j.label = 17;
            case 17:
                _j.trys.push([17, 23, , 24]);
                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                return [4 /*yield*/, (0, ShowService_1["default"])(queues[0].fileListId, ticket.companyId)];
            case 18:
                files = _j.sent();
                folder = path_1["default"].resolve(publicFolder, "company".concat(ticket.companyId), "fileList", String(files.id));
                _i = 0, _b = files.options.entries();
                _j.label = 19;
            case 19:
                if (!(_i < _b.length)) return [3 /*break*/, 22];
                _c = _b[_i], index = _c[0], file = _c[1];
                mediaSrc = {
                    fieldname: "medias",
                    originalname: file.path,
                    encoding: "7bit",
                    mimetype: file.mediaType,
                    filename: file.path,
                    path: path_1["default"].resolve(folder, file.path)
                };
                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({
                        media: mediaSrc,
                        ticket: ticket,
                        body: file.name,
                        isPrivate: false,
                        isForwarded: false
                    })];
            case 20:
                _j.sent();
                _j.label = 21;
            case 21:
                _i++;
                return [3 /*break*/, 19];
            case 22: return [3 /*break*/, 24];
            case 23:
                error_3 = _j.sent();
                logger_1["default"].info(error_3);
                return [3 /*break*/, 24];
            case 24:
                if (!queues[0].closeTicket) return [3 /*break*/, 26];
                console.log("log... 1297");
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: {
                            status: "closed",
                            queueId: queues[0].id
                            // sendFarewellMessage: false
                        },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 25:
                _j.sent();
                return [2 /*return*/];
            case 26:
                console.log("log... 1310");
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: {
                            queueId: queues[0].id,
                            status: ticket.status === "lgpd" ? "pending" : ticket.status
                        },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 27:
                _j.sent();
                _j.label = 28;
            case 28: return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                    where: {
                        userId: null,
                        status: "pending",
                        companyId: companyId,
                        queueId: queues[0].id,
                        isGroup: false
                    }
                })];
            case 29:
                count = _j.sent();
                if (enableQueuePosition) {
                    console.log("log... 1329");
                    qtd = count.count === 0 ? 1 : count.count;
                    msgFila = "".concat(settings.sendQueuePositionMessage, " *").concat(qtd, "*");
                    bodyFila_1 = (0, Mustache_1["default"])("".concat(msgFila), ticket);
                    debouncedSentMessagePosicao = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                        text: bodyFila_1
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 3000, ticket.id);
                    debouncedSentMessagePosicao();
                }
                return [2 /*return*/];
            case 30:
                // REGRA PARA DESABILITAR O BOT PARA ALGUM CONTATO
                if (contact.disableBot) {
                    return [2 /*return*/];
                }
                selectedOption = "";
                if (!(ticket.status !== "lgpd")) return [3 /*break*/, 31];
                console.log("log... 1367");
                selectedOption =
                    ((_f = (_e = msg === null || msg === void 0 ? void 0 : msg.message) === null || _e === void 0 ? void 0 : _e.buttonsResponseMessage) === null || _f === void 0 ? void 0 : _f.selectedButtonId) ||
                        ((_h = (_g = msg === null || msg === void 0 ? void 0 : msg.message) === null || _g === void 0 ? void 0 : _g.listResponseMessage) === null || _h === void 0 ? void 0 : _h.singleSelectReply.selectedRowId) ||
                        (0, exports.getBodyMessage)(msg);
                return [3 /*break*/, 35];
            case 31:
                if (!!(0, lodash_1.isNil)(ticket.lgpdAcceptedAt)) return [3 /*break*/, 33];
                return [4 /*yield*/, ticket.update({
                        status: "pending"
                    })];
            case 32:
                _j.sent();
                _j.label = 33;
            case 33: return [4 /*yield*/, ticket.reload()];
            case 34:
                _j.sent();
                _j.label = 35;
            case 35:
                if (!(String(selectedOption).toLocaleLowerCase() == "sair")) return [3 /*break*/, 37];
                // Encerra atendimento
                console.log("log... 1384");
                ticketData = {
                    isBot: false,
                    status: "closed",
                    sendFarewellMessage: true,
                    maxUseBotQueues: 0
                };
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({ ticketData: ticketData, ticketId: ticket.id, companyId: companyId })];
            case 36:
                _j.sent();
                // await ticket.update({ queueOptionId: null, chatbot: false, queueId: null, userId: null, status: "closed"});
                //await verifyQueue(wbot, msg, ticket, ticket.contact);
                // const complationMessage = ticket.whatsapp?.complationMessage;
                // console.log(complationMessage)
                // const textMessage = {
                //   text: formatBody(`\u200e${complationMessage}`, ticket),
                // };
                // if (!isNil(complationMessage)) {
                //   const sendMsg = await wbot.sendMessage(
                //     `${ticket?.contact?.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
                //     textMessage
                //   );
                //   await verifyMessage(sendMsg, ticket, ticket.contact);
                // }
                return [2 /*return*/];
            case 37:
                choosenQueue = chatbot && queues.length === 1
                    ? queues[+selectedOption]
                    : queues[+selectedOption - 1];
                console.log("log... 1419");
                typeBot = (settings === null || settings === void 0 ? void 0 : settings.chatBotType) || "text";
                if (!choosenQueue) return [3 /*break*/, 41];
                console.log("log... 1427");
                _j.label = 38;
            case 38:
                _j.trys.push([38, 40, , 41]);
                return [4 /*yield*/, (0, ListUserQueueServices_1["default"])(choosenQueue.id)];
            case 39:
                userQueue = _j.sent();
                if (userQueue.userId > -1) {
                    randomUserId = userQueue.userId;
                }
                return [3 /*break*/, 41];
            case 40:
                error_4 = _j.sent();
                console.error(error_4);
                return [3 /*break*/, 41];
            case 41:
                botText = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var queue, currentSchedule, dataLimite, Agora, outOfHoursMessage, body_2, debouncedSentMessage, options_1, body, sentMessage, body, sentMessage, publicFolder, files, folder, _i, _a, _b, index, file, mediaSrc, sentMessage, error_5, error_6, count, qtd, msgFila, bodyFila_2, debouncedSentMessagePosicao, dataLimite, Agora, options_2, body_3, filePath, fileExists, messagePath, optionsMsg_2, debouncedSentgreetingMediaAttachment, debouncedSentMessage, debouncedSentMessage;
                    var _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                console.log("log... 1449");
                                if (!(choosenQueue || (queues.length === 1 && chatbot))) return [3 /*break*/, 36];
                                console.log("log... 1452");
                                // console.log("entrou no choose", ticket.isOutOfHour, ticketTraking.chatbotAt)
                                if (queues.length === 1)
                                    choosenQueue = queues[0];
                                return [4 /*yield*/, Queue_1["default"].findByPk(choosenQueue.id)];
                            case 1:
                                queue = _d.sent();
                                console.log("log... 1457");
                                if (!(ticket.isOutOfHour === false && ticketTraking.chatbotAt !== null)) return [3 /*break*/, 4];
                                console.log("log... 1460");
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, ticket.update({
                                        amountUsedBotQueues: 0
                                    })];
                            case 3:
                                _d.sent();
                                _d.label = 4;
                            case 4:
                                currentSchedule = void 0;
                                if (!((settings === null || settings === void 0 ? void 0 : settings.scheduleType) === "queue")) return [3 /*break*/, 6];
                                console.log("log... 1472");
                                return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, queue.id, 0)];
                            case 5:
                                currentSchedule = _d.sent();
                                _d.label = 6;
                            case 6:
                                if (!((settings === null || settings === void 0 ? void 0 : settings.scheduleType) === "queue" &&
                                    ticket.status !== "open" &&
                                    !(0, lodash_1.isNil)(currentSchedule) &&
                                    (ticket.amountUsedBotQueues < maxUseBotQueues ||
                                        maxUseBotQueues === 0) &&
                                    (!currentSchedule || currentSchedule.inActivity === false) &&
                                    (!ticket.isGroup || ((_c = ticket.whatsapp) === null || _c === void 0 ? void 0 : _c.groupAsTicket) === "enabled"))) return [3 /*break*/, 10];
                                if (!(timeUseBotQueues !== "0")) return [3 /*break*/, 8];
                                console.log("log... 1483");
                                dataLimite = new Date();
                                Agora = new Date();
                                if (ticketTraking.chatbotAt !== null) {
                                    console.log("log... 1491");
                                    dataLimite.setMinutes(ticketTraking.chatbotAt.getMinutes() + Number(timeUseBotQueues));
                                    if (ticketTraking.chatbotAt !== null &&
                                        Agora < dataLimite &&
                                        timeUseBotQueues !== "0" &&
                                        ticket.amountUsedBotQueues !== 0) {
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 7:
                                _d.sent();
                                _d.label = 8;
                            case 8:
                                outOfHoursMessage = queue.outOfHoursMessage;
                                if (outOfHoursMessage !== "") {
                                    body_2 = (0, Mustache_1["default"])("".concat(outOfHoursMessage), ticket);
                                    console.log("log... 1509");
                                    debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                        text: body_2
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 1000, ticket.id);
                                    debouncedSentMessage();
                                    //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                                    // await ticket.update({
                                    //   queueId: queue.id,
                                    //   isOutOfHour: true,
                                    //   amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                    // });
                                    // return;
                                }
                                //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                                return [4 /*yield*/, ticket.update({
                                        queueId: queue.id,
                                        isOutOfHour: true,
                                        amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                    })];
                            case 9:
                                //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                                _d.sent();
                                return [2 /*return*/];
                            case 10: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                    ticketData: {
                                        // amountUsedBotQueues: 0,
                                        queueId: choosenQueue.id
                                    },
                                    // ticketData: { queueId: queues.length ===1 ? null : choosenQueue.id },
                                    ticketId: ticket.id,
                                    companyId: companyId
                                })];
                            case 11:
                                _d.sent();
                                if (!(choosenQueue.chatbots.length > 0 && !ticket.isGroup)) return [3 /*break*/, 15];
                                console.log("log... 1554");
                                options_1 = "";
                                choosenQueue.chatbots.forEach(function (chatbot, index) {
                                    options_1 += "*[ ".concat(index + 1, " ]* - ").concat(chatbot.name, "\n");
                                });
                                body = (0, Mustache_1["default"])("\u200E ".concat(choosenQueue.greetingMessage, "\n\n").concat(options_1, "\n*[ # ]* Voltar para o menu principal\n*[ Sair ]* Encerrar atendimento"), ticket);
                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                        text: body
                                    })];
                            case 12:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact, ticketTraking)];
                            case 13:
                                _d.sent();
                                if (!(settings === null || settings === void 0 ? void 0 : settings.userRandom)) return [3 /*break*/, 15];
                                console.log("log... 1576");
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: { userId: randomUserId },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 14:
                                _d.sent();
                                _d.label = 15;
                            case 15:
                                if (!(!choosenQueue.chatbots.length &&
                                    choosenQueue.greetingMessage.length !== 0)) return [3 /*break*/, 18];
                                console.log("log... 1586");
                                console.log(choosenQueue.greetingMessage);
                                body = (0, Mustache_1["default"])("\u200E".concat(choosenQueue.greetingMessage), ticket);
                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                        text: body
                                    })];
                            case 16:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact, ticketTraking)];
                            case 17:
                                _d.sent();
                                _d.label = 18;
                            case 18:
                                if (!!(0, lodash_1.isNil)(choosenQueue.fileListId)) return [3 /*break*/, 27];
                                _d.label = 19;
                            case 19:
                                _d.trys.push([19, 26, , 27]);
                                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                                return [4 /*yield*/, (0, ShowService_1["default"])(choosenQueue.fileListId, ticket.companyId)];
                            case 20:
                                files = _d.sent();
                                folder = path_1["default"].resolve(publicFolder, "company".concat(ticket.companyId), "fileList", String(files.id));
                                _i = 0, _a = files.options.entries();
                                _d.label = 21;
                            case 21:
                                if (!(_i < _a.length)) return [3 /*break*/, 25];
                                _b = _a[_i], index = _b[0], file = _b[1];
                                mediaSrc = {
                                    fieldname: "medias",
                                    originalname: file.path,
                                    encoding: "7bit",
                                    mimetype: file.mediaType,
                                    filename: file.path,
                                    path: path_1["default"].resolve(folder, file.path)
                                };
                                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({
                                        media: mediaSrc,
                                        ticket: ticket,
                                        body: "\u200E ".concat(file.name),
                                        isPrivate: false,
                                        isForwarded: false
                                    })];
                            case 22:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMediaMessage)(sentMessage, ticket, ticket.contact, ticketTraking, false, false, wbot)];
                            case 23:
                                _d.sent();
                                _d.label = 24;
                            case 24:
                                _i++;
                                return [3 /*break*/, 21];
                            case 25: return [3 /*break*/, 27];
                            case 26:
                                error_5 = _d.sent();
                                logger_1["default"].info(error_5);
                                return [3 /*break*/, 27];
                            case 27: return [4 /*yield*/, (0, baileys_1.delay)(4000)];
                            case 28:
                                _d.sent();
                                if (!choosenQueue.closeTicket) return [3 /*break*/, 33];
                                _d.label = 29;
                            case 29:
                                _d.trys.push([29, 31, , 32]);
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {
                                            status: "closed",
                                            queueId: choosenQueue.id
                                            // sendFarewellMessage: false,
                                        },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 30:
                                _d.sent();
                                return [3 /*break*/, 32];
                            case 31:
                                error_6 = _d.sent();
                                logger_1["default"].info(error_6);
                                return [3 /*break*/, 32];
                            case 32: return [2 /*return*/];
                            case 33: return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                    where: {
                                        userId: null,
                                        status: "pending",
                                        companyId: companyId,
                                        queueId: choosenQueue.id,
                                        whatsappId: wbot.id,
                                        isGroup: false
                                    }
                                })];
                            case 34:
                                count = _d.sent();
                                console.log("======== choose queue ========");
                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                        ticketId: ticket.id,
                                        type: "queue",
                                        queueId: choosenQueue.id
                                    })];
                            case 35:
                                _d.sent();
                                if (enableQueuePosition && !choosenQueue.chatbots.length) {
                                    qtd = count.count === 0 ? 1 : count.count;
                                    msgFila = "".concat(settings.sendQueuePositionMessage, " *").concat(qtd, "*");
                                    bodyFila_2 = (0, Mustache_1["default"])("".concat(msgFila), ticket);
                                    debouncedSentMessagePosicao = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                        text: bodyFila_2
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 3000, ticket.id);
                                    debouncedSentMessagePosicao();
                                }
                                return [3 /*break*/, 48];
                            case 36:
                                if (ticket.isGroup)
                                    return [2 /*return*/];
                                if (maxUseBotQueues &&
                                    maxUseBotQueues !== 0 &&
                                    ticket.amountUsedBotQueues >= maxUseBotQueues) {
                                    // await UpdateTicketService({
                                    //   ticketData: { queueId: queues[0].id },
                                    //   ticketId: ticket.id
                                    // });
                                    return [2 /*return*/];
                                }
                                if (!(timeUseBotQueues !== "0")) return [3 /*break*/, 38];
                                dataLimite = new Date();
                                Agora = new Date();
                                console.log("log... 1749");
                                if (ticketTraking.chatbotAt !== null) {
                                    dataLimite.setMinutes(ticketTraking.chatbotAt.getMinutes() + Number(timeUseBotQueues));
                                    console.log("log... 1754");
                                    if (ticketTraking.chatbotAt !== null &&
                                        Agora < dataLimite &&
                                        timeUseBotQueues !== "0" &&
                                        ticket.amountUsedBotQueues !== 0) {
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 37:
                                _d.sent();
                                _d.label = 38;
                            case 38:
                                // if (wbot.waitForSocketOpen()) {
                                //   console.log("AGUARDANDO")
                                //   console.log(wbot.waitForSocketOpen())
                                // }
                                wbot.presenceSubscribe(contact.remoteJid);
                                options_2 = "";
                                wbot.sendPresenceUpdate("composing", contact.remoteJid);
                                console.log("============= queue menu =============");
                                queues.forEach(function (queue, index) {
                                    options_2 += "*[ ".concat(index + 1, " ]* - ").concat(queue.name, "\n");
                                });
                                options_2 += "\n*[ Sair ]* - Encerrar atendimento";
                                body_3 = (0, Mustache_1["default"])("\u200E".concat(greetingMessage, "\n\n").concat(options_2), ticket);
                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                        ticketId: ticket.id,
                                        type: "chatBot"
                                    })];
                            case 39:
                                _d.sent();
                                return [4 /*yield*/, (0, baileys_1.delay)(1000)];
                            case 40:
                                _d.sent();
                                return [4 /*yield*/, wbot.sendPresenceUpdate("paused", contact.remoteJid)];
                            case 41:
                                _d.sent();
                                if (!(ticket.whatsapp.greetingMediaAttachment !== null)) return [3 /*break*/, 46];
                                console.log("log... 1799");
                                filePath = path_1["default"].resolve("public", "company".concat(companyId), ticket.whatsapp.greetingMediaAttachment);
                                fileExists = fs_2["default"].existsSync(filePath);
                                if (!fileExists) return [3 /*break*/, 43];
                                messagePath = ticket.whatsapp.greetingMediaAttachment;
                                return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(messagePath, filePath, String(companyId), body_3)];
                            case 42:
                                optionsMsg_2 = _d.sent();
                                console.log("log... 1809");
                                debouncedSentgreetingMediaAttachment = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var sentMessage;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), __assign({}, optionsMsg_2))];
                                            case 1:
                                                sentMessage = _a.sent();
                                                return [4 /*yield*/, (0, exports.verifyMediaMessage)(sentMessage, ticket, contact, ticketTraking, false, false, wbot)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                debouncedSentgreetingMediaAttachment();
                                return [3 /*break*/, 44];
                            case 43:
                                console.log("log... 1824");
                                debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var sentMessage;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                    text: body_3
                                                })];
                                            case 1:
                                                sentMessage = _a.sent();
                                                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact, ticketTraking)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                debouncedSentMessage();
                                _d.label = 44;
                            case 44:
                                console.log("log... 1843");
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {
                                        // amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                        },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 45:
                                _d.sent();
                                return [2 /*return*/];
                            case 46:
                                console.log("log... 1854");
                                debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var sentMessage;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                    text: body_3
                                                })];
                                            case 1:
                                                sentMessage = _a.sent();
                                                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact, ticketTraking)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {},
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 47:
                                _d.sent();
                                debouncedSentMessage();
                                _d.label = 48;
                            case 48: return [2 /*return*/];
                        }
                    });
                }); };
                botList = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var queue, currentSchedule, dataLimite, Agora, outOfHoursMessage, body_4, debouncedSentMessage, sectionsRows_1, sections, listMessage, sendMsg, body, sentMessage, publicFolder, files, folder, _i, _a, _b, index, file, mediaSrc, sentMessage, error_7, error_8, count, qtd, msgFila, bodyFila_3, debouncedSentMessagePosicao, dataLimite, Agora, options, sectionsRows_2, body, filePath, fileExists, messagePath, optionsMsg_3, debouncedSentgreetingMediaAttachment, debouncedSentMessage, debouncedSentMessage;
                    var _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                console.log("log... 1449");
                                if (!(choosenQueue || (queues.length === 1 && chatbot))) return [3 /*break*/, 36];
                                console.log("log... 1452");
                                // console.log("entrou no choose", ticket.isOutOfHour, ticketTraking.chatbotAt)
                                if (queues.length === 1)
                                    choosenQueue = queues[0];
                                return [4 /*yield*/, Queue_1["default"].findByPk(choosenQueue.id)];
                            case 1:
                                queue = _d.sent();
                                console.log("log... 1457");
                                if (!(ticket.isOutOfHour === false && ticketTraking.chatbotAt !== null)) return [3 /*break*/, 4];
                                console.log("log... 1460");
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, ticket.update({
                                        amountUsedBotQueues: 0
                                    })];
                            case 3:
                                _d.sent();
                                _d.label = 4;
                            case 4:
                                currentSchedule = void 0;
                                if (!((settings === null || settings === void 0 ? void 0 : settings.scheduleType) === "queue")) return [3 /*break*/, 6];
                                console.log("log... 1472");
                                return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, queue.id, 0)];
                            case 5:
                                currentSchedule = _d.sent();
                                _d.label = 6;
                            case 6:
                                if (!((settings === null || settings === void 0 ? void 0 : settings.scheduleType) === "queue" &&
                                    ticket.status !== "open" &&
                                    !(0, lodash_1.isNil)(currentSchedule) &&
                                    (ticket.amountUsedBotQueues < maxUseBotQueues ||
                                        maxUseBotQueues === 0) &&
                                    (!currentSchedule || currentSchedule.inActivity === false) &&
                                    (!ticket.isGroup || ((_c = ticket.whatsapp) === null || _c === void 0 ? void 0 : _c.groupAsTicket) === "enabled"))) return [3 /*break*/, 10];
                                if (!(timeUseBotQueues !== "0")) return [3 /*break*/, 8];
                                console.log("log... 1483");
                                dataLimite = new Date();
                                Agora = new Date();
                                if (ticketTraking.chatbotAt !== null) {
                                    console.log("log... 1491");
                                    dataLimite.setMinutes(ticketTraking.chatbotAt.getMinutes() + Number(timeUseBotQueues));
                                    if (ticketTraking.chatbotAt !== null &&
                                        Agora < dataLimite &&
                                        timeUseBotQueues !== "0" &&
                                        ticket.amountUsedBotQueues !== 0) {
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 7:
                                _d.sent();
                                _d.label = 8;
                            case 8:
                                outOfHoursMessage = queue.outOfHoursMessage;
                                if (outOfHoursMessage !== "") {
                                    body_4 = (0, Mustache_1["default"])("".concat(outOfHoursMessage), ticket);
                                    console.log("log... 1509");
                                    debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                        text: body_4
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 1000, ticket.id);
                                    debouncedSentMessage();
                                    //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                                    // await ticket.update({
                                    //   queueId: queue.id,
                                    //   isOutOfHour: true,
                                    //   amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                    // });
                                    // return;
                                }
                                //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                                return [4 /*yield*/, ticket.update({
                                        queueId: queue.id,
                                        isOutOfHour: true,
                                        amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                    })];
                            case 9:
                                //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                                _d.sent();
                                return [2 /*return*/];
                            case 10: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                    ticketData: {
                                        // amountUsedBotQueues: 0,
                                        queueId: choosenQueue.id
                                    },
                                    // ticketData: { queueId: queues.length ===1 ? null : choosenQueue.id },
                                    ticketId: ticket.id,
                                    companyId: companyId
                                })];
                            case 11:
                                _d.sent();
                                if (!(choosenQueue.chatbots.length > 0 && !ticket.isGroup)) return [3 /*break*/, 15];
                                console.log("log... 1554");
                                sectionsRows_1 = [];
                                choosenQueue.chatbots.forEach(function (chatbot, index) {
                                    sectionsRows_1.push({
                                        title: chatbot.name,
                                        rowId: "".concat(index + 1)
                                    });
                                });
                                sectionsRows_1.push({
                                    title: "Voltar Menu Inicial",
                                    rowId: "#"
                                });
                                sections = [
                                    {
                                        title: "Lista de Botões",
                                        rows: sectionsRows_1
                                    }
                                ];
                                listMessage = {
                                    text: (0, Mustache_1["default"])("\u200E".concat(queue.greetingMessage, "\n")),
                                    title: "Lista\n",
                                    buttonText: "Clique aqui",
                                    //footer: ".",
                                    //listType: 2,
                                    sections: sections
                                };
                                return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), listMessage)];
                            case 12:
                                sendMsg = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMessage)(sendMsg, ticket, contact, ticketTraking)];
                            case 13:
                                _d.sent();
                                if (!(settings === null || settings === void 0 ? void 0 : settings.userRandom)) return [3 /*break*/, 15];
                                console.log("log... 1576");
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: { userId: randomUserId },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 14:
                                _d.sent();
                                _d.label = 15;
                            case 15:
                                if (!(!choosenQueue.chatbots.length &&
                                    choosenQueue.greetingMessage.length !== 0)) return [3 /*break*/, 18];
                                console.log("log... 1586");
                                console.log(choosenQueue.greetingMessage);
                                body = (0, Mustache_1["default"])("\u200E".concat(choosenQueue.greetingMessage), ticket);
                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                        text: body
                                    })];
                            case 16:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact, ticketTraking)];
                            case 17:
                                _d.sent();
                                _d.label = 18;
                            case 18:
                                if (!!(0, lodash_1.isNil)(choosenQueue.fileListId)) return [3 /*break*/, 27];
                                _d.label = 19;
                            case 19:
                                _d.trys.push([19, 26, , 27]);
                                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                                return [4 /*yield*/, (0, ShowService_1["default"])(choosenQueue.fileListId, ticket.companyId)];
                            case 20:
                                files = _d.sent();
                                folder = path_1["default"].resolve(publicFolder, "company".concat(ticket.companyId), "fileList", String(files.id));
                                _i = 0, _a = files.options.entries();
                                _d.label = 21;
                            case 21:
                                if (!(_i < _a.length)) return [3 /*break*/, 25];
                                _b = _a[_i], index = _b[0], file = _b[1];
                                mediaSrc = {
                                    fieldname: "medias",
                                    originalname: file.path,
                                    encoding: "7bit",
                                    mimetype: file.mediaType,
                                    filename: file.path,
                                    path: path_1["default"].resolve(folder, file.path)
                                };
                                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({
                                        media: mediaSrc,
                                        ticket: ticket,
                                        body: "\u200E ".concat(file.name),
                                        isPrivate: false,
                                        isForwarded: false
                                    })];
                            case 22:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMediaMessage)(sentMessage, ticket, ticket.contact, ticketTraking, false, false, wbot)];
                            case 23:
                                _d.sent();
                                _d.label = 24;
                            case 24:
                                _i++;
                                return [3 /*break*/, 21];
                            case 25: return [3 /*break*/, 27];
                            case 26:
                                error_7 = _d.sent();
                                logger_1["default"].info(error_7);
                                return [3 /*break*/, 27];
                            case 27: return [4 /*yield*/, (0, baileys_1.delay)(4000)];
                            case 28:
                                _d.sent();
                                if (!choosenQueue.closeTicket) return [3 /*break*/, 33];
                                _d.label = 29;
                            case 29:
                                _d.trys.push([29, 31, , 32]);
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {
                                            status: "closed",
                                            queueId: choosenQueue.id
                                            // sendFarewellMessage: false,
                                        },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 30:
                                _d.sent();
                                return [3 /*break*/, 32];
                            case 31:
                                error_8 = _d.sent();
                                logger_1["default"].info(error_8);
                                return [3 /*break*/, 32];
                            case 32: return [2 /*return*/];
                            case 33: return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                    where: {
                                        userId: null,
                                        status: "pending",
                                        companyId: companyId,
                                        queueId: choosenQueue.id,
                                        whatsappId: wbot.id,
                                        isGroup: false
                                    }
                                })];
                            case 34:
                                count = _d.sent();
                                console.log("======== choose queue ========");
                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                        ticketId: ticket.id,
                                        type: "queue",
                                        queueId: choosenQueue.id
                                    })];
                            case 35:
                                _d.sent();
                                if (enableQueuePosition && !choosenQueue.chatbots.length) {
                                    qtd = count.count === 0 ? 1 : count.count;
                                    msgFila = "".concat(settings.sendQueuePositionMessage, " *").concat(qtd, "*");
                                    bodyFila_3 = (0, Mustache_1["default"])("".concat(msgFila), ticket);
                                    debouncedSentMessagePosicao = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                        text: bodyFila_3
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 3000, ticket.id);
                                    debouncedSentMessagePosicao();
                                }
                                return [3 /*break*/, 48];
                            case 36:
                                if (ticket.isGroup)
                                    return [2 /*return*/];
                                if (maxUseBotQueues &&
                                    maxUseBotQueues !== 0 &&
                                    ticket.amountUsedBotQueues >= maxUseBotQueues) {
                                    // await UpdateTicketService({
                                    //   ticketData: { queueId: queues[0].id },
                                    //   ticketId: ticket.id
                                    // });
                                    return [2 /*return*/];
                                }
                                if (!(timeUseBotQueues !== "0")) return [3 /*break*/, 38];
                                dataLimite = new Date();
                                Agora = new Date();
                                console.log("log... 1749");
                                if (ticketTraking.chatbotAt !== null) {
                                    dataLimite.setMinutes(ticketTraking.chatbotAt.getMinutes() + Number(timeUseBotQueues));
                                    console.log("log... 1754");
                                    if (ticketTraking.chatbotAt !== null &&
                                        Agora < dataLimite &&
                                        timeUseBotQueues !== "0" &&
                                        ticket.amountUsedBotQueues !== 0) {
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 37:
                                _d.sent();
                                _d.label = 38;
                            case 38:
                                // if (wbot.waitForSocketOpen()) {
                                //   console.log("AGUARDANDO")
                                //   console.log(wbot.waitForSocketOpen())
                                // }
                                wbot.presenceSubscribe(contact.remoteJid);
                                options = "";
                                wbot.sendPresenceUpdate("composing", contact.remoteJid);
                                console.log("============= queue menu =============");
                                sectionsRows_2 = [];
                                queues.forEach(function (queue, index) {
                                    sectionsRows_2.push({
                                        title: "".concat(queue.name),
                                        description: "_",
                                        rowId: "".concat(index + 1)
                                    });
                                });
                                sectionsRows_2.push({
                                    title: "Voltar Menu Inicial",
                                    rowId: "#"
                                });
                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                        ticketId: ticket.id,
                                        type: "chatBot"
                                    })];
                            case 39:
                                _d.sent();
                                return [4 /*yield*/, (0, baileys_1.delay)(1000)];
                            case 40:
                                _d.sent();
                                body = (0, Mustache_1["default"])("\u200E".concat(greetingMessage, "\n\n").concat(options), ticket);
                                return [4 /*yield*/, wbot.sendPresenceUpdate("paused", contact.remoteJid)];
                            case 41:
                                _d.sent();
                                if (!(ticket.whatsapp.greetingMediaAttachment !== null)) return [3 /*break*/, 46];
                                console.log("log... 1799");
                                filePath = path_1["default"].resolve("public", "company".concat(companyId), ticket.whatsapp.greetingMediaAttachment);
                                fileExists = fs_2["default"].existsSync(filePath);
                                if (!fileExists) return [3 /*break*/, 43];
                                messagePath = ticket.whatsapp.greetingMediaAttachment;
                                return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(messagePath, filePath, String(companyId), body)];
                            case 42:
                                optionsMsg_3 = _d.sent();
                                console.log("log... 1809");
                                debouncedSentgreetingMediaAttachment = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var sentMessage;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), __assign({}, optionsMsg_3))];
                                            case 1:
                                                sentMessage = _a.sent();
                                                return [4 /*yield*/, (0, exports.verifyMediaMessage)(sentMessage, ticket, contact, ticketTraking, false, false, wbot)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                debouncedSentgreetingMediaAttachment();
                                return [3 /*break*/, 44];
                            case 43:
                                console.log("log... 1824");
                                debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var sections, listMessage, sendMsg;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                sections = [
                                                    {
                                                        title: "Lista de Botões",
                                                        rows: sectionsRows_2
                                                    }
                                                ];
                                                listMessage = {
                                                    title: "Lista\n",
                                                    text: (0, Mustache_1["default"])("\u200E".concat(greetingMessage, "\n")),
                                                    buttonText: "Clique aqui",
                                                    //footer: "_",
                                                    sections: sections
                                                };
                                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), listMessage)];
                                            case 1:
                                                sendMsg = _a.sent();
                                                return [4 /*yield*/, (0, exports.verifyMessage)(sendMsg, ticket, contact, ticketTraking)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                debouncedSentMessage();
                                _d.label = 44;
                            case 44:
                                console.log("log... 1843");
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {
                                        // amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                        },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 45:
                                _d.sent();
                                return [2 /*return*/];
                            case 46:
                                console.log("log... 1854 - Lista");
                                debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var sections, listMessage, sendMsg;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                sections = [
                                                    {
                                                        title: "Lista de Botões",
                                                        rows: sectionsRows_2
                                                    }
                                                ];
                                                listMessage = {
                                                    title: "Lista\n",
                                                    text: (0, Mustache_1["default"])("\u200E".concat(greetingMessage, "\n")),
                                                    buttonText: "Clique aqui",
                                                    //footer: "_",
                                                    sections: sections
                                                };
                                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), listMessage)];
                                            case 1:
                                                sendMsg = _a.sent();
                                                return [4 /*yield*/, (0, exports.verifyMessage)(sendMsg, ticket, contact, ticketTraking)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {},
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 47:
                                _d.sent();
                                debouncedSentMessage();
                                _d.label = 48;
                            case 48: return [2 /*return*/];
                        }
                    });
                }); };
                botButton = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var queue, currentSchedule, dataLimite, Agora, outOfHoursMessage, body_5, debouncedSentMessage, debouncedSentMessage, body, sentMessage, publicFolder, files, folder, _i, _a, _b, index, file, mediaSrc, sentMessage, error_9, error_10, count, qtd, msgFila, bodyFila_4, debouncedSentMessagePosicao, dataLimite, Agora, options, body, filePath, fileExists, debouncedSentgreetingMediaAttachment, debouncedSentButton, debouncedSentButton;
                    var _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                console.log("log... 1449");
                                if (!(choosenQueue || (queues.length === 1 && chatbot))) return [3 /*break*/, 34];
                                console.log("log... 1452");
                                // console.log("entrou no choose", ticket.isOutOfHour, ticketTraking.chatbotAt)
                                if (queues.length === 1)
                                    choosenQueue = queues[0];
                                return [4 /*yield*/, Queue_1["default"].findByPk(choosenQueue.id)];
                            case 1:
                                queue = _d.sent();
                                console.log("log... 1457");
                                if (!(ticket.isOutOfHour === false && ticketTraking.chatbotAt !== null)) return [3 /*break*/, 4];
                                console.log("log... 1460");
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, ticket.update({
                                        amountUsedBotQueues: 0
                                    })];
                            case 3:
                                _d.sent();
                                _d.label = 4;
                            case 4:
                                currentSchedule = void 0;
                                if (!((settings === null || settings === void 0 ? void 0 : settings.scheduleType) === "queue")) return [3 /*break*/, 6];
                                console.log("log... 1472");
                                return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, queue.id, 0)];
                            case 5:
                                currentSchedule = _d.sent();
                                _d.label = 6;
                            case 6:
                                if (!((settings === null || settings === void 0 ? void 0 : settings.scheduleType) === "queue" &&
                                    ticket.status !== "open" &&
                                    !(0, lodash_1.isNil)(currentSchedule) &&
                                    (ticket.amountUsedBotQueues < maxUseBotQueues ||
                                        maxUseBotQueues === 0) &&
                                    (!currentSchedule || currentSchedule.inActivity === false) &&
                                    (!ticket.isGroup || ((_c = ticket.whatsapp) === null || _c === void 0 ? void 0 : _c.groupAsTicket) === "enabled"))) return [3 /*break*/, 10];
                                if (!(timeUseBotQueues !== "0")) return [3 /*break*/, 8];
                                console.log("log... 1483");
                                dataLimite = new Date();
                                Agora = new Date();
                                if (ticketTraking.chatbotAt !== null) {
                                    console.log("log... 1491");
                                    dataLimite.setMinutes(ticketTraking.chatbotAt.getMinutes() + Number(timeUseBotQueues));
                                    if (ticketTraking.chatbotAt !== null &&
                                        Agora < dataLimite &&
                                        timeUseBotQueues !== "0" &&
                                        ticket.amountUsedBotQueues !== 0) {
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 7:
                                _d.sent();
                                _d.label = 8;
                            case 8:
                                outOfHoursMessage = queue.outOfHoursMessage;
                                if (outOfHoursMessage !== "") {
                                    body_5 = (0, Mustache_1["default"])("".concat(outOfHoursMessage), ticket);
                                    console.log("log... 1509");
                                    debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                        text: body_5
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 1000, ticket.id);
                                    debouncedSentMessage();
                                }
                                return [4 /*yield*/, ticket.update({
                                        queueId: queue.id,
                                        isOutOfHour: true,
                                        amountUsedBotQueues: ticket.amountUsedBotQueues + 1
                                    })];
                            case 9:
                                _d.sent();
                                return [2 /*return*/];
                            case 10: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                    ticketData: {
                                        queueId: choosenQueue.id
                                    },
                                    ticketId: ticket.id,
                                    companyId: companyId
                                })];
                            case 11:
                                _d.sent();
                                if (!(choosenQueue.chatbots.length > 0 && !ticket.isGroup)) return [3 /*break*/, 13];
                                console.log("log... 1554");
                                debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var whatsapp, botNumber, buttons_1, interactiveMsg, jid, newMsg, error_11;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 5, , 6]);
                                                console.log("log... enviando as opcoes das filas");
                                                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                        where: { id: ticket.whatsappId }
                                                    })];
                                            case 1:
                                                whatsapp = _a.sent();
                                                if (!whatsapp || !whatsapp.number) {
                                                    console.error("Número de WhatsApp não encontrado para o ticket:", ticket.whatsappId);
                                                    throw new Error("Número de WhatsApp não encontrado");
                                                }
                                                botNumber = whatsapp.number;
                                                buttons_1 = [];
                                                // Adiciona os chatbots como botões
                                                choosenQueue.chatbots.forEach(function (chatbot, index) {
                                                    buttons_1.push({
                                                        name: "quick_reply",
                                                        buttonParamsJson: JSON.stringify({
                                                            display_text: chatbot.name,
                                                            id: "".concat(index + 1)
                                                        })
                                                    });
                                                });
                                                buttons_1.push({
                                                    name: "quick_reply",
                                                    buttonParamsJson: JSON.stringify({
                                                        display_text: "Voltar Menu Inicial",
                                                        id: "#"
                                                    })
                                                });
                                                interactiveMsg = {
                                                    viewOnceMessage: {
                                                        message: {
                                                            interactiveMessage: {
                                                                body: {
                                                                    text: "\u200E".concat(choosenQueue.greetingMessage)
                                                                },
                                                                nativeFlowMessage: {
                                                                    buttons: buttons_1,
                                                                    messageParamsJson: JSON.stringify({
                                                                        from: "apiv2",
                                                                        templateId: "4194019344155670"
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    }
                                                };
                                                jid = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                                                newMsg = (0, baileys_1.generateWAMessageFromContent)(jid, interactiveMsg, {
                                                    userJid: botNumber
                                                });
                                                return [4 /*yield*/, wbot.relayMessage(jid, newMsg.message, {
                                                        messageId: newMsg.key.id
                                                    })];
                                            case 2:
                                                _a.sent();
                                                if (!newMsg) return [3 /*break*/, 4];
                                                return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4: return [3 /*break*/, 6];
                                            case 5:
                                                error_11 = _a.sent();
                                                console.error("Erro ao enviar ou fazer upsert da mensagem:", error_11);
                                                return [3 /*break*/, 6];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                debouncedSentMessage();
                                if (!(settings === null || settings === void 0 ? void 0 : settings.userRandom)) return [3 /*break*/, 13];
                                console.log("log... 1576");
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: { userId: randomUserId },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 12:
                                _d.sent();
                                _d.label = 13;
                            case 13:
                                if (!(!choosenQueue.chatbots.length &&
                                    choosenQueue.greetingMessage.length !== 0)) return [3 /*break*/, 16];
                                console.log("log... 1586");
                                console.log(choosenQueue.greetingMessage);
                                body = (0, Mustache_1["default"])("\u200E".concat(choosenQueue.greetingMessage), ticket);
                                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                        text: body
                                    })];
                            case 14:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket, contact, ticketTraking)];
                            case 15:
                                _d.sent();
                                _d.label = 16;
                            case 16:
                                if (!!(0, lodash_1.isNil)(choosenQueue.fileListId)) return [3 /*break*/, 25];
                                _d.label = 17;
                            case 17:
                                _d.trys.push([17, 24, , 25]);
                                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                                return [4 /*yield*/, (0, ShowService_1["default"])(choosenQueue.fileListId, ticket.companyId)];
                            case 18:
                                files = _d.sent();
                                folder = path_1["default"].resolve(publicFolder, "company".concat(ticket.companyId), "fileList", String(files.id));
                                _i = 0, _a = files.options.entries();
                                _d.label = 19;
                            case 19:
                                if (!(_i < _a.length)) return [3 /*break*/, 23];
                                _b = _a[_i], index = _b[0], file = _b[1];
                                mediaSrc = {
                                    fieldname: "medias",
                                    originalname: file.path,
                                    encoding: "7bit",
                                    mimetype: file.mediaType,
                                    filename: file.path,
                                    path: path_1["default"].resolve(folder, file.path)
                                };
                                return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({
                                        media: mediaSrc,
                                        ticket: ticket,
                                        body: "\u200E ".concat(file.name),
                                        isPrivate: false,
                                        isForwarded: false
                                    })];
                            case 20:
                                sentMessage = _d.sent();
                                return [4 /*yield*/, (0, exports.verifyMediaMessage)(sentMessage, ticket, ticket.contact, ticketTraking, false, false, wbot)];
                            case 21:
                                _d.sent();
                                _d.label = 22;
                            case 22:
                                _i++;
                                return [3 /*break*/, 19];
                            case 23: return [3 /*break*/, 25];
                            case 24:
                                error_9 = _d.sent();
                                logger_1["default"].info(error_9);
                                return [3 /*break*/, 25];
                            case 25: return [4 /*yield*/, (0, baileys_1.delay)(4000)];
                            case 26:
                                _d.sent();
                                if (!choosenQueue.closeTicket) return [3 /*break*/, 31];
                                _d.label = 27;
                            case 27:
                                _d.trys.push([27, 29, , 30]);
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {
                                            status: "closed",
                                            queueId: choosenQueue.id
                                            // sendFarewellMessage: false,
                                        },
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 28:
                                _d.sent();
                                return [3 /*break*/, 30];
                            case 29:
                                error_10 = _d.sent();
                                logger_1["default"].info(error_10);
                                return [3 /*break*/, 30];
                            case 30: return [2 /*return*/];
                            case 31: return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                    where: {
                                        userId: null,
                                        status: "pending",
                                        companyId: companyId,
                                        queueId: choosenQueue.id,
                                        whatsappId: wbot.id,
                                        isGroup: false
                                    }
                                })];
                            case 32:
                                count = _d.sent();
                                console.log("======== choose queue ========");
                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                        ticketId: ticket.id,
                                        type: "queue",
                                        queueId: choosenQueue.id
                                    })];
                            case 33:
                                _d.sent();
                                if (enableQueuePosition && !choosenQueue.chatbots.length) {
                                    qtd = count.count === 0 ? 1 : count.count;
                                    msgFila = "".concat(settings.sendQueuePositionMessage, " *").concat(qtd, "*");
                                    bodyFila_4 = (0, Mustache_1["default"])("".concat(msgFila), ticket);
                                    debouncedSentMessagePosicao = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), {
                                                        text: bodyFila_4
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 3000, ticket.id);
                                    debouncedSentMessagePosicao();
                                }
                                return [3 /*break*/, 43];
                            case 34:
                                if (ticket.isGroup)
                                    return [2 /*return*/];
                                if (maxUseBotQueues &&
                                    maxUseBotQueues !== 0 &&
                                    ticket.amountUsedBotQueues >= maxUseBotQueues) {
                                    // await UpdateTicketService({
                                    //   ticketData: { queueId: queues[0].id },
                                    //   ticketId: ticket.id
                                    // });
                                    return [2 /*return*/];
                                }
                                if (!(timeUseBotQueues !== "0")) return [3 /*break*/, 36];
                                dataLimite = new Date();
                                Agora = new Date();
                                console.log("log... 1749");
                                if (ticketTraking.chatbotAt !== null) {
                                    dataLimite.setMinutes(ticketTraking.chatbotAt.getMinutes() + Number(timeUseBotQueues));
                                    console.log("log... 1754");
                                    if (ticketTraking.chatbotAt !== null &&
                                        Agora < dataLimite &&
                                        timeUseBotQueues !== "0" &&
                                        ticket.amountUsedBotQueues !== 0) {
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, ticketTraking.update({
                                        chatbotAt: null
                                    })];
                            case 35:
                                _d.sent();
                                _d.label = 36;
                            case 36:
                                wbot.presenceSubscribe(contact.remoteJid);
                                options = "";
                                wbot.sendPresenceUpdate("composing", contact.remoteJid);
                                console.log("============= queue menu =============");
                                body = (0, Mustache_1["default"])("\u200E".concat(greetingMessage, "\n\n").concat(options), ticket);
                                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                        ticketId: ticket.id,
                                        type: "chatBot"
                                    })];
                            case 37:
                                _d.sent();
                                return [4 /*yield*/, (0, baileys_1.delay)(1000)];
                            case 38:
                                _d.sent();
                                return [4 /*yield*/, wbot.sendPresenceUpdate("paused", contact.remoteJid)];
                            case 39:
                                _d.sent();
                                if (!(ticket.whatsapp.greetingMediaAttachment !== null)) return [3 /*break*/, 41];
                                console.log("log... 1799");
                                filePath = path_1["default"].resolve("public", "company".concat(companyId), ticket.whatsapp.greetingMediaAttachment);
                                fileExists = fs_2["default"].existsSync(filePath);
                                // console.log(fileExists);
                                if (fileExists) {
                                    console.log("log... botao com midia");
                                    debouncedSentgreetingMediaAttachment = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var whatsapp, botNumber, buttons_2, filePath_1, fileExists_1, imageMessageContent, imageMessage, interactiveMsg, jid, newMsg, error_12;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 6, , 7]);
                                                    return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                            where: { id: ticket.whatsappId }
                                                        })];
                                                case 1:
                                                    whatsapp = _a.sent();
                                                    if (!whatsapp || !whatsapp.number) {
                                                        console.error("Número de WhatsApp não encontrado para o ticket:", ticket.whatsappId);
                                                        throw new Error("Número de WhatsApp não encontrado");
                                                    }
                                                    botNumber = whatsapp.number;
                                                    buttons_2 = [];
                                                    queues.forEach(function (queue, index) {
                                                        buttons_2.push({
                                                            name: "quick_reply",
                                                            buttonParamsJson: JSON.stringify({
                                                                display_text: queue.name,
                                                                id: "".concat(index + 1)
                                                            })
                                                        });
                                                    });
                                                    buttons_2.push({
                                                        name: "quick_reply",
                                                        buttonParamsJson: JSON.stringify({
                                                            display_text: "Encerrar atendimento",
                                                            id: "Sair"
                                                        })
                                                    });
                                                    if (!ticket.whatsapp.greetingMediaAttachment) return [3 /*break*/, 5];
                                                    filePath_1 = path_1["default"].resolve("public", "company".concat(companyId), ticket.whatsapp.greetingMediaAttachment);
                                                    fileExists_1 = fs_2["default"].existsSync(filePath_1);
                                                    if (!fileExists_1) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, (0, baileys_1.generateWAMessageContent)({ image: { url: filePath_1 } }, // Caminho da imagem local
                                                        { upload: wbot.waUploadToServer })];
                                                case 2:
                                                    imageMessageContent = _a.sent();
                                                    imageMessage = imageMessageContent.imageMessage;
                                                    interactiveMsg = {
                                                        viewOnceMessage: {
                                                            message: {
                                                                interactiveMessage: {
                                                                    body: {
                                                                        text: "\u200E".concat(greetingMessage)
                                                                    },
                                                                    header: {
                                                                        imageMessage: imageMessage,
                                                                        hasMediaAttachment: true
                                                                    },
                                                                    nativeFlowMessage: {
                                                                        buttons: buttons_2,
                                                                        messageParamsJson: JSON.stringify({
                                                                            from: "apiv2",
                                                                            templateId: "4194019344155670"
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    };
                                                    jid = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                                                    newMsg = (0, baileys_1.generateWAMessageFromContent)(jid, interactiveMsg, { userJid: botNumber });
                                                    return [4 /*yield*/, wbot.relayMessage(jid, newMsg.message, {
                                                            messageId: newMsg.key.id
                                                        })];
                                                case 3:
                                                    _a.sent();
                                                    if (!newMsg) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                                                case 4:
                                                    _a.sent();
                                                    _a.label = 5;
                                                case 5: return [3 /*break*/, 7];
                                                case 6:
                                                    error_12 = _a.sent();
                                                    console.error("Erro ao enviar ou fazer upsert da mensagem:", error_12);
                                                    return [3 /*break*/, 7];
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 1000, ticket.id);
                                    debouncedSentgreetingMediaAttachment();
                                }
                                else {
                                    console.log("log... Botao sem midia");
                                    debouncedSentButton = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var whatsapp, botNumber, buttons_3, interactiveMsg, jid, newMsg, error_13;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 5, , 6]);
                                                    return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                            where: { id: ticket.whatsappId }
                                                        })];
                                                case 1:
                                                    whatsapp = _a.sent();
                                                    if (!whatsapp || !whatsapp.number) {
                                                        console.error("Número de WhatsApp não encontrado para o ticket:", ticket.whatsappId);
                                                        throw new Error("Número de WhatsApp não encontrado");
                                                    }
                                                    botNumber = whatsapp.number;
                                                    buttons_3 = [];
                                                    queues.forEach(function (queue, index) {
                                                        buttons_3.push({
                                                            name: "quick_reply",
                                                            buttonParamsJson: JSON.stringify({
                                                                display_text: queue.name,
                                                                id: "".concat(index + 1)
                                                            })
                                                        });
                                                    });
                                                    buttons_3.push({
                                                        name: "quick_reply",
                                                        buttonParamsJson: JSON.stringify({
                                                            display_text: "Encerrar atendimento",
                                                            id: "Sair"
                                                        })
                                                    });
                                                    interactiveMsg = {
                                                        viewOnceMessage: {
                                                            message: {
                                                                interactiveMessage: {
                                                                    body: {
                                                                        text: "\u200E".concat(greetingMessage)
                                                                    },
                                                                    nativeFlowMessage: {
                                                                        buttons: buttons_3,
                                                                        messageParamsJson: JSON.stringify({
                                                                            from: "apiv2",
                                                                            templateId: "4194019344155670"
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    };
                                                    jid = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                                                    newMsg = (0, baileys_1.generateWAMessageFromContent)(jid, interactiveMsg, { userJid: botNumber });
                                                    return [4 /*yield*/, wbot.relayMessage(jid, newMsg.message, {
                                                            messageId: newMsg.key.id
                                                        })];
                                                case 2:
                                                    _a.sent();
                                                    if (!newMsg) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                                                case 3:
                                                    _a.sent();
                                                    _a.label = 4;
                                                case 4: return [3 /*break*/, 6];
                                                case 5:
                                                    error_13 = _a.sent();
                                                    console.error("Erro ao enviar ou fazer upsert da mensagem:", error_13);
                                                    return [3 /*break*/, 6];
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 1000, ticket.id);
                                    debouncedSentButton();
                                }
                                console.log("log... 1843");
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {},
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 40:
                                _d.sent();
                                return [2 /*return*/];
                            case 41:
                                console.log("log... 1854 - botao");
                                debouncedSentButton = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var whatsapp, botNumber, buttons_4, interactiveMsg, jid, newMsg, error_14;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 5, , 6]);
                                                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                        where: { id: ticket.whatsappId }
                                                    })];
                                            case 1:
                                                whatsapp = _a.sent();
                                                if (!whatsapp || !whatsapp.number) {
                                                    console.error("Número de WhatsApp não encontrado para o ticket:", ticket.whatsappId);
                                                    throw new Error("Número de WhatsApp não encontrado");
                                                }
                                                botNumber = whatsapp.number;
                                                buttons_4 = [];
                                                queues.forEach(function (queue, index) {
                                                    buttons_4.push({
                                                        name: "quick_reply",
                                                        buttonParamsJson: JSON.stringify({
                                                            display_text: queue.name,
                                                            id: "".concat(index + 1)
                                                        })
                                                    });
                                                });
                                                buttons_4.push({
                                                    name: "quick_reply",
                                                    buttonParamsJson: JSON.stringify({
                                                        display_text: "Encerrar atendimento",
                                                        id: "Sair"
                                                    })
                                                });
                                                interactiveMsg = {
                                                    viewOnceMessage: {
                                                        message: {
                                                            interactiveMessage: {
                                                                body: {
                                                                    text: "\u200E".concat(greetingMessage)
                                                                },
                                                                nativeFlowMessage: {
                                                                    buttons: buttons_4,
                                                                    messageParamsJson: JSON.stringify({
                                                                        from: "apiv2",
                                                                        templateId: "4194019344155670"
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    }
                                                };
                                                jid = "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                                                newMsg = (0, baileys_1.generateWAMessageFromContent)(jid, interactiveMsg, {
                                                    userJid: botNumber
                                                });
                                                return [4 /*yield*/, wbot.relayMessage(jid, newMsg.message, {
                                                        messageId: newMsg.key.id
                                                    })];
                                            case 2:
                                                _a.sent();
                                                if (!newMsg) return [3 /*break*/, 4];
                                                return [4 /*yield*/, wbot.upsertMessage(newMsg, "notify")];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4: return [3 /*break*/, 6];
                                            case 5:
                                                error_14 = _a.sent();
                                                console.error("Erro ao enviar ou fazer upsert da mensagem:", error_14);
                                                return [3 /*break*/, 6];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000, ticket.id);
                                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketData: {},
                                        ticketId: ticket.id,
                                        companyId: companyId
                                    })];
                            case 42:
                                _d.sent();
                                debouncedSentButton();
                                _d.label = 43;
                            case 43: return [2 /*return*/];
                        }
                    });
                }); };
                if (typeBot === "text") {
                    return [2 /*return*/, botText()];
                }
                if (typeBot === "list") {
                    return [2 /*return*/, botList()];
                }
                if (typeBot === "button") {
                    return [2 /*return*/, botButton()];
                }
                if (typeBot === "button" && queues.length > 3) {
                    return [2 /*return*/, botText()];
                }
                return [2 /*return*/];
        }
    });
}); };
var verifyRating = function (ticketTraking) {
    console.log("2029", { verifyRating: exports.verifyRating });
    if (ticketTraking &&
        ticketTraking.finishedAt === null &&
        ticketTraking.closedAt !== null &&
        ticketTraking.userId !== null &&
        ticketTraking.ratingAt === null) {
        return true;
    }
    return false;
};
exports.verifyRating = verifyRating;
var handleRating = function (rate, ticket, ticketTraking) { return __awaiter(void 0, void 0, void 0, function () {
    var io, companyId, complationMessage, finalRate, body, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                io = (0, socket_1.getIO)();
                companyId = ticket.companyId;
                console.log("2050", { handleRating: exports.handleRating });
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(ticket.whatsappId, companyId)];
            case 1:
                complationMessage = (_a.sent()).complationMessage;
                finalRate = rate;
                if (rate < 0) {
                    finalRate = 0;
                }
                if (rate > 10) {
                    finalRate = 10;
                }
                return [4 /*yield*/, UserRating_1["default"].create({
                        ticketId: ticketTraking.ticketId,
                        companyId: ticketTraking.companyId,
                        userId: ticketTraking.userId,
                        rate: finalRate
                    })];
            case 2:
                _a.sent();
                if (!(!(0, lodash_1.isNil)(complationMessage) &&
                    complationMessage !== "" &&
                    !ticket.isGroup)) return [3 /*break*/, 7];
                body = (0, Mustache_1["default"])("\u200E".concat(complationMessage), ticket);
                if (!(ticket.channel === "whatsapp")) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: body, ticket: ticket })];
            case 3:
                msg = _a.sent();
                return [4 /*yield*/, (0, exports.verifyMessage)(msg, ticket, ticket.contact, ticketTraking)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!["facebook", "instagram"].includes(ticket.channel)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, sendFacebookMessage_1["default"])({ body: body, ticket: ticket })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, ticket.update({
                    isBot: false,
                    status: "closed",
                    amountUsedBotQueuesNPS: 0
                })];
            case 8:
                _a.sent();
                //loga fim de atendimento
                return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                        userId: ticket.userId,
                        queueId: ticket.queueId,
                        ticketId: ticket.id,
                        type: "closed"
                    })];
            case 9:
                //loga fim de atendimento
                _a.sent();
                io.of(String(companyId))
                    // .to("open")
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "delete",
                    ticket: ticket,
                    ticketId: ticket.id
                });
                io.of(String(companyId))
                    // .to(ticket.status)
                    // .to(ticket.id.toString())
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "update",
                    ticket: ticket,
                    ticketId: ticket.id
                });
                return [2 /*return*/];
        }
    });
}); };
exports.handleRating = handleRating;
var sanitizeName = function (name) {
    var sanitized = name.split(" ")[0];
    sanitized = sanitized.replace(/[^a-zA-Z0-9]/g, "");
    return sanitized.substring(0, 60);
};
var deleteFileSync = function (path) {
    try {
        fs_2["default"].unlinkSync(path);
    }
    catch (error) {
        console.error("Erro ao deletar o arquivo:", error);
    }
};
var convertTextToSpeechAndSaveToFile = function (text, filename, subscriptionKey, serviceRegion, voice, audioToFormat) {
    if (voice === void 0) { voice = "pt-BR-FabioNeural"; }
    if (audioToFormat === void 0) { audioToFormat = "mp3"; }
    return new Promise(function (resolve, reject) {
        var speechConfig = microsoft_cognitiveservices_speech_sdk_1.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechSynthesisVoiceName = voice;
        var audioConfig = microsoft_cognitiveservices_speech_sdk_1.AudioConfig.fromAudioFileOutput("".concat(filename, ".wav"));
        var synthesizer = new microsoft_cognitiveservices_speech_sdk_1.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakTextAsync(text, function (result) {
            if (result) {
                convertWavToAnotherFormat("".concat(filename, ".wav"), "".concat(filename, ".").concat(audioToFormat), audioToFormat)
                    .then(function (output) {
                    resolve();
                })["catch"](function (error) {
                    console.error(error);
                    reject(error);
                });
            }
            else {
                reject(new Error("No result from synthesizer"));
            }
            synthesizer.close();
        }, function (error) {
            console.error("Error: ".concat(error));
            synthesizer.close();
            reject(error);
        });
    });
};
exports.convertTextToSpeechAndSaveToFile = convertTextToSpeechAndSaveToFile;
var convertWavToAnotherFormat = function (inputPath, outputPath, toFormat) {
    return new Promise(function (resolve, reject) {
        (0, fluent_ffmpeg_1["default"])()
            .input(inputPath)
            .toFormat(toFormat)
            .on("end", function () { return resolve(outputPath); })
            .on("error", function (err) {
            return reject(new Error("Error converting file: ".concat(err.message)));
        })
            .save(outputPath);
    });
};
var keepOnlySpecifiedChars = function (str) {
    return str.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ!?.,;:\s]/g, "");
};
exports.keepOnlySpecifiedChars = keepOnlySpecifiedChars;
var transferQueue = function (queueId, ticket, contact) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                    ticketData: { queueId: queueId },
                    ticketId: ticket.id,
                    companyId: ticket.companyId
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.transferQueue = transferQueue;
var flowbuilderIntegration = function (msg, wbot, companyId, queueIntegration, ticket, contact, isFirstMsg, isTranfered) { return __awaiter(void 0, void 0, void 0, function () {
    var io, quotedMsg, body, response_1, _a, flow, connections, targetConnection, flowContinue, connectionsContinue, nodeConnections, targetConnectionContinue, error_15, pauseMinutes, aiFlow, aiNode, _b, pausedUntil, whatsapp, listPhrase, normalizeText, bodyNorm, campaignMatchesBody, whatsappHasSchedules, scheduleCheck, outFlow, mountDataContact, body_6, preMatchCampaigns, flowDisparPre, flowPre, mountDataContactPre, flow, nodes, connections, mountDataContact, dateTicket, dateNow, diferencaEmMilissegundos, seisHorasEmMilissegundos, flow, nodes, connections, mountDataContact, matchingCampaigns, flowDispar, flow, nodes, connections, mountDataContact, whatsapp_1, maxBotAttempts, currentAttempts, webhook, flow, nodes, connections, flow, nodes, connections, startNode_1, startConnection, mountDataContact;
    var _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                io = (0, socket_1.getIO)();
                return [4 /*yield*/, verifyQuotedMessage(msg)];
            case 1:
                quotedMsg = _f.sent();
                body = (0, exports.getBodyMessage)(msg);
                // Recarregar ticket do banco para garantir que waitingQuestion está atualizado
                return [4 /*yield*/, ticket.reload()];
            case 2:
                // Recarregar ticket do banco para garantir que waitingQuestion está atualizado
                _f.sent();
                if (!(ticket.waitingQuestion && !msg.key.fromMe)) return [3 /*break*/, 23];
                console.log("[WaitQuestion] Processando resposta do ticket ".concat(ticket.id, ": \"").concat(body, "\""));
                _f.label = 3;
            case 3:
                _f.trys.push([3, 21, , 22]);
                return [4 /*yield*/, WaitQuestionService_1["default"].processResponse(ticket.id, body)];
            case 4:
                response_1 = _f.sent();
                if (!response_1) return [3 /*break*/, 19];
                console.log("[WaitQuestion] Resposta match encontrada: ".concat(response_1.option, ", a\u00E7\u00E3o: ").concat(response_1.action));
                _a = response_1.action;
                switch (_a) {
                    case "close": return [3 /*break*/, 5];
                    case "transfer": return [3 /*break*/, 7];
                    case "continue": return [3 /*break*/, 11];
                }
                return [3 /*break*/, 11];
            case 5: return [4 /*yield*/, ticket.update({ status: "closed" })];
            case 6:
                _f.sent();
                console.log("[WaitQuestion] Ticket ".concat(ticket.id, " fechado pela resposta"));
                return [3 /*break*/, 18];
            case 7: return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                    where: { id: ticket.flowStopped }
                })];
            case 8:
                flow = _f.sent();
                if (!(flow && flow.flow)) return [3 /*break*/, 10];
                connections = flow.flow["connections"] || [];
                console.log("[WaitQuestion/Transfer] nodeId=".concat(response_1.nodeId, ", option=").concat(response_1.option));
                targetConnection = connections.find(function (conn) {
                    return conn.source === response_1.nodeId &&
                        conn.sourceHandle === response_1.option;
                });
                if (!targetConnection) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(ticket.whatsappId, parseInt(ticket.flowStopped), ticket.companyId, flow.flow["nodes"] || [], connections, targetConnection.target, ticket.dataWebhook, "", "", body, ticket.id, {
                        number: contact.number,
                        name: contact.name,
                        email: contact.email
                    }, msg)];
            case 9:
                _f.sent();
                console.log("[WaitQuestion] Fluxo continuado para ".concat(targetConnection.target));
                _f.label = 10;
            case 10: return [3 /*break*/, 18];
            case 11: return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                    where: { id: ticket.flowStopped }
                })];
            case 12:
                flowContinue = _f.sent();
                console.log("[WaitQuestion] Continue: flowStopped=".concat(ticket.flowStopped, ", flowFound=").concat(!!flowContinue));
                console.log("[WaitQuestion] Continue: nodeId=".concat(response_1.nodeId, ", option=").concat(response_1.option));
                if (!(flowContinue && flowContinue.flow)) return [3 /*break*/, 16];
                connectionsContinue = flowContinue.flow["connections"] || [];
                nodeConnections = connectionsContinue.filter(function (conn) { return conn.source === response_1.nodeId; });
                console.log("[WaitQuestion] Conex\u00F5es do n\u00F3 ".concat(response_1.nodeId, ":"), JSON.stringify(nodeConnections.map(function (c) { return ({ sourceHandle: c.sourceHandle, target: c.target }); })));
                targetConnectionContinue = connectionsContinue.find(function (conn) {
                    return conn.source === response_1.nodeId &&
                        conn.sourceHandle === response_1.option;
                });
                if (!targetConnectionContinue) return [3 /*break*/, 14];
                console.log("[WaitQuestion] Conex\u00E3o encontrada! Target: ".concat(targetConnectionContinue.target));
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(ticket.whatsappId, parseInt(ticket.flowStopped), ticket.companyId, flowContinue.flow["nodes"] || [], connectionsContinue, targetConnectionContinue.target, ticket.dataWebhook, "", "", body, ticket.id, {
                        number: contact.number,
                        name: contact.name,
                        email: contact.email
                    }, msg)];
            case 13:
                _f.sent();
                console.log("[WaitQuestion] Fluxo continuado para pr\u00F3ximo n\u00F3: ".concat(targetConnectionContinue.target));
                return [3 /*break*/, 15];
            case 14:
                console.log("[WaitQuestion] ERRO: Conex\u00E3o N\u00C3O encontrada para source=".concat(response_1.nodeId, " handle=").concat(response_1.option === "x" ? "x" : "y"));
                console.log("[WaitQuestion] Handles dispon\u00EDveis:", nodeConnections.map(function (c) { return c.sourceHandle; }));
                _f.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                console.log("[WaitQuestion] ERRO: Fluxo ".concat(ticket.flowStopped, " n\u00E3o encontrado"));
                _f.label = 17;
            case 17: return [3 /*break*/, 18];
            case 18: return [3 /*break*/, 20];
            case 19:
                console.log("[WaitQuestion] Resposta n\u00E3o match com nenhuma op\u00E7\u00E3o: \"".concat(body, "\""));
                _f.label = 20;
            case 20: return [3 /*break*/, 22];
            case 21:
                error_15 = _f.sent();
                console.error("[WaitQuestion] Erro ao processar resposta:", error_15);
                return [3 /*break*/, 22];
            case 22: 
            // Retornar para não continuar com o fluxo normal
            return [2 /*return*/];
            case 23:
                if (!(!msg.key.fromMe && ticket.status === "closed")) return [3 /*break*/, 27];
                console.log("===== CHANGE =====");
                return [4 /*yield*/, ticket.update({ status: "pending" })];
            case 24:
                _f.sent();
                return [4 /*yield*/, ticket.reload({
                        include: [
                            { model: Queue_1["default"], as: "queue" },
                            { model: User_1["default"], as: "user" },
                            { model: Contact_1["default"], as: "contact" }
                        ]
                    })];
            case 25:
                _f.sent();
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { status: "pending", integrationId: ticket.integrationId },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 26:
                _f.sent();
                io.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), {
                    action: "delete",
                    ticket: ticket,
                    ticketId: ticket.id
                });
                io.to(ticket.status).emit("company-".concat(companyId, "-ticket"), {
                    action: "update",
                    ticket: ticket,
                    ticketId: ticket.id
                });
                _f.label = 27;
            case 27:
                if (!msg.key.fromMe) return [3 /*break*/, 35];
                if (!(!(0, systemMessageCache_1.isSystemMessage)(msg.key.id) && (ticket.flowWebhook || ticket.useIntegration))) return [3 /*break*/, 34];
                pauseMinutes = 10;
                _f.label = 28;
            case 28:
                _f.trys.push([28, 31, , 32]);
                if (!ticket.lastFlowId) return [3 /*break*/, 30];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: ticket.lastFlowId } })];
            case 29:
                aiFlow = _f.sent();
                if ((_c = aiFlow === null || aiFlow === void 0 ? void 0 : aiFlow.flow) === null || _c === void 0 ? void 0 : _c.nodes) {
                    aiNode = aiFlow.flow.nodes.find(function (n) { var _a; return n.type === "addDirectOpenAI" || ((_a = n.data) === null || _a === void 0 ? void 0 : _a.openAiSettings); });
                    if ((_e = (_d = aiNode === null || aiNode === void 0 ? void 0 : aiNode.data) === null || _d === void 0 ? void 0 : _d.openAiSettings) === null || _e === void 0 ? void 0 : _e.pauseMinutes) {
                        pauseMinutes = Number(aiNode.data.openAiSettings.pauseMinutes) || 10;
                    }
                }
                _f.label = 30;
            case 30: return [3 /*break*/, 32];
            case 31:
                _b = _f.sent();
                return [3 /*break*/, 32];
            case 32:
                pausedUntil = new Date(Date.now() + pauseMinutes * 60 * 1000);
                return [4 /*yield*/, ticket.update({ aiPausedUntil: pausedUntil })];
            case 33:
                _f.sent();
                logger_1["default"].info("[AI Pause] Envio manual no ticket ".concat(ticket.id, ". IA pausada por ").concat(pauseMinutes, " min at\u00E9 ").concat(pausedUntil.toISOString()));
                _f.label = 34;
            case 34: return [2 /*return*/];
            case 35: return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(wbot.id, companyId)];
            case 36:
                whatsapp = _f.sent();
                return [4 /*yield*/, FlowCampaign_1.FlowCampaignModel.findAll({
                        where: {
                            whatsappId: whatsapp.id
                        }
                    })];
            case 37:
                listPhrase = _f.sent();
                normalizeText = function (text) {
                    if (!text)
                        return "";
                    return text
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .trim();
                };
                bodyNorm = normalizeText(body);
                campaignMatchesBody = function (campaign) {
                    var matchType = campaign.matchType || "contains";
                    var phrases = [];
                    if (Array.isArray(campaign.phrases) && campaign.phrases.length) {
                        phrases = campaign.phrases;
                    }
                    else if (typeof campaign.phrases === "string" && campaign.phrases.trim().length) {
                        try {
                            var parsed = JSON.parse(campaign.phrases);
                            if (Array.isArray(parsed)) {
                                phrases = parsed;
                            }
                        }
                        catch (e) {
                            // ignore parse errors, fallback to phrase
                        }
                    }
                    if (!phrases.length && campaign.phrase) {
                        phrases = [campaign.phrase];
                    }
                    var _loop_1 = function (p) {
                        var phraseNorm = normalizeText(p);
                        if (!phraseNorm)
                            return "continue";
                        if (matchType === "exact") {
                            if (bodyNorm === phraseNorm)
                                return { value: true };
                        }
                        else {
                            // 1. Match direto (substring exata)
                            if (bodyNorm.includes(phraseNorm))
                                return { value: true };
                            // 2. Match por palavras: todas as palavras significativas da phrase
                            //    (3+ caracteres) aparecem no body — tolera artigos extras, pontuação, etc.
                            var phraseWords = phraseNorm
                                .replace(/[!?.,"']/g, "")
                                .split(/\s+/)
                                .filter(function (w) { return w.length >= 3; });
                            if (phraseWords.length > 0) {
                                var bodyWords_1 = bodyNorm.replace(/[!?.,"']/g, "").split(/\s+/);
                                var allMatch = phraseWords.every(function (pw) {
                                    return bodyWords_1.some(function (bw) { return bw === pw || bw.includes(pw) || pw.includes(bw); });
                                });
                                if (allMatch)
                                    return { value: true };
                            }
                        }
                    };
                    for (var _i = 0, phrases_1 = phrases; _i < phrases_1.length; _i++) {
                        var p = phrases_1[_i];
                        var state_1 = _loop_1(p);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                    return false;
                };
                whatsappHasSchedules = Array.isArray(whatsapp.schedules) && whatsapp.schedules.length > 0;
                if (!(whatsappHasSchedules && !msg.key.fromMe)) return [3 /*break*/, 48];
                return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, 0, whatsapp.id)];
            case 38:
                scheduleCheck = _f.sent();
                if (!(!scheduleCheck || scheduleCheck.inActivity === false)) return [3 /*break*/, 48];
                // Fora do horário — executar ação configurada e parar
                return [4 /*yield*/, ticket.update({ isOutOfHour: true })];
            case 39:
                // Fora do horário — executar ação configurada e parar
                _f.sent();
                if (!whatsapp.outOfHoursFlowId) return [3 /*break*/, 43];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: whatsapp.outOfHoursFlowId } })];
            case 40:
                outFlow = _f.sent();
                if (!outFlow) return [3 /*break*/, 42];
                mountDataContact = { number: contact.number, name: contact.name, email: contact.email };
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, whatsapp.outOfHoursFlowId, ticket.companyId, outFlow.flow["nodes"], outFlow.flow["connections"], outFlow.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContact, msg || null)];
            case 41:
                _f.sent();
                return [2 /*return*/];
            case 42: return [3 /*break*/, 47];
            case 43:
                if (!whatsapp.outOfHoursQueueId) return [3 /*break*/, 45];
                return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                        ticketData: { queueId: whatsapp.outOfHoursQueueId, status: "pending" },
                        ticketId: ticket.id,
                        companyId: companyId
                    })];
            case 44:
                _f.sent();
                return [2 /*return*/];
            case 45:
                if (!whatsapp.outOfHoursMessage) return [3 /*break*/, 47];
                body_6 = (0, Mustache_1["default"])(whatsapp.outOfHoursMessage, ticket);
                return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), { text: body_6 })];
            case 46:
                _f.sent();
                return [2 /*return*/];
            case 47: return [2 /*return*/];
            case 48:
                preMatchCampaigns = listPhrase.filter(function (item) { return campaignMatchesBody(item); });
                if (!(preMatchCampaigns.length > 0 && !ticket.flowWebhook && !ticket.flowStopped)) return [3 /*break*/, 51];
                flowDisparPre = preMatchCampaigns[0];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: flowDisparPre.flowId } })];
            case 49:
                flowPre = _f.sent();
                if (!flowPre) return [3 /*break*/, 51];
                mountDataContactPre = { number: contact.number, name: contact.name, email: contact.email };
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, flowDisparPre.flowId, ticket.companyId, flowPre.flow["nodes"], flowPre.flow["connections"], flowPre.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContactPre, msg || null)];
            case 50:
                _f.sent();
                return [2 /*return*/];
            case 51:
                if (!(!isFirstMsg &&
                    !ticket.flowWebhook &&
                    !ticket.flowStopped &&
                    listPhrase.filter(function (item) { return campaignMatchesBody(item); }).length === 0)) return [3 /*break*/, 54];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: whatsapp.flowIdWelcome
                        }
                    })];
            case 52:
                flow = _f.sent();
                if (!flow) return [3 /*break*/, 54];
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                // const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                // // Enviar as variáveis como parte da mensagem para o Worker
                // console.log('DISPARO1')
                // const data = {
                //   idFlowDb: flowUse.flowIdWelcome,
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: flow.flow["nodes"][0].id,
                //   dataWebhook: null,
                //   details: "",
                //   hashWebhookId: "",
                //   pressKey: null,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: mountDataContact
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, whatsapp.flowIdWelcome, ticket.companyId, nodes, connections, flow.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContact, msg || null)];
            case 53:
                // const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                // // Enviar as variáveis como parte da mensagem para o Worker
                // console.log('DISPARO1')
                // const data = {
                //   idFlowDb: flowUse.flowIdWelcome,
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: flow.flow["nodes"][0].id,
                //   dataWebhook: null,
                //   details: "",
                //   hashWebhookId: "",
                //   pressKey: null,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: mountDataContact
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                _f.sent();
                _f.label = 54;
            case 54:
                dateTicket = new Date((isFirstMsg === null || isFirstMsg === void 0 ? void 0 : isFirstMsg.updatedAt) ? isFirstMsg.updatedAt : "");
                dateNow = new Date();
                diferencaEmMilissegundos = Math.abs((0, date_fns_1.differenceInMilliseconds)(dateTicket, dateNow));
                seisHorasEmMilissegundos = 1000;
                if (!(listPhrase.filter(function (item) { return campaignMatchesBody(item); }).length === 0 &&
                    diferencaEmMilissegundos >= seisHorasEmMilissegundos &&
                    isFirstMsg)) return [3 /*break*/, 57];
                console.log("2427", "handleMessageIntegration");
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: whatsapp.flowIdNotPhrase
                        }
                    })];
            case 55:
                flow = _f.sent();
                if (!flow) return [3 /*break*/, 57];
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, whatsapp.flowIdNotPhrase, ticket.companyId, nodes, connections, flow.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContact, msg || null)];
            case 56:
                _f.sent();
                _f.label = 57;
            case 57:
                matchingCampaigns = listPhrase.filter(function (item) { return campaignMatchesBody(item); });
                logger_1["default"].info("[FlowKeyword] body=\"".concat(bodyNorm, "\" | campaigns=").concat(listPhrase.length, " | matched=").concat(matchingCampaigns.length));
                listPhrase.forEach(function (c) {
                    var ph = c.phrase || "";
                    var phs = (function () { try {
                        return JSON.parse(c.phrases || "[]");
                    }
                    catch (_a) {
                        return [c.phrases || ""];
                    } })();
                    logger_1["default"].info("[FlowKeyword] campaign id=".concat(c.id, " phrase=\"").concat(ph, "\" phrases=").concat(JSON.stringify(phs), " matchType=").concat(c.matchType, " status=").concat(c.status));
                });
                if (!(matchingCampaigns.length !== 0)) return [3 /*break*/, 60];
                flowDispar = matchingCampaigns[0];
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: flowDispar.flowId
                        }
                    })];
            case 58:
                flow = _f.sent();
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                //const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                //console.log('DISPARO3')
                // Enviar as variáveis como parte da mensagem para o Worker
                // const data = {
                //   idFlowDb: flowDispar.flowId,
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: flow.flow["nodes"][0].id,
                //   dataWebhook: null,
                //   details: "",
                //   hashWebhookId: "",
                //   pressKey: null,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: mountDataContact
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, flowDispar.flowId, ticket.companyId, nodes, connections, flow.flow["nodes"][0].id, null, "", "", null, ticket.id, mountDataContact, msg || null)];
            case 59:
                //const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                //console.log('DISPARO3')
                // Enviar as variáveis como parte da mensagem para o Worker
                // const data = {
                //   idFlowDb: flowDispar.flowId,
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: flow.flow["nodes"][0].id,
                //   dataWebhook: null,
                //   details: "",
                //   hashWebhookId: "",
                //   pressKey: null,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: mountDataContact
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                _f.sent();
                return [2 /*return*/];
            case 60:
                if (!ticket.flowWebhook) return [3 /*break*/, 80];
                console.log("\uD83D\uDD04 FlowWebhook ativo - hashFlowId: ".concat(ticket.hashFlowId, ", flowStopped: ").concat(ticket.flowStopped, ", lastFlowId: ").concat(ticket.lastFlowId));
                // **NOVO: Ignorar mensagens fromMe para evitar loop infinito**
                if (msg.key.fromMe) {
                    console.log("\u26A0\uFE0F Ignorando mensagem fromMe no Flow Builder para evitar loop");
                    return [2 /*return*/];
                }
                if (!(ticket.queueId || ticket.userId)) return [3 /*break*/, 62];
                console.log("\u26A0\uFE0F Ticket j\u00E1 tem fila (".concat(ticket.queueId, ") ou usu\u00E1rio (").concat(ticket.userId, ") - Flow Builder desativado"));
                return [4 /*yield*/, ticket.update({ flowWebhook: false })];
            case 61:
                _f.sent();
                return [2 /*return*/];
            case 62: return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId)];
            case 63:
                whatsapp_1 = _f.sent();
                maxBotAttempts = (whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.timeSendQueue) || 0;
                if (!(maxBotAttempts > 0)) return [3 /*break*/, 69];
                currentAttempts = ticket.botAttempts || 0;
                if (!(currentAttempts >= maxBotAttempts)) return [3 /*break*/, 67];
                console.log("\uD83D\uDEAB Limite de tentativas do bot atingido: ".concat(currentAttempts, "/").concat(maxBotAttempts, ". Encerrando fluxo."));
                // Encerrar fluxo e transferir para fila se configurado
                return [4 /*yield*/, ticket.update({
                        flowWebhook: false,
                        flowStopped: "limite_bot",
                        botAttempts: 0
                    })];
            case 64:
                // Encerrar fluxo e transferir para fila se configurado
                _f.sent();
                if (!(whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.sendIdQueue)) return [3 /*break*/, 66];
                return [4 /*yield*/, ticket.update({
                        queueId: whatsapp_1.sendIdQueue,
                        status: "pending"
                    })];
            case 65:
                _f.sent();
                console.log("\uD83D\uDCCB Ticket transferido para fila ".concat(whatsapp_1.sendIdQueue, " por limite de bot"));
                _f.label = 66;
            case 66: return [2 /*return*/];
            case 67: 
            // Incrementar tentativas do bot
            return [4 /*yield*/, ticket.update({
                    botAttempts: currentAttempts + 1
                })];
            case 68:
                // Incrementar tentativas do bot
                _f.sent();
                console.log("\uD83E\uDD16 Tentativa do bot: ".concat(currentAttempts + 1, "/").concat(maxBotAttempts));
                _f.label = 69;
            case 69:
                webhook = null;
                if (!ticket.hashFlowId) return [3 /*break*/, 71];
                return [4 /*yield*/, Webhook_1.WebhookModel.findOne({
                        where: {
                            company_id: ticket.companyId,
                            hash_id: ticket.hashFlowId
                        }
                    })];
            case 70:
                webhook = _f.sent();
                _f.label = 71;
            case 71:
                if (!(webhook && webhook.config["details"])) return [3 /*break*/, 74];
                console.log("\u2705 Webhook encontrado - usando flow do webhook: ".concat(webhook.config["details"].idFlow));
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: webhook.config["details"].idFlow
                        }
                    })];
            case 72:
                flow = _f.sent();
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                // const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                // console.log('DISPARO4')
                // // Enviar as variáveis como parte da mensagem para o Worker
                // const data = {
                //   idFlowDb: webhook.config["details"].idFlow,
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: ticketUpdate.lastFlowId,
                //   dataWebhook: ticketUpdate.dataWebhook,
                //   details: webhook.config["details"],
                //   hashWebhookId: ticketUpdate.hashFlowId,
                //   pressKey: body,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: ""
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp_1.id, webhook.config["details"].idFlow, ticket.companyId, nodes, connections, ticket.lastFlowId, ticket.dataWebhook, webhook.config["details"], ticket.hashFlowId, body, ticket.id, null, msg || null)];
            case 73:
                // const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                // console.log('DISPARO4')
                // // Enviar as variáveis como parte da mensagem para o Worker
                // const data = {
                //   idFlowDb: webhook.config["details"].idFlow,
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: ticketUpdate.lastFlowId,
                //   dataWebhook: ticketUpdate.dataWebhook,
                //   details: webhook.config["details"],
                //   hashWebhookId: ticketUpdate.hashFlowId,
                //   pressKey: body,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: ""
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                _f.sent();
                // Encerrar após executar o fluxo para evitar reprocessamento
                return [2 /*return*/];
            case 74:
                console.log("\u26A0\uFE0F Webhook n\u00E3o encontrado - usando flowStopped: ".concat(ticket.flowStopped));
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: {
                            id: ticket.flowStopped
                        }
                    })];
            case 75:
                flow = _f.sent();
                if (!flow) {
                    console.log("\u274C Fluxo ".concat(ticket.flowStopped, " n\u00E3o encontrado!"));
                    return [2 /*return*/];
                }
                console.log("\u2705 Fluxo ".concat(ticket.flowStopped, " encontrado"));
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                if (!(ticket.lastFlowId === null || ticket.lastFlowId === undefined)) return [3 /*break*/, 78];
                console.log("\u26A0\uFE0F lastFlowId \u00E9 null/undefined, buscando n\u00F3 start");
                startNode_1 = nodes.find(function (n) { return n.type === "start"; });
                if (!startNode_1) {
                    logger_1["default"].error("Nó start não encontrado no fluxo");
                    return [2 /*return*/];
                }
                startConnection = connections.find(function (c) { return c.source === startNode_1.id; });
                if (!startConnection) {
                    logger_1["default"].error("Conexão do nó start não encontrada");
                    return [2 /*return*/];
                }
                console.log("\uD83D\uDCCD Atualizando lastFlowId de null para: ".concat(startConnection.target));
                // Atualizar ticket com o primeiro nó
                return [4 /*yield*/, ticket.update({
                        lastFlowId: startConnection.target
                    })];
            case 76:
                // Atualizar ticket com o primeiro nó
                _f.sent();
                // Executar o primeiro nó
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp_1.id, parseInt(ticket.flowStopped), ticket.companyId, nodes, connections, startConnection.target, null, "", "", body, ticket.id, {
                        number: contact.number,
                        name: contact.name,
                        email: contact.email
                    }, msg || null)];
            case 77:
                // Executar o primeiro nó
                _f.sent();
                // Encerrar após executar o fluxo para evitar reprocessamento
                return [2 /*return*/];
            case 78:
                console.log("\u2705 Usando lastFlowId existente: ".concat(ticket.lastFlowId));
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                // const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                // console.log('DISPARO5')
                // // Enviar as variáveis como parte da mensagem para o Worker
                // const data = {
                //   idFlowDb: parseInt(ticketUpdate.flowStopped),
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: ticketUpdate.lastFlowId,
                //   dataWebhook: null,
                //   details: "",
                //   hashWebhookId: "",
                //   pressKey: body,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: mountDataContact
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp_1.id, parseInt(ticket.flowStopped), ticket.companyId, nodes, connections, ticket.lastFlowId, null, "", "", body, ticket.id, mountDataContact, msg || null)];
            case 79:
                // const worker = new Worker("./src/services/WebhookService/WorkerAction.ts");
                // console.log('DISPARO5')
                // // Enviar as variáveis como parte da mensagem para o Worker
                // const data = {
                //   idFlowDb: parseInt(ticketUpdate.flowStopped),
                //   companyId: ticketUpdate.companyId,
                //   nodes: nodes,
                //   connects: connections,
                //   nextStage: ticketUpdate.lastFlowId,
                //   dataWebhook: null,
                //   details: "",
                //   hashWebhookId: "",
                //   pressKey: body,
                //   idTicket: ticketUpdate.id,
                //   numberPhrase: mountDataContact
                // };
                // worker.postMessage(data);
                // worker.on("message", message => {
                //   console.log(`Mensagem do worker: ${message}`);
                // });
                _f.sent();
                // Encerrar após executar o fluxo para evitar reprocessamento
                return [2 /*return*/];
            case 80: return [2 /*return*/];
        }
    });
}); };
var handleMessageIntegration = function (msg, wbot, companyId, queueIntegration, ticket, isMenu, whatsapp, contact, isFirstMsg) { return __awaiter(void 0, void 0, void 0, function () {
    var msgType, options, inputAudio_1, filename, debouncedSentMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                msgType = getTypeMessage(msg);
                if (!(queueIntegration.type === "n8n" || queueIntegration.type === "webhook")) return [3 /*break*/, 1];
                if (queueIntegration === null || queueIntegration === void 0 ? void 0 : queueIntegration.urlN8N) {
                    options = {
                        method: "POST",
                        url: queueIntegration === null || queueIntegration === void 0 ? void 0 : queueIntegration.urlN8N,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        json: msg
                    };
                    try {
                        request(options, function (error, response) {
                            if (error) {
                                throw new Error(error);
                            }
                            else {
                                console.log(response.body);
                            }
                        });
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                }
                return [3 /*break*/, 8];
            case 1:
                if (!(queueIntegration.type === "dialogflow")) return [3 /*break*/, 2];
                if (msgType === "audioMessage") {
                    filename = "".concat(msg.messageTimestamp, ".ogg");
                    (0, fs_1.readFile)((0, path_1.join)(__dirname, "..", "..", "..", "public", "company".concat(companyId), filename), "base64", function (err, data) {
                        inputAudio_1 = data;
                        if (err) {
                            logger_1["default"].error(err);
                        }
                    });
                }
                else {
                    inputAudio_1 = undefined;
                }
                debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sendDialogflowAwswer(wbot, ticket, msg, ticket.contact, inputAudio_1, companyId, queueIntegration)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 500, ticket.id);
                debouncedSentMessage();
                return [3 /*break*/, 8];
            case 2:
                if (!(queueIntegration.type === "typebot")) return [3 /*break*/, 4];
                // await typebots(ticket, msg, wbot, queueIntegration);
                return [4 /*yield*/, (0, typebotListener_1["default"])({ ticket: ticket, msg: msg, wbot: wbot, typebot: queueIntegration })];
            case 3:
                // await typebots(ticket, msg, wbot, queueIntegration);
                _a.sent();
                return [3 /*break*/, 8];
            case 4:
                if (!(queueIntegration.type === "flowbuilder")) return [3 /*break*/, 8];
                // Ignorar echos de mensagens enviadas pelo próprio sistema (fromMe=true)
                // para evitar que respostas do menu re-ativem o nó anterior
                if (msg.key.fromMe) {
                    return [2 /*return*/];
                }
                if (!!isMenu) return [3 /*break*/, 6];
                // const integrations = await ShowQueueIntegrationService(
                //   whatsapp.integrationId,
                //   companyId
                // );
                // Usar sistema de agrupamento para evitar múltiplas execuções
                return [4 /*yield*/, groupFlowBuilderMessages(ticket.id, contact.id, msg, wbot, companyId, undefined, //integrations,
                    ticket, contact || ticket.contact, isFirstMsg)];
            case 5:
                // const integrations = await ShowQueueIntegrationService(
                //   whatsapp.integrationId,
                //   companyId
                // );
                // Usar sistema de agrupamento para evitar múltiplas execuções
                _a.sent();
                return [3 /*break*/, 8];
            case 6:
                if (!(ticket.flowStopped &&
                    ticket.status !== "open" &&
                    ticket.status !== "closed")) return [3 /*break*/, 8];
                return [4 /*yield*/, flowBuilderQueue(ticket, msg, wbot, whatsapp, companyId, contact, isFirstMsg)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.handleMessageIntegration = handleMessageIntegration;
var flowBuilderQueue = function (ticket, msg, wbot, whatsapp, companyId, contact, isFirstMsg) { return __awaiter(void 0, void 0, void 0, function () {
    var body, response_2, flowWQ, connectionsWQ, nodeConns, handleToFind_1, targetConnection, mountDataContact_1, error_16, flow, mountDataContact, nodes, connections, startNode_2, startConnection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = (0, exports.getBodyMessage)(msg);
                // Recarregar ticket do banco para garantir que waitingQuestion está atualizado
                return [4 /*yield*/, ticket.reload()];
            case 1:
                // Recarregar ticket do banco para garantir que waitingQuestion está atualizado
                _a.sent();
                if (!(ticket.waitingQuestion && !msg.key.fromMe)) return [3 /*break*/, 12];
                console.log("[WaitQuestion/Queue] Processando resposta do ticket ".concat(ticket.id, ": \"").concat(body, "\""));
                console.log("[WaitQuestion/Queue] questionNodeId=".concat(ticket.questionNodeId, ", questionOptions="), JSON.stringify(ticket.questionOptions));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 10, , 11]);
                return [4 /*yield*/, WaitQuestionService_1["default"].processResponse(ticket.id, body)];
            case 3:
                response_2 = _a.sent();
                if (!response_2) return [3 /*break*/, 8];
                console.log("[WaitQuestion/Queue] Match encontrado: op\u00E7\u00E3o=".concat(response_2.option, ", action=").concat(response_2.action, ", nodeId=").concat(response_2.nodeId));
                return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                        where: { id: ticket.flowStopped }
                    })];
            case 4:
                flowWQ = _a.sent();
                console.log("[WaitQuestion/Queue] flowStopped=".concat(ticket.flowStopped, ", flowFound=").concat(!!flowWQ));
                if (!(flowWQ && flowWQ.flow)) return [3 /*break*/, 7];
                connectionsWQ = flowWQ.flow["connections"] || [];
                nodeConns = connectionsWQ.filter(function (conn) { return conn.source === response_2.nodeId; });
                console.log("[WaitQuestion/Queue] Conex\u00F5es do n\u00F3 ".concat(response_2.nodeId, ":"), JSON.stringify(nodeConns.map(function (c) { return ({ sourceHandle: c.sourceHandle, target: c.target }); })));
                handleToFind_1 = response_2.option;
                console.log("[WaitQuestion/Queue] Buscando handle: \"".concat(handleToFind_1, "\""));
                targetConnection = connectionsWQ.find(function (conn) {
                    return conn.source === response_2.nodeId &&
                        conn.sourceHandle === handleToFind_1;
                });
                if (!targetConnection) return [3 /*break*/, 6];
                console.log("[WaitQuestion/Queue] Conex\u00E3o encontrada! Target: ".concat(targetConnection.target));
                mountDataContact_1 = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, parseInt(ticket.flowStopped), ticket.companyId, flowWQ.flow["nodes"] || [], connectionsWQ, targetConnection.target, ticket.dataWebhook, "", "", body, ticket.id, mountDataContact_1, msg)];
            case 5:
                _a.sent();
                console.log("[WaitQuestion/Queue] Fluxo continuado para pr\u00F3ximo n\u00F3: ".concat(targetConnection.target));
                return [3 /*break*/, 7];
            case 6:
                console.log("[WaitQuestion/Queue] ERRO: Conex\u00E3o N\u00C3O encontrada para source=".concat(response_2.nodeId, " handle=").concat(handleToFind_1));
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                console.log("[WaitQuestion/Queue] Resposta n\u00E3o match com nenhuma op\u00E7\u00E3o: \"".concat(body, "\""));
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_16 = _a.sent();
                console.error("[WaitQuestion/Queue] Erro ao processar resposta:", error_16);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
            case 12: return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                    where: {
                        id: ticket.flowStopped
                    }
                })];
            case 13:
                flow = _a.sent();
                mountDataContact = {
                    number: contact.number,
                    name: contact.name,
                    email: contact.email
                };
                nodes = flow.flow["nodes"];
                connections = flow.flow["connections"];
                if (!!ticket.lastFlowId) return [3 /*break*/, 16];
                startNode_2 = nodes.find(function (n) { return n.type === "start"; });
                if (!startNode_2) {
                    logger_1["default"].error("Nó start não encontrado no fluxo");
                    return [2 /*return*/];
                }
                startConnection = connections.find(function (c) { return c.source === startNode_2.id; });
                if (!startConnection) {
                    logger_1["default"].error("Conexão do nó start não encontrada");
                    return [2 /*return*/];
                }
                // Atualizar ticket com o primeiro nó
                return [4 /*yield*/, ticket.update({
                        lastFlowId: startConnection.target
                    })];
            case 14:
                // Atualizar ticket com o primeiro nó
                _a.sent();
                // Executar o primeiro nó
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, parseInt(ticket.flowStopped), ticket.companyId, nodes, connections, startConnection.target, null, "", "", body, ticket.id, mountDataContact, msg || null)];
            case 15:
                // Executar o primeiro nó
                _a.sent();
                return [2 /*return*/];
            case 16:
                if (ticket.status === "closed" ||
                    ticket.status === "interrupted" ||
                    ticket.status === "open") {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp.id, parseInt(ticket.flowStopped), ticket.companyId, nodes, connections, ticket.lastFlowId, null, "", "", body, ticket.id, mountDataContact, msg || null)];
            case 17:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var handleMessage = function (msg, wbot, companyId, isImported) {
    if (isImported === void 0) { isImported = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var isGroupInHandle, isValidResult, msgIdKey, msgContact, groupContact_1, queueId_1, tagsId, userId_1, bodyMessage, msgType, hasMedia, shouldBlock, isGroup, whatsapp_2, grupoMeta, msgGroupContact, contact_1, unreadMessages_1, unreads, settings_1, enableLGPD, isFirstMsg, fromMeFixedContact, openTicket, effectiveContact_1, preReopenTicket, _a, wasClosedWithoutOwner, mutexKey, ticketMutex, ticket_1, aiMessageKey, botPauseKey, isAiMessage, pauseUntil, pauseUntil, pauseUntilNumber, bodyRollbackTag, bodyNextTag, rollbackTag, nextTag, ticketTag, tag, persistedMessage, msgKeyIdEdited, bodyEdited, io, messageToUpdate, err_6, ticketTraking_1, useLGPD, currentDate, e_1, isMsgForwarded, mediaSent_1, e_2, currentSchedule, whatsappHasOwnSchedules, dataLimite, Agora, outFlow, nodes, connections, mountDataContact, e_3, flow, isMenu, isOpenai, isQuestion, asaasState, body, nodes, connections, nodeSelected, mountDataContact, body, nodes, nodeSelected_1, connections, questionConfig, answerKey, oldDataWebhook, oldVariables, updatedWebhookData, outgoingConnection, nodeIndex, fallbackNode, nextFlowId, mountDataContact, nodes, nodeIndex, nodeSelected, cfg, openAiSettings_1, promptIdNumber, prompt_1, _b, name_2, prompt_2, voice, voiceKey, voiceRegion, maxTokens, temperature, apiKey, queueId_2, maxMessages, resolvedApiKey, wl, provider, toolsEnabled, error_17, prompt_3, toolsEnabled, error_18, integrations, integrations, flow_1, nodes, lastFlow, typebot, error_19, axiosError, _c, data, status_1, integrations, sentMessage, queue, dataLimite, Agora, outOfHoursMessage, body_7, debouncedSentMessage, e_4, err_7;
        var _d, _e;
        var _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147;
        return __generator(this, function (_148) {
            switch (_148.label) {
                case 0:
                    isGroupInHandle = (_f = msg.key.remoteJid) === null || _f === void 0 ? void 0 : _f.endsWith("@g.us");
                    // 🔍 LOG 5: Mensagem chegou no handleMessage
                    if (isGroupInHandle) {
                        console.log("🔍 [LOG 5 - HANDLE MESSAGE] Mensagem de grupo chegou no handleMessage", {
                            remoteJid: msg.key.remoteJid,
                            messageId: msg.key.id,
                            fromMe: msg.key.fromMe
                        });
                    }
                    console.log("log... 2874");
                    // Ignorar mensagens de newsletter
                    if (msg.key.remoteJid.includes("newsletter")) {
                        logger_1["default"].info("[newsletter] Ignorando mensagem de newsletter em handleMessage: ".concat(msg.key.remoteJid));
                        return [2 /*return*/];
                    }
                    isValidResult = isValidMsg(msg);
                    // 🔍 LOG 6: Verificar se mensagem é válida
                    if (isGroupInHandle) {
                        console.log("🔍 [LOG 6 - IS VALID MSG] Mensagem de grupo é válida?", {
                            isValid: isValidResult,
                            messageId: msg.key.id
                        });
                    }
                    if (!isValidResult) {
                        console.log("log... 2877");
                        if (isGroupInHandle) {
                            console.log("❌ [LOG 6] Mensagem de grupo REJEITADA por isValidMsg");
                        }
                        return [2 /*return*/];
                    }
                    msgIdKey = msg.key.id;
                    if (msgIdKey && processedMsgIds.has(msgIdKey)) {
                        console.log("[Dedup] Mensagem ".concat(msgIdKey, " j\u00E1 processada, ignorando duplicata."));
                        return [2 /*return*/];
                    }
                    if (msgIdKey)
                        processedMsgIds.set(msgIdKey, Date.now());
                    _148.label = 1;
                case 1:
                    _148.trys.push([1, 162, , 163]);
                    msgContact = void 0;
                    queueId_1 = null;
                    tagsId = null;
                    userId_1 = null;
                    bodyMessage = (0, exports.getBodyMessage)(msg);
                    msgType = getTypeMessage(msg);
                    console.log("log... 2891");
                    hasMedia = ((_g = msg.message) === null || _g === void 0 ? void 0 : _g.imageMessage) ||
                        ((_h = msg.message) === null || _h === void 0 ? void 0 : _h.audioMessage) ||
                        ((_j = msg.message) === null || _j === void 0 ? void 0 : _j.videoMessage) ||
                        ((_k = msg.message) === null || _k === void 0 ? void 0 : _k.stickerMessage) ||
                        ((_l = msg.message) === null || _l === void 0 ? void 0 : _l.documentMessage) ||
                        ((_p = (_o = (_m = msg.message) === null || _m === void 0 ? void 0 : _m.documentWithCaptionMessage) === null || _o === void 0 ? void 0 : _o.message) === null || _p === void 0 ? void 0 : _p.documentMessage) ||
                        (
                        // msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage ||
                        // msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage ||
                        // msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage ||
                        (_s = (_r = (_q = msg.message) === null || _q === void 0 ? void 0 : _q.ephemeralMessage) === null || _r === void 0 ? void 0 : _r.message) === null || _s === void 0 ? void 0 : _s.audioMessage) ||
                        ((_v = (_u = (_t = msg.message) === null || _t === void 0 ? void 0 : _t.ephemeralMessage) === null || _u === void 0 ? void 0 : _u.message) === null || _v === void 0 ? void 0 : _v.documentMessage) ||
                        ((_y = (_x = (_w = msg.message) === null || _w === void 0 ? void 0 : _w.ephemeralMessage) === null || _x === void 0 ? void 0 : _x.message) === null || _y === void 0 ? void 0 : _y.videoMessage) ||
                        ((_1 = (_0 = (_z = msg.message) === null || _z === void 0 ? void 0 : _z.ephemeralMessage) === null || _0 === void 0 ? void 0 : _0.message) === null || _1 === void 0 ? void 0 : _1.stickerMessage) ||
                        ((_4 = (_3 = (_2 = msg.message) === null || _2 === void 0 ? void 0 : _2.ephemeralMessage) === null || _3 === void 0 ? void 0 : _3.message) === null || _4 === void 0 ? void 0 : _4.imageMessage) ||
                        ((_7 = (_6 = (_5 = msg.message) === null || _5 === void 0 ? void 0 : _5.viewOnceMessage) === null || _6 === void 0 ? void 0 : _6.message) === null || _7 === void 0 ? void 0 : _7.imageMessage) ||
                        ((_10 = (_9 = (_8 = msg.message) === null || _8 === void 0 ? void 0 : _8.viewOnceMessage) === null || _9 === void 0 ? void 0 : _9.message) === null || _10 === void 0 ? void 0 : _10.videoMessage) ||
                        ((_13 = (_12 = (_11 = msg.message) === null || _11 === void 0 ? void 0 : _11.viewOnceMessageV2) === null || _12 === void 0 ? void 0 : _12.message) === null || _13 === void 0 ? void 0 : _13.imageMessage) ||
                        ((_16 = (_15 = (_14 = msg.message) === null || _14 === void 0 ? void 0 : _14.viewOnceMessageV2) === null || _15 === void 0 ? void 0 : _15.message) === null || _16 === void 0 ? void 0 : _16.videoMessage) ||
                        ((_19 = (_18 = (_17 = msg.message) === null || _17 === void 0 ? void 0 : _17.viewOnceMessageV2) === null || _18 === void 0 ? void 0 : _18.message) === null || _19 === void 0 ? void 0 : _19.audioMessage) ||
                        ((_22 = (_21 = (_20 = msg.message) === null || _20 === void 0 ? void 0 : _20.viewOnceMessageV2) === null || _21 === void 0 ? void 0 : _21.message) === null || _22 === void 0 ? void 0 : _22.documentMessage) ||
                        ((_27 = (_26 = (_25 = (_24 = (_23 = msg.message) === null || _23 === void 0 ? void 0 : _23.ephemeralMessage) === null || _24 === void 0 ? void 0 : _24.message) === null || _25 === void 0 ? void 0 : _25.viewOnceMessage) === null || _26 === void 0 ? void 0 : _26.message) === null || _27 === void 0 ? void 0 : _27.imageMessage) ||
                        ((_32 = (_31 = (_30 = (_29 = (_28 = msg.message) === null || _28 === void 0 ? void 0 : _28.ephemeralMessage) === null || _29 === void 0 ? void 0 : _29.message) === null || _30 === void 0 ? void 0 : _30.viewOnceMessage) === null || _31 === void 0 ? void 0 : _31.message) === null || _32 === void 0 ? void 0 : _32.videoMessage) ||
                        ((_37 = (_36 = (_35 = (_34 = (_33 = msg.message) === null || _33 === void 0 ? void 0 : _33.ephemeralMessage) === null || _34 === void 0 ? void 0 : _34.message) === null || _35 === void 0 ? void 0 : _35.viewOnceMessage) === null || _36 === void 0 ? void 0 : _36.message) === null || _37 === void 0 ? void 0 : _37.audioMessage) ||
                        ((_42 = (_41 = (_40 = (_39 = (_38 = msg.message) === null || _38 === void 0 ? void 0 : _38.ephemeralMessage) === null || _39 === void 0 ? void 0 : _39.message) === null || _40 === void 0 ? void 0 : _40.viewOnceMessage) === null || _41 === void 0 ? void 0 : _41.message) === null || _42 === void 0 ? void 0 : _42.documentMessage) ||
                        ((_47 = (_46 = (_45 = (_44 = (_43 = msg.message) === null || _43 === void 0 ? void 0 : _43.ephemeralMessage) === null || _44 === void 0 ? void 0 : _44.message) === null || _45 === void 0 ? void 0 : _45.viewOnceMessageV2) === null || _46 === void 0 ? void 0 : _46.message) === null || _47 === void 0 ? void 0 : _47.imageMessage) ||
                        ((_52 = (_51 = (_50 = (_49 = (_48 = msg.message) === null || _48 === void 0 ? void 0 : _48.ephemeralMessage) === null || _49 === void 0 ? void 0 : _49.message) === null || _50 === void 0 ? void 0 : _50.viewOnceMessageV2) === null || _51 === void 0 ? void 0 : _51.message) === null || _52 === void 0 ? void 0 : _52.videoMessage) ||
                        ((_57 = (_56 = (_55 = (_54 = (_53 = msg.message) === null || _53 === void 0 ? void 0 : _53.ephemeralMessage) === null || _54 === void 0 ? void 0 : _54.message) === null || _55 === void 0 ? void 0 : _55.viewOnceMessageV2) === null || _56 === void 0 ? void 0 : _56.message) === null || _57 === void 0 ? void 0 : _57.audioMessage) ||
                        ((_62 = (_61 = (_60 = (_59 = (_58 = msg.message) === null || _58 === void 0 ? void 0 : _58.ephemeralMessage) === null || _59 === void 0 ? void 0 : _59.message) === null || _60 === void 0 ? void 0 : _60.viewOnceMessageV2) === null || _61 === void 0 ? void 0 : _61.message) === null || _62 === void 0 ? void 0 : _62.documentMessage) ||
                        ((_65 = (_64 = (_63 = msg.message) === null || _63 === void 0 ? void 0 : _63.documentWithCaptionMessage) === null || _64 === void 0 ? void 0 : _64.message) === null || _65 === void 0 ? void 0 : _65.documentMessage) ||
                        ((_68 = (_67 = (_66 = msg.message) === null || _66 === void 0 ? void 0 : _66.templateMessage) === null || _67 === void 0 ? void 0 : _67.hydratedTemplate) === null || _68 === void 0 ? void 0 : _68.imageMessage) ||
                        ((_71 = (_70 = (_69 = msg.message) === null || _69 === void 0 ? void 0 : _69.templateMessage) === null || _70 === void 0 ? void 0 : _70.hydratedTemplate) === null || _71 === void 0 ? void 0 : _71.documentMessage) ||
                        ((_74 = (_73 = (_72 = msg.message) === null || _72 === void 0 ? void 0 : _72.templateMessage) === null || _73 === void 0 ? void 0 : _73.hydratedTemplate) === null || _74 === void 0 ? void 0 : _74.videoMessage) ||
                        ((_77 = (_76 = (_75 = msg.message) === null || _75 === void 0 ? void 0 : _75.templateMessage) === null || _76 === void 0 ? void 0 : _76.hydratedFourRowTemplate) === null || _77 === void 0 ? void 0 : _77.imageMessage) ||
                        ((_80 = (_79 = (_78 = msg.message) === null || _78 === void 0 ? void 0 : _78.templateMessage) === null || _79 === void 0 ? void 0 : _79.hydratedFourRowTemplate) === null || _80 === void 0 ? void 0 : _80.documentMessage) ||
                        ((_83 = (_82 = (_81 = msg.message) === null || _81 === void 0 ? void 0 : _81.templateMessage) === null || _82 === void 0 ? void 0 : _82.hydratedFourRowTemplate) === null || _83 === void 0 ? void 0 : _83.videoMessage) ||
                        ((_86 = (_85 = (_84 = msg.message) === null || _84 === void 0 ? void 0 : _84.templateMessage) === null || _85 === void 0 ? void 0 : _85.fourRowTemplate) === null || _86 === void 0 ? void 0 : _86.imageMessage) ||
                        ((_89 = (_88 = (_87 = msg.message) === null || _87 === void 0 ? void 0 : _87.templateMessage) === null || _88 === void 0 ? void 0 : _88.fourRowTemplate) === null || _89 === void 0 ? void 0 : _89.documentMessage) ||
                        ((_92 = (_91 = (_90 = msg.message) === null || _90 === void 0 ? void 0 : _90.templateMessage) === null || _91 === void 0 ? void 0 : _91.fourRowTemplate) === null || _92 === void 0 ? void 0 : _92.videoMessage) ||
                        ((_95 = (_94 = (_93 = msg.message) === null || _93 === void 0 ? void 0 : _93.interactiveMessage) === null || _94 === void 0 ? void 0 : _94.header) === null || _95 === void 0 ? void 0 : _95.imageMessage) ||
                        ((_98 = (_97 = (_96 = msg.message) === null || _96 === void 0 ? void 0 : _96.interactiveMessage) === null || _97 === void 0 ? void 0 : _97.header) === null || _98 === void 0 ? void 0 : _98.documentMessage) ||
                        ((_101 = (_100 = (_99 = msg.message) === null || _99 === void 0 ? void 0 : _99.interactiveMessage) === null || _100 === void 0 ? void 0 : _100.header) === null || _101 === void 0 ? void 0 : _101.videoMessage) ||
                        ((_105 = (_104 = (_103 = (_102 = msg.message) === null || _102 === void 0 ? void 0 : _102.highlyStructuredMessage) === null || _103 === void 0 ? void 0 : _103.hydratedHsm) === null || _104 === void 0 ? void 0 : _104.hydratedTemplate) === null || _105 === void 0 ? void 0 : _105.documentMessage) ||
                        ((_109 = (_108 = (_107 = (_106 = msg.message) === null || _106 === void 0 ? void 0 : _106.highlyStructuredMessage) === null || _107 === void 0 ? void 0 : _107.hydratedHsm) === null || _108 === void 0 ? void 0 : _108.hydratedTemplate) === null || _109 === void 0 ? void 0 : _109.videoMessage) ||
                        ((_113 = (_112 = (_111 = (_110 = msg.message) === null || _110 === void 0 ? void 0 : _110.highlyStructuredMessage) === null || _111 === void 0 ? void 0 : _111.hydratedHsm) === null || _112 === void 0 ? void 0 : _112.hydratedTemplate) === null || _113 === void 0 ? void 0 : _113.imageMessage) ||
                        ((_117 = (_116 = (_115 = (_114 = msg.message) === null || _114 === void 0 ? void 0 : _114.highlyStructuredMessage) === null || _115 === void 0 ? void 0 : _115.hydratedHsm) === null || _116 === void 0 ? void 0 : _116.hydratedTemplate) === null || _117 === void 0 ? void 0 : _117.locationMessage);
                    if (!msg.key.fromMe) return [3 /*break*/, 3];
                    if (/\u200e/.test(bodyMessage)) {
                        if (isGroupInHandle) {
                            console.log("❌ [LOG 7] Mensagem de grupo BLOQUEADA por caractere especial \u200e");
                        }
                        return [2 /*return*/];
                    }
                    console.log("log... 2935");
                    shouldBlock = !hasMedia &&
                        msgType !== "conversation" &&
                        msgType !== "extendedTextMessage" &&
                        msgType !== "contactMessage" &&
                        msgType !== "reactionMessage" &&
                        msgType !== "ephemeralMessage" &&
                        msgType !== "protocolMessage" &&
                        msgType !== "viewOnceMessage" &&
                        msgType !== "viewOnceMessageV2" &&
                        msgType !== "editedMessage" &&
                        msgType !== "hydratedContentText";
                    // 🔍 LOG 7: Verificar se mensagem fromMe será bloqueada
                    if (isGroupInHandle && shouldBlock) {
                        console.log("❌ [LOG 7] Mensagem de grupo BLOQUEADA por tipo de mensagem fromMe", {
                            hasMedia: hasMedia,
                            msgType: msgType,
                            messageId: msg.key.id
                        });
                    }
                    if (shouldBlock)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContactMessage(msg, wbot)];
                case 2:
                    msgContact = _148.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, getContactMessage(msg, wbot)];
                case 4:
                    msgContact = _148.sent();
                    _148.label = 5;
                case 5:
                    isGroup = (_118 = msg.key.remoteJid) === null || _118 === void 0 ? void 0 : _118.endsWith("@g.us");
                    return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(wbot.id, companyId)];
                case 6:
                    whatsapp_2 = _148.sent();
                    console.log("log... 2961");
                    if (!isGroup) return [3 /*break*/, 9];
                    console.log("🔵 [GRUPO] Mensagem de grupo detectada!");
                    console.log("🔵 [GRUPO] Remote JID:", msg.key.remoteJid);
                    return [4 /*yield*/, wbot.groupMetadata(msg.key.remoteJid)];
                case 7:
                    grupoMeta = _148.sent();
                    console.log("🔵 [GRUPO] Metadados do grupo:", {
                        id: grupoMeta.id,
                        nome: grupoMeta.subject,
                        participantes: (_119 = grupoMeta.participants) === null || _119 === void 0 ? void 0 : _119.length
                    });
                    msgGroupContact = {
                        id: grupoMeta.id,
                        name: grupoMeta.subject
                    };
                    return [4 /*yield*/, verifyContact(msgGroupContact, wbot, companyId, null)];
                case 8:
                    groupContact_1 = _148.sent();
                    console.log("✅ [GRUPO] Contato do grupo criado/atualizado:", {
                        id: groupContact_1.id,
                        nome: groupContact_1.name,
                        isGroup: groupContact_1.isGroup
                    });
                    _148.label = 9;
                case 9: return [4 /*yield*/, verifyContact(msgContact, wbot, companyId, msg)];
                case 10:
                    contact_1 = _148.sent();
                    unreadMessages_1 = 0;
                    if (!msg.key.fromMe) return [3 /*break*/, 12];
                    console.log("log... 2980");
                    return [4 /*yield*/, cache_1["default"].set("contacts:".concat(contact_1.id, ":unreads"), "0")];
                case 11:
                    _148.sent();
                    return [3 /*break*/, 15];
                case 12:
                    console.log("log... 2983");
                    return [4 /*yield*/, cache_1["default"].get("contacts:".concat(contact_1.id, ":unreads"))];
                case 13:
                    unreads = _148.sent();
                    unreadMessages_1 = +unreads + 1;
                    return [4 /*yield*/, cache_1["default"].set("contacts:".concat(contact_1.id, ":unreads"), "".concat(unreadMessages_1))];
                case 14:
                    _148.sent();
                    _148.label = 15;
                case 15: return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: {
                            companyId: companyId
                        }
                    })];
                case 16:
                    settings_1 = (_148.sent()) || {};
                    enableLGPD = settings_1.enableLGPD;
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: groupContact_1 ? groupContact_1.id : contact_1.id,
                                companyId: companyId,
                                whatsappId: whatsapp_2.id
                            },
                            order: [["id", "DESC"]]
                        })];
                case 17:
                    isFirstMsg = _148.sent();
                    fromMeFixedContact = null;
                    if (!msg.key.fromMe) return [3 /*break*/, 20];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: {
                                contactId: groupContact_1 ? groupContact_1.id : contact_1.id,
                                companyId: companyId,
                                whatsappId: whatsapp_2.id,
                                status: (_d = {}, _d[sequelize_1.Op.or] = ["open", "pending", "group", "nps", "lgpd"], _d)
                            },
                            order: [["updatedAt", "DESC"]]
                        })];
                case 18:
                    openTicket = _148.sent();
                    if (!(openTicket && openTicket.contactId !== contact_1.id)) return [3 /*break*/, 20];
                    return [4 /*yield*/, Contact_1["default"].findByPk(openTicket.contactId)];
                case 19:
                    fromMeFixedContact = _148.sent();
                    _148.label = 20;
                case 20:
                    effectiveContact_1 = fromMeFixedContact || contact_1;
                    if (!!msg.key.fromMe) return [3 /*break*/, 22];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: { contactId: groupContact_1 ? groupContact_1.id : contact_1.id, companyId: companyId, whatsappId: whatsapp_2.id },
                            attributes: ["id", "status", "userId", "queueId"],
                            order: [["updatedAt", "DESC"]]
                        })];
                case 21:
                    _a = _148.sent();
                    return [3 /*break*/, 23];
                case 22:
                    _a = null;
                    _148.label = 23;
                case 23:
                    preReopenTicket = _a;
                    wasClosedWithoutOwner = (preReopenTicket === null || preReopenTicket === void 0 ? void 0 : preReopenTicket.status) === "closed"
                        && !(preReopenTicket === null || preReopenTicket === void 0 ? void 0 : preReopenTicket.userId)
                        && !(preReopenTicket === null || preReopenTicket === void 0 ? void 0 : preReopenTicket.queueId);
                    mutexKey = "".concat(companyId, ":").concat(groupContact_1 ? groupContact_1.id : contact_1.id, ":").concat(whatsapp_2.id);
                    ticketMutex = getTicketMutex(mutexKey);
                    return [4 /*yield*/, ticketMutex.runExclusive(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(effectiveContact_1, whatsapp_2, unreadMessages_1, companyId, queueId_1, userId_1, groupContact_1, "whatsapp", isImported, false, settings_1)];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })];
                case 24:
                    ticket_1 = _148.sent();
                    if (!ticketMutex.isLocked()) {
                        ticketMutexes["delete"](mutexKey);
                    }
                    if (!wasClosedWithoutOwner) return [3 /*break*/, 28];
                    // Limpa estado do fluxo anterior para iniciar do zero
                    return [4 /*yield*/, ticket_1.update({ flowStopped: null, lastFlowId: null, flowWebhook: false, dataWebhook: null })];
                case 25:
                    // Limpa estado do fluxo anterior para iniciar do zero
                    _148.sent();
                    return [4 /*yield*/, ticket_1.reload({ include: [{ model: Whatsapp_1["default"], as: "whatsapp" }] })];
                case 26:
                    _148.sent();
                    return [4 /*yield*/, triggerReopenFlow(ticket_1, ticket_1.whatsapp, contact_1, msg)];
                case 27:
                    _148.sent();
                    _148.label = 28;
                case 28:
                    aiMessageKey = "tickets:".concat(ticket_1.id, ":aiMessage:").concat(msg.key.id);
                    botPauseKey = "tickets:".concat(ticket_1.id, ":botPauseUntil");
                    if (!msg.key.fromMe) return [3 /*break*/, 35];
                    return [4 /*yield*/, cache_1["default"].get(aiMessageKey)];
                case 29:
                    isAiMessage = _148.sent();
                    if (!isAiMessage) return [3 /*break*/, 31];
                    return [4 /*yield*/, cache_1["default"].del(aiMessageKey)];
                case 30:
                    _148.sent();
                    return [3 /*break*/, 34];
                case 31:
                    pauseUntil = (0, date_fns_1.add)(new Date(), { minutes: 30 }).getTime();
                    return [4 /*yield*/, cache_1["default"].set(botPauseKey, pauseUntil.toString(), "EX", 60 * 60)];
                case 32:
                    _148.sent();
                    if (!ticket_1.isBot) return [3 /*break*/, 34];
                    return [4 /*yield*/, ticket_1.update({ isBot: false })];
                case 33:
                    _148.sent();
                    ticket_1.isBot = false;
                    _148.label = 34;
                case 34: return [3 /*break*/, 39];
                case 35: return [4 /*yield*/, cache_1["default"].get(botPauseKey)];
                case 36:
                    pauseUntil = _148.sent();
                    if (!pauseUntil) return [3 /*break*/, 39];
                    pauseUntilNumber = Number(pauseUntil);
                    if (!!Number.isNaN(pauseUntilNumber)) return [3 /*break*/, 39];
                    if (!(Date.now() >= pauseUntilNumber)) return [3 /*break*/, 39];
                    return [4 /*yield*/, cache_1["default"].del(botPauseKey)];
                case 37:
                    _148.sent();
                    if (!(!ticket_1.userId && !ticket_1.isBot)) return [3 /*break*/, 39];
                    return [4 /*yield*/, ticket_1.update({ isBot: true })];
                case 38:
                    _148.sent();
                    ticket_1.isBot = true;
                    _148.label = 39;
                case 39:
                    bodyRollbackTag = "";
                    bodyNextTag = "";
                    rollbackTag = void 0;
                    nextTag = void 0;
                    ticketTag = undefined;
                    if (!((_121 = (_120 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.company) === null || _120 === void 0 ? void 0 : _120.plan) === null || _121 === void 0 ? void 0 : _121.useKanban)) return [3 /*break*/, 45];
                    return [4 /*yield*/, TicketTag_1["default"].findOne({
                            where: {
                                ticketId: ticket_1.id
                            }
                        })];
                case 40:
                    ticketTag = _148.sent();
                    if (!ticketTag) return [3 /*break*/, 45];
                    return [4 /*yield*/, Tag_1["default"].findByPk(ticketTag.tagId)];
                case 41:
                    tag = _148.sent();
                    console.log("log... 3033");
                    if (!tag.nextLaneId) return [3 /*break*/, 43];
                    return [4 /*yield*/, Tag_1["default"].findByPk(tag.nextLaneId)];
                case 42:
                    nextTag = _148.sent();
                    console.log("log... 3036");
                    bodyNextTag = nextTag.greetingMessageLane;
                    _148.label = 43;
                case 43:
                    if (!tag.rollbackLaneId) return [3 /*break*/, 45];
                    return [4 /*yield*/, Tag_1["default"].findByPk(tag.rollbackLaneId)];
                case 44:
                    rollbackTag = _148.sent();
                    console.log("log... 3041");
                    bodyRollbackTag = rollbackTag.greetingMessageLane;
                    _148.label = 45;
                case 45:
                    if (ticket_1.status === "closed" ||
                        (unreadMessages_1 === 0 &&
                            whatsapp_2.complationMessage &&
                            (0, Mustache_1["default"])(whatsapp_2.complationMessage, ticket_1) === bodyMessage)) {
                        return [2 /*return*/];
                    }
                    if (!(rollbackTag &&
                        (0, Mustache_1["default"])(bodyNextTag, ticket_1) !== bodyMessage &&
                        (0, Mustache_1["default"])(bodyRollbackTag, ticket_1) !== bodyMessage)) return [3 /*break*/, 48];
                    return [4 /*yield*/, TicketTag_1["default"].destroy({
                            where: { ticketId: ticket_1.id, tagId: ticketTag.tagId }
                        })];
                case 46:
                    _148.sent();
                    return [4 /*yield*/, TicketTag_1["default"].create({ ticketId: ticket_1.id, tagId: rollbackTag.id })];
                case 47:
                    _148.sent();
                    _148.label = 48;
                case 48:
                    persistedMessage = void 0;
                    if (!isImported) return [3 /*break*/, 50];
                    console.log("log... 3063");
                    return [4 /*yield*/, ticket_1.update({
                            queueId: whatsapp_2.queueIdImportMessages
                        })];
                case 49:
                    _148.sent();
                    _148.label = 50;
                case 50:
                    if (!(msgType === "editedMessage" || msgType === "protocolMessage")) return [3 /*break*/, 57];
                    msgKeyIdEdited = msgType === "editedMessage"
                        ? msg.message.editedMessage.message.protocolMessage.key.id
                        : (_122 = msg.message) === null || _122 === void 0 ? void 0 : _122.protocolMessage.key.id;
                    bodyEdited = findCaption(msg.message);
                    console.log("log... 3075");
                    io = (0, socket_1.getIO)();
                    _148.label = 51;
                case 51:
                    _148.trys.push([51, 55, , 56]);
                    return [4 /*yield*/, Message_1["default"].findOne({
                            where: {
                                wid: msgKeyIdEdited,
                                companyId: companyId,
                                ticketId: ticket_1.id
                            }
                        })];
                case 52:
                    messageToUpdate = _148.sent();
                    if (!messageToUpdate)
                        return [2 /*return*/];
                    return [4 /*yield*/, messageToUpdate.update({ isEdited: true, body: bodyEdited })];
                case 53:
                    _148.sent();
                    return [4 /*yield*/, ticket_1.update({ lastMessage: bodyEdited })];
                case 54:
                    _148.sent();
                    console.log("log... 3094");
                    io.of(String(companyId))
                        // .to(String(ticket.id))
                        .emit("company-".concat(companyId, "-appMessage"), {
                        action: "update",
                        message: messageToUpdate
                    });
                    io.of(String(companyId))
                        // .to(ticket.status)
                        // .to("notification")
                        // .to(String(ticket.id))
                        .emit("company-".concat(companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket_1
                    });
                    return [3 /*break*/, 56];
                case 55:
                    err_6 = _148.sent();
                    Sentry.captureException(err_6);
                    logger_1["default"].error("Error handling message ack. Err: ".concat(err_6));
                    return [3 /*break*/, 56];
                case 56: return [2 /*return*/];
                case 57: return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                        ticketId: ticket_1.id,
                        companyId: companyId,
                        userId: userId_1,
                        whatsappId: whatsapp_2 === null || whatsapp_2 === void 0 ? void 0 : whatsapp_2.id
                    })];
                case 58:
                    ticketTraking_1 = _148.sent();
                    useLGPD = false;
                    _148.label = 59;
                case 59:
                    _148.trys.push([59, 65, , 66]);
                    if (!!msg.key.fromMe) return [3 /*break*/, 64];
                    //MENSAGEM DE FÉRIAS COLETIVAS
                    console.log("log... 3131");
                    if (!!(0, lodash_1.isNil)(whatsapp_2.collectiveVacationMessage && !isGroup)) return [3 /*break*/, 64];
                    currentDate = (0, moment_1["default"])();
                    console.log("log... 3136");
                    if (!currentDate.isBetween((0, moment_1["default"])(whatsapp_2.collectiveVacationStart), (0, moment_1["default"])(whatsapp_2.collectiveVacationEnd))) return [3 /*break*/, 64];
                    console.log("log... 3140");
                    if (!hasMedia) return [3 /*break*/, 61];
                    console.log("log... 3144");
                    return [4 /*yield*/, (0, exports.verifyMediaMessage)(msg, ticket_1, contact_1, ticketTraking_1, false, false, wbot)];
                case 60:
                    _148.sent();
                    return [3 /*break*/, 63];
                case 61:
                    console.log("log... 3148");
                    return [4 /*yield*/, (0, exports.verifyMessage)(msg, ticket_1, contact_1, ticketTraking_1)];
                case 62:
                    _148.sent();
                    _148.label = 63;
                case 63:
                    console.log("log... 3152");
                    wbot.sendMessage(contact_1.remoteJid, {
                        text: whatsapp_2.collectiveVacationMessage
                    });
                    return [2 /*return*/];
                case 64: return [3 /*break*/, 66];
                case 65:
                    e_1 = _148.sent();
                    Sentry.captureException(e_1);
                    console.log(e_1);
                    return [3 /*break*/, 66];
                case 66:
                    isMsgForwarded = ((_125 = (_124 = (_123 = msg.message) === null || _123 === void 0 ? void 0 : _123.extendedTextMessage) === null || _124 === void 0 ? void 0 : _124.contextInfo) === null || _125 === void 0 ? void 0 : _125.isForwarded) ||
                        ((_128 = (_127 = (_126 = msg.message) === null || _126 === void 0 ? void 0 : _126.imageMessage) === null || _127 === void 0 ? void 0 : _127.contextInfo) === null || _128 === void 0 ? void 0 : _128.isForwarded) ||
                        ((_131 = (_130 = (_129 = msg.message) === null || _129 === void 0 ? void 0 : _129.audioMessage) === null || _130 === void 0 ? void 0 : _130.contextInfo) === null || _131 === void 0 ? void 0 : _131.isForwarded) ||
                        ((_134 = (_133 = (_132 = msg.message) === null || _132 === void 0 ? void 0 : _132.videoMessage) === null || _133 === void 0 ? void 0 : _133.contextInfo) === null || _134 === void 0 ? void 0 : _134.isForwarded) ||
                        ((_137 = (_136 = (_135 = msg.message) === null || _135 === void 0 ? void 0 : _135.documentMessage) === null || _136 === void 0 ? void 0 : _136.contextInfo) === null || _137 === void 0 ? void 0 : _137.isForwarded);
                    if (!!useLGPD) return [3 /*break*/, 70];
                    console.log("log... 3391");
                    if (!hasMedia) return [3 /*break*/, 68];
                    console.log("log... 3393");
                    return [4 /*yield*/, (0, exports.verifyMediaMessage)(msg, ticket_1, contact_1, ticketTraking_1, isMsgForwarded, false, wbot)];
                case 67:
                    mediaSent_1 = _148.sent();
                    persistedMessage = mediaSent_1;
                    return [3 /*break*/, 70];
                case 68:
                    console.log("log... 3396");
                    return [4 /*yield*/, (0, exports.verifyMessage)(msg, ticket_1, contact_1, ticketTraking_1, false, isMsgForwarded)];
                case 69:
                    persistedMessage = _148.sent();
                    _148.label = 70;
                case 70:
                    try {
                        if (!msg.key.fromMe) {
                            console.log("log... 3226");
                            console.log("log... 3227", { ticketTraking: ticketTraking_1 });
                            if (ticketTraking_1 !== null && (0, exports.verifyRating)(ticketTraking_1)) {
                                (0, exports.handleRating)(parseFloat(bodyMessage), ticket_1, ticketTraking_1);
                                return [2 /*return*/];
                            }
                        }
                    }
                    catch (e) {
                        Sentry.captureException(e);
                        console.log(e);
                    }
                    _148.label = 71;
                case 71:
                    _148.trys.push([71, 73, , 74]);
                    console.log("log... 3258");
                    return [4 /*yield*/, ticket_1.update({
                            fromMe: msg.key.fromMe
                        })];
                case 72:
                    _148.sent();
                    return [3 /*break*/, 74];
                case 73:
                    e_2 = _148.sent();
                    Sentry.captureException(e_2);
                    console.log(e_2);
                    return [3 /*break*/, 74];
                case 74:
                    currentSchedule = void 0;
                    whatsappHasOwnSchedules = Array.isArray(whatsapp_2.schedules) && whatsapp_2.schedules.length > 0;
                    if (!whatsappHasOwnSchedules) return [3 /*break*/, 76];
                    return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, 0, whatsapp_2.id)];
                case 75:
                    currentSchedule = _148.sent();
                    return [3 /*break*/, 80];
                case 76:
                    if (!(settings_1.scheduleType === "company")) return [3 /*break*/, 78];
                    console.log("log... 3270");
                    return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, 0, 0)];
                case 77:
                    currentSchedule = _148.sent();
                    return [3 /*break*/, 80];
                case 78:
                    if (!(settings_1.scheduleType === "connection")) return [3 /*break*/, 80];
                    console.log("log... 3273");
                    return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, 0, whatsapp_2.id)];
                case 79:
                    currentSchedule = _148.sent();
                    _148.label = 80;
                case 80:
                    _148.trys.push([80, 95, , 96]);
                    if (!(!msg.key.fromMe &&
                        settings_1.scheduleType &&
                        (!ticket_1.isGroup || whatsapp_2.groupAsTicket === "enabled") &&
                        !["open", "group"].includes(ticket_1.status))) return [3 /*break*/, 94];
                    /**
                     * Tratamento para envio de mensagem quando a empresa está fora do expediente
                     */
                    console.log("log... 3280");
                    if (!((whatsappHasOwnSchedules ||
                        settings_1.scheduleType === "company" ||
                        settings_1.scheduleType === "connection") &&
                        (!currentSchedule || currentSchedule.inActivity === false))) return [3 /*break*/, 93];
                    console.log("log... 3289");
                    if (whatsapp_2.maxUseBotQueues &&
                        whatsapp_2.maxUseBotQueues !== 0 &&
                        ticket_1.amountUsedBotQueues >= whatsapp_2.maxUseBotQueues) {
                        // await UpdateTicketService({
                        //   ticketData: { queueId: queues[0].id },
                        //   ticketId: ticket.id
                        // });
                        return [2 /*return*/];
                    }
                    if (!(whatsapp_2.timeUseBotQueues !== "0")) return [3 /*break*/, 85];
                    console.log("log... 3300");
                    if (!(ticket_1.isOutOfHour === false &&
                        ticketTraking_1.chatbotAt !== null)) return [3 /*break*/, 83];
                    console.log("log... 3302");
                    return [4 /*yield*/, ticketTraking_1.update({
                            chatbotAt: null
                        })];
                case 81:
                    _148.sent();
                    return [4 /*yield*/, ticket_1.update({
                            amountUsedBotQueues: 0
                        })];
                case 82:
                    _148.sent();
                    _148.label = 83;
                case 83:
                    dataLimite = new Date();
                    Agora = new Date();
                    if (ticketTraking_1.chatbotAt !== null) {
                        dataLimite.setMinutes(ticketTraking_1.chatbotAt.getMinutes() +
                            Number(whatsapp_2.timeUseBotQueues));
                        console.log("log... 3318");
                        if (ticketTraking_1.chatbotAt !== null &&
                            Agora < dataLimite &&
                            whatsapp_2.timeUseBotQueues !== "0" &&
                            ticket_1.amountUsedBotQueues !== 0) {
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, ticketTraking_1.update({
                            chatbotAt: null
                        })];
                case 84:
                    _148.sent();
                    _148.label = 85;
                case 85: 
                //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                return [4 /*yield*/, ticket_1.update({
                        isOutOfHour: true,
                        amountUsedBotQueues: ticket_1.amountUsedBotQueues + 1
                    })];
                case 86:
                    //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                    _148.sent();
                    if (!(whatsappHasOwnSchedules || settings_1.scheduleType === "connection")) return [3 /*break*/, 92];
                    if (!whatsapp_2.outOfHoursFlowId) return [3 /*break*/, 90];
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: whatsapp_2.outOfHoursFlowId } })];
                case 87:
                    outFlow = _148.sent();
                    if (!outFlow) return [3 /*break*/, 89];
                    nodes = outFlow.flow["nodes"];
                    connections = outFlow.flow["connections"];
                    mountDataContact = { number: contact_1.number, name: contact_1.name, email: contact_1.email };
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp_2.id, whatsapp_2.outOfHoursFlowId, ticket_1.companyId, nodes, connections, outFlow.flow["nodes"][0].id, null, "", "", null, ticket_1.id, mountDataContact, msg || null)];
                case 88:
                    _148.sent();
                    return [2 /*return*/];
                case 89: return [3 /*break*/, 92];
                case 90:
                    if (!whatsapp_2.outOfHoursQueueId) return [3 /*break*/, 92];
                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                            ticketData: { queueId: whatsapp_2.outOfHoursQueueId, status: "pending" },
                            ticketId: ticket_1.id,
                            companyId: companyId
                        })];
                case 91:
                    _148.sent();
                    return [2 /*return*/];
                case 92: return [2 /*return*/];
                case 93:
                    console.log("a56cas32ca3651svf");
                    _148.label = 94;
                case 94:
                    console.log("165132as");
                    return [3 /*break*/, 96];
                case 95:
                    e_3 = _148.sent();
                    console.log("DEU CATCH!");
                    Sentry.captureException(e_3);
                    console.log(e_3);
                    return [3 /*break*/, 96];
                case 96:
                    console.log("log... 4444444");
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                id: ticket_1.flowStopped
                            }
                        })];
                case 97:
                    flow = _148.sent();
                    isMenu = false;
                    isOpenai = false;
                    isQuestion = false;
                    if (flow) {
                        isMenu =
                            ((_138 = flow.flow["nodes"].find(function (node) { return node.id === ticket_1.lastFlowId; })) === null || _138 === void 0 ? void 0 : _138.type) === "menu";
                        isOpenai =
                            ((_139 = flow.flow["nodes"].find(function (node) { return node.id === ticket_1.lastFlowId; })) === null || _139 === void 0 ? void 0 : _139.type) === "openai";
                        isQuestion =
                            ((_140 = flow.flow["nodes"].find(function (node) { return node.id === ticket_1.lastFlowId; })) === null || _140 === void 0 ? void 0 : _140.type) === "question";
                    }
                    asaasState = (_141 = ticket_1.dataWebhook) === null || _141 === void 0 ? void 0 : _141.asaasState;
                    if (!(!(0, lodash_1.isNil)(flow) &&
                        (asaasState === null || asaasState === void 0 ? void 0 : asaasState.awaiting) === true &&
                        (asaasState === null || asaasState === void 0 ? void 0 : asaasState.nodeId) === ticket_1.lastFlowId &&
                        !msg.key.fromMe)) return [3 /*break*/, 99];
                    console.log("|============= ASAAS CPF =============|");
                    body = (0, exports.getBodyMessage)(msg);
                    if (!body) {
                        console.warn("Asaas CPF: mensagem sem corpo, ignorando.");
                        return [2 /*return*/];
                    }
                    nodes = flow.flow["nodes"];
                    connections = flow.flow["connections"];
                    nodeSelected = nodes.find(function (node) { return node.id === ticket_1.lastFlowId; });
                    if (!nodeSelected) {
                        console.warn("Asaas CPF: nodeSelected não encontrado");
                        return [2 /*return*/];
                    }
                    mountDataContact = {
                        number: contact_1.number,
                        name: contact_1.name,
                        email: contact_1.email
                    };
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp_2.id, parseInt(ticket_1.flowStopped), ticket_1.companyId, nodes, connections, ticket_1.lastFlowId, ticket_1.dataWebhook, "", "", body, ticket_1.id, mountDataContact, msg || null)];
                case 98:
                    _148.sent();
                    return [2 /*return*/];
                case 99:
                    if (!(!(0, lodash_1.isNil)(flow) && isQuestion && !msg.key.fromMe)) return [3 /*break*/, 103];
                    console.log("|============= QUESTION =============|", JSON.stringify(flow, null, 4));
                    body = (0, exports.getBodyMessage)(msg);
                    if (!body) return [3 /*break*/, 102];
                    nodes = flow.flow["nodes"];
                    nodeSelected_1 = nodes.find(function (node) { return node.id === ticket_1.lastFlowId; });
                    if (!nodeSelected_1) {
                        console.warn("Question: nodeSelected não encontrado");
                        return [2 /*return*/];
                    }
                    connections = flow.flow["connections"];
                    questionConfig = nodeSelected_1.data.typebotIntegration || {};
                    answerKey = questionConfig.answerKey || "question_".concat(nodeSelected_1.id);
                    oldDataWebhook = ticket_1.dataWebhook || {};
                    oldVariables = oldDataWebhook.variables || {};
                    updatedWebhookData = __assign(__assign({}, oldDataWebhook), { variables: __assign(__assign({}, oldVariables), (_e = {}, _e[answerKey] = body, _e)) });
                    if (((_142 = updatedWebhookData.questionState) === null || _142 === void 0 ? void 0 : _142.nodeId) === nodeSelected_1.id &&
                        ((_143 = updatedWebhookData.questionState) === null || _143 === void 0 ? void 0 : _143.awaiting)) {
                        delete updatedWebhookData.questionState;
                    }
                    outgoingConnection = connections.find(function (connection) { return connection.source === nodeSelected_1.id; });
                    nodeIndex = nodes.findIndex(function (node) { return node.id === nodeSelected_1.id; });
                    fallbackNode = nodes[nodeIndex + 1];
                    nextFlowId = outgoingConnection
                        ? outgoingConnection.target
                        : fallbackNode === null || fallbackNode === void 0 ? void 0 : fallbackNode.id;
                    if (!nextFlowId) {
                        console.warn("Question: próximo nó não encontrado, encerrando fluxo.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ticket_1.update({
                            lastFlowId: nextFlowId,
                            dataWebhook: updatedWebhookData
                        })];
                case 100:
                    _148.sent();
                    mountDataContact = {
                        number: contact_1.number,
                        name: contact_1.name,
                        email: contact_1.email
                    };
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(whatsapp_2.id, parseInt(ticket_1.flowStopped), ticket_1.companyId, nodes, connections, nextFlowId, updatedWebhookData, "", "", "", ticket_1.id, mountDataContact, msg || null)];
                case 101:
                    _148.sent();
                    _148.label = 102;
                case 102: return [2 /*return*/];
                case 103:
                    if (!(ticket_1.isBot && isOpenai && !(0, lodash_1.isNil)(flow) && !ticket_1.queueId && !ticket_1.userId)) return [3 /*break*/, 112];
                    console.log("=== OPENAI DIRETO - wbotMessageListener ===");
                    console.log("ticket.isBot=".concat(ticket_1.isBot, ", isOpenai=").concat(isOpenai, ", flowId=").concat(ticket_1.lastFlowId));
                    console.log("ticket.queueId=".concat(ticket_1.queueId, ", ticket.userId=").concat(ticket_1.userId));
                    nodes = flow.flow["nodes"];
                    nodeIndex = nodes.findIndex(function (node) { return node.id === ticket_1.lastFlowId; });
                    nodeSelected = nodes[nodeIndex];
                    console.log("N\u00F3 encontrado: id=".concat(nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.id, ", type=").concat(nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.type));
                    cfg = nodeSelected.data.typebotIntegration || {};
                    console.log("OPENAI DIRETO: Configura\u00E7\u00E3o inicial=", JSON.stringify(cfg, null, 2));
                    promptIdNumber = cfg.iaId ? Number(cfg.iaId) : NaN;
                    if (!(cfg.iaMode === "system" && !Number.isNaN(promptIdNumber))) return [3 /*break*/, 105];
                    return [4 /*yield*/, (0, ShowPromptService_1["default"])({
                            promptId: promptIdNumber,
                            companyId: companyId
                        })];
                case 104:
                    prompt_1 = _148.sent();
                    openAiSettings_1 = {
                        name: prompt_1.name,
                        prompt: prompt_1.prompt,
                        voice: prompt_1.voice,
                        voiceKey: prompt_1.voiceKey,
                        voiceRegion: prompt_1.voiceRegion,
                        maxTokens: Number(prompt_1.maxTokens),
                        temperature: Number(prompt_1.temperature),
                        apiKey: prompt_1.apiKey,
                        queueId: Number(prompt_1.queueId),
                        maxMessages: Number(prompt_1.maxMessages),
                        promptId: Number(prompt_1.id)
                    };
                    return [3 /*break*/, 108];
                case 105:
                    _b = cfg, name_2 = _b.name, prompt_2 = _b.prompt, voice = _b.voice, voiceKey = _b.voiceKey, voiceRegion = _b.voiceRegion, maxTokens = _b.maxTokens, temperature = _b.temperature, apiKey = _b.apiKey, queueId_2 = _b.queueId, maxMessages = _b.maxMessages;
                    resolvedApiKey = apiKey;
                    if (!(cfg.aiMode === "system" || !cfg.aiMode)) return [3 /*break*/, 107];
                    return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(companyId)];
                case 106:
                    wl = _148.sent();
                    provider = (cfg.provider || "openai").toLowerCase();
                    resolvedApiKey = provider === "gemini" ? (wl.geminiApiKey || "") : (wl.openaiApiKey || "");
                    _148.label = 107;
                case 107:
                    openAiSettings_1 = {
                        name: name_2,
                        prompt: prompt_2,
                        voice: voice,
                        voiceKey: voiceKey,
                        voiceRegion: voiceRegion,
                        maxTokens: parseInt(maxTokens),
                        temperature: parseInt(temperature),
                        apiKey: resolvedApiKey,
                        provider: cfg.provider || "openai",
                        model: cfg.model,
                        queueId: parseInt(queueId_2),
                        maxMessages: parseInt(maxMessages),
                        promptId: Number.isNaN(promptIdNumber) ? null : promptIdNumber
                    };
                    _148.label = 108;
                case 108:
                    _148.trys.push([108, 110, , 111]);
                    return [4 /*yield*/, (0, ListPromptToolSettingsService_1["default"])({
                            companyId: companyId,
                            promptId: (_144 = openAiSettings_1.promptId) !== null && _144 !== void 0 ? _144 : null
                        })];
                case 109:
                    toolsEnabled = _148.sent();
                    openAiSettings_1.toolsEnabled = toolsEnabled;
                    return [3 /*break*/, 111];
                case 110:
                    error_17 = _148.sent();
                    console.error("Erro ao carregar toolsEnabled (FlowBuilder):", error_17);
                    return [3 /*break*/, 111];
                case 111:
                    // Verifica pausa da IA por envio manual do operador
                    if (ticket_1.aiPausedUntil && new Date(ticket_1.aiPausedUntil) > new Date()) {
                        logger_1["default"].info("[AI Pause] IA pausada at\u00E9 ".concat(ticket_1.aiPausedUntil, " \u2014 ignorando mensagem do ticket ").concat(ticket_1.id));
                        return [2 /*return*/];
                    }
                    // 🧠 AGRUPAMENTO: Todas as mensagens (texto, áudio, imagem) vão para o buffer
                    // Cria o buffer se ainda não existir
                    if (!messageBuffer[ticket_1.id]) {
                        messageBuffer[ticket_1.id] = { messages: [] };
                    }
                    // Adiciona a mensagem completa ao buffer
                    messageBuffer[ticket_1.id].messages.push(msg);
                    console.log("\uD83D\uDCE5 Mensagem adicionada ao buffer (FlowBuilder). Total: ".concat(messageBuffer[ticket_1.id].messages.length));
                    // Se já tiver um timeout ativo, cancela e reinicia
                    if (messageBuffer[ticket_1.id].timeout) {
                        clearTimeout(messageBuffer[ticket_1.id].timeout);
                    }
                    // Define o novo timeout de 8 segundos
                    messageBuffer[ticket_1.id].timeout = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var groupedMessages, freshTicket, error_20;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    groupedMessages = messageBuffer[ticket_1.id].messages;
                                    delete messageBuffer[ticket_1.id];
                                    return [4 /*yield*/, Ticket_1["default"].findByPk(ticket_1.id)];
                                case 1:
                                    freshTicket = _a.sent();
                                    if (!freshTicket || !freshTicket.isBot || freshTicket.userId) {
                                        console.log("\uD83D\uDED1 IA cancelada (FlowBuilder) \u2014 ticket ".concat(ticket_1.id, " foi aceito por operador"));
                                        return [2 /*return*/];
                                    }
                                    console.log("\uD83E\uDDE0 Processando ".concat(groupedMessages.length, " mensagens agrupadas (FlowBuilder)"));
                                    // Chama a IA com as mensagens agrupadas
                                    return [4 /*yield*/, (0, OpenAiService_1.handleOpenAi)(openAiSettings_1, groupedMessages, // Envia array de mensagens
                                        wbot, freshTicket, contact_1, mediaSent_1, ticketTraking_1)];
                                case 2:
                                    // Chama a IA com as mensagens agrupadas
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_20 = _a.sent();
                                    console.error("❌ Erro ao processar mensagens agrupadas (FlowBuilder):", error_20);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, 8000); // 8 segundos
                    return [2 /*return*/];
                case 112:
                    if (!(!isGroup &&
                        !msg.key.fromMe &&
                        !(0, lodash_1.isNil)(whatsapp_2.promptId) &&
                        !ticket_1.userId &&
                        !ticket_1.queueId)) return [3 /*break*/, 117];
                    prompt_3 = whatsapp_2.prompt;
                    if (!prompt_3) return [3 /*break*/, 116];
                    _148.label = 113;
                case 113:
                    _148.trys.push([113, 115, , 116]);
                    return [4 /*yield*/, (0, ListPromptToolSettingsService_1["default"])({
                            companyId: companyId,
                            promptId: (_145 = prompt_3 === null || prompt_3 === void 0 ? void 0 : prompt_3.id) !== null && _145 !== void 0 ? _145 : null
                        })];
                case 114:
                    toolsEnabled = _148.sent();
                    prompt_3.toolsEnabled = toolsEnabled;
                    return [3 /*break*/, 116];
                case 115:
                    error_18 = _148.sent();
                    console.error("Erro ao carregar toolsEnabled (WhatsApp prompt):", error_18);
                    return [3 /*break*/, 116];
                case 116:
                    // Verifica pausa da IA por envio manual do operador
                    if (ticket_1.aiPausedUntil && new Date(ticket_1.aiPausedUntil) > new Date()) {
                        logger_1["default"].info("[AI Pause] IA pausada at\u00E9 ".concat(ticket_1.aiPausedUntil, " \u2014 ignorando mensagem do ticket ").concat(ticket_1.id));
                        return [2 /*return*/];
                    }
                    // 🧠 AGRUPAMENTO: Todas as mensagens (texto, áudio, imagem) vão para o buffer
                    // Cria o buffer se ainda não existir
                    if (!messageBuffer[ticket_1.id]) {
                        messageBuffer[ticket_1.id] = { messages: [] };
                    }
                    // Adiciona a mensagem completa ao buffer
                    messageBuffer[ticket_1.id].messages.push(msg);
                    console.log("\uD83D\uDCE5 Mensagem adicionada ao buffer (Conex\u00E3o). Total: ".concat(messageBuffer[ticket_1.id].messages.length));
                    // Se já tiver um timeout ativo, cancela e reinicia
                    if (messageBuffer[ticket_1.id].timeout) {
                        clearTimeout(messageBuffer[ticket_1.id].timeout);
                    }
                    // Define o novo timeout de 8 segundos
                    messageBuffer[ticket_1.id].timeout = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var groupedMessages, freshTicket, error_21;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    groupedMessages = messageBuffer[ticket_1.id].messages;
                                    delete messageBuffer[ticket_1.id];
                                    return [4 /*yield*/, Ticket_1["default"].findByPk(ticket_1.id)];
                                case 1:
                                    freshTicket = _a.sent();
                                    if (!freshTicket || freshTicket.userId) {
                                        console.log("\uD83D\uDED1 IA cancelada (Conex\u00E3o) \u2014 ticket ".concat(ticket_1.id, " foi aceito por operador"));
                                        return [2 /*return*/];
                                    }
                                    console.log("\uD83E\uDDE0 Processando ".concat(groupedMessages.length, " mensagens agrupadas (Conex\u00E3o)"));
                                    // Chama a IA com as mensagens agrupadas
                                    return [4 /*yield*/, (0, OpenAiService_1.handleOpenAi)(prompt_3, groupedMessages, // Envia array de mensagens
                                        wbot, freshTicket, contact_1, mediaSent_1, ticketTraking_1)];
                                case 2:
                                    // Chama a IA com as mensagens agrupadas
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_21 = _a.sent();
                                    console.error("❌ Erro ao processar mensagens agrupadas (Conexão):", error_21);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, 8000); // 8 segundos
                    _148.label = 117;
                case 117:
                    console.log("log... 4444", { ticket: ticket_1 });
                    if (!(!ticket_1.imported &&
                        !msg.key.fromMe &&
                        !ticket_1.isGroup &&
                        !ticket_1.queue &&
                        !ticket_1.user &&
                        ticket_1.isBot &&
                        !(0, lodash_1.isNil)(whatsapp_2.integrationId) &&
                        !ticket_1.useIntegration)) return [3 /*break*/, 120];
                    console.log("3245");
                    return [4 /*yield*/, (0, ShowQueueIntegrationService_1["default"])(whatsapp_2.integrationId, companyId)];
                case 118:
                    integrations = _148.sent();
                    return [4 /*yield*/, (0, exports.handleMessageIntegration)(msg, wbot, companyId, integrations, ticket_1, isMenu, whatsapp_2, contact_1, isFirstMsg)];
                case 119:
                    _148.sent();
                    return [2 /*return*/];
                case 120:
                    if (!(!ticket_1.imported &&
                        !msg.key.fromMe &&
                        !ticket_1.isGroup &&
                        !ticket_1.queue &&
                        !ticket_1.user &&
                        !(0, lodash_1.isNil)(whatsapp_2.integrationId) &&
                        !ticket_1.useIntegration)) return [3 /*break*/, 123];
                    return [4 /*yield*/, (0, ShowQueueIntegrationService_1["default"])(whatsapp_2.integrationId, companyId)];
                case 121:
                    integrations = _148.sent();
                    return [4 /*yield*/, (0, exports.handleMessageIntegration)(msg, wbot, companyId, integrations, ticket_1, null, null, contact_1, null)];
                case 122:
                    _148.sent();
                    _148.label = 123;
                case 123:
                    console.log("I - check typebot");
                    console.log("Ticket.typebotSessionId: ", ticket_1.typebotSessionId);
                    if (!(ticket_1.typebotStatus &&
                        !msg.key.fromMe &&
                        !(0, lodash_1.isNil)(ticket_1.typebotSessionTime) &&
                        ticket_1.useIntegration)) return [3 /*break*/, 131];
                    console.log("|================== CONTINUE TYPEBO ==============|");
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                id: ticket_1.flowStopped
                            }
                        })];
                case 124:
                    flow_1 = _148.sent();
                    nodes = flow_1.flow["nodes"];
                    lastFlow = nodes.find(function (f) { return f.id === ticket_1.lastFlowId; });
                    typebot = lastFlow.data.typebotIntegration;
                    console.log("typebot", typebot);
                    _148.label = 125;
                case 125:
                    _148.trys.push([125, 127, , 130]);
                    return [4 /*yield*/, (0, typebotListener_1["default"])({
                            wbot: wbot,
                            msg: msg,
                            ticket: ticket_1,
                            typebot: lastFlow.data.typebotIntegration
                        })];
                case 126:
                    _148.sent();
                    return [3 /*break*/, 130];
                case 127:
                    error_19 = _148.sent();
                    console.log('Erro no typebotListener: ', error_19);
                    axiosError = error_19;
                    _c = axiosError.response || {}, data = _c.data, status_1 = _c.status;
                    console.log('axiosError', axiosError);
                    console.log('data', data);
                    console.log('status: ', status_1);
                    if (!(status_1 === 404 && (data === null || data === void 0 ? void 0 : data.message) === "Session not found.")) return [3 /*break*/, 129];
                    return [4 /*yield*/, ticket_1.destroy()];
                case 128:
                    _148.sent();
                    // await ticket.update({
                    //   typebotSessionId: null,
                    //   typebotSessionTime: null,
                    //   typebotStatus: false,
                    // });
                    // // tentar novamente
                    // await typebotListener({
                    //   wbot: wbot,
                    //   msg,
                    //   ticket,
                    //   typebot: lastFlow.data.typebotIntegration
                    // });
                    handleMessage(msg, wbot, companyId);
                    _148.label = 129;
                case 129: return [3 /*break*/, 130];
                case 130: return [2 /*return*/];
                case 131:
                    //check motives
                    console.log("!isNil(ticket.typebotSessionId): ", !(0, lodash_1.isNil)(ticket_1.typebotSessionId));
                    console.log("ticket.typebotStatus: ", ticket_1.typebotStatus);
                    console.log("!msg.key.fromMe: ", !msg.key.fromMe);
                    console.log("!isNil(ticket.typebotSessionTime): ", !(0, lodash_1.isNil)(ticket_1.typebotSessionTime));
                    console.log("ticket.useIntegration: ", ticket_1.useIntegration);
                    _148.label = 132;
                case 132:
                    console.log("F - check typebot");
                    if (!(!ticket_1.imported &&
                        !msg.key.fromMe &&
                        !ticket_1.isGroup &&
                        !ticket_1.userId &&
                        ticket_1.integrationId &&
                        ticket_1.useIntegration)) return [3 /*break*/, 136];
                    return [4 /*yield*/, (0, ShowQueueIntegrationService_1["default"])(ticket_1.integrationId, companyId)];
                case 133:
                    integrations = _148.sent();
                    console.log("3264");
                    console.log("3257", { ticket: ticket_1 });
                    return [4 /*yield*/, (0, exports.handleMessageIntegration)(msg, wbot, companyId, integrations, ticket_1, null, null, contact_1, null)];
                case 134:
                    _148.sent();
                    if (!msg.key.fromMe) return [3 /*break*/, 136];
                    return [4 /*yield*/, ticket_1.update({
                            typebotSessionTime: (0, moment_1["default"])().toDate()
                        })];
                case 135:
                    _148.sent();
                    _148.label = 136;
                case 136:
                    if (!(!ticket_1.imported &&
                        !ticket_1.queue &&
                        (!ticket_1.isGroup || whatsapp_2.groupAsTicket === "enabled") &&
                        !msg.key.fromMe &&
                        !ticket_1.userId &&
                        whatsapp_2.queues.length >= 1 &&
                        !ticket_1.useIntegration)) return [3 /*break*/, 139];
                    // console.log("antes do verifyqueue")
                    return [4 /*yield*/, verifyQueue(wbot, msg, ticket_1, contact_1, settings_1, ticketTraking_1)];
                case 137:
                    // console.log("antes do verifyqueue")
                    _148.sent();
                    if (!(ticketTraking_1.chatbotAt === null)) return [3 /*break*/, 139];
                    return [4 /*yield*/, ticketTraking_1.update({
                            chatbotAt: (0, moment_1["default"])().toDate()
                        })];
                case 138:
                    _148.sent();
                    _148.label = 139;
                case 139:
                    if (!(ticket_1.queueId > 0)) return [3 /*break*/, 141];
                    return [4 /*yield*/, ticketTraking_1.update({
                            queueId: ticket_1.queueId
                        })];
                case 140:
                    _148.sent();
                    _148.label = 141;
                case 141:
                    if (!(getTypeMessage(msg) === "audioMessage" &&
                        !msg.key.fromMe &&
                        (!ticket_1.isGroup || whatsapp_2.groupAsTicket === "enabled") &&
                        (!(contact_1 === null || contact_1 === void 0 ? void 0 : contact_1.acceptAudioMessage) ||
                            !(settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.acceptAudioMessageContact)))) return [3 /*break*/, 144];
                    return [4 /*yield*/, wbot.sendMessage("".concat(contact_1.number, "@c.us"), {
                            text: "\u200E*Assistente Virtual*:\nInfelizmente n\u00E3o conseguimos escutar nem enviar \u00E1udios por este canal de atendimento, por favor, envie uma mensagem de *texto*."
                        }, {
                            quoted: {
                                key: msg.key,
                                message: {
                                    extendedTextMessage: msg.message.extendedTextMessage
                                }
                            }
                        })];
                case 142:
                    sentMessage = _148.sent();
                    return [4 /*yield*/, (0, exports.verifyMessage)(sentMessage, ticket_1, contact_1, ticketTraking_1)];
                case 143:
                    _148.sent();
                    _148.label = 144;
                case 144:
                    _148.trys.push([144, 155, , 156]);
                    if (!(!msg.key.fromMe &&
                        (settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.scheduleType) &&
                        ticket_1.queueId !== null &&
                        (!ticket_1.isGroup || whatsapp_2.groupAsTicket === "enabled") &&
                        ticket_1.status !== "open")) return [3 /*break*/, 154];
                    return [4 /*yield*/, Queue_1["default"].findByPk(ticket_1.queueId)];
                case 145:
                    queue = _148.sent();
                    if (!((settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.scheduleType) === "queue")) return [3 /*break*/, 147];
                    return [4 /*yield*/, (0, VerifyCurrentSchedule_1["default"])(companyId, queue.id, 0)];
                case 146:
                    currentSchedule = _148.sent();
                    _148.label = 147;
                case 147:
                    if (!((settings_1 === null || settings_1 === void 0 ? void 0 : settings_1.scheduleType) === "queue" &&
                        !(0, lodash_1.isNil)(currentSchedule) &&
                        ticket_1.amountUsedBotQueues < whatsapp_2.maxUseBotQueues &&
                        (!currentSchedule || currentSchedule.inActivity === false) &&
                        !ticket_1.imported)) return [3 /*break*/, 154];
                    if (!(Number(whatsapp_2.timeUseBotQueues) > 0)) return [3 /*break*/, 152];
                    if (!(ticket_1.isOutOfHour === false &&
                        ticketTraking_1.chatbotAt !== null)) return [3 /*break*/, 150];
                    return [4 /*yield*/, ticketTraking_1.update({
                            chatbotAt: null
                        })];
                case 148:
                    _148.sent();
                    return [4 /*yield*/, ticket_1.update({
                            amountUsedBotQueues: 0
                        })];
                case 149:
                    _148.sent();
                    _148.label = 150;
                case 150:
                    dataLimite = new Date();
                    Agora = new Date();
                    if (ticketTraking_1.chatbotAt !== null) {
                        dataLimite.setMinutes(ticketTraking_1.chatbotAt.getMinutes() +
                            Number(whatsapp_2.timeUseBotQueues));
                        if (ticketTraking_1.chatbotAt !== null &&
                            Agora < dataLimite &&
                            whatsapp_2.timeUseBotQueues !== "0" &&
                            ticket_1.amountUsedBotQueues !== 0) {
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, ticketTraking_1.update({
                            chatbotAt: null
                        })];
                case 151:
                    _148.sent();
                    _148.label = 152;
                case 152:
                    outOfHoursMessage = queue.outOfHoursMessage;
                    if (outOfHoursMessage !== "") {
                        body_7 = (0, Mustache_1["default"])("".concat(outOfHoursMessage), ticket_1);
                        debouncedSentMessage = (0, Debounce_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, wbot.sendMessage("".concat(ticket_1.contact.number, "@").concat(ticket_1.isGroup ? "g.us" : "s.whatsapp.net"), {
                                            text: body_7
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 1000, ticket_1.id);
                        debouncedSentMessage();
                    }
                    //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                    return [4 /*yield*/, ticket_1.update({
                            isOutOfHour: true,
                            amountUsedBotQueues: ticket_1.amountUsedBotQueues + 1
                        })];
                case 153:
                    //atualiza o contador de vezes que enviou o bot e que foi enviado fora de hora
                    _148.sent();
                    return [2 /*return*/];
                case 154: return [3 /*break*/, 156];
                case 155:
                    e_4 = _148.sent();
                    Sentry.captureException(e_4);
                    console.log(e_4);
                    return [3 /*break*/, 156];
                case 156:
                    if (!(ticket_1.queue && ticket_1.queueId && !msg.key.fromMe)) return [3 /*break*/, 160];
                    if (!(!ticket_1.user || ((_147 = (_146 = ticket_1.queue) === null || _146 === void 0 ? void 0 : _146.chatbots) === null || _147 === void 0 ? void 0 : _147.length) > 0)) return [3 /*break*/, 158];
                    return [4 /*yield*/, (0, ChatBotListener_1.sayChatbot)(ticket_1.queueId, wbot, ticket_1, contact_1, msg, ticketTraking_1)];
                case 157:
                    _148.sent();
                    _148.label = 158;
                case 158: 
                //atualiza mensagem para indicar que houve atividade e aí contar o tempo novamente para enviar mensagem de inatividade
                return [4 /*yield*/, ticket_1.update({
                        sendInactiveMessage: false
                    })];
                case 159:
                    //atualiza mensagem para indicar que houve atividade e aí contar o tempo novamente para enviar mensagem de inatividade
                    _148.sent();
                    _148.label = 160;
                case 160: return [4 /*yield*/, ticket_1.reload()];
                case 161:
                    _148.sent();
                    return [3 /*break*/, 163];
                case 162:
                    err_7 = _148.sent();
                    Sentry.captureException(err_7);
                    console.log(err_7);
                    logger_1["default"].error("Error handling whatsapp message: Err: ".concat(err_7));
                    return [3 /*break*/, 163];
                case 163: return [2 /*return*/];
            }
        });
    });
};
exports.handleMessage = handleMessage;
var handleMsgAck = function (msg, chat) { return __awaiter(void 0, void 0, void 0, function () {
    var io, messageToUpdate, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 500); })];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, Message_1["default"].findOne({
                        where: {
                            wid: msg.key.id
                        },
                        include: [
                            "contact",
                            {
                                model: Ticket_1["default"],
                                as: "ticket",
                                include: [
                                    {
                                        model: Contact_1["default"],
                                        attributes: [
                                            "id",
                                            "name",
                                            "number",
                                            "email",
                                            "profilePicUrl",
                                            "acceptAudioMessage",
                                            "active",
                                            "urlPicture",
                                            "companyId"
                                        ],
                                        include: ["extraInfo", "tags"]
                                    },
                                    {
                                        model: Queue_1["default"],
                                        attributes: ["id", "name", "color"]
                                    },
                                    {
                                        model: Whatsapp_1["default"],
                                        attributes: ["id", "name", "groupAsTicket"]
                                    },
                                    {
                                        model: User_1["default"],
                                        attributes: ["id", "name"]
                                    },
                                    {
                                        model: Tag_1["default"],
                                        as: "tags",
                                        attributes: ["id", "name", "color"]
                                    }
                                ]
                            },
                            {
                                model: Message_1["default"],
                                as: "quotedMsg",
                                include: ["contact"]
                            }
                        ]
                    })];
            case 3:
                messageToUpdate = _a.sent();
                if (!messageToUpdate || messageToUpdate.ack > chat)
                    return [2 /*return*/];
                return [4 /*yield*/, messageToUpdate.update({ ack: chat })];
            case 4:
                _a.sent();
                io.of(messageToUpdate.companyId.toString())
                    // .to(messageToUpdate.ticketId.toString())
                    .emit("company-".concat(messageToUpdate.companyId, "-appMessage"), {
                    action: "update",
                    message: messageToUpdate
                });
                return [3 /*break*/, 6];
            case 5:
                err_8 = _a.sent();
                Sentry.captureException(err_8);
                logger_1["default"].error("Error handling message ack. Err: ".concat(err_8));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.handleMsgAck = handleMsgAck;
var verifyRecentCampaign = function (message, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var number, campaigns, ids, campaignShipping;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!isValidMsg(message)) {
                    return [2 /*return*/];
                }
                if (!!message.key.fromMe) return [3 /*break*/, 5];
                number = message.key.remoteJid.replace(/\D/g, "");
                return [4 /*yield*/, Campaign_1["default"].findAll({
                        where: { companyId: companyId, status: "EM_ANDAMENTO", confirmation: true }
                    })];
            case 1:
                campaigns = _c.sent();
                if (!campaigns) return [3 /*break*/, 5];
                ids = campaigns.map(function (c) { return c.id; });
                return [4 /*yield*/, CampaignShipping_1["default"].findOne({
                        where: {
                            campaignId: (_a = {}, _a[sequelize_1.Op["in"]] = ids, _a),
                            number: number,
                            confirmation: null,
                            deliveredAt: (_b = {}, _b[sequelize_1.Op.ne] = null, _b)
                        }
                    })];
            case 2:
                campaignShipping = _c.sent();
                if (!campaignShipping) return [3 /*break*/, 5];
                return [4 /*yield*/, campaignShipping.update({
                        confirmedAt: (0, moment_1["default"])(),
                        confirmation: true
                    })];
            case 3:
                _c.sent();
                return [4 /*yield*/, queues_1.campaignQueue.add("DispatchCampaign", {
                        campaignShippingId: campaignShipping.id,
                        campaignId: campaignShipping.campaignId
                    }, {
                        delay: (0, queues_1.parseToMilliseconds)((0, queues_1.randomValue)(0, 10))
                    })];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var verifyCampaignMessageAndCloseTicket = function (message, companyId, wbot) { return __awaiter(void 0, void 0, void 0, function () {
    var io, body, isCampaign, msgContact, contact, messageRecord, ticket;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!isValidMsg(message)) {
                    return [2 /*return*/];
                }
                io = (0, socket_1.getIO)();
                return [4 /*yield*/, (0, exports.getBodyMessage)(message)];
            case 1:
                body = _b.sent();
                isCampaign = /\u200c/.test(body);
                if (!(message.key.fromMe && isCampaign)) return [3 /*break*/, 7];
                msgContact = void 0;
                return [4 /*yield*/, getContactMessage(message, wbot)];
            case 2:
                msgContact = _b.sent();
                return [4 /*yield*/, verifyContact(msgContact, wbot, companyId, message)];
            case 3:
                contact = _b.sent();
                return [4 /*yield*/, Message_1["default"].findOne({
                        where: (_a = {},
                            _a[sequelize_1.Op.or] = [{ wid: message.key.id }, { contactId: contact.id }],
                            _a.companyId = companyId,
                            _a)
                    })];
            case 4:
                messageRecord = _b.sent();
                if (!(!(0, lodash_1.isNull)(messageRecord) ||
                    !(0, lodash_1.isNil)(messageRecord) ||
                    messageRecord !== null)) return [3 /*break*/, 7];
                return [4 /*yield*/, Ticket_1["default"].findByPk(messageRecord.ticketId)];
            case 5:
                ticket = _b.sent();
                return [4 /*yield*/, ticket.update({ status: "closed", amountUsedBotQueues: 0 })];
            case 6:
                _b.sent();
                io.of(String(companyId))
                    // .to("open")
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "delete",
                    ticket: ticket,
                    ticketId: ticket.id
                });
                io.of(String(companyId))
                    // .to(ticket.status)
                    // .to(ticket.id.toString())
                    .emit("company-".concat(companyId, "-ticket"), {
                    action: "update",
                    ticket: ticket,
                    ticketId: ticket.id
                });
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var filterMessages = function (msg) {
    var _a, _b, _c;
    wbot_1.msgDB.save(msg);
    if ((_b = (_a = msg.message) === null || _a === void 0 ? void 0 : _a.protocolMessage) === null || _b === void 0 ? void 0 : _b.editedMessage)
        return true;
    if ((_c = msg.message) === null || _c === void 0 ? void 0 : _c.protocolMessage)
        return false;
    if ([
        baileys_1.WAMessageStubType.REVOKE,
        baileys_1.WAMessageStubType.E2E_DEVICE_CHANGED,
        baileys_1.WAMessageStubType.E2E_IDENTITY_CHANGED,
        baileys_1.WAMessageStubType.CIPHERTEXT
    ].includes(msg.messageStubType))
        return false;
    return true;
};
var wbotMessageListener = function (wbot, companyId) {
    wbot.ev.on("messages.upsert", function (messageUpsert) { return __awaiter(void 0, void 0, void 0, function () {
        var messages;
        return __generator(this, function (_a) {
            messages = messageUpsert.messages
                .filter(filterMessages)
                .map(function (msg) { return msg; });
            if (!messages)
                return [2 /*return*/];
            // console.log("CIAAAAAAA WBOT " , companyId)
            messages.forEach(function (message) { return __awaiter(void 0, void 0, void 0, function () {
                var isGroupMsg, msg, messageExists, isCampaign, body, fromMe, e_5;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            isGroupMsg = (_a = message.key.remoteJid) === null || _a === void 0 ? void 0 : _a.endsWith("@g.us");
                            if (isGroupMsg) {
                                console.log("🔍 [LOG 1 - LISTENER] Mensagem de GRUPO recebida:", {
                                    remoteJid: message.key.remoteJid,
                                    fromMe: message.key.fromMe,
                                    messageId: message.key.id,
                                    companyId: companyId
                                });
                            }
                            // Ignorar mensagens de newsletter
                            if (message.key.remoteJid.includes("newsletter")) {
                                logger_1["default"].info("[newsletter] Ignorando mensagem de newsletter no listener: ".concat(message.key.remoteJid));
                                return [2 /*return*/];
                            }
                            if (((_b = message === null || message === void 0 ? void 0 : message.messageStubParameters) === null || _b === void 0 ? void 0 : _b.length) &&
                                message.messageStubParameters[0].includes("absent")) {
                                msg = {
                                    companyId: companyId,
                                    whatsappId: wbot.id,
                                    message: message
                                };
                                logger_1["default"].warn("MENSAGEM PERDIDA", JSON.stringify(msg));
                            }
                            return [4 /*yield*/, Message_1["default"].count({
                                    where: { wid: message.key.id, companyId: companyId }
                                })];
                        case 1:
                            messageExists = _e.sent();
                            // 🔍 LOG 2: Verificar se mensagem já existe no banco
                            if (isGroupMsg) {
                                console.log("🔍 [LOG 2 - MESSAGE EXISTS] Mensagem de grupo já existe?", {
                                    messageExists: messageExists > 0,
                                    messageId: message.key.id
                                });
                            }
                            if (!!messageExists) return [3 /*break*/, 12];
                            isCampaign = false;
                            return [4 /*yield*/, (0, exports.getBodyMessage)(message)];
                        case 2:
                            body = _e.sent();
                            fromMe = (_c = message === null || message === void 0 ? void 0 : message.key) === null || _c === void 0 ? void 0 : _c.fromMe;
                            if (fromMe) {
                                isCampaign = /\u200c/.test(body);
                            }
                            else {
                                if (/\u200c/.test(body))
                                    body = body.replace(/\u200c/, "");
                                logger_1["default"].debug("Validação de mensagem de campanha enviada por terceiros: " + body);
                            }
                            if (!!isCampaign) return [3 /*break*/, 9];
                            if (!(redis_1.REDIS_URI_MSG_CONN !== "")) return [3 /*break*/, 7];
                            _e.label = 3;
                        case 3:
                            _e.trys.push([3, 5, , 6]);
                            // 🔍 LOG 3: Mensagem indo para fila Redis
                            if (isGroupMsg) {
                                console.log("🔍 [LOG 3 - REDIS QUEUE] Mensagem de grupo adicionada à fila Redis", {
                                    messageId: message.key.id,
                                    queueName: "".concat(process.env.DB_NAME, "-handleMessage")
                                });
                            }
                            return [4 /*yield*/, queue_1["default"].add("".concat(process.env.DB_NAME, "-handleMessage"), { message: message, wbot: wbot.id, companyId: companyId }, {
                                    priority: 1,
                                    jobId: "".concat(wbot.id, "-handleMessage-").concat(message.key.id)
                                })];
                        case 4:
                            _e.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_5 = _e.sent();
                            Sentry.captureException(e_5);
                            return [3 /*break*/, 6];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            console.log("log... 3970");
                            // 🔍 LOG 4: Mensagem processada diretamente (sem Redis)
                            if (isGroupMsg) {
                                console.log("🔍 [LOG 4 - DIRECT HANDLE] Mensagem de grupo processada diretamente (sem Redis)", {
                                    messageId: message.key.id
                                });
                            }
                            return [4 /*yield*/, handleMessage(message, wbot, companyId)];
                        case 8:
                            _e.sent();
                            _e.label = 9;
                        case 9: return [4 /*yield*/, verifyRecentCampaign(message, companyId)];
                        case 10:
                            _e.sent();
                            return [4 /*yield*/, verifyCampaignMessageAndCloseTicket(message, companyId, wbot)];
                        case 11:
                            _e.sent();
                            _e.label = 12;
                        case 12:
                            if ((_d = message.key.remoteJid) === null || _d === void 0 ? void 0 : _d.endsWith("@g.us")) {
                                if (redis_1.REDIS_URI_MSG_CONN !== "") {
                                    queue_1["default"].add("".concat(process.env.DB_NAME, "-handleMessageAck"), { msg: message, chat: 2 }, {
                                        priority: 1,
                                        jobId: "".concat(wbot.id, "-handleMessageAck-").concat(message.key.id)
                                    });
                                }
                                else {
                                    handleMsgAck(message, 2);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    wbot.ev.on("messages.update", function (messageUpdate) {
        if (messageUpdate.length === 0)
            return;
        messageUpdate.forEach(function (message) { return __awaiter(void 0, void 0, void 0, function () {
            var msgUp, ack;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                wbot.readMessages([message.key]);
                msgUp = __assign({}, messageUpdate);
                if (((_a = msgUp["0"]) === null || _a === void 0 ? void 0 : _a.update.messageStubType) === 1 &&
                    ((_b = msgUp["0"]) === null || _b === void 0 ? void 0 : _b.key.remoteJid) !== "status@broadcast") {
                    (0, MarkDeleteWhatsAppMessage_1["default"])((_c = msgUp["0"]) === null || _c === void 0 ? void 0 : _c.key.remoteJid, null, (_d = msgUp["0"]) === null || _d === void 0 ? void 0 : _d.key.id, companyId);
                }
                if (message.update.status === 3 && ((_e = message === null || message === void 0 ? void 0 : message.key) === null || _e === void 0 ? void 0 : _e.fromMe)) {
                    ack = 2;
                }
                else {
                    ack = message.update.status;
                }
                if (redis_1.REDIS_URI_MSG_CONN !== "") {
                    queue_1["default"].add("".concat(process.env.DB_NAME, "-handleMessageAck"), { msg: message, chat: ack }, {
                        priority: 1,
                        jobId: "".concat(wbot.id, "-handleMessageAck-").concat(message.key.id)
                    });
                }
                else {
                    handleMsgAck(message, ack);
                }
                return [2 /*return*/];
            });
        }); });
    });
    // wbot.ev.on('message-receipt.update', (events: any) => {
    //   events.forEach(async (msg: any) => {
    //     const ack = msg?.receipt?.receiptTimestamp ? 3 : msg?.receipt?.readTimestamp ? 4 : 0;
    //     if (!ack) return;
    //     await handleMsgAck(msg, ack);
    //   });
    // })
    // wbot.ev.on("presence.update", (events: any) => {
    //   console.log(events)
    // })
    wbot.ev.on("contacts.update", function (contacts) {
        contacts.forEach(function (contact) { return __awaiter(void 0, void 0, void 0, function () {
            var cdnUrlContact, _a, newUrl, _b, contactRemoteJid, contactNumber, existingContact, normalizedNumber, contactData, updatedContact, shouldSave, saveError_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(contact === null || contact === void 0 ? void 0 : contact.id))
                            return [2 /*return*/];
                        if (!(typeof contact.imgUrl !== "undefined")) return [3 /*break*/, 17];
                        if (!(contact.imgUrl === "")) return [3 /*break*/, 1];
                        _a = "";
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, wbot.profilePictureUrl(contact.id)["catch"](function () { return null; })];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        cdnUrlContact = _a;
                        if (!cdnUrlContact) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, DownloadProfilePic_1["default"])(cdnUrlContact, companyId, contact.id.replace(/\D/g, ""))];
                    case 4:
                        _b = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _b = cdnUrlContact;
                        _c.label = 6;
                    case 6:
                        newUrl = _b;
                        contactRemoteJid = contact.id;
                        contactNumber = "";
                        if (!contact.remoteJidAlt) return [3 /*break*/, 7];
                        contactRemoteJid = contact.remoteJidAlt;
                        contactNumber = contact.remoteJidAlt.replace(/\D/g, "");
                        logger_1["default"].info("\u2705 Usando remoteJidAlt: ".concat(contactRemoteJid));
                        return [3 /*break*/, 10];
                    case 7:
                        if (!contact.id.includes("@lid")) return [3 /*break*/, 9];
                        logger_1["default"].warn("\u26A0\uFE0F Contato com LID detectado: ".concat(contact.id));
                        return [4 /*yield*/, Contact_1["default"].findOne({
                                where: {
                                    companyId: companyId,
                                    remoteJid: contact.id
                                }
                            })];
                    case 8:
                        existingContact = _c.sent();
                        if (existingContact && existingContact.number && existingContact.number.length <= 15) {
                            // ✅ Recuperar número real do banco
                            contactNumber = existingContact.number;
                            contactRemoteJid = "".concat(contactNumber, "@s.whatsapp.net");
                            logger_1["default"].info("\u2705 N\u00FAmero recuperado do banco: ".concat(contactNumber));
                        }
                        else {
                            // ❌ Não conseguiu encontrar número real, IGNORAR atualização
                            logger_1["default"].error("\u274C N\u00E3o foi poss\u00EDvel encontrar n\u00FAmero real para LID: ".concat(contact.id));
                            return [2 /*return*/]; // ✅ NÃO SALVAR contatos com LID
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        contactNumber = contact.id.replace(/\D/g, "");
                        _c.label = 10;
                    case 10:
                        normalizedNumber = (0, normalizeContactNumber_1.normalizePhoneNumber)(contactNumber);
                        if (!normalizedNumber) {
                            logger_1["default"].error("\u274C N\u00FAmero inv\u00E1lido (n\u00E3o \u00E9 BR/PY), ignorando: ".concat(contactNumber));
                            return [2 /*return*/];
                        }
                        contactNumber = normalizedNumber;
                        contactRemoteJid = "".concat(contactNumber, "@s.whatsapp.net");
                        contactData = {
                            name: contact.name || contact.notify || contactNumber,
                            number: contactNumber,
                            isGroup: contactRemoteJid.includes("@g.us") ? true : false,
                            companyId: companyId,
                            remoteJid: contact.id,
                            remoteJidAlt: contact.remoteJidAlt || contactRemoteJid,
                            profilePicUrl: newUrl,
                            whatsappId: wbot.id,
                            wbot: wbot,
                            msgBody: "" // contacts.update não possui mensagem
                        };
                        logger_1["default"].info("✅ Atualizando contato:", {
                            name: contactData.name,
                            number: contactData.number,
                            remoteJid: contactData.remoteJid
                        });
                        return [4 /*yield*/, (0, CreateOrUpdateContactService_1["default"])(contactData)];
                    case 11:
                        updatedContact = _c.sent();
                        if (!(!contactData.isGroup && updatedContact)) return [3 /*break*/, 17];
                        _c.label = 12;
                    case 12:
                        _c.trys.push([12, 16, , 17]);
                        return [4 /*yield*/, (0, ContactPhoneService_1.ShouldSaveToPhone)({
                                contact: updatedContact,
                                messageBody: "",
                                companyId: companyId
                            })];
                    case 13:
                        shouldSave = _c.sent();
                        if (!(shouldSave && !updatedContact.savedToPhone)) return [3 /*break*/, 15];
                        logger_1["default"].info("\uD83D\uDCF1 Salvando contato ".concat(updatedContact.id, " no celular automaticamente"));
                        return [4 /*yield*/, (0, ContactPhoneService_1.SaveContactToPhone)({
                                contact: updatedContact,
                                whatsappId: wbot.id,
                                companyId: companyId
                            })];
                    case 14:
                        _c.sent();
                        _c.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        saveError_1 = _c.sent();
                        logger_1["default"].warn("Erro ao verificar salvamento no celular: ".concat(saveError_1.message));
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        }); });
    });
    wbot.ev.on("groups.update", function (groupUpdate) {
        var _a;
        if (!((_a = groupUpdate[0]) === null || _a === void 0 ? void 0 : _a.id))
            return;
        if (groupUpdate.length === 0)
            return;
        groupUpdate.forEach(function (group) { return __awaiter(void 0, void 0, void 0, function () {
            var number, nameGroup, profilePicUrl, cdnUrlGroup, e_6, contactData, contact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number = group.id.replace(/\D/g, "");
                        nameGroup = group.subject || number;
                        profilePicUrl = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, wbot.profilePictureUrl(group.id, "image")];
                    case 2:
                        cdnUrlGroup = _a.sent();
                        return [4 /*yield*/, (0, DownloadProfilePic_1["default"])(cdnUrlGroup, companyId, number)];
                    case 3:
                        profilePicUrl = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_6 = _a.sent();
                        Sentry.captureException(e_6);
                        profilePicUrl = "".concat(process.env.FRONTEND_URL, "/nopicture.png");
                        return [3 /*break*/, 5];
                    case 5:
                        contactData = {
                            name: nameGroup,
                            number: number,
                            isGroup: true,
                            companyId: companyId,
                            remoteJid: group.id,
                            profilePicUrl: profilePicUrl,
                            whatsappId: wbot.id,
                            wbot: wbot,
                            msgBody: ""
                        };
                        return [4 /*yield*/, (0, CreateOrUpdateContactService_1["default"])(contactData)];
                    case 6:
                        contact = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Monitoramento de conexão
    wbot.ev.on("connection.update", function (update) {
        var _a;
        logger_1["default"].info("[WHATSAPP MONITOR] Status da conex\u00E3o atualizado:", {
            qr: update.qr ? "QR Code disponível" : undefined,
            connection: update.connection,
            lastDisconnect: update.lastDisconnect,
            isNewLogin: update.isNewLogin,
            receivedPendingNotifications: update.receivedPendingNotifications
        });
        if (update.connection === "open") {
            logger_1["default"].info("[WHATSAPP MONITOR] Conex\u00E3o aberta com sucesso - WhatsApp ID: ".concat(wbot.id));
            WhatsAppMonitor_1["default"].onConnectionRestored(parseInt(wbot.id));
        }
        else if (update.connection === "close") {
            var reason = ((_a = update.lastDisconnect) === null || _a === void 0 ? void 0 : _a.reason) || "Desconhecido";
            logger_1["default"].error("[WHATSAPP MONITOR] Conex\u00E3o fechada - WhatsApp ID: ".concat(wbot.id, ", Raz\u00E3o: ").concat(reason));
            WhatsAppMonitor_1["default"].onConnectionLost(parseInt(wbot.id));
        }
    });
    // Monitoramento de erros de conexão
    wbot.ev.on("connection.error", function (error) {
        logger_1["default"].error("[WHATSAPP MONITOR] Erro de conex\u00E3o - WhatsApp ID: ".concat(wbot.id), error);
        WhatsAppMonitor_1["default"].onConnectionLost(parseInt(wbot.id));
    });
};
exports.wbotMessageListener = wbotMessageListener;
