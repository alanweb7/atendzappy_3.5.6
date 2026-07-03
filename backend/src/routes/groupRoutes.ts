import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as GroupController from "../controllers/GroupController";

const groupRoutes = Router();

groupRoutes.get("/groups", isAuth, GroupController.index);
groupRoutes.delete("/groups/:contactId", isAuth, GroupController.deleteGroup);

export default groupRoutes;
