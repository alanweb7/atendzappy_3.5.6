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
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../../database"));
var query = "\n  select\n    --dt_referencia,\n    sum(qtd_total_atendimentos) qtd_total_atendimentos,\n    sum(qtd_demanda_ativa) qtd_demanda_ativa,\n    sum(qtd_demanda_receptiva) qtd_demanda_receptiva,\n    coalesce(concat(ROUND(AVG(tma)::decimal,0), 0), 'minutes')::interval TMA,\n    coalesce(concat(ROUND(AVG(tme)::decimal,0), 0), 'minutes')::interval TME,\n    (select count(distinct(c.\"id\"))\n      from \"Contacts\" c\n      INNER JOIN \"Tickets\" tc ON tc.\"contactId\" = c.\"id\"\n      INNER JOIN \"LogTickets\" ltc ON ltc.\"ticketId\" = tc.\"id\"\n      where\n        c.\"tenantId\" = :tenantId\n        and ltc.\"userId\" = :userId\n        and date_trunc('day', c.\"createdAt\") between :startDate and :endDate\n    ) new_contacts\n    --ROUND(AVG(tma)::decimal,0) TMA,\n    --ROUND(AVG(tme)::decimal,0) TME\n  from (\n    select\n      date_trunc('month', t.\"createdAt\") dt_referencia,\n      1 qtd_total_atendimentos,\n      case when t.\"isActiveDemand\" is true then 1 else 0 end qtd_demanda_ativa,\n      case when t.\"isActiveDemand\" is not true then 1 else 0 end qtd_demanda_receptiva,\n      t.\"createdAt\",\n      to_timestamp(t.\"closedAt\"/1000) closedAt,\n      to_timestamp(t.\"startedAttendanceAt\"/1000) startedAttendanceAt,\n      extract(epoch from AGE(to_timestamp(t.\"closedAt\"/1000), t.\"createdAt\")::interval)/60 tma,\n      extract(epoch from AGE(to_timestamp(t.\"startedAttendanceAt\"/1000), t.\"createdAt\"::timestamp)::interval)/60 tme,\n      t.\"tenantId\"\n    from \"Tickets\" t\n    INNER JOIN \"LogTickets\" lt ON lt.\"ticketId\" = t.\"id\"\n    where\n      t.\"tenantId\" = :tenantId\n      and date_trunc('day', t.\"createdAt\") between :startDate and :endDate\n      and lt.\"userId\" = :userId\n      and (lt.\"type\" LIKE 'open' OR lt.\"type\" LIKE 'receivedTransfer')\n  ) a\n    --group by dt_referencia\n      order by 1 Desc\n";
var queryAdmin = "\n  select\n    --dt_referencia,\n    sum(qtd_total_atendimentos) qtd_total_atendimentos,\n    sum(qtd_demanda_ativa) qtd_demanda_ativa,\n    sum(qtd_demanda_receptiva) qtd_demanda_receptiva,\n    coalesce(concat(ROUND(AVG(tma)::decimal,0), 0), 'minutes')::interval TMA,\n    coalesce(concat(ROUND(AVG(tme)::decimal,0), 0), 'minutes')::interval TME,\n    (select count(1)\n      from \"Contacts\" c\n      where\n        c.\"tenantId\" = :tenantId\n        and date_trunc('day', c.\"createdAt\") between :startDate and :endDate\n    ) new_contacts\n    --ROUND(AVG(tma)::decimal,0) TMA,\n    --ROUND(AVG(tme)::decimal,0) TME\n  from (\n    select\n      date_trunc('month', t.\"createdAt\") dt_referencia,\n      1 qtd_total_atendimentos,\n      case when t.\"isActiveDemand\" is true then 1 else 0 end qtd_demanda_ativa,\n      case when t.\"isActiveDemand\" is not true then 1 else 0 end qtd_demanda_receptiva,\n      t.\"createdAt\",\n      to_timestamp(t.\"closedAt\"/1000) closedAt,\n      to_timestamp(t.\"startedAttendanceAt\"/1000) startedAttendanceAt,\n      extract(epoch from AGE(to_timestamp(t.\"closedAt\"/1000), t.\"createdAt\")::interval)/60 tma,\n      extract(epoch from AGE(to_timestamp(t.\"startedAttendanceAt\"/1000), t.\"createdAt\"::timestamp)::interval)/60 tme,\n      t.\"tenantId\"\n    from \"Tickets\" t\n    INNER JOIN \"LogTickets\" lt ON lt.\"ticketId\" = t.\"id\"\n    where\n      t.\"tenantId\" = :tenantId\n      and date_trunc('day', t.\"createdAt\") between :startDate and :endDate\n      and (lt.\"type\" LIKE 'open' OR lt.\"type\" LIKE 'receivedTransfer')\n  ) a\n    --group by dt_referencia\n      order by 1 Desc\n";
var DashTicketsAndTimes = function (_a) {
    var startDate = _a.startDate, endDate = _a.endDate, tenantId = _a.tenantId, userId = _a.userId, userProfile = _a.userProfile;
    return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, database_1["default"].query(userProfile == "admin" ? queryAdmin : query, {
                        replacements: {
                            tenantId: tenantId,
                            startDate: startDate,
                            endDate: endDate,
                            userId: userId
                        },
                        type: sequelize_1.QueryTypes.SELECT
                    })];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, data];
            }
        });
    });
};
exports["default"] = DashTicketsAndTimes;
