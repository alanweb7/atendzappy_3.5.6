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
exports.runCleanLidContacts = void 0;
var sequelize_1 = require("sequelize");
var Contact_1 = __importDefault(require("../../models/Contact"));
var logger_1 = __importDefault(require("../../utils/logger"));
var normalizeContactNumber_1 = require("../../helpers/normalizeContactNumber");
var BATCH_SIZE = 200;
var buildWhereClause = function () {
    var _a, _b, _c, _d, _e;
    return (_a = {},
        _a[sequelize_1.Op.or] = [
            { remoteJid: (_b = {}, _b[sequelize_1.Op.like] = "%@lid%", _b) },
            { isLid: true },
            { number: (_c = {}, _c[sequelize_1.Op.like] = "%:%", _c) },
            { number: (_d = {}, _d[sequelize_1.Op.like] = "%@%", _d) },
            { number: (_e = {}, _e[sequelize_1.Op.like] = "% %%", _e) }
        ],
        _a);
};
var sanitizeContact = function (contact) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedNumber, sanitizedRemoteJid, hasChanges;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                normalizedNumber = (0, normalizeContactNumber_1.resolveContactNumber)({
                    rawNumber: contact.number,
                    remoteJid: contact.remoteJid,
                    remoteJidAlt: contact.remoteJid
                }) || ((_a = contact.number) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, ""));
                if (!normalizedNumber) {
                    logger_1["default"].warn("[cleanLidContacts] Ignorando contato ".concat(contact.id, " \u2014 n\u00E3o foi poss\u00EDvel extrair n\u00FAmero v\u00E1lido"), { remoteJid: contact.remoteJid });
                    return [2 /*return*/, { updated: false }];
                }
                sanitizedRemoteJid = (0, normalizeContactNumber_1.sanitizeRemoteJid)(contact.remoteJid, normalizedNumber, contact.isGroup) ||
                    (0, normalizeContactNumber_1.buildRemoteJidFromNumber)(normalizedNumber, contact.isGroup);
                hasChanges = false;
                if (contact.number !== normalizedNumber) {
                    contact.number = normalizedNumber;
                    hasChanges = true;
                }
                if (sanitizedRemoteJid && contact.remoteJid !== sanitizedRemoteJid) {
                    contact.remoteJid = sanitizedRemoteJid;
                    hasChanges = true;
                }
                if (contact.isLid) {
                    contact.isLid = false;
                    hasChanges = true;
                }
                if (!hasChanges) return [3 /*break*/, 2];
                return [4 /*yield*/, contact.save()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2: return [2 /*return*/, { updated: hasChanges }];
        }
    });
}); };
var runCleanLidContacts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var offset, updatedCount, processed, contacts, _i, contacts_1, contact, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1["default"].info("[cleanLidContacts] Iniciando saneamento de contatos com @lid");
                offset = 0;
                updatedCount = 0;
                processed = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 7];
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: buildWhereClause(),
                        limit: BATCH_SIZE,
                        offset: offset,
                        order: [["id", "ASC"]]
                    })];
            case 2:
                contacts = _a.sent();
                if (contacts.length === 0) {
                    return [3 /*break*/, 7];
                }
                _i = 0, contacts_1 = contacts;
                _a.label = 3;
            case 3:
                if (!(_i < contacts_1.length)) return [3 /*break*/, 6];
                contact = contacts_1[_i];
                return [4 /*yield*/, sanitizeContact(contact)];
            case 4:
                updated = (_a.sent()).updated;
                if (updated) {
                    updatedCount += 1;
                }
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                processed += contacts.length;
                offset += BATCH_SIZE;
                logger_1["default"].info("[cleanLidContacts] Processados ".concat(processed, " contatos..."));
                return [3 /*break*/, 1];
            case 7:
                logger_1["default"].info("[cleanLidContacts] Finalizado! Contatos analisados: ".concat(processed, ". Contatos atualizados: ").concat(updatedCount, "."));
                return [2 /*return*/];
        }
    });
}); };
exports.runCleanLidContacts = runCleanLidContacts;
