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
var bcryptjs_1 = require("bcryptjs");
var Ticket_1 = __importDefault(require("./Ticket"));
var Queue_1 = __importDefault(require("./Queue"));
var UserQueue_1 = __importDefault(require("./UserQueue"));
var Company_1 = __importDefault(require("./Company"));
var QuickMessage_1 = __importDefault(require("./QuickMessage"));
var Whatsapp_1 = __importDefault(require("./Whatsapp"));
var Chatbot_1 = __importDefault(require("./Chatbot"));
var Servico_1 = __importDefault(require("./Servico"));
var UserService_1 = __importDefault(require("./UserService"));
var UserPagePermission_1 = __importDefault(require("./UserPagePermission"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkPassword = function (password) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, bcryptjs_1.compare)(password, this.getDataValue("passwordHash"))];
            });
        }); };
        return _this;
    }
    User.updateChatbotsUsersReferences = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Atualizar os registros na tabela Chatbots onde optQueueId é igual ao ID da fila que será excluída
                    return [4 /*yield*/, Chatbot_1["default"].update({ optUserId: null }, { where: { optUserId: user.id } })];
                    case 1:
                        // Atualizar os registros na tabela Chatbots onde optQueueId é igual ao ID da fila que será excluída
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.hashPassword = function (instance) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator((void 0), function (_b) {
            switch (_b.label) {
                case 0:
                    if (!instance.password) return [3 /*break*/, 2];
                    _a = instance;
                    return [4 /*yield*/, (0, bcryptjs_1.hash)(instance.password, 8)];
                case 1:
                    _a.passwordHash = _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "email");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.VIRTUAL),
        __metadata("design:type", String)
    ], User.prototype, "password");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "passwordHash");
    __decorate([
        (0, sequelize_typescript_1.Default)(0),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "tokenVersion");
    __decorate([
        (0, sequelize_typescript_1.Default)("admin"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "profile");
    __decorate([
        (0, sequelize_typescript_1.Default)(null),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "profileImage");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Whatsapp_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "whatsappId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Whatsapp_1["default"]; }),
        __metadata("design:type", Whatsapp_1["default"])
    ], User.prototype, "whatsapp");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], User.prototype, "super");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], User.prototype, "online");
    __decorate([
        (0, sequelize_typescript_1.Default)("00:00"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "startWork");
    __decorate([
        (0, sequelize_typescript_1.Default)("23:59"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "endWork");
    __decorate([
        (0, sequelize_typescript_1.Default)("attendant"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "userType");
    __decorate([
        (0, sequelize_typescript_1.Default)("1,2,3,4,5"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "workDays");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "lunchStart");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "lunchEnd");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "color");
    __decorate([
        (0, sequelize_typescript_1.Default)("disable"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "allTicket");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], User.prototype, "allowGroup");
    __decorate([
        (0, sequelize_typescript_1.Default)("light"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "defaultTheme");
    __decorate([
        (0, sequelize_typescript_1.Default)("closed"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "defaultMenu");
    __decorate([
        (0, sequelize_typescript_1.Default)(""),
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
        __metadata("design:type", String)
    ], User.prototype, "farewellMessage");
    __decorate([
        sequelize_typescript_1.CreatedAt,
        __metadata("design:type", Date)
    ], User.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.UpdatedAt,
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return Company_1["default"]; }),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "companyId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return Company_1["default"]; }),
        __metadata("design:type", Company_1["default"])
    ], User.prototype, "company");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Ticket_1["default"]; }),
        __metadata("design:type", Array)
    ], User.prototype, "tickets");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Queue_1["default"]; }, function () { return UserQueue_1["default"]; }),
        __metadata("design:type", Array)
    ], User.prototype, "queues");
    __decorate([
        (0, sequelize_typescript_1.BelongsToMany)(function () { return Servico_1["default"]; }, function () { return UserService_1["default"]; }),
        __metadata("design:type", Array)
    ], User.prototype, "services");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return QuickMessage_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "quickMessages");
    __decorate([
        (0, sequelize_typescript_1.Default)("disabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "allHistoric");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return Chatbot_1["default"]; }, {
            onUpdate: "SET NULL",
            onDelete: "SET NULL",
            hooks: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "chatbot");
    __decorate([
        (0, sequelize_typescript_1.HasMany)(function () { return UserPagePermission_1["default"]; }, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Array)
    ], User.prototype, "pagePermissions");
    __decorate([
        (0, sequelize_typescript_1.Default)("disabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "allUserChat");
    __decorate([
        (0, sequelize_typescript_1.Default)("enabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "userClosePendingTicket");
    __decorate([
        (0, sequelize_typescript_1.Default)("disabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "showDashboard");
    __decorate([
        (0, sequelize_typescript_1.Default)(550),
        sequelize_typescript_1.Column,
        __metadata("design:type", Number)
    ], User.prototype, "defaultTicketsManagerWidth");
    __decorate([
        (0, sequelize_typescript_1.Default)("disable"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "allowRealTime");
    __decorate([
        (0, sequelize_typescript_1.Default)("disable"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "allowConnections");
    __decorate([
        (0, sequelize_typescript_1.Default)("disabled"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "allowContacts");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], User.prototype, "canAccessMarketing");
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "twoFactorSecret");
    __decorate([
        (0, sequelize_typescript_1.Default)(false),
        sequelize_typescript_1.Column,
        __metadata("design:type", Boolean)
    ], User.prototype, "twoFactorEnabled");
    __decorate([
        (0, sequelize_typescript_1.Default)("inherit"),
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], User.prototype, "pagePermissionsMode");
    __decorate([
        sequelize_typescript_1.BeforeUpdate,
        sequelize_typescript_1.BeforeCreate,
        __metadata("design:type", Object)
    ], User, "hashPassword");
    __decorate([
        sequelize_typescript_1.BeforeDestroy,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User]),
        __metadata("design:returntype", Promise)
    ], User, "updateChatbotsUsersReferences");
    User = __decorate([
        sequelize_typescript_1.Table
    ], User);
    return User;
}(sequelize_typescript_1.Model));
exports["default"] = User;
