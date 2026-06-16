import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as CompanyPaymentSettingsController from "../controllers/CompanyPaymentSettingsController";

const paymentSettingRoutes = Router();

paymentSettingRoutes.get(
  "/payment-settings",
  isAuth,
  CompanyPaymentSettingsController.index
);

// Rotas específicas devem vir ANTES de rotas genéricas
paymentSettingRoutes.post(
  "/payment-settings/test-connection/:provider",
  isAuth,
  CompanyPaymentSettingsController.testConnection
);

paymentSettingRoutes.post(
  "/payment-settings",
  isAuth,
  CompanyPaymentSettingsController.upsert
);

paymentSettingRoutes.put(
  "/payment-settings/:id",
  isAuth,
  CompanyPaymentSettingsController.upsert
);

paymentSettingRoutes.delete(
  "/payment-settings/:id",
  isAuth,
  CompanyPaymentSettingsController.remove
);

export default paymentSettingRoutes;
