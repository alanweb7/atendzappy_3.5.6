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
var Queue_1 = __importDefault(require("./Queue"));
var Company_1 = __importDefault(require("./Company"));
var PromptToolSetting_1 = __importDefault(require("./PromptToolSetting"));
var Prompt = /** @class */ (function (_super) {
    __extends(Prompt, _super);
    function Prompt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Prompt.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "prompt");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "apiKey");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: 10 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "maxMessages");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: 100 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "maxTokens");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: 1 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "temperature");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: 0 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "promptTokens");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: 0 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "completionTokens");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: 0 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "totalTokens");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "voice");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "voiceKey");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "voiceRegion");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)({ defaultValue: "tts-1" }),
        __metadata("design:type", String)
    ], Prompt.prototype, "ttsModel");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)({ defaultValue: 30 }),
        __metadata("design:type", Number)
    ], Prompt.prototype, "audioPercentage");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)({ defaultValue: "openai" }),
        __metadata("design:type", String)
    ], Prompt.prototype, "provider");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Prompt.prototype, "model");
    __decorate([
        sequelize_typescript_1.AllowNull,
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Prompt.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Prompt.prototype, "queue");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Prompt.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Prompt.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return PromptToolSetting_1["default"]; }),
        __metadata("design:type", Array)
    ], Prompt.prototype, "toolSettings");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB, defaultValue: [] }),
        __metadata("design:type", Object)
    ], Prompt.prototype, "knowledgeBase");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB, defaultValue: [] }),
        __metadata("design:type", Array)
    ], Prompt.prototype, "knowledgeBaseIds");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Prompt.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Prompt.prototype, "updatedAt");
    Prompt = __decorate([
        sequelize_typescript_1.Table
    ], Prompt);
    return Prompt;
}(sequelize_typescript_1.Model));
exports["default"] = Prompt;
