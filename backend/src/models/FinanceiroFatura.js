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
var CrmClient_1 = __importDefault(require("./CrmClient"));
var Project_1 = __importDefault(require("./Project"));
var FinanceiroPagamento_1 = __importDefault(require("./FinanceiroPagamento"));
var FinanceiroContaBancaria_1 = __importDefault(require("./FinanceiroContaBancaria"));
var FinanceiroCentroCusto_1 = __importDefault(require("./FinanceiroCentroCusto"));
var sequelize_typescript_2 = require("sequelize-typescript");
var FinanceiroFatura = /** @class */ (function (_super) {
    __extends(FinanceiroFatura, _super);
    function FinanceiroFatura() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id", type: sequelize_typescript_1.DataType.BIGINT }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], FinanceiroFatura.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmClient_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "client_id", type: sequelize_typescript_1.DataType.BIGINT }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "clientId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmClient_1["default"]; }),
        __metadata("design:type", CrmClient_1["default"])
    ], FinanceiroFatura.prototype, "client");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Project_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "project_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "projectId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Project_1["default"]; }),
        __metadata("design:type", Project_1["default"])
    ], FinanceiroFatura.prototype, "project");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(5000)),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "descricao");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(14, 2)),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "valor");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "valor_pago", type: sequelize_typescript_1.DataType.DECIMAL(14, 2), defaultValue: 0 }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "valorPago");
    __decorate([
        (0, sequelize_typescript_1.Default)("aberta"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_vencimento", type: sequelize_typescript_1.DataType.DATEONLY }),
        __metadata("design:type", Date)
    ], FinanceiroFatura.prototype, "dataVencimento");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_pagamento", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], FinanceiroFatura.prototype, "dataPagamento");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "tipo_referencia", type: sequelize_typescript_1.DataType.STRING(20) }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "tipoReferencia");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "referencia_id", type: sequelize_typescript_1.DataType.BIGINT }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "referenciaId");
    __decorate([
        (0, sequelize_typescript_1.Default)("unica"),
        (0, sequelize_typescript_1.Column)({ field: "tipo_recorrencia", type: sequelize_typescript_1.DataType.STRING(20) }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "tipoRecorrencia");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "quantidade_ciclos", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "quantidadeCiclos");
    __decorate([
        (0, sequelize_typescript_1.Default)(1),
        (0, sequelize_typescript_1.Column)({ field: "ciclo_atual", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "cicloAtual");
    __decorate([
        (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.NOW),
        (0, sequelize_typescript_1.Column)({ field: "data_inicio", type: sequelize_typescript_1.DataType.DATEONLY }),
        __metadata("design:type", Date)
    ], FinanceiroFatura.prototype, "dataInicio");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_fim", type: sequelize_typescript_1.DataType.DATEONLY }),
        __metadata("design:type", Date)
    ], FinanceiroFatura.prototype, "dataFim");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
        __metadata("design:type", Boolean)
    ], FinanceiroFatura.prototype, "ativa");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "observacoes");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "payment_provider", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "paymentProvider");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "payment_link", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "paymentLink");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "payment_external_id", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "paymentExternalId");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "checkout_token", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "checkoutToken");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FinanceiroContaBancaria_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "conta_bancaria_id", type: sequelize_typescript_1.DataType.BIGINT, allowNull: true }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "contaBancariaId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FinanceiroContaBancaria_1["default"]; }),
        __metadata("design:type", FinanceiroContaBancaria_1["default"])
    ], FinanceiroFatura.prototype, "contaBancaria");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FinanceiroCentroCusto_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "centro_custo_id", type: sequelize_typescript_1.DataType.BIGINT, allowNull: true }),
        __metadata("design:type", Number)
    ], FinanceiroFatura.prototype, "centroCustoId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FinanceiroCentroCusto_1["default"]; }),
        __metadata("design:type", FinanceiroCentroCusto_1["default"])
    ], FinanceiroFatura.prototype, "centroCusto");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(7), allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "competencia");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "numero_documento", type: sequelize_typescript_1.DataType.STRING(60), allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroFatura.prototype, "numeroDocumento");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], FinanceiroFatura.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], FinanceiroFatura.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_2.HasMany)(function () { return FinanceiroPagamento_1["default"]; }),
        __metadata("design:type", Array)
    ], FinanceiroFatura.prototype, "pagamentos");
    FinanceiroFatura = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "financeiro_faturas"
        })
    ], FinanceiroFatura);
    return FinanceiroFatura;
}(sequelize_typescript_1.Model));
exports["default"] = FinanceiroFatura;
