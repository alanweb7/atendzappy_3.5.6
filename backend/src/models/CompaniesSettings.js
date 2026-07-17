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
/**
 * @TercioSantos-0 |
 * model/CompaniesSettings |
 * @descrição:modelo para tratar as configurações das empresas
 */
var sequelize_typescript_1 = require("sequelize-typescript");
var Company_1 = __importDefault(require("./Company"));
var CompaniesSettings = /** @class */ (function (_super) {
    __extends(CompaniesSettings, _super);
    function CompaniesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CompaniesSettings.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CompaniesSettings.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], CompaniesSettings.prototype, "company");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "hoursCloseTicketsAuto");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "chatBotType");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "acceptCallWhatsapp");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "userRandom");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendGreetingMessageOneQueues");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendSignMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendFarewellWaitingTicket");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "userRating");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendGreetingAccepted");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "CheckMsgIsGroup");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendQueuePosition");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "scheduleType");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "acceptAudioMessageContact");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendMsgTransfTicket");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "enableLGPD");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "requiredTag");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "lgpdDeleteMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "lgpdHideNumber");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "lgpdConsent");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "lgpdLink");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "lgpdMessage");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], CompaniesSettings.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], CompaniesSettings.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], CompaniesSettings.prototype, "DirectTicketsToWallets");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], CompaniesSettings.prototype, "closeTicketOnTransfer");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "transferMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "greetingAcceptedMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "AcceptCallWhatsappMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "sendQueuePositionMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], CompaniesSettings.prototype, "showNotificationPending");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "notificameHub");
    __decorate([
        (0, sequelize_typescript_1.Default)("disabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "autoSaveContacts");
    __decorate([
        (0, sequelize_typescript_1.Default)(7),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CompaniesSettings.prototype, "autoSaveContactsScore");
    __decorate([
        (0, sequelize_typescript_1.Default)("high_potential"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], CompaniesSettings.prototype, "autoSaveContactsReason");
    CompaniesSettings = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: "CompaniesSettings" })
    ], CompaniesSettings);
    return CompaniesSettings;
}(sequelize_typescript_1.Model));
exports["default"] = CompaniesSettings;
