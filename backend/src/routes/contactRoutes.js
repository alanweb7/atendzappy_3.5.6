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
// @ts-nocheck
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var upload_1 = __importDefault(require("../config/upload"));
var ContactController = __importStar(require("../controllers/ContactController"));
var ImportPhoneContactsController = __importStar(require("../controllers/ImportPhoneContactsController"));
var GoogleMapsScrapeController = __importStar(require("../controllers/GoogleMapsScrapeController"));
var contactRoutes = express_1["default"].Router();
var upload = (0, multer_1["default"])(upload_1["default"]);
contactRoutes.post("/contacts/import", isAuth_1["default"], ImportPhoneContactsController.store);
contactRoutes.post("/contactsImport", isAuth_1["default"], ContactController.importXls);
contactRoutes.get("/contacts", isAuth_1["default"], ContactController.index);
contactRoutes.get("/contacts/list", isAuth_1["default"], ContactController.list);
contactRoutes.get("/contacts/:contactId", isAuth_1["default"], ContactController.show);
contactRoutes.post("/contacts", isAuth_1["default"], ContactController.store);
contactRoutes.put("/contacts/:contactId", isAuth_1["default"], ContactController.update);
contactRoutes["delete"]("/contacts/:contactId", isAuth_1["default"], ContactController.remove);
contactRoutes.put("/contacts/toggleAcceptAudio/:contactId", isAuth_1["default"], ContactController.toggleAcceptAudio);
contactRoutes.get("/contacts", isAuth_1["default"], ContactController.getContactVcard);
contactRoutes.get("/contacts/profile/:number", isAuth_1["default"], ContactController.getContactProfileURL);
contactRoutes.put("/contacts/block/:contactId", isAuth_1["default"], ContactController.blockUnblock);
contactRoutes.post("/contacts/upload", isAuth_1["default"], upload.array("file"), ContactController.upload);
contactRoutes.post("/contacts/:contactId/files", isAuth_1["default"], upload.array("files"), ContactController.uploadContactFiles);
contactRoutes["delete"]("/contacts/:contactId/files", isAuth_1["default"], ContactController.deleteContactFile);
contactRoutes.get("/contactTags/:contactId", isAuth_1["default"], ContactController.getContactTags);
contactRoutes.put("/contacts/toggleDisableBot/:contactId", isAuth_1["default"], ContactController.toggleDisableBot);
contactRoutes.put("/contact-wallet/:contactId", isAuth_1["default"], ContactController.updateContactWallet);
// contactRoutes.get("/contacts/list-whatsapp", isAuth, ContactController.listWhatsapp);
contactRoutes.post("/contacts/google-maps-scrape", isAuth_1["default"], GoogleMapsScrapeController.startScrape);
contactRoutes.get("/contacts/google-maps-scrape/:jobId", isAuth_1["default"], GoogleMapsScrapeController.getScrapeStatus);
contactRoutes.get("/contacts/google-maps-scrape/:jobId/csv", isAuth_1["default"], GoogleMapsScrapeController.downloadScrapeCsv);
contactRoutes.post("/contacts/google-maps-scrape/:jobId/create-list", isAuth_1["default"], GoogleMapsScrapeController.createListFromScrape);
exports["default"] = contactRoutes;
