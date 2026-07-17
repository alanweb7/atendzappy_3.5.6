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
var ProdutoCustomFieldDefinition = /** @class */ (function (_super) {
    __extends(ProdutoCustomFieldDefinition, _super);
    function ProdutoCustomFieldDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProdutoCustomFieldDefinition.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProdutoCustomFieldDefinition.prototype, "companyId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ProdutoCustomFieldDefinition.prototype, "nome");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ProdutoCustomFieldDefinition.prototype, "chave");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], ProdutoCustomFieldDefinition.prototype, "tipo");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], ProdutoCustomFieldDefinition.prototype, "opcoes");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
        __metadata("design:type", Boolean)
    ], ProdutoCustomFieldDefinition.prototype, "obrigatorio");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
        __metadata("design:type", Number)
    ], ProdutoCustomFieldDefinition.prototype, "ordem");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], ProdutoCustomFieldDefinition.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], ProdutoCustomFieldDefinition.prototype, "updatedAt");
    ProdutoCustomFieldDefinition = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "ProdutoCustomFieldDefinitions"
        })
    ], ProdutoCustomFieldDefinition);
    return ProdutoCustomFieldDefinition;
}(sequelize_typescript_1.Model));
exports["default"] = ProdutoCustomFieldDefinition;
