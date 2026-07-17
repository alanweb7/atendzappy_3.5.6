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
var Baileys_1 = __importDefault(require("../../models/Baileys"));
var createOrUpdateBaileysService = function (_a) {
    var whatsappId = _a.whatsappId, contacts = _a.contacts, chats = _a.chats;
    return __awaiter(void 0, void 0, void 0, function () {
        var baileysExists, getChats, getContacts, newChats, newContacts, baileys, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, Baileys_1["default"].findOne({
                            where: { whatsappId: whatsappId }
                        })];
                case 1:
                    baileysExists = _b.sent();
                    if (!baileysExists) return [3 /*break*/, 5];
                    getChats = baileysExists.chats
                        ? (typeof baileysExists.chats === "string" ? JSON.parse(baileysExists.chats) : baileysExists.chats)
                        : [];
                    getContacts = baileysExists.contacts
                        ? (typeof baileysExists.contacts === "string" ? JSON.parse(baileysExists.contacts) : baileysExists.contacts)
                        : [];
                    if (!chats) return [3 /*break*/, 3];
                    getChats.push.apply(getChats, chats);
                    getChats.sort();
                    newChats = getChats.filter(function (v, i, a) { return a.findIndex(function (v2) { return (v2.id === v.id); }) === i; });
                    return [4 /*yield*/, baileysExists.update({
                            chats: JSON.stringify(newChats)
                        })];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    if (!contacts) return [3 /*break*/, 5];
                    getContacts.push.apply(getContacts, contacts);
                    getContacts.sort();
                    newContacts = getContacts.filter(function (v, i, a) { return a.findIndex(function (v2) { return (v2.id === v.id); }) === i; });
                    return [4 /*yield*/, baileysExists.update({
                            contacts: JSON.stringify(newContacts)
                        })];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, Baileys_1["default"].create({
                        whatsappId: whatsappId,
                        contacts: JSON.stringify(contacts),
                        chats: JSON.stringify(chats)
                    })];
                case 6:
                    baileys = _b.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 7:
                    _b.sent();
                    return [2 /*return*/, baileys];
                case 8:
                    error_1 = _b.sent();
                    console.log(error_1, whatsappId, contacts);
                    throw new Error(error_1);
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = createOrUpdateBaileysService;
