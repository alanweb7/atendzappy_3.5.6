import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as AiIntegrationController from "../controllers/AiIntegrationController";

const aiIntegrationRoutes = Router();

aiIntegrationRoutes.get("/ai-settings", isAuth, AiIntegrationController.index);
aiIntegrationRoutes.post("/ai-settings", isAuth, AiIntegrationController.upsert);
aiIntegrationRoutes.delete("/ai-settings/:provider", isAuth, AiIntegrationController.remove);

export default aiIntegrationRoutes;
