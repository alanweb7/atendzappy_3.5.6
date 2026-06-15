import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as GoogleBusinessController from "../controllers/GoogleBusinessController";

const googleBusinessRoutes = Router();

// OAuth
googleBusinessRoutes.get("/google-business/oauth-url", isAuth, GoogleBusinessController.getOAuthUrl);
googleBusinessRoutes.get("/google-business-callback", GoogleBusinessController.callback);

// Accounts
googleBusinessRoutes.get("/google-business/accounts", isAuth, GoogleBusinessController.listAccounts);
googleBusinessRoutes.delete("/google-business/accounts/:id", isAuth, GoogleBusinessController.deleteAccount);

// Reviews
googleBusinessRoutes.get("/google-business/accounts/:accountId/reviews", isAuth, GoogleBusinessController.listReviews);
googleBusinessRoutes.put("/google-business/accounts/:accountId/reviews/:reviewId/reply", isAuth, GoogleBusinessController.replyReview);

// Metrics
googleBusinessRoutes.get("/google-business/accounts/:accountId/metrics", isAuth, GoogleBusinessController.getMetrics);

// Posts
googleBusinessRoutes.get("/google-business/accounts/:accountId/posts", isAuth, GoogleBusinessController.listPosts);
googleBusinessRoutes.post("/google-business/accounts/:accountId/posts", isAuth, GoogleBusinessController.createPost);
googleBusinessRoutes.delete("/google-business/accounts/:accountId/posts/:postName", isAuth, GoogleBusinessController.deletePost);

// Business Info
googleBusinessRoutes.get("/google-business/accounts/:accountId/info", isAuth, GoogleBusinessController.getBusinessInfo);
googleBusinessRoutes.patch("/google-business/accounts/:accountId/info", isAuth, GoogleBusinessController.updateBusinessInfo);

export default googleBusinessRoutes;
