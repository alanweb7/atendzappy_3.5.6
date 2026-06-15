import { Op } from "sequelize";
import Appointment from "../../models/Appointment";
import UserSchedule from "../../models/UserSchedule";
import User from "../../models/User";
import Servico from "../../models/Servico";
import CrmClient from "../../models/CrmClient";
import Contact from "../../models/Contact";

interface ListAppointmentsQuery {
  companyId: number;
  userId?: number;
  profile?: string;
  userType?: string;
  scheduleId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  pageNumber?: string;
}

interface ListAppointmentsResponse {
  appointments: Appointment[];
  count: number;
  hasMore: boolean;
}

const ListAppointmentsService = async ({
  companyId,
  userId,
  profile,
  userType,
  scheduleId,
  status,
  startDate,
  endDate,
  pageNumber = "1"
}: ListAppointmentsQuery): Promise<ListAppointmentsResponse> => {
  const where: any = { companyId };

  const normalizedUserType = (userType || "").toLowerCase();
  const normalizedProfile = (profile || "").toLowerCase();
  // Admin/gerente por userType OU por profile — suporta todos os tipos de usuários admin
  const canViewAllSchedules =
    ["administrador", "gerente", "admin", "manager", "administrator"].includes(normalizedUserType)
    || normalizedProfile === "admin";
  const shouldRestrictByUser = !canViewAllSchedules;

  // Se não for admin/gerente, filtra apenas compromissos das agendas do próprio usuário
  if (shouldRestrictByUser && userId) {
    const userSchedules = await UserSchedule.findAll({
      where: { userId, companyId },
      attributes: ["id"]
    });
    const scheduleIds = userSchedules.map(s => s.id);

    // Sempre restringe ao scheduleId do próprio usuário — mesmo se a lista for vazia
    where.scheduleId = scheduleIds.length > 0
      ? { [Op.in]: scheduleIds }
      : -1; // força retorno vazio se não tiver agenda

  } else if (scheduleId) {
    // Admin pode ver qualquer agenda
    where.scheduleId = scheduleId;
  }

  if (status) {
    where.status = status;
  }

  if (startDate && endDate) {
    where.startDatetime = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  } else if (startDate) {
    where.startDatetime = {
      [Op.gte]: new Date(startDate)
    };
  } else if (endDate) {
    where.startDatetime = {
      [Op.lte]: new Date(endDate)
    };
  }

  const limit = 50;
  const offset = limit * (Number(pageNumber) - 1);

  const { rows, count } = await Appointment.findAndCountAll({
    where,
    include: [
      {
        model: UserSchedule,
        as: "schedule",
        ...(shouldRestrictByUser && userId ? { where: { userId } } : {}),
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"]
          }
        ]
      },
      {
        model: Servico,
        as: "service",
        attributes: ["id", "nome", "valorOriginal", "tempoAtendimento", "imagem"]
      },
      {
        model: CrmClient,
        as: "client",
        attributes: ["id", "name", "email", "phone"]
      },
      {
        model: Contact,
        as: "contact",
        attributes: ["id", "name", "number"]
      }
    ],
    limit,
    offset,
    order: [["startDatetime", "ASC"]]
  });

  return {
    appointments: rows,
    count,
    hasMore: count > offset + rows.length
  };
};

export default ListAppointmentsService;
