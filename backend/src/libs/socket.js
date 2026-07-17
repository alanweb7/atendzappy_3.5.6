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
exports.getIO = exports.initIO = void 0;
var socket_io_1 = require("socket.io");
var AppError_1 = __importDefault(require("../errors/AppError"));
var User_1 = __importDefault(require("../models/User"));
var io;
var initIO = function (httpServer) {
    io = new socket_io_1.Server(httpServer, {
        allowRequest: function (req, callback) {
            // Permite qualquer origem
            callback(null, true);
        },
        cors: {
            origin: true // Permite qualquer origem
        }
    });
    // if (process.env.SOCKET_ADMIN && JSON.parse(process.env.SOCKET_ADMIN)) {
    //   User.findByPk(1).then(
    //     (adminUser) => {
    //       instrument(io, {
    //         auth: {
    //           type: "basic",
    //           username: adminUser.email,
    //           password: adminUser.passwordHash
    //         },
    //         mode: "development",
    //       });
    //     }
    //   );
    // }
    var workspaces = io.of(/^\/\w+$/);
    workspaces.on("connection", function (socket) {
        var _a;
        var rawUserId = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.userId;
        var parsedUserId = rawUserId && rawUserId !== "undefined" && rawUserId !== "null"
            ? Number(rawUserId)
            : null;
        // Caso o userId válido seja passado, armazene no socket
        if (parsedUserId && !Number.isNaN(parsedUserId)) {
            socket.data.userId = parsedUserId;
        }
        else {
            socket.data.userId = null;
        }
        var offlineTimeout = null;
        // Quando o cliente se desconectar
        socket.on("disconnect", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                userId = socket.data.userId;
                console.log("Client disconnected: ".concat(socket.id));
                if (userId) {
                    // Inicia o timer de 60 segundos se tiver necessidade
                    offlineTimeout = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    // Atualiza o status do usuário para offline instant
                                    return [4 /*yield*/, User_1["default"].update({ online: false }, { where: { id: userId } })];
                                case 1:
                                    // Atualiza o status do usuário para offline instant
                                    _a.sent();
                                    console.log("User ".concat(userId, " marcado como off-line ap\u00F3s fechar o navegador"));
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    console.error("Erro ao marcar o usuário como offline:", error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, 0); // instant para marcar como offline
                }
                return [2 /*return*/];
            });
        }); });
        // Quando o cliente reconectar
        socket.on('reconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = socket.data.userId;
                        console.log("Client reconnected: ".concat(socket.id));
                        if (offlineTimeout) {
                            // Se o cliente reconectar, limpa o timer
                            clearTimeout(offlineTimeout);
                            offlineTimeout = null;
                        }
                        if (!userId) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Atualiza o status para "online"
                        return [4 /*yield*/, User_1["default"].update({ online: true }, { where: { id: userId } })];
                    case 2:
                        // Atualiza o status para "online"
                        _a.sent();
                        console.log("User ".concat(userId, " marcado como on-line"));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Erro ao marcar o usuário como online:", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // Outros eventos de conexão
        socket.on("joinChatBox", function (ticketId) {
            socket.join(ticketId);
        });
        socket.on("joinNotification", function () {
            socket.join("notification");
        });
        socket.on("joinTickets", function (status) {
            socket.join(status);
        });
        socket.on("joinTicketsLeave", function (status) {
            socket.leave(status);
        });
        socket.on("joinChatBoxLeave", function (ticketId) {
            socket.leave(ticketId);
        });
    });
    return io;
};
exports.initIO = initIO;
var getIO = function () {
    if (!io) {
        throw new AppError_1["default"]("Socket IO not initialized");
    }
    return io;
};
exports.getIO = getIO;
