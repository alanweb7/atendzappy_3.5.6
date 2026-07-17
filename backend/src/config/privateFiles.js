"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var privateFolder = path_1["default"].resolve(__dirname, "..", "..", "private");
exports["default"] = {
    directory: privateFolder,
    storage: multer_1["default"].diskStorage({
        destination: privateFolder,
        filename: function (req, file, cb) {
            var fileName = new Date().getTime() + path_1["default"].extname(file.originalname);
            return cb(null, fileName);
        }
    })
};
