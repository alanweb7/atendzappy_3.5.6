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
var ApiAuthService_1 = __importDefault(require("./ApiAuthService")); // Serviço de autenticação para obter o token
var API_BASE_URL = 'https://sandboxapicore.imaginasoft.pt/api/v1';
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    ApiService.getAuthToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ApiAuthService_1["default"].getAuthToken()];
                    case 1: return [2 /*return*/, _a.sent()]; // Obter o token de autenticação
                }
            });
        });
    };
    // Endpoint para autenticação (já implementado no AuthService)
    // ...
    // Endpoint para obter todos os usuários
    ApiService.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(API_BASE_URL, "/users"), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error('Failed to fetch users: ' + error_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para obter um usuário por ID
    ApiService.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(API_BASE_URL, "/users/").concat(id), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error('Failed to fetch user by ID: ' + error_2.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para criar um novo usuário
    ApiService.createUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].post("".concat(API_BASE_URL, "/users"), userData, {
                                headers: {
                                    'Authorization': "Bearer ".concat(token),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error('Failed to create user: ' + error_3.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para atualizar um usuário
    ApiService.updateUser = function (id, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].put("".concat(API_BASE_URL, "/users/").concat(id), userData, {
                                headers: {
                                    'Authorization': "Bearer ".concat(token),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error('Failed to update user: ' + error_4.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para deletar um usuário
    ApiService.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"]["delete"]("".concat(API_BASE_URL, "/users/").concat(id), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error('Failed to delete user: ' + error_5.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para obter todos os produtos
    ApiService.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(API_BASE_URL, "/products"), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_6 = _a.sent();
                        throw new Error('Failed to fetch products: ' + error_6.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para obter um produto por ID
    ApiService.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(API_BASE_URL, "/products/").concat(id), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_7 = _a.sent();
                        throw new Error('Failed to fetch product by ID: ' + error_7.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para criar um novo produto
    ApiService.createProduct = function (productData) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].post("".concat(API_BASE_URL, "/products"), productData, {
                                headers: {
                                    'Authorization': "Bearer ".concat(token),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_8 = _a.sent();
                        throw new Error('Failed to create product: ' + error_8.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para atualizar um produto
    ApiService.updateProduct = function (id, productData) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].put("".concat(API_BASE_URL, "/products/").concat(id), productData, {
                                headers: {
                                    'Authorization': "Bearer ".concat(token),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_9 = _a.sent();
                        throw new Error('Failed to update product: ' + error_9.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Endpoint para deletar um produto
    ApiService.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"]["delete"]("".concat(API_BASE_URL, "/products/").concat(id), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        error_10 = _a.sent();
                        throw new Error('Failed to delete product: ' + error_10.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ApiService;
}());
exports["default"] = ApiService;
