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
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var IaWorkflow_1 = __importDefault(require("../models/IaWorkflow"));
var Prompt_1 = __importDefault(require("../models/Prompt"));
var ListIaWorkflowsByPromptService_1 = __importDefault(require("../services/IaWorkflowService/ListIaWorkflowsByPromptService"));
var logger_1 = __importDefault(require("../utils/logger"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, orchestratorPromptId, workflows, workflows, orchestratorIds, orchestratorPrompts_1, groupedWorkflows, workflowList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                orchestratorPromptId = req.query.orchestratorPromptId;
                logger_1["default"].info({
                    message: "[IaWorkflowController] index called",
                    companyId: companyId,
                    orchestratorPromptId: orchestratorPromptId
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!orchestratorPromptId) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ListIaWorkflowsByPromptService_1["default"])({
                        companyId: companyId,
                        orchestratorPromptId: Number(orchestratorPromptId)
                    })];
            case 2:
                workflows = _a.sent();
                return [2 /*return*/, res.json(workflows)];
            case 3: return [4 /*yield*/, IaWorkflow_1["default"].findAll({
                    where: { companyId: companyId },
                    order: [["createdAt", "DESC"]]
                })];
            case 4:
                workflows = _a.sent();
                orchestratorIds = __spreadArray([], new Set(workflows.map(function (w) { return w.orchestratorPromptId; })), true);
                return [4 /*yield*/, Prompt_1["default"].findAll({
                        where: { id: orchestratorIds },
                        attributes: ['id', 'name']
                    })];
            case 5:
                orchestratorPrompts_1 = _a.sent();
                groupedWorkflows = workflows.reduce(function (acc, workflow) {
                    var key = workflow.orchestratorPromptId;
                    if (!acc[key]) {
                        var orchestratorPrompt = orchestratorPrompts_1.find(function (p) { return p.id === workflow.orchestratorPromptId; });
                        acc[key] = {
                            id: workflow.orchestratorPromptId,
                            orchestratorPromptId: workflow.orchestratorPromptId,
                            name: orchestratorPrompt ? "Workflow - ".concat(orchestratorPrompt.name) : "Workflow - Orquestrador ".concat(workflow.orchestratorPromptId),
                            description: "Workflow multi-agente com IA orquestradora",
                            agents: [],
                            createdAt: workflow.createdAt,
                            updatedAt: workflow.updatedAt
                        };
                    }
                    acc[key].agents.push({
                        id: workflow.id,
                        agentPromptId: workflow.agentPromptId,
                        alias: workflow.alias,
                        createdAt: workflow.createdAt,
                        updatedAt: workflow.updatedAt
                    });
                    return acc;
                }, {});
                workflowList = Object.values(groupedWorkflows).map(function (group) { return (__assign(__assign({}, group), { connections: group.agents, agentCount: group.agents.length })); });
                logger_1["default"].info({
                    message: "[IaWorkflowController] index returning grouped workflows",
                    companyId: companyId,
                    count: workflowList.length
                });
                return [2 /*return*/, res.json(workflowList)];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                logger_1["default"].error({
                    message: "[IaWorkflowController] Error listing workflows",
                    error: error_1,
                    companyId: companyId,
                    orchestratorPromptId: orchestratorPromptId
                });
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, workflows, orchestratorPrompt, workflowData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                logger_1["default"].info({
                    message: "[IaWorkflowController] show called",
                    companyId: companyId,
                    orchestratorPromptId: id
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, IaWorkflow_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            orchestratorPromptId: id
                        }
                    })];
            case 2:
                workflows = _a.sent();
                if (workflows.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "Workflow não encontrado" })];
                }
                return [4 /*yield*/, Prompt_1["default"].findByPk(id, {
                        attributes: ['id', 'name']
                    })];
            case 3:
                orchestratorPrompt = _a.sent();
                workflowData = {
                    name: orchestratorPrompt ? "Workflow - ".concat(orchestratorPrompt.name) : "Workflow - Orquestrador ".concat(id),
                    description: "Workflow multi-agente com ".concat(workflows.length, " IA").concat(workflows.length > 1 ? 's' : '', " especializada").concat(workflows.length > 1 ? 's' : ''),
                    orchestratorPromptId: Number(id),
                    agents: workflows.map(function (w) { return ({
                        id: w.id,
                        agentPromptId: w.agentPromptId,
                        alias: w.alias
                    }); })
                };
                logger_1["default"].info({
                    message: "[IaWorkflowController] show returning workflow",
                    companyId: companyId,
                    orchestratorPromptId: id,
                    agents: workflowData.agents.length
                });
                return [2 /*return*/, res.json(workflowData)];
            case 4:
                error_2 = _a.sent();
                logger_1["default"].error({
                    message: "[IaWorkflowController] Error showing workflow",
                    error: error_2,
                    companyId: companyId,
                    orchestratorPromptId: id
                });
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, workflowData, orchestratorPromptId, agents, createdWorkflows, _i, agents_1, agent, workflow, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                workflowData = req.body;
                logger_1["default"].info({
                    message: "[IaWorkflowController] store called",
                    companyId: companyId,
                    workflowData: workflowData
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                orchestratorPromptId = workflowData.orchestratorPromptId, agents = workflowData.agents;
                if (!orchestratorPromptId || !agents || agents.length === 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: "orchestratorPromptId e agents são obrigatórios"
                        })];
                }
                // Remover workflows existentes do orquestrador
                return [4 /*yield*/, IaWorkflow_1["default"].destroy({
                        where: {
                            companyId: companyId,
                            orchestratorPromptId: orchestratorPromptId
                        }
                    })];
            case 2:
                // Remover workflows existentes do orquestrador
                _a.sent();
                createdWorkflows = [];
                _i = 0, agents_1 = agents;
                _a.label = 3;
            case 3:
                if (!(_i < agents_1.length)) return [3 /*break*/, 6];
                agent = agents_1[_i];
                return [4 /*yield*/, IaWorkflow_1["default"].create({
                        companyId: companyId,
                        orchestratorPromptId: orchestratorPromptId,
                        agentPromptId: agent.agentPromptId,
                        alias: agent.alias
                    })];
            case 4:
                workflow = _a.sent();
                createdWorkflows.push(workflow);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                logger_1["default"].info({
                    message: "[IaWorkflowController] Workflow created",
                    companyId: companyId,
                    orchestratorPromptId: orchestratorPromptId,
                    agentsCreated: createdWorkflows.length
                });
                return [2 /*return*/, res.status(201).json({
                        message: "Workflow criado com sucesso",
                        workflows: createdWorkflows
                    })];
            case 7:
                error_3 = _a.sent();
                logger_1["default"].error({
                    message: "[IaWorkflowController] Error creating workflow",
                    error: error_3,
                    companyId: companyId,
                    workflowData: workflowData
                });
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, workflowData, agents, updatedWorkflows, _i, agents_2, agent, workflow, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                workflowData = req.body;
                logger_1["default"].info({
                    message: "[IaWorkflowController] update called",
                    companyId: companyId,
                    orchestratorPromptId: id,
                    workflowData: workflowData
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                agents = workflowData.agents;
                if (!agents || agents.length === 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: "agents é obrigatório"
                        })];
                }
                // Remover workflows existentes do orquestrador
                return [4 /*yield*/, IaWorkflow_1["default"].destroy({
                        where: {
                            companyId: companyId,
                            orchestratorPromptId: id
                        }
                    })];
            case 2:
                // Remover workflows existentes do orquestrador
                _a.sent();
                updatedWorkflows = [];
                _i = 0, agents_2 = agents;
                _a.label = 3;
            case 3:
                if (!(_i < agents_2.length)) return [3 /*break*/, 6];
                agent = agents_2[_i];
                return [4 /*yield*/, IaWorkflow_1["default"].create({
                        companyId: companyId,
                        orchestratorPromptId: Number(id),
                        agentPromptId: agent.agentPromptId,
                        alias: agent.alias
                    })];
            case 4:
                workflow = _a.sent();
                updatedWorkflows.push(workflow);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                logger_1["default"].info({
                    message: "[IaWorkflowController] Workflow updated",
                    companyId: companyId,
                    orchestratorPromptId: id,
                    agentsUpdated: updatedWorkflows.length
                });
                return [2 /*return*/, res.json({
                        message: "Workflow atualizado com sucesso",
                        workflows: updatedWorkflows
                    })];
            case 7:
                error_4 = _a.sent();
                logger_1["default"].error({
                    message: "[IaWorkflowController] Error updating workflow",
                    error: error_4,
                    companyId: companyId,
                    orchestratorPromptId: id,
                    workflowData: workflowData
                });
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, deletedCount, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                logger_1["default"].info({
                    message: "[IaWorkflowController] remove called",
                    companyId: companyId,
                    orchestratorPromptId: id
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, IaWorkflow_1["default"].destroy({
                        where: {
                            companyId: companyId,
                            orchestratorPromptId: id
                        }
                    })];
            case 2:
                deletedCount = _a.sent();
                if (deletedCount === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "Workflow não encontrado" })];
                }
                logger_1["default"].info({
                    message: "[IaWorkflowController] Workflow removed",
                    companyId: companyId,
                    orchestratorPromptId: id,
                    deletedCount: deletedCount
                });
                return [2 /*return*/, res.json({ message: "Workflow removido com sucesso" })];
            case 3:
                error_5 = _a.sent();
                logger_1["default"].error({
                    message: "[IaWorkflowController] Error removing workflow",
                    error: error_5,
                    companyId: companyId,
                    orchestratorPromptId: id
                });
                return [2 /*return*/, res.status(500).json({ error: "Erro interno do servidor" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
