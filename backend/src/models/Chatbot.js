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
var User_1 = __importDefault(require("./User"));
var QueueIntegrations_1 = __importDefault(require("./QueueIntegrations"));
var Files_1 = __importDefault(require("./Files"));
var Chatbot = /** @class */ (function (_super) {
    __extends(Chatbot, _super);
    function Chatbot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chatbot_1 = Chatbot;
    var Chatbot_1;
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Chatbot.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Chatbot.prototype, "greetingMessage");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }, "queueId"),
        __metadata("design:type", Queue_1["default"])
    ], Chatbot.prototype, "queue");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Chatbot_1; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "chatbotId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Chatbot.prototype, "isAgent");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Chatbot_1; }),
        __metadata("design:type", Chatbot)
    ], Chatbot.prototype, "mainChatbot");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Chatbot_1; }),
        __metadata("design:type", Array)
    ], Chatbot.prototype, "options");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Chatbot.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Chatbot.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Chatbot.prototype, "queueType");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "optQueueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }, "optQueueId"),
        __metadata("design:type", Queue_1["default"])
    ], Chatbot.prototype, "optQueue");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "optUserId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], Chatbot.prototype, "user");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return QueueIntegrations_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "optIntegrationId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return QueueIntegrations_1["default"]; }),
        __metadata("design:type", QueueIntegrations_1["default"])
    ], Chatbot.prototype, "queueIntegrations");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Files_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Chatbot.prototype, "optFileId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Files_1["default"]; }),
        __metadata("design:type", Files_1["default"])
    ], Chatbot.prototype, "file");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Chatbot.prototype, "closeTicket");
    Chatbot = Chatbot_1 = __decorate([
        sequelize_typescript_1.Table
    ], Chatbot);
    return Chatbot;
}(sequelize_typescript_1.Model));
exports["default"] = Chatbot;
