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
exports.TypebotService = void 0;
var axios_1 = __importDefault(require("axios"));
var TypebotService = /** @class */ (function () {
    function TypebotService(apiUrl, token) {
        this.apiUrl = apiUrl;
        this.token = token;
    }
    TypebotService.prototype.getWorkspaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            method: "get",
                            url: "".concat(this.apiUrl, "/api/v1/workspaces"),
                            headers: {
                                Authorization: "Bearer ".concat(this.token)
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1["default"])(config)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TypebotService.prototype.startChat = function (publicId, message, queueValues, nome, numero, ticketId) {
        return __awaiter(this, void 0, void 0, function () {
            var startChatConfig, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startChatConfig = {
                            method: "post",
                            url: "".concat(this.apiUrl, "/api/v1/typebots/").concat(publicId, "/startChat"),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(this.token)
                            },
                            data: {
                                message: message,
                                isStreamEnabled: true,
                                isOnlyRegistering: false,
                                prefilledVariables: {
                                    "fila1": queueValues[0] || "",
                                    "fila2": queueValues[1] || "",
                                    "fila3": queueValues[2] || "",
                                    "fila4": queueValues[3] || "",
                                    "fila5": queueValues[4] || "",
                                    "fila6": queueValues[5] || "",
                                    "fila7": queueValues[6] || "",
                                    "fila8": queueValues[7] || "",
                                    "fila9": queueValues[8] || "",
                                    "fila10": queueValues[9] || "",
                                    "fila11": queueValues[10] || "",
                                    "fila12": queueValues[11] || "",
                                    "fila13": queueValues[12] || "",
                                    "fila14": queueValues[13] || "",
                                    "fila15": queueValues[14] || "",
                                    "fila16": queueValues[15] || "",
                                    "fila17": queueValues[16] || "",
                                    "fila18": queueValues[17] || "",
                                    "fila19": queueValues[18] || "",
                                    "fila20": queueValues[19] || "",
                                    "nome": nome,
                                    "numero": numero,
                                    "ticketId": ticketId
                                }
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1["default"])(startChatConfig)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TypebotService.prototype.startNewChat = function (publicId, queueValues, nome, numero) {
        return __awaiter(this, void 0, void 0, function () {
            var startChatConfig, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startChatConfig = {
                            method: "post",
                            url: "".concat(this.apiUrl, "/api/v1/typebots/").concat(publicId, "/startChat"),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(this.token)
                            },
                            data: {
                                isStreamEnabled: true,
                                isOnlyRegistering: true,
                                prefilledVariables: {
                                    "fila1": queueValues[0] || "",
                                    "fila2": queueValues[1] || "",
                                    "fila3": queueValues[2] || "",
                                    "fila4": queueValues[3] || "",
                                    "fila5": queueValues[4] || "",
                                    "fila6": queueValues[5] || "",
                                    "fila7": queueValues[6] || "",
                                    "fila8": queueValues[7] || "",
                                    "fila9": queueValues[8] || "",
                                    "fila10": queueValues[9] || "",
                                    "fila11": queueValues[10] || "",
                                    "fila12": queueValues[11] || "",
                                    "fila13": queueValues[12] || "",
                                    "fila14": queueValues[13] || "",
                                    "fila15": queueValues[14] || "",
                                    "fila16": queueValues[15] || "",
                                    "fila17": queueValues[16] || "",
                                    "fila18": queueValues[17] || "",
                                    "fila19": queueValues[18] || "",
                                    "fila20": queueValues[19] || "",
                                    "nome": nome,
                                    "numero": numero
                                }
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1["default"])(startChatConfig)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TypebotService.prototype.continueChat = function (sessionId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var continueChatConfig, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        continueChatConfig = {
                            method: "post",
                            url: "".concat(this.apiUrl, "/api/v1/sessions/").concat(sessionId, "/continueChat"),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(this.token)
                            },
                            data: {
                                message: message
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1["default"])(continueChatConfig)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TypebotService;
}());
exports.TypebotService = TypebotService;
