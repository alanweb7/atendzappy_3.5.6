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
exports.typeSimulation = void 0;
var Sentry = __importStar(require("@sentry/node"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var GetTicketWbot_1 = __importDefault(require("../../helpers/GetTicketWbot"));
var mime_types_1 = __importDefault(require("mime-types"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
var processAudio = function (audio) { return __awaiter(void 0, void 0, void 0, function () {
    var outputAudio;
    return __generator(this, function (_a) {
        outputAudio = "".concat(publicFolder, "/").concat(new Date().getTime(), ".ogg");
        return [2 /*return*/, new Promise(function (resolve, reject) {
                (0, child_process_1.exec)("".concat(ffmpeg_1["default"].path, " -i \"").concat(audio, "\" -c:a libopus -b:a 32k -ar 48000 -ac 1 \"").concat(outputAudio, "\" -y"), function (error, _stdout, _stderr) {
                    if (error) {
                        console.error("Erro no processamento de áudio PTT:", error);
                        reject(error);
                    }
                    else {
                        console.log("Áudio PTT processado com sucesso:", outputAudio);
                        resolve(outputAudio);
                    }
                });
            })];
    });
}); };
var processAudioFile = function (audio) { return __awaiter(void 0, void 0, void 0, function () {
    var outputAudio;
    return __generator(this, function (_a) {
        outputAudio = "".concat(publicFolder, "/").concat(new Date().getTime(), ".m4a");
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
var nameFileDiscovery = function (pathMedia) { return path_1["default"].basename(pathMedia); };
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var typeSimulation = function (ticket, presence) { return __awaiter(void 0, void 0, void 0, function () {
    var wbot, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
            case 1:
                wbot = _a.sent();
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            id: ticket.contactId
                        }
                    })];
            case 2:
                contact = _a.sent();
                return [4 /*yield*/, wbot.sendPresenceUpdate(presence, "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"))];
            case 3:
                _a.sent();
                return [4 /*yield*/, delay(5000)];
            case 4:
                _a.sent();
                return [4 /*yield*/, wbot.sendPresenceUpdate('paused', "".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"))];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.typeSimulation = typeSimulation;
// Função para detectar se é vídeo baseado na extensão
var isVideoFile = function (filePath) {
    var videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v'];
    var ext = path_1["default"].extname(filePath).toLowerCase();
    return videoExtensions.includes(ext);
};
var SendWhatsAppMediaFlow = function (_a) {
    var media = _a.media, ticket = _a.ticket, body = _a.body, _b = _a.isFlow, isFlow = _b === void 0 ? false : _b, _c = _a.isRecord, isRecord = _c === void 0 ? false : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var wbot, mimetype, pathMedia, typeMessage, mediaName, options, convert, convert, contact, sentMessage, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, (0, GetTicketWbot_1["default"])(ticket)];
                case 1:
                    wbot = _d.sent();
                    mimetype = String(mime_types_1["default"].lookup(media));
                    pathMedia = media;
                    typeMessage = mimetype.split("/")[0];
                    mediaName = nameFileDiscovery(media);
                    // CORREÇÃO: Se o mime-types detectou como 'application' mas o arquivo é vídeo, corrigir
                    if (typeMessage === "application" && isVideoFile(media)) {
                        typeMessage = "video";
                        console.log("CORREÇÃO APLICADA: Arquivo detectado como vídeo baseado na extensão");
                    }
                    console.log("=== DEBUG FLOWBUILDER VIDEO ===");
                    console.log("Media path:", media);
                    console.log("MIME type original:", mimetype);
                    console.log("Type message corrigido:", typeMessage);
                    console.log("Media name:", mediaName);
                    console.log("É arquivo de vídeo:", isVideoFile(media));
                    console.log("================================");
                    options = void 0;
                    if (!(typeMessage === "video")) return [3 /*break*/, 2];
                    console.log("DETECTOU COMO VIDEO - OK!");
                    options = {
                        video: { url: pathMedia },
                        caption: body,
                        fileName: mediaName
                        // gifPlayback: true
                    };
                    return [3 /*break*/, 8];
                case 2:
                    if (!(typeMessage === "audio")) return [3 /*break*/, 7];
                    console.log("DETECTOU COMO AUDIO");
                    console.log('record', isRecord);
                    if (!isRecord) return [3 /*break*/, 4];
                    return [4 /*yield*/, processAudio(pathMedia)];
                case 3:
                    convert = _d.sent();
                    options = {
                        audio: fs_1["default"].readFileSync(convert),
                        mimetype: "audio/ogg; codecs=opus",
                        ptt: true
                    };
                    // Limpar arquivo temporário após uso
                    fs_1["default"].unlinkSync(convert);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, processAudioFile(pathMedia)];
                case 5:
                    convert = _d.sent();
                    options = {
                        audio: fs_1["default"].readFileSync(convert),
                        mimetype: "audio/mp4",
                        ptt: false
                    };
                    // Limpar arquivo temporário após uso
                    fs_1["default"].unlinkSync(convert);
                    _d.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    if (typeMessage === "document" || typeMessage === "text") {
                        console.log("DETECTOU COMO DOCUMENT/TEXT");
                        options = {
                            document: { url: pathMedia },
                            caption: body,
                            fileName: mediaName,
                            mimetype: mimetype
                        };
                    }
                    else if (typeMessage === "application") {
                        console.log("DETECTOU COMO APPLICATION");
                        options = {
                            document: { url: pathMedia },
                            caption: body,
                            fileName: mediaName,
                            mimetype: mimetype
                        };
                    }
                    else {
                        console.log("DETECTOU COMO IMAGEM");
                        options = {
                            image: { url: pathMedia },
                            caption: body
                        };
                    }
                    _d.label = 8;
                case 8: return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            id: ticket.contactId
                        }
                    })];
                case 9:
                    contact = _d.sent();
                    console.log("Enviando com opções:", Object.keys(options));
                    return [4 /*yield*/, wbot.sendMessage("".concat(contact.number, "@").concat(ticket.isGroup ? "g.us" : "s.whatsapp.net"), __assign({}, options))];
                case 10:
                    sentMessage = _d.sent();
                    return [4 /*yield*/, ticket.update({ lastMessage: mediaName })];
                case 11:
                    _d.sent();
                    return [2 /*return*/, sentMessage];
                case 12:
                    err_1 = _d.sent();
                    Sentry.captureException(err_1);
                    console.log(err_1);
                    throw new AppError_1["default"]("ERR_SENDING_WAPP_MSG");
                case 13: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = SendWhatsAppMediaFlow;
