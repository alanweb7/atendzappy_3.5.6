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
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var ApiController = __importStar(require("../controllers/ApiController"));
var tokenAuth_1 = __importDefault(require("../middleware/tokenAuth"));
var upload = (0, multer_1["default"])(upload_1["default"]);
var ApiRoutes = express_1["default"].Router();
ApiRoutes.post("/send", tokenAuth_1["default"], upload.array("medias"), ApiController.index);
// ApiRoutes.post("/send/linkPdf", tokenAuth, ApiController.indexLink);
ApiRoutes.post("/send/linkImage", tokenAuth_1["default"], ApiController.indexImage);
ApiRoutes.post("/checkNumber", tokenAuth_1["default"], ApiController.checkNumber);
// ApiRoutes.post("/send/linkVideo", tokenAuth, ApiController.indexVideo);
// ApiRoutes.post("/send/toManyText", tokenAuth, ApiController.indexToMany);
// ApiRoutes.post("/send/toManyLinkPdf", tokenAuth, ApiController.indexToManyLinkPdf);
// ApiRoutes.post("/send/toManyImage", tokenAuth, ApiController.indexToManyImage);
// retornar os whatsapp e seus status
// ApiRoutes.get("/getWhatsappsId", tokenAuth, ApiController.indexWhatsappsId);
exports["default"] = ApiRoutes;
