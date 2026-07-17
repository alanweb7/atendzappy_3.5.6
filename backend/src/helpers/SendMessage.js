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
exports.SendMessage = void 0;
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var Contact_1 = __importDefault(require("../models/Contact"));
var GetWhatsappWbot_1 = __importDefault(require("./GetWhatsappWbot"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Mustache_1 = __importDefault(require("./Mustache"));
var mime_types_1 = __importDefault(require("mime-types"));
var SendWhatsAppMedia_1 = require("../services/WbotServices/SendWhatsAppMedia");
var SendTextOfficialService_1 = require("../services/WhatsAppOfficial/SendTextOfficialService");
var SendMediaOfficialService_1 = require("../services/WhatsAppOfficial/SendMediaOfficialService");
var SendMessage = function (whatsapp, messageData, isGroup, ticket) {
    if (isGroup === void 0) { isGroup = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var formattedBody_1, connection, full, contact, ticketId, absPath, filename, mimeType, stat, fakeFile, wbot, chatId, companyId, message, formattedBody, options, body, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 17, , 18]);
                    if (!(whatsapp.channel === "whatsapp_official")) return [3 /*break*/, 9];
                    formattedBody_1 = (0, Mustache_1["default"])(messageData.body, ticket);
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
                    contact = void 0;
                    if (!(ticket === null || ticket === void 0 ? void 0 : ticket.contact)) return [3 /*break*/, 3];
                    contact = ticket.contact;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Contact_1["default"].findOne({
                        where: { number: String(messageData.number), companyId: whatsapp.companyId || messageData.companyId },
                        attributes: ["id", "number", "companyId"]
                    })];
                case 4:
                    contact = _a.sent();
                    _a.label = 5;
                case 5:
                    if (!contact) {
                        // Cria contact mínimo com o número
                        contact = { id: 0, number: String(messageData.number), companyId: whatsapp.companyId || messageData.companyId };
                    }
                    ticketId = (ticket === null || ticket === void 0 ? void 0 : ticket.id) || messageData.ticketId || 0;
                    if (!(messageData.mediaPath && fs_1["default"].existsSync(messageData.mediaPath))) return [3 /*break*/, 7];
                    absPath = path_1["default"].resolve(messageData.mediaPath);
                    filename = path_1["default"].basename(absPath);
                    mimeType = (mime_types_1["default"].lookup(filename) || "application/octet-stream");
                    stat = fs_1["default"].statSync(absPath);
                    fakeFile = {
                        fieldname: "medias",
                        originalname: messageData.mediaName || filename,
                        encoding: "7bit",
                        mimetype: mimeType,
                        destination: path_1["default"].dirname(absPath),
                        filename: filename,
                        path: absPath,
                        size: stat.size,
                        buffer: null,
                        stream: null
                    };
                    return [4 /*yield*/, (0, SendMediaOfficialService_1.SendMediaOfficialService)({
                            media: fakeFile,
                            body: formattedBody_1,
                            ticketId: ticketId,
                            contact: contact,
                            connection: connection,
                            passVerification: true
                        })];
                case 6: return [2 /*return*/, _a.sent()];
                case 7: return [4 /*yield*/, (0, SendTextOfficialService_1.SendTextOfficialService)({
                        body: formattedBody_1,
                        ticketId: ticketId,
                        contact: contact,
                        connection: connection
                    })];
                case 8: return [2 /*return*/, _a.sent()];
                case 9: return [4 /*yield*/, (0, GetWhatsappWbot_1["default"])(whatsapp)];
                case 10:
                    wbot = _a.sent();
                    chatId = "".concat(messageData.number, "@").concat(!!isGroup ? 'g.us' : 's.whatsapp.net');
                    companyId = (messageData === null || messageData === void 0 ? void 0 : messageData.companyId) ? messageData.companyId.toString() : null;
                    message = void 0;
                    formattedBody = (0, Mustache_1["default"])(messageData.body, ticket);
                    if (!messageData.mediaPath) return [3 /*break*/, 14];
                    return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(messageData.mediaName, messageData.mediaPath, companyId, formattedBody)];
                case 11:
                    options = _a.sent();
                    if (!options) return [3 /*break*/, 13];
                    body = fs_1["default"].readFileSync(messageData.mediaPath);
                    return [4 /*yield*/, wbot.sendMessage(chatId, __assign({}, options))];
                case 12:
                    message = _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, wbot.sendMessage(chatId, { text: formattedBody })];
                case 15:
                    message = _a.sent();
                    _a.label = 16;
                case 16: return [2 /*return*/, message];
                case 17:
                    err_1 = _a.sent();
                    throw new Error(err_1);
                case 18: return [2 /*return*/];
            }
        });
    });
};
exports.SendMessage = SendMessage;
