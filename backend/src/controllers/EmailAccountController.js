"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.listFolders = exports.deleteEmail = exports.moveEmail = exports.sendEmail = exports.readEmail = exports.listEmails = exports.testConnection = exports.toggleConnection = exports.remove = exports.update = exports.store = exports.index = void 0;
var imapflow_1 = require("imapflow");
var nodemailer = __importStar(require("nodemailer"));
var mailparser_1 = require("mailparser");
var EmailAccount_1 = __importDefault(require("../models/EmailAccount"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var imap_1 = require("../libs/imap");
var socket_1 = require("../libs/socket");
var emitEmailUpdate = function (companyId, action, account) {
    try {
        var io = (0, socket_1.getIO)();
        io.of(String(companyId)).emit("company-".concat(companyId, "-emailAccount"), { action: action, account: account });
    }
    catch (_a) { }
};
// ─── CRUD ────────────────────────────────────────────────────────────────────
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, accounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, EmailAccount_1["default"].findAll({ where: { companyId: companyId }, order: [["name", "ASC"]] })];
            case 1:
                accounts = _a.sent();
                return [2 /*return*/, res.json(accounts)];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, name, email, imapHost, imapPort, imapSecure, smtpHost, smtpPort, smtpSecure, password, isDefault, account;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, name = _a.name, email = _a.email, imapHost = _a.imapHost, imapPort = _a.imapPort, imapSecure = _a.imapSecure, smtpHost = _a.smtpHost, smtpPort = _a.smtpPort, smtpSecure = _a.smtpSecure, password = _a.password, isDefault = _a.isDefault;
                if (!name || !email || !imapHost || !smtpHost || !password)
                    throw new AppError_1["default"]("Preencha todos os campos obrigatórios", 400);
                if (!isDefault) return [3 /*break*/, 2];
                return [4 /*yield*/, EmailAccount_1["default"].update({ isDefault: false }, { where: { companyId: companyId } })];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2: return [4 /*yield*/, EmailAccount_1["default"].create({ name: name, email: email, imapHost: imapHost, imapPort: imapPort || 993, imapSecure: imapSecure !== false, smtpHost: smtpHost, smtpPort: smtpPort || 465, smtpSecure: smtpSecure !== false, password: password, isDefault: !!isDefault, companyId: companyId, status: "DISCONNECTED" })];
            case 3:
                account = _b.sent();
                emitEmailUpdate(Number(companyId), "create", account);
                return [2 /*return*/, res.status(201).json(account)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _a.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                if (!req.body.isDefault) return [3 /*break*/, 3];
                return [4 /*yield*/, EmailAccount_1["default"].update({ isDefault: false }, { where: { companyId: companyId } })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, account.update(req.body)];
            case 4:
                _a.sent();
                emitEmailUpdate(Number(companyId), "update", account);
                return [2 /*return*/, res.json(account)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, account, accountId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _a.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                (0, imap_1.removeImapClient)(Number(id));
                accountId = account.id;
                return [4 /*yield*/, account.destroy()];
            case 2:
                _a.sent();
                emitEmailUpdate(Number(companyId), "delete", { id: accountId });
                return [2 /*return*/, res.json({ message: "Conta removida" })];
        }
    });
}); };
exports.remove = remove;
// ─── TESTE DE CONEXÃO ────────────────────────────────────────────────────────
var toggleConnection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, account, client, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _a.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                if (!(account.status === "CONNECTED")) return [3 /*break*/, 3];
                return [4 /*yield*/, account.update({ status: "DISCONNECTED" })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ status: "DISCONNECTED" })];
            case 3:
                client = (0, imap_1.createImapClient)(account);
                _a.label = 4;
            case 4:
                _a.trys.push([4, 8, , 10]);
                return [4 /*yield*/, client.connect()];
            case 5:
                _a.sent();
                return [4 /*yield*/, client.logout()];
            case 6:
                _a.sent();
                return [4 /*yield*/, account.update({ status: "CONNECTED" })];
            case 7:
                _a.sent();
                return [2 /*return*/, res.json({ status: "CONNECTED" })];
            case 8:
                e_1 = _a.sent();
                return [4 /*yield*/, account.update({ status: "ERROR" })];
            case 9:
                _a.sent();
                throw new AppError_1["default"]("Falha ao conectar: ".concat(e_1.message), 400);
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.toggleConnection = toggleConnection;
var testConnection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, imapHost, imapPort, imapSecure, smtpHost, smtpPort, smtpSecure, email, password, errors, client, e_2, transport, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, imapHost = _a.imapHost, imapPort = _a.imapPort, imapSecure = _a.imapSecure, smtpHost = _a.smtpHost, smtpPort = _a.smtpPort, smtpSecure = _a.smtpSecure, email = _a.email, password = _a.password;
                errors = [];
                client = new imapflow_1.ImapFlow({ host: imapHost, port: imapPort || 993, secure: imapSecure !== false, auth: { user: email, pass: password }, logger: false });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _b.sent();
                return [4 /*yield*/, client.logout()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                errors.push("IMAP: ".concat(e_2.message));
                return [3 /*break*/, 5];
            case 5:
                transport = nodemailer.createTransport({ host: smtpHost, port: smtpPort || 465, secure: smtpSecure !== false, auth: { user: email, pass: password } });
                _b.label = 6;
            case 6:
                _b.trys.push([6, 8, , 9]);
                return [4 /*yield*/, transport.verify()];
            case 7:
                _b.sent();
                return [3 /*break*/, 9];
            case 8:
                e_3 = _b.sent();
                errors.push("SMTP: ".concat(e_3.message));
                return [3 /*break*/, 9];
            case 9:
                if (errors.length)
                    return [2 /*return*/, res.status(400).json({ ok: false, errors: errors })];
                return [2 /*return*/, res.json({ ok: true })];
        }
    });
}); };
exports.testConnection = testConnection;
// ─── LISTAR EMAILS (INBOX / PASTA) ───────────────────────────────────────────
var listEmails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, _a, _b, folder, _c, page, _d, limit, account, client, mailbox, e_4, pageNum, limitNum, status_1, total, from, to, emails, _e, _f, _g, msg, e_5_1;
    var _h, e_5, _j, _k;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                _a = req.query, _b = _a.folder, folder = _b === void 0 ? "INBOX" : _b, _c = _a.page, page = _c === void 0 ? "1" : _c, _d = _a.limit, limit = _d === void 0 ? "20" : _d;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _m.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                client = (0, imap_1.createImapClient)(account);
                _m.label = 2;
            case 2:
                _m.trys.push([2, , 24, 26]);
                return [4 /*yield*/, client.connect()];
            case 3:
                _m.sent();
                mailbox = void 0;
                _m.label = 4;
            case 4:
                _m.trys.push([4, 6, , 8]);
                return [4 /*yield*/, client.getMailboxLock(folder)];
            case 5:
                mailbox = _m.sent();
                return [3 /*break*/, 8];
            case 6:
                e_4 = _m.sent();
                return [4 /*yield*/, client.logout()["catch"](function () { })];
            case 7:
                _m.sent();
                return [2 /*return*/, res.json({ emails: [], total: 0, folder: folder, error: "Pasta n\u00E3o acess\u00EDvel: ".concat(e_4.message) })];
            case 8:
                _m.trys.push([8, , 22, 23]);
                pageNum = parseInt(page);
                limitNum = parseInt(limit);
                return [4 /*yield*/, client.status(folder, { messages: true, unseen: true })];
            case 9:
                status_1 = _m.sent();
                total = status_1.messages || 0;
                from = Math.max(1, total - (pageNum * limitNum) + 1);
                to = total - ((pageNum - 1) * limitNum);
                if (from > to)
                    return [2 /*return*/, res.json({ emails: [], total: total, folder: folder })];
                emails = [];
                _m.label = 10;
            case 10:
                _m.trys.push([10, 15, 16, 21]);
                _e = true, _f = __asyncValues(client.fetch("".concat(from, ":").concat(to), { envelope: true, flags: true, bodyStructure: true }));
                _m.label = 11;
            case 11: return [4 /*yield*/, _f.next()];
            case 12:
                if (!(_g = _m.sent(), _h = _g.done, !_h)) return [3 /*break*/, 14];
                _k = _g.value;
                _e = false;
                try {
                    msg = _k;
                    emails.unshift({
                        uid: msg.uid,
                        seq: msg.seq,
                        subject: msg.envelope.subject || "(sem assunto)",
                        from: ((_l = msg.envelope.from) === null || _l === void 0 ? void 0 : _l[0]) ? "".concat(msg.envelope.from[0].name || "", " <").concat(msg.envelope.from[0].address, ">").trim() : "—",
                        date: msg.envelope.date,
                        seen: msg.flags.has("\\Seen"),
                        flagged: msg.flags.has("\\Flagged"),
                        folder: folder
                    });
                }
                finally {
                    _e = true;
                }
                _m.label = 13;
            case 13: return [3 /*break*/, 11];
            case 14: return [3 /*break*/, 21];
            case 15:
                e_5_1 = _m.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 21];
            case 16:
                _m.trys.push([16, , 19, 20]);
                if (!(!_e && !_h && (_j = _f["return"]))) return [3 /*break*/, 18];
                return [4 /*yield*/, _j.call(_f)];
            case 17:
                _m.sent();
                _m.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                if (e_5) throw e_5.error;
                return [7 /*endfinally*/];
            case 20: return [7 /*endfinally*/];
            case 21: return [2 /*return*/, res.json({ emails: emails, total: total, folder: folder, page: pageNum })];
            case 22:
                mailbox.release();
                return [7 /*endfinally*/];
            case 23: return [3 /*break*/, 26];
            case 24: return [4 /*yield*/, client.logout()["catch"](function () { })];
            case 25:
                _m.sent();
                return [7 /*endfinally*/];
            case 26: return [2 /*return*/];
        }
    });
}); };
exports.listEmails = listEmails;
// ─── LER EMAIL ───────────────────────────────────────────────────────────────
var readEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, uid, companyId, _b, folder, account, client, lock, htmlBody, textBody, attachments, _c, _d, _e, msg, parsed, e_6_1;
    var _f, e_6, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = req.params, id = _a.id, uid = _a.uid;
                companyId = req.user.companyId;
                _b = req.query.folder, folder = _b === void 0 ? "INBOX" : _b;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _j.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                client = (0, imap_1.createImapClient)(account);
                _j.label = 2;
            case 2:
                _j.trys.push([2, , 24, 26]);
                return [4 /*yield*/, client.connect()];
            case 3:
                _j.sent();
                return [4 /*yield*/, client.getMailboxLock(folder)];
            case 4:
                lock = _j.sent();
                _j.label = 5;
            case 5:
                _j.trys.push([5, , 22, 23]);
                // Marca como lido
                return [4 /*yield*/, client.messageFlagsAdd({ uid: parseInt(uid) }, ["\\Seen"], { uid: true })];
            case 6:
                // Marca como lido
                _j.sent();
                htmlBody = "", textBody = "", attachments = [];
                _j.label = 7;
            case 7:
                _j.trys.push([7, 15, 16, 21]);
                _c = true, _d = __asyncValues(client.fetch({ uid: parseInt(uid) }, { source: true, envelope: true, flags: true, bodyStructure: true }, { uid: true }));
                _j.label = 8;
            case 8: return [4 /*yield*/, _d.next()];
            case 9:
                if (!(_e = _j.sent(), _f = _e.done, !_f)) return [3 /*break*/, 14];
                _h = _e.value;
                _c = false;
                _j.label = 10;
            case 10:
                _j.trys.push([10, , 12, 13]);
                msg = _h;
                return [4 /*yield*/, parseSimpleEmail(msg.source)];
            case 11:
                parsed = _j.sent();
                htmlBody = parsed.html;
                textBody = parsed.text;
                attachments = parsed.attachments;
                return [3 /*break*/, 13];
            case 12:
                _c = true;
                return [7 /*endfinally*/];
            case 13: return [3 /*break*/, 8];
            case 14: return [3 /*break*/, 21];
            case 15:
                e_6_1 = _j.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 21];
            case 16:
                _j.trys.push([16, , 19, 20]);
                if (!(!_c && !_f && (_g = _d["return"]))) return [3 /*break*/, 18];
                return [4 /*yield*/, _g.call(_d)];
            case 17:
                _j.sent();
                _j.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                if (e_6) throw e_6.error;
                return [7 /*endfinally*/];
            case 20: return [7 /*endfinally*/];
            case 21: return [2 /*return*/, res.json({ html: htmlBody, text: textBody, attachments: attachments })];
            case 22:
                lock.release();
                return [7 /*endfinally*/];
            case 23: return [3 /*break*/, 26];
            case 24: return [4 /*yield*/, client.logout()["catch"](function () { })];
            case 25:
                _j.sent();
                return [7 /*endfinally*/];
            case 26: return [2 /*return*/];
        }
    });
}); };
exports.readEmail = readEmail;
// ─── ENVIAR EMAIL ─────────────────────────────────────────────────────────────
var sendEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, _a, to, subject, html, replyTo, files, account, attachments, transport;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                _a = req.body, to = _a.to, subject = _a.subject, html = _a.html, replyTo = _a.replyTo;
                files = req.files || [];
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _b.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                attachments = (files || []).map(function (f) { return ({
                    filename: f.originalname,
                    content: f.buffer,
                    contentType: f.mimetype
                }); });
                transport = nodemailer.createTransport({
                    host: account.smtpHost, port: account.smtpPort,
                    secure: account.smtpSecure, auth: { user: account.email, pass: account.password }
                });
                return [4 /*yield*/, transport.sendMail(__assign({ from: "".concat(account.name, " <").concat(account.email, ">"), to: to, subject: subject, html: html, attachments: attachments }, (replyTo ? { inReplyTo: replyTo, references: replyTo } : {})))];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ ok: true })];
        }
    });
}); };
exports.sendEmail = sendEmail;
// ─── MOVER EMAIL ──────────────────────────────────────────────────────────────
var moveEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, uid, companyId, _b, from, to, account, client, lock;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, uid = _a.uid;
                companyId = req.user.companyId;
                _b = req.body, from = _b.from, to = _b.to;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _c.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                client = (0, imap_1.createImapClient)(account);
                _c.label = 2;
            case 2:
                _c.trys.push([2, , 9, 11]);
                return [4 /*yield*/, client.connect()];
            case 3:
                _c.sent();
                return [4 /*yield*/, client.getMailboxLock(from || "INBOX")];
            case 4:
                lock = _c.sent();
                _c.label = 5;
            case 5:
                _c.trys.push([5, , 7, 8]);
                return [4 /*yield*/, client.messageMove({ uid: parseInt(uid) }, to, { uid: true })];
            case 6:
                _c.sent();
                return [3 /*break*/, 8];
            case 7:
                lock.release();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, res.json({ ok: true })];
            case 9: return [4 /*yield*/, client.logout()["catch"](function () { })];
            case 10:
                _c.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.moveEmail = moveEmail;
// ─── DELETAR EMAIL ────────────────────────────────────────────────────────────
var deleteEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, uid, companyId, _b, folder, account, client, lock;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, uid = _a.uid;
                companyId = req.user.companyId;
                _b = req.query.folder, folder = _b === void 0 ? "INBOX" : _b;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _c.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                client = (0, imap_1.createImapClient)(account);
                _c.label = 2;
            case 2:
                _c.trys.push([2, , 9, 11]);
                return [4 /*yield*/, client.connect()];
            case 3:
                _c.sent();
                return [4 /*yield*/, client.getMailboxLock(folder)];
            case 4:
                lock = _c.sent();
                _c.label = 5;
            case 5:
                _c.trys.push([5, , 7, 8]);
                return [4 /*yield*/, client.messageDelete({ uid: parseInt(uid) }, { uid: true })];
            case 6:
                _c.sent();
                return [3 /*break*/, 8];
            case 7:
                lock.release();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, res.json({ ok: true })];
            case 9: return [4 /*yield*/, client.logout()["catch"](function () { })];
            case 10:
                _c.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.deleteEmail = deleteEmail;
// ─── LISTAR PASTAS ────────────────────────────────────────────────────────────
var listFolders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, account, client, folders, list, _loop_1, _i, list_1, f, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, EmailAccount_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 1:
                account = _a.sent();
                if (!account)
                    throw new AppError_1["default"]("Conta não encontrada", 404);
                client = (0, imap_1.createImapClient)(account);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, 8, 10]);
                return [4 /*yield*/, client.connect()];
            case 3:
                _a.sent();
                folders = [];
                return [4 /*yield*/, client.list()];
            case 4:
                list = _a.sent();
                _loop_1 = function (f) {
                    var flags = __spreadArray([], (f.flags || []), true);
                    // Ignora pastas que não podem ser abertas (namespaces pai como [Gmail])
                    if (flags.some(function (flag) { return flag.toLowerCase() === "\\noselect" || flag.toLowerCase() === "\\hasnochildren" && flags.includes("\\Noselect"); }))
                        return "continue";
                    folders.push({ path: f.path, name: f.name, delimiter: f.delimiter, flags: flags });
                };
                for (_i = 0, list_1 = list; _i < list_1.length; _i++) {
                    f = list_1[_i];
                    _loop_1(f);
                }
                return [4 /*yield*/, account.update({ status: "CONNECTED" })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.json(folders)];
            case 6:
                e_7 = _a.sent();
                return [4 /*yield*/, account.update({ status: "ERROR" })];
            case 7:
                _a.sent();
                throw new AppError_1["default"]("Erro ao conectar: ".concat(e_7.message), 400);
            case 8: return [4 /*yield*/, client.logout()["catch"](function () { })];
            case 9:
                _a.sent();
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.listFolders = listFolders;
// ─── HELPER: PARSE REAL COM MAILPARSER ───────────────────────────────────────
function parseSimpleEmail(source) {
    return __awaiter(this, void 0, void 0, function () {
        var parsed, attachments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mailparser_1.simpleParser)(source)];
                case 1:
                    parsed = _a.sent();
                    attachments = (parsed.attachments || []).map(function (a) { return ({
                        filename: a.filename || "arquivo",
                        contentType: a.contentType,
                        size: a.size
                    }); });
                    return [2 /*return*/, {
                            html: parsed.html || "",
                            text: parsed.text || "",
                            attachments: attachments
                        }];
            }
        });
    });
}
