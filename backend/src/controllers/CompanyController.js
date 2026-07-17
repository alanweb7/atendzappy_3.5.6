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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.indexPlan = exports.listPlan = exports.remove = exports.updateSchedules = exports.update = exports.list = exports.show = exports.store = exports.index = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var Yup = __importStar(require("yup"));
// import { getIO } from "../libs/socket";
var AppError_1 = __importDefault(require("../errors/AppError"));
var Company_1 = __importDefault(require("../models/Company"));
var ListCompaniesService_1 = __importDefault(require("../services/CompanyService/ListCompaniesService"));
var CreateCompanyService_1 = __importDefault(require("../services/CompanyService/CreateCompanyService"));
var UpdateCompanyService_1 = __importDefault(require("../services/CompanyService/UpdateCompanyService"));
var ShowCompanyService_1 = __importDefault(require("../services/CompanyService/ShowCompanyService"));
var UpdateSchedulesService_1 = __importDefault(require("../services/CompanyService/UpdateSchedulesService"));
var DeleteCompanyService_1 = __importDefault(require("../services/CompanyService/DeleteCompanyService"));
var FindAllCompaniesService_1 = __importDefault(require("../services/CompanyService/FindAllCompaniesService"));
var ShowPlanCompanyService_1 = __importDefault(require("../services/CompanyService/ShowPlanCompanyService"));
var User_1 = __importDefault(require("../models/User"));
var ListCompaniesPlanService_1 = __importDefault(require("../services/CompanyService/ListCompaniesPlanService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, authHeader, _b, token, decoded, _c, id, profile, companyId, company, requestUser, _d, companies, count, hasMore, _e, companies, count, hasMore;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                authHeader = req.headers.authorization;
                _b = authHeader.split(" "), token = _b[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _c = decoded, id = _c.id, profile = _c.profile, companyId = _c.companyId;
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 1:
                company = _f.sent();
                return [4 /*yield*/, User_1["default"].findByPk(id)];
            case 2:
                requestUser = _f.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, ListCompaniesService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber
                    })];
            case 3:
                _d = _f.sent(), companies = _d.companies, count = _d.count, hasMore = _d.hasMore;
                return [2 /*return*/, res.json({ companies: companies, count: count, hasMore: hasMore })];
            case 4: return [4 /*yield*/, (0, ListCompaniesService_1["default"])({
                    searchParam: company.name,
                    pageNumber: pageNumber
                })];
            case 5:
                _e = _f.sent(), companies = _e.companies, count = _e.count, hasMore = _e.hasMore;
                return [2 /*return*/, res.json({ companies: companies, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newCompany, schema, err_1, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newCompany = req.body;
                schema = Yup.object().shape({
                    name: Yup.string().required(),
                    password: Yup.string().required().min(5)
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(newCompany)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 4: return [4 /*yield*/, (0, CreateCompanyService_1["default"])(newCompany)];
            case 5:
                company = _a.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company, company;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestUserId = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 1:
                requestUser = _c.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(id)];
            case 2:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
            case 3:
                if (!(id !== companyId.toString())) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
            case 4:
                if (!(id === companyId.toString())) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(id)];
            case 5:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, _a, token, decoded, _b, id, profile, companyId, requestUser, companies, companies, company, i, id_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, id = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(id)];
            case 1:
                requestUser = _c.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, FindAllCompaniesService_1["default"])()];
            case 2:
                companies = _c.sent();
                return [2 /*return*/, res.status(200).json(companies)];
            case 3: return [4 /*yield*/, (0, FindAllCompaniesService_1["default"])()];
            case 4:
                companies = _c.sent();
                company = [];
                for (i = 0; i < companies.length; i++) {
                    id_1 = companies[i].id;
                    if (id_1 === companyId) {
                        company.push(companies[i]);
                        return [2 /*return*/, res.status(200).json(company)];
                    }
                }
                _c.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.list = list;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyData, schema, err_2, id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company, company;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                companyData = req.body;
                schema = Yup.object().shape({
                    name: Yup.string()
                });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(companyData)];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _c.sent();
                throw new AppError_1["default"](err_2.message);
            case 4:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestUserId = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 5:
                requestUser = _c.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, UpdateCompanyService_1["default"])(__assign({ id: id }, companyData))];
            case 6:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
            case 7:
                if (!(String(companyData === null || companyData === void 0 ? void 0 : companyData.id) !== id || String(companyId) !== id)) return [3 /*break*/, 8];
                return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
            case 8: return [4 /*yield*/, (0, UpdateCompanyService_1["default"])(__assign({ id: id }, companyData))];
            case 9:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.update = update;
var updateSchedules = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schedules, id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company, company;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                schedules = req.body.schedules;
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestUserId = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 1:
                requestUser = _c.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, UpdateSchedulesService_1["default"])({ id: id, schedules: schedules })];
            case 2:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
            case 3:
                if (!(companyId.toString() !== id)) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
            case 4: return [4 /*yield*/, (0, UpdateSchedulesService_1["default"])({ id: id, schedules: schedules })];
            case 5:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.updateSchedules = updateSchedules;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestUserId = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 1:
                requestUser = _c.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, DeleteCompanyService_1["default"])(id)];
            case 2:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
            case 3: return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
        }
    });
}); };
exports.remove = remove;
var listPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company, company;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestUserId = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 1:
                requestUser = _c.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ShowPlanCompanyService_1["default"])(id)];
            case 2:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
            case 3:
                if (!(companyId.toString() !== id)) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
            case 4: return [4 /*yield*/, (0, ShowPlanCompanyService_1["default"])(id)];
            case 5:
                company = _c.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.listPlan = listPlan;
var indexPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, authHeader, _b, token, decoded, _c, id, profile, companyId, requestUser, companies;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                authHeader = req.headers.authorization;
                _b = authHeader.split(" "), token = _b[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _c = decoded, id = _c.id, profile = _c.profile, companyId = _c.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(id)];
            case 1:
                requestUser = _d.sent();
                if (!(requestUser["super"] === true)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ListCompaniesPlanService_1["default"])()];
            case 2:
                companies = _d.sent();
                return [2 /*return*/, res.json({ companies: companies })];
            case 3: return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
        }
    });
}); };
exports.indexPlan = indexPlan;
