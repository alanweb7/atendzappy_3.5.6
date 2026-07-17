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
exports.resolveMessageDestination = exports.updateRoutingStrategy = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var updateRoutingStrategy = function (_a) {
    var whatsappId = _a.whatsappId, companyId = _a.companyId, mode = _a.mode, _b = _a.rules, rules = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var whatsapp;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!["automatic", "manual", "balanced"].includes(mode)) {
                        throw new AppError_1["default"]("ERR_INVALID_ROUTING_MODE", 400);
                    }
                    return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
                case 1:
                    whatsapp = _c.sent();
                    return [4 /*yield*/, whatsapp.update({
                            messageRoutingMode: mode,
                            routingRules: rules || null
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/, whatsapp];
            }
        });
    });
};
exports.updateRoutingStrategy = updateRoutingStrategy;
var resolveMessageDestination = function (whatsappId, companyId, messageBody, metadata) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp.coexistenceEnabled) {
                    return [2 /*return*/, "api"];
                }
                switch (whatsapp.messageRoutingMode) {
                    case "manual":
                        return [2 /*return*/, applyManualRules(whatsapp.routingRules || null, messageBody, metadata)];
                    case "balanced":
                        return [2 /*return*/, applyBalancedStrategy(metadata)];
                    case "automatic":
                    default:
                        return [2 /*return*/, applyAutomaticStrategy(messageBody, metadata)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.resolveMessageDestination = resolveMessageDestination;
var applyManualRules = function (rules, messageBody, metadata) {
    if (!rules || rules.length === 0)
        return "api";
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        if (matchConditions(rule.conditions, messageBody, metadata)) {
            return rule.destination;
        }
    }
    return "api";
};
var matchConditions = function (conditions, messageBody, metadata) {
    if (conditions.keywords) {
        var keywords = Array.isArray(conditions.keywords)
            ? conditions.keywords
            : String(conditions.keywords).split(",");
        var normalizedBody_1 = messageBody.toLowerCase();
        if (keywords.some(function (keyword) { return normalizedBody_1.includes(keyword.trim().toLowerCase()); })) {
            return true;
        }
    }
    if (conditions.queueId && (metadata === null || metadata === void 0 ? void 0 : metadata.queueId)) {
        if (String(metadata.queueId) === String(conditions.queueId)) {
            return true;
        }
    }
    if (conditions.period && conditions.period.start && conditions.period.end) {
        var now = new Date();
        var start = parseTime(conditions.period.start);
        var end = parseTime(conditions.period.end);
        if (now >= start && now <= end) {
            return true;
        }
    }
    return false;
};
var applyBalancedStrategy = function (metadata) {
    if (metadata === null || metadata === void 0 ? void 0 : metadata.ticketLoad) {
        return metadata.ticketLoad > 0.5 ? "app" : "api";
    }
    var hour = new Date().getHours();
    return hour >= 8 && hour <= 18 ? "api" : "app";
};
var applyAutomaticStrategy = function (messageBody, metadata) {
    var keywords = ["preço", "comprar", "assinar", "orçamento", "venda", "contratar"];
    var normalizedBody = messageBody.toLowerCase();
    if (keywords.some(function (keyword) { return normalizedBody.includes(keyword); })) {
        return "api";
    }
    if ((metadata === null || metadata === void 0 ? void 0 : metadata.sentiment) === "negative") {
        return "app";
    }
    return "app";
};
var parseTime = function (timeString) {
    var _a = timeString.split(":").map(Number), hours = _a[0], minutes = _a[1];
    var now = new Date();
    now.setHours(hours, minutes || 0, 0, 0);
    return now;
};
