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
exports.list = exports.removeAll = exports.remove = exports.update = exports.uploadMedias = exports.show = exports.store = exports.index = void 0;
var socket_1 = require("../libs/socket");
var AppError_1 = __importDefault(require("../errors/AppError"));
var lodash_1 = require("lodash");
var CreateService_1 = __importDefault(require("../services/FileServices/CreateService"));
var ListService_1 = __importDefault(require("../services/FileServices/ListService"));
var UpdateService_1 = __importDefault(require("../services/FileServices/UpdateService"));
var ShowService_1 = __importDefault(require("../services/FileServices/ShowService"));
var DeleteService_1 = __importDefault(require("../services/FileServices/DeleteService"));
var SimpleListService_1 = __importDefault(require("../services/FileServices/SimpleListService"));
var DeleteAllService_1 = __importDefault(require("../services/FileServices/DeleteAllService"));
var FilesOptions_1 = __importDefault(require("../models/FilesOptions"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNumber, searchParam, companyId, _b, files, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, pageNumber = _a.pageNumber, searchParam = _a.searchParam;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: companyId
                    })];
            case 1:
                _b = _c.sent(), files = _b.files, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ files: files, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, message, options, companyId, fileList, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, message = _a.message, options = _a.options;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateService_1["default"])({
                        name: name,
                        message: message,
                        options: options,
                        companyId: companyId
                    })];
            case 1:
                fileList = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-file"), {
                    action: "create",
                    fileList: fileList
                });
                return [2 /*return*/, res.status(200).json(fileList)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileId, companyId, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileId = req.params.fileId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowService_1["default"])(fileId, companyId)];
            case 1:
                file = _a.sent();
                return [2 /*return*/, res.status(200).json(file)];
        }
    });
}); };
exports.show = show;
var uploadMedias = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fileId, id, mediaType, files, file, fileOpt, _i, _b, _c, index_1, file_1, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, fileId = _a.fileId, id = _a.id, mediaType = _a.mediaType;
                files = req.files;
                file = (0, lodash_1.head)(files);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, , 8]);
                fileOpt = void 0;
                if (!(files.length > 0)) return [3 /*break*/, 6];
                _i = 0, _b = files.entries();
                _d.label = 2;
            case 2:
                if (!(_i < _b.length)) return [3 /*break*/, 6];
                _c = _b[_i], index_1 = _c[0], file_1 = _c[1];
                return [4 /*yield*/, FilesOptions_1["default"].findOne({
                        where: {
                            fileId: fileId,
                            id: Array.isArray(id) ? id[index_1] : id
                        }
                    })];
            case 3:
                fileOpt = _d.sent();
                return [4 /*yield*/, fileOpt.update({
                        path: file_1.filename.replace('/', '-'),
                        mediaType: Array.isArray(mediaType) ? mediaType[index_1] : mediaType
                    })];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, res.send({ mensagem: "Arquivos atualizados" })];
            case 7:
                err_1 = _d.sent();
                throw new AppError_1["default"](err_1.message);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.uploadMedias = uploadMedias;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileId, fileData, companyId, fileList, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                fileId = req.params.fileId;
                fileData = req.body;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateService_1["default"])({ fileData: fileData, id: fileId, companyId: companyId })];
            case 1:
                fileList = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-file"), {
                    action: "update",
                    fileList: fileList
                });
                return [2 /*return*/, res.status(200).json(fileList)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileId, companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileId = req.params.fileId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteService_1["default"])(fileId, companyId)];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company".concat(companyId, "-file"), {
                    action: "delete",
                    fileId: fileId
                });
                return [2 /*return*/, res.status(200).json({ message: "File List deleted" })];
        }
    });
}); };
exports.remove = remove;
var removeAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteAllService_1["default"])(companyId)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send()];
        }
    });
}); };
exports.removeAll = removeAll;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchParam, companyId, ratings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchParam = req.query.searchParam;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, SimpleListService_1["default"])({ searchParam: searchParam, companyId: companyId })];
            case 1:
                ratings = _a.sent();
                return [2 /*return*/, res.json(ratings)];
        }
    });
}); };
exports.list = list;
