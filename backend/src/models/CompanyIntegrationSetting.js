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
var CompanyIntegrationFieldMap_1 = __importDefault(require("./CompanyIntegrationFieldMap"));
var CompanyIntegrationSetting = /** @class */ (function (_super) {
    __extends(CompanyIntegrationSetting, _super);
    function CompanyIntegrationSetting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
        __metadata("design:type", Number)
    ], CompanyIntegrationSetting.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "company_id", type: sequelize_typescript_1.DataType.INTEGER }),
        __metadata("design:type", Number)
    ], CompanyIntegrationSetting.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], CompanyIntegrationSetting.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CompanyIntegrationSetting.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], CompanyIntegrationSetting.prototype, "provider");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "base_url", type: sequelize_typescript_1.DataType.STRING }),
        __metadata("design:type", String)
    ], CompanyIntegrationSetting.prototype, "baseUrl");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "api_key", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], CompanyIntegrationSetting.prototype, "apiKey");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "api_secret", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], CompanyIntegrationSetting.prototype, "apiSecret");
    __decorate([
        (0, sequelize_typescript_1.Column)({ field: "webhook_secret", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], CompanyIntegrationSetting.prototype, "webhookSecret");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Object)
    ], CompanyIntegrationSetting.prototype, "metadata");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
        __metadata("design:type", Boolean)
    ], CompanyIntegrationSetting.prototype, "active");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return CompanyIntegrationFieldMap_1["default"]; }),
        __metadata("design:type", Array)
    ], CompanyIntegrationSetting.prototype, "fieldMaps");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], CompanyIntegrationSetting.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], CompanyIntegrationSetting.prototype, "updatedAt");
    CompanyIntegrationSetting = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "company_integration_settings"
        })
    ], CompanyIntegrationSetting);
    return CompanyIntegrationSetting;
}(sequelize_typescript_1.Model));
exports["default"] = CompanyIntegrationSetting;
