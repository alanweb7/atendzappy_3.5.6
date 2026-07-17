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
var util_1 = __importDefault(require("util"));
var ioredis_1 = __importDefault(require("ioredis"));
var hmac_sha512_1 = __importDefault(require("crypto-js/hmac-sha512"));
var enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
var redis_1 = require("../config/redis");
var CacheSingleton = /** @class */ (function () {
    function CacheSingleton(redisInstance) {
        this.redis = redisInstance;
        this.set = util_1["default"].promisify(this.redis.set).bind(this.redis);
        this.get = util_1["default"].promisify(this.redis.get).bind(this.redis);
        this.keys = util_1["default"].promisify(this.redis.keys).bind(this.redis);
        this.del = util_1["default"].promisify(this.redis.del).bind(this.redis);
    }
    CacheSingleton.getInstance = function (redisInstance) {
        if (!CacheSingleton.instance) {
            CacheSingleton.instance = new CacheSingleton(redisInstance);
        }
        return CacheSingleton.instance;
    };
    CacheSingleton.encryptParams = function (params) {
        var str = JSON.stringify(params);
        var key = enc_base64_1["default"].stringify((0, hmac_sha512_1["default"])(params, str));
        return key;
    };
    CacheSingleton.prototype.set = function (key, value, option, optionValue) {
        return __awaiter(this, void 0, void 0, function () {
            var setPromisefy;
            return __generator(this, function (_a) {
                setPromisefy = util_1["default"].promisify(this.redis.set).bind(this.redis);
                if (option !== undefined && optionValue !== undefined) {
                    return [2 /*return*/, setPromisefy(key, value, option, optionValue)];
                }
                return [2 /*return*/, setPromisefy(key, value)];
            });
        });
    };
    CacheSingleton.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var getPromisefy;
            return __generator(this, function (_a) {
                getPromisefy = util_1["default"].promisify(this.redis.get).bind(this.redis);
                return [2 /*return*/, getPromisefy(key)];
            });
        });
    };
    CacheSingleton.prototype.getKeys = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            var getKeysPromisefy;
            return __generator(this, function (_a) {
                getKeysPromisefy = util_1["default"].promisify(this.redis.keys).bind(this.redis);
                return [2 /*return*/, getKeysPromisefy(pattern)];
            });
        });
    };
    CacheSingleton.prototype.del = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var delPromisefy;
            return __generator(this, function (_a) {
                delPromisefy = util_1["default"].promisify(this.redis.del).bind(this.redis);
                return [2 /*return*/, delPromisefy(key)];
            });
        });
    };
    CacheSingleton.prototype.delFromPattern = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            var all;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getKeys(pattern)];
                    case 1:
                        all = _a.sent();
                        return [4 /*yield*/, Promise.all(all.map(function (item) { return _this.del(item); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CacheSingleton.prototype.setFromParams = function (key, params, value, option, optionValue) {
        return __awaiter(this, void 0, void 0, function () {
            var finalKey;
            return __generator(this, function (_a) {
                finalKey = "".concat(key, ":").concat(CacheSingleton.encryptParams(params));
                if (option !== undefined && optionValue !== undefined) {
                    return [2 /*return*/, this.set(finalKey, value, option, optionValue)];
                }
                return [2 /*return*/, this.set(finalKey, value)];
            });
        });
    };
    CacheSingleton.prototype.getFromParams = function (key, params) {
        return __awaiter(this, void 0, void 0, function () {
            var finalKey;
            return __generator(this, function (_a) {
                finalKey = "".concat(key, ":").concat(CacheSingleton.encryptParams(params));
                return [2 /*return*/, this.get(finalKey)];
            });
        });
    };
    CacheSingleton.prototype.delFromParams = function (key, params) {
        return __awaiter(this, void 0, void 0, function () {
            var finalKey;
            return __generator(this, function (_a) {
                finalKey = "".concat(key, ":").concat(CacheSingleton.encryptParams(params));
                return [2 /*return*/, this.del(finalKey)];
            });
        });
    };
    CacheSingleton.prototype.getRedisInstance = function () {
        return this.redis;
    };
    return CacheSingleton;
}());
var redisInstance = new ioredis_1["default"](redis_1.REDIS_URI_CONNECTION);
exports["default"] = CacheSingleton.getInstance(redisInstance);
