import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";
import Contact from "../models/Contact";
import AppError from "../errors/AppError";

const enrichWithUsers = async (tasks: Task[], companyId: number) => {
  const allUserIds = [...new Set(tasks.flatMap(t => t.assignedTo || []))];
  const users = allUserIds.length
    ? await User.findAll({ where: { id: allUserIds, companyId }, attributes: ["id", "name"] })
    : [];
  const userMap: Record<number, any> = {};
  users.forEach(u => { userMap[u.id] = u; });
  return tasks.map(t => ({
    ...t.toJSON(),
    assignedUsers: (t.assignedTo || []).map(id => userMap[id]).filter(Boolean),
  }));
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId, id: userId } = req.user;

  const userType = ((req.user as any).userType || "").toLowerCase();
  const isRestricted = !["administrador", "gerente", "manager", "administrator"].includes(userType);

  const allTasks = await Task.findAll({
    where: { companyId },
    include: [
      { model: User, as: "creator", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "number"] },
    ],
    order: [["createdAt", "DESC"]],
  });

  // Atendente/profissional: filtra só as tarefas onde está no assignedTo
  const filtered = isRestricted
    ? allTasks.filter(t => (t.assignedTo || []).map(Number).includes(Number(userId)))
    : allTasks;

  const enriched = await enrichWithUsers(filtered, Number(companyId));
  return res.json(enriched);
};

export const byProject = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { projectId } = req.params;
  const tasks = await Task.findAll({
    where: { companyId, projectId: Number(projectId) },
    include: [
      { model: User, as: "creator", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "number"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  const enriched = await enrichWithUsers(tasks, Number(companyId));
  return res.json(enriched);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId, id: userId } = req.user;
  const { title, description, status, priority, dueDate, progress, assignedTo, contactId, projectId } = req.body;
  if (!title) throw new AppError("Título é obrigatório", 400);
  const task = await Task.create({
    title, description,
    status: status || "todo",
    priority: priority || "medium",
    dueDate: dueDate || null,
    progress: progress || 0,
    assignedTo: Array.isArray(assignedTo) ? assignedTo.map(Number) : [],
    contactId: contactId || null,
    projectId: projectId || null,
    companyId,
    createdBy: userId,
  });
  const full = await Task.findByPk(task.id, {
    include: [
      { model: User, as: "creator", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "number"] },
    ],
  });
  const [enriched] = await enrichWithUsers([full], Number(companyId));
  return res.status(201).json(enriched);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const task = await Task.findOne({ where: { id, companyId } });
  if (!task) throw new AppError("Tarefa não encontrada", 404);
  const body = { ...req.body };
  if (body.assignedTo !== undefined) {
    body.assignedTo = Array.isArray(body.assignedTo) ? body.assignedTo.map(Number) : [];
  }
  await task.update(body);
  const full = await Task.findByPk(task.id, {
    include: [
      { model: User, as: "creator", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "number"] },
    ],
  });
  const [enriched] = await enrichWithUsers([full], Number(companyId));
  return res.json(enriched);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const task = await Task.findOne({ where: { id, companyId } });
  if (!task) throw new AppError("Tarefa não encontrada", 404);
  await task.destroy();
  return res.json({ message: "Tarefa removida" });
};
