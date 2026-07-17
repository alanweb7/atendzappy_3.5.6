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
var CrmClient_1 = __importDefault(require("../../../models/CrmClient"));
var logger_1 = __importDefault(require("../../../utils/logger"));
var normalizeDocument = function (value) {
    if (!value)
        return null;
    var digits = value.replace(/\D/g, "");
    return digits.length ? digits : null;
};
var syncLeadToClient = function (_a) {
    var lead = _a.lead, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var client, updates, normalizedDocument;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!lead.convertedClientId) {
                        // Lead não foi convertido para cliente ainda
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, CrmClient_1["default"].findOne({
                            where: {
                                id: lead.convertedClientId,
                                companyId: companyId
                            }
                        })];
                case 1:
                    client = _b.sent();
                    if (!client) {
                        logger_1["default"].warn("Client ".concat(lead.convertedClientId, " not found for Lead ").concat(lead.id));
                        return [2 /*return*/];
                    }
                    updates = {};
                    // Sincroniza campos relevantes do Lead para o Client
                    if (lead.email && lead.email !== client.email) {
                        updates.email = lead.email;
                    }
                    if (lead.phone && lead.phone !== client.phone) {
                        updates.phone = lead.phone;
                    }
                    if (lead.name && lead.name !== client.name) {
                        updates.name = lead.name;
                    }
                    if (lead.companyName && lead.companyName !== client.companyName) {
                        updates.companyName = lead.companyName;
                    }
                    normalizedDocument = normalizeDocument(lead.document);
                    if (normalizedDocument && normalizedDocument !== client.document) {
                        updates.document = normalizedDocument;
                    }
                    if (!(Object.keys(updates).length > 0)) return [3 /*break*/, 3];
                    logger_1["default"].info("Syncing Lead ".concat(lead.id, " changes to Client ").concat(client.id, ":"), updates);
                    return [4 /*yield*/, client.update(updates)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = syncLeadToClient;
