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
exports.sendFacebookMessageFileExternal = exports.sendFacebookMessageMediaExternal = exports.sendFacebookMessageMedia = exports.typeAttachment = void 0;
var fs_1 = __importDefault(require("fs"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var graphAPI_1 = require("./graphAPI");
var UrlService_1 = require("../SettingService/UrlService");
var typeAttachment = function (media) {
    if (media.mimetype.includes("image")) {
        return "image";
    }
    if (media.mimetype.includes("video")) {
        return "video";
    }
    if (media.mimetype.includes("audio")) {
        return "audio";
    }
    return "file";
};
exports.typeAttachment = typeAttachment;
var sendFacebookMessageMedia = function (_a) {
    var media = _a.media, ticket = _a.ticket, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var type, backendUrl, domain, sendMessage, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    type = (0, exports.typeAttachment)(media);
                    return [4 /*yield*/, (0, UrlService_1.getBackendUrl)(ticket.companyId)];
                case 1:
                    backendUrl = _b.sent();
                    domain = "".concat(backendUrl, "/public/company").concat(ticket.companyId, "/").concat(media.filename);
                    return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(ticket.contact.number, domain, type, ticket.whatsapp.facebookUserToken)];
                case 2:
                    sendMessage = _b.sent();
                    return [4 /*yield*/, ticket.update({ lastMessage: media.filename })];
                case 3:
                    _b.sent();
                    fs_1["default"].unlinkSync(media.path);
                    return [2 /*return*/, sendMessage];
                case 4:
                    err_1 = _b.sent();
                    throw new AppError_1["default"]("ERR_SENDING_FACEBOOK_MSG");
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.sendFacebookMessageMedia = sendFacebookMessageMedia;
var sendFacebookMessageMediaExternal = function (_a) {
    var url = _a.url, ticket = _a.ticket, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var type, sendMessage, randomName, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    type = "image";
                    return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(ticket.contact.number, url, type, ticket.whatsapp.facebookUserToken)];
                case 1:
                    sendMessage = _b.sent();
                    randomName = Math.random().toString(36).substring(7);
                    return [4 /*yield*/, ticket.update({ lastMessage: body || "".concat(randomName, ".jpg}") })];
                case 2:
                    _b.sent();
                    // fs.unlinkSync(media.path);
                    return [2 /*return*/, sendMessage];
                case 3:
                    err_2 = _b.sent();
                    throw new AppError_1["default"]("ERR_SENDING_FACEBOOK_MSG");
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.sendFacebookMessageMediaExternal = sendFacebookMessageMediaExternal;
var sendFacebookMessageFileExternal = function (_a) {
    var url = _a.url, ticket = _a.ticket, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var type, sendMessage, randomName, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    type = "file";
                    return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(ticket.contact.number, url, type, ticket.whatsapp.facebookUserToken)];
                case 1:
                    sendMessage = _b.sent();
                    randomName = Math.random().toString(36).substring(7);
                    return [4 /*yield*/, ticket.update({ lastMessage: body || "".concat(randomName, ".pdf}") })];
                case 2:
                    _b.sent();
                    // fs.unlinkSync(media.path);
                    return [2 /*return*/, sendMessage];
                case 3:
                    err_3 = _b.sent();
                    throw new AppError_1["default"]("ERR_SENDING_FACEBOOK_MSG");
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.sendFacebookMessageFileExternal = sendFacebookMessageFileExternal;
