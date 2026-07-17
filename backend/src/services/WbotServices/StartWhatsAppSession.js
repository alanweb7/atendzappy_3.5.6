"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.StartWhatsAppSession = void 0;
var wbot_1 = require("../../libs/wbot");
var wbotMessageListener_1 = require("./wbotMessageListener");
var socket_1 = require("../../libs/socket");
var wbotMonitor_1 = __importDefault(require("./wbotMonitor"));
var logger_1 = __importDefault(require("../../utils/logger"));
var Sentry = __importStar(require("@sentry/node"));
var useVoiceCallsBaileys = null;
try {
    useVoiceCallsBaileys = require("voice-calls-baileys")["default"] || require("voice-calls-baileys").useVoiceCallsBaileys;
}
catch (e) {
    logger_1["default"].warn("[WAVoIP] voice-calls-baileys não encontrado, chamadas de voz desabilitadas");
}
var StartWhatsAppSession = function (whatsapp, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var io, wbot, voipErr_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, whatsapp.update({ status: "OPENING" })];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-whatsappSession"), {
                    action: "update",
                    session: whatsapp
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, , 9]);
                return [4 /*yield*/, (0, wbot_1.initWASocket)(whatsapp)];
            case 3:
                wbot = _a.sent();
                if (!wbot.id) return [3 /*break*/, 7];
                (0, wbotMessageListener_1.wbotMessageListener)(wbot, companyId);
                (0, wbotMonitor_1["default"])(wbot, whatsapp, companyId);
                if (!(useVoiceCallsBaileys && whatsapp.wavoip)) return [3 /*break*/, 7];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, useVoiceCallsBaileys(whatsapp.wavoip, wbot, "atendzappy", "open", true)];
            case 5:
                _a.sent();
                logger_1["default"].info("[WAVoIP] Voice calls ativado para WhatsApp ".concat(whatsapp.name, " (company ").concat(companyId, ")"));
                return [3 /*break*/, 7];
            case 6:
                voipErr_1 = _a.sent();
                logger_1["default"].error("[WAVoIP] Erro ao iniciar voice calls: ".concat(voipErr_1.message));
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                Sentry.captureException(err_1);
                logger_1["default"].error(err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.StartWhatsAppSession = StartWhatsAppSession;
