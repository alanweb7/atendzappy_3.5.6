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
exports.listWhatsapp = exports.updateContactWallet = exports.toggleDisableBot = exports.getContactTags = exports.getContactVcard = exports.getContactProfileURL = exports.uploadContactFiles = exports.upload = exports.blockUnblock = exports.toggleAcceptAudio = exports.list = exports.remove = exports.update = exports.show = exports.store = exports.getContact = exports.index = exports.deleteContactFile = exports.importXls = void 0;
// @ts-nocheck
// @ts-nocheck
var Yup = __importStar(require("yup"));
var socket_1 = require("../libs/socket");
var lodash_1 = require("lodash");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ListContactsService_1 = __importDefault(require("../services/ContactServices/ListContactsService"));
var CreateContactService_1 = __importDefault(require("../services/ContactServices/CreateContactService"));
var ShowContactService_1 = __importDefault(require("../services/ContactServices/ShowContactService"));
var UpdateContactService_1 = __importDefault(require("../services/ContactServices/UpdateContactService"));
var DeleteContactService_1 = __importDefault(require("../services/ContactServices/DeleteContactService"));
var GetContactService_1 = __importDefault(require("../services/ContactServices/GetContactService"));
var CheckNumber_1 = __importDefault(require("../services/WbotServices/CheckNumber"));
var GetProfilePicUrl_1 = __importDefault(require("../services/WbotServices/GetProfilePicUrl"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var SimpleListService_1 = __importDefault(require("../services/ContactServices/SimpleListService"));
var ToggleAcceptAudioContactService_1 = __importDefault(require("../services/ContactServices/ToggleAcceptAudioContactService"));
var BlockUnblockContactService_1 = __importDefault(require("../services/ContactServices/BlockUnblockContactService"));
var ImportContactsService_1 = require("../services/ContactServices/ImportContactsService");
var NumberSimpleListService_1 = __importDefault(require("../services/ContactServices/NumberSimpleListService"));
var CreateOrUpdateContactServiceForImport_1 = __importDefault(require("../services/ContactServices/CreateOrUpdateContactServiceForImport"));
var UpdateContactWalletsService_1 = __importDefault(require("../services/ContactServices/UpdateContactWalletsService"));
var FindContactTags_1 = __importDefault(require("../services/ContactServices/FindContactTags"));
var ToggleDisableBotContactService_1 = __importDefault(require("../services/ContactServices/ToggleDisableBotContactService"));
var Contact_1 = __importDefault(require("../models/Contact"));
var Tag_1 = __importDefault(require("../models/Tag"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var logger_1 = __importDefault(require("../utils/logger"));
var importXls = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, number, name, email, validateContact, tags, simpleNumber, validNumber, contactData, contact, tagList, _i, tagList_1, tagName, _b, tag, created, error_1, io;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, number = _a.number, name = _a.name, email = _a.email, validateContact = _a.validateContact, tags = _a.tags;
                simpleNumber = String(number).replace(/[^\d.-]+/g, '');
                validNumber = simpleNumber;
                if (!(validateContact === "true")) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, CheckNumber_1["default"])(simpleNumber, companyId)];
            case 1:
                validNumber = _c.sent();
                _c.label = 2;
            case 2:
                contactData = {
                    name: "".concat(name),
                    number: validNumber,
                    profilePicUrl: "",
                    isGroup: false,
                    email: email,
                    companyId: companyId
                };
                return [4 /*yield*/, (0, CreateOrUpdateContactServiceForImport_1["default"])(contactData)];
            case 3:
                contact = _c.sent();
                if (!tags) return [3 /*break*/, 10];
                tagList = tags.split(',').map(function (tag) { return tag.trim(); });
                _i = 0, tagList_1 = tagList;
                _c.label = 4;
            case 4:
                if (!(_i < tagList_1.length)) return [3 /*break*/, 10];
                tagName = tagList_1[_i];
                _c.label = 5;
            case 5:
                _c.trys.push([5, 8, , 9]);
                return [4 /*yield*/, Tag_1["default"].findOrCreate({
                        where: { name: tagName, companyId: companyId, color: "#A4CCCC", kanban: 0 }
                    })];
            case 6:
                _b = _c.sent(), tag = _b[0], created = _b[1];
                // Associate the tag with the contact
                return [4 /*yield*/, ContactTag_1["default"].findOrCreate({
                        where: {
                            contactId: contact.id,
                            tagId: tag.id
                        }
                    })];
            case 7:
                // Associate the tag with the contact
                _c.sent();
                return [3 /*break*/, 9];
            case 8:
                error_1 = _c.sent();
                logger_1["default"].info("Erro ao criar Tags", error_1);
                return [3 /*break*/, 9];
            case 9:
                _i++;
                return [3 /*break*/, 4];
            case 10:
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "create",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.importXls = importXls;
var deleteContactFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, filename, companyId, contact, existingFiles, filteredFiles, publicFolder, filePath, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                filename = req.body.filename;
                companyId = req.user.companyId;
                return [4 /*yield*/, Contact_1["default"].findOne({ where: { id: contactId, companyId: companyId } })];
            case 1:
                contact = _a.sent();
                if (!contact) {
                    throw new AppError_1["default"]("ERR_NO_CONTACT_FOUND", 404);
                }
                existingFiles = (contact.files || []);
                filteredFiles = existingFiles.filter(function (file) { return file.filename !== filename; });
                contact.files = filteredFiles;
                return [4 /*yield*/, contact.save()];
            case 2:
                _a.sent();
                // tentar remover arquivo físico (ignora erro se não existir)
                try {
                    publicFolder = path_1["default"].resolve(__dirname, "..", "..", "public");
                    filePath = path_1["default"].resolve(publicFolder, "company".concat(companyId), "contacts", String(contactId), filename);
                    if (fs_1["default"].existsSync(filePath)) {
                        fs_1["default"].unlinkSync(filePath);
                    }
                }
                catch (err) {
                    logger_1["default"].warn("Erro ao remover arquivo de contato", err);
                }
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "update",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.deleteContactFile = deleteContactFile;
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, tagIdsStringified, isGroup, _b, userId, companyId, tagsIds, _c, contacts, count, hasMore;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber, tagIdsStringified = _a.contactTag, isGroup = _a.isGroup;
                _b = req.user, userId = _b.id, companyId = _b.companyId;
                console.log("index", { companyId: companyId, userId: userId, searchParam: searchParam });
                tagsIds = [];
                if (tagIdsStringified) {
                    tagsIds = JSON.parse(tagIdsStringified);
                }
                return [4 /*yield*/, (0, ListContactsService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: companyId,
                        tagsIds: tagsIds,
                        isGroup: isGroup,
                        userId: Number(userId)
                    })];
            case 1:
                _c = _d.sent(), contacts = _c.contacts, count = _c.count, hasMore = _c.hasMore;
                return [2 /*return*/, res.json({ contacts: contacts, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var getContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, number, companyId, contact;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, number = _a.number;
                companyId = req.user.companyId;
                console.log("getContact", { companyId: companyId, name: name, number: number });
                return [4 /*yield*/, (0, GetContactService_1["default"])({
                        name: name,
                        number: number,
                        companyId: companyId
                    })];
            case 1:
                contact = _b.sent();
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.getContact = getContact;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, newContact, newRemoteJid, findContact, schema, err_1, validNumber, err_2, contact, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                newContact = req.body;
                newRemoteJid = newContact.number;
                console.log("store", { companyId: companyId, newContact: newContact });
                if (!newContact.name || !newContact.name.trim()) {
                    throw new AppError_1["default"]("O nome do contato é obrigatório.");
                }
                if (!newContact.number || !newContact.number.trim()) {
                    throw new AppError_1["default"]("O número do contato é obrigatório.");
                }
                newContact.number = newContact.number.replace(/[-\s]/g, "");
                if (!/^\d+$/.test(newContact.number)) {
                    throw new AppError_1["default"]("Formato de número inválido. Use apenas números (ex: 5524999998888).");
                }
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            number: newContact.number,
                            companyId: companyId
                        }
                    })];
            case 1:
                findContact = _a.sent();
                if (findContact) {
                    throw new AppError_1["default"]("Já existe um contato com este número.");
                }
                schema = Yup.object().shape({
                    name: Yup.string().required("O nome é obrigatório."),
                    number: Yup.string()
                        .required("O número é obrigatório.")
                        .matches(/^\d+$/, "Formato de número inválido. Use apenas números.")
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, schema.validate(newContact)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 5:
                validNumber = newContact.number;
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, (0, CheckNumber_1["default"])(newContact.number, companyId)];
            case 7:
                validNumber = _a.sent();
                return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                console.log("CheckContactNumber falhou para ".concat(newContact.number, ": ").concat(err_2.message, ". Usando n\u00FAmero informado."));
                return [3 /*break*/, 9];
            case 9: return [4 /*yield*/, (0, CreateContactService_1["default"])(__assign(__assign({}, newContact), { number: validNumber, companyId: companyId }))];
            case 10:
                contact = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "create",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowContactService_1["default"])(contactId, companyId)];
            case 1:
                contact = _a.sent();
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactData, companyId, contactId, schema, err_3, oldContact, isGroup, validNumber, number, contact, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactData = req.body;
                companyId = req.user.companyId;
                contactId = req.params.contactId;
                schema = Yup.object().shape({
                    name: Yup.string(),
                    number: Yup.string().matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(contactData)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                throw new AppError_1["default"](err_3.message);
            case 4: return [4 /*yield*/, (0, ShowContactService_1["default"])(contactId, companyId)];
            case 5:
                oldContact = _a.sent();
                if (!(oldContact.number != contactData.number && oldContact.channel == "whatsapp")) return [3 /*break*/, 7];
                isGroup = oldContact && oldContact.remoteJid ? oldContact.remoteJid.endsWith("@g.us") : oldContact.isGroup;
                return [4 /*yield*/, (0, CheckNumber_1["default"])(contactData.number, companyId, isGroup)];
            case 6:
                validNumber = _a.sent();
                number = validNumber;
                contactData.number = number;
                _a.label = 7;
            case 7: return [4 /*yield*/, (0, UpdateContactService_1["default"])({
                    contactData: contactData,
                    contactId: contactId,
                    companyId: companyId
                })];
            case 8:
                contact = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "update",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowContactService_1["default"])(contactId, companyId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, DeleteContactService_1["default"])(contactId)];
            case 2:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "delete",
                    contactId: contactId
                });
                return [2 /*return*/, res.status(200).json({ message: "Contact deleted" })];
        }
    });
}); };
exports.remove = remove;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, companyId, contacts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.query.name;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, SimpleListService_1["default"])({ name: name, companyId: companyId })];
            case 1:
                contacts = _a.sent();
                return [2 /*return*/, res.json(contacts)];
        }
    });
}); };
exports.list = list;
var toggleAcceptAudio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, contact, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ToggleAcceptAudioContactService_1["default"])({ contactId: contactId })];
            case 1:
                contact = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "update",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.toggleAcceptAudio = toggleAcceptAudio;
var blockUnblock = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, active, contact, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                active = req.body.active;
                return [4 /*yield*/, (0, BlockUnblockContactService_1["default"])({ contactId: contactId, companyId: companyId, active: active })];
            case 1:
                contact = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "update",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.blockUnblock = blockUnblock;
var upload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, file, companyId, response, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                files = req.files;
                file = (0, lodash_1.head)(files);
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ImportContactsService_1.ImportContactsService)(companyId, file)];
            case 1:
                response = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "reload",
                    records: response
                });
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.upload = upload;
var uploadContactFiles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, files, contact, existingFiles, uploadedFiles, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                files = req.files;
                return [4 /*yield*/, Contact_1["default"].findOne({ where: { id: contactId, companyId: companyId } })];
            case 1:
                contact = _a.sent();
                if (!contact) {
                    throw new AppError_1["default"]("ERR_NO_CONTACT_FOUND", 404);
                }
                existingFiles = (contact.files || []);
                uploadedFiles = files.map(function (file) { return ({
                    originalName: file.originalname,
                    filename: file.filename,
                    mimetype: file.mimetype,
                    size: file.size
                }); });
                contact.files = __spreadArray(__spreadArray([], existingFiles, true), uploadedFiles, true);
                return [4 /*yield*/, contact.save()];
            case 2:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "update",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.uploadContactFiles = uploadContactFiles;
var getContactProfileURL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var number, companyId, validNumber, profilePicUrl, contact, obj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                number = req.params.number;
                companyId = req.user.companyId;
                console.log("getContactProfileURL", { number: number, companyId: companyId });
                if (!number) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, CheckNumber_1["default"])(number, companyId)];
            case 1:
                validNumber = _a.sent();
                return [4 /*yield*/, (0, GetProfilePicUrl_1["default"])(validNumber, companyId)];
            case 2:
                profilePicUrl = _a.sent();
                return [4 /*yield*/, (0, NumberSimpleListService_1["default"])({ number: validNumber, companyId: companyId })];
            case 3:
                contact = _a.sent();
                obj = void 0;
                if (contact.length > 0) {
                    obj = {
                        contactId: contact[0].id,
                        profilePicUrl: profilePicUrl
                    };
                }
                else {
                    obj = {
                        contactId: 0,
                        profilePicUrl: profilePicUrl
                    };
                }
                return [2 /*return*/, res.status(200).json(obj)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getContactProfileURL = getContactProfileURL;
var getContactVcard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, number, companyId, vNumber, numberDDI, numberDDD, numberUser, contact;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, name = _a.name, number = _a.number;
                companyId = req.user.companyId;
                vNumber = number;
                numberDDI = vNumber.toString().substr(0, 2);
                numberDDD = vNumber.toString().substr(2, 2);
                numberUser = vNumber.toString().substr(-8, 8);
                if (numberDDD <= '30' && numberDDI === '55') {
                    console.log("menor 30");
                    vNumber = "".concat(numberDDI + numberDDD + 9 + numberUser, "@s.whatsapp.net");
                }
                else if (numberDDD > '30' && numberDDI === '55') {
                    console.log("maior 30");
                    vNumber = "".concat(numberDDI + numberDDD + numberUser, "@s.whatsapp.net");
                }
                else {
                    vNumber = "".concat(number, "@s.whatsapp.net");
                }
                return [4 /*yield*/, (0, GetContactService_1["default"])({
                        name: name,
                        number: number,
                        companyId: companyId
                    })];
            case 1:
                contact = _b.sent();
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.getContactVcard = getContactVcard;
var getContactTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, contactTags, tags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                return [4 /*yield*/, (0, FindContactTags_1["default"])({ contactId: contactId })];
            case 1:
                contactTags = _a.sent();
                tags = false;
                if (contactTags.length > 0) {
                    tags = true;
                }
                return [2 /*return*/, res.status(200).json({ tags: tags })];
        }
    });
}); };
exports.getContactTags = getContactTags;
var toggleDisableBot = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactId, companyId, contact, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ToggleDisableBotContactService_1["default"])({ contactId: contactId })];
            case 1:
                contact = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-contact"), {
                    action: "update",
                    contact: contact
                });
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.toggleDisableBot = toggleDisableBot;
var updateContactWallet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wallets, contactId, companyId, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wallets = req.body.wallets;
                contactId = req.params.contactId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, UpdateContactWalletsService_1["default"])({
                        wallets: wallets,
                        contactId: contactId,
                        companyId: companyId
                    })];
            case 1:
                contact = _a.sent();
                return [2 /*return*/, res.status(200).json(contact)];
        }
    });
}); };
exports.updateContactWallet = updateContactWallet;
var listWhatsapp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, companyId, contactsAll, contacts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.query.name;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, SimpleListService_1["default"])({ name: name, companyId: companyId })];
            case 1:
                contactsAll = _a.sent();
                contacts = contactsAll.filter(function (contact) { return contact.channel == "whatsapp"; });
                return [2 /*return*/, res.json(contacts)];
        }
    });
}); };
exports.listWhatsapp = listWhatsapp;
