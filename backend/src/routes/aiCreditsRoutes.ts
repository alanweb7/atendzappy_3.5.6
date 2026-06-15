import express from "express";
import isAuth from "../middleware/isAuth";
import * as AiCreditsController from "../controllers/AiCreditsController";

const aiCreditsRoutes = express.Router();

// Provedores com chave do sistema configurada
aiCreditsRoutes.get("/ai-credits/system-providers", isAuth, AiCreditsController.systemProviders);

// Empresa logada
aiCreditsRoutes.get("/ai-credits/usage", isAuth, AiCreditsController.getUsage);
aiCreditsRoutes.get("/ai-credits/packages", isAuth, AiCreditsController.listPackages);
aiCreditsRoutes.post("/ai-credits/purchase/:packageId", isAuth, AiCreditsController.purchasePackage);
aiCreditsRoutes.get("/ai-credits/orders", isAuth, AiCreditsController.listOrders);
aiCreditsRoutes.get("/ai-credits/orders/:orderId/verify", isAuth, AiCreditsController.verifyOrder);

// Webhook público (InfinitePay não envia token)
aiCreditsRoutes.post("/ai-credits/webhook", AiCreditsController.webhook);

// Super admin
aiCreditsRoutes.post("/ai-credits/grant", isAuth, AiCreditsController.grantCredits);
aiCreditsRoutes.get("/ai-credits/admin/usage", isAuth, AiCreditsController.adminListUsage);
aiCreditsRoutes.post("/ai-credits/packages", isAuth, AiCreditsController.createPackage);
aiCreditsRoutes.put("/ai-credits/packages/:id", isAuth, AiCreditsController.updatePackage);
aiCreditsRoutes.delete("/ai-credits/packages/:id", isAuth, AiCreditsController.deletePackage);

export default aiCreditsRoutes;
