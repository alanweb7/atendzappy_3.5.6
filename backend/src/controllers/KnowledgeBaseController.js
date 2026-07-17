"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.removeItem = exports.updateItem = exports.addItem = exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var ListKnowledgeBasesService_1 = __importDefault(require("../services/KnowledgeBaseService/ListKnowledgeBasesService"));
var ShowKnowledgeBaseService_1 = __importDefault(require("../services/KnowledgeBaseService/ShowKnowledgeBaseService"));
var CreateKnowledgeBaseService_1 = __importDefault(require("../services/KnowledgeBaseService/CreateKnowledgeBaseService"));
var UpdateKnowledgeBaseService_1 = __importDefault(require("../services/KnowledgeBaseService/UpdateKnowledgeBaseService"));
var DeleteKnowledgeBaseService_1 = __importDefault(require("../services/KnowledgeBaseService/DeleteKnowledgeBaseService"));
var AddItemService_1 = __importDefault(require("../services/KnowledgeBaseService/AddItemService"));
var DeleteItemService_1 = __importDefault(require("../services/KnowledgeBaseService/DeleteItemService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, bases;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListKnowledgeBasesService_1["default"])(companyId)];
            case 1:
                bases = _a.sent();
                return [2 /*return*/, res.json(bases)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, kb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = Number(req.params.id);
                return [4 /*yield*/, (0, ShowKnowledgeBaseService_1["default"])(id, companyId)];
            case 1:
                kb = _a.sent();
                return [2 /*return*/, res.json(kb)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, name, description, kb;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, (0, CreateKnowledgeBaseService_1["default"])({ name: name, description: description, companyId: companyId })];
            case 1:
                kb = _b.sent();
                return [2 /*return*/, res.status(201).json(kb)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a, name, description, kb;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                id = Number(req.params.id);
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, (0, UpdateKnowledgeBaseService_1["default"])({ id: id, companyId: companyId, name: name, description: description })];
            case 1:
                kb = _b.sent();
                return [2 /*return*/, res.json(kb)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = Number(req.params.id);
                return [4 /*yield*/, (0, DeleteKnowledgeBaseService_1["default"])(id, companyId)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Deletado com sucesso" })];
        }
    });
}); };
exports.remove = remove;
var addItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, knowledgeBaseId, _a, type, title, content, url, filePath, mimeType, fileSize, publicDir, dest, item;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                knowledgeBaseId = Number(req.params.id);
                _a = req.body, type = _a.type, title = _a.title, content = _a.content, url = _a.url;
                if (req.file) {
                    publicDir = path_1["default"].resolve(__dirname, "..", "..", "public", "company".concat(companyId), "knowledge");
                    if (!fs_1["default"].existsSync(publicDir))
                        fs_1["default"].mkdirSync(publicDir, { recursive: true });
                    dest = path_1["default"].join(publicDir, req.file.originalname);
                    fs_1["default"].renameSync(req.file.path, dest);
                    filePath = "company".concat(companyId, "/knowledge/").concat(req.file.originalname);
                    mimeType = req.file.mimetype;
                    fileSize = req.file.size;
                }
                return [4 /*yield*/, (0, AddItemService_1["default"])({
                        knowledgeBaseId: knowledgeBaseId,
                        companyId: companyId,
                        type: type || (req.file ? (req.file.mimetype.includes("pdf") ? "pdf" : "image") : "text"),
                        title: title,
                        content: content,
                        url: url,
                        filePath: filePath,
                        mimeType: mimeType,
                        fileSize: fileSize
                    })];
            case 1:
                item = _b.sent();
                return [2 /*return*/, res.status(201).json(item)];
        }
    });
}); };
exports.addItem = addItem;
var updateItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, itemId, knowledgeBaseId, _a, title, content, url, KnowledgeBaseItem, KnowledgeBase, kb, item, filePath, mimeType, fileSize, publicDir, dest;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                itemId = Number(req.params.itemId);
                knowledgeBaseId = Number(req.params.id);
                _a = req.body, title = _a.title, content = _a.content, url = _a.url;
                KnowledgeBaseItem = require("../models/KnowledgeBaseItem")["default"];
                KnowledgeBase = require("../models/KnowledgeBase")["default"];
                return [4 /*yield*/, KnowledgeBase.findOne({ where: { id: knowledgeBaseId, companyId: companyId } })];
            case 1:
                kb = _b.sent();
                if (!kb)
                    throw new AppError_1["default"]("Base não encontrada", 404);
                return [4 /*yield*/, KnowledgeBaseItem.findOne({ where: { id: itemId, knowledgeBaseId: knowledgeBaseId } })];
            case 2:
                item = _b.sent();
                if (!item)
                    throw new AppError_1["default"]("Item não encontrado", 404);
                filePath = item.filePath;
                mimeType = item.mimeType;
                fileSize = item.fileSize;
                if (req.file) {
                    publicDir = path_1["default"].resolve(__dirname, "..", "..", "public", "company".concat(companyId), "knowledge");
                    if (!fs_1["default"].existsSync(publicDir))
                        fs_1["default"].mkdirSync(publicDir, { recursive: true });
                    dest = path_1["default"].join(publicDir, req.file.originalname);
                    fs_1["default"].renameSync(req.file.path, dest);
                    filePath = "company".concat(companyId, "/knowledge/").concat(req.file.originalname);
                    mimeType = req.file.mimetype;
                    fileSize = req.file.size;
                }
                return [4 /*yield*/, item.update(__assign(__assign(__assign(__assign({}, (title !== undefined && { title: title })), (content !== undefined && { content: content })), (url !== undefined && { url: url })), { filePath: filePath, mimeType: mimeType, fileSize: fileSize }))];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json(item)];
        }
    });
}); };
exports.updateItem = updateItem;
var removeItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, itemId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                itemId = Number(req.params.itemId);
                return [4 /*yield*/, (0, DeleteItemService_1["default"])(itemId, companyId)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Item removido" })];
        }
    });
}); };
exports.removeItem = removeItem;
