import { Router } from "express";
import multer from "multer";
import isAuth from "../middleware/isAuth";
import * as EmailAccountController from "../controllers/EmailAccountController";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
const uploadAny = upload.any();

const emailRoutes = Router();

// Contas
emailRoutes.get("/email-accounts", isAuth, EmailAccountController.index);
emailRoutes.post("/email-accounts", isAuth, EmailAccountController.store);
emailRoutes.put("/email-accounts/:id", isAuth, EmailAccountController.update);
emailRoutes.delete("/email-accounts/:id", isAuth, EmailAccountController.remove);
emailRoutes.post("/email-accounts/test", isAuth, EmailAccountController.testConnection);
emailRoutes.put("/email-accounts/:id/toggle", isAuth, EmailAccountController.toggleConnection);

// Pastas
emailRoutes.get("/email-accounts/:id/folders", isAuth, EmailAccountController.listFolders);

// Emails
emailRoutes.get("/email-accounts/:id/emails", isAuth, EmailAccountController.listEmails);
emailRoutes.get("/email-accounts/:id/emails/:uid", isAuth, EmailAccountController.readEmail);
emailRoutes.post("/email-accounts/:id/emails/send", isAuth, uploadAny, EmailAccountController.sendEmail);
emailRoutes.put("/email-accounts/:id/emails/:uid/move", isAuth, EmailAccountController.moveEmail);
emailRoutes.delete("/email-accounts/:id/emails/:uid", isAuth, EmailAccountController.deleteEmail);

export default emailRoutes;
