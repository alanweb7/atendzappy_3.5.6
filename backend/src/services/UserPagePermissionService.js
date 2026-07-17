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
var UserPagePermission_1 = __importDefault(require("../models/UserPagePermission"));
var User_1 = __importDefault(require("../models/User"));
var UserPagePermissionService = /** @class */ (function () {
    function UserPagePermissionService() {
    }
    // Lista todas as páginas disponíveis no sistema
    UserPagePermissionService.getAvailablePages = function () {
        return [
            // Painel
            { path: "/painel", name: "Dashboard", group: "Painel", defaultFor: ["admin"] },
            { path: "/relatorios", name: "Relatórios", group: "Painel", defaultFor: ["admin"] },
            // Inbox
            { path: "/atendimentos", name: "Conversas", group: "Inbox", defaultFor: ["admin", "user"] },
            { path: "/chamadas", name: "Chamadas", group: "Inbox", defaultFor: ["admin", "user"] },
            // Kanban
            { path: "/kanban", name: "Kanban", group: "Kanban", defaultFor: ["admin", "user"] },
            { path: "/funil", name: "Funil", group: "Kanban", defaultFor: ["admin"] },
            { path: "/etiquetas", name: "Etiquetas", group: "Kanban", defaultFor: ["admin"] },
            // Usuários
            { path: "/contatos", name: "Contatos", group: "Usuários", defaultFor: ["admin", "user"] },
            { path: "/leads", name: "Leads", group: "Usuários", defaultFor: ["admin", "user"] },
            { path: "/clientes", name: "Clientes", group: "Usuários", defaultFor: ["admin", "user"] },
            { path: "/users", name: "Usuários", group: "Usuários", defaultFor: ["admin"] },
            // Automação
            { path: "/agentes", name: "Agente de IA", group: "Automação", defaultFor: ["admin"] },
            { path: "/flowbuilders", name: "Construtor de Fluxo", group: "Automação", defaultFor: ["admin"] },
            { path: "/campanhas", name: "Disparos", group: "Automação", defaultFor: ["admin"] },
            { path: "/phrase-lists", name: "Campanhas", group: "Automação", defaultFor: ["admin"] },
            { path: "/quick-messages", name: "Respostas rápidas", group: "Automação", defaultFor: ["admin", "user"] },
            { path: "/integracao", name: "Integrações", group: "Automação", defaultFor: ["admin"] },
            { path: "/ferramentas", name: "Ferramentas", group: "Automação", defaultFor: ["admin"] },
            // Produtividade
            { path: "/produtos", name: "Produtos", group: "Produtividade", defaultFor: ["admin"] },
            { path: "/servicos", name: "Serviços", group: "Produtividade", defaultFor: ["admin"] },
            { path: "/user-schedules", name: "Agenda", group: "Produtividade", defaultFor: ["admin", "user"] },
            { path: "/projects", name: "Projetos", group: "Produtividade", defaultFor: ["admin"] },
            // Ajuda
            { path: "/helps", name: "Ajuda", group: "Ajuda", defaultFor: ["admin", "user"] },
            { path: "/messages-api", name: "Documentação", group: "Ajuda", defaultFor: ["admin"] },
            // Configurações
            { path: "/canais", name: "Canais", group: "Configurações", defaultFor: ["admin"] },
            { path: "/departamentos", name: "Departamentos", group: "Configurações", defaultFor: ["admin"] },
            { path: "/payment-settings", name: "Pagamentos", group: "Configurações", defaultFor: ["admin"] },
            { path: "/faturas", name: "Faturas", group: "Configurações", defaultFor: ["admin", "user"] },
            // Sistema
            { path: "/contact-lists", name: "Lista de contatos", group: "Sistema", defaultFor: ["admin"] },
            { path: "/contatos/import", name: "Importar contatos", group: "Sistema", defaultFor: ["admin"] },
            { path: "/automations", name: "Automações", group: "Sistema", defaultFor: ["admin"] },
            { path: "/financeiro", name: "Financeiro", group: "Sistema", defaultFor: ["admin", "user"] },
            { path: "/lembretes", name: "Lembretes", group: "Sistema", defaultFor: ["admin", "user"] },
            { path: "/settings", name: "Configurações", group: "Sistema", defaultFor: ["admin"] },
            { path: "/afiliados", name: "Meu Painel Afiliado", group: "Sistema", defaultFor: ["admin", "user"] },
            // Super Admin
            { path: "/admin/afiliados", name: "Afiliados", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/admin/comissoes", name: "Comissões", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/admin/saques", name: "Saques", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/slider-banners", name: "Banners", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/tutorial-videos", name: "Vídeo Tutorial", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/translation-manager", name: "Traduções", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/whitelabel", name: "Whitelabel", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/empresas", name: "Empresas", group: "Sistema", defaultFor: ["admin"], superAdmin: true },
            { path: "/planos", name: "Planos", group: "Sistema", defaultFor: ["admin"], superAdmin: true }
        ];
    };
    // Obtém permissões de um usuário específico
    UserPagePermissionService.getUserPagePermissions = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, availablePages, permissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1["default"].findByPk(userId, {
                            include: [{ model: UserPagePermission_1["default"], as: "pagePermissions" }]
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Usuário não encontrado");
                        }
                        availablePages = this.getAvailablePages();
                        permissions = {};
                        // Se o modo for inherit, usa permissões padrão do perfil
                        if (user.pagePermissionsMode === "inherit") {
                            availablePages.forEach(function (page) {
                                var _a;
                                // Admin tem acesso a tudo
                                if (user.profile === "admin") {
                                    permissions[page.path] = true;
                                }
                                else {
                                    // Verifica se a página está disponível para o perfil do usuário
                                    permissions[page.path] = ((_a = page.defaultFor) === null || _a === void 0 ? void 0 : _a.includes(user.profile)) || false;
                                }
                            });
                        }
                        else {
                            // Modo custom: usa permissões específicas do banco
                            availablePages.forEach(function (page) {
                                var _a;
                                var userPermission = (_a = user.pagePermissions) === null || _a === void 0 ? void 0 : _a.find(function (p) { return p.pagePath === page.path; });
                                permissions[page.path] = (userPermission === null || userPermission === void 0 ? void 0 : userPermission.canAccess) || false;
                            });
                        }
                        return [2 /*return*/, {
                                pagePermissionsMode: user.pagePermissionsMode,
                                permissions: permissions
                            }];
                }
            });
        });
    };
    // Define permissões de um usuário
    UserPagePermissionService.setUserPagePermissions = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, permissions, pagePermissionsMode, user, permissionsToCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = data.userId, permissions = data.permissions, pagePermissionsMode = data.pagePermissionsMode;
                        return [4 /*yield*/, User_1["default"].findByPk(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Usuário não encontrado");
                        }
                        // Atualiza o modo de permissões
                        return [4 /*yield*/, user.update({ pagePermissionsMode: pagePermissionsMode })];
                    case 2:
                        // Atualiza o modo de permissões
                        _a.sent();
                        if (!(pagePermissionsMode === "custom")) return [3 /*break*/, 5];
                        // Remove todas as permissões existentes
                        return [4 /*yield*/, UserPagePermission_1["default"].destroy({ where: { userId: userId } })];
                    case 3:
                        // Remove todas as permissões existentes
                        _a.sent();
                        permissionsToCreate = permissions.map(function (permission) { return ({
                            userId: userId,
                            pagePath: permission.pagePath,
                            canAccess: permission.canAccess
                        }); });
                        return [4 /*yield*/, UserPagePermission_1["default"].bulkCreate(permissionsToCreate)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: 
                    // Se for modo inherit, remove todas as permissões personalizadas
                    return [4 /*yield*/, UserPagePermission_1["default"].destroy({ where: { userId: userId } })];
                    case 6:
                        // Se for modo inherit, remove todas as permissões personalizadas
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, this.getUserPagePermissions(userId)];
                }
            });
        });
    };
    // Verifica se um usuário tem acesso a uma página específica
    UserPagePermissionService.canUserAccessPage = function (userId, pagePath) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var user, availablePages, page, permission;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, User_1["default"].findByPk(userId, {
                            include: [{ model: UserPagePermission_1["default"], as: "pagePermissions" }]
                        })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            return [2 /*return*/, false];
                        }
                        // Admin sempre tem acesso
                        if (user.profile === "admin") {
                            return [2 /*return*/, true];
                        }
                        // Se o modo for inherit, verifica permissões padrão
                        if (user.pagePermissionsMode === "inherit") {
                            availablePages = this.getAvailablePages();
                            page = availablePages.find(function (p) { return p.path === pagePath; });
                            return [2 /*return*/, ((_a = page === null || page === void 0 ? void 0 : page.defaultFor) === null || _a === void 0 ? void 0 : _a.includes(user.profile)) || false];
                        }
                        permission = (_b = user.pagePermissions) === null || _b === void 0 ? void 0 : _b.find(function (p) { return p.pagePath === pagePath; });
                        return [2 /*return*/, (permission === null || permission === void 0 ? void 0 : permission.canAccess) || false];
                }
            });
        });
    };
    // Obtém páginas que um usuário pode acessar (para montar o menu)
    UserPagePermissionService.getUserAccessiblePages = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var permissions, availablePages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserPagePermissions(userId)];
                    case 1:
                        permissions = (_a.sent()).permissions;
                        availablePages = this.getAvailablePages();
                        return [2 /*return*/, availablePages.filter(function (page) { return permissions[page.path]; })];
                }
            });
        });
    };
    return UserPagePermissionService;
}());
exports["default"] = UserPagePermissionService;
