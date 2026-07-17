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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("dotenv/config");
var bull_1 = __importDefault(require("bull"));
var redis_1 = require("../config/redis");
var configLoaderService_1 = __importDefault(require("../services/ConfigLoaderService/configLoaderService"));
var jobs = __importStar(require("../jobs"));
var logger_1 = __importDefault(require("../utils/logger"));
var config = (0, configLoaderService_1["default"])(); // Carregue as configurações
var queueOptions = {
    defaultJobOptions: {
        attempts: config.webhook.attempts,
        backoff: {
            type: config.webhook.backoff.type,
            delay: config.webhook.backoff.delay
        },
        removeOnFail: false,
        removeOnComplete: true
    },
    limiter: {
        max: config.webhook.limiter.max,
        duration: config.webhook.limiter.duration
    }
};
var queues = Object.values(jobs).reduce(function (acc, job) {
    acc.push({
        bull: new bull_1["default"](job.key, redis_1.REDIS_URI_MSG_CONN, queueOptions),
        name: job.key,
        handle: job.handle
    });
    return acc;
}, []);
exports["default"] = {
    queues: queues,
    add: function (name, data, params) {
        if (params === void 0) { params = {}; }
        var queue = this.queues.find(function (queue) { return queue.name === name; });
        if (!queue) {
            throw new Error("Queue ".concat(name, " not found"));
        }
        return queue.bull.add(data, __assign(__assign({}, params), { removeOnComplete: true }));
    },
    process: function () {
        return this.queues.forEach(function (queue) {
            queue.bull.process(queue.handle);
            queue.bull.on('failed', function (job, err) {
                logger_1["default"].error("Job failed: ".concat(queue.key, " ").concat(job.data));
                logger_1["default"].error(err);
            });
        });
    }
};
