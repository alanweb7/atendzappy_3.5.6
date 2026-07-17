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
exports.download = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var Company_1 = __importDefault(require("../models/Company"));
var CompanyDocumentService_1 = require("../services/CompanyDocumentService");
var fs_1 = __importDefault(require("fs"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, companyId, authHeader, _b, token, decoded, _c, requestCompanyId, profile, targetCompanyId, documents;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber, companyId = _a.companyId;
                authHeader = req.headers.authorization;
                _b = authHeader.split(" "), token = _b[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _c = decoded, requestCompanyId = _c.companyId, profile = _c.profile;
                // Verificar se é admin/superadmin ou se está solicitando documentos da própria empresa
                if (profile !== "admin" && companyId && companyId !== requestCompanyId.toString()) {
                    throw new AppError_1["default"]("ERR_PERMISSION_DENIED", 403);
                }
                targetCompanyId = companyId ? parseInt(companyId) : requestCompanyId;
                return [4 /*yield*/, (0, CompanyDocumentService_1.ListCompanyDocumentsService)({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: targetCompanyId,
                        requestCompanyId: requestCompanyId,
                        profile: profile
                    })];
            case 1:
                documents = _d.sent();
                return [2 /*return*/, res.status(200).json(documents)];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, _a, token, decoded, _b, requestCompanyId, profile, _c, companyId, name, visible, company, document;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestCompanyId = _b.companyId, profile = _b.profile;
                // Apenas admin/superadmin pode fazer upload
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_PERMISSION_DENIED", 403);
                }
                // Verificar se o usuário pertence à empresa ID 1
                if (requestCompanyId !== 1) {
                    throw new AppError_1["default"]("ERR_ONLY_COMPANY_1_CAN_UPLOAD", 403);
                }
                _c = req.body, companyId = _c.companyId, name = _c.name, visible = _c.visible;
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 1:
                company = _d.sent();
                if (!company) {
                    throw new AppError_1["default"]("ERR_COMPANY_NOT_FOUND", 404);
                }
                if (!req.file) {
                    throw new AppError_1["default"]("ERR_NO_FILE_UPLOADED", 400);
                }
                return [4 /*yield*/, (0, CompanyDocumentService_1.CreateCompanyDocumentService)({
                        companyId: companyId,
                        name: name,
                        filePath: req.file.path,
                        fileName: req.file.originalname,
                        visible: visible || false
                    })];
            case 2:
                document = _d.sent();
                return [2 /*return*/, res.status(201).json(document)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestCompanyId, profile, document;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestCompanyId = _b.companyId, profile = _b.profile;
                return [4 /*yield*/, (0, CompanyDocumentService_1.ShowCompanyDocumentService)({
                        documentId: parseInt(id),
                        requestCompanyId: requestCompanyId,
                        profile: profile
                    })];
            case 1:
                document = _c.sent();
                return [2 /*return*/, res.status(200).json(document)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestCompanyId, profile, _c, name, description, isVisibleToCompany, document;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestCompanyId = _b.companyId, profile = _b.profile;
                // Apenas admin/superadmin pode atualizar
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_PERMISSION_DENIED", 403);
                }
                // Verificar se o usuário pertence à empresa ID 1
                if (requestCompanyId !== 1) {
                    throw new AppError_1["default"]("ERR_ONLY_COMPANY_1_CAN_UPLOAD", 403);
                }
                _c = req.body, name = _c.name, description = _c.description, isVisibleToCompany = _c.isVisibleToCompany;
                return [4 /*yield*/, (0, CompanyDocumentService_1.UpdateCompanyDocumentService)({
                        documentId: parseInt(id),
                        name: name,
                        description: description,
                        isVisibleToCompany: isVisibleToCompany
                    })];
            case 1:
                document = _d.sent();
                return [2 /*return*/, res.status(200).json(document)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestCompanyId, profile;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestCompanyId = _b.companyId, profile = _b.profile;
                // Apenas admin/superadmin pode excluir
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_PERMISSION_DENIED", 403);
                }
                // Verificar se o usuário pertence à empresa ID 1
                if (requestCompanyId !== 1) {
                    throw new AppError_1["default"]("ERR_ONLY_COMPANY_1_CAN_UPLOAD", 403);
                }
                return [4 /*yield*/, (0, CompanyDocumentService_1.DeleteCompanyDocumentService)(parseInt(id))];
            case 1:
                _c.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
var download = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestCompanyId, profile, document, fileStream;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestCompanyId = _b.companyId, profile = _b.profile;
                return [4 /*yield*/, (0, CompanyDocumentService_1.ShowCompanyDocumentService)({
                        documentId: parseInt(id),
                        requestCompanyId: requestCompanyId,
                        profile: profile
                    })];
            case 1:
                document = _c.sent();
                // Verificar se o arquivo existe
                if (!fs_1["default"].existsSync(document.filePath)) {
                    throw new AppError_1["default"]("ERR_FILE_NOT_FOUND", 404);
                }
                // Configurar headers para download
                res.setHeader('Content-Disposition', "attachment; filename=\"".concat(document.fileName, "\""));
                res.setHeader('Content-Type', 'application/octet-stream');
                fileStream = fs_1["default"].createReadStream(document.filePath);
                fileStream.pipe(res);
                return [2 /*return*/, new Promise(function (resolve) {
                        fileStream.on('end', function () {
                            resolve(res.status(200));
                        });
                    })];
        }
    });
}); };
exports.download = download;
