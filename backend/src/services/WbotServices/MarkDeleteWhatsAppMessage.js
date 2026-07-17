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
var Message_1 = __importDefault(require("../../models/Message"));
var socket_1 = require("../../libs/socket");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var MarkDeleteWhatsAppMessage = function (from, timestamp, msgId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var messages, messageToUpdate, settings, ticket, io, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                from = from.replace('@c.us', '').replace('@s.whatsapp.net', '');
                if (!msgId) return [3 /*break*/, 14];
                return [4 /*yield*/, Message_1["default"].findAll({
                        where: {
                            wid: msgId,
                            companyId: companyId
                        }
                    })];
            case 1:
                messages = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, , 13]);
                return [4 /*yield*/, Message_1["default"].findOne({
                        where: {
                            wid: messages[0].wid
                        },
                        include: [
                            "contact",
                            {
                                model: Message_1["default"],
                                as: "quotedMsg",
                                include: ["contact"]
                            }
                        ]
                    })];
            case 3:
                messageToUpdate = _a.sent();
                if (!messageToUpdate) return [3 /*break*/, 11];
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: {
                            companyId: companyId
                        }
                    })];
            case 4:
                settings = _a.sent();
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: {
                            id: messageToUpdate.ticketId,
                            companyId: companyId
                        }
                    })];
            case 5:
                ticket = _a.sent();
                if (!(settings.lgpdDeleteMessage === "enabled" && settings.enableLGPD === "enabled")) return [3 /*break*/, 7];
                return [4 /*yield*/, messageToUpdate.update({ body: "🚫 _Mensagem Apagada_", isDeleted: true })];
            case 6:
                _a.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, messageToUpdate.update({ isDeleted: true })];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({ ticketData: { lastMessage: "🚫 _Mensagem Apagada_" }, ticketId: ticket.id, companyId: companyId })];
            case 10:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    // .to(messageToUpdate.ticketId.toString())
                    .emit("appMessage-".concat(messageToUpdate), {
                    action: "update",
                    message: messageToUpdate
                });
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                err_1 = _a.sent();
                console.log("Erro ao tentar marcar a mensagem com excluída");
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/, timestamp];
            case 14:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = MarkDeleteWhatsAppMessage;
