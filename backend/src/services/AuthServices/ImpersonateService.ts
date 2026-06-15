import User from "../../models/User";
import Company from "../../models/Company";
import ImpersonationLog from "../../models/ImpersonationLog";
import AppError from "../../errors/AppError";
import { createAccessToken, createRefreshToken } from "../../helpers/CreateTokens";

interface Request {
  superUserId: number;
  superUserCompanyId: number;
  targetCompanyId: number;
  ipAddress?: string;
}

const ImpersonateService = async ({
  superUserId,
  superUserCompanyId,
  targetCompanyId,
  ipAddress
}: Request) => {
  // Só empresa 1 pode impersonar
  if (superUserCompanyId !== 1) {
    throw new AppError("Sem permissão para acessar outras empresas", 403);
  }

  // Verifica se o usuário tem super=true
  const superUser = await User.findByPk(superUserId, { attributes: ["id", "super", "companyId"] });
  if (!superUser?.super) {
    throw new AppError("Usuário não tem permissão de acesso a empresas", 403);
  }

  // Busca empresa alvo
  const targetCompany = await Company.findByPk(targetCompanyId, { attributes: ["id", "name", "status"] });
  if (!targetCompany) throw new AppError("Empresa não encontrada", 404);

  // Busca o primeiro admin da empresa alvo
  const targetUser = await User.findOne({
    where: { companyId: targetCompanyId, profile: "admin" },
    attributes: ["id", "name", "email", "profile", "companyId", "userType"],
    order: [["id", "ASC"]]
  });
  if (!targetUser) throw new AppError("Nenhum usuário admin encontrado na empresa", 404);

  // Gera tokens como se fosse o usuário alvo
  const token = createAccessToken(targetUser);
  const refreshToken = createRefreshToken(targetUser);

  // Registra auditoria
  await ImpersonationLog.create({
    superUserId,
    targetCompanyId,
    targetUserId: targetUser.id,
    ipAddress: ipAddress || null,
    startedAt: new Date()
  });

  return {
    token,
    refreshToken,
    user: {
      ...targetUser.toJSON(),
      impersonating: true,
      impersonatedBy: superUserId,
      impersonatedCompanyName: targetCompany.name
    }
  };
};

export default ImpersonateService;
