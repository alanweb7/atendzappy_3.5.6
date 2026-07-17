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
var FlowBuilder_1 = require("../../models/FlowBuilder");
var FlowImg_1 = require("../../models/FlowImg");
var FlowAudio_1 = require("../../models/FlowAudio");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var ImportFlowBuilderService = function (_a) {
    var userId = _a.userId, companyId = _a.companyId, importData = _a.importData;
    return __awaiter(void 0, void 0, void 0, function () {
        var urlMap, uploadsDir, _i, _b, fileInfo, fileExt, newFileName, filePath, fileBuffer, fileError_1, updatedFlow, flowName, existingFlow, newFlow, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 14, , 15]);
                    if (!importData || !importData.name || !importData.flow) {
                        throw new Error("Dados de importação inválidos");
                    }
                    urlMap = new Map();
                    if (!(importData.files && Array.isArray(importData.files))) return [3 /*break*/, 11];
                    uploadsDir = path_1["default"].join(__dirname, "../../../public/uploads");
                    if (!fs_1["default"].existsSync(uploadsDir)) {
                        fs_1["default"].mkdirSync(uploadsDir, { recursive: true });
                    }
                    _i = 0, _b = importData.files;
                    _c.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 11];
                    fileInfo = _b[_i];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 9, , 10]);
                    fileExt = path_1["default"].extname(fileInfo.originalName);
                    newFileName = "".concat((0, uuid_1.v4)()).concat(fileExt);
                    filePath = path_1["default"].join(__dirname, "../../../public/uploads", newFileName);
                    fileBuffer = Buffer.from(fileInfo.fileContent, "base64");
                    fs_1["default"].writeFileSync(filePath, fileBuffer);
                    urlMap.set(fileInfo.url, "uploads/".concat(newFileName));
                    if (!fileInfo.mimeType.startsWith("image/")) return [3 /*break*/, 4];
                    return [4 /*yield*/, FlowImg_1.FlowImgModel.create({
                            userId: userId,
                            companyId: companyId,
                            name: newFileName
                        })];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 4:
                    if (!fileInfo.mimeType.startsWith("audio/")) return [3 /*break*/, 6];
                    return [4 /*yield*/, FlowAudio_1.FlowAudioModel.create({
                            userId: userId,
                            companyId: companyId,
                            name: newFileName
                        })];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, FlowImg_1.FlowImgModel.create({
                        userId: userId,
                        companyId: companyId,
                        name: newFileName
                    })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    fileError_1 = _c.sent();
                    console.error("Erro ao processar arquivo importado:", fileError_1);
                    return [3 /*break*/, 10];
                case 10:
                    _i++;
                    return [3 /*break*/, 1];
                case 11:
                    updatedFlow = updateFileUrls(importData.flow, urlMap);
                    flowName = importData.name;
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                name: flowName,
                                company_id: companyId
                            }
                        })];
                case 12:
                    existingFlow = _c.sent();
                    if (existingFlow) {
                        flowName = "".concat(flowName, " (importado)");
                    }
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.create({
                            name: flowName,
                            user_id: userId,
                            company_id: companyId,
                            flow: updatedFlow,
                            active: true
                        })];
                case 13:
                    newFlow = _c.sent();
                    return [2 /*return*/, newFlow];
                case 14:
                    error_1 = _c.sent();
                    console.error("Erro ao importar fluxo:", error_1);
                    throw error_1;
                case 15: return [2 /*return*/];
            }
        });
    });
};
function updateFileUrls(flow, urlMap) {
    if (!flow || !flow.nodes) {
        console.warn("Flow inválido ou sem nós:", flow);
        return flow;
    }
    console.log("Atualizando URLs para ".concat(flow.nodes.length, " n\u00F3s"));
    var updatedNodes = flow.nodes.map(function (node) {
        var updatedNode = __assign({}, node);
        if (node.type === "file" && node.data.url && urlMap.has(node.data.url)) {
            console.log("Atualizando URL para n\u00F3 de arquivo: ".concat(node.data.url, " -> ").concat(urlMap.get(node.data.url)));
            updatedNode.data = __assign(__assign({}, node.data), { url: urlMap.get(node.data.url) });
        }
        else if (node.type === "img" &&
            node.data.url &&
            urlMap.has(node.data.url)) {
            updatedNode.data = __assign(__assign({}, node.data), { url: urlMap.get(node.data.url) });
        }
        else if (node.type === "audio" &&
            node.data.url &&
            urlMap.has(node.data.url)) {
            updatedNode.data = __assign(__assign({}, node.data), { url: urlMap.get(node.data.url) });
        }
        else if (node.type === "video" &&
            node.data.url &&
            urlMap.has(node.data.url)) {
            updatedNode.data = __assign(__assign({}, node.data), { url: urlMap.get(node.data.url) });
        }
        else if (node.type === "singleBlock") {
            if (node.data.files && Array.isArray(node.data.files)) {
                updatedNode.data.files = node.data.files.map(function (file) {
                    if (file.url && urlMap.has(file.url)) {
                        return __assign(__assign({}, file), { url: urlMap.get(file.url) });
                    }
                    return file;
                });
            }
            if (node.data.images && Array.isArray(node.data.images)) {
                updatedNode.data.images = node.data.images.map(function (img) {
                    if (img.url && urlMap.has(img.url)) {
                        return __assign(__assign({}, img), { url: urlMap.get(img.url) });
                    }
                    return img;
                });
            }
            if (node.data.audios && Array.isArray(node.data.audios)) {
                updatedNode.data.audios = node.data.audios.map(function (audio) {
                    if (audio.url && urlMap.has(audio.url)) {
                        return __assign(__assign({}, audio), { url: urlMap.get(audio.url) });
                    }
                    return audio;
                });
            }
        }
        return updatedNode;
    });
    return __assign(__assign({}, flow), { nodes: updatedNodes });
}
exports["default"] = ImportFlowBuilderService;
