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
exports.TicketsAttendance = void 0;
var index_1 = __importDefault(require("../../database/index"));
var sequelize_1 = require("sequelize");
var TicketsAttendance = function (_a) {
    var initialDate = _a.initialDate, finalDate = _a.finalDate, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var sqlUsers, users, sql, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sqlUsers = "select u.name from \"Users\" u where u.\"companyId\" = ".concat(companyId);
                    return [4 /*yield*/, index_1["default"].query(sqlUsers, { type: sequelize_1.QueryTypes.SELECT })];
                case 1:
                    users = _b.sent();
                    sql = "\n  select\n    COUNT(*) AS quantidade,\n    u.name AS nome\n  from\n    \"Tickets\" tt\n    left join \"Users\" u on u.id = tt.\"userId\"\n  where\n    tt.\"companyId\" = ".concat(companyId, "\n    and tt.\"userId\" is not null\n    and tt.\"createdAt\" >= '").concat(initialDate, " 00:00:00'\n    and tt.\"createdAt\" <= '").concat(finalDate, " 23:59:59'\n  group by\n    nome\n  ORDER BY\n    nome asc");
                    return [4 /*yield*/, index_1["default"].query(sql, { type: sequelize_1.QueryTypes.SELECT })];
                case 2:
                    data = _b.sent();
                    users.map(function (user) {
                        var indexCreated = data.findIndex(function (item) { return item.nome === user.name; });
                        if (indexCreated === -1) {
                            data.push({ quantidade: 0, nome: user.name });
                        }
                    });
                    return [2 /*return*/, { data: data }];
            }
        });
    });
};
exports.TicketsAttendance = TicketsAttendance;
