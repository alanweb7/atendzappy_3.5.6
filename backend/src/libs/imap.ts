import { ImapFlow } from "imapflow";

const imapClients: Map<number, ImapFlow> = new Map();

export const getImapClient = (accountId: number): ImapFlow | null =>
  imapClients.get(accountId) || null;

export const setImapClient = (accountId: number, client: ImapFlow): void => {
  imapClients.set(accountId, client);
};

export const removeImapClient = (accountId: number): void => {
  const client = imapClients.get(accountId);
  if (client) {
    try { client.logout(); } catch {}
    imapClients.delete(accountId);
  }
};

export const createImapClient = (account: {
  imapHost: string; imapPort: number; imapSecure: boolean;
  email: string; password: string;
}): ImapFlow =>
  new ImapFlow({
    host: account.imapHost,
    port: account.imapPort,
    secure: account.imapSecure,
    auth: { user: account.email, pass: account.password },
    logger: false,
  });
