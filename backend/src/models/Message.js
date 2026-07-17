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
var Contact_1 = __importDefault(require("./Contact"));
var Ticket_1 = __importDefault(require("./Ticket"));
var Company_1 = __importDefault(require("./Company"));
var Queue_1 = __importDefault(require("./Queue"));
var TicketTraking_1 = __importDefault(require("./TicketTraking"));
var User_1 = __importDefault(require("./User"));
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_1 = Message;
    Object.defineProperty(Message.prototype, "mediaUrl", {
        get: function () {
            if (this.getDataValue("mediaUrl")) {
                return "".concat(process.env.BACKEND_URL).concat(process.env.PROXY_PORT ? ":".concat(process.env.PROXY_PORT) : "", "/public/company").concat(this.companyId, "/").concat(this.getDataValue("mediaUrl"));
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    var Message_1;
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Message.prototype, "remoteJid");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Message.prototype, "participant");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String)
    ], Message.prototype, "dataJson");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "ack");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "read");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "fromMe");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], Message.prototype, "body");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], Message.prototype, "mediaUrl");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Message.prototype, "mediaType");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "isDeleted");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE(6)),
        __metadata("design:type", Date)
    ], Message.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE(6)),
        __metadata("design:type", Date)
    ], Message.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Message_1; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Message.prototype, "quotedMsgId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Message_1; }, "quotedMsgId"),
        __metadata("design:type", Message)
    ], Message.prototype, "quotedMsg");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "ticketId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], Message.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return TicketTraking_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "ticketTrakingId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return TicketTraking_1["default"]; }, "ticketTrakingId"),
        __metadata("design:type", TicketTraking_1["default"])
    ], Message.prototype, "ticketTraking");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Contact_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "contactId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Contact_1["default"]; }, "contactId"),
        __metadata("design:type", Contact_1["default"])
    ], Message.prototype, "contact");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], Message.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Queue_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "queueId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Queue_1["default"]; }),
        __metadata("design:type", Queue_1["default"])
    ], Message.prototype, "queue");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Message.prototype, "wid");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "isPrivate");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "isEdited");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "isForwarded");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], Message.prototype, "fromAgent");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return User_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], Message.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return User_1["default"]; }, "userId"),
        __metadata("design:type", User_1["default"])
    ], Message.prototype, "user");
    Message = Message_1 = __decorate([
        sequelize_typescript_1.Table
    ], Message);
    return Message;
}(sequelize_typescript_1.Model));
exports["default"] = Message;
