"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
// @ts-nocheck
var socket_1 = require("../../libs/socket");
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importStar(require("path"));
var logger_1 = __importDefault(require("../../utils/logger"));
var Sentry = __importStar(require("@sentry/node"));
var sequelize_1 = require("sequelize");
var syncContactToLead_1 = __importDefault(require("../CrmLeadService/helpers/syncContactToLead"));
var normalizeContactNumber_1 = require("../../helpers/normalizeContactNumber");
var ContactDeduplicationService_1 = require("./ContactDeduplicationService");
var ContactScoringService_1 = require("./ContactScoringService");
var axios = require('axios');
// Função local para detectar LID (Linked ID) do WhatsApp Business API
// LIDs geralmente começam com 120 e têm 15+ dígitos
var isLidNumber = function (digits) {
    if (!digits)
        return false;
    if (digits.startsWith("120") && digits.length >= 15) {
        return true;
    }
    if (digits.length > 15) {
        return true;
    }
    return false;
};
var TEMP_LID_PREFIX = "lid-";
var TEMP_RANDOM_PREFIX = "temp-";
var extractLidDigits = function (jid) {
    if (!jid || !jid.includes("@lid"))
        return "";
    var lidValue = jid.split("@")[0];
    return (lidValue || "").replace(/\D/g, "");
};
var buildTempNumberFromLid = function (lidDigits) {
    return "".concat(TEMP_LID_PREFIX).concat(lidDigits);
};
var isTemporaryNumber = function (value) {
    return Boolean(value && (value.startsWith(TEMP_LID_PREFIX) || value.startsWith(TEMP_RANDOM_PREFIX)));
};
var isRealPhoneNumber = function (value) {
    if (!value || isTemporaryNumber(value))
        return false;
    var digits = value.replace(/\D/g, "");
    if (!digits)
        return false;
    return !isLidNumber(digits);
};
var downloadProfileImage = function (_a) {
    var profilePicUrl = _a.profilePicUrl, companyId = _a.companyId, contact = _a.contact;
    return __awaiter(void 0, void 0, void 0, function () {
        var publicFolder, folder, response, filename, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                    folder = path_1["default"].resolve(publicFolder, "company".concat(companyId), "contacts");
                    if (!fs_1["default"].existsSync(folder)) {
                        fs_1["default"].mkdirSync(folder, { recursive: true });
                        fs_1["default"].chmodSync(folder, 511);
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get(profilePicUrl, {
                            responseType: 'arraybuffer'
                        })];
                case 2:
                    response = _b.sent();
                    filename = "".concat(new Date().getTime(), ".jpeg");
                    fs_1["default"].writeFileSync((0, path_1.join)(folder, filename), response.data);
                    return [2 /*return*/, filename];
                case 3:
                    error_1 = _b.sent();
                    logger_1["default"].error("Error downloading profile image:", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var DEFAULT_FALLBACK_NAME = "Contato sem nome";
var sanitizeName = function (value) { return (value || "").trim(); };
var hasMeaningfulName = function (value, referenceNumber, referenceLid) {
    var normalized = sanitizeName(value);
    if (!normalized)
        return false;
    if (referenceNumber && normalized === referenceNumber)
        return false;
    if (referenceLid && normalized === referenceLid)
        return false;
    if (/^lid[-\s]?/i.test(normalized))
        return false;
    return true;
};
var ensureFallbackName = function (contact) { return __awaiter(void 0, void 0, void 0, function () {
    var fallbackName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!hasMeaningfulName(contact.name, contact.number, contact.lid)) return [3 /*break*/, 2];
                fallbackName = "".concat(DEFAULT_FALLBACK_NAME, " ").concat(contact.id);
                if (!(contact.name !== fallbackName)) return [3 /*break*/, 2];
                contact.name = fallbackName;
                return [4 /*yield*/, contact.save()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var CreateOrUpdateContactService = function (_a) {
    var name = _a.name, rawNumber = _a.number, profilePicUrl = _a.profilePicUrl, isGroup = _a.isGroup, _b = _a.email, email = _b === void 0 ? "" : _b, _c = _a.channel, channel = _c === void 0 ? "whatsapp" : _c, companyId = _a.companyId, _d = _a.extraInfo, extraInfo = _d === void 0 ? [] : _d, _e = _a.remoteJid, remoteJid = _e === void 0 ? "" : _e, remoteJidAlt = _a.remoteJidAlt, whatsappId = _a.whatsappId, wbot = _a.wbot, lid = _a.lid, addressingMode = _a.addressingMode, msgBody = _a.msgBody;
    return __awaiter(void 0, void 0, void 0, function () {
        var createContact, sanitizedIncomingName, incomingNameIsMeaningful, number, remoteLidDigits, remoteAltLidDigits, rawDigits, isRawLid, bestLidDigits, io, sanitizedRemoteJid, jidToSanitize, remoteJidDigits, isLidJid, contact, orConditions, firstLocal, duplicateContact, currentNumberIsLid, newNumberIsReal, existingContactWithNumber, settings, acceptAudioMessageContact, profileUrl, e_1, newRemoteJid, jidToSanitize, lidToSave, initialName, filename, duplicate, score, error_2;
        var _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    logger_1["default"].info("=== CREATE OR UPDATE CONTACT SERVICE START ===");
                    logger_1["default"].info("Input data:", { rawNumber: rawNumber, remoteJid: remoteJid, remoteJidAlt: remoteJidAlt, name: name, lid: lid, addressingMode: addressingMode });
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 34, , 35]);
                    createContact = false;
                    sanitizedIncomingName = sanitizeName(name);
                    incomingNameIsMeaningful = hasMeaningfulName(sanitizedIncomingName, rawNumber, lid);
                    number = (0, normalizeContactNumber_1.resolveContactNumber)({
                        rawNumber: rawNumber,
                        remoteJid: remoteJid,
                        remoteJidAlt: remoteJidAlt,
                        isGroup: isGroup // Passar isGroup para resolver ID do grupo corretamente
                    });
                    remoteLidDigits = extractLidDigits(remoteJid);
                    remoteAltLidDigits = extractLidDigits(remoteJidAlt);
                    rawDigits = rawNumber ? rawNumber.replace(/\D/g, "") : "";
                    isRawLid = isLidNumber(rawDigits);
                    bestLidDigits = remoteLidDigits || remoteAltLidDigits || (isRawLid ? rawDigits : "");
                    if (!number && bestLidDigits) {
                        logger_1["default"].warn("Contact identified only by LID: ".concat(bestLidDigits));
                        number = buildTempNumberFromLid(bestLidDigits);
                    }
                    if (!number) {
                        number = "".concat(TEMP_RANDOM_PREFIX).concat(Date.now()).concat(Math.floor(Math.random() * 1000));
                    }
                    io = (0, socket_1.getIO)();
                    sanitizedRemoteJid = void 0;
                    if (isGroup) {
                        sanitizedRemoteJid = remoteJid || remoteJidAlt || "";
                        logger_1["default"].info("[GRUPO] Usando remoteJid original sem sanitizar: ".concat(sanitizedRemoteJid));
                    }
                    else {
                        jidToSanitize = remoteJidAlt || remoteJid;
                        sanitizedRemoteJid = (0, normalizeContactNumber_1.sanitizeRemoteJid)(jidToSanitize, number, isGroup);
                    }
                    remoteJidDigits = remoteJid ? remoteJid.replace(/\D/g, "") : "";
                    isLidJid = (remoteJid && remoteJid.includes("@lid")) || isLidNumber(remoteJidDigits);
                    contact = null;
                    if (!isLidJid) return [3 /*break*/, 3];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: (_f = {
                                    companyId: companyId
                                },
                                _f[sequelize_1.Op.or] = [
                                    { remoteJid: remoteJid },
                                    { lid: remoteJid.split("@")[0] }
                                ],
                                _f)
                        })];
                case 2:
                    // Primeiro tenta encontrar pelo LID
                    contact = _k.sent();
                    if (contact) {
                        logger_1["default"].info("Found existing contact by LID: ".concat(contact.id, ", updating with real number: ").concat(number));
                    }
                    _k.label = 3;
                case 3:
                    if (!!contact) return [3 /*break*/, 5];
                    orConditions = [];
                    // Busca pelo número normalizado (com variações de 9 dígito para BR)
                    if (number) {
                        orConditions.push({ number: number });
                        orConditions.push({ number: number.replace(/^55/, "") });
                        if (number.startsWith("55")) {
                            // Celular antigo sem 9 (12 dígitos) → busca também com 9
                            if (number.length === 12) {
                                firstLocal = number[4];
                                if (["6", "7", "8"].includes(firstLocal)) {
                                    orConditions.push({ number: number.slice(0, 4) + "9" + number.slice(4) });
                                }
                            }
                            // Celular moderno com 9 (13 dígitos) → busca também sem 9
                            if (number.length === 13 && number[4] === "9") {
                                orConditions.push({ number: number.slice(0, 4) + number.slice(5) });
                            }
                        }
                    }
                    // Busca pelo remoteJidAlt
                    if (remoteJidAlt) {
                        orConditions.push({ remoteJid: remoteJidAlt });
                    }
                    // Busca pelo remoteJid se não for LID
                    if (remoteJid && !isLidJid) {
                        orConditions.push({ remoteJid: remoteJid });
                    }
                    // Busca por contatos que foram criados com o número LID incorretamente
                    if (isRawLid) {
                        orConditions.push({ number: rawDigits });
                        logger_1["default"].info("Also searching for contact with LID number: ".concat(rawDigits));
                    }
                    if (!(orConditions.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: (_g = {
                                    companyId: companyId
                                },
                                _g[sequelize_1.Op.or] = orConditions,
                                _g)
                        })];
                case 4:
                    contact = _k.sent();
                    _k.label = 5;
                case 5:
                    if (!(contact && isRealPhoneNumber(number))) return [3 /*break*/, 8];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                number: number,
                                id: (_h = {},
                                    _h[sequelize_1.Op.ne] = contact.id,
                                    _h)
                            }
                        })];
                case 6:
                    duplicateContact = _k.sent();
                    if (!duplicateContact) return [3 /*break*/, 8];
                    logger_1["default"].warn("Merging contact ID ".concat(contact.id, " (LID) into existing contact ID ").concat(duplicateContact.id, " with number ").concat(number));
                    if (bestLidDigits && (!duplicateContact.lid || duplicateContact.lid !== bestLidDigits)) {
                        duplicateContact.lid = bestLidDigits;
                    }
                    if (sanitizedRemoteJid &&
                        !sanitizedRemoteJid.includes("@lid") &&
                        sanitizedRemoteJid !== duplicateContact.remoteJid) {
                        duplicateContact.remoteJid = sanitizedRemoteJid;
                    }
                    if (profilePicUrl &&
                        profilePicUrl !== "" &&
                        profilePicUrl !== "no_photo" &&
                        !profilePicUrl.includes("nopicture.png") &&
                        profilePicUrl !== duplicateContact.profilePicUrl) {
                        duplicateContact.profilePicUrl = profilePicUrl;
                    }
                    if (name && name !== number && name !== duplicateContact.name) {
                        duplicateContact.name = name;
                    }
                    if (addressingMode && !duplicateContact.addressingMode) {
                        duplicateContact.addressingMode = addressingMode;
                    }
                    if (!duplicateContact.whatsappId && whatsappId) {
                        duplicateContact.whatsappId = whatsappId;
                    }
                    duplicateContact.isLid = false;
                    return [4 /*yield*/, duplicateContact.save()];
                case 7:
                    _k.sent();
                    contact = duplicateContact;
                    _k.label = 8;
                case 8:
                    if (!contact) return [3 /*break*/, 16];
                    logger_1["default"].info("Updating existing contact ID: ".concat(contact.id, ", current number: ").concat(contact.number));
                    currentNumberIsLid = isLidNumber(contact.number || "");
                    newNumberIsReal = isRealPhoneNumber(number);
                    // Atualiza o número se:
                    // 1. O número atual é um LID e temos um número real
                    // 2. Ou se o número é diferente e não é um LID
                    if ((currentNumberIsLid && newNumberIsReal) || (number !== contact.number && !isLidNumber(number))) {
                        logger_1["default"].info("Updating contact number from ".concat(contact.number, " to ").concat(number));
                        contact.number = number;
                    }
                    if (profilePicUrl === "no_photo") {
                        // Sentinel: contato sem foto acessível no WhatsApp, não tentar novamente
                        contact.profilePicUrl = "no_photo";
                    }
                    else if (profilePicUrl && !profilePicUrl.includes("nopicture.png")) {
                        contact.profilePicUrl = profilePicUrl;
                    }
                    if (incomingNameIsMeaningful && sanitizedIncomingName !== contact.name) {
                        contact.name = sanitizedIncomingName;
                    }
                    // Prioriza remoteJidAlt (número real) para o remoteJid salvo
                    if (sanitizedRemoteJid && sanitizedRemoteJid !== contact.remoteJid && !sanitizedRemoteJid.includes("@lid")) {
                        contact.remoteJid = sanitizedRemoteJid;
                        logger_1["default"].info("Updated remoteJid to: ".concat(sanitizedRemoteJid));
                    }
                    // **CORREÇÃO ESPECÍFICA PARA GRUPOS: Atualizar temp- para remoteJid real**
                    if (isGroup && remoteJid && !remoteJid.startsWith("temp-") && contact.remoteJid !== remoteJid) {
                        logger_1["default"].info("[GRUPO] Atualizando remoteJid de ".concat(contact.remoteJid, " para ").concat(remoteJid));
                        contact.remoteJid = remoteJid;
                    }
                    if (!(isGroup && number && !number.startsWith("temp-") && contact.number !== number)) return [3 /*break*/, 14];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                number: number,
                                id: (_j = {}, _j[sequelize_1.Op.ne] = contact.id, _j)
                            }
                        })];
                case 9:
                    existingContactWithNumber = _k.sent();
                    if (!existingContactWithNumber) return [3 /*break*/, 13];
                    logger_1["default"].warn("[GRUPO] N\u00FAmero ".concat(number, " j\u00E1 existe no contato ").concat(existingContactWithNumber.id, ". Fazendo merge..."));
                    return [4 /*yield*/, (0, ContactDeduplicationService_1.MergeContacts)({
                            originalContact: existingContactWithNumber,
                            duplicateContact: contact,
                            companyId: companyId
                        })];
                case 10:
                    contact = _k.sent();
                    // **IMPORTANTE: Após merge, não tentar atualizar o contato novamente**
                    // O contato agora é o original (existingContactWithNumber), então retornamos
                    logger_1["default"].info("[GRUPO] Merge completo. Usando contato ".concat(contact.id, " (j\u00E1 atualizado)"));
                    // Emite evento para o contato mergeado
                    io.of(String(companyId)).emit("company-".concat(companyId, "-contact"), {
                        action: "update",
                        contact: contact
                    });
                    return [4 /*yield*/, (0, syncContactToLead_1["default"])({ contact: contact, companyId: companyId })];
                case 11:
                    _k.sent();
                    return [4 /*yield*/, ensureFallbackName(contact)];
                case 12:
                    _k.sent();
                    logger_1["default"].info("=== CREATE OR UPDATE CONTACT SERVICE END (after merge) ===");
                    return [2 /*return*/, contact];
                case 13:
                    logger_1["default"].info("[GRUPO] Atualizando number de ".concat(contact.number, " para ").concat(number));
                    contact.number = number;
                    _k.label = 14;
                case 14:
                    // Salva o LID original para referência futura
                    if (bestLidDigits && contact.lid !== bestLidDigits) {
                        contact.lid = bestLidDigits;
                    }
                    if (lid) {
                        contact.lid = lid;
                    }
                    if (addressingMode) {
                        contact.addressingMode = addressingMode;
                    }
                    return [4 /*yield*/, contact.save()];
                case 15:
                    _k.sent();
                    logger_1["default"].info("Contact ".concat(contact.id, " updated"));
                    return [3 /*break*/, 23];
                case 16: return [4 /*yield*/, CompaniesSettings_1["default"].findOne({ where: { companyId: companyId } })];
                case 17:
                    settings = _k.sent();
                    acceptAudioMessageContact = settings.acceptAudioMessageContact;
                    profileUrl = profilePicUrl === "no_photo" ? "no_photo" : (profilePicUrl || "");
                    if (!(!profileUrl && wbot && ['whatsapp'].includes(channel))) return [3 /*break*/, 21];
                    _k.label = 18;
                case 18:
                    _k.trys.push([18, 20, , 21]);
                    return [4 /*yield*/, wbot.profilePictureUrl(remoteJid, "image", 5000)];
                case 19:
                    profileUrl = (_k.sent()) || "";
                    return [3 /*break*/, 21];
                case 20:
                    e_1 = _k.sent();
                    Sentry.captureException(e_1);
                    profileUrl = "";
                    return [3 /*break*/, 21];
                case 21:
                    newRemoteJid = void 0;
                    if (isGroup) {
                        newRemoteJid = remoteJid || remoteJidAlt || (0, normalizeContactNumber_1.buildRemoteJidFromNumber)(number, isGroup);
                        logger_1["default"].info("[GRUPO - NOVO CONTATO] Usando remoteJid: ".concat(newRemoteJid));
                    }
                    else {
                        jidToSanitize = remoteJidAlt || remoteJid;
                        newRemoteJid = (0, normalizeContactNumber_1.sanitizeRemoteJid)(jidToSanitize, number, isGroup) || (0, normalizeContactNumber_1.buildRemoteJidFromNumber)(number, isGroup);
                    }
                    lidToSave = isLidJid ? remoteJidDigits : lid;
                    initialName = incomingNameIsMeaningful ? sanitizedIncomingName : DEFAULT_FALLBACK_NAME;
                    logger_1["default"].info("Creating new contact:", { name: initialName, number: number, newRemoteJid: newRemoteJid, lid: lidToSave, addressingMode: addressingMode });
                    return [4 /*yield*/, Contact_1["default"].create({
                            name: initialName,
                            number: number,
                            email: email,
                            isGroup: isGroup,
                            companyId: companyId,
                            channel: channel,
                            acceptAudioMessage: acceptAudioMessageContact === 'enabled',
                            remoteJid: newRemoteJid,
                            profilePicUrl: profileUrl,
                            urlPicture: "",
                            whatsappId: whatsappId,
                            lid: lidToSave,
                            addressingMode: addressingMode,
                            // Campos novos para deduplicação e scoring
                            potentialScore: 0,
                            isPotential: false,
                            savedToPhone: false,
                            lidStability: "unknown"
                        })];
                case 22:
                    contact = _k.sent();
                    createContact = true;
                    logger_1["default"].info("Contact ".concat(contact.id, " created"));
                    _k.label = 23;
                case 23:
                    if (!(profilePicUrl && profilePicUrl !== "" && profilePicUrl !== "no_photo" && !profilePicUrl.includes("nopicture.png"))) return [3 /*break*/, 26];
                    return [4 /*yield*/, downloadProfileImage({
                            profilePicUrl: profilePicUrl,
                            companyId: companyId,
                            contact: contact
                        })];
                case 24:
                    filename = _k.sent();
                    if (!filename) return [3 /*break*/, 26];
                    return [4 /*yield*/, contact.update({
                            urlPicture: filename,
                            pictureUpdated: true
                        })];
                case 25:
                    _k.sent();
                    _k.label = 26;
                case 26:
                    if (!contact) return [3 /*break*/, 31];
                    return [4 /*yield*/, (0, ContactDeduplicationService_1.FindDuplicateContact)({
                            number: contact.number,
                            lid: contact.lid,
                            remoteJid: contact.remoteJid,
                            companyId: companyId,
                            excludeId: contact.id
                        })];
                case 27:
                    duplicate = _k.sent();
                    if (!(duplicate && duplicate.id !== contact.id)) return [3 /*break*/, 29];
                    logger_1["default"].warn("Duplicate contact found: ".concat(duplicate.id, ", merging..."));
                    return [4 /*yield*/, (0, ContactDeduplicationService_1.MergeContacts)({
                            originalContact: duplicate,
                            duplicateContact: contact,
                            companyId: companyId
                        })];
                case 28:
                    contact = _k.sent();
                    _k.label = 29;
                case 29:
                    if (!(msgBody && typeof msgBody === 'string')) return [3 /*break*/, 31];
                    score = (0, ContactScoringService_1.CalculatePotentialScore)(msgBody);
                    return [4 /*yield*/, contact.update({
                            potentialScore: score,
                            isPotential: score >= 5
                        })];
                case 30:
                    _k.sent();
                    logger_1["default"].info("Contact ".concat(contact.id, " score updated: ").concat(score));
                    _k.label = 31;
                case 31:
                    // Emite evento
                    io.of(String(companyId)).emit("company-".concat(companyId, "-contact"), {
                        action: createContact ? "create" : "update",
                        contact: contact
                    });
                    // Cria lead se necessário
                    return [4 /*yield*/, (0, syncContactToLead_1["default"])({ contact: contact, companyId: companyId })];
                case 32:
                    // Cria lead se necessário
                    _k.sent();
                    return [4 /*yield*/, ensureFallbackName(contact)];
                case 33:
                    _k.sent();
                    logger_1["default"].info("=== CREATE OR UPDATE CONTACT SERVICE END ===");
                    return [2 /*return*/, contact];
                case 34:
                    error_2 = _k.sent();
                    logger_1["default"].error("CreateOrUpdateContactService error:", error_2);
                    throw error_2;
                case 35: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = CreateOrUpdateContactService;
