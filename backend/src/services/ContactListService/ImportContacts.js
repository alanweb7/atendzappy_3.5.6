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
exports.ImportContacts = void 0;
var lodash_1 = require("lodash");
var xlsx_1 = __importDefault(require("xlsx"));
var lodash_2 = require("lodash");
var ContactListItem_1 = __importDefault(require("../../models/ContactListItem"));
var CheckNumber_1 = __importDefault(require("../WbotServices/CheckNumber"));
var logger_1 = __importDefault(require("../../utils/logger"));
// import CheckContactNumber from "../WbotServices/CheckNumber";
function ImportContacts(contactListId, companyId, file) {
    return __awaiter(this, void 0, void 0, function () {
        var workbook, worksheet, rows, contacts, contactList, _i, contacts_1, contact, _a, newContact, created, _b, contactList_1, newContact, response, number, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    workbook = xlsx_1["default"].readFile(file === null || file === void 0 ? void 0 : file.path);
                    worksheet = (0, lodash_1.head)(Object.values(workbook.Sheets));
                    rows = xlsx_1["default"].utils.sheet_to_json(worksheet, { header: 0 });
                    contacts = rows.map(function (row) {
                        var name = "";
                        var number = "";
                        var email = "";
                        if ((0, lodash_2.has)(row, "nome") || (0, lodash_2.has)(row, "Nome") || (0, lodash_2.has)(row, "name")) {
                            name = row["nome"] || row["Nome"] || row["name"];
                        }
                        if ((0, lodash_2.has)(row, "numero") ||
                            (0, lodash_2.has)(row, "número") ||
                            (0, lodash_2.has)(row, "Numero") ||
                            (0, lodash_2.has)(row, "Número") ||
                            (0, lodash_2.has)(row, "number")) {
                            number = row["numero"] || row["número"] || row["Numero"] || row["Número"] || row["number"];
                            number = "".concat(number).replace(/\D/g, "");
                        }
                        if ((0, lodash_2.has)(row, "email") ||
                            (0, lodash_2.has)(row, "e-mail") ||
                            (0, lodash_2.has)(row, "Email") ||
                            (0, lodash_2.has)(row, "E-mail")) {
                            email = row["email"] || row["e-mail"] || row["Email"] || row["E-mail"];
                        }
                        return { name: name, number: number, email: email, contactListId: contactListId, companyId: companyId };
                    });
                    contactList = [];
                    _i = 0, contacts_1 = contacts;
                    _c.label = 1;
                case 1:
                    if (!(_i < contacts_1.length)) return [3 /*break*/, 4];
                    contact = contacts_1[_i];
                    return [4 /*yield*/, ContactListItem_1["default"].findOrCreate({
                            where: {
                                number: "".concat(contact.number),
                                contactListId: contact.contactListId,
                                companyId: contact.companyId
                            },
                            defaults: contact
                        })];
                case 2:
                    _a = _c.sent(), newContact = _a[0], created = _a[1];
                    if (created) {
                        contactList.push(newContact);
                    }
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!contactList) return [3 /*break*/, 11];
                    _b = 0, contactList_1 = contactList;
                    _c.label = 5;
                case 5:
                    if (!(_b < contactList_1.length)) return [3 /*break*/, 11];
                    newContact = contactList_1[_b];
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 9, , 10]);
                    return [4 /*yield*/, (0, CheckNumber_1["default"])(newContact.number, companyId)];
                case 7:
                    response = _c.sent();
                    newContact.isWhatsappValid = response ? true : false;
                    number = response;
                    newContact.number = number;
                    return [4 /*yield*/, newContact.save()];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_1 = _c.sent();
                    console.log(e_1);
                    logger_1["default"].error("N\u00FAmero de contato inv\u00E1lido: ".concat(newContact.number));
                    return [3 /*break*/, 10];
                case 10:
                    _b++;
                    return [3 /*break*/, 5];
                case 11: return [2 /*return*/, contactList];
            }
        });
    });
}
exports.ImportContacts = ImportContacts;
