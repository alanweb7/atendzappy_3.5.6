"use strict";
exports.__esModule = true;
exports.sanitizeRemoteJid = exports.buildRemoteJidFromNumber = exports.resolveContactNumber = exports.normalizePhoneNumber = exports.isLidNumber = void 0;
var DIGIT_REGEX = /\D/g;
var stripDigits = function (value) {
    if (!value)
        return "";
    return value.replace(DIGIT_REGEX, "");
};
// Detecta se é um LID (Linked ID) do WhatsApp Business API
// LIDs geralmente começam com 120 e têm 15+ dígitos
var isLidNumber = function (digits) {
    if (!digits)
        return false;
    // LIDs começam com 120 e têm 15 ou mais dígitos
    if (digits.startsWith("120") && digits.length >= 15) {
        return true;
    }
    // Também pode ser um WAID que começa com outros padrões
    // Se tem mais de 15 dígitos e não parece um número de telefone válido
    if (digits.length > 15) {
        return true;
    }
    return false;
};
exports.isLidNumber = isLidNumber;
var normalizePhoneNumber = function (value) {
    var digits = stripDigits(value);
    if (!digits) {
        return "";
    }
    // Se é um LID/WAID, retorna vazio - não é um número de telefone válido
    if ((0, exports.isLidNumber)(digits)) {
        console.log("[normalizePhoneNumber] Detected LID/WAID, ignoring: ".concat(digits));
        return "";
    }
    // Normaliza números nacionais brasileiros (ex: 11988887777 -> 5511988887777)
    if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55") && !digits.startsWith("595")) {
        digits = "55".concat(digits);
    }
    // **VALIDAÇÃO: Aceita números brasileiros (55), paraguaios (595) e internacionais (1, 44, etc.)**
    var isBrazilNumber = digits.startsWith("55") && digits.length >= 10 && digits.length <= 13; // 10-13 dígitos (com/sem 9)
    var isParaguayNumber = digits.startsWith("595") && digits.length >= 12 && digits.length <= 13;
    // **NOVO: Aceitar números internacionais válidos**
    // EUA: 1 + 10 dígitos = 11 dígitos total
    // Reino Unido: 44 + 10 dígitos = 12 dígitos total  
    // Outros países: Geralmente 1-3 dígitos do país + 7-15 dígitos locais
    var isInternationalNumber = ((digits.startsWith("1") && digits.length >= 11 && digits.length <= 11) || // EUA/Canadá
        (digits.startsWith("44") && digits.length >= 12 && digits.length <= 12) || // Reino Unido
        (digits.length >= 11 && digits.length <= 15 && !digits.startsWith("55") && !digits.startsWith("595")) // Outros internacionais
    );
    console.log("[normalizePhoneNumber] Validando: ".concat(digits, " | BR: ").concat(isBrazilNumber, " | PY: ").concat(isParaguayNumber, " | INT: ").concat(isInternationalNumber, " | Len: ").concat(digits.length));
    if (!isBrazilNumber && !isParaguayNumber && !isInternationalNumber) {
        console.log("[normalizePhoneNumber] \u274C REJEITADO - Invalid number: ".concat(digits));
        return "";
    }
    var country = "Brasil";
    if (isParaguayNumber)
        country = "Paraguai";
    else if (isInternationalNumber)
        country = "Internacional";
    console.log("[normalizePhoneNumber] \u2705 ACEITO - ".concat(country, ": ").concat(digits));
    return digits;
};
exports.normalizePhoneNumber = normalizePhoneNumber;
var extractDigitsFromJid = function (jid) {
    if (!jid)
        return "";
    return stripDigits(jid);
};
var getCandidateNumbers = function (candidates) {
    return candidates
        .map(extractDigitsFromJid)
        .filter(function (digits) { return !!digits; });
};
var resolveContactNumber = function (_a) {
    var rawNumber = _a.rawNumber, remoteJid = _a.remoteJid, remoteJidAlt = _a.remoteJidAlt, _b = _a.isGroup // Novo parâmetro opcional
    , isGroup = _b === void 0 ? false : _b // Novo parâmetro opcional
    ;
    var rawCandidates = getCandidateNumbers([remoteJidAlt, remoteJid, rawNumber]);
    // **CORREÇÃO: Para grupos, usar o primeiro candidate diretamente (ID do grupo)**
    if (isGroup && rawCandidates.length > 0) {
        var groupId = rawCandidates[0];
        console.log("[resolveContactNumber - GRUPO] Usando ID do grupo: ".concat(groupId));
        return groupId;
    }
    for (var _i = 0, rawCandidates_1 = rawCandidates; _i < rawCandidates_1.length; _i++) {
        var digits = rawCandidates_1[_i];
        var normalized = (0, exports.normalizePhoneNumber)(digits);
        if (normalized) {
            return normalized;
        }
    }
    return "";
};
exports.resolveContactNumber = resolveContactNumber;
var buildRemoteJidFromNumber = function (number, isGroup) {
    if (isGroup === void 0) { isGroup = false; }
    if (!number) {
        return "";
    }
    return isGroup ? "".concat(number, "@g.us") : "".concat(number, "@s.whatsapp.net");
};
exports.buildRemoteJidFromNumber = buildRemoteJidFromNumber;
var sanitizeRemoteJid = function (remoteJid, number, isGroup) {
    if (isGroup === void 0) { isGroup = false; }
    if (number) {
        var normalized = (0, exports.normalizePhoneNumber)(number);
        if (normalized) {
            return (0, exports.buildRemoteJidFromNumber)(normalized, isGroup);
        }
    }
    return "";
};
exports.sanitizeRemoteJid = sanitizeRemoteJid;
