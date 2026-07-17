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
exports.summary = exports.show = exports.index = exports.update = exports.store = void 0;
var sequelize_1 = require("sequelize");
var CallRecord_1 = __importDefault(require("../models/CallRecord"));
var Contact_1 = __importDefault(require("../models/Contact"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var User_1 = __importDefault(require("../models/User"));
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, _b, contactId, whatsappId, ticketId, toNumber, callRecord, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                _b = req.body, contactId = _b.contactId, whatsappId = _b.whatsappId, ticketId = _b.ticketId, toNumber = _b.toNumber;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, CallRecord_1["default"].create({
                        callId: "out-".concat(Date.now()),
                        type: "outgoing",
                        status: "answered",
                        fromNumber: "",
                        toNumber: toNumber || "",
                        duration: 0,
                        contactId: contactId || null,
                        whatsappId: whatsappId || null,
                        ticketId: ticketId || null,
                        userId: userId,
                        companyId: companyId,
                        callStartedAt: new Date()
                    })];
            case 2:
                callRecord = _c.sent();
                return [2 /*return*/, res.status(201).json(callRecord)];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao registrar chamada" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, _a, status, duration, record, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                _a = req.body, status = _a.status, duration = _a.duration;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, CallRecord_1["default"].findOne({ where: { id: id, companyId: companyId } })];
            case 2:
                record = _b.sent();
                if (!record)
                    return [2 /*return*/, res.status(404).json({ error: "Registro não encontrado" })];
                return [4 /*yield*/, record.update({
                        status: status || record.status,
                        duration: duration || record.duration,
                        callEndedAt: new Date()
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json(record)];
            case 4:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao atualizar chamada" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, profile, _b, _c, pageNumber, status, dateStart, dateEnd, contactNumber, whatsappId, limit, offset, where, _d, count, records, hasMore;
    var _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id, profile = _a.profile;
                _b = req.query, _c = _b.pageNumber, pageNumber = _c === void 0 ? "1" : _c, status = _b.status, dateStart = _b.dateStart, dateEnd = _b.dateEnd, contactNumber = _b.contactNumber, whatsappId = _b.whatsappId;
                limit = 40;
                offset = limit * (Number(pageNumber) - 1);
                where = { companyId: companyId };
                // Usuário comum só vê suas próprias chamadas
                if (profile !== "admin") {
                    where.userId = userId;
                }
                if (status) {
                    where.status = status;
                }
                if (dateStart && dateEnd) {
                    where.createdAt = (_e = {},
                        _e[sequelize_1.Op.between] = [new Date("".concat(dateStart, "T00:00:00")), new Date("".concat(dateEnd, "T23:59:59"))],
                        _e);
                }
                else if (dateStart) {
                    where.createdAt = (_f = {},
                        _f[sequelize_1.Op.gte] = new Date("".concat(dateStart, "T00:00:00")),
                        _f);
                }
                if (contactNumber) {
                    where.fromNumber = (_g = {}, _g[sequelize_1.Op.like] = "%".concat(contactNumber, "%"), _g);
                }
                if (whatsappId) {
                    where.whatsappId = Number(whatsappId);
                }
                // Não mostrar registros com status "ringing" (chamadas em andamento)
                if (!status) {
                    where.status = (_h = {}, _h[sequelize_1.Op.ne] = "ringing", _h);
                }
                return [4 /*yield*/, CallRecord_1["default"].findAndCountAll({
                        where: where,
                        include: [
                            {
                                model: Contact_1["default"],
                                as: "contact",
                                attributes: ["id", "name", "number", "profilePicUrl"]
                            },
                            {
                                model: Whatsapp_1["default"],
                                as: "whatsapp",
                                attributes: ["id", "name"]
                            },
                            {
                                model: User_1["default"],
                                as: "user",
                                attributes: ["id", "name"]
                            }
                        ],
                        order: [["createdAt", "DESC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 1:
                _d = _j.sent(), count = _d.count, records = _d.rows;
                hasMore = count > offset + records.length;
                return [2 /*return*/, res.json({ records: records, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, companyId, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                companyId = req.user.companyId;
                return [4 /*yield*/, CallRecord_1["default"].findOne({
                        where: { id: id, companyId: companyId },
                        include: [
                            {
                                model: Contact_1["default"],
                                as: "contact",
                                attributes: ["id", "name", "number", "profilePicUrl"]
                            },
                            {
                                model: Whatsapp_1["default"],
                                as: "whatsapp",
                                attributes: ["id", "name"]
                            },
                            {
                                model: User_1["default"],
                                as: "user",
                                attributes: ["id", "name"]
                            }
                        ]
                    })];
            case 1:
                record = _a.sent();
                if (!record) {
                    return [2 /*return*/, res.status(404).json({ error: "Call record not found" })];
                }
                return [2 /*return*/, res.json(record)];
        }
    });
}); };
exports.show = show;
var summary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, profile, _b, dateStart, dateEnd, where, total, answered, missed, busy;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id, profile = _a.profile;
                _b = req.query, dateStart = _b.dateStart, dateEnd = _b.dateEnd;
                where = {
                    companyId: companyId,
                    status: (_c = {}, _c[sequelize_1.Op.ne] = "ringing", _c)
                };
                // Usuário comum só vê resumo das suas próprias chamadas
                if (profile !== "admin") {
                    where.userId = userId;
                }
                if (dateStart && dateEnd) {
                    where.createdAt = (_d = {},
                        _d[sequelize_1.Op.between] = [new Date("".concat(dateStart, "T00:00:00")), new Date("".concat(dateEnd, "T23:59:59"))],
                        _d);
                }
                return [4 /*yield*/, CallRecord_1["default"].count({ where: where })];
            case 1:
                total = _e.sent();
                return [4 /*yield*/, CallRecord_1["default"].count({ where: __assign(__assign({}, where), { status: "answered" }) })];
            case 2:
                answered = _e.sent();
                return [4 /*yield*/, CallRecord_1["default"].count({ where: __assign(__assign({}, where), { status: "missed" }) })];
            case 3:
                missed = _e.sent();
                return [4 /*yield*/, CallRecord_1["default"].count({ where: __assign(__assign({}, where), { status: "busy" }) })];
            case 4:
                busy = _e.sent();
                return [2 /*return*/, res.json({ total: total, answered: answered, missed: missed, busy: busy })];
        }
    });
}); };
exports.summary = summary;
