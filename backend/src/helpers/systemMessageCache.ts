// Cache de IDs de mensagens enviadas pelo sistema (automações, IA, fluxos).
// Usado para distinguir envios manuais (operador digitou) de envios automáticos.
// TTL simples: entradas expiram após 2 minutos para evitar crescimento ilimitado.

const TTL_MS = 2 * 60 * 1000;

const cache = new Map<string, number>(); // id → timestamp de inserção

export const markSystemMessage = (msgId: string): void => {
  if (!msgId) return;
  cache.set(msgId, Date.now());
  // Limpeza lazy: remove entradas antigas a cada inserção
  const cutoff = Date.now() - TTL_MS;
  for (const [key, ts] of cache.entries()) {
    if (ts < cutoff) cache.delete(key);
  }
};

export const isSystemMessage = (msgId: string): boolean => {
  if (!msgId || !cache.has(msgId)) return false;
  const ts = cache.get(msgId)!;
  if (Date.now() - ts > TTL_MS) {
    cache.delete(msgId);
    return false;
  }
  cache.delete(msgId); // consome — cada ID é verificado uma vez
  return true;
};
