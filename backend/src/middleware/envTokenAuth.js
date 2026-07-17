"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var AppError_1 = __importDefault(require("../errors/AppError"));
var envTokenAuth = function (req, res, next) {
    try {
        var bodyToken = req.body.token;
        var queryToken = req.query.token;
        console.log("|========= | middleware | ========|", req.query);
        if (queryToken === process.env.ENV_TOKEN) {
            return next();
        }
        if (bodyToken === process.env.ENV_TOKEN) {
            return next();
        }
    }
    catch (e) {
        console.log(e);
    }
    throw new AppError_1["default"]("Token inválido", 403);
};
exports["default"] = envTokenAuth;
