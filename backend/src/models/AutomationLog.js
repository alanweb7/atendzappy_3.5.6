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
var sequelize_1 = require("sequelize");
var Contact_1 = __importDefault(require("./Contact"));
var Ticket_1 = __importDefault(require("./Ticket"));
var AutomationLog = /** @class */ (function (_super) {
    __extends(AutomationLog, _super);
    function AutomationLog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AutomationLog.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return require("./Automation")["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AutomationLog.prototype, "automationId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return require("./Automation")["default"]; }),
        __metadata("design:type", Object)
    ], AutomationLog.prototype, "automation");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AutomationLog.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }),
        __metadata("design:type", Contact_1["default"])
    ], AutomationLog.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AutomationLog.prototype, "ticketId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], AutomationLog.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.Default)("pending"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], AutomationLog.prototype, "status");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], AutomationLog.prototype, "executedAt");
    __decorate([
        (0, sequelize_typescript_1.Default)({}),
        (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.JSONB),
        __metadata("design:type", Object)
    ], AutomationLog.prototype, "result");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.TEXT),
        __metadata("design:type", String)
    ], AutomationLog.prototype, "error");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], AutomationLog.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], AutomationLog.prototype, "updatedAt");
    AutomationLog = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: "AutomationLogs" })
    ], AutomationLog);
    return AutomationLog;
}(sequelize_typescript_1.Model));
exports["default"] = AutomationLog;
