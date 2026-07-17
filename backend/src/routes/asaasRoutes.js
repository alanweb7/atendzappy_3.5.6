"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var AsaasController_1 = require("../controllers/AsaasController");
var asaasRoutes = (0, express_1.Router)();
asaasRoutes.post("/asaas/second-copy", isAuth_1["default"], AsaasController_1.secondCopyByCpf);
exports["default"] = asaasRoutes;
