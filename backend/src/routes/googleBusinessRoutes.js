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
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var GoogleBusinessController = __importStar(require("../controllers/GoogleBusinessController"));
var googleBusinessRoutes = (0, express_1.Router)();
// OAuth
googleBusinessRoutes.get("/google-business/oauth-url", isAuth_1["default"], GoogleBusinessController.getOAuthUrl);
googleBusinessRoutes.get("/google-business-callback", GoogleBusinessController.callback);
// Accounts
googleBusinessRoutes.get("/google-business/accounts", isAuth_1["default"], GoogleBusinessController.listAccounts);
googleBusinessRoutes["delete"]("/google-business/accounts/:id", isAuth_1["default"], GoogleBusinessController.deleteAccount);
// Reviews
googleBusinessRoutes.get("/google-business/accounts/:accountId/reviews", isAuth_1["default"], GoogleBusinessController.listReviews);
googleBusinessRoutes.put("/google-business/accounts/:accountId/reviews/:reviewId/reply", isAuth_1["default"], GoogleBusinessController.replyReview);
// Metrics
googleBusinessRoutes.get("/google-business/accounts/:accountId/metrics", isAuth_1["default"], GoogleBusinessController.getMetrics);
// Posts
googleBusinessRoutes.get("/google-business/accounts/:accountId/posts", isAuth_1["default"], GoogleBusinessController.listPosts);
googleBusinessRoutes.post("/google-business/accounts/:accountId/posts", isAuth_1["default"], GoogleBusinessController.createPost);
googleBusinessRoutes["delete"]("/google-business/accounts/:accountId/posts/:postName", isAuth_1["default"], GoogleBusinessController.deletePost);
// Business Info
googleBusinessRoutes.get("/google-business/accounts/:accountId/info", isAuth_1["default"], GoogleBusinessController.getBusinessInfo);
googleBusinessRoutes.patch("/google-business/accounts/:accountId/info", isAuth_1["default"], GoogleBusinessController.updateBusinessInfo);
exports["default"] = googleBusinessRoutes;
