import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import Company from "./Company";

@Table({ tableName: "GoogleBusinessAccounts" })
class GoogleBusinessAccount extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @Column
  name: string;

  @Column
  accountId: string;

  @Column
  locationId: string;

  @Column
  locationName: string;

  @Column(DataType.TEXT)
  accessToken: string;

  @Column(DataType.TEXT)
  refreshToken: string;

  @Column(DataType.DATE)
  tokenExpiry: Date;

  @Column({ defaultValue: "CONNECTED" })
  status: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default GoogleBusinessAccount;
