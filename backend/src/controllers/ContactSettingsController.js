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
exports.resetSettings = exports.testConfiguration = exports.batchSaveToPhone = exports.getStats = exports.update = exports.index = void 0;
var CompaniesSettings_1 = __importDefault(require("../models/CompaniesSettings"));
var socket_1 = require("../libs/socket");
var logger_1 = __importDefault(require("../utils/logger"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var ContactScoringService_1 = require("../services/ContactServices/ContactScoringService");
var ContactPhoneService_1 = require("../services/ContactServices/ContactPhoneService");
var Contact_1 = __importDefault(require("../models/Contact"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, settings, defaultSettings, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                settings = _a.sent();
                if (!!settings) return [3 /*break*/, 3];
                return [4 /*yield*/, CompaniesSettings_1["default"].create({
                        companyId: companyId,
                        autoSaveContacts: false,
                        autoSaveContactsScore: 7,
                        autoSaveContactsReason: "high_potential"
                    })];
            case 2:
                defaultSettings = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        autoSaveContacts: defaultSettings.autoSaveContacts,
                        autoSaveContactsScore: defaultSettings.autoSaveContactsScore,
                        autoSaveContactsReason: defaultSettings.autoSaveContactsReason
                    })];
            case 3: return [2 /*return*/, res.status(200).json({
                    autoSaveContacts: settings.autoSaveContacts,
                    autoSaveContactsScore: settings.autoSaveContactsScore,
                    autoSaveContactsReason: settings.autoSaveContactsReason
                })];
            case 4:
                error_1 = _a.sent();
                logger_1["default"].error("Error getting contact settings:", error_1);
                throw new AppError_1["default"]("ERR_GET_CONTACT_SETTINGS", 500);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, autoSaveContacts, autoSaveContactsScore, autoSaveContactsReason, settings, newSettings, io, updatedSettings, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                companyId = req.user.companyId;
                _a = req.body, autoSaveContacts = _a.autoSaveContacts, autoSaveContactsScore = _a.autoSaveContactsScore, autoSaveContactsReason = _a.autoSaveContactsReason;
                logger_1["default"].info("=== UPDATE CONTACT SETTINGS START ===");
                logger_1["default"].info("Request body:", {
                    autoSaveContacts: autoSaveContacts,
                    autoSaveContactsScore: autoSaveContactsScore,
                    autoSaveContactsReason: autoSaveContactsReason,
                    companyId: companyId
                });
                // Validações
                if (autoSaveContacts && !["disabled", "enabled", "all", "important"].includes(autoSaveContacts)) {
                    throw new AppError_1["default"]("Invalid autoSaveContacts value", 400);
                }
                if (autoSaveContactsScore && (autoSaveContactsScore < 0 || autoSaveContactsScore > 10)) {
                    throw new AppError_1["default"]("autoSaveContactsScore must be between 0 and 10", 400);
                }
                if (autoSaveContactsReason && !["high_potential", "message_analysis", "business_hours"].includes(autoSaveContactsReason)) {
                    throw new AppError_1["default"]("Invalid autoSaveContactsReason value", 400);
                }
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                settings = _b.sent();
                if (!!settings) return [3 /*break*/, 3];
                return [4 /*yield*/, CompaniesSettings_1["default"].create({
                        companyId: companyId,
                        autoSaveContacts: autoSaveContacts !== undefined ? autoSaveContacts : true,
                        autoSaveContactsScore: autoSaveContactsScore || 7,
                        autoSaveContactsReason: autoSaveContactsReason || "high_potential"
                    })];
            case 2:
                newSettings = _b.sent();
                return [3 /*break*/, 5];
            case 3:
                // Atualizar se existir
                logger_1["default"].info("Updating existing settings");
                return [4 /*yield*/, settings.update({
                        autoSaveContacts: autoSaveContacts,
                        autoSaveContactsScore: autoSaveContactsScore,
                        autoSaveContactsReason: autoSaveContactsReason
                    })];
            case 4:
                _b.sent();
                logger_1["default"].info("Settings updated in database");
                _b.label = 5;
            case 5:
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-contactSettings"), {
                    action: "update",
                    settings: {
                        autoSaveContacts: autoSaveContacts,
                        autoSaveContactsScore: autoSaveContactsScore,
                        autoSaveContactsReason: autoSaveContactsReason
                    }
                });
                logger_1["default"].info("Contact settings updated for company ".concat(companyId));
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 6:
                updatedSettings = _b.sent();
                logger_1["default"].info("Updated settings from database:", updatedSettings === null || updatedSettings === void 0 ? void 0 : updatedSettings.get());
                return [2 /*return*/, res.status(200).json({
                        message: "Settings updated successfully",
                        settings: updatedSettings
                    })];
            case 7:
                error_2 = _b.sent();
                logger_1["default"].error("Error updating contact settings:", error_2);
                if (error_2 instanceof AppError_1["default"]) {
                    throw error_2;
                }
                throw new AppError_1["default"]("ERR_UPDATE_CONTACT_SETTINGS", 500);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var getStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, settings, contactStats, phoneStats, highPotentialContacts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                companyId = req.user.companyId;
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                settings = _a.sent();
                return [4 /*yield*/, (0, ContactScoringService_1.GetContactStats)(companyId)];
            case 2:
                contactStats = _a.sent();
                return [4 /*yield*/, (0, ContactPhoneService_1.GetPhoneSavingStats)(companyId)];
            case 3:
                phoneStats = _a.sent();
                return [4 /*yield*/, (0, ContactScoringService_1.GetHighPotentialContacts)(companyId, 10)];
            case 4:
                highPotentialContacts = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        settings: {
                            autoSaveContacts: (settings === null || settings === void 0 ? void 0 : settings.autoSaveContacts) || "disabled",
                            autoSaveContactsScore: (settings === null || settings === void 0 ? void 0 : settings.autoSaveContactsScore) || 7,
                            autoSaveContactsReason: (settings === null || settings === void 0 ? void 0 : settings.autoSaveContactsReason) || "high_potential"
                        },
                        contactStats: contactStats,
                        phoneStats: phoneStats,
                        highPotentialContacts: highPotentialContacts.map(function (contact) { return ({
                            id: contact.id,
                            name: contact.name,
                            number: contact.number,
                            potentialScore: contact.potentialScore,
                            isPotential: contact.isPotential,
                            savedToPhone: contact.savedToPhone,
                            createdAt: contact.createdAt
                        }); })
                    })];
            case 5:
                error_3 = _a.sent();
                logger_1["default"].error("Error getting contact stats:", error_3);
                throw new AppError_1["default"]("ERR_GET_CONTACT_STATS", 500);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getStats = getStats;
var batchSaveToPhone = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, contactIds, contacts, defaultWhatsapp, whatsappId, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                contactIds = req.body.contactIds;
                if (!contactIds || !Array.isArray(contactIds)) {
                    throw new AppError_1["default"]("contactIds must be an array", 400);
                }
                if (contactIds.length === 0) {
                    throw new AppError_1["default"]("contactIds cannot be empty", 400);
                }
                if (contactIds.length > 100) {
                    throw new AppError_1["default"]("Maximum 100 contacts per batch", 400);
                }
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            id: contactIds,
                            companyId: companyId,
                            savedToPhone: false // Apenas contatos não salvos
                        }
                    })];
            case 1:
                contacts = _a.sent();
                if (contacts.length === 0) {
                    return [2 /*return*/, res.status(200).json({
                            message: "No contacts to save (all already saved or not found)",
                            success: 0,
                            failed: 0
                        })];
                }
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            isDefault: true
                        }
                    })];
            case 2:
                defaultWhatsapp = _a.sent();
                if (!defaultWhatsapp) {
                    throw new AppError_1["default"]("No default WhatsApp connection found", 400);
                }
                whatsappId = defaultWhatsapp.id;
                return [4 /*yield*/, (0, ContactPhoneService_1.BatchSaveContactsToPhone)(contacts, whatsappId, companyId)];
            case 3:
                result = _a.sent();
                logger_1["default"].info("Batch save completed for company ".concat(companyId, ": ").concat(result.success, " success, ").concat(result.failed, " failed"));
                return [2 /*return*/, res.status(200).json({
                        message: "Batch save completed",
                        success: result.success,
                        failed: result.failed,
                        total: contacts.length
                    })];
            case 4:
                error_4 = _a.sent();
                logger_1["default"].error("Error in batch save to phone:", error_4);
                if (error_4 instanceof AppError_1["default"]) {
                    throw error_4;
                }
                throw new AppError_1["default"]("ERR_BATCH_SAVE_TO_PHONE", 500);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.batchSaveToPhone = batchSaveToPhone;
var testConfiguration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, testMessage, CalculatePotentialScore, score, isPotential, settings, wouldSave, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                companyId = req.user.companyId;
                testMessage = req.body.testMessage;
                if (!testMessage) {
                    throw new AppError_1["default"]("testMessage is required", 400);
                }
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/ContactServices/ContactScoringService")); })];
            case 1:
                CalculatePotentialScore = (_a.sent()).CalculatePotentialScore;
                score = CalculatePotentialScore(testMessage);
                isPotential = score >= 5;
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 2:
                settings = _a.sent();
                wouldSave = (settings === null || settings === void 0 ? void 0 : settings.autoSaveContacts) === "enabled" && score >= ((settings === null || settings === void 0 ? void 0 : settings.autoSaveContactsScore) || 7);
                return [2 /*return*/, res.status(200).json({
                        testMessage: testMessage,
                        score: score,
                        isPotential: isPotential,
                        wouldSave: wouldSave,
                        currentSettings: {
                            autoSaveContacts: (settings === null || settings === void 0 ? void 0 : settings.autoSaveContacts) || "enabled",
                            autoSaveContactsScore: (settings === null || settings === void 0 ? void 0 : settings.autoSaveContactsScore) || 7,
                            autoSaveContactsReason: (settings === null || settings === void 0 ? void 0 : settings.autoSaveContactsReason) || "high_potential"
                        }
                    })];
            case 3:
                error_5 = _a.sent();
                logger_1["default"].error("Error testing configuration:", error_5);
                if (error_5 instanceof AppError_1["default"]) {
                    throw error_5;
                }
                throw new AppError_1["default"]("ERR_TEST_CONFIGURATION", 500);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.testConfiguration = testConfiguration;
var resetSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, settings, io, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                companyId = req.user.companyId;
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                settings = _a.sent();
                if (!settings) {
                    throw new AppError_1["default"]("Settings not found", 404);
                }
                // Resetar para valores padrão
                return [4 /*yield*/, settings.update({
                        autoSaveContacts: "enabled",
                        autoSaveContactsScore: 7,
                        autoSaveContactsReason: "high_potential"
                    })];
            case 2:
                // Resetar para valores padrão
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId)).emit("company-".concat(companyId, "-contactSettings"), {
                    action: "reset",
                    settings: {
                        autoSaveContacts: "enabled",
                        autoSaveContactsScore: 7,
                        autoSaveContactsReason: "high_potential"
                    }
                });
                logger_1["default"].info("Contact settings reset for company ".concat(companyId));
                return [2 /*return*/, res.status(200).json({
                        message: "Settings reset to default values",
                        autoSaveContacts: "enabled",
                        autoSaveContactsScore: 7,
                        autoSaveContactsReason: "high_potential"
                    })];
            case 3:
                error_6 = _a.sent();
                logger_1["default"].error("Error resetting contact settings:", error_6);
                if (error_6 instanceof AppError_1["default"]) {
                    throw error_6;
                }
                throw new AppError_1["default"]("ERR_RESET_CONTACT_SETTINGS", 500);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.resetSettings = resetSettings;
