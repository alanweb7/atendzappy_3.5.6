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
var ProdutoCategoria_1 = __importDefault(require("./ProdutoCategoria"));
var ProdutoVariacaoItem_1 = __importDefault(require("./ProdutoVariacaoItem"));
var ProdutoMarca_1 = __importDefault(require("./ProdutoMarca"));
var ProdutoCustomFieldValue_1 = __importDefault(require("./ProdutoCustomFieldValue"));
var ProdutoWhatsappSync_1 = __importDefault(require("./ProdutoWhatsappSync"));
var Produto = /** @class */ (function (_super) {
    __extends(Produto, _super);
    function Produto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produto.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produto.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Produto.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return ProdutoCategoria_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produto.prototype, "categoriaId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return ProdutoCategoria_1["default"]; }),
        __metadata("design:type", ProdutoCategoria_1["default"])
    ], Produto.prototype, "categoria");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return ProdutoMarca_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Produto.prototype, "marcaId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return ProdutoMarca_1["default"]; }),
        __metadata("design:type", ProdutoMarca_1["default"])
    ], Produto.prototype, "marca");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
        __metadata("design:type", String)
    ], Produto.prototype, "tipo");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
        __metadata("design:type", String)
    ], Produto.prototype, "nome");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Produto.prototype, "descricao");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(12, 2)),
        __metadata("design:type", Number)
    ], Produto.prototype, "valor");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), defaultValue: "disponivel" }),
        __metadata("design:type", String)
    ], Produto.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Produto.prototype, "imagem_principal");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], Produto.prototype, "galeria");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], Produto.prototype, "dados_especificos");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Produto.prototype, "linkCompra");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "controleEstoque", defaultValue: false }),
        __metadata("design:type", Boolean)
    ], Produto.prototype, "controleEstoque");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "estoqueAtual", defaultValue: 0 }),
        __metadata("design:type", Number)
    ], Produto.prototype, "estoqueAtual");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "estoqueMinimo", defaultValue: 0 }),
        __metadata("design:type", Number)
    ], Produto.prototype, "estoqueMinimo");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProdutoVariacaoItem_1["default"]; }),
        __metadata("design:type", Array)
    ], Produto.prototype, "variacoes");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProdutoCustomFieldValue_1["default"]; }),
        __metadata("design:type", Array)
    ], Produto.prototype, "customFields");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProdutoWhatsappSync_1["default"]; }),
        __metadata("design:type", Array)
    ], Produto.prototype, "whatsappSyncs");
    Produto = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "Produtos"
        })
    ], Produto);
    return Produto;
}(sequelize_typescript_1.Model));
exports["default"] = Produto;
