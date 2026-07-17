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
var FinanceiroDespesa_1 = __importDefault(require("./FinanceiroDespesa"));
var FinanceiroPagamentoDespesa = /** @class */ (function (_super) {
    __extends(FinanceiroPagamentoDespesa, _super);
    function FinanceiroPagamentoDespesa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FinanceiroPagamentoDespesa.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id", type: sequelize_typescript_1.DataType.BIGINT }),
        __metadata("design:type", Number)
    ], FinanceiroPagamentoDespesa.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], FinanceiroPagamentoDespesa.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FinanceiroDespesa_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "despesa_id", type: sequelize_typescript_1.DataType.BIGINT }),
        __metadata("design:type", Number)
    ], FinanceiroPagamentoDespesa.prototype, "despesaId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FinanceiroDespesa_1["default"]; }),
        __metadata("design:type", FinanceiroDespesa_1["default"])
    ], FinanceiroPagamentoDespesa.prototype, "despesa");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "metodo_pagamento", type: sequelize_typescript_1.DataType.STRING(50) }),
        __metadata("design:type", String)
    ], FinanceiroPagamentoDespesa.prototype, "metodoPagamento");
    __decorate([
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(14, 2) }),
        __metadata("design:type", Number)
    ], FinanceiroPagamentoDespesa.prototype, "valor");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "data_pagamento", type: sequelize_typescript_1.DataType.DATE }),
        __metadata("design:type", Date)
    ], FinanceiroPagamentoDespesa.prototype, "dataPagamento");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], FinanceiroPagamentoDespesa.prototype, "observacoes");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "anexo_url", type: sequelize_typescript_1.DataType.STRING(500), allowNull: true }),
        __metadata("design:type", String)
    ], FinanceiroPagamentoDespesa.prototype, "anexoUrl");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], FinanceiroPagamentoDespesa.prototype, "createdAt");
    FinanceiroPagamentoDespesa = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "financeiro_pagamentos_despesas"
        })
    ], FinanceiroPagamentoDespesa);
    return FinanceiroPagamentoDespesa;
}(sequelize_typescript_1.Model));
exports["default"] = FinanceiroPagamentoDespesa;
