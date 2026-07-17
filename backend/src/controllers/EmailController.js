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
exports.sendCrmEmail = void 0;
var SendMail_1 = require("../helpers/SendMail");
var AppError_1 = __importDefault(require("../errors/AppError"));
var logger_1 = __importDefault(require("../utils/logger"));
var escapeHtml = function (s) {
    return String(s !== null && s !== void 0 ? s : "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
};
var sendCrmEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, email, telefone, empresa, segmento, mensagem, htmlContent, recipient, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, nome = _a.nome, email = _a.email, telefone = _a.telefone, empresa = _a.empresa, segmento = _a.segmento, mensagem = _a.mensagem;
                htmlContent = "\n      <h2>Nova Solicita\u00E7\u00E3o de CRM Personalizado</h2>\n      <p><strong>Nome:</strong> ".concat(escapeHtml(nome), "</p>\n      <p><strong>Email:</strong> ").concat(escapeHtml(email), "</p>\n      <p><strong>Telefone:</strong> ").concat(escapeHtml(telefone), "</p>\n      <p><strong>Empresa:</strong> ").concat(escapeHtml(empresa), "</p>\n      <p><strong>Segmento:</strong> ").concat(escapeHtml(segmento), "</p>\n      <p><strong>Mensagem:</strong></p>\n      <p>").concat(escapeHtml(mensagem), "</p>\n      <hr>\n      <p><small>Enviado via formul\u00E1rio do dashboard</small></p>\n    ");
                recipient = process.env.CRM_EMAIL_RECIPIENT;
                if (!recipient)
                    throw new AppError_1["default"]("CRM_EMAIL_RECIPIENT não configurado no .env");
                return [4 /*yield*/, (0, SendMail_1.SendMail)({
                        to: recipient,
                        subject: "Solicita\u00E7\u00E3o CRM - ".concat(empresa),
                        html: htmlContent
                    })];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Email enviado com sucesso!" })];
            case 2:
                error_1 = _b.sent();
                logger_1["default"].error("Erro ao enviar email CRM:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao enviar email" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendCrmEmail = sendCrmEmail;
