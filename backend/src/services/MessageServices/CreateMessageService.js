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
var socket_1 = require("../../libs/socket");
var Contact_1 = __importDefault(require("../../models/Contact"));
var Message_1 = __importDefault(require("../../models/Message"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var User_1 = __importDefault(require("../../models/User"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var MobileWebhookController_1 = require("../../controllers/MobileWebhookController");
var CreateMessageService = function (_a) {
    var messageData = _a.messageData, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var existingMessage, existingWithAssociations, extraData, upsertData, message, io, error_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Message_1["default"].findOne({
                        where: {
                            wid: messageData.wid,
                            ticketId: messageData.ticketId,
                            companyId: companyId
                        }
                    })];
                case 1:
                    existingMessage = _d.sent();
                    if (!existingMessage) return [3 /*break*/, 3];
                    return [4 /*yield*/, Message_1["default"].findOne({
                            where: { id: existingMessage.id },
                            include: [
                                "contact",
                                {
                                    model: Ticket_1["default"],
                                    as: "ticket",
                                    include: [
                                        { model: Contact_1["default"], attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"], include: ["extraInfo", "tags"] },
                                        { model: Queue_1["default"], attributes: ["id", "name", "color"] },
                                        { model: Whatsapp_1["default"], attributes: ["id", "name", "groupAsTicket"] },
                                        { model: User_1["default"], attributes: ["id", "name"] },
                                        { model: Tag_1["default"], as: "tags", attributes: ["id", "name", "color"] },
                                    ]
                                },
                                { model: Message_1["default"], as: "quotedMsg", include: ["contact"] },
                            ]
                        })];
                case 2:
                    existingWithAssociations = _d.sent();
                    return [2 /*return*/, existingWithAssociations || existingMessage];
                case 3:
                    extraData = {};
                    if (messageData.buttonsData) {
                        extraData.buttonsData = messageData.buttonsData;
                    }
                    if (messageData.carouselData) {
                        extraData.carouselData = messageData.carouselData;
                    }
                    upsertData = __assign(__assign({}, messageData), { companyId: companyId });
                    if (Object.keys(extraData).length > 0) {
                        upsertData.dataJson = JSON.stringify(extraData);
                    }
                    return [4 /*yield*/, Message_1["default"].upsert(upsertData)];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, Message_1["default"].findOne({
                            where: {
                                wid: messageData.wid,
                                companyId: companyId
                            },
                            include: [
                                "contact",
                                {
                                    model: Ticket_1["default"],
                                    as: "ticket",
                                    include: [
                                        {
                                            model: Contact_1["default"],
                                            attributes: [
                                                "id",
                                                "name",
                                                "number",
                                                "email",
                                                "profilePicUrl",
                                                "acceptAudioMessage",
                                                "active",
                                                "urlPicture",
                                                "companyId",
                                            ],
                                            include: ["extraInfo", "tags"]
                                        },
                                        {
                                            model: Queue_1["default"],
                                            attributes: ["id", "name", "color"]
                                        },
                                        {
                                            model: Whatsapp_1["default"],
                                            attributes: ["id", "name", "groupAsTicket"]
                                        },
                                        {
                                            model: User_1["default"],
                                            attributes: ["id", "name"]
                                        },
                                        {
                                            model: Tag_1["default"],
                                            as: "tags",
                                            attributes: ["id", "name", "color"]
                                        },
                                    ]
                                },
                                {
                                    model: Message_1["default"],
                                    as: "quotedMsg",
                                    include: ["contact"]
                                },
                            ]
                        })];
                case 5:
                    message = _d.sent();
                    if (!(((_b = message === null || message === void 0 ? void 0 : message.ticket) === null || _b === void 0 ? void 0 : _b.queueId) !== null && (message === null || message === void 0 ? void 0 : message.queueId) === null)) return [3 /*break*/, 7];
                    return [4 /*yield*/, message.update({ queueId: message.ticket.queueId })];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7:
                    if (!(message === null || message === void 0 ? void 0 : message.isPrivate)) return [3 /*break*/, 9];
                    return [4 /*yield*/, message.update({ wid: "PVT".concat(message.id) })];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9:
                    if (!message) {
                        throw new Error("ERR_CREATING_MESSAGE");
                    }
                    io = (0, socket_1.getIO)();
                    if (!!(messageData === null || messageData === void 0 ? void 0 : messageData.ticketImported)) return [3 /*break*/, 13];
                    io.of(String(companyId)).emit("company-".concat(companyId, "-appMessage"), {
                        action: "create",
                        message: message,
                        ticket: message.ticket,
                        contact: (_c = message.ticket) === null || _c === void 0 ? void 0 : _c.contact
                    });
                    if (!!message.fromMe) return [3 /*break*/, 13];
                    _d.label = 10;
                case 10:
                    _d.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, (0, MobileWebhookController_1.sendMessageNotification)({
                            id: message.id,
                            body: message.body,
                            ticketId: message.ticketId,
                            contactId: message.contactId,
                            fromMe: message.fromMe,
                            queueId: message.queueId,
                            contact: message.ticket.contact
                        }, companyId, message.ticket.userId // Filtrar apenas para o usuário responsável pelo ticket
                        )];
                case 11:
                    _d.sent();
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _d.sent();
                    console.error("Erro ao enviar notificação mobile:", error_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/, message];
            }
        });
    });
};
exports["default"] = CreateMessageService;
