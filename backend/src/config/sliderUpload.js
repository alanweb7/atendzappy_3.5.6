"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getSliderRelativePath = void 0;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "public");
var sliderFolder = path_1["default"].resolve(publicFolder, "company1", "slider");
var ensureFolder = function () {
    if (!fs_1["default"].existsSync(sliderFolder)) {
        fs_1["default"].mkdirSync(sliderFolder, { recursive: true });
        fs_1["default"].chmodSync(sliderFolder, 511);
    }
};
var storage = multer_1["default"].diskStorage({
    destination: function (_req, _file, cb) {
        ensureFolder();
        cb(null, sliderFolder);
    },
    filename: function (_req, file, cb) {
        var sanitized = file.originalname.replace(/\s+/g, "_").replace(/\/+/, "-");
        var uniqueName = "".concat(Date.now(), "_").concat(sanitized);
        cb(null, uniqueName);
    }
});
var getSliderRelativePath = function (filename) { return "company1/slider/".concat(filename); };
exports.getSliderRelativePath = getSliderRelativePath;
exports["default"] = {
    storage: storage
};
