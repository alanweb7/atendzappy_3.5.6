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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ShowUserService_1 = __importDefault(require("./ShowUserService"));
var Company_1 = __importDefault(require("../../models/Company"));
var User_1 = __importDefault(require("../../models/User"));
var UpdateUserService = function (_a) {
    var userData = _a.userData, userId = _a.userId, companyId = _a.companyId, requestUserId = _a.requestUserId;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, requestUser, userCompany, isEditingSelf, restrictedFields, hasRestrictedChanges, schema, oldUserEmail, email, password, profile, name, _b, queueIds, _c, serviceIds, startWork, endWork, farewellMessage, whatsappId, allTicket, defaultTheme, defaultMenu, allowGroup, allHistoric, allUserChat, userClosePendingTicket, showDashboard, allowConnections, allowContacts, _d, defaultTicketsManagerWidth, allowRealTime, profileImage, userType, workDays, lunchStart, lunchEnd, isSeedUser, err_1, enforcedProfile, enforcedUserType, serializedUser;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, ShowUserService_1["default"])(userId, companyId)];
                case 1:
                    user = _e.sent();
                    return [4 /*yield*/, User_1["default"].findByPk(requestUserId)];
                case 2:
                    requestUser = _e.sent();
                    return [4 /*yield*/, Company_1["default"].findByPk(user.companyId)];
                case 3:
                    userCompany = _e.sent();
                    isEditingSelf = Number(userId) === Number(requestUserId);
                    // Verificar se o usuário pertence à mesma empresa
                    if (user.companyId !== companyId) {
                        throw new AppError_1["default"]("O usuário não pertence à esta empresa");
                    }
                    // Se userData.companyId for fornecido e diferente, validar permissão de super admin
                    if (userData.companyId && userData.companyId !== companyId && requestUser["super"] === false) {
                        throw new AppError_1["default"]("Você não tem permissão para transferir usuários entre empresas");
                    }
                    // Se o usuário está editando outro usuário (não a si mesmo), validar permissões
                    if (!isEditingSelf) {
                        restrictedFields = ['profile', 'userType', 'companyId', 'queueIds', 'serviceIds',
                            'allTicket', 'allHistoric', 'allUserChat', 'userClosePendingTicket', 'showDashboard',
                            'allowRealTime', 'allowConnections', 'allowContacts', 'allowGroup'];
                        hasRestrictedChanges = restrictedFields.some(function (field) { return userData[field] !== undefined; });
                        // Se está tentando alterar campos restritos, precisa ter permissão de admin
                        if (hasRestrictedChanges && requestUser.profile !== 'admin') {
                            throw new AppError_1["default"]("Você não tem permissão para alterar estes campos");
                        }
                    }
                    schema = Yup.object().shape({
                        name: Yup.string().min(2),
                        allHistoric: Yup.string(),
                        email: Yup.string().email(),
                        profile: Yup.string(),
                        password: Yup.string()
                    });
                    oldUserEmail = user.email;
                    email = userData.email, password = userData.password, profile = userData.profile, name = userData.name, _b = userData.queueIds, queueIds = _b === void 0 ? [] : _b, _c = userData.serviceIds, serviceIds = _c === void 0 ? [] : _c, startWork = userData.startWork, endWork = userData.endWork, farewellMessage = userData.farewellMessage, whatsappId = userData.whatsappId, allTicket = userData.allTicket, defaultTheme = userData.defaultTheme, defaultMenu = userData.defaultMenu, allowGroup = userData.allowGroup, allHistoric = userData.allHistoric, allUserChat = userData.allUserChat, userClosePendingTicket = userData.userClosePendingTicket, showDashboard = userData.showDashboard, allowConnections = userData.allowConnections, allowContacts = userData.allowContacts, _d = userData.defaultTicketsManagerWidth, defaultTicketsManagerWidth = _d === void 0 ? 550 : _d, allowRealTime = userData.allowRealTime, profileImage = userData.profileImage, userType = userData.userType, workDays = userData.workDays, lunchStart = userData.lunchStart, lunchEnd = userData.lunchEnd;
                    isSeedUser = Boolean(userCompany === null || userCompany === void 0 ? void 0 : userCompany.email) && user.email === (userCompany === null || userCompany === void 0 ? void 0 : userCompany.email);
                    _e.label = 4;
                case 4:
                    _e.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, schema.validate({ email: email, password: password, profile: profile, name: name })];
                case 5:
                    _e.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _e.sent();
                    throw new AppError_1["default"](err_1.message);
                case 7:
                    // Seed user pode editar nome, email e senha, mas não pode mudar profile/userType
                    if (isSeedUser) {
                        // Se está tentando alterar profile ou userType para algo diferente de admin, bloquear
                        if ((profile && profile !== "admin") || (userType && userType !== "admin")) {
                            throw new AppError_1["default"]("O usuário principal da empresa deve permanecer administrador.");
                        }
                    }
                    enforcedProfile = isSeedUser ? "admin" : profile;
                    enforcedUserType = isSeedUser ? "admin" : userType;
                    return [4 /*yield*/, user.update({
                            email: email,
                            password: password,
                            profile: enforcedProfile,
                            name: name,
                            startWork: startWork,
                            endWork: endWork,
                            farewellMessage: farewellMessage,
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
                            profileImage: profileImage,
                            allowConnections: allowConnections,
                            allowContacts: allowContacts,
                            userType: enforcedUserType,
                            workDays: workDays,
                            lunchStart: lunchStart || null,
                            lunchEnd: lunchEnd || null
                        })];
                case 8:
                    _e.sent();
                    return [4 /*yield*/, user.$set("queues", queueIds)];
                case 9:
                    _e.sent();
                    if (!(serviceIds !== undefined)) return [3 /*break*/, 11];
                    return [4 /*yield*/, user.$set("services", serviceIds)];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [4 /*yield*/, user.reload()];
                case 12:
                    _e.sent();
                    if (!(userCompany && userCompany.email === oldUserEmail)) return [3 /*break*/, 14];
                    return [4 /*yield*/, userCompany.update({
                            email: email,
                            password: password
                        })];
                case 13:
                    _e.sent();
                    _e.label = 14;
                case 14:
                    serializedUser = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        profile: user.profile,
                        companyId: user.companyId,
                        company: userCompany,
                        queues: user.queues,
                        services: user.services,
                        startWork: user.startWork,
                        endWork: user.endWork,
                        greetingMessage: user.farewellMessage,
                        allTicket: user.allTicket,
                        defaultMenu: user.defaultMenu,
                        defaultTheme: user.defaultTheme,
                        allowGroup: user.allowGroup,
                        allHistoric: user.allHistoric,
                        userClosePendingTicket: user.userClosePendingTicket,
                        showDashboard: user.showDashboard,
                        defaultTicketsManagerWidth: user.defaultTicketsManagerWidth,
                        allowRealTime: user.allowRealTime,
                        allowConnections: user.allowConnections,
                        allowContacts: user.allowContacts,
                        profileImage: user.profileImage,
                        userType: user.userType,
                        workDays: user.workDays,
                        lunchStart: user.lunchStart,
                        lunchEnd: user.lunchEnd
                    };
                    return [2 /*return*/, serializedUser];
            }
        });
    });
};
exports["default"] = UpdateUserService;
