import { Router } from "express";
import multer from "multer";
import isAuth from "../middleware/isAuth";
import * as FiscalController from "../controllers/FiscalController";

const upload = multer({ dest: "tmp/" });
const fiscalRoutes = Router();

fiscalRoutes.get("/fiscal/config", isAuth, FiscalController.getConfig);
fiscalRoutes.post("/fiscal/certificate", isAuth, upload.single("certificate"), FiscalController.uploadCertificate);
fiscalRoutes.delete("/fiscal/certificate", isAuth, FiscalController.deleteCertificate);
fiscalRoutes.put("/fiscal/password", isAuth, FiscalController.updatePassword);

export default fiscalRoutes;
