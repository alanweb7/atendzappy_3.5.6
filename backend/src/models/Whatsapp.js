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
var Ticket_1 = __importDefault(require("./Ticket"));
var WhatsappQueue_1 = __importDefault(require("./WhatsappQueue"));
var Company_1 = __importDefault(require("./Company"));
var QueueIntegrations_1 = __importDefault(require("./QueueIntegrations"));
var Prompt_1 = __importDefault(require("./Prompt"));
var FlowBuilder_1 = require("./FlowBuilder");
var Whatsapp = /** @class */ (function (_super) {
    __extends(Whatsapp, _super);
    function Whatsapp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "id");
    __decorate([
        sequelize_typescript_1.AllowNull,
        sequelize_typescript_1.Unique,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "name");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "session");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "qrcode");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "status");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "battery");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "plugged");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "retries");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "number");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "greetingMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "greetingMediaAttachment");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "farewellMessage");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "complationMessage");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "outOfHoursMessage");
    __decorate([
        (0, sequelize_typescript_1.Column)({ defaultValue: "stable" }),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "provider");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.AllowNull,
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "isDefault");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.AllowNull,
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "allowGroup");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], Whatsapp.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], Whatsapp.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Array)
    ], Whatsapp.prototype, "tickets");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Queue_1["default"]; }, function () { return WhatsappQueue_1["default"]; }),
        __metadata("design:type", Array)
    ], Whatsapp.prototype, "queues");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return WhatsappQueue_1["default"]; }),
        __metadata("design:type", Array)
    ], Whatsapp.prototype, "whatsappQueues");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Whatsapp.prototype, "company");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "token");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "facebookUserId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "facebookUserToken");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "facebookPageUserId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "tokenMeta");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "channel");
    __decorate([
        (0, sequelize_typescript_1.Default)(3),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "maxUseBotQueues");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "timeUseBotQueues");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(true),
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "expiresTicket");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "timeSendQueue");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "sendIdQueue");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Whatsapp.prototype, "queueSend");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "timeInactiveMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "inactiveMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "ratingMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "maxUseBotQueuesNPS");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "expiresTicketNPS");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "whenExpiresTicket");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "expiresInactiveMessage");
    __decorate([
        (0, sequelize_typescript_1.Default)("disabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "groupAsTicket");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Whatsapp.prototype, "importOldMessages");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Whatsapp.prototype, "importRecentMessages");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "statusImportMessages");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "closedTicketsPostImported");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "importOldMessagesGroups");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "timeCreateNewTicket");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return QueueIntegrations_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "integrationId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return QueueIntegrations_1["default"]; }),
        __metadata("design:type", QueueIntegrations_1["default"])
    ], Whatsapp.prototype, "queueIntegrations");
    __decorate([
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.JSONB
        }),
        __metadata("design:type", Array)
    ], Whatsapp.prototype, "schedules");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Prompt_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "promptId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Prompt_1["default"]; }),
        __metadata("design:type", Prompt_1["default"])
    ], Whatsapp.prototype, "prompt");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "collectiveVacationMessage");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "collectiveVacationStart");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "collectiveVacationEnd");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "queueIdImportMessages");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Whatsapp.prototype, "queueImport");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FlowBuilder_1.FlowBuilderModel; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "flowIdNotPhrase");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FlowBuilder_1.FlowBuilderModel; }, { foreignKey: "flowIdNotPhrase", as: "flowNotPhrase" }),
        __metadata("design:type", FlowBuilder_1.FlowBuilderModel)
    ], Whatsapp.prototype, "flowNotPhrase");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FlowBuilder_1.FlowBuilderModel; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "flowIdWelcome");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FlowBuilder_1.FlowBuilderModel; }, { foreignKey: "flowIdWelcome", as: "flowBuilder" }),
        __metadata("design:type", FlowBuilder_1.FlowBuilderModel)
    ], Whatsapp.prototype, "flowBuilder");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "outOfHoursQueueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }, { foreignKey: "outOfHoursQueueId", as: "outOfHoursQueue" }),
        __metadata("design:type", Queue_1["default"])
    ], Whatsapp.prototype, "outOfHoursQueue");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return FlowBuilder_1.FlowBuilderModel; }),
        (0, sequelize_typescript_1.AllowNull)(true),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Whatsapp.prototype, "outOfHoursFlowId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return FlowBuilder_1.FlowBuilderModel; }, { foreignKey: "outOfHoursFlowId", as: "outOfHoursFlow" }),
        __metadata("design:type", FlowBuilder_1.FlowBuilderModel)
    ], Whatsapp.prototype, "outOfHoursFlow");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "wavoip");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "notificameHub");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "coexistenceEnabled");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Whatsapp.prototype, "businessAppConnected");
    __decorate([
        (0, sequelize_typescript_1.Default)("automatic"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Whatsapp.prototype, "messageRoutingMode");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
        __metadata("design:type", Array)
    ], Whatsapp.prototype, "routingRules");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Date)
    ], Whatsapp.prototype, "lastCoexistenceSync");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "coexistencePhoneNumberId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "coexistenceWabaId");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Whatsapp.prototype, "coexistencePermanentToken");
    Whatsapp = __decorate([
        sequelize_typescript_1.Table
    ], Whatsapp);
    return Whatsapp;
}(sequelize_typescript_1.Model));
exports["default"] = Whatsapp;
