"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pino_1 = __importDefault(require("pino"));
var moment_timezone_1 = __importDefault(require("moment-timezone"));
// Função para obter o timestamp com fuso horário
var timezoned = function () {
    return (0, moment_timezone_1["default"])().tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
};
var logger = (0, pino_1["default"])({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
            ignore: "pid,hostname"
        }
    },
    timestamp: function () { return ",\"time\":\"".concat(timezoned(), "\""); }
});
exports["default"] = logger;
