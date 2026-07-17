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
var Tag_1 = __importDefault(require("../../models/Tag"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var remove_accents_1 = __importDefault(require("remove-accents"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var ListService = function (_a) {
    var companyId = _a.companyId, _b = _a.searchParam, searchParam = _b === void 0 ? "" : _b, _c = _a.pageNumber, pageNumber = _c === void 0 ? "1" : _c, _d = _a.kanban, kanban = _d === void 0 ? 0 : _d, _e = _a.tagId, tagId = _e === void 0 ? 0 : _e, _f = _a.limit, limit = _f === void 0 ? 20 : _f;
    return __awaiter(void 0, void 0, void 0, function () {
        var whereCondition, pageSize, offset, sanitizedSearchParam, _g, count, tags, hasMore, _h, count, tags, hasMore;
        var _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    whereCondition = {};
                    pageSize = Number(limit) > 0 ? Number(limit) : 20;
                    offset = pageSize * (+pageNumber - 1);
                    sanitizedSearchParam = (0, remove_accents_1["default"])(searchParam.toLocaleLowerCase().trim());
                    if (!(Number(kanban) === 0)) return [3 /*break*/, 2];
                    if (searchParam) {
                        whereCondition = (_j = {},
                            _j[sequelize_1.Op.or] = [
                                {
                                    name: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("Tag.name")), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                                },
                                { color: (_k = {}, _k[sequelize_1.Op.like] = "%".concat(sanitizedSearchParam, "%"), _k) }
                                // { kanban: { [Op.like]: `%${searchParam}%` } }
                            ],
                            _j);
                    }
                    return [4 /*yield*/, Tag_1["default"].findAndCountAll({
                            where: __assign(__assign({}, whereCondition), { companyId: companyId, kanban: kanban }),
                            limit: pageSize,
                            include: [
                                {
                                    // model: ContactTag,
                                    // as: "contactTags",
                                    // include: [
                                    //   {
                                    model: Contact_1["default"],
                                    as: "contacts"
                                },
                            ],
                            attributes: [
                                'id',
                                'name',
                                'color',
                            ],
                            offset: offset,
                            order: [["name", "ASC"]]
                        })];
                case 1:
                    _g = _p.sent(), count = _g.count, tags = _g.rows;
                    hasMore = count > offset + tags.length;
                    return [2 /*return*/, {
                            tags: tags,
                            count: count,
                            hasMore: hasMore
                        }];
                case 2:
                    if (searchParam) {
                        whereCondition = (_l = {},
                            _l[sequelize_1.Op.or] = [
                                {
                                    name: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("Tag.name")), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                                },
                                { color: (_m = {}, _m[sequelize_1.Op.like] = "%".concat(sanitizedSearchParam, "%"), _m) }
                                // { kanban: { [Op.like]: `%${searchParam}%` } }
                            ],
                            _l);
                    }
                    if (tagId > 0) {
                        whereCondition = __assign(__assign({}, whereCondition), { id: (_o = {}, _o[sequelize_1.Op.ne] = [tagId], _o) });
                    }
                    return [4 /*yield*/, Tag_1["default"].findAndCountAll({
                            where: __assign(__assign({}, whereCondition), { companyId: companyId, kanban: kanban }),
                            limit: pageSize,
                            offset: offset,
                            order: [["name", "ASC"]],
                            include: [
                                {
                                    model: TicketTag_1["default"],
                                    as: "ticketTags"
                                },
                            ],
                            attributes: [
                                'id',
                                'name',
                                'color',
                            ]
                        })];
                case 3:
                    _h = _p.sent(), count = _h.count, tags = _h.rows;
                    hasMore = count > offset + tags.length;
                    return [2 /*return*/, {
                            tags: tags,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListService;
