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
exports.SendMediaOfficialService = void 0;
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var graphApiHelper_1 = require("../WhatsappCoexistence/graphApiHelper");
var file_type_1 = __importDefault(require("file-type"));
var mime_types_1 = __importDefault(require("mime-types"));
var promises_1 = require("fs/promises");
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var form_data_1 = __importDefault(require("form-data"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
// Limites de tamanho por tipo (bytes) — conforme documentação Meta Cloud API
var META_SIZE_LIMITS = {
    image: 5 * 1024 * 1024,
    video: 16 * 1024 * 1024,
    audio: 16 * 1024 * 1024,
    document: 100 * 1024 * 1024 // 100 MB
};
var ffmpegPath = require("@ffmpeg-installer/ffmpeg");
// Transcodifica vídeo para H.264 Baseline/AAC — formato exigido pela Meta Cloud API
// profile:v baseline + bf=0 evita B-frames que quebram o WhatsApp Android
// scale: limita a 720p para reduzir tamanho e tempo de encode
// Timeout dinâmico: 30s por MB do arquivo de entrada (mínimo 120s)
var transcodeVideoH264 = function (inputPath, fileSizeBytes) {
    var outputPath = inputPath.replace(/\.[^.]+$/, "_h264_".concat(Date.now(), ".mp4"));
    var timeoutMs = Math.max(120000, Math.ceil(fileSizeBytes / 1e6) * 30000);
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)("".concat(ffmpegPath.path, " -y -i \"").concat(inputPath, "\" -vf \"scale=if(gt(iw\\,1280)\\,1280\\,-2):if(gt(ih\\,720)\\,720\\,-2)\" -c:v libx264 -profile:v baseline -bf 0 -preset ultrafast -crf 28 -maxrate 2M -bufsize 4M -c:a aac -b:a 96k -movflags +faststart \"").concat(outputPath, "\""), { timeout: timeoutMs }, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve(outputPath);
            }
        });
    });
};
var verifyExtensionFile = function (media) { return __awaiter(void 0, void 0, void 0, function () {
    var resultFile, havePoint, actualExtension, extension, newFilename, newPath, newPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file_type_1["default"].fromFile(media.path)];
            case 1:
                resultFile = _a.sent();
                havePoint = media.filename.includes(".");
                actualExtension = media.filename.split(".").pop();
                extension = (resultFile === null || resultFile === void 0 ? void 0 : resultFile.ext) || havePoint ? actualExtension : "withoutExtension";
                newFilename = media.filename;
                if (!(actualExtension && actualExtension !== extension && havePoint)) return [3 /*break*/, 3];
                newFilename = media.filename.replace(actualExtension, extension);
                newPath = (0, path_1.join)(media.destination, newFilename);
                return [4 /*yield*/, (0, promises_1.rename)(media.path, newPath)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!!havePoint) return [3 /*break*/, 5];
                newFilename = "".concat(media.filename, ".").concat(extension);
                newPath = (0, path_1.join)(media.destination, newFilename);
                return [4 /*yield*/, (0, promises_1.rename)(media.path, newPath)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                media.filename = newFilename;
                media.originalname = newFilename;
                return [2 /*return*/];
        }
    });
}); };
// Mapeia mimetype para o tipo aceito pela Graph API
var resolveMediaType = function (mimetype) {
    var main = mimetype.split("/")[0];
    if (main === "image")
        return "image";
    if (main === "video")
        return "video";
    if (main === "audio")
        return "audio";
    return "document"; // application/pdf, etc.
};
var SendMediaOfficialService = function (_a) {
    var media = _a.media, body = _a.body, ticketId = _a.ticketId, contact = _a.contact, connection = _a.connection, _b = _a.passVerification, passVerification = _b === void 0 ? false : _b, quotedMsgWid = _a.quotedMsgWid, quotedMsgId = _a.quotedMsgId;
    return __awaiter(void 0, void 0, void 0, function () {
        var client, detectedType, safeMimetype, firstBytes, mediaType, fileSize, sizeLimit, limitMB, fileMB, uploadPath, tempTranscodedPath, uploadMimetype, err_1, form, mediaId, uploadRes, error_1, graphError, toNumber, messagePayload, response, messageId, newMessage, error_2, graphError;
        var _c;
        var _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!!passVerification) return [3 /*break*/, 2];
                    return [4 /*yield*/, verifyExtensionFile(media)];
                case 1:
                    _h.sent();
                    _h.label = 2;
                case 2:
                    if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
                        throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
                    }
                    client = (0, graphApiHelper_1.buildGraphClient)(connection.coexistencePermanentToken);
                    return [4 /*yield*/, file_type_1["default"].fromFile(media.path)];
                case 3:
                    detectedType = _h.sent();
                    safeMimetype = (detectedType === null || detectedType === void 0 ? void 0 : detectedType.mime) || // 1. bytes reais
                        (mime_types_1["default"].lookup(media.filename) || undefined) || // 2. extensão do arquivo
                        (media.mimetype && media.mimetype !== "text/html" ? media.mimetype : undefined) || // 3. browser (exceto text/html)
                        "application/octet-stream";
                    if (!(safeMimetype === "text/html" || safeMimetype === "application/octet-stream")) return [3 /*break*/, 5];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var chunks = [];
                            var stream = (0, fs_1.createReadStream)(media.path, { start: 0, end: 19 });
                            stream.on("data", function (c) { return chunks.push(c); });
                            stream.on("end", function () { return resolve(Buffer.from(chunks.reduce(function (acc, c) { var b = Buffer.from(c); return Buffer.concat([acc, b]); }, Buffer.alloc(0))).toString("utf8").toLowerCase()); });
                            stream.on("error", function () { return resolve(""); });
                        })];
                case 4:
                    firstBytes = _h.sent();
                    if (firstBytes.includes("<html") || firstBytes.includes("<!doc")) {
                        throw new Error("ERR_OFFICIAL_INVALID_FILE: arquivo corrompido ou tipo não suportado");
                    }
                    _h.label = 5;
                case 5:
                    mediaType = resolveMediaType(safeMimetype);
                    fileSize = (0, fs_1.statSync)(media.path).size;
                    sizeLimit = (_d = META_SIZE_LIMITS[mediaType]) !== null && _d !== void 0 ? _d : META_SIZE_LIMITS.document;
                    if (fileSize > sizeLimit) {
                        limitMB = sizeLimit / (1024 * 1024);
                        fileMB = (fileSize / (1024 * 1024)).toFixed(1);
                        throw new AppError_1["default"]("Arquivo muito grande (".concat(fileMB, "MB). O limite da API oficial do WhatsApp para ").concat(mediaType, " \u00E9 ").concat(limitMB, "MB."), 400);
                    }
                    uploadPath = media.path;
                    tempTranscodedPath = null;
                    uploadMimetype = safeMimetype;
                    if (!(mediaType === "video")) return [3 /*break*/, 9];
                    _h.label = 6;
                case 6:
                    _h.trys.push([6, 8, , 9]);
                    console.log("[WhatsAppOfficial][SendMediaOfficial] Transcodando vídeo para H.264 Baseline...");
                    return [4 /*yield*/, transcodeVideoH264(media.path, fileSize)];
                case 7:
                    tempTranscodedPath = _h.sent();
                    uploadPath = tempTranscodedPath;
                    uploadMimetype = "video/mp4";
                    mediaType = "video";
                    console.log("[WhatsAppOfficial][SendMediaOfficial] Transcodação concluída:", tempTranscodedPath);
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _h.sent();
                    console.warn("[WhatsAppOfficial][SendMediaOfficial] Transcodação falhou, usando original:", err_1.message);
                    return [3 /*break*/, 9];
                case 9:
                    form = new form_data_1["default"]();
                    form.append("messaging_product", "whatsapp");
                    form.append("type", uploadMimetype);
                    form.append("file", (0, fs_1.createReadStream)(uploadPath), {
                        filename: media.filename,
                        contentType: safeMimetype
                    });
                    _h.label = 10;
                case 10:
                    _h.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, client.post("".concat(connection.coexistencePhoneNumberId, "/media"), form, { headers: form.getHeaders() })];
                case 11:
                    uploadRes = _h.sent();
                    mediaId = uploadRes.data.id;
                    if (!mediaId)
                        throw new Error("ERR_OFFICIAL_NO_MEDIA_ID");
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _h.sent();
                    // Limpar arquivo transcodado em caso de erro
                    if (tempTranscodedPath && (0, fs_1.existsSync)(tempTranscodedPath)) {
                        (0, promises_1.unlink)(tempTranscodedPath)["catch"](function () { });
                    }
                    graphError = (0, graphApiHelper_1.extractGraphError)(error_1);
                    console.error("[WhatsAppOfficial][SendMediaOfficial] upload error", { message: graphError });
                    throw new Error("ERR_OFFICIAL_MEDIA_UPLOAD: ".concat(graphError));
                case 13:
                    // Limpar arquivo transcodado após upload bem-sucedido
                    if (tempTranscodedPath && (0, fs_1.existsSync)(tempTranscodedPath)) {
                        (0, promises_1.unlink)(tempTranscodedPath)["catch"](function () { });
                    }
                    toNumber = contact.number.replace(/\D/g, "");
                    if (!toNumber) {
                        throw new Error("ERR_OFFICIAL_INVALID_NUMBER");
                    }
                    messagePayload = (_c = {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: toNumber,
                            type: mediaType
                        },
                        _c[mediaType] = { id: mediaId },
                        _c);
                    if (quotedMsgWid) {
                        messagePayload.context = { message_id: quotedMsgWid };
                    }
                    if (body && (mediaType === "image" || mediaType === "video" || mediaType === "document")) {
                        messagePayload[mediaType].caption = body;
                    }
                    if (mediaType === "document") {
                        messagePayload[mediaType].filename = media.originalname || media.filename;
                    }
                    _h.label = 14;
                case 14:
                    _h.trys.push([14, 17, , 18]);
                    return [4 /*yield*/, client.post("".concat(connection.coexistencePhoneNumberId, "/messages"), messagePayload)];
                case 15:
                    response = _h.sent();
                    messageId = (_g = (_f = (_e = response.data) === null || _e === void 0 ? void 0 : _e.messages) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.id;
                    if (!messageId)
                        throw new Error("ERR_OFFICIAL_NO_MESSAGE_ID");
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: __assign({ wid: messageId, ticketId: ticketId, contactId: contact.id, body: body, fromMe: true, read: true, mediaType: mediaType, mediaUrl: media.filename }, (quotedMsgId && { quotedMsgId: quotedMsgId })),
                            companyId: connection.companyId
                        })];
                case 16:
                    newMessage = _h.sent();
                    return [2 /*return*/, newMessage];
                case 17:
                    error_2 = _h.sent();
                    graphError = (0, graphApiHelper_1.extractGraphError)(error_2);
                    console.error("[WhatsAppOfficial][SendMediaOfficial] send error", { message: graphError });
                    throw new Error("ERR_OFFICIAL_SEND_MEDIA: ".concat(graphError));
                case 18: return [2 /*return*/];
            }
        });
    });
};
exports.SendMediaOfficialService = SendMediaOfficialService;
