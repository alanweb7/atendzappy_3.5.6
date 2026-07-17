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
exports.initWASocket = exports.msgDB = exports.dataMessages = exports.removeWbot = exports.restartWbot = exports.getWbot = void 0;
var Sentry = __importStar(require("@sentry/node"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var logger_1 = __importDefault(require("../utils/logger"));
var logger_2 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
var useMultiFileAuthState_1 = require("../helpers/useMultiFileAuthState");
var AppError_1 = __importDefault(require("../errors/AppError"));
var socket_1 = require("./socket");
var StartWhatsAppSession_1 = require("../services/WbotServices/StartWhatsAppSession");
var DeleteBaileysService_1 = __importDefault(require("../services/BaileysServices/DeleteBaileysService"));
var cache_1 = __importDefault(require("./cache"));
var ImportWhatsAppMessageService_1 = __importDefault(require("../services/WhatsappService/ImportWhatsAppMessageService"));
var date_fns_1 = require("date-fns");
var moment_1 = __importDefault(require("moment"));
var wbotMessageListener_1 = require("../services/WbotServices/wbotMessageListener");
var addLogs_1 = require("../helpers/addLogs");
var node_cache_1 = __importDefault(require("node-cache"));
var loadBaileys_1 = require("../utils/loadBaileys");
var msgRetryCounterCache = new node_cache_1["default"]({
    stdTTL: 600,
    maxKeys: 1000,
    checkperiod: 300,
    useClones: false
});
var msgCache = new node_cache_1["default"]({
    stdTTL: 60,
    maxKeys: 1000,
    checkperiod: 300,
    useClones: false
});
var loggerBaileys = logger_2["default"].child({});
loggerBaileys.level = "error";
var sessions = [];
var retriesQrCodeMap = new Map();
function msg() {
    return {
        get: function (key) {
            var id = key.id;
            if (!id)
                return;
            var data = msgCache.get(id);
            if (data) {
                try {
                    var msg_1 = JSON.parse(data);
                    return msg_1 === null || msg_1 === void 0 ? void 0 : msg_1.message;
                }
                catch (error) {
                    logger_1["default"].error(error);
                }
            }
        },
        save: function (msg) {
            var id = msg.key.id;
            var msgtxt = JSON.stringify(msg);
            try {
                msgCache.set(id, msgtxt);
            }
            catch (error) {
                logger_1["default"].error(error);
            }
        }
    };
}
exports["default"] = msg;
var getWbot = function (whatsappId) {
    var sessionIndex = sessions.findIndex(function (s) { return s.id === whatsappId; });
    if (sessionIndex === -1) {
        throw new AppError_1["default"]("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};
exports.getWbot = getWbot;
var restartWbot = function (companyId, session) { return __awaiter(void 0, void 0, void 0, function () {
    var options, whatsapp, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                options = {
                    where: {
                        companyId: companyId
                    },
                    attributes: ["id"]
                };
                return [4 /*yield*/, Whatsapp_1["default"].findAll(options)];
            case 1:
                whatsapp = _a.sent();
                whatsapp.map(function (c) { return __awaiter(void 0, void 0, void 0, function () {
                    var sessionIndex;
                    return __generator(this, function (_a) {
                        sessionIndex = sessions.findIndex(function (s) { return s.id === c.id; });
                        if (sessionIndex !== -1) {
                            sessions[sessionIndex].ws.close();
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                logger_1["default"].error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.restartWbot = restartWbot;
var removeWbot = function (whatsappId, isLogout) {
    if (isLogout === void 0) { isLogout = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var sessionIndex;
        return __generator(this, function (_a) {
            try {
                sessionIndex = sessions.findIndex(function (s) { return s.id === whatsappId; });
                if (sessionIndex !== -1) {
                    if (isLogout) {
                        sessions[sessionIndex].logout();
                        sessions[sessionIndex].ws.close();
                    }
                    sessions.splice(sessionIndex, 1);
                }
            }
            catch (err) {
                logger_1["default"].error(err);
            }
            return [2 /*return*/];
        });
    });
};
exports.removeWbot = removeWbot;
exports.dataMessages = {};
exports.msgDB = msg();
var initWASocket = function (whatsapp) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        (function () { return __awaiter(void 0, void 0, void 0, function () {
                            var io, baileys, _a, makeWASocket, Browsers, DisconnectReason, fetchLatestBaileysVersion, isJidBroadcast, isJidGroup, jidNormalizedUser, makeCacheableSignalKeyStore, proto, whatsappUpdate, id, name, allowGroup, companyId, _b, version, isLatest, retriesQrCode, wsocket, _c, state, saveCreds;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        io = (0, socket_1.getIO)();
                                        return [4 /*yield*/, (0, loadBaileys_1.loadBaileys)()];
                                    case 1:
                                        baileys = _d.sent();
                                        _a = baileys, makeWASocket = _a["default"], Browsers = _a.Browsers, DisconnectReason = _a.DisconnectReason, fetchLatestBaileysVersion = _a.fetchLatestBaileysVersion, isJidBroadcast = _a.isJidBroadcast, isJidGroup = _a.isJidGroup, jidNormalizedUser = _a.jidNormalizedUser, makeCacheableSignalKeyStore = _a.makeCacheableSignalKeyStore, proto = _a.proto;
                                        return [4 /*yield*/, Whatsapp_1["default"].findOne({
                                                where: { id: whatsapp.id }
                                            })];
                                    case 2:
                                        whatsappUpdate = _d.sent();
                                        if (!whatsappUpdate)
                                            return [2 /*return*/];
                                        id = whatsappUpdate.id, name = whatsappUpdate.name, allowGroup = whatsappUpdate.allowGroup, companyId = whatsappUpdate.companyId;
                                        return [4 /*yield*/, fetchLatestBaileysVersion()];
                                    case 3:
                                        _b = _d.sent(), version = _b.version, isLatest = _b.isLatest;
                                        logger_1["default"].info("Vers\u00E3o: v".concat(version.join("."), ", isLatest: ").concat(isLatest));
                                        logger_1["default"].info("Starting session ".concat(name));
                                        retriesQrCode = 0;
                                        wsocket = null;
                                        return [4 /*yield*/, (0, useMultiFileAuthState_1.useMultiFileAuthState)(whatsapp)];
                                    case 4:
                                        _c = _d.sent(), state = _c.state, saveCreds = _c.saveCreds;
                                        wsocket = makeWASocket({
                                            version: version,
                                            logger: loggerBaileys,
                                            printQRInTerminal: false,
                                            // auth: state as AuthenticationState,
                                            auth: {
                                                creds: state.creds,
                                                /** caching makes the store faster to send/recv messages */
                                                keys: makeCacheableSignalKeyStore(state.keys, logger_1["default"])
                                            },
                                            generateHighQualityLinkPreview: true,
                                            linkPreviewImageThumbnailWidth: 192,
                                            // shouldIgnoreJid: jid => isJidBroadcast(jid),
                                            shouldIgnoreJid: function (jid) {
                                                // Grupos sempre permitidos - apenas bloquear broadcasts
                                                return isJidBroadcast(jid);
                                            },
                                            browser: Browsers.appropriate("Desktop"),
                                            defaultQueryTimeoutMs: undefined,
                                            msgRetryCounterCache: msgRetryCounterCache,
                                            markOnlineOnConnect: false,
                                            retryRequestDelayMs: 500,
                                            // maxMsgRetryCount: 5,
                                            emitOwnEvents: true,
                                            fireInitQueries: false,
                                            transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
                                            connectTimeoutMs: 60000,
                                            keepAliveIntervalMs: 30000,
                                            getMessage: exports.msgDB.get,
                                            patchMessageBeforeSending: function (message) {
                                                var _a, _b, _c, _d;
                                                if (((_c = (_b = (_a = message.deviceSentMessage) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.listMessage) === null || _c === void 0 ? void 0 : _c.listType) === proto.Message.ListMessage.ListType.PRODUCT_LIST) {
                                                    message = JSON.parse(JSON.stringify(message));
                                                    message.deviceSentMessage.message.listMessage.listType = proto.Message.ListMessage.ListType.SINGLE_SELECT;
                                                }
                                                if (((_d = message.listMessage) === null || _d === void 0 ? void 0 : _d.listType) == proto.Message.ListMessage.ListType.PRODUCT_LIST) {
                                                    message = JSON.parse(JSON.stringify(message));
                                                    message.listMessage.listType = proto.Message.ListMessage.ListType.SINGLE_SELECT;
                                                }
                                                return message; // Adicionei este retorno que estava faltando
                                            }
                                        });
                                        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                            var wpp, dateOldLimit_1, dateRecentLimit_1, statusImportMessages;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsapp.id)];
                                                    case 1:
                                                        wpp = _a.sent();
                                                        if (!((wpp === null || wpp === void 0 ? void 0 : wpp.importOldMessages) && wpp.status === "CONNECTED")) return [3 /*break*/, 3];
                                                        dateOldLimit_1 = new Date(wpp.importOldMessages).getTime();
                                                        dateRecentLimit_1 = new Date(wpp.importRecentMessages).getTime();
                                                        (0, addLogs_1.addLogs)({
                                                            fileName: "preparingImportMessagesWppId".concat(whatsapp.id, ".txt"), forceNewFile: true,
                                                            text: "Aguardando conex\u00E3o para iniciar a importa\u00E7\u00E3o de mensagens:\n  Whatsapp nome: ".concat(wpp.name, "\n  Whatsapp Id: ").concat(wpp.id, "\n  Cria\u00E7\u00E3o do arquivo de logs: ").concat((0, moment_1["default"])().format("DD/MM/YYYY HH:mm:ss"), "\n  Selecionado Data de inicio de importa\u00E7\u00E3o: ").concat((0, moment_1["default"])(dateOldLimit_1).format("DD/MM/YYYY HH:mm:ss"), " \n  Selecionado Data final da importa\u00E7\u00E3o: ").concat((0, moment_1["default"])(dateRecentLimit_1).format("DD/MM/YYYY HH:mm:ss"), " \n  ")
                                                        });
                                                        statusImportMessages = new Date().getTime();
                                                        return [4 /*yield*/, wpp.update({
                                                                statusImportMessages: statusImportMessages
                                                            })];
                                                    case 2:
                                                        _a.sent();
                                                        wsocket.ev.on("messaging-history.set", function (messageSet) { return __awaiter(void 0, void 0, void 0, function () {
                                                            var statusImportMessages, whatsappId, filteredMessages, filteredDateMessages;
                                                            var _a, _b;
                                                            return __generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        statusImportMessages = new Date().getTime();
                                                                        return [4 /*yield*/, wpp.update({
                                                                                statusImportMessages: statusImportMessages
                                                                            })];
                                                                    case 1:
                                                                        _c.sent();
                                                                        whatsappId = whatsapp.id;
                                                                        filteredMessages = messageSet.messages;
                                                                        filteredDateMessages = [];
                                                                        filteredMessages.forEach(function (msg) {
                                                                            var _a, _b, _c;
                                                                            var timestampMsg = Math.floor(msg.messageTimestamp["low"] * 1000);
                                                                            if ((0, wbotMessageListener_1.isValidMsg)(msg) && dateOldLimit_1 < timestampMsg && dateRecentLimit_1 > timestampMsg) {
                                                                                if (((_a = msg.key) === null || _a === void 0 ? void 0 : _a.remoteJid.split("@")[1]) != "g.us") {
                                                                                    (0, addLogs_1.addLogs)({
                                                                                        fileName: "preparingImportMessagesWppId".concat(whatsapp.id, ".txt"), text: "Adicionando mensagem para pos processamento:\n  N\u00E3o \u00E9 Mensagem de GRUPO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n  Data e hora da mensagem: ".concat((0, moment_1["default"])(timestampMsg).format("DD/MM/YYYY HH:mm:ss"), "\n  Contato da Mensagem : ").concat((_b = msg.key) === null || _b === void 0 ? void 0 : _b.remoteJid, "\n  Tipo da mensagem : ").concat((0, wbotMessageListener_1.getTypeMessage)(msg), "\n  \n  ")
                                                                                    });
                                                                                    filteredDateMessages.push(msg);
                                                                                }
                                                                                else {
                                                                                    if (wpp === null || wpp === void 0 ? void 0 : wpp.importOldMessagesGroups) {
                                                                                        (0, addLogs_1.addLogs)({
                                                                                            fileName: "preparingImportMessagesWppId".concat(whatsapp.id, ".txt"), text: "Adicionando mensagem para pos processamento:\n  Mensagem de GRUPO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n  Data e hora da mensagem: ".concat((0, moment_1["default"])(timestampMsg).format("DD/MM/YYYY HH:mm:ss"), "\n  Contato da Mensagem : ").concat((_c = msg.key) === null || _c === void 0 ? void 0 : _c.remoteJid, "\n  Tipo da mensagem : ").concat((0, wbotMessageListener_1.getTypeMessage)(msg), "\n  \n  ")
                                                                                        });
                                                                                        filteredDateMessages.push(msg);
                                                                                    }
                                                                                }
                                                                            }
                                                                        });
                                                                        if (!(exports.dataMessages === null || exports.dataMessages === void 0 ? void 0 : exports.dataMessages[whatsappId])) {
                                                                            exports.dataMessages[whatsappId] = [];
                                                                            (_a = exports.dataMessages[whatsappId]).unshift.apply(_a, filteredDateMessages);
                                                                        }
                                                                        else {
                                                                            (_b = exports.dataMessages[whatsappId]).unshift.apply(_b, filteredDateMessages);
                                                                        }
                                                                        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                                            var wpp;
                                                                            return __generator(this, function (_a) {
                                                                                switch (_a.label) {
                                                                                    case 0: return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
                                                                                    case 1:
                                                                                        wpp = _a.sent();
                                                                                        io.of(String(companyId))
                                                                                            .emit("importMessages-".concat(wpp.companyId), {
                                                                                            action: "update",
                                                                                            status: { "this": -1, all: -1 }
                                                                                        });
                                                                                        io.of(String(companyId))
                                                                                            .emit("company-".concat(companyId, "-whatsappSession"), {
                                                                                            action: "update",
                                                                                            session: wpp
                                                                                        });
                                                                                        return [2 /*return*/];
                                                                                }
                                                                            });
                                                                        }); }, 500);
                                                                        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                                            var wpp, isTimeStamp, ultimoStatus, dataLimite;
                                                                            return __generator(this, function (_a) {
                                                                                switch (_a.label) {
                                                                                    case 0: return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
                                                                                    case 1:
                                                                                        wpp = _a.sent();
                                                                                        if (wpp === null || wpp === void 0 ? void 0 : wpp.importOldMessages) {
                                                                                            isTimeStamp = !isNaN(new Date(Math.floor(parseInt(wpp === null || wpp === void 0 ? void 0 : wpp.statusImportMessages))).getTime());
                                                                                            if (isTimeStamp) {
                                                                                                ultimoStatus = new Date(Math.floor(parseInt(wpp === null || wpp === void 0 ? void 0 : wpp.statusImportMessages))).getTime();
                                                                                                dataLimite = +(0, date_fns_1.add)(ultimoStatus, { seconds: +45 }).getTime();
                                                                                                if (dataLimite < new Date().getTime()) {
                                                                                                    //console.log("Pronto para come?ar")
                                                                                                    (0, ImportWhatsAppMessageService_1["default"])(wpp.id);
                                                                                                    wpp.update({
                                                                                                        statusImportMessages: "Running"
                                                                                                    });
                                                                                                }
                                                                                                else {
                                                                                                    //console.log("Aguardando inicio")
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        io.of(String(companyId))
                                                                                            .emit("company-".concat(companyId, "-whatsappSession"), {
                                                                                            action: "update",
                                                                                            session: wpp
                                                                                        });
                                                                                        return [2 /*return*/];
                                                                                }
                                                                            });
                                                                        }); }, 1000 * 45);
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); });
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); }, 2500);
                                        wsocket.ev.on("connection.update", function (_a) {
                                            var connection = _a.connection, lastDisconnect = _a.lastDisconnect, qr = _a.qr;
                                            return __awaiter(void 0, void 0, void 0, function () {
                                                var statusCode, freshWhatsapp, sessionIndex, sessionIndex;
                                                var _b, _c;
                                                return __generator(this, function (_d) {
                                                    switch (_d.label) {
                                                        case 0:
                                                            logger_1["default"].info("Socket  ".concat(name, " Connection Update ").concat(connection || "", " ").concat(lastDisconnect ? lastDisconnect.error.message : ""));
                                                            if (!(connection === "close")) return [3 /*break*/, 10];
                                                            console.log("DESCONECTOU", JSON.stringify(lastDisconnect, null, 2));
                                                            logger_1["default"].info("Socket  ".concat(name, " Connection Update ").concat(connection || "", " ").concat(lastDisconnect ? lastDisconnect.error.message : ""));
                                                            statusCode = (_c = (_b = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _b === void 0 ? void 0 : _b.output) === null || _c === void 0 ? void 0 : _c.statusCode;
                                                            if (!(statusCode === 403)) return [3 /*break*/, 4];
                                                            return [4 /*yield*/, whatsapp.update({ status: "PENDING", session: "" })];
                                                        case 1:
                                                            _d.sent();
                                                            return [4 /*yield*/, (0, DeleteBaileysService_1["default"])(whatsapp.id)];
                                                        case 2:
                                                            _d.sent();
                                                            return [4 /*yield*/, cache_1["default"].delFromPattern("sessions:".concat(whatsapp.id, ":*"))];
                                                        case 3:
                                                            _d.sent();
                                                            io.of(String(companyId))
                                                                .emit("company-".concat(whatsapp.companyId, "-whatsappSession"), {
                                                                action: "update",
                                                                session: whatsapp
                                                            });
                                                            (0, exports.removeWbot)(id, false);
                                                            return [2 /*return*/];
                                                        case 4: return [4 /*yield*/, whatsapp.reload()];
                                                        case 5:
                                                            freshWhatsapp = _d.sent();
                                                            if (freshWhatsapp.status === "DISCONNECTED") {
                                                                (0, exports.removeWbot)(id, false);
                                                                return [2 /*return*/];
                                                            }
                                                            if (!(statusCode !== DisconnectReason.loggedOut)) return [3 /*break*/, 6];
                                                            // Desconexão temporária — reconecta automaticamente
                                                            (0, exports.removeWbot)(id, false);
                                                            setTimeout(function () { return (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, whatsapp.companyId); }, 2000);
                                                            return [3 /*break*/, 10];
                                                        case 6: 
                                                        // Logout explícito — limpa sessão e reconecta para novo QR
                                                        return [4 /*yield*/, whatsapp.update({ status: "PENDING", session: "" })];
                                                        case 7:
                                                            // Logout explícito — limpa sessão e reconecta para novo QR
                                                            _d.sent();
                                                            return [4 /*yield*/, (0, DeleteBaileysService_1["default"])(whatsapp.id)];
                                                        case 8:
                                                            _d.sent();
                                                            return [4 /*yield*/, cache_1["default"].delFromPattern("sessions:".concat(whatsapp.id, ":*"))];
                                                        case 9:
                                                            _d.sent();
                                                            io.of(String(companyId))
                                                                .emit("company-".concat(whatsapp.companyId, "-whatsappSession"), {
                                                                action: "update",
                                                                session: whatsapp
                                                            });
                                                            (0, exports.removeWbot)(id, false);
                                                            setTimeout(function () { return (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, whatsapp.companyId); }, 2000);
                                                            _d.label = 10;
                                                        case 10:
                                                            if (!(connection === "open")) return [3 /*break*/, 12];
                                                            return [4 /*yield*/, whatsapp.update({
                                                                    status: "CONNECTED",
                                                                    qrcode: "",
                                                                    retries: 0,
                                                                    number: wsocket.type === "md"
                                                                        ? jidNormalizedUser(wsocket.user.id).split("@")[0]
                                                                        : "-"
                                                                })];
                                                        case 11:
                                                            _d.sent();
                                                            io.of(String(companyId))
                                                                .emit("company-".concat(whatsapp.companyId, "-whatsappSession"), {
                                                                action: "update",
                                                                session: whatsapp
                                                            });
                                                            sessionIndex = sessions.findIndex(function (s) { return s.id === whatsapp.id; });
                                                            if (sessionIndex === -1) {
                                                                wsocket.id = whatsapp.id;
                                                                sessions.push(wsocket);
                                                            }
                                                            resolve(wsocket);
                                                            _d.label = 12;
                                                        case 12:
                                                            if (!(qr !== undefined && whatsapp.notificameHub !== true)) return [3 /*break*/, 18];
                                                            if (!(retriesQrCodeMap.get(id) && retriesQrCodeMap.get(id) >= 3)) return [3 /*break*/, 16];
                                                            return [4 /*yield*/, whatsappUpdate.update({
                                                                    status: "DISCONNECTED",
                                                                    qrcode: ""
                                                                })];
                                                        case 13:
                                                            _d.sent();
                                                            return [4 /*yield*/, (0, DeleteBaileysService_1["default"])(whatsappUpdate.id)];
                                                        case 14:
                                                            _d.sent();
                                                            return [4 /*yield*/, cache_1["default"].delFromPattern("sessions:".concat(whatsapp.id, ":*"))];
                                                        case 15:
                                                            _d.sent();
                                                            io.of(String(companyId))
                                                                .emit("company-".concat(whatsapp.companyId, "-whatsappSession"), {
                                                                action: "update",
                                                                session: whatsappUpdate
                                                            });
                                                            wsocket.ev.removeAllListeners("connection.update");
                                                            wsocket.ws.close();
                                                            wsocket = null;
                                                            retriesQrCodeMap["delete"](id);
                                                            return [3 /*break*/, 18];
                                                        case 16:
                                                            logger_1["default"].info("Session QRCode Generate ".concat(name));
                                                            retriesQrCodeMap.set(id, (retriesQrCode += 1));
                                                            return [4 /*yield*/, whatsapp.update({
                                                                    qrcode: qr,
                                                                    status: "qrcode",
                                                                    retries: 0,
                                                                    number: ""
                                                                })];
                                                        case 17:
                                                            _d.sent();
                                                            sessionIndex = sessions.findIndex(function (s) { return s.id === whatsapp.id; });
                                                            if (sessionIndex === -1) {
                                                                wsocket.id = whatsapp.id;
                                                                sessions.push(wsocket);
                                                            }
                                                            io.of(String(companyId))
                                                                .emit("company-".concat(whatsapp.companyId, "-whatsappSession"), {
                                                                action: "update",
                                                                session: whatsapp
                                                            });
                                                            _d.label = 18;
                                                        case 18: return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        });
                                        wsocket.ev.on("creds.update", saveCreds);
                                        return [2 /*return*/];
                                }
                            });
                        }); })();
                    }
                    catch (error) {
                        Sentry.captureException(error);
                        console.log(error);
                        reject(error);
                    }
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
exports.initWASocket = initWASocket;
