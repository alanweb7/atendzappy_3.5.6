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
var CheckContactOpenTickets_1 = __importDefault(require("../../helpers/CheckContactOpenTickets"));
var GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var socket_1 = require("../../libs/socket");
var CreateTicketServiceWebhook = function (_a) {
    var contactId = _a.contactId, status = _a.status, userId = _a.userId, queueId = _a.queueId, companyId = _a.companyId, lastFlowId = _a.lastFlowId, dataWebhook = _a.dataWebhook, hashFlowId = _a.hashFlowId, flowStopped = _a.flowStopped;
    return __awaiter(void 0, void 0, void 0, function () {
        var defaultWhatsapp, isGroup, id, ticket, io;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(companyId)];
                case 1:
                    defaultWhatsapp = _b.sent();
                    return [4 /*yield*/, (0, CheckContactOpenTickets_1["default"])(contactId, 0, companyId)];
                case 2:
                    _b.sent();
                    isGroup = false;
                    return [4 /*yield*/, Ticket_1["default"].findOrCreate({
                            where: {
                                contactId: contactId,
                                companyId: companyId
                            },
                            defaults: {
                                contactId: contactId,
                                companyId: companyId,
                                whatsappId: defaultWhatsapp.id,
                                status: status,
                                isGroup: isGroup,
                                userId: userId,
                                flowWebhook: true,
                                dataWebhook: dataWebhook,
                                hashFlowId: hashFlowId,
                                flowStopped: flowStopped
                            }
                        })];
                case 3:
                    id = (_b.sent())[0].id;
                    return [4 /*yield*/, Ticket_1["default"].update({
                            companyId: companyId,
                            queueId: queueId,
                            userId: userId,
                            whatsappId: defaultWhatsapp.id,
                            status: "open",
                            flowWebhook: true,
                            lastFlowId: lastFlowId,
                            flowStopped: flowStopped
                        }, { where: { id: id } })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, Ticket_1["default"].findByPk(id, { include: ["contact", "queue"] })];
                case 5:
                    ticket = _b.sent();
                    if (!ticket) {
                        throw new AppError_1["default"]("ERR_CREATING_TICKET");
                    }
                    io = (0, socket_1.getIO)();
                    io.to(ticket.id.toString()).emit("ticket", {
                        action: "update",
                        ticket: ticket
                    });
                    return [2 /*return*/, ticket];
            }
        });
    });
};
exports["default"] = CreateTicketServiceWebhook;
