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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.importClients = exports.exportClients = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var ListCrmClientsService_1 = __importDefault(require("../services/CrmClientService/ListCrmClientsService"));
var CreateCrmClientService_1 = __importDefault(require("../services/CrmClientService/CreateCrmClientService"));
var ShowCrmClientService_1 = __importDefault(require("../services/CrmClientService/ShowCrmClientService"));
var UpdateCrmClientService_1 = __importDefault(require("../services/CrmClientService/UpdateCrmClientService"));
var DeleteCrmClientService_1 = __importDefault(require("../services/CrmClientService/DeleteCrmClientService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, userType, _b, searchParam, status, type, ownerUserId, pageNumber, limit, requestingUserId, requestingUserType, filterOwnerUserId, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                userType = req.user.userType;
                _b = req.query, searchParam = _b.searchParam, status = _b.status, type = _b.type, ownerUserId = _b.ownerUserId, pageNumber = _b.pageNumber, limit = _b.limit;
                requestingUserId = Number(userId);
                requestingUserType = userType === null || userType === void 0 ? void 0 : userType.toLowerCase();
                console.log("[CRM-CLIENTS] 🔍 Listando clientes:", {
                    userId: requestingUserId,
                    userType: requestingUserType,
                    companyId: companyId,
                    ownerUserId: ownerUserId
                });
                filterOwnerUserId = undefined;
                if (requestingUserType === "professional" || requestingUserType === "attendant") {
                    // Profissional/Atendente só vê seus clientes
                    filterOwnerUserId = requestingUserId;
                }
                else if (ownerUserId && ownerUserId !== "undefined") {
                    // Admin/Manager pode filtrar por ownerUserId específico se informado
                    filterOwnerUserId = Number(ownerUserId);
                }
                console.log("[CRM-CLIENTS] 📊 Filtros aplicados:", {
                    requestingUserType: requestingUserType,
                    filterOwnerUserId: filterOwnerUserId
                });
                return [4 /*yield*/, (0, ListCrmClientsService_1["default"])({
                        companyId: companyId,
                        searchParam: searchParam,
                        status: status,
                        type: type,
                        ownerUserId: filterOwnerUserId,
                        requestingUserId: requestingUserId,
                        requestingUserType: requestingUserType,
                        pageNumber: pageNumber ? Number(pageNumber) : undefined,
                        limit: limit ? Number(limit) : undefined
                    })];
            case 1:
                result = _c.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, data, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                data = req.body;
                return [4 /*yield*/, (0, CreateCrmClientService_1["default"])(__assign(__assign({}, data), { companyId: companyId, 
                        // **VINCULAR USUÁRIO CRIADOR COMO RESPONSÁVEL**
                        createdByUserId: req.user.id }))];
            case 1:
                client = _a.sent();
                return [2 /*return*/, res.status(201).json(client)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, clientId, clientIdNum, client, clientData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                clientId = req.params.clientId;
                clientIdNum = Number(clientId);
                if (!clientId || isNaN(clientIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, ShowCrmClientService_1["default"])({
                        id: clientIdNum,
                        companyId: companyId
                    })];
            case 1:
                client = _a.sent();
                clientData = client.toJSON();
                if (clientData.owners && Array.isArray(clientData.owners)) {
                    clientData.ownerUserIds = clientData.owners.map(function (owner) { return owner.id; });
                }
                return [2 /*return*/, res.json(clientData)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, clientId, clientData, clientIdNum, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                clientId = req.params.clientId;
                clientData = req.body;
                clientIdNum = Number(clientId);
                if (!clientId || isNaN(clientIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, UpdateCrmClientService_1["default"])(__assign({ id: clientIdNum, companyId: companyId }, clientData))];
            case 1:
                client = _a.sent();
                return [2 /*return*/, res.json(client)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, clientId, clientIdNum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                clientId = req.params.clientId;
                clientIdNum = Number(clientId);
                if (!clientId || isNaN(clientIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, DeleteCrmClientService_1["default"])({
                        id: clientIdNum,
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Cliente deletado com sucesso" })];
        }
    });
}); };
exports.remove = remove;
var exportClients = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, clientIds, clients, CrmClient, User, result, csvHeaders, csvRows, csvContent, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                clientIds = req.body.clientIds;
                console.log("📤 [EXPORT] Iniciando exportação de clientes selecionados");
                console.log("📤 [EXPORT] IDs selecionados:", clientIds);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                clients = void 0;
                if (!(clientIds && clientIds.length > 0)) return [3 /*break*/, 3];
                CrmClient = require("../models/CrmClient")["default"];
                User = require("../models/User")["default"];
                return [4 /*yield*/, CrmClient.findAll({
                        where: {
                            id: clientIds,
                            companyId: companyId
                        },
                        include: [
                            {
                                model: User,
                                as: "owners",
                                attributes: ["id", "name", "email"],
                                through: { attributes: [] }
                            }
                        ],
                        order: [["updatedAt", "DESC"]]
                    })];
            case 2:
                clients = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, ListCrmClientsService_1["default"])({
                    companyId: companyId,
                    pageNumber: 1,
                    limit: 10000
                })];
            case 4:
                result = _a.sent();
                clients = result.clients;
                _a.label = 5;
            case 5:
                console.log("📤 [EXPORT] Clientes encontrados:", clients.length);
                csvHeaders = [
                    'ID',
                    'Nome',
                    'Nome da Empresa',
                    'Tipo',
                    'Documento',
                    'E-mail',
                    'Telefone',
                    'Endereço',
                    'Número',
                    'Bairro',
                    'Cidade',
                    'Estado',
                    'CEP',
                    'Status',
                    'ID do Responsável',
                    'Nome do Responsável',
                    'Data de Cadastro',
                    'Última Atualização',
                    'Notas'
                ];
                csvRows = clients.map(function (client) {
                    var _a;
                    return [
                        client.id || '',
                        "\"".concat((client.name || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.companyName || '').replace(/"/g, '""'), "\""),
                        client.type || '',
                        "\"".concat((client.document || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.email || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.phone || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.address || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.number || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.neighborhood || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.city || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.state || '').replace(/"/g, '""'), "\""),
                        "\"".concat((client.zipCode || '').replace(/"/g, '""'), "\""),
                        '',
                        client.status || '',
                        client.ownerUserId || '',
                        "\"".concat((((_a = client.owner) === null || _a === void 0 ? void 0 : _a.name) || '').replace(/"/g, '""'), "\""),
                        client.createdAt ? new Date(client.createdAt).toISOString().split('T')[0] : '',
                        client.updatedAt ? new Date(client.updatedAt).toISOString().split('T')[0] : '',
                        "\"".concat((client.notes || '').replace(/"/g, '""'), "\"")
                    ];
                });
                csvContent = __spreadArray([csvHeaders.join(',')], csvRows.map(function (row) { return row.join(','); }), true).join('\n');
                console.log("📤 [EXPORT] CSV gerado com sucesso, tamanho:", csvContent.length);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', "attachment; filename=\"clients_export_".concat(new Date().toISOString().split('T')[0], ".csv\""));
                console.log("📤 [EXPORT] Enviando resposta CSV...");
                return [2 /*return*/, res.send(csvContent)];
            case 6:
                err_1 = _a.sent();
                console.error("📤 [EXPORT] Erro ao exportar clientes:", err_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao exportar clientes", details: err_1.message })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.exportClients = exportClients;
var importClients = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, _b, _c, previewOnly, _d, selectedItems, multer, csv_1, fs_1, path, results_1, filePath_1;
    return __generator(this, function (_e) {
        _a = req.user, companyId = _a.companyId, userId = _a.id;
        _b = req.body, _c = _b.previewOnly, previewOnly = _c === void 0 ? false : _c, _d = _b.selectedItems, selectedItems = _d === void 0 ? [] : _d;
        try {
            if (!req.file) {
                return [2 /*return*/, res.status(400).json({ error: "Nenhum arquivo enviado" })];
            }
            multer = require('multer');
            csv_1 = require('csv-parser');
            fs_1 = require('fs');
            path = require('path');
            results_1 = [];
            filePath_1 = req.file.path;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs_1.createReadStream(filePath_1)
                        .pipe(csv_1())
                        .on('data', function (data) {
                        results_1.push(data);
                    })
                        .on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var validatedData, i, row, error, email, phone, type, document_1, clientData, imported, errors, itemsToProcess, _i, itemsToProcess_1, row, clientData, error_1, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 7, , 8]);
                                    // **VALIDAÇÃO E PRÉ-VISUALIZAÇÃO**
                                    if (previewOnly || selectedItems.length > 0) {
                                        validatedData = [];
                                        for (i = 0; i < results_1.length; i++) {
                                            row = results_1[i];
                                            error = null;
                                            try {
                                                // Validações básicas
                                                if (!row['Nome'] && !row['nome']) {
                                                    error = "Nome é obrigatório";
                                                }
                                                else if (!row['E-mail'] && !row['email'] && !row['Telefone'] && !row['telefone']) {
                                                    error = "E-mail ou Telefone é obrigatório";
                                                }
                                                else {
                                                    email = row['E-mail'] || row['email'];
                                                    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                                                        error = "E-mail inválido";
                                                    }
                                                    phone = row['Telefone'] || row['telefone'];
                                                    if (phone && phone.length < 8) {
                                                        error = "Telefone muito curto";
                                                    }
                                                    type = row['Tipo'] || row['tipo'] || 'person';
                                                    if (!['person', 'pf', 'pj'].includes(type.toLowerCase())) {
                                                        error = "Tipo deve ser 'PF' ou 'PJ'";
                                                    }
                                                    document_1 = row['Documento'] || row['documento'];
                                                    if (document_1 && document_1.length < 8) {
                                                        error = "Documento muito curto";
                                                    }
                                                }
                                            }
                                            catch (validationError) {
                                                error = validationError.message;
                                            }
                                            clientData = {
                                                index: i,
                                                name: row['Nome'] || row['nome'] || '',
                                                companyName: row['Nome da Empresa'] || row['nome_empresa'] || '',
                                                type: row['Tipo'] || row['tipo'] || 'person',
                                                document: row['Documento'] || row['documento'] || '',
                                                email: row['E-mail'] || row['email'] || '',
                                                phone: row['Telefone'] || row['telefone'] || '',
                                                address: row['Endereço'] || row['endereco'] || '',
                                                number: row['Número'] || row['numero'] || '',
                                                neighborhood: row['Bairro'] || row['bairro'] || '',
                                                city: row['Cidade'] || row['cidade'] || '',
                                                state: row['Estado'] || row['estado'] || '',
                                                zipCode: row['CEP'] || row['cep'] || '',
                                                status: row['Status'] || row['status'] || 'active',
                                                ownerUserId: row['ID do Responsável'] || row['id_responsavel'] ? parseInt(row['ID do Responsável'] || row['id_responsavel']) : null,
                                                notes: row['Notas'] || row['notas'] || '',
                                                error: error
                                            };
                                            validatedData.push(clientData);
                                        }
                                        // Limpar arquivo temporário
                                        fs_1.unlinkSync(filePath_1);
                                        return [2 /*return*/, resolve(res.json({
                                                preview: true,
                                                data: validatedData,
                                                total: results_1.length,
                                                valid: validatedData.filter(function (item) { return !item.error; }).length,
                                                errors: validatedData.filter(function (item) { return item.error; }).length
                                            }))];
                                    }
                                    imported = 0;
                                    errors = [];
                                    itemsToProcess = selectedItems.length > 0 ?
                                        selectedItems.map(function (index) { return results_1[index]; }) :
                                        results_1;
                                    _i = 0, itemsToProcess_1 = itemsToProcess;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < itemsToProcess_1.length)) return [3 /*break*/, 6];
                                    row = itemsToProcess_1[_i];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    clientData = {
                                        companyId: companyId,
                                        name: row['Nome'] || row['nome'] || '',
                                        companyName: row['Nome da Empresa'] || row['nome_empresa'] || '',
                                        type: row['Tipo'] || row['tipo'] || 'person',
                                        document: row['Documento'] || row['documento'] || '',
                                        email: row['E-mail'] || row['email'] || '',
                                        phone: row['Telefone'] || row['telefone'] || '',
                                        address: row['Endereço'] || row['endereco'] || '',
                                        number: row['Número'] || row['numero'] || '',
                                        neighborhood: row['Bairro'] || row['bairro'] || '',
                                        city: row['Cidade'] || row['cidade'] || '',
                                        state: row['Estado'] || row['estado'] || '',
                                        zipCode: row['CEP'] || row['cep'] || '',
                                        status: row['Status'] || row['status'] || 'active',
                                        ownerUserId: row['ID do Responsável'] || row['id_responsavel'] ? parseInt(row['ID do Responsável'] || row['id_responsavel']) : null,
                                        notes: row['Notas'] || row['notas'] || '',
                                        createdByUserId: Number(userId)
                                    };
                                    return [4 /*yield*/, (0, CreateCrmClientService_1["default"])(clientData)];
                                case 3:
                                    _a.sent();
                                    imported++;
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _a.sent();
                                    console.error("Erro ao importar cliente ".concat(row['Nome'], ":"), error_1);
                                    errors.push({
                                        row: row['Nome'] || 'Desconhecido',
                                        error: error_1.message
                                    });
                                    return [3 /*break*/, 5];
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 6:
                                    // Limpar arquivo temporário
                                    fs_1.unlinkSync(filePath_1);
                                    return [2 /*return*/, resolve(res.json({
                                            message: "Importação concluída",
                                            total: itemsToProcess.length,
                                            imported: imported,
                                            errors: errors.length,
                                            errorDetails: errors
                                        }))];
                                case 7:
                                    error_2 = _a.sent();
                                    fs_1.unlinkSync(filePath_1);
                                    return [2 /*return*/, reject(res.status(500).json({ error: "Erro ao processar arquivo" }))];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('error', function (error) {
                        fs_1.unlinkSync(filePath_1);
                        return reject(res.status(500).json({ error: "Erro ao ler arquivo CSV" }));
                    });
                })];
        }
        catch (err) {
            console.error("Erro ao importar clientes:", err);
            return [2 /*return*/, res.status(500).json({ error: "Erro ao importar clientes" })];
        }
        return [2 /*return*/];
    });
}); };
exports.importClients = importClients;
exports["default"] = {
    index: exports.index,
    store: exports.store,
    show: exports.show,
    update: exports.update,
    "delete": exports.remove,
    exportClients: exports.exportClients,
    importClients: exports.importClients
};
