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
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var FiscalController = __importStar(require("../controllers/FiscalController"));
var upload = (0, multer_1["default"])({ dest: "tmp/" });
var fiscalRoutes = (0, express_1.Router)();
fiscalRoutes.get("/fiscal/config", isAuth_1["default"], FiscalController.getConfig);
fiscalRoutes.post("/fiscal/certificate", isAuth_1["default"], upload.single("certificate"), FiscalController.uploadCertificate);
fiscalRoutes["delete"]("/fiscal/certificate", isAuth_1["default"], FiscalController.deleteCertificate);
fiscalRoutes.put("/fiscal/password", isAuth_1["default"], FiscalController.updatePassword);
exports["default"] = fiscalRoutes;
