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
var Contact_1 = __importDefault(require("../../models/Contact"));
var CrmLead_1 = __importDefault(require("../../models/CrmLead"));
var logger_1 = __importDefault(require("../../utils/logger"));
var handleClientDeleteCascade = function (_a) {
    var client = _a.client, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var contact, lead, leads, _i, leads_1, lead;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!client.contactId) return [3 /*break*/, 6];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: {
                                id: client.contactId,
                                companyId: companyId
                            }
                        })];
                case 1:
                    contact = _b.sent();
                    if (!contact) return [3 /*break*/, 6];
                    return [4 /*yield*/, CrmLead_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                contactId: contact.id
                            }
                        })];
                case 2:
                    lead = _b.sent();
                    if (!lead) return [3 /*break*/, 4];
                    logger_1["default"].info("Cascade deleting Lead ".concat(lead.id, " due to Client ").concat(client.id, " deletion"));
                    return [4 /*yield*/, lead.destroy()];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    // Apaga o contato
                    logger_1["default"].info("Cascade deleting Contact ".concat(contact.id, " due to Client ").concat(client.id, " deletion"));
                    return [4 /*yield*/, contact.destroy()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [4 /*yield*/, CrmLead_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            convertedClientId: client.id
                        }
                    })];
                case 7:
                    leads = _b.sent();
                    _i = 0, leads_1 = leads;
                    _b.label = 8;
                case 8:
                    if (!(_i < leads_1.length)) return [3 /*break*/, 11];
                    lead = leads_1[_i];
                    logger_1["default"].info("Cascade deleting Lead ".concat(lead.id, " due to Client ").concat(client.id, " deletion"));
                    return [4 /*yield*/, lead.destroy()];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = handleClientDeleteCascade;
