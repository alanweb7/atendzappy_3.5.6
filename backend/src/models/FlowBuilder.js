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
exports.FlowBuilderModel = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var FlowBuilderModel = /** @class */ (function (_super) {
    __extends(FlowBuilderModel, _super);
    function FlowBuilderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FlowBuilderModel.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FlowBuilderModel.prototype, "user_id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], FlowBuilderModel.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], FlowBuilderModel.prototype, "company_id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], FlowBuilderModel.prototype, "active");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], FlowBuilderModel.prototype, "flow");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], FlowBuilderModel.prototype, "variables");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], FlowBuilderModel.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], FlowBuilderModel.prototype, "updatedAt");
    FlowBuilderModel = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "FlowBuilders"
        })
    ], FlowBuilderModel);
    return FlowBuilderModel;
}(sequelize_typescript_1.Model));
exports.FlowBuilderModel = FlowBuilderModel;
