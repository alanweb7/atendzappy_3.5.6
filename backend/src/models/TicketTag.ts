import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  ForeignKey,
  BelongsTo,
  BeforeDestroy,
  AfterCreate,
  AfterDestroy,
  PrimaryKey
} from "sequelize-typescript";
import Tag from "./Tag";
import Ticket from "./Ticket";
import TicketTagHistory from "./TicketTagHistory";

@Table({
  tableName: 'TicketTags'
})
class TicketTag extends Model<TicketTag> {
  @PrimaryKey
  @ForeignKey(() => Ticket)
  @Column
  ticketId: number;

  @PrimaryKey
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @BelongsTo(() => Tag)
  tag: Tag;

  // KANBAN FIX: Bloquear remoção de tags de tickets encerrados
  @BeforeDestroy
  static async preventDeleteOnClosedTickets(instance: TicketTag) {
    const ticket = await Ticket.findByPk(instance.ticketId);
    if (ticket && ticket.status === "closed") {
      console.log(`🔴 KANBAN FIX: Bloqueando remoção de tag ${instance.tagId} do ticket ${instance.ticketId} - ticket está encerrado`);
      throw new Error("Não é permitido remover tags de tickets encerrados");
    }
  }

  @AfterCreate
  static async logAdded(instance: TicketTag) {
    try {
      const ticket = await Ticket.findByPk(instance.ticketId, { attributes: ["companyId"] });
      await TicketTagHistory.create({
        ticketId: instance.ticketId,
        tagId: instance.tagId,
        companyId: ticket?.companyId ?? null,
        action: "added"
      });
    } catch {
      // falha silenciosa — não pode bloquear o fluxo principal
    }
  }

  @AfterDestroy
  static async logRemoved(instance: TicketTag) {
    try {
      const ticket = await Ticket.findByPk(instance.ticketId, { attributes: ["companyId"] });
      await TicketTagHistory.create({
        ticketId: instance.ticketId,
        tagId: instance.tagId,
        companyId: ticket?.companyId ?? null,
        action: "removed"
      });
    } catch {
      // falha silenciosa
    }
  }
}

export default TicketTag;
