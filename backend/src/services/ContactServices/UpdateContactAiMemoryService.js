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
var openai_1 = __importDefault(require("openai"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var logger_1 = __importDefault(require("../../utils/logger"));
var UpdateContactAiMemoryService = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, apiKey, currentMemory, recentMessages, client, systemPrompt, response, updatedMemory, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                contactId = params.contactId, companyId = params.companyId, apiKey = params.apiKey, currentMemory = params.currentMemory, recentMessages = params.recentMessages;
                if (!apiKey || recentMessages.length === 0)
                    return [2 /*return*/];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                client = new openai_1["default"]({ apiKey: apiKey });
                systemPrompt = "Voc\u00EA \u00E9 um sistema de mem\u00F3ria de IA. Sua fun\u00E7\u00E3o \u00E9 manter um resumo conciso e \u00FAtil sobre um contato com base nas conversas.\n\nRegras:\n- M\u00E1ximo 800 caracteres no total\n- Use bullet points curtos (\u2022)\n- Inclua: prefer\u00EAncias, assuntos discutidos, problemas, decis\u00F5es tomadas, informa\u00E7\u00F5es pessoais relevantes\n- Mantenha apenas o que \u00E9 \u00FAtil para futuras conversas\n- Remova informa\u00E7\u00F5es desatualizadas ou irrelevantes\n- Escreva em portugu\u00EAs\n\nMem\u00F3ria atual:\n".concat(currentMemory || "(sem memória ainda)", "\n\nNovas mensagens da conversa:\n").concat(recentMessages.map(function (m) { return "[".concat(m.role === "user" ? "Cliente" : "IA", "]: ").concat(m.content); }).join("\n"), "\n\nRetorne APENAS o resumo atualizado, sem explica\u00E7\u00F5es.");
                return [4 /*yield*/, client.chat.completions.create({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content: systemPrompt }],
                        max_tokens: 300,
                        temperature: 0.3
                    })];
            case 2:
                response = _d.sent();
                updatedMemory = (_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim();
                if (!updatedMemory)
                    return [2 /*return*/];
                return [4 /*yield*/, Contact_1["default"].update({ aiMemory: updatedMemory }, { where: { id: contactId, companyId: companyId } })];
            case 3:
                _d.sent();
                logger_1["default"].info("[AI][Memory] Mem\u00F3ria atualizada para contactId=".concat(contactId));
                return [3 /*break*/, 5];
            case 4:
                err_1 = _d.sent();
                logger_1["default"].error("[AI][Memory] Falha ao atualizar mem\u00F3ria do contactId=".concat(contactId, ":"), err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports["default"] = UpdateContactAiMemoryService;
