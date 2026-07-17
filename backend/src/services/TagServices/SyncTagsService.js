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
var Tag_1 = __importDefault(require("../../models/Tag"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var SyncTags = function (_a) {
    var tags = _a.tags, contactId = _a.contactId, ticketId = _a.ticketId;
    return __awaiter(void 0, void 0, void 0, function () {
        var contact, tagIds, existingTicketTags, kanbanTicketTagIds_1, normalTicketTagIds, toInsert;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Contact_1["default"].findByPk(contactId, { include: [Tag_1["default"]] })];
                case 1:
                    contact = _b.sent();
                    tagIds = tags.map(function (t) { return t.id; });
                    // Sincroniza ContactTag (tags do contato)
                    return [4 /*yield*/, ContactTag_1["default"].destroy({ where: { contactId: contactId } })];
                case 2:
                    // Sincroniza ContactTag (tags do contato)
                    _b.sent();
                    if (!(tagIds.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ContactTag_1["default"].bulkCreate(tagIds.map(function (tagId) { return ({ tagId: tagId, contactId: contactId }); }))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    if (!ticketId) return [3 /*break*/, 9];
                    return [4 /*yield*/, TicketTag_1["default"].findAll({
                            where: { ticketId: ticketId },
                            include: [{ model: Tag_1["default"], as: "tag", attributes: ["id", "kanban"] }]
                        })];
                case 5:
                    existingTicketTags = _b.sent();
                    kanbanTicketTagIds_1 = existingTicketTags
                        // @ts-ignore
                        .filter(function (tt) { var _a; return ((_a = tt.tag) === null || _a === void 0 ? void 0 : _a.kanban) === 1; })
                        .map(function (tt) { return tt.tagId; });
                    normalTicketTagIds = existingTicketTags
                        // @ts-ignore
                        .filter(function (tt) { var _a; return ((_a = tt.tag) === null || _a === void 0 ? void 0 : _a.kanban) !== 1; })
                        .map(function (tt) { return tt.tagId; });
                    if (!(normalTicketTagIds.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, TicketTag_1["default"].destroy({
                            where: { ticketId: ticketId, tagId: normalTicketTagIds },
                            individualHooks: true
                        })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    if (!(tagIds.length > 0)) return [3 /*break*/, 9];
                    toInsert = tagIds
                        .filter(function (id) { return !kanbanTicketTagIds_1.includes(id); })
                        .map(function (tagId) { return ({ ticketId: Number(ticketId), tagId: tagId }); });
                    if (!(toInsert.length > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, TicketTag_1["default"].bulkCreate(toInsert, { ignoreDuplicates: true })];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [4 /*yield*/, (contact === null || contact === void 0 ? void 0 : contact.reload())];
                case 10:
                    _b.sent();
                    return [2 /*return*/, contact];
            }
        });
    });
};
exports["default"] = SyncTags;
