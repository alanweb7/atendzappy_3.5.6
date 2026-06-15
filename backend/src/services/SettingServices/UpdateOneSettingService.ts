import AppError from "../../errors/AppError";
import Setting from "../../models/Setting";

interface Request {
  key: string;
  value: string;
  companyId?: number;
}

const UpdateOneSettingService = async ({
  key,
  value,
  companyId
}: Request): Promise<Setting | undefined> => {
  const where: any = { key };
  if (companyId) where.companyId = companyId;

  const [setting] = await Setting.findOrCreate({
    where,
    defaults: { key, value, companyId }
  });

  if (!setting) {
    throw new AppError("ERR_NO_SETTING_FOUND", 404);
  }

  await setting.update({ value });

  return setting;
};

export default UpdateOneSettingService;
