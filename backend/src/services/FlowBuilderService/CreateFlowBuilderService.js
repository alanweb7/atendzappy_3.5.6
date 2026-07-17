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
var FlowBuilder_1 = require("../../models/FlowBuilder");
var ensureFlowBuilderWebhook_1 = __importDefault(require("./ensureFlowBuilderWebhook"));
var logger_1 = __importDefault(require("../../utils/logger"));
var CreateFlowBuilderService = function (_a) {
    var userId = _a.userId, name = _a.name, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var nameExist, flow, totalFlows, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    logger_1["default"].info("[CreateFlowBuilderService] Starting for company ".concat(companyId, ", user ").concat(userId, ", flow name: ").concat(name));
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                name: name,
                                company_id: companyId
                            }
                        })];
                case 1:
                    nameExist = _b.sent();
                    if (nameExist) {
                        logger_1["default"].info("[CreateFlowBuilderService] Flow with name \"".concat(name, "\" already exists for company ").concat(companyId));
                        return [2 /*return*/, 'exist'];
                    }
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.create({
                            user_id: userId,
                            company_id: companyId,
                            name: name
                        })];
                case 2:
                    flow = _b.sent();
                    logger_1["default"].info("[CreateFlowBuilderService] Flow created with ID: ".concat(flow.id));
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.count({
                            where: {
                                company_id: companyId
                            }
                        })];
                case 3:
                    totalFlows = _b.sent();
                    logger_1["default"].info("[CreateFlowBuilderService] Total flows for company ".concat(companyId, ": ").concat(totalFlows));
                    if (!(totalFlows === 1)) return [3 /*break*/, 5];
                    logger_1["default"].info("[CreateFlowBuilderService] First flow detected, ensuring FlowBuilder webhook exists");
                    return [4 /*yield*/, (0, ensureFlowBuilderWebhook_1["default"])({
                            companyId: companyId,
                            userId: userId
                        })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    logger_1["default"].info("[CreateFlowBuilderService] Not the first flow, skipping webhook creation");
                    _b.label = 6;
                case 6: return [2 /*return*/, flow];
                case 7:
                    error_1 = _b.sent();
                    console.error("Erro ao inserir o usuário:", error_1);
                    return [2 /*return*/, error_1];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = CreateFlowBuilderService;
