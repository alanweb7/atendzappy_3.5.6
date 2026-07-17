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
var FinanceiroFornecedor = /** @class */ (function (_super) {
    __extends(FinanceiroFornecedor, _super);
    function FinanceiroFornecedor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FinanceiroFornecedor.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id", type: sequelize_typescript_1.DataType.BIGINT }),
        __metadata("design:type", Number)
    ], FinanceiroFornecedor.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], FinanceiroFornecedor.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(150)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "nome");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "documento");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(150)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "email");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "telefone");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "endereco");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "numero");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "complemento");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "bairro");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "cidade");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(2)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "estado");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(10)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "cep");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "categoria");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], FinanceiroFornecedor.prototype, "observacoes");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
        __metadata("design:type", Boolean)
    ], FinanceiroFornecedor.prototype, "ativo");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], FinanceiroFornecedor.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
        __metadata("design:type", Date)
    ], FinanceiroFornecedor.prototype, "updatedAt");
    FinanceiroFornecedor = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "financeiro_fornecedores"
        })
    ], FinanceiroFornecedor);
    return FinanceiroFornecedor;
}(sequelize_typescript_1.Model));
exports["default"] = FinanceiroFornecedor;
