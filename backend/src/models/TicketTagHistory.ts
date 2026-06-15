import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  Default
} from "sequelize-typescript";

import Ticket from "./Ticket";
import Tag from "./Tag";
import User from "./User";
import Company from "./Company";

@Table({ tableName: "TicketTagHistory" })
class TicketTagHistory extends Model<TicketTagHistory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Ticket)
  @Column
  ticketId: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @BelongsTo(() => Tag)
  tag: Tag;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Default("added")
  @Column
  action: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default TicketTagHistory;
