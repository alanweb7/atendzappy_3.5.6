"use strict";
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
exports.remove = exports.update = exports.show = exports.store = exports.listPublicSimple = exports.list = exports.index = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var Yup = __importStar(require("yup"));
// import { getIO } from "../libs/socket";
var AppError_1 = __importDefault(require("../errors/AppError"));
var Plan_1 = __importDefault(require("../models/Plan"));
var ListPlansService_1 = __importDefault(require("../services/PlanService/ListPlansService"));
var CreatePlanService_1 = __importDefault(require("../services/PlanService/CreatePlanService"));
var UpdatePlanService_1 = __importDefault(require("../services/PlanService/UpdatePlanService"));
var ShowPlanService_1 = __importDefault(require("../services/PlanService/ShowPlanService"));
var FindAllPlanService_1 = __importDefault(require("../services/PlanService/FindAllPlanService"));
var ListPublicPlansSimpleService_1 = __importDefault(require("../services/PlanService/ListPublicPlansSimpleService"));
var DeletePlanService_1 = __importDefault(require("../services/PlanService/DeletePlanService"));
var User_1 = __importDefault(require("../models/User"));
var Company_1 = __importDefault(require("../models/Company"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, listPublic, authHeader, _b, token, decoded, _c, requestUserId, profile, companyId, requestUser, company, PlanCompany, plans, plansName, _d, plans_1, count, hasMore, _e, plans_2, count, hasMore;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber, listPublic = _a.listPublic;
                authHeader = req.headers.authorization;
                _b = authHeader.split(" "), token = _b[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _c = decoded, requestUserId = _c.id, profile = _c.profile, companyId = _c.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 1:
                requestUser = _f.sent();
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 2:
                company = _f.sent();
                PlanCompany = company.planId;
                return [4 /*yield*/, Plan_1["default"].findByPk(PlanCompany)];
            case 3:
                plans = _f.sent();
                plansName = plans.name;
                if (!(requestUser["super"] === true)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, ListPlansService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber
                    })];
            case 4:
                _d = _f.sent(), plans_1 = _d.plans, count = _d.count, hasMore = _d.hasMore;
                return [2 /*return*/, res.json({ plans: plans_1, count: count, hasMore: hasMore })];
            case 5: return [4 /*yield*/, (0, ListPlansService_1["default"])({
                    searchParam: plansName,
                    pageNumber: pageNumber,
                    listPublic: listPublic
                })];
            case 6:
                _e = _f.sent(), plans_2 = _e.plans, count = _e.count, hasMore = _e.hasMore;
                return [2 /*return*/, res.json({ plans: plans_2, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var listPublic, plans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                listPublic = req.query.listPublic;
                return [4 /*yield*/, (0, FindAllPlanService_1["default"])(listPublic)];
            case 1:
                plans = _a.sent();
                return [2 /*return*/, res.status(200).json(plans)];
        }
    });
}); };
exports.list = list;
var listPublicSimple = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var plans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, ListPublicPlansSimpleService_1["default"])()];
            case 1:
                plans = _a.sent();
                return [2 /*return*/, res.status(200).json(plans)];
        }
    });
}); };
exports.listPublicSimple = listPublicSimple;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlan, schema, err_1, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPlan = req.body;
                schema = Yup.object().shape({
                    name: Yup.string().required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(newPlan)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 4: return [4 /*yield*/, (0, CreatePlanService_1["default"])(newPlan)];
            case 5:
                plan = _a.sent();
                // const io = getIO();
                // io.of(companyId.toString())
                // .emit("plan", {
                //   action: "create",
                //   plan
                // });
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company, PlanCompany, plan, plan;
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
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 2:
                company = _c.sent();
                PlanCompany = company.planId;
                if (!(requestUser["super"] === true)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, ShowPlanService_1["default"])(id)];
            case 3:
                plan = _c.sent();
                return [2 /*return*/, res.status(200).json(plan)];
            case 4:
                if (!(id !== PlanCompany.toString())) return [3 /*break*/, 5];
                return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
            case 5:
                if (!(id === PlanCompany.toString())) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, ShowPlanService_1["default"])(id)];
            case 6:
                plan = _c.sent();
                return [2 /*return*/, res.status(200).json(plan)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planData, schema, err_2, id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, company, PlanCompany, plan;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                planData = req.body;
                schema = Yup.object().shape({
                    name: Yup.string()
                });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(planData)];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _c.sent();
                throw new AppError_1["default"](err_2.message);
            case 4:
                id = planData.id;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
                _b = decoded, requestUserId = _b.id, profile = _b.profile, companyId = _b.companyId;
                return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
            case 5:
                requestUser = _c.sent();
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 6:
                company = _c.sent();
                PlanCompany = company.planId;
                if (!(requestUser["super"] === true)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, UpdatePlanService_1["default"])(planData
                    // id,
                    // name,
                    // users,
                    // connections,
                    // queues,
                    // amount,
                    // useWhatsapp,
                    // useFacebook,
                    // useInstagram,
                    // useCampaigns,
                    // useSchedules,
                    // useInternalChat,
                    // useExternalApi,
                    // useKanban,
                    // useOpenAi,
                    // useIntegrations
                    )];
            case 7:
                plan = _c.sent();
                return [2 /*return*/, res.status(200).json(plan)];
            case 8:
                if (PlanCompany.toString() !== id) {
                    return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
                }
                _c.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, _a, token, decoded, _b, requestUserId, profile, companyId, requestUser, plan;
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
                return [4 /*yield*/, (0, DeletePlanService_1["default"])(id)];
            case 2:
                plan = _c.sent();
                return [2 /*return*/, res.status(200).json(plan)];
            case 3:
                if (companyId.toString() !== id) {
                    return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
                }
                _c.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
