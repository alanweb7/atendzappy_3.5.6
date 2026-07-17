"use strict";
exports.__esModule = true;
var SerializeWbotMsgId = function (ticket, message) {
    var serializedMsgId = "".concat(message.fromMe, "_").concat(ticket.contact.number, "@").concat(ticket.isGroup ? "g" : "c", ".us_").concat(message.id);
    return serializedMsgId;
};
exports["default"] = SerializeWbotMsgId;
