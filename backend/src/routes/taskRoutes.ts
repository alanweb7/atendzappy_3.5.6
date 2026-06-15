import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as TaskController from "../controllers/TaskController";

const taskRoutes = Router();

taskRoutes.get("/tasks", isAuth, TaskController.index);
taskRoutes.get("/tasks/project/:projectId", isAuth, TaskController.byProject);
taskRoutes.post("/tasks", isAuth, TaskController.store);
taskRoutes.put("/tasks/:id", isAuth, TaskController.update);
taskRoutes.delete("/tasks/:id", isAuth, TaskController.remove);

export default taskRoutes;
