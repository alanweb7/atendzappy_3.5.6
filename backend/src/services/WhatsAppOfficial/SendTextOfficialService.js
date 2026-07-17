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
exports.SendTextOfficialService = void 0;
var CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
var graphApiHelper_1 = require("../WhatsappCoexistence/graphApiHelper");
var SendTextOfficialService = function (_a) {
    var body = _a.body, ticketId = _a.ticketId, contact = _a.contact, connection = _a.connection, quotedMsgWid = _a.quotedMsgWid, quotedMsgId = _a.quotedMsgId;
    return __awaiter(void 0, void 0, void 0, function () {
        var toNumber, payload, response, messageId, newMessage, error_1, graphError;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!(body === null || body === void 0 ? void 0 : body.trim())) {
                        throw new Error("ERR_OFFICIAL_EMPTY_BODY");
                    }
                    if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
                        throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
                    }
                    console.log("[WhatsAppOfficial][SendTextOfficial] connection", {
                        whatsappId: connection.id,
                        phoneNumberId: connection.coexistencePhoneNumberId,
                        wabaId: connection.coexistenceWabaId,
                        companyId: connection.companyId
                    });
                    toNumber = contact.number.replace(/\D/g, "");
                    if (!toNumber) {
                        throw new Error("ERR_OFFICIAL_INVALID_NUMBER");
                    }
                    payload = {
                        messaging_product: "whatsapp",
                        recipient_type: "individual",
                        to: toNumber,
                        type: "text",
                        text: { preview_url: false, body: body }
                    };
                    // Resposta a mensagem específica (reply) — Meta Cloud API usa campo "context"
                    if (quotedMsgWid) {
                        payload.context = { message_id: quotedMsgWid };
                    }
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, graphApiHelper_1.graphRequest)(connection.coexistencePermanentToken, "post", "".concat(connection.coexistencePhoneNumberId, "/messages"), payload)];
                case 2:
                    response = _f.sent();
                    console.log("[WhatsAppOfficial][SendTextOfficial] graphResponse", {
                        status: "success",
                        messageId: (_c = (_b = response === null || response === void 0 ? void 0 : response.messages) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id,
                        raw: response
                    });
                    messageId = (_e = (_d = response === null || response === void 0 ? void 0 : response.messages) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.id;
                    if (!messageId) {
                        throw new Error("ERR_OFFICIAL_NO_MESSAGE_ID");
                    }
                    return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                            messageData: __assign({ wid: messageId, ticketId: ticketId, contactId: contact.id, body: body, fromMe: true, read: true, ack: 2 }, (quotedMsgId && { quotedMsgId: quotedMsgId })),
                            companyId: connection.companyId
                        })];
                case 3:
                    newMessage = _f.sent();
                    return [2 /*return*/, newMessage];
                case 4:
                    error_1 = _f.sent();
                    graphError = (0, graphApiHelper_1.extractGraphError)(error_1);
                    console.error("[WhatsAppOfficial][SendTextOfficial] graphError", {
                        status: "error",
                        message: graphError,
                        payload: payload
                    });
                    throw new Error("ERR_OFFICIAL_SEND_TEXT: ".concat(graphError));
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.SendTextOfficialService = SendTextOfficialService;
