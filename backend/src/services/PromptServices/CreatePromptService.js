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
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Prompt_1 = __importDefault(require("../../models/Prompt"));
var ShowPromptService_1 = __importDefault(require("./ShowPromptService"));
var SavePromptToolSettingsService_1 = __importDefault(require("../PromptToolSettingService/SavePromptToolSettingsService"));
var CreatePromptService = function (promptData) { return __awaiter(void 0, void 0, void 0, function () {
    var name, apiKey, prompt, queueId, maxMessages, provider, model, companyId, toolsEnabled, knowledgeBase, promptSchema, err_1, promptTable, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CreatePromptService] Starting with promptData:", JSON.stringify(promptData, null, 2));
                name = promptData.name, apiKey = promptData.apiKey, prompt = promptData.prompt, queueId = promptData.queueId, maxMessages = promptData.maxMessages, provider = promptData.provider, model = promptData.model, companyId = promptData.companyId, toolsEnabled = promptData.toolsEnabled, knowledgeBase = promptData.knowledgeBase;
                console.log("[CreatePromptService] toolsEnabled:", toolsEnabled);
                promptSchema = Yup.object().shape({
                    name: Yup.string().required("ERR_PROMPT_NAME_INVALID"),
                    prompt: Yup.string().required("ERR_PROMPT_INTELLIGENCE_INVALID"),
                    apiKey: Yup.string().required("ERR_PROMPT_APIKEY_INVALID"),
                    queueId: Yup.number().required("ERR_PROMPT_QUEUEID_INVALID"),
                    maxMessages: Yup.number().required("ERR_PROMPT_MAX_MESSAGES_INVALID"),
                    provider: Yup.string().oneOf(['openai', 'gemini', 'grok']).required("ERR_PROMPT_PROVIDER_INVALID"),
                    model: Yup.string().required("ERR_PROMPT_MODEL_INVALID"),
                    companyId: Yup.number().required("ERR_PROMPT_companyId_INVALID")
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, promptSchema.validate({ name: name, apiKey: apiKey, prompt: prompt, queueId: queueId, maxMessages: maxMessages, provider: provider, model: model, companyId: companyId })];
            case 2:
                _a.sent();
                console.log("[CreatePromptService] Validation passed");
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("[CreatePromptService] Validation error:", err_1);
                throw new AppError_1["default"]("".concat(JSON.stringify(err_1, undefined, 2)));
            case 4: return [4 /*yield*/, Prompt_1["default"].create(__assign(__assign({}, promptData), { knowledgeBase: knowledgeBase || [] }))];
            case 5:
                promptTable = _a.sent();
                console.log("[CreatePromptService] Prompt created with id:", promptTable.id);
                console.log("[CreatePromptService] About to call SavePromptToolSettingsService with:", { companyId: companyId, promptId: promptTable.id, toolsEnabled: toolsEnabled });
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, (0, SavePromptToolSettingsService_1["default"])({
                        companyId: Number(companyId),
                        promptId: promptTable.id,
                        toolsEnabled: toolsEnabled
                    })];
            case 7:
                _a.sent();
                console.log("[CreatePromptService] SavePromptToolSettingsService completed successfully");
                return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                console.error("[CreatePromptService] Error in SavePromptToolSettingsService:", err_2);
                throw err_2;
            case 9: return [4 /*yield*/, (0, ShowPromptService_1["default"])({ promptId: promptTable.id, companyId: companyId })];
            case 10:
                promptTable = _a.sent();
                console.log("[CreatePromptService] Returning prompt with toolsEnabled:", promptTable.toolsEnabled);
                return [2 /*return*/, promptTable];
        }
    });
}); };
exports["default"] = CreatePromptService;
