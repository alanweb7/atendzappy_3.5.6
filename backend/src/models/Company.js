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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var Contact_1 = __importDefault(require("./Contact"));
var Message_1 = __importDefault(require("./Message"));
var Plan_1 = __importDefault(require("./Plan"));
var Queue_1 = __importDefault(require("./Queue"));
var Setting_1 = __importDefault(require("./Setting"));
var Ticket_1 = __importDefault(require("./Ticket"));
var TicketTraking_1 = __importDefault(require("./TicketTraking"));
var User_1 = __importDefault(require("./User"));
var UserRating_1 = __importDefault(require("./UserRating"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var CompaniesSettings_1 = __importDefault(require("./CompaniesSettings"));
var Invoices_1 = __importDefault(require("./Invoices"));
var CompanyPaymentSetting_1 = __importDefault(require("./CompanyPaymentSetting"));
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Company.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "phone");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "email");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Company.prototype, "document");
    __decorate([
        (0, sequelize_typescript_1.Default)("pf"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Company.prototype, "type");
    __decorate([
        (0, sequelize_typescript_1.Default)("outros"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Company.prototype, "segment");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Company.prototype, "paymentMethod");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Company.prototype, "lastLogin");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Company.prototype, "status");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "dueDate");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "recurrence");
    __decorate([
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.JSONB
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "schedules");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Plan_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Company.prototype, "planId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Plan_1["default"]; }),
        __metadata("design:type", Plan_1["default"])
    ], Company.prototype, "plan");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Company.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Company.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "folderSize");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "numberFileFolder");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Company.prototype, "updatedAtFolder");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Company.prototype, "affiliateId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Company.prototype, "affiliateLinkId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Company.prototype, "couponId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Company.prototype, "referredBy");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return User_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "users");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return UserRating_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "userRatings");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Queue_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "queues");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Whatsapp_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "whatsapps");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Message_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "messages");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Contact_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "contacts");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Setting_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "settings");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CompaniesSettings_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", CompaniesSettings_1["default"])
    ], Company.prototype, "companieSettings");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Ticket_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "tickets");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return TicketTraking_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "ticketTrankins");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Invoices_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "invoices");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CompanyPaymentSetting_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "paymentSettings");
    Company = __decorate([
        sequelize_typescript_1.Table
    ], Company);
    return Company;
}(sequelize_typescript_1.Model));
exports["default"] = Company;
