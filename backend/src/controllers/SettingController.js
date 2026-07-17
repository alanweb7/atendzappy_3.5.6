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
exports.storePrivateFile = exports.certUpload = exports.deleteDashboardImage = exports.storeLogo = exports.publicShow = exports.getPrivacyPolicy = exports.updateOne = exports.getSetting = exports.update = exports.showOne = exports.index = void 0;
var socket_1 = require("../libs/socket");
var AppError_1 = __importDefault(require("../errors/AppError"));
var lodash_1 = require("lodash");
var User_1 = __importDefault(require("../models/User"));
var UpdateSettingService_1 = __importDefault(require("../services/SettingServices/UpdateSettingService"));
var ListSettingsService_1 = __importDefault(require("../services/SettingServices/ListSettingsService"));
var ListSettingsServiceOne_1 = __importDefault(require("../services/SettingServices/ListSettingsServiceOne"));
var GetSettingService_1 = __importDefault(require("../services/SettingServices/GetSettingService"));
var UpdateOneSettingService_1 = __importDefault(require("../services/SettingServices/UpdateOneSettingService"));
var GetPublicSettingService_1 = __importDefault(require("../services/SettingServices/GetPublicSettingService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, settings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListSettingsService_1["default"])({ companyId: companyId })];
            case 1:
                settings = _a.sent();
                return [2 /*return*/, res.status(200).json(settings)];
        }
    });
}); };
exports.index = index;
var showOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, key, settingsTransfTicket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                key = req.params.settingKey;
                console.log("|======== GetPublicSettingService ========|");
                console.log("key", key);
                console.log("|=========================================|");
                return [4 /*yield*/, (0, ListSettingsServiceOne_1["default"])({ companyId: companyId, key: key })];
            case 1:
                settingsTransfTicket = _a.sent();
                return [2 /*return*/, res.status(200).json(settingsTransfTicket)];
        }
    });
}); };
exports.showOne = showOne;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, value, companyId, setting, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                key = req.params.settingKey;
                value = req.body.value;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateSettingService_1["default"])({
                        key: key,
                        value: value,
                        companyId: companyId
                    })];
            case 1:
                setting = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-settings"), {
                    action: "update",
                    setting: setting
                });
                return [2 /*return*/, res.status(200).json(setting)];
        }
    });
}); };
exports.update = update;
var getSetting = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, setting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = req.params.settingKey;
                return [4 /*yield*/, (0, GetSettingService_1["default"])({ key: key })];
            case 1:
                setting = _a.sent();
                return [2 /*return*/, res.status(200).json(setting)];
        }
    });
}); };
exports.getSetting = getSetting;
var updateOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, value, companyId, setting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = req.params.settingKey;
                value = req.body.value;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateOneSettingService_1["default"])({
                        key: key,
                        value: value,
                        companyId: companyId
                    })];
            case 1:
                setting = _a.sent();
                return [2 /*return*/, res.status(200).json(setting)];
        }
    });
}); };
exports.updateOne = updateOne;
var getPrivacyPolicy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, GetPublicSettingService_1["default"])({ key: "privacyText" })];
            case 1:
                value = _a.sent();
                return [2 /*return*/, res.status(200).json({ value: value || "" })];
        }
    });
}); };
exports.getPrivacyPolicy = getPrivacyPolicy;
var publicShow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, settingValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("|=============== publicShow  ==============|");
                key = req.params.settingKey;
                return [4 /*yield*/, (0, GetPublicSettingService_1["default"])({ key: key })];
            case 1:
                settingValue = _a.sent();
                return [2 /*return*/, res.status(200).json(settingValue)];
        }
    });
}); };
exports.publicShow = publicShow;
var storeLogo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, _a, mode, typeArch, companyId, validModes, settingKey, setting;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                file = req.file;
                _a = req.body, mode = _a.mode, typeArch = _a.typeArch;
                companyId = req.user.companyId;
                validModes = ["Light", "Dark", "Favicon", "Loading", "Image", "image-1", "image-2", "image-3"];
                console.log("|=============== storeLogo  ==============|", exports.storeLogo);
                if (validModes.indexOf(mode) === -1) {
                    return [2 /*return*/, res.status(406)];
                }
                if (!(file && file.mimetype.startsWith("image/"))) return [3 /*break*/, 2];
                settingKey = void 0;
                // Se for imagem de dashboard
                if (typeArch === "dashboard") {
                    settingKey = "dashboardImage".concat(mode.replace("image-", ""));
                }
                // Se for imagem de termos
                else if (typeArch === "terms") {
                    settingKey = "termsImage";
                }
                // Logo normal
                else {
                    settingKey = "appLogo".concat(mode);
                }
                return [4 /*yield*/, (0, UpdateSettingService_1["default"])({
                        key: settingKey,
                        value: file.filename,
                        companyId: companyId
                    })];
            case 1:
                setting = _b.sent();
                return [2 /*return*/, res.status(200).json(setting.value)];
            case 2: return [2 /*return*/, res.status(406)];
        }
    });
}); };
exports.storeLogo = storeLogo;
var deleteDashboardImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var index, companyId, Setting, fs, path, filePath, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = req.params.index;
                companyId = req.user.companyId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                Setting = require("../models/Setting")["default"];
                return [4 /*yield*/, Setting.destroy({
                        where: {
                            key: "dashboardImage".concat(index),
                            companyId: companyId
                        }
                    })];
            case 2:
                _a.sent();
                fs = require('fs');
                path = require('path');
                filePath = path.join(__dirname, '..', '..', '..', 'public', "dashboard-image-".concat(index, ".png"));
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return [2 /*return*/, res.status(200).json({ message: "Imagem excluída com sucesso" })];
            case 3:
                err_1 = _a.sent();
                console.error("Erro ao excluir imagem:", err_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao excluir imagem" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteDashboardImage = deleteDashboardImage;
var certUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, companyId, userId, requestUser, files, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body.body;
                companyId = req.user.companyId;
                userId = req.user.id;
                return [4 /*yield*/, User_1["default"].findByPk(userId)];
            case 1:
                requestUser = _a.sent();
                if (requestUser["super"] === false) {
                    throw new AppError_1["default"]("você nao tem permissão para esta ação!");
                }
                if (req.user.profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                files = req.files;
                file = (0, lodash_1.head)(files);
                console.log(file);
                return [2 /*return*/, res.send({ mensagem: "Arquivo Anexado" })];
        }
    });
}); };
exports.certUpload = certUpload;
var storePrivateFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, settingKey, companyId, setting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = req.file;
                settingKey = req.body.settingKey;
                companyId = req.user.companyId;
                console.log("|=============== storePrivateFile  ==============|", exports.storeLogo);
                return [4 /*yield*/, (0, UpdateSettingService_1["default"])({
                        key: "_".concat(settingKey),
                        value: file.filename,
                        companyId: companyId
                    })];
            case 1:
                setting = _a.sent();
                return [2 /*return*/, res.status(200).json(setting.value)];
        }
    });
}); };
exports.storePrivateFile = storePrivateFile;
