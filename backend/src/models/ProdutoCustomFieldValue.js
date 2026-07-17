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
var Produto_1 = __importDefault(require("./Produto"));
var ProdutoCustomFieldDefinition_1 = __importDefault(require("./ProdutoCustomFieldDefinition"));
var ProdutoCustomFieldValue = /** @class */ (function (_super) {
    __extends(ProdutoCustomFieldValue, _super);
    function ProdutoCustomFieldValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProdutoCustomFieldValue.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Produto_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProdutoCustomFieldValue.prototype, "produtoId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return ProdutoCustomFieldDefinition_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProdutoCustomFieldValue.prototype, "fieldDefinitionId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], ProdutoCustomFieldValue.prototype, "valorTexto");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(12, 2)),
        __metadata("design:type", Number)
    ], ProdutoCustomFieldValue.prototype, "valorNumero");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], ProdutoCustomFieldValue.prototype, "valorData");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
        __metadata("design:type", Boolean)
    ], ProdutoCustomFieldValue.prototype, "valorBoolean");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Produto_1["default"]; }),
        __metadata("design:type", Produto_1["default"])
    ], ProdutoCustomFieldValue.prototype, "produto");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return ProdutoCustomFieldDefinition_1["default"]; }),
        __metadata("design:type", ProdutoCustomFieldDefinition_1["default"])
    ], ProdutoCustomFieldValue.prototype, "fieldDefinition");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], ProdutoCustomFieldValue.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], ProdutoCustomFieldValue.prototype, "updatedAt");
    ProdutoCustomFieldValue = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "ProdutoCustomFieldValues"
        })
    ], ProdutoCustomFieldValue);
    return ProdutoCustomFieldValue;
}(sequelize_typescript_1.Model));
exports["default"] = ProdutoCustomFieldValue;
