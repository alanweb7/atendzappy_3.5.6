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
// @ts-nocheck
var sequelize_typescript_1 = require("sequelize-typescript");
var Company_1 = __importDefault(require("./Company"));
var Contact_1 = __importDefault(require("./Contact"));
var Ticket_1 = __importDefault(require("./Ticket"));
var User_1 = __importDefault(require("./User"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var Queue_1 = __importDefault(require("./Queue"));
var Schedule = /** @class */ (function (_super) {
    __extends(Schedule, _super);
    function Schedule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Schedule.prototype, "body");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Schedule.prototype, "sendAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Schedule.prototype, "sentAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "ticketId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Schedule.prototype, "status");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Schedule.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Schedule.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }, "contactId"),
        __metadata("design:type", Contact_1["default"])
    ], Schedule.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], Schedule.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], Schedule.prototype, "user");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Schedule.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "ticketUserId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }, "ticketUserId"),
        __metadata("design:type", User_1["default"])
    ], Schedule.prototype, "ticketUser");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Schedule.prototype, "queue");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "closed" }),
        __metadata("design:type", String)
    ], Schedule.prototype, "statusTicket");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "disabled" }),
        __metadata("design:type", String)
    ], Schedule.prototype, "openTicket");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Schedule.prototype, "mediaPath");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Schedule.prototype, "mediaName");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Schedule.prototype, "googleEventId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], Schedule.prototype, "whatsapp");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "intervalo");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "valorIntervalo");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "enviarQuantasVezes");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "tipoDias");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Schedule.prototype, "contadorEnvio");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "assinar");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Array)
    ], Schedule.prototype, "tagIds");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Schedule.prototype, "mediaType");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Array)
    ], Schedule.prototype, "arrayOption");
    Schedule = __decorate([
        sequelize_typescript_1.Table
    ], Schedule);
    return Schedule;
}(sequelize_typescript_1.Model));
exports["default"] = Schedule;
