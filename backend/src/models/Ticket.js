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
var uuid_1 = require("uuid");
var Contact_1 = __importDefault(require("./Contact"));
var Message_1 = __importDefault(require("./Message"));
var Queue_1 = __importDefault(require("./Queue"));
var User_1 = __importDefault(require("./User"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var Company_1 = __importDefault(require("./Company"));
var Tag_1 = __importDefault(require("./Tag"));
var TicketTag_1 = __importDefault(require("./TicketTag"));
var QueueIntegrations_1 = __importDefault(require("./QueueIntegrations"));
var CrmLead_1 = __importDefault(require("./CrmLead"));
var CrmClient_1 = __importDefault(require("./CrmClient"));
var FollowUp_1 = __importDefault(require("./FollowUp"));
var Ticket = /** @class */ (function (_super) {
    __extends(Ticket, _super);
    function Ticket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ;
    Ticket.setUUID = function (ticket) {
        ticket.uuid = (0, uuid_1.v4)();
    };
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "pending" }),
        __metadata("design:type", String)
    ], Ticket.prototype, "status");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "unreadMessages");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "leadValue");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "flowWebhook");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "lastFlowId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "hashFlowId");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "flowStopped");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
        __metadata("design:type", Date)
    ], Ticket.prototype, "aiPausedUntil");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], Ticket.prototype, "dataWebhook");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "lastMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "lid");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "isGroup");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ticket.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Ticket.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }),
        __metadata("design:type", User_1["default"])
    ], Ticket.prototype, "user");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }),
        __metadata("design:type", Contact_1["default"])
    ], Ticket.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], Ticket.prototype, "whatsapp");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Ticket.prototype, "queue");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "isBot");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Message_1["default"]; }),
        __metadata("design:type", Array)
    ], Ticket.prototype, "messages");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return TicketTag_1["default"]; }),
        __metadata("design:type", Array)
    ], Ticket.prototype, "ticketTags");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return FollowUp_1["default"]; }),
        __metadata("design:type", Array)
    ], Ticket.prototype, "followUps");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Tag_1["default"]; }, function () { return TicketTag_1["default"]; }),
        __metadata("design:type", Array)
    ], Ticket.prototype, "tags");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Ticket.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.Default)((0, uuid_1.v4)()),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "uuid");
    __decorate([
        (0, sequelize_typescript_1.Default)("whatsapp"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "channel");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "amountUsedBotQueues");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "amountUsedBotQueuesNPS");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "waitingQuestion");
    __decorate([
        sequelize_typescript_1.AllowNull,
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "questionNodeId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
        __metadata("design:type", Object)
    ], Ticket.prototype, "questionOptions");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "questionAttempts");
    __decorate([
        (0, sequelize_typescript_1.Default)(3),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "maxQuestionAttempts");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "botAttempts");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "timeoutEnabled");
    __decorate([
        sequelize_typescript_1.AllowNull,
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ticket.prototype, "timeoutAt");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "fromMe");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "sendInactiveMessage");
    __decorate([
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.JSONB,
            defaultValue: []
        }),
        __metadata("design:type", Array)
    ], Ticket.prototype, "productsSent");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ticket.prototype, "lgpdSendMessageAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ticket.prototype, "lgpdAcceptedAt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ticket.prototype, "imported");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "isOutOfHour");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "useIntegration");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return QueueIntegrations_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Ticket.prototype, "integrationId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return QueueIntegrations_1["default"]; }),
        __metadata("design:type", QueueIntegrations_1["default"])
    ], Ticket.prototype, "queueIntegration");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmLead_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "crm_lead_id" }),
        __metadata("design:type", Number)
    ], Ticket.prototype, "crmLeadId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmLead_1["default"]; }),
        __metadata("design:type", CrmLead_1["default"])
    ], Ticket.prototype, "crmLead");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return CrmClient_1["default"]; }),
        (0, sequelize_typescript_1.Column)({ field: "crm_client_id" }),
        __metadata("design:type", Number)
    ], Ticket.prototype, "crmClientId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return CrmClient_1["default"]; }),
        __metadata("design:type", CrmClient_1["default"])
    ], Ticket.prototype, "crmClient");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "isActiveDemand");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Ticket.prototype, "typebotSessionId");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Ticket.prototype, "typebotStatus");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Ticket.prototype, "typebotSessionTime");
    __decorate([
        sequelize_typescript_1.BeforeCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Ticket]),
        __metadata("design:returntype", void 0)
    ], Ticket, "setUUID");
    Ticket = __decorate([
        sequelize_typescript_1.Table
    ], Ticket);
    return Ticket;
}(sequelize_typescript_1.Model));
exports["default"] = Ticket;
