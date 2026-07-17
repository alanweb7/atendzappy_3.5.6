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
exports.remove = exports.updateSchedules = exports.update = exports.list = exports.showEmail = exports.show = exports.store = exports.index = void 0;
var Yup = __importStar(require("yup"));
var sequelize_1 = require("sequelize");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Company_1 = __importDefault(require("../../models/Company"));
var ListCompaniesService_1 = __importDefault(require("../../services/CompanyService/ListCompaniesService"));
var CreateCompanyService_1 = __importDefault(require("../../services/CompanyService/CreateCompanyService"));
var UpdateCompanyService_1 = __importDefault(require("../../services/CompanyService/UpdateCompanyService"));
var ShowCompanyService_1 = __importDefault(require("../../services/CompanyService/ShowCompanyService"));
var UpdateSchedulesService_1 = __importDefault(require("../../services/CompanyService/UpdateSchedulesService"));
var DeleteCompanyService_1 = __importDefault(require("../../services/CompanyService/DeleteCompanyService"));
var FindAllCompaniesService_1 = __importDefault(require("../../services/CompanyService/FindAllCompaniesService"));
var ShowEmailCompanyService_1 = __importDefault(require("../../services/CompanyService/ShowEmailCompanyService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, _b, companies, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                return [4 /*yield*/, (0, ListCompaniesService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber
                    })];
            case 1:
                _b = _c.sent(), companies = _b.companies, count = _b.count, hasMore = _b.hasMore;
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
                    name: Yup.string()
                        .required()
                        .min(2, "ERR_COMPANY_INVALID_NAME")
                        .required("ERR_COMPANY_INVALID_NAME")
                        .test("Check-unique-name", "ERR_COMPANY_NAME_ALREADY_EXISTS", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var companyWithSameName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!value) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Company_1["default"].findOne({
                                            where: { name: value }
                                        })];
                                case 1:
                                    companyWithSameName = _a.sent();
                                    return [2 /*return*/, !companyWithSameName];
                                case 2: return [2 /*return*/, false];
                            }
                        });
                    }); }),
                    document: Yup.string()
                        .min(11, "ERR_COMPANY_INVALID_DOCUMENT")
                        .max(14, "ERR_COMPANY_INVALID_DOCUMENT")
                        .required("ERR_COMPANY_INVALID_DOCUMENT")
                        .test("Check-unique-document", "ERR_COMPANY_DOCUMENT_ALREADY_EXISTS", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var companyWithSameDocument;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!value) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Company_1["default"].findOne({
                                            where: { document: value }
                                        })];
                                case 1:
                                    companyWithSameDocument = _a.sent();
                                    return [2 /*return*/, !companyWithSameDocument];
                                case 2: return [2 /*return*/, false];
                            }
                        });
                    }); }),
                    phone: Yup.string(),
                    email: Yup.string(),
                    planId: Yup.number().required(),
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
    var id, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(id)];
            case 1:
                company = _a.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.show = show;
var showEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                return [4 /*yield*/, (0, ShowEmailCompanyService_1["default"])(email)];
            case 1:
                company = _a.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.showEmail = showEmail;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, FindAllCompaniesService_1["default"])()];
            case 1:
                companies = _a.sent();
                return [2 /*return*/, res.status(200).json(companies)];
        }
    });
}); };
exports.list = list;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyData, id, schema, err_2, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyData = req.body;
                id = req.params.id;
                schema = Yup.object().shape({
                    name: Yup.string()
                        .required()
                        .min(2, "ERR_COMPANY_INVALID_NAME")
                        .required("ERR_COMPANY_INVALID_NAME")
                        .test("Check-unique-name", "ERR_COMPANY_NAME_ALREADY_EXISTS", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var companyWithSameName;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!value) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Company_1["default"].findOne({
                                            where: { name: value, id: (_a = {}, _a[sequelize_1.Op.ne] = companyData.id, _a) }
                                        })];
                                case 1:
                                    companyWithSameName = _b.sent();
                                    return [2 /*return*/, !companyWithSameName];
                                case 2: return [2 /*return*/, false];
                            }
                        });
                    }); }),
                    phone: Yup.string(),
                    email: Yup.string(),
                    document: Yup.string()
                        .min(11, "ERR_COMPANY_INVALID_DOCUMENT")
                        .max(14, "ERR_COMPANY_INVALID_DOCUMENT")
                        .required("ERR_COMPANY_INVALID_DOCUMENT")
                        .test("Check-unique-document", "ERR_COMPANY_DOCUMENT_ALREADY_EXISTS", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var companyWithSameDocument;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!value) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Company_1["default"].findOne({
                                            where: { document: value, id: (_a = {}, _a[sequelize_1.Op.ne] = companyData.id, _a) }
                                        })];
                                case 1:
                                    companyWithSameDocument = _b.sent();
                                    return [2 /*return*/, !companyWithSameDocument];
                                case 2: return [2 /*return*/, false];
                            }
                        });
                    }); }),
                    planId: Yup.number().required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(companyData)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                throw new AppError_1["default"](err_2.message);
            case 4: return [4 /*yield*/, (0, UpdateCompanyService_1["default"])(__assign({ id: id }, companyData))];
            case 5:
                company = _a.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.update = update;
var updateSchedules = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schedules, id, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schedules = req.body.schedules;
                id = req.params.id;
                return [4 /*yield*/, (0, UpdateSchedulesService_1["default"])({
                        id: id,
                        schedules: schedules
                    })];
            case 1:
                company = _a.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.updateSchedules = updateSchedules;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, DeleteCompanyService_1["default"])(id)];
            case 1:
                company = _a.sent();
                return [2 /*return*/, res.status(200).json(company)];
        }
    });
}); };
exports.remove = remove;
