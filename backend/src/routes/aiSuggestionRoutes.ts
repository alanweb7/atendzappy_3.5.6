import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { suggest, summarize, ask } from "../controllers/AiSuggestionController";

const aiSuggestionRoutes = Router();

aiSuggestionRoutes.post("/tickets/:ticketId/ai-suggestion", isAuth, suggest);
aiSuggestionRoutes.post("/tickets/:ticketId/ai-summarize", isAuth, summarize);
aiSuggestionRoutes.post("/tickets/:ticketId/ai-ask", isAuth, ask);

export default aiSuggestionRoutes;
