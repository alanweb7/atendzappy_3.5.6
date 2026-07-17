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
exports.__esModule = true;
var baileys_1 = require("@whiskeysockets/baileys");
var KEY_MAP = {
    "pre-key": "preKeys",
    session: "sessions",
    "sender-key": "senderKeys",
    "app-state-sync-key": "appStateSyncKeys",
    "app-state-sync-version": "appStateVersions",
    "sender-key-memory": "senderKeyMemory",
    "lid-mapping": "lidMappings",
    "device-list": "deviceList",
    tctoken: "tcToken"
};
var authState = function (whatsapp) { return __awaiter(void 0, void 0, void 0, function () {
    var creds, keys, saveState, result;
    return __generator(this, function (_a) {
        keys = {};
        saveState = function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, whatsapp.update({
                                session: JSON.stringify({ creds: creds, keys: keys }, baileys_1.BufferJSON.replacer, 0)
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // const getSessionDatabase = await whatsappById(whatsapp.id);
        if (whatsapp.session && whatsapp.session !== null) {
            result = JSON.parse(whatsapp.session, baileys_1.BufferJSON.reviver);
            creds = result.creds;
            keys = result.keys;
        }
        else {
            creds = (0, baileys_1.initAuthCreds)();
            keys = {};
        }
        return [2 /*return*/, {
                state: {
                    creds: creds,
                    keys: {
                        get: function (type, ids) {
                            var key = KEY_MAP[type];
                            return ids.reduce(function (dict, id) {
                                var _a;
                                var value = (_a = keys[key]) === null || _a === void 0 ? void 0 : _a[id];
                                if (value) {
                                    if (type === "app-state-sync-key") {
                                        value = baileys_1.proto.Message.AppStateSyncKeyData.fromObject(value);
                                    }
                                    dict[id] = value;
                                }
                                return dict;
                            }, {});
                        },
                        set: function (data) {
                            // eslint-disable-next-line no-restricted-syntax, guard-for-in
                            for (var i in data) {
                                var key = KEY_MAP[i];
                                keys[key] = keys[key] || {};
                                Object.assign(keys[key], data[i]);
                            }
                            saveState();
                        }
                    }
                },
                saveState: saveState
            }];
    });
}); };
exports["default"] = authState;
