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
var Company_1 = __importDefault(require("./Company"));
var User_1 = __importDefault(require("./User"));
var Contact_1 = __importDefault(require("./Contact"));
var Ticket_1 = __importDefault(require("./Ticket"));
var CrmClientContact_1 = __importDefault(require("./CrmClientContact"));
var CrmClientOwner_1 = __importDefault(require("./CrmClientOwner"));
var CrmLead_1 = __importDefault(require("./CrmLead"));
var CrmClient = /** @class */ (function (_super) {
    __extends(CrmClient, _super);
    function CrmClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrmClient.syncToLead = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var syncClientToLead, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/CrmClientService/helpers/syncClientToLead")); })];
                    case 1:
                        syncClientToLead = (_a.sent())["default"];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, syncClientToLead({
                                client: instance,
                                companyId: instance.companyId
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("[CrmClient Model] Error syncing to Lead:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CrmClient.handleCascadeDelete = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var handleClientDeleteCascade, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../services/CrmClientService/handleClientDeleteCascade")); })];
                    case 1:
                        handleClientDeleteCascade = (_a.sent())["default"];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, handleClientDeleteCascade({
                                client: instance,
                                companyId: instance.companyId
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error("[CrmClient Model] Error handling cascade delete:", error_2);
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
    ], CrmClient.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id" }),
        __metadata("design:type", Number)
    ], CrmClient.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], CrmClient.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.Default)("pf"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "type");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "company_name", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], CrmClient.prototype, "companyName");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "document");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "birth_date", type: sequelize_typescript_1.DataType.DATEONLY }),
        __metadata("design:type", Date)
    ], CrmClient.prototype, "birthDate");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "email");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "phone");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "zip_code", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], CrmClient.prototype, "zipCode");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "address");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "number");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "complement");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "neighborhood");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "city");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "state");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "asaas_customer_id", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], CrmClient.prototype, "asaasCustomerId");
    __decorate([
        (0, sequelize_typescript_1.Default)("active"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CrmClient.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "client_since", type: sequelize_typescript_1.DataType.DATEONLY }),
        __metadata("design:type", Date)
    ], CrmClient.prototype, "clientSince");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "owner_user_id" }),
        __metadata("design:type", Number)
    ], CrmClient.prototype, "ownerUserId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }, "ownerUserId"),
        __metadata("design:type", User_1["default"])
    ], CrmClient.prototype, "owner");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], CrmClient.prototype, "notes");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "contact_id" }),
        __metadata("design:type", Number)
    ], CrmClient.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }),
        __metadata("design:type", Contact_1["default"])
    ], CrmClient.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "primary_ticket_id" }),
        __metadata("design:type", Number)
    ], CrmClient.prototype, "primaryTicketId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }, "primaryTicketId"),
        __metadata("design:type", Ticket_1["default"])
    ], CrmClient.prototype, "primaryTicket");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Array)
    ], CrmClient.prototype, "tickets");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CrmLead_1["default"]; }, "convertedClientId"),
        __metadata("design:type", Array)
    ], CrmClient.prototype, "leads");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CrmClientContact_1["default"]; }),
        __metadata("design:type", Array)
    ], CrmClient.prototype, "clientContacts");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Contact_1["default"]; }, function () { return CrmClientContact_1["default"]; }, "clientId", "contactId"),
        __metadata("design:type", Array)
    ], CrmClient.prototype, "contacts");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CrmClientOwner_1["default"]; }),
        __metadata("design:type", Array)
    ], CrmClient.prototype, "clientOwners");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return User_1["default"]; }, function () { return CrmClientOwner_1["default"]; }, "clientId", "userId"),
        __metadata("design:type", Array)
    ], CrmClient.prototype, "owners");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], CrmClient.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
        __metadata("design:type", Date)
    ], CrmClient.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.AfterUpdate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [CrmClient]),
        __metadata("design:returntype", Promise)
    ], CrmClient, "syncToLead");
    __decorate([
        sequelize_typescript_1.BeforeDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [CrmClient]),
        __metadata("design:returntype", Promise)
    ], CrmClient, "handleCascadeDelete");
    CrmClient = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "crm_clients"
        })
    ], CrmClient);
    return CrmClient;
}(sequelize_typescript_1.Model));
exports["default"] = CrmClient;
