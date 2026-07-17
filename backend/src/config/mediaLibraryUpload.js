"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var multer_1 = __importDefault(require("multer"));
var mediaLibraryPaths_1 = require("../utils/mediaLibraryPaths");
var sanitizeFileName = function (value) {
    return value.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "_");
};
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        var _a, _b;
        var companyId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.companyId;
        var folderId = Number((_b = req.params) === null || _b === void 0 ? void 0 : _b.folderId);
        if (!companyId || !folderId) {
            return cb(new Error("Informações da pasta inválidas."), "");
        }
        var targetPath = (0, mediaLibraryPaths_1.getCompanyMediaFolderPath)(companyId, folderId);
        (0, mediaLibraryPaths_1.ensureDirectory)(targetPath)
            .then(function () { return cb(null, targetPath); })["catch"](function (err) { return cb(err, ""); });
    },
    filename: function (req, file, cb) {
        var base = sanitizeFileName(file.originalname);
        var uniqueSuffix = Date.now();
        cb(null, "".concat(uniqueSuffix, "_").concat(base));
    }
});
exports["default"] = {
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB
    }
};
