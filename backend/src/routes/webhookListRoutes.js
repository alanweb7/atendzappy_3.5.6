"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var WebhookListController_1 = require("../controllers/WebhookListController");
var router = (0, express_1.Router)();
router.get("/webhooks", isAuth_1["default"], WebhookListController_1.list);
exports["default"] = router;
