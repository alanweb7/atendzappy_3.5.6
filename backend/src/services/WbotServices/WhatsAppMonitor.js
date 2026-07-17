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
var logger_1 = __importDefault(require("../../utils/logger"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var socket_1 = require("../../libs/socket");
var WhatsAppMonitor = /** @class */ (function () {
    function WhatsAppMonitor() {
        this.connections = new Map();
        this.reconnectAttempts = new Map();
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000; // 1 segundo inicial
        this.startHealthCheck();
    }
    // Monitorar desconexões
    WhatsAppMonitor.prototype.onConnectionLost = function (whatsappId) {
        var stats = this.connections.get(whatsappId) || {
            disconnectionCount: 0,
            totalDowntime: 0
        };
        stats.disconnectedAt = new Date();
        stats.disconnectionCount++;
        this.connections.set(whatsappId, stats);
        logger_1["default"].error("[WHATSAPP MONITOR] Conex\u00E3o perdida - WhatsApp ID: ".concat(whatsappId, ", Desconex\u00F5es: ").concat(stats.disconnectionCount));
        // Notificar frontend
        this.notifyConnectionStatus(whatsappId, 'disconnected');
    };
    // Monitorar reconexões
    WhatsAppMonitor.prototype.onConnectionRestored = function (whatsappId) {
        var stats = this.connections.get(whatsappId);
        if (!stats || !stats.disconnectedAt)
            return;
        var reconnectedAt = new Date();
        var downtime = reconnectedAt.getTime() - stats.disconnectedAt.getTime();
        stats.reconnectedAt = reconnectedAt;
        stats.totalDowntime += downtime;
        this.connections.set(whatsappId, stats);
        // Resetar tentativas de reconexão
        this.reconnectAttempts["delete"](whatsappId);
        logger_1["default"].info("[WHATSAPP MONITOR] Conex\u00E3o restaurada - WhatsApp ID: ".concat(whatsappId, ", Downtime: ").concat(downtime, "ms"));
        // Notificar frontend
        this.notifyConnectionStatus(whatsappId, 'connected');
    };
    // Tentativa de reconexão automática
    WhatsAppMonitor.prototype.attemptReconnection = function (whatsappId) {
        return __awaiter(this, void 0, void 0, function () {
            var attempts, delay, whatsapp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempts = this.reconnectAttempts.get(whatsappId) || 0;
                        if (attempts >= this.maxReconnectAttempts) {
                            logger_1["default"].error("[WHATSAPP MONITOR] M\u00E1ximo de tentativas de reconex\u00E3o atingido - WhatsApp ID: ".concat(whatsappId));
                            return [2 /*return*/, false];
                        }
                        this.reconnectAttempts.set(whatsappId, attempts + 1);
                        delay = this.reconnectDelay * Math.pow(2, attempts);
                        logger_1["default"].info("[WHATSAPP MONITOR] Tentativa ".concat(attempts + 1, "/").concat(this.maxReconnectAttempts, " de reconex\u00E3o em ").concat(delay, "ms - WhatsApp ID: ").concat(whatsappId));
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
                    case 3:
                        whatsapp = _a.sent();
                        if (whatsapp && whatsapp.status === 'disconnected') {
                            // Implementar reconexão real aqui
                            logger_1["default"].info("[WHATSAPP MONITOR] Reconectando WhatsApp ID: ".concat(whatsappId));
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        logger_1["default"].error("[WHATSAPP MONITOR] Erro na tentativa de reconex\u00E3o - WhatsApp ID: ".concat(whatsappId), error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    // Notificar frontend sobre status da conexão
    WhatsAppMonitor.prototype.notifyConnectionStatus = function (whatsappId, status) {
        try {
            var io = (0, socket_1.getIO)();
            io.emit("whatsapp-".concat(whatsappId, "-connection"), {
                status: status,
                timestamp: new Date(),
                stats: this.connections.get(whatsappId)
            });
        }
        catch (error) {
            logger_1["default"].error("[WHATSAPP MONITOR] Erro ao notificar frontend - WhatsApp ID: ".concat(whatsappId), error);
        }
    };
    // Health check periódico
    WhatsAppMonitor.prototype.startHealthCheck = function () {
        var _this = this;
        setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkAllConnections()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 30000); // Verificar a cada 30 segundos
    };
    // Verificar todas as conexões
    WhatsAppMonitor.prototype.checkAllConnections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var whatsapps, _i, whatsapps_1, whatsapp, stats, disconnectedTime, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, Whatsapp_1["default"].findAll({
                                where: { status: 'connected' }
                            })];
                    case 1:
                        whatsapps = _a.sent();
                        _i = 0, whatsapps_1 = whatsapps;
                        _a.label = 2;
                    case 2:
                        if (!(_i < whatsapps_1.length)) return [3 /*break*/, 5];
                        whatsapp = whatsapps_1[_i];
                        stats = this.connections.get(whatsapp.id);
                        if (!((stats === null || stats === void 0 ? void 0 : stats.disconnectedAt) && !stats.reconnectedAt)) return [3 /*break*/, 4];
                        disconnectedTime = new Date().getTime() - stats.disconnectedAt.getTime();
                        if (!(disconnectedTime > 5 * 60 * 1000)) return [3 /*break*/, 4];
                        logger_1["default"].warn("[WHATSAPP MONITOR] Detectada desconex\u00E3o longa - WhatsApp ID: ".concat(whatsapp.id, ", Tempo: ").concat(disconnectedTime, "ms"));
                        return [4 /*yield*/, this.attemptReconnection(whatsapp.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        logger_1["default"].error('[WHATSAPP MONITOR] Erro no health check', error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Obter estatísticas de conexão
    WhatsAppMonitor.prototype.getConnectionStats = function (whatsappId) {
        return this.connections.get(whatsappId) || null;
    };
    // Obter todas as estatísticas
    WhatsAppMonitor.prototype.getAllConnectionStats = function () {
        return new Map(this.connections);
    };
    // Resetar estatísticas
    WhatsAppMonitor.prototype.resetStats = function (whatsappId) {
        this.connections["delete"](whatsappId);
        this.reconnectAttempts["delete"](whatsappId);
        logger_1["default"].info("[WHATSAPP MONITOR] Estat\u00EDsticas resetadas - WhatsApp ID: ".concat(whatsappId));
    };
    return WhatsAppMonitor;
}());
exports["default"] = new WhatsAppMonitor();
