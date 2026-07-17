"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "public");
var uploadFolder = path_1["default"].join(publicFolder, "uploads");
if (!fs_1["default"].existsSync(uploadFolder)) {
    fs_1["default"].mkdirSync(uploadFolder, { recursive: true });
}
var formatFileName = function (originalName) {
    var extension = path_1["default"].extname(originalName);
    var baseName = path_1["default"].basename(originalName, extension);
    var MAX_NAME_LENGTH = 30;
    if (baseName.length > MAX_NAME_LENGTH) {
        baseName = baseName.substring(0, MAX_NAME_LENGTH);
    }
    baseName = baseName.replace(/[^a-zA-Z0-9]/g, "_");
    baseName = baseName.replace(/_+/g, "_");
    baseName = baseName.replace(/^_|_$/g, "");
    return baseName;
};
exports["default"] = {
    directory: uploadFolder,
    storage: multer_1["default"].diskStorage({
        destination: uploadFolder,
        filename: function (req, file, cb) {
            var timestamp = new Date().getTime();
            var originalName = file.originalname;
            var extension = path_1["default"].extname(originalName).toLowerCase();
            if (!extension) {
                if (file.mimetype === "application/pdf")
                    extension = ".pdf";
                else if (file.mimetype.includes("spreadsheetml"))
                    extension = ".xlsx";
                else if (file.mimetype.includes("wordprocessingml"))
                    extension = ".docx";
                else if (file.mimetype.includes("msword"))
                    extension = ".doc";
                else if (file.mimetype.includes("ms-excel"))
                    extension = ".xls";
                else if (file.mimetype.includes("audio/"))
                    extension = ".mp3";
                else if (file.mimetype.split("/")[1])
                    extension = ".".concat(file.mimetype.split("/")[1]);
                else
                    extension = "";
            }
            var formattedName = formatFileName(originalName);
            var finalName = "".concat(formattedName, "_").concat(timestamp).concat(extension);
            return cb(null, finalName);
        }
    }),
    limits: {
        fileSize: 104857600 // 100MB em bytes
    }
};
