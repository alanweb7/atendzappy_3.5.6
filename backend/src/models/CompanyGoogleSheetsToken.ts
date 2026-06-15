import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany,
  PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt
} from "sequelize-typescript";
import Company from "./Company";
import CompanyConnectedSheet from "./CompanyConnectedSheet";

@Table({ tableName: "CompanyGoogleSheetsToken" })
class CompanyGoogleSheetsToken extends Model {
  @PrimaryKey @AutoIncrement @Column id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @HasMany(() => CompanyConnectedSheet)
  sheets: CompanyConnectedSheet[];

  @Column googleUserId: string;
  @Column email: string;
  @Column(DataType.TEXT) accessToken: string;
  @Column(DataType.TEXT) refreshToken: string;
  @Column(DataType.DATE) expiryDate: Date;

  @CreatedAt createdAt: Date;
  @UpdatedAt updatedAt: Date;
}

export default CompanyGoogleSheetsToken;
