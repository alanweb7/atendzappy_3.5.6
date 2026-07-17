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
exports.listByClient = exports.listByProject = exports.cancel = exports.markAsPaid = exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var FinanceiroFatura_1 = __importDefault(require("../../models/FinanceiroFatura"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var Project_1 = __importDefault(require("../../models/Project"));
var FinanceiroPagamento_1 = __importDefault(require("../../models/FinanceiroPagamento"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var sequelize_1 = require("sequelize");
var uuid_1 = require("uuid");
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var serializeFatura = function (fatura) { return ({
    id: fatura.id,
    descricao: fatura.descricao,
    valor: fatura.valor,
    valorPago: fatura.valorPago,
    status: fatura.status,
    dataVencimento: fatura.dataVencimento,
    dataPagamento: fatura.dataPagamento,
    tipoReferencia: fatura.tipoReferencia,
    referenciaId: fatura.referenciaId,
    tipoRecorrencia: fatura.tipoRecorrencia,
    quantidadeCiclos: fatura.quantidadeCiclos,
    cicloAtual: fatura.cicloAtual,
    dataInicio: fatura.dataInicio,
    dataFim: fatura.dataFim,
    ativa: fatura.ativa,
    observacoes: fatura.observacoes,
    paymentProvider: fatura.paymentProvider,
    paymentLink: fatura.paymentLink,
    paymentExternalId: fatura.paymentExternalId,
    checkoutToken: fatura.checkoutToken,
    clientId: fatura.clientId,
    client: fatura.client ? {
        id: fatura.client.id,
        name: fatura.client.name,
        email: fatura.client.email,
        phone: fatura.client.phone
    } : null,
    projectId: fatura.projectId,
    project: fatura.project ? {
        id: fatura.project.id,
        name: fatura.project.name,
        status: fatura.project.status
    } : null,
    createdAt: fatura.createdAt,
    updatedAt: fatura.updatedAt
}); };
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, searchParam, status, tipoRecorrencia, ativa, clientId, projectId, _b, pageNumber, _c, pageSize, whereCondition, limit, offset, _d, count, rows;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                _a = req.query, searchParam = _a.searchParam, status = _a.status, tipoRecorrencia = _a.tipoRecorrencia, ativa = _a.ativa, clientId = _a.clientId, projectId = _a.projectId, _b = _a.pageNumber, pageNumber = _b === void 0 ? "1" : _b, _c = _a.pageSize, pageSize = _c === void 0 ? "20" : _c;
                whereCondition = { companyId: companyId };
                if (searchParam) {
                    whereCondition[sequelize_1.Op.or] = [
                        { descricao: (_e = {}, _e[sequelize_1.Op.like] = "%".concat(searchParam, "%"), _e) },
                        { observacoes: (_f = {}, _f[sequelize_1.Op.like] = "%".concat(searchParam, "%"), _f) }
                    ];
                }
                if (status) {
                    whereCondition.status = status;
                }
                if (tipoRecorrencia) {
                    whereCondition.tipoRecorrencia = tipoRecorrencia;
                }
                if (ativa !== undefined && ativa !== "") {
                    whereCondition.ativa = ativa === "true";
                }
                if (clientId) {
                    whereCondition.clientId = Number(clientId);
                }
                if (projectId) {
                    whereCondition.projectId = Number(projectId);
                }
                limit = Math.min(Number(pageSize) || 20, 100);
                offset = (Math.max(Number(pageNumber) || 1, 1) - 1) * limit;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findAndCountAll({
                        where: whereCondition,
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ],
                        order: [["dataVencimento", "DESC"]],
                        limit: limit,
                        offset: offset
                    })];
            case 1:
                _d = _g.sent(), count = _d.count, rows = _d.rows;
                return [2 /*return*/, res.json({
                        faturas: rows.map(serializeFatura),
                        count: count,
                        hasMore: offset + rows.length < count
                    })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, fatura;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { id: Number(id), companyId: companyId },
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            },
                            {
                                model: FinanceiroPagamento_1["default"],
                                as: "pagamentos"
                            }
                        ]
                    })];
            case 1:
                fatura = _b.sent();
                if (!fatura) {
                    throw new AppError_1["default"]("ERR_FATURA_NOT_FOUND", 404);
                }
                return [2 /*return*/, res.json(__assign(__assign({}, serializeFatura(fatura)), { pagamentos: ((_a = fatura.pagamentos) === null || _a === void 0 ? void 0 : _a.map(function (p) { return ({
                            id: p.id,
                            valor: p.valor,
                            dataPagamento: p.dataPagamento,
                            metodoPagamento: p.metodoPagamento,
                            observacoes: p.observacoes
                        }); })) || [] }))];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, _a, clientId, projectId, descricao, valor, dataVencimento, tipoReferencia, referenciaId, tipoRecorrencia, quantidadeCiclos, dataInicio, dataFim, observacoes, ativa, client, project, fatura;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                _a = req.body, clientId = _a.clientId, projectId = _a.projectId, descricao = _a.descricao, valor = _a.valor, dataVencimento = _a.dataVencimento, tipoReferencia = _a.tipoReferencia, referenciaId = _a.referenciaId, tipoRecorrencia = _a.tipoRecorrencia, quantidadeCiclos = _a.quantidadeCiclos, dataInicio = _a.dataInicio, dataFim = _a.dataFim, observacoes = _a.observacoes, ativa = _a.ativa;
                if (!clientId) {
                    throw new AppError_1["default"]("ERR_CLIENT_ID_REQUIRED", 400);
                }
                if (!valor) {
                    throw new AppError_1["default"]("ERR_VALOR_REQUIRED", 400);
                }
                if (!dataVencimento) {
                    throw new AppError_1["default"]("ERR_DATA_VENCIMENTO_REQUIRED", 400);
                }
                return [4 /*yield*/, CrmClient_1["default"].findOne({
                        where: { id: clientId, companyId: externalAuth.companyId }
                    })];
            case 1:
                client = _b.sent();
                if (!client) {
                    throw new AppError_1["default"]("ERR_CLIENT_NOT_FOUND", 404);
                }
                if (!projectId) return [3 /*break*/, 3];
                return [4 /*yield*/, Project_1["default"].findOne({
                        where: { id: projectId, companyId: externalAuth.companyId }
                    })];
            case 2:
                project = _b.sent();
                if (!project) {
                    throw new AppError_1["default"]("ERR_PROJECT_NOT_FOUND", 404);
                }
                _b.label = 3;
            case 3: return [4 /*yield*/, FinanceiroFatura_1["default"].create({
                    companyId: externalAuth.companyId,
                    clientId: clientId,
                    projectId: projectId || null,
                    descricao: descricao || "",
                    valor: valor,
                    valorPago: 0,
                    status: "aberta",
                    dataVencimento: dataVencimento,
                    tipoReferencia: tipoReferencia || null,
                    referenciaId: referenciaId || null,
                    tipoRecorrencia: tipoRecorrencia || "unica",
                    quantidadeCiclos: quantidadeCiclos || null,
                    cicloAtual: 1,
                    dataInicio: dataInicio || new Date(),
                    dataFim: dataFim || null,
                    ativa: ativa !== false,
                    observacoes: observacoes || null,
                    checkoutToken: (0, uuid_1.v4)()
                })];
            case 4:
                fatura = _b.sent();
                return [4 /*yield*/, fatura.reload({
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ]
                    })];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "fatura.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            fatura: serializeFatura(fatura)
                        }
                    })];
            case 6:
                _b.sent();
                return [2 /*return*/, res.status(201).json(serializeFatura(fatura))];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, clientId, projectId, descricao, valor, valorPago, status, dataVencimento, dataPagamento, tipoReferencia, referenciaId, tipoRecorrencia, quantidadeCiclos, cicloAtual, dataInicio, dataFim, ativa, observacoes, paymentProvider, paymentLink, paymentExternalId, fatura, client, project, updateData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, clientId = _a.clientId, projectId = _a.projectId, descricao = _a.descricao, valor = _a.valor, valorPago = _a.valorPago, status = _a.status, dataVencimento = _a.dataVencimento, dataPagamento = _a.dataPagamento, tipoReferencia = _a.tipoReferencia, referenciaId = _a.referenciaId, tipoRecorrencia = _a.tipoRecorrencia, quantidadeCiclos = _a.quantidadeCiclos, cicloAtual = _a.cicloAtual, dataInicio = _a.dataInicio, dataFim = _a.dataFim, ativa = _a.ativa, observacoes = _a.observacoes, paymentProvider = _a.paymentProvider, paymentLink = _a.paymentLink, paymentExternalId = _a.paymentExternalId;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                fatura = _b.sent();
                if (!fatura) {
                    throw new AppError_1["default"]("ERR_FATURA_NOT_FOUND", 404);
                }
                if (!(clientId !== undefined && clientId !== fatura.clientId)) return [3 /*break*/, 3];
                return [4 /*yield*/, CrmClient_1["default"].findOne({
                        where: { id: clientId, companyId: externalAuth.companyId }
                    })];
            case 2:
                client = _b.sent();
                if (!client) {
                    throw new AppError_1["default"]("ERR_CLIENT_NOT_FOUND", 404);
                }
                _b.label = 3;
            case 3:
                if (!(projectId !== undefined && projectId !== fatura.projectId)) return [3 /*break*/, 5];
                if (!projectId) return [3 /*break*/, 5];
                return [4 /*yield*/, Project_1["default"].findOne({
                        where: { id: projectId, companyId: externalAuth.companyId }
                    })];
            case 4:
                project = _b.sent();
                if (!project) {
                    throw new AppError_1["default"]("ERR_PROJECT_NOT_FOUND", 404);
                }
                _b.label = 5;
            case 5:
                updateData = {};
                if (clientId !== undefined)
                    updateData.clientId = clientId;
                if (projectId !== undefined)
                    updateData.projectId = projectId;
                if (descricao !== undefined)
                    updateData.descricao = descricao;
                if (valor !== undefined)
                    updateData.valor = valor;
                if (valorPago !== undefined)
                    updateData.valorPago = valorPago;
                if (status !== undefined)
                    updateData.status = status;
                if (dataVencimento !== undefined)
                    updateData.dataVencimento = dataVencimento;
                if (dataPagamento !== undefined)
                    updateData.dataPagamento = dataPagamento;
                if (tipoReferencia !== undefined)
                    updateData.tipoReferencia = tipoReferencia;
                if (referenciaId !== undefined)
                    updateData.referenciaId = referenciaId;
                if (tipoRecorrencia !== undefined)
                    updateData.tipoRecorrencia = tipoRecorrencia;
                if (quantidadeCiclos !== undefined)
                    updateData.quantidadeCiclos = quantidadeCiclos;
                if (cicloAtual !== undefined)
                    updateData.cicloAtual = cicloAtual;
                if (dataInicio !== undefined)
                    updateData.dataInicio = dataInicio;
                if (dataFim !== undefined)
                    updateData.dataFim = dataFim;
                if (ativa !== undefined)
                    updateData.ativa = ativa;
                if (observacoes !== undefined)
                    updateData.observacoes = observacoes;
                if (paymentProvider !== undefined)
                    updateData.paymentProvider = paymentProvider;
                if (paymentLink !== undefined)
                    updateData.paymentLink = paymentLink;
                if (paymentExternalId !== undefined)
                    updateData.paymentExternalId = paymentExternalId;
                return [4 /*yield*/, fatura.update(updateData)];
            case 6:
                _b.sent();
                return [4 /*yield*/, fatura.reload({
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ]
                    })];
            case 7:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "fatura.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            fatura: serializeFatura(fatura)
                        }
                    })];
            case 8:
                _b.sent();
                return [2 /*return*/, res.json(serializeFatura(fatura))];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, fatura;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                fatura = _a.sent();
                if (!fatura) {
                    throw new AppError_1["default"]("ERR_FATURA_NOT_FOUND", 404);
                }
                return [4 /*yield*/, fatura.destroy()];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "fatura.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            faturaId: Number(id)
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Fatura removida com sucesso" })];
        }
    });
}); };
exports.remove = remove;
var markAsPaid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, _a, dataPagamento, valorPago, fatura;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                _a = req.body, dataPagamento = _a.dataPagamento, valorPago = _a.valorPago;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                fatura = _b.sent();
                if (!fatura) {
                    throw new AppError_1["default"]("ERR_FATURA_NOT_FOUND", 404);
                }
                return [4 /*yield*/, fatura.update({
                        status: "paga",
                        dataPagamento: dataPagamento || new Date(),
                        valorPago: valorPago || fatura.valor
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, fatura.reload({
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ]
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "fatura.paid",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            fatura: serializeFatura(fatura)
                        }
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json(serializeFatura(fatura))];
        }
    });
}); };
exports.markAsPaid = markAsPaid;
var cancel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, fatura;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findOne({
                        where: { id: Number(id), companyId: externalAuth.companyId }
                    })];
            case 1:
                fatura = _a.sent();
                if (!fatura) {
                    throw new AppError_1["default"]("ERR_FATURA_NOT_FOUND", 404);
                }
                return [4 /*yield*/, fatura.update({ status: "cancelada" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, fatura.reload({
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ]
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "fatura.cancelled",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            fatura: serializeFatura(fatura)
                        }
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json(serializeFatura(fatura))];
        }
    });
}); };
exports.cancel = cancel;
var listByProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, faturas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                projectId = req.params.projectId;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findAll({
                        where: { companyId: companyId, projectId: Number(projectId) },
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ],
                        order: [["dataVencimento", "DESC"]]
                    })];
            case 1:
                faturas = _a.sent();
                return [2 /*return*/, res.json({
                        faturas: faturas.map(serializeFatura)
                    })];
        }
    });
}); };
exports.listByProject = listByProject;
var listByClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, clientId, faturas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                clientId = req.params.clientId;
                return [4 /*yield*/, FinanceiroFatura_1["default"].findAll({
                        where: { companyId: companyId, clientId: Number(clientId) },
                        include: [
                            {
                                model: CrmClient_1["default"],
                                as: "client",
                                attributes: ["id", "name", "email", "phone"]
                            },
                            {
                                model: Project_1["default"],
                                as: "project",
                                attributes: ["id", "name", "status"]
                            }
                        ],
                        order: [["dataVencimento", "DESC"]]
                    })];
            case 1:
                faturas = _a.sent();
                return [2 /*return*/, res.json({
                        faturas: faturas.map(serializeFatura)
                    })];
        }
    });
}); };
exports.listByClient = listByClient;
