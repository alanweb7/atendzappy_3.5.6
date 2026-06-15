import { Request, Response } from "express";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiIntegrationSetting from "../models/AiIntegrationSetting";
import Message from "../models/Message";
import Ticket from "../models/Ticket";
import Contact from "../models/Contact";
import Queue from "../models/Queue";
import User from "../models/User";
import Produto from "../models/Produto";
import Servico from "../models/Servico";
import UserSchedule from "../models/UserSchedule";
import logger from "../utils/logger";

// Modelos padrão por provider — melhores para cada caso
const MODELS: Record<string, string> = {
  openai: "gpt-4o-mini",
  gemini: "gemini-2.0-flash",
  grok:   "grok-2"
};

const buildPrompt = (ctx: {
  contact: any;
  ticket: any;
  messages: any[];
  produtos: any[];
  servicos: any[];
  agendas: any[];
  currentText?: string;
}): string => {
  const { contact, ticket, messages, produtos, servicos, agendas, currentText } = ctx;

  const lines: string[] = [];

  lines.push("Você é um assistente de atendimento ao cliente. Seu papel é ajudar o atendente a responder mensagens de forma profissional, cordial e precisa.");
  lines.push("");

  // Contato
  lines.push("=== CONTATO ===");
  lines.push(`Nome: ${contact?.name || "Desconhecido"}`);
  if (contact?.number) lines.push(`Telefone: ${contact.number}`);
  if (contact?.email) lines.push(`Email: ${contact.email}`);
  lines.push("");

  // Ticket
  lines.push("=== TICKET ===");
  lines.push(`Status: ${ticket?.status || "open"}`);
  if (ticket?.queue?.name) lines.push(`Fila: ${ticket.queue.name}`);
  if (ticket?.user?.name) lines.push(`Atendente: ${ticket.user.name}`);
  lines.push("");

  // Produtos
  if (produtos.length > 0) {
    lines.push("=== PRODUTOS DA EMPRESA ===");
    produtos.slice(0, 20).forEach(p => {
      lines.push(`- ${p.nome}: R$ ${Number(p.valor).toFixed(2)}${p.descricao ? ` | ${p.descricao}` : ""}`);
    });
    lines.push("");
  }

  // Serviços
  if (servicos.length > 0) {
    lines.push("=== SERVIÇOS DA EMPRESA ===");
    servicos.slice(0, 20).forEach(s => {
      const duracao = s.tempoAtendimento ? ` | ${s.tempoAtendimento}min` : "";
      lines.push(`- ${s.nome}: R$ ${Number(s.valorOriginal).toFixed(2)}${duracao}${s.descricao ? ` | ${s.descricao}` : ""}`);
    });
    lines.push("");
  }

  // Agendas
  if (agendas.length > 0) {
    lines.push("=== AGENDAS DISPONÍVEIS ===");
    agendas.forEach(a => {
      const userName = (a as any).user?.name || "Profissional";
      lines.push(`- ${a.name} (${userName})`);
    });
    lines.push("");
  }

  // Conversa
  lines.push("=== CONVERSA (últimas mensagens) ===");
  messages.forEach(m => {
    const origem = m.fromMe ? "[atendente]" : "[cliente]";
    const hora = new Date(m.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    lines.push(`${origem} ${hora}: ${m.body || `[${m.mediaType || "mídia"}]`}`);
  });
  lines.push("");

  // Instrução
  if (currentText?.trim()) {
    lines.push("=== TAREFA ===");
    lines.push(`Melhore o seguinte texto mantendo o mesmo sentido, tornando-o mais profissional e natural:`);
    lines.push(`"${currentText.trim()}"`);
    lines.push("Responda APENAS com o texto melhorado, sem aspas, sem explicações.");
  } else {
    lines.push("=== TAREFA ===");
    lines.push("Gere uma resposta profissional e cordial para a última mensagem do cliente acima.");
    lines.push("Use as informações da empresa (produtos, serviços, agendas) quando relevante.");
    lines.push("Responda APENAS com o texto da mensagem, sem aspas, sem explicações.");
  }

  return lines.join("\n");
};

export const suggest = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { companyId } = req.user;
  const { provider: requestedProvider, model: requestedModel, currentText } = req.body;

  try {
    // 1. Buscar IA disponível
    const settings = await AiIntegrationSetting.findAll({
      where: { companyId, active: true }
    });

    if (settings.length === 0) {
      return res.status(400).json({ error: "Nenhuma IA configurada. Configure em Configurações → Integrações." });
    }

    // Usar provider solicitado ou o primeiro disponível (OpenAI > Gemini > Grok)
    const order = ["openai", "gemini", "grok"];
    let setting = requestedProvider
      ? settings.find(s => s.provider === requestedProvider)
      : settings.sort((a, b) => order.indexOf(a.provider) - order.indexOf(b.provider))[0];

    if (!setting) {
      setting = settings[0];
    }

    const { provider, apiKey } = setting;

    // 2. Buscar dados do ticket
    const ticket = await Ticket.findOne({
      where: { id: ticketId, companyId },
      include: [
        { model: Contact, as: "contact" },
        { model: Queue, as: "queue", attributes: ["id", "name"] },
        { model: User, as: "user", attributes: ["id", "name"] }
      ]
    });

    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });

    // 3. Últimas 10 mensagens
    const messages = await Message.findAll({
      where: { ticketId, companyId },
      order: [["createdAt", "DESC"]],
      limit: 10,
      attributes: ["id", "body", "fromMe", "mediaType", "createdAt"]
    });
    const sortedMessages = messages.reverse();

    // 4. Dados da empresa
    const [produtos, servicos, agendas] = await Promise.all([
      Produto.findAll({ where: { companyId }, attributes: ["nome", "valor", "descricao"], limit: 30 }).catch(() => []),
      Servico.findAll({ where: { companyId }, attributes: ["nome", "valorOriginal", "descricao", "tempoAtendimento"], limit: 30 }).catch(() => []),
      UserSchedule.findAll({
        where: { companyId, active: true },
        attributes: ["name"],
        include: [{ model: User, as: "user", attributes: ["name"] }],
        limit: 10
      }).catch(() => [])
    ]);

    // 5. Montar prompt
    const prompt = buildPrompt({
      contact: ticket.contact,
      ticket,
      messages: sortedMessages,
      produtos,
      servicos,
      agendas,
      currentText
    });

    // 6. Chamar IA
    let suggestion = "";

    // Usa modelo solicitado ou o padrão do provider
    const model = requestedModel || MODELS[provider] || MODELS.openai;

    if (provider === "gemini") {
      const genAI = new GoogleGenerativeAI(apiKey);
      const geminiModel = genAI.getGenerativeModel({ model });
      const result = await geminiModel.generateContent(prompt);
      suggestion = result.response.text().trim();

    } else if (provider === "grok") {
      const client = new OpenAI({ apiKey, baseURL: "https://api.x.ai/v1" });
      const completion = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      });
      suggestion = completion.choices[0]?.message?.content?.trim() || "";

    } else {
      // OpenAI (padrão)
      const client = new OpenAI({ apiKey });
      const completion = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      });
      suggestion = completion.choices[0]?.message?.content?.trim() || "";
    }

    return res.json({ result: suggestion, provider });

  } catch (err: any) {
    return res.status(handleAiError(err).status).json({ error: handleAiError(err).msg });
  }
};

// ────────── Helper: tratar erro de forma amigável ──────────
const handleAiError = (err: any) => {
  logger.error(`[AiSuggestion] error: ${err?.message}`);
  const status = err?.status || err?.response?.status || 500;
  const rawMsg = (err?.response?.data?.error?.message || err?.message || "").toLowerCase();
  let msg = "Erro ao processar. Tente novamente.";
  if (status === 401 || rawMsg.includes("incorrect api key") || rawMsg.includes("invalid api key"))
    msg = "API Key inválida. Verifique em Configurações → Integrações.";
  else if (status === 429 || rawMsg.includes("quota") || rawMsg.includes("rate limit") || rawMsg.includes("exceeded"))
    msg = "Limite da API atingido. Verifique o saldo/quota da sua conta no provedor de IA.";
  else if (status === 503 || rawMsg.includes("overloaded") || rawMsg.includes("unavailable"))
    msg = "Serviço de IA temporariamente indisponível. Tente novamente em instantes.";
  else if (rawMsg.includes("model") && rawMsg.includes("exist"))
    msg = "Modelo não disponível. Tente outro.";
  else if (rawMsg.includes("context length") || rawMsg.includes("token"))
    msg = "Conversa muito longa para processar. Reduza o histórico.";
  return { status: status >= 400 && status < 600 ? status : 500, msg };
};

// ────────── Helper: chamar IA ──────────
const callAi = async (provider: string, apiKey: string, prompt: string, maxTokens = 1000): Promise<string> => {
  const model = MODELS[provider] || MODELS.openai;
  if (provider === "gemini") {
    const genAI = new GoogleGenerativeAI(apiKey);
    const m = genAI.getGenerativeModel({ model });
    const result = await m.generateContent(prompt);
    return result.response.text().trim();
  }
  const baseURL = provider === "grok" ? "https://api.x.ai/v1" : undefined;
  const client = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });
  const completion = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens
  });
  return completion.choices[0]?.message?.content?.trim() || "";
};

// ────────── Helper: buscar mensagens ──────────
const getMessages = async (ticketId: string, companyId: number, limit: number) => {
  const msgs = await Message.findAll({
    where: { ticketId, companyId },
    order: [["createdAt", "DESC"]],
    limit,
    attributes: ["id", "body", "fromMe", "mediaType", "createdAt"]
  });
  return msgs.reverse();
};

// ────────── Resumir ──────────
export const summarize = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { companyId } = req.user;

  try {
    const settings = await AiIntegrationSetting.findAll({ where: { companyId, active: true } });
    if (!settings.length) return res.status(400).json({ error: "Nenhuma IA configurada. Configure em Configurações → Integrações." });
    const setting = settings.sort((a, b) => ["openai","gemini","grok"].indexOf(a.provider) - ["openai","gemini","grok"].indexOf(b.provider))[0];

    const messages = await getMessages(ticketId, companyId, 100);
    if (!messages.length) return res.status(400).json({ error: "Sem mensagens para resumir." });

    const conversation = messages.map(m => {
      const origem = m.fromMe ? "[atendente]" : "[cliente]";
      const hora = new Date(m.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      return `${origem} ${hora}: ${m.body || `[${m.mediaType || "mídia"}]`}`;
    }).join("\n");

    const prompt = `Resuma a seguinte conversa de atendimento ao cliente de forma clara e objetiva, destacando:
- Principais assuntos abordados
- Solicitações/problemas do cliente
- Soluções ou encaminhamentos dados
- Status atual da conversa

Conversa:
${conversation}

Forneça o resumo em tópicos.`;

    const result = await callAi(setting.provider, setting.apiKey, prompt, 800);
    return res.json({ result, provider: setting.provider });

  } catch (err: any) {
    return res.status(handleAiError(err).status).json({ error: handleAiError(err).msg });
  }
};

// ────────── Perguntar à IA ──────────
export const ask = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { companyId } = req.user;
  const { question } = req.body;

  if (!question?.trim()) return res.status(400).json({ error: "Informe a pergunta." });

  try {
    const settings = await AiIntegrationSetting.findAll({ where: { companyId, active: true } });
    if (!settings.length) return res.status(400).json({ error: "Nenhuma IA configurada. Configure em Configurações → Integrações." });
    const setting = settings.sort((a, b) => ["openai","gemini","grok"].indexOf(a.provider) - ["openai","gemini","grok"].indexOf(b.provider))[0];

    const ticket = await Ticket.findOne({
      where: { id: ticketId, companyId },
      include: [{ model: Contact, as: "contact" }]
    });

    const messages = await getMessages(ticketId, companyId, 100);

    const conversation = messages.map(m => {
      const origem = m.fromMe ? "[atendente]" : "[cliente]";
      const hora = new Date(m.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      return `${origem} ${hora}: ${m.body || `[${m.mediaType || "mídia"}]`}`;
    }).join("\n");

    const prompt = `Você tem acesso ao histórico completo de uma conversa de atendimento ao cliente.

Contato: ${ticket?.contact?.name || "Desconhecido"} (${ticket?.contact?.number || ""})

Conversa (últimas ${messages.length} mensagens):
${conversation}

Pergunta do atendente: "${question.trim()}"

Responda de forma direta e objetiva baseando-se apenas nas informações da conversa acima.`;

    const result = await callAi(setting.provider, setting.apiKey, prompt, 600);
    return res.json({ result, provider: setting.provider });

  } catch (err: any) {
    return res.status(handleAiError(err).status).json({ error: handleAiError(err).msg });
  }
};
