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
exports.queryDialogFlow = void 0;
var Sentry = __importStar(require("@sentry/node"));
var logger_1 = __importDefault(require("../../utils/logger"));
function detectIntent(sessionClient, projectId, sessionId, query, languageCode) {
    return __awaiter(this, void 0, void 0, function () {
        var sessionPath, request, responses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
                    request = {
                        session: sessionPath,
                        queryInput: {
                            text: {
                                text: query,
                                languageCode: languageCode
                            }
                        }
                    };
                    return [4 /*yield*/, sessionClient.detectIntent(request)];
                case 1:
                    responses = _a.sent();
                    return [2 /*return*/, responses[0]];
            }
        });
    });
}
function detectAudioIntent(sessionClient, projectId, sessionId, languageCode, inputAudio) {
    return __awaiter(this, void 0, void 0, function () {
        var sessionPath, encoding, sampleRateHertz, request, responses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
                    encoding = 6;
                    sampleRateHertz = 16000;
                    request = {
                        session: sessionPath,
                        queryInput: {
                            audioConfig: {
                                audioEncoding: encoding,
                                sampleRateHertz: sampleRateHertz,
                                languageCode: languageCode
                            }
                        },
                        inputAudio: inputAudio
                    };
                    return [4 /*yield*/, sessionClient.detectIntent(request)];
                case 1:
                    responses = _a.sent();
                    return [2 /*return*/, responses[0]];
            }
        });
    });
}
function queryDialogFlow(sessionClient, projectId, sessionId, query, languageCode, inputAudio) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __awaiter(this, void 0, void 0, function () {
        var intentResponse, responses, endConversation, parameters, encodedAudio, error_1, responses, endConversation, parameters, encodedAudio, error_2;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    if (!inputAudio) return [3 /*break*/, 5];
                    _q.label = 1;
                case 1:
                    _q.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, detectAudioIntent(sessionClient, projectId, sessionId, languageCode, inputAudio)];
                case 2:
                    intentResponse = _q.sent();
                    responses = (_a = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.queryResult) === null || _a === void 0 ? void 0 : _a.fulfillmentMessages;
                    endConversation = (_e = (_d = (_c = (_b = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.queryResult) === null || _b === void 0 ? void 0 : _b.diagnosticInfo) === null || _c === void 0 ? void 0 : _c.fields) === null || _d === void 0 ? void 0 : _d.end_conversation) === null || _e === void 0 ? void 0 : _e.boolValue;
                    parameters = (_g = (_f = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.queryResult) === null || _f === void 0 ? void 0 : _f.parameters) === null || _g === void 0 ? void 0 : _g.fields;
                    encodedAudio = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.outputAudio;
                    if ((responses === null || responses === void 0 ? void 0 : responses.length) === 0) {
                        return [2 /*return*/, null];
                    }
                    else {
                        return [2 /*return*/, {
                                responses: responses,
                                endConversation: endConversation,
                                parameters: parameters,
                                encodedAudio: encodedAudio
                            }];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _q.sent();
                    Sentry.captureException(error_1);
                    logger_1["default"].error("Error handling whatsapp message: Err: ".concat(error_1));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, null];
                case 5:
                    _q.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, detectIntent(sessionClient, projectId, sessionId, query, languageCode)];
                case 6:
                    intentResponse = _q.sent();
                    responses = (_h = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.queryResult) === null || _h === void 0 ? void 0 : _h.fulfillmentMessages;
                    endConversation = (_m = (_l = (_k = (_j = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.queryResult) === null || _j === void 0 ? void 0 : _j.diagnosticInfo) === null || _k === void 0 ? void 0 : _k.fields) === null || _l === void 0 ? void 0 : _l.end_conversation) === null || _m === void 0 ? void 0 : _m.boolValue;
                    parameters = (_p = (_o = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.queryResult) === null || _o === void 0 ? void 0 : _o.parameters) === null || _p === void 0 ? void 0 : _p.fields;
                    encodedAudio = intentResponse === null || intentResponse === void 0 ? void 0 : intentResponse.outputAudio;
                    if ((responses === null || responses === void 0 ? void 0 : responses.length) === 0) {
                        return [2 /*return*/, null];
                    }
                    else {
                        return [2 /*return*/, {
                                responses: responses,
                                endConversation: endConversation,
                                parameters: parameters,
                                encodedAudio: encodedAudio
                            }];
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _q.sent();
                    Sentry.captureException(error_2);
                    logger_1["default"].error("Error handling whatsapp message: Err: ".concat(error_2));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, null];
            }
        });
    });
}
exports.queryDialogFlow = queryDialogFlow;
