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
var FlowBuilder_1 = require("../../models/FlowBuilder");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var mime_types_1 = __importDefault(require("mime-types"));
var ExportFlowBuilderService = function (_a) {
    var companyId = _a.companyId, idFlow = _a.idFlow;
    return __awaiter(void 0, void 0, void 0, function () {
        var flow, exportData, fileUrls, _i, fileUrls_1, url, fileName, filePath, fileContent, mimeType, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                id: idFlow,
                                company_id: companyId
                            }
                        })];
                case 1:
                    flow = _b.sent();
                    if (!flow) {
                        throw new Error("Fluxo não encontrado");
                    }
                    exportData = {
                        name: flow.name,
                        flow: flow.flow,
                        files: []
                    };
                    if (!flow.flow) {
                        return [2 /*return*/, exportData];
                    }
                    fileUrls = extractFileUrls(flow.flow);
                    for (_i = 0, fileUrls_1 = fileUrls; _i < fileUrls_1.length; _i++) {
                        url = fileUrls_1[_i];
                        try {
                            fileName = url.replace(/^uploads\//, "");
                            filePath = path_1["default"].join(__dirname, "../../../public/uploads", fileName);
                            if (fs_1["default"].existsSync(filePath)) {
                                try {
                                    fileContent = fs_1["default"].readFileSync(filePath, {
                                        encoding: "base64"
                                    });
                                    mimeType = getMimeType(fileName);
                                    exportData.files.push({
                                        originalName: fileName,
                                        url: url,
                                        fileContent: fileContent,
                                        mimeType: mimeType
                                    });
                                }
                                catch (readError) {
                                    console.error("Erro ao ler o arquivo ".concat(fileName, ":"), readError);
                                }
                            }
                            else {
                                console.warn("Arquivo n\u00E3o encontrado: ".concat(filePath));
                            }
                        }
                        catch (fileError) {
                            console.error("Erro ao processar arquivo ".concat(url, ":"), fileError);
                        }
                    }
                    return [2 /*return*/, exportData];
                case 2:
                    error_1 = _b.sent();
                    console.error("Erro ao exportar fluxo:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
function extractFileUrls(flow) {
    var urls = [];
    console.log("Iniciando extração de URLs...");
    if (flow && flow.nodes) {
        flow.nodes.forEach(function (node) {
            if ((node.type === "file" ||
                node.type === "img" ||
                node.type === "audio" ||
                node.type === "video") &&
                node.data.url) {
                console.log("[".concat(node.type, "] URL encontrada: ").concat(node.data.url));
                urls.push(node.data.url);
            }
            else if (node.type === "singleBlock" &&
                node.data &&
                node.data.elements &&
                Array.isArray(node.data.elements)) {
                console.log("[singleBlock] Processando ".concat(node.data.elements.length, " elementos..."));
                node.data.elements.forEach(function (element) {
                    if ((element.type === "file" ||
                        element.type === "img" ||
                        element.type === "audio" ||
                        element.type === "video") &&
                        element.value) {
                        var potentialUrl = "uploads/".concat(element.value);
                        console.log("[singleBlock] Elemento tipo ".concat(element.type, ", URL constru\u00EDda: ").concat(potentialUrl));
                        urls.push(potentialUrl);
                    }
                });
            }
        });
    }
    console.log("URLs extraídas final:", urls);
    return urls;
}
function getMimeType(fileName) {
    var mimeType = mime_types_1["default"].lookup(fileName);
    return mimeType || "application/octet-stream";
}
exports["default"] = ExportFlowBuilderService;
