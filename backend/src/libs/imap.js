"use strict";
exports.__esModule = true;
exports.createImapClient = exports.removeImapClient = exports.setImapClient = exports.getImapClient = void 0;
var imapflow_1 = require("imapflow");
var imapClients = new Map();
var getImapClient = function (accountId) {
    return imapClients.get(accountId) || null;
};
exports.getImapClient = getImapClient;
var setImapClient = function (accountId, client) {
    imapClients.set(accountId, client);
};
exports.setImapClient = setImapClient;
var removeImapClient = function (accountId) {
    var client = imapClients.get(accountId);
    if (client) {
        try {
            client.logout();
        }
        catch (_a) { }
        imapClients["delete"](accountId);
    }
};
exports.removeImapClient = removeImapClient;
var createImapClient = function (account) {
    return new imapflow_1.ImapFlow({
        host: account.imapHost,
        port: account.imapPort,
        secure: account.imapSecure,
        auth: { user: account.email, pass: account.password },
        logger: false
    });
};
exports.createImapClient = createImapClient;
