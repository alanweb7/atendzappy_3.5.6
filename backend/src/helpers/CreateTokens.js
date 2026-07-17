"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createRefreshToken = exports.createAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var createAccessToken = function (user) {
    var secret = auth_1["default"].secret, expiresIn = auth_1["default"].expiresIn;
    return (0, jsonwebtoken_1.sign)({
        usarname: user.name,
        profile: user.profile,
        id: user.id,
        companyId: user.companyId
    }, secret, {
        expiresIn: expiresIn
    });
};
exports.createAccessToken = createAccessToken;
var createRefreshToken = function (user) {
    var refreshSecret = auth_1["default"].refreshSecret, refreshExpiresIn = auth_1["default"].refreshExpiresIn;
    return (0, jsonwebtoken_1.sign)({ id: user.id, tokenVersion: user.tokenVersion, companyId: user.companyId }, refreshSecret, {
        expiresIn: refreshExpiresIn
    });
};
exports.createRefreshToken = createRefreshToken;
