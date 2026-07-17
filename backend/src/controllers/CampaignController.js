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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteMedia = exports.deleteTemplateMedia = exports.templateMediaUpload = exports.mediaUpload = exports.findList = exports.remove = exports.restart = exports.cancel = exports.update = exports.show = exports.store = exports.index = void 0;
var Yup = __importStar(require("yup"));
var socket_1 = require("../libs/socket");
var lodash_1 = require("lodash");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ListService_1 = __importDefault(require("../services/CampaignService/ListService"));
var CreateService_1 = __importDefault(require("../services/CampaignService/CreateService"));
var ShowService_1 = __importDefault(require("../services/CampaignService/ShowService"));
var UpdateService_1 = __importDefault(require("../services/CampaignService/UpdateService"));
var DeleteService_1 = __importDefault(require("../services/CampaignService/DeleteService"));
var FindService_1 = __importDefault(require("../services/CampaignService/FindService"));
var Campaign_1 = __importDefault(require("../models/Campaign"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var Contact_1 = __importDefault(require("../models/Contact"));
var ContactList_1 = __importDefault(require("../models/ContactList"));
var ContactListItem_1 = __importDefault(require("../models/ContactListItem"));
var TicketTag_1 = __importDefault(require("../models/TicketTag"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CancelService_1 = require("../services/CampaignService/CancelService");
var RestartService_1 = require("../services/CampaignService/RestartService");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, companyId, _b, records, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ListService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: companyId
                    })];
            case 1:
                _b = _c.sent(), records = _b.records, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ records: records, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function createContactListFromTag(tagId) {
        return __awaiter(this, void 0, void 0, function () {
            var formattedDate, contactTags, contactIds, contacts, contactList, contactListId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formattedDate = new Date().toISOString();
                        return [4 /*yield*/, ContactTag_1["default"].findAll({ where: { tagId: tagId } })];
                    case 1:
                        contactTags = _a.sent();
                        contactIds = contactTags.map(function (ct) { return ct.contactId; });
                        return [4 /*yield*/, Contact_1["default"].findAll({ where: { id: contactIds, companyId: companyId } })];
                    case 2:
                        contacts = _a.sent();
                        return [4 /*yield*/, ContactList_1["default"].create({ name: "".concat(campanhaNome_1, " | TAG: ").concat(tagId, " - ").concat(formattedDate), companyId: companyId })];
                    case 3:
                        contactList = _a.sent();
                        contactListId = contactList.id;
                        return [4 /*yield*/, ContactListItem_1["default"].bulkCreate(contacts.map(function (contact) { return ({
                                name: contact.name,
                                number: contact.number,
                                email: contact.email,
                                contactListId: contactListId,
                                companyId: companyId,
                                isWhatsappValid: true,
                                isGroup: contact.isGroup
                            }); }))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, contactListId];
                }
            });
        });
    }
    function createContactListFromTagKanban(tagId) {
        return __awaiter(this, void 0, void 0, function () {
            var formattedDate, ticketTags, contactIds, contacts, contactList, contactListId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formattedDate = new Date().toISOString();
                        return [4 /*yield*/, TicketTag_1["default"].findAll({
                                where: { tagId: tagId },
                                include: [{ model: Ticket_1["default"], as: "ticket", attributes: ["contactId"] }]
                            })];
                    case 1:
                        ticketTags = _a.sent();
                        contactIds = __spreadArray([], new Set(ticketTags.map(function (tt) { var _a; return (_a = tt.ticket) === null || _a === void 0 ? void 0 : _a.contactId; }).filter(Boolean)), true);
                        return [4 /*yield*/, Contact_1["default"].findAll({ where: { id: contactIds, companyId: companyId } })];
                    case 2:
                        contacts = _a.sent();
                        return [4 /*yield*/, ContactList_1["default"].create({ name: "".concat(campanhaNome_2, " | TAGKANBAN: ").concat(tagId, " - ").concat(formattedDate), companyId: companyId })];
                    case 3:
                        contactList = _a.sent();
                        contactListId = contactList.id;
                        return [4 /*yield*/, ContactListItem_1["default"].bulkCreate(contacts.map(function (contact) { return ({
                                name: contact.name,
                                number: contact.number,
                                email: contact.email,
                                contactListId: contactListId,
                                companyId: companyId,
                                isWhatsappValid: true,
                                isGroup: contact.isGroup
                            }); }))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, contactListId];
                }
            });
        });
    }
    var companyId, data, schema, err_1, tagListIdNum, tagKanbanIdNum, tagId, campanhaNome_1, tagId, campanhaNome_2, record, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                data = req.body;
                schema = Yup.object().shape({
                    name: Yup.string().required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 4:
                tagListIdNum = data.tagListId != null ? Number(data.tagListId) : NaN;
                tagKanbanIdNum = data.tagKanbanId != null ? Number(data.tagKanbanId) : NaN;
                if (!(!isNaN(tagListIdNum) && tagListIdNum > 0)) return [3 /*break*/, 5];
                tagId = tagListIdNum;
                campanhaNome_1 = data.name;
                createContactListFromTag(tagId)
                    .then(function (contactListId) { return __awaiter(void 0, void 0, void 0, function () {
                    var record, io;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, CreateService_1["default"])(__assign(__assign({}, data), { companyId: companyId, contactListId: contactListId }))];
                            case 1:
                                record = _a.sent();
                                io = (0, socket_1.getIO)();
                                io.of(String(companyId)).emit("company-".concat(companyId, "-campaign"), { action: "create", record: record });
                                return [2 /*return*/, res.status(200).json(record)];
                        }
                    });
                }); })["catch"](function (error) {
                    console.error('Error:', error);
                    return res.status(500).json({ error: 'Error creating contact list' });
                });
                return [3 /*break*/, 8];
            case 5:
                if (!(!isNaN(tagKanbanIdNum) && tagKanbanIdNum > 0)) return [3 /*break*/, 6];
                tagId = tagKanbanIdNum;
                campanhaNome_2 = data.name;
                createContactListFromTagKanban(tagId)
                    .then(function (contactListId) { return __awaiter(void 0, void 0, void 0, function () {
                    var record, io;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, CreateService_1["default"])(__assign(__assign({}, data), { companyId: companyId, contactListId: contactListId }))];
                            case 1:
                                record = _a.sent();
                                io = (0, socket_1.getIO)();
                                io.of(String(companyId)).emit("company-".concat(companyId, "-campaign"), { action: "create", record: record });
                                return [2 /*return*/, res.status(200).json(record)];
                        }
                    });
                }); })["catch"](function (error) {
                    console.error('Error:', error);
                    return res.status(500).json({ error: 'Error creating contact list from kanban tag' });
                });
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, CreateService_1["default"])(__assign(__assign({}, data), { companyId: companyId }))];
            case 7:
                record = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-campaign"), {
                    action: "create",
                    record: record
                });
                return [2 /*return*/, res.status(200).json(record)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, ShowService_1["default"])(id)];
            case 1:
                record = _a.sent();
                return [2 /*return*/, res.status(200).json(record)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, companyId, schema, err_2, id, record, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                companyId = req.user.companyId;
                schema = Yup.object().shape({
                    name: Yup.string().required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                throw new AppError_1["default"](err_2.message);
            case 4:
                id = req.params.id;
                return [4 /*yield*/, (0, UpdateService_1["default"])(__assign(__assign({}, data), { id: id }))];
            case 5:
                record = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-campaign"), {
                    action: "update",
                    record: record
                });
                return [2 /*return*/, res.status(200).json(record)];
        }
    });
}); };
exports.update = update;
var cancel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, CancelService_1.CancelService)(+id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ message: "Cancelamento realizado" })];
        }
    });
}); };
exports.cancel = cancel;
var restart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, RestartService_1.RestartService)(+id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ message: "Reinício dos disparos" })];
        }
    });
}); };
exports.restart = restart;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, DeleteService_1["default"])(id)];
            case 1:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-campaign"), {
                    action: "delete",
                    id: id
                });
                return [2 /*return*/, res.status(200).json({ message: "Campaign deleted" })];
        }
    });
}); };
exports.remove = remove;
var findList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.query;
                return [4 /*yield*/, (0, FindService_1["default"])(params)];
            case 1:
                records = _a.sent();
                return [2 /*return*/, res.status(200).json(records)];
        }
    });
}); };
exports.findList = findList;
var mediaUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, files, file, campaign, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                files = req.files;
                file = (0, lodash_1.head)(files);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Campaign_1["default"].findByPk(id)];
            case 2:
                campaign = _a.sent();
                campaign.mediaPath = file.filename;
                campaign.mediaName = file.originalname;
                return [4 /*yield*/, campaign.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.send({ mensagem: "Mensagem enviada" })];
            case 4:
                err_3 = _a.sent();
                throw new AppError_1["default"](err_3.message);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.mediaUpload = mediaUpload;
var templateMediaUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, files, file;
    return __generator(this, function (_a) {
        companyId = req.user.companyId;
        files = req.files;
        file = (0, lodash_1.head)(files);
        if (!file) {
            throw new AppError_1["default"]("Nenhum arquivo enviado");
        }
        return [2 /*return*/, res.send({ mediaPath: file.filename, mediaName: file.originalname })];
    });
}); };
exports.templateMediaUpload = templateMediaUpload;
var deleteTemplateMedia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, mediaPath, filePath;
    return __generator(this, function (_a) {
        companyId = req.user.companyId;
        mediaPath = req.body.mediaPath;
        if (mediaPath) {
            filePath = path_1["default"].resolve("public", "company".concat(companyId), mediaPath);
            if (fs_1["default"].existsSync(filePath)) {
                fs_1["default"].unlinkSync(filePath);
            }
        }
        return [2 /*return*/, res.send({ mensagem: "Arquivo excluído" })];
    });
}); };
exports.deleteTemplateMedia = deleteTemplateMedia;
var deleteMedia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, campaign, filePath, fileExists, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Campaign_1["default"].findByPk(id)];
            case 2:
                campaign = _a.sent();
                filePath = path_1["default"].resolve("public", "company".concat(companyId), campaign.mediaPath);
                fileExists = fs_1["default"].existsSync(filePath);
                if (fileExists) {
                    fs_1["default"].unlinkSync(filePath);
                }
                campaign.mediaPath = null;
                campaign.mediaName = null;
                return [4 /*yield*/, campaign.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.send({ mensagem: "Arquivo excluído" })];
            case 4:
                err_4 = _a.sent();
                throw new AppError_1["default"](err_4.message);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteMedia = deleteMedia;
