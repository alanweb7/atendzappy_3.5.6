"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var ListSliderHomeService_1 = __importDefault(require("../services/SliderHomeService/ListSliderHomeService"));
var CreateSliderHomeService_1 = __importDefault(require("../services/SliderHomeService/CreateSliderHomeService"));
var ShowSliderHomeService_1 = __importDefault(require("../services/SliderHomeService/ShowSliderHomeService"));
var UpdateSliderHomeService_1 = __importDefault(require("../services/SliderHomeService/UpdateSliderHomeService"));
var DeleteSliderHomeService_1 = __importDefault(require("../services/SliderHomeService/DeleteSliderHomeService"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var sliderUpload_1 = require("../config/sliderUpload");
var MASTER_COMPANY_ID = 1;
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sliders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, ListSliderHomeService_1["default"])({ companyId: MASTER_COMPANY_ID })];
            case 1:
                sliders = _a.sent();
                return [2 /*return*/, res.json(sliders)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sliderId, slider;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sliderId = req.params.sliderId;
                return [4 /*yield*/, (0, ShowSliderHomeService_1["default"])(sliderId)];
            case 1:
                slider = _a.sent();
                return [2 /*return*/, res.json(slider)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, name, file, relativePath, slider;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                name = req.body.name;
                file = req.file;
                if (companyId !== MASTER_COMPANY_ID) {
                    throw new AppError_1["default"]("Apenas a empresa mestre pode criar banners", 403);
                }
                if (!file) {
                    throw new AppError_1["default"]("Imagem do banner é obrigatória", 400);
                }
                relativePath = (0, sliderUpload_1.getSliderRelativePath)(file.filename);
                console.log("[SliderHome][CREATE]", {
                    name: name,
                    originalName: file.originalname,
                    storedFile: file.filename,
                    diskPath: file.path,
                    relativePath: relativePath
                });
                return [4 /*yield*/, (0, CreateSliderHomeService_1["default"])({
                        name: name,
                        image: relativePath,
                        companyId: companyId
                    })];
            case 1:
                slider = _a.sent();
                return [2 /*return*/, res.status(201).json(slider)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, sliderId, name, file, imagePath, slider;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                sliderId = req.params.sliderId;
                name = req.body.name;
                file = req.file;
                if (file) {
                    imagePath = (0, sliderUpload_1.getSliderRelativePath)(file.filename);
                    console.log("[SliderHome][UPDATE]", {
                        sliderId: sliderId,
                        name: name,
                        originalName: file.originalname,
                        storedFile: file.filename,
                        diskPath: file.path,
                        relativePath: imagePath
                    });
                }
                else {
                    console.log("[SliderHome][UPDATE]", { sliderId: sliderId, name: name, message: "No new image uploaded" });
                }
                return [4 /*yield*/, (0, UpdateSliderHomeService_1["default"])({
                        id: sliderId,
                        name: name,
                        image: imagePath,
                        companyId: companyId
                    })];
            case 1:
                slider = _a.sent();
                return [2 /*return*/, res.json(slider)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, sliderId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                sliderId = req.params.sliderId;
                return [4 /*yield*/, (0, DeleteSliderHomeService_1["default"])({ id: sliderId, companyId: companyId })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Banner removido com sucesso" })];
        }
    });
}); };
exports.remove = remove;
