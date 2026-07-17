"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("../bootstrap");
require("../database");
var CleanLidContactsRunner_1 = require("../services/ContactServices/CleanLidContactsRunner");
var logger_1 = __importDefault(require("../utils/logger"));
(0, CleanLidContactsRunner_1.runCleanLidContacts)().then(function () {
    process.exit(0);
})["catch"](function (err) {
    logger_1["default"].error("[cleanLidContacts] Erro ao processar contatos", err);
    process.exit(1);
});
