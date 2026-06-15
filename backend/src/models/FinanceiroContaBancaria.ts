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

@Table({ tableName: "financeiro_contas_bancarias" })
class FinanceiroContaBancaria extends Model<FinanceiroContaBancaria> {
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

  @Column({ type: DataType.STRING(100), allowNull: true })
  banco: string | null;

  @Column({ type: DataType.STRING(20), allowNull: true })
  agencia: string | null;

  @Column({ type: DataType.STRING(30), allowNull: true })
  conta: string | null;

  @Default("corrente")
  @Column(DataType.STRING(30))
  tipo: "corrente" | "poupanca" | "investimento" | "digital" | "carteira" | "cartao";

  @Default(0)
  @Column({ field: "saldo_inicial", type: DataType.DECIMAL(14, 2) })
  saldoInicial: number;

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

export default FinanceiroContaBancaria;
