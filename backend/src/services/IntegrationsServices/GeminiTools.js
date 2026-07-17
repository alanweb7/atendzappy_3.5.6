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
exports.__esModule = true;
exports.isValidGeminiTool = exports.parseGeminiToolCall = exports.getGeminiToolInstructions = exports.executeGeminiTool = exports.geminiTools = void 0;
var AiToolGenerators_1 = require("./AiToolGenerators");
// Definição das ferramentas para o Gemini (geradas a partir do catálogo)
exports.geminiTools = (0, AiToolGenerators_1.buildGeminiToolDeclarationsFromCatalog)();
// NOTA: As declarações das tools agora vêm do AiToolCatalog.ts (single source of truth)
// Para adicionar/modificar tools, edite AiToolCatalog.ts
// Função para executar as ferramentas do Gemini (reutiliza a lógica do OpenAI)
function executeGeminiTool(toolName, args, ticket, contact, availableTags, allQueues, allowedTools, wbot, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var executeOpenAiTool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./OpenAiTools")); })];
                case 1:
                    executeOpenAiTool = (_a.sent()).executeOpenAiTool;
                    return [2 /*return*/, executeOpenAiTool(toolName, args, ticket, contact, availableTags, allQueues, allowedTools, wbot, msg)];
            }
        });
    });
}
exports.executeGeminiTool = executeGeminiTool;
// Função para obter instruções sobre as ferramentas (formato Gemini)
function getGeminiToolInstructions(availableTags, queueNames) {
    return "\nFERRAMENTAS DISPON\u00CDVEIS NO GEMINI:\n\n1. FORMATAR MENSAGEM (format_message):\n   - Use para personalizar mensagens com vari\u00E1veis din\u00E2micas.\n   - Vari\u00E1veis dispon\u00EDveis:\n     * {{ms}} - Sauda\u00E7\u00E3o autom\u00E1tica (Bom dia/tarde/noite/madrugada)\n     * {{name}} / {{firstName}} - Nome completo ou primeiro nome do contato\n     * {{userName}} - Nome do atendente atual\n     * {{date}} - Data atual\n     * {{ticket_id}} - N\u00FAmero do chamado\n     * {{queue}} - Nome da fila/setor (configuradas: ".concat(queueNames.join(", ") || "nenhuma", ")\n     * {{connection}} - Nome da conex\u00E3o WhatsApp\n     * {{protocol}} - Protocolo \u00FAnico do atendimento\n     * {{hora}} - Hora atual (HH:MM:SS)\n   - Exemplo: \"{{ms}} {{firstName}}! Seu protocolo \u00E9 {{protocol}}\"\n\n2. EXECUTAR COMANDO (execute_command):\n   - \u00DANICA forma de transferir fila/usu\u00E1rio, adicionar tag, encerrar ticket ou enviar resposta r\u00E1pida via Gemini.\n   - Sempre use JSON entre #{ ... } com os IDs corretos:\n     * Transferir fila: #{ \"queueId\":\"5\" }\n     * Transferir para atendente: #{ \"queueId\":\"5\", \"userId\":\"12\" }\n     * Transfer\u00EAncia direta para usu\u00E1rio: #{ \"userId\":\"12\" }\n     * Adicionar tag: #{ \"tagId\":\"14\" }\n     * Encerrar ticket: #{ \"closeTicket\":\"1\" }\n     * Enviar resposta r\u00E1pida: #{ \"resp\":\"1\" } (ID da QuickMessage)\n     * Combinado: #{ \"queueId\":\"5\", \"userId\":\"12\", \"tagId\":\"14\" }\n   - Tags dispon\u00EDveis: ").concat(availableTags.join(", ") || "nenhuma", " (n\u00E3o invente novas).\n\n3. ENVIAR PRODUTO (send_product):\n   - Use para enviar informa\u00E7\u00F5es de produtos ao cliente\n   - Inclui imagem principal, galeria de imagens, nome, pre\u00E7o e descri\u00E7\u00E3o\n   - Evite reenviar o MESMO produto v\u00E1rias vezes\n\n4. OUTRAS FERRAMENTAS:\n   - like_message: Envia rea\u00E7\u00E3o/curtida\n   - send_emoji: Envia emoji\n   - send_contact_file: Envia arquivo do contato\n   - get_company_schedule: Obt\u00E9m hor\u00E1rio de funcionamento\n   - get_contact_schedules: Lista agendamentos\n   - create_contact_schedule: Cria agendamento\n   - update_contact_schedule: Atualiza agendamento\n   - get_contact_info: Obt\u00E9m dados do contato\n   - update_contact_info: Atualiza dados do contato\n   - get_company_groups: Lista grupos dispon\u00EDveis\n   - send_group_message: Envia mensagem para grupo\n   - list_professionals: Lista profissionais dispon\u00EDveis\n\nREGRAS IMPORTANTES:\n- Ferramentas antigas (transfer_queue, transfer_user, add_tag) foram removidas. Use execute_command com JSON.\n- Utilize somente IDs confirmados nas instru\u00E7\u00F5es personalizadas ou no prompt.\n- Se n\u00E3o tiver certeza do ID, pe\u00E7a confirma\u00E7\u00E3o antes de executar.\n- Use format_message para textos; execute_command para QUALQUER a\u00E7\u00E3o administrativa.\n");
}
exports.getGeminiToolInstructions = getGeminiToolInstructions;
// Função para converter resposta do Gemini para o formato esperado
function parseGeminiToolCall(functionCall) {
    return {
        name: functionCall.name,
        args: functionCall.args || {}
    };
}
exports.parseGeminiToolCall = parseGeminiToolCall;
// Função para validar se uma ferramenta existe
function isValidGeminiTool(toolName) {
    return exports.geminiTools.some(function (tool) { return tool.name === toolName; });
}
exports.isValidGeminiTool = isValidGeminiTool;
