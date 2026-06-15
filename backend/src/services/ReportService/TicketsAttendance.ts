import sequelize from "../../database/index";
import { QueryTypes } from "sequelize";

interface Return {
  data: {};
}

interface Request {
  initialDate: string;
  finalDate: string;
  companyId: number;
}

interface DataReturn {
  quantidade: number;
  data?: number;
  nome?: string;
  mediaAvaliacao?: number;
  totalAvaliacoes?: number;
}

interface dataUser {
  name: string;
}

export const TicketsAttendance = async ({ initialDate, finalDate, companyId }: Request): Promise<Return> => { 

  const sqlUsers = `select u.name from "Users" u where u."companyId" = ${companyId}`

  const users: dataUser[] = await sequelize.query(sqlUsers, { type: QueryTypes.SELECT });

  const sql = `
  select
    COUNT(DISTINCT tk.id) AS quantidade,
    u.name AS nome,
    ROUND(COALESCE(AVG(ur.rate), 0)::numeric, 2) AS "mediaAvaliacao",
    COUNT(ur.id) AS "totalAvaliacoes"
  from
    "TicketTraking" tk
    inner join "Users" u on u.id = tk."userId"
    inner join "Tickets" tt on tt.id = tk."ticketId"
    left join "UserRatings" ur on ur."ticketId" = tk."ticketId"
  where
    tk."companyId" = ${companyId}
    and tk."userId" is not null
    and tt."createdAt" >= '${initialDate} 00:00:00'
    and tt."createdAt" <= '${finalDate} 23:59:59'
  group by
    u.name
  ORDER BY
    u.name asc`

  const data: DataReturn[] = await sequelize.query(sql, { type: QueryTypes.SELECT });

  users.map(user => {
    let indexCreated = data.findIndex((item) => item.nome === user.name);

    if (indexCreated === -1) {
      data.push({ quantidade: 0, nome: user.name, mediaAvaliacao: 0, totalAvaliacoes: 0 });
    }

  })

  return { data };
}
