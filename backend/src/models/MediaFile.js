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
var MediaFolder_1 = __importDefault(require("./MediaFolder"));
var MediaFile = /** @class */ (function (_super) {
    __extends(MediaFile, _super);
    function MediaFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], MediaFile.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return MediaFolder_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({ field: "folder_id" }),
        __metadata("design:type", Number)
    ], MediaFile.prototype, "folderId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return MediaFolder_1["default"]; }),
        __metadata("design:type", MediaFolder_1["default"])
    ], MediaFile.prototype, "folder");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({ field: "company_id" }),
        __metadata("design:type", Number)
    ], MediaFile.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], MediaFile.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({ field: "original_name", type: sequelize_typescript_1.DataType.STRING(255) }),
        __metadata("design:type", String)
    ], MediaFile.prototype, "originalName");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)({ field: "custom_name", type: sequelize_typescript_1.DataType.STRING(255) }),
        __metadata("design:type", String)
    ], MediaFile.prototype, "customName");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({ field: "mime_type", type: sequelize_typescript_1.DataType.STRING(128) }),
        __metadata("design:type", String)
    ], MediaFile.prototype, "mimeType");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
        __metadata("design:type", Number)
    ], MediaFile.prototype, "size");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Column)({ field: "storage_path", type: sequelize_typescript_1.DataType.TEXT }),
        __metadata("design:type", String)
    ], MediaFile.prototype, "storagePath");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        (0, sequelize_typescript_1.Column)({ field: "created_at" }),
        __metadata("design:type", Date)
    ], MediaFile.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)({ field: "updated_at" }),
        __metadata("design:type", Date)
    ], MediaFile.prototype, "updatedAt");
    MediaFile = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: "media_files",
            underscored: true,
            timestamps: true
        })
    ], MediaFile);
    return MediaFile;
}(sequelize_typescript_1.Model));
exports["default"] = MediaFile;
