import express from "express";
import isAuth from "../middleware/isAuth";
import multer from "multer";
import uploadConfig from "../config/upload";
import * as WhatsAppOfficialController from "../controllers/WhatsAppOfficialController";
import {
  officialMediaUpload,
  deleteOfficialMedia
} from "../services/WhatsAppOfficial/uploadMediaAttachment";

const whatsappOfficialRoutes = express.Router();
const upload = multer(uploadConfig);

// CRUD da conexão oficial
whatsappOfficialRoutes.get("/whatsapp-official/:whatsappId", isAuth, WhatsAppOfficialController.showOfficial);
whatsappOfficialRoutes.post("/whatsapp-official", isAuth, WhatsAppOfficialController.storeOfficial);
whatsappOfficialRoutes.put("/whatsapp-official/:whatsappId", isAuth, WhatsAppOfficialController.updateOfficial);
whatsappOfficialRoutes.delete("/whatsapp-official/:whatsappId", isAuth, WhatsAppOfficialController.removeOfficial);

// Envio de mensagens
whatsappOfficialRoutes.post(
  "/whatsapp-official/:ticketId/message",
  isAuth,
  upload.array("medias"),
  WhatsAppOfficialController.sendMessage
);

whatsappOfficialRoutes.post(
  "/whatsapp-official/:whatsappId/media-upload",
  isAuth,
  upload.array("medias"),
  officialMediaUpload
);

whatsappOfficialRoutes.delete(
  "/whatsapp-official/:whatsappId/media-upload",
  isAuth,
  deleteOfficialMedia
);

// Templates da Meta
whatsappOfficialRoutes.get(
  "/whatsapp-official/:whatsappId/templates",
  isAuth,
  WhatsAppOfficialController.listTemplates
);

// Verificar status real da conexão
whatsappOfficialRoutes.get(
  "/whatsapp-official/:id/check-status",
  isAuth,
  WhatsAppOfficialController.checkStatus
);

// Webhook do Meta (sem isAuth, pois é chamado pelo Facebook)
whatsappOfficialRoutes.get("/webhook/whatsapp-official", WhatsAppOfficialController.webhookOfficial);
whatsappOfficialRoutes.post("/webhook/whatsapp-official", WhatsAppOfficialController.webhookOfficial);

export default whatsappOfficialRoutes;
