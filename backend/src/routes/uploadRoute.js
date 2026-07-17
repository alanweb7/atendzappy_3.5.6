"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var uploadRouter = (0, express_1.Router)();
// Configuração do multer para salvar na pasta /backend/public/uploads
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1["default"].join(__dirname, "../../public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    }
});
var upload = (0, multer_1["default"])({ storage: storage });
// Criar a rota para upload
uploadRouter.post("/upload", isAuth_1["default"], upload.single("file"), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "Nenhum arquivo enviado." });
    }
    var filePath = "/uploads/".concat(req.file.filename);
    return res.json({ success: true, filePath: filePath });
});
exports["default"] = uploadRouter;
