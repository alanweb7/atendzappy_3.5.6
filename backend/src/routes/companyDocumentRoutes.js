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
var path_1 = __importDefault(require("path"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var CompanyDocumentController = __importStar(require("../controllers/CompanyDocumentController"));
var router = (0, express_1.Router)();
// Configuração do Multer para upload de arquivos
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        var uploadPath = path_1["default"].join(__dirname, "..", "..", "..", "public", "company-documents");
        // Criar diretório se não existir
        var fs = require('fs');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Gerar nome único para evitar conflitos
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        var ext = path_1["default"].extname(file.originalname);
        cb(null, "doc-".concat(uniqueSuffix).concat(ext));
    }
});
var upload = (0, multer_1["default"])({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        // Aceitar apenas tipos de arquivo comuns
        var allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'image/jpeg',
            'image/png',
            'image/gif',
            'text/plain',
            'application/zip',
            'application/x-zip-compressed'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Tipo de arquivo não permitido'));
        }
    }
});
// Rotas
router.get("/", isAuth_1["default"], CompanyDocumentController.index);
router.post("/", isAuth_1["default"], upload.single('file'), CompanyDocumentController.store);
router.get("/:id", isAuth_1["default"], CompanyDocumentController.show);
router.put("/:id", isAuth_1["default"], CompanyDocumentController.update);
router["delete"]("/:id", isAuth_1["default"], CompanyDocumentController.remove);
router.get("/:id/download", isAuth_1["default"], CompanyDocumentController.download);
exports["default"] = router;
