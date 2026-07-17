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
exports.remove = exports.store = void 0;
var AppError_1 = __importDefault(require("../errors/AppError"));
var TicketTag_1 = __importDefault(require("../models/TicketTag"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var Tag_1 = __importDefault(require("../models/Tag"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var Contact_1 = __importDefault(require("../models/Contact"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var socket_1 = require("../libs/socket");
var TriggerKanbanService_1 = require("../services/AutomationServices/TriggerKanbanService");
var ExecuteTagAutoActionsService_1 = require("../services/ExecuteTagAutoActionsService");
var SendMessage_1 = require("../helpers/SendMessage");
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ticketId, tagId, tag, existingTicketTags, existingTagIds, existingKanbanTags, existingKanbanTagIds, ticketTag, ticketForContact, ticket, io, whatsapp, err_1, err_2, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, ticketId = _a.ticketId, tagId = _a.tagId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 23, , 24]);
                return [4 /*yield*/, Tag_1["default"].findByPk(tagId)];
            case 2:
                tag = _b.sent();
                if (!tag) {
                    throw new AppError_1["default"]("ERR_NO_TAG_FOUND", 404);
                }
                if (!(tag.kanban === 1)) return [3 /*break*/, 6];
                return [4 /*yield*/, TicketTag_1["default"].findAll({ where: { ticketId: ticketId } })];
            case 3:
                existingTicketTags = _b.sent();
                existingTagIds = existingTicketTags.map(function (tt) { return tt.tagId; });
                if (!existingTagIds.length) return [3 /*break*/, 6];
                return [4 /*yield*/, Tag_1["default"].findAll({
                        where: {
                            id: existingTagIds,
                            kanban: 1
                        }
                    })];
            case 4:
                existingKanbanTags = _b.sent();
                existingKanbanTagIds = existingKanbanTags
                    .map(function (t) { return t.id; })
                    // evita remover a própria tag que está sendo adicionada
                    .filter(function (id) { return String(id) !== String(tagId); });
                if (!existingKanbanTagIds.length) return [3 /*break*/, 6];
                // @ts-ignore: Sequelize aceita array em where.tagId
                return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: ticketId, tagId: existingKanbanTagIds }, individualHooks: true })];
            case 5:
                // @ts-ignore: Sequelize aceita array em where.tagId
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, TicketTag_1["default"].create({ ticketId: ticketId, tagId: tagId })];
            case 7:
                ticketTag = _b.sent();
                return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId, { attributes: ["contactId"] })];
            case 8:
                ticketForContact = _b.sent();
                if (!(ticketForContact === null || ticketForContact === void 0 ? void 0 : ticketForContact.contactId)) return [3 /*break*/, 10];
                return [4 /*yield*/, ContactTag_1["default"].findOrCreate({
                        where: { contactId: ticketForContact.contactId, tagId: tagId }
                    })];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10: return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId, {
                    include: [
                        {
                            model: Contact_1["default"],
                            as: "contact",
                            attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
                            include: ["extraInfo", "tags"]
                        },
                        {
                            model: Tag_1["default"],
                            as: "tags",
                            attributes: ["id", "name", "color"]
                        },
                    ]
                })];
            case 11:
                ticket = _b.sent();
                if (!ticket) return [3 /*break*/, 22];
                io = (0, socket_1.getIO)();
                io.of(String(ticket.companyId)).emit("company-".concat(ticket.companyId, "-ticket"), {
                    action: "update",
                    ticket: ticket
                });
                if (!(tag.kanban === 1)) return [3 /*break*/, 22];
                if (!(tag.greetingMessageLane && tag.greetingMessageLane.trim() !== "")) return [3 /*break*/, 17];
                _b.label = 12;
            case 12:
                _b.trys.push([12, 16, , 17]);
                return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId)];
            case 13:
                whatsapp = _b.sent();
                if (!(whatsapp && ticket.contact)) return [3 /*break*/, 15];
                return [4 /*yield*/, (0, SendMessage_1.SendMessage)(whatsapp, {
                        number: ticket.contact.number,
                        body: tag.greetingMessageLane
                    })];
            case 14:
                _b.sent();
                _b.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                err_1 = _b.sent();
                console.error("[TicketTagController] Erro ao enviar mensagem de saudação:", err_1);
                return [3 /*break*/, 17];
            case 17:
                if (!(tag.autoActions && Array.isArray(tag.autoActions) && tag.autoActions.length > 0)) return [3 /*break*/, 21];
                _b.label = 18;
            case 18:
                _b.trys.push([18, 20, , 21]);
                return [4 /*yield*/, (0, ExecuteTagAutoActionsService_1.ExecuteTagAutoActions)(tag.id, Number(ticketId), ticket.companyId)];
            case 19:
                _b.sent();
                return [3 /*break*/, 21];
            case 20:
                err_2 = _b.sent();
                console.error("[TicketTagController] Erro ao executar ações automáticas da tag:", err_2);
                return [3 /*break*/, 21];
            case 21:
                // 3. Automações do sistema com triggerType: kanban_stage
                (0, TriggerKanbanService_1.processKanbanStageAutomation)(Number(ticketId), Number(tagId), ticket.companyId)["catch"](function (err) { return console.error("[TicketTagController] Erro ao processar automação Kanban:", err); });
                _b.label = 22;
            case 22: return [2 /*return*/, res.status(201).json(ticketTag)];
            case 23:
                error_1 = _b.sent();
                console.error("[TicketTagController.store] Error storing ticket tag", {
                    ticketId: ticketId,
                    tagId: tagId,
                    error: (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || error_1
                });
                return [2 /*return*/, res.status(500).json({
                        error: "Failed to store ticket tag.",
                        details: (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || String(error_1)
                    })];
            case 24: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ticketId, tagId, kanbanRows, kanbanTagIds, ticket, io, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, ticketId = _a.ticketId, tagId = _a.tagId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!tagId) return [3 /*break*/, 3];
                // Remove somente a tag específica do ticket — não toca ContactTag
                return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: ticketId, tagId: tagId }, individualHooks: true })];
            case 2:
                // Remove somente a tag específica do ticket — não toca ContactTag
                _b.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, TicketTag_1["default"].findAll({
                    where: { ticketId: ticketId },
                    include: [{ model: Tag_1["default"], as: "tag", where: { kanban: 1 }, attributes: ["id"] }]
                })];
            case 4:
                kanbanRows = _b.sent();
                kanbanTagIds = kanbanRows.map(function (r) { return r.tagId; });
                if (!(kanbanTagIds.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, TicketTag_1["default"].destroy({ where: { ticketId: ticketId, tagId: kanbanTagIds }, individualHooks: true })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, Ticket_1["default"].findByPk(ticketId, {
                    include: [
                        {
                            model: Contact_1["default"],
                            as: "contact",
                            attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
                            include: ["extraInfo", "tags"]
                        },
                        {
                            model: Tag_1["default"],
                            as: "tags",
                            attributes: ["id", "name", "color"]
                        },
                    ]
                })];
            case 7:
                ticket = _b.sent();
                if (ticket) {
                    io = (0, socket_1.getIO)();
                    io.of(String(ticket.companyId)).emit("company-".concat(ticket.companyId, "-ticket"), {
                        action: "update",
                        ticket: ticket
                    });
                }
                return [2 /*return*/, res.status(200).json({ message: "Ticket tags removed successfully." })];
            case 8:
                error_2 = _b.sent();
                console.error("[TicketTagController.remove] Error removing ticket tags", {
                    ticketId: ticketId,
                    error: (error_2 === null || error_2 === void 0 ? void 0 : error_2.message) || error_2
                });
                return [2 /*return*/, res.status(500).json({
                        error: "Failed to remove ticket tags.",
                        details: (error_2 === null || error_2 === void 0 ? void 0 : error_2.message) || String(error_2)
                    })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
