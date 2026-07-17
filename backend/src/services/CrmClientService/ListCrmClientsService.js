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
var sequelize_1 = require("sequelize");
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var User_1 = __importDefault(require("../../models/User"));
var ListCrmClientsService = function (_a) {
    var companyId = _a.companyId, searchParam = _a.searchParam, status = _a.status, type = _a.type, ownerUserId = _a.ownerUserId, requestingUserId = _a.requestingUserId, requestingUserType = _a.requestingUserType, _b = _a.pageNumber, pageNumber = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 20 : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var where, include, userCanSeeAllClients, like, offset, _d, rows, count;
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    where = {
                        companyId: companyId
                    };
                    if (status) {
                        where.status = status;
                    }
                    if (type) {
                        where.type = type;
                    }
                    include = [];
                    if (ownerUserId && !isNaN(ownerUserId)) {
                        include.push({
                            model: User_1["default"],
                            as: "owners",
                            attributes: [],
                            through: {
                                where: { userId: ownerUserId },
                                attributes: []
                            },
                            required: true
                        });
                    }
                    // **REGRAS DE VISIBILIDADE PARA CLIENTES**
                    if (!ownerUserId && requestingUserId && requestingUserType) {
                        userCanSeeAllClients = requestingUserType === "admin" || requestingUserType === "administrador" || requestingUserType === "manager" || requestingUserType === "gerente";
                        console.log("[CRM-CLIENTS-SERVICE] 🔐 Verificando permissões:", {
                            requestingUserType: requestingUserType,
                            userCanSeeAllClients: userCanSeeAllClients,
                            ownerUserId: ownerUserId,
                            requestingUserId: requestingUserId
                        });
                        if (userCanSeeAllClients) {
                            console.log("[CRM-CLIENTS-SERVICE] ✅ Admin/Gerente - VENDO TODOS OS CLIENTES SEM FILTRO NECESSÁRIO");
                            // **Admin/Gerente vê TODOS os clientes - sem exceção, sem filtro**
                            // Não aplica nenhum filtro - mostra tudo
                        }
                        else if (requestingUserId && !isNaN(requestingUserId)) {
                            console.log("[CRM-CLIENTS-SERVICE] ⚠️ Aplicando filtro de profissional - apenas clientes vinculados");
                            // **Profissional só pode ver clientes onde é responsável (diretamente ou por relacionamento)**
                            where[sequelize_1.Op.or] = [
                                { ownerUserId: requestingUserId },
                                (_e = {},
                                    _e[sequelize_1.Op.and] = [
                                        // Clientes com owner por relacionamento através da tabela CrmClientOwner
                                        (0, sequelize_1.literal)("EXISTS (\n              SELECT 1 FROM \"crm_client_owners\" \n              WHERE \"crm_client_owners\".\"client_id\" = \"CrmClient\".\"id\" \n              AND \"crm_client_owners\".\"user_id\" = ".concat(requestingUserId, "\n            )"))
                                    ],
                                    _e)
                            ];
                        }
                    }
                    if (searchParam) {
                        like = (_f = {}, _f[sequelize_1.Op.iLike] = "%".concat(searchParam, "%"), _f);
                        where[sequelize_1.Op.or] = [
                            { name: like },
                            { companyName: like },
                            { email: like },
                            { phone: like },
                            { document: like },
                            { city: like }
                        ];
                    }
                    offset = (pageNumber - 1) * limit;
                    return [4 /*yield*/, CrmClient_1["default"].findAndCountAll({
                            where: where,
                            include: include.length > 0 ? include : undefined,
                            order: [["updatedAt", "DESC"]],
                            limit: limit,
                            offset: offset,
                            distinct: true
                        })];
                case 1:
                    _d = _g.sent(), rows = _d.rows, count = _d.count;
                    console.log("[CRM-CLIENTS-SERVICE] 📋 Resultado da consulta:", {
                        totalClientes: count,
                        clientesRetornados: rows.length,
                        hasMore: count > offset + rows.length
                    });
                    return [2 /*return*/, {
                            clients: rows,
                            count: count,
                            hasMore: count > offset + rows.length
                        }];
            }
        });
    });
};
exports["default"] = ListCrmClientsService;
