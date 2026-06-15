import {
  Table, Column, CreatedAt, UpdatedAt, Model,
  PrimaryKey, AutoIncrement, Default, ForeignKey, Unique, DataType
} from "sequelize-typescript";
import Company from "./Company";

@Table({ tableName: "AiCreditsUsage" })
class AiCreditsUsage extends Model<AiCreditsUsage> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @Column(DataType.STRING(7)) // YYYY-MM
  period: string;

  @Default(0)
  @Column
  tokensUsed: number;

  @Default(0)
  @Column
  extraCredits: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default AiCreditsUsage;
