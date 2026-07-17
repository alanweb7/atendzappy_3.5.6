"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Sentry = __importStar(require("@sentry/node"));
var GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
var wbot_1 = require("../../libs/wbot");
var Contact_1 = __importDefault(require("../../models/Contact"));
var logger_1 = __importDefault(require("../../utils/logger"));
var ShowBaileysService_1 = __importDefault(require("../BaileysServices/ShowBaileysService"));
var CreateContactService_1 = __importDefault(require("../ContactServices/CreateContactService"));
var lodash_1 = require("lodash");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var ImportContactsService = function (companyId, whatsappId) { return __awaiter(void 0, void 0, void 0, function () {
    var defaultWhatsapp, wbot, phoneContacts, baileysData, contactsData, contactsString, publicFolder_1, beforeFilePath, err_1, publicFolder, afterFilePath, phoneContactsList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(whatsappId, companyId)];
            case 1:
                defaultWhatsapp = _a.sent();
                wbot = (0, wbot_1.getWbot)(defaultWhatsapp.id);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                logger_1["default"].info("\uD83D\uDD04 Buscando contatos do WhatsApp ".concat(wbot.id, "..."));
                return [4 /*yield*/, (0, ShowBaileysService_1["default"])(wbot.id)];
            case 3:
                baileysData = _a.sent();
                if (!baileysData.contacts) {
                    logger_1["default"].warn("No contacts found in Baileys data for whatsapp ".concat(wbot.id));
                    logger_1["default"].error('❌ Nenhum contato encontrado!');
                    logger_1["default"].error('💡 Os contatos são sincronizados automaticamente quando você conecta o WhatsApp.');
                    logger_1["default"].error('💡 Se acabou de conectar, aguarde alguns minutos e tente novamente.');
                    return [2 /*return*/];
                }
                contactsData = baileysData.contacts;
                // Se for string, fazer parse
                if (typeof contactsData === 'string') {
                    contactsString = contactsData.trim();
                    if (contactsString === '' || contactsString === 'null' || contactsString === 'undefined') {
                        logger_1["default"].warn("Contacts field is empty string for whatsapp ".concat(wbot.id));
                        logger_1["default"].error('❌ Campo de contatos está vazio!');
                        return [2 /*return*/];
                    }
                    try {
                        phoneContacts = JSON.parse(contactsString);
                    }
                    catch (parseError) {
                        logger_1["default"].error("Failed to parse contacts JSON for whatsapp ".concat(wbot.id, ": ").concat(parseError));
                        return [2 /*return*/];
                    }
                }
                else {
                    // Se já for objeto/array (JSONB), usar diretamente
                    phoneContacts = contactsData;
                }
                // Validar se é array
                if (!Array.isArray(phoneContacts)) {
                    logger_1["default"].warn("Contacts is not an array for whatsapp ".concat(wbot.id));
                    logger_1["default"].warn("Contacts type: ".concat(typeof phoneContacts));
                    return [2 /*return*/];
                }
                if (phoneContacts.length === 0) {
                    logger_1["default"].warn("No contacts in array for whatsapp ".concat(wbot.id));
                    logger_1["default"].error('❌ Nenhum contato encontrado no array!');
                    return [2 /*return*/];
                }
                logger_1["default"].info("\uD83D\uDCCB ".concat(phoneContacts.length, " contatos encontrados no Baileys"));
                publicFolder_1 = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                beforeFilePath = path_1["default"].join(publicFolder_1, "company".concat(companyId), 'contatos_antes.txt');
                fs_1["default"].writeFile(beforeFilePath, JSON.stringify(phoneContacts, null, 2), function (err) {
                    if (err) {
                        logger_1["default"].error("Failed to write contacts to file: ".concat(err));
                        throw err;
                    }
                    // console.log('O arquivo contatos_antes.txt foi criado!');
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                Sentry.captureException(err_1);
                logger_1["default"].error("Could not get whatsapp contacts from phone. Err: ".concat(err_1));
                // **CORREÇÃO: Retornar early se falhar ao buscar contatos**
                return [2 /*return*/];
            case 5:
                // **CORREÇÃO: Verificar se phoneContacts existe antes de usar**
                if (!phoneContacts) {
                    logger_1["default"].warn('phoneContacts is undefined, skipping import');
                    return [2 /*return*/];
                }
                publicFolder = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
                afterFilePath = path_1["default"].join(publicFolder, "company".concat(companyId), 'contatos_depois.txt');
                fs_1["default"].writeFile(afterFilePath, JSON.stringify(phoneContacts, null, 2), function (err) {
                    if (err) {
                        logger_1["default"].error("Failed to write contacts to file: ".concat(err));
                        throw err;
                    }
                    // console.log('O arquivo contatos_depois.txt foi criado!');
                });
                phoneContactsList = (0, lodash_1.isString)(phoneContacts)
                    ? JSON.parse(phoneContacts)
                    : phoneContacts;
                if ((0, lodash_1.isArray)(phoneContactsList)) {
                    phoneContactsList.forEach(function (_a) {
                        var id = _a.id, name = _a.name, notify = _a.notify;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var number, existingContact, error_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (id === "status@broadcast" || id.includes("g.us"))
                                            return [2 /*return*/];
                                        number = id.replace(/\D/g, "");
                                        return [4 /*yield*/, Contact_1["default"].findOne({
                                                where: { number: number, companyId: companyId }
                                            })];
                                    case 1:
                                        existingContact = _b.sent();
                                        if (!existingContact) return [3 /*break*/, 3];
                                        // Atualiza o nome do contato existente
                                        existingContact.name = name || notify;
                                        return [4 /*yield*/, existingContact.save()];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 6];
                                    case 3:
                                        _b.trys.push([3, 5, , 6]);
                                        return [4 /*yield*/, (0, CreateContactService_1["default"])({
                                                number: number,
                                                name: name || notify,
                                                companyId: companyId
                                            })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        error_1 = _b.sent();
                                        Sentry.captureException(error_1);
                                        logger_1["default"].warn("Could not get whatsapp contacts from phone. Err: ".concat(error_1));
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = ImportContactsService;
