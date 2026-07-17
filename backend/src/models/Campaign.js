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
var CampaignShipping_1 = __importDefault(require("./CampaignShipping"));
var Company_1 = __importDefault(require("./Company"));
var ContactList_1 = __importDefault(require("./ContactList"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var User_1 = __importDefault(require("./User"));
var Queue_1 = __importDefault(require("./Queue"));
var Campaign = /** @class */ (function (_super) {
    __extends(Campaign, _super);
    function Campaign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Campaign.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "message1");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "message2");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "message3");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "message4");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "message5");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "confirmationMessage1");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "confirmationMessage2");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "confirmationMessage3");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "confirmationMessage4");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "confirmationMessage5");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "INATIVA" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "status");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Campaign.prototype, "confirmation");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Campaign.prototype, "mediaPath");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Campaign.prototype, "mediaName");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Campaign.prototype, "scheduledAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Campaign.prototype, "completedAt");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Campaign.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Campaign.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Campaign.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return ContactList_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "contactListId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return ContactList_1["default"]; }),
        __metadata("design:type", ContactList_1["default"])
    ], Campaign.prototype, "contactList");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "tagListId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], Campaign.prototype, "whatsapp");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CampaignShipping_1["default"]; }),
        __metadata("design:type", Array)
    ], Campaign.prototype, "shipping");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], Campaign.prototype, "user");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Campaign.prototype, "queue");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "closed" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "statusTicket");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "disabled" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "openTicket");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "whatsapp" }),
        __metadata("design:type", String)
    ], Campaign.prototype, "channel");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Campaign.prototype, "subject");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Campaign.prototype, "emailAccountId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Campaign.prototype, "templateName");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Campaign.prototype, "templateLanguage");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB }),
        __metadata("design:type", Object)
    ], Campaign.prototype, "templateParams");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB }),
        __metadata("design:type", Array)
    ], Campaign.prototype, "templateData");
    Campaign = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: "Campaigns" })
    ], Campaign);
    return Campaign;
}(sequelize_typescript_1.Model));
exports["default"] = Campaign;
