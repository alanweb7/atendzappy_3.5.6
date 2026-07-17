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
var Webhook_1 = require("../../models/Webhook");
var FlowBuilder_1 = require("../../models/FlowBuilder");
var ActionsWebhookService_1 = require("./ActionsWebhookService");
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var DispatchWebHookService = function (_a) {
    var companyId = _a.companyId, hashId = _a.hashId, data = _a.data, req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var webhook, config, requestAll, webhookUpdate, flow, nodes, connections, nextStage, _b, count, rows, whatsappIds_1, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, Webhook_1.WebhookModel.findOne({
                            where: {
                                company_id: companyId,
                                hash_id: hashId
                            }
                        })];
                case 1:
                    webhook = _c.sent();
                    config = __assign(__assign({}, webhook.config), { lastRequest: __assign({}, data) });
                    requestAll = webhook.requestAll + 1;
                    return [4 /*yield*/, Webhook_1.WebhookModel.update({ config: config, requestAll: requestAll }, {
                            where: { hash_id: hashId, company_id: companyId }
                        })];
                case 2:
                    webhookUpdate = _c.sent();
                    if (!webhook.config["details"]) return [3 /*break*/, 5];
                    return [4 /*yield*/, FlowBuilder_1.FlowBuilderModel.findOne({
                            where: {
                                id: webhook.config["details"].idFlow,
                                company_id: companyId
                            }
                        })];
                case 3:
                    flow = _c.sent();
                    nodes = flow.flow["nodes"];
                    connections = flow.flow["connections"];
                    nextStage = connections[0].source;
                    return [4 /*yield*/, Whatsapp_1["default"].findAndCountAll({
                            where: {
                                companyId: companyId
                            }
                        })];
                case 4:
                    _b = _c.sent(), count = _b.count, rows = _b.rows;
                    whatsappIds_1 = [];
                    rows.forEach(function (usuario) {
                        whatsappIds_1.push(usuario.toJSON());
                    });
                    (0, ActionsWebhookService_1.ActionsWebhookService)(0, webhook.config["details"].idFlow, companyId, nodes, connections, nextStage, data, webhook.config["details"], hashId);
                    _c.label = 5;
                case 5: return [2 /*return*/, webhook];
                case 6:
                    error_1 = _c.sent();
                    console.error("Erro ao inserir o usuário:", error_1);
                    return [2 /*return*/, error_1];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = DispatchWebHookService;
