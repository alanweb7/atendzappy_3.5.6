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
var CustomerWallet_1 = __importDefault(require("./CustomerWallet"));
var User_1 = __importDefault(require("./User"));
var Company_1 = __importDefault(require("./Company"));
var CustomerWalletUser = /** @class */ (function (_super) {
    __extends(CustomerWalletUser, _super);
    function CustomerWalletUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CustomerWalletUser.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CustomerWallet_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CustomerWalletUser.prototype, "walletId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CustomerWalletUser.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], CustomerWalletUser.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.Default)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], CustomerWalletUser.prototype, "isActive");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], CustomerWalletUser.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], CustomerWalletUser.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CustomerWallet_1["default"]; }, { as: "wallet" }),
        __metadata("design:type", CustomerWallet_1["default"])
    ], CustomerWalletUser.prototype, "wallet");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }, { as: "user" }),
        __metadata("design:type", User_1["default"])
    ], CustomerWalletUser.prototype, "user");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }, { as: "company" }),
        __metadata("design:type", Company_1["default"])
    ], CustomerWalletUser.prototype, "company");
    CustomerWalletUser = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "CustomerWalletUsers"
        })
    ], CustomerWalletUser);
    return CustomerWalletUser;
}(sequelize_typescript_1.Model));
exports["default"] = CustomerWalletUser;
