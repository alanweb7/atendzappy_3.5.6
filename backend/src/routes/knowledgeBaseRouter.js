"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var os_1 = __importDefault(require("os"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var KnowledgeBaseController = __importStar(require("../controllers/KnowledgeBaseController"));
var upload = (0, multer_1["default"])({ dest: os_1["default"].tmpdir() });
var knowledgeBaseRoutes = (0, express_1.Router)();
knowledgeBaseRoutes.get("/knowledge-bases", isAuth_1["default"], KnowledgeBaseController.index);
knowledgeBaseRoutes.get("/knowledge-bases/:id", isAuth_1["default"], KnowledgeBaseController.show);
knowledgeBaseRoutes.post("/knowledge-bases", isAuth_1["default"], KnowledgeBaseController.store);
knowledgeBaseRoutes.put("/knowledge-bases/:id", isAuth_1["default"], KnowledgeBaseController.update);
knowledgeBaseRoutes["delete"]("/knowledge-bases/:id", isAuth_1["default"], KnowledgeBaseController.remove);
knowledgeBaseRoutes.post("/knowledge-bases/:id/items", isAuth_1["default"], upload.single("file"), KnowledgeBaseController.addItem);
knowledgeBaseRoutes.put("/knowledge-bases/:id/items/:itemId", isAuth_1["default"], upload.single("file"), KnowledgeBaseController.updateItem);
knowledgeBaseRoutes["delete"]("/knowledge-bases/:id/items/:itemId", isAuth_1["default"], KnowledgeBaseController.removeItem);
exports["default"] = knowledgeBaseRoutes;
