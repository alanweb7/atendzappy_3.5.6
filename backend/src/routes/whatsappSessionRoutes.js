"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var WhatsAppSessionController_1 = __importDefault(require("../controllers/WhatsAppSessionController"));
var whatsappSessionRoutes = (0, express_1.Router)();
whatsappSessionRoutes.post("/whatsappsession/:whatsappId", isAuth_1["default"], WhatsAppSessionController_1["default"].store);
whatsappSessionRoutes.put("/whatsappsession/:whatsappId", isAuth_1["default"], WhatsAppSessionController_1["default"].update);
whatsappSessionRoutes["delete"]("/whatsappsession/:whatsappId", isAuth_1["default"], WhatsAppSessionController_1["default"].remove);
whatsappSessionRoutes["delete"]("/whatsappsession/admin/:whatsappId", isAuth_1["default"], WhatsAppSessionController_1["default"].removeadmin);
exports["default"] = whatsappSessionRoutes;
