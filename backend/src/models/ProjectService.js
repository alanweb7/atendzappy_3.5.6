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
var Project_1 = __importDefault(require("./Project"));
var Servico_1 = __importDefault(require("./Servico"));
var ProjectService = /** @class */ (function (_super) {
    __extends(ProjectService, _super);
    function ProjectService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProjectService.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProjectService.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], ProjectService.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Project_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProjectService.prototype, "projectId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Project_1["default"]; }),
        __metadata("design:type", Project_1["default"])
    ], ProjectService.prototype, "project");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Servico_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], ProjectService.prototype, "serviceId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Servico_1["default"]; }),
        __metadata("design:type", Servico_1["default"])
    ], ProjectService.prototype, "service");
    __decorate([
        (0, sequelize_typescript_1.Default)(1),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(10, 2)),
        __metadata("design:type", Number)
    ], ProjectService.prototype, "quantity");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(12, 2)),
        __metadata("design:type", Number)
    ], ProjectService.prototype, "unitPrice");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], ProjectService.prototype, "notes");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], ProjectService.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], ProjectService.prototype, "updatedAt");
    ProjectService = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "project_services"
        })
    ], ProjectService);
    return ProjectService;
}(sequelize_typescript_1.Model));
exports["default"] = ProjectService;
