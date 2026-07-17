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
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var ScheduledMessagesEnvio = /** @class */ (function (_super) {
    __extends(ScheduledMessagesEnvio, _super);
    function ScheduledMessagesEnvio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ScheduledMessagesEnvio.prototype, "id");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], ScheduledMessagesEnvio.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], ScheduledMessagesEnvio.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessagesEnvio.prototype, "mediaPath");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessagesEnvio.prototype, "mediaName");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], ScheduledMessagesEnvio.prototype, "mensagem");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ScheduledMessagesEnvio.prototype, "companyId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], ScheduledMessagesEnvio.prototype, "data_envio");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ScheduledMessagesEnvio.prototype, "scheduledmessages");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessagesEnvio.prototype, "key");
    ScheduledMessagesEnvio = __decorate([
        sequelize_typescript_1.Table
    ], ScheduledMessagesEnvio);
    return ScheduledMessagesEnvio;
}(sequelize_typescript_1.Model));
exports["default"] = ScheduledMessagesEnvio;
