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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UpdateContactLidStability = exports.DeduplicateContact = exports.MergeContacts = exports.FindDuplicateContact = void 0;
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var logger_1 = __importDefault(require("../../utils/logger"));
var sequelize_1 = require("sequelize");
var FindDuplicateContact = function (_a) {
    var number = _a.number, lid = _a.lid, remoteJid = _a.remoteJid, companyId = _a.companyId, excludeId = _a.excludeId;
    return __awaiter(void 0, void 0, void 0, function () {
        var orConditions, firstLocal, whereClause, duplicate, error_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    logger_1["default"].info("Finding duplicate contact - number: ".concat(number, ", lid: ").concat(lid, ", companyId: ").concat(companyId));
                    orConditions = [];
                    // Busca por número (com e sem código de país: 55 Brasil, 595 Paraguai)
                    if (number) {
                        orConditions.push({ number: number });
                        // **BRASIL (55)**: Busca com e sem código de país
                        if (number.startsWith("55")) {
                            orConditions.push({ number: number.replace(/^55/, "") });
                            orConditions.push({ number: number.substring(2) });
                            // Variação com 9 inserido (celular antigo 12 dígitos → 13 dígitos)
                            if (number.length === 12) {
                                firstLocal = number[4];
                                if (["6", "7", "8"].includes(firstLocal)) {
                                    orConditions.push({ number: number.slice(0, 4) + "9" + number.slice(4) });
                                }
                            }
                            // Variação sem 9 (celular moderno 13 dígitos → 12 dígitos)
                            if (number.length === 13 && number[4] === "9") {
                                orConditions.push({ number: number.slice(0, 4) + number.slice(5) });
                            }
                        }
                        else if (!number.startsWith("595")) {
                            // Se não tem 55 nem 595, busca também com 55
                            orConditions.push({ number: "55".concat(number) });
                        }
                        // **PARAGUAI (595)**: Busca com e sem código de país
                        if (number.startsWith("595")) {
                            orConditions.push({ number: number.replace(/^595/, "") });
                            orConditions.push({ number: number.substring(3) });
                        }
                        else if (!number.startsWith("55")) {
                            // Se não tem 595 nem 55, busca também com 595
                            orConditions.push({ number: "595".concat(number) });
                        }
                    }
                    // Busca por LID
                    if (lid) {
                        orConditions.push({ lid: lid });
                    }
                    // Busca por remoteJid (se não for @lid)
                    if (remoteJid && !remoteJid.includes("@lid")) {
                        orConditions.push({ remoteJid: remoteJid });
                    }
                    if (orConditions.length === 0) {
                        logger_1["default"].warn("No search criteria provided for duplicate contact search");
                        return [2 /*return*/, null];
                    }
                    whereClause = (_b = {
                            companyId: companyId
                        },
                        _b[sequelize_1.Op.or] = orConditions,
                        _b);
                    // Excluir ID específico se fornecido
                    if (excludeId) {
                        whereClause.id = (_c = {}, _c[sequelize_1.Op.ne] = excludeId, _c);
                    }
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: whereClause,
                            order: [["updatedAt", "DESC"]] // Pega o mais recente
                        })];
                case 1:
                    duplicate = _d.sent();
                    if (duplicate) {
                        logger_1["default"].info("Duplicate contact found: ".concat(duplicate.id, " (").concat(duplicate.name, ")"));
                    }
                    else {
                        logger_1["default"].info("No duplicate contact found");
                    }
                    return [2 /*return*/, duplicate];
                case 2:
                    error_1 = _d.sent();
                    logger_1["default"].error("Error finding duplicate contact:", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.FindDuplicateContact = FindDuplicateContact;
var MergeContacts = function (_a) {
    var originalContact = _a.originalContact, duplicateContact = _a.duplicateContact, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var mergedData, originalIsReal, duplicateIsReal, originalRemoteJidValid, duplicateRemoteJidValid, updatedTickets, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    logger_1["default"].info("Merging contact ".concat(duplicateContact.id, " into ").concat(originalContact.id));
                    mergedData = {
                        companyId: companyId
                    };
                    // Nome: usar o mais significativo
                    if (originalContact.name && originalContact.name !== originalContact.number) {
                        mergedData.name = originalContact.name;
                    }
                    else if (duplicateContact.name && duplicateContact.name !== duplicateContact.number) {
                        mergedData.name = duplicateContact.name;
                    }
                    else {
                        mergedData.name = originalContact.name || duplicateContact.name;
                    }
                    originalIsReal = originalContact.number && !originalContact.number.includes("@lid");
                    duplicateIsReal = duplicateContact.number && !duplicateContact.number.includes("@lid");
                    if (originalIsReal) {
                        mergedData.number = originalContact.number;
                    }
                    else if (duplicateIsReal) {
                        mergedData.number = duplicateContact.number;
                    }
                    else {
                        mergedData.number = originalContact.number || duplicateContact.number;
                    }
                    // LID: usar o que existir
                    mergedData.lid = originalContact.lid || duplicateContact.lid;
                    originalRemoteJidValid = originalContact.remoteJid && !originalContact.remoteJid.startsWith("temp-") && !originalContact.remoteJid.includes("@lid");
                    duplicateRemoteJidValid = duplicateContact.remoteJid && !duplicateContact.remoteJid.startsWith("temp-") && !duplicateContact.remoteJid.includes("@lid");
                    if (originalRemoteJidValid) {
                        mergedData.remoteJid = originalContact.remoteJid;
                    }
                    else if (duplicateRemoteJidValid) {
                        mergedData.remoteJid = duplicateContact.remoteJid;
                    }
                    else {
                        mergedData.remoteJid = originalContact.remoteJid || duplicateContact.remoteJid;
                    }
                    // ProfilePicUrl: usar o que existir
                    mergedData.profilePicUrl = originalContact.profilePicUrl || duplicateContact.profilePicUrl;
                    // Email: usar o que existir
                    mergedData.email = originalContact.email || duplicateContact.email;
                    // Campos booleanos: usar valores mais significativos
                    mergedData.isLid = originalContact.isLid && duplicateContact.isLid;
                    mergedData.savedToPhone = originalContact.savedToPhone || duplicateContact.savedToPhone;
                    mergedData.savedToPhoneAt = originalContact.savedToPhoneAt || duplicateContact.savedToPhoneAt;
                    mergedData.savedToPhoneReason = originalContact.savedToPhoneReason || duplicateContact.savedToPhoneReason;
                    // Score: usar o maior
                    mergedData.potentialScore = Math.max(originalContact.potentialScore || 0, duplicateContact.potentialScore || 0);
                    mergedData.isPotential = mergedData.potentialScore >= 5;
                    // LidStability: usar o mais confiável
                    if (originalContact.lidStability === "high" || duplicateContact.lidStability === "high") {
                        mergedData.lidStability = "high";
                    }
                    else if (originalContact.lidStability === "medium" || duplicateContact.lidStability === "medium") {
                        mergedData.lidStability = "medium";
                    }
                    else {
                        mergedData.lidStability = originalContact.lidStability || duplicateContact.lidStability;
                    }
                    // Atualizar contato original com dados mergeados
                    return [4 /*yield*/, originalContact.update(mergedData)];
                case 1:
                    // Atualizar contato original com dados mergeados
                    _b.sent();
                    return [4 /*yield*/, Ticket_1["default"].update({ contactId: originalContact.id }, {
                            where: {
                                contactId: duplicateContact.id,
                                companyId: companyId
                            }
                        })];
                case 2:
                    updatedTickets = _b.sent();
                    if (updatedTickets[0] > 0) {
                        logger_1["default"].info("[MERGE] Atualizados ".concat(updatedTickets[0], " tickets do contato ").concat(duplicateContact.id, " para ").concat(originalContact.id));
                    }
                    logger_1["default"].info("Contact merged successfully - Original: ".concat(originalContact.id, ", Duplicate: ").concat(duplicateContact.id));
                    return [2 /*return*/, originalContact];
                case 3:
                    error_2 = _b.sent();
                    logger_1["default"].error("Error merging contacts:", error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.MergeContacts = MergeContacts;
var DeduplicateContact = function (contactData, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var number, lid, remoteJid, otherData, duplicate, mergedContact, newContact, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                number = contactData.number, lid = contactData.lid, remoteJid = contactData.remoteJid, otherData = __rest(contactData, ["number", "lid", "remoteJid"]);
                return [4 /*yield*/, (0, exports.FindDuplicateContact)({
                        number: number,
                        lid: lid,
                        remoteJid: remoteJid,
                        companyId: companyId
                    })];
            case 1:
                duplicate = _a.sent();
                if (!duplicate) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.MergeContacts)({
                        originalContact: duplicate,
                        duplicateContact: contactData,
                        companyId: companyId
                    })];
            case 2:
                mergedContact = _a.sent();
                return [2 /*return*/, mergedContact];
            case 3: return [4 /*yield*/, Contact_1["default"].create(__assign(__assign({}, otherData), { number: number, lid: lid, remoteJid: remoteJid, companyId: companyId, potentialScore: 0, isPotential: false, savedToPhone: false, lidStability: "unknown" }))];
            case 4:
                newContact = _a.sent();
                logger_1["default"].info("New contact created: ".concat(newContact.id));
                return [2 /*return*/, newContact];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                logger_1["default"].error("Error in contact deduplication:", error_3);
                throw error_3;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.DeduplicateContact = DeduplicateContact;
var UpdateContactLidStability = function (contactId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var contact, relatedContacts, stability, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Contact_1["default"].findByPk(contactId)];
            case 1:
                contact = _c.sent();
                if (!contact) {
                    logger_1["default"].warn("Contact ".concat(contactId, " not found for stability update"));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: (_a = {
                                companyId: companyId
                            },
                            _a[sequelize_1.Op.or] = [
                                { number: contact.number },
                                { lid: contact.lid }
                            ],
                            _a.id = (_b = {}, _b[sequelize_1.Op.ne] = contactId, _b),
                            _a)
                    })];
            case 2:
                relatedContacts = _c.sent();
                stability = "unknown";
                if (relatedContacts.length === 0) {
                    stability = "high"; // Sem duplicados = estável
                }
                else if (relatedContacts.length <= 2) {
                    stability = "medium"; // Poucos duplicados = médio
                }
                else {
                    stability = "low"; // Muitos duplicados = instável
                }
                return [4 /*yield*/, contact.update({ lidStability: stability })];
            case 3:
                _c.sent();
                logger_1["default"].info("Contact ".concat(contactId, " lid stability updated: ").concat(stability));
                return [3 /*break*/, 5];
            case 4:
                error_4 = _c.sent();
                logger_1["default"].error("Error updating contact lid stability:", error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.UpdateContactLidStability = UpdateContactLidStability;
