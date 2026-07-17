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
var Contact_1 = __importDefault(require("../../models/Contact"));
var wbot_1 = require("../../libs/wbot");
var ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
var ListGroupsService = function (whatsappId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var whatsapp, wbot, groupContacts, groups, errors, _i, groupContacts_1, contact, groupJid, groupMetadata, groupData, error_1, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                return [4 /*yield*/, (0, ShowWhatsAppService_1["default"])(whatsappId, companyId)];
            case 1:
                whatsapp = _b.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("WhatsApp connection not found", 404);
                }
                wbot = (0, wbot_1.getWbot)(whatsappId);
                if (!wbot) {
                    throw new AppError_1["default"]("WhatsApp session not found", 404);
                }
                console.log("[ListGroups] Buscando grupos para WhatsApp ".concat(whatsappId));
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            isGroup: true
                        },
                        order: [['name', 'ASC']]
                    })];
            case 2:
                groupContacts = _b.sent();
                console.log("[ListGroups] Encontrados ".concat(groupContacts.length, " contatos de grupos no banco"));
                groups = [];
                errors = [];
                _i = 0, groupContacts_1 = groupContacts;
                _b.label = 3;
            case 3:
                if (!(_i < groupContacts_1.length)) return [3 /*break*/, 10];
                contact = groupContacts_1[_i];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 8, , 9]);
                groupJid = "".concat(contact.number, "@g.us");
                console.log("[ListGroups] Obtendo metadados para: ".concat(groupJid));
                return [4 /*yield*/, wbot.groupMetadata(groupJid)];
            case 5:
                groupMetadata = _b.sent();
                groupData = {
                    id: groupJid,
                    name: groupMetadata.subject || contact.name,
                    subject: groupMetadata.subject || contact.name,
                    participants: ((_a = groupMetadata.participants) === null || _a === void 0 ? void 0 : _a.length) || 0,
                    desc: groupMetadata.desc,
                    owner: groupMetadata.owner,
                    creation: groupMetadata.creation
                };
                groups.push(groupData);
                console.log("[ListGroups] Grupo adicionado: ".concat(groupData.name, " (").concat(groupData.participants, " participantes)"));
                if (!(contact.name !== groupData.name)) return [3 /*break*/, 7];
                return [4 /*yield*/, contact.update({ name: groupData.name })];
            case 6:
                _b.sent();
                console.log("[ListGroups] Nome do contato atualizado: ".concat(groupData.name));
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _b.sent();
                console.error("[ListGroups] Erro ao obter metadados do grupo ".concat(contact.name, ":"), error_1);
                errors.push("Grupo ".concat(contact.name, ": ").concat(error_1.message));
                // Mesmo com erro, adicionar grupo com dados básicos do banco
                groups.push({
                    id: "".concat(contact.number, "@g.us"),
                    name: contact.name,
                    subject: contact.name,
                    participants: 0,
                    desc: undefined,
                    owner: undefined,
                    creation: undefined
                });
                return [3 /*break*/, 9];
            case 9:
                _i++;
                return [3 /*break*/, 3];
            case 10:
                console.log("[ListGroups] Total de grupos encontrados: ".concat(groups.length));
                if (errors.length > 0) {
                    console.log("[ListGroups] Erros encontrados: ".concat(errors.length));
                    errors.forEach(function (error) { return console.log("[ListGroups] - ".concat(error)); });
                }
                return [2 /*return*/, groups];
            case 11:
                error_2 = _b.sent();
                console.error("[ListGroups] Erro ao listar grupos:", error_2);
                throw new AppError_1["default"]("Erro ao listar grupos: ".concat(error_2.message), 500);
            case 12: return [2 /*return*/];
        }
    });
}); };
exports["default"] = ListGroupsService;
