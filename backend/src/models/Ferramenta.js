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
// @ts-nocheck
var sequelize_typescript_1 = require("sequelize-typescript");
var Company_1 = __importDefault(require("./Company"));
var Ferramenta = /** @class */ (function (_super) {
    __extends(Ferramenta, _super);
    function Ferramenta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ferramenta.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
        __metadata("design:type", String)
    ], Ferramenta.prototype, "nome");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Ferramenta.prototype, "descricao");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Ferramenta.prototype, "url");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(10)),
        __metadata("design:type", String)
    ], Ferramenta.prototype, "metodo");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], Ferramenta.prototype, "headers");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], Ferramenta.prototype, "body");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], Ferramenta.prototype, "query_params");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], Ferramenta.prototype, "placeholders");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), defaultValue: "ativo" }),
        __metadata("design:type", String)
    ], Ferramenta.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ferramenta.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Ferramenta.prototype, "company");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ferramenta.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ferramenta.prototype, "updatedAt");
    Ferramenta = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "Ferramentas"
        })
    ], Ferramenta);
    return Ferramenta;
}(sequelize_typescript_1.Model));
exports["default"] = Ferramenta;
