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
exports.ask = exports.summarize = exports.suggest = void 0;
var openai_1 = __importDefault(require("openai"));
var generative_ai_1 = require("@google/generative-ai");
var AiIntegrationSetting_1 = __importDefault(require("../models/AiIntegrationSetting"));
var Message_1 = __importDefault(require("../models/Message"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var Contact_1 = __importDefault(require("../models/Contact"));
var Queue_1 = __importDefault(require("../models/Queue"));
var User_1 = __importDefault(require("../models/User"));
var Produto_1 = __importDefault(require("../models/Produto"));
var Servico_1 = __importDefault(require("../models/Servico"));
var UserSchedule_1 = __importDefault(require("../models/UserSchedule"));
var logger_1 = __importDefault(require("../utils/logger"));
// Modelos padrão por provider — melhores para cada caso
var MODELS = {
    openai: "gpt-4o-mini",
    gemini: "gemini-2.0-flash",
    grok: "grok-2"
};
var buildPrompt = function (ctx) {
    var _a, _b;
    var contact = ctx.contact, ticket = ctx.ticket, messages = ctx.messages, produtos = ctx.produtos, servicos = ctx.servicos, agendas = ctx.agendas, currentText = ctx.currentText;
    var lines = [];
    lines.push("Você é um assistente de atendimento ao cliente. Seu papel é ajudar o atendente a responder mensagens de forma profissional, cordial e precisa.");
    lines.push("");
    // Contato
    lines.push("=== CONTATO ===");
    lines.push("Nome: ".concat((contact === null || contact === void 0 ? void 0 : contact.name) || "Desconhecido"));
    if (contact === null || contact === void 0 ? void 0 : contact.number)
        lines.push("Telefone: ".concat(contact.number));
    if (contact === null || contact === void 0 ? void 0 : contact.email)
        lines.push("Email: ".concat(contact.email));
    lines.push("");
    // Ticket
    lines.push("=== TICKET ===");
    lines.push("Status: ".concat((ticket === null || ticket === void 0 ? void 0 : ticket.status) || "open"));
    if ((_a = ticket === null || ticket === void 0 ? void 0 : ticket.queue) === null || _a === void 0 ? void 0 : _a.name)
        lines.push("Fila: ".concat(ticket.queue.name));
    if ((_b = ticket === null || ticket === void 0 ? void 0 : ticket.user) === null || _b === void 0 ? void 0 : _b.name)
        lines.push("Atendente: ".concat(ticket.user.name));
    lines.push("");
    // Produtos
    if (produtos.length > 0) {
        lines.push("=== PRODUTOS DA EMPRESA ===");
        produtos.slice(0, 20).forEach(function (p) {
            lines.push("- ".concat(p.nome, ": R$ ").concat(Number(p.valor).toFixed(2)).concat(p.descricao ? " | ".concat(p.descricao) : ""));
        });
        lines.push("");
    }
    // Serviços
    if (servicos.length > 0) {
        lines.push("=== SERVIÇOS DA EMPRESA ===");
        servicos.slice(0, 20).forEach(function (s) {
            var duracao = s.tempoAtendimento ? " | ".concat(s.tempoAtendimento, "min") : "";
            lines.push("- ".concat(s.nome, ": R$ ").concat(Number(s.valorOriginal).toFixed(2)).concat(duracao).concat(s.descricao ? " | ".concat(s.descricao) : ""));
        });
        lines.push("");
    }
    // Agendas
    if (agendas.length > 0) {
        lines.push("=== AGENDAS DISPONÍVEIS ===");
        agendas.forEach(function (a) {
            var _a;
            var userName = ((_a = a.user) === null || _a === void 0 ? void 0 : _a.name) || "Profissional";
            lines.push("- ".concat(a.name, " (").concat(userName, ")"));
        });
        lines.push("");
    }
    // Conversa
    lines.push("=== CONVERSA (últimas mensagens) ===");
    messages.forEach(function (m) {
        var origem = m.fromMe ? "[atendente]" : "[cliente]";
        var hora = new Date(m.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        lines.push("".concat(origem, " ").concat(hora, ": ").concat(m.body || "[".concat(m.mediaType || "mídia", "]")));
    });
    lines.push("");
    // Instrução
    if (currentText === null || currentText === void 0 ? void 0 : currentText.trim()) {
        lines.push("=== TAREFA ===");
        lines.push("Melhore o seguinte texto mantendo o mesmo sentido, tornando-o mais profissional e natural:");
        lines.push("\"".concat(currentText.trim(), "\""));
        lines.push("Responda APENAS com o texto melhorado, sem aspas, sem explicações.");
    }
    else {
        lines.push("=== TAREFA ===");
        lines.push("Gere uma resposta profissional e cordial para a última mensagem do cliente acima.");
        lines.push("Use as informações da empresa (produtos, serviços, agendas) quando relevante.");
        lines.push("Responda APENAS com o texto da mensagem, sem aspas, sem explicações.");
    }
    return lines.join("\n");
};
var suggest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, companyId, _a, requestedProvider, requestedModel, currentText, settings, order_1, setting, provider, apiKey, ticket, messages, sortedMessages, _b, produtos, servicos, agendas, prompt_1, suggestion, model, genAI, geminiModel, result, client, completion, client, completion, err_1;
    var _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                ticketId = req.params.ticketId;
                companyId = req.user.companyId;
                _a = req.body, requestedProvider = _a.provider, requestedModel = _a.model, currentText = _a.currentText;
                _j.label = 1;
            case 1:
                _j.trys.push([1, 12, , 13]);
                return [4 /*yield*/, AiIntegrationSetting_1["default"].findAll({
                        where: { companyId: companyId, active: true }
                    })];
            case 2:
                settings = _j.sent();
                if (settings.length === 0) {
                    return [2 /*return*/, res.status(400).json({ error: "Nenhuma IA configurada. Configure em Configurações → Integrações." })];
                }
                order_1 = ["openai", "gemini", "grok"];
                setting = requestedProvider
                    ? settings.find(function (s) { return s.provider === requestedProvider; })
                    : settings.sort(function (a, b) { return order_1.indexOf(a.provider) - order_1.indexOf(b.provider); })[0];
                if (!setting) {
                    setting = settings[0];
                }
                provider = setting.provider, apiKey = setting.apiKey;
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: ticketId, companyId: companyId },
                        include: [
                            { model: Contact_1["default"], as: "contact" },
                            { model: Queue_1["default"], as: "queue", attributes: ["id", "name"] },
                            { model: User_1["default"], as: "user", attributes: ["id", "name"] }
                        ]
                    })];
            case 3:
                ticket = _j.sent();
                if (!ticket)
                    return [2 /*return*/, res.status(404).json({ error: "Ticket não encontrado" })];
                return [4 /*yield*/, Message_1["default"].findAll({
                        where: { ticketId: ticketId, companyId: companyId },
                        order: [["createdAt", "DESC"]],
                        limit: 10,
                        attributes: ["id", "body", "fromMe", "mediaType", "createdAt"]
                    })];
            case 4:
                messages = _j.sent();
                sortedMessages = messages.reverse();
                return [4 /*yield*/, Promise.all([
                        Produto_1["default"].findAll({ where: { companyId: companyId }, attributes: ["nome", "valor", "descricao"], limit: 30 })["catch"](function () { return []; }),
                        Servico_1["default"].findAll({ where: { companyId: companyId }, attributes: ["nome", "valorOriginal", "descricao", "tempoAtendimento"], limit: 30 })["catch"](function () { return []; }),
                        UserSchedule_1["default"].findAll({
                            where: { companyId: companyId, active: true },
                            attributes: ["name"],
                            include: [{ model: User_1["default"], as: "user", attributes: ["name"] }],
                            limit: 10
                        })["catch"](function () { return []; })
                    ])];
            case 5:
                _b = _j.sent(), produtos = _b[0], servicos = _b[1], agendas = _b[2];
                prompt_1 = buildPrompt({
                    contact: ticket.contact,
                    ticket: ticket,
                    messages: sortedMessages,
                    produtos: produtos,
                    servicos: servicos,
                    agendas: agendas,
                    currentText: currentText
                });
                suggestion = "";
                model = requestedModel || MODELS[provider] || MODELS.openai;
                if (!(provider === "gemini")) return [3 /*break*/, 7];
                genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
                geminiModel = genAI.getGenerativeModel({ model: model });
                return [4 /*yield*/, geminiModel.generateContent(prompt_1)];
            case 6:
                result = _j.sent();
                suggestion = result.response.text().trim();
                return [3 /*break*/, 11];
            case 7:
                if (!(provider === "grok")) return [3 /*break*/, 9];
                client = new openai_1["default"]({ apiKey: apiKey, baseURL: "https://api.x.ai/v1" });
                return [4 /*yield*/, client.chat.completions.create({
                        model: model,
                        messages: [{ role: "user", content: prompt_1 }],
                        max_tokens: 500
                    })];
            case 8:
                completion = _j.sent();
                suggestion = ((_e = (_d = (_c = completion.choices[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.trim()) || "";
                return [3 /*break*/, 11];
            case 9:
                client = new openai_1["default"]({ apiKey: apiKey });
                return [4 /*yield*/, client.chat.completions.create({
                        model: model,
                        messages: [{ role: "user", content: prompt_1 }],
                        max_tokens: 500
                    })];
            case 10:
                completion = _j.sent();
                suggestion = ((_h = (_g = (_f = completion.choices[0]) === null || _f === void 0 ? void 0 : _f.message) === null || _g === void 0 ? void 0 : _g.content) === null || _h === void 0 ? void 0 : _h.trim()) || "";
                _j.label = 11;
            case 11: return [2 /*return*/, res.json({ result: suggestion, provider: provider })];
            case 12:
                err_1 = _j.sent();
                return [2 /*return*/, res.status(handleAiError(err_1).status).json({ error: handleAiError(err_1).msg })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.suggest = suggest;
// ────────── Helper: tratar erro de forma amigável ──────────
var handleAiError = function (err) {
    var _a, _b, _c, _d;
    logger_1["default"].error("[AiSuggestion] error: ".concat(err === null || err === void 0 ? void 0 : err.message));
    var status = (err === null || err === void 0 ? void 0 : err.status) || ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
    var rawMsg = (((_d = (_c = (_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) || (err === null || err === void 0 ? void 0 : err.message) || "").toLowerCase();
    var msg = "Erro ao processar. Tente novamente.";
    if (status === 401 || rawMsg.includes("incorrect api key") || rawMsg.includes("invalid api key"))
        msg = "API Key inválida. Verifique em Configurações → Integrações.";
    else if (status === 429 || rawMsg.includes("quota") || rawMsg.includes("rate limit") || rawMsg.includes("exceeded"))
        msg = "Limite da API atingido. Verifique o saldo/quota da sua conta no provedor de IA.";
    else if (status === 503 || rawMsg.includes("overloaded") || rawMsg.includes("unavailable"))
        msg = "Serviço de IA temporariamente indisponível. Tente novamente em instantes.";
    else if (rawMsg.includes("model") && rawMsg.includes("exist"))
        msg = "Modelo não disponível. Tente outro.";
    else if (rawMsg.includes("context length") || rawMsg.includes("token"))
        msg = "Conversa muito longa para processar. Reduza o histórico.";
    return { status: status >= 400 && status < 600 ? status : 500, msg: msg };
};
// ────────── Helper: chamar IA ──────────
var callAi = function (provider, apiKey, prompt, maxTokens) {
    if (maxTokens === void 0) { maxTokens = 1000; }
    return __awaiter(void 0, void 0, void 0, function () {
        var model, genAI, m, result, baseURL, client, completion;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    model = MODELS[provider] || MODELS.openai;
                    if (!(provider === "gemini")) return [3 /*break*/, 2];
                    genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
                    m = genAI.getGenerativeModel({ model: model });
                    return [4 /*yield*/, m.generateContent(prompt)];
                case 1:
                    result = _d.sent();
                    return [2 /*return*/, result.response.text().trim()];
                case 2:
                    baseURL = provider === "grok" ? "https://api.x.ai/v1" : undefined;
                    client = new openai_1["default"](__assign({ apiKey: apiKey }, (baseURL ? { baseURL: baseURL } : {})));
                    return [4 /*yield*/, client.chat.completions.create({
                            model: model,
                            messages: [{ role: "user", content: prompt }],
                            max_tokens: maxTokens
                        })];
                case 3:
                    completion = _d.sent();
                    return [2 /*return*/, ((_c = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) || ""];
            }
        });
    });
};
// ────────── Helper: buscar mensagens ──────────
var getMessages = function (ticketId, companyId, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var msgs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Message_1["default"].findAll({
                    where: { ticketId: ticketId, companyId: companyId },
                    order: [["createdAt", "DESC"]],
                    limit: limit,
                    attributes: ["id", "body", "fromMe", "mediaType", "createdAt"]
                })];
            case 1:
                msgs = _a.sent();
                return [2 /*return*/, msgs.reverse()];
        }
    });
}); };
// ────────── Resumir ──────────
var summarize = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, companyId, settings, setting, messages, conversation, prompt_2, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketId = req.params.ticketId;
                companyId = req.user.companyId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, AiIntegrationSetting_1["default"].findAll({ where: { companyId: companyId, active: true } })];
            case 2:
                settings = _a.sent();
                if (!settings.length)
                    return [2 /*return*/, res.status(400).json({ error: "Nenhuma IA configurada. Configure em Configurações → Integrações." })];
                setting = settings.sort(function (a, b) { return ["openai", "gemini", "grok"].indexOf(a.provider) - ["openai", "gemini", "grok"].indexOf(b.provider); })[0];
                return [4 /*yield*/, getMessages(ticketId, companyId, 100)];
            case 3:
                messages = _a.sent();
                if (!messages.length)
                    return [2 /*return*/, res.status(400).json({ error: "Sem mensagens para resumir." })];
                conversation = messages.map(function (m) {
                    var origem = m.fromMe ? "[atendente]" : "[cliente]";
                    var hora = new Date(m.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
                    return "".concat(origem, " ").concat(hora, ": ").concat(m.body || "[".concat(m.mediaType || "mídia", "]"));
                }).join("\n");
                prompt_2 = "Resuma a seguinte conversa de atendimento ao cliente de forma clara e objetiva, destacando:\n- Principais assuntos abordados\n- Solicita\u00E7\u00F5es/problemas do cliente\n- Solu\u00E7\u00F5es ou encaminhamentos dados\n- Status atual da conversa\n\nConversa:\n".concat(conversation, "\n\nForne\u00E7a o resumo em t\u00F3picos.");
                return [4 /*yield*/, callAi(setting.provider, setting.apiKey, prompt_2, 800)];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.json({ result: result, provider: setting.provider })];
            case 5:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(handleAiError(err_2).status).json({ error: handleAiError(err_2).msg })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.summarize = summarize;
// ────────── Perguntar à IA ──────────
var ask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, companyId, question, settings, setting, ticket, messages, conversation, prompt_3, result, err_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                ticketId = req.params.ticketId;
                companyId = req.user.companyId;
                question = req.body.question;
                if (!(question === null || question === void 0 ? void 0 : question.trim()))
                    return [2 /*return*/, res.status(400).json({ error: "Informe a pergunta." })];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, AiIntegrationSetting_1["default"].findAll({ where: { companyId: companyId, active: true } })];
            case 2:
                settings = _c.sent();
                if (!settings.length)
                    return [2 /*return*/, res.status(400).json({ error: "Nenhuma IA configurada. Configure em Configurações → Integrações." })];
                setting = settings.sort(function (a, b) { return ["openai", "gemini", "grok"].indexOf(a.provider) - ["openai", "gemini", "grok"].indexOf(b.provider); })[0];
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: ticketId, companyId: companyId },
                        include: [{ model: Contact_1["default"], as: "contact" }]
                    })];
            case 3:
                ticket = _c.sent();
                return [4 /*yield*/, getMessages(ticketId, companyId, 100)];
            case 4:
                messages = _c.sent();
                conversation = messages.map(function (m) {
                    var origem = m.fromMe ? "[atendente]" : "[cliente]";
                    var hora = new Date(m.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
                    return "".concat(origem, " ").concat(hora, ": ").concat(m.body || "[".concat(m.mediaType || "mídia", "]"));
                }).join("\n");
                prompt_3 = "Voc\u00EA tem acesso ao hist\u00F3rico completo de uma conversa de atendimento ao cliente.\n\nContato: ".concat(((_a = ticket === null || ticket === void 0 ? void 0 : ticket.contact) === null || _a === void 0 ? void 0 : _a.name) || "Desconhecido", " (").concat(((_b = ticket === null || ticket === void 0 ? void 0 : ticket.contact) === null || _b === void 0 ? void 0 : _b.number) || "", ")\n\nConversa (\u00FAltimas ").concat(messages.length, " mensagens):\n").concat(conversation, "\n\nPergunta do atendente: \"").concat(question.trim(), "\"\n\nResponda de forma direta e objetiva baseando-se apenas nas informa\u00E7\u00F5es da conversa acima.");
                return [4 /*yield*/, callAi(setting.provider, setting.apiKey, prompt_3, 600)];
            case 5:
                result = _c.sent();
                return [2 /*return*/, res.json({ result: result, provider: setting.provider })];
            case 6:
                err_3 = _c.sent();
                return [2 /*return*/, res.status(handleAiError(err_3).status).json({ error: handleAiError(err_3).msg })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.ask = ask;
