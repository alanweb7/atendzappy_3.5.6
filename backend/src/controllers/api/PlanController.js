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
exports.remove = exports.update = exports.show = exports.store = exports.list = exports.index = void 0;
var Yup = __importStar(require("yup"));
// import { getIO } from "../../libs/socket";
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ListPlansService_1 = __importDefault(require("../../services/PlanService/ListPlansService"));
var CreatePlanService_1 = __importDefault(require("../../services/PlanService/CreatePlanService"));
var UpdatePlanService_1 = __importDefault(require("../../services/PlanService/UpdatePlanService"));
var ShowPlanService_1 = __importDefault(require("../../services/PlanService/ShowPlanService"));
var FindAllPlanService_1 = __importDefault(require("../../services/PlanService/FindAllPlanService"));
var DeletePlanService_1 = __importDefault(require("../../services/PlanService/DeletePlanService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, _b, plans, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                return [4 /*yield*/, (0, ListPlansService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber
                    })];
            case 1:
                _b = _c.sent(), plans = _b.plans, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ plans: plans, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var plans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, FindAllPlanService_1["default"])()];
            case 1:
                plans = _a.sent();
                return [2 /*return*/, res.status(200).json(plans)];
        }
    });
}); };
exports.list = list;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlan, schema, err_1, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPlan = req.body;
                schema = Yup.object().shape({
                    name: Yup.string().required(),
                    users: Yup.number().required(),
                    connections: Yup.number().required(),
                    queues: Yup.number().required(),
                    amount: Yup.string().required(),
                    useFacebook: Yup.boolean(),
                    useInstagram: Yup.boolean(),
                    useWhatsapp: Yup.boolean(),
                    useCampaigns: Yup.boolean(),
                    useExternalApi: Yup.boolean(),
                    useInternalChat: Yup.boolean(),
                    useSchedules: Yup.boolean(),
                    trial: Yup.boolean(),
                    trialDays: Yup.number(),
                    recurrence: Yup.string().required(),
                    useKanban: Yup.boolean()
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
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, ShowPlanService_1["default"])(id)];
            case 1:
                plan = _a.sent();
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planData, id, schema, err_2, name, users, connections, queues, amount, useWhatsapp, useFacebook, useInstagram, useCampaigns, useSchedules, useInternalChat, useExternalApi, trial, trialDays, recurrence, useKanban, useIntegrations, useOpenAi, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planData = req.body;
                id = req.params.id;
                schema = Yup.object().shape({
                    name: Yup.string().required(),
                    users: Yup.number().required(),
                    connections: Yup.number().required(),
                    queues: Yup.number().required(),
                    amount: Yup.string().required(),
                    useFacebook: Yup.boolean(),
                    useInstagram: Yup.boolean(),
                    useWhatsapp: Yup.boolean(),
                    useCampaigns: Yup.boolean(),
                    useExternalApi: Yup.boolean(),
                    useInternalChat: Yup.boolean(),
                    useSchedules: Yup.boolean(),
                    trial: Yup.boolean(),
                    trialDays: Yup.number(),
                    recurrence: Yup.string().required(),
                    useKanban: Yup.boolean()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(planData)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                throw new AppError_1["default"](err_2.message);
            case 4:
                name = planData.name, users = planData.users, connections = planData.connections, queues = planData.queues, amount = planData.amount, useWhatsapp = planData.useWhatsapp, useFacebook = planData.useFacebook, useInstagram = planData.useInstagram, useCampaigns = planData.useCampaigns, useSchedules = planData.useSchedules, useInternalChat = planData.useInternalChat, useExternalApi = planData.useExternalApi, trial = planData.trial, trialDays = planData.trialDays, recurrence = planData.recurrence, useKanban = planData.useKanban, useIntegrations = planData.useIntegrations, useOpenAi = planData.useOpenAi;
                return [4 /*yield*/, (0, UpdatePlanService_1["default"])({
                        id: id,
                        name: name,
                        users: users,
                        connections: connections,
                        queues: queues,
                        amount: amount,
                        useWhatsapp: useWhatsapp,
                        useFacebook: useFacebook,
                        useInstagram: useInstagram,
                        useCampaigns: useCampaigns,
                        useSchedules: useSchedules,
                        useInternalChat: useInternalChat,
                        useExternalApi: useExternalApi,
                        useKanban: useKanban,
                        useIntegrations: useIntegrations,
                        useOpenAi: useOpenAi
                    })];
            case 5:
                plan = _a.sent();
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, DeletePlanService_1["default"])(id)];
            case 1:
                plan = _a.sent();
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.remove = remove;
