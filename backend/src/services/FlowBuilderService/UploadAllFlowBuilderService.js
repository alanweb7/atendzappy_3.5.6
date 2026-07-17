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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var FlowAudio_1 = require("../../models/FlowAudio");
var FlowImg_1 = require("../../models/FlowImg");
var UploadAllFlowBuilderService = function (_a) {
    var userId = _a.userId, medias = _a.medias, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var itemsNewNames, itemsUrls, i, nameFile, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    itemsNewNames = [];
                    itemsUrls = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(medias.length > i)) return [3 /*break*/, 10];
                    nameFile = medias[i].filename;
                    itemsNewNames = __spreadArray(__spreadArray([], itemsNewNames, true), [nameFile], false);
                    itemsUrls = __spreadArray(__spreadArray([], itemsUrls, true), ["uploads/".concat(nameFile)], false);
                    if (!(medias[i].mimetype.split("/")[1] === "png" ||
                        medias[i].mimetype.split("/")[1] === "jpg" ||
                        medias[i].mimetype.split("/")[1] === "jpeg")) return [3 /*break*/, 3];
                    return [4 /*yield*/, FlowImg_1.FlowImgModel.create({
                            userId: userId,
                            companyId: companyId,
                            name: nameFile
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 3:
                    if (!(medias[i].mimetype === "audio/mp3" ||
                        medias[i].mimetype === "audio/mpeg" ||
                        medias[i].mimetype === "audio/ogg" ||
                        medias[i].mimetype === "audio/mp4" ||
                        medias[i].mimetype.split("/")[1] === "mp3" ||
                        medias[i].mimetype.split("/")[1] === "ogg" ||
                        medias[i].mimetype.split("/")[1] === "mpeg")) return [3 /*break*/, 5];
                    if (medias[i].mimetype.split("/")[1] === "mpeg") {
                        nameFile = nameFile.split(".")[0] + ".mp3";
                    }
                    return [4 /*yield*/, FlowAudio_1.FlowAudioModel.create({
                            userId: userId,
                            companyId: companyId,
                            name: nameFile
                        })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 5:
                    if (!(medias[i].mimetype.split("/")[0] === "video" ||
                        medias[i].mimetype === "video/mp4" ||
                        medias[i].mimetype === "video/webm" ||
                        medias[i].mimetype === "video/mov" ||
                        medias[i].mimetype === "video/avi" ||
                        medias[i].mimetype === "video/quicktime")) return [3 /*break*/, 7];
                    return [4 /*yield*/, FlowImg_1.FlowImgModel.create({
                            userId: userId,
                            companyId: companyId,
                            name: nameFile
                        })];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7:
                    if (!(medias[i].mimetype === "application/pdf" ||
                        medias[i].mimetype.includes("spreadsheetml") ||
                        medias[i].mimetype.includes("wordprocessingml") ||
                        medias[i].mimetype.includes("msword") ||
                        medias[i].mimetype.includes("ms-excel") ||
                        medias[i].mimetype.includes("application/vnd.") ||
                        medias[i].mimetype.includes("application/"))) return [3 /*break*/, 9];
                    return [4 /*yield*/, FlowImg_1.FlowImgModel.create({
                            userId: userId,
                            companyId: companyId,
                            name: nameFile
                        })];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/, itemsUrls];
                case 11:
                    error_1 = _b.sent();
                    console.error("Erro ao inserir o arquivo:", error_1);
                    return [2 /*return*/, error_1];
                case 12: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = UploadAllFlowBuilderService;
