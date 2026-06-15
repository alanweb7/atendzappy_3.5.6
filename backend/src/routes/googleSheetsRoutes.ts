import { Router } from "express";
import multer from "multer";
import path from "path";
import isAuth from "../middleware/isAuth";
import {
  getAuthUrl,
  oauthCallback,
  getStatus,
  disconnect,
  disconnectAccount,
  addSheet,
  removeSheet,
  updateSheet,
  listTabs,
  listDriveSheets,
  createSpreadsheet,
  previewSheet,
  importFile
} from "../controllers/GoogleSheetsController";

const upload = multer({
  dest: path.join(__dirname, "..", "..", "public", "uploads", "sheets"),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    const allowed = [".csv", ".xlsx", ".xls", ".ods"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

const router = Router();

// OAuth
router.get("/auth-url", isAuth, getAuthUrl);
router.get("/oauth-callback", oauthCallback);

// Status / contas
router.get("/status", isAuth, getStatus);
router.delete("/disconnect", isAuth, disconnect);
router.delete("/accounts/:id", isAuth, disconnectAccount);

// CRUD planilhas
router.post("/sheets", isAuth, addSheet);
router.put("/sheets/:id", isAuth, updateSheet);
router.delete("/sheets/:id", isAuth, removeSheet);
router.get("/sheets/:id/tabs", isAuth, listTabs);
router.get("/sheets/:id/preview", isAuth, previewSheet);

// Criar / importar
router.get("/drive-sheets", isAuth, listDriveSheets);
router.post("/create", isAuth, createSpreadsheet);
router.post("/import-file", isAuth, upload.single("file"), importFile);

export default router;
