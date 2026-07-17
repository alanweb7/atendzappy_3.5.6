"use strict";
exports.__esModule = true;
exports.buildAiToolingPromptSection = void 0;
var AiToolCatalog_1 = require("./AiToolCatalog");
var buildAiToolingPromptSection = function (args) {
    var providerInstructions = args.provider === "gemini"
        ? args.getGeminiToolInstructions(args.availableTags, args.availableQueues)
        : args.getToolInstructions(args.availableTags, args.availableQueues);
    var ferramentasText = (args.availableFerramentas || [])
        .map(function (f) {
        var placeholders = Array.isArray(f.placeholders) ? f.placeholders : [];
        return "- Nome: ".concat(f.nome, " | M\u00E9todo: ").concat(f.metodo, " | URL: ").concat(f.url, " | Placeholders: ").concat(JSON.stringify(placeholders), " | Descri\u00E7\u00E3o: ").concat(f.descricao || "(sem descrição)");
    })
        .join("\n");
    // Gerar instruções das tools dinamicamente a partir do catálogo
    var toolsInstructions = AiToolCatalog_1.AI_TOOL_CATALOG
        .map(function (tool, index) {
        return "".concat(index + 1, ") ").concat(tool.name, "\nQuando usar: ").concat(tool.whenToUse, "\nComo usar: ").concat(tool.howToUse);
    })
        .join("\n\n");
    // Gerar lista detalhada de filas com IDs
    var queuesList = (args.availableQueues || [])
        .map(function (queue) { return "- ID: ".concat(queue.id, " | Nome: \"").concat(queue.name, "\" | Cor: ").concat(queue.color || "(sem cor)"); })
        .join("\n");
    // Gerar lista detalhada de usuários com IDs
    var usersList = (args.availableUsers || [])
        .map(function (user) { return "- ID: ".concat(user.id, " | Nome: \"").concat(user.name, "\" | Email: ").concat(user.email || "(sem email)"); })
        .join("\n");
    return "\uD83D\uDD27 FERRAMENTAS DISPON\u00CDVEIS (FUNCTIONS/TOOLS)\n\nREGRAS GERAIS (OBRIGAT\u00D3RIO):\n1) Voc\u00EA s\u00F3 pode executar UMA tool se a a\u00E7\u00E3o estiver permitida/solicitada nas INSTRU\u00C7\u00D5ES PERSONALIZADAS do prompt (definidas no frontend). Se n\u00E3o estiver pedido l\u00E1, N\u00C3O execute.\n2) Se voc\u00EA executar uma tool, NUNCA informe o cliente que executou (isso \u00E9 uma a\u00E7\u00E3o interna). Apenas continue a conversa normalmente.\n3) Se a a\u00E7\u00E3o for necess\u00E1ria e estiver pedida/permitida nas instru\u00E7\u00F5es personalizadas, execute imediatamente (sem enrolar).\n4) Nunca escreva \"A\u00E7\u00E3o:\" ou \"Estou executando\u2026\".\n5) SE UM ID N\u00C3O FOR ENCONTRADO, verifique nas listas abaixo o ID correto antes de tentar novamente.\n\nTOOLS (quando usar / como usar):\n\n".concat(toolsInstructions, "\n\n\uD83D\uDCCB RECURSOS DISPON\u00CDVEIS COM IDs:\n\nFILAS (queueId):\n").concat(queuesList, "\n\nUSU\u00C1RIOS (userId):\n").concat(usersList, "\n\nTags dispon\u00EDveis: ").concat(JSON.stringify(args.availableTags), "\nProdutos dispon\u00EDveis: ").concat(JSON.stringify(args.availableProdutos), "\nFerramentas dispon\u00EDveis (APIs externas):\n").concat(ferramentasText, "\n\n\u26A0\uFE0F IMPORTANTE: Use os IDs exatos das listas acima. Se n\u00E3o encontrar um ID, verifique se h\u00E1 um ID similar correto nas listas.\n\nObserva\u00E7\u00E3o: para hor\u00E1rios de funcionamento e agendamentos do contato, utilize as fun\u00E7\u00F5es get_company_schedule, get_contact_schedules, create_contact_schedule e update_contact_schedule quando necess\u00E1rio.\n\n").concat(providerInstructions);
};
exports.buildAiToolingPromptSection = buildAiToolingPromptSection;
