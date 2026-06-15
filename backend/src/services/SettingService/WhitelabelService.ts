import Setting from "../../models/Setting";
import { hasAiCreditsAvailable } from "../AiCredits/AiCreditsService";

interface WhitelabelConfig {
  // Facebook (settings da empresa, sem fallback .env)
  facebookAppId?: string;
  facebookAppSecret?: string;
  facebookVerifyToken?: string;
  // Instagram (settings independentes da empresa)
  instagramAppId?: string;
  instagramAppSecret?: string;
  instagramVerifyToken?: string;
  // Google Meu Negócio
  googleMyBusinessClientId?: string;
  googleMyBusinessClientSecret?: string;
  // Infraestrutura (pode usar .env como fallback)
  backendUrl?: string;
  frontendUrl?: string;
  verifyToken?: string; // legado
  // Google Calendar
  googleClientId?: string;
  googleClientSecret?: string;
  googleRedirectUri?: string;
  // IA
  openaiApiKey?: string;
  geminiApiKey?: string;
}

const getSetting = async (companyId: number, key: string): Promise<string | null> => {
  try {
    const setting = await Setting.findOne({ where: { companyId, key } });
    return setting?.value || null;
  } catch {
    return null;
  }
};

export const getWhitelabelConfig = async (companyId: number): Promise<WhitelabelConfig> => {
  const [
    facebookAppId, facebookAppSecret, facebookVerifyToken,
    instagramAppId, instagramAppSecret, instagramVerifyToken,
    googleMyBusinessClientId, googleMyBusinessClientSecret,
    backendUrl, frontendUrl, verifyToken,
    googleClientId, googleClientSecret, googleRedirectUri,
    openaiApiKey, geminiApiKey, aiUseOwnKey
  ] = await Promise.all([
    getSetting(companyId, "facebookAppId"),
    getSetting(companyId, "facebookAppSecret"),
    getSetting(companyId, "facebookVerifyToken"),
    getSetting(companyId, "instagramAppId"),
    getSetting(companyId, "instagramAppSecret"),
    getSetting(companyId, "instagramVerifyToken"),
    getSetting(companyId, "googleMyBusinessClientId"),
    getSetting(companyId, "googleMyBusinessClientSecret"),
    getSetting(companyId, "backendUrl"),
    getSetting(companyId, "frontendUrl"),
    getSetting(companyId, "verifyToken"),  // legado
    getSetting(companyId, "googleClientId"),
    getSetting(companyId, "googleClientSecret"),
    getSetting(companyId, "googleRedirectUri"),
    getSetting(companyId, "openaiApiKey"),
    getSetting(companyId, "geminiApiKey"),
    getSetting(companyId, "aiUseOwnKey"),
  ]);

  return {
    // Facebook — SEM fallback .env. Empresa DEVE configurar no modal.
    facebookAppId: facebookAppId || undefined,
    facebookAppSecret: facebookAppSecret || undefined,
    facebookVerifyToken: facebookVerifyToken || verifyToken || undefined,
    // Instagram — SEM fallback .env. Empresa DEVE configurar no modal.
    instagramAppId: instagramAppId || undefined,
    instagramAppSecret: instagramAppSecret || undefined,
    instagramVerifyToken: instagramVerifyToken || undefined,
    // Google Meu Negócio — SEM fallback .env
    googleMyBusinessClientId: googleMyBusinessClientId || undefined,
    googleMyBusinessClientSecret: googleMyBusinessClientSecret || undefined,
    // Infraestrutura — usa .env como fallback (correto)
    backendUrl: backendUrl || process.env.BACKEND_URL,
    frontendUrl: frontendUrl || process.env.FRONTEND_URL,
    verifyToken: verifyToken || undefined,
    // Google
    googleClientId: googleClientId || process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: googleRedirectUri || process.env.GOOGLE_REDIRECT_URI,
    // IA: empresa escolhe o modo via aiUseOwnKey
    // "own" = usa chave própria configurada (sem consumir créditos do plano)
    // "system" (padrão) = usa chave global do sistema, consumindo créditos do plano
    openaiApiKey: aiUseOwnKey === "own"
      ? (openaiApiKey || undefined)
      : (openaiApiKey || (await (async () => {
          if (!process.env.OPENAI_API_KEY) return undefined;
          const ok = await hasAiCreditsAvailable(companyId);
          return ok ? process.env.OPENAI_API_KEY : undefined;
        })())),
    geminiApiKey: aiUseOwnKey === "own"
      ? (geminiApiKey || undefined)
      : (geminiApiKey || (await (async () => {
          if (!process.env.GEMINI_API_KEY) return undefined;
          const ok = await hasAiCreditsAvailable(companyId);
          return ok ? process.env.GEMINI_API_KEY : undefined;
        })())),
  };
};

export const getWhitelabelSettingByKey = async (companyId: number, key: keyof WhitelabelConfig): Promise<string> => {
  const config = await getWhitelabelConfig(companyId);
  return (config[key] as string) || "";
};
