import { Router } from "express";
import isAuthExternal from "../../middleware/isAuthExternal";
import * as ExternalProductCategoryController from "../../controllers/api/ExternalProductCategoryController";

const externalProductCategoryRoutes = Router();

externalProductCategoryRoutes.get(
  "/product-categories",
  isAuthExternal,
  ExternalProductCategoryController.index
);

externalProductCategoryRoutes.get(
  "/product-categories/:id",
  isAuthExternal,
  ExternalProductCategoryController.show
);

externalProductCategoryRoutes.post(
  "/product-categories",
  isAuthExternal,
  ExternalProductCategoryController.store
);

externalProductCategoryRoutes.put(
  "/product-categories/:id",
  isAuthExternal,
  ExternalProductCategoryController.update
);

externalProductCategoryRoutes.delete(
  "/product-categories/:id",
  isAuthExternal,
  ExternalProductCategoryController.remove
);

export default externalProductCategoryRoutes;
