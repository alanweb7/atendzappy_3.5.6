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
var UserPagePermissionService_1 = __importDefault(require("../services/UserPagePermissionService"));
var UserPagePermissionController = /** @class */ (function () {
    function UserPagePermissionController() {
    }
    // Lista todas as páginas disponíveis no sistema
    UserPagePermissionController.listAvailablePages = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pages, groupedPages;
            return __generator(this, function (_a) {
                try {
                    pages = UserPagePermissionService_1["default"].getAvailablePages();
                    groupedPages = pages.reduce(function (acc, page) {
                        if (!acc[page.group]) {
                            acc[page.group] = [];
                        }
                        acc[page.group].push(page);
                        return acc;
                    }, {});
                    res.json({ pages: groupedPages });
                }
                catch (error) {
                    console.error("Erro ao listar páginas disponíveis:", error);
                    res.status(500).json({ error: "Erro interno do servidor" });
                }
                return [2 /*return*/];
            });
        });
    };
    // Obtém permissões de um usuário específico
    UserPagePermissionController.getUserPermissions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, permissions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        if (!userId || isNaN(Number(userId))) {
                            return [2 /*return*/, res.status(400).json({ error: "ID do usuário inválido" })];
                        }
                        return [4 /*yield*/, UserPagePermissionService_1["default"].getUserPagePermissions(Number(userId))];
                    case 1:
                        permissions = _a.sent();
                        res.json(permissions);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Erro ao obter permissões do usuário:", error_1);
                        if (error_1 instanceof Error && error_1.message === "Usuário não encontrado") {
                            return [2 /*return*/, res.status(404).json({ error: "Usuário não encontrado" })];
                        }
                        res.status(500).json({ error: "Erro interno do servidor" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Define permissões de um usuário
    UserPagePermissionController.setUserPermissions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, permissions, pagePermissionsMode, availablePages, availablePaths, _i, permissions_1, permission, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        _a = req.body, permissions = _a.permissions, pagePermissionsMode = _a.pagePermissionsMode;
                        if (!userId || isNaN(Number(userId))) {
                            return [2 /*return*/, res.status(400).json({ error: "ID do usuário inválido" })];
                        }
                        if (!pagePermissionsMode || !["inherit", "custom"].includes(pagePermissionsMode)) {
                            return [2 /*return*/, res.status(400).json({ error: "Modo de permissões inválido" })];
                        }
                        if (!Array.isArray(permissions)) {
                            return [2 /*return*/, res.status(400).json({ error: "Permissões devem ser um array" })];
                        }
                        availablePages = UserPagePermissionService_1["default"].getAvailablePages();
                        availablePaths = new Set(availablePages.map(function (p) { return p.path; }));
                        for (_i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
                            permission = permissions_1[_i];
                            if (!permission.pagePath || typeof permission.canAccess !== "boolean") {
                                return [2 /*return*/, res.status(400).json({ error: "Formato de permissão inválido" })];
                            }
                            if (!availablePaths.has(permission.pagePath)) {
                                return [2 /*return*/, res.status(400).json({ error: "P\u00E1gina inv\u00E1lida: ".concat(permission.pagePath) })];
                            }
                        }
                        return [4 /*yield*/, UserPagePermissionService_1["default"].setUserPagePermissions({
                                userId: Number(userId),
                                permissions: permissions,
                                pagePermissionsMode: pagePermissionsMode
                            })];
                    case 1:
                        result = _b.sent();
                        res.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.error("Erro ao definir permissões do usuário:", error_2);
                        if (error_2 instanceof Error && error_2.message === "Usuário não encontrado") {
                            return [2 /*return*/, res.status(404).json({ error: "Usuário não encontrado" })];
                        }
                        res.status(500).json({ error: "Erro interno do servidor" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Verifica se um usuário tem acesso a uma página específica (endpoint utilitário)
    UserPagePermissionController.checkPageAccess = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, pagePath, canAccess, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        pagePath = req.query.pagePath;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ error: "Usuário não autenticado" })];
                        }
                        if (!pagePath || typeof pagePath !== "string") {
                            return [2 /*return*/, res.status(400).json({ error: "Caminho da página inválido" })];
                        }
                        return [4 /*yield*/, UserPagePermissionService_1["default"].canUserAccessPage(Number(userId), pagePath)];
                    case 1:
                        canAccess = _b.sent();
                        res.json({ canAccess: canAccess, pagePath: pagePath });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.error("Erro ao verificar acesso à página:", error_3);
                        res.status(500).json({ error: "Erro interno do servidor" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Obtém páginas que um usuário pode acessar (para montar o menu)
    UserPagePermissionController.getUserAccessiblePages = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, pages, groupedPages, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ error: "Usuário não autenticado" })];
                        }
                        return [4 /*yield*/, UserPagePermissionService_1["default"].getUserAccessiblePages(Number(userId))];
                    case 1:
                        pages = _b.sent();
                        groupedPages = pages.reduce(function (acc, page) {
                            if (!acc[page.group]) {
                                acc[page.group] = [];
                            }
                            acc[page.group].push(page);
                            return acc;
                        }, {});
                        res.json({ pages: groupedPages });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error("Erro ao obter páginas acessíveis:", error_4);
                        res.status(500).json({ error: "Erro interno do servidor" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserPagePermissionController;
}());
exports["default"] = UserPagePermissionController;
