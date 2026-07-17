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
exports.removeApplication = exports.getAccessTokenFromPage = exports.getSubscribedApps = exports.unsubscribeApp = exports.subscribeApp = exports.profilePsid = exports.getPageProfile = exports.getProfile = exports.genText = exports.sendAttachment = exports.sendAttachmentFromUrl = exports.sendText = exports.showTypingIndicator = exports.markSeen = exports.getAccessToken = void 0;
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var fs_1 = require("fs");
var logger_1 = __importDefault(require("../../utils/logger"));
var WhitelabelService_1 = require("../SettingService/WhitelabelService");
var graphApiHelper_1 = require("../WhatsappCoexistence/graphApiHelper");
var apiBase = function (token) {
    return axios_1["default"].create({
        baseURL: (0, graphApiHelper_1.getGraphBaseUrl)(),
        params: {
            access_token: token
        }
    });
};
var getAccessToken = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var facebookAppId, facebookAppSecret, config, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                facebookAppId = process.env.FACEBOOK_APP_ID || "2813216208828642";
                facebookAppSecret = process.env.FACEBOOK_APP_SECRET || "8233912aeade366dd8e2ebef6be256b6";
                if (!companyId) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(companyId)];
            case 1:
                config = _a.sent();
                facebookAppId = config.facebookAppId || facebookAppId;
                facebookAppSecret = config.facebookAppSecret || facebookAppSecret;
                _a.label = 2;
            case 2: return [4 /*yield*/, axios_1["default"].get("https://graph.facebook.com/v20.0/oauth/access_token", {
                    params: {
                        client_id: facebookAppId,
                        client_secret: facebookAppSecret,
                        grant_type: "client_credentials"
                    }
                })];
            case 3:
                data = (_a.sent()).data;
                return [2 /*return*/, data.access_token];
        }
    });
}); };
exports.getAccessToken = getAccessToken;
var markSeen = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apiBase(token).post("".concat(id, "/messages"), {
                    recipient: { id: id },
                    sender_action: "mark_seen"
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.markSeen = markSeen;
var showTypingIndicator = function (id, token, action) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).post("me/messages", {
                        recipient: { id: id },
                        sender_action: action
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.showTypingIndicator = showTypingIndicator;
var sendText = function (id, text, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).post("me/messages", {
                        recipient: { id: id },
                        message: { text: "".concat(text) }
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendText = sendText;
var sendAttachmentFromUrl = function (id, url, type, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).post("me/messages", {
                        recipient: { id: id },
                        message: {
                            attachment: {
                                type: type,
                                payload: { url: url }
                            }
                        }
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendAttachmentFromUrl = sendAttachmentFromUrl;
var sendAttachment = function (id, file, type, token) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, fileReaderStream, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = new form_data_1["default"]();
                formData.append("recipient", JSON.stringify({ id: id }));
                formData.append("message", JSON.stringify({
                    attachment: {
                        type: type,
                        payload: { is_reusable: true }
                    }
                }));
                fileReaderStream = (0, fs_1.createReadStream)(file.path);
                formData.append("filedata", fileReaderStream);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, apiBase(token).post("me/messages", formData, {
                        headers: __assign({}, formData.getHeaders())
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                throw new Error(error_4);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendAttachment = sendAttachment;
var genText = function (text) {
    return { text: text };
};
exports.genText = genText;
var getProfile = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).get(id)];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                throw new Error("ERR_FETCHING_FB_USER_PROFILE_2");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProfile = getProfile;
var getPageProfile = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).get("".concat(id, "/accounts?fields=name,access_token,instagram_business_account{id,username,profile_picture_url,name}"))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                throw new Error("ERR_FETCHING_FB_PAGES");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPageProfile = getPageProfile;
var profilePsid = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                return [4 /*yield*/, apiBase(token).get("".concat(id))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [4 /*yield*/, (0, exports.getProfile)(id, token)];
            case 3:
                _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.profilePsid = profilePsid;
var subscribeApp = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).post("".concat(id, "/subscribed_apps"), {
                        subscribed_fields: [
                            "messages",
                            "messaging_postbacks",
                            "message_deliveries",
                            "message_reads",
                            "message_echoes"
                        ]
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_8 = _a.sent();
                console.log(error_8);
                throw new Error("ERR_SUBSCRIBING_PAGE_TO_MESSAGE_WEBHOOKS");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.subscribeApp = subscribeApp;
var unsubscribeApp = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token)["delete"]("".concat(id, "/subscribed_apps"))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_9 = _a.sent();
                throw new Error("ERR_UNSUBSCRIBING_PAGE_TO_MESSAGE_WEBHOOKS");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unsubscribeApp = unsubscribeApp;
var getSubscribedApps = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token).get("".concat(id, "/subscribed_apps"))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_10 = _a.sent();
                throw new Error("ERR_GETTING_SUBSCRIBED_APPS");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSubscribedApps = getSubscribedApps;
var getAccessTokenFromPage = function (token, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var facebookAppId, facebookAppSecret, config, data, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!token)
                    throw new Error("ERR_FETCHING_FB_USER_TOKEN");
                facebookAppId = process.env.FACEBOOK_APP_ID || "2813216208828642";
                facebookAppSecret = process.env.FACEBOOK_APP_SECRET || "8233912aeade366dd8e2ebef6be256b6";
                if (!companyId) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, WhitelabelService_1.getWhitelabelConfig)(companyId)];
            case 1:
                config = _a.sent();
                facebookAppId = config.facebookAppId || facebookAppId;
                facebookAppSecret = config.facebookAppSecret || facebookAppSecret;
                _a.label = 2;
            case 2: return [4 /*yield*/, axios_1["default"].get("https://graph.facebook.com/v20.0/oauth/access_token", {
                    params: {
                        client_id: facebookAppId,
                        client_secret: facebookAppSecret,
                        grant_type: "fb_exchange_token",
                        fb_exchange_token: token
                    }
                })];
            case 3:
                data = (_a.sent()).data;
                return [2 /*return*/, data.access_token];
            case 4:
                error_11 = _a.sent();
                console.log(error_11);
                throw new Error("ERR_FETCHING_FB_USER_TOKEN");
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAccessTokenFromPage = getAccessTokenFromPage;
var removeApplication = function (id, token) { return __awaiter(void 0, void 0, void 0, function () {
    var error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiBase(token)["delete"]("".concat(id, "/permissions"))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                logger_1["default"].error("ERR_REMOVING_APP_FROM_PAGE");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeApplication = removeApplication;
