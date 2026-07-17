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
var date_fns_1 = require("date-fns");
var sequelize_1 = require("sequelize");
var Contact_1 = __importDefault(require("../../models/Contact"));
var Tag_1 = __importDefault(require("../../models/Tag"));
// import ContactWallet from "../../models/ContactWallet";
var dddsPorEstado = [
    { estado: "AC", ddds: ["68"] },
    { estado: "AL", ddds: ["82"] },
    { estado: "AM", ddds: ["92", "97"] },
    { estado: "AP", ddds: ["96"] },
    { estado: "BA", ddds: ["71", "73", "74", "75", "77"] },
    { estado: "CE", ddds: ["85", "88"] },
    { estado: "DF", ddds: ["61"] },
    { estado: "ES", ddds: ["27", "28"] },
    { estado: "GO", ddds: ["62", "64"] },
    { estado: "MA", ddds: ["98", "99"] },
    { estado: "MG", ddds: ["31", "32", "33", "34", "35", "37", "38"] },
    { estado: "MS", ddds: ["67"] },
    { estado: "MT", ddds: ["65", "66"] },
    { estado: "PA", ddds: ["91", "93", "94"] },
    { estado: "PB", ddds: ["83"] },
    { estado: "PE", ddds: ["81", "87"] },
    { estado: "PI", ddds: ["86", "89"] },
    { estado: "PR", ddds: ["41", "42", "43", "44", "45", "46"] },
    { estado: "RJ", ddds: ["21", "22", "24"] },
    { estado: "RN", ddds: ["84"] },
    { estado: "RO", ddds: ["69"] },
    { estado: "RR", ddds: ["95"] },
    { estado: "RS", ddds: ["51", "53", "54", "55"] },
    { estado: "SC", ddds: ["47", "48", "49"] },
    { estado: "SE", ddds: ["79"] },
    {
        estado: "SP",
        ddds: ["11", "12", "13", "14", "15", "16", "17", "18", "19"]
    },
    { estado: "TO", ddds: ["63"] }
];
var ListContactsService = function (_a) {
    var startDate = _a.startDate, endDate = _a.endDate, companyId = _a.companyId, tags = _a.tags, wallets = _a.wallets, ddds = _a.ddds, userId = _a.userId, profile = _a.profile, searchParam = _a.searchParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var includeCondition, where, dddsFilter_1, contacts;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    includeCondition = [];
                    where = {
                        companyId: companyId,
                        isGroup: false
                    };
                    if (searchParam) {
                        where = __assign(__assign({}, where), (_b = {}, _b[sequelize_1.Op.or] = [
                            {
                                name: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("Contact.name")), "LIKE", "%".concat(searchParam.toLowerCase().trim(), "%"))
                            },
                            { number: (_c = {}, _c[sequelize_1.Op.like] = "%".concat(searchParam.toLowerCase().trim(), "%"), _c) }
                        ], _b));
                    }
                    if (startDate && endDate) {
                        where = __assign(__assign({}, where), { createdAt: (_d = {},
                                _d[sequelize_1.Op.between] = [
                                    +(0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(startDate)),
                                    +(0, date_fns_1.endOfDay)((0, date_fns_1.parseISO)(endDate))
                                ],
                                _d) });
                    }
                    if (tags) {
                        includeCondition = [
                            {
                                model: Tag_1["default"],
                                as: "tags",
                                where: {
                                    id: (_e = {},
                                        _e[sequelize_1.Op["in"]] = tags,
                                        _e)
                                },
                                required: true
                            }
                        ];
                    }
                    // if (wallets) {
                    //   includeCondition.push({
                    //     model: ContactWallet,
                    //     // as: "wallets",
                    //     where: {
                    //       walletId: wallets
                    //     },
                    //     required: true
                    //   });
                    // } else if (profile !== "admin") {
                    //   includeCondition.push({
                    //     model: ContactWallet,
                    //     // as: "wallet",
                    //     where: {
                    //       walletId: userId
                    //     },
                    //     required: true
                    //   });
                    // }
                    if (ddds) {
                        dddsFilter_1 = [];
                        // eslint-disable-next-line consistent-return
                        ddds.forEach(function (el) {
                            var _a;
                            if (el) {
                                var d = (_a = dddsPorEstado.find(function (ddd) { return ddd.estado === el; })) === null || _a === void 0 ? void 0 : _a.ddds;
                                if (d) {
                                    dddsFilter_1 = dddsFilter_1.concat(d);
                                }
                            }
                        });
                        where = __assign(__assign({}, where), { number: (_f = {},
                                _f[sequelize_1.Op.or] = dddsFilter_1.map(function (ddd) {
                                    var _a;
                                    return (_a = {}, _a[sequelize_1.Op.like] = "55".concat(ddd, "%"), _a);
                                }),
                                _f) });
                    }
                    return [4 /*yield*/, Contact_1["default"].findAll({
                            where: where,
                            attributes: ["id", "name", "number", "email"],
                            include: includeCondition,
                            order: [["name", "ASC"]]
                        })];
                case 1:
                    contacts = _g.sent();
                    return [2 /*return*/, { contacts: contacts }];
            }
        });
    });
};
exports["default"] = ListContactsService;
