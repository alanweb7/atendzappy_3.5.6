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
exports.updateBusinessInfo = exports.getBusinessInfo = exports.deletePost = exports.createPost = exports.listPosts = exports.getMetrics = exports.replyReview = exports.listReviews = exports.deleteAccount = exports.listAccounts = exports.callback = exports.getOAuthUrl = void 0;
var axios_1 = __importDefault(require("axios"));
var GoogleBusinessAccount_1 = __importDefault(require("../models/GoogleBusinessAccount"));
var WhitelabelService_1 = require("../services/SettingService/WhitelabelService");
var logger_1 = __importDefault(require("../utils/logger"));
var GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
var GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
var GOOGLE_BUSINESS_BASE = "https://mybusinessaccountmanagement.googleapis.com/v1";
var GOOGLE_MYBUSINESS_BASE = "https://mybusiness.googleapis.com/v4";
var GOOGLE_REVIEWS_BASE = "https://mybusinessreviews.googleapis.com/v1";
var GOOGLE_POSTS_BASE = "https://mybusinessnotifications.googleapis.com/v1";
var SCOPES = [
    "https://www.googleapis.com/auth/business.manage",
    "https://www.googleapis.com/auth/plus.business.manage"
].join(" ");
// ────────── OAuth ──────────
var getOAuthUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, config, clientId, backendUrl, redirectUri, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(Number(companyId))];
            case 1:
                config = _a.sent();
                clientId = config.googleClientId;
                if (!clientId) {
                    return [2 /*return*/, res.status(400).json({ error: "Google Client ID não configurado. Configure em Configurações → Whitelabel → Google." })];
                }
                backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
                redirectUri = "".concat(backendUrl, "/google-business-callback");
                url = "".concat(GOOGLE_OAUTH_URL, "?client_id=").concat(clientId, "&redirect_uri=").concat(encodeURIComponent(redirectUri), "&scope=").concat(encodeURIComponent(SCOPES), "&response_type=code&access_type=offline&prompt=consent&state=").concat(companyId);
                return [2 /*return*/, res.json({ url: url })];
        }
    });
}); };
exports.getOAuthUrl = getOAuthUrl;
var callback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var frontendUrl, _a, code, state, error, companyId, config, clientId, clientSecret, backendUrl, redirectUri, tokenRes, _b, access_token, refresh_token, expires_in, tokenExpiry, accountsRes, accounts, _i, accounts_1, account, locationId, locationName, locRes, locations, _c, existing, err_1, errMsg, errStatus, errData, frontendUrl_1;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                frontendUrl = process.env.FRONTEND_URL;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 16, , 17]);
                _a = req.query, code = _a.code, state = _a.state, error = _a.error;
                if (error || !code || !state) {
                    res.redirect("".concat(frontendUrl, "/marketing/google-meu-negocio?error=oauth-denied"));
                    return [2 /*return*/];
                }
                companyId = parseInt(state, 10);
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(companyId)];
            case 2:
                config = _f.sent();
                clientId = config.googleClientId;
                clientSecret = config.googleClientSecret;
                if (!clientId || !clientSecret) {
                    res.redirect("".concat(frontendUrl, "/marketing/google-meu-negocio?error=not-configured"));
                    return [2 /*return*/];
                }
                backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
                redirectUri = "".concat(backendUrl, "/google-business-callback");
                return [4 /*yield*/, axios_1["default"].post(GOOGLE_TOKEN_URL, {
                        code: code,
                        client_id: clientId,
                        client_secret: clientSecret,
                        redirect_uri: redirectUri,
                        grant_type: "authorization_code"
                    })];
            case 3:
                tokenRes = _f.sent();
                _b = tokenRes.data, access_token = _b.access_token, refresh_token = _b.refresh_token, expires_in = _b.expires_in;
                tokenExpiry = new Date(Date.now() + expires_in * 1000);
                return [4 /*yield*/, axios_1["default"].get("".concat(GOOGLE_BUSINESS_BASE, "/accounts"), {
                        headers: { Authorization: "Bearer ".concat(access_token) }
                    })];
            case 4:
                accountsRes = _f.sent();
                accounts = accountsRes.data.accounts || [];
                if (accounts.length === 0) {
                    res.redirect("".concat(frontendUrl, "/marketing/google-meu-negocio?error=no-accounts"));
                    return [2 /*return*/];
                }
                _i = 0, accounts_1 = accounts;
                _f.label = 5;
            case 5:
                if (!(_i < accounts_1.length)) return [3 /*break*/, 15];
                account = accounts_1[_i];
                locationId = null;
                locationName = null;
                _f.label = 6;
            case 6:
                _f.trys.push([6, 8, , 9]);
                return [4 /*yield*/, axios_1["default"].get("".concat(GOOGLE_BUSINESS_BASE, "/").concat(account.name, "/locations"), {
                        headers: { Authorization: "Bearer ".concat(access_token) }
                    })];
            case 7:
                locRes = _f.sent();
                locations = locRes.data.locations || [];
                if (locations[0]) {
                    locationId = locations[0].name;
                    locationName = locations[0].title || locations[0].name;
                }
                return [3 /*break*/, 9];
            case 8:
                _c = _f.sent();
                return [3 /*break*/, 9];
            case 9: return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({
                    where: { companyId: companyId, accountId: account.name }
                })];
            case 10:
                existing = _f.sent();
                if (!existing) return [3 /*break*/, 12];
                return [4 /*yield*/, existing.update({ accessToken: access_token, refreshToken: refresh_token, tokenExpiry: tokenExpiry, status: "CONNECTED", locationId: locationId, locationName: locationName })];
            case 11:
                _f.sent();
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, GoogleBusinessAccount_1["default"].create({
                    companyId: companyId,
                    name: account.accountName || account.name,
                    accountId: account.name,
                    locationId: locationId,
                    locationName: locationName,
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    tokenExpiry: tokenExpiry,
                    status: "CONNECTED"
                })];
            case 13:
                _f.sent();
                _f.label = 14;
            case 14:
                _i++;
                return [3 /*break*/, 5];
            case 15:
                res.redirect("".concat(frontendUrl, "/marketing/google-meu-negocio?success=connected"));
                return [3 /*break*/, 17];
            case 16:
                err_1 = _f.sent();
                errMsg = (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || String(err_1);
                errStatus = (_d = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _d === void 0 ? void 0 : _d.status;
                errData = JSON.stringify((_e = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _e === void 0 ? void 0 : _e.data);
                logger_1["default"].error("[GoogleBusiness] callback error: ".concat(errMsg, " | status=").concat(errStatus, " | data=").concat(errData));
                frontendUrl_1 = process.env.FRONTEND_URL;
                res.redirect("".concat(frontendUrl_1, "/marketing/google-meu-negocio?error=oauth-failed"));
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.callback = callback;
// ────────── Accounts ──────────
var listAccounts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findAll({ where: { companyId: companyId } })];
            case 1:
                accounts = _a.sent();
                return [2 /*return*/, res.json(accounts)];
        }
    });
}); };
exports.listAccounts = listAccounts;
var deleteAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].destroy({ where: { id: id, companyId: companyId } })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.deleteAccount = deleteAccount;
// ────────── Helper: token válido ──────────
var getValidToken = function (account, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var config, tokenRes, _a, access_token, expires_in;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (account.tokenExpiry && new Date() < account.tokenExpiry) {
                    return [2 /*return*/, account.accessToken];
                }
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(companyId)];
            case 1:
                config = _b.sent();
                return [4 /*yield*/, axios_1["default"].post(GOOGLE_TOKEN_URL, {
                        refresh_token: account.refreshToken,
                        client_id: config.googleClientId || process.env.GOOGLE_CLIENT_ID,
                        client_secret: config.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
                        grant_type: "refresh_token"
                    })];
            case 2:
                tokenRes = _b.sent();
                _a = tokenRes.data, access_token = _a.access_token, expires_in = _a.expires_in;
                return [4 /*yield*/, account.update({
                        accessToken: access_token,
                        tokenExpiry: new Date(Date.now() + expires_in * 1000)
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/, access_token];
        }
    });
}); };
// ────────── Reviews ──────────
var listReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accountId, account, token, locationName, r, err_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                accountId = req.params.accountId;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _d.sent();
                if (!account)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _d.sent();
                locationName = account.locationId || "".concat(account.accountId, "/locations");
                return [4 /*yield*/, axios_1["default"].get("https://mybusiness.googleapis.com/v4/".concat(locationName, "/reviews"), {
                        headers: { Authorization: "Bearer ".concat(token) }
                    })];
            case 4:
                r = _d.sent();
                return [2 /*return*/, res.json(r.data)];
            case 5:
                err_2 = _d.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_c = (_b = (_a = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) || "Erro ao buscar avaliações" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.listReviews = listReviews;
var replyReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, accountId, reviewId, comment, account, token, r, err_3;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.params, accountId = _a.accountId, reviewId = _a.reviewId;
                comment = req.body.comment;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _e.sent();
                if (!account)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _e.sent();
                return [4 /*yield*/, axios_1["default"].put("https://mybusiness.googleapis.com/v4/".concat(account.locationId, "/reviews/").concat(reviewId, "/reply"), { comment: comment }, { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                r = _e.sent();
                return [2 /*return*/, res.json(r.data)];
            case 5:
                err_3 = _e.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_d = (_c = (_b = err_3 === null || err_3 === void 0 ? void 0 : err_3.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) || "Erro ao responder avaliação" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.replyReview = replyReview;
// ────────── Metrics / Insights ──────────
var getMetrics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accountId, account, token, endTime, startTime, r, err_4;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                accountId = req.params.accountId;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _d.sent();
                if (!account || !account.locationId)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _d.sent();
                endTime = new Date().toISOString();
                startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
                return [4 /*yield*/, axios_1["default"].post("https://businessprofileperformance.googleapis.com/v1/".concat(account.locationId, ":fetchMultiDailyMetricsTimeSeries"), {
                        dailyMetric: ["WEBSITE_CLICKS", "CALL_CLICKS", "BUSINESS_DIRECTION_REQUESTS", "BUSINESS_IMPRESSIONS_DESKTOP_MAPS", "BUSINESS_IMPRESSIONS_MOBILE_MAPS"],
                        dailyRange: { startDate: { year: new Date(startTime).getFullYear(), month: new Date(startTime).getMonth() + 1, day: new Date(startTime).getDate() }, endDate: { year: new Date(endTime).getFullYear(), month: new Date(endTime).getMonth() + 1, day: new Date(endTime).getDate() } }
                    }, { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                r = _d.sent();
                return [2 /*return*/, res.json(r.data)];
            case 5:
                err_4 = _d.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_c = (_b = (_a = err_4 === null || err_4 === void 0 ? void 0 : err_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) || "Erro ao buscar métricas" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getMetrics = getMetrics;
// ────────── Posts (Local Posts) ──────────
var listPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accountId, account, token, r, err_5;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                accountId = req.params.accountId;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _d.sent();
                if (!account || !account.locationId)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _d.sent();
                return [4 /*yield*/, axios_1["default"].get("https://mybusiness.googleapis.com/v4/".concat(account.locationId, "/localPosts"), { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                r = _d.sent();
                return [2 /*return*/, res.json(r.data)];
            case 5:
                err_5 = _d.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_c = (_b = (_a = err_5 === null || err_5 === void 0 ? void 0 : err_5.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) || "Erro ao buscar posts" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.listPosts = listPosts;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accountId, _a, summary, callToActionType, callToActionUrl, mediaUrl, account, token, postData, r, err_6;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                companyId = req.user.companyId;
                accountId = req.params.accountId;
                _a = req.body, summary = _a.summary, callToActionType = _a.callToActionType, callToActionUrl = _a.callToActionUrl, mediaUrl = _a.mediaUrl;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _e.sent();
                if (!account || !account.locationId)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _e.sent();
                postData = { languageCode: "pt-BR", summary: summary, topicType: "STANDARD" };
                if (callToActionType && callToActionUrl)
                    postData.callToAction = { actionType: callToActionType, url: callToActionUrl };
                if (mediaUrl)
                    postData.media = [{ mediaFormat: "PHOTO", sourceUrl: mediaUrl }];
                return [4 /*yield*/, axios_1["default"].post("https://mybusiness.googleapis.com/v4/".concat(account.locationId, "/localPosts"), postData, { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                r = _e.sent();
                return [2 /*return*/, res.status(201).json(r.data)];
            case 5:
                err_6 = _e.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_d = (_c = (_b = err_6 === null || err_6 === void 0 ? void 0 : err_6.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) || "Erro ao criar post" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, accountId, postName, account, token, err_7;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.params, accountId = _a.accountId, postName = _a.postName;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _e.sent();
                if (!account)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _e.sent();
                return [4 /*yield*/, axios_1["default"]["delete"]("https://mybusiness.googleapis.com/v4/".concat(postName), { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                _e.sent();
                return [2 /*return*/, res.status(204).send()];
            case 5:
                err_7 = _e.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_d = (_c = (_b = err_7 === null || err_7 === void 0 ? void 0 : err_7.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) || "Erro ao excluir post" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
// ────────── Business Info ──────────
var getBusinessInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accountId, account, token, r, err_8;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                accountId = req.params.accountId;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _d.sent();
                if (!account || !account.locationId)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _d.sent();
                return [4 /*yield*/, axios_1["default"].get("https://mybusiness.googleapis.com/v4/".concat(account.locationId), { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                r = _d.sent();
                return [2 /*return*/, res.json(r.data)];
            case 5:
                err_8 = _d.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_c = (_b = (_a = err_8 === null || err_8 === void 0 ? void 0 : err_8.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) || "Erro ao buscar informações" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getBusinessInfo = getBusinessInfo;
var updateBusinessInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accountId, account, token, _a, phoneNumbers, regularHours, websiteUri, profile, updateMask, r, err_9;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                companyId = req.user.companyId;
                accountId = req.params.accountId;
                return [4 /*yield*/, GoogleBusinessAccount_1["default"].findOne({ where: { id: accountId, companyId: companyId } })];
            case 1:
                account = _e.sent();
                if (!account || !account.locationId)
                    return [2 /*return*/, res.status(404).json({ error: "Conta não encontrada" })];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 5, , 6]);
                return [4 /*yield*/, getValidToken(account, Number(companyId))];
            case 3:
                token = _e.sent();
                _a = req.body, phoneNumbers = _a.phoneNumbers, regularHours = _a.regularHours, websiteUri = _a.websiteUri, profile = _a.profile;
                updateMask = Object.keys(req.body).join(",");
                return [4 /*yield*/, axios_1["default"].patch("https://mybusiness.googleapis.com/v4/".concat(account.locationId, "?updateMask=").concat(updateMask), { phoneNumbers: phoneNumbers, regularHours: regularHours, websiteUri: websiteUri, profile: profile }, { headers: { Authorization: "Bearer ".concat(token) } })];
            case 4:
                r = _e.sent();
                return [2 /*return*/, res.json(r.data)];
            case 5:
                err_9 = _e.sent();
                return [2 /*return*/, res.status(500).json({ error: ((_d = (_c = (_b = err_9 === null || err_9 === void 0 ? void 0 : err_9.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) || "Erro ao atualizar informações" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateBusinessInfo = updateBusinessInfo;
