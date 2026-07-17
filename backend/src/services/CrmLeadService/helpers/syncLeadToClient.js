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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var CrmClient_1 = __importDefault(require("../../../models/CrmClient"));
var CrmClientContact_1 = __importDefault(require("../../../models/CrmClientContact"));
var CrmClientOwner_1 = __importDefault(require("../../../models/CrmClientOwner"));
var Contact_1 = __importDefault(require("../../../models/Contact"));
var sanitizeDigits = function (value) {
    if (!value)
        return null;
    var digits = value.replace(/\D/g, "");
    return digits.length ? digits : null;
};
var resolvePhoneCandidates = function (phone) {
    var digits = sanitizeDigits(phone);
    if (!digits)
        return [];
    var variants = [digits];
    if (digits.startsWith("55") && digits.length > 2) {
        variants.push(digits.slice(2));
    }
    return __spreadArray([], new Set(variants), true);
};
var syncLeadToClient = function (lead) { return __awaiter(void 0, void 0, void 0, function () {
    var contact, normalizedDocument, normalizedPhone, phoneCandidates, email, name, orConditions, client, updates, effectiveContactId;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!lead)
                    return [2 /*return*/, null];
                contact = null;
                if (!lead.contactId) return [3 /*break*/, 2];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: { id: lead.contactId, companyId: lead.companyId }
                    })];
            case 1:
                contact = _b.sent();
                _b.label = 2;
            case 2:
                normalizedDocument = sanitizeDigits(lead.document) || sanitizeDigits(contact === null || contact === void 0 ? void 0 : contact.cpfCnpj);
                normalizedPhone = sanitizeDigits(lead.phone) || sanitizeDigits(contact === null || contact === void 0 ? void 0 : contact.number);
                phoneCandidates = resolvePhoneCandidates(normalizedPhone || undefined);
                email = lead.email || (contact === null || contact === void 0 ? void 0 : contact.email) || null;
                name = lead.name || (contact === null || contact === void 0 ? void 0 : contact.name) || normalizedPhone || "Cliente";
                orConditions = [];
                if (lead.contactId) {
                    orConditions.push({ contactId: lead.contactId });
                }
                if (normalizedDocument) {
                    orConditions.push({ document: normalizedDocument });
                }
                if (email) {
                    orConditions.push({ email: email });
                }
                phoneCandidates.forEach(function (value) {
                    orConditions.push({ phone: value });
                });
                client = null;
                if (!(orConditions.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, CrmClient_1["default"].findOne({
                        where: (_a = {
                                companyId: lead.companyId
                            },
                            _a[sequelize_1.Op.or] = orConditions,
                            _a)
                    })];
            case 3:
                client = _b.sent();
                _b.label = 4;
            case 4:
                if (!!client) return [3 /*break*/, 8];
                return [4 /*yield*/, CrmClient_1["default"].create({
                        companyId: lead.companyId,
                        contactId: (contact === null || contact === void 0 ? void 0 : contact.id) || lead.contactId || null,
                        type: "pf",
                        name: name,
                        companyName: lead.companyName,
                        document: normalizedDocument || null,
                        birthDate: lead.birthDate || (contact === null || contact === void 0 ? void 0 : contact.birthday) || null,
                        email: email,
                        phone: normalizedPhone || null,
                        status: "active",
                        clientSince: new Date(),
                        ownerUserId: lead.ownerUserId,
                        notes: lead.notes
                    })];
            case 5:
                client = _b.sent();
                if (!lead.ownerUserId) return [3 /*break*/, 7];
                return [4 /*yield*/, CrmClientOwner_1["default"].findOrCreate({
                        where: {
                            clientId: client.id,
                            userId: lead.ownerUserId
                        },
                        defaults: {
                            clientId: client.id,
                            userId: lead.ownerUserId
                        }
                    })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [3 /*break*/, 10];
            case 8:
                updates = {};
                if ((contact === null || contact === void 0 ? void 0 : contact.id) && client.contactId !== contact.id) {
                    updates.contactId = contact.id;
                }
                else if (!client.contactId && lead.contactId) {
                    updates.contactId = lead.contactId;
                }
                if (normalizedDocument && normalizedDocument !== client.document) {
                    updates.document = normalizedDocument;
                }
                if (email && email !== client.email) {
                    updates.email = email;
                }
                if (normalizedPhone && normalizedPhone !== client.phone) {
                    updates.phone = normalizedPhone;
                }
                if (!client.name && name) {
                    updates.name = name;
                }
                if (lead.companyName && lead.companyName !== client.companyName) {
                    updates.companyName = lead.companyName;
                }
                if (lead.birthDate && lead.birthDate !== client.birthDate) {
                    updates.birthDate = lead.birthDate;
                }
                if ((contact === null || contact === void 0 ? void 0 : contact.birthday) &&
                    !lead.birthDate &&
                    contact.birthday !== client.birthDate) {
                    updates.birthDate = contact.birthday;
                }
                if (lead.ownerUserId && lead.ownerUserId !== client.ownerUserId) {
                    updates.ownerUserId = lead.ownerUserId;
                }
                if (!Object.keys(updates).length) return [3 /*break*/, 10];
                return [4 /*yield*/, client.update(updates)];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10:
                effectiveContactId = (contact === null || contact === void 0 ? void 0 : contact.id) || lead.contactId || client.contactId || null;
                if (!effectiveContactId) return [3 /*break*/, 12];
                return [4 /*yield*/, CrmClientContact_1["default"].findOrCreate({
                        where: {
                            clientId: client.id,
                            contactId: effectiveContactId
                        },
                        defaults: {
                            clientId: client.id,
                            contactId: effectiveContactId
                        }
                    })];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12: return [4 /*yield*/, lead.update({
                    contactId: effectiveContactId || lead.contactId || null,
                    convertedClientId: client.id,
                    convertedAt: new Date(),
                    leadStatus: "convertido",
                    document: normalizedDocument || lead.document || null,
                    email: email && email !== "" ? email : lead.email,
                    phone: normalizedPhone || lead.phone || null
                })];
            case 13:
                _b.sent();
                return [2 /*return*/, client];
        }
    });
}); };
exports["default"] = syncLeadToClient;
