"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.replaceVariables = exports.SendMailWithSettings = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var Setting_1 = __importDefault(require("../models/Setting"));
function getSmtpSettings() {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var settings, smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Setting_1["default"].findAll({
                            where: {
                                companyId: 1,
                                key: ["smtpHost", "smtpPort", "smtpUser", "smtpPass", "smtpFrom"]
                            }
                        })];
                case 1:
                    settings = _f.sent();
                    smtpHost = (_a = settings.find(function (s) { return s.key === "smtpHost"; })) === null || _a === void 0 ? void 0 : _a.value;
                    smtpPort = (_b = settings.find(function (s) { return s.key === "smtpPort"; })) === null || _b === void 0 ? void 0 : _b.value;
                    smtpUser = (_c = settings.find(function (s) { return s.key === "smtpUser"; })) === null || _c === void 0 ? void 0 : _c.value;
                    smtpPass = (_d = settings.find(function (s) { return s.key === "smtpPass"; })) === null || _d === void 0 ? void 0 : _d.value;
                    smtpFrom = (_e = settings.find(function (s) { return s.key === "smtpFrom"; })) === null || _e === void 0 ? void 0 : _e.value;
                    if (!smtpHost || !smtpUser || !smtpPass) {
                        console.log("SMTP settings not configured");
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, {
                            smtpHost: smtpHost,
                            smtpPort: smtpPort || "587",
                            smtpUser: smtpUser,
                            smtpPass: smtpPass,
                            smtpFrom: smtpFrom || smtpUser
                        }];
                case 2:
                    error_1 = _f.sent();
                    console.error("Error fetching SMTP settings:", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function SendMailWithSettings(mailData) {
    return __awaiter(this, void 0, void 0, function () {
        var smtpSettings, options_1, transporter, error_2, port, secure, options, transporter, info, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmtpSettings()];
                case 1:
                    smtpSettings = _a.sent();
                    if (!!smtpSettings) return [3 /*break*/, 5];
                    console.log("SMTP not configured, falling back to env variables");
                    // Fallback para variáveis de ambiente
                    if (!process.env.MAIL_HOST || !process.env.MAIL_USER) {
                        console.error("No SMTP configuration available");
                        return [2 /*return*/, false];
                    }
                    options_1 = {
                        host: process.env.MAIL_HOST,
                        port: parseInt(process.env.MAIL_PORT || "465"),
                        secure: true,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASS
                        }
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    transporter = nodemailer_1["default"].createTransport(options_1);
                    return [4 /*yield*/, transporter.sendMail({
                            from: process.env.MAIL_FROM,
                            to: mailData.to,
                            subject: mailData.subject,
                            text: mailData.text,
                            html: mailData.html || mailData.text
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error sending email with env config:", error_2);
                    return [2 /*return*/, false];
                case 5:
                    port = parseInt(smtpSettings.smtpPort);
                    secure = port === 465;
                    options = {
                        host: smtpSettings.smtpHost,
                        port: port,
                        secure: secure,
                        auth: {
                            user: smtpSettings.smtpUser,
                            pass: smtpSettings.smtpPass
                        }
                    };
                    // Para portas não seguras, usar TLS
                    if (!secure) {
                        options.tls = {
                            rejectUnauthorized: false
                        };
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    transporter = nodemailer_1["default"].createTransport(options);
                    return [4 /*yield*/, transporter.sendMail({
                            from: smtpSettings.smtpFrom,
                            to: mailData.to,
                            subject: mailData.subject,
                            text: mailData.text,
                            html: mailData.html || mailData.text
                        })];
                case 7:
                    info = _a.sent();
                    console.log("Email sent successfully:", info.messageId);
                    return [2 /*return*/, true];
                case 8:
                    error_3 = _a.sent();
                    console.error("Error sending email:", error_3);
                    return [2 /*return*/, false];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.SendMailWithSettings = SendMailWithSettings;
// Função para substituir variáveis no texto
function replaceVariables(text, variables) {
    var result = text;
    for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        result = result.replace(new RegExp("\\{".concat(key, "\\}"), 'g'), value || '');
    }
    return result;
}
exports.replaceVariables = replaceVariables;
