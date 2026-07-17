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
var crypto_1 = require("crypto");
var WhatsappWidget_1 = __importDefault(require("../../models/WhatsappWidget"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var generateCode = function () { return (0, crypto_1.randomBytes)(4).toString("hex"); };
var CreateWhatsappWidgetService = function (_a) {
    var companyId = _a.companyId, whatsappId = _a.whatsappId, name = _a.name, welcomeMessage = _a.welcomeMessage, _b = _a.buttonColor, buttonColor = _b === void 0 ? "#25D366" : _b, _c = _a.buttonPosition, buttonPosition = _c === void 0 ? "bottom-right" : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var whatsapp, code, attempts, exists, widget;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { id: whatsappId, companyId: companyId } })];
                case 1:
                    whatsapp = _d.sent();
                    if (!whatsapp) {
                        throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                    }
                    code = generateCode();
                    attempts = 0;
                    _d.label = 2;
                case 2:
                    if (!(attempts < 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, WhatsappWidget_1["default"].findOne({ where: { code: code } })];
                case 3:
                    exists = _d.sent();
                    if (!exists)
                        return [3 /*break*/, 4];
                    code = generateCode();
                    attempts++;
                    return [3 /*break*/, 2];
                case 4: return [4 /*yield*/, WhatsappWidget_1["default"].create({
                        companyId: companyId,
                        whatsappId: whatsappId,
                        code: code,
                        name: name,
                        welcomeMessage: welcomeMessage || null,
                        buttonColor: buttonColor,
                        buttonPosition: buttonPosition,
                        active: true,
                        totalClicks: 0
                    })];
                case 5:
                    widget = _d.sent();
                    return [2 /*return*/, widget];
            }
        });
    });
};
exports["default"] = CreateWhatsappWidgetService;
