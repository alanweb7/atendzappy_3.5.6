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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var TestFlowBuilderService = function (_a) {
    var flowId = _a.flowId, message = _a.message, contactNumber = _a.contactNumber, contactName = _a.contactName, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var flow, flowData, responses, startNode, currentNode_1, processedNodes, maxNodes, flowState_1, _loop_1, state_1, error_1;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
        return __generator(this, function (_4) {
            switch (_4.label) {
                case 0:
                    _4.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                id: flowId,
                                company_id: companyId
                            }
                        })];
                case 1:
                    flow = _4.sent();
                    if (!flow) {
                        throw new AppError_1["default"]("Fluxo não encontrado", 404);
                    }
                    console.log("Fluxo encontrado: ".concat(flow.name));
                    // 2. Verificar se o fluxo está ativo
                    if (!flow.active) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Fluxo está inativo",
                                flowExecuted: false
                            }];
                    }
                    flowData = flow.flow ? JSON.parse(JSON.stringify(flow.flow)) : {};
                    if (!flowData.nodes || flowData.nodes.length === 0) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Fluxo não possui nós configurados",
                                flowExecuted: false
                            }];
                    }
                    console.log("Processando ".concat(flowData.nodes.length, " n\u00F3s do fluxo"));
                    console.log("Mensagem recebida: \"".concat(message, "\""));
                    responses = [];
                    startNode = flowData.nodes.find(function (node) { return node.type === "start"; });
                    if (!startNode) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Fluxo não possui nó inicial",
                                flowExecuted: false
                            }];
                    }
                    currentNode_1 = startNode;
                    processedNodes = 0;
                    maxNodes = 20;
                    flowState_1 = {
                        currentStep: 0,
                        userMessage: message.toLowerCase().trim(),
                        variables: flowData.variables || {},
                        lastNodeProcessed: startNode.id
                    };
                    _loop_1 = function () {
                        processedNodes++;
                        console.log("Processando n\u00F3: ".concat(currentNode_1.type, " - ID: ").concat(currentNode_1.id));
                        // Processar based on node type REAL
                        switch (currentNode_1.type) {
                            case "start":
                                responses.push("\uD83E\uDD16 *Bem-vindo ao fluxo ".concat(flow.name, "!*\n\n").concat(((_b = currentNode_1.data) === null || _b === void 0 ? void 0 : _b.label) || "Como posso ajudar?"));
                                break;
                            case "message":
                                var messageText = ((_c = currentNode_1.data) === null || _c === void 0 ? void 0 : _c.label) || "Mensagem padrão";
                                // Substituir variáveis se existir
                                var processedMessage = messageText.replace(/\{(\w+)\}/g, function (match, varName) {
                                    return flowState_1.variables[varName] || match;
                                });
                                responses.push(processedMessage);
                                break;
                            case "menu":
                                var menuOptions = ((_d = currentNode_1.data) === null || _d === void 0 ? void 0 : _d.options) || [];
                                if (menuOptions.length > 0) {
                                    var menuText = menuOptions.map(function (opt, idx) {
                                        return "".concat(idx + 1, ". ").concat(opt.text || opt.label);
                                    }).join("\n");
                                    responses.push("\uD83D\uDCCB *Menu de op\u00E7\u00F5es:*\n".concat(menuText, "\n\nDigite o n\u00FAmero da op\u00E7\u00E3o desejada."));
                                }
                                else {
                                    responses.push("📋 Menu sem opções configuradas.");
                                }
                                break;
                            case "question":
                                var questionText = ((_e = currentNode_1.data) === null || _e === void 0 ? void 0 : _e.question) || ((_f = currentNode_1.data) === null || _f === void 0 ? void 0 : _f.label) || "Por favor, responda:";
                                responses.push("\u2753 ".concat(questionText));
                                break;
                            case "condition":
                                // Avaliar condição REAL baseada na mensagem
                                var condition = (_g = currentNode_1.data) === null || _g === void 0 ? void 0 : _g.condition;
                                var conditionMet = false;
                                if (condition) {
                                    // Condições simples baseadas na mensagem
                                    if (condition.includes("sim") && flowState_1.userMessage.includes("sim")) {
                                        conditionMet = true;
                                    }
                                    else if (condition.includes("não") && flowState_1.userMessage.includes("nao")) {
                                        conditionMet = true;
                                    }
                                    else if (condition.includes("oi") && flowState_1.userMessage.includes("oi")) {
                                        conditionMet = true;
                                    }
                                    else if (condition.includes("1") && flowState_1.userMessage.includes("1")) {
                                        conditionMet = true;
                                    }
                                    else if (condition.includes("2") && flowState_1.userMessage.includes("2")) {
                                        conditionMet = true;
                                    }
                                }
                                responses.push("\uD83D\uDD0D *Condi\u00E7\u00E3o avaliada:* ".concat(condition, "\n\n*Resultado:* ").concat(conditionMet ? "✅ Verdadeiro" : "❌ Falso"));
                                break;
                            case "keywordCondition":
                                // Avaliar múltiplas palavras-chave
                                var keywordData = ((_h = currentNode_1.data) === null || _h === void 0 ? void 0 : _h.data) || currentNode_1.data;
                                var keywords = (keywordData === null || keywordData === void 0 ? void 0 : keywordData.keywords) || [];
                                var caseSensitive = (keywordData === null || keywordData === void 0 ? void 0 : keywordData.caseSensitive) || false;
                                var ignoreAccents = (keywordData === null || keywordData === void 0 ? void 0 : keywordData.ignoreAccents) || false;
                                var matchedKeyword = null;
                                var searchText = message.toLowerCase().trim();
                                if (ignoreAccents) {
                                    // Remover acentos para comparação
                                    searchText = searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                }
                                // Verificar cada palavra-chave
                                for (var i = 0; i < keywords.length; i++) {
                                    var keyword = keywords[i];
                                    if (!keyword.text)
                                        continue;
                                    var searchKeyword = keyword.text.toLowerCase().trim();
                                    if (ignoreAccents) {
                                        searchKeyword = searchKeyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                    }
                                    var keywordMatched = false;
                                    switch (parseInt(keyword.matchType)) {
                                        case 1: // Exato
                                            keywordMatched = searchText === searchKeyword;
                                            break;
                                        case 2: // Contém
                                            keywordMatched = searchText.includes(searchKeyword);
                                            break;
                                        case 3: // Começa com
                                            keywordMatched = searchText.startsWith(searchKeyword);
                                            break;
                                        case 4: // Termina com
                                            keywordMatched = searchText.endsWith(searchKeyword);
                                            break;
                                        default:
                                            keywordMatched = searchText.includes(searchKeyword);
                                    }
                                    if (keywordMatched) {
                                        matchedKeyword = keyword;
                                        break;
                                    }
                                }
                                if (matchedKeyword) {
                                    var matchTypeText = {
                                        1: "Exato",
                                        2: "Contém",
                                        3: "Começa com",
                                        4: "Termina com"
                                    }[matchedKeyword.matchType] || "Contém";
                                    responses.push("\uD83D\uDD0D *M\u00FAltiplas Palavras-chave*\n\n*Palavra encontrada:* \"".concat(matchedKeyword.text, "\"\n*Tipo:* ").concat(matchTypeText, "\n*Resultado:* \u2705 Direcionando para fluxo espec\u00EDfico"));
                                }
                                else {
                                    responses.push("\uD83D\uDD0D *M\u00FAltiplas Palavras-chave*\n\n*Nenhuma palavra-chave encontrada*\n*Resultado:* \u274C Usando fluxo padr\u00E3o");
                                }
                                break;
                            case "openai":
                            case "directOpenai":
                                var openAiPrompt = ((_j = currentNode_1.data) === null || _j === void 0 ? void 0 : _j.prompt) || ((_k = currentNode_1.data) === null || _k === void 0 ? void 0 : _k.label) || "Responda como assistente";
                                responses.push("\uD83E\uDD16 *Agente IA ativado*\n\n*Prompt:* ".concat(openAiPrompt, "\n\n*Sua mensagem:* \"").concat(message, "\"\n\n*(Em produ\u00E7\u00E3o, aqui seria a resposta real da OpenAI)*"));
                                break;
                            case "typebot":
                                var typebotUrl = ((_l = currentNode_1.data) === null || _l === void 0 ? void 0 : _l.url) || ((_m = currentNode_1.data) === null || _m === void 0 ? void 0 : _m.typebotId);
                                responses.push("\uD83E\uDD16 *TypeBot integrado*\n\n*URL:* ".concat(typebotUrl || "Não configurado", "\n\n*Sua mensagem:* \"").concat(message, "\"\n\n*(Em produ\u00E7\u00E3o, aqui seria a resposta real do TypeBot)*"));
                                break;
                            case "file":
                                var fileUrl = ((_o = currentNode_1.data) === null || _o === void 0 ? void 0 : _o.url) || "Arquivo não disponível";
                                responses.push("\uD83D\uDCCE *Arquivo enviado*\n\n".concat(((_p = currentNode_1.data) === null || _p === void 0 ? void 0 : _p.label) || "Arquivo", "\n\n*Link:* ").concat(fileUrl));
                                break;
                            case "img":
                            case "image":
                                var imageUrl = ((_q = currentNode_1.data) === null || _q === void 0 ? void 0 : _q.url) || "Imagem não disponível";
                                responses.push("\uD83D\uDDBC\uFE0F *Imagem enviada*\n\n".concat(((_r = currentNode_1.data) === null || _r === void 0 ? void 0 : _r.label) || "Imagem", "\n\n*Link:* ").concat(imageUrl));
                                break;
                            case "audio":
                                var audioUrl = ((_s = currentNode_1.data) === null || _s === void 0 ? void 0 : _s.url) || "Áudio não disponível";
                                responses.push("\uD83C\uDFB5 *\u00C1udio enviado*\n\n".concat(((_t = currentNode_1.data) === null || _t === void 0 ? void 0 : _t.label) || "Áudio", "\n\n*Link:* ").concat(audioUrl));
                                break;
                            case "video":
                                var videoUrl = ((_u = currentNode_1.data) === null || _u === void 0 ? void 0 : _u.url) || "Vídeo não disponível";
                                responses.push("\uD83C\uDFA5 *V\u00EDdeo enviado*\n\n".concat(((_v = currentNode_1.data) === null || _v === void 0 ? void 0 : _v.label) || "Vídeo", "\n\n*Link:* ").concat(videoUrl));
                                break;
                            case "interval":
                                var intervalTime = ((_w = currentNode_1.data) === null || _w === void 0 ? void 0 : _w.time) || "5";
                                responses.push("\u23F1\uFE0F *Intervalo de ".concat(intervalTime, " segundos*\n\n*(Em produ\u00E7\u00E3o, haveria uma pausa real)*"));
                                break;
                            case "randomizer":
                                var randomOptions = ((_x = currentNode_1.data) === null || _x === void 0 ? void 0 : _x.options) || ["Opção 1", "Opção 2"];
                                var randomIndex = Math.floor(Math.random() * randomOptions.length);
                                responses.push("\uD83C\uDFB2 *Randomizador*\n\n*Op\u00E7\u00E3o selecionada:* ".concat(randomOptions[randomIndex]));
                                break;
                            case "transferFlow":
                                var targetFlow = ((_y = currentNode_1.data) === null || _y === void 0 ? void 0 : _y.flowId) || "Não definido";
                                responses.push("\uD83D\uDD04 *Transfer\u00EAncia de fluxo*\n\n*Fluxo destino:* ".concat(targetFlow, "\n\n*(Em produ\u00E7\u00E3o, transferiria para o fluxo especificado)*"));
                                break;
                            case "apiRequest":
                                var apiUrl = ((_z = currentNode_1.data) === null || _z === void 0 ? void 0 : _z.url) || "Não definido";
                                responses.push("\uD83C\uDF10 *Requisi\u00E7\u00E3o API*\n\n*URL:* ".concat(apiUrl, "\n\n*Method:* ").concat(((_0 = currentNode_1.data) === null || _0 === void 0 ? void 0 : _0.method) || "GET", "\n\n*(Em produ\u00E7\u00E3o, faria a requisi\u00E7\u00E3o real)*"));
                                break;
                            case "addTag":
                                var tagName = ((_1 = currentNode_1.data) === null || _1 === void 0 ? void 0 : _1.tag) || "Não definida";
                                responses.push("\uD83C\uDFF7\uFE0F *Tag adicionada*\n\n*Tag:* ".concat(tagName, "\n\n*(Em produ\u00E7\u00E3o, adicionaria a tag ao contato)*"));
                                break;
                            case "closeTicket":
                                responses.push("\u2705 *Ticket encerrado*\n\n*(Em produ\u00E7\u00E3o, encerraria o ticket atual)*");
                                break;
                            default:
                                responses.push("\uD83D\uDCDD *N\u00F3 processado: ".concat(currentNode_1.type, "*\n\n").concat(((_2 = currentNode_1.data) === null || _2 === void 0 ? void 0 : _2.label) || "Sem configuração"));
                                break;
                        }
                        // Encontrar próximo nó baseado nas edges
                        var nextEdge = (_3 = flowData.edges) === null || _3 === void 0 ? void 0 : _3.find(function (edge) { return edge.source === currentNode_1.id; });
                        if (nextEdge) {
                            currentNode_1 = flowData.nodes.find(function (node) { return node.id === nextEdge.target; });
                        }
                        else {
                            return "break";
                        }
                    };
                    while (currentNode_1 && processedNodes < maxNodes) {
                        state_1 = _loop_1();
                        if (state_1 === "break")
                            break;
                    }
                    // 6. Retornar resultado
                    if (responses.length === 0) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Fluxo executado mas não gerou respostas",
                                flowExecuted: true
                            }];
                    }
                    return [2 /*return*/, {
                            success: true,
                            responses: responses,
                            flowExecuted: true,
                            response: responses[responses.length - 1],
                            currentNode: currentNode_1 === null || currentNode_1 === void 0 ? void 0 : currentNode_1.id
                        }];
                case 2:
                    error_1 = _4.sent();
                    console.error("Erro em TestFlowBuilderService:", error_1);
                    if (error_1 instanceof AppError_1["default"]) {
                        throw error_1;
                    }
                    return [2 /*return*/, {
                            success: false,
                            error: error_1.message || "Erro interno ao processar fluxo",
                            flowExecuted: false
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = TestFlowBuilderService;
