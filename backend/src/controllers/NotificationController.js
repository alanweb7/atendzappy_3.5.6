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
exports.notifyNewMessage = exports.sendPushNotification = exports.unregisterDevice = exports.registerDevice = void 0;
var socket_1 = require("../libs/socket");
var Ticket_1 = __importDefault(require("../models/Ticket"));
var User_1 = __importDefault(require("../models/User"));
var UserDevice_1 = __importDefault(require("../models/UserDevice"));
var Contact_1 = __importDefault(require("../models/Contact"));
// Serviço para registrar dispositivo móvel para notificações
var registerDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, deviceToken, platform, userId, existingDevice, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, deviceToken = _a.deviceToken, platform = _a.platform;
                userId = req.user.id;
                if (!deviceToken || !platform) {
                    throw new Error("ERR_MISSING_DEVICE_INFO");
                }
                return [4 /*yield*/, UserDevice_1["default"].findOne({
                        where: { userId: userId, deviceToken: deviceToken }
                    })];
            case 1:
                existingDevice = _b.sent();
                if (!existingDevice) return [3 /*break*/, 3];
                // Atualizar dispositivo existente
                return [4 /*yield*/, existingDevice.update({ platform: platform, updatedAt: new Date() })];
            case 2:
                // Atualizar dispositivo existente
                _b.sent();
                return [3 /*break*/, 5];
            case 3: 
            // Criar novo registro de dispositivo
            return [4 /*yield*/, UserDevice_1["default"].create({
                    userId: userId,
                    deviceToken: deviceToken,
                    platform: platform,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })];
            case 4:
                // Criar novo registro de dispositivo
                _b.sent();
                _b.label = 5;
            case 5: return [2 /*return*/, res.status(200).json({ success: true, message: "Device registered successfully" })];
            case 6:
                error_1 = _b.sent();
                console.error("Error registering device:", error_1);
                return [2 /*return*/, res.status(400).json({ success: false, error: error_1.message })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.registerDevice = registerDevice;
// Serviço para remover dispositivo
var unregisterDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deviceToken, userId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                deviceToken = req.body.deviceToken;
                userId = req.user.id;
                return [4 /*yield*/, UserDevice_1["default"].destroy({
                        where: { userId: userId, deviceToken: deviceToken }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, message: "Device unregistered successfully" })];
            case 2:
                error_2 = _a.sent();
                console.error("Error unregistering device:", error_2);
                return [2 /*return*/, res.status(400).json({ success: false, error: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unregisterDevice = unregisterDevice;
// Função para enviar notificação push para dispositivos móveis
var sendPushNotification = function (userId, title, body, data) { return __awaiter(void 0, void 0, void 0, function () {
    var devices, androidDevices, iosDevices, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserDevice_1["default"].findAll({
                        where: { userId: userId }
                    })];
            case 1:
                devices = _a.sent();
                if (devices.length === 0) {
                    return [2 /*return*/];
                }
                androidDevices = devices.filter(function (d) { return d.platform === 'android'; }).map(function (d) { return d.deviceToken; });
                iosDevices = devices.filter(function (d) { return d.platform === 'ios'; }).map(function (d) { return d.deviceToken; });
                // Enviar notificações (implementar com Firebase Cloud Messaging ou similar)
                if (androidDevices.length > 0) {
                    // Implementar envio para Android
                    console.log("Sending push notification to Android devices: ".concat(androidDevices.join(', ')));
                }
                if (iosDevices.length > 0) {
                    // Implementar envio para iOS
                    console.log("Sending push notification to iOS devices: ".concat(iosDevices.join(', ')));
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error sending push notification:", error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendPushNotification = sendPushNotification;
// Middleware para enviar notificação quando nova mensagem chega
var notifyNewMessage = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, io, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Ticket_1["default"].findByPk(message.ticketId, {
                        include: [
                            { model: User_1["default"], as: 'user' },
                            { model: Contact_1["default"], as: 'contact' }
                        ]
                    })];
            case 1:
                ticket = _b.sent();
                if (!ticket || !ticket.user) {
                    return [2 /*return*/];
                }
                // Enviar notificação push
                return [4 /*yield*/, (0, exports.sendPushNotification)(ticket.user.id, "Nova mensagem de ".concat(((_a = ticket.contact) === null || _a === void 0 ? void 0 : _a.name) || 'Contato'), message.body || 'Nova mensagem', {
                        ticketId: ticket.id,
                        messageId: message.id,
                        contactId: ticket.contactId
                    })];
            case 2:
                // Enviar notificação push
                _b.sent();
                io = (0, socket_1.getIO)();
                io.of(ticket.companyId.toString()).emit("company-".concat(ticket.companyId, "-message"), {
                    action: "create",
                    message: message,
                    ticket: {
                        id: ticket.id,
                        userId: ticket.userId,
                        contactId: ticket.contactId
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error("Error notifying new message:", error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.notifyNewMessage = notifyNewMessage;
