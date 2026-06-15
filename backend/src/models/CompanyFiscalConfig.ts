import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo,
  PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Unique
} from "sequelize-typescript";
import Company from "./Company";

@Table({ tableName: "CompanyFiscalConfig" })
class CompanyFiscalConfig extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Unique
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @Column(DataType.STRING(500))
  certificatePath: string;

  @Column(DataType.TEXT)
  certificatePassword: string;

  @Column(DataType.DATE)
  certificateExpiry: Date;

  @Default(0)
  @Column(DataType.INTEGER)
  nfExtraCount: number;

  @Default(true)
  @Column
  isActive: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default CompanyFiscalConfig;
