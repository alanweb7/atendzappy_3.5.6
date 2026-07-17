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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ActionsWebhookService = void 0;
var WhitelabelService_1 = require("../SettingService/WhitelabelService");
var MessageController_1 = require("../../controllers/MessageController");
var sequelize_1 = require("sequelize");
var Contact_1 = __importDefault(require("../../models/Contact"));
var SendMessage_1 = require("../../helpers/SendMessage");
var SendCarouselMessage_1 = require("../../helpers/SendCarouselMessage");
var GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var mime_types_1 = __importDefault(require("mime-types"));
var SendWhatsAppMediaFlow_1 = __importStar(require("../WbotServices/SendWhatsAppMediaFlow"));
var randomizador_1 = require("../../utils/randomizador");
var SendMessageFlow_1 = require("../../helpers/SendMessageFlow");
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var SetTicketMessagesAsRead_1 = __importDefault(require("../../helpers/SetTicketMessagesAsRead"));
var SendWhatsAppMessage_1 = __importDefault(require("../WbotServices/SendWhatsAppMessage"));
var ShowPromptService_1 = __importDefault(require("../PromptServices/ShowPromptService"));
var ListPromptToolSettingsService_1 = __importDefault(require("../PromptToolSettingService/ListPromptToolSettingsService"));
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var randomCode_1 = require("../../utils/randomCode");
var ShowQueueService_1 = __importDefault(require("../QueueService/ShowQueueService"));
var ShowTicketService_1 = __importDefault(require("../TicketServices/ShowTicketService"));
var socket_1 = require("../../libs/socket");
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var FindOrCreateATicketTrakingService_1 = __importDefault(require("../TicketServices/FindOrCreateATicketTrakingService"));
var logger_1 = __importDefault(require("../../utils/logger"));
var CreateLogTicketService_1 = __importDefault(require("../TicketServices/CreateLogTicketService"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var bluebird_1 = require("bluebird");
var typebotListener_1 = __importDefault(require("../TypebotServices/typebotListener"));
var wbot_1 = require("../../libs/wbot");
var SendInteractiveMenu_1 = require("../../helpers/SendInteractiveMenu");
var OpenAiService_1 = require("../IntegrationsServices/OpenAiService");
var Tag_1 = __importDefault(require("../../models/Tag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var User_1 = __importDefault(require("../../models/User"));
var axios_1 = __importDefault(require("axios"));
var FlowBuilder_1 = require("../../models/FlowBuilder");
var FollowUpNodeService_1 = __importDefault(require("../FlowBuilderService/FollowUpNodeService"));
// Função para extrair valores de objetos JSON usando path
var getNestedValue = function (obj, path) {
    if (!path || !obj)
        return undefined;
    var keys = path.split('.');
    var current = obj;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (current === null || current === undefined) {
            return undefined;
        }
        current = current[key];
    }
    return current;
};
var PaymentGatewayService_1 = require("../PaymentGatewayService");
var UrlService_1 = require("../SettingService/UrlService");
var pdfUtils_1 = require("../../helpers/pdfUtils");
var SendTextOfficialService_1 = require("../WhatsAppOfficial/SendTextOfficialService");
var SendMediaOfficialService_1 = require("../WhatsAppOfficial/SendMediaOfficialService");
var directOpenAiMessageBuffer = {};
// Shim que intercepta chamadas wbot.sendMessage e as roteia para a API Oficial
var createOfficialWbotShim = function (whatsapp, ticket, contact, companyId) { return ({
    sendMessage: function (jid, payload) { return __awaiter(void 0, void 0, void 0, function () {
        var mediaKey, extMap, mimeMap, ext, tempFilename, tempDir, tempPath, mediaBuf, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!payload.text) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({
                            body: payload.text,
                            ticketId: ticket.id,
                            contact: contact,
                            connection: whatsapp
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    mediaKey = payload.image ? "image"
                        : payload.video ? "video"
                            : payload.audio ? "audio"
                                : payload.document ? "document"
                                    : null;
                    if (!(mediaKey && Buffer.isBuffer(payload[mediaKey]))) return [3 /*break*/, 4];
                    extMap = { image: "jpg", video: "mp4", audio: "ogg", document: "pdf" };
                    mimeMap = { image: "image/jpeg", video: "video/mp4", audio: "audio/ogg", document: "application/pdf" };
                    ext = extMap[mediaKey] || "bin";
                    tempFilename = "".concat((0, randomCode_1.randomString)(16), ".").concat(ext);
                    tempDir = path_1["default"].join(path_1["default"].resolve(__dirname, "../../.."), "public", "company".concat(companyId));
                    if (!fs_1["default"].existsSync(tempDir))
                        fs_1["default"].mkdirSync(tempDir, { recursive: true });
                    tempPath = path_1["default"].join(tempDir, tempFilename);
                    mediaBuf = Buffer.isBuffer(payload[mediaKey]) ? payload[mediaKey] : Buffer.from(payload[mediaKey]);
                    fs_1["default"].writeFileSync(tempPath, mediaBuf);
                    return [4 /*yield*/, (0, SendMediaOfficialService_1.SendMediaOfficialService)({
                            media: {
                                fieldname: "file",
                                originalname: payload.fileName || tempFilename,
                                encoding: "7bit",
                                mimetype: mimeMap[mediaKey],
                                destination: tempDir,
                                filename: tempFilename,
                                path: tempPath,
                                size: mediaBuf.length,
                                stream: null,
                                buffer: null
                            },
                            body: payload.caption || "",
                            ticketId: ticket.id,
                            contact: contact,
                            connection: whatsapp,
                            passVerification: true
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error("[OfficialWbotShim] Erro ao enviar:", err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, { key: { remoteJid: jid, id: (0, randomCode_1.randomString)(20), fromMe: true } }];
            }
        });
    }); }
}); };
var ActionsWebhookService = function (whatsappId, idFlowDb, companyId, nodes, connects, nextStage, dataWebhook, details, hashWebhookId, pressKey, idTicket, numberPhrase, msg) {
    if (numberPhrase === void 0) { numberPhrase = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var io, next_1, activeTicket, createFieldJsonName_1, connectStatic, nameInput, numberClient_1, numberInput, createFieldJsonEmail_1, emailInput, lengthLoop, whatsapp_1, checkAndCloseTicketIfAssigned, execCount, execFn_1, ticket_1, noAlterNext, isContinue, _loop_1, i, state_1, error_1;
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38;
        return __generator(this, function (_39) {
            switch (_39.label) {
                case 0:
                    _39.trys.push([0, 8, , 9]);
                    io = (0, socket_1.getIO)();
                    next_1 = nextStage;
                    if (!(String(next_1) === '1')) return [3 /*break*/, 2];
                    if (!idTicket) return [3 /*break*/, 2];
                    return [4 /*yield*/, Ticket_1["default"].findOne({
                            where: { id: idTicket, flowWebhook: true, lastFlowId: (_a = {}, _a[sequelize_1.Op.ne] = null, _a) }
                        })];
                case 1:
                    activeTicket = _39.sent();
                    if (activeTicket && activeTicket.lastFlowId && String(activeTicket.lastFlowId) !== '1') {
                        console.log("\uD83D\uDEAB BLOQUEADO: Impedindo volta ao n\u00F3 start. Usando lastFlowId: ".concat(activeTicket.lastFlowId));
                        next_1 = activeTicket.lastFlowId;
                    }
                    _39.label = 2;
                case 2:
                    console.log("ActionWebhookService | 53", idFlowDb, companyId, nodes, connects, nextStage, dataWebhook, details, hashWebhookId, pressKey, idTicket, numberPhrase);
                    createFieldJsonName_1 = "";
                    connectStatic = connects;
                    if (numberPhrase === "") {
                        nameInput = details.inputs.find(function (item) { return item.keyValue === "nome"; });
                        if (nameInput && nameInput.data) {
                            nameInput.data.split(",").map(function (dataN) {
                                var lineToData = details.keysFull.find(function (item) { return item === dataN; });
                                var sumRes = "";
                                if (!lineToData) {
                                    sumRes = dataN;
                                }
                                else {
                                    sumRes = constructJsonLine(lineToData, dataWebhook);
                                }
                                createFieldJsonName_1 = createFieldJsonName_1 + sumRes;
                            });
                        }
                    }
                    else {
                        createFieldJsonName_1 = numberPhrase.name;
                    }
                    numberClient_1 = "";
                    if (numberPhrase === "") {
                        numberInput = details.inputs.find(function (item) { return item.keyValue === "celular"; });
                        if (numberInput && numberInput.data) {
                            numberInput.data.split(",").map(function (dataN) {
                                var lineToDataNumber = details.keysFull.find(function (item) { return item === dataN; });
                                var createFieldJsonNumber = "";
                                if (!lineToDataNumber) {
                                    createFieldJsonNumber = dataN;
                                }
                                else {
                                    createFieldJsonNumber = constructJsonLine(lineToDataNumber, dataWebhook);
                                }
                                createFieldJsonNumber = createFieldJsonNumber + createFieldJsonNumber;
                            });
                        }
                    }
                    else {
                        numberClient_1 = numberPhrase.number;
                    }
                    numberClient_1 = removerNaoLetrasNumeros(numberClient_1);
                    if (numberClient_1.substring(0, 2) === "55") {
                        if (parseInt(numberClient_1.substring(2, 4)) >= 31) {
                            if (numberClient_1.length === 13) {
                                numberClient_1 =
                                    numberClient_1.substring(0, 4) + numberClient_1.substring(5, 13);
                            }
                        }
                    }
                    createFieldJsonEmail_1 = "";
                    if (numberPhrase === "") {
                        emailInput = details.inputs.find(function (item) { return item.keyValue === "email"; });
                        if (emailInput && emailInput.data) {
                            emailInput.data.split(",").map(function (dataN) {
                                var lineToDataEmail = details.keysFull.find(function (item) {
                                    return item.endsWith("email");
                                });
                                var sumRes = "";
                                if (!lineToDataEmail) {
                                    sumRes = dataN;
                                }
                                else {
                                    sumRes = constructJsonLine(lineToDataEmail, dataWebhook);
                                }
                                createFieldJsonEmail_1 = createFieldJsonEmail_1 + sumRes;
                            });
                        }
                    }
                    else {
                        createFieldJsonEmail_1 = numberPhrase.email || "";
                    }
                    lengthLoop = nodes.length;
                    return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(whatsappId, companyId)];
                case 3:
                    whatsapp_1 = _39.sent();
                    checkAndCloseTicketIfAssigned = function (ticketId) { return __awaiter(void 0, void 0, void 0, function () {
                        var ticket_2, error_2;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: ticketId, whatsappId: whatsappId },
                                            include: [{ model: User_1["default"], as: "user" }]
                                        })];
                                case 1:
                                    ticket_2 = _b.sent();
                                    if (ticket_2 && ticket_2.userId) {
                                        console.log("Ticket ".concat(ticketId, " est\u00E1 com usu\u00E1rio ").concat((_a = ticket_2.user) === null || _a === void 0 ? void 0 : _a.name, ", parando fluxo autom\u00E1tico (n\u00E3o fecha ticket)"));
                                        return [2 /*return*/, true]; // Apenas para o fluxo — não fecha o ticket
                                    }
                                    return [2 /*return*/, false]; // Continua o fluxo normalmente
                                case 2:
                                    error_2 = _b.sent();
                                    console.error("Erro ao verificar status do ticket:", error_2);
                                    return [2 /*return*/, false];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    if (whatsapp_1.status !== "CONNECTED") {
                        return [2 /*return*/];
                    }
                    execCount = 0;
                    execFn_1 = "";
                    ticket_1 = null;
                    noAlterNext = false;
                    isContinue = false;
                    _loop_1 = function () {
                        var nodeSelected, ticketInit, shouldStop, awaitingAsaasResponse, nodeToFind_1, otherNode, msg_1, webhook, wbot, selectedOption, optionIndex, sourceHandle_1, connection, processedMessage, webhook, finalMessage, ticketDetails, error_3, nextNode, nextPressKey, _40, cfg, openAiSettings, promptIdNumber, prompt_1, _41, name_1, prompt_2, voice, voiceKey, voiceRegion, maxTokens, temperature, apiKey, queueId, maxMessages, normalizeNumeric, resolvedApiKey, wl, provider, toolsEnabled, error_4, contact, wbot, officialMsg, ticketTraking, error_5, cfg, openAiSettings, contact, ticketTraking, wbot, officialMsgBody, isAudio, isImage, isMedia, bodyMessage, buf, error_6, error_7, _42, waitTime, waitUnit, question, mediaType, mediaUrl, mediaName, optionX, optionY, timeoutEnabled, timeoutTime, timeoutUnit, totalSeconds_1, mediaErr_1, totalMinutes, error_8, questionData, message, answerKey, currentWebhookData, questionState, awaitingAnswer, Contact_2, _43, questionMessage, ticketDetails, updatedWebhookData, targetQueueId, queue, settings, enableQueuePosition, count, qtd, msgFila, ticketFilaDetails, bodyFila, _loop_2, iLoc, mediaDirectory, contact, fileExtension, fileNameWithoutExtension, error_9, ticketDetails, timerSeconds_1, targetFlowId, targetFlow, flowData, newNodes, newConnects, startNode_1, startConnection, newHashFlowId, messageData, apiToken, message, phoneNumber, queueId, sendSignature, closeTicket, processedMessage_1, ticket_3, contact, user, queue, hour, greeting, now, dataWebhook_1, answerKey, regex, requestBody, response, responseData, error_10, apiData, method, url, headers, body, saveResponse, savedVariables, processedUrl_1, processedBody_1, contact, variables_1, parsedHeaders, parsedBody, response_1, currentWebhook, currentVariables, newVariables_1, currentWebhook, currentVariables, error_11, tagData, tagId, tag, existingTag, newContactTag, newTicketTag, createError_1, io_1, ticketUpdated, error_12, tagData, tagId, tag, existingKanbanTags, _i, existingKanbanTags_1, existingTag, newTicketTag, error_13, SendMessage_2, whatsapp_2, number, body, result, error_14, ExecuteTagAutoActions, error_15, io_2, ticketUpdated, error_16, tagData, tagId, io_3, ticketUpdated, error_17, kanbanRows, kanbanTagIds, io_4, ticketUpdated, error_18, queueData, queueId, queue, io_5, ticketUpdated, error_19, ticketData, queueId, queue, ticketAfterUpdate, io_6, ticketUpdated, error_20, userData, userId, user, io_7, ticketUpdated, notificationMessage, error_21, tagData, tagId, tag, io_8, ticketUpdated, error_22, kanbanData, tagId, tag, existingKanbanTags, _44, existingKanbanTags_2, existingTag, io_9, ticketUpdated, error_23, isCondition, normalizeVariableKey, conditionData, key, normalizedKey, condition, value, variableValue, conditionResult, resultConnect, trueConnection, falseConnection, isKeywordCondition, keywordData, keywords, caseSensitive, ignoreAccents, userMessage, searchText, removeAccents, matchedKeyword, matchedIndex_1, i_1, keyword, searchKeyword, keywordMatched, regex, resultConnect, keywordConnection, defaultConnection, isAsaas, asaasData, message, successMessage, errorMessage, currentWebhookData, asaasState, awaitingCpf, updatedWebhook, cpf, resultConnect, boletoData, updatedWebhook, boletoFileSources, boletoLink, boletoFileSource, isOfficialAsaas, wbot, contactNumber, sendBufferOfficial, pdfBuffer, fileName, pdfError_1, fallbackText, linkError_1, pixMessage, imageBuffer, err_2, successConnection, error_24, updatedWebhook, errorConnection, isRandomizer, selectedRandom, resultConnect, smtpConfig, emailConfig, resultConnect, variables_2, emailBody_1, emailSubject_1, recipientEmail_1, nodemailer, transporter, confirmationMessage, error_25, errorMessage, errorConnection, sheetsConfig, operation, resultConnect_1, variables, GoogleSheetsService, sheetsService, result, _45, outputVariable, confirmationMessage, error_26, errorMessage, nextNode, message, processedMessage_2, contact, variables_3, wbot, messageData, title, listType, displayType, selectedItems_1, products, Produto, services, Servico, message_1, filteredProducts, filteredServices, carouselCards, defaultImage, _46, filteredProducts_1, product, name_2, price, desc, image, link, _47, filteredServices_1, service, name_3, price, error_27, ScheduleAppointmentService, messageText, activeOnly, maxSchedules, result, schedules, listMessage_1, selectedIndex, selectedSchedule, error_28, ScheduleAppointmentService, scheduleVariable, dateVariable, saveVariable, showMessage, messageText, replaceVariables, scheduleId, date, result, availableSlots, message, error_29, ScheduleAppointmentService, scheduleVariable, dateVariable, timeVariable, titleText, descriptionText, durationMinutes, contactVariable, successMessage, unavailableMessage, errorMessage, replaceVariables, scheduleId, date, time, title, description, contactId, errorConnection, availabilityResult, errorConnection, isAvailable, availableSlots, message_2, unavailableConnection, createResult, errorConnection, message, successConnection, error_30, errorConnection, appointmentVariable, newDateVariable, newTimeVariable, successMessage, errorMessage, replaceVariables, appointmentId, newDate, newTime, errorConnection, message, successConnection, error_31, errorConnection, appointmentVariable, reasonVariable, showMessage, successMessage, errorMessage, replaceVariables, appointmentId, reason, errorConnection, message, successConnection, error_32, errorConnection, connection, identifierVariable, replaceVariables, identifier, QueryTypes, sequelize, query, appointments, appointment, startDate, endDate, formatDateTime, formatTime, connection, error_33, connection, unavailableConnection, appointmentTitle, description, scheduleId, serviceId, identifierVariable, dateVariable, timeVariable, status_1, replaceVariables, titulo, descricao, identifier, dataStr, horaStr, errorConnection, QueryTypes, sequelize, serviceQuery, services, errorConnection, duracao, dataParts, dia, mes, ano, errorConnection, _48, hora, minuto, dataInicio, dataFim, agora, errorConnection, userQuery, userSchedule, _49, startWork, endWork, workDays, lunchStart, lunchEnd, diaSemana, diasTrabalho, errorConnection, startTime, endTime, errorConnection, lunchStartMinutes, lunchEndMinutes, appointmentStartMinutes, appointmentEndMinutes, overlapsLunch, errorConnection, existingAppointmentsQuery, existingAppointments, newStart, newEnd, hasConflict, _50, existingAppointments_1, existing, existingStart, existingEnd, unavailableConnection, clientId, clientQuery, clients, insertQuery, result, appointmentId, successConnection, error_34, errorConnection, isMenu, filterOne, filterTwo, isNodeExist, result, result, nextNodeConnection, hasNextNodes, updateData;
                        var _51;
                        return __generator(this, function (_52) {
                            switch (_52.label) {
                                case 0:
                                    ticketInit = void 0;
                                    console.log("=== LOOP PRINCIPAL ".concat(i, " - Buscando n\u00F3: ").concat(next_1, " ==="));
                                    if (!idTicket) return [3 /*break*/, 2];
                                    return [4 /*yield*/, checkAndCloseTicketIfAssigned(idTicket.toString())];
                                case 1:
                                    shouldStop = _52.sent();
                                    if (shouldStop) {
                                        console.log("Fluxo encerrado pois ticket está com usuário atribuído");
                                        return [2 /*return*/, "break"];
                                    }
                                    _52.label = 2;
                                case 2:
                                    awaitingAsaasResponse = !!pressKey &&
                                        ((_b = dataWebhook === null || dataWebhook === void 0 ? void 0 : dataWebhook.asaasState) === null || _b === void 0 ? void 0 : _b.awaiting) === true &&
                                        ((_c = dataWebhook === null || dataWebhook === void 0 ? void 0 : dataWebhook.asaasState) === null || _c === void 0 ? void 0 : _c.nodeId) === next_1;
                                    if (!pressKey) return [3 /*break*/, 7];
                                    console.log("UPDATE2... pressKey:", pressKey);
                                    console.log("UPDATE2... execFn:", execFn_1);
                                    console.log("UPDATE2... next:", next_1);
                                    if (!(pressKey === "parar")) return [3 /*break*/, 6];
                                    console.log("UPDATE3...");
                                    if (!idTicket) return [3 /*break*/, 5];
                                    console.log("UPDATE4...");
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId }
                                        })];
                                case 3:
                                    ticketInit = _52.sent();
                                    return [4 /*yield*/, ticket_1.update({
                                            status: "closed"
                                        })];
                                case 4:
                                    _52.sent();
                                    _52.label = 5;
                                case 5: return [2 /*return*/, "break"];
                                case 6:
                                    if (awaitingAsaasResponse) {
                                        console.log("UPDATE5... ASAAS RESPONSE");
                                        nodeSelected = nodes.find(function (node) { return node.id === next_1; });
                                    }
                                    else if (execFn_1 === "") {
                                        console.log("UPDATE5... execFn está vazio, usando nó atual do menu");
                                        // Não criar menu vazio, usar o nó menu atual
                                        nodeSelected = nodes.find(function (node) { return node.id === next_1; });
                                        if (!nodeSelected) {
                                            console.log("ERRO: Nó menu não encontrado com next:", next_1);
                                            return [2 /*return*/, "break"];
                                        }
                                    }
                                    else {
                                        console.log("UPDATE6... buscando nó com ID:", execFn_1);
                                        nodeSelected = nodes.filter(function (node) { return node.id === execFn_1; })[0];
                                        if (!nodeSelected) {
                                            console.log("ERRO: Nó não encontrado com execFn:", execFn_1);
                                        }
                                    }
                                    console.log("N\u00F3 encontrado: ".concat(nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.id, " - Tipo: ").concat(nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.type));
                                    return [3 /*break*/, 8];
                                case 7:
                                    nodeToFind_1 = execFn_1 !== "" ? execFn_1 : next_1;
                                    console.log("UPDATE7... sem pressKey, buscando:", nodeToFind_1, "(execFn:", execFn_1, ", next:", next_1, ")");
                                    otherNode = nodes.filter(function (node) { return node.id === nodeToFind_1; })[0];
                                    if (otherNode) {
                                        nodeSelected = otherNode;
                                        console.log("N\u00F3 encontrado: ".concat(nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.id, " - Tipo: ").concat(nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.type));
                                        // Resetar execFn após usar
                                        if (execFn_1 !== "") {
                                            next_1 = execFn_1;
                                            execFn_1 = "";
                                        }
                                    }
                                    else {
                                        console.log("ERRO: Nó não encontrado com ID:", nodeToFind_1);
                                        console.log("Nós disponíveis:", nodes.map(function (n) { return ({ id: n.id, type: n.type }); }));
                                        return [2 /*return*/, "break"];
                                    }
                                    _52.label = 8;
                                case 8:
                                    // VALIDAÇÃO: Verificar se nodeSelected foi encontrado
                                    if (!nodeSelected) {
                                        console.log("ERRO: nodeSelected é undefined - pulando iteração");
                                        console.log("next:", next_1, "execFn:", execFn_1);
                                        return [2 /*return*/, "continue"];
                                    }
                                    if (!(nodeSelected.type === "message")) return [3 /*break*/, 13];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 10];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 9:
                                    ticket_1 = _52.sent();
                                    _52.label = 10;
                                case 10:
                                    msg_1 = void 0;
                                    webhook = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook;
                                    if (webhook && webhook.hasOwnProperty("variables")) {
                                        msg_1 = {
                                            body: replaceMessages(webhook, nodeSelected.data.label)
                                        };
                                    }
                                    else {
                                        msg_1 = {
                                            body: nodeSelected.data.label
                                        };
                                    }
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: msg_1.body
                                        })];
                                case 11:
                                    _52.sent();
                                    //TESTE BOTÃO
                                    //await SendMessageFlow(whatsapp, {
                                    //  number: numberClient,
                                    //  body: msg.body
                                    //} )
                                    return [4 /*yield*/, intervalWhats("1")];
                                case 12:
                                    //TESTE BOTÃO
                                    //await SendMessageFlow(whatsapp, {
                                    //  number: numberClient,
                                    //  body: msg.body
                                    //} )
                                    _52.sent();
                                    _52.label = 13;
                                case 13:
                                    console.log("273");
                                    if (!(nodeSelected.type === "typebot")) return [3 /*break*/, 16];
                                    console.log("275");
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 14];
                                    console.warn("[FlowBuilder] Nó typebot não suportado na API Oficial — ignorando.");
                                    return [3 /*break*/, 16];
                                case 14:
                                    wbot = (0, wbot_1.getWbot)(whatsapp_1.id);
                                    return [4 /*yield*/, (0, typebotListener_1["default"])({
                                            wbot: wbot,
                                            msg: msg,
                                            ticket: ticket_1,
                                            typebot: nodeSelected.data.typebotIntegration
                                        })];
                                case 15:
                                    _52.sent();
                                    _52.label = 16;
                                case 16:
                                    if (!(nodeSelected.type === "menu")) return [3 /*break*/, 31];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 18];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 17:
                                    ticket_1 = _52.sent();
                                    _52.label = 18;
                                case 18:
                                    console.log("650 menu");
                                    console.log("Menu data:", nodeSelected.data);
                                    console.log("PressKey:", pressKey);
                                    // Verificar se nodeSelected.data existe
                                    if (!nodeSelected.data || !nodeSelected.data.arrayOption) {
                                        console.log("ERRO: Menu não possui dados ou arrayOption", nodeSelected);
                                        return [2 /*return*/, "break"];
                                    }
                                    console.log("Array options:", nodeSelected.data.arrayOption);
                                    if (!pressKey) return [3 /*break*/, 19];
                                    selectedOption = nodeSelected.data.arrayOption.find(function (option) { return option.number == pressKey; });
                                    // Se não encontrar por número, tenta por valor (texto)
                                    if (!selectedOption) {
                                        selectedOption = nodeSelected.data.arrayOption.find(function (option) { return option.value === pressKey || option.value.toLowerCase() === pressKey.toLowerCase(); });
                                    }
                                    if (selectedOption) {
                                        console.log("Opção selecionada:", selectedOption);
                                        next_1 = selectedOption.next;
                                        console.log("Próximo nó definido:", next_1);
                                        // Se next não estiver definido, usar as conexões do flow
                                        if (!next_1 && connects) {
                                            console.log("Next undefined, buscando nas conexões...");
                                            optionIndex = nodeSelected.data.arrayOption.findIndex(function (opt) { return opt.number == pressKey || opt.value === pressKey || opt.value.toLowerCase() === pressKey.toLowerCase(); });
                                            sourceHandle_1 = "a".concat(optionIndex + 1);
                                            connection = connects.find(function (conn) {
                                                return conn.source === nodeSelected.id && conn.sourceHandle === sourceHandle_1;
                                            });
                                            if (connection) {
                                                next_1 = connection.target;
                                                console.log("Próximo nó encontrado via conexão:", next_1);
                                            }
                                        }
                                    }
                                    else {
                                        console.log("Opção não encontrada para:", pressKey, "- aguardando seleção válida");
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    return [3 /*break*/, 29];
                                case 19:
                                    console.log("Nenhum pressKey fornecido - enviando mensagem do menu");
                                    if (!!ticket_1.contact) return [3 /*break*/, 21];
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 20:
                                    ticket_1 = _52.sent();
                                    _52.label = 21;
                                case 21:
                                    processedMessage = nodeSelected.data.message;
                                    if (ticket_1 && ticket_1.contact) {
                                        processedMessage = (0, Mustache_1["default"])(processedMessage, ticket_1);
                                        console.log("Variáveis processadas:", processedMessage);
                                    }
                                    else {
                                        console.log("ERRO: ticket ou ticket.contact não disponível para processar variáveis");
                                    }
                                    webhook = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook;
                                    finalMessage = processedMessage;
                                    if (webhook && webhook.hasOwnProperty("variables")) {
                                        finalMessage = replaceMessages(webhook, processedMessage);
                                    }
                                    console.log("Enviando mensagem do menu:", finalMessage);
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 22:
                                    ticketDetails = _52.sent();
                                    _52.label = 23;
                                case 23:
                                    _52.trys.push([23, 25, , 26]);
                                    return [4 /*yield*/, (0, SendInteractiveMenu_1.SendMenuWithFallback)({
                                            ticket: ticketDetails,
                                            menuMessage: finalMessage,
                                            arrayOption: nodeSelected.data.arrayOption,
                                            menuType: nodeSelected.data.menuType || "buttons"
                                        })];
                                case 24:
                                    _52.sent();
                                    return [3 /*break*/, 26];
                                case 25:
                                    error_3 = _52.sent();
                                    console.error("Erro ao enviar menu para ticket ".concat(ticket_1.id, ":"), error_3);
                                    return [3 /*break*/, 26];
                                case 26:
                                    (0, SetTicketMessagesAsRead_1["default"])(ticketDetails);
                                    return [4 /*yield*/, ticketDetails.update({
                                            lastMessage: (0, Mustache_1["default"])(finalMessage, ticket_1.contact)
                                        })];
                                case 27:
                                    _52.sent();
                                    return [4 /*yield*/, intervalWhats("1")];
                                case 28:
                                    _52.sent();
                                    _52.label = 29;
                                case 29:
                                    if (!(next_1 && next_1 !== nodeSelected.id)) return [3 /*break*/, 31];
                                    console.log("Menu: Processando próximo nó recursivamente:", next_1);
                                    nextNode = nodes.find(function (n) { return n.id === next_1; });
                                    if (!nextNode) return [3 /*break*/, 31];
                                    nextPressKey = nextNode.type === "menu" ? undefined : pressKey;
                                    console.log("Menu: Próximo nó tipo:", nextNode.type, "pressKey será:", nextPressKey);
                                    _40 = {};
                                    return [4 /*yield*/, (0, exports.ActionsWebhookService)(whatsappId, idFlowDb, companyId, nodes, connects, next_1, dataWebhook, details, hashWebhookId, nextPressKey, idTicket, numberPhrase, msg)];
                                case 30: return [2 /*return*/, (_40.value = _52.sent(), _40)];
                                case 31:
                                    if (!(nodeSelected.type === "openai")) return [3 /*break*/, 45];
                                    console.log("=== PROCESSANDO N\u00D3 openai (AGENTE IA) ===");
                                    console.log("OpenAI: nodeSelected.data=", JSON.stringify(nodeSelected.data, null, 2));
                                    _52.label = 32;
                                case 32:
                                    _52.trys.push([32, 44, , 45]);
                                    cfg = nodeSelected.data.typebotIntegration || {};
                                    console.log("OpenAI: Configura\u00E7\u00E3o extra\u00EDda=", JSON.stringify(cfg, null, 2));
                                    // VALIDAÇÃO INICIAL
                                    if (!cfg || Object.keys(cfg).length === 0) {
                                        console.error("OpenAI: ERRO - Nenhuma configura\u00E7\u00E3o encontrada no n\u00F3");
                                        return [2 /*return*/, "continue"];
                                    }
                                    openAiSettings = void 0;
                                    promptIdNumber = cfg.iaId ? Number(cfg.iaId) : NaN;
                                    console.log("OpenAI: iaMode=".concat(cfg.iaMode, ", iaId=").concat(cfg.iaId, ", promptIdNumber=").concat(promptIdNumber));
                                    if (!(cfg.iaMode === "system" && !Number.isNaN(promptIdNumber))) return [3 /*break*/, 34];
                                    console.log("OpenAI: Buscando prompt do sistema ID=".concat(promptIdNumber));
                                    return [4 /*yield*/, (0, ShowPromptService_1["default"])({
                                            promptId: promptIdNumber,
                                            companyId: companyId
                                        })];
                                case 33:
                                    prompt_1 = _52.sent();
                                    if (!prompt_1) {
                                        console.error("OpenAI: ERRO - Prompt ID=".concat(promptIdNumber, " n\u00E3o encontrado"));
                                        return [2 /*return*/, "continue"];
                                    }
                                    console.log("OpenAI: Prompt encontrado=\"".concat(prompt_1.name, "\""));
                                    openAiSettings = {
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
                                    return [3 /*break*/, 37];
                                case 34:
                                    _41 = cfg, name_1 = _41.name, prompt_2 = _41.prompt, voice = _41.voice, voiceKey = _41.voiceKey, voiceRegion = _41.voiceRegion, maxTokens = _41.maxTokens, temperature = _41.temperature, apiKey = _41.apiKey, queueId = _41.queueId, maxMessages = _41.maxMessages;
                                    normalizeNumeric = function (value, fallback) {
                                        if (fallback === void 0) { fallback = 0; }
                                        if (typeof value === "number") {
                                            return Number.isFinite(value) ? value : fallback;
                                        }
                                        if (typeof value === "string" && value.trim().length) {
                                            var parsed = Number(value);
                                            return Number.isFinite(parsed) ? parsed : fallback;
                                        }
                                        return fallback;
                                    };
                                    resolvedApiKey = apiKey;
                                    if (!(cfg.aiMode === "system" || !cfg.aiMode)) return [3 /*break*/, 36];
                                    return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(companyId)];
                                case 35:
                                    wl = _52.sent();
                                    provider = (cfg.provider || "openai").toLowerCase();
                                    resolvedApiKey = provider === "gemini" ? (wl.geminiApiKey || "") : (wl.openaiApiKey || "");
                                    _52.label = 36;
                                case 36:
                                    openAiSettings = {
                                        name: name_1,
                                        prompt: prompt_2,
                                        voice: voice,
                                        voiceKey: voiceKey,
                                        voiceRegion: voiceRegion,
                                        maxTokens: normalizeNumeric(maxTokens, 800),
                                        temperature: normalizeNumeric(temperature, 1),
                                        apiKey: resolvedApiKey,
                                        provider: cfg.provider || "openai",
                                        model: cfg.model,
                                        queueId: normalizeNumeric(queueId, 0),
                                        maxMessages: normalizeNumeric(maxMessages, 10),
                                        promptId: Number.isNaN(promptIdNumber) ? null : promptIdNumber
                                    };
                                    _52.label = 37;
                                case 37:
                                    _52.trys.push([37, 39, , 40]);
                                    return [4 /*yield*/, (0, ListPromptToolSettingsService_1["default"])({
                                            companyId: companyId,
                                            promptId: (_d = openAiSettings.promptId) !== null && _d !== void 0 ? _d : null
                                        })];
                                case 38:
                                    toolsEnabled = _52.sent();
                                    openAiSettings.toolsEnabled = toolsEnabled;
                                    console.log("OpenAI: ".concat(toolsEnabled.length, " ferramentas habilitadas"));
                                    return [3 /*break*/, 40];
                                case 39:
                                    error_4 = _52.sent();
                                    console.error("Erro ao carregar toolsEnabled (Webhook):", error_4);
                                    return [3 /*break*/, 40];
                                case 40:
                                    // VALIDAÇÃO FINAL
                                    if (!openAiSettings.prompt || !openAiSettings.apiKey) {
                                        console.error("OpenAI: ERRO - Configura\u00E7\u00E3o incompleta:", {
                                            hasPrompt: !!openAiSettings.prompt,
                                            hasApiKey: !!openAiSettings.apiKey
                                        });
                                        return [2 /*return*/, "continue"];
                                    }
                                    console.log("OpenAI: Configura\u00E7\u00E3o validada com sucesso - Iniciando processamento");
                                    return [4 /*yield*/, Contact_1["default"].findOne({
                                            where: { number: numberClient_1, companyId: companyId }
                                        })];
                                case 41:
                                    contact = _52.sent();
                                    wbot = (whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official"
                                        ? createOfficialWbotShim(whatsapp_1, ticket_1, contact, companyId)
                                        : (0, wbot_1.getWbot)(whatsapp_1.id);
                                    officialMsg = (whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official" && !msg
                                        ? { key: { remoteJid: "".concat(numberClient_1, "@s.whatsapp.net"), fromMe: false, id: (0, randomCode_1.randomString)(20) }, message: { conversation: pressKey || "" }, messageTimestamp: Math.floor(Date.now() / 1000) }
                                        : msg;
                                    return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                                            ticketId: ticket_1.id,
                                            companyId: companyId,
                                            userId: null,
                                            whatsappId: whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.id
                                        })];
                                case 42:
                                    ticketTraking = _52.sent();
                                    console.log("OpenAI: Enviando para handleOpenAi...");
                                    return [4 /*yield*/, (0, OpenAiService_1.handleOpenAi)(openAiSettings, officialMsg, wbot, ticket_1, contact, null, ticketTraking)];
                                case 43:
                                    _52.sent();
                                    console.log("OpenAI: Processamento conclu\u00EDdo com sucesso");
                                    return [3 /*break*/, 45];
                                case 44:
                                    error_5 = _52.sent();
                                    console.error("OpenAI: ERRO CR\u00CDTICO NO PROCESSAMENTO:", error_5);
                                    console.error("OpenAI: Stack trace:", error_5.stack);
                                    return [2 /*return*/, "continue"];
                                case 45:
                                    if (!(nodeSelected.type === "directOpenai")) return [3 /*break*/, 58];
                                    console.log("=== PROCESSANDO N\u00D3 directOpenai (AGENTE DIRETO) ===");
                                    console.log("DirectOpenAI: nodeSelected.data=", JSON.stringify(nodeSelected.data, null, 2));
                                    if (!ticket_1) return [3 /*break*/, 47];
                                    console.log("DirectOpenAI: FOR\u00C7ANDO atualiza\u00E7\u00E3o do lastFlowId para ".concat(nodeSelected.id));
                                    return [4 /*yield*/, ticket_1.update({ lastFlowId: nodeSelected.id })];
                                case 46:
                                    _52.sent();
                                    _52.label = 47;
                                case 47:
                                    _52.trys.push([47, 57, , 58]);
                                    cfg = nodeSelected.data;
                                    console.log("DirectOpenAI: Configura\u00E7\u00E3o extra\u00EDda=", JSON.stringify(cfg, null, 2));
                                    // VALIDAÇÃO INICIAL
                                    if (!cfg || Object.keys(cfg).length === 0) {
                                        console.error("DirectOpenAI: ERRO - Nenhuma configura\u00E7\u00E3o encontrada no n\u00F3");
                                        return [2 /*return*/, "continue"];
                                    }
                                    openAiSettings = {
                                        name: "Agente Direto",
                                        prompt: cfg.prompt || "",
                                        apiKey: cfg.apiKey || "",
                                        provider: cfg.provider || "openai",
                                        model: cfg.model || "gemini-2.0-flash",
                                        voice: cfg.voice || "texto",
                                        voiceKey: cfg.voiceKey || "",
                                        voiceRegion: cfg.voiceRegion || "",
                                        maxTokens: cfg.maxTokens || 1000,
                                        temperature: cfg.temperature || 0.7,
                                        queueId: null,
                                        maxMessages: cfg.maxMessages || 10,
                                        ttsModel: cfg.ttsModel || "tts-1",
                                        audioPercentage: cfg.audioPercentage || 30,
                                        toolsEnabled: cfg.toolsEnabled || [],
                                        knowledgeBase: cfg.knowledgeBase || [],
                                        knowledgeBaseIds: cfg.knowledgeBaseIds || []
                                    };
                                    console.log("DirectOpenAI: Configura\u00E7\u00E3o montada=", JSON.stringify(openAiSettings, null, 2));
                                    // VALIDAÇÃO FINAL
                                    if (!openAiSettings.prompt || !openAiSettings.apiKey) {
                                        console.error("DirectOpenAI: ERRO - Configura\u00E7\u00E3o incompleta:", {
                                            hasPrompt: !!openAiSettings.prompt,
                                            hasApiKey: !!openAiSettings.apiKey
                                        });
                                        return [2 /*return*/, "continue"];
                                    }
                                    console.log("DirectOpenAI: Configura\u00E7\u00E3o validada com sucesso - Iniciando processamento");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 49];
                                    return [4 /*yield*/, Ticket_1["default"].findByPk(idTicket)];
                                case 48:
                                    ticket_1 = _52.sent();
                                    _52.label = 49;
                                case 49:
                                    if (!ticket_1) {
                                        console.error("DirectOpenAI: Ticket n\u00E3o encontrado (idTicket: ".concat(idTicket, ")"));
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, Contact_1["default"].findOne({
                                            where: { number: numberClient_1, companyId: companyId }
                                        })];
                                case 50:
                                    contact = _52.sent();
                                    return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                                            ticketId: ticket_1.id,
                                            companyId: companyId,
                                            userId: null,
                                            whatsappId: whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.id
                                        })];
                                case 51:
                                    ticketTraking = _52.sent();
                                    wbot = (whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official"
                                        ? createOfficialWbotShim(whatsapp_1, ticket_1, contact, companyId)
                                        : (0, wbot_1.getWbot)(whatsapp_1.id);
                                    officialMsgBody = pressKey || "";
                                    if ((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official" && !msg && officialMsgBody) {
                                        msg = { key: { remoteJid: "".concat(numberClient_1, "@s.whatsapp.net"), fromMe: false, id: (0, randomCode_1.randomString)(20) }, message: { conversation: officialMsgBody }, messageTimestamp: Math.floor(Date.now() / 1000) };
                                    }
                                    if (!msg) return [3 /*break*/, 54];
                                    isAudio = !!((_e = msg.message) === null || _e === void 0 ? void 0 : _e.audioMessage);
                                    isImage = !!((_f = msg.message) === null || _f === void 0 ? void 0 : _f.imageMessage);
                                    isMedia = isAudio || isImage;
                                    bodyMessage = ((_g = msg.message) === null || _g === void 0 ? void 0 : _g.conversation) || ((_j = (_h = msg.message) === null || _h === void 0 ? void 0 : _h.extendedTextMessage) === null || _j === void 0 ? void 0 : _j.text) || ((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official" ? pressKey || "" : "");
                                    // Ignorar mensagens sem conteúdo útil (nem texto nem mídia suportada)
                                    if (!isMedia && !bodyMessage) {
                                        console.log("DirectOpenAI: Mensagem sem texto nem m\u00EDdia reconhecida, ignorando");
                                        return [2 /*return*/, "continue"];
                                    }
                                    if (!(ticket_1 && ticket_1.lastFlowId !== nodeSelected.id)) return [3 /*break*/, 53];
                                    console.log("DirectOpenAI: Atualizando lastFlowId de \"".concat(ticket_1.lastFlowId, "\" para \"").concat(nodeSelected.id, "\""));
                                    return [4 /*yield*/, ticket_1.update({ lastFlowId: nodeSelected.id })];
                                case 52:
                                    _52.sent();
                                    _52.label = 53;
                                case 53:
                                    // Inicializa o buffer se ainda não existir
                                    if (!directOpenAiMessageBuffer[ticket_1.id]) {
                                        directOpenAiMessageBuffer[ticket_1.id] = { texts: [], medias: [] };
                                    }
                                    buf = directOpenAiMessageBuffer[ticket_1.id];
                                    // Adiciona conteúdo ao buffer conforme o tipo
                                    if (isMedia) {
                                        buf.medias.push(msg);
                                        console.log("DirectOpenAI: M\u00EDdia adicionada ao buffer (".concat(isAudio ? "áudio" : "imagem", "). Total m\u00EDdias: ").concat(buf.medias.length));
                                    }
                                    if (bodyMessage) {
                                        buf.texts.push(bodyMessage);
                                        console.log("DirectOpenAI: Texto adicionado ao buffer. Total textos: ".concat(buf.texts.length));
                                    }
                                    // Atualiza referências de contexto no buffer
                                    buf.msg = msg;
                                    buf.openAiSettings = openAiSettings;
                                    buf.wbot = wbot;
                                    buf.ticket = ticket_1;
                                    buf.contact = contact;
                                    buf.ticketTraking = ticketTraking;
                                    // Reinicia o timeout de 12s a cada nova mensagem recebida
                                    if (buf.timeout) {
                                        clearTimeout(buf.timeout);
                                    }
                                    buf.timeout = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var buffer, totalTexts, totalMedias, msgsToSend, combinedText, combinedMsg, payload, error_35;
                                        var _a, _b, _c, _d;
                                        return __generator(this, function (_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    _e.trys.push([0, 2, , 3]);
                                                    buffer = directOpenAiMessageBuffer[ticket_1.id];
                                                    if (!buffer)
                                                        return [2 /*return*/];
                                                    delete directOpenAiMessageBuffer[ticket_1.id];
                                                    totalTexts = buffer.texts.length;
                                                    totalMedias = buffer.medias.length;
                                                    console.log("\uD83E\uDDE0 DirectOpenAI: Disparando ap\u00F3s 12s \u2014 ".concat(totalTexts, " texto(s), ").concat(totalMedias, " m\u00EDdia(s)"));
                                                    msgsToSend = __spreadArray([], buffer.medias, true);
                                                    if (buffer.texts.length > 0) {
                                                        combinedText = buffer.texts.join(". ");
                                                        combinedMsg = JSON.parse(JSON.stringify(buffer.msg));
                                                        if (((_a = combinedMsg.message) === null || _a === void 0 ? void 0 : _a.audioMessage) || ((_b = combinedMsg.message) === null || _b === void 0 ? void 0 : _b.imageMessage)) {
                                                            // msg de referência é mídia — cria envelope de texto puro
                                                            combinedMsg.message = { conversation: combinedText };
                                                        }
                                                        else if ((_c = combinedMsg.message) === null || _c === void 0 ? void 0 : _c.conversation) {
                                                            combinedMsg.message.conversation = combinedText;
                                                        }
                                                        else if ((_d = combinedMsg.message) === null || _d === void 0 ? void 0 : _d.extendedTextMessage) {
                                                            combinedMsg.message.extendedTextMessage.text = combinedText;
                                                        }
                                                        else {
                                                            combinedMsg.message = { conversation: combinedText };
                                                        }
                                                        msgsToSend.push(combinedMsg);
                                                    }
                                                    payload = msgsToSend.length === 1 ? msgsToSend[0] : msgsToSend;
                                                    return [4 /*yield*/, (0, OpenAiService_1.handleOpenAi)(buffer.openAiSettings, payload, buffer.wbot, buffer.ticket, buffer.contact, null, buffer.ticketTraking)];
                                                case 1:
                                                    _e.sent();
                                                    console.log("DirectOpenAI: Processamento conclu\u00EDdo com sucesso");
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    error_35 = _e.sent();
                                                    console.error("DirectOpenAI: ERRO ao processar mensagens agrupadas:", error_35);
                                                    console.error("DirectOpenAI: Stack trace:", error_35.stack);
                                                    return [3 /*break*/, 3];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 12000); // 12 segundos
                                    return [2 /*return*/, "break"];
                                case 54:
                                    // Se NÃO houver mensagem (primeira execução do nó), apenas continua o fluxo
                                    console.log("DirectOpenAI: N\u00F3 ativado, aguardando mensagens do usu\u00E1rio...");
                                    if (!(ticket_1 && ticket_1.lastFlowId !== nodeSelected.id)) return [3 /*break*/, 56];
                                    console.log("DirectOpenAI: Primeira entrada no n\u00F3 - atualizando lastFlowId de ".concat(ticket_1.lastFlowId, " para ").concat(nodeSelected.id));
                                    return [4 /*yield*/, ticket_1.update({ lastFlowId: nodeSelected.id })];
                                case 55:
                                    _52.sent();
                                    _52.label = 56;
                                case 56: return [3 /*break*/, 58];
                                case 57:
                                    error_6 = _52.sent();
                                    console.error("DirectOpenAI: ERRO CR\u00CDTICO NO PROCESSAMENTO:", error_6);
                                    console.error("DirectOpenAI: Stack trace:", error_6.stack);
                                    return [2 /*return*/, "continue"];
                                case 58:
                                    if (!(nodeSelected.type === "followUp")) return [3 /*break*/, 65];
                                    console.log("FollowUp: processando nó", nodeSelected.id);
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 60];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({ where: { id: idTicket, companyId: companyId } })];
                                case 59:
                                    ticket_1 = _52.sent();
                                    _52.label = 60;
                                case 60:
                                    if (!ticket_1) {
                                        console.warn("FollowUp: ticket não encontrado, encerrando fluxo");
                                        return [2 /*return*/, "break"];
                                    }
                                    _52.label = 61;
                                case 61:
                                    _52.trys.push([61, 63, , 64]);
                                    return [4 /*yield*/, FollowUpNodeService_1["default"].executeFollowUpNode(nodeSelected.data, ticket_1.id, companyId, nodeSelected.id)];
                                case 62:
                                    _52.sent();
                                    console.log("FollowUp: agendado com delay ".concat((_k = nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.data) === null || _k === void 0 ? void 0 : _k.delayMinutes, " min para ticket ").concat(ticket_1.id));
                                    return [3 /*break*/, 64];
                                case 63:
                                    error_7 = _52.sent();
                                    console.error("FollowUp: erro ao agendar follow-up", error_7);
                                    return [3 /*break*/, 64];
                                case 64:
                                    console.log("FollowUp: aguardando próximo nó via conexões padrão");
                                    _52.label = 65;
                                case 65:
                                    if (!(nodeSelected.type === "waitQuestion")) return [3 /*break*/, 78];
                                    console.log("WaitQuestion: processando nó", nodeSelected.id);
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 67];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({ where: { id: idTicket, companyId: companyId } })];
                                case 66:
                                    ticket_1 = _52.sent();
                                    _52.label = 67;
                                case 67:
                                    if (!ticket_1) {
                                        console.warn("WaitQuestion: ticket não encontrado, encerrando fluxo");
                                        return [2 /*return*/, "break"];
                                    }
                                    _52.label = 68;
                                case 68:
                                    _52.trys.push([68, 77, , 78]);
                                    _42 = nodeSelected.data, waitTime = _42.waitTime, waitUnit = _42.waitUnit, question = _42.question, mediaType = _42.mediaType, mediaUrl = _42.mediaUrl, mediaName = _42.mediaName, optionX = _42.optionX, optionY = _42.optionY, timeoutEnabled = _42.timeoutEnabled, timeoutTime = _42.timeoutTime, timeoutUnit = _42.timeoutUnit;
                                    totalSeconds_1 = waitUnit === "hours" ? waitTime * 3600 : waitTime * 60;
                                    // Aguardar o tempo configurado (igual ao interval)
                                    console.log("WaitQuestion: Aguardando ".concat(totalSeconds_1, " segundos..."));
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            setTimeout(function () {
                                                console.log("WaitQuestion: Tempo de espera finalizado.");
                                                resolve(true);
                                            }, totalSeconds_1 * 1000);
                                        })];
                                case 69:
                                    _52.sent();
                                    if (!(mediaType && mediaType !== "none" && mediaUrl)) return [3 /*break*/, 73];
                                    _52.label = 70;
                                case 70:
                                    _52.trys.push([70, 72, , 73]);
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1["default"])({
                                            media: mediaUrl,
                                            ticket: ticket_1
                                        })];
                                case 71:
                                    _52.sent();
                                    console.log("WaitQuestion: M\u00EDdia enviada para ticket ".concat(ticket_1.id));
                                    return [3 /*break*/, 73];
                                case 72:
                                    mediaErr_1 = _52.sent();
                                    console.error("WaitQuestion: Erro ao enviar m\u00EDdia:", mediaErr_1);
                                    return [3 /*break*/, 73];
                                case 73:
                                    if (!question) return [3 /*break*/, 75];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: question
                                        })];
                                case 74:
                                    _52.sent();
                                    console.log("WaitQuestion: Pergunta enviada para ticket ".concat(ticket_1.id));
                                    _52.label = 75;
                                case 75:
                                    totalMinutes = waitUnit === "hours" ? waitTime * 60 : waitTime;
                                    return [4 /*yield*/, ticket_1.update({
                                            waitingQuestion: true,
                                            questionNodeId: nodeSelected.id,
                                            questionOptions: { optionX: optionX, optionY: optionY },
                                            timeoutEnabled: !!timeoutEnabled,
                                            timeoutAt: timeoutEnabled ? new Date(Date.now() + ((timeoutUnit === "hours" ? timeoutTime * 60 : timeoutTime)) * 60000) : null,
                                            maxQuestionAttempts: 3,
                                            questionAttempts: 0
                                        })];
                                case 76:
                                    _52.sent();
                                    console.log("WaitQuestion: Ticket ".concat(ticket_1.id, " aguardando resposta"));
                                    // Pausar fluxo - aguardar resposta do usuário
                                    next_1 = null;
                                    return [3 /*break*/, 78];
                                case 77:
                                    error_8 = _52.sent();
                                    console.error("WaitQuestion: erro ao processar", error_8);
                                    next_1 = null;
                                    return [3 /*break*/, 78];
                                case 78:
                                    if (!(nodeSelected.type === "question")) return [3 /*break*/, 113];
                                    console.log("Question: Debug - idTicket:", idTicket);
                                    console.log("Question: Debug - ticket antes:", ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id);
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 80];
                                    console.log("Question: Carregando ticket do banco...");
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 79:
                                    ticket_1 = _52.sent();
                                    console.log("Question: Ticket carregado:", ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id);
                                    _52.label = 80;
                                case 80:
                                    questionData = ((_l = nodeSelected.data) === null || _l === void 0 ? void 0 : _l.typebotIntegration) || {};
                                    message = questionData.message;
                                    answerKey = (questionData === null || questionData === void 0 ? void 0 : questionData.answerKey) || "question_".concat(nodeSelected.id);
                                    currentWebhookData = (ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) || {};
                                    questionState = currentWebhookData === null || currentWebhookData === void 0 ? void 0 : currentWebhookData.questionState;
                                    awaitingAnswer = (questionState === null || questionState === void 0 ? void 0 : questionState.awaiting) === true &&
                                        (questionState === null || questionState === void 0 ? void 0 : questionState.nodeId) === nodeSelected.id;
                                    if (awaitingAnswer) {
                                        console.log("Question: aguardando resposta do cliente");
                                        return [2 /*return*/, "break"];
                                    }
                                    // Verificar se ticket e contact existem antes de formatar mensagem
                                    console.log("Question: Debug - ticket existe:", !!ticket_1);
                                    console.log("Question: Debug - ticket.contact existe:", !!(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contact));
                                    console.log("Question: Debug - ticket.contactId:", ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contactId);
                                    if (!(!ticket_1 || !ticket_1.contact)) return [3 /*break*/, 83];
                                    console.log("Question: ticket ou contact é nulo, tentando carregar contact...");
                                    if (!(ticket_1 && ticket_1.contactId && !ticket_1.contact)) return [3 /*break*/, 82];
                                    console.log("Question: Carregando contact do banco...");
                                    Contact_2 = require("../../models/Contact")["default"];
                                    _43 = ticket_1;
                                    return [4 /*yield*/, Contact_2.findByPk(ticket_1.contactId)];
                                case 81:
                                    _43.contact = _52.sent();
                                    console.log("Question: Contact carregado:", !!ticket_1.contact);
                                    _52.label = 82;
                                case 82:
                                    if (!ticket_1.contact) {
                                        console.log("Question: Impossível continuar sem contact");
                                        return [2 /*return*/, "break"];
                                    }
                                    _52.label = 83;
                                case 83:
                                    questionMessage = (0, Mustache_1["default"])("".concat(message || ""), ticket_1.contact);
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 84:
                                    ticketDetails = _52.sent();
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) !== "whatsapp_official")) return [3 /*break*/, 88];
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                case 85:
                                    _52.sent();
                                    return [4 /*yield*/, (0, bluebird_1.delay)(2000)];
                                case 86:
                                    _52.sent();
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "paused")];
                                case 87:
                                    _52.sent();
                                    _52.label = 88;
                                case 88:
                                    console.log("ActionsWebhookService Node Question1: ", questionMessage);
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 90];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: questionMessage, companyId: companyId }, false, ticketDetails)];
                                case 89:
                                    _52.sent();
                                    return [3 /*break*/, 92];
                                case 90: return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: questionMessage, ticket: ticketDetails, quotedMsg: null })];
                                case 91:
                                    _52.sent();
                                    _52.label = 92;
                                case 92:
                                    (0, SetTicketMessagesAsRead_1["default"])(ticketDetails);
                                    return [4 /*yield*/, ticketDetails.update({
                                            lastMessage: questionMessage
                                        })];
                                case 93:
                                    _52.sent();
                                    updatedWebhookData = __assign(__assign({}, currentWebhookData), { questionState: {
                                            awaiting: true,
                                            nodeId: nodeSelected.id,
                                            answerKey: answerKey
                                        } });
                                    return [4 /*yield*/, ticket_1.update({
                                            userId: null,
                                            companyId: companyId,
                                            flowWebhook: true,
                                            lastFlowId: nodeSelected.type === "directOpenai" ? ticket_1.lastFlowId : nodeSelected.id,
                                            dataWebhook: updatedWebhookData,
                                            hashFlowId: hashWebhookId,
                                            flowStopped: idFlowDb.toString()
                                        })];
                                case 94:
                                    _52.sent();
                                    targetQueueId = (_r = (_o = (_m = nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.data) === null || _m === void 0 ? void 0 : _m.queueId) !== null && _o !== void 0 ? _o : (_q = (_p = nodeSelected === null || nodeSelected === void 0 ? void 0 : nodeSelected.data) === null || _p === void 0 ? void 0 : _p.typebotIntegration) === null || _q === void 0 ? void 0 : _q.queueId) !== null && _r !== void 0 ? _r : ticket_1.queueId;
                                    if (!targetQueueId) {
                                        return [2 /*return*/, "break"];
                                    }
                                    return [4 /*yield*/, (0, ShowQueueService_1["default"])(Number(targetQueueId), companyId)];
                                case 95:
                                    queue = _52.sent();
                                    return [4 /*yield*/, ticket_1.update({
                                            status: "pending",
                                            queueId: queue.id,
                                            userId: ticket_1.userId,
                                            companyId: companyId,
                                            flowWebhook: true,
                                            lastFlowId: nodeSelected.type === "directOpenai" ? ticket_1.lastFlowId : nodeSelected.id,
                                            hashFlowId: hashWebhookId,
                                            flowStopped: idFlowDb.toString()
                                        })];
                                case 96:
                                    _52.sent();
                                    return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                                            ticketId: ticket_1.id,
                                            companyId: companyId,
                                            whatsappId: ticket_1.whatsappId,
                                            userId: ticket_1.userId
                                        })];
                                case 97:
                                    _52.sent();
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketData: {
                                                status: "pending",
                                                queueId: queue.id
                                            },
                                            ticketId: ticket_1.id,
                                            companyId: companyId
                                        })];
                                case 98:
                                    _52.sent();
                                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                            ticketId: ticket_1.id,
                                            type: "queue",
                                            queueId: queue.id
                                        })];
                                case 99:
                                    _52.sent();
                                    return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                                            where: {
                                                companyId: companyId
                                            }
                                        })];
                                case 100:
                                    settings = _52.sent();
                                    enableQueuePosition = settings === null || settings === void 0 ? void 0 : settings.sendQueuePosition;
                                    if (!enableQueuePosition) return [3 /*break*/, 112];
                                    return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                                            where: {
                                                userId: null,
                                                status: "pending",
                                                companyId: companyId,
                                                queueId: queue.id,
                                                whatsappId: whatsapp_1.id,
                                                isGroup: false
                                            }
                                        })];
                                case 101:
                                    count = _52.sent();
                                    qtd = count.count === 0 ? 1 : count.count;
                                    msgFila = "".concat(settings.sendQueuePositionMessage, " *").concat(qtd, "*");
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 102:
                                    ticketFilaDetails = _52.sent();
                                    // Verificar se ticket.contact existe antes de formatar
                                    if (!ticket_1.contact) {
                                        console.log("Fila: ticket.contact é nulo, pulando mensagem");
                                        return [2 /*return*/, "break"];
                                    }
                                    bodyFila = (0, Mustache_1["default"])("".concat(msgFila), ticket_1.contact);
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) !== "whatsapp_official")) return [3 /*break*/, 106];
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                case 103:
                                    _52.sent();
                                    return [4 /*yield*/, (0, bluebird_1.delay)(2000)];
                                case 104:
                                    _52.sent();
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "paused")];
                                case 105:
                                    _52.sent();
                                    _52.label = 106;
                                case 106:
                                    console.log("ActionsWebhookService Node Question2: ", bodyFila);
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 108];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: bodyFila, companyId: companyId }, false, ticketFilaDetails)];
                                case 107:
                                    _52.sent();
                                    return [3 /*break*/, 110];
                                case 108: return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: bodyFila, ticket: ticketFilaDetails, quotedMsg: null })];
                                case 109:
                                    _52.sent();
                                    _52.label = 110;
                                case 110:
                                    (0, SetTicketMessagesAsRead_1["default"])(ticketFilaDetails);
                                    return [4 /*yield*/, ticketFilaDetails.update({
                                            lastMessage: bodyFila
                                        })];
                                case 111:
                                    _52.sent();
                                    _52.label = 112;
                                case 112:
                                    console.log("Question: aguardando resposta antes de continuar o fluxo");
                                    return [2 /*return*/, "break"];
                                case 113:
                                    if (!(nodeSelected.type === "singleBlock")) return [3 /*break*/, 117];
                                    _loop_2 = function () {
                                        var elementNowSelected, bodyFor, ticketDetails, msg_2, webhook, _53, _54, mediaDirectory, ticketInt, mediaDirectory, ticketInt, fileValue, mediaDirectory, ticketInt, fileExtension, fileNameWithoutExtension, mimeType, error_36;
                                        var _55;
                                        return __generator(this, function (_56) {
                                            switch (_56.label) {
                                                case 0:
                                                    elementNowSelected = nodeSelected.data.seq[iLoc];
                                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                                            where: { id: idTicket, companyId: companyId }
                                                        })];
                                                case 1:
                                                    ticket_1 = _56.sent();
                                                    if (!elementNowSelected.includes("message")) return [3 /*break*/, 16];
                                                    bodyFor = nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value;
                                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(idTicket, companyId)];
                                                case 2:
                                                    ticketDetails = _56.sent();
                                                    msg_2 = void 0;
                                                    webhook = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook;
                                                    console.log("singleBlock: webhook =", JSON.stringify(webhook, null, 2));
                                                    console.log("singleBlock: bodyFor =", bodyFor);
                                                    if (webhook && webhook.hasOwnProperty("variables")) {
                                                        msg_2 = replaceMessages(webhook.variables, bodyFor);
                                                        console.log("singleBlock: msg após replaceMessages =", msg_2);
                                                    }
                                                    else {
                                                        msg_2 = bodyFor;
                                                    }
                                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) !== "whatsapp_official")) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                                case 3:
                                                    _56.sent();
                                                    return [4 /*yield*/, (0, bluebird_1.delay)(2000)];
                                                case 4:
                                                    _56.sent();
                                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "paused")];
                                                case 5:
                                                    _56.sent();
                                                    _56.label = 6;
                                                case 6:
                                                    console.log("ActionsWebhookService Node Question3: ", msg_2);
                                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 8];
                                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                                            number: numberClient_1,
                                                            body: msg_2,
                                                            companyId: companyId
                                                        }, false, ticketDetails)];
                                                case 7:
                                                    _56.sent();
                                                    return [3 /*break*/, 10];
                                                case 8: return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({
                                                        body: msg_2,
                                                        ticket: ticketDetails,
                                                        quotedMsg: null
                                                    })];
                                                case 9:
                                                    _56.sent();
                                                    _56.label = 10;
                                                case 10:
                                                    (0, SetTicketMessagesAsRead_1["default"])(ticketDetails);
                                                    if (!!ticket_1.contact) return [3 /*break*/, 12];
                                                    console.log("Question3: ticket.contact é nulo, usando mensagem original");
                                                    return [4 /*yield*/, ticketDetails.update({
                                                            lastMessage: bodyFor
                                                        })];
                                                case 11:
                                                    _56.sent();
                                                    return [3 /*break*/, 14];
                                                case 12: return [4 /*yield*/, ticketDetails.update({
                                                        lastMessage: (0, Mustache_1["default"])(bodyFor, ticket_1.contact)
                                                    })];
                                                case 13:
                                                    _56.sent();
                                                    _56.label = 14;
                                                case 14: return [4 /*yield*/, intervalWhats("1")];
                                                case 15:
                                                    _56.sent();
                                                    _56.label = 16;
                                                case 16:
                                                    if (!elementNowSelected.includes("interval")) return [3 /*break*/, 18];
                                                    return [4 /*yield*/, intervalWhats(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)];
                                                case 17:
                                                    _56.sent();
                                                    _56.label = 18;
                                                case 18:
                                                    if (!elementNowSelected.includes("img")) return [3 /*break*/, 23];
                                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                                case 19:
                                                    _56.sent();
                                                    _53 = SendMessage_1.SendMessage;
                                                    _54 = [whatsapp_1];
                                                    _55 = {
                                                        number: numberClient_1,
                                                        body: ""
                                                    };
                                                    return [4 /*yield*/, (0, UrlService_1.getBackendUrl)(companyId)];
                                                case 20: return [4 /*yield*/, _53.apply(void 0, _54.concat([(_55.mediaPath = (_56.sent()) === "https://localhost:8090"
                                                            ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)
                                                            : "".concat(__dirname
                                                                .split("dist")[0]
                                                                .split("\\")
                                                                .join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value),
                                                            _55)]))];
                                                case 21:
                                                    _56.sent();
                                                    return [4 /*yield*/, intervalWhats("1")];
                                                case 22:
                                                    _56.sent();
                                                    _56.label = 23;
                                                case 23:
                                                    if (!elementNowSelected.includes("audio")) return [3 /*break*/, 32];
                                                    return [4 /*yield*/, (0, UrlService_1.getBackendUrl)(companyId)];
                                                case 24:
                                                    mediaDirectory = (_56.sent()) === "https://localhost:8090"
                                                        ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)
                                                        : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value);
                                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                                            where: { id: ticket_1.id }
                                                        })];
                                                case 25:
                                                    ticketInt = _56.sent();
                                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 27];
                                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: "", mediaPath: mediaDirectory, companyId: companyId }, false, ticketInt)];
                                                case 26:
                                                    _56.sent();
                                                    return [3 /*break*/, 30];
                                                case 27: return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "recording")];
                                                case 28:
                                                    _56.sent();
                                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1["default"])({
                                                            media: mediaDirectory,
                                                            ticket: ticketInt,
                                                            isRecord: nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].record
                                                        })];
                                                case 29:
                                                    _56.sent();
                                                    _56.label = 30;
                                                case 30: return [4 /*yield*/, intervalWhats("1")];
                                                case 31:
                                                    _56.sent();
                                                    _56.label = 32;
                                                case 32:
                                                    if (!elementNowSelected.includes("video")) return [3 /*break*/, 41];
                                                    return [4 /*yield*/, (0, UrlService_1.getBackendUrl)(companyId)];
                                                case 33:
                                                    mediaDirectory = (_56.sent()) === "https://localhost:8090"
                                                        ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)
                                                        : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value);
                                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                                            where: { id: ticket_1.id }
                                                        })];
                                                case 34:
                                                    ticketInt = _56.sent();
                                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 36];
                                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: "", mediaPath: mediaDirectory, companyId: companyId }, false, ticketInt)];
                                                case 35:
                                                    _56.sent();
                                                    return [3 /*break*/, 39];
                                                case 36: return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                                case 37:
                                                    _56.sent();
                                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1["default"])({ media: mediaDirectory, ticket: ticketInt })];
                                                case 38:
                                                    _56.sent();
                                                    _56.label = 39;
                                                case 39: return [4 /*yield*/, intervalWhats("1")];
                                                case 40:
                                                    _56.sent();
                                                    _56.label = 41;
                                                case 41:
                                                    if (!(elementNowSelected.includes("file") ||
                                                        elementNowSelected.includes("doc") ||
                                                        elementNowSelected.includes("arquivo") ||
                                                        elementNowSelected.includes("documento"))) return [3 /*break*/, 52];
                                                    fileValue = nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value;
                                                    mediaDirectory = path_1["default"].join(path_1["default"].resolve(__dirname, "../../.."), "public", "uploads", fileValue);
                                                    if (!fs_1["default"].existsSync(mediaDirectory)) {
                                                        console.error("Arquivo não encontrado:", mediaDirectory);
                                                        return [2 /*return*/, "continue"];
                                                    }
                                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                                            where: { id: ticket_1.id }
                                                        })];
                                                case 42:
                                                    ticketInt = _56.sent();
                                                    fileExtension = path_1["default"].extname(mediaDirectory);
                                                    fileNameWithoutExtension = path_1["default"].basename(mediaDirectory, fileExtension);
                                                    mimeType = mime_types_1["default"].lookup(mediaDirectory) || "application/octet-stream";
                                                    console.log("Enviando arquivo:", fileNameWithoutExtension + fileExtension, "com tipo:", mimeType);
                                                    _56.label = 43;
                                                case 43:
                                                    _56.trys.push([43, 49, , 50]);
                                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 45];
                                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: "", mediaPath: mediaDirectory, companyId: companyId }, false, ticketInt)];
                                                case 44:
                                                    _56.sent();
                                                    return [3 /*break*/, 48];
                                                case 45: return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                                case 46:
                                                    _56.sent();
                                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1["default"])({ media: mediaDirectory, ticket: ticketInt })];
                                                case 47:
                                                    _56.sent();
                                                    _56.label = 48;
                                                case 48:
                                                    console.log("Arquivo enviado com sucesso");
                                                    return [3 /*break*/, 50];
                                                case 49:
                                                    error_36 = _56.sent();
                                                    console.error("Erro ao enviar arquivo:", error_36);
                                                    return [3 /*break*/, 50];
                                                case 50: return [4 /*yield*/, intervalWhats("1")];
                                                case 51:
                                                    _56.sent();
                                                    _56.label = 52;
                                                case 52: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    iLoc = 0;
                                    _52.label = 114;
                                case 114:
                                    if (!(iLoc < nodeSelected.data.seq.length)) return [3 /*break*/, 117];
                                    return [5 /*yield**/, _loop_2()];
                                case 115:
                                    _52.sent();
                                    _52.label = 116;
                                case 116:
                                    iLoc++;
                                    return [3 /*break*/, 114];
                                case 117:
                                    if (!(nodeSelected.type === "file")) return [3 /*break*/, 130];
                                    if (!nodeSelected.data.url || nodeSelected.data.url === "undefined") {
                                        console.error("URL do arquivo não definida no nó do tipo file");
                                        console.log("nodeSelected.data:", nodeSelected.data);
                                        return [2 /*return*/, "continue"];
                                    }
                                    mediaDirectory = path_1["default"].join(path_1["default"].resolve(__dirname, "../../.."), "public", "uploads", nodeSelected.data.url);
                                    return [4 /*yield*/, Contact_1["default"].findOne({
                                            where: { number: numberClient_1, companyId: companyId }
                                        })];
                                case 118:
                                    contact = _52.sent();
                                    if (!fs_1["default"].existsSync(mediaDirectory)) {
                                        console.error("Arquivo não encontrado:", mediaDirectory);
                                        return [2 /*return*/, "continue"];
                                    }
                                    fileExtension = path_1["default"].extname(mediaDirectory);
                                    fileNameWithoutExtension = path_1["default"].basename(mediaDirectory, fileExtension);
                                    _52.label = 119;
                                case 119:
                                    _52.trys.push([119, 126, , 127]);
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 121];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: "", mediaPath: mediaDirectory, companyId: companyId }, false, ticket_1)];
                                case 120:
                                    _52.sent();
                                    return [3 /*break*/, 125];
                                case 121: return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "composing")];
                                case 122:
                                    _52.sent();
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1["default"])({ media: mediaDirectory, ticket: ticket_1 })];
                                case 123:
                                    _52.sent();
                                    return [4 /*yield*/, (0, SendWhatsAppMediaFlow_1.typeSimulation)(ticket_1, "paused")];
                                case 124:
                                    _52.sent();
                                    _52.label = 125;
                                case 125:
                                    console.log("Arquivo enviado com sucesso");
                                    return [3 /*break*/, 127];
                                case 126:
                                    error_9 = _52.sent();
                                    console.error("Erro ao enviar arquivo:", error_9);
                                    return [3 /*break*/, 127];
                                case 127: return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 128:
                                    ticketDetails = _52.sent();
                                    return [4 /*yield*/, ticketDetails.update({
                                            lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket_1.contact)
                                        })];
                                case 129:
                                    _52.sent();
                                    _52.label = 130;
                                case 130:
                                    if (!(nodeSelected.type === "interval")) return [3 /*break*/, 132];
                                    timerSeconds_1 = parseInt(nodeSelected.data.sec, 10);
                                    console.log("Timer dedicado: Iniciando ".concat(timerSeconds_1, " segundos..."));
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            setTimeout(function () {
                                                console.log("Timer dedicado: ".concat(timerSeconds_1, " segundos finalizado."));
                                                resolve(true);
                                            }, timerSeconds_1 * 1000);
                                        })];
                                case 131:
                                    _52.sent();
                                    console.log("Timer dedicado: Prosseguindo para pr\u00F3ximo node...");
                                    _52.label = 132;
                                case 132:
                                    if (!(nodeSelected.type === "transferFlow")) return [3 /*break*/, 140];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 134];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 133:
                                    ticket_1 = _52.sent();
                                    _52.label = 134;
                                case 134:
                                    targetFlowId = ((_t = (_s = nodeSelected.data) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.flowId) || ((_u = nodeSelected.data) === null || _u === void 0 ? void 0 : _u.flowId);
                                    console.log("TransferFlow: Dados do n\u00F3:", JSON.stringify(nodeSelected.data, null, 2));
                                    console.log("TransferFlow: targetFlowId extra\u00EDdo: ".concat(targetFlowId));
                                    if (!targetFlowId) return [3 /*break*/, 140];
                                    console.log("TransferFlow: Transferindo para fluxo ID ".concat(targetFlowId));
                                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                                            where: { id: targetFlowId, company_id: companyId }
                                        })];
                                case 135:
                                    targetFlow = _52.sent();
                                    if (!(targetFlow && targetFlow.flow)) return [3 /*break*/, 139];
                                    console.log("TransferFlow: Fluxo encontrado, processando dados...");
                                    flowData = typeof targetFlow.flow === 'string'
                                        ? JSON.parse(targetFlow.flow)
                                        : targetFlow.flow;
                                    newNodes = flowData.nodes || [];
                                    newConnects = flowData.connections || [];
                                    console.log("TransferFlow: N\u00F3 encontrados: ".concat(newNodes.length, ", Conex\u00F5es: ").concat(newConnects.length));
                                    startNode_1 = newNodes.find(function (n) { return n.type === "start"; });
                                    console.log("TransferFlow: N\u00F3 start encontrado: ".concat(startNode_1 ? startNode_1.id : 'NÃO'));
                                    if (!startNode_1) return [3 /*break*/, 138];
                                    startConnection = newConnects.find(function (c) { return c.source === startNode_1.id; });
                                    console.log("TransferFlow: Conex\u00E3o start encontrada: ".concat(startConnection ? startConnection.target : 'NÃO'));
                                    if (!startConnection) return [3 /*break*/, 138];
                                    newHashFlowId = (0, randomCode_1.randomString)(42);
                                    console.log("TransferFlow: Gerando novo hash: ".concat(newHashFlowId));
                                    // Atualizar ticket com novo fluxo
                                    return [4 /*yield*/, ticket_1.update({
                                            flowWebhook: true,
                                            lastFlowId: startConnection.target,
                                            hashFlowId: newHashFlowId,
                                            flowStopped: targetFlowId.toString()
                                        })];
                                case 136:
                                    // Atualizar ticket com novo fluxo
                                    _52.sent();
                                    console.log("TransferFlow: Ticket atualizado com sucesso!");
                                    // Executar o novo fluxo recursivamente
                                    console.log("TransferFlow: Executando novo fluxo recursivamente...");
                                    return [4 /*yield*/, (0, exports.ActionsWebhookService)(whatsappId, targetFlowId, companyId, newNodes, newConnects, startConnection.target, dataWebhook, details, newHashFlowId, null, // Limpar pressKey ao transferir para novo fluxo
                                        idTicket, {
                                            number: numberClient_1,
                                            name: createFieldJsonName_1,
                                            email: ""
                                        }, msg)];
                                case 137:
                                    _52.sent();
                                    console.log("TransferFlow: Novo fluxo executado com sucesso!");
                                    return [2 /*return*/, { value: void 0 }];
                                case 138: return [3 /*break*/, 140];
                                case 139:
                                    console.log("TransferFlow: Fluxo ".concat(targetFlowId, " n\u00E3o encontrado ou sem dados"));
                                    if (targetFlow) {
                                        console.log("TransferFlow: Fluxo existe mas flow est\u00E1 vazio:", targetFlow.flow);
                                    }
                                    _52.label = 140;
                                case 140:
                                    if (!(nodeSelected.type === "sendMessage")) return [3 /*break*/, 147];
                                    console.log("SendMessage: Processando envio de mensagem via API");
                                    messageData = ((_v = nodeSelected.data) === null || _v === void 0 ? void 0 : _v.data) || nodeSelected.data;
                                    apiToken = messageData === null || messageData === void 0 ? void 0 : messageData.apiToken;
                                    message = messageData === null || messageData === void 0 ? void 0 : messageData.message;
                                    phoneNumber = messageData === null || messageData === void 0 ? void 0 : messageData.phoneNumber;
                                    queueId = (messageData === null || messageData === void 0 ? void 0 : messageData.queueId) || "";
                                    sendSignature = (messageData === null || messageData === void 0 ? void 0 : messageData.sendSignature) || false;
                                    closeTicket = (messageData === null || messageData === void 0 ? void 0 : messageData.closeTicket) || false;
                                    if (!apiToken || !message || !phoneNumber) {
                                        console.log("SendMessage: Dados incompletos - apiToken: ".concat(!!apiToken, ", message: ").concat(!!message, ", phoneNumber: ").concat(phoneNumber));
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    _52.label = 141;
                                case 141:
                                    _52.trys.push([141, 146, , 147]);
                                    console.log("SendMessage: Enviando mensagem para ".concat(phoneNumber, " via API externa"));
                                    processedMessage_1 = message;
                                    if (!idTicket) return [3 /*break*/, 143];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId },
                                            include: [
                                                { model: Contact_1["default"], as: "contact" },
                                                { model: User_1["default"], as: "user" },
                                                { model: Queue_1["default"], as: "queue" }
                                            ]
                                        })];
                                case 142:
                                    ticket_3 = _52.sent();
                                    if (ticket_3) {
                                        contact = ticket_3.contact;
                                        user = ticket_3.user;
                                        queue = ticket_3.queue;
                                        // Substituir variáveis padrão na mensagem
                                        processedMessage_1 = message
                                            .replace(/\{\{name\}\}/g, (contact === null || contact === void 0 ? void 0 : contact.name) || "")
                                            .replace(/\{\{firstName\}\}/g, ((_w = contact === null || contact === void 0 ? void 0 : contact.name) === null || _w === void 0 ? void 0 : _w.split(" ")[0]) || "")
                                            .replace(/\{\{userName\}\}/g, (user === null || user === void 0 ? void 0 : user.name) || "")
                                            .replace(/\{\{ticket_id\}\}/g, ticket_3.id.toString())
                                            .replace(/\{\{queue\}\}/g, (queue === null || queue === void 0 ? void 0 : queue.name) || "")
                                            .replace(/\{\{protocol\}\}/g, ticket_3.uuid || "")
                                            .replace(/\{\{connection\}\}/g, ((_x = ticket_3.whatsapp) === null || _x === void 0 ? void 0 : _x.name) || "");
                                        hour = new Date().getHours();
                                        greeting = "Boa madrugada";
                                        if (hour >= 5 && hour < 12)
                                            greeting = "Bom dia";
                                        else if (hour >= 12 && hour < 18)
                                            greeting = "Boa tarde";
                                        else if (hour >= 18 && hour < 24)
                                            greeting = "Boa noite";
                                        processedMessage_1 = processedMessage_1.replace(/\{\{ms\}\}/g, greeting);
                                        now = new Date();
                                        processedMessage_1 = processedMessage_1
                                            .replace(/\{\{date\}\}/g, now.toLocaleDateString("pt-BR"))
                                            .replace(/\{\{hour\}\}/g, now.toLocaleTimeString("pt-BR"));
                                        dataWebhook_1 = ticket_3 === null || ticket_3 === void 0 ? void 0 : ticket_3.dataWebhook;
                                        if (dataWebhook_1) {
                                            // Variáveis de respostas de perguntas
                                            if (dataWebhook_1.questionAnswers) {
                                                Object.entries(dataWebhook_1.questionAnswers).forEach(function (_a) {
                                                    var key = _a[0], value = _a[1];
                                                    var regex = new RegExp("\\{\\{".concat(key, "\\}\\}"), 'g');
                                                    processedMessage_1 = processedMessage_1.replace(regex, String(value || ""));
                                                });
                                            }
                                            // Variáveis salvas de APIs e outras fontes
                                            if (dataWebhook_1.variables) {
                                                Object.entries(dataWebhook_1.variables).forEach(function (_a) {
                                                    var key = _a[0], value = _a[1];
                                                    var regex = new RegExp("\\{\\{".concat(key, "\\}\\}"), 'g');
                                                    processedMessage_1 = processedMessage_1.replace(regex, String(value || ""));
                                                });
                                            }
                                            // Variáveis de estado específicas (ex: respostas recentes)
                                            if (dataWebhook_1.questionState && dataWebhook_1.questionState.answerValue) {
                                                answerKey = dataWebhook_1.questionState.answerKey;
                                                if (answerKey) {
                                                    regex = new RegExp("\\{\\{".concat(answerKey, "\\}\\}"), 'g');
                                                    processedMessage_1 = processedMessage_1.replace(regex, String(dataWebhook_1.questionState.answerValue || ""));
                                                }
                                            }
                                        }
                                        console.log("SendMessage: Mensagem processada com vari\u00E1veis: ".concat(processedMessage_1));
                                        console.log("SendMessage: Vari\u00E1veis dispon\u00EDveis:", (dataWebhook_1 === null || dataWebhook_1 === void 0 ? void 0 : dataWebhook_1.variables) || {});
                                        console.log("SendMessage: Respostas de perguntas:", (dataWebhook_1 === null || dataWebhook_1 === void 0 ? void 0 : dataWebhook_1.questionAnswers) || {});
                                    }
                                    _52.label = 143;
                                case 143:
                                    requestBody = {
                                        number: phoneNumber,
                                        body: processedMessage_1,
                                        userId: "",
                                        queueId: queueId,
                                        sendSignature: sendSignature,
                                        closeTicket: closeTicket
                                    };
                                    return [4 /*yield*/, fetch("https://api.faedeveloper.com.br/api/messages/send", {
                                            method: "POST",
                                            headers: {
                                                "Authorization": "Bearer ".concat(apiToken),
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(requestBody)
                                        })];
                                case 144:
                                    response = _52.sent();
                                    if (!response.ok) {
                                        throw new Error("API Error: ".concat(response.status, " - ").concat(response.statusText));
                                    }
                                    return [4 /*yield*/, response.json()];
                                case 145:
                                    responseData = _52.sent();
                                    console.log("SendMessage: Mensagem enviada com sucesso via API externa", responseData);
                                    return [3 /*break*/, 147];
                                case 146:
                                    error_10 = _52.sent();
                                    console.error("SendMessage: Erro ao enviar mensagem via API externa:", error_10);
                                    return [3 /*break*/, 147];
                                case 147:
                                    if (!(nodeSelected.type === "apiRequest")) return [3 /*break*/, 158];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 149];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 148:
                                    ticket_1 = _52.sent();
                                    _52.label = 149;
                                case 149:
                                    apiData = ((_y = nodeSelected.data) === null || _y === void 0 ? void 0 : _y.data) || nodeSelected.data;
                                    method = (apiData === null || apiData === void 0 ? void 0 : apiData.method) || "GET";
                                    url = apiData === null || apiData === void 0 ? void 0 : apiData.url;
                                    headers = apiData === null || apiData === void 0 ? void 0 : apiData.headers;
                                    body = apiData === null || apiData === void 0 ? void 0 : apiData.body;
                                    saveResponse = apiData === null || apiData === void 0 ? void 0 : apiData.saveResponse;
                                    savedVariables = (apiData === null || apiData === void 0 ? void 0 : apiData.savedVariables) || [];
                                    if (!url) return [3 /*break*/, 158];
                                    console.log("ApiRequest: ".concat(method, " ").concat(url));
                                    _52.label = 150;
                                case 150:
                                    _52.trys.push([150, 157, , 158]);
                                    processedUrl_1 = url;
                                    processedBody_1 = body;
                                    return [4 /*yield*/, Contact_1["default"].findOne({
                                            where: { number: numberClient_1, companyId: companyId }
                                        })];
                                case 151:
                                    contact = _52.sent();
                                    if (contact) {
                                        variables_1 = {
                                            "{{name}}": contact.name || "",
                                            "{{number}}": contact.number || "",
                                            "{{email}}": contact.email || ""
                                        };
                                        // Adicionar variáveis do webhook
                                        if ((_z = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _z === void 0 ? void 0 : _z.variables) {
                                            Object.entries(ticket_1.dataWebhook.variables).forEach(function (_a) {
                                                var key = _a[0], value = _a[1];
                                                variables_1["{{".concat(key, "}}")] = String(value);
                                            });
                                        }
                                        Object.entries(variables_1).forEach(function (_a) {
                                            var key = _a[0], value = _a[1];
                                            // Usar split/join para substituição robusta
                                            processedUrl_1 = processedUrl_1.split(key).join(value);
                                            if (processedBody_1) {
                                                processedBody_1 = processedBody_1.split(key).join(value);
                                            }
                                        });
                                    }
                                    parsedHeaders = {};
                                    if (headers) {
                                        try {
                                            parsedHeaders = JSON.parse(headers);
                                        }
                                        catch (e) {
                                            console.log("ApiRequest: Erro ao parsear headers", e);
                                        }
                                    }
                                    parsedBody = undefined;
                                    if (processedBody_1 && ["POST", "PUT", "PATCH"].includes(method)) {
                                        try {
                                            parsedBody = JSON.parse(processedBody_1);
                                        }
                                        catch (e) {
                                            parsedBody = processedBody_1;
                                        }
                                    }
                                    return [4 /*yield*/, (0, axios_1["default"])({
                                            method: method.toLowerCase(),
                                            url: processedUrl_1,
                                            headers: parsedHeaders,
                                            data: parsedBody,
                                            timeout: 30000
                                        })];
                                case 152:
                                    response_1 = _52.sent();
                                    console.log("ApiRequest: Resposta ".concat(response_1.status));
                                    console.log("ApiRequest: Salvando ".concat(savedVariables.length, " vari\u00E1veis da resposta"));
                                    if (!(savedVariables.length > 0 && ticket_1)) return [3 /*break*/, 154];
                                    currentWebhook = ticket_1.dataWebhook || {};
                                    currentVariables = currentWebhook.variables || {};
                                    newVariables_1 = {};
                                    savedVariables.forEach(function (variable) {
                                        try {
                                            // Extrair valor do JSON usando o path
                                            var value = getNestedValue(response_1.data, variable.path);
                                            if (value !== undefined) {
                                                newVariables_1[variable.name] = value;
                                                console.log("ApiRequest: Vari\u00E1vel ".concat(variable.name, " = ").concat(value));
                                            }
                                        }
                                        catch (error) {
                                            console.log("ApiRequest: Erro ao extrair vari\u00E1vel ".concat(variable.path, ":"), error);
                                        }
                                    });
                                    // Salvar resposta completa se configurado
                                    if (saveResponse) {
                                        newVariables_1[saveResponse] = response_1.data;
                                    }
                                    return [4 /*yield*/, ticket_1.update({
                                            dataWebhook: __assign(__assign({}, currentWebhook), { variables: __assign(__assign({}, currentVariables), newVariables_1) })
                                        })];
                                case 153:
                                    _52.sent();
                                    return [3 /*break*/, 156];
                                case 154:
                                    if (!(saveResponse && ticket_1)) return [3 /*break*/, 156];
                                    currentWebhook = ticket_1.dataWebhook || {};
                                    currentVariables = currentWebhook.variables || {};
                                    return [4 /*yield*/, ticket_1.update({
                                            dataWebhook: __assign(__assign({}, currentWebhook), { variables: __assign(__assign({}, currentVariables), (_51 = {}, _51[saveResponse] = response_1.data, _51)) })
                                        })];
                                case 155:
                                    _52.sent();
                                    _52.label = 156;
                                case 156: return [3 /*break*/, 158];
                                case 157:
                                    error_11 = _52.sent();
                                    console.error("ApiRequest: Erro na requisi\u00E7\u00E3o", error_11.message);
                                    return [3 /*break*/, 158];
                                case 158:
                                    if (!(nodeSelected.type === "addTag")) return [3 /*break*/, 175];
                                    console.log("=== PROCESSANDO N\u00D3 addTag (TAG NORMAL) ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 160];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 159:
                                    ticket_1 = _52.sent();
                                    _52.label = 160;
                                case 160:
                                    tagData = ((_0 = nodeSelected.data) === null || _0 === void 0 ? void 0 : _0.data) || nodeSelected.data;
                                    tagId = tagData === null || tagData === void 0 ? void 0 : tagData.id;
                                    console.log("addTag: tagId=".concat(tagId, ", ticketId=").concat(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id));
                                    if (!(tagId && ticket_1)) return [3 /*break*/, 175];
                                    console.log("AddTag: Adicionando tag NORMAL ".concat(tagId, " ao ticket ").concat(ticket_1.id));
                                    _52.label = 161;
                                case 161:
                                    _52.trys.push([161, 174, , 175]);
                                    return [4 /*yield*/, Tag_1["default"].findOne({
                                            where: { id: tagId, companyId: companyId, kanban: 0 }
                                        })];
                                case 162:
                                    tag = _52.sent();
                                    console.log("addTag: Tag NORMAL encontrada:", tag ? { id: tag.id, name: tag.name, kanban: tag.kanban } : null);
                                    if (!tag) return [3 /*break*/, 172];
                                    return [4 /*yield*/, TicketTag_1["default"].findOne({
                                            where: { ticketId: ticket_1.id, tagId: tag.id }
                                        })];
                                case 163:
                                    existingTag = _52.sent();
                                    console.log("addTag: Tag j\u00E1 existe?", existingTag ? 'SIM' : 'NÃO');
                                    if (!!existingTag) return [3 /*break*/, 170];
                                    console.log("addTag: Criando ContactTag (como o frontend)...");
                                    _52.label = 164;
                                case 164:
                                    _52.trys.push([164, 167, , 168]);
                                    return [4 /*yield*/, ContactTag_1["default"].create({
                                            contactId: ticket_1.contactId,
                                            tagId: tag.id,
                                            companyId: companyId
                                        })];
                                case 165:
                                    newContactTag = _52.sent();
                                    console.log("addTag: ContactTag criada com ID:", newContactTag === null || newContactTag === void 0 ? void 0 : newContactTag.id);
                                    console.log("addTag: ContactTag completa:", JSON.stringify(newContactTag, null, 2));
                                    return [4 /*yield*/, TicketTag_1["default"].create({
                                            ticketId: ticket_1.id,
                                            tagId: tag.id
                                        })];
                                case 166:
                                    newTicketTag = _52.sent();
                                    console.log("addTag: TicketTag criada com ID:", newTicketTag === null || newTicketTag === void 0 ? void 0 : newTicketTag.id);
                                    console.log("AddTag: Tag NORMAL \"".concat(tag.name, "\" adicionada com sucesso"));
                                    return [3 /*break*/, 168];
                                case 167:
                                    createError_1 = _52.sent();
                                    console.error("addTag: Erro ao criar tags:", createError_1.message);
                                    console.error("addTag: Stack:", createError_1.stack);
                                    return [3 /*break*/, 168];
                                case 168:
                                    io_1 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 169:
                                    ticketUpdated = _52.sent();
                                    console.log("addTag: Ticket atualizado com tags:", (_1 = ticketUpdated.tags) === null || _1 === void 0 ? void 0 : _1.map(function (t) { return ({ id: t.id, name: t.name }); }));
                                    io_1.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    return [3 /*break*/, 171];
                                case 170:
                                    console.log("AddTag: Tag NORMAL \"".concat(tag.name, "\" j\u00E1 est\u00E1 associada ao ticket"));
                                    _52.label = 171;
                                case 171: return [3 /*break*/, 173];
                                case 172:
                                    console.log("AddTag: Tag NORMAL ".concat(tagId, " n\u00E3o encontrada"));
                                    _52.label = 173;
                                case 173: return [3 /*break*/, 175];
                                case 174:
                                    error_12 = _52.sent();
                                    console.error("AddTag: Erro ao adicionar tag NORMAL", error_12.message);
                                    console.error("AddTag: Stack:", error_12.stack);
                                    return [3 /*break*/, 175];
                                case 175:
                                    if (!(nodeSelected.type === "addTagKanban")) return [3 /*break*/, 207];
                                    console.log("=== PROCESSANDO N\u00D3 addTagKanban (TAG KANBAN) ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 177];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId },
                                            include: [{ model: Contact_1["default"], as: "contact" }]
                                        })];
                                case 176:
                                    ticket_1 = _52.sent();
                                    return [3 /*break*/, 179];
                                case 177:
                                    if (!(ticket_1 && !ticket_1.contact)) return [3 /*break*/, 179];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: ticket_1.id, companyId: companyId },
                                            include: [{ model: Contact_1["default"], as: "contact" }]
                                        })];
                                case 178:
                                    // Se o ticket existe mas não tem contato, buscar com include
                                    ticket_1 = _52.sent();
                                    _52.label = 179;
                                case 179:
                                    tagData = ((_2 = nodeSelected.data) === null || _2 === void 0 ? void 0 : _2.data) || nodeSelected.data;
                                    tagId = tagData === null || tagData === void 0 ? void 0 : tagData.id;
                                    console.log("addTagKanban: tagId=".concat(tagId, ", ticketId=").concat(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id));
                                    if (!(tagId && ticket_1)) return [3 /*break*/, 207];
                                    console.log("AddTagKanban: Adicionando tag KANBAN ".concat(tagId, " ao ticket ").concat(ticket_1.id));
                                    _52.label = 180;
                                case 180:
                                    _52.trys.push([180, 206, , 207]);
                                    return [4 /*yield*/, Tag_1["default"].findOne({
                                            where: { id: tagId, companyId: companyId, kanban: 1 }
                                        })];
                                case 181:
                                    tag = _52.sent();
                                    console.log("addTagKanban: Tag Kanban encontrada:", tag ? { id: tag.id, name: tag.name, kanban: tag.kanban } : null);
                                    if (!tag) return [3 /*break*/, 204];
                                    return [4 /*yield*/, TicketTag_1["default"].findAll({
                                            where: { ticketId: ticket_1.id },
                                            include: [{
                                                    model: Tag_1["default"],
                                                    where: { kanban: 1 }
                                                }]
                                        })];
                                case 182:
                                    existingKanbanTags = _52.sent();
                                    console.log("addTagKanban: Removendo ".concat(existingKanbanTags.length, " tags kanban anteriores"));
                                    _i = 0, existingKanbanTags_1 = existingKanbanTags;
                                    _52.label = 183;
                                case 183:
                                    if (!(_i < existingKanbanTags_1.length)) return [3 /*break*/, 186];
                                    existingTag = existingKanbanTags_1[_i];
                                    return [4 /*yield*/, existingTag.destroy()];
                                case 184:
                                    _52.sent();
                                    _52.label = 185;
                                case 185:
                                    _i++;
                                    return [3 /*break*/, 183];
                                case 186:
                                    _52.trys.push([186, 188, , 189]);
                                    console.log("AddTagKanban: Tentando criar TicketTag com ticketId=".concat(ticket_1.id, ", tagId=").concat(tag.id));
                                    return [4 /*yield*/, TicketTag_1["default"].create({
                                            ticketId: ticket_1.id,
                                            tagId: tag.id
                                        }, {
                                            logging: function (sql) { return console.log("AddTagKanban SQL:", sql); }
                                        })];
                                case 187:
                                    newTicketTag = _52.sent();
                                    console.log("AddTagKanban: TicketTag criado com sucesso");
                                    console.log("AddTagKanban: Chave prim\u00E1ria: ticketId=".concat(newTicketTag.ticketId, ", tagId=").concat(newTicketTag.tagId));
                                    return [3 /*break*/, 189];
                                case 188:
                                    error_13 = _52.sent();
                                    console.error("AddTagKanban: Erro ao criar TicketTag:", error_13.message);
                                    console.error("AddTagKanban: Nome do erro:", error_13.name);
                                    console.error("AddTagKanban: Stack:", error_13.stack);
                                    console.error("AddTagKanban: Detalhes:", error_13);
                                    return [3 /*break*/, 189];
                                case 189:
                                    console.log("AddTagKanban: Tag KANBAN \"".concat(tag.name, "\" adicionada com sucesso"));
                                    if (!(tag.greetingMessageLane && tag.greetingMessageLane.trim() !== "")) return [3 /*break*/, 197];
                                    _52.label = 190;
                                case 190:
                                    _52.trys.push([190, 196, , 197]);
                                    console.log("AddTagKanban: Tentando enviar mensagem de sauda\u00E7\u00E3o...");
                                    console.log("AddTagKanban: ticket existe? ".concat(!!ticket_1));
                                    console.log("AddTagKanban: ticket.contact existe? ".concat(!!(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contact)));
                                    console.log("AddTagKanban: ticket.whatsappId=".concat(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.whatsappId));
                                    if (!(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contact)) {
                                        console.error("AddTagKanban: ERRO - ticket.contact \u00E9 null, n\u00E3o \u00E9 poss\u00EDvel enviar mensagem");
                                        console.error("AddTagKanban: ticket completo:", JSON.stringify(ticket_1, null, 2));
                                    }
                                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../../helpers/SendMessage")); })];
                                case 191:
                                    SendMessage_2 = (_52.sent()).SendMessage;
                                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket_1.whatsappId)];
                                case 192:
                                    whatsapp_2 = _52.sent();
                                    console.log("AddTagKanban: whatsapp encontrado? ".concat(!!whatsapp_2));
                                    if (!(whatsapp_2 && ticket_1.contact)) return [3 /*break*/, 194];
                                    number = ticket_1.contact.number;
                                    body = tag.greetingMessageLane;
                                    console.log("AddTagKanban: Enviando mensagem para number=".concat(number, ", body=\"").concat(body, "\""));
                                    return [4 /*yield*/, SendMessage_2(whatsapp_2, {
                                            number: number,
                                            body: body
                                        })];
                                case 193:
                                    result = _52.sent();
                                    console.log("AddTagKanban: Mensagem de sauda\u00E7\u00E3o enviada com sucesso! Resultado:", result);
                                    return [3 /*break*/, 195];
                                case 194:
                                    console.error("AddTagKanban: N\u00E3o foi poss\u00EDvel enviar - whatsapp: ".concat(!!whatsapp_2, ", contact: ").concat(!!(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contact)));
                                    _52.label = 195;
                                case 195: return [3 /*break*/, 197];
                                case 196:
                                    error_14 = _52.sent();
                                    console.error("AddTagKanban: Erro ao enviar mensagem de sauda\u00E7\u00E3o:", error_14.message);
                                    console.error("AddTagKanban: Stack:", error_14.stack);
                                    return [3 /*break*/, 197];
                                case 197:
                                    if (!(tag.autoActions && Array.isArray(tag.autoActions) && tag.autoActions.length > 0)) return [3 /*break*/, 202];
                                    _52.label = 198;
                                case 198:
                                    _52.trys.push([198, 201, , 202]);
                                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../ExecuteTagAutoActionsService")); })];
                                case 199:
                                    ExecuteTagAutoActions = (_52.sent()).ExecuteTagAutoActions;
                                    return [4 /*yield*/, ExecuteTagAutoActions(tag.id, ticket_1.id, companyId)];
                                case 200:
                                    _52.sent();
                                    return [3 /*break*/, 202];
                                case 201:
                                    error_15 = _52.sent();
                                    console.error("AddTagKanban: Erro ao executar a\u00E7\u00F5es autom\u00E1ticas:", error_15.message);
                                    return [3 /*break*/, 202];
                                case 202:
                                    io_2 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 203:
                                    ticketUpdated = _52.sent();
                                    io_2.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    return [3 /*break*/, 205];
                                case 204:
                                    console.log("AddTagKanban: Tag KANBAN ".concat(tagId, " n\u00E3o encontrada (deve ter kanban=1)"));
                                    _52.label = 205;
                                case 205: return [3 /*break*/, 207];
                                case 206:
                                    error_16 = _52.sent();
                                    console.error("AddTagKanban: Erro ao adicionar tag KANBAN", error_16.message);
                                    return [3 /*break*/, 207];
                                case 207:
                                    if (!(nodeSelected.type === "removeTag")) return [3 /*break*/, 215];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 209];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({ where: { id: idTicket, companyId: companyId } })];
                                case 208:
                                    ticket_1 = _52.sent();
                                    _52.label = 209;
                                case 209:
                                    tagData = ((_3 = nodeSelected.data) === null || _3 === void 0 ? void 0 : _3.data) || nodeSelected.data;
                                    tagId = tagData === null || tagData === void 0 ? void 0 : tagData.id;
                                    if (!(tagId && ticket_1)) return [3 /*break*/, 215];
                                    _52.label = 210;
                                case 210:
                                    _52.trys.push([210, 214, , 215]);
                                    return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: ticket_1.id, tagId: tagId }, individualHooks: true })];
                                case 211:
                                    _52.sent();
                                    return [4 /*yield*/, ContactTag_1["default"].destroy({ where: { contactId: ticket_1.contactId, tagId: tagId } })];
                                case 212:
                                    _52.sent();
                                    io_3 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 213:
                                    ticketUpdated = _52.sent();
                                    io_3.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), { action: "update", ticket: ticketUpdated });
                                    return [3 /*break*/, 215];
                                case 214:
                                    error_17 = _52.sent();
                                    console.error("removeTag: Erro ao remover tag normal", error_17.message);
                                    return [3 /*break*/, 215];
                                case 215:
                                    if (!(nodeSelected.type === "removeTagKanban")) return [3 /*break*/, 224];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 217];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({ where: { id: idTicket, companyId: companyId } })];
                                case 216:
                                    ticket_1 = _52.sent();
                                    _52.label = 217;
                                case 217:
                                    if (!ticket_1) return [3 /*break*/, 224];
                                    _52.label = 218;
                                case 218:
                                    _52.trys.push([218, 223, , 224]);
                                    return [4 /*yield*/, TicketTag_1["default"].findAll({
                                            where: { ticketId: ticket_1.id },
                                            include: [{ model: Tag_1["default"], as: "tag", where: { kanban: 1 }, attributes: ["id"] }]
                                        })];
                                case 219:
                                    kanbanRows = _52.sent();
                                    kanbanTagIds = kanbanRows.map(function (r) { return r.tagId; });
                                    if (!(kanbanTagIds.length > 0)) return [3 /*break*/, 221];
                                    return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: ticket_1.id, tagId: kanbanTagIds }, individualHooks: true })];
                                case 220:
                                    _52.sent();
                                    _52.label = 221;
                                case 221:
                                    io_4 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 222:
                                    ticketUpdated = _52.sent();
                                    io_4.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), { action: "update", ticket: ticketUpdated });
                                    return [3 /*break*/, 224];
                                case 223:
                                    error_18 = _52.sent();
                                    console.error("removeTagKanban: Erro ao remover tag kanban", error_18.message);
                                    return [3 /*break*/, 224];
                                case 224:
                                    if (!(nodeSelected.type === "transferQueue")) return [3 /*break*/, 235];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 226];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 225:
                                    ticket_1 = _52.sent();
                                    _52.label = 226;
                                case 226:
                                    queueData = ((_4 = nodeSelected.data) === null || _4 === void 0 ? void 0 : _4.data) || nodeSelected.data;
                                    queueId = queueData === null || queueData === void 0 ? void 0 : queueData.queueId;
                                    if (!(queueId && ticket_1)) return [3 /*break*/, 235];
                                    console.log("TransferQueue: Transferindo ticket ".concat(ticket_1.id, " para fila ").concat(queueId));
                                    _52.label = 227;
                                case 227:
                                    _52.trys.push([227, 234, , 235]);
                                    return [4 /*yield*/, (0, ShowQueueService_1["default"])(queueId, companyId)];
                                case 228:
                                    queue = _52.sent();
                                    if (!queue) return [3 /*break*/, 232];
                                    // Atualizar ticket com nova fila
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketData: {
                                                queueId: queueId,
                                                userId: null // Remove usuário ao transferir para fila
                                            },
                                            ticketId: ticket_1.id,
                                            companyId: companyId
                                        })];
                                case 229:
                                    // Atualizar ticket com nova fila
                                    _52.sent();
                                    // Criar log da transferência
                                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                            ticketId: ticket_1.id,
                                            type: "queue",
                                            queueId: queueId
                                        })];
                                case 230:
                                    // Criar log da transferência
                                    _52.sent();
                                    console.log("TransferQueue: Ticket transferido para fila ".concat(queue.name));
                                    io_5 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 231:
                                    ticketUpdated = _52.sent();
                                    io_5.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    return [3 /*break*/, 233];
                                case 232:
                                    console.log("TransferQueue: Fila ".concat(queueId, " n\u00E3o encontrada"));
                                    _52.label = 233;
                                case 233: return [3 /*break*/, 235];
                                case 234:
                                    error_19 = _52.sent();
                                    console.error("TransferQueue: Erro ao transferir para fila", error_19.message);
                                    return [3 /*break*/, 235];
                                case 235:
                                    if (!(nodeSelected.type === "ticket")) return [3 /*break*/, 248];
                                    console.log("=== PROCESSANDO N\u00D3 ticket (TRANSFER\u00CANCIA PARA FILA) ===");
                                    console.log("ticket: nodeSelected.data=", JSON.stringify(nodeSelected.data, null, 2));
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 237];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 236:
                                    ticket_1 = _52.sent();
                                    _52.label = 237;
                                case 237:
                                    ticketData = ((_5 = nodeSelected.data) === null || _5 === void 0 ? void 0 : _5.data) || nodeSelected.data;
                                    queueId = ticketData === null || ticketData === void 0 ? void 0 : ticketData.id;
                                    console.log("ticket: queueId=".concat(queueId, ", ticketId=").concat(ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id));
                                    if (!(queueId && ticket_1)) return [3 /*break*/, 248];
                                    console.log("Ticket: Transferindo ticket ".concat(ticket_1.id, " para fila ").concat(queueId));
                                    _52.label = 238;
                                case 238:
                                    _52.trys.push([238, 247, , 248]);
                                    return [4 /*yield*/, (0, ShowQueueService_1["default"])(queueId, companyId)];
                                case 239:
                                    queue = _52.sent();
                                    if (!queue) return [3 /*break*/, 245];
                                    console.log("Ticket: Status ANTES da transfer\u00EAncia: ".concat(ticket_1.status));
                                    // Usar a mesma lógica da IA: só atualiza queueId, não remove usuário
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketData: {
                                                queueId: queueId,
                                                status: "pending" // Mudar status para "aguardando" ao transferir para fila
                                            },
                                            ticketId: ticket_1.id,
                                            companyId: companyId
                                        })];
                                case 240:
                                    // Usar a mesma lógica da IA: só atualiza queueId, não remove usuário
                                    _52.sent();
                                    // Sair do modo fluxo/automação
                                    return [4 /*yield*/, ticket_1.update({
                                            flowWebhook: false,
                                            flowStopped: null // Limpar parada do fluxo
                                        })];
                                case 241:
                                    // Sair do modo fluxo/automação
                                    _52.sent();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 242:
                                    ticketAfterUpdate = _52.sent();
                                    console.log("Ticket: Status DEPOIS da transfer\u00EAncia: ".concat(ticketAfterUpdate.status));
                                    // Criar log da transferência
                                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                            ticketId: ticket_1.id,
                                            type: "queue",
                                            queueId: queueId
                                        })];
                                case 243:
                                    // Criar log da transferência
                                    _52.sent();
                                    console.log("Ticket: Ticket transferido para fila ".concat(queue.name, " (mantendo usu\u00E1rio)"));
                                    io_6 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 244:
                                    ticketUpdated = _52.sent();
                                    io_6.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    return [3 /*break*/, 246];
                                case 245:
                                    console.log("Ticket: Fila ".concat(queueId, " n\u00E3o encontrada"));
                                    _52.label = 246;
                                case 246: return [3 /*break*/, 248];
                                case 247:
                                    error_20 = _52.sent();
                                    console.error("Ticket: Erro ao transferir para fila", error_20.message);
                                    return [3 /*break*/, 248];
                                case 248:
                                    if (!(nodeSelected.type === "transferUser")) return [3 /*break*/, 263];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 250];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 249:
                                    ticket_1 = _52.sent();
                                    _52.label = 250;
                                case 250:
                                    userData = ((_6 = nodeSelected.data) === null || _6 === void 0 ? void 0 : _6.data) || nodeSelected.data;
                                    userId = userData === null || userData === void 0 ? void 0 : userData.userId;
                                    if (!(userId && ticket_1)) return [3 /*break*/, 263];
                                    console.log("TransferUser: Transferindo ticket ".concat(ticket_1.id, " para usu\u00E1rio ").concat(userId));
                                    _52.label = 251;
                                case 251:
                                    _52.trys.push([251, 262, , 263]);
                                    return [4 /*yield*/, User_1["default"].findOne({
                                            where: { id: userId, companyId: companyId }
                                        })];
                                case 252:
                                    user = _52.sent();
                                    if (!user) return [3 /*break*/, 260];
                                    // Atualizar ticket com novo usuário
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketData: {
                                                userId: userId,
                                                status: "open" // Mudar status para "open" ao transferir para usuário
                                            },
                                            ticketId: ticket_1.id,
                                            companyId: companyId
                                        })];
                                case 253:
                                    // Atualizar ticket com novo usuário
                                    _52.sent();
                                    // Criar log da transferência
                                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                                            ticketId: ticket_1.id,
                                            type: "userDefine",
                                            userId: userId
                                        })];
                                case 254:
                                    // Criar log da transferência
                                    _52.sent();
                                    console.log("TransferUser: Ticket transferido para usu\u00E1rio ".concat(user.name));
                                    io_7 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 255:
                                    ticketUpdated = _52.sent();
                                    io_7.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    notificationMessage = "Ticket transferido para ".concat(user.name);
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 257];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: notificationMessage, companyId: companyId }, false, ticketUpdated)];
                                case 256:
                                    _52.sent();
                                    return [3 /*break*/, 259];
                                case 257: return [4 /*yield*/, (0, SendWhatsAppMessage_1["default"])({ body: notificationMessage, ticket: ticketUpdated, quotedMsg: null })];
                                case 258:
                                    _52.sent();
                                    _52.label = 259;
                                case 259: return [3 /*break*/, 261];
                                case 260:
                                    console.log("TransferUser: Usu\u00E1rio ".concat(userId, " n\u00E3o encontrado"));
                                    _52.label = 261;
                                case 261: return [3 /*break*/, 263];
                                case 262:
                                    error_21 = _52.sent();
                                    console.error("TransferUser: Erro ao transferir para usu\u00E1rio", error_21.message);
                                    return [3 /*break*/, 263];
                                case 263:
                                    if (!(nodeSelected.type === "addTag")) return [3 /*break*/, 275];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 265];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 264:
                                    ticket_1 = _52.sent();
                                    _52.label = 265;
                                case 265:
                                    tagData = ((_7 = nodeSelected.data) === null || _7 === void 0 ? void 0 : _7.data) || nodeSelected.data;
                                    tagId = tagData === null || tagData === void 0 ? void 0 : tagData.tagId;
                                    if (!(tagId && ticket_1)) return [3 /*break*/, 275];
                                    console.log("addTag: Adicionando tag ".concat(tagId, " ao ticket ").concat(ticket_1.id));
                                    _52.label = 266;
                                case 266:
                                    _52.trys.push([266, 274, , 275]);
                                    return [4 /*yield*/, Tag_1["default"].findOne({
                                            where: { id: tagId, companyId: companyId }
                                        })];
                                case 267:
                                    tag = _52.sent();
                                    if (!tag) return [3 /*break*/, 272];
                                    // Remover tags anteriores do contato
                                    return [4 /*yield*/, TicketTag_1["default"].destroy({
                                            where: { ticketId: ticket_1.id }
                                        })];
                                case 268:
                                    // Remover tags anteriores do contato
                                    _52.sent();
                                    // Adicionar nova tag ao ticket
                                    return [4 /*yield*/, TicketTag_1["default"].create({
                                            ticketId: ticket_1.id,
                                            tagId: tagId
                                        })];
                                case 269:
                                    // Adicionar nova tag ao ticket
                                    _52.sent();
                                    // Adicionar tag ao contato também
                                    return [4 /*yield*/, ContactTag_1["default"].create({
                                            contactId: ticket_1.contactId,
                                            tagId: tagId
                                        })];
                                case 270:
                                    // Adicionar tag ao contato também
                                    _52.sent();
                                    console.log("addTag: Tag \"".concat(tag.name, "\" adicionada com sucesso"));
                                    io_8 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 271:
                                    ticketUpdated = _52.sent();
                                    io_8.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    return [3 /*break*/, 273];
                                case 272:
                                    console.log("addTag: Tag ".concat(tagId, " n\u00E3o encontrada"));
                                    _52.label = 273;
                                case 273: return [3 /*break*/, 275];
                                case 274:
                                    error_22 = _52.sent();
                                    console.error("addTag: Erro ao adicionar tag", error_22.message);
                                    return [3 /*break*/, 275];
                                case 275:
                                    if (!(nodeSelected.type === "kanbanStage")) return [3 /*break*/, 290];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 277];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 276:
                                    ticket_1 = _52.sent();
                                    _52.label = 277;
                                case 277:
                                    kanbanData = ((_8 = nodeSelected.data) === null || _8 === void 0 ? void 0 : _8.data) || nodeSelected.data;
                                    tagId = kanbanData === null || kanbanData === void 0 ? void 0 : kanbanData.tagId;
                                    if (!(tagId && ticket_1)) return [3 /*break*/, 290];
                                    console.log("KanbanStage: Definindo etapa kanban ".concat(tagId, " para ticket ").concat(ticket_1.id));
                                    _52.label = 278;
                                case 278:
                                    _52.trys.push([278, 289, , 290]);
                                    return [4 /*yield*/, Tag_1["default"].findOne({
                                            where: { id: tagId, companyId: companyId, kanban: 1 }
                                        })];
                                case 279:
                                    tag = _52.sent();
                                    if (!tag) return [3 /*break*/, 287];
                                    return [4 /*yield*/, TicketTag_1["default"].findAll({
                                            where: { ticketId: ticket_1.id },
                                            include: [{
                                                    model: Tag_1["default"],
                                                    where: { kanban: 1 }
                                                }]
                                        })];
                                case 280:
                                    existingKanbanTags = _52.sent();
                                    _44 = 0, existingKanbanTags_2 = existingKanbanTags;
                                    _52.label = 281;
                                case 281:
                                    if (!(_44 < existingKanbanTags_2.length)) return [3 /*break*/, 284];
                                    existingTag = existingKanbanTags_2[_44];
                                    return [4 /*yield*/, existingTag.destroy()];
                                case 282:
                                    _52.sent();
                                    _52.label = 283;
                                case 283:
                                    _44++;
                                    return [3 /*break*/, 281];
                                case 284: 
                                // Adicionar nova tag kanban
                                return [4 /*yield*/, TicketTag_1["default"].create({
                                        ticketId: ticket_1.id,
                                        tagId: tag.id
                                    })];
                                case 285:
                                    // Adicionar nova tag kanban
                                    _52.sent();
                                    console.log("KanbanStage: Etapa ".concat(tag.name, " definida com sucesso"));
                                    io_9 = (0, socket_1.getIO)();
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket_1.id, companyId)];
                                case 286:
                                    ticketUpdated = _52.sent();
                                    io_9.of(String(companyId))
                                        .emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketUpdated
                                    });
                                    return [3 /*break*/, 288];
                                case 287:
                                    console.log("KanbanStage: Tag kanban ".concat(tagId, " n\u00E3o encontrada"));
                                    _52.label = 288;
                                case 288: return [3 /*break*/, 290];
                                case 289:
                                    error_23 = _52.sent();
                                    console.error("KanbanStage: Erro ao definir etapa kanban", error_23.message);
                                    return [3 /*break*/, 290];
                                case 290:
                                    isCondition = false;
                                    normalizeVariableKey = function (rawValue) {
                                        if (!rawValue)
                                            return "";
                                        return rawValue.replace(/^[\s{]+/, "").replace(/[\s}]+$/, "").trim();
                                    };
                                    if (!(nodeSelected.type === "condition")) return [3 /*break*/, 293];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 292];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 291:
                                    ticket_1 = _52.sent();
                                    _52.label = 292;
                                case 292:
                                    conditionData = ((_9 = nodeSelected.data) === null || _9 === void 0 ? void 0 : _9.data) || nodeSelected.data;
                                    key = conditionData === null || conditionData === void 0 ? void 0 : conditionData.key;
                                    normalizedKey = normalizeVariableKey(key);
                                    condition = conditionData === null || conditionData === void 0 ? void 0 : conditionData.condition;
                                    value = conditionData === null || conditionData === void 0 ? void 0 : conditionData.value;
                                    console.log("Condition: Avaliando ".concat(normalizedKey || key, " ").concat(condition, " ").concat(value));
                                    variableValue = "";
                                    if ((_10 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _10 === void 0 ? void 0 : _10.variables) {
                                        if (normalizedKey && ticket_1.dataWebhook.variables[normalizedKey] !== undefined) {
                                            variableValue = ticket_1.dataWebhook.variables[normalizedKey];
                                        }
                                        else if (key && ticket_1.dataWebhook.variables[key] !== undefined) {
                                            variableValue = ticket_1.dataWebhook.variables[key];
                                        }
                                    }
                                    conditionResult = false;
                                    switch (parseInt(condition)) {
                                        case 1: // ==
                                            conditionResult = String(variableValue) === String(value);
                                            break;
                                        case 6: // contains (substring)
                                            conditionResult = String(variableValue || "")
                                                .toLowerCase()
                                                .includes(String(value || "").toLowerCase());
                                            break;
                                        case 2: // >=
                                            conditionResult = parseFloat(variableValue) >= parseFloat(value);
                                            break;
                                        case 3: // <=
                                            conditionResult = parseFloat(variableValue) <= parseFloat(value);
                                            break;
                                        case 4: // <
                                            conditionResult = parseFloat(variableValue) < parseFloat(value);
                                            break;
                                        case 5: // >
                                            conditionResult = parseFloat(variableValue) > parseFloat(value);
                                            break;
                                        default:
                                            conditionResult = String(variableValue) === String(value);
                                    }
                                    console.log("Condition: Resultado = ".concat(conditionResult));
                                    resultConnect = connects.filter(function (connect) { return connect.source === nodeSelected.id; });
                                    if (conditionResult) {
                                        trueConnection = resultConnect.find(function (item) { return item.sourceHandle === "true"; });
                                        if (trueConnection) {
                                            next_1 = trueConnection.target;
                                            noAlterNext = true;
                                        }
                                    }
                                    else {
                                        falseConnection = resultConnect.find(function (item) { return item.sourceHandle === "false"; });
                                        if (falseConnection) {
                                            next_1 = falseConnection.target;
                                            noAlterNext = true;
                                        }
                                    }
                                    isCondition = true;
                                    _52.label = 293;
                                case 293:
                                    isKeywordCondition = false;
                                    if (!(nodeSelected.type === "keywordCondition")) return [3 /*break*/, 296];
                                    isKeywordCondition = true;
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 295];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 294:
                                    ticket_1 = _52.sent();
                                    _52.label = 295;
                                case 295:
                                    keywordData = ((_11 = nodeSelected.data) === null || _11 === void 0 ? void 0 : _11.data) || nodeSelected.data;
                                    keywords = (keywordData === null || keywordData === void 0 ? void 0 : keywordData.keywords) || [];
                                    caseSensitive = (keywordData === null || keywordData === void 0 ? void 0 : keywordData.caseSensitive) || false;
                                    ignoreAccents = (keywordData === null || keywordData === void 0 ? void 0 : keywordData.ignoreAccents) || false;
                                    console.log("KeywordCondition: Avaliando ".concat(keywords.length, " palavras-chave"));
                                    userMessage = "";
                                    if ((_13 = (_12 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _12 === void 0 ? void 0 : _12.variables) === null || _13 === void 0 ? void 0 : _13.message) {
                                        userMessage = ticket_1.dataWebhook.variables.message;
                                    }
                                    else if ((_15 = (_14 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _14 === void 0 ? void 0 : _14.variables) === null || _15 === void 0 ? void 0 : _15.userMessage) {
                                        userMessage = ticket_1.dataWebhook.variables.userMessage;
                                    }
                                    else if (ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.lastMessage) {
                                        userMessage = ticket_1.lastMessage;
                                    }
                                    if (!userMessage && ((_16 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contact) === null || _16 === void 0 ? void 0 : _16.lastMessage)) {
                                        userMessage = ticket_1.contact.lastMessage;
                                    }
                                    if (userMessage) {
                                        searchText = String(userMessage).trim();
                                        if (!caseSensitive) {
                                            searchText = searchText.toLowerCase();
                                        }
                                        if (ignoreAccents) {
                                            removeAccents = function (text) {
                                                return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                            };
                                            searchText = removeAccents(searchText);
                                        }
                                        matchedKeyword = null;
                                        matchedIndex_1 = -1;
                                        // Verificar cada palavra-chave em ordem
                                        console.log("KeywordCondition: Avaliando ".concat(keywords.length, " palavras-chave:"), keywords.map(function (k) { return k.text; }));
                                        for (i_1 = 0; i_1 < keywords.length; i_1++) {
                                            keyword = keywords[i_1];
                                            if (!keyword.text)
                                                continue;
                                            searchKeyword = String(keyword.text).trim();
                                            if (!caseSensitive) {
                                                searchKeyword = searchKeyword.toLowerCase();
                                            }
                                            if (ignoreAccents) {
                                                searchKeyword = searchKeyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                            }
                                            keywordMatched = false;
                                            console.log("KeywordCondition: Comparando - Texto: \"".concat(searchText, "\" | Palavra-chave: \"").concat(searchKeyword, "\" | caseSensitive: ").concat(caseSensitive, " | ignoreAccents: ").concat(ignoreAccents));
                                            try {
                                                switch (parseInt(keyword.matchType)) {
                                                    case 1: // Exato
                                                        keywordMatched = searchText === searchKeyword;
                                                        break;
                                                    case 2: // Contém
                                                        keywordMatched = searchText.includes(searchKeyword);
                                                        break;
                                                    case 3: // Começa com
                                                        keywordMatched = searchText.startsWith(searchKeyword);
                                                        break;
                                                    case 4: // Termina com
                                                        keywordMatched = searchText.endsWith(searchKeyword);
                                                        break;
                                                    case 5: // RegEx
                                                        try {
                                                            regex = new RegExp(searchKeyword, caseSensitive ? 'g' : 'gi');
                                                            keywordMatched = regex.test(searchText);
                                                        }
                                                        catch (regexError) {
                                                            console.error("KeywordCondition: Erro na express\u00E3o regular: ".concat(regexError.message));
                                                            keywordMatched = false;
                                                        }
                                                        break;
                                                    default:
                                                        keywordMatched = searchText.includes(searchKeyword);
                                                }
                                                console.log("KeywordCondition: Resultado: ".concat(keywordMatched, " (matchType: ").concat(keyword.matchType, ")"));
                                            }
                                            catch (error) {
                                                console.error("KeywordCondition: Erro na avalia\u00E7\u00E3o: ".concat(error.message));
                                                keywordMatched = false;
                                            }
                                            if (keywordMatched) {
                                                matchedKeyword = keyword;
                                                matchedIndex_1 = i_1;
                                                break; // Para na primeira correspondência
                                            }
                                        }
                                        resultConnect = connects.filter(function (connect) { return connect.source === nodeSelected.id; });
                                        if (matchedKeyword && matchedIndex_1 >= 0) {
                                            // Caminho para a palavra-chave correspondente
                                            console.log("KeywordCondition: Procurando conex\u00E3o para keyword_".concat(matchedIndex_1));
                                            console.log("KeywordCondition: Conex\u00F5es dispon\u00EDveis:", resultConnect.map(function (c) { return ({ sourceHandle: c.sourceHandle, target: c.target }); }));
                                            keywordConnection = resultConnect.find(function (item) { return item.sourceHandle === "keyword_".concat(matchedIndex_1); });
                                            if (keywordConnection) {
                                                next_1 = keywordConnection.target;
                                                console.log("KeywordCondition: Direcionando para fluxo da palavra-chave \"".concat(matchedKeyword.text, "\" (\u00EDndice ").concat(matchedIndex_1, ") \u2192 ").concat(keywordConnection.target));
                                            }
                                            else {
                                                console.log("KeywordCondition: Nenhuma conex\u00E3o encontrada para keyword_".concat(matchedIndex_1));
                                            }
                                        }
                                        else {
                                            defaultConnection = resultConnect.find(function (item) { return item.sourceHandle === "default"; });
                                            if (defaultConnection) {
                                                next_1 = defaultConnection.target;
                                                noAlterNext = true;
                                                console.log("KeywordCondition: Nenhuma palavra-chave encontrada, usando fluxo padr\u00E3o");
                                            }
                                        }
                                    }
                                    else {
                                        console.log("KeywordCondition: Nenhuma mensagem encontrada para avalia\u00E7\u00E3o");
                                    }
                                    console.log("KeywordCondition: Pr\u00F3ximo n\u00F3 definido como: ".concat(next_1));
                                    console.log("KeywordCondition: Indo para pr\u00F3xima itera\u00E7\u00E3o do loop principal...");
                                    _52.label = 296;
                                case 296:
                                    console.log("=== AP\u00D3S KEYWORDCONDITION - Verificando se continua o loop ===");
                                    console.log("=== Valores atuais: next=".concat(next_1, ", isKeywordCondition=").concat(isKeywordCondition, " ==="));
                                    isAsaas = false;
                                    if (!(nodeSelected.type === "asaas")) return [3 /*break*/, 337];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 298];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 297:
                                    ticket_1 = _52.sent();
                                    _52.label = 298;
                                case 298:
                                    asaasData = ((_17 = nodeSelected.data) === null || _17 === void 0 ? void 0 : _17.data) || nodeSelected.data;
                                    message = (asaasData === null || asaasData === void 0 ? void 0 : asaasData.message) || "Por favor, informe seu CPF para buscarmos seu boleto:";
                                    successMessage = (asaasData === null || asaasData === void 0 ? void 0 : asaasData.successMessage) || "Encontramos seu boleto! Enviando os dados...";
                                    errorMessage = (asaasData === null || asaasData === void 0 ? void 0 : asaasData.errorMessage) || "Desculpe, não encontramos nenhum boleto pendente para este CPF.";
                                    console.log("Asaas: Iniciando fluxo de 2\u00AA via de boleto");
                                    currentWebhookData = (ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) || {};
                                    asaasState = (currentWebhookData === null || currentWebhookData === void 0 ? void 0 : currentWebhookData.asaasState) || {};
                                    awaitingCpf = (asaasState === null || asaasState === void 0 ? void 0 : asaasState.awaiting) === true &&
                                        (asaasState === null || asaasState === void 0 ? void 0 : asaasState.nodeId) === nodeSelected.id;
                                    if (!!awaitingCpf) return [3 /*break*/, 302];
                                    // Enviar mensagem solicitando CPF e marcar estado de espera
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message
                                        }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 299:
                                    // Enviar mensagem solicitando CPF e marcar estado de espera
                                    _52.sent();
                                    if (!ticket_1) return [3 /*break*/, 301];
                                    updatedWebhook = __assign(__assign({}, currentWebhookData), { asaasState: { awaiting: true, nodeId: nodeSelected.id } });
                                    return [4 /*yield*/, ticket_1.update({
                                            queueId: ticket_1.queueId ? ticket_1.queueId : null,
                                            userId: null,
                                            companyId: companyId,
                                            flowWebhook: true,
                                            lastFlowId: nodeSelected.type === "directOpenai" ? ticket_1.lastFlowId : nodeSelected.id,
                                            dataWebhook: updatedWebhook,
                                            hashFlowId: hashWebhookId,
                                            flowStopped: idFlowDb.toString()
                                        })];
                                case 300:
                                    _52.sent();
                                    ticket_1.dataWebhook = updatedWebhook;
                                    _52.label = 301;
                                case 301:
                                    console.log("Asaas: Aguardando CPF do cliente");
                                    return [2 /*return*/, "break"];
                                case 302:
                                    if (!(pressKey && pressKey !== "999")) return [3 /*break*/, 336];
                                    cpf = pressKey.replace(/\D/g, '');
                                    console.log("Asaas: CPF recebido: ".concat(cpf));
                                    resultConnect = connects.filter(function (connect) { return connect.source === nodeSelected.id; });
                                    _52.label = 303;
                                case 303:
                                    _52.trys.push([303, 331, , 335]);
                                    return [4 /*yield*/, (0, PaymentGatewayService_1.getAsaasSecondCopyByCpf)(companyId, cpf)];
                                case 304:
                                    boletoData = _52.sent();
                                    if (!((_18 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _18 === void 0 ? void 0 : _18.asaasState)) return [3 /*break*/, 306];
                                    updatedWebhook = __assign({}, (ticket_1.dataWebhook || {}));
                                    delete updatedWebhook.asaasState;
                                    return [4 /*yield*/, ticket_1.update({ dataWebhook: updatedWebhook })];
                                case 305:
                                    _52.sent();
                                    ticket_1.dataWebhook = updatedWebhook;
                                    _52.label = 306;
                                case 306:
                                    boletoFileSources = [
                                        boletoData.invoicePdfUrl,
                                        boletoData.bankSlipUrl,
                                        boletoData.invoiceUrl
                                    ].filter(Boolean);
                                    boletoLink = boletoFileSources[0] || null;
                                    boletoFileSource = boletoLink;
                                    isOfficialAsaas = (whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official";
                                    wbot = isOfficialAsaas ? null : (0, wbot_1.getWbot)(whatsapp_1.id);
                                    contactNumber = "".concat(((_19 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.contact) === null || _19 === void 0 ? void 0 : _19.number) || numberClient_1).concat((ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.isGroup) ? "@g.us" : "@s.whatsapp.net");
                                    sendBufferOfficial = function (buf, filename, mimetype, caption) { return __awaiter(void 0, void 0, void 0, function () {
                                        var tmpDir, tmpPath, contactAsaas;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    tmpDir = path_1["default"].join(path_1["default"].resolve(__dirname, "../../.."), "public", "company".concat(companyId));
                                                    if (!fs_1["default"].existsSync(tmpDir))
                                                        fs_1["default"].mkdirSync(tmpDir, { recursive: true });
                                                    tmpPath = path_1["default"].join(tmpDir, filename);
                                                    fs_1["default"].writeFileSync(tmpPath, buf);
                                                    return [4 /*yield*/, Contact_1["default"].findOne({ where: { number: numberClient_1, companyId: companyId } })];
                                                case 1:
                                                    contactAsaas = _a.sent();
                                                    return [4 /*yield*/, (0, SendMediaOfficialService_1.SendMediaOfficialService)({
                                                            media: { fieldname: "file", originalname: filename, encoding: "7bit", mimetype: mimetype, destination: tmpDir, filename: filename, path: tmpPath, size: buf.length, stream: null, buffer: null },
                                                            body: caption,
                                                            ticketId: ticket_1.id,
                                                            contact: contactAsaas,
                                                            connection: whatsapp_1,
                                                            passVerification: true
                                                        })];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    if (!boletoFileSource) return [3 /*break*/, 321];
                                    _52.label = 307;
                                case 307:
                                    _52.trys.push([307, 313, , 321]);
                                    console.log("Asaas: Tentando enviar PDF do boleto: ".concat(boletoFileSource));
                                    return [4 /*yield*/, (0, pdfUtils_1.fetchPdfBufferFromUrl)(boletoFileSource)];
                                case 308:
                                    pdfBuffer = (_52.sent()).buffer;
                                    fileName = "boleto-".concat(boletoData.paymentId || "asaas", ".pdf");
                                    console.log("Asaas: Enviando PDF - Tamanho: ".concat(pdfBuffer.length, " bytes"));
                                    if (!isOfficialAsaas) return [3 /*break*/, 310];
                                    return [4 /*yield*/, sendBufferOfficial(pdfBuffer, fileName, "application/pdf", "")];
                                case 309:
                                    _52.sent();
                                    return [3 /*break*/, 312];
                                case 310: return [4 /*yield*/, wbot.sendMessage(contactNumber, { document: pdfBuffer, fileName: fileName, mimetype: "application/pdf" })];
                                case 311:
                                    _52.sent();
                                    _52.label = 312;
                                case 312:
                                    console.log("Asaas: PDF enviado com sucesso");
                                    return [3 /*break*/, 321];
                                case 313:
                                    pdfError_1 = _52.sent();
                                    console.error("Asaas: Erro ao enviar PDF do boleto", pdfError_1.message);
                                    _52.label = 314;
                                case 314:
                                    _52.trys.push([314, 319, , 320]);
                                    fallbackText = "\uD83D\uDCC4 Boleto - Vencimento: ".concat(boletoData.dueDate || "N/A", " - Valor: R$ ").concat(((_20 = boletoData.value) === null || _20 === void 0 ? void 0 : _20.toFixed(2)) || "0.00", "\n\n\uD83D\uDD17 Link para o boleto: ").concat(boletoFileSource, "\n\n\uD83D\uDCA1 Copie e cole o link no navegador para baixar o PDF.");
                                    if (!isOfficialAsaas) return [3 /*break*/, 316];
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, { number: numberClient_1, body: fallbackText }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 315:
                                    _52.sent();
                                    return [3 /*break*/, 318];
                                case 316: return [4 /*yield*/, wbot.sendMessage(contactNumber, { text: fallbackText })];
                                case 317:
                                    _52.sent();
                                    _52.label = 318;
                                case 318: return [3 /*break*/, 320];
                                case 319:
                                    linkError_1 = _52.sent();
                                    console.error("Asaas: Erro ao enviar link do boleto", linkError_1.message);
                                    return [3 /*break*/, 320];
                                case 320: return [3 /*break*/, 321];
                                case 321:
                                    pixMessage = [];
                                    if (boletoData.pixCopyPaste)
                                        pixMessage.push("\uD83D\uDCA0 PIX: ".concat(boletoData.pixCopyPaste));
                                    if (boletoLink)
                                        pixMessage.push("\uD83D\uDD17 Link: ".concat(boletoLink));
                                    if (!(pixMessage.length > 0)) return [3 /*break*/, 323];
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, { number: numberClient_1, body: pixMessage.join('\n') }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 322:
                                    _52.sent();
                                    _52.label = 323;
                                case 323:
                                    if (!boletoData.pixQrCodeImage) return [3 /*break*/, 330];
                                    _52.label = 324;
                                case 324:
                                    _52.trys.push([324, 329, , 330]);
                                    imageBuffer = Buffer.from(boletoData.pixQrCodeImage, "base64");
                                    if (!isOfficialAsaas) return [3 /*break*/, 326];
                                    return [4 /*yield*/, sendBufferOfficial(imageBuffer, "qrcode-".concat((0, randomCode_1.randomString)(8), ".jpg"), "image/jpeg", "")];
                                case 325:
                                    _52.sent();
                                    return [3 /*break*/, 328];
                                case 326: return [4 /*yield*/, wbot.sendMessage(contactNumber, { image: imageBuffer })];
                                case 327:
                                    _52.sent();
                                    _52.label = 328;
                                case 328: return [3 /*break*/, 330];
                                case 329:
                                    err_2 = _52.sent();
                                    console.error("Asaas: Falha ao enviar imagem do QR Code PIX", err_2);
                                    return [3 /*break*/, 330];
                                case 330:
                                    console.log("Asaas: Boleto enviado com sucesso");
                                    successConnection = resultConnect.find(function (item) { return item.sourceHandle === "success"; });
                                    if (successConnection) {
                                        next_1 = successConnection.target;
                                        noAlterNext = true;
                                    }
                                    pressKey = "999";
                                    return [3 /*break*/, 335];
                                case 331:
                                    error_24 = _52.sent();
                                    console.error("Asaas: Erro ao buscar boleto", error_24.message);
                                    if (!((_21 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _21 === void 0 ? void 0 : _21.asaasState)) return [3 /*break*/, 333];
                                    updatedWebhook = __assign({}, (ticket_1.dataWebhook || {}));
                                    delete updatedWebhook.asaasState;
                                    return [4 /*yield*/, ticket_1.update({ dataWebhook: updatedWebhook })];
                                case 332:
                                    _52.sent();
                                    ticket_1.dataWebhook = updatedWebhook;
                                    _52.label = 333;
                                case 333: 
                                // Enviar mensagem de erro
                                return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, {
                                        number: numberClient_1,
                                        body: errorMessage
                                    }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 334:
                                    // Enviar mensagem de erro
                                    _52.sent();
                                    errorConnection = resultConnect.find(function (item) { return item.sourceHandle === "error"; });
                                    if (errorConnection) {
                                        next_1 = errorConnection.target;
                                        noAlterNext = true;
                                    }
                                    pressKey = "999";
                                    return [3 /*break*/, 335];
                                case 335:
                                    isAsaas = true;
                                    return [3 /*break*/, 337];
                                case 336:
                                    // Aguardando resposta do cliente - pausar fluxo
                                    console.log("Asaas: Aguardando CPF do cliente");
                                    return [2 /*return*/, "break"];
                                case 337:
                                    isRandomizer = void 0;
                                    if (nodeSelected.type === "randomizer") {
                                        selectedRandom = (0, randomizador_1.randomizarCaminho)(nodeSelected.data.percent / 100);
                                        resultConnect = connects.filter(function (connect) { return connect.source === nodeSelected.id; });
                                        if (selectedRandom === "A") {
                                            next_1 = resultConnect.filter(function (item) { return item.sourceHandle === "a"; })[0]
                                                .target;
                                            noAlterNext = true;
                                        }
                                        else {
                                            next_1 = resultConnect.filter(function (item) { return item.sourceHandle === "b"; })[0]
                                                .target;
                                            noAlterNext = true;
                                        }
                                        isRandomizer = true;
                                    }
                                    if (!(nodeSelected.type === "smtp")) return [3 /*break*/, 349];
                                    console.log("SMTP: Iniciando envio de email");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 339];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 338:
                                    ticket_1 = _52.sent();
                                    _52.label = 339;
                                case 339:
                                    if (!ticket_1) {
                                        console.log("SMTP: Ticket não encontrado");
                                        return [2 /*return*/, "break"];
                                    }
                                    smtpConfig = ((_22 = nodeSelected.data) === null || _22 === void 0 ? void 0 : _22.smtpConfig) || {};
                                    emailConfig = ((_23 = nodeSelected.data) === null || _23 === void 0 ? void 0 : _23.emailConfig) || {};
                                    resultConnect = connects.filter(function (connect) { return connect.source === nodeSelected.id; });
                                    variables_2 = ((_24 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _24 === void 0 ? void 0 : _24.variables) || {};
                                    console.log("SMTP: Variáveis disponíveis:", variables_2);
                                    emailBody_1 = (emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.content) || (emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.body) || "";
                                    emailSubject_1 = (emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.subject) || "";
                                    recipientEmail_1 = (emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.to) || "";
                                    // Substituir variáveis no conteúdo
                                    console.log("SMTP: Antes da substituição - recipientEmail:", JSON.stringify(recipientEmail_1));
                                    console.log("SMTP: Variáveis disponíveis:", JSON.stringify(variables_2));
                                    Object.keys(variables_2).forEach(function (key) {
                                        var placeholder = "{{".concat(key, "}}");
                                        var value = variables_2[key];
                                        console.log("SMTP: Substituindo ".concat(placeholder, " por ").concat(value));
                                        console.log("SMTP: recipientEmail antes: ".concat(JSON.stringify(recipientEmail_1)));
                                        // Verificar se o placeholder existe na string
                                        if (recipientEmail_1.includes(placeholder)) {
                                            console.log("SMTP: Placeholder ".concat(placeholder, " encontrado!"));
                                            // Usar replaceAll em vez de replace com regex para evitar problemas
                                            recipientEmail_1 = recipientEmail_1.split(placeholder).join(value);
                                            console.log("SMTP: recipientEmail depois: ".concat(JSON.stringify(recipientEmail_1)));
                                        }
                                        else {
                                            console.log("SMTP: Placeholder ".concat(placeholder, " N\u00C3O encontrado em ").concat(JSON.stringify(recipientEmail_1)));
                                        }
                                        emailBody_1 = emailBody_1.split(placeholder).join(value);
                                        emailSubject_1 = emailSubject_1.split(placeholder).join(value);
                                    });
                                    console.log("SMTP: Após substituição - recipientEmail:", JSON.stringify(recipientEmail_1));
                                    console.log("SMTP: Enviando email para:", recipientEmail_1);
                                    console.log("SMTP: Assunto:", emailSubject_1);
                                    _52.label = 340;
                                case 340:
                                    _52.trys.push([340, 345, , 349]);
                                    nodemailer = require('nodemailer');
                                    transporter = nodemailer.createTransport({
                                        host: smtpConfig.host,
                                        port: smtpConfig.port || 587,
                                        secure: smtpConfig.useTLS || false,
                                        auth: {
                                            user: smtpConfig.username,
                                            pass: smtpConfig.password // usar password do formulário
                                        }
                                    });
                                    // Enviar email
                                    return [4 /*yield*/, transporter.sendMail({
                                            from: smtpConfig.fromEmail || smtpConfig.username,
                                            to: recipientEmail_1,
                                            subject: emailSubject_1,
                                            html: emailBody_1,
                                            text: emailBody_1.replace(/<[^>]*>/g, '') // Versão texto
                                        })];
                                case 341:
                                    // Enviar email
                                    _52.sent();
                                    console.log("SMTP: Email enviado com sucesso");
                                    if (!(ticket_1 && ticket_1.contact && ticket_1.contact.number)) return [3 /*break*/, 343];
                                    confirmationMessage = "\u2705 Email enviado com sucesso para ".concat(recipientEmail_1);
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, {
                                            number: "".concat(ticket_1.contact.number, "@s.whatsapp.net"),
                                            body: confirmationMessage
                                        }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 342:
                                    _52.sent();
                                    return [3 /*break*/, 344];
                                case 343:
                                    console.log("SMTP: Contact não disponível para enviar confirmação");
                                    _52.label = 344;
                                case 344: return [3 /*break*/, 349];
                                case 345:
                                    error_25 = _52.sent();
                                    console.error("SMTP: Erro ao enviar email:", error_25);
                                    if (!(ticket_1 && ticket_1.contact && ticket_1.contact.number)) return [3 /*break*/, 347];
                                    errorMessage = "\u274C Falha ao enviar email. Tente novamente mais tarde.";
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, {
                                            number: "".concat(ticket_1.contact.number, "@s.whatsapp.net"),
                                            body: errorMessage
                                        }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 346:
                                    _52.sent();
                                    return [3 /*break*/, 348];
                                case 347:
                                    console.log("SMTP: Contact não disponível para enviar mensagem de erro");
                                    _52.label = 348;
                                case 348:
                                    errorConnection = resultConnect.find(function (item) { return item.sourceHandle === "error"; });
                                    if (errorConnection) {
                                        next_1 = errorConnection.target;
                                        noAlterNext = true;
                                    }
                                    return [3 /*break*/, 349];
                                case 349:
                                    if (!(nodeSelected.type === "closeTicket")) return [3 /*break*/, 386];
                                    console.log("=== PROCESSANDO N\u00D3 closeTicket (ENCERRAR TICKET) ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 351];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: {
                                                id: idTicket,
                                                whatsappId: whatsappId,
                                                companyId: companyId
                                            }
                                        })];
                                case 350:
                                    ticket_1 = _52.sent();
                                    _52.label = 351;
                                case 351:
                                    if (!(nodeSelected.type === "googleSheets")) return [3 /*break*/, 376];
                                    console.log("GoogleSheets: Iniciando operação");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 353];
                                    return [4 /*yield*/, (0, ShowTicketService_1["default"])(idTicket, companyId)];
                                case 352:
                                    ticket_1 = _52.sent();
                                    _52.label = 353;
                                case 353:
                                    if (!ticket_1) {
                                        console.log("GoogleSheets: Ticket não encontrado");
                                        return [2 /*return*/, "break"];
                                    }
                                    sheetsConfig = ((_25 = nodeSelected.data) === null || _25 === void 0 ? void 0 : _25.sheetsConfig) || {};
                                    operation = ((_26 = nodeSelected.data) === null || _26 === void 0 ? void 0 : _26.operation) || "list";
                                    resultConnect_1 = connects.filter(function (connect) { return connect.source === nodeSelected.id && connect.sourceHandle === "error"; });
                                    variables = ((_27 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _27 === void 0 ? void 0 : _27.variables) || {};
                                    console.log("GoogleSheets: Variáveis disponíveis:", variables);
                                    _52.label = 354;
                                case 354:
                                    _52.trys.push([354, 371, , 376]);
                                    GoogleSheetsService = require("../GoogleSheetsService")["default"];
                                    sheetsService = new GoogleSheetsService();
                                    result = void 0;
                                    _45 = operation;
                                    switch (_45) {
                                        case "list": return [3 /*break*/, 355];
                                        case "add": return [3 /*break*/, 357];
                                        case "edit": return [3 /*break*/, 359];
                                        case "delete": return [3 /*break*/, 361];
                                        case "search": return [3 /*break*/, 363];
                                    }
                                    return [3 /*break*/, 365];
                                case 355: return [4 /*yield*/, sheetsService.listData(sheetsConfig, variables)];
                                case 356:
                                    result = _52.sent();
                                    return [3 /*break*/, 366];
                                case 357: return [4 /*yield*/, sheetsService.addRow(sheetsConfig, ((_28 = nodeSelected.data) === null || _28 === void 0 ? void 0 : _28.rowData) || {}, variables)];
                                case 358:
                                    result = _52.sent();
                                    return [3 /*break*/, 366];
                                case 359: return [4 /*yield*/, sheetsService.editRow(sheetsConfig, ((_29 = nodeSelected.data) === null || _29 === void 0 ? void 0 : _29.searchColumn) || "", ((_30 = nodeSelected.data) === null || _30 === void 0 ? void 0 : _30.searchValue) || "", ((_31 = nodeSelected.data) === null || _31 === void 0 ? void 0 : _31.rowData) || {}, variables)];
                                case 360:
                                    result = _52.sent();
                                    return [3 /*break*/, 366];
                                case 361: return [4 /*yield*/, sheetsService.deleteRow(sheetsConfig, ((_32 = nodeSelected.data) === null || _32 === void 0 ? void 0 : _32.searchColumn) || "", ((_33 = nodeSelected.data) === null || _33 === void 0 ? void 0 : _33.searchValue) || "", variables)];
                                case 362:
                                    result = _52.sent();
                                    return [3 /*break*/, 366];
                                case 363: return [4 /*yield*/, sheetsService.searchData(sheetsConfig, ((_34 = nodeSelected.data) === null || _34 === void 0 ? void 0 : _34.searchColumn) || "", ((_35 = nodeSelected.data) === null || _35 === void 0 ? void 0 : _35.searchValue) || "", variables)];
                                case 364:
                                    result = _52.sent();
                                    return [3 /*break*/, 366];
                                case 365: throw new Error("Opera\u00E7\u00E3o \"".concat(operation, "\" n\u00E3o suportada"));
                                case 366:
                                    console.log("GoogleSheets: Operação executada com sucesso:", result);
                                    outputVariable = (_36 = nodeSelected.data) === null || _36 === void 0 ? void 0 : _36.outputVariable;
                                    if (!(outputVariable && (ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook))) return [3 /*break*/, 368];
                                    ticket_1.dataWebhook.variables[outputVariable] = JSON.stringify(result);
                                    return [4 /*yield*/, ticket_1.save()];
                                case 367:
                                    _52.sent();
                                    _52.label = 368;
                                case 368:
                                    if (!(ticket_1 && ticket_1.contact && ticket_1.contact.number)) return [3 /*break*/, 370];
                                    confirmationMessage = "\u2705 Opera\u00E7\u00E3o \"".concat(operation, "\" no Google Sheets executada com sucesso!");
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, {
                                            number: "".concat(ticket_1.contact.number, "@s.whatsapp.net"),
                                            body: confirmationMessage
                                        }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 369:
                                    _52.sent();
                                    _52.label = 370;
                                case 370: return [3 /*break*/, 376];
                                case 371:
                                    error_26 = _52.sent();
                                    console.error("GoogleSheets: Erro na operação:", error_26);
                                    if (!(ticket_1 && ticket_1.contact && ticket_1.contact.number)) return [3 /*break*/, 373];
                                    errorMessage = "\u274C Erro na opera\u00E7\u00E3o do Google Sheets: ".concat(error_26.message);
                                    return [4 /*yield*/, (0, SendMessageFlow_1.SendMessageFlow)(whatsapp_1, {
                                            number: "".concat(ticket_1.contact.number, "@s.whatsapp.net"),
                                            body: errorMessage
                                        }, ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id, ticket_1)];
                                case 372:
                                    _52.sent();
                                    _52.label = 373;
                                case 373:
                                    if (!(resultConnect_1.length > 0)) return [3 /*break*/, 375];
                                    nextNode = nodes.find(function (node) { return node.id === resultConnect_1[0].target; });
                                    if (!nextNode) return [3 /*break*/, 375];
                                    return [4 /*yield*/, (0, exports.ActionsWebhookService)(whatsappId, idFlowDb, companyId, nodes, connects, nextNode.id, dataWebhook, details, hashWebhookId, pressKey, idTicket, numberPhrase, msg)];
                                case 374:
                                    _52.sent();
                                    _52.label = 375;
                                case 375: return [2 /*return*/, "break"];
                                case 376:
                                    if (!ticket_1) return [3 /*break*/, 386];
                                    message = (_37 = nodeSelected.data) === null || _37 === void 0 ? void 0 : _37.message;
                                    if (!message) return [3 /*break*/, 383];
                                    console.log("closeTicket: Enviando mensagem de encerramento: ".concat(message));
                                    processedMessage_2 = message;
                                    return [4 /*yield*/, Contact_1["default"].findOne({
                                            where: { number: numberClient_1, companyId: companyId }
                                        })];
                                case 377:
                                    contact = _52.sent();
                                    if (contact) {
                                        variables_3 = {
                                            "{{name}}": contact.name || "",
                                            "{{number}}": contact.number || "",
                                            "{{email}}": contact.email || ""
                                        };
                                        // Adicionar variáveis do webhook
                                        if ((_38 = ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.dataWebhook) === null || _38 === void 0 ? void 0 : _38.variables) {
                                            Object.entries(ticket_1.dataWebhook.variables).forEach(function (_a) {
                                                var key = _a[0], value = _a[1];
                                                variables_3["{{".concat(key, "}}")] = String(value);
                                            });
                                        }
                                        Object.entries(variables_3).forEach(function (_a) {
                                            var key = _a[0], value = _a[1];
                                            processedMessage_2 = processedMessage_2.split(key).join(value);
                                        });
                                    }
                                    if (!((whatsapp_1 === null || whatsapp_1 === void 0 ? void 0 : whatsapp_1.channel) === "whatsapp_official")) return [3 /*break*/, 379];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, { number: numberClient_1, body: processedMessage_2, companyId: companyId }, false, ticket_1)];
                                case 378:
                                    _52.sent();
                                    return [3 /*break*/, 381];
                                case 379:
                                    wbot = (0, wbot_1.getWbot)(whatsapp_1.id);
                                    return [4 /*yield*/, wbot.sendMessage("".concat(numberClient_1, "@s.whatsapp.net"), { text: processedMessage_2 })];
                                case 380:
                                    _52.sent();
                                    _52.label = 381;
                                case 381:
                                    messageData = {
                                        wid: (0, randomCode_1.randomString)(50),
                                        ticketId: ticket_1.id,
                                        body: processedMessage_2,
                                        fromMe: true,
                                        read: true
                                    };
                                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: companyId })];
                                case 382:
                                    _52.sent();
                                    _52.label = 383;
                                case 383:
                                    // Encerrar o ticket via UpdateTicketService para garantir consistência
                                    logger_1["default"].info("closeTicket: Encerrando ticket ".concat(ticket_1.id, " (status atual: ").concat(ticket_1.status, ")"));
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketData: {
                                                status: "closed",
                                                sendFarewellMessage: false,
                                                userId: ticket_1.userId || null,
                                                queueId: ticket_1.queueId || null
                                            },
                                            ticketId: ticket_1.id,
                                            companyId: companyId
                                        })];
                                case 384:
                                    _52.sent();
                                    // Limpa estado do flow diretamente para não reabrir
                                    return [4 /*yield*/, Ticket_1["default"].update({ flowWebhook: false, flowStopped: null, lastFlowId: null }, { where: { id: ticket_1.id } })];
                                case 385:
                                    // Limpa estado do flow diretamente para não reabrir
                                    _52.sent();
                                    logger_1["default"].info("closeTicket: Ticket ".concat(ticket_1.id, " encerrado com sucesso"));
                                    return [2 /*return*/, { value: void 0 }];
                                case 386:
                                    if (!(nodeSelected.type === "productList")) return [3 /*break*/, 405];
                                    console.log("=== PROCESSANDO N\u00D3 productList (LISTA DE PRODUTOS) ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 388];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId }
                                        })];
                                case 387:
                                    ticket_1 = _52.sent();
                                    _52.label = 388;
                                case 388:
                                    if (!ticket_1) {
                                        console.error("productList: Ticket não encontrado");
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    _52.label = 389;
                                case 389:
                                    _52.trys.push([389, 403, , 405]);
                                    title = nodeSelected.data.title || "🛍️ Nossos Produtos e Serviços";
                                    listType = nodeSelected.data.listType || "all";
                                    displayType = nodeSelected.data.displayType || "standard";
                                    selectedItems_1 = nodeSelected.data.selectedItems || [];
                                    console.log("productList: T\u00EDtulo=\"".concat(title, "\", Tipo=").concat(listType, ", Display=").concat(displayType, ", Itens selecionados=").concat(selectedItems_1.length));
                                    products = [];
                                    if (!(listType === "all" || selectedItems_1.some(function (id) { return id.startsWith("product_"); }))) return [3 /*break*/, 391];
                                    Produto = require("../../models/Produto")["default"];
                                    return [4 /*yield*/, Produto.findAll({
                                            where: { companyId: ticket_1.companyId },
                                            order: [['nome', 'ASC']]
                                        })];
                                case 390:
                                    products = _52.sent();
                                    _52.label = 391;
                                case 391:
                                    services = [];
                                    if (!(listType === "all" || selectedItems_1.some(function (id) { return id.startsWith("service_"); }))) return [3 /*break*/, 393];
                                    Servico = require("../../models/Servico")["default"];
                                    return [4 /*yield*/, Servico.findAll({
                                            where: { companyId: ticket_1.companyId },
                                            order: [['nome', 'ASC']]
                                        })];
                                case 392:
                                    services = _52.sent();
                                    _52.label = 393;
                                case 393:
                                    message_1 = "".concat(title, "\n\n");
                                    filteredProducts = listType === "all"
                                        ? products
                                        : products.filter(function (p) { return selectedItems_1.includes("product_".concat(p.id)); });
                                    if (filteredProducts.length > 0) {
                                        message_1 += "*📦 Produtos:*\n";
                                        filteredProducts.forEach(function (product, index) {
                                            var name = product.nome || "Produto sem nome";
                                            var price = product.valor ? "R$ ".concat(parseFloat(product.valor).toFixed(2)) : "Preço não definido";
                                            message_1 += "".concat(index + 1, ". ").concat(name, " - ").concat(price, "\n");
                                        });
                                        message_1 += "\n";
                                    }
                                    filteredServices = listType === "all"
                                        ? services
                                        : services.filter(function (s) { return selectedItems_1.includes("service_".concat(s.id)); });
                                    if (filteredServices.length > 0) {
                                        message_1 += "*🔧 Serviços:*\n";
                                        filteredServices.forEach(function (service, index) {
                                            var name = service.nome || "Serviço sem nome";
                                            var price = "Preço não definido";
                                            if (service.valorOriginal) {
                                                price = "R$ ".concat(parseFloat(service.valorOriginal).toFixed(2));
                                            }
                                            message_1 += "".concat(index + 1, ". ").concat(name, " - ").concat(price, "\n");
                                        });
                                    }
                                    if (filteredProducts.length === 0 && filteredServices.length === 0) {
                                        message_1 = "🛍️ No momento não temos produtos ou serviços disponíveis.";
                                    }
                                    if (!(displayType === "carousel")) return [3 /*break*/, 399];
                                    // Modo carrossel nativo do WhatsApp
                                    console.log("productList: Enviando como carrossel nativo");
                                    carouselCards = [];
                                    defaultImage = "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Produto";
                                    // Adicionar produtos
                                    for (_46 = 0, filteredProducts_1 = filteredProducts; _46 < filteredProducts_1.length; _46++) {
                                        product = filteredProducts_1[_46];
                                        name_2 = product.nome || "Produto sem nome";
                                        price = product.valor ? "R$ ".concat(parseFloat(product.valor).toFixed(2)) : "Preço não definido";
                                        desc = product.descricao || "";
                                        image = product.imagem_principal || defaultImage;
                                        link = product.linkCompra || "";
                                        carouselCards.push({
                                            title: name_2,
                                            description: desc,
                                            price: price,
                                            image: image,
                                            button: link
                                                ? {
                                                    text: "Comprar",
                                                    value: link
                                                }
                                                : {
                                                    text: "Ver Detalhes",
                                                    value: "produto_".concat(product.id)
                                                }
                                        });
                                    }
                                    // Adicionar serviços (com imagem padrão)
                                    for (_47 = 0, filteredServices_1 = filteredServices; _47 < filteredServices_1.length; _47++) {
                                        service = filteredServices_1[_47];
                                        name_3 = service.nome || "Serviço sem nome";
                                        price = "Preço não definido";
                                        if (service.valorOriginal) {
                                            price = "R$ ".concat(parseFloat(service.valorOriginal).toFixed(2));
                                        }
                                        carouselCards.push({
                                            title: name_3,
                                            description: service.descricao || "",
                                            price: price,
                                            image: defaultImage,
                                            button: {
                                                text: "Ver Detalhes",
                                                value: "servico_".concat(service.id)
                                            }
                                        });
                                    }
                                    console.log("productList: ".concat(carouselCards.length, " cards preparados para carrossel"));
                                    if (!(carouselCards.length >= 2)) return [3 /*break*/, 395];
                                    // Enviar carrossel nativo
                                    return [4 /*yield*/, (0, SendCarouselMessage_1.SendCarouselWithFallback)({
                                            ticket: ticket_1,
                                            title: title,
                                            cards: carouselCards
                                        })];
                                case 394:
                                    // Enviar carrossel nativo
                                    _52.sent();
                                    return [3 /*break*/, 398];
                                case 395:
                                    console.log("productList: Apenas ".concat(carouselCards.length, " cards (m\u00EDnimo 2), usando lista padr\u00E3o"));
                                    // Fallback para lista padrão se não tiver cards suficientes
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message_1
                                        })];
                                case 396:
                                    // Fallback para lista padrão se não tiver cards suficientes
                                    _52.sent();
                                    return [4 /*yield*/, intervalWhats("1")];
                                case 397:
                                    _52.sent();
                                    _52.label = 398;
                                case 398: return [3 /*break*/, 402];
                                case 399:
                                    // Modo padrão - enviar como lista única
                                    console.log("productList: Enviando como lista padrão");
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message_1
                                        })];
                                case 400:
                                    _52.sent();
                                    return [4 /*yield*/, intervalWhats("1")];
                                case 401:
                                    _52.sent();
                                    _52.label = 402;
                                case 402:
                                    console.log("productList: Mensagem enviada com ".concat(filteredProducts.length, " produtos e ").concat(filteredServices.length, " servi\u00E7os"));
                                    return [3 /*break*/, 405];
                                case 403:
                                    error_27 = _52.sent();
                                    console.error("productList: Erro ao processar lista de produtos:", error_27);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "❌ Ocorreu um erro ao carregar nossos produtos. Tente novamente mais tarde."
                                        })];
                                case 404:
                                    _52.sent();
                                    return [3 /*break*/, 405];
                                case 405:
                                    if (!(nodeSelected.type === "listSchedules")) return [3 /*break*/, 417];
                                    console.log("=== PROCESSANDO N\u00D3 listSchedules (MENU DE AGENDAS) ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 407];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId }
                                        })];
                                case 406:
                                    ticket_1 = _52.sent();
                                    _52.label = 407;
                                case 407:
                                    if (!ticket_1) {
                                        console.error("listSchedules: Ticket não encontrado");
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 408;
                                case 408:
                                    _52.trys.push([408, 415, , 417]);
                                    ScheduleAppointmentService = require("../ScheduleServices/ScheduleAppointmentService")["default"];
                                    messageText = nodeSelected.data.messageText || "📋 Escolha uma agenda:";
                                    activeOnly = nodeSelected.data.activeOnly !== undefined ? nodeSelected.data.activeOnly : true;
                                    maxSchedules = nodeSelected.data.maxSchedules || 10;
                                    return [4 /*yield*/, ScheduleAppointmentService({
                                            action: "list_user_schedules",
                                            companyId: ticket_1.companyId,
                                            activeOnly: activeOnly
                                        })];
                                case 409:
                                    result = _52.sent();
                                    if (!(!result.success || !result.data || result.data.length === 0)) return [3 /*break*/, 411];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "❌ Nenhuma agenda disponível no momento."
                                        })];
                                case 410:
                                    _52.sent();
                                    return [2 /*return*/, "continue"];
                                case 411:
                                    schedules = result.data.slice(0, maxSchedules);
                                    listMessage_1 = "".concat(messageText, "\n\n");
                                    schedules.forEach(function (schedule, index) {
                                        listMessage_1 += "".concat(index + 1, ". ").concat(schedule.name, " - ").concat(schedule.user, "\n");
                                    });
                                    listMessage_1 += "\nDigite o n\u00FAmero da agenda desejada (1-".concat(schedules.length, ")");
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: listMessage_1
                                        })];
                                case 412:
                                    _52.sent();
                                    if (!pressKey) return [3 /*break*/, 414];
                                    selectedIndex = parseInt(pressKey);
                                    if (!(selectedIndex >= 1 && selectedIndex <= schedules.length)) return [3 /*break*/, 414];
                                    selectedSchedule = schedules[selectedIndex - 1];
                                    // Salvar variáveis no ticket
                                    if (!ticket_1.dataWebhook)
                                        ticket_1.dataWebhook = {};
                                    ticket_1.dataWebhook.selected_schedule_id = selectedSchedule.id;
                                    ticket_1.dataWebhook.selected_schedule_name = selectedSchedule.name;
                                    ticket_1.dataWebhook.selected_schedule_user = selectedSchedule.user;
                                    return [4 /*yield*/, ticket_1.save()];
                                case 413:
                                    _52.sent();
                                    _52.label = 414;
                                case 414: return [3 /*break*/, 417];
                                case 415:
                                    error_28 = _52.sent();
                                    console.error("listSchedules: Erro ao processar:", error_28);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "❌ Erro ao carregar agendas. Tente novamente."
                                        })];
                                case 416:
                                    _52.sent();
                                    return [3 /*break*/, 417];
                                case 417:
                                    if (!(nodeSelected.type === "checkAvailability")) return [3 /*break*/, 429];
                                    console.log("=== PROCESSANDO N\u00D3 checkAvailability ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 419];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId }
                                        })];
                                case 418:
                                    ticket_1 = _52.sent();
                                    _52.label = 419;
                                case 419:
                                    if (!ticket_1) {
                                        console.error("checkAvailability: Ticket não encontrado");
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 420;
                                case 420:
                                    _52.trys.push([420, 427, , 429]);
                                    ScheduleAppointmentService = require("../ScheduleServices/ScheduleAppointmentService")["default"];
                                    scheduleVariable = nodeSelected.data.scheduleVariable || "";
                                    dateVariable = nodeSelected.data.dateVariable || "";
                                    saveVariable = nodeSelected.data.saveVariable || "available_slots";
                                    showMessage = nodeSelected.data.showMessage !== undefined ? nodeSelected.data.showMessage : true;
                                    messageText = nodeSelected.data.messageText || "⏰ Horários disponíveis:\n{available_slots}";
                                    replaceVariables = function (text) {
                                        var result = text;
                                        if (ticket_1.dataWebhook) {
                                            Object.keys(ticket_1.dataWebhook).forEach(function (key) {
                                                result = result.replace(new RegExp("\\{".concat(key, "\\}"), 'g'), ticket_1.dataWebhook[key]);
                                            });
                                        }
                                        return result;
                                    };
                                    scheduleId = replaceVariables(scheduleVariable);
                                    date = replaceVariables(dateVariable);
                                    if (!scheduleId || !date) {
                                        console.error("checkAvailability: scheduleId ou date não fornecidos");
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, ScheduleAppointmentService({
                                            action: "check_schedule_availability",
                                            companyId: ticket_1.companyId,
                                            scheduleId: parseInt(scheduleId),
                                            date: date
                                        })];
                                case 421:
                                    result = _52.sent();
                                    if (!!result.success) return [3 /*break*/, 423];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "❌ Erro ao verificar disponibilidade."
                                        })];
                                case 422:
                                    _52.sent();
                                    return [2 /*return*/, "continue"];
                                case 423:
                                    availableSlots = result.data.availableSlots || [];
                                    // Salvar variáveis no ticket
                                    if (!ticket_1.dataWebhook)
                                        ticket_1.dataWebhook = {};
                                    ticket_1.dataWebhook[saveVariable] = availableSlots.join(", ");
                                    ticket_1.dataWebhook["".concat(saveVariable, "_array")] = availableSlots;
                                    ticket_1.dataWebhook.has_available_slots = availableSlots.length > 0;
                                    return [4 /*yield*/, ticket_1.save()];
                                case 424:
                                    _52.sent();
                                    if (!showMessage) return [3 /*break*/, 426];
                                    message = messageText.replace("{available_slots}", availableSlots.join("\n"));
                                    message = replaceVariables(message);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message
                                        })];
                                case 425:
                                    _52.sent();
                                    _52.label = 426;
                                case 426: return [3 /*break*/, 429];
                                case 427:
                                    error_29 = _52.sent();
                                    console.error("checkAvailability: Erro ao processar:", error_29);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "❌ Erro ao verificar disponibilidade."
                                        })];
                                case 428:
                                    _52.sent();
                                    return [3 /*break*/, 429];
                                case 429:
                                    if (!(nodeSelected.type === "scheduleAppointment")) return [3 /*break*/, 448];
                                    console.log("=== PROCESSANDO N\u00D3 scheduleAppointment ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 431];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId },
                                            include: [{ model: Contact_1["default"], as: "contact" }]
                                        })];
                                case 430:
                                    ticket_1 = _52.sent();
                                    _52.label = 431;
                                case 431:
                                    if (!ticket_1) {
                                        console.error("scheduleAppointment: Ticket não encontrado");
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 432;
                                case 432:
                                    _52.trys.push([432, 446, , 448]);
                                    ScheduleAppointmentService = require("../ScheduleServices/ScheduleAppointmentService")["default"];
                                    scheduleVariable = nodeSelected.data.scheduleVariable || "";
                                    dateVariable = nodeSelected.data.dateVariable || "";
                                    timeVariable = nodeSelected.data.timeVariable || "";
                                    titleText = nodeSelected.data.titleText || "Agendamento";
                                    descriptionText = nodeSelected.data.descriptionText || "";
                                    durationMinutes = nodeSelected.data.durationMinutes || 60;
                                    contactVariable = nodeSelected.data.contactVariable || (ticket_1.contact ? ticket_1.contact.id.toString() : "");
                                    successMessage = nodeSelected.data.successMessage || "✅ Agendamento confirmado!";
                                    unavailableMessage = nodeSelected.data.unavailableMessage || "❌ Horário indisponível.";
                                    errorMessage = nodeSelected.data.errorMessage || "Erro ao agendar.";
                                    replaceVariables = function (text) {
                                        var result = text;
                                        if (ticket_1.dataWebhook) {
                                            Object.keys(ticket_1.dataWebhook).forEach(function (key) {
                                                result = result.replace(new RegExp("\\{".concat(key, "\\}"), 'g'), ticket_1.dataWebhook[key]);
                                            });
                                        }
                                        if (ticket_1.contact) {
                                            result = result.replace(/\{contact_name\}/g, ticket_1.contact.name || "");
                                            result = result.replace(/\{contact_number\}/g, ticket_1.contact.number || "");
                                        }
                                        return result;
                                    };
                                    scheduleId = replaceVariables(scheduleVariable);
                                    date = replaceVariables(dateVariable);
                                    time = replaceVariables(timeVariable);
                                    title = replaceVariables(titleText);
                                    description = replaceVariables(descriptionText);
                                    contactId = replaceVariables(contactVariable);
                                    if (!(!scheduleId || !date || !time)) return [3 /*break*/, 434];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: errorMessage
                                        })];
                                case 433:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [2 /*return*/, "continue"];
                                case 434: return [4 /*yield*/, ScheduleAppointmentService({
                                        action: "check_schedule_availability",
                                        companyId: ticket_1.companyId,
                                        scheduleId: parseInt(scheduleId),
                                        date: date
                                    })];
                                case 435:
                                    availabilityResult = _52.sent();
                                    if (!!availabilityResult.success) return [3 /*break*/, 437];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: errorMessage
                                        })];
                                case 436:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [2 /*return*/, "continue"];
                                case 437:
                                    isAvailable = availabilityResult.data.availableSlots.includes(time);
                                    if (!!isAvailable) return [3 /*break*/, 440];
                                    availableSlots = availabilityResult.data.availableSlots.join("\n");
                                    if (!ticket_1.dataWebhook)
                                        ticket_1.dataWebhook = {};
                                    ticket_1.dataWebhook.available_slots = availableSlots;
                                    return [4 /*yield*/, ticket_1.save()];
                                case 438:
                                    _52.sent();
                                    message_2 = unavailableMessage.replace("{available_slots}", availableSlots);
                                    message_2 = replaceVariables(message_2);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message_2
                                        })];
                                case 439:
                                    _52.sent();
                                    unavailableConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                    if (unavailableConnection)
                                        execFn_1 = unavailableConnection.target;
                                    return [2 /*return*/, "continue"];
                                case 440: return [4 /*yield*/, ScheduleAppointmentService({
                                        action: "create_schedule_appointment",
                                        companyId: ticket_1.companyId,
                                        scheduleId: parseInt(scheduleId),
                                        date: date,
                                        startTime: time,
                                        durationMinutes: parseInt(durationMinutes.toString()),
                                        title: title,
                                        description: description,
                                        contactId: parseInt(contactId)
                                    })];
                                case 441:
                                    createResult = _52.sent();
                                    if (!!createResult.success) return [3 /*break*/, 443];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: errorMessage
                                        })];
                                case 442:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [2 /*return*/, "continue"];
                                case 443:
                                    // Salvar variáveis no ticket
                                    if (!ticket_1.dataWebhook)
                                        ticket_1.dataWebhook = {};
                                    ticket_1.dataWebhook.appointment_id = createResult.data.appointment.id;
                                    ticket_1.dataWebhook.appointment_date = date;
                                    ticket_1.dataWebhook.appointment_time = time;
                                    ticket_1.dataWebhook.professional_name = createResult.data.schedule.user;
                                    return [4 /*yield*/, ticket_1.save()];
                                case 444:
                                    _52.sent();
                                    message = replaceVariables(successMessage);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message
                                        })];
                                case 445:
                                    _52.sent();
                                    successConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "success"; });
                                    if (successConnection)
                                        execFn_1 = successConnection.target;
                                    return [3 /*break*/, 448];
                                case 446:
                                    error_30 = _52.sent();
                                    console.error("scheduleAppointment: Erro ao processar:", error_30);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: nodeSelected.data.errorMessage || "Erro ao agendar."
                                        })];
                                case 447:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [3 /*break*/, 448];
                                case 448:
                                    if (!(nodeSelected.type === "updateAppointment")) return [3 /*break*/, 457];
                                    console.log("=== PROCESSANDO N\u00D3 updateAppointment ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 450];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId }
                                        })];
                                case 449:
                                    ticket_1 = _52.sent();
                                    _52.label = 450;
                                case 450:
                                    if (!ticket_1) {
                                        console.error("updateAppointment: Ticket não encontrado");
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 451;
                                case 451:
                                    _52.trys.push([451, 455, , 457]);
                                    appointmentVariable = nodeSelected.data.appointmentVariable || "";
                                    newDateVariable = nodeSelected.data.newDateVariable || "";
                                    newTimeVariable = nodeSelected.data.newTimeVariable || "";
                                    successMessage = nodeSelected.data.successMessage || "✅ Agendamento atualizado!";
                                    errorMessage = nodeSelected.data.errorMessage || "Erro ao atualizar.";
                                    replaceVariables = function (text) {
                                        var result = text;
                                        if (ticket_1.dataWebhook) {
                                            Object.keys(ticket_1.dataWebhook).forEach(function (key) {
                                                result = result.replace(new RegExp("\\{".concat(key, "\\}"), 'g'), ticket_1.dataWebhook[key]);
                                            });
                                        }
                                        return result;
                                    };
                                    appointmentId = replaceVariables(appointmentVariable);
                                    newDate = newDateVariable ? replaceVariables(newDateVariable) : null;
                                    newTime = newTimeVariable ? replaceVariables(newTimeVariable) : null;
                                    if (!!appointmentId) return [3 /*break*/, 453];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: errorMessage
                                        })];
                                case 452:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [2 /*return*/, "continue"];
                                case 453:
                                    message = replaceVariables(successMessage);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message
                                        })];
                                case 454:
                                    _52.sent();
                                    successConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "success"; });
                                    if (successConnection)
                                        execFn_1 = successConnection.target;
                                    return [3 /*break*/, 457];
                                case 455:
                                    error_31 = _52.sent();
                                    console.error("updateAppointment: Erro ao processar:", error_31);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: nodeSelected.data.errorMessage || "Erro ao atualizar."
                                        })];
                                case 456:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [3 /*break*/, 457];
                                case 457:
                                    if (!(nodeSelected.type === "cancelAppointment")) return [3 /*break*/, 469];
                                    console.log("=== PROCESSANDO N\u00D3 cancelAppointment ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 459];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId }
                                        })];
                                case 458:
                                    ticket_1 = _52.sent();
                                    _52.label = 459;
                                case 459:
                                    if (!ticket_1) {
                                        console.error("cancelAppointment: Ticket não encontrado");
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 460;
                                case 460:
                                    _52.trys.push([460, 466, , 469]);
                                    appointmentVariable = nodeSelected.data.appointmentVariable || "";
                                    reasonVariable = nodeSelected.data.reasonVariable || "";
                                    showMessage = nodeSelected.data.showMessage !== undefined ? nodeSelected.data.showMessage : true;
                                    successMessage = nodeSelected.data.successMessage || "✅ Agendamento cancelado.";
                                    errorMessage = nodeSelected.data.errorMessage || "❌ Erro ao cancelar.";
                                    replaceVariables = function (text) {
                                        var result = text;
                                        if (ticket_1.dataWebhook) {
                                            Object.keys(ticket_1.dataWebhook).forEach(function (key) {
                                                result = result.replace(new RegExp("\\{".concat(key, "\\}"), 'g'), ticket_1.dataWebhook[key]);
                                            });
                                        }
                                        return result;
                                    };
                                    appointmentId = replaceVariables(appointmentVariable);
                                    reason = reasonVariable ? replaceVariables(reasonVariable) : "Cancelado pelo cliente";
                                    if (!!appointmentId) return [3 /*break*/, 463];
                                    if (!showMessage) return [3 /*break*/, 462];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: errorMessage
                                        })];
                                case 461:
                                    _52.sent();
                                    _52.label = 462;
                                case 462:
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [2 /*return*/, "continue"];
                                case 463:
                                    if (!showMessage) return [3 /*break*/, 465];
                                    message = replaceVariables(successMessage);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: message
                                        })];
                                case 464:
                                    _52.sent();
                                    _52.label = 465;
                                case 465:
                                    successConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "success"; });
                                    if (successConnection)
                                        execFn_1 = successConnection.target;
                                    return [3 /*break*/, 469];
                                case 466:
                                    error_32 = _52.sent();
                                    console.error("cancelAppointment: Erro ao processar:", error_32);
                                    if (!nodeSelected.data.showMessage) return [3 /*break*/, 468];
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: nodeSelected.data.errorMessage || "❌ Erro ao cancelar."
                                        })];
                                case 467:
                                    _52.sent();
                                    _52.label = 468;
                                case 468:
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "error"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [3 /*break*/, 469];
                                case 469:
                                    if (!(nodeSelected.type === "fetchLastAppointment")) return [3 /*break*/, 479];
                                    console.log("=== PROCESSANDO N\u00D3 fetchLastAppointment ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 471];
                                    return [4 /*yield*/, Ticket_1["default"].findByPk(idTicket, {
                                            include: [{ model: Contact_1["default"], as: "contact" }]
                                        })];
                                case 470:
                                    ticket_1 = _52.sent();
                                    _52.label = 471;
                                case 471:
                                    if (!ticket_1 || !ticket_1.contact) {
                                        console.error("fetchLastAppointment: Ticket ou contato não encontrado");
                                        connection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id; });
                                        if (connection)
                                            execFn_1 = connection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 472;
                                case 472:
                                    _52.trys.push([472, 478, , 479]);
                                    identifierVariable = nodeSelected.data.identifierVariable || "";
                                    console.log("fetchLastAppointment: identifierVariable =", identifierVariable);
                                    console.log("fetchLastAppointment: ticket.dataWebhook =", ticket_1.dataWebhook);
                                    replaceVariables = function (text) {
                                        var result = text;
                                        if (ticket_1.dataWebhook) {
                                            // Primeiro, busca nas chaves diretas de dataWebhook
                                            Object.keys(ticket_1.dataWebhook).forEach(function (key) {
                                                if (key !== 'variables' && typeof ticket_1.dataWebhook[key] !== 'object') {
                                                    result = result.replace(new RegExp("\\{\\{".concat(key, "\\}\\}"), 'g'), ticket_1.dataWebhook[key]);
                                                }
                                            });
                                            // Depois, busca dentro de dataWebhook.variables
                                            if (ticket_1.dataWebhook.variables) {
                                                Object.keys(ticket_1.dataWebhook.variables).forEach(function (key) {
                                                    result = result.replace(new RegExp("\\{\\{".concat(key, "\\}\\}"), 'g'), ticket_1.dataWebhook.variables[key]);
                                                });
                                            }
                                        }
                                        return result;
                                    };
                                    identifier = replaceVariables(identifierVariable);
                                    console.log("fetchLastAppointment: identifier =", identifier);
                                    if (!identifier) {
                                        console.error("fetchLastAppointment: Identificador vazio");
                                        return [2 /*return*/, "continue"];
                                    }
                                    QueryTypes = require('sequelize').QueryTypes;
                                    sequelize = ticket_1.sequelize;
                                    query = "\n            SELECT \n              c.id,\n              c.title,\n              c.description,\n              c.start_datetime,\n              c.duration_minutes,\n              c.status,\n              a.name as agenda_nome,\n              s.nome as servico_nome,\n              cl.name as cliente_nome,\n              cl.email as cliente_email,\n              cl.document as cliente_documento\n            FROM \"appointments\" c\n            LEFT JOIN \"user_schedules\" a ON c.schedule_id = a.id\n            LEFT JOIN \"servicos\" s ON c.service_id = s.id\n            LEFT JOIN \"crm_clients\" cl ON c.client_id = cl.id\n            WHERE (cl.email = :identifier OR cl.document = :identifier)\n            ORDER BY c.start_datetime DESC\n            LIMIT 1\n          ";
                                    console.log("fetchLastAppointment: Executando query com identifier:", identifier);
                                    return [4 /*yield*/, sequelize.query(query, {
                                            replacements: { identifier: identifier },
                                            type: QueryTypes.SELECT
                                        })];
                                case 473:
                                    appointments = _52.sent();
                                    console.log("fetchLastAppointment: Resultados da query:", appointments);
                                    if (!(appointments && appointments.length > 0)) return [3 /*break*/, 476];
                                    appointment = appointments[0];
                                    // Salvar variáveis no ticket.dataWebhook.variables
                                    if (!ticket_1.dataWebhook) {
                                        ticket_1.dataWebhook = {};
                                    }
                                    if (!ticket_1.dataWebhook.variables) {
                                        ticket_1.dataWebhook.variables = {};
                                    }
                                    startDate = new Date(appointment.start_datetime);
                                    endDate = new Date(startDate.getTime() + (appointment.duration_minutes || 0) * 60000);
                                    formatDateTime = function (date) {
                                        var day = String(date.getDate()).padStart(2, '0');
                                        var month = String(date.getMonth() + 1).padStart(2, '0');
                                        var year = String(date.getFullYear()).slice(-2);
                                        var hours = String(date.getHours()).padStart(2, '0');
                                        var minutes = String(date.getMinutes()).padStart(2, '0');
                                        return "".concat(day, "/").concat(month, "/").concat(year, " \u00E0s ").concat(hours, ":").concat(minutes);
                                    };
                                    formatTime = function (date) {
                                        var hours = String(date.getHours()).padStart(2, '0');
                                        var minutes = String(date.getMinutes()).padStart(2, '0');
                                        return "".concat(hours, ":").concat(minutes);
                                    };
                                    // Criar todas as variáveis automaticamente dentro de variables
                                    ticket_1.dataWebhook.variables.ultimo_titulo = appointment.title || '';
                                    ticket_1.dataWebhook.variables.ultimo_descricao = appointment.description || '';
                                    ticket_1.dataWebhook.variables.ultimo_data_inicio = formatDateTime(startDate);
                                    ticket_1.dataWebhook.variables.ultimo_data_fim = formatTime(endDate);
                                    ticket_1.dataWebhook.variables.ultimo_duracao = appointment.duration_minutes || '';
                                    ticket_1.dataWebhook.variables.ultimo_status = appointment.status || '';
                                    ticket_1.dataWebhook.variables.ultimo_agenda = appointment.agenda_nome || '';
                                    ticket_1.dataWebhook.variables.ultimo_servico = appointment.servico_nome || '';
                                    ticket_1.dataWebhook.variables.ultimo_cliente_nome = appointment.cliente_nome || '';
                                    ticket_1.dataWebhook.variables.ultimo_cliente_email = appointment.cliente_email || '';
                                    ticket_1.dataWebhook.variables.ultimo_cliente_doc = appointment.cliente_documento || '';
                                    // Marcar o campo como alterado para o Sequelize detectar a mudança
                                    ticket_1.changed('dataWebhook', true);
                                    return [4 /*yield*/, ticket_1.save()];
                                case 474:
                                    _52.sent();
                                    return [4 /*yield*/, ticket_1.reload()];
                                case 475:
                                    _52.sent();
                                    console.log("fetchLastAppointment: Variáveis criadas automaticamente:", ticket_1.dataWebhook);
                                    return [3 /*break*/, 477];
                                case 476:
                                    console.log("fetchLastAppointment: Nenhum agendamento encontrado");
                                    _52.label = 477;
                                case 477:
                                    connection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id; });
                                    if (connection)
                                        execFn_1 = connection.target;
                                    return [3 /*break*/, 479];
                                case 478:
                                    error_33 = _52.sent();
                                    console.error("fetchLastAppointment: Erro ao processar:", error_33);
                                    connection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id; });
                                    if (connection)
                                        execFn_1 = connection.target;
                                    return [3 /*break*/, 479];
                                case 479:
                                    if (!(nodeSelected.type === "smartAppointment")) return [3 /*break*/, 492];
                                    console.log("=== PROCESSANDO N\u00D3 smartAppointment ===");
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 481];
                                    return [4 /*yield*/, Ticket_1["default"].findByPk(idTicket, {
                                            include: [{ model: Contact_1["default"], as: "contact" }]
                                        })];
                                case 480:
                                    ticket_1 = _52.sent();
                                    _52.label = 481;
                                case 481:
                                    if (!ticket_1 || !ticket_1.contact) {
                                        console.error("smartAppointment: Ticket ou contato não encontrado");
                                        unavailableConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                        if (unavailableConnection)
                                            execFn_1 = unavailableConnection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    _52.label = 482;
                                case 482:
                                    _52.trys.push([482, 490, , 492]);
                                    appointmentTitle = nodeSelected.data.appointmentTitle || "";
                                    description = nodeSelected.data.description || "";
                                    scheduleId = nodeSelected.data.scheduleId;
                                    serviceId = nodeSelected.data.serviceId;
                                    identifierVariable = nodeSelected.data.identifierVariable || "";
                                    dateVariable = nodeSelected.data.dateVariable || "";
                                    timeVariable = nodeSelected.data.timeVariable || "";
                                    status_1 = nodeSelected.data.status || "scheduled";
                                    replaceVariables = function (text) {
                                        var result = text;
                                        if (ticket_1.dataWebhook) {
                                            // Substituir variáveis diretas do dataWebhook
                                            Object.keys(ticket_1.dataWebhook).forEach(function (key) {
                                                if (key !== 'variables' && typeof ticket_1.dataWebhook[key] !== 'object') {
                                                    result = result.replace(new RegExp("\\{\\{".concat(key, "\\}\\}"), 'g'), ticket_1.dataWebhook[key]);
                                                }
                                            });
                                            // Substituir variáveis dentro de dataWebhook.variables
                                            if (ticket_1.dataWebhook.variables) {
                                                Object.keys(ticket_1.dataWebhook.variables).forEach(function (key) {
                                                    var cleanKey = key.replace(/\{\{|\}\}/g, ''); // Remove {{ }} se existir
                                                    result = result.replace(new RegExp("\\{\\{".concat(cleanKey, "\\}\\}"), 'g'), ticket_1.dataWebhook.variables[key]);
                                                });
                                            }
                                        }
                                        return result;
                                    };
                                    titulo = replaceVariables(appointmentTitle);
                                    descricao = replaceVariables(description);
                                    identifier = replaceVariables(identifierVariable);
                                    dataStr = replaceVariables(dateVariable);
                                    horaStr = replaceVariables(timeVariable);
                                    if (!scheduleId || !serviceId || !identifier || !dataStr || !horaStr) {
                                        console.error("smartAppointment: Campos obrigatórios faltando");
                                        errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                        if (errorConnection)
                                            execFn_1 = errorConnection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    QueryTypes = require('sequelize').QueryTypes;
                                    sequelize = ticket_1.sequelize;
                                    serviceQuery = "SELECT \"tempoAtendimento\" as duration FROM \"servicos\" WHERE id = :serviceId LIMIT 1";
                                    return [4 /*yield*/, sequelize.query(serviceQuery, {
                                            replacements: { serviceId: serviceId },
                                            type: QueryTypes.SELECT
                                        })];
                                case 483:
                                    services = _52.sent();
                                    if (!services || services.length === 0) {
                                        console.error("smartAppointment: Serviço não encontrado");
                                        errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                        if (errorConnection)
                                            execFn_1 = errorConnection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    duracao = services[0].duration || 60;
                                    dataParts = dataStr.split('/');
                                    dia = void 0, mes = void 0, ano = void 0;
                                    if (dataParts.length === 2) {
                                        // Formato DD/MM - adiciona ano atual
                                        dia = dataParts[0];
                                        mes = dataParts[1];
                                        ano = new Date().getFullYear().toString();
                                    }
                                    else if (dataParts.length === 3) {
                                        // Formato DD/MM/AAAA
                                        dia = dataParts[0];
                                        mes = dataParts[1];
                                        ano = dataParts[2];
                                    }
                                    else {
                                        console.error("smartAppointment: Formato de data inválido:", dataStr);
                                        errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                        if (errorConnection)
                                            execFn_1 = errorConnection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    _48 = horaStr.split(':'), hora = _48[0], minuto = _48[1];
                                    dataInicio = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto));
                                    dataFim = new Date(dataInicio.getTime() + duracao * 60000);
                                    agora = new Date();
                                    if (dataInicio < agora) {
                                        console.error("smartAppointment: Data no passado");
                                        errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                        if (errorConnection)
                                            execFn_1 = errorConnection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    userQuery = "\n            SELECT u.\"startWork\", u.\"endWork\", u.\"workDays\", u.\"lunchStart\", u.\"lunchEnd\"\n            FROM \"Users\" u\n            INNER JOIN user_schedules us ON us.user_id = u.id\n            WHERE us.id = :scheduleId\n            LIMIT 1\n          ";
                                    return [4 /*yield*/, sequelize.query(userQuery, {
                                            replacements: { scheduleId: scheduleId },
                                            type: QueryTypes.SELECT
                                        })];
                                case 484:
                                    userSchedule = _52.sent();
                                    if (userSchedule && userSchedule.length > 0) {
                                        _49 = userSchedule[0], startWork = _49.startWork, endWork = _49.endWork, workDays = _49.workDays, lunchStart = _49.lunchStart, lunchEnd = _49.lunchEnd;
                                        diaSemana = dataInicio.getDay();
                                        diasTrabalho = workDays ? workDays.split(',').map(function (d) { return parseInt(d); }) : [1, 2, 3, 4, 5];
                                        if (!diasTrabalho.includes(diaSemana)) {
                                            console.error("smartAppointment: Funcionário não trabalha neste dia");
                                            errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                            if (errorConnection)
                                                execFn_1 = errorConnection.target;
                                            return [2 /*return*/, "continue"];
                                        }
                                        startTime = dataInicio.toTimeString().substring(0, 5);
                                        endTime = dataFim.toTimeString().substring(0, 5);
                                        if (startWork && endWork) {
                                            if (startTime < startWork || endTime > endWork) {
                                                console.error("smartAppointment: Horário fora do expediente");
                                                errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                                if (errorConnection)
                                                    execFn_1 = errorConnection.target;
                                                return [2 /*return*/, "continue"];
                                            }
                                        }
                                        // Validar horário de almoço
                                        if (lunchStart && lunchEnd) {
                                            lunchStartMinutes = parseInt(lunchStart.split(":")[0], 10) * 60 + parseInt(lunchStart.split(":")[1], 10);
                                            lunchEndMinutes = parseInt(lunchEnd.split(":")[0], 10) * 60 + parseInt(lunchEnd.split(":")[1], 10);
                                            appointmentStartMinutes = dataInicio.getHours() * 60 + dataInicio.getMinutes();
                                            appointmentEndMinutes = dataFim.getHours() * 60 + dataFim.getMinutes();
                                            overlapsLunch = ((appointmentStartMinutes >= lunchStartMinutes && appointmentStartMinutes < lunchEndMinutes) ||
                                                (appointmentEndMinutes > lunchStartMinutes && appointmentEndMinutes <= lunchEndMinutes) ||
                                                (appointmentStartMinutes <= lunchStartMinutes && appointmentEndMinutes >= lunchEndMinutes));
                                            if (overlapsLunch) {
                                                console.error("smartAppointment: Horário de almoço");
                                                errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                                if (errorConnection)
                                                    execFn_1 = errorConnection.target;
                                                return [2 /*return*/, "continue"];
                                            }
                                        }
                                    }
                                    existingAppointmentsQuery = "\n            SELECT id, title, start_datetime, duration_minutes\n            FROM \"appointments\" \n            WHERE schedule_id = :scheduleId \n            AND status NOT IN ('cancelled', 'no_show')\n          ";
                                    return [4 /*yield*/, sequelize.query(existingAppointmentsQuery, {
                                            replacements: { scheduleId: scheduleId },
                                            type: QueryTypes.SELECT
                                        })];
                                case 485:
                                    existingAppointments = _52.sent();
                                    newStart = dataInicio.getTime();
                                    newEnd = dataFim.getTime();
                                    hasConflict = false;
                                    for (_50 = 0, existingAppointments_1 = existingAppointments; _50 < existingAppointments_1.length; _50++) {
                                        existing = existingAppointments_1[_50];
                                        existingStart = new Date(existing.start_datetime).getTime();
                                        existingEnd = existingStart + existing.duration_minutes * 60000;
                                        // Verificar sobreposição de horários
                                        if ((newStart >= existingStart && newStart < existingEnd) ||
                                            (newEnd > existingStart && newEnd <= existingEnd) ||
                                            (newStart <= existingStart && newEnd >= existingEnd)) {
                                            console.log("smartAppointment: Conflito com agendamento existente:", existing.title);
                                            hasConflict = true;
                                            break;
                                        }
                                    }
                                    if (hasConflict) {
                                        console.error("smartAppointment: Conflito de horário");
                                        unavailableConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                        if (unavailableConnection)
                                            execFn_1 = unavailableConnection.target;
                                        return [2 /*return*/, "continue"];
                                    }
                                    clientId = null;
                                    clientQuery = "\n            SELECT id FROM \"crm_clients\" \n            WHERE email = :identifier OR document = :identifier \n            LIMIT 1\n          ";
                                    return [4 /*yield*/, sequelize.query(clientQuery, {
                                            replacements: { identifier: identifier },
                                            type: QueryTypes.SELECT
                                        })];
                                case 486:
                                    clients = _52.sent();
                                    if (clients && clients.length > 0) {
                                        clientId = clients[0].id;
                                    }
                                    insertQuery = "\n            INSERT INTO \"appointments\" \n            (title, description, schedule_id, service_id, client_id, contact_id, start_datetime, duration_minutes, status, company_id, created_at, updated_at)\n            VALUES \n            (:title, :description, :scheduleId, :serviceId, :clientId, :contactId, :startDatetime, :durationMinutes, :status, :companyId, NOW(), NOW())\n            RETURNING id\n          ";
                                    console.log("smartAppointment: Criando agendamento com status:", status_1);
                                    return [4 /*yield*/, sequelize.query(insertQuery, {
                                            replacements: {
                                                title: titulo,
                                                description: descricao,
                                                scheduleId: scheduleId,
                                                serviceId: serviceId,
                                                clientId: clientId,
                                                contactId: ticket_1.contact.id,
                                                startDatetime: dataInicio.toISOString(),
                                                durationMinutes: duracao,
                                                status: status_1,
                                                companyId: ticket_1.companyId
                                            },
                                            type: QueryTypes.INSERT
                                        })];
                                case 487:
                                    result = _52.sent();
                                    appointmentId = result[0][0].id;
                                    console.log("smartAppointment: Agendamento criado com ID:", appointmentId);
                                    // Salvar ID do agendamento em variáveis
                                    if (!ticket_1.dataWebhook) {
                                        ticket_1.dataWebhook = {};
                                    }
                                    ticket_1.dataWebhook.appointment_id = appointmentId;
                                    ticket_1.dataWebhook.appointment_status = status_1;
                                    return [4 /*yield*/, ticket_1.save()];
                                case 488:
                                    _52.sent();
                                    console.log("smartAppointment: Agendamento criado com sucesso:", appointmentId);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "\u2705 Agendamento confirmado!\n\n\uD83D\uDCC5 ".concat(titulo, "\n\uD83D\uDD50 ").concat(dataStr, " \u00E0s ").concat(horaStr, "\n\u23F1\uFE0F Dura\u00E7\u00E3o: ").concat(duracao, " minutos")
                                        })];
                                case 489:
                                    _52.sent();
                                    successConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "success"; });
                                    if (successConnection)
                                        execFn_1 = successConnection.target;
                                    return [3 /*break*/, 492];
                                case 490:
                                    error_34 = _52.sent();
                                    console.error("smartAppointment: Erro ao processar:", error_34);
                                    return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp_1, {
                                            number: numberClient_1,
                                            body: "❌ Erro ao criar agendamento. Tente novamente."
                                        })];
                                case 491:
                                    _52.sent();
                                    errorConnection = connectStatic.find(function (conn) { return conn.source === nodeSelected.id && conn.sourceHandle === "unavailable"; });
                                    if (errorConnection)
                                        execFn_1 = errorConnection.target;
                                    return [3 /*break*/, 492];
                                case 492:
                                    isMenu = void 0;
                                    if (!(nodeSelected.type === "menu")) return [3 /*break*/, 501];
                                    if (!(!ticket_1 && idTicket)) return [3 /*break*/, 494];
                                    console.log("Menu (segundo bloco): Carregando ticket...");
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, companyId: companyId }
                                        })];
                                case 493:
                                    ticket_1 = _52.sent();
                                    console.log("Menu (segundo bloco): Ticket carregado:", ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.id);
                                    _52.label = 494;
                                case 494:
                                    console.log(650, "menu");
                                    if (pressKey) {
                                        filterOne = connectStatic.filter(function (confil) { return confil.source === next_1; });
                                        filterTwo = filterOne.filter(function (filt2) { return filt2.sourceHandle === "a" + pressKey; });
                                        if (filterTwo.length > 0) {
                                            execFn_1 = filterTwo[0].target;
                                        }
                                        else {
                                            execFn_1 = undefined;
                                        }
                                        // execFn =
                                        //   connectStatic
                                        //     .filter(confil => confil.source === next)
                                        //     .filter(filt2 => filt2.sourceHandle === "a" + pressKey)[0]?.target ??
                                        //   undefined;
                                        if (execFn_1 === undefined) {
                                            return [2 /*return*/, "break"];
                                        }
                                        pressKey = "999";
                                        isNodeExist = nodes.filter(function (item) { return item.id === execFn_1; });
                                        console.log(674, "menu");
                                        if (isNodeExist.length > 0) {
                                            isMenu = isNodeExist[0].type === "menu" ? true : false;
                                        }
                                        else {
                                            isMenu = false;
                                        }
                                    }
                                    else {
                                        console.log(681, "menu - não há pressKey, menu já enviado pelo primeiro bloco");
                                        // O menu já foi enviado pelo primeiro bloco (linha 470), não duplicar aqui
                                        // Definir isMenu para manter consistência
                                        isMenu = true;
                                    }
                                    if (!ticket_1) return [3 /*break*/, 496];
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: {
                                                id: ticket_1.id,
                                                whatsappId: whatsappId,
                                                companyId: companyId
                                            }
                                        })];
                                case 495:
                                    ticket_1 = _52.sent();
                                    return [3 /*break*/, 498];
                                case 496: return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: {
                                            id: idTicket,
                                            whatsappId: whatsappId,
                                            companyId: companyId
                                        }
                                    })];
                                case 497:
                                    ticket_1 = _52.sent();
                                    _52.label = 498;
                                case 498:
                                    if (!ticket_1) return [3 /*break*/, 500];
                                    return [4 /*yield*/, ticket_1.update({
                                            queueId: ticket_1.queueId ? ticket_1.queueId : null,
                                            userId: null,
                                            companyId: companyId,
                                            flowWebhook: true,
                                            lastFlowId: nodeSelected.type === "directOpenai" ? ticket_1.lastFlowId : nodeSelected.id,
                                            dataWebhook: dataWebhook,
                                            hashFlowId: hashWebhookId,
                                            flowStopped: idFlowDb.toString()
                                        })];
                                case 499:
                                    _52.sent();
                                    console.log("Menu: Ticket atualizado com lastFlowId=".concat(nodeSelected.id, " para aguardar resposta"));
                                    _52.label = 500;
                                case 500: return [2 /*return*/, "break"];
                                case 501:
                                    if (pressKey === "999" && execCount > 0) {
                                        console.log(587, "ActionsWebhookService | 587");
                                        pressKey = undefined;
                                        result = connects.filter(function (connect) { return connect.source === execFn_1; })[0];
                                        if (typeof result === "undefined") {
                                            next_1 = "";
                                        }
                                        else {
                                            if (!noAlterNext) {
                                                next_1 = result.target;
                                            }
                                        }
                                    }
                                    else {
                                        result = void 0;
                                        if (isMenu) {
                                            result = { target: execFn_1 };
                                            isContinue = true;
                                            pressKey = undefined;
                                        }
                                        else if (isRandomizer) {
                                            isRandomizer = false;
                                            result = next_1;
                                        }
                                        else if (isCondition) {
                                            isCondition = false;
                                            result = next_1;
                                        }
                                        else {
                                            result = connects.filter(function (connect) { return connect.source === next_1; })[0];
                                        }
                                        if (typeof result === "undefined") {
                                            next_1 = "";
                                        }
                                        else {
                                            if (!noAlterNext) {
                                                next_1 = result.target;
                                            }
                                        }
                                        console.log(619, "ActionsWebhookService");
                                    }
                                    if (!(!pressKey && !isContinue && next_1 !== "")) return [3 /*break*/, 504];
                                    console.log("=== ENTRANDO NO BLOCO PROBLEM\u00C1TICO - pressKey=".concat(pressKey, ", isContinue=").concat(isContinue, ", isKeywordCondition=").concat(isKeywordCondition, " ==="));
                                    console.log("=== next antes do bloco: ".concat(next_1, " ==="));
                                    nextNodeConnection = connects.find(function (connect) { return connect.source === nodeSelected.id; });
                                    console.log("=== nextNodeConnection encontrado: ".concat((nextNodeConnection === null || nextNodeConnection === void 0 ? void 0 : nextNodeConnection.target) || 'null', " ==="));
                                    console.log(626, "ActionsWebhookService");
                                    if (!!nextNodeConnection) return [3 /*break*/, 504];
                                    console.log(654, "ActionsWebhookService - Sem próximo nó, finalizando fluxo");
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId, companyId: companyId }
                                        })];
                                case 502:
                                    _52.sent();
                                    return [4 /*yield*/, ticket_1.update({
                                            lastFlowId: nodeSelected.type === "directOpenai" ? ticket_1.lastFlowId : nodeSelected.id,
                                            hashFlowId: null,
                                            flowWebhook: false,
                                            flowStopped: idFlowDb.toString()
                                        })];
                                case 503:
                                    _52.sent();
                                    return [2 /*return*/, "break"];
                                case 504:
                                    isContinue = false;
                                    if (next_1 === "") {
                                        return [2 /*return*/, "break"];
                                    }
                                    console.log(678, "ActionsWebhookService");
                                    console.log("UPDATE10...");
                                    return [4 /*yield*/, Ticket_1["default"].findOne({
                                            where: { id: idTicket, whatsappId: whatsappId, companyId: companyId }
                                        })];
                                case 505:
                                    ticket_1 = _52.sent();
                                    if (ticket_1.status === "closed") {
                                        io.of(String(companyId))
                                            // .to(oldStatus)
                                            // .to(ticketId.toString())
                                            .emit("company-".concat(ticket_1.companyId, "-ticket"), {
                                            action: "delete",
                                            ticketId: ticket_1.id
                                        });
                                    }
                                    console.log("UPDATE12...");
                                    hasNextNodes = connects.filter(function (connect) { return connect.source === nodeSelected.id; }).length >
                                        0;
                                    console.log("Conexões para nó atual:", hasNextNodes ? "SIM" : "NÃO");
                                    console.log("Próximo nó:", next_1);
                                    updateData = {
                                        whatsappId: whatsappId,
                                        queueId: ticket_1 === null || ticket_1 === void 0 ? void 0 : ticket_1.queueId,
                                        userId: null,
                                        companyId: companyId,
                                        flowWebhook: true,
                                        hashFlowId: hashWebhookId,
                                        flowStopped: idFlowDb.toString()
                                    };
                                    // Só atualizar lastFlowId se não for nó directOpenai (deve continuar no mesmo nó)
                                    if (nodeSelected.type !== "directOpenai") {
                                        updateData.lastFlowId = nodeSelected.id;
                                    }
                                    return [4 /*yield*/, ticket_1.update(updateData)];
                                case 506:
                                    _52.sent();
                                    if (!hasNextNodes) {
                                        console.log("Finalizando fluxo no nó", nodeSelected.type, "sem próximos nós");
                                    }
                                    noAlterNext = false;
                                    execCount++;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _39.label = 4;
                case 4:
                    if (!(i < lengthLoop)) return [3 /*break*/, 7];
                    return [5 /*yield**/, _loop_1()];
                case 5:
                    state_1 = _39.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    if (state_1 === "break")
                        return [3 /*break*/, 7];
                    _39.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [2 /*return*/, "ds"];
                case 8:
                    error_1 = _39.sent();
                    logger_1["default"].error(error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.ActionsWebhookService = ActionsWebhookService;
var constructJsonLine = function (line, json) {
    var valor = json;
    var chaves = line.split(".");
    if (chaves.length === 1) {
        return valor[chaves[0]];
    }
    for (var _i = 0, chaves_1 = chaves; _i < chaves_1.length; _i++) {
        var chave = chaves_1[_i];
        valor = valor[chave];
    }
    return valor;
};
function removerNaoLetrasNumeros(texto) {
    // Substitui todos os caracteres que não são letras ou números por vazio
    return texto.replace(/[^a-zA-Z0-9]/g, "");
}
var sendMessageWhats = function (whatsId, msg, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, MessageController_1.sendMessageFlow)(whatsId, msg, req);
        return [2 /*return*/, Promise.resolve()];
    });
}); };
var intervalWhats = function (time) {
    var seconds = parseInt(time) * 1000;
    return new Promise(function (resolve) { return setTimeout(resolve, seconds); });
};
var replaceMessages = function (variables, message) {
    return message.replace(/{{\s*([^{}\s]+)\s*}}/g, function (match, key) { return variables[key] || ""; });
};
var replaceMessagesOld = function (message, details, dataWebhook, dataNoWebhook) {
    var matches = message.match(/\{([^}]+)\}/g);
    if (dataWebhook) {
        var newTxt = message.replace(/{+nome}+/, dataNoWebhook.nome);
        newTxt = newTxt.replace(/{+numero}+/, dataNoWebhook.numero);
        newTxt = newTxt.replace(/{+email}+/, dataNoWebhook.email);
        return newTxt;
    }
    if (matches && matches.includes("inputs")) {
        var placeholders = matches.map(function (match) { return match.replace(/\{|\}/g, ""); });
        var newText_1 = message;
        placeholders.map(function (item) {
            var value = details["inputs"].find(function (itemLocal) { return itemLocal.keyValue === item; });
            var lineToData = details["keysFull"].find(function (itemLocal) {
                return itemLocal.endsWith(".".concat(value.data));
            });
            var createFieldJson = constructJsonLine(lineToData, dataWebhook);
            newText_1 = newText_1.replace("{".concat(item, "}"), createFieldJson);
        });
        return newText_1;
    }
    else {
        return message;
    }
};
