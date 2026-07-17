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
var downloadFIles_1 = require("../helpers/downloadFIles");
var CreateMessageService_1 = __importDefault(require("./CreateMessageService"));
var CreateOrUpdateTicketService_1 = __importDefault(require("./CreateOrUpdateTicketService"));
var FindOrCreateContactService_1 = __importDefault(require("./FindOrCreateContactService"));
var UpdateMessageAck_1 = require("./UpdateMessageAck");
var verifySentMessageStatus = function (message) {
    var code = message.messageStatus.code;
    var isMessageSent = code === "SENT";
    if (isMessageSent) {
        return true;
    }
    return false;
};
var HubMessageListener = function (message, connection, medias) { return __awaiter(void 0, void 0, void 0, function () {
    var ignoreEvent, isMessageFromMe, isMessageSent, _a, id, from, channel, contents, visitor, contact, ticket, media, error_1;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                ignoreEvent = (((_b = message === null || message === void 0 ? void 0 : message.message.visitor) === null || _b === void 0 ? void 0 : _b.name) === "" || !((_c = message === null || message === void 0 ? void 0 : message.message.visitor) === null || _c === void 0 ? void 0 : _c.name))
                    && (((_d = message === null || message === void 0 ? void 0 : message.message.visitor) === null || _d === void 0 ? void 0 : _d.firstName) === "" || !((_e = message === null || message === void 0 ? void 0 : message.message.visitor) === null || _e === void 0 ? void 0 : _e.firstName));
                if (ignoreEvent || message.direction === "OUT") {
                    return [2 /*return*/];
                }
                isMessageFromMe = message.type === "MESSAGE_STATUS";
                if (isMessageFromMe) {
                    isMessageSent = verifySentMessageStatus(message);
                    if (isMessageSent) {
                        console.log("HubMessageListener: message sent");
                        (0, UpdateMessageAck_1.UpdateMessageAck)(message.messageId);
                    }
                    else {
                        console.log("HubMessageListener: message not sent", message.messageStatus.code, message.messageStatus.description);
                    }
                    return [2 /*return*/];
                }
                _a = message.message, id = _a.id, from = _a.from, channel = _a.channel, contents = _a.contents, visitor = _a.visitor;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 9, , 10]);
                return [4 /*yield*/, (0, FindOrCreateContactService_1["default"])(__assign(__assign({}, visitor), { from: from, connection: connection }))];
            case 2:
                contact = _g.sent();
                return [4 /*yield*/, (0, CreateOrUpdateTicketService_1["default"])({
                        contactId: contact.id,
                        channel: channel,
                        contents: contents,
                        connection: connection
                    })];
            case 3:
                ticket = _g.sent();
                if (!(((_f = contents[0]) === null || _f === void 0 ? void 0 : _f.type) === "text")) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                        contactId: contact.id,
                        body: contents[0].text,
                        ticketId: ticket.id,
                        fromMe: false,
                        companyId: connection.companyId
                    })];
            case 4:
                _g.sent();
                return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, (0, downloadFIles_1.downloadFiles)({
                    content: contents[0],
                    connection: connection
                })];
            case 6:
                media = _g.sent();
                return [4 /*yield*/, (0, CreateMessageService_1["default"])({
                        contactId: contact.id,
                        body: contents[0].text,
                        ticketId: ticket.id,
                        fromMe: false,
                        companyId: connection.companyId,
                        fileName: "".concat(media.filename),
                        mediaType: media.mimeType.split("/")[0],
                        originalName: media.originalname
                    })];
            case 7:
                _g.sent();
                _g.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _g.sent();
                console.log(error_1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports["default"] = HubMessageListener;
