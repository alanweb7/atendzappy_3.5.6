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
var Tag_1 = __importDefault(require("./Tag"));
var Ticket_1 = __importDefault(require("./Ticket"));
var TicketTagHistory_1 = __importDefault(require("./TicketTagHistory"));
var TicketTag = /** @class */ (function (_super) {
    __extends(TicketTag, _super);
    function TicketTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // KANBAN FIX: Bloquear remoção de tags de tickets encerrados
    TicketTag.preventDeleteOnClosedTickets = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Ticket_1["default"].findByPk(instance.ticketId)];
                    case 1:
                        ticket = _a.sent();
                        if (ticket && ticket.status === "closed") {
                            console.log("\uD83D\uDD34 KANBAN FIX: Bloqueando remo\u00E7\u00E3o de tag ".concat(instance.tagId, " do ticket ").concat(instance.ticketId, " - ticket est\u00E1 encerrado"));
                            throw new Error("Não é permitido remover tags de tickets encerrados");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketTag.logAdded = function (instance) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ticket, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Ticket_1["default"].findByPk(instance.ticketId, { attributes: ["companyId"] })];
                    case 1:
                        ticket = _c.sent();
                        return [4 /*yield*/, TicketTagHistory_1["default"].create({
                                ticketId: instance.ticketId,
                                tagId: instance.tagId,
                                companyId: (_a = ticket === null || ticket === void 0 ? void 0 : ticket.companyId) !== null && _a !== void 0 ? _a : null,
                                action: "added"
                            })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TicketTag.logRemoved = function (instance) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ticket, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Ticket_1["default"].findByPk(instance.ticketId, { attributes: ["companyId"] })];
                    case 1:
                        ticket = _c.sent();
                        return [4 /*yield*/, TicketTagHistory_1["default"].create({
                                ticketId: instance.ticketId,
                                tagId: instance.tagId,
                                companyId: (_a = ticket === null || ticket === void 0 ? void 0 : ticket.companyId) !== null && _a !== void 0 ? _a : null,
                                action: "removed"
                            })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        (0, sequelize_typescript_1.ForeignKey)(function () { return Ticket_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTag.prototype, "ticketId");
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        (0, sequelize_typescript_1.ForeignKey)(function () { return Tag_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], TicketTag.prototype, "tagId");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], TicketTag.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], TicketTag.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Ticket_1["default"])
    ], TicketTag.prototype, "ticket");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Tag_1["default"]; }),
        __metadata("design:type", Tag_1["default"])
    ], TicketTag.prototype, "tag");
    __decorate([
        sequelize_typescript_1.BeforeDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TicketTag]),
        __metadata("design:returntype", Promise)
    ], TicketTag, "preventDeleteOnClosedTickets");
    __decorate([
        sequelize_typescript_1.AfterCreate,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TicketTag]),
        __metadata("design:returntype", Promise)
    ], TicketTag, "logAdded");
    __decorate([
        sequelize_typescript_1.AfterDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TicketTag]),
        __metadata("design:returntype", Promise)
    ], TicketTag, "logRemoved");
    TicketTag = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: 'TicketTags'
        })
    ], TicketTag);
    return TicketTag;
}(sequelize_typescript_1.Model));
exports["default"] = TicketTag;
