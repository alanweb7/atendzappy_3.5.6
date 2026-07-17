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
var ScheduledDispatcher_1 = __importDefault(require("./ScheduledDispatcher"));
var Contact_1 = __importDefault(require("./Contact"));
var Ticket_1 = __importDefault(require("./Ticket"));
var Company_1 = __importDefault(require("./Company"));
var ScheduledDispatchLog = /** @class */ (function (_super) {
    __extends(ScheduledDispatchLog, _super);
    function ScheduledDispatchLog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
        __metadata("design:type", Number)
    ], ScheduledDispatchLog.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return ScheduledDispatcher_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "dispatcher_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatchLog.prototype, "dispatcherId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return ScheduledDispatcher_1["default"]; }),
        __metadata("design:type", ScheduledDispatcher_1["default"])
    ], ScheduledDispatchLog.prototype, "dispatcher");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "contact_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatchLog.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }),
        __metadata("design:type", Contact_1["default"])
    ], ScheduledDispatchLog.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "ticket_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatchLog.prototype, "ticketId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], ScheduledDispatchLog.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], ScheduledDispatchLog.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], ScheduledDispatchLog.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], ScheduledDispatchLog.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "error_message", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], ScheduledDispatchLog.prototype, "errorMessage");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "sent_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], ScheduledDispatchLog.prototype, "sentAt");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], ScheduledDispatchLog.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], ScheduledDispatchLog.prototype, "updatedAt");
    ScheduledDispatchLog = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "scheduled_dispatch_logs"
        })
    ], ScheduledDispatchLog);
    return ScheduledDispatchLog;
}(sequelize_typescript_1.Model));
exports["default"] = ScheduledDispatchLog;
