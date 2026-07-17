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
var CrmLead_1 = __importDefault(require("../../../models/CrmLead"));
var logger_1 = __importDefault(require("../../../utils/logger"));
var normalizeDocument = function (value) {
    if (!value)
        return null;
    var digits = value.replace(/\D/g, "");
    return digits.length ? digits : null;
};
var syncClientToLead = function (_a) {
    var client = _a.client, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var leads, _i, leads_1, lead, updates, normalizedDocument;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, CrmLead_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            convertedClientId: client.id
                        }
                    })];
                case 1:
                    leads = _b.sent();
                    if (leads.length === 0) {
                        logger_1["default"].warn("No leads found for Client ".concat(client.id));
                        return [2 /*return*/];
                    }
                    _i = 0, leads_1 = leads;
                    _b.label = 2;
                case 2:
                    if (!(_i < leads_1.length)) return [3 /*break*/, 5];
                    lead = leads_1[_i];
                    updates = {};
                    normalizedDocument = normalizeDocument(client.document);
                    if (client.email && client.email !== lead.email) {
                        updates.email = client.email;
                    }
                    if (client.phone && client.phone !== lead.phone) {
                        updates.phone = client.phone;
                    }
                    if (client.name && client.name !== lead.name) {
                        updates.name = client.name;
                    }
                    if (client.companyName && client.companyName !== lead.companyName) {
                        updates.companyName = client.companyName;
                    }
                    if (normalizedDocument && normalizedDocument !== lead.document) {
                        updates.document = normalizedDocument;
                    }
                    if (!(Object.keys(updates).length > 0)) return [3 /*break*/, 4];
                    logger_1["default"].info("Syncing Client ".concat(client.id, " changes to Lead ").concat(lead.id, ":"), updates);
                    return [4 /*yield*/, lead.update(updates)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = syncClientToLead;
