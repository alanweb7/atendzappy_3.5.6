"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mustache_1 = __importDefault(require("mustache"));
exports["default"] = (function (body, contact) {
    var view = {
        name: contact ? contact.name : ""
    };
    return mustache_1["default"].render(body, view);
});
