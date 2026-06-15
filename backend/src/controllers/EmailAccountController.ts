import { Request, Response } from "express";
import { ImapFlow } from "imapflow";
import * as nodemailer from "nodemailer";
import { simpleParser } from "mailparser";
import EmailAccount from "../models/EmailAccount";
import AppError from "../errors/AppError";
import { createImapClient, setImapClient, removeImapClient, getImapClient } from "../libs/imap";
import { getIO } from "../libs/socket";

const emitEmailUpdate = (companyId: number, action: string, account: any) => {
  try {
    const io = getIO();
    io.of(String(companyId)).emit(`company-${companyId}-emailAccount`, { action, account });
  } catch {}
};

// ─── CRUD ────────────────────────────────────────────────────────────────────

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const accounts = await EmailAccount.findAll({ where: { companyId }, order: [["name", "ASC"]] });
  return res.json(accounts);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { name, email, imapHost, imapPort, imapSecure, smtpHost, smtpPort, smtpSecure, password, isDefault } = req.body;
  if (!name || !email || !imapHost || !smtpHost || !password) throw new AppError("Preencha todos os campos obrigatórios", 400);

  if (isDefault) await EmailAccount.update({ isDefault: false }, { where: { companyId } });
  const account = await EmailAccount.create({ name, email, imapHost, imapPort: imapPort || 993, imapSecure: imapSecure !== false, smtpHost, smtpPort: smtpPort || 465, smtpSecure: smtpSecure !== false, password, isDefault: !!isDefault, companyId, status: "DISCONNECTED" });
  emitEmailUpdate(Number(companyId), "create", account);
  return res.status(201).json(account);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);
  if (req.body.isDefault) await EmailAccount.update({ isDefault: false }, { where: { companyId } });
  await account.update(req.body);
  emitEmailUpdate(Number(companyId), "update", account);
  return res.json(account);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);
  removeImapClient(Number(id));
  const accountId = account.id;
  await account.destroy();
  emitEmailUpdate(Number(companyId), "delete", { id: accountId });
  return res.json({ message: "Conta removida" });
};

// ─── TESTE DE CONEXÃO ────────────────────────────────────────────────────────

export const toggleConnection = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  if (account.status === "CONNECTED") {
    await account.update({ status: "DISCONNECTED" });
    return res.json({ status: "DISCONNECTED" });
  }

  // Tenta reconectar para verificar se as credenciais ainda funcionam
  const client = createImapClient(account);
  try {
    await client.connect();
    await client.logout();
    await account.update({ status: "CONNECTED" });
    return res.json({ status: "CONNECTED" });
  } catch (e: any) {
    await account.update({ status: "ERROR" });
    throw new AppError(`Falha ao conectar: ${e.message}`, 400);
  }
};

export const testConnection = async (req: Request, res: Response): Promise<Response> => {
  const { imapHost, imapPort, imapSecure, smtpHost, smtpPort, smtpSecure, email, password } = req.body;
  const errors: string[] = [];

  // Testa IMAP
  const client = new ImapFlow({ host: imapHost, port: imapPort || 993, secure: imapSecure !== false, auth: { user: email, pass: password }, logger: false });
  try {
    await client.connect();
    await client.logout();
  } catch (e: any) {
    errors.push(`IMAP: ${e.message}`);
  }

  // Testa SMTP
  const transport = nodemailer.createTransport({ host: smtpHost, port: smtpPort || 465, secure: smtpSecure !== false, auth: { user: email, pass: password } });
  try {
    await transport.verify();
  } catch (e: any) {
    errors.push(`SMTP: ${e.message}`);
  }

  if (errors.length) return res.status(400).json({ ok: false, errors });
  return res.json({ ok: true });
};

// ─── LISTAR EMAILS (INBOX / PASTA) ───────────────────────────────────────────

export const listEmails = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const { folder = "INBOX", page = "1", limit = "20" } = req.query as Record<string, string>;

  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  const client = createImapClient(account);
  try {
    await client.connect();
    let mailbox;
    try {
      mailbox = await client.getMailboxLock(folder);
    } catch (e: any) {
      await client.logout().catch(() => {});
      return res.json({ emails: [], total: 0, folder, error: `Pasta não acessível: ${e.message}` });
    }
    try {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const status = await client.status(folder, { messages: true, unseen: true });
      const total = status.messages || 0;
      const from = Math.max(1, total - (pageNum * limitNum) + 1);
      const to = total - ((pageNum - 1) * limitNum);
      if (from > to) return res.json({ emails: [], total, folder });

      const emails: any[] = [];
      for await (const msg of client.fetch(`${from}:${to}`, { envelope: true, flags: true, bodyStructure: true })) {
        emails.unshift({
          uid: msg.uid,
          seq: msg.seq,
          subject: msg.envelope.subject || "(sem assunto)",
          from: msg.envelope.from?.[0] ? `${msg.envelope.from[0].name || ""} <${msg.envelope.from[0].address}>`.trim() : "—",
          date: msg.envelope.date,
          seen: msg.flags.has("\\Seen"),
          flagged: msg.flags.has("\\Flagged"),
          folder,
        });
      }
      return res.json({ emails, total, folder, page: pageNum });
    } finally {
      mailbox.release();
    }
  } finally {
    await client.logout().catch(() => {});
  }
};

// ─── LER EMAIL ───────────────────────────────────────────────────────────────

export const readEmail = async (req: Request, res: Response): Promise<Response> => {
  const { id, uid } = req.params;
  const { companyId } = req.user;
  const { folder = "INBOX" } = req.query as Record<string, string>;

  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  const client = createImapClient(account);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder);
    try {
      // Marca como lido
      await client.messageFlagsAdd({ uid: parseInt(uid) }, ["\\Seen"], { uid: true });
      let htmlBody = "", textBody = "", attachments: any[] = [];
      for await (const msg of client.fetch({ uid: parseInt(uid) }, { source: true, envelope: true, flags: true, bodyStructure: true }, { uid: true })) {
        const parsed = await parseSimpleEmail(msg.source);
        htmlBody = parsed.html;
        textBody = parsed.text;
        attachments = parsed.attachments;
      }
      return res.json({ html: htmlBody, text: textBody, attachments });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => {});
  }
};

// ─── ENVIAR EMAIL ─────────────────────────────────────────────────────────────

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const { to, subject, html, replyTo } = req.body;
  const files = (req.files as Express.Multer.File[] | undefined) || [];

  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  const attachments = (files || []).map(f => ({
    filename: f.originalname,
    content: f.buffer,
    contentType: f.mimetype,
  }));

  const transport = nodemailer.createTransport({
    host: account.smtpHost, port: account.smtpPort,
    secure: account.smtpSecure, auth: { user: account.email, pass: account.password }
  });
  await transport.sendMail({
    from: `${account.name} <${account.email}>`,
    to, subject, html,
    attachments,
    ...(replyTo ? { inReplyTo: replyTo, references: replyTo } : {})
  });
  return res.json({ ok: true });
};

// ─── MOVER EMAIL ──────────────────────────────────────────────────────────────

export const moveEmail = async (req: Request, res: Response): Promise<Response> => {
  const { id, uid } = req.params;
  const { companyId } = req.user;
  const { from, to } = req.body;

  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  const client = createImapClient(account);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(from || "INBOX");
    try {
      await client.messageMove({ uid: parseInt(uid) }, to, { uid: true });
    } finally { lock.release(); }
    return res.json({ ok: true });
  } finally {
    await client.logout().catch(() => {});
  }
};

// ─── DELETAR EMAIL ────────────────────────────────────────────────────────────

export const deleteEmail = async (req: Request, res: Response): Promise<Response> => {
  const { id, uid } = req.params;
  const { companyId } = req.user;
  const { folder = "INBOX" } = req.query as Record<string, string>;

  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  const client = createImapClient(account);
  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder);
    try {
      await client.messageDelete({ uid: parseInt(uid) }, { uid: true });
    } finally { lock.release(); }
    return res.json({ ok: true });
  } finally {
    await client.logout().catch(() => {});
  }
};

// ─── LISTAR PASTAS ────────────────────────────────────────────────────────────

export const listFolders = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { companyId } = req.user;
  const account = await EmailAccount.findOne({ where: { id, companyId } });
  if (!account) throw new AppError("Conta não encontrada", 404);

  const client = createImapClient(account);
  try {
    await client.connect();
    const folders: any[] = [];
    const list = await client.list();
    for (const f of list) {
      const flags = [...(f.flags || [])];
      // Ignora pastas que não podem ser abertas (namespaces pai como [Gmail])
      if (flags.some(flag => flag.toLowerCase() === "\\noselect" || flag.toLowerCase() === "\\hasnochildren" && flags.includes("\\Noselect"))) continue;
      folders.push({ path: f.path, name: f.name, delimiter: f.delimiter, flags });
    }
    await account.update({ status: "CONNECTED" });
    return res.json(folders);
  } catch (e: any) {
    await account.update({ status: "ERROR" });
    throw new AppError(`Erro ao conectar: ${e.message}`, 400);
  } finally {
    await client.logout().catch(() => {});
  }
};

// ─── HELPER: PARSE REAL COM MAILPARSER ───────────────────────────────────────

async function parseSimpleEmail(source: Buffer) {
  const parsed = await simpleParser(source);
  const attachments = (parsed.attachments || []).map(a => ({
    filename: a.filename || "arquivo",
    contentType: a.contentType,
    size: a.size
  }));
  return {
    html: parsed.html || "",
    text: parsed.text || "",
    attachments
  };
}
