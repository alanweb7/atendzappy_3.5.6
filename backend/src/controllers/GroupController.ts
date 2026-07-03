import { Request, Response } from "express";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";
import Message from "../models/Message";
import TicketTraking from "../models/TicketTraking";
import TicketTag from "../models/TicketTag";
import TicketNote from "../models/TicketNote";
import Whatsapp from "../models/Whatsapp";
import AppError from "../errors/AppError";
import { Op } from "sequelize";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  try {
    console.log("🔍 [GroupController] Buscando grupos da empresa:", companyId);
    
    // Busca todos os contatos que são grupos da empresa
    const groups = await Contact.findAll({
      where: {
        companyId,
        isGroup: true
      },
      include: [
        {
          model: Whatsapp,
          as: "whatsapp",
          attributes: ["id", "name", "status"]
        }
      ],
      order: [["name", "ASC"]],
      attributes: [
        "id",
        "name",
        "number",
        "profilePicUrl",
        "isGroup",
        "whatsappId",
        "createdAt",
        "updatedAt"
      ]
    });

    console.log(`✅ [GroupController] Encontrados ${groups.length} grupos`);

    // Formata os dados para o frontend
    const formattedGroups = groups.map(group => ({
      id: group.id,
      name: group.name,
      number: group.number,
      profilePicUrl: group.profilePicUrl,
      whatsappId: group.whatsappId,
      whatsappName: group.whatsapp?.name || "—",
      whatsappStatus: group.whatsapp?.status || "DISCONNECTED",
      isActive: group.whatsapp?.status === "CONNECTED",
      participants: 0, // Pode ser implementado futuramente
      createdAt: group.createdAt,
      updatedAt: group.updatedAt
    }));

    console.log(`📤 [GroupController] Retornando ${formattedGroups.length} grupos formatados`);

    return res.json({
      groups: formattedGroups,
      count: formattedGroups.length
    });
  } catch (error) {
    console.error("❌ [GroupController] Error fetching groups:", error);
    return res.status(500).json({ error: "Error fetching groups" });
  }
};

export const deleteGroup = async (req: Request, res: Response): Promise<Response> => {
  const { companyId, userType } = req.user;
  const { contactId } = req.params;

  if (userType !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const contact = await Contact.findOne({
    where: { id: contactId, companyId, isGroup: true }
  });

  if (!contact) {
    throw new AppError("ERR_NO_GROUP_FOUND", 404);
  }

  // Buscar todos os tickets deste grupo
  const tickets = await Ticket.findAll({
    where: { contactId: contact.id, companyId }
  });

  for (const ticket of tickets) {
    await (Message as any).destroy({ where: { ticketId: ticket.id } });
    await (TicketTraking as any).destroy({ where: { ticketId: ticket.id } });
    await (TicketTag as any).destroy({ where: { ticketId: ticket.id } });
    await (TicketNote as any).destroy({ where: { ticketId: ticket.id } });
    await ticket.destroy();
  }

  await contact.destroy();

  return res.status(200).json({ message: "Grupo e conversas removidos com sucesso." });
};
