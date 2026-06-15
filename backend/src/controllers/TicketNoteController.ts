import * as Yup from "yup";
import { Request, Response } from "express";
import { Op } from "sequelize";
import AppError from "../errors/AppError";
import TicketNote from "../models/TicketNote";
import User from "../models/User";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";

import ListTicketNotesService from "../services/TicketNoteService/ListTicketNotesService";
import CreateTicketNoteService from "../services/TicketNoteService/CreateTicketNoteService";
import UpdateTicketNoteService from "../services/TicketNoteService/UpdateTicketNoteService";
import ShowTicketNoteService from "../services/TicketNoteService/ShowTicketNoteService";
import FindAllTicketNotesService from "../services/TicketNoteService/FindAllTicketNotesService";
import DeleteTicketNoteService from "../services/TicketNoteService/DeleteTicketNoteService";
import FindNotesByContactIdAndTicketId from "../services/TicketNoteService/FindNotesByContactIdAndTicketId";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

type StoreTicketNoteData = {
  note: string;
  userId: number;
  contactId: number | 0;
  ticketId: number | 0;
  id?: number | string;
  reminderAt?: string | null;
};

type UpdateTicketNoteData = {
  note: string;
  id?: number | string;
  userId?: number | 0;
  contactId?: number | 0;
  ticketId?: number | 0;
};

type QueryFilteredNotes = {
  contactId: number | string;
  ticketId: number | string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { searchParam, pageNumber } = req.query as IndexQuery;

  const { ticketNotes, count, hasMore } = await ListTicketNotesService({
    searchParam,
    pageNumber
  });

  return res.json({ ticketNotes, count, hasMore });
};

export const list = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const ticketNotes: TicketNote[] = await FindAllTicketNotesService(companyId);

  return res.status(200).json(ticketNotes);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newTicketNote: StoreTicketNoteData = req.body;
  const { id: userId, companyId } = req.user;

  const schema = Yup.object().shape({
    note: Yup.string().required()
  });

  try {
    await schema.validate(newTicketNote);
  } catch (err) {
    throw new AppError(err.message);
  }

  const ticketNote = await CreateTicketNoteService({
    ...newTicketNote,
    userId,
    companyId,
    source: "user",
    reminderAt: newTicketNote.reminderAt || null
  });

  const noteWithUser = await TicketNote.findByPk(ticketNote.id, {
    include: [{ association: "user", attributes: ["id", "name"] }]
  });

  return res.status(200).json(noteWithUser);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const ticketNote = await ShowTicketNoteService(id);

  return res.status(200).json(ticketNote);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticketNote: UpdateTicketNoteData = req.body;
  const { id: userId, profile, userType } = req.user;

  const schema = Yup.object().shape({
    note: Yup.string()
  });

  try {
    await schema.validate(ticketNote);
  } catch (err) {
    throw new AppError(err.message);
  }

  const existing = await TicketNote.findByPk(ticketNote.id);
  if (!existing) throw new AppError("Anotação não encontrada", 404);

  const isAdminOrManager = profile === "admin" || userType === "administrador" || userType === "gerente";
  const isOwner = !existing.userId || existing.userId === Number(userId);
  if (!isAdminOrManager && !isOwner) {
    throw new AppError("Você só pode editar suas próprias anotações", 403);
  }

  const recordUpdated = await UpdateTicketNoteService(ticketNote);

  return res.status(200).json(recordUpdated);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { profile, userType } = req.user;

  const isAdminOrManager = profile === "admin" || userType === "administrador" || userType === "gerente";
  if (!isAdminOrManager) {
    throw new AppError("Apenas administradores e gerentes podem excluir anotações", 403);
  }

  await DeleteTicketNoteService(id);

  return res.status(200).json({ message: "Observação removida" });
};

export const findFilteredList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { contactId, ticketId } = req.query as QueryFilteredNotes;
    const notes: TicketNote[] = await FindNotesByContactIdAndTicketId({
      contactId,
      ticketId
    });

    return res.status(200).json(notes);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const doneReminder = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;

  const note = await TicketNote.findOne({ where: { id, companyId } });
  if (!note) throw new AppError("Anotação não encontrada", 404);

  await note.update({ reminderDone: true });

  return res.status(200).json({ message: "Lembrete marcado como concluído" });
};

export const reminders = async (req: Request, res: Response): Promise<Response> => {
  const { companyId, profile, userType, id: userId } = req.user;
  const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };

  const isAdminOrManager = profile === "admin" || userType === "administrador" || userType === "gerente";

  const where: any = {
    companyId,
    reminderAt: { [Op.ne]: null },
  };

  if (startDate && endDate) {
    where.reminderAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    where.reminderAt = { [Op.gte]: new Date(startDate) };
  }

  // Notas: todos veem todas (sem filtro de userId)
  const notes = await TicketNote.findAll({
    where,
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "number"] },
      { model: Ticket, as: "ticket", attributes: ["id"] },
    ],
    order: [["reminderAt", "ASC"]],
  });

  return res.status(200).json(notes);
};
