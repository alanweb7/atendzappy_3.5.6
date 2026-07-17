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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.search = void 0;
var axios_1 = __importDefault(require("axios"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
var search = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, city, state, query, type, keyword, _b, radius, openNow, minRating, minUserRatings, hasWebsite, pageToken, address, geocodeUrl, geoResp, location_1, lat, lng, placesUrl, textQuery, placesParams, placesResp, results, minRatingNum_1, minUserRatingsNum_1, detailed, wantsWebsite, detailsUrl, _i, results_1, place, detailsResp, det, hasSite, _c, finalResults, err_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!GOOGLE_API_KEY) {
                    throw new AppError_1["default"]("GOOGLE_PLACES_API_KEY not configured", 500);
                }
                _a = req.query, city = _a.city, state = _a.state, query = _a.query, type = _a.type, keyword = _a.keyword, _b = _a.radius, radius = _b === void 0 ? 5000 : _b, openNow = _a.openNow, minRating = _a.minRating, minUserRatings = _a.minUserRatings, hasWebsite = _a.hasWebsite, pageToken = _a.pageToken;
                if (!city || !state) {
                    throw new AppError_1["default"]("CITY_AND_STATE_REQUIRED", 400);
                }
                _e.label = 1;
            case 1:
                _e.trys.push([1, 10, , 11]);
                address = "".concat(city, ", ").concat(state, ", Brazil");
                geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json";
                return [4 /*yield*/, axios_1["default"].get(geocodeUrl, {
                        params: {
                            address: address,
                            key: GOOGLE_API_KEY
                        }
                    })];
            case 2:
                geoResp = _e.sent();
                if (!((_d = geoResp.data.results) === null || _d === void 0 ? void 0 : _d.length)) {
                    throw new AppError_1["default"]("GEOCODE_NOT_FOUND", 404);
                }
                location_1 = geoResp.data.results[0].geometry.location;
                lat = location_1.lat;
                lng = location_1.lng;
                placesUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
                textQuery = query || keyword || "";
                placesParams = {
                    key: GOOGLE_API_KEY,
                    location: "".concat(lat, ",").concat(lng),
                    radius: radius,
                    language: "pt-BR",
                    region: "br"
                };
                if (textQuery) {
                    placesParams.query = textQuery;
                }
                if (type) {
                    placesParams.type = type;
                }
                if (keyword) {
                    placesParams.keyword = keyword;
                }
                if (pageToken) {
                    placesParams.pagetoken = pageToken;
                }
                if (typeof openNow !== "undefined") {
                    placesParams.opennow = openNow === "true";
                }
                return [4 /*yield*/, axios_1["default"].get(placesUrl, { params: placesParams })];
            case 3:
                placesResp = _e.sent();
                results = placesResp.data.results || [];
                minRatingNum_1 = minRating ? Number(minRating) : undefined;
                minUserRatingsNum_1 = minUserRatings ? Number(minUserRatings) : undefined;
                if (minRatingNum_1) {
                    results = results.filter(function (r) { return (r.rating || 0) >= minRatingNum_1; });
                }
                if (minUserRatingsNum_1) {
                    results = results.filter(function (r) { return (r.user_ratings_total || 0) >= minUserRatingsNum_1; });
                }
                detailed = results;
                if (!(typeof hasWebsite !== "undefined")) return [3 /*break*/, 9];
                wantsWebsite = hasWebsite === "true";
                detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json";
                detailed = [];
                _i = 0, results_1 = results;
                _e.label = 4;
            case 4:
                if (!(_i < results_1.length)) return [3 /*break*/, 9];
                place = results_1[_i];
                _e.label = 5;
            case 5:
                _e.trys.push([5, 7, , 8]);
                return [4 /*yield*/, axios_1["default"].get(detailsUrl, {
                        params: {
                            place_id: place.place_id,
                            fields: "name,formatted_address,geometry,website,formatted_phone_number,types,rating,user_ratings_total",
                            key: GOOGLE_API_KEY,
                            language: "pt-BR",
                            region: "br"
                        }
                    })];
            case 6:
                detailsResp = _e.sent();
                det = detailsResp.data.result;
                hasSite = !!det.website;
                if ((wantsWebsite && hasSite) || (!wantsWebsite && !hasSite)) {
                    detailed.push(__assign(__assign({}, place), { details: det }));
                }
                return [3 /*break*/, 8];
            case 7:
                _c = _e.sent();
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 4];
            case 9:
                finalResults = (typeof hasWebsite !== "undefined" ? detailed : results).map(function (r) {
                    var _a, _b, _c, _d;
                    var base = r.details || r;
                    return {
                        name: base.name,
                        address: base.formatted_address,
                        lat: (_b = (_a = base.geometry) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.lat,
                        lng: (_d = (_c = base.geometry) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.lng,
                        rating: base.rating,
                        userRatingsTotal: base.user_ratings_total,
                        placeId: base.place_id || r.place_id,
                        website: base.website || null,
                        phone: base.formatted_phone_number || null,
                        types: base.types || []
                    };
                });
                return [2 /*return*/, res.status(200).json({
                        results: finalResults,
                        nextPageToken: placesResp.data.next_page_token || null
                    })];
            case 10:
                err_1 = _e.sent();
                if (err_1 instanceof AppError_1["default"]) {
                    throw err_1;
                }
                throw new AppError_1["default"]("GOOGLE_PLACES_ERROR", 500);
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.search = search;
