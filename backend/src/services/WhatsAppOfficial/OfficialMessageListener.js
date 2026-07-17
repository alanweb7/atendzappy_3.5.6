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
exports.OfficialMessageListener = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var axios_1 = __importDefault(require("axios"));
var uuid_1 = require("uuid");
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var CreateOrUpdateTicketService_1 = __importDefault(require("../../HubEcosystem/services/CreateOrUpdateTicketService"));
var FindOrCreateContactService_1 = __importDefault(require("../../HubEcosystem/services/FindOrCreateContactService"));
var graphApiHelper_1 = require("../WhatsappCoexistence/graphApiHelper");
var FlowBuilder_1 = require("../../models/FlowBuilder");
var ActionsWebhookService_1 = require("../WebhookService/ActionsWebhookService");
var Message_1 = __importDefault(require("../../models/Message"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var User_1 = __importDefault(require("../../models/User"));
var socket_1 = require("../../libs/socket");
// Busca a URL real do arquivo na Graph API e faz o download para disco
var downloadOfficialMedia = function (mediaId, token, companyId, mimeType) { return __awaiter(void 0, void 0, void 0, function () {
    var client, metaRes, _a, url, mime_type, resolvedMime, ext, filename, destDir, destPath_1, fileRes_1, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                client = (0, graphApiHelper_1.buildGraphClient)(token);
                // Passo 1: obter URL de download
                console.log("[OfficialMessageListener][download] Buscando URL para mediaId=".concat(mediaId, " companyId=").concat(companyId));
                return [4 /*yield*/, client.get(mediaId)];
            case 1:
                metaRes = _d.sent();
                _a = metaRes.data, url = _a.url, mime_type = _a.mime_type;
                resolvedMime = mimeType || mime_type || "application/octet-stream";
                console.log("[OfficialMessageListener][download] mime resolvido: ".concat(resolvedMime));
                ext = ((_c = (_b = resolvedMime.split("/")[1]) === null || _b === void 0 ? void 0 : _b.split(";")[0]) === null || _c === void 0 ? void 0 : _c.trim()) || "bin";
                filename = "".concat((0, uuid_1.v4)(), ".").concat(ext);
                destDir = path_1["default"].resolve(__dirname, "..", "..", "..", "public", "company".concat(companyId));
                destPath_1 = path_1["default"].join(destDir, filename);
                if (!fs_1["default"].existsSync(destDir)) {
                    fs_1["default"].mkdirSync(destDir, { recursive: true });
                    fs_1["default"].chmodSync(destDir, 511);
                }
                return [4 /*yield*/, axios_1["default"].get(url, {
                        responseType: "stream",
                        headers: { Authorization: "Bearer ".concat(token) }
                    })];
            case 2:
                fileRes_1 = _d.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var writer = fs_1["default"].createWriteStream(destPath_1);
                        fileRes_1.data.pipe(writer);
                        writer.on("finish", resolve);
                        writer.on("error", reject);
                    })];
            case 3:
                _d.sent();
                console.log("[OfficialMessageListener][download] Arquivo salvo: ".concat(destPath_1, " (").concat(filename, ")"));
                return [2 /*return*/, filename];
            case 4:
                error_1 = _d.sent();
                console.error("[OfficialMessageListener][download] ERRO ao baixar mídia:", (0, graphApiHelper_1.extractGraphError)(error_1), { mediaId: mediaId, companyId: companyId });
                return [2 /*return*/, null];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Dispara fluxo do FlowBuilder para canal oficial (igual ao wbotMessageListener)
var triggerOfficialFlow = function (_a) {
    var connection = _a.connection, ticket = _a.ticket, contact = _a.contact, msgBody = _a.msgBody, from = _a.from, wasReopened = _a.wasReopened;
    return __awaiter(void 0, void 0, void 0, function () {
        var fullConnection, fullTicket, mountDataContact, flow, nodes, connections, flowId, flow, nodes, connections, flow, nodes, connections, error_2;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 13, , 14]);
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(connection.id, {
                            attributes: ["id", "companyId", "flowIdWelcome", "flowIdNotPhrase"]
                        })];
                case 1:
                    fullConnection = _d.sent();
                    if (!fullConnection)
                        return [2 /*return*/];
                    return [4 /*yield*/, Ticket_1["default"].findByPk(ticket.id, {
                            attributes: ["id", "flowWebhook", "lastFlowId", "flowStopped", "dataWebhook", "companyId", "whatsappId"]
                        })];
                case 2:
                    fullTicket = _d.sent();
                    if (!fullTicket)
                        return [2 /*return*/];
                    mountDataContact = { number: from, name: contact.name || from, email: "" };
                    if (!(fullTicket.flowWebhook && fullTicket.lastFlowId && fullTicket.flowStopped)) return [3 /*break*/, 5];
                    if (!msgBody.trim()) {
                        console.log("[OfficialFlow] Mensagem vazia ignorada — aguardando resposta do usuário");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: fullTicket.flowStopped } })];
                case 3:
                    flow = _d.sent();
                    if (!flow) return [3 /*break*/, 5];
                    nodes = flow.flow["nodes"] || [];
                    connections = flow.flow["connections"] || [];
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(fullConnection.id, parseInt(String(fullTicket.flowStopped)), fullConnection.companyId, nodes, connections, fullTicket.lastFlowId, fullTicket.dataWebhook, "", "", msgBody, fullTicket.id, mountDataContact, null)];
                case 4:
                    _d.sent();
                    return [2 /*return*/];
                case 5:
                    if (!wasReopened) return [3 /*break*/, 9];
                    // Limpa estado do fluxo anterior para iniciar do zero
                    return [4 /*yield*/, fullTicket.update({ flowStopped: null, lastFlowId: null, flowWebhook: false, dataWebhook: null })];
                case 6:
                    // Limpa estado do fluxo anterior para iniciar do zero
                    _d.sent();
                    flowId = fullConnection.flowIdNotPhrase || fullConnection.flowIdWelcome;
                    if (!flowId) return [3 /*break*/, 9];
                    console.log("[OfficialFlow] Ticket reaberto \u2014 disparando fluxo ".concat(flowId, " (notPhrase=").concat(fullConnection.flowIdNotPhrase, ", welcome=").concat(fullConnection.flowIdWelcome, ")"));
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: flowId } })];
                case 7:
                    flow = _d.sent();
                    if (!flow) return [3 /*break*/, 9];
                    nodes = flow.flow["nodes"] || [];
                    connections = flow.flow["connections"] || [];
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(fullConnection.id, flowId, fullConnection.companyId, nodes, connections, ((_b = flow.flow["nodes"][0]) === null || _b === void 0 ? void 0 : _b.id) || "1", null, "", "", null, fullTicket.id, mountDataContact, null)];
                case 8:
                    _d.sent();
                    return [2 /*return*/];
                case 9:
                    if (!(!wasReopened && fullConnection.flowIdWelcome)) return [3 /*break*/, 12];
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({ where: { id: fullConnection.flowIdWelcome } })];
                case 10:
                    flow = _d.sent();
                    if (!flow) return [3 /*break*/, 12];
                    nodes = flow.flow["nodes"] || [];
                    connections = flow.flow["connections"] || [];
                    return [4 /*yield*/, (0, ActionsWebhookService_1.ActionsWebhookService)(fullConnection.id, fullConnection.flowIdWelcome, fullConnection.companyId, nodes, connections, ((_c = flow.flow["nodes"][0]) === null || _c === void 0 ? void 0 : _c.id) || "1", null, "", "", null, fullTicket.id, mountDataContact, null)];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    error_2 = _d.sent();
                    console.error("[OfficialMessageListener] Erro ao disparar fluxo:", error_2);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
};
var OfficialMessageListener = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, entryItem, changes, _b, changes_1, change, value, _c, _d, status_1, ackMap, ack, msg, io, err_1, connection, _loop_1, _e, _f, message;
    var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
    return __generator(this, function (_7) {
        switch (_7.label) {
            case 0:
                if (!body.entry || !Array.isArray(body.entry))
                    return [2 /*return*/];
                _i = 0, _a = body.entry;
                _7.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 16];
                entryItem = _a[_i];
                changes = entryItem.changes;
                if (!changes || !Array.isArray(changes))
                    return [3 /*break*/, 15];
                _b = 0, changes_1 = changes;
                _7.label = 2;
            case 2:
                if (!(_b < changes_1.length)) return [3 /*break*/, 15];
                change = changes_1[_b];
                if (change.field !== "messages")
                    return [3 /*break*/, 14];
                value = change.value;
                if (!(value.statuses && Array.isArray(value.statuses))) return [3 /*break*/, 9];
                _c = 0, _d = value.statuses;
                _7.label = 3;
            case 3:
                if (!(_c < _d.length)) return [3 /*break*/, 9];
                status_1 = _d[_c];
                _7.label = 4;
            case 4:
                _7.trys.push([4, 7, , 8]);
                ackMap = {
                    sent: 1,
                    delivered: 2,
                    read: 3,
                    failed: -1
                };
                ack = ackMap[status_1.status];
                if (ack === undefined)
                    return [3 /*break*/, 8];
                return [4 /*yield*/, Message_1["default"].findOne({ where: { wid: status_1.id } })];
            case 5:
                msg = _7.sent();
                if (!msg)
                    return [3 /*break*/, 8];
                return [4 /*yield*/, msg.update({ ack: ack })];
            case 6:
                _7.sent();
                io = (0, socket_1.getIO)();
                io.to("company-".concat(msg.companyId, "-mainchannel")).emit("company-".concat(msg.companyId, "-appMessage"), {
                    action: "update",
                    message: msg
                });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _7.sent();
                console.error("[OfficialMessageListener] Erro ao atualizar status:", err_1);
                return [3 /*break*/, 8];
            case 8:
                _c++;
                return [3 /*break*/, 3];
            case 9:
                if (!value.messages || !Array.isArray(value.messages))
                    return [3 /*break*/, 14];
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            coexistencePhoneNumberId: value.metadata.phone_number_id,
                            channel: "whatsapp_official"
                        }
                    })];
            case 10:
                connection = _7.sent();
                if (!connection) {
                    console.warn("[OfficialMessageListener] Conexão não encontrada para phone_number_id:", value.metadata.phone_number_id);
                    return [3 /*break*/, 14];
                }
                _loop_1 = function (message) {
                    var from, messageId, contactProfile, contactName, msgBody, mediaUrl, mediaType, _8, contact, existingTicket, wasReopened, ticket, quotedMsgId, quotedMsg, messageData, createdMessage, msgError_1, io, companyId, ticketWithAssoc, finalMessage, socketError_1, error_3;
                    return __generator(this, function (_9) {
                        switch (_9.label) {
                            case 0:
                                if (!message.from)
                                    return [2 /*return*/, "continue"];
                                from = message.from;
                                messageId = message.id;
                                contactProfile = (_g = value.contacts) === null || _g === void 0 ? void 0 : _g.find(function (c) { return c.wa_id === from; });
                                contactName = ((_h = contactProfile === null || contactProfile === void 0 ? void 0 : contactProfile.profile) === null || _h === void 0 ? void 0 : _h.name) || from;
                                msgBody = "";
                                mediaUrl = null;
                                mediaType = "";
                                _8 = message.type;
                                switch (_8) {
                                    case "text": return [3 /*break*/, 1];
                                    case "image": return [3 /*break*/, 2];
                                    case "video": return [3 /*break*/, 4];
                                    case "audio": return [3 /*break*/, 6];
                                    case "document": return [3 /*break*/, 8];
                                    case "interactive": return [3 /*break*/, 10];
                                    case "button": return [3 /*break*/, 11];
                                    case "sticker": return [3 /*break*/, 12];
                                    case "location": return [3 /*break*/, 14];
                                    case "reaction": return [3 /*break*/, 15];
                                }
                                return [3 /*break*/, 16];
                            case 1:
                                msgBody = ((_j = message.text) === null || _j === void 0 ? void 0 : _j.body) || "";
                                return [3 /*break*/, 17];
                            case 2:
                                msgBody = ((_k = message.image) === null || _k === void 0 ? void 0 : _k.caption) || "";
                                mediaType = "image";
                                return [4 /*yield*/, downloadOfficialMedia(message.image.id, connection.coexistencePermanentToken, connection.companyId, (_l = message.image) === null || _l === void 0 ? void 0 : _l.mime_type)];
                            case 3:
                                mediaUrl = _9.sent();
                                return [3 /*break*/, 17];
                            case 4:
                                msgBody = ((_m = message.video) === null || _m === void 0 ? void 0 : _m.caption) || "";
                                mediaType = "video";
                                return [4 /*yield*/, downloadOfficialMedia(message.video.id, connection.coexistencePermanentToken, connection.companyId, (_o = message.video) === null || _o === void 0 ? void 0 : _o.mime_type)];
                            case 5:
                                mediaUrl = _9.sent();
                                return [3 /*break*/, 17];
                            case 6:
                                mediaType = "audio";
                                return [4 /*yield*/, downloadOfficialMedia(message.audio.id, connection.coexistencePermanentToken, connection.companyId, (_p = message.audio) === null || _p === void 0 ? void 0 : _p.mime_type)];
                            case 7:
                                mediaUrl = _9.sent();
                                return [3 /*break*/, 17];
                            case 8:
                                msgBody = ((_q = message.document) === null || _q === void 0 ? void 0 : _q.caption) || ((_r = message.document) === null || _r === void 0 ? void 0 : _r.filename) || "";
                                mediaType = "document";
                                return [4 /*yield*/, downloadOfficialMedia(message.document.id, connection.coexistencePermanentToken, connection.companyId, (_s = message.document) === null || _s === void 0 ? void 0 : _s.mime_type)];
                            case 9:
                                mediaUrl = _9.sent();
                                return [3 /*break*/, 17];
                            case 10:
                                // Resposta a botão de reply ou lista — extrai o ID (número da opção no fluxo)
                                if (((_t = message.interactive) === null || _t === void 0 ? void 0 : _t.type) === "button_reply") {
                                    msgBody = ((_u = message.interactive.button_reply) === null || _u === void 0 ? void 0 : _u.id) || ((_v = message.interactive.button_reply) === null || _v === void 0 ? void 0 : _v.title) || "";
                                }
                                else if (((_w = message.interactive) === null || _w === void 0 ? void 0 : _w.type) === "list_reply") {
                                    msgBody = ((_x = message.interactive.list_reply) === null || _x === void 0 ? void 0 : _x.id) || ((_y = message.interactive.list_reply) === null || _y === void 0 ? void 0 : _y.title) || "";
                                }
                                return [3 /*break*/, 17];
                            case 11:
                                // Resposta a template button — usa o payload ou o texto do botão
                                msgBody = ((_z = message.button) === null || _z === void 0 ? void 0 : _z.payload) || ((_0 = message.button) === null || _0 === void 0 ? void 0 : _0.text) || "";
                                return [3 /*break*/, 17];
                            case 12:
                                mediaType = "sticker";
                                return [4 /*yield*/, downloadOfficialMedia(message.sticker.id, connection.coexistencePermanentToken, connection.companyId, (_1 = message.sticker) === null || _1 === void 0 ? void 0 : _1.mime_type)];
                            case 13:
                                mediaUrl = _9.sent();
                                return [3 /*break*/, 17];
                            case 14:
                                msgBody = [
                                    (_2 = message.location) === null || _2 === void 0 ? void 0 : _2.name,
                                    (_3 = message.location) === null || _3 === void 0 ? void 0 : _3.address,
                                    "Lat: ".concat((_4 = message.location) === null || _4 === void 0 ? void 0 : _4.latitude, ", Lng: ").concat((_5 = message.location) === null || _5 === void 0 ? void 0 : _5.longitude)
                                ].filter(Boolean).join(" | ");
                                return [3 /*break*/, 17];
                            case 15: return [2 /*return*/, "continue"];
                            case 16:
                                // Tipo não suportado — registra log e ignora
                                console.log("[OfficialMessageListener] Tipo de mensagem n\u00E3o suportado: ".concat(message.type));
                                return [2 /*return*/, "continue"];
                            case 17:
                                _9.trys.push([17, 33, , 34]);
                                return [4 /*yield*/, (0, FindOrCreateContactService_1["default"])({
                                        name: contactName,
                                        firstName: contactName,
                                        lastName: "",
                                        picture: "",
                                        from: from,
                                        connection: connection
                                    })];
                            case 18:
                                contact = _9.sent();
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { contactId: contact.id, channel: "whatsapp_official", whatsappId: connection.id, companyId: connection.companyId },
                                        attributes: ["status", "userId", "queueId"]
                                    })];
                            case 19:
                                existingTicket = _9.sent();
                                wasReopened = (existingTicket === null || existingTicket === void 0 ? void 0 : existingTicket.status) === "closed"
                                    && !(existingTicket === null || existingTicket === void 0 ? void 0 : existingTicket.userId)
                                    && !(existingTicket === null || existingTicket === void 0 ? void 0 : existingTicket.queueId);
                                return [4 /*yield*/, (0, CreateOrUpdateTicketService_1["default"])({
                                        contactId: contact.id,
                                        channel: "whatsapp_official",
                                        contents: [{ type: message.type, text: msgBody }],
                                        connection: connection
                                    })];
                            case 20:
                                ticket = _9.sent();
                                quotedMsgId = void 0;
                                if (!((_6 = message.context) === null || _6 === void 0 ? void 0 : _6.id)) return [3 /*break*/, 22];
                                return [4 /*yield*/, Message_1["default"].findOne({
                                        where: { wid: message.context.id },
                                        attributes: ["id"]
                                    })];
                            case 21:
                                quotedMsg = _9.sent();
                                if (quotedMsg)
                                    quotedMsgId = quotedMsg.id;
                                _9.label = 22;
                            case 22:
                                messageData = __assign({ wid: messageId, contactId: contact.id, body: msgBody || "M\u00EDdia ".concat(message.type), ticketId: ticket.id, fromMe: false, ack: 1, read: false }, (quotedMsgId && { quotedMsgId: quotedMsgId }));
                                if (mediaUrl) {
                                    messageData.mediaUrl = mediaUrl;
                                    messageData.mediaType = mediaType;
                                }
                                createdMessage = null;
                                _9.label = 23;
                            case 23:
                                _9.trys.push([23, 25, , 26]);
                                return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                                        messageData: messageData,
                                        companyId: connection.companyId
                                    })];
                            case 24:
                                createdMessage = _9.sent();
                                return [3 /*break*/, 26];
                            case 25:
                                msgError_1 = _9.sent();
                                console.error("[OfficialMessageListener] Erro em CreateMessageService:", msgError_1);
                                return [3 /*break*/, 26];
                            case 26:
                                _9.trys.push([26, 30, , 31]);
                                io = (0, socket_1.getIO)();
                                companyId = connection.companyId;
                                return [4 /*yield*/, Ticket_1["default"].findByPk(ticket.id, {
                                        include: [
                                            { model: Contact_1["default"], as: "contact" },
                                            { model: Queue_1["default"], as: "queue" },
                                            { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "name", "channel"] },
                                            { model: User_1["default"], as: "user", attributes: ["id", "name"] }
                                        ]
                                    })];
                            case 27:
                                ticketWithAssoc = _9.sent();
                                finalMessage = createdMessage;
                                if (!!finalMessage) return [3 /*break*/, 29];
                                return [4 /*yield*/, Message_1["default"].findOne({
                                        where: { wid: messageId },
                                        include: [
                                            "contact",
                                            { model: Ticket_1["default"], as: "ticket", include: [{ model: Contact_1["default"], as: "contact" }] },
                                            { model: Message_1["default"], as: "quotedMsg", include: ["contact"] }
                                        ]
                                    })["catch"](function () { return null; })];
                            case 28:
                                finalMessage = _9.sent();
                                _9.label = 29;
                            case 29:
                                if (ticketWithAssoc) {
                                    if (finalMessage) {
                                        io.of(String(companyId)).emit("company-".concat(companyId, "-appMessage"), {
                                            action: "create",
                                            message: finalMessage,
                                            ticket: ticketWithAssoc,
                                            contact: contact
                                        });
                                    }
                                    io.of(String(companyId)).emit("company-".concat(companyId, "-ticket"), {
                                        action: "update",
                                        ticket: ticketWithAssoc
                                    });
                                }
                                return [3 /*break*/, 31];
                            case 30:
                                socketError_1 = _9.sent();
                                console.error("[OfficialMessageListener] Erro ao emitir socket:", socketError_1);
                                return [3 /*break*/, 31];
                            case 31: 
                            // Disparar fluxo do FlowBuilder se configurado na conexão
                            return [4 /*yield*/, triggerOfficialFlow({
                                    connection: connection,
                                    ticket: ticket,
                                    contact: contact,
                                    msgBody: msgBody,
                                    from: from,
                                    wasReopened: wasReopened
                                })];
                            case 32:
                                // Disparar fluxo do FlowBuilder se configurado na conexão
                                _9.sent();
                                return [3 /*break*/, 34];
                            case 33:
                                error_3 = _9.sent();
                                console.error("[OfficialMessageListener] Erro ao processar mensagem:", error_3);
                                return [3 /*break*/, 34];
                            case 34: return [2 /*return*/];
                        }
                    });
                };
                _e = 0, _f = value.messages;
                _7.label = 11;
            case 11:
                if (!(_e < _f.length)) return [3 /*break*/, 14];
                message = _f[_e];
                return [5 /*yield**/, _loop_1(message)];
            case 12:
                _7.sent();
                _7.label = 13;
            case 13:
                _e++;
                return [3 /*break*/, 11];
            case 14:
                _b++;
                return [3 /*break*/, 2];
            case 15:
                _i++;
                return [3 /*break*/, 1];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.OfficialMessageListener = OfficialMessageListener;
