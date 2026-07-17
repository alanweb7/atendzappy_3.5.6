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
var AffiliateLink = /** @class */ (function (_super) {
    __extends(AffiliateLink, _super);
    function AffiliateLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Lazy loading to avoid circular dependency
    AffiliateLink.prototype.getAffiliate = function () {
        var Affiliate = require("./Affiliate")["default"];
        return Affiliate.findByPk(this.affiliateId);
    };
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AffiliateLink.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AffiliateLink.prototype, "affiliateId");
    __decorate([
        (0, sequelize_typescript_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], AffiliateLink.prototype, "code");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], AffiliateLink.prototype, "url");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AffiliateLink.prototype, "clicks");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AffiliateLink.prototype, "signups");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], AffiliateLink.prototype, "conversions");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], AffiliateLink.prototype, "trackingData");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], AffiliateLink.prototype, "createdAt");
    AffiliateLink = __decorate([
        sequelize_typescript_1.Table
    ], AffiliateLink);
    return AffiliateLink;
}(sequelize_typescript_1.Model));
exports["default"] = AffiliateLink;
