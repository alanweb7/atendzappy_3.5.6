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
var Ticket_1 = __importDefault(require("./Ticket"));
var Company_1 = __importDefault(require("./Company"));
var FollowUp = /** @class */ (function (_super) {
    __extends(FollowUp, _super);
    function FollowUp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FollowUp.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FollowUp.prototype, "ticketId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FollowUp.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], FollowUp.prototype, "flowNodeId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], FollowUp.prototype, "actionType");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], FollowUp.prototype, "actionPayload");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], FollowUp.prototype, "scheduledAt");
    __decorate([
        (0, sequelize_typescript_1.Default)('pending'),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM('pending', 'completed', 'failed', 'cancelled')),
        __metadata("design:type", String)
    ], FollowUp.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], FollowUp.prototype, "executedAt");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], FollowUp.prototype, "error");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], FollowUp.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], FollowUp.prototype, "company");
    FollowUp = __decorate([
        sequelize_typescript_1.Table
    ], FollowUp);
    return FollowUp;
}(sequelize_typescript_1.Model));
exports["default"] = FollowUp;
