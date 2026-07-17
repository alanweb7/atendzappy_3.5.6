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
var Company_1 = __importDefault(require("./Company"));
var User_1 = __importDefault(require("./User"));
var Ticket_1 = __importDefault(require("./Ticket"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var Message_1 = __importDefault(require("./Message"));
var Queue_1 = __importDefault(require("./Queue"));
var TicketTraking = /** @class */ (function (_super) {
    __extends(TicketTraking, _super);
    function TicketTraking() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTraking.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTraking.prototype, "ticketId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], TicketTraking.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTraking.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], TicketTraking.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTraking.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], TicketTraking.prototype, "whatsapp");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTraking.prototype, "userId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], TicketTraking.prototype, "rated");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], TicketTraking.prototype, "user");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "startedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "queuedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "closedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "finishedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "ratingAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], TicketTraking.prototype, "chatbotAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTraking.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], TicketTraking.prototype, "queue");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Message_1["default"]; }),
        __metadata("design:type", Array)
    ], TicketTraking.prototype, "message");
    TicketTraking = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "TicketTraking"
        })
    ], TicketTraking);
    return TicketTraking;
}(sequelize_typescript_1.Model));
exports["default"] = TicketTraking;
