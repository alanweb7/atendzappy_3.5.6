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
exports.testFlow = exports.importFlow = exports.exportFlow = exports.FlowUploadAll = exports.FlowDuplicate = exports.FlowUploadAudio = exports.FlowUploadImg = exports.FlowDataGetOne = exports.FlowDataUpdate = exports.flowOne = exports.myFlows = exports.deleteFlow = exports.updateFlow = exports.createFlow = void 0;
var ListFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/ListFlowBuilderService"));
var CreateFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/CreateFlowBuilderService"));
var UpdateFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/UpdateFlowBuilderService"));
var DeleteFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/DeleteFlowBuilderService"));
var GetFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/GetFlowBuilderService"));
var FlowUpdateDataService_1 = __importDefault(require("../services/FlowBuilderService/FlowUpdateDataService"));
var FlowsGetDataService_1 = __importDefault(require("../services/FlowBuilderService/FlowsGetDataService"));
var UploadImgFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/UploadImgFlowBuilderService"));
var UploadAudioFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/UploadAudioFlowBuilderService"));
var DuplicateFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/DuplicateFlowBuilderService"));
var UploadAllFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/UploadAllFlowBuilderService"));
var ExportFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/ExportFlowBuilderService"));
var ImportFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/ImportFlowBuilderService"));
var fs_1 = __importDefault(require("fs"));
var TestFlowBuilderService_1 = __importDefault(require("../services/FlowBuilderService/TestFlowBuilderService"));
// import { handleMessage } from "../services/FacebookServices/facebookMessageListener";
var createFlow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, userId, companyId, flow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                userId = parseInt(req.user.id);
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateFlowBuilderService_1["default"])({
                        userId: userId,
                        name: name,
                        companyId: companyId
                    })];
            case 1:
                flow = _a.sent();
                if (flow === "exist") {
                    return [2 /*return*/, res.status(402).json("exist")];
                }
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.createFlow = createFlow;
var updateFlow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, flowId, name, flow;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, flowId = _a.flowId, name = _a.name;
                return [4 /*yield*/, (0, UpdateFlowBuilderService_1["default"])({ companyId: companyId, name: name, flowId: flowId })];
            case 1:
                flow = _b.sent();
                if (flow === 'exist') {
                    return [2 /*return*/, res.status(402).json('exist')];
                }
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.updateFlow = updateFlow;
var deleteFlow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFlow, flowIdInt, flow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idFlow = req.params.idFlow;
                flowIdInt = parseInt(idFlow);
                return [4 /*yield*/, (0, DeleteFlowBuilderService_1["default"])(flowIdInt)];
            case 1:
                flow = _a.sent();
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.deleteFlow = deleteFlow;
var myFlows = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, flows;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                console.log("[myFlows] Buscando fluxos para companyId: ".concat(companyId));
                return [4 /*yield*/, (0, ListFlowBuilderService_1["default"])({
                        companyId: companyId
                    })];
            case 1:
                flows = _b.sent();
                console.log("[myFlows] Fluxos encontrados: ".concat(((_a = flows.flows) === null || _a === void 0 ? void 0 : _a.length) || 0), flows);
                return [2 /*return*/, res.status(200).json(flows)];
        }
    });
}); };
exports.myFlows = myFlows;
var flowOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFlow, companyId, idFlowInt, webhook;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idFlow = req.params.idFlow;
                companyId = req.user.companyId;
                idFlowInt = parseInt(idFlow);
                return [4 /*yield*/, (0, GetFlowBuilderService_1["default"])({
                        companyId: companyId,
                        idFlow: idFlowInt
                    })];
            case 1:
                webhook = _a.sent();
                return [2 /*return*/, res.status(200).json(webhook)];
        }
    });
}); };
exports.flowOne = flowOne;
var FlowDataUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, bodyData, companyId, keys, webhook;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.user.id);
                bodyData = req.body;
                companyId = req.user.companyId;
                keys = Object.keys(bodyData);
                console.log(keys);
                return [4 /*yield*/, (0, FlowUpdateDataService_1["default"])({
                        companyId: companyId,
                        bodyData: bodyData
                    })];
            case 1:
                webhook = _a.sent();
                return [2 /*return*/, res.status(200).json(webhook)];
        }
    });
}); };
exports.FlowDataUpdate = FlowDataUpdate;
var FlowDataGetOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFlow, companyId, idFlowInt, webhook;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idFlow = req.params.idFlow;
                companyId = req.user.companyId;
                idFlowInt = parseInt(idFlow);
                return [4 /*yield*/, (0, FlowsGetDataService_1["default"])({
                        companyId: companyId,
                        idFlow: idFlowInt
                    })];
            case 1:
                webhook = _a.sent();
                return [2 /*return*/, res.status(200).json(webhook)];
        }
    });
}); };
exports.FlowDataGetOne = FlowDataGetOne;
var FlowUploadImg = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var medias, companyId, userId, nameFile, img;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                medias = req.files;
                companyId = req.user.companyId;
                userId = parseInt(req.user.id);
                if (medias.length === 0) {
                    return [2 /*return*/, res.status(400).json("No File")];
                }
                nameFile = medias[0].filename;
                if (medias[0].filename.split(".").length === 1) {
                    nameFile = medias[0].filename + "." + medias[0].mimetype.split("/")[1];
                }
                return [4 /*yield*/, (0, UploadImgFlowBuilderService_1["default"])({
                        userId: userId,
                        name: nameFile,
                        companyId: companyId
                    })];
            case 1:
                img = _a.sent();
                return [2 /*return*/, res.status(200).json(img)];
        }
    });
}); };
exports.FlowUploadImg = FlowUploadImg;
var FlowUploadAudio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var medias, companyId, userId, nameFile, img;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                medias = req.files;
                companyId = req.user.companyId;
                userId = parseInt(req.user.id);
                if (medias.length === 0) {
                    return [2 /*return*/, res.status(400).json("No File")];
                }
                nameFile = medias[0].filename;
                if (medias[0].filename.split(".").length === 1) {
                    nameFile = medias[0].filename + "." + medias[0].mimetype.split("/")[1];
                }
                return [4 /*yield*/, (0, UploadAudioFlowBuilderService_1["default"])({
                        userId: userId,
                        name: nameFile,
                        companyId: companyId
                    })];
            case 1:
                img = _a.sent();
                return [2 /*return*/, res.status(200).json(img)];
        }
    });
}); };
exports.FlowUploadAudio = FlowUploadAudio;
var FlowDuplicate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var flowId, newFlow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                flowId = req.body.flowId;
                return [4 /*yield*/, (0, DuplicateFlowBuilderService_1["default"])({ id: flowId })];
            case 1:
                newFlow = _a.sent();
                return [2 /*return*/, res.status(200).json(newFlow)];
        }
    });
}); };
exports.FlowDuplicate = FlowDuplicate;
var FlowUploadAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var medias, companyId, userId, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                medias = req.files;
                companyId = req.user.companyId;
                userId = parseInt(req.user.id);
                if (medias.length === 0) {
                    return [2 /*return*/, res.status(400).json("No File")];
                }
                return [4 /*yield*/, (0, UploadAllFlowBuilderService_1["default"])({
                        userId: userId,
                        medias: medias,
                        companyId: companyId
                    })];
            case 1:
                items = _a.sent();
                return [2 /*return*/, res.status(200).json(items)];
        }
    });
}); };
exports.FlowUploadAll = FlowUploadAll;
var exportFlow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFlow, companyId, idFlowInt, exportData, flowName, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idFlow = req.params.idFlow;
                companyId = req.user.companyId;
                idFlowInt = parseInt(idFlow);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, ExportFlowBuilderService_1["default"])({
                        companyId: companyId,
                        idFlow: idFlowInt
                    })];
            case 2:
                exportData = _a.sent();
                flowName = exportData.name.replace(/\s+/g, "_").toLowerCase();
                res.setHeader("Content-Disposition", "attachment; filename=".concat(flowName, "_export.json"));
                res.setHeader("Content-Type", "application/json");
                return [2 /*return*/, res.status(200).json(exportData)];
            case 3:
                error_1 = _a.sent();
                console.error("Erro ao exportar fluxo:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao exportar fluxo" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.exportFlow = exportFlow;
var importFlow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, importFile, fileContent, importData, newFlow, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.user.id);
                companyId = req.user.companyId;
                importFile = req.file;
                if (!importFile) {
                    return [2 /*return*/, res.status(400).json({ error: "Nenhum arquivo enviado" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("Processando arquivo de importa\u00E7\u00E3o: ".concat(importFile.originalname));
                fileContent = fs_1["default"].readFileSync(importFile.path, "utf8");
                // Remover o arquivo temporário após leitura (opcional, mas recomendado)
                fs_1["default"].unlinkSync(importFile.path);
                importData = void 0;
                try {
                    importData = JSON.parse(fileContent);
                    console.log("Dados de importa\u00E7\u00E3o JSON parseados com sucesso. Nome do fluxo: ".concat(importData.name));
                }
                catch (parseError) {
                    console.error("Erro ao fazer parse do arquivo JSON:", parseError);
                    return [2 /*return*/, res.status(400).json({ error: "Arquivo JSON inválido" })];
                }
                if (!importData || !importData.name || !importData.flow) {
                    console.error("Formato de dados inválido:", {
                        hasName: !!(importData === null || importData === void 0 ? void 0 : importData.name),
                        hasFlow: !!(importData === null || importData === void 0 ? void 0 : importData.flow)
                    });
                    return [2 /*return*/, res.status(400).json({ error: "Formato de dados inválido" })];
                }
                return [4 /*yield*/, (0, ImportFlowBuilderService_1["default"])({
                        userId: userId,
                        companyId: companyId,
                        importData: importData
                    })];
            case 2:
                newFlow = _a.sent();
                return [2 /*return*/, res.status(200).json(newFlow)];
            case 3:
                error_2 = _a.sent();
                console.error("Erro ao importar fluxo:", error_2);
                return [2 /*return*/, res
                        .status(500)
                        .json({ error: "Erro ao processar arquivo de importação" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.importFlow = importFlow;
var testFlow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFlow, _a, message, contactNumber, contactName, companyId, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                idFlow = req.params.idFlow;
                _a = req.body, message = _a.message, contactNumber = _a.contactNumber, contactName = _a.contactName;
                companyId = req.user.companyId;
                // Validar idFlow
                if (!idFlow || isNaN(parseInt(idFlow))) {
                    return [2 /*return*/, res.status(400).json({
                            error: "ID do fluxo inválido",
                            details: "O parâmetro idFlow deve ser um número válido"
                        })];
                }
                console.log("Testando fluxo ".concat(idFlow, " com mensagem: \"").concat(message, "\""));
                return [4 /*yield*/, (0, TestFlowBuilderService_1["default"])({
                        flowId: parseInt(idFlow),
                        message: message,
                        contactNumber: contactNumber,
                        contactName: contactName,
                        companyId: companyId
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json(result)];
            case 2:
                error_3 = _b.sent();
                console.error("Erro ao testar fluxo:", error_3);
                return [2 /*return*/, res.status(500).json({
                        error: "Erro ao testar fluxo",
                        details: error_3.message
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.testFlow = testFlow;
