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
exports.removeUserFromTask = exports.addUserToTask = exports.removeUserFromProject = exports.addUserToProject = exports.removeProductFromProject = exports.addProductToProject = exports.removeServiceFromProject = exports.addServiceToProject = void 0;
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Project_1 = __importDefault(require("../../models/Project"));
var ProjectService_1 = __importDefault(require("../../models/ProjectService"));
var ProjectProduct_1 = __importDefault(require("../../models/ProjectProduct"));
var ProjectUser_1 = __importDefault(require("../../models/ProjectUser"));
var ProjectTaskUser_1 = __importDefault(require("../../models/ProjectTaskUser"));
var verifyProject = function (projectId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Project_1["default"].findOne({
                    where: { id: projectId, companyId: companyId }
                })];
            case 1:
                project = _a.sent();
                if (!project) {
                    throw new AppError_1["default"]("ERR_PROJECT_NOT_FOUND", 404);
                }
                return [2 /*return*/, project];
        }
    });
}); };
var addServiceToProject = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectService, created;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, verifyProject(data.projectId, data.companyId)];
            case 1:
                _d.sent();
                return [4 /*yield*/, ProjectService_1["default"].findOrCreate({
                        where: {
                            projectId: data.projectId,
                            serviceId: data.serviceId
                        },
                        defaults: {
                            companyId: data.companyId,
                            projectId: data.projectId,
                            serviceId: data.serviceId,
                            quantity: data.quantity || 1,
                            unitPrice: data.unitPrice,
                            notes: data.notes
                        }
                    })];
            case 2:
                _a = _d.sent(), projectService = _a[0], created = _a[1];
                if (!!created) return [3 /*break*/, 4];
                return [4 /*yield*/, projectService.update({
                        quantity: data.quantity || projectService.quantity,
                        unitPrice: (_b = data.unitPrice) !== null && _b !== void 0 ? _b : projectService.unitPrice,
                        notes: (_c = data.notes) !== null && _c !== void 0 ? _c : projectService.notes
                    })];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4: return [2 /*return*/, projectService];
        }
    });
}); };
exports.addServiceToProject = addServiceToProject;
var removeServiceFromProject = function (companyId, projectId, serviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, verifyProject(projectId, companyId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, ProjectService_1["default"].destroy({
                        where: { projectId: projectId, serviceId: serviceId }
                    })];
            case 2:
                deleted = _a.sent();
                if (!deleted) {
                    throw new AppError_1["default"]("ERR_SERVICE_NOT_IN_PROJECT", 404);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.removeServiceFromProject = removeServiceFromProject;
var addProductToProject = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectProduct, created;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, verifyProject(data.projectId, data.companyId)];
            case 1:
                _d.sent();
                return [4 /*yield*/, ProjectProduct_1["default"].findOrCreate({
                        where: {
                            projectId: data.projectId,
                            productId: data.productId
                        },
                        defaults: {
                            companyId: data.companyId,
                            projectId: data.projectId,
                            productId: data.productId,
                            quantity: data.quantity || 1,
                            unitPrice: data.unitPrice,
                            notes: data.notes
                        }
                    })];
            case 2:
                _a = _d.sent(), projectProduct = _a[0], created = _a[1];
                if (!!created) return [3 /*break*/, 4];
                return [4 /*yield*/, projectProduct.update({
                        quantity: data.quantity || projectProduct.quantity,
                        unitPrice: (_b = data.unitPrice) !== null && _b !== void 0 ? _b : projectProduct.unitPrice,
                        notes: (_c = data.notes) !== null && _c !== void 0 ? _c : projectProduct.notes
                    })];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4: return [2 /*return*/, projectProduct];
        }
    });
}); };
exports.addProductToProject = addProductToProject;
var removeProductFromProject = function (companyId, projectId, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, verifyProject(projectId, companyId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, ProjectProduct_1["default"].destroy({
                        where: { projectId: projectId, productId: productId }
                    })];
            case 2:
                deleted = _a.sent();
                if (!deleted) {
                    throw new AppError_1["default"]("ERR_PRODUCT_NOT_IN_PROJECT", 404);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.removeProductFromProject = removeProductFromProject;
var addUserToProject = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectUser, created;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, verifyProject(data.projectId, data.companyId)];
            case 1:
                _c.sent();
                return [4 /*yield*/, ProjectUser_1["default"].findOrCreate({
                        where: {
                            projectId: data.projectId,
                            userId: data.userId
                        },
                        defaults: {
                            companyId: data.companyId,
                            projectId: data.projectId,
                            userId: data.userId,
                            role: data.role || "participant",
                            effortAllocation: data.effortAllocation
                        }
                    })];
            case 2:
                _a = _c.sent(), projectUser = _a[0], created = _a[1];
                if (!!created) return [3 /*break*/, 4];
                return [4 /*yield*/, projectUser.update({
                        role: data.role || projectUser.role,
                        effortAllocation: (_b = data.effortAllocation) !== null && _b !== void 0 ? _b : projectUser.effortAllocation
                    })];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [2 /*return*/, projectUser];
        }
    });
}); };
exports.addUserToProject = addUserToProject;
var removeUserFromProject = function (companyId, projectId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, verifyProject(projectId, companyId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, ProjectUser_1["default"].destroy({
                        where: { projectId: projectId, userId: userId }
                    })];
            case 2:
                deleted = _a.sent();
                if (!deleted) {
                    throw new AppError_1["default"]("ERR_USER_NOT_IN_PROJECT", 404);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.removeUserFromProject = removeUserFromProject;
var addUserToTask = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, taskUser, created;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ProjectTaskUser_1["default"].findOrCreate({
                    where: {
                        taskId: data.taskId,
                        userId: data.userId
                    },
                    defaults: {
                        companyId: data.companyId,
                        taskId: data.taskId,
                        userId: data.userId,
                        responsibility: data.responsibility
                    }
                })];
            case 1:
                _a = _b.sent(), taskUser = _a[0], created = _a[1];
                if (!(!created && data.responsibility)) return [3 /*break*/, 3];
                return [4 /*yield*/, taskUser.update({ responsibility: data.responsibility })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/, taskUser];
        }
    });
}); };
exports.addUserToTask = addUserToTask;
var removeUserFromTask = function (companyId, taskId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProjectTaskUser_1["default"].destroy({
                    where: { taskId: taskId, userId: userId, companyId: companyId }
                })];
            case 1:
                deleted = _a.sent();
                if (!deleted) {
                    throw new AppError_1["default"]("ERR_USER_NOT_IN_TASK", 404);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.removeUserFromTask = removeUserFromTask;
