import {
  Table, Column, CreatedAt, UpdatedAt, Model,
  PrimaryKey, AutoIncrement, Default, AllowNull, DataType
} from "sequelize-typescript";

@Table({ tableName: "AiCreditPackages" })
class AiCreditPackage extends Model<AiCreditPackage> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  credits: number;

  @AllowNull(false)
  @Column
  priceInCents: number;

  @Default(true)
  @Column
  isActive: boolean;

  @Column(DataType.TEXT)
  description: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default AiCreditPackage;
