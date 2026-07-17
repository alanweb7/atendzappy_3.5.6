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
exports.downloadFiles = void 0;
var axios_1 = __importDefault(require("axios"));
var path_1 = require("path");
var promises_1 = require("fs/promises");
var file_type_1 = __importDefault(require("file-type"));
var convertFiles_1 = require("../../utils/convertFiles");
var showHubToken_1 = require("./showHubToken");
var _a = require("notificamehubsdk"), Client = _a.Client, FileContent = _a.FileContent;
var downloadFiles = function (_a) {
    var content = _a.content, connection = _a.connection;
    return __awaiter(void 0, void 0, void 0, function () {
        var fileUrl, fileMimeType, fileName, fileType, channel, companyId, notificameHubToken, client, channelClient, content_1, data_1, previousfilename, path, fileTypeResult_1, mimeType_1, type_1, filename_1, filePath_1, extension_1, originalname_1, media_1, data, type, filename, filePath, fileTypeResult, mimeType, extension, originalname, media, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileUrl = content.fileUrl, fileMimeType = content.fileMimeType, fileName = content.fileName, fileType = content.type;
                    channel = connection.channel, companyId = connection.companyId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 18, , 19]);
                    if (!channel.includes('whatsapp')) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, showHubToken_1.showHubToken)(connection.companyId.toString())];
                case 2:
                    notificameHubToken = _b.sent();
                    client = new Client(notificameHubToken);
                    return [4 /*yield*/, client.setChannel('whatsapp')];
                case 3:
                    channelClient = _b.sent();
                    content_1 = new FileContent(fileUrl, fileMimeType);
                    return [4 /*yield*/, channelClient.downloadMedia(connection.token, 'whatsapp', content_1)];
                case 4:
                    data_1 = _b.sent();
                    previousfilename = "".concat(new Date().getTime(), ".").concat(fileType);
                    path = (0, path_1.join)(__dirname, "..", "..", "..", "public", "company".concat(companyId), previousfilename);
                    return [4 /*yield*/, (0, promises_1.writeFile)(path, data_1, "binary")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, file_type_1["default"].fromFile(path)];
                case 6:
                    fileTypeResult_1 = _b.sent();
                    mimeType_1 = fileTypeResult_1.mime;
                    type_1 = fileTypeResult_1.ext;
                    filename_1 = "".concat(new Date().getTime(), ".").concat(type_1);
                    return [4 /*yield*/, (0, promises_1.rename)(path, (0, path_1.join)(__dirname, "..", "..", "..", "public", "company".concat(companyId), filename_1))];
                case 7:
                    _b.sent();
                    filePath_1 = "".concat(__dirname, "/../../../public/company").concat(companyId, "/").concat(filename_1);
                    if (!mimeType_1.includes('audio')) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, convertFiles_1.convertToMp3)({
                            path: filePath_1
                        })];
                case 8:
                    filePath_1 = _b.sent();
                    return [4 /*yield*/, file_type_1["default"].fromFile(filePath_1)];
                case 9:
                    fileTypeResult_1 = _b.sent();
                    mimeType_1 = fileTypeResult_1.mime;
                    filename_1 = "".concat(filename_1
                        .split(".")
                        .slice(0, -1)
                        .join("."), ".mp3");
                    _b.label = 10;
                case 10:
                    extension_1 = (0, path_1.extname)(filePath_1);
                    originalname_1 = fileName || fileUrl.split("/").pop();
                    media_1 = {
                        mimeType: mimeType_1,
                        extension: extension_1,
                        filename: filename_1,
                        data: data_1,
                        originalname: originalname_1
                    };
                    return [2 /*return*/, media_1];
                case 11: return [4 /*yield*/, axios_1["default"].get(fileUrl, {
                        responseType: "arraybuffer"
                    })];
                case 12:
                    data = (_b.sent()).data;
                    type = fileUrl.split("?")[0].split(".").pop();
                    type = type.replace(/\//g, '');
                    filename = "".concat(new Date().getTime(), ".").concat(type);
                    filePath = "".concat(__dirname, "/../../../public/company").concat(companyId, "/").concat(filename);
                    return [4 /*yield*/, (0, promises_1.writeFile)((0, path_1.join)(__dirname, "..", "..", "..", "public", "company".concat(companyId), filename), data, "base64")];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, file_type_1["default"].fromBuffer(data)];
                case 14:
                    fileTypeResult = _b.sent();
                    mimeType = fileTypeResult.mime;
                    if (!mimeType.includes('audio')) return [3 /*break*/, 17];
                    return [4 /*yield*/, (0, convertFiles_1.convertToMp3)({
                            path: filePath
                        })];
                case 15:
                    filePath = _b.sent();
                    return [4 /*yield*/, file_type_1["default"].fromFile(filePath)];
                case 16:
                    fileTypeResult = _b.sent();
                    mimeType = fileTypeResult.mime;
                    filename = "".concat(filename
                        .split(".")
                        .slice(0, -1)
                        .join("."), ".mp3");
                    _b.label = 17;
                case 17:
                    extension = (0, path_1.extname)(filePath);
                    originalname = fileUrl.split("/").pop();
                    media = {
                        mimeType: mimeType,
                        extension: extension,
                        filename: filename,
                        data: data,
                        originalname: originalname
                    };
                    return [2 /*return*/, media];
                case 18:
                    error_1 = _b.sent();
                    console.error("Erro ao processar a requisição:", error_1);
                    throw error_1; // Lança o erro para quem chama a função
                case 19: return [2 /*return*/];
            }
        });
    });
};
exports.downloadFiles = downloadFiles;
