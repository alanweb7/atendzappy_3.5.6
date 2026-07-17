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
exports.remove = exports.qrcode = exports.store = exports.disconnect = exports.restart = exports.update = exports.status = exports.show = exports.index = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var WhatsappQueue_1 = __importDefault(require("../../models/WhatsappQueue"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var socket_1 = require("../../libs/socket");
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var serializeWhatsapp = function (whatsapp) {
    var _a;
    return ({
        id: whatsapp.id,
        name: whatsapp.name,
        number: whatsapp.number,
        status: whatsapp.status,
        channel: whatsapp.channel || "whatsapp",
        isDefault: whatsapp.isDefault,
        allowGroup: whatsapp.allowGroup,
        battery: whatsapp.battery,
        plugged: whatsapp.plugged,
        provider: whatsapp.provider,
        greetingMessage: whatsapp.greetingMessage,
        farewellMessage: whatsapp.farewellMessage,
        complationMessage: whatsapp.complationMessage,
        outOfHoursMessage: whatsapp.outOfHoursMessage,
        queues: ((_a = whatsapp.queues) === null || _a === void 0 ? void 0 : _a.map(function (q) { return ({
            id: q.id,
            name: q.name,
            color: q.color
        }); })) || [],
        createdAt: whatsapp.createdAt,
        updatedAt: whatsapp.updatedAt
    });
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, whatsapps;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                return [4 /*yield*/, Whatsapp_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            channel: "whatsapp"
                        },
                        include: [
                            {
                                model: Queue_1["default"],
                                as: "queues",
                                attributes: ["id", "name", "color"],
                                through: { attributes: [] }
                            }
                        ],
                        order: [["name", "ASC"]]
                    })];
            case 1:
                whatsapps = _a.sent();
                return [2 /*return*/, res.json({
                        whatsapps: whatsapps.map(serializeWhatsapp)
                    })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: companyId,
                            channel: "whatsapp"
                        },
                        include: [
                            {
                                model: Queue_1["default"],
                                as: "queues",
                                attributes: ["id", "name", "color"],
                                through: { attributes: [] }
                            }
                        ]
                    })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json(serializeWhatsapp(whatsapp))];
        }
    });
}); };
exports.show = show;
var status = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: companyId,
                            channel: "whatsapp"
                        }
                    })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json({
                        id: whatsapp.id,
                        name: whatsapp.name,
                        number: whatsapp.number,
                        status: whatsapp.status,
                        battery: whatsapp.battery,
                        plugged: whatsapp.plugged,
                        qrcode: whatsapp.qrcode,
                        retries: whatsapp.retries
                    })];
        }
    });
}); };
exports.status = status;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, name, greetingMessage, farewellMessage, complationMessage, outOfHoursMessage, isDefault, allowGroup, queueIds, whatsapp, updateData, _i, queueIds_1, queueId, queue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, name = _a.name, greetingMessage = _a.greetingMessage, farewellMessage = _a.farewellMessage, complationMessage = _a.complationMessage, outOfHoursMessage = _a.outOfHoursMessage, isDefault = _a.isDefault, allowGroup = _a.allowGroup, queueIds = _a.queueIds;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: externalAuth.companyId,
                            channel: "whatsapp"
                        }
                    })];
            case 1:
                whatsapp = _b.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                updateData = {};
                if (name !== undefined)
                    updateData.name = name;
                if (greetingMessage !== undefined)
                    updateData.greetingMessage = greetingMessage;
                if (farewellMessage !== undefined)
                    updateData.farewellMessage = farewellMessage;
                if (complationMessage !== undefined)
                    updateData.complationMessage = complationMessage;
                if (outOfHoursMessage !== undefined)
                    updateData.outOfHoursMessage = outOfHoursMessage;
                if (isDefault !== undefined)
                    updateData.isDefault = isDefault;
                if (allowGroup !== undefined)
                    updateData.allowGroup = allowGroup;
                return [4 /*yield*/, whatsapp.update(updateData)];
            case 2:
                _b.sent();
                if (!(queueIds !== undefined && Array.isArray(queueIds))) return [3 /*break*/, 8];
                return [4 /*yield*/, WhatsappQueue_1["default"].destroy({ where: { whatsappId: whatsapp.id } })];
            case 3:
                _b.sent();
                _i = 0, queueIds_1 = queueIds;
                _b.label = 4;
            case 4:
                if (!(_i < queueIds_1.length)) return [3 /*break*/, 8];
                queueId = queueIds_1[_i];
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { id: queueId, companyId: externalAuth.companyId }
                    })];
            case 5:
                queue = _b.sent();
                if (!queue) return [3 /*break*/, 7];
                return [4 /*yield*/, WhatsappQueue_1["default"].create({
                        whatsappId: whatsapp.id,
                        queueId: queueId
                    })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 4];
            case 8: return [4 /*yield*/, whatsapp.reload({
                    include: [
                        {
                            model: Queue_1["default"],
                            as: "queues",
                            attributes: ["id", "name", "color"],
                            through: { attributes: [] }
                        }
                    ]
                })];
            case 9:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "whatsapp.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            whatsapp: serializeWhatsapp(whatsapp)
                        }
                    })];
            case 10:
                _b.sent();
                return [2 /*return*/, res.json(serializeWhatsapp(whatsapp))];
        }
    });
}); };
exports.update = update;
var restart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: externalAuth.companyId,
                            channel: "whatsapp"
                        }
                    })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                // Resetar status para forçar reconexão
                return [4 /*yield*/, whatsapp.update({
                        status: "OPENING",
                        qrcode: "",
                        retries: 0
                    })];
            case 2:
                // Resetar status para forçar reconexão
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "whatsapp.restarting",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            whatsappId: whatsapp.id,
                            name: whatsapp.name
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({
                        message: "Conexão reiniciando...",
                        whatsappId: whatsapp.id,
                        status: "OPENING"
                    })];
        }
    });
}); };
exports.restart = restart;
var disconnect = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: externalAuth.companyId,
                            channel: "whatsapp"
                        }
                    })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                return [4 /*yield*/, whatsapp.update({
                        status: "DISCONNECTED",
                        session: "",
                        qrcode: "",
                        retries: 0
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "whatsapp.disconnected",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            whatsappId: whatsapp.id,
                            name: whatsapp.name
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({
                        message: "Conexão desconectada",
                        whatsappId: whatsapp.id,
                        status: "DISCONNECTED"
                    })];
        }
    });
}); };
exports.disconnect = disconnect;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, name, greetingMessage, farewellMessage, complationMessage, outOfHoursMessage, isDefault, allowGroup, queueIds, provider, existingWhatsapp, whatsapp, _i, queueIds_2, queueId, queue, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.body, name = _a.name, greetingMessage = _a.greetingMessage, farewellMessage = _a.farewellMessage, complationMessage = _a.complationMessage, outOfHoursMessage = _a.outOfHoursMessage, isDefault = _a.isDefault, allowGroup = _a.allowGroup, queueIds = _a.queueIds, provider = _a.provider;
                if (!name) {
                    throw new AppError_1["default"]("ERR_NAME_REQUIRED", 400);
                }
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: { name: name, companyId: externalAuth.companyId }
                    })];
            case 1:
                existingWhatsapp = _b.sent();
                if (existingWhatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NAME_ALREADY_EXISTS", 400);
                }
                if (!isDefault) return [3 /*break*/, 3];
                return [4 /*yield*/, Whatsapp_1["default"].update({ isDefault: false }, { where: { companyId: externalAuth.companyId, isDefault: true } })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, Whatsapp_1["default"].create({
                    name: name,
                    companyId: externalAuth.companyId,
                    channel: "whatsapp",
                    provider: provider || "stable",
                    greetingMessage: greetingMessage || "",
                    farewellMessage: farewellMessage || "",
                    complationMessage: complationMessage || "",
                    outOfHoursMessage: outOfHoursMessage || "",
                    isDefault: isDefault || false,
                    allowGroup: allowGroup || false,
                    status: "OPENING",
                    retries: 0
                })];
            case 4:
                whatsapp = _b.sent();
                if (!(queueIds && Array.isArray(queueIds))) return [3 /*break*/, 9];
                _i = 0, queueIds_2 = queueIds;
                _b.label = 5;
            case 5:
                if (!(_i < queueIds_2.length)) return [3 /*break*/, 9];
                queueId = queueIds_2[_i];
                return [4 /*yield*/, Queue_1["default"].findOne({
                        where: { id: queueId, companyId: externalAuth.companyId }
                    })];
            case 6:
                queue = _b.sent();
                if (!queue) return [3 /*break*/, 8];
                return [4 /*yield*/, WhatsappQueue_1["default"].create({
                        whatsappId: whatsapp.id,
                        queueId: queueId
                    })];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 5];
            case 9: return [4 /*yield*/, whatsapp.reload({
                    include: [
                        {
                            model: Queue_1["default"],
                            as: "queues",
                            attributes: ["id", "name", "color"],
                            through: { attributes: [] }
                        }
                    ]
                })];
            case 10:
                _b.sent();
                io = (0, socket_1.getIO)();
                io.to("company-".concat(externalAuth.companyId, "-mainchannel")).emit("company-".concat(externalAuth.companyId, "-whatsapp"), {
                    action: "update",
                    whatsapp: whatsapp
                });
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "whatsapp.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            whatsapp: serializeWhatsapp(whatsapp)
                        }
                    })];
            case 11:
                _b.sent();
                return [2 /*return*/, res.status(201).json(__assign(__assign({}, serializeWhatsapp(whatsapp)), { message: "Conexão criada. Aguarde o QR Code ser gerado." }))];
        }
    });
}); };
exports.store = store;
var qrcode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, whatsapp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: companyId,
                            channel: "whatsapp"
                        }
                    })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json({
                        id: whatsapp.id,
                        name: whatsapp.name,
                        status: whatsapp.status,
                        qrcode: whatsapp.qrcode || null,
                        retries: whatsapp.retries,
                        message: whatsapp.qrcode
                            ? "QR Code disponível. Escaneie com o WhatsApp."
                            : whatsapp.status === "CONNECTED"
                                ? "Conexão já está ativa."
                                : "QR Code ainda não foi gerado. Aguarde alguns segundos."
                    })];
        }
    });
}); };
exports.qrcode = qrcode;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, whatsapp, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            id: Number(id),
                            companyId: externalAuth.companyId,
                            channel: "whatsapp"
                        }
                    })];
            case 1:
                whatsapp = _a.sent();
                if (!whatsapp) {
                    throw new AppError_1["default"]("ERR_WHATSAPP_NOT_FOUND", 404);
                }
                // Remover associações
                return [4 /*yield*/, WhatsappQueue_1["default"].destroy({ where: { whatsappId: whatsapp.id } })];
            case 2:
                // Remover associações
                _a.sent();
                return [4 /*yield*/, whatsapp.destroy()];
            case 3:
                _a.sent();
                io = (0, socket_1.getIO)();
                io.to("company-".concat(externalAuth.companyId, "-mainchannel")).emit("company-".concat(externalAuth.companyId, "-whatsapp"), {
                    action: "delete",
                    whatsappId: Number(id)
                });
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "whatsapp.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            whatsappId: Number(id)
                        }
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Conexão removida com sucesso" })];
        }
    });
}); };
exports.remove = remove;
