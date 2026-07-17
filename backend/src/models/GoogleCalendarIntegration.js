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
var GoogleCalendarIntegration = /** @class */ (function (_super) {
    __extends(GoogleCalendarIntegration, _super);
    function GoogleCalendarIntegration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], GoogleCalendarIntegration.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id" }),
        __metadata("design:type", Number)
    ], GoogleCalendarIntegration.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "user_id" }),
        __metadata("design:type", Number)
    ], GoogleCalendarIntegration.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], GoogleCalendarIntegration.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], GoogleCalendarIntegration.prototype, "user");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], GoogleCalendarIntegration.prototype, "googleUserId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], GoogleCalendarIntegration.prototype, "email");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], GoogleCalendarIntegration.prototype, "accessToken");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], GoogleCalendarIntegration.prototype, "refreshToken");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], GoogleCalendarIntegration.prototype, "expiryDate");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], GoogleCalendarIntegration.prototype, "calendarId");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], GoogleCalendarIntegration.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], GoogleCalendarIntegration.prototype, "updatedAt");
    GoogleCalendarIntegration = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "UserGoogleCalendarIntegrations",
            name: {
                singular: "UserGoogleCalendarIntegration",
                plural: "UserGoogleCalendarIntegrations"
            }
        })
    ], GoogleCalendarIntegration);
    return GoogleCalendarIntegration;
}(sequelize_typescript_1.Model));
exports["default"] = GoogleCalendarIntegration;
