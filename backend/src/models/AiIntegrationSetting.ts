import {
  Table, Column, CreatedAt, UpdatedAt, Model,
  PrimaryKey, ForeignKey, BelongsTo, AutoIncrement, Default, Unique
} from "sequelize-typescript";
import Company from "./Company";

@Table({ tableName: "ai_integration_settings" })
class AiIntegrationSetting extends Model<AiIntegrationSetting> {
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
  provider: string;

  @Column
  apiKey: string;

  @Default(true)
  @Column
  active: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default AiIntegrationSetting;
