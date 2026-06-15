import {
  Table, Column, CreatedAt, UpdatedAt, Model,
  PrimaryKey, AutoIncrement, Default, AllowNull, ForeignKey, BelongsTo, DataType
} from "sequelize-typescript";
import Company from "./Company";
import AiCreditPackage from "./AiCreditPackage";

@Table({ tableName: "AiCreditOrders" })
class AiCreditOrder extends Model<AiCreditOrder> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @ForeignKey(() => AiCreditPackage)
  @Column
  packageId: number;

  @BelongsTo(() => AiCreditPackage)
  package: AiCreditPackage;

  @AllowNull(false)
  @Column
  credits: number;

  @AllowNull(false)
  @Column
  amountInCents: number;

  @Default("pending")
  @Column(DataType.STRING(30))
  status: string; // pending | paid | failed | cancelled

  @Column
  orderNsu: string;

  @Column
  transactionNsu: string;

  @Column
  invoiceSlug: string;

  @Column(DataType.TEXT)
  checkoutUrl: string;

  @Column
  paidAt: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default AiCreditOrder;
