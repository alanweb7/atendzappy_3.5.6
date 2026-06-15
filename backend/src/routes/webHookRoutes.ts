import { Router } from "express";
import * as WebHooksController from "../controllers/WebHookController";
const webHooksRoutes = Router();

// Webhook global (retrocompatibilidade)
webHooksRoutes.get("/", WebHooksController.index);
webHooksRoutes.post("/", WebHooksController.webHook);

// Webhook por empresa — cada empresa configura a URL /webhook/facebook/:companyId no App da Meta
webHooksRoutes.get("/facebook/:companyId", WebHooksController.indexCompany);
webHooksRoutes.post("/facebook/:companyId", WebHooksController.webHook);

export default webHooksRoutes;
