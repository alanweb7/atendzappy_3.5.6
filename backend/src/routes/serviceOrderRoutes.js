"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var ServiceOrderController_1 = require("../controllers/ServiceOrderController");
var serviceOrderRoutes = (0, express_1.Router)();
serviceOrderRoutes.get("/service-orders", isAuth_1["default"], ServiceOrderController_1.index);
serviceOrderRoutes.post("/service-orders", isAuth_1["default"], ServiceOrderController_1.store);
serviceOrderRoutes.get("/service-orders/:serviceOrderId", isAuth_1["default"], ServiceOrderController_1.show);
serviceOrderRoutes.put("/service-orders/:serviceOrderId", isAuth_1["default"], ServiceOrderController_1.update);
serviceOrderRoutes["delete"]("/service-orders/:serviceOrderId", isAuth_1["default"], ServiceOrderController_1.remove);
exports["default"] = serviceOrderRoutes;
