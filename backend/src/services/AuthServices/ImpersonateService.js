"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var User_1 = __importDefault(require("../../models/User"));
var Company_1 = __importDefault(require("../../models/Company"));
var ImpersonationLog_1 = __importDefault(require("../../models/ImpersonationLog"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var CreateTokens_1 = require("../../helpers/CreateTokens");
var ImpersonateService = function (_a) {
    var superUserId = _a.superUserId, superUserCompanyId = _a.superUserCompanyId, targetCompanyId = _a.targetCompanyId, ipAddress = _a.ipAddress;
    return __awaiter(void 0, void 0, void 0, function () {
        var superUser, targetCompany, targetUser, token, refreshToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Só empresa 1 pode impersonar
                    if (superUserCompanyId !== 1) {
                        throw new AppError_1["default"]("Sem permissão para acessar outras empresas", 403);
                    }
                    return [4 /*yield*/, User_1["default"].findByPk(superUserId, { attributes: ["id", "super", "companyId"] })];
                case 1:
                    superUser = _b.sent();
                    if (!(superUser === null || superUser === void 0 ? void 0 : superUser["super"])) {
                        throw new AppError_1["default"]("Usuário não tem permissão de acesso a empresas", 403);
                    }
                    return [4 /*yield*/, Company_1["default"].findByPk(targetCompanyId, { attributes: ["id", "name", "status"] })];
                case 2:
                    targetCompany = _b.sent();
                    if (!targetCompany)
                        throw new AppError_1["default"]("Empresa não encontrada", 404);
                    return [4 /*yield*/, User_1["default"].findOne({
                            where: { companyId: targetCompanyId, profile: "admin" },
                            attributes: ["id", "name", "email", "profile", "companyId", "userType"],
                            order: [["id", "ASC"]]
                        })];
                case 3:
                    targetUser = _b.sent();
                    if (!targetUser)
                        throw new AppError_1["default"]("Nenhum usuário admin encontrado na empresa", 404);
                    token = (0, CreateTokens_1.createAccessToken)(targetUser);
                    refreshToken = (0, CreateTokens_1.createRefreshToken)(targetUser);
                    // Registra auditoria
                    return [4 /*yield*/, ImpersonationLog_1["default"].create({
                            superUserId: superUserId,
                            targetCompanyId: targetCompanyId,
                            targetUserId: targetUser.id,
                            ipAddress: ipAddress || null,
                            startedAt: new Date()
                        })];
                case 4:
                    // Registra auditoria
                    _b.sent();
                    return [2 /*return*/, {
                            token: token,
                            refreshToken: refreshToken,
                            user: __assign(__assign({}, targetUser.toJSON()), { impersonating: true, impersonatedBy: superUserId, impersonatedCompanyName: targetCompany.name })
                        }];
            }
        });
    });
};
exports["default"] = ImpersonateService;
