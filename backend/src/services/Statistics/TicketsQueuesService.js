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
var date_fns_1 = require("date-fns");
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var UserQueue_1 = __importDefault(require("../../models/UserQueue"));
var User_1 = __importDefault(require("../../models/User"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var TicketsQueuesService = function (_a) {
    var dateStart = _a.dateStart, dateEnd = _a.dateEnd, status = _a.status, userId = _a.userId, queuesIds = _a.queuesIds, companyId = _a.companyId, showAll = _a.showAll;
    return __awaiter(void 0, void 0, void 0, function () {
        var whereCondition, includeCondition, isExistsQueues, queues, queuesIdsUser_1, newArray_1, _b, count, tickets;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    whereCondition = {
                    // [Op.or]: [{ userId }, { status: "pending" }]
                    };
                    includeCondition = [
                        {
                            model: User_1["default"],
                            as: "user",
                            attributes: ["id", "name", "profile", "online", "profileImage"]
                        },
                        {
                            model: Contact_1["default"],
                            as: "contact",
                            attributes: ["id", "name", "number", "profilePicUrl", "companyId", "urlPicture"]
                        },
                        {
                            model: Queue_1["default"],
                            as: "queue",
                            attributes: ["id", "name", "color"]
                        },
                        {
                            association: "whatsapp",
                            attributes: ["id", "name"]
                        }
                    ];
                    return [4 /*yield*/, Queue_1["default"].count({ where: { companyId: companyId } })];
                case 1:
                    isExistsQueues = _f.sent();
                    if (!isExistsQueues) return [3 /*break*/, 3];
                    return [4 /*yield*/, UserQueue_1["default"].findAll({
                            where: {
                                userId: userId
                            }
                        })];
                case 2:
                    queues = _f.sent();
                    queuesIdsUser_1 = queues.map(function (q) { return q.queueId; });
                    if (queuesIds) {
                        newArray_1 = [];
                        queuesIds.forEach(function (i) {
                            var idx = queuesIdsUser_1.indexOf(+i);
                            if (idx) {
                                newArray_1.push(+i);
                            }
                        });
                        queuesIdsUser_1 = newArray_1;
                    }
                    whereCondition = __assign(__assign({}, whereCondition), { queueId: (_c = {},
                            _c[sequelize_1.Op["in"]] = queuesIdsUser_1,
                            _c) });
                    _f.label = 3;
                case 3:
                    // eslint-disable-next-line eqeqeq
                    if (showAll == "true") {
                        whereCondition = {};
                    }
                    whereCondition = __assign(__assign({}, whereCondition), { status: (_d = {}, _d[sequelize_1.Op["in"]] = ["open", "pending"], _d), companyId: companyId });
                    if (dateStart && dateEnd) {
                        whereCondition = __assign(__assign({}, whereCondition), { createdAt: (_e = {},
                                _e[sequelize_1.Op.between] = [
                                    +(0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(dateStart)),
                                    +(0, date_fns_1.endOfDay)((0, date_fns_1.parseISO)(dateEnd))
                                ],
                                _e) });
                    }
                    return [4 /*yield*/, Ticket_1["default"].findAndCountAll({
                            where: whereCondition,
                            include: includeCondition,
                            distinct: true,
                            subQuery: false,
                            order: [
                                ["user", "name", "ASC"],
                                ["updatedAt", "DESC"],
                            ]
                        })];
                case 4:
                    _b = _f.sent(), count = _b.count, tickets = _b.rows;
                    return [2 /*return*/, tickets];
            }
        });
    });
};
exports["default"] = TicketsQueuesService;
