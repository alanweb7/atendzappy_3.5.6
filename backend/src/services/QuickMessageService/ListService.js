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
var sequelize_1 = require("sequelize");
var QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
var ListService = function (_a) {
    var _b = _a.searchParam, searchParam = _b === void 0 ? "" : _b, _c = _a.pageNumber, pageNumber = _c === void 0 ? "1" : _c, companyId = _a.companyId, userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var sanitizedSearchParam, whereCondition, limit, offset, _d, count, records, hasMore;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    sanitizedSearchParam = searchParam.toLocaleLowerCase().trim();
                    whereCondition = {
                        // [Op.or]: [
                        //   {
                        shortcode: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("shortcode")), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                        //   },
                        //   {
                        //     message: Sequelize.where(
                        //       Sequelize.fn("LOWER", Sequelize.col("message")),
                        //       "LIKE",
                        //       `%${sanitizedSearchParam}%`
                        //     )
                        //   }
                        // ]
                    };
                    whereCondition = __assign(__assign({}, whereCondition), (_e = { companyId: companyId }, _e[sequelize_1.Op.or] = [
                        {
                            visao: true // Se "visao" é verdadeiro, todas as mensagens são visíveis
                        },
                        {
                            userId: userId // Se "visao" é falso, apenas as mensagens do usuário atual são visíveis
                        }
                    ], _e));
                    limit = 20;
                    offset = limit * (+pageNumber - 1);
                    return [4 /*yield*/, QuickMessage_1["default"].findAndCountAll({
                            where: whereCondition,
                            limit: limit,
                            offset: offset,
                            order: [["shortcode", "ASC"]]
                        })];
                case 1:
                    _d = _f.sent(), count = _d.count, records = _d.rows;
                    hasMore = count > offset + records.length;
                    return [2 /*return*/, {
                            records: records,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListService;
