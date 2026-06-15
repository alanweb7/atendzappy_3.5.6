import {
  Table, Column, CreatedAt, UpdatedAt, Model,
  PrimaryKey, ForeignKey, BelongsTo, AutoIncrement, Default
} from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import Company from "./Company";
import User from "./User";
import Contact from "./Contact";
import Project from "./Project";

@Table({ tableName: "Tasks" })
class Task extends Model<Task> {
  @PrimaryKey @AutoIncrement @Column id: number;
  @Column title: string;
  @Column description: string;
  @Default("todo") @Column status: string;
  @Default("medium") @Column priority: string;
  @Column dueDate: Date;
  @Default(0) @Column progress: number;

  // Array de IDs de usuários responsáveis
  @Default([]) @Column(DataType.ARRAY(DataType.INTEGER)) assignedTo: number[];

  @ForeignKey(() => Contact) @Column contactId: number;
  @BelongsTo(() => Contact) contact: Contact;

  @ForeignKey(() => Project) @Column projectId: number;
  @BelongsTo(() => Project) project: Project;

  @ForeignKey(() => Company) @Column companyId: number;
  @BelongsTo(() => Company) company: Company;

  @ForeignKey(() => User) @Column createdBy: number;
  @BelongsTo(() => User, "createdBy") creator: User;

  @CreatedAt createdAt: Date;
  @UpdatedAt updatedAt: Date;
}

export default Task;
