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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.listUserTasks = exports.removeTaskUser = exports.addTaskUser = exports.removeUser = exports.addUser = exports.removeProduct = exports.addProduct = exports.removeService = exports.addService = exports.removeTask = exports.updateTask = exports.storeTask = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
var ListProjectsService_1 = __importDefault(require("../services/ProjectServices/ListProjectsService"));
var ListUserTasksService_1 = __importDefault(require("../services/ProjectServices/ListUserTasksService"));
var CreateProjectService_1 = __importDefault(require("../services/ProjectServices/CreateProjectService"));
var ShowProjectService_1 = __importDefault(require("../services/ProjectServices/ShowProjectService"));
var UpdateProjectService_1 = __importDefault(require("../services/ProjectServices/UpdateProjectService"));
var DeleteProjectService_1 = __importDefault(require("../services/ProjectServices/DeleteProjectService"));
var CreateProjectTaskService_1 = __importDefault(require("../services/ProjectServices/CreateProjectTaskService"));
var UpdateProjectTaskService_1 = __importDefault(require("../services/ProjectServices/UpdateProjectTaskService"));
var DeleteProjectTaskService_1 = __importDefault(require("../services/ProjectServices/DeleteProjectTaskService"));
var ManageProjectItemsService_1 = require("../services/ProjectServices/ManageProjectItemsService");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, searchParam, status, clientId, pageNumber, limit, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, searchParam = _a.searchParam, status = _a.status, clientId = _a.clientId, pageNumber = _a.pageNumber, limit = _a.limit;
                return [4 /*yield*/, (0, ListProjectsService_1["default"])({
                        companyId: companyId,
                        searchParam: searchParam,
                        status: status,
                        clientId: clientId ? Number(clientId) : undefined,
                        pageNumber: pageNumber ? Number(pageNumber) : undefined,
                        limit: limit ? Number(limit) : undefined
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, userIds, serviceIds, productIds, data, project, _i, userIds_1, userId, err_1, _b, serviceIds_1, item, serviceId, quantity, err_2, _c, productIds_1, item, productId, quantity, err_3, fullProject;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, userIds = _a.userIds, serviceIds = _a.serviceIds, productIds = _a.productIds, data = __rest(_a, ["userIds", "serviceIds", "productIds"]);
                return [4 /*yield*/, (0, CreateProjectService_1["default"])(__assign(__assign({}, data), { companyId: companyId }))];
            case 1:
                project = _d.sent();
                if (!(userIds && Array.isArray(userIds))) return [3 /*break*/, 7];
                _i = 0, userIds_1 = userIds;
                _d.label = 2;
            case 2:
                if (!(_i < userIds_1.length)) return [3 /*break*/, 7];
                userId = userIds_1[_i];
                _d.label = 3;
            case 3:
                _d.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addUserToProject)({
                        companyId: companyId,
                        projectId: project.id,
                        userId: Number(userId)
                    })];
            case 4:
                _d.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _d.sent();
                console.error("Erro ao adicionar usu\u00E1rio ".concat(userId, ":"), err_1);
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                if (!(serviceIds && Array.isArray(serviceIds))) return [3 /*break*/, 13];
                _b = 0, serviceIds_1 = serviceIds;
                _d.label = 8;
            case 8:
                if (!(_b < serviceIds_1.length)) return [3 /*break*/, 13];
                item = serviceIds_1[_b];
                _d.label = 9;
            case 9:
                _d.trys.push([9, 11, , 12]);
                serviceId = typeof item === "object" ? item.serviceId : item;
                quantity = typeof item === "object" ? item.quantity : 1;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addServiceToProject)({
                        companyId: companyId,
                        projectId: project.id,
                        serviceId: Number(serviceId),
                        quantity: quantity
                    })];
            case 10:
                _d.sent();
                return [3 /*break*/, 12];
            case 11:
                err_2 = _d.sent();
                console.error("Erro ao adicionar servi\u00E7o:", err_2);
                return [3 /*break*/, 12];
            case 12:
                _b++;
                return [3 /*break*/, 8];
            case 13:
                if (!(productIds && Array.isArray(productIds))) return [3 /*break*/, 19];
                _c = 0, productIds_1 = productIds;
                _d.label = 14;
            case 14:
                if (!(_c < productIds_1.length)) return [3 /*break*/, 19];
                item = productIds_1[_c];
                _d.label = 15;
            case 15:
                _d.trys.push([15, 17, , 18]);
                productId = typeof item === "object" ? item.productId : item;
                quantity = typeof item === "object" ? item.quantity : 1;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addProductToProject)({
                        companyId: companyId,
                        projectId: project.id,
                        productId: Number(productId),
                        quantity: quantity
                    })];
            case 16:
                _d.sent();
                return [3 /*break*/, 18];
            case 17:
                err_3 = _d.sent();
                console.error("Erro ao adicionar produto:", err_3);
                return [3 /*break*/, 18];
            case 18:
                _c++;
                return [3 /*break*/, 14];
            case 19: return [4 /*yield*/, (0, ShowProjectService_1["default"])({ id: project.id, companyId: companyId })];
            case 20:
                fullProject = _d.sent();
                return [2 /*return*/, res.status(201).json(fullProject)];
        }
    });
}); };
exports.store = store;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                return [4 /*yield*/, (0, ShowProjectService_1["default"])({
                        id: Number(projectId),
                        companyId: companyId
                    })];
            case 1:
                project = _a.sent();
                return [2 /*return*/, res.json(project)];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, _a, userIds, serviceIds, productIds, data, project, currentProject, currentUserIds, _i, currentUserIds_1, userId, err_4, _b, userIds_2, userId, err_5, currentProject, currentServiceIds, newServiceIds, _c, currentServiceIds_1, serviceId, err_6, _d, serviceIds_2, item, serviceId, quantity, err_7, currentProject, currentProductIds, newProductIds, _e, currentProductIds_1, productId, err_8, _f, productIds_2, item, productId, quantity, err_9, fullProject;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                _a = req.body, userIds = _a.userIds, serviceIds = _a.serviceIds, productIds = _a.productIds, data = __rest(_a, ["userIds", "serviceIds", "productIds"]);
                return [4 /*yield*/, (0, UpdateProjectService_1["default"])(__assign({ id: Number(projectId), companyId: companyId }, data))];
            case 1:
                project = _g.sent();
                if (!(userIds !== undefined && Array.isArray(userIds))) return [3 /*break*/, 14];
                return [4 /*yield*/, (0, ShowProjectService_1["default"])({ id: Number(projectId), companyId: companyId })];
            case 2:
                currentProject = _g.sent();
                currentUserIds = (currentProject.users || []).map(function (pu) { var _a; return ((_a = pu.user) === null || _a === void 0 ? void 0 : _a.id) || pu.userId; });
                _i = 0, currentUserIds_1 = currentUserIds;
                _g.label = 3;
            case 3:
                if (!(_i < currentUserIds_1.length)) return [3 /*break*/, 8];
                userId = currentUserIds_1[_i];
                if (!!userIds.includes(userId)) return [3 /*break*/, 7];
                _g.label = 4;
            case 4:
                _g.trys.push([4, 6, , 7]);
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeUserFromProject)(companyId, Number(projectId), Number(userId))];
            case 5:
                _g.sent();
                return [3 /*break*/, 7];
            case 6:
                err_4 = _g.sent();
                console.error("Erro ao remover usu\u00E1rio ".concat(userId, ":"), err_4);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8:
                _b = 0, userIds_2 = userIds;
                _g.label = 9;
            case 9:
                if (!(_b < userIds_2.length)) return [3 /*break*/, 14];
                userId = userIds_2[_b];
                if (!!currentUserIds.includes(userId)) return [3 /*break*/, 13];
                _g.label = 10;
            case 10:
                _g.trys.push([10, 12, , 13]);
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addUserToProject)({
                        companyId: companyId,
                        projectId: Number(projectId),
                        userId: Number(userId)
                    })];
            case 11:
                _g.sent();
                return [3 /*break*/, 13];
            case 12:
                err_5 = _g.sent();
                console.error("Erro ao adicionar usu\u00E1rio ".concat(userId, ":"), err_5);
                return [3 /*break*/, 13];
            case 13:
                _b++;
                return [3 /*break*/, 9];
            case 14:
                if (!(serviceIds !== undefined && Array.isArray(serviceIds))) return [3 /*break*/, 27];
                return [4 /*yield*/, (0, ShowProjectService_1["default"])({ id: Number(projectId), companyId: companyId })];
            case 15:
                currentProject = _g.sent();
                currentServiceIds = (currentProject.services || []).map(function (ps) { var _a; return ((_a = ps.service) === null || _a === void 0 ? void 0 : _a.id) || ps.serviceId; });
                newServiceIds = serviceIds.map(function (item) { return typeof item === "object" ? item.serviceId : item; });
                _c = 0, currentServiceIds_1 = currentServiceIds;
                _g.label = 16;
            case 16:
                if (!(_c < currentServiceIds_1.length)) return [3 /*break*/, 21];
                serviceId = currentServiceIds_1[_c];
                if (!!newServiceIds.includes(serviceId)) return [3 /*break*/, 20];
                _g.label = 17;
            case 17:
                _g.trys.push([17, 19, , 20]);
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeServiceFromProject)(companyId, Number(projectId), Number(serviceId))];
            case 18:
                _g.sent();
                return [3 /*break*/, 20];
            case 19:
                err_6 = _g.sent();
                console.error("Erro ao remover servi\u00E7o ".concat(serviceId, ":"), err_6);
                return [3 /*break*/, 20];
            case 20:
                _c++;
                return [3 /*break*/, 16];
            case 21:
                _d = 0, serviceIds_2 = serviceIds;
                _g.label = 22;
            case 22:
                if (!(_d < serviceIds_2.length)) return [3 /*break*/, 27];
                item = serviceIds_2[_d];
                serviceId = typeof item === "object" ? item.serviceId : item;
                if (!!currentServiceIds.includes(serviceId)) return [3 /*break*/, 26];
                _g.label = 23;
            case 23:
                _g.trys.push([23, 25, , 26]);
                quantity = typeof item === "object" ? item.quantity : 1;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addServiceToProject)({
                        companyId: companyId,
                        projectId: Number(projectId),
                        serviceId: Number(serviceId),
                        quantity: quantity
                    })];
            case 24:
                _g.sent();
                return [3 /*break*/, 26];
            case 25:
                err_7 = _g.sent();
                console.error("Erro ao adicionar servi\u00E7o ".concat(serviceId, ":"), err_7);
                return [3 /*break*/, 26];
            case 26:
                _d++;
                return [3 /*break*/, 22];
            case 27:
                if (!(productIds !== undefined && Array.isArray(productIds))) return [3 /*break*/, 40];
                return [4 /*yield*/, (0, ShowProjectService_1["default"])({ id: Number(projectId), companyId: companyId })];
            case 28:
                currentProject = _g.sent();
                currentProductIds = (currentProject.products || []).map(function (pp) { var _a; return ((_a = pp.product) === null || _a === void 0 ? void 0 : _a.id) || pp.productId; });
                newProductIds = productIds.map(function (item) { return typeof item === "object" ? item.productId : item; });
                _e = 0, currentProductIds_1 = currentProductIds;
                _g.label = 29;
            case 29:
                if (!(_e < currentProductIds_1.length)) return [3 /*break*/, 34];
                productId = currentProductIds_1[_e];
                if (!!newProductIds.includes(productId)) return [3 /*break*/, 33];
                _g.label = 30;
            case 30:
                _g.trys.push([30, 32, , 33]);
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeProductFromProject)(companyId, Number(projectId), Number(productId))];
            case 31:
                _g.sent();
                return [3 /*break*/, 33];
            case 32:
                err_8 = _g.sent();
                console.error("Erro ao remover produto ".concat(productId, ":"), err_8);
                return [3 /*break*/, 33];
            case 33:
                _e++;
                return [3 /*break*/, 29];
            case 34:
                _f = 0, productIds_2 = productIds;
                _g.label = 35;
            case 35:
                if (!(_f < productIds_2.length)) return [3 /*break*/, 40];
                item = productIds_2[_f];
                productId = typeof item === "object" ? item.productId : item;
                if (!!currentProductIds.includes(productId)) return [3 /*break*/, 39];
                _g.label = 36;
            case 36:
                _g.trys.push([36, 38, , 39]);
                quantity = typeof item === "object" ? item.quantity : 1;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addProductToProject)({
                        companyId: companyId,
                        projectId: Number(projectId),
                        productId: Number(productId),
                        quantity: quantity
                    })];
            case 37:
                _g.sent();
                return [3 /*break*/, 39];
            case 38:
                err_9 = _g.sent();
                console.error("Erro ao adicionar produto ".concat(productId, ":"), err_9);
                return [3 /*break*/, 39];
            case 39:
                _f++;
                return [3 /*break*/, 35];
            case 40: return [4 /*yield*/, (0, ShowProjectService_1["default"])({ id: Number(projectId), companyId: companyId })];
            case 41:
                fullProject = _g.sent();
                return [2 /*return*/, res.json(fullProject)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                return [4 /*yield*/, (0, DeleteProjectService_1["default"])({
                        id: Number(projectId),
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
// Tasks
var storeTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, data, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                data = req.body;
                return [4 /*yield*/, (0, CreateProjectTaskService_1["default"])(__assign(__assign({}, data), { projectId: Number(projectId), companyId: companyId }))];
            case 1:
                task = _a.sent();
                return [2 /*return*/, res.status(201).json(task)];
        }
    });
}); };
exports.storeTask = storeTask;
var updateTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, taskId, data, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                taskId = req.params.taskId;
                data = req.body;
                return [4 /*yield*/, (0, UpdateProjectTaskService_1["default"])(__assign({ id: Number(taskId), companyId: companyId }, data))];
            case 1:
                task = _a.sent();
                return [2 /*return*/, res.json(task)];
        }
    });
}); };
exports.updateTask = updateTask;
var removeTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, taskId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                taskId = req.params.taskId;
                return [4 /*yield*/, (0, DeleteProjectTaskService_1["default"])({
                        id: Number(taskId),
                        companyId: companyId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.removeTask = removeTask;
// Services
var addService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, _a, serviceId, quantity, unitPrice, notes, projectService;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                _a = req.body, serviceId = _a.serviceId, quantity = _a.quantity, unitPrice = _a.unitPrice, notes = _a.notes;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addServiceToProject)({
                        companyId: companyId,
                        projectId: Number(projectId),
                        serviceId: Number(serviceId),
                        quantity: quantity,
                        unitPrice: unitPrice,
                        notes: notes
                    })];
            case 1:
                projectService = _b.sent();
                return [2 /*return*/, res.status(201).json(projectService)];
        }
    });
}); };
exports.addService = addService;
var removeService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, projectId, serviceId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.params, projectId = _a.projectId, serviceId = _a.serviceId;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeServiceFromProject)(companyId, Number(projectId), Number(serviceId))];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.removeService = removeService;
// Products
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, _a, productId, quantity, unitPrice, notes, projectProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                _a = req.body, productId = _a.productId, quantity = _a.quantity, unitPrice = _a.unitPrice, notes = _a.notes;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addProductToProject)({
                        companyId: companyId,
                        projectId: Number(projectId),
                        productId: Number(productId),
                        quantity: quantity,
                        unitPrice: unitPrice,
                        notes: notes
                    })];
            case 1:
                projectProduct = _b.sent();
                return [2 /*return*/, res.status(201).json(projectProduct)];
        }
    });
}); };
exports.addProduct = addProduct;
var removeProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, projectId, productId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.params, projectId = _a.projectId, productId = _a.productId;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeProductFromProject)(companyId, Number(projectId), Number(productId))];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.removeProduct = removeProduct;
// Users
var addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, projectId, _a, userId, role, effortAllocation, projectUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                projectId = req.params.projectId;
                _a = req.body, userId = _a.userId, role = _a.role, effortAllocation = _a.effortAllocation;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addUserToProject)({
                        companyId: companyId,
                        projectId: Number(projectId),
                        userId: Number(userId),
                        role: role,
                        effortAllocation: effortAllocation
                    })];
            case 1:
                projectUser = _b.sent();
                return [2 /*return*/, res.status(201).json(projectUser)];
        }
    });
}); };
exports.addUser = addUser;
var removeUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, projectId, userId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.params, projectId = _a.projectId, userId = _a.userId;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeUserFromProject)(companyId, Number(projectId), Number(userId))];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.removeUser = removeUser;
// Task Users
var addTaskUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, taskId, _a, userId, responsibility, taskUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                taskId = req.params.taskId;
                _a = req.body, userId = _a.userId, responsibility = _a.responsibility;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.addUserToTask)({
                        companyId: companyId,
                        taskId: Number(taskId),
                        userId: Number(userId),
                        responsibility: responsibility
                    })];
            case 1:
                taskUser = _b.sent();
                return [2 /*return*/, res.status(201).json(taskUser)];
        }
    });
}); };
exports.addTaskUser = addTaskUser;
var removeTaskUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, taskId, userId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.params, taskId = _a.taskId, userId = _a.userId;
                return [4 /*yield*/, (0, ManageProjectItemsService_1.removeUserFromTask)(companyId, Number(taskId), Number(userId))];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.removeTaskUser = removeTaskUser;
// Listar tarefas do usuário
var listUserTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, userId, _a, status, pageNumber, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                userId = req.params.userId;
                _a = req.query, status = _a.status, pageNumber = _a.pageNumber;
                return [4 /*yield*/, (0, ListUserTasksService_1["default"])({
                        companyId: companyId,
                        userId: Number(userId),
                        status: status,
                        pageNumber: pageNumber ? Number(pageNumber) : 1
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.listUserTasks = listUserTasks;
