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
exports.simulateRouting = exports.updateRouting = exports.getRouting = exports.sync = exports.status = exports.enable = void 0;
var ShowWhatsAppService_1 = __importDefault(require("../services/WhatsappService/ShowWhatsAppService"));
var CoexistenceService_1 = require("../services/WhatsappCoexistence/CoexistenceService");
var MessageRoutingService_1 = require("../services/WhatsappCoexistence/MessageRoutingService");
var enable = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, _a, phoneNumberId, wabaId, permanentToken, routingMode, routingRules, whatsapp;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                _a = req.body, phoneNumberId = _a.phoneNumberId, wabaId = _a.wabaId, permanentToken = _a.permanentToken, routingMode = _a.routingMode, routingRules = _a.routingRules;
                return [4 /*yield*/, (0, CoexistenceService_1.enableCoexistence)({
                        whatsappId: whatsappId,
                        companyId: companyId,
                        phoneNumberId: phoneNumberId,
                        wabaId: wabaId,
                        permanentToken: permanentToken,
                        routingMode: routingMode,
                        routingRules: routingRules
                    })];
            case 1:
                whatsapp = _b.sent();
                return [2 /*return*/, res.status(200).json(whatsapp)];
        }
    });
}); };
exports.enable = enable;
var status = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CoexistenceService_1.checkAppStatus)({ whatsappId: whatsappId, companyId: companyId })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
exports.status = status;
var sync = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, _a, force, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                _a = req.body.force, force = _a === void 0 ? false : _a;
                return [4 /*yield*/, (0, CoexistenceService_1.syncCoexistence)({ whatsappId: whatsappId, companyId: companyId, force: force })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
exports.sync = sync;
var getRouting = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        enabled: whatsapp.coexistenceEnabled,
                        mode: whatsapp.messageRoutingMode,
                        rules: whatsapp.routingRules || [],
                        businessAppConnected: whatsapp.businessAppConnected,
                        lastCoexistenceSync: whatsapp.lastCoexistenceSync
                    })];
        }
    });
}); };
exports.getRouting = getRouting;
var updateRouting = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, _a, mode, rules, whatsapp;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                _a = req.body, mode = _a.mode, rules = _a.rules;
                return [4 /*yield*/, (0, MessageRoutingService_1.updateRoutingStrategy)({
                        whatsappId: whatsappId,
                        companyId: companyId,
                        mode: mode,
                        rules: rules || null
                    })];
            case 1:
                whatsapp = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        mode: whatsapp.messageRoutingMode,
                        rules: whatsapp.routingRules || []
                    })];
        }
    });
}); };
exports.updateRouting = updateRouting;
var simulateRouting = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsappId, companyId, _a, messageBody, metadata, destination;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                whatsappId = req.params.whatsappId;
                companyId = req.user.companyId;
                _a = req.body, messageBody = _a.messageBody, metadata = _a.metadata;
                if (!messageBody) {
                    return [2 /*return*/, res.status(400).json({ error: "messageBody is required" })];
                }
                return [4 /*yield*/, (0, MessageRoutingService_1.resolveMessageDestination)(whatsappId, companyId, messageBody, metadata)];
            case 1:
                destination = _b.sent();
                return [2 /*return*/, res.status(200).json({ destination: destination })];
        }
    });
}); };
exports.simulateRouting = simulateRouting;
