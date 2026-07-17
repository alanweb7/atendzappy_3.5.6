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
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
var sequelize_1 = require("sequelize");
var _ = __importStar(require("lodash"));
var database_1 = __importDefault(require("../../database"));
function DashboardDataService(companyId, params) {
    return __awaiter(this, void 0, void 0, function () {
        var query, where, replacements, finalQuery, responseData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "   with traking as\n                           (select c.name                                                                    \"companyName\",\n                                   u.name                                                                    \"userName\",\n                                   u.online                                                                  \"userOnline\",\n                                   w.name                                                                    \"whatsappName\",\n                                   ct.name                                                                   \"contactName\",\n                                   ct.number                                                                 \"contactNumber\",\n                                   (t.\"status\" = 'closed')                                                   \"finished\",\n                                   (tt.\"userId\" is null and tt.\"finishedAt\" is null and\n                                    t.\"status\" = 'pending')                                                  \"pending\",\n                                   coalesce(((date_part('day', age(tt.\"finishedAt\")) * 24 * 60) +\n                                             (date_part('hour', age(tt.\"finishedAt\", tt.\"startedAt\")) * 60) +\n                                             (date_part('minutes', age(tt.\"finishedAt\", tt.\"startedAt\")))),\n                                            0)                                                               \"supportTime\",\n                                   coalesce(((date_part('day', age(tt.\"queuedAt\", tt.\"startedAt\")) * 24 * 60) +\n                                             (date_part('hour', age(tt.\"queuedAt\", tt.\"startedAt\")) * 60) +\n                                             (date_part('minutes', age(tt.\"queuedAt\", tt.\"startedAt\")))), 0) \"waitTime\",\n                                   t.status,\n                                   tt.*,\n                                   ct.\"id\"                                                                   \"contactId\"\n                            from \"TicketTraking\" tt\n                                   left join \"Companies\" c on c.id = tt.\"companyId\"\n                                   left join \"Users\" u on u.id = tt.\"userId\"\n                                   left join \"Whatsapps\" w on w.id = tt.\"whatsappId\"\n                                   left join \"Tickets\" t on t.id = tt.\"ticketId\"\n                                   left join \"Contacts\" ct on ct.id = t.\"contactId\" --filterPeriod),\n                         counters\n                           as (select (select avg(\"supportTime\") from traking where \"supportTime\" > 0) \"avgSupportTime\",\n                                      (select avg(\"waitTime\") from traking where \"waitTime\" > 0)       \"avgWaitTime\",\n                                      (select count(distinct \"id\")\n                                       from \"Tickets\" t\n                                       where status like 'open'\n                                         and t.\"companyId\" = ?)                                        \"supportHappening\",\n\n                                      (select count(distinct \"id\")\n                                       from \"Tickets\" t\n                                       where status like 'pending' and t.\"companyId\" = ?)              \"supportPending\",\n                                      (select count(id) from traking where finished)                   \"supportFinished\",\n                                      (select count(leads.id)\n                                       from (select ct1.id, count(tt1.id) total\n                                             from traking tt1\n                                                    left join \"Tickets\" t1 on t1.id = tt1.\"ticketId\"\n                                                    left join \"Contacts\" ct1 on ct1.id = t1.\"contactId\"\n                                             group by 1\n                                             having count(tt1.id) = 1) leads)                          \"leads\",\n                                      (select count(id) from traking where \"status\" = 'closed')        \"tickets\",\n                                      (select count(id) from traking where \"status\" = 'closed' and \"rated\" = false)           \"waitRating\",\n                                      (select count(tt.id)\n                                       from traking tt\n                                              inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                       where \"status\" = 'closed' and (\"rated\" = false and \"rate\" = 0))                  \"withoutRating\",\n                                      (select count(id)\n                                       from traking\n                                       where \"rated\" = true)                   \"withRating\",\n                                      (((select count(id) from traking where \"rated\" = true) * 100) /\n                                       nullif((select count(id) from traking), 0))                     \"percRating\",\n                                      (select (100 * count(tt.*)) / NULLIF((select count(*) total\n                                                                            from traking tt\n                                                                                   inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                                                            where rated = true), 0)\n                                       from traking tt\n                                              inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                       where tt.rated = true\n                                         and ur.\"rate\" > 3)                                            \"npsPromotersPerc\",\n                                      (select (100 * count(tt.*)) / NULLIF((select count(*) total\n                                                                            from traking tt\n                                                                                   inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                                                            where rated = true), 0)\n                                       from traking tt\n                                              inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                       where tt.rated = true\n                                         and ur.\"rate\" = 3)                                      \"npsPassivePerc\",\n                                      (select (100 * count(tt.*)) / NULLIF((select count(*) total\n                                                                            from traking tt\n                                                                                   inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                                                            where rated = true), 0)\n                                       from traking tt\n                                              inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                       where tt.rated = true\n                                         and ur.\"rate\" < 3 and ur.\"rate\" != 0)                                            \"npsDetractorsPerc\",\n                                      (select sum(nps.promoter) - sum(nps.detractor)\n                                       from ( (select (100 * count(tt.*)) / NULLIF((select count(*) total\n                                                                                    from traking tt\n                                                                                           inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                                                                    where rated = true), 0) promoter,\n                                                      0                                                     detractor\n                                               from traking tt\n                                                      inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                               where tt.rated = true\n                                                 and ur.\"rate\" >= 3\n                                               union\n                                               select 0,\n                                                      (100 * count(tt.*)) / NULLIF((select count(*) total\n                                                                                    from traking tt\n                                                                                           inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                                                                    where rated = true), 0)\n                                               from traking tt\n                                                      inner join \"UserRatings\" ur on ur.\"ticketId\" = tt.\"ticketId\"\n                                               where tt.rated = true\n                                                 and ur.rate < 3 and ur.rate != 0)) nps)                                \"npsScore\"),\n                         attedants as (select u1.id,\n                                              u1.\"name\",\n                                              u1.\"online\",\n                                              avg(t.\"waitTime\")                     \"avgWaitTime\",\n                                              avg(t.\"supportTime\")                  \"avgSupportTime\",\n                                              count(t.\"id\")                         \"tickets\",\n                                              round(coalesce(avg(ur.\"rate\"), 0), 2) \"rating\",\n                                              coalesce(count(ur.\"id\"), 0)           \"countRating\"\n                                       from \"Users\" u1\n                                              left join traking t on t.\"userId\" = u1.id\n                                              left join \"UserRatings\" ur\n                                                        on ur.\"userId\" = t.\"userId\" and ur.\"ticketId\" = t.\"ticketId\"\n                                       where u1.\"companyId\" = ?\n                                       group by 1, 2\n                                       order by u1.\"name\")\n                    select (select coalesce(jsonb_build_object('counters', c.*) ->> 'counters', '{}') ::jsonb\n                            from counters c)                                               counters,\n                           (select coalesce(json_agg(a.*), '[]') ::jsonb from attedants a) attendants; ";
                    where = "where tt.\"companyId\" = ?";
                    replacements = [companyId];
                    if (_.has(params, "days")) {
                        where += " and tt.\"createdAt\" >= (now() - '? days'::interval)";
                        replacements.push(parseInt(("" + params.days).replace(/\D/g, ""), 10));
                    }
                    if (_.has(params, "date_from")) {
                        where += " and tt.\"createdAt\" >= ?";
                        replacements.push(params.date_from + " 00:00:00");
                    }
                    if (_.has(params, "date_to")) {
                        where += " and tt.\"createdAt\" <= ?";
                        replacements.push(params.date_to + " 23:59:59");
                    }
                    replacements.push(companyId);
                    replacements.push(companyId);
                    replacements.push(companyId);
                    finalQuery = query.replace("--filterPeriod", where);
                    return [4 /*yield*/, database_1["default"].query(finalQuery, {
                            replacements: replacements,
                            type: sequelize_1.QueryTypes.SELECT,
                            plain: true
                        })];
                case 1:
                    responseData = _a.sent();
                    return [2 /*return*/, responseData];
            }
        });
    });
}
exports["default"] = DashboardDataService;
