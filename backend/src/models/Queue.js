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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var User_1 = __importDefault(require("./User"));
var UserQueue_1 = __importDefault(require("./UserQueue"));
var Company_1 = __importDefault(require("./Company"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var WhatsappQueue_1 = __importDefault(require("./WhatsappQueue"));
var Chatbot_1 = __importDefault(require("./Chatbot"));
var QueueIntegrations_1 = __importDefault(require("./QueueIntegrations"));
var Files_1 = __importDefault(require("./Files"));
var Prompt_1 = __importDefault(require("./Prompt"));
var Queue = /** @class */ (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Queue.updateChatbotsQueueReferences = function (queue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Atualizar os registros na tabela Chatbots onde optQueueId é igual ao ID da fila que será excluída
                    return [4 /*yield*/, Chatbot_1["default"].update({ optQueueId: null }, { where: { optQueueId: queue.id } })];
                    case 1:
                        // Atualizar os registros na tabela Chatbots onde optQueueId é igual ao ID da fila que será excluída
                        _a.sent();
                        return [4 /*yield*/, Whatsapp_1["default"].update({ sendIdQueue: null, timeSendQueue: 0 }, { where: { sendIdQueue: queue.id, companyId: queue.companyId } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Prompt_1["default"].update({ queueId: null }, { where: { queueId: queue.id } })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Queue.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Unique,
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Queue.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Unique,
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Queue.prototype, "color");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Queue.prototype, "greetingMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Queue.prototype, "orderQueue");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Queue.prototype, "ativarRoteador");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Queue.prototype, "tempoRoteador");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Queue.prototype, "outOfHoursMessage");
    __decorate([
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.JSONB
        }),
        __metadata("design:type", Array)
    ], Queue.prototype, "schedules");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Queue.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Queue.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Queue.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Queue.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Whatsapp_1["default"]; }, function () { return WhatsappQueue_1["default"]; }),
        __metadata("design:type", Array)
    ], Queue.prototype, "whatsapps");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return User_1["default"]; }, function () { return UserQueue_1["default"]; }),
        __metadata("design:type", Array)
    ], Queue.prototype, "users");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Chatbot_1["default"]; }, {
            onDelete: "DELETE",
            onUpdate: "DELETE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Queue.prototype, "chatbots");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return QueueIntegrations_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Queue.prototype, "integrationId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return QueueIntegrations_1["default"]; }),
        __metadata("design:type", QueueIntegrations_1["default"])
    ], Queue.prototype, "queueIntegrations");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Files_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Queue.prototype, "fileListId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Files_1["default"]; }),
        __metadata("design:type", Files_1["default"])
    ], Queue.prototype, "files");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Queue.prototype, "closeTicket");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Prompt_1["default"]; }, {
            onUpdate: "SET NULL",
            onDelete: "SET NULL",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], Queue.prototype, "prompt");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Chatbot_1["default"]; }, {
            foreignKey: 'optQueueId',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            hooks: true // Ativa hooks para esta associação
        }),
        __metadata("design:type", Array)
    ], Queue.prototype, "optQueue");
    __decorate([
        sequelize_typescript_1.BeforeDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Queue]),
        __metadata("design:returntype", Promise)
    ], Queue, "updateChatbotsQueueReferences");
    Queue = __decorate([
        sequelize_typescript_1.Table
    ], Queue);
    return Queue;
}(sequelize_typescript_1.Model));
exports["default"] = Queue;
