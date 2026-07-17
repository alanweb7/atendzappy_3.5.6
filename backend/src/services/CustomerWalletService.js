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
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CustomerWallet_1 = __importDefault(require("../models/CustomerWallet"));
var CustomerWalletCustomer_1 = __importDefault(require("../models/CustomerWalletCustomer"));
var CustomerWalletUser_1 = __importDefault(require("../models/CustomerWalletUser"));
var CrmClient_1 = __importDefault(require("../models/CrmClient"));
var User_1 = __importDefault(require("../models/User"));
var CustomerWalletService = /** @class */ (function () {
    function CustomerWalletService() {
    }
    // ========== CARTEIRAS ==========
    CustomerWalletService.prototype.create = function (walletData) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, error_1, wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string().required().min(3).max(255),
                            description: Yup.string().optional(),
                            companyId: Yup.number().required().positive().integer(),
                            isActive: Yup.boolean().optional()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(walletData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new AppError_1["default"](error_1.message);
                    case 4: return [4 /*yield*/, CustomerWallet_1["default"].create(walletData)];
                    case 5:
                        wallet = _a.sent();
                        return [2 /*return*/, wallet];
                }
            });
        });
    };
    CustomerWalletService.prototype.findWalletsByCompany = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var wallets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWallet_1["default"].findAll({
                            where: { companyId: companyId, isActive: true },
                            include: [
                                {
                                    model: CustomerWalletCustomer_1["default"],
                                    as: "walletCustomers",
                                    include: [
                                        {
                                            model: CrmClient_1["default"],
                                            as: "client"
                                        }
                                    ]
                                },
                                {
                                    model: CustomerWalletUser_1["default"],
                                    as: "walletUsers",
                                    include: [
                                        {
                                            model: User_1["default"],
                                            as: "user"
                                        }
                                    ]
                                }
                            ],
                            order: [["name", "ASC"]]
                        })];
                    case 1:
                        wallets = _a.sent();
                        return [2 /*return*/, wallets];
                }
            });
        });
    };
    CustomerWalletService.prototype.findWalletById = function (id, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWallet_1["default"].findOne({
                            where: { id: id, companyId: companyId },
                            include: [
                                {
                                    model: CustomerWalletCustomer_1["default"],
                                    as: "walletCustomers",
                                    include: [
                                        {
                                            model: CrmClient_1["default"],
                                            as: "client"
                                        }
                                    ]
                                },
                                {
                                    model: CustomerWalletUser_1["default"],
                                    as: "walletUsers",
                                    include: [
                                        {
                                            model: User_1["default"],
                                            as: "user"
                                        }
                                    ]
                                }
                            ]
                        })];
                    case 1:
                        wallet = _a.sent();
                        if (!wallet) {
                            throw new AppError_1["default"]("Carteira não encontrada");
                        }
                        return [2 /*return*/, wallet];
                }
            });
        });
    };
    CustomerWalletService.prototype.update = function (id, walletData, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findWalletById(id, companyId)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, wallet.update(walletData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, wallet];
                }
            });
        });
    };
    CustomerWalletService.prototype["delete"] = function (id, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findWalletById(id, companyId)];
                    case 1:
                        wallet = _a.sent();
                        // Soft delete - apenas desativa
                        return [4 /*yield*/, wallet.update({ isActive: false })];
                    case 2:
                        // Soft delete - apenas desativa
                        _a.sent();
                        return [2 /*return*/, { message: "Carteira desativada com sucesso" }];
                }
            });
        });
    };
    // ========== CLIENTES NAS CARTEIRAS ==========
    CustomerWalletService.prototype.addCustomerToWallet = function (walletCustomerData) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, error_2, existing, walletCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            walletId: Yup.number().required().positive().integer(),
                            clientId: Yup.number().required().positive().integer(),
                            companyId: Yup.number().required().positive().integer()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(walletCustomerData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw new AppError_1["default"](error_2.message);
                    case 4: return [4 /*yield*/, CustomerWalletCustomer_1["default"].findOne({
                            where: {
                                walletId: walletCustomerData.walletId,
                                clientId: walletCustomerData.clientId,
                                companyId: walletCustomerData.companyId
                            }
                        })];
                    case 5:
                        existing = _a.sent();
                        if (existing) {
                            throw new AppError_1["default"]("Cliente já está nesta carteira");
                        }
                        return [4 /*yield*/, CustomerWalletCustomer_1["default"].create(walletCustomerData)];
                    case 6:
                        walletCustomer = _a.sent();
                        return [2 /*return*/, walletCustomer];
                }
            });
        });
    };
    CustomerWalletService.prototype.removeCustomerFromWallet = function (walletId, clientId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWalletCustomer_1["default"].findOne({
                            where: { walletId: walletId, clientId: clientId, companyId: companyId }
                        })];
                    case 1:
                        walletCustomer = _a.sent();
                        if (!walletCustomer) {
                            throw new AppError_1["default"]("Cliente não encontrado nesta carteira");
                        }
                        return [4 /*yield*/, walletCustomer.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Cliente removido da carteira com sucesso" }];
                }
            });
        });
    };
    CustomerWalletService.prototype.getWalletCustomers = function (walletId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var customers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWalletCustomer_1["default"].findAll({
                            where: { walletId: walletId, companyId: companyId },
                            include: [
                                {
                                    model: CrmClient_1["default"],
                                    as: "client"
                                }
                            ],
                            order: [[{ model: CrmClient_1["default"], as: "client" }, "name", "ASC"]]
                        })];
                    case 1:
                        customers = _a.sent();
                        return [2 /*return*/, customers];
                }
            });
        });
    };
    // ========== USUÁRIOS NAS CARTEIRAS ==========
    CustomerWalletService.prototype.addUserToWallet = function (walletUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, error_3, existing, walletUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            walletId: Yup.number().required().positive().integer(),
                            userId: Yup.number().required().positive().integer(),
                            companyId: Yup.number().required().positive().integer(),
                            isActive: Yup.boolean().optional()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(walletUserData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        throw new AppError_1["default"](error_3.message);
                    case 4: return [4 /*yield*/, CustomerWalletUser_1["default"].findOne({
                            where: {
                                walletId: walletUserData.walletId,
                                userId: walletUserData.userId,
                                companyId: walletUserData.companyId
                            }
                        })];
                    case 5:
                        existing = _a.sent();
                        if (existing) {
                            throw new AppError_1["default"]("Usuário já está nesta carteira");
                        }
                        return [4 /*yield*/, CustomerWalletUser_1["default"].create(walletUserData)];
                    case 6:
                        walletUser = _a.sent();
                        return [2 /*return*/, walletUser];
                }
            });
        });
    };
    CustomerWalletService.prototype.removeUserFromWallet = function (walletId, userId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWalletUser_1["default"].findOne({
                            where: { walletId: walletId, userId: userId, companyId: companyId }
                        })];
                    case 1:
                        walletUser = _a.sent();
                        if (!walletUser) {
                            throw new AppError_1["default"]("Usuário não encontrado nesta carteira");
                        }
                        return [4 /*yield*/, walletUser.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Usuário removido da carteira com sucesso" }];
                }
            });
        });
    };
    CustomerWalletService.prototype.getWalletUsers = function (walletId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWalletUser_1["default"].findAll({
                            where: { walletId: walletId, companyId: companyId, isActive: true },
                            include: [
                                {
                                    model: User_1["default"],
                                    as: "user"
                                }
                            ],
                            order: [[{ model: User_1["default"], as: "user" }, "name", "ASC"]]
                        })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    // ========== MÉTODOS ÚTEIS ==========
    CustomerWalletService.prototype.getUserWallets = function (userId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWalletUser_1["default"].findAll({
                            where: { userId: userId, companyId: companyId, isActive: true },
                            include: [
                                {
                                    model: CustomerWallet_1["default"],
                                    as: "wallet",
                                    where: { isActive: true },
                                    include: [
                                        {
                                            model: CustomerWalletCustomer_1["default"],
                                            as: "walletCustomers",
                                            include: [
                                                {
                                                    model: CrmClient_1["default"],
                                                    as: "client"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        })];
                    case 1:
                        walletUsers = _a.sent();
                        return [2 /*return*/, walletUsers.map(function (wu) { return wu.wallet; })];
                }
            });
        });
    };
    CustomerWalletService.prototype.getCustomerWallets = function (clientId, companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletCustomers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CustomerWalletCustomer_1["default"].findAll({
                            where: { clientId: clientId, companyId: companyId },
                            include: [
                                {
                                    model: CustomerWallet_1["default"],
                                    as: "wallet",
                                    where: { isActive: true }
                                }
                            ]
                        })];
                    case 1:
                        walletCustomers = _a.sent();
                        return [2 /*return*/, walletCustomers.map(function (wc) { return wc.wallet; })];
                }
            });
        });
    };
    return CustomerWalletService;
}());
exports["default"] = new CustomerWalletService();
