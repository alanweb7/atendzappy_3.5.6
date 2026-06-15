import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Default,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";
import Company from "./Company";

@Table({ tableName: "financeiro_centros_custo" })
class FinanceiroCentroCusto extends Model<FinanceiroCentroCusto> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Column({ field: "company_id", type: DataType.BIGINT })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @Column(DataType.STRING(100))
  nome: string;

  @Column({ type: DataType.STRING(30), allowNull: true })
  codigo: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  descricao: string | null;

  @Default(true)
  @Column(DataType.BOOLEAN)
  ativo: boolean;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}

export default FinanceiroCentroCusto;
