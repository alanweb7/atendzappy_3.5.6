"use strict";
exports.__esModule = true;
exports.SendRefreshToken = void 0;
var SendRefreshToken = function (res, token) {
    res.cookie("jrt", token, { httpOnly: true });
};
exports.SendRefreshToken = SendRefreshToken;
