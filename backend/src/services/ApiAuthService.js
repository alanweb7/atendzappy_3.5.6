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
var axios_1 = __importDefault(require("axios"));
var API_BASE_URL = 'https://sandboxapicore.imaginasoft.pt/api/v1';
var USERNAME = 'sandboxapi_nsapi_266844693';
var PASSWORD = 'ieN83R8ilgqPu6RCEsUFdg9H22OzfKG2wjSoSsnt@AqYKsntqJIF&Ux2$2O1';
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.fetchAuthToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post("".concat(API_BASE_URL, "/Authentication"), {
                                username: USERNAME,
                                password: PASSWORD
                            }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        // Verifique se o token foi retornado corretamente
                        if (!response.data.token) {
                            throw new Error('Token not found in the response');
                        }
                        return [2 /*return*/, response.data.token];
                    case 2:
                        error_1 = _a.sent();
                        // Melhore o tratamento de erros
                        if (error_1.response) {
                            // Erro retornado pela API
                            throw new Error("Failed to authenticate: ".concat(error_1.response.status, " - ").concat(error_1.response.data.message || 'No error message'));
                        }
                        else if (error_1.request) {
                            // Erro de conexão
                            throw new Error('Failed to authenticate: No response received from the server');
                        }
                        else {
                            // Erro genérico
                            throw new Error('Failed to authenticate: ' + error_1.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.getAuthToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Se o token já estiver em cache, retorne-o
                        if (this.token) {
                            return [2 /*return*/, this.token];
                        }
                        // Caso contrário, obtenha um novo token
                        _a = this;
                        return [4 /*yield*/, this.fetchAuthToken()];
                    case 1:
                        // Caso contrário, obtenha um novo token
                        _a.token = _b.sent();
                        return [2 /*return*/, this.token];
                }
            });
        });
    };
    // Método para limpar o cache do token (útil para logout ou token expirado)
    AuthService.clearToken = function () {
        this.token = null;
    };
    AuthService.token = null; // Cache do token
    return AuthService;
}());
exports["default"] = AuthService;
