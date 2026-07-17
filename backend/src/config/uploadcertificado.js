"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "certs");
exports["default"] = {
    directory: publicFolder,
    storage: multer_1["default"].diskStorage({
        destination: publicFolder,
        filename: function (req, file, cb) {
            var desiredFileName = req.query.ref + path_1["default"].extname(file.originalname);
            return cb(null, desiredFileName);
        }
    })
};
