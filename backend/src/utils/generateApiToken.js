"use strict";
exports.__esModule = true;
exports.generateApiToken = void 0;
var crypto_1 = require("crypto");
var generateApiToken = function (size) {
    if (size === void 0) { size = 48; }
    return (0, crypto_1.randomBytes)(size).toString("hex");
};
exports.generateApiToken = generateApiToken;
exports["default"] = exports.generateApiToken;
