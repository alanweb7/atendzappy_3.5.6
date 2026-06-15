import { Request, Response } from "express";
import AppError from "../errors/AppError";
import TicketTag from "../models/TicketTag";
import ContactTag from "../models/ContactTag";
import Tag from "../models/Tag";
import Ticket from "../models/Ticket";
import Contact from "../models/Contact";
import Whatsapp from "../models/Whatsapp";
import { getIO } from "../libs/socket";
import { processKanbanStageAutomation } from "../services/AutomationServices/TriggerKanbanService";
import { ExecuteTagAutoActions } from "../services/ExecuteTagAutoActionsService";
import { SendMessage } from "../helpers/SendMessage";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId, tagId } = req.params;

  try {
    // Garante que o ticket tenha no máximo UMA tag Kanban
    // @ts-ignore - métodos estáticos do Sequelize são resolvidos em runtime
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      throw new AppError("ERR_NO_TAG_FOUND", 404);
    }

    if (tag.kanban === 1) {
      // Busca todas as tags já vinculadas ao ticket
      // @ts-ignore - métodos estáticos do Sequelize são resolvidos em runtime
      const existingTicketTags = await TicketTag.findAll({ where: { ticketId } });
      const existingTagIds = existingTicketTags.map(tt => tt.tagId);

      if (existingTagIds.length) {
        // Filtra somente as tags com kanban = 1 entre as já vinculadas
        // @ts-ignore - métodos estáticos do Sequelize são resolvidos em runtime
        const existingKanbanTags = await Tag.findAll({
          where: {
            id: existingTagIds,
            kanban: 1,
          },
        });

        const existingKanbanTagIds = existingKanbanTags
          .map(t => t.id)
          // evita remover a própria tag que está sendo adicionada
          .filter(id => String(id) !== String(tagId));

        if (existingKanbanTagIds.length) {
          // @ts-ignore: Sequelize aceita array em where.tagId
          await TicketTag.destroy({ where: { ticketId, tagId: existingKanbanTagIds }, individualHooks: true });
        }
      }
    }

    // @ts-ignore: Sequelize dynamic method
    const ticketTag = await TicketTag.create({ ticketId, tagId });

    // Vincula também ao contato do ticket (evita duplicata com ignoreDuplicates)
    const ticketForContact = await Ticket.findByPk(ticketId, { attributes: ["contactId"] });
    if (ticketForContact?.contactId) {
      await ContactTag.findOrCreate({
        where: { contactId: ticketForContact.contactId, tagId }
      });
    }

    // Recarrega o ticket com tags e contact.tags para refletir no frontend
    const ticket = await Ticket.findByPk(ticketId, {
      include: [
        {
          model: Contact,
          as: "contact",
          attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
          include: ["extraInfo", "tags"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name", "color"],
        },
      ],
    });

    if (ticket) {
      const io = getIO();
      io.of(String(ticket.companyId)).emit(`company-${ticket.companyId}-ticket`, {
        action: "update",
        ticket,
      });

      if (tag.kanban === 1) {
        // 1. Mensagem de saudação configurada na tag
        if (tag.greetingMessageLane && tag.greetingMessageLane.trim() !== "") {
          try {
            const whatsapp = await Whatsapp.findByPk(ticket.whatsappId);
            if (whatsapp && ticket.contact) {
              await SendMessage(whatsapp, {
                number: ticket.contact.number,
                body: tag.greetingMessageLane,
              });
            }
          } catch (err) {
            console.error("[TicketTagController] Erro ao enviar mensagem de saudação:", err);
          }
        }

        // 2. Ações automáticas configuradas na tag (transferir, fechar, iniciar flow, etc.)
        if (tag.autoActions && Array.isArray(tag.autoActions) && tag.autoActions.length > 0) {
          try {
            await ExecuteTagAutoActions(tag.id, Number(ticketId), ticket.companyId);
          } catch (err) {
            console.error("[TicketTagController] Erro ao executar ações automáticas da tag:", err);
          }
        }

        // 3. Automações do sistema com triggerType: kanban_stage
        processKanbanStageAutomation(Number(ticketId), Number(tagId), ticket.companyId)
          .catch(err => console.error("[TicketTagController] Erro ao processar automação Kanban:", err));
      }
    }

    return res.status(201).json(ticketTag);
  } catch (error: any) {
    console.error("[TicketTagController.store] Error storing ticket tag", {
      ticketId,
      tagId,
      error: error?.message || error,
    });
    return res.status(500).json({
      error: "Failed to store ticket tag.",
      details: error?.message || String(error),
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId, tagId } = req.params;

  try {
    if (tagId) {
      // Remove somente a tag específica do ticket — não toca ContactTag
      await TicketTag.destroy({ where: { ticketId, tagId }, individualHooks: true });
    } else {
      // Sem tagId: remove apenas tags KANBAN do ticket (preserva tags normais)
      const kanbanRows = await TicketTag.findAll({
        where: { ticketId },
        include: [{ model: Tag, as: "tag", where: { kanban: 1 }, attributes: ["id"] }]
      });
      const kanbanTagIds = kanbanRows.map((r: any) => r.tagId);
      if (kanbanTagIds.length > 0) {
        await TicketTag.destroy({ where: { ticketId, tagId: kanbanTagIds }, individualHooks: true });
      }
    }

    // Recarrega o ticket para refletir remoção das tags
    const ticket = await Ticket.findByPk(ticketId, {
      include: [
        {
          model: Contact,
          as: "contact",
          attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
          include: ["extraInfo", "tags"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name", "color"],
        },
      ],
    });

    if (ticket) {
      const io = getIO();
      io.of(String(ticket.companyId)).emit(`company-${ticket.companyId}-ticket`, {
        action: "update",
        ticket,
      });
    }

    return res.status(200).json({ message: "Ticket tags removed successfully." });
  } catch (error: any) {
    console.error("[TicketTagController.remove] Error removing ticket tags", {
      ticketId,
      error: error?.message || error,
    });
    return res.status(500).json({
      error: "Failed to remove ticket tags.",
      details: error?.message || String(error),
    });
  }
};