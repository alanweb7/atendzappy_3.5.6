import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo,
  PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default
} from "sequelize-typescript";
import Company from "./Company";
import CompanyGoogleSheetsToken from "./CompanyGoogleSheetsToken";

@Table({ tableName: "CompanyConnectedSheets" })
class CompanyConnectedSheet extends Model {
  @PrimaryKey @AutoIncrement @Column id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @ForeignKey(() => CompanyGoogleSheetsToken)
  @Column
  tokenId: number;

  @BelongsTo(() => CompanyGoogleSheetsToken)
  token: CompanyGoogleSheetsToken;

  @Column spreadsheetId: string;
  @Column title: string;
  @Column sheetName: string;

  @Default(true)
  @Column
  active: boolean;

  @CreatedAt createdAt: Date;
  @UpdatedAt updatedAt: Date;
}

export default CompanyConnectedSheet;
