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
var Profissional = /** @class */ (function (_super) {
    __extends(Profissional, _super);
    function Profissional() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Profissional.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Profissional.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Profissional.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Profissional.prototype, "nome");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.JSONB,
            defaultValue: []
        }),
        __metadata("design:type", Array)
    ], Profissional.prototype, "servicos");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.JSONB,
            defaultValue: {}
        }),
        __metadata("design:type", Object)
    ], Profissional.prototype, "agenda");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.BOOLEAN,
            defaultValue: true
        }),
        __metadata("design:type", Boolean)
    ], Profissional.prototype, "ativo");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
            defaultValue: 0
        }),
        __metadata("design:type", Number)
    ], Profissional.prototype, "comissao");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.DECIMAL(12, 2),
            defaultValue: 0
        }),
        __metadata("design:type", Number)
    ], Profissional.prototype, "valorEmAberto");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.DECIMAL(12, 2),
            defaultValue: 0
        }),
        __metadata("design:type", Number)
    ], Profissional.prototype, "valoresRecebidos");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.DECIMAL(12, 2),
            defaultValue: 0
        }),
        __metadata("design:type", Number)
    ], Profissional.prototype, "valoresAReceber");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Profissional.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Profissional.prototype, "updatedAt");
    Profissional = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: "profissionais" })
    ], Profissional);
    return Profissional;
}(sequelize_typescript_1.Model));
exports["default"] = Profissional;
