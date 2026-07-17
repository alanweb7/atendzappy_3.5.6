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
exports.getMessageOptions = void 0;
var Sentry = __importStar(require("@sentry/node"));
var fs_1 = __importStar(require("fs"));
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var mime_types_1 = __importDefault(require("mime-types"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var wbot_1 = require("../../libs/wbot");
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var os = require("os");
var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
var processAudio = function (audio, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var outputAudio;
    return __generator(this, function (_a) {
        outputAudio = "".concat(publicFolder, "/company").concat(companyId, "/").concat(new Date().getTime(), ".ogg");
        console.log("[processAudio] Processando \u00E1udio: ".concat(audio, " -> ").concat(outputAudio));
        return [2 /*return*/, new Promise(function (resolve, reject) {
                (0, child_process_1.exec)("".concat(ffmpeg_1["default"].path, " -y -i \"").concat(audio, "\" -vn -c:a libopus -b:a 64k -ar 48000 -ac 1 \"").concat(outputAudio, "\""), function (error, _stdout, _stderr) {
                    if (error) {
                        console.error("[processAudio] Erro no processamento de áudio PTT:", error);
                        reject(error);
                    }
                    else {
                        console.log("[processAudio] Áudio PTT processado com sucesso:", outputAudio);
                        resolve(outputAudio);
                    }
                });
            })];
    });
}); };
var processAudioFile = function (audio, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var outputAudio;
    return __generator(this, function (_a) {
        outputAudio = "".concat(publicFolder, "/company").concat(companyId, "/").concat(new Date().getTime(), ".m4a");
        return [2 /*return*/, new Promise(function (resolve, reject) {
                (0, child_process_1.exec)("".concat(ffmpeg_1["default"].path, " -i \"").concat(audio, "\" -c:a aac -b:a 128k -ar 44100 -ac 2 -f mp4 \"").concat(outputAudio, "\" -y"), function (error, _stdout, _stderr) {
                    if (error) {
                        console.error("Erro no processamento de arquivo de áudio:", error);
                        reject(error);
                    }
                    else {
                        console.log("Arquivo de áudio processado com sucesso:", outputAudio);
                        resolve(outputAudio);
                    }
                });
            })];
    });
}); };
var getMessageOptions = function (fileName, pathMedia, companyId, body) {
    if (body === void 0) { body = " "; }
    return __awaiter(void 0, void 0, void 0, function () {
        var mimeType, typeMessage, options, typeAudio, convert, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mimeType = String(mime_types_1["default"].lookup(pathMedia));
                    typeMessage = mimeType.split("/")[0];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!mimeType) {
                        throw new Error("Invalid mimetype");
                    }
                    options = void 0;
                    if (!(typeMessage === "video")) return [3 /*break*/, 2];
                    options = {
                        video: { url: pathMedia },
                        caption: body ? body : null,
                        fileName: fileName
                        // gifPlayback: true
                    };
                    return [3 /*break*/, 5];
                case 2:
                    if (!(typeMessage === "audio")) return [3 /*break*/, 4];
                    typeAudio = true;
                    return [4 /*yield*/, processAudio(pathMedia, companyId)];
                case 3:
                    convert = _a.sent();
                    if (typeAudio) {
                        options = {
                            audio: fs_1["default"].readFileSync(convert),
                            mimetype: "audio/ogg; codecs=opus",
                            ptt: true
                        };
                    }
                    else {
                        options = {
                            audio: fs_1["default"].readFileSync(convert),
                            mimetype: typeAudio ? "audio/ogg; codecs=opus" : mimeType,
                            ptt: true
                        };
                    }
                    // Limpar arquivo temporário
                    fs_1["default"].unlinkSync(convert);
                    return [3 /*break*/, 5];
                case 4:
                    if (typeMessage === "document") {
                        options = {
                            document: { url: pathMedia },
                            caption: body ? body : null,
                            fileName: fileName,
                            mimetype: mimeType
                        };
                    }
                    else if (typeMessage === "application") {
                        options = {
                            document: { url: pathMedia },
                            caption: body ? body : null,
                            fileName: fileName,
                            mimetype: mimeType
                        };
                    }
                    else {
                        options = {
                            image: { url: pathMedia },
                            caption: body ? body : null
                        };
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/, options];
                case 6:
                    e_1 = _a.sent();
                    Sentry.captureException(e_1);
                    console.log(e_1);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.getMessageOptions = getMessageOptions;
var SendWhatsAppMedia = function (_a) {
    var media = _a.media, ticket = _a.ticket, _b = _a.body, body = _b === void 0 ? "" : _b, _c = _a.isPrivate, isPrivate = _c === void 0 ? false : _c, _d = _a.isForwarded, isForwarded = _d === void 0 ? false : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        var wbot, companyId, pathMedia, typeMessage, options, bodyTicket, bodyMedia, stats, testRead, convert, contactNumber, messageData, resultMessage, number, sentMessage, err_1;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 11, , 12]);
                    console.log("[SendWhatsAppMedia] Iniciando envio de m\u00EDdia - Ticket: ".concat(ticket.id, ", Tipo: ").concat(media.mimetype, ", Arquivo: ").concat(media.originalname));
                    return [4 /*yield*/, (0, wbot_1.getWbot)(ticket.whatsappId)];
                case 1:
                    wbot = _f.sent();
                    companyId = ticket.companyId.toString();
                    pathMedia = media.path;
                    typeMessage = media.mimetype.split("/")[0];
                    options = void 0;
                    bodyTicket = "";
                    bodyMedia = ticket ? (0, Mustache_1["default"])(body, ticket) : body;
                    console.log("[SendWhatsAppMedia] Processando tipo: ".concat(typeMessage, ", isPrivate: ").concat(isPrivate));
                    if (!(typeMessage === "video")) return [3 /*break*/, 2];
                    options = {
                        video: { url: pathMedia },
                        caption: bodyMedia,
                        fileName: media.originalname.replace('/', '-'),
                        contextInfo: { forwardingScore: isForwarded ? 2 : 0, isForwarded: isForwarded }
                    };
                    bodyTicket = "🎥 Arquivo de vídeo";
                    return [3 /*break*/, 5];
                case 2:
                    if (!(typeMessage === "audio")) return [3 /*break*/, 4];
                    console.log("[SendWhatsAppMedia] Processando \u00E1udio - Path: ".concat(pathMedia, ", Company: ").concat(companyId));
                    // Verificar se o arquivo existe e não está corrompido
                    try {
                        stats = fs_1["default"].statSync(pathMedia);
                        console.log("[SendWhatsAppMedia] Tamanho do arquivo: ".concat(stats.size, " bytes"));
                        // Áudios válidos geralmente têm pelo menos 1KB (1024 bytes) - reduzido temporariamente para debug
                        if (stats.size < 1024) {
                            throw new Error("Arquivo de \u00E1udio muito pequeno (".concat(stats.size, " bytes), m\u00EDnimo necess\u00E1rio: 1024 bytes. Grava\u00E7\u00E3o foi interrompida."));
                        }
                        // Verificar se o arquivo pode ser lido (não corrompido)
                        try {
                            testRead = fs_1["default"].readFileSync(pathMedia, { encoding: null });
                            if (testRead.length !== stats.size) {
                                throw new Error("Arquivo corrompido - tamanho lido (".concat(testRead.length, ") diferente do esperado (").concat(stats.size, ")"));
                            }
                        }
                        catch (readError) {
                            throw new Error("Arquivo de \u00E1udio corrompido ou ileg\u00EDvel: ".concat(readError.message));
                        }
                    }
                    catch (error) {
                        console.error("[SendWhatsAppMedia] Erro ao verificar arquivo: ".concat(error.message));
                        throw new AppError_1["default"]("Arquivo de \u00E1udio inv\u00E1lido: ".concat(error.message));
                    }
                    return [4 /*yield*/, processAudio(media.path, companyId)];
                case 3:
                    convert = _f.sent();
                    console.log("[SendWhatsAppMedia] \u00C1udio convertido: ".concat(convert));
                    options = {
                        audio: fs_1["default"].readFileSync(convert),
                        mimetype: "audio/ogg; codecs=opus",
                        ptt: true,
                        caption: bodyMedia,
                        contextInfo: { forwardingScore: isForwarded ? 2 : 0, isForwarded: isForwarded }
                    };
                    (0, fs_1.unlinkSync)(convert);
                    bodyTicket = "🎵 Arquivo de áudio";
                    console.log("[SendWhatsAppMedia] Op\u00E7\u00F5es de \u00E1udio criadas, tamanho: ".concat(((_e = options.audio) === null || _e === void 0 ? void 0 : _e.length) || 0, " bytes"));
                    return [3 /*break*/, 5];
                case 4:
                    if (typeMessage === "document" || typeMessage === "text") {
                        options = {
                            document: { url: pathMedia },
                            caption: bodyMedia,
                            fileName: media.originalname.replace('/', '-'),
                            mimetype: media.mimetype,
                            contextInfo: { forwardingScore: isForwarded ? 2 : 0, isForwarded: isForwarded }
                        };
                        bodyTicket = "📂 Documento";
                    }
                    else if (typeMessage === "application") {
                        options = {
                            document: { url: pathMedia },
                            caption: bodyMedia,
                            fileName: media.originalname.replace('/', '-'),
                            mimetype: media.mimetype,
                            contextInfo: { forwardingScore: isForwarded ? 2 : 0, isForwarded: isForwarded }
                        };
                        bodyTicket = "📎 Outros anexos";
                    }
                    else {
                        if (media.mimetype.includes("gif")) {
                            options = {
                                image: { url: pathMedia },
                                caption: bodyMedia,
                                mimetype: "image/gif",
                                contextInfo: { forwardingScore: isForwarded ? 2 : 0, isForwarded: isForwarded },
                                gifPlayback: true
                            };
                        }
                        else {
                            options = {
                                image: { url: pathMedia },
                                caption: bodyMedia,
                                contextInfo: { forwardingScore: isForwarded ? 2 : 0, isForwarded: isForwarded }
                            };
                        }
                        bodyTicket = "📎 Outros anexos";
                    }
                    _f.label = 5;
                case 5: return [4 /*yield*/, Contact_1["default"].findByPk(ticket.contactId)];
                case 6:
                    contactNumber = _f.sent();
                    if (!(isPrivate === true)) return [3 /*break*/, 8];
                    messageData = {
                        wid: "PVT".concat(companyId).concat(ticket.id).concat(body.substring(0, 6)),
                        ticketId: ticket.id,
                        contactId: undefined,
                        body: bodyMedia,
                        fromMe: true,
                        mediaUrl: media.filename,
                        mediaType: media.mimetype.split("/")[0],
                        read: true,
                        quotedMsgId: null,
                        ack: 2,
                        remoteJid: null,
                        participant: null,
                        dataJson: null,
                        ticketTrakingId: null,
                        isPrivate: isPrivate
                    };
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({ messageData: messageData, companyId: ticket.companyId })];
                case 7:
                    _f.sent();
                    console.log("[SendWhatsAppMedia] Mensagem privada criada: ".concat(messageData.wid));
                    resultMessage = {
                        key: {
                            remoteJid: (contactNumber === null || contactNumber === void 0 ? void 0 : contactNumber.remoteJid) || "".concat(contactNumber.number, "@s.whatsapp.net"),
                            id: messageData.wid,
                            fromMe: true
                        },
                        message: { conversation: bodyMedia },
                        messageTimestamp: Math.floor(Date.now() / 1000),
                        status: 1
                    };
                    console.log("[SendWhatsAppMedia] Retornando mensagem privada:", resultMessage);
                    return [2 /*return*/, resultMessage];
                case 8:
                    number = void 0;
                    if (contactNumber.remoteJid && contactNumber.remoteJid !== "" && contactNumber.remoteJid.includes("@")) {
                        number = contactNumber.remoteJid;
                    }
                    else {
                        number = "".concat(contactNumber.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net");
                    }
                    console.log("[SendWhatsAppMedia] Enviando para n\u00FAmero: ".concat(number));
                    console.log("[SendWhatsAppMedia] Op\u00E7\u00F5es finais:", JSON.stringify(options, null, 2));
                    return [4 /*yield*/, wbot.sendMessage(number, __assign({}, options))];
                case 9:
                    sentMessage = _f.sent();
                    console.log("[SendWhatsAppMedia] Mensagem enviada com sucesso:", sentMessage.key.id);
                    return [4 /*yield*/, ticket.update({ lastMessage: body !== media.filename ? body : bodyMedia, imported: null })];
                case 10:
                    _f.sent();
                    return [2 /*return*/, sentMessage];
                case 11:
                    err_1 = _f.sent();
                    console.log("[SendWhatsAppMedia] ERRO AO ENVIAR MIDIA ".concat(ticket.id, " media ").concat(media.originalname));
                    console.log("[SendWhatsAppMedia] Erro completo:", err_1);
                    Sentry.captureException(err_1);
                    console.log(err_1);
                    throw new AppError_1["default"]("ERR_SENDING_WAPP_MSG");
                case 12: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = SendWhatsAppMedia;
