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
var sequelize_1 = require("sequelize");
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Chatbot_1 = __importDefault(require("../../models/Chatbot"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var ShowQueueService_1 = __importDefault(require("./ShowQueueService"));
var User_1 = __importDefault(require("../../models/User"));
var UpdateQueueService = function (queueId, queueData, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var color, name, chatbots, queueSchema, err_1, queue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                color = queueData.color, name = queueData.name, chatbots = queueData.chatbots;
                queueSchema = Yup.object().shape({
                    name: Yup.string()
                        .min(2, "ERR_QUEUE_INVALID_NAME")
                        .test("Check-unique-name", "ERR_QUEUE_NAME_ALREADY_EXISTS", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var queueWithSameName;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!value) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Queue_1["default"].findOne({
                                            where: { name: value, id: (_a = {}, _a[sequelize_1.Op.ne] = queueId, _a), companyId: companyId }
                                        })];
                                case 1:
                                    queueWithSameName = _b.sent();
                                    return [2 /*return*/, !queueWithSameName];
                                case 2: return [2 /*return*/, true];
                            }
                        });
                    }); }),
                    color: Yup.string()
                        .required("ERR_QUEUE_INVALID_COLOR")
                        .test("Check-color", "ERR_QUEUE_INVALID_COLOR", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var colorTestRegex;
                        return __generator(this, function (_a) {
                            if (value) {
                                colorTestRegex = /^#[0-9a-f]{3,6}$/i;
                                return [2 /*return*/, colorTestRegex.test(value)];
                            }
                            return [2 /*return*/, true];
                        });
                    }); })
                        .test("Check-color-exists", "ERR_QUEUE_COLOR_ALREADY_EXISTS", function (value) { return __awaiter(void 0, void 0, void 0, function () {
                        var queueWithSameColor;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!value) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Queue_1["default"].findOne({
                                            where: { color: value, id: (_a = {}, _a[sequelize_1.Op.ne] = queueId, _a), companyId: companyId }
                                        })];
                                case 1:
                                    queueWithSameColor = _b.sent();
                                    return [2 /*return*/, !queueWithSameColor];
                                case 2: return [2 /*return*/, true];
                            }
                        });
                    }); })
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, queueSchema.validate({ color: color, name: name })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 4: return [4 /*yield*/, (0, ShowQueueService_1["default"])(queueId, companyId)];
            case 5:
                queue = _a.sent();
                if (queue.companyId !== companyId) {
                    throw new AppError_1["default"]("Não é permitido alterar registros de outra empresa");
                }
                if (!chatbots) return [3 /*break*/, 8];
                return [4 /*yield*/, Promise.all(chatbots.map(function (bot) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Chatbot_1["default"].upsert(__assign(__assign({}, bot), { queueId: queue.id }))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 6:
                _a.sent();
                return [4 /*yield*/, Promise.all(queue.chatbots.map(function (oldBot) { return __awaiter(void 0, void 0, void 0, function () {
                        var stillExists;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    stillExists = chatbots.findIndex(function (bot) { return bot.id === oldBot.id; });
                                    if (!(stillExists === -1)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Chatbot_1["default"].destroy({ where: { id: oldBot.id } })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, queue.update(queueData)];
            case 9:
                _a.sent();
                return [4 /*yield*/, queue.reload({
                        include: [
                            {
                                model: Chatbot_1["default"],
                                as: "chatbots",
                                include: [
                                    {
                                        model: User_1["default"],
                                        as: "user"
                                    },
                                ],
                                // attributes: ["id", "name", "greetingMessage"],
                                order: [[{ model: Chatbot_1["default"], as: "chatbots" }, "id", "asc"], ["id", "ASC"]]
                            }
                        ],
                        order: [[{ model: Chatbot_1["default"], as: "chatbots" }, "id", "asc"], ["id", "ASC"]]
                    })];
            case 10:
                _a.sent();
                return [2 /*return*/, queue];
        }
    });
}); };
exports["default"] = UpdateQueueService;
