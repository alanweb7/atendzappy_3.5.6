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
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var Message_1 = __importDefault(require("../../models/Message"));
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var ContactCustomField_1 = __importDefault(require("../../models/ContactCustomField"));
var ContactWallet_1 = __importDefault(require("../../models/ContactWallet"));
var CrmLead_1 = __importDefault(require("../../models/CrmLead"));
var CrmClientContact_1 = __importDefault(require("../../models/CrmClientContact"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var database_1 = __importDefault(require("../../database"));
var DeleteContactService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var contact, transaction, tickets, _i, tickets_1, ticket, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Contact_1["default"].findOne({
                    where: { id: id }
                })];
            case 1:
                contact = _a.sent();
                if (!contact) {
                    throw new AppError_1["default"]("ERR_NO_CONTACT_FOUND", 404);
                }
                return [4 /*yield*/, database_1["default"].transaction()];
            case 2:
                transaction = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 17, , 19]);
                return [4 /*yield*/, Ticket_1["default"].findAll({
                        where: { contactId: contact.id },
                        transaction: transaction
                    })];
            case 4:
                tickets = _a.sent();
                _i = 0, tickets_1 = tickets;
                _a.label = 5;
            case 5:
                if (!(_i < tickets_1.length)) return [3 /*break*/, 8];
                ticket = tickets_1[_i];
                return [4 /*yield*/, Message_1["default"].destroy({
                        where: { ticketId: ticket.id },
                        transaction: transaction
                    })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: 
            // 2. Apagar tickets do contato
            return [4 /*yield*/, Ticket_1["default"].destroy({
                    where: { contactId: contact.id },
                    transaction: transaction
                })];
            case 9:
                // 2. Apagar tickets do contato
                _a.sent();
                // 3. Apagar tags do contato
                return [4 /*yield*/, ContactTag_1["default"].destroy({
                        where: { contactId: contact.id },
                        transaction: transaction
                    })];
            case 10:
                // 3. Apagar tags do contato
                _a.sent();
                // 4. Apagar campos customizados do contato
                return [4 /*yield*/, ContactCustomField_1["default"].destroy({
                        where: { contactId: contact.id },
                        transaction: transaction
                    })];
            case 11:
                // 4. Apagar campos customizados do contato
                _a.sent();
                // 5. Apagar wallets do contato
                return [4 /*yield*/, ContactWallet_1["default"].destroy({
                        where: { contactId: contact.id },
                        transaction: transaction
                    })];
            case 12:
                // 5. Apagar wallets do contato
                _a.sent();
                // 6. Apagar leads vinculados ao contato
                return [4 /*yield*/, CrmLead_1["default"].destroy({
                        where: { contactId: contact.id },
                        transaction: transaction
                    })];
            case 13:
                // 6. Apagar leads vinculados ao contato
                _a.sent();
                // 7. Apagar vínculos com clientes
                return [4 /*yield*/, CrmClientContact_1["default"].destroy({
                        where: { contactId: contact.id },
                        transaction: transaction
                    })];
            case 14:
                // 7. Apagar vínculos com clientes
                _a.sent();
                // 8. Finalmente apagar o contato
                return [4 /*yield*/, contact.destroy({ transaction: transaction })];
            case 15:
                // 8. Finalmente apagar o contato
                _a.sent();
                // Commit da transação
                return [4 /*yield*/, transaction.commit()];
            case 16:
                // Commit da transação
                _a.sent();
                return [3 /*break*/, 19];
            case 17:
                error_1 = _a.sent();
                // Rollback em caso de erro
                return [4 /*yield*/, transaction.rollback()];
            case 18:
                // Rollback em caso de erro
                _a.sent();
                console.error("Error deleting contact:", error_1);
                throw new AppError_1["default"]("ERR_DELETE_CONTACT", 500);
            case 19: return [2 /*return*/];
        }
    });
}); };
exports["default"] = DeleteContactService;
