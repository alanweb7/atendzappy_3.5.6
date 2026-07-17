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
exports.ContactsReport = exports.DashTicketsQueues = void 0;
var TicketsQueuesService_1 = __importDefault(require("../services/Statistics/TicketsQueuesService"));
var ContactsReportService_1 = __importDefault(require("../services/Statistics/ContactsReportService"));
var DashTicketsQueues = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, profile, userId, _b, dateStart, dateEnd, status, queuesIds, showAll, tickets;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, profile = _a.profile, userId = _a.id;
                _b = req.query, dateStart = _b.dateStart, dateEnd = _b.dateEnd, status = _b.status, queuesIds = _b.queuesIds, showAll = _b.showAll;
                return [4 /*yield*/, (0, TicketsQueuesService_1["default"])({
                        showAll: profile === "admin" ? "true" : false,
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        status: status,
                        queuesIds: queuesIds,
                        userId: userId,
                        companyId: companyId
                    })];
            case 1:
                tickets = _c.sent();
                return [2 /*return*/, res.status(200).json(tickets)];
        }
    });
}); };
exports.DashTicketsQueues = DashTicketsQueues;
var ContactsReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, startDate, endDate, tags, ddds, wallets, searchParam, tickets;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, startDate = _a.startDate, endDate = _a.endDate, tags = _a.tags, ddds = _a.ddds, wallets = _a.wallets, searchParam = _a.searchParam;
                return [4 /*yield*/, (0, ContactsReportService_1["default"])({
                        startDate: startDate,
                        endDate: endDate,
                        tags: tags,
                        ddds: ddds,
                        companyId: companyId,
                        profile: req.user.profile,
                        userId: +req.user.id,
                        wallets: wallets,
                        searchParam: searchParam
                    })];
            case 1:
                tickets = _b.sent();
                return [2 /*return*/, res.status(200).json(tickets)];
        }
    });
}); };
exports.ContactsReport = ContactsReport;
