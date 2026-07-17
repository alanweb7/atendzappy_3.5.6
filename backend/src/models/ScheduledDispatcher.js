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
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var ScheduledDispatchLog_1 = __importDefault(require("./ScheduledDispatchLog"));
var ScheduledDispatcher = /** @class */ (function (_super) {
    __extends(ScheduledDispatcher, _super);
    function ScheduledDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
        __metadata("design:type", Number)
    ], ScheduledDispatcher.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatcher.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], ScheduledDispatcher.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], ScheduledDispatcher.prototype, "title");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "message_template", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], ScheduledDispatcher.prototype, "messageTemplate");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "event_type", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], ScheduledDispatcher.prototype, "eventType");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "whatsapp_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatcher.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], ScheduledDispatcher.prototype, "whatsapp");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "start_time", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], ScheduledDispatcher.prototype, "startTime");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "send_interval_seconds", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatcher.prototype, "sendIntervalSeconds");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "days_before_due", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatcher.prototype, "daysBeforeDue");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "days_after_due", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatcher.prototype, "daysAfterDue");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
        __metadata("design:type", Boolean)
    ], ScheduledDispatcher.prototype, "active");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ScheduledDispatchLog_1["default"]; }),
        __metadata("design:type", Array)
    ], ScheduledDispatcher.prototype, "logs");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], ScheduledDispatcher.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], ScheduledDispatcher.prototype, "updatedAt");
    ScheduledDispatcher = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "scheduled_dispatchers"
        })
    ], ScheduledDispatcher);
    return ScheduledDispatcher;
}(sequelize_typescript_1.Model));
exports["default"] = ScheduledDispatcher;
