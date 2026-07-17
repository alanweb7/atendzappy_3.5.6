"use strict";
exports.__esModule = true;
exports.listCatalogToolNames = exports.buildGeminiToolDeclarationsFromCatalog = exports.buildOpenAiToolDeclarationsFromCatalog = void 0;
var generative_ai_1 = require("@google/generative-ai");
var AiToolCatalog_1 = require("./AiToolCatalog");
var buildOpenAiToolDeclarationsFromCatalog = function () {
    return AiToolCatalog_1.AI_TOOL_CATALOG.filter(function (tool) { return tool.providers.includes("openai"); }).map(function (tool) { return ({
        type: "function",
        "function": {
            name: tool.name,
            description: tool.description,
            parameters: tool.openaiParameters || {
                type: "object",
                properties: {},
                additionalProperties: true
            }
        }
    }); });
};
exports.buildOpenAiToolDeclarationsFromCatalog = buildOpenAiToolDeclarationsFromCatalog;
var buildGeminiToolDeclarationsFromCatalog = function () {
    return AiToolCatalog_1.AI_TOOL_CATALOG.filter(function (tool) { return tool.providers.includes("gemini"); }).map(function (tool) { return ({
        name: tool.name,
        description: tool.description,
        parameters: tool.geminiParameters || {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    }); });
};
exports.buildGeminiToolDeclarationsFromCatalog = buildGeminiToolDeclarationsFromCatalog;
var listCatalogToolNames = function () { return AiToolCatalog_1.AI_TOOL_CATALOG.map(function (tool) { return tool.name; }); };
exports.listCatalogToolNames = listCatalogToolNames;
