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
function ListTicketsServiceReport(companyId, params, page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 20; }
    return __awaiter(this, void 0, void 0, function () {
        var offset, onlyRated, query, where, finalQuery, totalTicketsQuery, totalTicketsResult, totalTickets, paginatedQuery, responseData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = (page - 1) * pageSize;
                    onlyRated = params.onlyRated === "true" ? true : false;
                    query = "";
                    console.log(params);
                    if (onlyRated) {
                        query = "\n\n  select \n\t  t.id,\n\t  w.\"name\" as \"whatsappName\",\n    c.\"name\" as \"contactName\",\n\t  u.\"name\" as \"userName\",\n\t  q.\"name\" as \"queueName\",\n\t  t.\"lastMessage\",\n    t.uuid,\n    case t.status\n      when 'open' then 'ABERTO'\n      when 'closed' then 'FECHADO'\n      when 'pending' then 'PENDENTE'\n      when 'group' then 'GRUPO'\n      when 'nps' then 'NPS'\n      when 'lgpd' then 'LGPD'\n    end as \"status\",\n    TO_CHAR(tt.\"createdAt\", 'DD/MM/YYYY HH24:MI') as \"createdAt\",\n    TO_CHAR(tt.\"finishedAt\", 'DD/MM/YYYY HH24:MI') as \"closedAt\",\n    coalesce((\n      (date_part('day', age(coalesce(tt.\"ratingAt\", tt.\"finishedAt\") , tt.\"createdAt\"))) || ' d, ' || \n      (date_part('hour', age(coalesce(tt.\"ratingAt\", tt.\"finishedAt\"), tt.\"createdAt\"))) || ' hrs e ' ||\n      (date_part('minutes', age(coalesce(tt.\"ratingAt\", tt.\"finishedAt\"), tt.\"createdAt\"))) || ' m'\n    ), '0') \"supportTime\",\n    coalesce(ur.rate, 0) \"NPS\"\n  from \"Tickets\" t\n  LEFT JOIN (\n        SELECT DISTINCT ON (\"ticketId\") *\n        FROM \"TicketTraking\"\n        WHERE \"companyId\" = ".concat(companyId, "\n        ORDER BY \"ticketId\", \"id\" DESC\n    ) tt ON t.id = tt.\"ticketId\"\n\tinner join \"UserRatings\" ur on\n   \t\tt.id = ur.\"ticketId\"\n       and ur.rate > 0\n    left join \"Contacts\" c on \n      t.\"contactId\" = c.id \n    left join \"Whatsapps\" w on \n      t.\"whatsappId\" = w.id \n    left join \"Users\" u on\n      t.\"userId\" = u.id \n    left join \"Queues\" q on\n      t.\"queueId\" = q.id \n  -- filterPeriod");
                    }
                    else {
                        query = "\n  select \n\t  t.id,\n\t  w.\"name\" as \"whatsappName\",\n    c.\"name\" as \"contactName\",\n\t  u.\"name\" as \"userName\",\n\t  q.\"name\" as \"queueName\",\n\t  t.\"lastMessage\",\n    t.uuid,\n    case t.status\n      when 'open' then 'ABERTO'\n      when 'closed' then 'FECHADO'\n      when 'pending' then 'PENDENTE'\n      when 'group' then 'GRUPO'\n      when 'nps' then 'NPS'\n      when 'lgpd' then 'LGPD'\n    end as \"status\",\n    TO_CHAR(tt.\"createdAt\", 'DD/MM/YYYY HH24:MI') as \"createdAt\",\n    TO_CHAR(tt.\"finishedAt\", 'DD/MM/YYYY HH24:MI') as \"closedAt\",\n    coalesce((\n      (date_part('day', age(coalesce(tt.\"ratingAt\", tt.\"finishedAt\") , tt.\"createdAt\"))) || ' d, ' || \n      (date_part('hour', age(coalesce(tt.\"ratingAt\", tt.\"finishedAt\"), tt.\"createdAt\"))) || ' hrs e ' ||\n      (date_part('minutes', age(coalesce(tt.\"ratingAt\", tt.\"finishedAt\"), tt.\"createdAt\"))) || ' m'\n    ), '0') \"supportTime\",\n    coalesce(ur.rate, 0) \"NPS\"\n  from \"Tickets\" t\n  LEFT JOIN (\n        SELECT DISTINCT ON (\"ticketId\") *\n        FROM \"TicketTraking\"\n        WHERE \"companyId\" = ".concat(companyId, "\n        ORDER BY \"ticketId\", \"id\" DESC\n    ) tt ON t.id = tt.\"ticketId\"\n\tleft join \"UserRatings\" ur on\n   \t\tt.id = ur.\"ticketId\"\n    left join \"Contacts\" c on \n      t.\"contactId\" = c.id \n    left join \"Whatsapps\" w on \n      t.\"whatsappId\" = w.id \n    left join \"Users\" u on\n      t.\"userId\" = u.id \n    left join \"Queues\" q on\n      t.\"queueId\" = q.id \n  -- filterPeriod");
                    }
                    where = "where t.\"companyId\" = ".concat(companyId);
                    if (_.has(params, "dateFrom")) {
                        where += " and t.\"createdAt\" >= '".concat(params.dateFrom, " 00:00:00'");
                    }
                    if (_.has(params, "dateTo")) {
                        where += " and t.\"createdAt\" <= '".concat(params.dateTo, " 23:59:59'");
                    }
                    if (params.whatsappId !== undefined && params.whatsappId.length > 0) {
                        where += " and t.\"whatsappId\" in (".concat(params.whatsappId, ")");
                    }
                    if (params.users.length > 0) {
                        where += " and t.\"userId\" in (".concat(params.users, ")");
                    }
                    if (params.queueIds.length > 0) {
                        where += " and COALESCE(t.\"queueId\",0) in (".concat(params.queueIds, ")");
                    }
                    if (params.status.length > 0) {
                        where += " and t.\"status\" in ('".concat(params.status.join("','"), "')");
                    }
                    if (params.contactId !== undefined && params.contactId !== "") {
                        where += " and t.\"contactId\" in (".concat(params.contactId, ")");
                    }
                    if (params.onlyRated === "true") {
                        query += " and coalesce(ur.rate, 0) > 0";
                    }
                    finalQuery = query.replace("-- filterPeriod", where);
                    totalTicketsQuery = "\n    SELECT COUNT(*) as total FROM \"Tickets\" t\n    ".concat(where, "  ");
                    return [4 /*yield*/, database_1["default"].query(totalTicketsQuery, {
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 1:
                    totalTicketsResult = _a.sent();
                    totalTickets = totalTicketsResult[0];
                    paginatedQuery = "".concat(finalQuery, " ORDER BY t.\"createdAt\" DESC LIMIT ").concat(pageSize, " OFFSET ").concat(offset);
                    return [4 /*yield*/, database_1["default"].query(paginatedQuery, {
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    responseData = _a.sent();
                    return [2 /*return*/, { tickets: responseData, totalTickets: totalTickets }];
            }
        });
    });
}
exports["default"] = ListTicketsServiceReport;
