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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.processDispatchQueue = exports.addDispatchJob = exports.getDispatchQueue = void 0;
var bull_1 = __importDefault(require("bull"));
var dispatchQueue_1 = require("../config/dispatchQueue");
var logger_1 = __importDefault(require("../utils/logger"));
var dispatchQueueInstance = null;
var getDispatchQueue = function () {
    if (!dispatchQueueInstance) {
        dispatchQueueInstance = new bull_1["default"](dispatchQueue_1.DISPATCH_QUEUE_NAME, dispatchQueue_1.DISPATCH_QUEUE_REDIS_URI);
    }
    return dispatchQueueInstance;
};
exports.getDispatchQueue = getDispatchQueue;
var addDispatchJob = function (data, opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var queue, delayMs, jobData;
        return __generator(this, function (_a) {
            queue = (0, exports.getDispatchQueue)();
            delayMs = data.delayMs, jobData = __rest(data, ["delayMs"]);
            return [2 /*return*/, queue.add(jobData, __assign({ removeOnComplete: true, attempts: 3, backoff: { type: "fixed", delay: 5000 }, delay: delayMs !== null && delayMs !== void 0 ? delayMs : 0 }, opts))];
        });
    });
};
exports.addDispatchJob = addDispatchJob;
var processDispatchQueue = function (handler) {
    var queue = (0, exports.getDispatchQueue)();
    queue.process(dispatchQueue_1.DISPATCH_QUEUE_CONCURRENCY, function (job) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handler(job)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    logger_1["default"].error("[DispatchQueue] Job ".concat(job.id, " failed: ").concat(err_1.message));
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    queue.on("completed", function (job) {
        logger_1["default"].info("[DispatchQueue] Job ".concat(job.id, " completed"));
    });
    queue.on("failed", function (job, err) {
        logger_1["default"].error("[DispatchQueue] Job ".concat(job === null || job === void 0 ? void 0 : job.id, " failed"), err);
    });
};
exports.processDispatchQueue = processDispatchQueue;
