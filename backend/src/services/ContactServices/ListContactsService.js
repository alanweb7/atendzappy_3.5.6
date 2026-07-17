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
var ContactTag_1 = __importDefault(require("../../models/ContactTag"));
var lodash_1 = require("lodash");
var Tag_1 = __importDefault(require("../../models/Tag"));
var remove_accents_1 = __importDefault(require("remove-accents"));
var WHATSAPP_CHANNELS = ["whatsapp", "whatsappapi", "whatsappbusiness"];
var ListContactsService = function (_a) {
    var _b = _a.searchParam, searchParam = _b === void 0 ? "" : _b, _c = _a.pageNumber, pageNumber = _c === void 0 ? "1" : _c, companyId = _a.companyId, tagsIds = _a.tagsIds, isGroup = _a.isGroup, userId = _a.userId, _d = _a.limit, limit = _d === void 0 ? 100 : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        var whereCondition, sanitizedSearchParam, contactTagFilter, contactTags, contactTagsIntersection, baseCondition, channelVisibilityFilter, pageSize, currentPage, offset, _e, count, contacts, hasMore;
        var _f, _g, _h, _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    if (searchParam) {
                        sanitizedSearchParam = (0, remove_accents_1["default"])(searchParam.toLocaleLowerCase().trim());
                        whereCondition = __assign(__assign({}, whereCondition), (_f = {}, _f[sequelize_1.Op.or] = [
                            {
                                name: (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.fn)("unaccent", (0, sequelize_1.col)("Contact.name"))), "LIKE", "%".concat(sanitizedSearchParam, "%"))
                            },
                            { number: (_g = {}, _g[sequelize_1.Op.like] = "%".concat(sanitizedSearchParam, "%"), _g) }
                        ], _f));
                    }
                    whereCondition = __assign(__assign({}, whereCondition), { companyId: companyId });
                    if (!(Array.isArray(tagsIds) && tagsIds.length > 0)) return [3 /*break*/, 2];
                    contactTagFilter = [];
                    return [4 /*yield*/, ContactTag_1["default"].findAll({
                            where: { tagId: (_h = {}, _h[sequelize_1.Op["in"]] = tagsIds, _h) }
                        })];
                case 1:
                    contactTags = _p.sent();
                    if (contactTags) {
                        contactTagFilter.push(contactTags.map(function (t) { return t.contactId; }));
                    }
                    contactTagsIntersection = lodash_1.intersection.apply(void 0, contactTagFilter);
                    whereCondition = __assign(__assign({}, whereCondition), { id: (_j = {},
                            _j[sequelize_1.Op["in"]] = contactTagsIntersection,
                            _j) });
                    _p.label = 2;
                case 2:
                    baseCondition = whereCondition || {};
                    channelVisibilityFilter = (_k = {},
                        _k[sequelize_1.Op.or] = [
                            { channel: (_l = {}, _l[sequelize_1.Op.is] = null, _l) },
                            { channel: "" },
                            { channel: (_m = {}, _m[sequelize_1.Op["in"]] = WHATSAPP_CHANNELS, _m) }
                        ],
                        _k);
                    whereCondition = (_o = {},
                        _o[sequelize_1.Op.and] = [
                            baseCondition,
                            { isGroup: false },
                            channelVisibilityFilter
                        ],
                        _o);
                    pageSize = Number(limit) > 0 ? Number(limit) : 100;
                    currentPage = Number(pageNumber) > 0 ? Number(pageNumber) : 1;
                    offset = pageSize * (currentPage - 1);
                    return [4 /*yield*/, Contact_1["default"].findAndCountAll({
                            where: whereCondition,
                            attributes: ["id", "name", "number", "email", "isGroup", "urlPicture", "active", "companyId", "channel"],
                            limit: pageSize,
                            include: [
                                // {
                                //   model: Ticket,
                                //   as: "tickets",
                                //   attributes: ["id", "status", "createdAt", "updatedAt"],
                                //   limit: 1,
                                //   order: [["updatedAt", "DESC"]]
                                // },   
                                {
                                    model: Tag_1["default"],
                                    as: "tags",
                                    attributes: ["id", "name"]
                                    //include: ["tags"]
                                },
                                // {
                                //   model: Whatsapp,
                                //   as: "whatsapp",
                                //   attributes: ["id", "name", "expiresTicket", "groupAsTicket"]
                                // },
                            ],
                            offset: offset,
                            // subQuery: false,
                            order: [["name", "ASC"]]
                        })];
                case 3:
                    _e = _p.sent(), count = _e.count, contacts = _e.rows;
                    hasMore = count > offset + contacts.length;
                    return [2 /*return*/, {
                            contacts: contacts,
                            count: count,
                            hasMore: hasMore
                        }];
            }
        });
    });
};
exports["default"] = ListContactsService;
