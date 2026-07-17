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
exports.initUserMonitorQueues = exports.userMonitor = void 0;
var bull_1 = __importDefault(require("bull"));
var Sentry = __importStar(require("@sentry/node"));
var sequelize_1 = require("sequelize");
var lodash_1 = require("lodash");
var logger_1 = __importDefault(require("./utils/logger"));
var database_1 = __importDefault(require("./database"));
var User_1 = __importDefault(require("./models/User"));
var connection = process.env.REDIS_URI || "";
exports.userMonitor = new bull_1["default"]("UserMonitor", connection);
function handleLoginStatus(job) {
    return __awaiter(this, void 0, void 0, function () {
        var users, _i, users_1, item, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("select id from \"Users\" where \"updatedAt\" < now() - '5 minutes'::interval and online = true", { type: sequelize_1.QueryTypes.SELECT })];
                case 1:
                    users = _a.sent();
                    _i = 0, users_1 = users;
                    _a.label = 2;
                case 2:
                    if (!(_i < users_1.length)) return [3 /*break*/, 8];
                    item = users_1[_i];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, User_1["default"].findByPk(item.id)];
                case 4:
                    user = _a.sent();
                    return [4 /*yield*/, user.update({ online: false })];
                case 5:
                    _a.sent();
                    logger_1["default"].info("Usu\u00E1rio passado para offline: ".concat(item.id));
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    Sentry.captureException(e_1);
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function handleUserConnection(job) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    id = job.data.id;
                    if (!(!(0, lodash_1.isNil)(id) && id !== "null")) return [3 /*break*/, 3];
                    return [4 /*yield*/, User_1["default"].findByPk(id)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    user.online = true;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    Sentry.captureException(e_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.userMonitor.process("UserConnection", handleUserConnection);
exports.userMonitor.process("VerifyLoginStatus", handleLoginStatus);
function initUserMonitorQueues() {
    return __awaiter(this, void 0, void 0, function () {
        var repeatableJobs, _i, repeatableJobs_1, job;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.userMonitor.getRepeatableJobs()];
                case 1:
                    repeatableJobs = _a.sent();
                    _i = 0, repeatableJobs_1 = repeatableJobs;
                    _a.label = 2;
                case 2:
                    if (!(_i < repeatableJobs_1.length)) return [3 /*break*/, 5];
                    job = repeatableJobs_1[_i];
                    return [4 /*yield*/, exports.userMonitor.removeRepeatableByKey(job.key)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    exports.userMonitor.add("VerifyLoginStatus", {}, {
                        repeat: { cron: "* * * * *", key: "verify-login-status" },
                        removeOnComplete: { age: 60 * 60, count: 10 },
                        removeOnFail: { age: 60 * 60, count: 10 }
                    });
                    logger_1["default"].info("Queue: monitoramento de status de usuário inicializado");
                    return [2 /*return*/];
            }
        });
    });
}
exports.initUserMonitorQueues = initUserMonitorQueues;
