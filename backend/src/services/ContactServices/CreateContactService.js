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
// @ts-nocheck
var AppError_1 = __importDefault(require("../../errors/AppError"));
var CompaniesSettings_1 = __importDefault(require("../../models/CompaniesSettings"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var ContactWallet_1 = __importDefault(require("../../models/ContactWallet"));
var CreateOrUpdateContactService_1 = __importDefault(require("./CreateOrUpdateContactService"));
var CreateContactService = function (_a) {
    var name = _a.name, number = _a.number, _b = _a.email, email = _b === void 0 ? "" : _b, acceptAudioMessage = _a.acceptAudioMessage, active = _a.active, companyId = _a.companyId, _c = _a.extraInfo, extraInfo = _c === void 0 ? [] : _c, _d = _a.remoteJid, remoteJid = _d === void 0 ? "" : _d, wallets = _a.wallets, cpfCnpj = _a.cpfCnpj, address = _a.address, info = _a.info, birthday = _a.birthday, anniversary = _a.anniversary;
    return __awaiter(void 0, void 0, void 0, function () {
        var numberExists, settings, acceptAudioMessageContact, contact, contactWallets_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, Contact_1["default"].findOne({
                        where: { number: number, companyId: companyId }
                    })];
                case 1:
                    numberExists = _e.sent();
                    if (numberExists) {
                        throw new AppError_1["default"]("ERR_DUPLICATED_CONTACT");
                    }
                    return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                            where: {
                                companyId: companyId
                            }
                        })];
                case 2:
                    settings = _e.sent();
                    acceptAudioMessageContact = settings.acceptAudioMessageContact;
                    return [4 /*yield*/, (0, CreateOrUpdateContactService_1["default"])({
                            name: name,
                            number: number,
                            email: email,
                            isGroup: false,
                            companyId: companyId,
                            extraInfo: extraInfo,
                            remoteJid: remoteJid,
                            acceptAudioMessage: acceptAudioMessage !== null && acceptAudioMessage !== void 0 ? acceptAudioMessage : (acceptAudioMessageContact === "enabled"),
                            active: active,
                            cpfCnpj: cpfCnpj,
                            address: address,
                            info: info,
                            channel: "whatsapp",
                            profilePicUrl: "",
                            birthday: birthday,
                            anniversary: anniversary
                        })];
                case 3:
                    contact = _e.sent();
                    if (!wallets) return [3 /*break*/, 6];
                    return [4 /*yield*/, ContactWallet_1["default"].destroy({
                            where: {
                                companyId: companyId,
                                contactId: contact.id
                            }
                        })];
                case 4:
                    _e.sent();
                    contactWallets_1 = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    wallets.forEach(function (wallet) {
                        contactWallets_1.push({
                            walletId: !wallet.id ? wallet : wallet.id,
                            contactId: contact.id,
                            companyId: companyId
                        });
                    });
                    return [4 /*yield*/, ContactWallet_1["default"].bulkCreate(contactWallets_1)];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6: return [2 /*return*/, contact];
            }
        });
    });
};
exports["default"] = CreateContactService;
