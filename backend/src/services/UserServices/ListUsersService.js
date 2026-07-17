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
var Queue_1 = __importDefault(require("../../models/Queue"));
var Company_1 = __importDefault(require("../../models/Company"));
var User_1 = __importDefault(require("../../models/User"));
var Servico_1 = __importDefault(require("../../models/Servico"));
var ListUsersService = function (_a) {
    var _b = _a.searchParam, searchParam = _b === void 0 ? "" : _b, _c = _a.pageNumber, pageNumber = _c === void 0 ? "1" : _c, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var whereCondition, limit, offset, _d, count, users, hasMore;
        var _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    // Garantia: nunca listar sem companyId
                    if (!companyId)
                        throw new Error("companyId é obrigatório em ListUsersService");
                    whereCondition = (_e = {},
                        _e[sequelize_1.Op.or] = [
                            {
                                "$User.name$": sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("User.name")), "LIKE", "%".concat(searchParam.toLowerCase(), "%"))
                            },
                            { email: (_f = {}, _f[sequelize_1.Op.like] = "%".concat(searchParam.toLowerCase(), "%"), _f) }
                        ],
                        _e.companyId = (_g = {},
                            _g[sequelize_1.Op.eq] = companyId,
                            _g),
                        _e);
                    limit = 20;
                    offset = limit * (+pageNumber - 1);
                    return [4 /*yield*/, User_1["default"].findAndCountAll({
                            where: whereCondition,
                            attributes: [
                                "name",
                                "id",
                                "email",
                                "companyId",
                                "profile",
                                "online",
                                "startWork",
                                "endWork",
                                "profileImage",
                                "userType",
                                "workDays",
                                "lunchStart",
                                "lunchEnd"
                            ],
                            limit: limit,
                            offset: offset,
                            order: [["name", "ASC"]],
                            include: [
                                { model: Queue_1["default"], as: "queues", attributes: ["id", "name", "color"] },
                                { model: Servico_1["default"], as: "services", attributes: ["id", "nome", "valorOriginal"] },
                                {
                                    model: Company_1["default"],
                                    as: "company",
                                    attributes: ["id", "name", "dueDate", "document"]
                                }
                            ]
                        })];
                case 1:
                    _d = _h.sent(), count = _d.count, users = _d.rows;
                    hasMore = count > offset + users.length;
                    console.log(hasMore, count);
                    return [2 /*return*/, {
                            users: users,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListUsersService;
