"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isBullAuth = void 0;
require("./bootstrap");
require("reflect-metadata");
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var Sentry = __importStar(require("@sentry/node"));
var dotenv_1 = require("dotenv");
var body_parser_1 = __importDefault(require("body-parser"));
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("./config/auth"));
require("./database");
var upload_1 = __importDefault(require("./config/upload"));
var sequelize_1 = require("sequelize");
var AppError_1 = __importDefault(require("./errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
var WhatsappWidgetController = __importStar(require("./controllers/WhatsappWidgetController"));
var logger_1 = __importDefault(require("./utils/logger"));
var queues_1 = require("./queues");
var queue_1 = __importDefault(require("./libs/queue"));
var bull_board_1 = __importDefault(require("bull-board"));
var basic_auth_1 = __importDefault(require("basic-auth"));
var helmet_1 = __importDefault(require("helmet"));
// Função de middleware para autenticação básica
var isBullAuth = function (req, res, next) {
    var user = (0, basic_auth_1["default"])(req);
    if (!user || user.name !== process.env.BULL_USER || user.pass !== process.env.BULL_PASS) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }
    next();
};
exports.isBullAuth = isBullAuth;
// Carregar variáveis de ambiente
(0, dotenv_1.config)();
// Inicializar Sentry
Sentry.init({ dsn: process.env.SENTRY_DSN });
var app = (0, express_1["default"])();
// Necessário para express-rate-limit funcionar corretamente atrás do nginx
// (evita ERR_ERL_UNEXPECTED_X_FORWARDED_FOR crash loop)
app.set('trust proxy', 1);
// Configuração de filas
app.set("queues", {
    messageQueue: queues_1.messageQueue,
    sendScheduledMessages: queues_1.sendScheduledMessages
});
// Configuração do BullBoard
if (String(process.env.BULL_BOARD).toLocaleLowerCase() === 'true' && process.env.REDIS_URI_ACK !== '') {
    bull_board_1["default"].setQueues(queue_1["default"].queues.map(function (queue) { return queue && queue.bull; }));
    app.use('/admin/queues', exports.isBullAuth, bull_board_1["default"].UI);
}
app.use((0, helmet_1["default"])({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false, crossOriginResourcePolicy: false }));
app.use((0, compression_1["default"])());
app.use(body_parser_1["default"].json({
    limit: '50mb',
    verify: function (req, _res, buf) { req.rawBody = buf; }
}));
app.use(body_parser_1["default"].urlencoded({ limit: '50mb', extended: true }));
app.use((0, cors_1["default"])({
    credentials: true,
    origin: process.env.FRONTEND_URL || false
}));
app.use((0, cookie_parser_1["default"])());
app.use(express_1["default"].json());
app.use(Sentry.Handlers.requestHandler());
// Middleware de autenticação para arquivos de empresa em /public/company{id}/
// Caminhos sem companyId (logo, announcements, etc.) ficam públicos
var publicFileAuth = function (req, res, next) {
    var match = req.path.match(/^\/company(\d+)\//);
    if (!match)
        return next(); // caminho não é de empresa — público
    // Pastas de assets visuais são públicas — carregadas via <img src> sem token
    var PUBLIC_SUBFOLDERS = ["/profile/", "/slider/", "/user/", "/campaign/"];
    if (PUBLIC_SUBFOLDERS.some(function (folder) { return req.path.includes(folder); }))
        return next();
    // Extensões de imagem na raiz da pasta da empresa também são públicas
    if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(req.path))
        return next();
    var authHeader = req.headers.authorization;
    var queryToken = req.query.token;
    var token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]) || queryToken;
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }
    try {
        var decoded = (0, jsonwebtoken_1.verify)(token, auth_1["default"].secret);
        var requestedCompanyId = parseInt(match[1], 10);
        if (decoded.companyId !== requestedCompanyId) {
            res.status(403).send("Forbidden");
            return;
        }
        next();
    }
    catch (_a) {
        res.status(401).send("Unauthorized");
    }
};
app.use("/public", publicFileAuth, express_1["default"].static(upload_1["default"].directory, {
    maxAge: '1h',
    etag: true,
    lastModified: true,
    setHeaders: function (res, filePath) {
        if (/\.(jpg|jpeg|png|gif|webp)$/.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
        else {
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }
    }
}));
// Middleware para evitar cache nas respostas da API
app.use(function (req, res, next) {
    // Não cachear respostas da API
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});
// Rotas públicas do widget WhatsApp — devem vir ANTES do roteador principal
// para nunca passarem por nenhum middleware de autenticação
app.get("/w/:code/embed.js", WhatsappWidgetController.embedScript);
app.post("/w/:code/click", WhatsappWidgetController.trackClick);
app.options("/w/:code/click", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send();
});
app.get(["/", "/health"], function (_req, res) {
    res.status(200).json({
        status: "ok",
        service: "wesender-backend"
    });
});
// Rotas
app.use(routes_1["default"]);
// Manipulador de erros do Sentry
app.use(Sentry.Handlers.errorHandler());
// Middleware de tratamento de erros
app.use(function (err, req, res, _) { return __awaiter(void 0, void 0, void 0, function () {
    var formatFieldName, messages, pgCode, column;
    var _a, _b;
    return __generator(this, function (_c) {
        // Verificar se headers já foram enviados
        if (res.headersSent) {
            return [2 /*return*/];
        }
        formatFieldName = function (field) {
            if (!field)
                return "campo obrigatório";
            return field
                .replace(/_/g, " ")
                .replace(/\b\w/g, function (match) { return match.toUpperCase(); });
        };
        if (err instanceof sequelize_1.ValidationError) {
            messages = err.errors.map(function (error) { return error.message || "Campo '".concat(error.path, "' inv\u00E1lido."); });
            logger_1["default"].warn(err);
            return [2 /*return*/, res.status(400).json({ error: messages[0], errors: messages })];
        }
        if (err instanceof sequelize_1.ForeignKeyConstraintError) {
            logger_1["default"].warn(err);
            return [2 /*return*/, res.status(400).json({
                    error: "Alguma informação relacionada não foi encontrada ou é inválida. Verifique os dados enviados."
                })];
        }
        if (err instanceof sequelize_1.DatabaseError) {
            pgCode = (_a = err.parent) === null || _a === void 0 ? void 0 : _a.code;
            column = (_b = err.parent) === null || _b === void 0 ? void 0 : _b.column;
            if (pgCode === "23502") {
                logger_1["default"].warn(err);
                return [2 /*return*/, res.status(400).json({
                        error: "O campo '".concat(formatFieldName(column), "' \u00E9 obrigat\u00F3rio.")
                    })];
            }
            if (pgCode === "23505") {
                logger_1["default"].warn(err);
                return [2 /*return*/, res.status(400).json({
                        error: "Já existe um registro com essas informações. Ajuste os dados e tente novamente."
                    })];
            }
        }
        if (err instanceof AppError_1["default"]) {
            logger_1["default"].warn(err);
            return [2 /*return*/, res.status(err.statusCode).json({ error: err.message })];
        }
        logger_1["default"].error(err);
        return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
    });
}); });
exports["default"] = app;
