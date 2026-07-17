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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
var UpdateService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var id, shortcode, message, userId, geral, mediaPath, visao, messageType, buttons, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = data.id, shortcode = data.shortcode, message = data.message, userId = data.userId, geral = data.geral, mediaPath = data.mediaPath, visao = data.visao, messageType = data.messageType, buttons = data.buttons;
                return [4 /*yield*/, QuickMessage_1["default"].findByPk(id)];
            case 1:
                record = _a.sent();
                if (!record) {
                    throw new AppError_1["default"]("ERR_NO_TICKETNOTE_FOUND", 404);
                }
                if (!record.geral && record.visao && record.userId !== userId) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                return [4 /*yield*/, record.update({
                        shortcode: shortcode,
                        message: message,
                        // userId,
                        geral: geral,
                        mediaPath: mediaPath,
                        visao: visao,
                        messageType: messageType || "text",
                        buttons: messageType === "buttons" ? (buttons || null) : null
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, record];
        }
    });
}); };
exports["default"] = UpdateService;
