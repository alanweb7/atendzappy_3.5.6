import { Table, Column, CreatedAt, UpdatedAt, Model, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement, Default } from "sequelize-typescript";
import Company from "./Company";

@Table({ tableName: "EmailAccounts" })
class EmailAccount extends Model<EmailAccount> {
  @PrimaryKey @AutoIncrement @Column id: number;
  @Column name: string;
  @Column email: string;
  @Column imapHost: string;
  @Default(993) @Column imapPort: number;
  @Default(true) @Column imapSecure: boolean;
  @Column smtpHost: string;
  @Default(465) @Column smtpPort: number;
  @Default(true) @Column smtpSecure: boolean;
  @Column password: string;
  @Default("DISCONNECTED") @Column status: string;
  @Default(false) @Column isDefault: boolean;
  @ForeignKey(() => Company) @Column companyId: number;
  @BelongsTo(() => Company) company: Company;
  @CreatedAt createdAt: Date;
  @UpdatedAt updatedAt: Date;
}

export default EmailAccount;
