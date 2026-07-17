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
var Invoices_1 = __importDefault(require("./Invoices"));
var ProjectService_1 = __importDefault(require("./ProjectService"));
var ProjectProduct_1 = __importDefault(require("./ProjectProduct"));
var ProjectUser_1 = __importDefault(require("./ProjectUser"));
var ProjectTask_1 = __importDefault(require("./ProjectTask"));
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Project.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Project.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Project.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmClient_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Project.prototype, "clientId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmClient_1["default"]; }),
        __metadata("design:type", CrmClient_1["default"])
    ], Project.prototype, "client");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Invoices_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Project.prototype, "invoiceId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Invoices_1["default"]; }),
        __metadata("design:type", Invoices_1["default"])
    ], Project.prototype, "invoice");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
        __metadata("design:type", String)
    ], Project.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Project.prototype, "description");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], Project.prototype, "deliveryTime");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Project.prototype, "warranty");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Project.prototype, "terms");
    __decorate([
        (0, sequelize_typescript_1.Default)("draft"),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
        __metadata("design:type", String)
    ], Project.prototype, "status");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], Project.prototype, "startDate");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], Project.prototype, "endDate");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProjectService_1["default"]; }),
        __metadata("design:type", Array)
    ], Project.prototype, "services");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProjectProduct_1["default"]; }),
        __metadata("design:type", Array)
    ], Project.prototype, "products");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProjectUser_1["default"]; }),
        __metadata("design:type", Array)
    ], Project.prototype, "users");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return ProjectTask_1["default"]; }),
        __metadata("design:type", Array)
    ], Project.prototype, "tasks");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Project.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Project.prototype, "updatedAt");
    Project = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "projects"
        })
    ], Project);
    return Project;
}(sequelize_typescript_1.Model));
exports["default"] = Project;
