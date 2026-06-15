import Whatsapp from "../../models/Whatsapp";
import Contact from "../../models/Contact";
import CreateMessageService from "../MessageServices/CreateMessageService";
import { buildGraphClient, extractGraphError } from "../WhatsappCoexistence/graphApiHelper";
import fileType from "file-type";
import mime from "mime-types";
import { rename, unlink } from "fs/promises";
import { createReadStream, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { exec } from "child_process";
import FormData from "form-data";
import AppError from "../../errors/AppError";

// Limites de tamanho por tipo (bytes) — conforme documentação Meta Cloud API
const META_SIZE_LIMITS: Record<string, number> = {
  image:    5 * 1024 * 1024,   //   5 MB
  video:   16 * 1024 * 1024,   //  16 MB
  audio:   16 * 1024 * 1024,   //  16 MB
  document: 100 * 1024 * 1024  // 100 MB
};

const ffmpegPath = require("@ffmpeg-installer/ffmpeg");

// Transcodifica vídeo para H.264 Baseline/AAC — formato exigido pela Meta Cloud API
// profile:v baseline + bf=0 evita B-frames que quebram o WhatsApp Android
// scale: limita a 720p para reduzir tamanho e tempo de encode
// Timeout dinâmico: 30s por MB do arquivo de entrada (mínimo 120s)
const transcodeVideoH264 = (inputPath: string, fileSizeBytes: number): Promise<string> => {
  const outputPath = inputPath.replace(/\.[^.]+$/, `_h264_${Date.now()}.mp4`);
  const timeoutMs = Math.max(120000, Math.ceil(fileSizeBytes / 1e6) * 30000);
  return new Promise((resolve, reject) => {
    exec(
      `${ffmpegPath.path} -y -i "${inputPath}" -vf "scale=if(gt(iw\\,1280)\\,1280\\,-2):if(gt(ih\\,720)\\,720\\,-2)" -c:v libx264 -profile:v baseline -bf 0 -preset ultrafast -crf 28 -maxrate 2M -bufsize 4M -c:a aac -b:a 96k -movflags +faststart "${outputPath}"`,
      { timeout: timeoutMs },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(outputPath);
        }
      }
    );
  });
};

const verifyExtensionFile = async (media: Express.Multer.File) => {
	const resultFile = await fileType.fromFile(media.path);
	const havePoint = media.filename.includes(".");
	const actualExtension = media.filename.split(".").pop();
	const extension = resultFile?.ext || havePoint ? actualExtension : "withoutExtension";

	let newFilename = media.filename;

	if (actualExtension && actualExtension !== extension && havePoint) {
		newFilename = media.filename.replace(actualExtension, extension);
		const newPath = join(media.destination, newFilename);
		await rename(media.path, newPath);
	} else if (!havePoint) {
		newFilename = `${media.filename}.${extension}`;
		const newPath = join(media.destination, newFilename);
		await rename(media.path, newPath);
	}

	media.filename = newFilename;
	media.originalname = newFilename;
};

// Mapeia mimetype para o tipo aceito pela Graph API
const resolveMediaType = (mimetype: string): string => {
  const [main] = mimetype.split("/");
  if (main === "image") return "image";
  if (main === "video") return "video";
  if (main === "audio") return "audio";
  return "document"; // application/pdf, etc.
};

interface SendMediaOfficialParams {
  media: Express.Multer.File;
  body: string;
  ticketId: number;
  contact: Contact;
  connection: Whatsapp;
  passVerification?: boolean;
  quotedMsgWid?: string;
  quotedMsgId?: number;
}

export const SendMediaOfficialService = async ({
  media,
  body,
  ticketId,
  contact,
  connection,
  passVerification = false,
  quotedMsgWid,
  quotedMsgId
}: SendMediaOfficialParams) => {
  if (!passVerification) await verifyExtensionFile(media);

  if (!connection.coexistencePhoneNumberId || !connection.coexistencePermanentToken) {
    throw new Error("ERR_OFFICIAL_MISSING_CREDENTIALS");
  }

  const client = buildGraphClient(connection.coexistencePermanentToken);

  // Upload da mídia via multipart/form-data
  // O campo "type" no endpoint de UPLOAD exige o MIME type completo (ex: "video/mp4").
  // Usa fileType.fromFile para detectar o MIME pelos bytes reais do arquivo —
  // mais confiável que o MIME reportado pelo browser (que pode ser "text/html").
  const detectedType = await fileType.fromFile(media.path);
  const safeMimetype: string =
    detectedType?.mime ||                                                             // 1. bytes reais
    (mime.lookup(media.filename) as string | false || undefined) ||                  // 2. extensão do arquivo
    (media.mimetype && media.mimetype !== "text/html" ? media.mimetype : undefined) || // 3. browser (exceto text/html)
    "application/octet-stream";                                                       // 4. fallback

  // Rejeita se o arquivo tem conteúdo HTML (upload corrompido ou erro de proxy)
  if (safeMimetype === "text/html" || safeMimetype === "application/octet-stream") {
    const firstBytes = await new Promise<string>(resolve => {
      const chunks: Uint8Array[] = [];
      const stream = createReadStream(media.path, { start: 0, end: 19 });
      stream.on("data", c => chunks.push(c as Uint8Array));
      stream.on("end", () => resolve(Buffer.from(chunks.reduce((acc, c) => { const b = Buffer.from(c); return Buffer.concat([acc, b]); }, Buffer.alloc(0))).toString("utf8").toLowerCase()));
      stream.on("error", () => resolve(""));
    });
    if (firstBytes.includes("<html") || firstBytes.includes("<!doc")) {
      throw new Error("ERR_OFFICIAL_INVALID_FILE: arquivo corrompido ou tipo não suportado");
    }
  }

  let mediaType = resolveMediaType(safeMimetype);

  // Validar tamanho do arquivo conforme limites da Meta Cloud API
  const fileSize = statSync(media.path).size;
  const sizeLimit = META_SIZE_LIMITS[mediaType] ?? META_SIZE_LIMITS.document;
  if (fileSize > sizeLimit) {
    const limitMB = sizeLimit / (1024 * 1024);
    const fileMB = (fileSize / (1024 * 1024)).toFixed(1);
    throw new AppError(
      `Arquivo muito grande (${fileMB}MB). O limite da API oficial do WhatsApp para ${mediaType} é ${limitMB}MB.`,
      400
    );
  }

  // Para vídeo: transcodar para H.264 Baseline/AAC (codec exigido pela Meta)
  // profile baseline + bf=0 garantem compatibilidade com WhatsApp Android
  let uploadPath = media.path;
  let tempTranscodedPath: string | null = null;
  let uploadMimetype = safeMimetype;

  if (mediaType === "video") {
    try {
      console.log("[WhatsAppOfficial][SendMediaOfficial] Transcodando vídeo para H.264 Baseline...");
      tempTranscodedPath = await transcodeVideoH264(media.path, fileSize);
      uploadPath = tempTranscodedPath;
      uploadMimetype = "video/mp4";
      mediaType = "video";
      console.log("[WhatsAppOfficial][SendMediaOfficial] Transcodação concluída:", tempTranscodedPath);
    } catch (err: any) {
      console.warn("[WhatsAppOfficial][SendMediaOfficial] Transcodação falhou, usando original:", err.message);
    }
  }

  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", uploadMimetype);
  form.append("file", createReadStream(uploadPath), {
    filename: media.filename,
    contentType: safeMimetype
  });

  let mediaId: string;
  try {
    const uploadRes = await client.post(
      `${connection.coexistencePhoneNumberId}/media`,
      form,
      { headers: form.getHeaders() }
    );
    mediaId = uploadRes.data.id;
    if (!mediaId) throw new Error("ERR_OFFICIAL_NO_MEDIA_ID");
  } catch (error) {
    // Limpar arquivo transcodado em caso de erro
    if (tempTranscodedPath && existsSync(tempTranscodedPath)) {
      unlink(tempTranscodedPath).catch(() => {});
    }
    const graphError = extractGraphError(error);
    console.error("[WhatsAppOfficial][SendMediaOfficial] upload error", { message: graphError });
    throw new Error(`ERR_OFFICIAL_MEDIA_UPLOAD: ${graphError}`);
  }

  // Limpar arquivo transcodado após upload bem-sucedido
  if (tempTranscodedPath && existsSync(tempTranscodedPath)) {
    unlink(tempTranscodedPath).catch(() => {});
  }

  // Meta Cloud API exige apenas dígitos no campo "to" (sem +, espaços ou traços)
  const toNumber = contact.number.replace(/\D/g, "");
  if (!toNumber) {
    throw new Error("ERR_OFFICIAL_INVALID_NUMBER");
  }

  const messagePayload: any = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toNumber,
    type: mediaType,
    [mediaType]: { id: mediaId }
  };

  if (quotedMsgWid) {
    messagePayload.context = { message_id: quotedMsgWid };
  }

  if (body && (mediaType === "image" || mediaType === "video" || mediaType === "document")) {
    messagePayload[mediaType].caption = body;
  }

  if (mediaType === "document") {
    messagePayload[mediaType].filename = media.originalname || media.filename;
  }

  try {
    const response = await client.post(
      `${connection.coexistencePhoneNumberId}/messages`,
      messagePayload
    );

    const messageId = response.data?.messages?.[0]?.id;
    if (!messageId) throw new Error("ERR_OFFICIAL_NO_MESSAGE_ID");

    const newMessage = await CreateMessageService({
      messageData: {
        wid: messageId,
        ticketId,
        contactId: contact.id,
        body,
        fromMe: true,
        read: true,
        mediaType,
        mediaUrl: media.filename,
        ...(quotedMsgId && { quotedMsgId })
      } as any,
      companyId: connection.companyId
    });

    return newMessage;
  } catch (error) {
    const graphError = extractGraphError(error);
    console.error("[WhatsAppOfficial][SendMediaOfficial] send error", { message: graphError });
    throw new Error(`ERR_OFFICIAL_SEND_MEDIA: ${graphError}`);
  }
};
