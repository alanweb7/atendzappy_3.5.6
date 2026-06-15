import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import Whatsapp from "../models/Whatsapp";
import { getPageProfile, getAccessTokenFromPage, subscribeApp } from "../services/FacebookServices/graphAPI";
import ShowCompanyService from "../services/CompanyService/ShowCompanyService";
import ShowPlanService from "../services/PlanService/ShowPlanService";
import { getWhitelabelConfig } from "../services/SettingService/WhitelabelService";

export const facebookCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const frontendUrl = process.env.FRONTEND_URL;
  try {
    const { code, state, error, error_code } = req.query as any;

    // Facebook enviou erro (URI bloqueada, usuário cancelou, etc.)
    if (error || error_code) {
      console.warn("Facebook OAuth retornou erro:", error || error_code);
      res.redirect(`${frontendUrl}/canais?error=facebook-oauth-denied`);
      return;
    }

    if (!code || typeof code !== "string") {
      res.redirect(`${frontendUrl}/canais?error=facebook-missing-code`);
      return;
    }

    if (!state || typeof state !== "string") {
      res.redirect(`${frontendUrl}/canais?error=facebook-missing-state`);
      return;
    }

    const companyId = state;
    
    // Verificar se empresa existe e tem plano ativo
    const company = await ShowCompanyService(companyId);
    const plan = await ShowPlanService(company.planId);

    if (!plan.useFacebook) {
      res.status(400).json({ error: "Empresa não possui permissão para Facebook" });
      return;
    }

    // Trocar code por access token — usa credenciais da empresa (não do .env global)
    const config = await getWhitelabelConfig(parseInt(companyId));
    const facebookAppId = config.facebookAppId;
    const facebookAppSecret = config.facebookAppSecret;

    if (!facebookAppId || !facebookAppSecret) {
      res.redirect(`${config.frontendUrl || process.env.FRONTEND_URL}/canais?error=facebook-not-configured`);
      return;
    }

    // IMPORTANTE: redirect_uri deve ser EXATAMENTE igual ao usado no OAuth (backend URL)
    const backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
    const redirectUri = `${backendUrl}/facebook-callback`;

    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${facebookAppId}&client_secret=${facebookAppSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`
    );
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error("Erro ao obter access token:", tokenData);
      res.status(400).json({ error: "Erro ao obter token de acesso" });
      return;
    }

    const userToken = tokenData.access_token;

    // Obter páginas do usuário
    const pages = await getPageProfile(tokenData.user_id || "me", userToken);

    if (pages.length === 0) {
      res.status(400).json({ error: "Nenhuma página encontrada" });
      return;
    }

    // Criar conexões para cada página
    const io = getIO();
    const createdConnections = [];

    for await (const page of pages) {
      const { name, access_token, id, instagram_business_account } = page;
      const pageToken = await getAccessTokenFromPage(access_token);

      // Criar conexão Facebook
      const facebookConnection = await Whatsapp.create({
        companyId,
        name: `FB ${name}`,
        facebookUserId: tokenData.user_id || "me",
        facebookPageUserId: id,
        facebookUserToken: pageToken,
        tokenMeta: userToken,
        isDefault: false,
        channel: "facebook",
        status: "CONNECTED",
        greetingMessage: "",
        farewellMessage: "",
        queueIds: [],
        isMultidevice: false
      });

      // Inscrever webhook
      await subscribeApp(id, pageToken);

      createdConnections.push(facebookConnection);

      // Se tiver Instagram, criar conexão também
      if (instagram_business_account) {
        const { id: instagramId, username, name: instagramName } = instagram_business_account;

        const instagramConnection = await Whatsapp.create({
          companyId,
          name: `Insta ${username || instagramName}`,
          facebookUserId: tokenData.user_id || "me",
          facebookPageUserId: instagramId,
          facebookUserToken: pageToken,
          tokenMeta: userToken,
          isDefault: false,
          channel: "instagram",
          status: "CONNECTED",
          greetingMessage: "",
          farewellMessage: "",
          queueIds: [],
          isMultidevice: false
        });

        createdConnections.push(instagramConnection);
      }
    }

    // Emitir evento para atualizar frontend
    io.to(`company-${companyId}`).emit("whatsapp", {
      action: "update",
      whatsapp: createdConnections
    });

    // Redirecionar para frontend com sucesso
    res.redirect(`${process.env.FRONTEND_URL}/canais?success=facebook-connected`);

  } catch (error) {
    console.error("Erro no Facebook OAuth callback:", error);
    res.redirect(`${process.env.FRONTEND_URL}/canais?error=facebook-failed`);
  }
};

export const instagramCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const frontendUrl = process.env.FRONTEND_URL;
  try {
    const { code, state, error, error_code } = req.query as any;

    if (error || error_code) {
      console.warn("Instagram OAuth retornou erro:", error || error_code);
      res.redirect(`${frontendUrl}/canais?error=instagram-oauth-denied`);
      return;
    }

    if (!code || typeof code !== "string") {
      res.redirect(`${frontendUrl}/canais?error=instagram-missing-code`);
      return;
    }

    if (!state || typeof state !== "string") {
      res.redirect(`${frontendUrl}/canais?error=instagram-missing-state`);
      return;
    }

    const companyId = state;
    
    // Verificar se empresa existe e tem plano ativo
    const company = await ShowCompanyService(companyId);
    const plan = await ShowPlanService(company.planId);

    if (!plan.useInstagram) {
      res.status(400).json({ error: "Empresa não possui permissão para Instagram" });
      return;
    }

    // Usa credenciais Instagram da empresa (settings independentes do Facebook)
    const config = await getWhitelabelConfig(parseInt(companyId));
    const instagramAppId = config.instagramAppId;
    const instagramAppSecret = config.instagramAppSecret;

    if (!instagramAppId || !instagramAppSecret) {
      res.redirect(`${process.env.FRONTEND_URL}/canais?error=instagram-not-configured`);
      return;
    }

    const backendUrl = process.env.BACKEND_URL || config.backendUrl || "";
    const redirectUri = `${backendUrl}/instagram-callback`;

    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${instagramAppId}&client_secret=${instagramAppSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`
    );
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error("Erro ao obter access token:", tokenData);
      res.status(400).json({ error: "Erro ao obter token de acesso" });
      return;
    }

    const userToken = tokenData.access_token;

    // Obter páginas do usuário (Instagram está vinculado a páginas do Facebook)
    const pages = await getPageProfile(tokenData.user_id || "me", userToken);

    if (pages.length === 0) {
      res.status(400).json({ error: "Nenhuma página com Instagram encontrada" });
      return;
    }

    // Criar conexões apenas para páginas com Instagram
    const io = getIO();
    const createdConnections = [];

    for await (const page of pages) {
      const { name, access_token, id, instagram_business_account } = page;

      // Apenas criar se tiver Instagram Business
      if (instagram_business_account) {
        const { id: instagramId, username, name: instagramName } = instagram_business_account;
        const pageToken = await getAccessTokenFromPage(access_token);

        const instagramConnection = await Whatsapp.create({
          companyId,
          name: `Insta ${username || instagramName}`,
          facebookUserId: tokenData.user_id || "me",
          facebookPageUserId: instagramId,
          facebookUserToken: pageToken,
          tokenMeta: userToken,
          isDefault: false,
          channel: "instagram",
          status: "CONNECTED",
          greetingMessage: "",
          farewellMessage: "",
          queueIds: [],
          isMultidevice: false
        });

        createdConnections.push(instagramConnection);

        // Inscrever webhook
        await subscribeApp(id, pageToken);
      }
    }

    if (createdConnections.length === 0) {
      res.status(400).json({ error: "Nenhuma conta Instagram Business encontrada" });
      return;
    }

    // Emitir evento para atualizar frontend
    io.to(`company-${companyId}`).emit("whatsapp", {
      action: "update",
      whatsapp: createdConnections
    });

    // Redirecionar para frontend com sucesso
    res.redirect(`${process.env.FRONTEND_URL}/canais?success=instagram-connected`);

  } catch (error) {
    console.error("Erro no Instagram OAuth callback:", error);
    res.redirect(`${process.env.FRONTEND_URL}/canais?error=instagram-failed`);
  }
};
