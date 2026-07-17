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
var wbot_1 = require("../../libs/wbot");
var Contact_1 = __importDefault(require("../../models/Contact"));
function formatBRNumber(jid) {
    var regexp = new RegExp(/^(\d{2})(\d{2})\d{1}(\d{8})$/);
    if (regexp.test(jid)) {
        var match = regexp.exec(jid);
        if (match && match[1] === '55' && Number.isInteger(Number.parseInt(match[2]))) {
            var ddd = Number.parseInt(match[2]);
            if (ddd < 31) {
                return match[0];
            }
            else if (ddd >= 31) {
                return match[1] + match[2] + match[3];
            }
        }
    }
    else {
        return jid;
    }
}
function createJid(number) {
    if (number.includes('@g.us') || number.includes('@s.whatsapp.net')) {
        return formatBRNumber(number);
    }
    return number.includes('-')
        ? "".concat(number, "@g.us")
        : "".concat(formatBRNumber(number), "@s.whatsapp.net");
}
var BlockUnblockContactService = function (_a) {
    var contactId = _a.contactId, companyId = _a.companyId, active = _a.active;
    return __awaiter(void 0, void 0, void 0, function () {
        var contact, whatsappCompany, wbot, jid, error_1, whatsappCompany, wbot, jid, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Contact_1["default"].findByPk(contactId)];
                case 1:
                    contact = _b.sent();
                    if (!contact) {
                        throw new AppError_1["default"]("ERR_NO_CONTACT_FOUND", 404);
                    }
                    if (!active) return [3 /*break*/, 6];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    whatsappCompany = null;
                    wbot = (0, wbot_1.getWbot)(whatsappCompany.id);
                    jid = createJid(contact.number);
                    return [4 /*yield*/, wbot.updateBlockStatus(jid, "unblock")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, contact.update({ active: true })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.log('Não consegui desbloquear o contato');
                    return [3 /*break*/, 6];
                case 6:
                    if (!!active) return [3 /*break*/, 11];
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 10, , 11]);
                    whatsappCompany = null;
                    wbot = (0, wbot_1.getWbot)(whatsappCompany.id);
                    jid = createJid(contact.number);
                    return [4 /*yield*/, wbot.updateBlockStatus(jid, "block")];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, contact.update({ active: false })];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10:
                    error_2 = _b.sent();
                    console.log('Não consegui bloquear o contato');
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/, contact];
            }
        });
    });
};
exports["default"] = BlockUnblockContactService;
