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
var multer_1 = __importDefault(require("multer"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var EmailAccountController = __importStar(require("../controllers/EmailAccountController"));
var upload = (0, multer_1["default"])({ storage: multer_1["default"].memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
var uploadAny = upload.any();
var emailRoutes = (0, express_1.Router)();
// Contas
emailRoutes.get("/email-accounts", isAuth_1["default"], EmailAccountController.index);
emailRoutes.post("/email-accounts", isAuth_1["default"], EmailAccountController.store);
emailRoutes.put("/email-accounts/:id", isAuth_1["default"], EmailAccountController.update);
emailRoutes["delete"]("/email-accounts/:id", isAuth_1["default"], EmailAccountController.remove);
emailRoutes.post("/email-accounts/test", isAuth_1["default"], EmailAccountController.testConnection);
emailRoutes.put("/email-accounts/:id/toggle", isAuth_1["default"], EmailAccountController.toggleConnection);
// Pastas
emailRoutes.get("/email-accounts/:id/folders", isAuth_1["default"], EmailAccountController.listFolders);
// Emails
emailRoutes.get("/email-accounts/:id/emails", isAuth_1["default"], EmailAccountController.listEmails);
emailRoutes.get("/email-accounts/:id/emails/:uid", isAuth_1["default"], EmailAccountController.readEmail);
emailRoutes.post("/email-accounts/:id/emails/send", isAuth_1["default"], uploadAny, EmailAccountController.sendEmail);
emailRoutes.put("/email-accounts/:id/emails/:uid/move", isAuth_1["default"], EmailAccountController.moveEmail);
emailRoutes["delete"]("/email-accounts/:id/emails/:uid", isAuth_1["default"], EmailAccountController.deleteEmail);
exports["default"] = emailRoutes;
