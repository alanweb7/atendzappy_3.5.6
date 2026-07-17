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
var sequelize_1 = require("sequelize");
var AppError_1 = __importDefault(require("../../../errors/AppError"));
var MediaFolder_1 = __importDefault(require("../../../models/MediaFolder"));
var getFolderOrThrow_1 = __importDefault(require("../helpers/getFolderOrThrow"));
var UpdateMediaFolderService = function (_a) {
    var folderId = _a.folderId, companyId = _a.companyId, name = _a.name, description = _a.description;
    return __awaiter(void 0, void 0, void 0, function () {
        var folder, trimmedName, trimmedDescription, existing;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, getFolderOrThrow_1["default"])(folderId, companyId)];
                case 1:
                    folder = _c.sent();
                    trimmedName = name === null || name === void 0 ? void 0 : name.trim();
                    trimmedDescription = description === null || description === void 0 ? void 0 : description.trim();
                    if (!trimmedName) return [3 /*break*/, 3];
                    return [4 /*yield*/, MediaFolder_1["default"].findOne({
                            where: {
                                companyId: companyId,
                                name: trimmedName,
                                id: (_b = {}, _b[sequelize_1.Op.ne] = folderId, _b)
                            }
                        })];
                case 2:
                    existing = _c.sent();
                    if (existing) {
                        throw new AppError_1["default"]("Já existe uma pasta com esse nome.");
                    }
                    folder.name = trimmedName;
                    _c.label = 3;
                case 3:
                    if (description !== undefined) {
                        folder.description = trimmedDescription || null;
                    }
                    return [4 /*yield*/, folder.save()];
                case 4:
                    _c.sent();
                    return [2 /*return*/, folder];
            }
        });
    });
};
exports["default"] = UpdateMediaFolderService;
