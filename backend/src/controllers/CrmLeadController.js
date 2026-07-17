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
exports.importLeads = exports.exportLeads = exports.remove = exports.convert = exports.update = exports.show = exports.store = exports.index = void 0;
var CreateCrmLeadService_1 = __importDefault(require("../services/CrmLeadService/CreateCrmLeadService"));
var ListCrmLeadsService_1 = __importDefault(require("../services/CrmLeadService/ListCrmLeadsService"));
var ShowCrmLeadService_1 = __importDefault(require("../services/CrmLeadService/ShowCrmLeadService"));
var UpdateCrmLeadService_1 = __importDefault(require("../services/CrmLeadService/UpdateCrmLeadService"));
var DeleteCrmLeadService_1 = __importDefault(require("../services/CrmLeadService/DeleteCrmLeadService"));
var ConvertCrmLeadService_1 = __importDefault(require("../services/CrmLeadService/ConvertCrmLeadService"));
var CrmLead_1 = __importDefault(require("../models/CrmLead"));
var User_1 = __importDefault(require("../models/User"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, userType, _b, searchParam, status, ownerUserId, pageNumber, limit, requestingUserId, requestingUserType, isProfessional, filterOwnerUserId, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id;
                userType = req.user.userType;
                _b = req.query, searchParam = _b.searchParam, status = _b.status, ownerUserId = _b.ownerUserId, pageNumber = _b.pageNumber, limit = _b.limit;
                requestingUserId = Number(userId);
                requestingUserType = userType === null || userType === void 0 ? void 0 : userType.toLowerCase();
                isProfessional = requestingUserType === "professional" || requestingUserType === "attendant";
                filterOwnerUserId = isProfessional ? requestingUserId : (ownerUserId && ownerUserId !== "undefined" ? Number(ownerUserId) : undefined);
                return [4 /*yield*/, (0, ListCrmLeadsService_1["default"])({
                        companyId: companyId,
                        searchParam: searchParam,
                        status: status,
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
    var companyId, data, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, source, campaign, medium, utmParams, lead;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                data = req.body;
                utmSource = req.query.utm_source;
                utmMedium = req.query.utm_medium;
                utmCampaign = req.query.utm_campaign;
                utmTerm = req.query.utm_term;
                utmContent = req.query.utm_content;
                source = data.source;
                campaign = data.campaign;
                medium = data.medium;
                // **Apenas usa UTM se não tiver dados do frontend**
                if (!source && !campaign && (utmSource || utmMedium || utmCampaign)) {
                    utmParams = [];
                    if (utmSource)
                        utmParams.push("source: ".concat(utmSource));
                    if (utmMedium)
                        utmParams.push("medium: ".concat(utmMedium));
                    if (utmCampaign)
                        utmParams.push("campaign: ".concat(utmCampaign));
                    if (utmTerm)
                        utmParams.push("term: ".concat(utmTerm));
                    if (utmContent)
                        utmParams.push("content: ".concat(utmContent));
                    source = "UTM: ".concat(utmParams.join(' | '));
                    campaign = utmCampaign || campaign;
                    medium = utmMedium || medium;
                }
                return [4 /*yield*/, (0, CreateCrmLeadService_1["default"])(__assign(__assign({}, data), { source: source, campaign: campaign, medium: medium, companyId: companyId, 
                        // **VINCULAR USUÁRIO CRIADOR COMO RESPONSÁVEL**
                        createdByUserId: req.user.id }))];
            case 1:
                lead = _a.sent();
                return [2 /*return*/, res.status(201).json(lead)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, leadId, leadIdNum, lead;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                leadId = req.params.leadId;
                leadIdNum = Number(leadId);
                if (!leadId || isNaN(leadIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, ShowCrmLeadService_1["default"])({
                        id: leadIdNum,
                        companyId: companyId
                    })];
            case 1:
                lead = _a.sent();
                return [2 /*return*/, res.json(lead)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, leadId, data, leadIdNum, lead;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                leadId = req.params.leadId;
                data = req.body;
                leadIdNum = Number(leadId);
                if (!leadId || isNaN(leadIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, UpdateCrmLeadService_1["default"])(__assign({ id: leadIdNum, companyId: companyId }, data))];
            case 1:
                lead = _a.sent();
                return [2 /*return*/, res.json(lead)];
        }
    });
}); };
exports.update = update;
var convert = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, leadId, _a, contactId, phone, primaryTicketId, leadIdNum, _b, lead, client;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                companyId = req.user.companyId;
                leadId = req.params.leadId;
                _a = req.body, contactId = _a.contactId, phone = _a.phone, primaryTicketId = _a.primaryTicketId;
                leadIdNum = Number(leadId);
                if (!leadId || isNaN(leadIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, ConvertCrmLeadService_1["default"])({
                        leadId: leadIdNum,
                        companyId: companyId,
                        contactId: contactId,
                        phone: phone,
                        primaryTicketId: primaryTicketId
                    })];
            case 1:
                _b = _c.sent(), lead = _b.lead, client = _b.client;
                return [2 /*return*/, res.json({ lead: lead, client: client })];
        }
    });
}); };
exports.convert = convert;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, leadId, leadIdNum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                leadId = req.params.leadId;
                leadIdNum = Number(leadId);
                if (!leadId || isNaN(leadIdNum)) {
                    return [2 /*return*/, res.status(400).json({ error: "ID inválido" })];
                }
                return [4 /*yield*/, (0, DeleteCrmLeadService_1["default"])({
                        id: leadIdNum,
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Lead deletado com sucesso" })];
        }
    });
}); };
exports.remove = remove;
var exportLeads = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, searchParam, status, leadIds, leads, parsedIds, result, csvHeaders, csvRows, csvContent, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, searchParam = _a.searchParam, status = _a.status;
                leadIds = (req.body || {}).leadIds;
                console.log("📤 [EXPORT] Iniciando exportação de leads");
                console.log("📤 [EXPORT] Dados recebidos:", { companyId: companyId, searchParam: searchParam, status: status, leadIds: leadIds });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                leads = void 0;
                if (!(Array.isArray(leadIds) && leadIds.length > 0)) return [3 /*break*/, 3];
                parsedIds = leadIds
                    .map(function (id) { return Number(id); })
                    .filter(function (id) { return !isNaN(id); });
                console.log("📤 [EXPORT] Exportando leads selecionados:", parsedIds.length);
                return [4 /*yield*/, CrmLead_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            id: parsedIds
                        },
                        include: [
                            {
                                model: User_1["default"],
                                as: "owner",
                                attributes: ["id", "name"]
                            }
                        ],
                        order: [["updatedAt", "DESC"]]
                    })];
            case 2:
                leads = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, ListCrmLeadsService_1["default"])({
                    companyId: companyId,
                    searchParam: searchParam,
                    status: status,
                    pageNumber: 1,
                    limit: 10000
                })];
            case 4:
                result = _b.sent();
                leads = result.leads;
                _b.label = 5;
            case 5:
                console.log("📤 [EXPORT] Leads encontrados:", leads.length);
                csvHeaders = [
                    'ID',
                    'Nome',
                    'E-mail',
                    'Telefone',
                    'Empresa',
                    'Documento',
                    'Data de Nascimento',
                    'Status',
                    'Score',
                    'Temperatura',
                    'Fonte',
                    'Campanha',
                    'Meio',
                    'ID do Responsável',
                    'Nome do Responsável',
                    'Data de Criação',
                    'Última Atividade',
                    'Notas'
                ];
                csvRows = leads.map(function (lead) {
                    var _a;
                    return [
                        lead.id || '',
                        "\"".concat((lead.name || '').replace(/"/g, '""'), "\""),
                        "\"".concat((lead.email || '').replace(/"/g, '""'), "\""),
                        "\"".concat((lead.phone || '').replace(/"/g, '""'), "\""),
                        "\"".concat((lead.companyName || '').replace(/"/g, '""'), "\""),
                        "\"".concat((lead.document || '').replace(/"/g, '""'), "\""),
                        lead.birthDate ? new Date(lead.birthDate).toISOString().split('T')[0] : '',
                        lead.status || '',
                        lead.score || 0,
                        lead.temperature || '',
                        "\"".concat((lead.source || '').replace(/"/g, '""'), "\""),
                        "\"".concat((lead.campaign || '').replace(/"/g, '""'), "\""),
                        "\"".concat((lead.medium || '').replace(/"/g, '""'), "\""),
                        lead.ownerUserId || '',
                        "\"".concat((((_a = lead.owner) === null || _a === void 0 ? void 0 : _a.name) || '').replace(/"/g, '""'), "\""),
                        lead.createdAt ? new Date(lead.createdAt).toISOString().split('T')[0] : '',
                        lead.lastActivityAt ? new Date(lead.lastActivityAt).toISOString().split('T')[0] : '',
                        "\"".concat((lead.notes || '').replace(/"/g, '""'), "\"")
                    ];
                });
                csvContent = __spreadArray([csvHeaders.join(',')], csvRows.map(function (row) { return row.join(','); }), true).join('\n');
                console.log("📤 [EXPORT] CSV gerado com sucesso, tamanho:", csvContent.length);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', "attachment; filename=\"leads_export_".concat(new Date().toISOString().split('T')[0], ".csv\""));
                console.log("📤 [EXPORT] Enviando resposta CSV...");
                return [2 /*return*/, res.send(csvContent)];
            case 6:
                err_1 = _b.sent();
                console.error("📤 [EXPORT] Erro ao exportar leads:", err_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao exportar leads", details: err_1.message })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.exportLeads = exportLeads;
var importLeads = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                        var validatedData, i, row, error, email, phone, leadData, imported, errors, itemsToProcess, _i, itemsToProcess_1, row, leadData, error_1, error_2;
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
                                                }
                                            }
                                            catch (validationError) {
                                                error = validationError.message;
                                            }
                                            leadData = {
                                                index: i,
                                                name: row['Nome'] || row['nome'] || '',
                                                email: row['E-mail'] || row['email'] || '',
                                                phone: row['Telefone'] || row['telefone'] || '',
                                                companyName: row['Empresa'] || row['empresa'] || '',
                                                document: row['Documento'] || row['documento'] || '',
                                                birthDate: row['Data de Nascimento'] || row['data_nascimento'] ? new Date(row['Data de Nascimento'] || row['data_nascimento']) : undefined,
                                                status: row['Status'] || row['status'] || 'new',
                                                score: row['Score'] || row['score'] ? parseInt(row['Score'] || row['score']) : 0,
                                                temperature: row['Temperatura'] || row['temperatura'] || '',
                                                source: row['Fonte'] || row['fonte'] || '',
                                                campaign: row['Campanha'] || row['campanha'] || '',
                                                medium: row['Meio'] || row['meio'] || '',
                                                ownerUserId: row['ID do Responsável'] || row['id_responsavel'] ? parseInt(row['ID do Responsável'] || row['id_responsavel']) : null,
                                                notes: row['Notas'] || row['notas'] || '',
                                                error: error
                                            };
                                            validatedData.push(leadData);
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
                                    leadData = {
                                        companyId: companyId,
                                        name: row['Nome'] || row['nome'] || '',
                                        email: row['E-mail'] || row['email'] || '',
                                        phone: row['Telefone'] || row['telefone'] || '',
                                        companyName: row['Empresa'] || row['empresa'] || '',
                                        document: row['Documento'] || row['documento'] || '',
                                        birthDate: row['Data de Nascimento'] || row['data_nascimento'] ? new Date(row['Data de Nascimento'] || row['data_nascimento']) : undefined,
                                        status: row['Status'] || row['status'] || 'new',
                                        score: row['Score'] || row['score'] ? parseInt(row['Score'] || row['score']) : 0,
                                        temperature: row['Temperatura'] || row['temperatura'] || '',
                                        source: row['Fonte'] || row['fonte'] || '',
                                        campaign: row['Campanha'] || row['campanha'] || '',
                                        medium: row['Meio'] || row['meio'] || '',
                                        ownerUserId: row['ID do Responsável'] || row['id_responsavel'] ? parseInt(row['ID do Responsável'] || row['id_responsavel']) : null,
                                        notes: row['Notas'] || row['notas'] || '',
                                        createdByUserId: Number(userId)
                                    };
                                    return [4 /*yield*/, (0, CreateCrmLeadService_1["default"])(leadData)];
                                case 3:
                                    _a.sent();
                                    imported++;
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _a.sent();
                                    console.error("Erro ao importar lead ".concat(row['Nome'], ":"), error_1);
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
            console.error("Erro ao importar leads:", err);
            return [2 /*return*/, res.status(500).json({ error: "Erro ao importar leads" })];
        }
        return [2 /*return*/];
    });
}); };
exports.importLeads = importLeads;
exports["default"] = {
    index: exports.index,
    store: exports.store,
    show: exports.show,
    update: exports.update,
    "delete": exports.remove,
    convert: exports.convert,
    exportLeads: exports.exportLeads,
    importLeads: exports.importLeads
};
