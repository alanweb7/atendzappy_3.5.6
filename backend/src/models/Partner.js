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
var Partner = /** @class */ (function (_super) {
    __extends(Partner, _super);
    function Partner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Partner.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Partner.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Partner.prototype, "phone");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Partner.prototype, "email");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Partner.prototype, "document");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Partner.prototype, "commission");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Partner.prototype, "typeCommission");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Partner.prototype, "walletId");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Partner.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Partner.prototype, "updatedAt");
    Partner = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "Partners"
        })
    ], Partner);
    return Partner;
}(sequelize_typescript_1.Model));
exports["default"] = Partner;
