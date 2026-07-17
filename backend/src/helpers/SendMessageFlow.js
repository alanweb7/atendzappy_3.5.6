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
exports.SendMessageFlow = void 0;
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var Contact_1 = __importDefault(require("../models/Contact"));
var GetWhatsappWbot_1 = __importDefault(require("./GetWhatsappWbot"));
var SendTextOfficialService_1 = require("../services/WhatsAppOfficial/SendTextOfficialService");
var SendMessageFlow = function (whatsapp, messageData, isFlow, isRecord) {
    if (isFlow === void 0) { isFlow = false; }
    if (isRecord === void 0) { isRecord = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var connection, full, contact, wbot, chatId, body, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    if (!(whatsapp.channel === "whatsapp_official")) return [3 /*break*/, 6];
                    connection = whatsapp;
                    if (!(!connection.coexistencePermanentToken || !connection.coexistencePhoneNumberId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsapp.id, {
                            attributes: ["id", "channel", "companyId", "coexistencePhoneNumberId", "coexistenceWabaId", "coexistencePermanentToken"]
                        })];
                case 1:
                    full = _a.sent();
                    if (full)
                        connection = full;
                    _a.label = 2;
                case 2:
                    contact = messageData.contact;
                    if (!!contact) return [3 /*break*/, 4];
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: { number: String(messageData.number), companyId: whatsapp.companyId },
                            attributes: ["id", "number", "companyId"]
                        })];
                case 3:
                    contact = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!contact) {
                        contact = { id: 0, number: String(messageData.number), companyId: whatsapp.companyId };
                    }
                    return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({
                            body: messageData.body,
                            ticketId: messageData.ticketId || 0,
                            contact: contact,
                            connection: connection
                        })];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [4 /*yield*/, (0, GetWhatsappWbot_1["default"])(whatsapp)];
                case 7:
                    wbot = _a.sent();
                    chatId = "".concat(messageData.number, "@s.whatsapp.net");
                    body = "\u200E".concat(messageData.body);
                    return [4 /*yield*/, wbot.sendMessage(chatId, { text: body })];
                case 8: return [2 /*return*/, _a.sent()];
                case 9:
                    err_1 = _a.sent();
                    throw new Error(err_1);
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.SendMessageFlow = SendMessageFlow;
