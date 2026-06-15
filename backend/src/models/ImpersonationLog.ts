import { Table, Column, CreatedAt, UpdatedAt, Model, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement } from "sequelize-typescript";
import Company from "./Company";
import User from "./User";

@Table({ tableName: "ImpersonationLogs" })
class ImpersonationLog extends Model<ImpersonationLog> {
  @PrimaryKey @AutoIncrement @Column id: number;
  @ForeignKey(() => User) @Column superUserId: number;
  @BelongsTo(() => User, "superUserId") superUser: User;
  @ForeignKey(() => Company) @Column targetCompanyId: number;
  @BelongsTo(() => Company) targetCompany: Company;
  @ForeignKey(() => User) @Column targetUserId: number;
  @BelongsTo(() => User, "targetUserId") targetUser: User;
  @Column ipAddress: string;
  @Column startedAt: Date;
  @Column endedAt: Date;
  @CreatedAt createdAt: Date;
  @UpdatedAt updatedAt: Date;
}

export default ImpersonationLog;
