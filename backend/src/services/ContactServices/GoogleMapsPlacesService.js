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
var axios_1 = __importDefault(require("axios"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var CreateOrUpdateContactServiceForImport_1 = __importDefault(require("./CreateOrUpdateContactServiceForImport"));
var logger_1 = __importDefault(require("../../utils/logger"));
var BASE = "https://maps.googleapis.com/maps/api/place";
var sleep = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
var textSearch = function (query, apiKey, language, maxResults) { return __awaiter(void 0, void 0, void 0, function () {
    var results, pageToken, params, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                results = [];
                pageToken = null;
                _a.label = 1;
            case 1:
                if (!(results.length < maxResults)) return [3 /*break*/, 4];
                params = { query: query, key: apiKey, language: language };
                if (pageToken)
                    params.pagetoken = pageToken;
                return [4 /*yield*/, axios_1["default"].get("".concat(BASE, "/textsearch/json"), { params: params })];
            case 2:
                data = (_a.sent()).data;
                if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
                    throw new Error("Google Places API erro: ".concat(data.status).concat(data.error_message ? " — " + data.error_message : ""));
                }
                results.push.apply(results, (data.results || []));
                if (!data.next_page_token || results.length >= maxResults)
                    return [3 /*break*/, 4];
                pageToken = data.next_page_token;
                return [4 /*yield*/, sleep(2000)];
            case 3:
                _a.sent(); // próximo token leva ~2s para ficar ativo
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, results.slice(0, maxResults)];
        }
    });
}); };
var getPlaceDetail = function (placeId, apiKey, language) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = [
                    "name",
                    "formatted_phone_number",
                    "international_phone_number",
                    "website",
                    "business_status",
                    "formatted_address",
                    "rating",
                    "user_ratings_total",
                    "opening_hours",
                    "types"
                ].join(",");
                return [4 /*yield*/, axios_1["default"].get("".concat(BASE, "/details/json"), {
                        params: { place_id: placeId, key: apiKey, language: language, fields: fields }
                    })];
            case 1:
                data = (_a.sent()).data;
                if (data.status !== "OK") {
                    throw new Error("Place Details API erro: ".concat(data.status));
                }
                return [2 /*return*/, __assign({ place_id: placeId, name: "" }, data.result)];
        }
    });
}); };
var scrapeWebsite = function (websiteUrl, socialEnabled) { return __awaiter(void 0, void 0, void 0, function () {
    var html, email, mailtoMatch, emailMatch_1, skip, patterns, social, _i, _a, _b, platform, pattern, key, matches, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get(websiteUrl, {
                        timeout: 8000,
                        headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
                        maxRedirects: 3,
                        maxContentLength: 500000
                    })];
            case 1:
                html = (_d.sent()).data;
                email = "";
                mailtoMatch = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/i);
                if (mailtoMatch) {
                    email = mailtoMatch[1];
                }
                else {
                    emailMatch_1 = html.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
                    if (emailMatch_1) {
                        skip = ["@example", "@sentry", "@jquery", "@google", "@w3.org", ".min.js"];
                        if (!skip.some(function (s) { return emailMatch_1[1].includes(s); })) {
                            email = emailMatch_1[1];
                        }
                    }
                }
                patterns = {
                    facebook: /https?:\/\/(?:www\.)?facebook\.com\/(?!sharer)[^\s"'<>?#]+/gi,
                    instagram: /https?:\/\/(?:www\.)?instagram\.com\/[^\s"'<>?#]+/gi,
                    tiktok: /https?:\/\/(?:www\.)?tiktok\.com\/@[^\s"'<>?#]+/gi,
                    twitter: /https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[^\s"'<>?#]+/gi,
                    youtube: /https?:\/\/(?:www\.)?youtube\.com\/(?:@|channel\/|c\/)[^\s"'<>?#]+/gi
                };
                social = {};
                for (_i = 0, _a = Object.entries(patterns); _i < _a.length; _i++) {
                    _b = _a[_i], platform = _b[0], pattern = _b[1];
                    key = platform + "s";
                    if (!socialEnabled[key])
                        continue;
                    matches = html.match(pattern);
                    if (matches === null || matches === void 0 ? void 0 : matches[0])
                        social[platform] = matches[0].replace(/['"]+$/, "");
                }
                return [2 /*return*/, { email: email, social: social }];
            case 2:
                _c = _d.sent();
                return [2 /*return*/, { email: "", social: {} }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var buildCsv = function (rows) {
    if (rows.length === 0) {
        return "nome,telefone,email,endereco,website,avaliacao,totalAvaliacoes,aberto,tipo,status\n";
    }
    // União de todas as chaves para garantir colunas consistentes
    var allKeys = Array.from(new Set(rows.flatMap(function (r) { return Object.keys(r); })));
    var header = allKeys.join(",");
    var lines = rows.map(function (row) {
        return allKeys
            .map(function (k) { var _a; return "\"".concat(String((_a = row[k]) !== null && _a !== void 0 ? _a : "").replace(/"/g, '""'), "\""); })
            .join(",");
    });
    return __spreadArray([header], lines, true).join("\n");
};
var GoogleMapsPlacesService = function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, _a, keywords, _b, maxResultsPerKeyword, _c, locationQuery, _d, language, _e, scrapeContacts, _f, scrapePlaceDetailPage, _g, skipClosedPlaces, scrapeSocialMediaProfiles, companyId, socialEnabled, collectSocial, allRows, imported, skipped, i, term, places, err_1, _i, places_1, place, detail, err_2, email, row, webData, openNow, tipos, phone, _h, uploadsDir, csvFileName;
    var _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
                if (!apiKey) {
                    throw new Error("GOOGLE_PLACES_API_KEY não configurada. Adicione a variável no .env e reinicie o servidor.");
                }
                _a = job.data, keywords = _a.keywords, _b = _a.maxResultsPerKeyword, maxResultsPerKeyword = _b === void 0 ? 20 : _b, _c = _a.locationQuery, locationQuery = _c === void 0 ? "" : _c, _d = _a.language, language = _d === void 0 ? "pt-BR" : _d, _e = _a.scrapeContacts, scrapeContacts = _e === void 0 ? true : _e, _f = _a.scrapePlaceDetailPage, scrapePlaceDetailPage = _f === void 0 ? true : _f, _g = _a.skipClosedPlaces, skipClosedPlaces = _g === void 0 ? false : _g, scrapeSocialMediaProfiles = _a.scrapeSocialMediaProfiles, companyId = _a.companyId;
                logger_1["default"].info("[GoogleMapsPlaces] Job ".concat(job.id, " iniciado \u2014 ").concat(keywords.length, " termo(s), empresa ").concat(companyId));
                socialEnabled = typeof scrapeSocialMediaProfiles === "object" && scrapeSocialMediaProfiles
                    ? scrapeSocialMediaProfiles
                    : {};
                collectSocial = Object.values(socialEnabled).some(Boolean);
                allRows = [];
                imported = 0;
                skipped = 0;
                i = 0;
                _m.label = 1;
            case 1:
                if (!(i < keywords.length)) return [3 /*break*/, 22];
                term = locationQuery ? "".concat(keywords[i], " ").concat(locationQuery) : keywords[i];
                logger_1["default"].info("[GoogleMapsPlaces] [".concat(i + 1, "/").concat(keywords.length, "] Buscando: \"").concat(term, "\""));
                places = [];
                _m.label = 2;
            case 2:
                _m.trys.push([2, 4, , 5]);
                return [4 /*yield*/, textSearch(term, apiKey, language, maxResultsPerKeyword)];
            case 3:
                places = _m.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _m.sent();
                logger_1["default"].error("[GoogleMapsPlaces] Erro na busca \"".concat(term, "\": ").concat(err_1.message));
                return [3 /*break*/, 21];
            case 5:
                logger_1["default"].info("[GoogleMapsPlaces] \"".concat(term, "\" \u2192 ").concat(places.length, " resultado(s)"));
                _i = 0, places_1 = places;
                _m.label = 6;
            case 6:
                if (!(_i < places_1.length)) return [3 /*break*/, 19];
                place = places_1[_i];
                if (skipClosedPlaces &&
                    place.business_status &&
                    (place.business_status === "CLOSED_PERMANENTLY" ||
                        place.business_status === "CLOSED_TEMPORARILY")) {
                    return [3 /*break*/, 18];
                }
                detail = place;
                _m.label = 7;
            case 7:
                _m.trys.push([7, 9, , 10]);
                return [4 /*yield*/, getPlaceDetail(place.place_id, apiKey, language)];
            case 8:
                detail = _m.sent();
                return [3 /*break*/, 10];
            case 9:
                err_2 = _m.sent();
                logger_1["default"].warn("[GoogleMapsPlaces] Detalhe falhou ".concat(place.place_id, ": ").concat(err_2.message));
                return [3 /*break*/, 10];
            case 10:
                email = "";
                row = {};
                if (!(detail.website && (scrapeContacts || collectSocial))) return [3 /*break*/, 12];
                return [4 /*yield*/, scrapeWebsite(detail.website, socialEnabled)];
            case 11:
                webData = _m.sent();
                email = webData.email;
                if (collectSocial) {
                    if (socialEnabled.facebooks && webData.social.facebook)
                        row.facebook = webData.social.facebook;
                    if (socialEnabled.instagrams && webData.social.instagram)
                        row.instagram = webData.social.instagram;
                    if (socialEnabled.tiktoks && webData.social.tiktok)
                        row.tiktok = webData.social.tiktok;
                    if (socialEnabled.twitters && webData.social.twitter)
                        row.twitter = webData.social.twitter;
                    if (socialEnabled.youtubes && webData.social.youtube)
                        row.youtube = webData.social.youtube;
                }
                _m.label = 12;
            case 12:
                openNow = (_j = detail.opening_hours) === null || _j === void 0 ? void 0 : _j.open_now;
                tipos = Array.isArray(detail.types)
                    ? detail.types.slice(0, 3).join(", ")
                    : "";
                Object.assign(row, {
                    nome: detail.name || "",
                    telefone: detail.formatted_phone_number || "",
                    email: email,
                    endereco: detail.formatted_address || "",
                    website: detail.website || "",
                    avaliacao: (_k = detail.rating) !== null && _k !== void 0 ? _k : "",
                    totalAvaliacoes: (_l = detail.user_ratings_total) !== null && _l !== void 0 ? _l : "",
                    aberto: openNow === true ? "Sim" : openNow === false ? "Não" : "",
                    tipo: tipos,
                    status: detail.business_status || ""
                });
                allRows.push(row);
                phone = String(row.telefone || "").replace(/\D/g, "");
                if (!(phone.length >= 8)) return [3 /*break*/, 17];
                _m.label = 13;
            case 13:
                _m.trys.push([13, 15, , 16]);
                return [4 /*yield*/, (0, CreateOrUpdateContactServiceForImport_1["default"])({
                        name: String(row.nome),
                        number: phone,
                        isGroup: false,
                        companyId: companyId
                    })];
            case 14:
                _m.sent();
                imported++;
                return [3 /*break*/, 16];
            case 15:
                _h = _m.sent();
                skipped++;
                return [3 /*break*/, 16];
            case 16: return [3 /*break*/, 18];
            case 17:
                skipped++;
                _m.label = 18;
            case 18:
                _i++;
                return [3 /*break*/, 6];
            case 19: return [4 /*yield*/, job.progress(Math.round(((i + 1) / keywords.length) * 100))];
            case 20:
                _m.sent();
                _m.label = 21;
            case 21:
                i++;
                return [3 /*break*/, 1];
            case 22:
                uploadsDir = path_1["default"].resolve(__dirname, "../../../public/uploads");
                if (!fs_1["default"].existsSync(uploadsDir))
                    fs_1["default"].mkdirSync(uploadsDir, { recursive: true });
                csvFileName = "scrape_".concat(job.id, ".csv");
                fs_1["default"].writeFileSync(path_1["default"].join(uploadsDir, csvFileName), buildCsv(allRows), "utf8");
                logger_1["default"].info("[GoogleMapsPlaces] Job ".concat(job.id, " conclu\u00EDdo \u2014 ").concat(imported, " importados, ").concat(skipped, " ignorados"));
                return [2 /*return*/, { imported: imported, skipped: skipped, csvPath: "uploads/".concat(csvFileName) }];
        }
    });
}); };
exports["default"] = GoogleMapsPlacesService;
