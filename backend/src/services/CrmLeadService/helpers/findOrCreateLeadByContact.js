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
var sequelize_1 = require("sequelize");
var normalizeDocument = function (value) {
    if (!value)
        return null;
    var digits = value.replace(/\D/g, "");
    return digits.length ? digits : null;
};
var findOrCreateLeadByContact = function (_a) {
    var contact = _a.contact, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var normalizedDocument, normalizedPhone, email, name, lead, whereConditions, updates;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!contact || contact.isGroup) {
                        return [2 /*return*/, null];
                    }
                    normalizedDocument = normalizeDocument(contact.cpfCnpj);
                    normalizedPhone = contact.number || null;
                    email = contact.email || null;
                    name = contact.name || normalizedPhone || "Lead";
                    return [4 /*yield*/, CrmLead_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                contactId: contact.id
                            }
                        })];
                case 1:
                    lead = _c.sent();
                    if (!(!lead && (normalizedPhone || normalizedDocument))) return [3 /*break*/, 4];
                    whereConditions = [];
                    if (normalizedPhone) {
                        whereConditions.push({ phone: normalizedPhone });
                    }
                    if (normalizedDocument) {
                        whereConditions.push({ lid: normalizedDocument });
                    }
                    if (!(whereConditions.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, CrmLead_1["default"].findOne({
                            where: (_b = {
                                    companyId: companyId
                                },
                                _b[sequelize_1.Op.or] = whereConditions,
                                _b)
                        })];
                case 2:
                    lead = _c.sent();
                    if (!(lead && lead.contactId !== contact.id)) return [3 /*break*/, 4];
                    return [4 /*yield*/, lead.update({ contactId: contact.id })];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    if (!!lead) return [3 /*break*/, 6];
                    return [4 /*yield*/, CrmLead_1["default"].create({
                            companyId: companyId,
                            contactId: contact.id,
                            name: name,
                            email: email,
                            phone: normalizedPhone,
                            lid: normalizedDocument,
                            document: normalizedDocument,
                            status: "new",
                            leadStatus: "novo",
                            lastActivityAt: new Date()
                        })];
                case 5:
                    // Cria um novo lead apenas se não encontrou nenhum existente
                    lead = _c.sent();
                    return [3 /*break*/, 8];
                case 6:
                    updates = {};
                    if (normalizedPhone && normalizedPhone !== lead.phone) {
                        updates.phone = normalizedPhone;
                    }
                    if (email && email !== lead.email) {
                        updates.email = email;
                    }
                    if (contact.name && (!lead.name || lead.name === "Lead")) {
                        updates.name = contact.name;
                    }
                    if (normalizedDocument && normalizedDocument !== lead.document) {
                        updates.document = normalizedDocument;
                    }
                    if (normalizedDocument && normalizedDocument !== lead.lid) {
                        updates.lid = normalizedDocument;
                    }
                    updates.lastActivityAt = new Date();
                    if (!Object.keys(updates).length) return [3 /*break*/, 8];
                    return [4 /*yield*/, lead.update(updates)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/, lead];
            }
        });
    });
};
exports["default"] = findOrCreateLeadByContact;
