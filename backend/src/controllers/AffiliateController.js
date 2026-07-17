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
exports.deleteAffiliate = exports.updateAffiliate = exports.processWithdrawal = exports.getWithdrawalStats = exports.listAllWithdrawals = exports.updateCommission = exports.listAllCommissions = exports.getAffiliateStats = exports.requestWithdrawal = exports.getMyWithdrawals = exports.getCommissionStats = exports.getMyCommissions = exports.getMyReferrals = exports.deleteLink = exports.generateLink = exports.getMyLinks = exports.getMyAffiliateInfo = exports.createAffiliate = exports.listAffiliates = exports.getAffiliateById = exports.checkAffiliate = void 0;
var AppError_1 = __importDefault(require("../errors/AppError"));
var AffiliateLink_1 = __importDefault(require("../models/AffiliateLink"));
var AffiliateCommission_1 = __importDefault(require("../models/AffiliateCommission"));
var AffiliateWithdrawal_1 = __importDefault(require("../models/AffiliateWithdrawal"));
var Company_1 = __importDefault(require("../models/Company"));
var FinanceiroFatura_1 = __importDefault(require("../models/FinanceiroFatura"));
var Plan_1 = __importDefault(require("../models/Plan"));
var affiliateUtils_1 = require("../utils/affiliateUtils");
// Lazy loading to avoid circular dependency
var getAffiliateModel = function () { return require("../models/Affiliate")["default"]; };
// Endpoint público para verificar afiliado
var checkAffiliate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, affiliateLink, affiliate, trackingData, today, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.params.code;
                if (!code) {
                    return [2 /*return*/, res.status(400).json({ error: "Código de afiliado não fornecido" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, AffiliateLink_1["default"].findOne({
                        where: { code: code.toUpperCase() }
                    })];
            case 2:
                affiliateLink = _a.sent();
                if (!affiliateLink) {
                    return [2 /*return*/, res.status(404).json({ error: "Link de afiliado não encontrado" })];
                }
                return [4 /*yield*/, affiliateLink.getAffiliate()];
            case 3:
                affiliate = _a.sent();
                if (!affiliate || affiliate.status !== "active") {
                    return [2 /*return*/, res.status(400).json({ error: "Afiliado inativo" })];
                }
                // Registrar clique no link
                return [4 /*yield*/, affiliateLink.increment("clicks")];
            case 4:
                // Registrar clique no link
                _a.sent();
                trackingData = affiliateLink.trackingData || {};
                today = new Date().toISOString().split('T')[0];
                if (!trackingData[today])
                    trackingData[today] = { clicks: 0, signups: 0 };
                trackingData[today].clicks++;
                return [4 /*yield*/, affiliateLink.update({ trackingData: trackingData })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.json({
                        valid: true,
                        affiliateCode: affiliateLink.code,
                        affiliateId: affiliateLink.affiliateId
                    })];
            case 6:
                error_1 = _a.sent();
                console.error("Error checking affiliate:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.checkAffiliate = checkAffiliate;
// Buscar afiliado por ID (super admin)
var getAffiliateById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Affiliate, affiliate, AffiliateLink_2, links, commissions, withdrawals, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findByPk(id, {
                        include: [
                            {
                                model: require("../models/Company")["default"],
                                as: "company"
                            }
                        ]
                    })];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                AffiliateLink_2 = require("../models/AffiliateLink")["default"];
                return [4 /*yield*/, AffiliateLink_2.findAll({
                        where: { affiliateId: id },
                        order: [["createdAt", "DESC"]]
                    })];
            case 2:
                links = _a.sent();
                return [4 /*yield*/, AffiliateCommission_1["default"].findAll({
                        where: { affiliateId: id },
                        order: [["createdAt", "DESC"]]
                    })];
            case 3:
                commissions = _a.sent();
                return [4 /*yield*/, AffiliateWithdrawal_1["default"].findAll({
                        where: { affiliateId: id },
                        order: [["createdAt", "DESC"]]
                    })];
            case 4:
                withdrawals = _a.sent();
                return [2 /*return*/, res.json({
                        affiliate: affiliate,
                        links: links,
                        commissions: commissions,
                        withdrawals: withdrawals
                    })];
            case 5:
                error_2 = _a.sent();
                console.error("Error getting affiliate by id:", error_2);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getAffiliateById = getAffiliateById;
// Listar todos os afiliados (super admin)
var listAffiliates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Affiliate, affiliates, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findAll({
                        include: [
                            {
                                model: require("../models/Company")["default"],
                                as: "company"
                            }
                        ],
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                affiliates = _a.sent();
                return [2 /*return*/, res.json(affiliates)];
            case 2:
                error_3 = _a.sent();
                console.error("Error listing affiliates:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listAffiliates = listAffiliates;
// Criar afiliado (super admin)
var createAffiliate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, _b, commissionRate, _c, minWithdrawAmount, CreateAffiliateService, affiliate, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.body, companyId = _a.companyId, _b = _a.commissionRate, commissionRate = _b === void 0 ? 10.00 : _b, _c = _a.minWithdrawAmount, minWithdrawAmount = _c === void 0 ? 50.00 : _c;
                CreateAffiliateService = require("../services/AffiliateService/CreateAffiliateService")["default"];
                return [4 /*yield*/, CreateAffiliateService({
                        companyId: companyId,
                        commissionRate: commissionRate,
                        minWithdrawAmount: minWithdrawAmount
                    })];
            case 1:
                affiliate = _d.sent();
                return [2 /*return*/, res.status(201).json(affiliate)];
            case 2:
                error_4 = _d.sent();
                console.error("Error creating affiliate:", error_4);
                if (error_4 instanceof AppError_1["default"]) {
                    return [2 /*return*/, res.status(error_4.statusCode).json({ error: error_4.message })];
                }
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createAffiliate = createAffiliate;
// Obter informações do afiliado logado
var getMyAffiliateInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Affiliate, affiliate, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                companyId = req.user.companyId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [2 /*return*/, res.json(affiliate)];
            case 2:
                error_5 = _a.sent();
                console.error("Error getting affiliate info:", error_5);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyAffiliateInfo = getMyAffiliateInfo;
// Obter links do afiliado
var getMyLinks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Affiliate, affiliate, links, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                companyId = req.user.companyId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, AffiliateLink_1["default"].findAll({
                        where: { affiliateId: affiliate.id },
                        order: [["createdAt", "DESC"]]
                    })];
            case 2:
                links = _a.sent();
                return [2 /*return*/, res.json(links)];
            case 3:
                error_6 = _a.sent();
                console.error("Error getting affiliate links:", error_6);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMyLinks = getMyLinks;
// Gerar novo link
var generateLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Affiliate, affiliate, code, url, link, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, (0, affiliateUtils_1.generateAffiliateCode)()];
            case 2:
                code = _a.sent();
                url = "".concat(process.env.FRONTEND_URL, "/cadastro?aff=").concat(code);
                return [4 /*yield*/, AffiliateLink_1["default"].create({
                        affiliateId: affiliate.id,
                        code: code,
                        url: url,
                        clicks: 0,
                        signups: 0,
                        conversions: 0,
                        trackingData: {}
                    })];
            case 3:
                link = _a.sent();
                return [2 /*return*/, res.status(201).json(link)];
            case 4:
                error_7 = _a.sent();
                console.error("Error generating link:", error_7);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.generateLink = generateLink;
// Excluir link de afiliado
var deleteLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, linkId, Affiliate, affiliate, link, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                linkId = req.params.linkId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, AffiliateLink_1["default"].findOne({
                        where: { id: linkId, affiliateId: affiliate.id }
                    })];
            case 2:
                link = _a.sent();
                if (!link) {
                    return [2 /*return*/, res.status(404).json({ error: "Link não encontrado" })];
                }
                return [4 /*yield*/, link.destroy()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
            case 4:
                error_8 = _a.sent();
                console.error("Error deleting link:", error_8);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteLink = deleteLink;
// Obter empresas indicadas pelo afiliado
var getMyReferrals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Affiliate, affiliate_1, referredCompanies, referrals, stats, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate_1 = _a.sent();
                if (!affiliate_1) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, Company_1["default"].findAll({
                        where: { affiliateId: affiliate_1.id },
                        attributes: ["id", "name", "email", "phone", "status", "dueDate", "planId", "createdAt"],
                        include: [{ model: Plan_1["default"], as: "plan", attributes: ["id", "name", "amount"] }],
                        order: [["createdAt", "DESC"]]
                    })];
            case 2:
                referredCompanies = _a.sent();
                return [4 /*yield*/, Promise.all(referredCompanies.map(function (company) { return __awaiter(void 0, void 0, void 0, function () {
                        var companyData, companyStatus, now, dueDate, faturasPagas, faturasAbertas, faturasVencidas, commissions, totalCommission, pendingCommission;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    companyData = company.toJSON();
                                    companyStatus = "teste";
                                    now = new Date();
                                    dueDate = company.dueDate ? new Date(company.dueDate) : null;
                                    return [4 /*yield*/, FinanceiroFatura_1["default"].count({
                                            where: { companyId: company.id, status: "paga" }
                                        })];
                                case 1:
                                    faturasPagas = _a.sent();
                                    return [4 /*yield*/, FinanceiroFatura_1["default"].count({
                                            where: { companyId: company.id, status: "aberta" }
                                        })];
                                case 2:
                                    faturasAbertas = _a.sent();
                                    return [4 /*yield*/, FinanceiroFatura_1["default"].count({
                                            where: { companyId: company.id, status: "vencida" }
                                        })];
                                case 3:
                                    faturasVencidas = _a.sent();
                                    if (faturasPagas > 0) {
                                        companyStatus = "ativa";
                                    }
                                    if (faturasVencidas > 0) {
                                        companyStatus = "inadimplente";
                                    }
                                    if (faturasPagas === 0 && faturasAbertas === 0 && faturasVencidas === 0) {
                                        companyStatus = "teste";
                                    }
                                    if (company.status === false) {
                                        companyStatus = "inativa";
                                    }
                                    return [4 /*yield*/, AffiliateCommission_1["default"].findAll({
                                            where: {
                                                affiliateId: affiliate_1.id,
                                                referredCompanyId: company.id
                                            },
                                            attributes: ["id", "commissionAmount", "status", "createdAt", "faturaId"],
                                            order: [["createdAt", "DESC"]]
                                        })];
                                case 4:
                                    commissions = _a.sent();
                                    totalCommission = commissions.reduce(function (sum, c) { return sum + parseFloat(String(c.commissionAmount || 0)); }, 0);
                                    pendingCommission = commissions
                                        .filter(function (c) { return c.status === "pending"; })
                                        .reduce(function (sum, c) { return sum + parseFloat(String(c.commissionAmount || 0)); }, 0);
                                    return [2 /*return*/, {
                                            id: company.id,
                                            name: companyData.name,
                                            email: companyData.email,
                                            phone: companyData.phone,
                                            plan: companyData.plan,
                                            companyStatus: companyStatus,
                                            faturasPagas: faturasPagas,
                                            faturasAbertas: faturasAbertas,
                                            faturasVencidas: faturasVencidas,
                                            totalCommission: totalCommission,
                                            pendingCommission: pendingCommission,
                                            commissionsCount: commissions.length,
                                            createdAt: companyData.createdAt
                                        }];
                            }
                        });
                    }); }))];
            case 3:
                referrals = _a.sent();
                stats = {
                    totalReferrals: referrals.length,
                    activeReferrals: referrals.filter(function (r) { return r.companyStatus === "ativa"; }).length,
                    trialReferrals: referrals.filter(function (r) { return r.companyStatus === "teste"; }).length,
                    overdueReferrals: referrals.filter(function (r) { return r.companyStatus === "inadimplente"; }).length,
                    inactiveReferrals: referrals.filter(function (r) { return r.companyStatus === "inativa"; }).length,
                    totalCommissions: referrals.reduce(function (sum, r) { return sum + r.totalCommission; }, 0),
                    pendingCommissions: referrals.reduce(function (sum, r) { return sum + r.pendingCommission; }, 0)
                };
                return [2 /*return*/, res.json({ referrals: referrals, stats: stats })];
            case 4:
                error_9 = _a.sent();
                console.error("Error getting referrals:", error_9);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getMyReferrals = getMyReferrals;
// Obter comissões do afiliado
var getMyCommissions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, _b, page, _c, limit, status_1, Affiliate, affiliate, whereClause, commissions, error_10;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                companyId = req.user.companyId;
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 20 : _c, status_1 = _a.status;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _d.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                whereClause = { affiliateId: affiliate.id };
                if (status_1) {
                    whereClause.status = status_1;
                }
                return [4 /*yield*/, AffiliateCommission_1["default"].findAndCountAll({
                        where: whereClause,
                        limit: parseInt(limit),
                        offset: (parseInt(page) - 1) * parseInt(limit),
                        order: [["createdAt", "DESC"]]
                    })];
            case 2:
                commissions = _d.sent();
                return [2 /*return*/, res.json({
                        commissions: commissions.rows,
                        count: commissions.count,
                        hasMore: commissions.count > (parseInt(page) * parseInt(limit))
                    })];
            case 3:
                error_10 = _d.sent();
                console.error("Error getting commissions:", error_10);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMyCommissions = getMyCommissions;
// Obter estatísticas de comissões
var getCommissionStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Affiliate, affiliate, _a, pending_1, approved, paid, cancelled, totalEarned, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _b.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, Promise.all([
                        AffiliateCommission_1["default"].count({ where: { affiliateId: affiliate.id, status: "pending" } }),
                        AffiliateCommission_1["default"].count({ where: { affiliateId: affiliate.id, status: "approved" } }),
                        AffiliateCommission_1["default"].count({ where: { affiliateId: affiliate.id, status: "paid" } }),
                        AffiliateCommission_1["default"].count({ where: { affiliateId: affiliate.id, status: "cancelled" } })
                    ])];
            case 2:
                _a = _b.sent(), pending_1 = _a[0], approved = _a[1], paid = _a[2], cancelled = _a[3];
                return [4 /*yield*/, AffiliateCommission_1["default"].sum("commissionAmount", {
                        where: { affiliateId: affiliate.id, status: ["approved", "paid"] }
                    })];
            case 3:
                totalEarned = (_b.sent()) || 0;
                return [2 /*return*/, res.json({
                        pending: pending_1,
                        approved: approved,
                        paid: paid,
                        cancelled: cancelled,
                        totalEarned: totalEarned,
                        totalWithdrawn: affiliate.totalWithdrawn,
                        availableBalance: totalEarned - affiliate.totalWithdrawn
                    })];
            case 4:
                error_11 = _b.sent();
                console.error("Error getting commission stats:", error_11);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCommissionStats = getCommissionStats;
// Obter saques do afiliado
var getMyWithdrawals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, Affiliate, affiliate, withdrawals, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                companyId = req.user.companyId;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, AffiliateWithdrawal_1["default"].findAll({
                        where: { affiliateId: affiliate.id },
                        order: [["createdAt", "DESC"]]
                    })];
            case 2:
                withdrawals = _a.sent();
                return [2 /*return*/, res.json(withdrawals)];
            case 3:
                error_12 = _a.sent();
                console.error("Error getting withdrawals:", error_12);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMyWithdrawals = getMyWithdrawals;
// Solicitar saque
var requestWithdrawal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, amount, paymentMethod, paymentDetails, Affiliate, affiliate, totalEarned, availableBalance, withdrawal, error_13;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                companyId = req.user.companyId;
                _a = req.body, amount = _a.amount, paymentMethod = _a.paymentMethod, paymentDetails = _a.paymentDetails;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findOne({
                        where: { companyId: companyId }
                    })];
            case 1:
                affiliate = _b.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, AffiliateCommission_1["default"].sum("commissionAmount", {
                        where: { affiliateId: affiliate.id, status: ["approved", "paid"] }
                    })];
            case 2:
                totalEarned = (_b.sent()) || 0;
                availableBalance = totalEarned - affiliate.totalWithdrawn;
                if (amount < affiliate.minWithdrawAmount) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Valor m\u00EDnimo para saque \u00E9 R$ ".concat(affiliate.minWithdrawAmount)
                        })];
                }
                if (amount > availableBalance) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Saldo dispon\u00EDvel \u00E9 R$ ".concat(availableBalance)
                        })];
                }
                return [4 /*yield*/, AffiliateWithdrawal_1["default"].create({
                        affiliateId: affiliate.id,
                        amount: amount,
                        paymentMethod: paymentMethod,
                        paymentDetails: paymentDetails,
                        status: "pending"
                    })];
            case 3:
                withdrawal = _b.sent();
                return [2 /*return*/, res.status(201).json(withdrawal)];
            case 4:
                error_13 = _b.sent();
                console.error("Error requesting withdrawal:", error_13);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.requestWithdrawal = requestWithdrawal;
// Estatísticas gerais de afiliados (super admin)
var getAffiliateStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Affiliate, _a, total, active, inactive, suspended, error_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Promise.all([
                        Affiliate.count(),
                        Affiliate.count({ where: { status: "active" } }),
                        Affiliate.count({ where: { status: "inactive" } }),
                        Affiliate.count({ where: { status: "suspended" } })
                    ])];
            case 1:
                _a = _b.sent(), total = _a[0], active = _a[1], inactive = _a[2], suspended = _a[3];
                return [2 /*return*/, res.json({ total: total, active: active, inactive: inactive, suspended: suspended })];
            case 2:
                error_14 = _b.sent();
                console.error("Error getting affiliate stats:", error_14);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAffiliateStats = getAffiliateStats;
// Listar todas as comissões (super admin)
var listAllCommissions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, status_2, whereClause, commissions, error_15;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 20 : _c, status_2 = _a.status;
                whereClause = {};
                if (status_2) {
                    whereClause.status = status_2;
                }
                return [4 /*yield*/, AffiliateCommission_1["default"].findAndCountAll({
                        where: whereClause,
                        limit: parseInt(limit),
                        offset: (parseInt(page) - 1) * parseInt(limit),
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                commissions = _d.sent();
                return [2 /*return*/, res.json({
                        commissions: commissions.rows,
                        count: commissions.count,
                        hasMore: commissions.count > (parseInt(page) * parseInt(limit))
                    })];
            case 2:
                error_15 = _d.sent();
                console.error("Error listing all commissions:", error_15);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listAllCommissions = listAllCommissions;
// Atualizar comissão (super admin)
var updateCommission = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, status_3, notes, commission, error_16;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, status_3 = _a.status, notes = _a.notes;
                return [4 /*yield*/, AffiliateCommission_1["default"].findByPk(id)];
            case 1:
                commission = _b.sent();
                if (!commission) {
                    return [2 /*return*/, res.status(404).json({ error: "Comissão não encontrada" })];
                }
                return [4 /*yield*/, commission.update(__assign({ status: status_3 || commission.status, notes: notes !== undefined ? notes : commission.notes }, (status_3 === "paid" ? { paidAt: new Date() } : {})))];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json(commission)];
            case 3:
                error_16 = _b.sent();
                console.error("Error updating commission:", error_16);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCommission = updateCommission;
// Listar todos os saques (super admin)
var listAllWithdrawals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, status_4, whereClause, withdrawals, error_17;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 20 : _c, status_4 = _a.status;
                whereClause = {};
                if (status_4) {
                    whereClause.status = status_4;
                }
                return [4 /*yield*/, AffiliateWithdrawal_1["default"].findAndCountAll({
                        where: whereClause,
                        limit: parseInt(limit),
                        offset: (parseInt(page) - 1) * parseInt(limit),
                        order: [["createdAt", "DESC"]]
                    })];
            case 1:
                withdrawals = _d.sent();
                return [2 /*return*/, res.json({
                        withdrawals: withdrawals.rows,
                        count: withdrawals.count,
                        hasMore: withdrawals.count > (parseInt(page) * parseInt(limit))
                    })];
            case 2:
                error_17 = _d.sent();
                console.error("Error listing all withdrawals:", error_17);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listAllWithdrawals = listAllWithdrawals;
// Estatísticas de saques (super admin)
var getWithdrawalStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pending_2, approved, rejected, totalAmount, error_18;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Promise.all([
                        AffiliateWithdrawal_1["default"].count({ where: { status: "pending" } }),
                        AffiliateWithdrawal_1["default"].count({ where: { status: "approved" } }),
                        AffiliateWithdrawal_1["default"].count({ where: { status: "rejected" } })
                    ])];
            case 1:
                _a = _b.sent(), pending_2 = _a[0], approved = _a[1], rejected = _a[2];
                return [4 /*yield*/, AffiliateWithdrawal_1["default"].sum("amount", {
                        where: { status: "approved" }
                    })];
            case 2:
                totalAmount = (_b.sent()) || 0;
                return [2 /*return*/, res.json({ pending: pending_2, approved: approved, rejected: rejected, totalAmount: totalAmount })];
            case 3:
                error_18 = _b.sent();
                console.error("Error getting withdrawal stats:", error_18);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getWithdrawalStats = getWithdrawalStats;
// Processar saque (super admin)
var processWithdrawal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, status_5, notes, withdrawal, updateData, Affiliate, affiliate, error_19;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                id = req.params.id;
                _a = req.body, status_5 = _a.status, notes = _a.notes;
                return [4 /*yield*/, AffiliateWithdrawal_1["default"].findByPk(id)];
            case 1:
                withdrawal = _b.sent();
                if (!withdrawal) {
                    return [2 /*return*/, res.status(404).json({ error: "Saque não encontrado" })];
                }
                updateData = {
                    status: status_5 || withdrawal.status,
                    notes: notes !== undefined ? notes : withdrawal.notes,
                    processedAt: new Date(),
                    processedBy: req.user.id
                };
                if (status_5 === "rejected") {
                    updateData.rejectionReason = notes;
                }
                if (!(status_5 === "approved")) return [3 /*break*/, 4];
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findByPk(withdrawal.affiliateId)];
            case 2:
                affiliate = _b.sent();
                if (!affiliate) return [3 /*break*/, 4];
                return [4 /*yield*/, affiliate.update({
                        totalWithdrawn: parseFloat(affiliate.totalWithdrawn || 0) + parseFloat(withdrawal.amount)
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, withdrawal.update(updateData)];
            case 5:
                _b.sent();
                return [2 /*return*/, res.json(withdrawal)];
            case 6:
                error_19 = _b.sent();
                console.error("Error processing withdrawal:", error_19);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.processWithdrawal = processWithdrawal;
// Atualizar afiliado (super admin)
var updateAffiliate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, commissionRate, minWithdrawAmount, status_6, Affiliate, affiliate, error_20;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, commissionRate = _a.commissionRate, minWithdrawAmount = _a.minWithdrawAmount, status_6 = _a.status;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findByPk(id)];
            case 1:
                affiliate = _b.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, affiliate.update({
                        commissionRate: commissionRate || affiliate.commissionRate,
                        minWithdrawAmount: minWithdrawAmount || affiliate.minWithdrawAmount,
                        status: status_6 || affiliate.status
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json(affiliate)];
            case 3:
                error_20 = _b.sent();
                console.error("Error updating affiliate:", error_20);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAffiliate = updateAffiliate;
// Deletar afiliado (super admin)
var deleteAffiliate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Affiliate, affiliate, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                Affiliate = getAffiliateModel();
                return [4 /*yield*/, Affiliate.findByPk(id)];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) {
                    return [2 /*return*/, res.status(404).json({ error: "Afiliado não encontrado" })];
                }
                return [4 /*yield*/, affiliate.destroy()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
            case 3:
                error_21 = _a.sent();
                console.error("Error deleting affiliate:", error_21);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAffiliate = deleteAffiliate;
