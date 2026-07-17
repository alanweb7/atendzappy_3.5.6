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
var UserSchedule_1 = __importDefault(require("./UserSchedule"));
var Servico_1 = __importDefault(require("./Servico"));
var CrmClient_1 = __importDefault(require("./CrmClient"));
var CrmLead_1 = __importDefault(require("./CrmLead"));
var Contact_1 = __importDefault(require("./Contact"));
var Appointment = /** @class */ (function (_super) {
    __extends(Appointment, _super);
    function Appointment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Appointment.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(200)),
        __metadata("design:type", String)
    ], Appointment.prototype, "title");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Appointment.prototype, "description");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "start_datetime", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], Appointment.prototype, "startDatetime");
    __decorate([
        (0, sequelize_typescript_1.Default)(60),
        (0, sequelize_typescript_1.Column)({ field: "duration_minutes" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "durationMinutes");
    __decorate([
        (0, sequelize_typescript_1.Default)("scheduled"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
        __metadata("design:type", String)
    ], Appointment.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "google_event_id", allowNull: true }),
        __metadata("design:type", String)
    ], Appointment.prototype, "googleEventId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return UserSchedule_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "schedule_id" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "scheduleId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return UserSchedule_1["default"]; }),
        __metadata("design:type", UserSchedule_1["default"])
    ], Appointment.prototype, "schedule");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Servico_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "service_id" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "serviceId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Servico_1["default"]; }),
        __metadata("design:type", Servico_1["default"])
    ], Appointment.prototype, "service");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmClient_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "client_id" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "clientId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmClient_1["default"]; }),
        __metadata("design:type", CrmClient_1["default"])
    ], Appointment.prototype, "client");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "contact_id" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }),
        __metadata("design:type", Contact_1["default"])
    ], Appointment.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmLead_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "lead_id" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "leadId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmLead_1["default"]; }),
        __metadata("design:type", CrmLead_1["default"])
    ], Appointment.prototype, "lead");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id" }),
        __metadata("design:type", Number)
    ], Appointment.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Appointment.prototype, "company");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], Appointment.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
        __metadata("design:type", Date)
    ], Appointment.prototype, "updatedAt");
    Appointment = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: "appointments" })
    ], Appointment);
    return Appointment;
}(sequelize_typescript_1.Model));
exports["default"] = Appointment;
