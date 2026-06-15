import path from "path";
import multer from "multer";
import fs from "fs";
import Whatsapp from "../models/Whatsapp";
import { isEmpty, isNil } from "lodash";

const publicFolder = path.resolve(__dirname, "..", "..", "public");

export default {
  directory: publicFolder,
  fileFilter(_req: any, _file: Express.Multer.File, cb: multer.FileFilterCallback) {
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        let companyId = req.user?.companyId;

        if (!companyId) {
          const authHeader = req.headers.authorization as string | undefined;
          if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (token) {
              Whatsapp.findOne({ where: { token } })
                .then(whatsapp => {
                  companyId = whatsapp?.companyId;
                  resolveFolder(companyId);
                })
                .catch(() => resolveFolder(companyId));
              return;
            }
          }
        }

        resolveFolder(companyId);

        function resolveFolder(cId: number | undefined) {
          try {
            const { typeArch, fileId } = req.body || {};
            let folder: string;

            if (typeArch && typeArch !== "announcements" && typeArch !== "logo" && typeArch !== "terms" && typeArch !== "dashboard") {
              folder = path.resolve(publicFolder, `company${cId}`, typeArch, fileId || "");
            } else if (typeArch === "announcements") {
              folder = path.resolve(publicFolder, typeArch);
            } else if (typeArch === "logo" || typeArch === "terms" || typeArch === "dashboard") {
              folder = path.resolve(publicFolder);
            } else {
              folder = path.resolve(publicFolder, `company${cId || "unknown"}`);
            }

            if (!fs.existsSync(folder)) {
              fs.mkdirSync(folder, { recursive: true });
              fs.chmodSync(folder, 0o755);
            }
            cb(null, folder);
          } catch (err) {
            cb(err as Error, "");
          }
        }
      } catch (err) {
        cb(err as Error, "");
      }
    },
    filename(req, file, cb) {
      const { typeArch, mode } = req.body;

      let fileName;

      if (typeArch === "dashboard" && mode) {
        fileName = `dashboard-image-${mode}.png`;
      } else if (typeArch && typeArch === "announcements") {
        fileName = new Date().getTime() + '_' + file.originalname.replace('/', '-').replace(/ /g, "_");
      } else {
        fileName = file.originalname.replace('/', '-').replace(/ /g, "_");
      }

      return cb(null, fileName);
    }
  })
};
