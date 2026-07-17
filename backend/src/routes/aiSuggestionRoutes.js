"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var AiSuggestionController_1 = require("../controllers/AiSuggestionController");
var aiSuggestionRoutes = (0, express_1.Router)();
aiSuggestionRoutes.post("/tickets/:ticketId/ai-suggestion", isAuth_1["default"], AiSuggestionController_1.suggest);
aiSuggestionRoutes.post("/tickets/:ticketId/ai-summarize", isAuth_1["default"], AiSuggestionController_1.summarize);
aiSuggestionRoutes.post("/tickets/:ticketId/ai-ask", isAuth_1["default"], AiSuggestionController_1.ask);
exports["default"] = aiSuggestionRoutes;
