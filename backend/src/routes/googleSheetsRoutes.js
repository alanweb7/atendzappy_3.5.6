"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var GoogleSheetsController_1 = require("../controllers/GoogleSheetsController");
var upload = (0, multer_1["default"])({
    dest: path_1["default"].join(__dirname, "..", "..", "public", "uploads", "sheets"),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: function (_req, file, cb) {
        var allowed = [".csv", ".xlsx", ".xls", ".ods"];
        var ext = path_1["default"].extname(file.originalname).toLowerCase();
        cb(null, allowed.includes(ext));
    }
});
var router = (0, express_1.Router)();
// OAuth
router.get("/auth-url", isAuth_1["default"], GoogleSheetsController_1.getAuthUrl);
router.get("/oauth-callback", GoogleSheetsController_1.oauthCallback);
// Status / contas
router.get("/status", isAuth_1["default"], GoogleSheetsController_1.getStatus);
router["delete"]("/disconnect", isAuth_1["default"], GoogleSheetsController_1.disconnect);
router["delete"]("/accounts/:id", isAuth_1["default"], GoogleSheetsController_1.disconnectAccount);
// CRUD planilhas
router.post("/sheets", isAuth_1["default"], GoogleSheetsController_1.addSheet);
router.put("/sheets/:id", isAuth_1["default"], GoogleSheetsController_1.updateSheet);
router["delete"]("/sheets/:id", isAuth_1["default"], GoogleSheetsController_1.removeSheet);
router.get("/sheets/:id/tabs", isAuth_1["default"], GoogleSheetsController_1.listTabs);
router.get("/sheets/:id/preview", isAuth_1["default"], GoogleSheetsController_1.previewSheet);
// Criar / importar
router.get("/drive-sheets", isAuth_1["default"], GoogleSheetsController_1.listDriveSheets);
router.post("/create", isAuth_1["default"], GoogleSheetsController_1.createSpreadsheet);
router.post("/import-file", isAuth_1["default"], upload.single("file"), GoogleSheetsController_1.importFile);
exports["default"] = router;
