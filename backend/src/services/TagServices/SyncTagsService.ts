import Tag from "../../models/Tag";
import Contact from "../../models/Contact";
import ContactTag from "../../models/ContactTag";
import TicketTag from "../../models/TicketTag";

interface Request {
  tags: Tag[];
  contactId: number;
  ticketId?: number | string;
  companyId?: number;
}

const SyncTags = async ({
  tags,
  contactId,
  ticketId
}: Request): Promise<Contact | null> => {
  const contact = await Contact.findByPk(contactId, { include: [Tag] });

  const tagIds = tags.map(t => t.id);

  // Sincroniza ContactTag (tags do contato)
  await ContactTag.destroy({ where: { contactId } });
  if (tagIds.length > 0) {
    await ContactTag.bulkCreate(tagIds.map(tagId => ({ tagId, contactId })));
  }

  // Sincroniza TicketTag (tags do ticket) quando chamado a partir de um ticket
  if (ticketId) {
    // Remove apenas as tags normais (kanban=0) do ticket, preservando as kanban
    const existingTicketTags = await TicketTag.findAll({
      where: { ticketId },
      include: [{ model: Tag, as: "tag", attributes: ["id", "kanban"] }]
    });

    const kanbanTicketTagIds = existingTicketTags
      // @ts-ignore
      .filter(tt => tt.tag?.kanban === 1)
      .map(tt => tt.tagId);

    // Remove as tags normais do ticket
    const normalTicketTagIds = existingTicketTags
      // @ts-ignore
      .filter(tt => tt.tag?.kanban !== 1)
      .map(tt => tt.tagId);

    if (normalTicketTagIds.length > 0) {
      await TicketTag.destroy({
        where: { ticketId, tagId: normalTicketTagIds },
        individualHooks: true
      });
    }

    // Adiciona as novas tags normais ao ticket
    if (tagIds.length > 0) {
      const toInsert = tagIds
        .filter(id => !kanbanTicketTagIds.includes(id))
        .map(tagId => ({ ticketId: Number(ticketId), tagId }));

      if (toInsert.length > 0) {
        await TicketTag.bulkCreate(toInsert, { ignoreDuplicates: true });
      }
    }
  }

  await contact?.reload();

  return contact;
};

export default SyncTags;
