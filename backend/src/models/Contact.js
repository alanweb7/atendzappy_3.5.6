"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var sequelize_typescript_1 = require("sequelize-typescript");
var sequelize_typescript_2 = require("sequelize-typescript");
var ContactCustomField_1 = __importDefault(require("./ContactCustomField"));
var Ticket_1 = __importDefault(require("./Ticket"));
var Company_1 = __importDefault(require("./Company"));
var Schedule_1 = __importDefault(require("./Schedule"));
var ContactTag_1 = __importDefault(require("./ContactTag"));
var Tag_1 = __importDefault(require("./Tag"));
var ContactWallet_1 = __importDefault(require("./ContactWallet"));
var User_1 = __importDefault(require("./User"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var CrmClient_1 = __importDefault(require("./CrmClient"));
var CrmClientContact_1 = __importDefault(require("./CrmClientContact"));
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Contact.prototype, "urlPicture", {
        get: function () {
            var picture = this.getDataValue("urlPicture");
            if (!picture) {
                return null;
            }
            var frontendPlaceholder = "".concat(process.env.FRONTEND_URL, "/nopicture.png");
            // Quando o WhatsApp devolve um link direto (pps.whatsapp.net), o frontend
            // não consegue carregá-lo (403). Neste caso, usamos o placeholder padrão
            // para evitar múltiplas tentativas e travamentos no envio.
            if (/^https?:\/\//i.test(picture)) {
                return picture.includes("pps.whatsapp.net") ? frontendPlaceholder : picture;
            }
            if (picture === "nopicture.png") {
                return frontendPlaceholder;
            }
            var baseUrl = "".concat(process.env.BACKEND_URL).concat(process.env.PROXY_PORT ? ":".concat(process.env.PROXY_PORT) : "");
            return "".concat(baseUrl, "/public/company").concat(this.companyId, "/contacts/").concat(picture);
        },
        enumerable: false,
        configurable: true
    });
    // Hooks para debug do campo LID
    Contact.logBeforeCreate = function (instance) {
        console.log("[Contact Model] BeforeCreate:", {
            name: instance.name,
            number: instance.number,
            lid: instance.lid,
            remoteJid: instance.remoteJid,
            isLid: instance.isLid
        });
    };
    Contact.logAfterCreate = function (instance) {
        console.log("[Contact Model] AfterCreate - Contact created with ID:", instance.id, {
            name: instance.name,
            number: instance.number,
            lid: instance.lid,
            remoteJid: instance.remoteJid,
            isLid: instance.isLid
        });
    };
    Contact.relinkToExistingRecords = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var relinkContactToExistingRecords, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/ContactServices/relinkContactToExistingRecords")); })];
                    case 1:
                        relinkContactToExistingRecords = (_a.sent())["default"];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, relinkContactToExistingRecords({
                                contact: instance,
                                companyId: instance.companyId
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("[Contact Model] Error relinking to existing records:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Contact.logBeforeUpdate = function (instance) {
        console.log("[Contact Model] BeforeUpdate - Contact ID:", instance.id, {
            name: instance.name,
            number: instance.number,
            lid: instance.lid,
            remoteJid: instance.remoteJid,
            isLid: instance.isLid,
            changed: instance.changed()
        });
    };
    Contact.logAfterUpdate = function (instance) {
        console.log("[Contact Model] AfterUpdate - Contact ID:", instance.id, {
            name: instance.name,
            number: instance.number,
            lid: instance.lid,
            remoteJid: instance.remoteJid,
            isLid: instance.isLid
        });
    };
    Contact.syncToLead = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var syncContactToLead, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/CrmLeadService/helpers/syncContactToLead")); })];
                    case 1:
                        syncContactToLead = (_a.sent())["default"];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, syncContactToLead({
                                contact: instance,
                                companyId: instance.companyId
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error("[Contact Model] Error syncing to Lead:", error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Contact.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Unique)("contacts_company_number_unique"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "number");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Default)(""),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "email");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        (0, sequelize_typescript_1.Column)({
            get: function () {
                var val = this.getDataValue("profilePicUrl");
                return val === "no_photo" ? "" : (val || "");
            }
        }),
        __metadata("design:type", String)
    ], Contact.prototype, "profilePicUrl");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "isGroup");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "disableBot");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "acceptAudioMessage");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "active");
    __decorate([
        (0, sequelize_typescript_1.Default)("whatsapp"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "channel");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_2.DataType.JSONB),
        __metadata("design:type", Object)
    ], Contact.prototype, "files");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "cpfCnpj");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "address");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "info");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Contact.prototype, "birthday");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Contact.prototype, "anniversary");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Contact.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Contact.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Array)
    ], Contact.prototype, "tickets");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ContactCustomField_1["default"]; }),
        __metadata("design:type", Array)
    ], Contact.prototype, "extraInfo");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ContactTag_1["default"]; }),
        __metadata("design:type", Array)
    ], Contact.prototype, "contactTags");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Tag_1["default"]; }, function () { return ContactTag_1["default"]; }),
        __metadata("design:type", Array)
    ], Contact.prototype, "tags");
    __decorate([
        (0, sequelize_typescript_1.Unique)("contacts_company_number_unique"),
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Contact.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Contact.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Schedule_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Contact.prototype, "schedules");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "remoteJid");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "lid");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "isLid");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "savedToPhone");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Contact.prototype, "savedToPhoneAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "savedToPhoneReason");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Contact.prototype, "potentialScore");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "isPotential");
    __decorate([
        (0, sequelize_typescript_1.Default)("unknown"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Contact.prototype, "lidStability");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Contact.prototype, "lgpdAcceptedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Contact.prototype, "pictureUpdated");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_2.DataType.TEXT),
        __metadata("design:type", String)
    ], Contact.prototype, "aiMemory");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], Contact.prototype, "urlPicture");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return User_1["default"]; }, function () { return ContactWallet_1["default"]; }, "contactId", "walletId"),
        __metadata("design:type", Array)
    ], Contact.prototype, "wallets");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ContactWallet_1["default"]; }),
        __metadata("design:type", Array)
    ], Contact.prototype, "contactWallets");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return CrmClient_1["default"]; }, function () { return CrmClientContact_1["default"]; }, "contactId", "clientId"),
        __metadata("design:type", Array)
    ], Contact.prototype, "crmClients");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CrmClientContact_1["default"]; }),
        __metadata("design:type", Array)
    ], Contact.prototype, "clientContacts");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Contact.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], Contact.prototype, "whatsapp");
    __decorate([
        sequelize_typescript_1.BeforeCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact]),
        __metadata("design:returntype", void 0)
    ], Contact, "logBeforeCreate");
    __decorate([
        sequelize_typescript_1.AfterCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact]),
        __metadata("design:returntype", void 0)
    ], Contact, "logAfterCreate");
    __decorate([
        sequelize_typescript_1.AfterCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact]),
        __metadata("design:returntype", Promise)
    ], Contact, "relinkToExistingRecords");
    __decorate([
        sequelize_typescript_1.BeforeUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact]),
        __metadata("design:returntype", void 0)
    ], Contact, "logBeforeUpdate");
    __decorate([
        sequelize_typescript_1.AfterUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact]),
        __metadata("design:returntype", void 0)
    ], Contact, "logAfterUpdate");
    __decorate([
        sequelize_typescript_1.AfterUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact]),
        __metadata("design:returntype", Promise)
    ], Contact, "syncToLead");
    Contact = __decorate([
        sequelize_typescript_1.Table
    ], Contact);
    return Contact;
}(sequelize_typescript_1.Model));
exports["default"] = Contact;
