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
// @ts-nocheck
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var ContactCustomField_1 = __importDefault(require("../../models/ContactCustomField"));
var ContactWallet_1 = __importDefault(require("../../models/ContactWallet"));
var UpdateContactService = function (_a) {
    var contactData = _a.contactData, contactId = _a.contactId, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var email, name, number, extraInfo, acceptAudioMessage, active, disableBot, remoteJid, wallets, cpfCnpj, address, info, birthday, anniversary, contact, contactWallets_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    email = contactData.email, name = contactData.name, number = contactData.number, extraInfo = contactData.extraInfo, acceptAudioMessage = contactData.acceptAudioMessage, active = contactData.active, disableBot = contactData.disableBot, remoteJid = contactData.remoteJid, wallets = contactData.wallets, cpfCnpj = contactData.cpfCnpj, address = contactData.address, info = contactData.info, birthday = contactData.birthday, anniversary = contactData.anniversary;
                    return [4 /*yield*/, Contact_1["default"].findOne({
                            where: { id: contactId },
                            attributes: [
                                "id",
                                "name",
                                "number",
                                "channel",
                                "email",
                                "companyId",
                                "acceptAudioMessage",
                                "active",
                                "profilePicUrl",
                                "remoteJid",
                                "urlPicture",
                                "cpfCnpj",
                                "address",
                                "info",
                                "birthday",
                                "anniversary"
                            ],
                            include: [
                                "extraInfo",
                                "tags",
                                {
                                    association: "wallets",
                                    attributes: ["id", "name"]
                                },
                                {
                                    association: "crmClients",
                                    attributes: ["id", "name", "email", "phone"]
                                }
                            ]
                        })];
                case 1:
                    contact = _b.sent();
                    if ((contact === null || contact === void 0 ? void 0 : contact.companyId) !== companyId) {
                        throw new AppError_1["default"]("Não é possível alterar registros de outra empresa");
                    }
                    if (!contact) {
                        throw new AppError_1["default"]("ERR_NO_CONTACT_FOUND", 404);
                    }
                    if (!extraInfo) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.all(extraInfo.map(function (info) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ContactCustomField_1["default"].upsert(__assign(__assign({}, info), { contactId: contact.id }))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, Promise.all(contact.extraInfo.map(function (oldInfo) { return __awaiter(void 0, void 0, void 0, function () {
                            var stillExists;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        stillExists = extraInfo.findIndex(function (info) { return info.id === oldInfo.id; });
                                        if (!(stillExists === -1)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, ContactCustomField_1["default"].destroy({ where: { id: oldInfo.id } })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    if (!wallets) return [3 /*break*/, 7];
                    return [4 /*yield*/, ContactWallet_1["default"].destroy({
                            where: {
                                companyId: companyId,
                                contactId: contactId
                            }
                        })];
                case 5:
                    _b.sent();
                    contactWallets_1 = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    wallets.forEach(function (wallet) {
                        contactWallets_1.push({
                            walletId: !wallet.id ? wallet : wallet.id,
                            contactId: contactId,
                            companyId: companyId
                        });
                    });
                    return [4 /*yield*/, ContactWallet_1["default"].bulkCreate(contactWallets_1)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [4 /*yield*/, contact.update({
                        name: name,
                        number: number,
                        email: email,
                        acceptAudioMessage: acceptAudioMessage,
                        active: active,
                        disableBot: disableBot,
                        remoteJid: remoteJid,
                        cpfCnpj: cpfCnpj,
                        address: address,
                        info: info,
                        birthday: birthday,
                        anniversary: anniversary
                    })];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, contact.reload({
                            attributes: [
                                "id",
                                "name",
                                "number",
                                "channel",
                                "email",
                                "companyId",
                                "acceptAudioMessage",
                                "active",
                                "profilePicUrl",
                                "remoteJid",
                                "urlPicture",
                                "cpfCnpj",
                                "address",
                                "info",
                                "birthday",
                                "anniversary"
                            ],
                            include: [
                                "extraInfo",
                                "tags",
                                {
                                    association: "wallets",
                                    attributes: ["id", "name"]
                                },
                                {
                                    association: "crmClients",
                                    attributes: ["id", "name", "email", "phone"]
                                }
                            ]
                        })];
                case 9:
                    _b.sent();
                    return [2 /*return*/, contact];
            }
        });
    });
};
exports["default"] = UpdateContactService;
