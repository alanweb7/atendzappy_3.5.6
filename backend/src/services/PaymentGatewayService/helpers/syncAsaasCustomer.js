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
var axios_1 = __importDefault(require("axios"));
var AppError_1 = __importDefault(require("../../../errors/AppError"));
var ASAAS_BASE_URL = "https://api.asaas.com/v3";
var buildCustomerPayload = function (client) {
    if (!client.name && !client.companyName) {
        throw new AppError_1["default"]("Cliente sem nome para cadastro no Asaas.", 400);
    }
    var payload = {
        name: client.name || client.companyName,
        cpfCnpj: client.document || undefined,
        email: client.email || undefined,
        phone: client.phone || undefined,
        mobilePhone: client.phone || undefined,
        address: client.address || undefined,
        addressNumber: client.number || undefined,
        complement: client.complement || undefined,
        province: client.neighborhood || undefined,
        city: client.city || undefined,
        state: client.state || undefined,
        postalCode: client.zipCode || undefined,
        externalReference: String(client.id)
    };
    Object.keys(payload).forEach(function (key) {
        if (payload[key] === undefined || payload[key] === null || payload[key] === "") {
            delete payload[key];
        }
    });
    return payload;
};
var syncAsaasCustomer = function (_a) {
    var client = _a.client, token = _a.token;
    return __awaiter(void 0, void 0, void 0, function () {
        var headers, payload, error_1, response, customerId;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    headers = {
                        "Content-Type": "application/json",
                        access_token: token
                    };
                    payload = buildCustomerPayload(client);
                    if (!client.asaasCustomerId) return [3 /*break*/, 4];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].put("".concat(ASAAS_BASE_URL, "/customers/").concat(client.asaasCustomerId), payload, { headers: headers })];
                case 2:
                    _d.sent();
                    return [2 /*return*/, client.asaasCustomerId];
                case 3:
                    error_1 = _d.sent();
                    if (((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.status) !== 404) {
                        throw error_1;
                    }
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, axios_1["default"].post("".concat(ASAAS_BASE_URL, "/customers"), payload, {
                        headers: headers
                    })];
                case 5:
                    response = _d.sent();
                    customerId = (_c = response.data) === null || _c === void 0 ? void 0 : _c.id;
                    if (!customerId) {
                        throw new AppError_1["default"]("Asaas não retornou o ID do cliente.", 400);
                    }
                    return [4 /*yield*/, client.update({ asaasCustomerId: customerId })];
                case 6:
                    _d.sent();
                    return [2 /*return*/, customerId];
            }
        });
    });
};
exports["default"] = syncAsaasCustomer;
