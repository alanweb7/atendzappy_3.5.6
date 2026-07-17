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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var AiCreditsController = __importStar(require("../controllers/AiCreditsController"));
var aiCreditsRoutes = express_1["default"].Router();
// Provedores com chave do sistema configurada
aiCreditsRoutes.get("/ai-credits/system-providers", isAuth_1["default"], AiCreditsController.systemProviders);
// Empresa logada
aiCreditsRoutes.get("/ai-credits/usage", isAuth_1["default"], AiCreditsController.getUsage);
aiCreditsRoutes.get("/ai-credits/packages", isAuth_1["default"], AiCreditsController.listPackages);
aiCreditsRoutes.post("/ai-credits/purchase/:packageId", isAuth_1["default"], AiCreditsController.purchasePackage);
aiCreditsRoutes.get("/ai-credits/orders", isAuth_1["default"], AiCreditsController.listOrders);
aiCreditsRoutes.get("/ai-credits/orders/:orderId/verify", isAuth_1["default"], AiCreditsController.verifyOrder);
// Webhook público (InfinitePay não envia token)
aiCreditsRoutes.post("/ai-credits/webhook", AiCreditsController.webhook);
// Super admin
aiCreditsRoutes.post("/ai-credits/grant", isAuth_1["default"], AiCreditsController.grantCredits);
aiCreditsRoutes.get("/ai-credits/admin/usage", isAuth_1["default"], AiCreditsController.adminListUsage);
aiCreditsRoutes.post("/ai-credits/packages", isAuth_1["default"], AiCreditsController.createPackage);
aiCreditsRoutes.put("/ai-credits/packages/:id", isAuth_1["default"], AiCreditsController.updatePackage);
aiCreditsRoutes["delete"]("/ai-credits/packages/:id", isAuth_1["default"], AiCreditsController.deletePackage);
exports["default"] = aiCreditsRoutes;
