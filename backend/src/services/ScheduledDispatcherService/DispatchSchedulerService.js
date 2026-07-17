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
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var sequelize_1 = require("sequelize");
var ScheduledDispatcher_1 = __importDefault(require("../../models/ScheduledDispatcher"));
var ScheduledDispatchLog_1 = __importDefault(require("../../models/ScheduledDispatchLog"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var dispatchQueue_1 = require("../../queues/dispatchQueue");
var logger_1 = __importDefault(require("../../utils/logger"));
var TZ = process.env.TZ || "America/Sao_Paulo";
var OPEN_INVOICE_STATUS = ["aberta", "vencida"];
var hasRunForContactToday = function (dispatcherId, companyId, contactId, dayStart, dayEnd) { return __awaiter(void 0, void 0, void 0, function () {
    var existing;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ScheduledDispatchLog_1["default"].findOne({
                    where: {
                        dispatcherId: dispatcherId,
                        companyId: companyId,
                        contactId: contactId,
                        createdAt: (_a = {},
                            _a[sequelize_1.Op.between] = [dayStart, dayEnd],
                            _a)
                    }
                })];
            case 1:
                existing = _b.sent();
                return [2 /*return*/, !!existing];
        }
    });
}); };
var collectBirthdayTargets = function (dispatcher, now) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, today;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, CrmClient_1["default"].findAll({
                    where: {
                        companyId: dispatcher.companyId,
                        birthDate: (_a = {}, _a[sequelize_1.Op.ne] = null, _a),
                        status: "active"
                    },
                    include: [
                        {
                            model: Contact_1["default"],
                            as: "contact"
                        }
                    ]
                })];
            case 1:
                clients = _b.sent();
                today = now.format("MM-DD");
                return [2 /*return*/, clients
                        .map(function (client) {
                        if (!client.birthDate)
                            return null;
                        var birthday = (0, moment_timezone_1["default"])(client.birthDate).tz(TZ).format("MM-DD");
                        if (birthday !== today)
                            return null;
                        var contact = client.contact;
                        if (!(contact === null || contact === void 0 ? void 0 : contact.id) || !contact.number)
                            return null;
                        return { contact: contact, client: client };
                    })
                        .filter(Boolean)];
        }
    });
}); };
var collectReminderTargets = function (dispatcher, now) { return __awaiter(void 0, void 0, void 0, function () {
    var daysBefore, targetDate, invoices;
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                daysBefore = (_b = dispatcher.daysBeforeDue) !== null && _b !== void 0 ? _b : 0;
                targetDate = now
                    .clone()
                    .add(daysBefore, "days")
                    .format("YYYY-MM-DD");
                return [4 /*yield*/, FinanceiroFatura_1["default"].findAll({
                        where: {
                            companyId: dispatcher.companyId,
                            status: (_a = {}, _a[sequelize_1.Op["in"]] = OPEN_INVOICE_STATUS, _a),
                            dataVencimento: targetDate
                        },
                        include: [
                            {
                                model: CrmClient_1["default"],
                                include: [
                                    {
                                        model: Contact_1["default"],
                                        as: "contact"
                                    }
                                ]
                            }
                        ]
                    })];
            case 1:
                invoices = _c.sent();
                return [2 /*return*/, invoices
                        .map(function (invoice) {
                        var _a;
                        var contact = (_a = invoice.client) === null || _a === void 0 ? void 0 : _a.contact;
                        if (!contact)
                            return null;
                        return {
                            contact: contact,
                            client: invoice.client,
                            extra: { invoice: invoice }
                        };
                    })
                        .filter(Boolean)];
        }
    });
}); };
var collectOverdueTargets = function (dispatcher, now) { return __awaiter(void 0, void 0, void 0, function () {
    var daysAfter, limitDate, invoices;
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                daysAfter = (_c = dispatcher.daysAfterDue) !== null && _c !== void 0 ? _c : 0;
                limitDate = now.clone().subtract(daysAfter, "days").format("YYYY-MM-DD");
                return [4 /*yield*/, FinanceiroFatura_1["default"].findAll({
                        where: {
                            companyId: dispatcher.companyId,
                            status: (_a = {}, _a[sequelize_1.Op["in"]] = OPEN_INVOICE_STATUS, _a),
                            dataVencimento: (_b = {}, _b[sequelize_1.Op.lte] = limitDate, _b)
                        },
                        include: [
                            {
                                model: CrmClient_1["default"],
                                include: [
                                    {
                                        model: Contact_1["default"],
                                        as: "contact"
                                    }
                                ]
                            }
                        ]
                    })];
            case 1:
                invoices = _d.sent();
                return [2 /*return*/, invoices
                        .map(function (invoice) {
                        var _a;
                        var contact = (_a = invoice.client) === null || _a === void 0 ? void 0 : _a.contact;
                        if (!contact)
                            return null;
                        return {
                            contact: contact,
                            client: invoice.client,
                            extra: { invoice: invoice }
                        };
                    })
                        .filter(Boolean)];
        }
    });
}); };
var formatCurrencyPtBr = function (value) {
    var numericValue = Number(value !== null && value !== void 0 ? value : 0);
    return numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
var buildVariables = function (dispatcher, contact, extra, client) {
    var _a, _b;
    var variables = {
        contactName: contact.name,
        firstName: ((_a = contact.name) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) || "",
        contactNumber: contact.number,
        contactEmail: contact.email,
        dispatcherTitle: dispatcher.title
    };
    if (client) {
        variables.clientName = client.name || client.companyName;
        variables.clientType = client.type;
        variables.clientStatus = client.status;
        if (client.birthDate) {
            variables.clientBirthday = (0, moment_timezone_1["default"])(client.birthDate).format("YYYY-MM-DD");
        }
    }
    if (contact.birthday) {
        variables.contactBirthday = (0, moment_timezone_1["default"])(contact.birthday).format("YYYY-MM-DD");
    }
    if (extra === null || extra === void 0 ? void 0 : extra.invoice) {
        var invoice = extra.invoice;
        var dueMoment = (0, moment_timezone_1["default"])(invoice.dataVencimento).tz(TZ);
        var invoiceNumericValue = Number((_b = invoice.valor) !== null && _b !== void 0 ? _b : 0);
        variables.invoiceId = invoice.id;
        variables.invoiceValue = formatCurrencyPtBr(invoice.valor);
        variables.invoiceValueRaw = invoiceNumericValue;
        variables.invoiceDueDate = dueMoment.format("DD/MM/YYYY");
        variables.invoiceDueDateISO = dueMoment.format("YYYY-MM-DD");
        variables.invoiceStatus = invoice.status;
        variables.invoiceDescription = invoice.descricao || "";
        var today = (0, moment_timezone_1["default"])().tz(TZ);
        variables.daysUntilDue = dueMoment.diff(today, "days");
        variables.daysLate = today.diff(dueMoment, "days");
    }
    return variables;
};
var loadTargets = function (dispatcher, now) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (dispatcher.eventType) {
            case "birthday":
                return [2 /*return*/, collectBirthdayTargets(dispatcher, now)];
            case "invoice_reminder":
                return [2 /*return*/, collectReminderTargets(dispatcher, now)];
            case "invoice_overdue":
                return [2 /*return*/, collectOverdueTargets(dispatcher, now)];
            default:
                return [2 /*return*/, []];
        }
        return [2 /*return*/];
    });
}); };
var ensureDispatcherReady = function (dispatcher, now) {
    var startDateTime = moment_timezone_1["default"]
        .tz("".concat(now.format("YYYY-MM-DD"), " ").concat(dispatcher.startTime), "YYYY-MM-DD HH:mm", TZ);
    if (now.isBefore(startDateTime)) {
        return false;
    }
    if (!dispatcher.whatsappId) {
        logger_1["default"].warn("[ScheduledDispatcher] Dispatcher ".concat(dispatcher.id, " sem whatsapp configurado"));
        return false;
    }
    return true;
};
var runScheduledDispatchers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var now, dayStart, dayEnd, dispatchers, _i, dispatchers_1, dispatcher, sendOffset, targets, _a, targets_1, target, contact, extra, client, alreadySent, log, delayMs, variables;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                now = (0, moment_timezone_1["default"])().tz(TZ);
                dayStart = now.clone().startOf("day").toDate();
                dayEnd = now.clone().endOf("day").toDate();
                return [4 /*yield*/, ScheduledDispatcher_1["default"].findAll({
                        where: { active: true }
                    })];
            case 1:
                dispatchers = _b.sent();
                _i = 0, dispatchers_1 = dispatchers;
                _b.label = 2;
            case 2:
                if (!(_i < dispatchers_1.length)) return [3 /*break*/, 10];
                dispatcher = dispatchers_1[_i];
                if (!ensureDispatcherReady(dispatcher, now)) {
                    return [3 /*break*/, 9];
                }
                sendOffset = 0;
                return [4 /*yield*/, loadTargets(dispatcher, now)];
            case 3:
                targets = _b.sent();
                if (!targets.length) {
                    return [3 /*break*/, 9];
                }
                logger_1["default"].info("[ScheduledDispatcher] Dispatcher ".concat(dispatcher.id, " - ").concat(targets.length, " alvos encontrados"));
                _a = 0, targets_1 = targets;
                _b.label = 4;
            case 4:
                if (!(_a < targets_1.length)) return [3 /*break*/, 9];
                target = targets_1[_a];
                contact = target.contact, extra = target.extra, client = target.client;
                if (!(contact === null || contact === void 0 ? void 0 : contact.id) || !contact.number) {
                    return [3 /*break*/, 8];
                }
                return [4 /*yield*/, hasRunForContactToday(dispatcher.id, dispatcher.companyId, contact.id, dayStart, dayEnd)];
            case 5:
                alreadySent = _b.sent();
                if (alreadySent) {
                    return [3 /*break*/, 8];
                }
                return [4 /*yield*/, ScheduledDispatchLog_1["default"].create({
                        dispatcherId: dispatcher.id,
                        contactId: contact.id,
                        companyId: dispatcher.companyId,
                        status: "queued"
                    })];
            case 6:
                log = _b.sent();
                delayMs = sendOffset * (dispatcher.sendIntervalSeconds || 30) * 1000;
                sendOffset += 1;
                variables = buildVariables(dispatcher, contact, extra, client || null);
                return [4 /*yield*/, (0, dispatchQueue_1.addDispatchJob)({
                        logId: log.id,
                        dispatcherId: dispatcher.id,
                        companyId: dispatcher.companyId,
                        contactId: contact.id,
                        whatsappId: dispatcher.whatsappId,
                        template: dispatcher.messageTemplate,
                        variables: variables,
                        delayMs: delayMs
                    }, {})];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                _a++;
                return [3 /*break*/, 4];
            case 9:
                _i++;
                return [3 /*break*/, 2];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports["default"] = runScheduledDispatchers;
