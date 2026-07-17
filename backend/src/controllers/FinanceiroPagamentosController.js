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
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var CreateFinanceiroPagamentoService_1 = __importDefault(require("../services/FinanceiroPagamentoService/CreateFinanceiroPagamentoService"));
var ListFinanceiroPagamentosService_1 = __importDefault(require("../services/FinanceiroPagamentoService/ListFinanceiroPagamentosService"));
var ShowFinanceiroPagamentoService_1 = __importDefault(require("../services/FinanceiroPagamentoService/ShowFinanceiroPagamentoService"));
var UpdateFinanceiroPagamentoService_1 = __importDefault(require("../services/FinanceiroPagamentoService/UpdateFinanceiroPagamentoService"));
var DeleteFinanceiroPagamentoService_1 = __importDefault(require("../services/FinanceiroPagamentoService/DeleteFinanceiroPagamentoService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, faturaId, metodoPagamento, searchParam, pageNumber, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.query, faturaId = _a.faturaId, metodoPagamento = _a.metodoPagamento, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                return [4 /*yield*/, (0, ListFinanceiroPagamentosService_1["default"])({
                        companyId: Number(companyId),
                        faturaId: faturaId,
                        metodoPagamento: metodoPagamento,
                        searchParam: searchParam,
                        pageNumber: pageNumber
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, pagamento;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, ShowFinanceiroPagamentoService_1["default"])(id, Number(companyId))];
            case 1:
                pagamento = _a.sent();
                return [2 /*return*/, res.json(pagamento)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, pagamento;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, CreateFinanceiroPagamentoService_1["default"])(__assign(__assign({}, req.body), { companyId: Number(companyId) }))];
            case 1:
                pagamento = _a.sent();
                return [2 /*return*/, res.status(201).json(pagamento)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, pagamento;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, UpdateFinanceiroPagamentoService_1["default"])(__assign({ id: id, companyId: Number(companyId) }, req.body))];
            case 1:
                pagamento = _a.sent();
                return [2 /*return*/, res.json(pagamento)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, DeleteFinanceiroPagamentoService_1["default"])(id, Number(companyId))];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
