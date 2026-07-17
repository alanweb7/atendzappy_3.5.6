"use strict";
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
exports.remove = exports.impersonate = exports.exitImpersonate = exports.me = exports.update = exports.verify2FA = exports.store = void 0;
var AppError_1 = __importDefault(require("../errors/AppError"));
var socket_1 = require("../libs/socket");
var AuthUserService_1 = __importDefault(require("../services/UserServices/AuthUserService"));
var ImpersonateService_1 = __importDefault(require("../services/AuthServices/ImpersonateService"));
var Verify2FAService_1 = __importDefault(require("../services/UserServices/Verify2FAService"));
var SendRefreshToken_1 = require("../helpers/SendRefreshToken");
var RefreshTokenService_1 = require("../services/AuthServices/RefreshTokenService");
var FindUserFromToken_1 = __importDefault(require("../services/AuthServices/FindUserFromToken"));
var User_1 = __importDefault(require("../models/User"));
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, result, token, serializedUser, refreshToken, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, AuthUserService_1["default"])({
                        email: email,
                        password: password
                    })];
            case 1:
                result = _b.sent();
                if (result.requiresTwoFactor) {
                    return [2 /*return*/, res.status(200).json({
                            requiresTwoFactor: true,
                            email: result.email
                        })];
                }
                token = result.token, serializedUser = result.serializedUser, refreshToken = result.refreshToken;
                (0, SendRefreshToken_1.SendRefreshToken)(res, refreshToken);
                io = (0, socket_1.getIO)();
                io.of(serializedUser.companyId.toString())
                    .emit("company-".concat(serializedUser.companyId, "-auth"), {
                    action: "update",
                    user: {
                        id: serializedUser.id,
                        email: serializedUser.email,
                        companyId: serializedUser.companyId,
                        token: serializedUser.token
                    }
                });
                return [2 /*return*/, res.status(200).json({
                        token: token,
                        user: serializedUser
                    })];
        }
    });
}); };
exports.store = store;
var verify2FA = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, twoFactorToken, _b, token, serializedUser, refreshToken, io;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, twoFactorToken = _a.token;
                return [4 /*yield*/, (0, Verify2FAService_1["default"])({
                        email: email,
                        token: twoFactorToken
                    })];
            case 1:
                _b = _c.sent(), token = _b.token, serializedUser = _b.serializedUser, refreshToken = _b.refreshToken;
                (0, SendRefreshToken_1.SendRefreshToken)(res, refreshToken);
                io = (0, socket_1.getIO)();
                io.of(serializedUser.companyId.toString())
                    .emit("company-".concat(serializedUser.companyId, "-auth"), {
                    action: "update",
                    user: {
                        id: serializedUser.id,
                        email: serializedUser.email,
                        companyId: serializedUser.companyId,
                        token: serializedUser.token
                    }
                });
                return [2 /*return*/, res.status(200).json({
                        token: token,
                        user: serializedUser
                    })];
        }
    });
}); };
exports.verify2FA = verify2FA;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _a, user, newToken, refreshToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = req.cookies.jrt;
                if (!token) {
                    throw new AppError_1["default"]("ERR_SESSION_EXPIRED", 401);
                }
                return [4 /*yield*/, (0, RefreshTokenService_1.RefreshTokenService)(res, token)];
            case 1:
                _a = _b.sent(), user = _a.user, newToken = _a.newToken, refreshToken = _a.refreshToken;
                (0, SendRefreshToken_1.SendRefreshToken)(res, refreshToken);
                return [2 /*return*/, res.json({ token: newToken, user: user })];
        }
    });
}); };
exports.update = update;
var me = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, id, profile, superAdmin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.cookies.jrt;
                return [4 /*yield*/, (0, FindUserFromToken_1["default"])(token)];
            case 1:
                user = _a.sent();
                id = user.id, profile = user.profile, superAdmin = user["super"];
                if (!token) {
                    throw new AppError_1["default"]("ERR_SESSION_EXPIRED", 401);
                }
                return [2 /*return*/, res.json({ id: id, profile: profile, "super": superAdmin })];
        }
    });
}); };
exports.me = me;
var exitImpersonate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var originalToken, verify, authConfig, decoded, user, _a, createAccessToken, createRefreshToken, SendRefreshToken, newToken, newRefreshToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                originalToken = req.body.originalToken;
                if (!originalToken)
                    throw new AppError_1["default"]("Token original não informado", 400);
                verify = require("jsonwebtoken").verify;
                authConfig = require("../config/auth")["default"];
                try {
                    decoded = verify(originalToken, authConfig.secret);
                }
                catch (_c) {
                    throw new AppError_1["default"]("Token original inválido ou expirado", 401);
                }
                return [4 /*yield*/, User_1["default"].findByPk(decoded.id, {
                        attributes: ["id", "name", "email", "profile", "companyId", "userType", "tokenVersion"]
                    })];
            case 1:
                user = _b.sent();
                if (!user)
                    throw new AppError_1["default"]("Usuário não encontrado", 404);
                _a = require("../helpers/CreateTokens"), createAccessToken = _a.createAccessToken, createRefreshToken = _a.createRefreshToken;
                SendRefreshToken = require("../helpers/SendRefreshToken").SendRefreshToken;
                newToken = createAccessToken(user);
                newRefreshToken = createRefreshToken(user);
                SendRefreshToken(res, newRefreshToken);
                return [2 /*return*/, res.json({ token: newToken, user: user.toJSON() })];
        }
    });
}); };
exports.exitImpersonate = exitImpersonate;
var impersonate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, superUserId, superUserCompanyId, targetCompanyId, ipAddress, result;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.user, superUserId = _a.id, superUserCompanyId = _a.companyId;
                targetCompanyId = req.body.targetCompanyId;
                ipAddress = ((_b = req.headers["x-forwarded-for"]) === null || _b === void 0 ? void 0 : _b.split(",")[0]) || ((_c = req.socket) === null || _c === void 0 ? void 0 : _c.remoteAddress);
                return [4 /*yield*/, (0, ImpersonateService_1["default"])({
                        superUserId: Number(superUserId),
                        superUserCompanyId: Number(superUserCompanyId),
                        targetCompanyId: Number(targetCompanyId),
                        ipAddress: ipAddress
                    })];
            case 1:
                result = _d.sent();
                (0, SendRefreshToken_1.SendRefreshToken)(res, result.refreshToken);
                return [2 /*return*/, res.json({ token: result.token, user: result.user })];
        }
    });
}); };
exports.impersonate = impersonate;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.user.id;
                if (!id) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1["default"].findByPk(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.update({ online: false })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.clearCookie("jrt");
                return [2 /*return*/, res.send()];
        }
    });
}); };
exports.remove = remove;
