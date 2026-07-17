"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var EmailController_1 = require("../controllers/EmailController");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var emailRoutes = express_1["default"].Router();
emailRoutes.post("/send-crm-email", isAuth_1["default"], EmailController_1.sendCrmEmail);
exports["default"] = emailRoutes;
