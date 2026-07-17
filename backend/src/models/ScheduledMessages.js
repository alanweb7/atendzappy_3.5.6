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
var ScheduledMessages = /** @class */ (function (_super) {
    __extends(ScheduledMessages, _super);
    function ScheduledMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ScheduledMessages.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], ScheduledMessages.prototype, "data_mensagem_programada");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "id_conexao");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "intervalo");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "valor_intervalo");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "mensagem");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "tipo_dias_envio");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], ScheduledMessages.prototype, "mostrar_usuario_mensagem");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], ScheduledMessages.prototype, "criar_ticket");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB }),
        __metadata("design:type", Array)
    ], ScheduledMessages.prototype, "contatos");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB }),
        __metadata("design:type", Array)
    ], ScheduledMessages.prototype, "tags");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ScheduledMessages.prototype, "companyId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "nome");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], ScheduledMessages.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], ScheduledMessages.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "mediaPath");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "mediaName");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "tipo_arquivo");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "usuario_envio");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ScheduledMessages.prototype, "enviar_quantas_vezes");
    ScheduledMessages = __decorate([
        sequelize_typescript_1.Table
    ], ScheduledMessages);
    return ScheduledMessages;
}(sequelize_typescript_1.Model));
exports["default"] = ScheduledMessages;
