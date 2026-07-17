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
var CrmClient_1 = __importDefault(require("./CrmClient"));
var User_1 = __importDefault(require("./User"));
var CrmClientOwner = /** @class */ (function (_super) {
    __extends(CrmClientOwner, _super);
    function CrmClientOwner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmClient_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "client_id" }),
        __metadata("design:type", Number)
    ], CrmClientOwner.prototype, "clientId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmClient_1["default"]; }),
        __metadata("design:type", CrmClient_1["default"])
    ], CrmClientOwner.prototype, "client");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "user_id" }),
        __metadata("design:type", Number)
    ], CrmClientOwner.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], CrmClientOwner.prototype, "user");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], CrmClientOwner.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
        __metadata("design:type", Date)
    ], CrmClientOwner.prototype, "updatedAt");
    CrmClientOwner = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "crm_client_owners"
        })
    ], CrmClientOwner);
    return CrmClientOwner;
}(sequelize_typescript_1.Model));
exports["default"] = CrmClientOwner;
