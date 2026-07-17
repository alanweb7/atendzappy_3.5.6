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
var FinanceiroFornecedor_1 = __importDefault(require("./FinanceiroFornecedor"));
var FinanceiroCategoria_1 = __importDefault(require("./FinanceiroCategoria"));
var FinanceiroReceita = /** @class */ (function (_super) {
    __extends(FinanceiroReceita, _super);
    function FinanceiroReceita() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id" }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FinanceiroFornecedor_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "fornecedor_id", allowNull: true }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "fornecedorId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FinanceiroFornecedor_1["default"]; }),
        __metadata("design:type", FinanceiroFornecedor_1["default"])
    ], FinanceiroReceita.prototype, "fornecedor");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FinanceiroCategoria_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "categoria_id", allowNull: true }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "categoriaId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FinanceiroCategoria_1["default"]; }),
        __metadata("design:type", FinanceiroCategoria_1["default"])
    ], FinanceiroReceita.prototype, "categoria");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "descricao");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(14, 2) }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "valor");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(14, 2), defaultValue: 0 }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "valorRecebido");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_vencimento", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], FinanceiroReceita.prototype, "dataVencimento");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_pagamento", type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
        __metadata("design:type", Date)
    ], FinanceiroReceita.prototype, "dataPagamento");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "metodo_pagamento_previsto", type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "metodoPagamentoPrevisto");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "metodo_pagamento_real", type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "metodoPagamentoReal");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "observacoes");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "anexo_url", type: sequelize_typescript_1.DataType.STRING(500), allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "anexoUrl");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: false }),
        __metadata("design:type", Boolean)
    ], FinanceiroReceita.prototype, "recorrente");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_inicio", type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
        __metadata("design:type", Date)
    ], FinanceiroReceita.prototype, "dataInicio");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_fim", type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
        __metadata("design:type", Date)
    ], FinanceiroReceita.prototype, "dataFim");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "tipo_recorrencia", type: sequelize_typescript_1.DataType.STRING(20), defaultValue: "mensal", allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroReceita.prototype, "tipoRecorrencia");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "quantidade_ciclos", type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "quantidadeCiclos");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "ciclo_atual", type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 1 }),
        __metadata("design:type", Number)
    ], FinanceiroReceita.prototype, "cicloAtual");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], FinanceiroReceita.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
        __metadata("design:type", Date)
    ], FinanceiroReceita.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], FinanceiroReceita.prototype, "company");
    FinanceiroReceita = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "financeiro_receitas",
            timestamps: true
        })
    ], FinanceiroReceita);
    return FinanceiroReceita;
}(sequelize_typescript_1.Model));
exports["default"] = FinanceiroReceita;
