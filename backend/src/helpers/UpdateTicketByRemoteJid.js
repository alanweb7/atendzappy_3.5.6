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
exports.updateTicketByRemoteJid = void 0;
var Message_1 = __importDefault(require("../models/Message"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var sequelize_1 = require("sequelize");
var socket_1 = require("../libs/socket");
var Contact_1 = __importDefault(require("../models/Contact"));
var User_1 = __importDefault(require("../models/User"));
var Queue_1 = __importDefault(require("../models/Queue"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var Tag_1 = __importDefault(require("../models/Tag"));
var updateTicketByRemoteJid = function (remoteJid, queue, user, statusText, unread) { return __awaiter(void 0, void 0, void 0, function () {
    var messages;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Message_1["default"].findAndCountAll({
                    limit: 1,
                    order: [["createdAt", "DESC"]],
                    where: {
                        remoteJid: (_a = {},
                            _a[sequelize_1.Op.like] = "%".concat(remoteJid, "%"),
                            _a)
                    }
                })];
            case 1:
                messages = (_b.sent()).rows;
                messages.forEach(function (message) { return __awaiter(void 0, void 0, void 0, function () {
                    var ticketId, ticket, oldStatus, oldUserId, io;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                ticketId = message.ticketId;
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { id: ticketId },
                                        include: [
                                            {
                                                model: Contact_1["default"],
                                                as: "contact",
                                                attributes: ["id", "name", "number", "profilePicUrl", "companyId", "urlPicture"],
                                                include: ["extraInfo", "tags",
                                                    {
                                                        association: "wallets",
                                                        attributes: ["id", "name"]
                                                    }]
                                            },
                                            {
                                                model: User_1["default"],
                                                as: "user",
                                                attributes: ["id", "name"]
                                            },
                                            {
                                                model: Queue_1["default"],
                                                as: "queue",
                                                attributes: ["id", "name", "color"]
                                            },
                                            {
                                                model: Whatsapp_1["default"],
                                                as: "whatsapp",
                                                attributes: ["name"]
                                            },
                                            {
                                                model: Tag_1["default"],
                                                as: "tags",
                                                attributes: ["id", "name", "color"]
                                            }
                                        ]
                                    })];
                            case 1:
                                ticket = _b.sent();
                                oldStatus = ticket.status;
                                oldUserId = (_a = ticket.user) === null || _a === void 0 ? void 0 : _a.id;
                                return [4 /*yield*/, ticket.update({ status: statusText, queueId: queue, userId: user, unreadMessages: unread })];
                            case 2:
                                _b.sent();
                                io = (0, socket_1.getIO)();
                                // io.to(oldStatus).emit(`company-${ticket.companyId}-ticket`, {
                                //   action: "delete",
                                //   ticketId: ticket.id
                                // });
                                io.of(ticket.companyId.toString())
                                    // .to(ticket.id.toString())
                                    .emit("company-".concat(ticket.companyId, "-ticket"), {
                                    action: "update",
                                    ticket: ticket
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.updateTicketByRemoteJid = updateTicketByRemoteJid;
