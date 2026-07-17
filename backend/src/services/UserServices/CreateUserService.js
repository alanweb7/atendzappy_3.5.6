"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var SerializeUser_1 = require("../../helpers/SerializeUser");
var User_1 = __importDefault(require("../../models/User"));
var Plan_1 = __importDefault(require("../../models/Plan"));
var Company_1 = __importDefault(require("../../models/Company"));
var ALLOWED_USER_TYPES = ["admin", "manager", "attendant", "professional"];
var CreateUserService = function (_a) {
    var email = _a.email, password = _a.password, name = _a.name, _b = _a.queueIds, queueIds = _b === void 0 ? [] : _b, _c = _a.serviceIds, serviceIds = _c === void 0 ? [] : _c, companyId = _a.companyId, _d = _a.profile, profile = _d === void 0 ? "admin" : _d, startWork = _a.startWork, endWork = _a.endWork, whatsappId = _a.whatsappId, allTicket = _a.allTicket, defaultTheme = _a.defaultTheme, defaultMenu = _a.defaultMenu, allowGroup = _a.allowGroup, allHistoric = _a.allHistoric, allUserChat = _a.allUserChat, userClosePendingTicket = _a.userClosePendingTicket, showDashboard = _a.showDashboard, _e = _a.defaultTicketsManagerWidth, defaultTicketsManagerWidth = _e === void 0 ? 550 : _e, allowRealTime = _a.allowRealTime, allowConnections = _a.allowConnections, allowContacts = _a.allowContacts, _f = _a.userType, userType = _f === void 0 ? "attendant" : _f, _g = _a.workDays, workDays = _g === void 0 ? "1,2,3,4,5" : _g, lunchStart = _a.lunchStart, lunchEnd = _a.lunchEnd;
    return __awaiter(void 0, void 0, void 0, function () {
        var company, usersCount, schema, err_1, enforcedProfile, user, serializedUser;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!(companyId !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Company_1["default"].findOne({
                            where: {
                                id: companyId
                            },
                            include: [{ model: Plan_1["default"], as: "plan" }]
                        })];
                case 1:
                    company = _h.sent();
                    if (!(company !== null && company.plan !== null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, User_1["default"].count({
                            where: {
                                companyId: companyId
                            }
                        })];
                case 2:
                    usersCount = _h.sent();
                    if (usersCount >= company.plan.users) {
                        throw new AppError_1["default"]("N\u00FAmero m\u00E1ximo de usu\u00E1rios j\u00E1 alcan\u00E7ado: ".concat(usersCount));
                    }
                    _h.label = 3;
                case 3:
                    schema = Yup.object().shape({
                        name: Yup.string().required().min(2),
                        allHistoric: Yup.string(),
                        email: Yup.string()
                            .email()
                            .required()
                            .test("Check-email", "An user with this email already exists.", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                            var emailExists;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!value)
                                            return [2 /*return*/, false];
                                        return [4 /*yield*/, User_1["default"].findOne({
                                                where: { email: value }
                                            })];
                                    case 1:
                                        emailExists = _a.sent();
                                        return [2 /*return*/, !emailExists];
                                }
                            });
                        }); }),
                        password: Yup.string().required().min(5),
                        userType: Yup.mixed().oneOf(__spreadArray([], ALLOWED_USER_TYPES, true))
                    });
                    _h.label = 4;
                case 4:
                    _h.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, schema.validate({ email: email, password: password, name: name })];
                case 5:
                    _h.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _h.sent();
                    throw new AppError_1["default"](err_1.message);
                case 7:
                    enforcedProfile = "admin";
                    return [4 /*yield*/, User_1["default"].create({
                            email: email,
                            password: password,
                            name: name,
                            companyId: companyId,
                            profile: enforcedProfile,
                            startWork: startWork,
                            endWork: endWork,
                            whatsappId: whatsappId || null,
                            allTicket: allTicket,
                            defaultTheme: defaultTheme,
                            defaultMenu: defaultMenu,
                            allowGroup: allowGroup,
                            allHistoric: allHistoric,
                            allUserChat: allUserChat,
                            userClosePendingTicket: userClosePendingTicket,
                            showDashboard: showDashboard,
                            defaultTicketsManagerWidth: defaultTicketsManagerWidth,
                            allowRealTime: allowRealTime,
                            allowConnections: allowConnections,
                            allowContacts: allowContacts,
                            userType: userType,
                            workDays: workDays,
                            lunchStart: lunchStart || null,
                            lunchEnd: lunchEnd || null
                        }, { include: ["queues", "company", "services"] })];
                case 8:
                    user = _h.sent();
                    return [4 /*yield*/, user.$set("queues", queueIds)];
                case 9:
                    _h.sent();
                    if (!(userType === "professional" && serviceIds.length > 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, user.$set("services", serviceIds)];
                case 10:
                    _h.sent();
                    _h.label = 11;
                case 11: return [4 /*yield*/, user.reload()];
                case 12:
                    _h.sent();
                    serializedUser = (0, SerializeUser_1.SerializeUser)(user);
                    return [2 /*return*/, serializedUser];
            }
        });
    });
};
exports["default"] = CreateUserService;
