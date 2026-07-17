"use strict";
// Cache de IDs de mensagens enviadas pelo sistema (automações, IA, fluxos).
// Usado para distinguir envios manuais (operador digitou) de envios automáticos.
// TTL simples: entradas expiram após 2 minutos para evitar crescimento ilimitado.
exports.__esModule = true;
exports.isSystemMessage = exports.markSystemMessage = void 0;
var TTL_MS = 2 * 60 * 1000;
var cache = new Map(); // id → timestamp de inserção
var markSystemMessage = function (msgId) {
    if (!msgId)
        return;
    cache.set(msgId, Date.now());
    // Limpeza lazy: remove entradas antigas a cada inserção
    var cutoff = Date.now() - TTL_MS;
    for (var _i = 0, _a = cache.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], ts = _b[1];
        if (ts < cutoff)
            cache["delete"](key);
    }
};
exports.markSystemMessage = markSystemMessage;
var isSystemMessage = function (msgId) {
    if (!msgId || !cache.has(msgId))
        return false;
    var ts = cache.get(msgId);
    if (Date.now() - ts > TTL_MS) {
        cache["delete"](msgId);
        return false;
    }
    cache["delete"](msgId); // consome — cada ID é verificado uma vez
    return true;
};
exports.isSystemMessage = isSystemMessage;
