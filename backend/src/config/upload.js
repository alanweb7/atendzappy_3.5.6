"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "public");
exports["default"] = {
    directory: publicFolder,
    fileFilter: function (_req, _file, cb) {
        cb(null, true);
    },
    storage: multer_1["default"].diskStorage({
        destination: function (req, file, cb) {
            var _a;
            try {
                var companyId_1 = (_a = req.user) === null || _a === void 0 ? void 0 : _a.companyId;
                if (!companyId_1) {
                    var authHeader = req.headers.authorization;
                    if (authHeader) {
                        var token = authHeader.split(" ")[1];
                        if (token) {
                            Whatsapp_1["default"].findOne({ where: { token: token } })
                                .then(function (whatsapp) {
                                companyId_1 = whatsapp === null || whatsapp === void 0 ? void 0 : whatsapp.companyId;
                                resolveFolder(companyId_1);
                            })["catch"](function () { return resolveFolder(companyId_1); });
                            return;
                        }
                    }
                }
                resolveFolder(companyId_1);
                function resolveFolder(cId) {
                    try {
                        var _a = req.body || {}, typeArch = _a.typeArch, fileId = _a.fileId;
                        var folder = void 0;
                        if (typeArch && typeArch !== "announcements" && typeArch !== "logo" && typeArch !== "terms" && typeArch !== "dashboard") {
                            folder = path_1["default"].resolve(publicFolder, "company".concat(cId), typeArch, fileId || "");
                        }
                        else if (typeArch === "announcements") {
                            folder = path_1["default"].resolve(publicFolder, typeArch);
                        }
                        else if (typeArch === "logo" || typeArch === "terms" || typeArch === "dashboard") {
                            folder = path_1["default"].resolve(publicFolder);
                        }
                        else {
                            folder = path_1["default"].resolve(publicFolder, "company".concat(cId || "unknown"));
                        }
                        if (!fs_1["default"].existsSync(folder)) {
                            fs_1["default"].mkdirSync(folder, { recursive: true });
                            fs_1["default"].chmodSync(folder, 493);
                        }
                        cb(null, folder);
                    }
                    catch (err) {
                        cb(err, "");
                    }
                }
            }
            catch (err) {
                cb(err, "");
            }
        },
        filename: function (req, file, cb) {
            var _a = req.body, typeArch = _a.typeArch, mode = _a.mode;
            var fileName;
            if (typeArch === "dashboard" && mode) {
                fileName = "dashboard-image-".concat(mode, ".png");
            }
            else if (typeArch && typeArch === "announcements") {
                fileName = new Date().getTime() + '_' + file.originalname.replace('/', '-').replace(/ /g, "_");
            }
            else {
                fileName = file.originalname.replace('/', '-').replace(/ /g, "_");
            }
            return cb(null, fileName);
        }
    })
};
