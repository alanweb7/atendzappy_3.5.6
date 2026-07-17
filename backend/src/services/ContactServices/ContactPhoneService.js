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
exports.GetPhoneSavingStats = exports.BatchSaveContactsToPhone = exports.ShouldSaveToPhone = exports.GetContactInfo = exports.CheckIfContactIsSaved = exports.SaveContactToPhone = void 0;
var wbot_1 = require("../../libs/wbot");
var logger_1 = __importDefault(require("../../utils/logger"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var sequelize_1 = require("sequelize");
var SaveContactToPhone = function (_a) {
    var contact = _a.contact, whatsappId = _a.whatsappId, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var wbot, contactName, contactJid, profileError_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    logger_1["default"].info("Saving contact ".concat(contact.id, " to phone: ").concat(contact.name || contact.number));
                    wbot = (0, wbot_1.getWbot)(whatsappId);
                    contactName = contact.name && contact.name !== contact.number
                        ? contact.name
                        : "Cliente ".concat(contact.number.slice(-4));
                    contactJid = "".concat(contact.number, "@c.us");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    // Usar profilePictureUrl para "registrar" o contato
                    return [4 /*yield*/, wbot.profilePictureUrl(contactJid)];
                case 2:
                    // Usar profilePictureUrl para "registrar" o contato
                    _b.sent();
                    logger_1["default"].debug("Contact ".concat(contactJid, " registered via profile picture"));
                    return [3 /*break*/, 4];
                case 3:
                    profileError_1 = _b.sent();
                    logger_1["default"].debug("Profile picture method failed for ".concat(contactJid, ":"), profileError_1.message);
                    return [3 /*break*/, 4];
                case 4: 
                // Atualizar informações no banco
                return [4 /*yield*/, contact.update({
                        savedToPhone: true,
                        savedToPhoneAt: new Date(),
                        savedToPhoneReason: 'auto_save'
                    })];
                case 5:
                    // Atualizar informações no banco
                    _b.sent();
                    logger_1["default"].info("Contact ".concat(contact.id, " successfully saved to phone: ").concat(contactName));
                    return [2 /*return*/, true];
                case 6:
                    error_1 = _b.sent();
                    logger_1["default"].error("Error saving contact ".concat(contact.id, " to phone:"), error_1);
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.SaveContactToPhone = SaveContactToPhone;
var CheckIfContactIsSaved = function (_a) {
    var contact = _a.contact, whatsappId = _a.whatsappId;
    return __awaiter(void 0, void 0, void 0, function () {
        var wbot, contactJid, profilePic, isSaved, picError_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    wbot = (0, wbot_1.getWbot)(whatsappId);
                    contactJid = "".concat(contact.number, "@c.us");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, wbot.profilePictureUrl(contactJid)];
                case 2:
                    profilePic = _b.sent();
                    isSaved = !!profilePic;
                    if (!(contact.savedToPhone !== isSaved)) return [3 /*break*/, 4];
                    return [4 /*yield*/, contact.update({ savedToPhone: isSaved })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    logger_1["default"].debug("Contact ".concat(contact.id, " phone status: ").concat(isSaved));
                    return [2 /*return*/, isSaved];
                case 5:
                    picError_1 = _b.sent();
                    // Se não conseguir profile picture, verifica status atual
                    logger_1["default"].debug("Profile picture check failed for ".concat(contact.id, ":"), picError_1.message);
                    return [2 /*return*/, contact.savedToPhone || false];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _b.sent();
                    logger_1["default"].warn("Error checking if contact ".concat(contact.id, " is saved to phone:"), error_2);
                    return [2 /*return*/, contact.savedToPhone || false];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.CheckIfContactIsSaved = CheckIfContactIsSaved;
var GetContactInfo = function (_a) {
    var contact = _a.contact, whatsappId = _a.whatsappId;
    return __awaiter(void 0, void 0, void 0, function () {
        var wbot, contactJid, profilePic, picError_2, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    wbot = (0, wbot_1.getWbot)(whatsappId);
                    contactJid = "".concat(contact.number, "@c.us");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, wbot.profilePictureUrl(contactJid)];
                case 2:
                    profilePic = _b.sent();
                    logger_1["default"].debug("Contact info retrieved for ".concat(contact.id, ":"), {
                        hasProfilePicture: !!profilePic,
                        profilePicUrl: profilePic
                    });
                    return [2 /*return*/, {
                            isMyContact: !!profilePic,
                            isWhatsAppContact: true,
                            name: contact.name,
                            profilePicUrl: profilePic
                        }];
                case 3:
                    picError_2 = _b.sent();
                    logger_1["default"].debug("Profile picture not available for ".concat(contact.id, ":"), picError_2.message);
                    return [2 /*return*/, {
                            isMyContact: false,
                            isWhatsAppContact: false,
                            name: contact.name,
                            profilePicUrl: null
                        }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _b.sent();
                    logger_1["default"].error("Error getting contact info for ".concat(contact.id, ":"), error_3);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.GetContactInfo = GetContactInfo;
var ShouldSaveToPhone = function (_a) {
    var contact = _a.contact, messageBody = _a.messageBody, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var settings, autoSaveConfig, minScore, reason, CalculatePotentialScore, currentScore, hour, isBusinessHours, hasMinScore, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                            where: { companyId: companyId }
                        })];
                case 1:
                    settings = _b.sent();
                    if (!settings) {
                        logger_1["default"].warn("No settings found for company ".concat(companyId));
                        return [2 /*return*/, false];
                    }
                    autoSaveConfig = settings.autoSaveContacts || 'disabled';
                    // Se está desativado, não salva nunca
                    if (autoSaveConfig === 'disabled') {
                        return [2 /*return*/, false];
                    }
                    // Se é "todos", sempre salva
                    if (autoSaveConfig === 'all') {
                        return [2 /*return*/, true];
                    }
                    // Se é "apenas importantes", verifica se é VIP
                    if (autoSaveConfig === 'important') {
                        return [2 /*return*/, contact.isPotential === true || contact.potentialScore >= 8];
                    }
                    if (!(autoSaveConfig === 'enabled')) return [3 /*break*/, 4];
                    minScore = settings.autoSaveContactsScore || 7;
                    reason = settings.autoSaveContactsReason || 'high_potential';
                    // Critério: score mínimo
                    if (reason === 'high_potential') {
                        return [2 /*return*/, (contact.potentialScore || 0) >= minScore];
                    }
                    if (!(reason === 'message_analysis' && messageBody)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./ContactScoringService')); })];
                case 2:
                    CalculatePotentialScore = (_b.sent()).CalculatePotentialScore;
                    currentScore = CalculatePotentialScore(messageBody);
                    return [2 /*return*/, currentScore >= minScore];
                case 3:
                    // Critério: horário comercial + score
                    if (reason === 'business_hours') {
                        hour = new Date().getHours();
                        isBusinessHours = hour >= 8 && hour <= 18;
                        hasMinScore = (contact.potentialScore || 0) >= minScore;
                        return [2 /*return*/, isBusinessHours && hasMinScore];
                    }
                    // Padrão: usar score
                    return [2 /*return*/, (contact.potentialScore || 0) >= minScore];
                case 4: return [2 /*return*/, false];
                case 5:
                    error_4 = _b.sent();
                    logger_1["default"].error("Error checking if contact should be saved to phone:", error_4);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.ShouldSaveToPhone = ShouldSaveToPhone;
var BatchSaveContactsToPhone = function (contacts, whatsappId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var success, failed, _i, contacts_1, contact, shouldSave, saved, error_5, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                success = 0;
                failed = 0;
                _i = 0, contacts_1 = contacts;
                _a.label = 1;
            case 1:
                if (!(_i < contacts_1.length)) return [3 /*break*/, 8];
                contact = contacts_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                return [4 /*yield*/, (0, exports.ShouldSaveToPhone)({
                        contact: contact,
                        companyId: companyId
                    })];
            case 3:
                shouldSave = _a.sent();
                if (!(shouldSave && !contact.savedToPhone)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, exports.SaveContactToPhone)({
                        contact: contact,
                        whatsappId: whatsappId,
                        companyId: companyId
                    })];
            case 4:
                saved = _a.sent();
                if (saved) {
                    success++;
                }
                else {
                    failed++;
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                logger_1["default"].error("Error processing contact ".concat(contact.id, ":"), error_5);
                failed++;
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8:
                logger_1["default"].info("Batch save completed: ".concat(success, " success, ").concat(failed, " failed"));
                return [2 /*return*/, { success: success, failed: failed }];
            case 9:
                error_6 = _a.sent();
                logger_1["default"].error("Error in batch save contacts to phone:", error_6);
                throw error_6;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.BatchSaveContactsToPhone = BatchSaveContactsToPhone;
var GetPhoneSavingStats = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var stats, recentSaves, error_7;
    var _a;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: { companyId: companyId },
                        attributes: [
                            [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('id')), 'totalContacts'],
                            [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.literal('CASE WHEN "savedToPhone" = true THEN 1 END')), 'savedToPhone'],
                            [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.literal('CASE WHEN "savedToPhone" = true AND "savedToPhoneAt" >= CURRENT_DATE - INTERVAL \'7 days\' THEN 1 END')), 'savedLastWeek'],
                            [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.literal('CASE WHEN "savedToPhone" = true AND "potentialScore" >= 7 THEN 1 END')), 'highPotentialSaved']
                        ]
                    })];
            case 1:
                stats = _f.sent();
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            savedToPhone: true,
                            savedToPhoneAt: (_a = {},
                                _a[sequelize_1.Op.gte] = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Últimos 7 dias
                            ,
                                _a)
                        },
                        order: [['savedToPhoneAt', 'DESC']],
                        limit: 10
                    })];
            case 2:
                recentSaves = _f.sent();
                return [2 /*return*/, {
                        totalContacts: parseInt(String(((_b = stats[0]) === null || _b === void 0 ? void 0 : _b.get('totalContacts')) || 0)),
                        savedToPhone: parseInt(String(((_c = stats[0]) === null || _c === void 0 ? void 0 : _c.get('savedToPhone')) || 0)),
                        savedLastWeek: parseInt(String(((_d = stats[0]) === null || _d === void 0 ? void 0 : _d.get('savedLastWeek')) || 0)),
                        highPotentialSaved: parseInt(String(((_e = stats[0]) === null || _e === void 0 ? void 0 : _e.get('highPotentialSaved')) || 0)),
                        recentSaves: recentSaves.map(function (contact) { return ({
                            id: contact.id,
                            name: contact.name,
                            number: contact.number,
                            savedAt: contact.savedToPhoneAt,
                            reason: contact.savedToPhoneReason
                        }); })
                    }];
            case 3:
                error_7 = _f.sent();
                logger_1["default"].error("Error getting phone saving stats:", error_7);
                throw error_7;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetPhoneSavingStats = GetPhoneSavingStats;
