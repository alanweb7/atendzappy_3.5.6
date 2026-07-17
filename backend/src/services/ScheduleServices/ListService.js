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
var Contact_1 = __importDefault(require("../../models/Contact"));
var Schedule_1 = __importDefault(require("../../models/Schedule"));
var User_1 = __importDefault(require("../../models/User"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var ListService = function (_a) {
    var searchParam = _a.searchParam, _b = _a.contactId, contactId = _b === void 0 ? "" : _b, _c = _a.userId, userId = _c === void 0 ? "" : _c, _d = _a.pageNumber, pageNumber = _d === void 0 ? "1" : _d, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var whereCondition, limit, offset, _e, count, schedules, schedulesWithTags, hasMore;
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    whereCondition = {};
                    limit = 20;
                    offset = limit * (+pageNumber - 1);
                    if (searchParam) {
                        whereCondition = (_f = {},
                            _f[sequelize_1.Op.or] = [
                                {
                                    "$Schedule.body$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.col)("Schedule.body")), "LIKE", "%".concat(searchParam.toLowerCase(), "%"))
                                },
                                {
                                    "$Contact.name$": (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("contact.name"))), "LIKE", "%".concat(searchParam.toLowerCase(), "%"))
                                },
                            ],
                            _f);
                    }
                    if (contactId !== "") {
                        whereCondition = __assign(__assign({}, whereCondition), { contactId: contactId });
                    }
                    if (userId !== "") {
                        whereCondition = __assign(__assign({}, whereCondition), { userId: userId });
                    }
                    whereCondition = __assign(__assign({}, whereCondition), { companyId: (_g = {},
                            _g[sequelize_1.Op.eq] = companyId,
                            _g) });
                    return [4 /*yield*/, Schedule_1["default"].findAndCountAll({
                            where: whereCondition,
                            limit: limit,
                            offset: offset,
                            order: [["createdAt", "DESC"]],
                            include: [
                                { model: Contact_1["default"], as: "contact", attributes: ["id", "name", "companyId", "urlPicture"] },
                                { model: User_1["default"], as: "user", attributes: ["id", "name"] },
                                { model: Whatsapp_1["default"], as: "whatsapp", attributes: ["id", "name", "channel"] }
                            ]
                        })];
                case 1:
                    _e = _h.sent(), count = _e.count, schedules = _e.rows;
                    return [4 /*yield*/, Promise.all(schedules.map(function (schedule) { return __awaiter(void 0, void 0, void 0, function () {
                            var scheduleData, tags;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        scheduleData = schedule.toJSON();
                                        if (!(scheduleData.tagIds && scheduleData.tagIds.length > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Tag_1["default"].findAll({
                                                where: {
                                                    id: scheduleData.tagIds,
                                                    companyId: companyId
                                                },
                                                attributes: ["id", "name"]
                                            })];
                                    case 1:
                                        tags = _a.sent();
                                        scheduleData.tagNames = tags.map(function (tag) { return tag.name; });
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, scheduleData];
                                }
                            });
                        }); }))];
                case 2:
                    schedulesWithTags = _h.sent();
                    hasMore = count > offset + schedules.length;
                    return [2 /*return*/, {
                            schedules: schedulesWithTags,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListService;
