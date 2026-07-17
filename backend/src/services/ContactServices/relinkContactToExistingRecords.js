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
var CrmLead_1 = __importDefault(require("../../models/CrmLead"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var logger_1 = __importDefault(require("../../utils/logger"));
var sequelize_1 = require("sequelize");
var relinkContactToExistingRecords = function (_a) {
    var contact = _a.contact, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var orConditions, orphanLeads, orphanClients, _i, orphanLeads_1, lead, _b, orphanClients_1, client;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    // Se não tem número nem lid, não pode re-linkar
                    if (!contact.number && !contact.lid) {
                        return [2 /*return*/];
                    }
                    orConditions = [];
                    if (contact.number) {
                        orConditions.push({ phone: contact.number });
                        orConditions.push({ phone: contact.number.replace(/^55/, "") });
                    }
                    if (contact.lid) {
                        orConditions.push({ lid: contact.lid });
                    }
                    if (orConditions.length === 0) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, CrmLead_1["default"].findAll({
                            where: (_c = {
                                    companyId: companyId
                                },
                                _c[sequelize_1.Op.or] = orConditions,
                                _c.contactId = null,
                                _c)
                        })];
                case 1:
                    orphanLeads = _e.sent();
                    return [4 /*yield*/, CrmClient_1["default"].findAll({
                            where: (_d = {
                                    companyId: companyId
                                },
                                _d[sequelize_1.Op.or] = orConditions,
                                _d.contactId = null,
                                _d)
                        })];
                case 2:
                    orphanClients = _e.sent();
                    _i = 0, orphanLeads_1 = orphanLeads;
                    _e.label = 3;
                case 3:
                    if (!(_i < orphanLeads_1.length)) return [3 /*break*/, 6];
                    lead = orphanLeads_1[_i];
                    logger_1["default"].info("Relinking Lead ".concat(lead.id, " to Contact ").concat(contact.id));
                    return [4 /*yield*/, lead.update({ contactId: contact.id })];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    _b = 0, orphanClients_1 = orphanClients;
                    _e.label = 7;
                case 7:
                    if (!(_b < orphanClients_1.length)) return [3 /*break*/, 10];
                    client = orphanClients_1[_b];
                    logger_1["default"].info("Relinking Client ".concat(client.id, " to Contact ").concat(contact.id));
                    return [4 /*yield*/, client.update({ contactId: contact.id })];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9:
                    _b++;
                    return [3 /*break*/, 7];
                case 10:
                    if (!(orphanLeads.length > 0 || orphanClients.length > 0)) return [3 /*break*/, 12];
                    if (!contact.isLid) return [3 /*break*/, 12];
                    logger_1["default"].info("Marking Contact ".concat(contact.id, " as not LID after relinking"));
                    return [4 /*yield*/, contact.update({ isLid: false })];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = relinkContactToExistingRecords;
