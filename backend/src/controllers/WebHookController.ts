import { Request, Response } from "express";
import Whatsapp from "../models/Whatsapp";
import { handleMessage } from "../services/FacebookServices/facebookMessageListener";
import { getWhitelabelConfig } from "../services/SettingService/WhitelabelService";

// Webhook global (retrocompatibilidade) — usa VERIFY_TOKEN do .env
export const index = async (req: Request, res: Response): Promise<Response> => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "whaticket";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
  }

  return res.status(403).json({ message: "Forbidden" });
};

// Webhook por empresa — cada empresa usa seu próprio Verify Token
export const indexCompany = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.params;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (!companyId || !mode || !token) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const config = await getWhitelabelConfig(parseInt(companyId));
    const verifyToken = config.verifyToken;

    if (mode === "subscribe" && token === verifyToken) {
      return res.status(200).send(challenge);
    }
  } catch {
    // ignore
  }

  return res.status(403).json({ message: "Forbidden" });
};

export const webHook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;
    console.log(30, "WebHookController", { body })

    if (body.object === "page" || body.object === "instagram") {
      let channel: string;

      if (body.object === "page") {
        channel = "facebook";
      } else {
        channel = "instagram";
      }

      body.entry?.forEach(async (entry: any) => {
        const getTokenPage = await Whatsapp.findOne({
          where: {
            facebookPageUserId: entry.id,
            channel
          }
        });

        if (getTokenPage) {
          entry.messaging?.forEach((data: any) => {
            handleMessage(getTokenPage, data, channel, getTokenPage.companyId);
          });
        }
      });

      return res.status(200).json({
        message: "EVENT_RECEIVED"
      });
    }

    return res.status(404).json({
      message: body
    });
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};