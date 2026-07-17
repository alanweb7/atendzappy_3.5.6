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
exports.autoTranslate = exports.importTranslations = exports.exportTranslations = exports.saveTranslations = exports.getTranslationsByLanguage = exports.listAllTranslations = exports.deleteLanguage = exports.updateLanguage = exports.createLanguage = exports.listLanguages = void 0;
var Language_1 = __importDefault(require("../models/Language"));
var Translation_1 = __importDefault(require("../models/Translation"));
var AppError_1 = __importDefault(require("../errors/AppError"));
// ==================== LANGUAGES ====================
var listLanguages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var languages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Language_1["default"].findAll({
                    order: [["name", "ASC"]]
                })];
            case 1:
                languages = _a.sent();
                return [2 /*return*/, res.status(200).json(languages)];
        }
    });
}); };
exports.listLanguages = listLanguages;
var createLanguage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, code, name, existing, language;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                _a = req.body, code = _a.code, name = _a.name;
                if (!code || !name) {
                    throw new AppError_1["default"]("ERR_MISSING_PARAMS", 400);
                }
                return [4 /*yield*/, Language_1["default"].findOne({ where: { code: code } })];
            case 1:
                existing = _b.sent();
                if (existing) {
                    throw new AppError_1["default"]("ERR_LANGUAGE_ALREADY_EXISTS", 400);
                }
                return [4 /*yield*/, Language_1["default"].create({ code: code, name: name, active: true })];
            case 2:
                language = _b.sent();
                return [2 /*return*/, res.status(201).json(language)];
        }
    });
}); };
exports.createLanguage = createLanguage;
var updateLanguage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a, name, active, language;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                id = req.params.id;
                _a = req.body, name = _a.name, active = _a.active;
                return [4 /*yield*/, Language_1["default"].findByPk(id)];
            case 1:
                language = _b.sent();
                if (!language) {
                    throw new AppError_1["default"]("ERR_LANGUAGE_NOT_FOUND", 404);
                }
                if (name !== undefined)
                    language.name = name;
                if (active !== undefined)
                    language.active = active;
                return [4 /*yield*/, language.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json(language)];
        }
    });
}); };
exports.updateLanguage = updateLanguage;
var deleteLanguage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, language;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                id = req.params.id;
                return [4 /*yield*/, Language_1["default"].findByPk(id)];
            case 1:
                language = _a.sent();
                if (!language) {
                    throw new AppError_1["default"]("ERR_LANGUAGE_NOT_FOUND", 404);
                }
                // Delete all translations for this language
                return [4 /*yield*/, Translation_1["default"].destroy({ where: { languageCode: language.code } })];
            case 2:
                // Delete all translations for this language
                _a.sent();
                return [4 /*yield*/, language.destroy()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Language deleted" })];
        }
    });
}); };
exports.deleteLanguage = deleteLanguage;
// ==================== TRANSLATIONS ====================
var listAllTranslations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var translations, languages, grouped, _i, translations_1, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Translation_1["default"].findAll()];
            case 1:
                translations = _a.sent();
                return [4 /*yield*/, Language_1["default"].findAll({ where: { active: true } })];
            case 2:
                languages = _a.sent();
                grouped = {};
                for (_i = 0, translations_1 = translations; _i < translations_1.length; _i++) {
                    t = translations_1[_i];
                    if (!grouped[t.languageCode]) {
                        grouped[t.languageCode] = {};
                    }
                    grouped[t.languageCode][t.key] = t.value;
                }
                return [2 /*return*/, res.status(200).json({ translations: grouped, languages: languages })];
        }
    });
}); };
exports.listAllTranslations = listAllTranslations;
var getTranslationsByLanguage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var language, translations, result, _i, translations_2, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                language = req.params.language;
                return [4 /*yield*/, Translation_1["default"].findAll({
                        where: { languageCode: language }
                    })];
            case 1:
                translations = _a.sent();
                result = {};
                for (_i = 0, translations_2 = translations; _i < translations_2.length; _i++) {
                    t = translations_2[_i];
                    result[t.key] = t.value;
                }
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
exports.getTranslationsByLanguage = getTranslationsByLanguage;
var saveTranslations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, language, translations, keys, _i, keys_1, key, value, existing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                language = req.params.language;
                translations = req.body.translations;
                if (!translations || typeof translations !== "object") {
                    throw new AppError_1["default"]("ERR_INVALID_DATA", 400);
                }
                keys = Object.keys(translations);
                _i = 0, keys_1 = keys;
                _a.label = 1;
            case 1:
                if (!(_i < keys_1.length)) return [3 /*break*/, 9];
                key = keys_1[_i];
                value = translations[key];
                if (!(value === null || value === undefined || value === "")) return [3 /*break*/, 3];
                // Delete translation if empty
                return [4 /*yield*/, Translation_1["default"].destroy({
                        where: { languageCode: language, key: key }
                    })];
            case 2:
                // Delete translation if empty
                _a.sent();
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, Translation_1["default"].findOne({
                    where: { languageCode: language, key: key }
                })];
            case 4:
                existing = _a.sent();
                if (!existing) return [3 /*break*/, 6];
                existing.value = value;
                return [4 /*yield*/, existing.save()];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, Translation_1["default"].create({
                    languageCode: language,
                    key: key,
                    value: value
                })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 1];
            case 9: return [2 /*return*/, res.status(200).json({ message: "Translations saved" })];
        }
    });
}); };
exports.saveTranslations = saveTranslations;
var exportTranslations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var language, translations, result, _i, translations_3, t, lang;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                language = req.params.language;
                return [4 /*yield*/, Translation_1["default"].findAll({
                        where: { languageCode: language }
                    })];
            case 1:
                translations = _a.sent();
                result = {};
                for (_i = 0, translations_3 = translations; _i < translations_3.length; _i++) {
                    t = translations_3[_i];
                    result[t.key] = t.value;
                }
                return [4 /*yield*/, Language_1["default"].findOne({ where: { code: language } })];
            case 2:
                lang = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        language: language,
                        name: (lang === null || lang === void 0 ? void 0 : lang.name) || language,
                        translations: result
                    })];
        }
    });
}); };
exports.exportTranslations = exportTranslations;
var importTranslations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, language, translations, keys, imported, _i, keys_2, key, value, existing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                language = req.params.language;
                translations = req.body.translations;
                if (!translations || typeof translations !== "object") {
                    throw new AppError_1["default"]("ERR_INVALID_DATA", 400);
                }
                keys = Object.keys(translations);
                imported = 0;
                _i = 0, keys_2 = keys;
                _a.label = 1;
            case 1:
                if (!(_i < keys_2.length)) return [3 /*break*/, 8];
                key = keys_2[_i];
                value = translations[key];
                if (!value)
                    return [3 /*break*/, 7];
                return [4 /*yield*/, Translation_1["default"].findOne({
                        where: { languageCode: language, key: key }
                    })];
            case 2:
                existing = _a.sent();
                if (!existing) return [3 /*break*/, 4];
                existing.value = value;
                return [4 /*yield*/, existing.save()];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, Translation_1["default"].create({
                    languageCode: language,
                    key: key,
                    value: value
                })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                imported++;
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/, res.status(200).json({ message: "".concat(imported, " translations imported") })];
        }
    });
}); };
exports.importTranslations = importTranslations;
// ==================== AUTO TRANSLATE (MyMemory API - Free) ====================
var mapLanguageCode = function (code) {
    var map = {
        "pt-BR": "pt",
        "pt": "pt",
        "en": "en",
        "es": "es",
        "fr": "fr",
        "de": "de",
        "it": "it",
        "ja": "ja",
        "ko": "ko",
        "zh": "zh",
        "ru": "ru",
        "ar": "ar",
        "hi": "hi",
        "nl": "nl",
        "tr": "tr",
        "pl": "pl"
    };
    return map[code] || code;
};
var translateText = function (text, sourceLang, targetLang) { return __awaiter(void 0, void 0, void 0, function () {
    var langPair, url, response, data, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                langPair = "".concat(sourceLang, "|").concat(targetLang);
                url = "https://api.mymemory.translated.net/get?q=".concat(encodeURIComponent(text), "&langpair=").concat(encodeURIComponent(langPair));
                return [4 /*yield*/, fetch(url, {
                        method: "GET",
                        headers: { "Accept": "application/json" }
                    })];
            case 1:
                response = _b.sent();
                if (!response.ok) {
                    throw new Error("MyMemory error: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _b.sent();
                if (data.responseStatus === 200 && ((_a = data.responseData) === null || _a === void 0 ? void 0 : _a.translatedText)) {
                    return [2 /*return*/, data.responseData.translatedText];
                }
                return [2 /*return*/, text];
            case 3:
                err_1 = _b.sent();
                console.error("[AutoTranslate] Error translating:", err_1);
                return [2 /*return*/, text];
            case 4: return [2 /*return*/];
        }
    });
}); };
var autoTranslate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, language, _a, keys, _b, sourceLanguage, _c, overwrite, sourceLang, targetLang, translated, skipped, results, _i, keys_3, item, key, sourceText, existing_1, translatedText, existing, err_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 13, , 14]);
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                language = req.params.language;
                _a = req.body, keys = _a.keys, _b = _a.sourceLanguage, sourceLanguage = _b === void 0 ? "pt-BR" : _b, _c = _a.overwrite, overwrite = _c === void 0 ? false : _c;
                if (!keys || !Array.isArray(keys) || keys.length === 0) {
                    throw new AppError_1["default"]("ERR_INVALID_DATA", 400);
                }
                sourceLang = mapLanguageCode(sourceLanguage);
                targetLang = mapLanguageCode(language);
                if (sourceLang === targetLang) {
                    throw new AppError_1["default"]("ERR_SAME_LANGUAGE", 400);
                }
                translated = 0;
                skipped = 0;
                results = {};
                _i = 0, keys_3 = keys;
                _d.label = 1;
            case 1:
                if (!(_i < keys_3.length)) return [3 /*break*/, 12];
                item = keys_3[_i];
                key = item.key, sourceText = item.sourceText;
                if (!key || !sourceText)
                    return [3 /*break*/, 11];
                if (!!overwrite) return [3 /*break*/, 3];
                return [4 /*yield*/, Translation_1["default"].findOne({
                        where: { languageCode: language, key: key }
                    })];
            case 2:
                existing_1 = _d.sent();
                if (existing_1 && existing_1.value) {
                    skipped++;
                    results[key] = existing_1.value;
                    return [3 /*break*/, 11];
                }
                _d.label = 3;
            case 3: return [4 /*yield*/, translateText(sourceText, sourceLang, targetLang)];
            case 4:
                translatedText = _d.sent();
                return [4 /*yield*/, Translation_1["default"].findOne({
                        where: { languageCode: language, key: key }
                    })];
            case 5:
                existing = _d.sent();
                if (!existing) return [3 /*break*/, 7];
                existing.value = translatedText;
                return [4 /*yield*/, existing.save()];
            case 6:
                _d.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, Translation_1["default"].create({
                    languageCode: language,
                    key: key,
                    value: translatedText
                })];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9:
                results[key] = translatedText;
                translated++;
                // Delay para evitar rate limiting (MyMemory: ~10 req/s free)
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
            case 10:
                // Delay para evitar rate limiting (MyMemory: ~10 req/s free)
                _d.sent();
                _d.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 1];
            case 12: return [2 /*return*/, res.status(200).json({
                    message: "".concat(translated, " traduzidas, ").concat(skipped, " ignoradas"),
                    translated: translated,
                    skipped: skipped,
                    results: results
                })];
            case 13:
                err_2 = _d.sent();
                console.error("[AutoTranslate] Unhandled error:", err_2);
                if (err_2 instanceof AppError_1["default"]) {
                    throw err_2;
                }
                return [2 /*return*/, res.status(500).json({ error: "Erro na tradução automática" })];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.autoTranslate = autoTranslate;
