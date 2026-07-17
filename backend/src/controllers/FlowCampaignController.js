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
exports.deleteFlowCampaign = exports.updateFlowCampaign = exports.flowCampaign = exports.flowCampaigns = exports.createFlowCampaign = void 0;
var CreateFlowCampaignService_1 = __importDefault(require("../services/FlowCampaignService/CreateFlowCampaignService"));
var FlowsCampaignGetDataService_1 = __importDefault(require("../services/FlowCampaignService/FlowsCampaignGetDataService"));
var GetFlowsCampaignDataService_1 = __importDefault(require("../services/FlowCampaignService/GetFlowsCampaignDataService"));
var DeleteFlowCampaignService_1 = __importDefault(require("../services/FlowCampaignService/DeleteFlowCampaignService"));
var UpdateFlowCampaignService_1 = __importDefault(require("../services/FlowCampaignService/UpdateFlowCampaignService"));
// import { handleMessage } from "../services/FacebookServices/facebookMessageListener";
var createFlowCampaign = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, flowId, phrase, phrases, matchType, whatsappId, userId, companyId, flow;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, flowId = _a.flowId, phrase = _a.phrase, phrases = _a.phrases, matchType = _a.matchType, whatsappId = _a.whatsappId;
                userId = parseInt(req.user.id);
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateFlowCampaignService_1["default"])({
                        userId: userId,
                        name: name,
                        companyId: companyId,
                        flowId: flowId,
                        whatsappId: whatsappId,
                        phrase: phrase,
                        phrases: phrases,
                        matchType: matchType
                    })];
            case 1:
                flow = _b.sent();
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.createFlowCampaign = createFlowCampaign;
var flowCampaigns = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, flow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.user.id);
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, FlowsCampaignGetDataService_1["default"])({
                        companyId: companyId
                    })];
            case 1:
                flow = _a.sent();
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.flowCampaigns = flowCampaigns;
var flowCampaign = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, idFlow, companyId, id, flow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.user.id);
                idFlow = req.params.idFlow;
                companyId = req.user.companyId;
                id = parseInt(idFlow);
                return [4 /*yield*/, (0, GetFlowsCampaignDataService_1["default"])({
                        companyId: companyId,
                        idFlow: id
                    })];
            case 1:
                flow = _a.sent();
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.flowCampaign = flowCampaign;
var updateFlowCampaign = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, flowId, name, phrase, phrases, matchType, id, status, flow;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, flowId = _a.flowId, name = _a.name, phrase = _a.phrase, phrases = _a.phrases, matchType = _a.matchType, id = _a.id, status = _a.status;
                return [4 /*yield*/, (0, UpdateFlowCampaignService_1["default"])({
                        companyId: companyId,
                        name: name,
                        flowId: flowId,
                        phrase: phrase,
                        phrases: phrases,
                        matchType: matchType,
                        id: id,
                        status: status
                    })];
            case 1:
                flow = _b.sent();
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.updateFlowCampaign = updateFlowCampaign;
var deleteFlowCampaign = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFlow, flowIdInt, flow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idFlow = req.params.idFlow;
                flowIdInt = parseInt(idFlow);
                return [4 /*yield*/, (0, DeleteFlowCampaignService_1["default"])(flowIdInt)];
            case 1:
                flow = _a.sent();
                return [2 /*return*/, res.status(200).json(flow)];
        }
    });
}); };
exports.deleteFlowCampaign = deleteFlowCampaign;
