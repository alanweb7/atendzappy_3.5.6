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
exports.cancelGatewayPayment = exports.cancelMercadoPagoPreference = exports.cancelAsaasPayment = exports.receiveAsaasPayment = exports.updateAsaasPayment = exports.generatePaymentLink = exports.getAsaasSecondCopyByCpf = exports.getCompanyPaymentToken = void 0;
var axios_1 = __importDefault(require("axios"));
var uuid_1 = require("uuid");
var CompanyPaymentSetting_1 = __importDefault(require("../../models/CompanyPaymentSetting"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var syncAsaasCustomer_1 = __importDefault(require("./helpers/syncAsaasCustomer"));
var mercadopago = require("mercadopago");
var ASAAS_BASE_URL = "https://api.asaas.com/v3";
var getCompanyPaymentToken = function (companyId, provider) { return __awaiter(void 0, void 0, void 0, function () {
    var setting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CompanyPaymentSetting_1["default"].findOne({
                    where: { companyId: companyId, provider: provider, active: true }
                })];
            case 1:
                setting = _a.sent();
                if (!setting) {
                    throw new AppError_1["default"]("Token para ".concat(provider, " n\u00E3o configurado."), 400);
                }
                return [2 /*return*/, setting];
        }
    });
}); };
exports.getCompanyPaymentToken = getCompanyPaymentToken;
var generateMercadoPagoLink = function (invoice, token) { return __awaiter(void 0, void 0, void 0, function () {
    var baseNotificationUrl, notificationUrl, preference, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mercadopago.configure({
                    access_token: token
                });
                baseNotificationUrl = process.env.MP_NOTIFICATION_URL;
                notificationUrl = baseNotificationUrl && invoice.companyId
                    ? "".concat(baseNotificationUrl, "?companyId=").concat(invoice.companyId, "&invoiceId=").concat(invoice.id)
                    : baseNotificationUrl;
                preference = {
                    external_reference: String(invoice.id),
                    notification_url: notificationUrl,
                    items: [
                        {
                            title: invoice.descricao || "Fatura #".concat(invoice.id),
                            unit_price: Number(invoice.valor),
                            quantity: 1
                        }
                    ]
                };
                return [4 /*yield*/, mercadopago.preferences.create(preference)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, {
                        paymentLink: response.body.init_point,
                        paymentExternalId: response.body.id || null
                    }];
        }
    });
}); };
var sanitizePayload = function (payload) {
    var sanitized = __assign({}, payload);
    Object.keys(sanitized).forEach(function (key) {
        if (sanitized[key] === undefined ||
            sanitized[key] === null ||
            sanitized[key] === "") {
            delete sanitized[key];
        }
    });
    return sanitized;
};
var extractAsaasErrorMessage = function (error) {
    var _a, _b;
    var responseData = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
    if ((_b = responseData === null || responseData === void 0 ? void 0 : responseData.errors) === null || _b === void 0 ? void 0 : _b.length) {
        return responseData.errors
            .map(function (err) { return (err === null || err === void 0 ? void 0 : err.description) || (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.code); })
            .filter(Boolean)
            .join("; ");
    }
    return ((responseData === null || responseData === void 0 ? void 0 : responseData.message) ||
        (responseData === null || responseData === void 0 ? void 0 : responseData.error) ||
        (error === null || error === void 0 ? void 0 : error.message) ||
        "Erro desconhecido na Asaas");
};
var generateAsaasPayment = function (invoice, token, customerId) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, response, paymentLink, error_1, status_1, message;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                payload = sanitizePayload({
                    customer: customerId,
                    name: invoice.descricao || "Fatura #".concat(invoice.id),
                    description: invoice.descricao || "Fatura #".concat(invoice.id),
                    value: Number(invoice.valor),
                    billingType: "UNDEFINED",
                    dueDate: invoice.dataVencimento
                        ? new Date(invoice.dataVencimento).toISOString().substring(0, 10)
                        : undefined,
                    notificationEnabled: true,
                    externalReference: String(invoice.id)
                });
                _h.label = 1;
            case 1:
                _h.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].post("https://api.asaas.com/v3/payments", payload, {
                        headers: {
                            "Content-Type": "application/json",
                            access_token: token
                        }
                    })];
            case 2:
                response = _h.sent();
                paymentLink = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.invoiceUrl) ||
                    ((_b = response.data) === null || _b === void 0 ? void 0 : _b.bankSlipUrl) ||
                    ((_c = response.data) === null || _c === void 0 ? void 0 : _c.invoicePdf) ||
                    ((_d = response.data) === null || _d === void 0 ? void 0 : _d.checkoutUrl);
                return [2 /*return*/, {
                        paymentLink: paymentLink || ((_e = response.data) === null || _e === void 0 ? void 0 : _e.url),
                        paymentExternalId: ((_f = response.data) === null || _f === void 0 ? void 0 : _f.id) || (0, uuid_1.v4)()
                    }];
            case 3:
                error_1 = _h.sent();
                status_1 = ((_g = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _g === void 0 ? void 0 : _g.status) || 500;
                message = extractAsaasErrorMessage(error_1);
                throw new AppError_1["default"]("[Asaas] ".concat(message), status_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAsaasSecondCopyByCpf = function (companyId, cpf) { return __awaiter(void 0, void 0, void 0, function () {
    var sanitizedCpf, headers, customerParams, customerResponse, customer, queryParams, listResponse, payments, allowedStatuses, payment, paymentId, _a, identificationFieldResponse, pixResponse, identificationData, pixData;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                sanitizedCpf = normalizeDocument(cpf);
                if (!sanitizedCpf || sanitizedCpf.length < 11) {
                    throw new AppError_1["default"]("CPF inválido.", 400);
                }
                return [4 /*yield*/, getAsaasHeaders(companyId)];
            case 1:
                headers = (_e.sent()).headers;
                customerParams = new URLSearchParams({
                    cpfCnpj: sanitizedCpf,
                    limit: "1",
                    offset: "0"
                });
                return [4 /*yield*/, axios_1["default"].get("".concat(ASAAS_BASE_URL, "/customers?").concat(customerParams.toString()), { headers: headers })];
            case 2:
                customerResponse = _e.sent();
                customer = (_c = (_b = customerResponse.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c[0];
                if (!(customer === null || customer === void 0 ? void 0 : customer.id)) {
                    throw new AppError_1["default"]("CPF não encontrado ou não cadastrado no Asaas.", 404);
                }
                queryParams = new URLSearchParams({
                    customer: customer.id,
                    limit: "10",
                    offset: "0",
                    sort: "dueDate",
                    order: "desc"
                });
                return [4 /*yield*/, axios_1["default"].get("".concat(ASAAS_BASE_URL, "/payments?").concat(queryParams.toString()), { headers: headers })];
            case 3:
                listResponse = _e.sent();
                payments = ((_d = listResponse.data) === null || _d === void 0 ? void 0 : _d.data) || [];
                allowedStatuses = ["PENDING", "OVERDUE", "DUNNING_REQUESTED", "DUNNING_RECEIVED"];
                payment = payments.find(function (item) { return allowedStatuses.includes(item === null || item === void 0 ? void 0 : item.status); }) ||
                    payments[0];
                if (!payment) {
                    throw new AppError_1["default"]("Nenhum boleto pendente encontrado para este CPF.", 404);
                }
                paymentId = payment.id;
                return [4 /*yield*/, Promise.all([
                        axios_1["default"]
                            .get("".concat(ASAAS_BASE_URL, "/payments/").concat(paymentId, "/identificationField"), {
                            headers: headers
                        })["catch"](function (error) {
                            var _a;
                            if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                                return { data: null };
                            }
                            throw error;
                        }),
                        axios_1["default"]
                            .get("".concat(ASAAS_BASE_URL, "/payments/").concat(paymentId, "/pixQrCode"), {
                            headers: headers
                        })["catch"](function (error) {
                            var _a;
                            if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                                return { data: null };
                            }
                            throw error;
                        })
                    ])];
            case 4:
                _a = _e.sent(), identificationFieldResponse = _a[0], pixResponse = _a[1];
                identificationData = (identificationFieldResponse === null || identificationFieldResponse === void 0 ? void 0 : identificationFieldResponse.data) || {};
                pixData = (pixResponse === null || pixResponse === void 0 ? void 0 : pixResponse.data) || null;
                return [2 /*return*/, {
                        paymentId: paymentId,
                        customerName: payment === null || payment === void 0 ? void 0 : payment.customerName,
                        customerCpfCnpj: payment === null || payment === void 0 ? void 0 : payment.customerCpfCnpj,
                        dueDate: payment === null || payment === void 0 ? void 0 : payment.dueDate,
                        value: payment === null || payment === void 0 ? void 0 : payment.value,
                        status: payment === null || payment === void 0 ? void 0 : payment.status,
                        invoiceUrl: (payment === null || payment === void 0 ? void 0 : payment.invoiceUrl) || (payment === null || payment === void 0 ? void 0 : payment.url) || null,
                        bankSlipUrl: (payment === null || payment === void 0 ? void 0 : payment.bankSlipUrl) || null,
                        invoicePdfUrl: (payment === null || payment === void 0 ? void 0 : payment.invoicePdf) || null,
                        digitableLine: (identificationData === null || identificationData === void 0 ? void 0 : identificationData.digitableLine) ||
                            (identificationData === null || identificationData === void 0 ? void 0 : identificationData.identificationField),
                        barcodeNumber: identificationData === null || identificationData === void 0 ? void 0 : identificationData.barcodeNumber,
                        pixCopyPaste: (pixData === null || pixData === void 0 ? void 0 : pixData.copyAndPaste) ||
                            (pixData === null || pixData === void 0 ? void 0 : pixData.payload) ||
                            (pixData === null || pixData === void 0 ? void 0 : pixData.payloadBase64) ||
                            null,
                        pixQrCodeImage: (pixData === null || pixData === void 0 ? void 0 : pixData.encodedImage) || null,
                        pixExpirationDate: (pixData === null || pixData === void 0 ? void 0 : pixData.expirationDate) || null
                    }];
        }
    });
}); };
exports.getAsaasSecondCopyByCpf = getAsaasSecondCopyByCpf;
var generatePaymentLink = function (_a) {
    var invoice = _a.invoice, provider = _a.provider;
    return __awaiter(void 0, void 0, void 0, function () {
        var tokenRecord, client, customerId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.getCompanyPaymentToken)(invoice.companyId, provider)];
                case 1:
                    tokenRecord = _b.sent();
                    if (!tokenRecord.token) {
                        throw new AppError_1["default"]("Token para ".concat(provider, " inv\u00E1lido."), 400);
                    }
                    if (provider === "mercadopago") {
                        return [2 /*return*/, generateMercadoPagoLink(invoice, tokenRecord.token)];
                    }
                    if (!(provider === "asaas")) return [3 /*break*/, 4];
                    return [4 /*yield*/, CrmClient_1["default"].findOne({
                            where: {
                                id: invoice.clientId,
                                companyId: invoice.companyId
                            }
                        })];
                case 2:
                    client = _b.sent();
                    if (!client) {
                        throw new AppError_1["default"]("Cliente associado à fatura não encontrado.", 404);
                    }
                    return [4 /*yield*/, (0, syncAsaasCustomer_1["default"])({
                            client: client,
                            token: tokenRecord.token
                        })];
                case 3:
                    customerId = _b.sent();
                    return [2 /*return*/, generateAsaasPayment(invoice, tokenRecord.token, customerId)];
                case 4: throw new AppError_1["default"]("Gateway não suportado.", 400);
            }
        });
    });
};
exports.generatePaymentLink = generatePaymentLink;
var getAsaasHeaders = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getCompanyPaymentToken)(companyId, "asaas")];
            case 1:
                tokenRecord = _a.sent();
                if (!tokenRecord.token) {
                    throw new AppError_1["default"]("Token Asaas não configurado.", 400);
                }
                return [2 /*return*/, {
                        headers: {
                            "Content-Type": "application/json",
                            access_token: tokenRecord.token
                        }
                    }];
        }
    });
}); };
var sanitize = function (payload) {
    var copy = __assign({}, payload);
    Object.keys(copy).forEach(function (key) {
        if (copy[key] === undefined || copy[key] === null || copy[key] === "") {
            delete copy[key];
        }
    });
    return copy;
};
var normalizeDocument = function (value) { return (value || "").replace(/\D/g, ""); };
var updateAsaasPayment = function (invoice, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var headers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!invoice.paymentExternalId)
                    return [2 /*return*/];
                return [4 /*yield*/, getAsaasHeaders(invoice.companyId)];
            case 1:
                headers = (_a.sent()).headers;
                return [4 /*yield*/, axios_1["default"].put("".concat(ASAAS_BASE_URL, "/payments/").concat(invoice.paymentExternalId), sanitize(payload), { headers: headers })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateAsaasPayment = updateAsaasPayment;
var receiveAsaasPayment = function (invoice, options) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!invoice.paymentExternalId)
                    return [2 /*return*/];
                return [4 /*yield*/, getAsaasHeaders(invoice.companyId)];
            case 1:
                headers = (_a.sent()).headers;
                body = sanitize({
                    value: options.value,
                    paymentDate: options.paymentDate
                        ? new Date(options.paymentDate).toISOString().substring(0, 10)
                        : undefined,
                    description: options.description
                });
                return [4 /*yield*/, axios_1["default"].post("".concat(ASAAS_BASE_URL, "/payments/").concat(invoice.paymentExternalId, "/receive"), body, { headers: headers })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.receiveAsaasPayment = receiveAsaasPayment;
var cancelAsaasPayment = function (invoice) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, error_2, status_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!invoice.paymentExternalId)
                    return [2 /*return*/];
                return [4 /*yield*/, getAsaasHeaders(invoice.companyId)];
            case 1:
                headers = (_b.sent()).headers;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, axios_1["default"]["delete"]("".concat(ASAAS_BASE_URL, "/payments/").concat(invoice.paymentExternalId), {
                        headers: headers
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                status_2 = (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.status;
                if (status_2 && [404, 400].includes(status_2)) {
                    return [2 /*return*/];
                }
                throw error_2;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.cancelAsaasPayment = cancelAsaasPayment;
var configureMercadoPago = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getCompanyPaymentToken)(companyId, "mercadopago")];
            case 1:
                tokenRecord = _a.sent();
                if (!tokenRecord.token) {
                    throw new AppError_1["default"]("Token Mercado Pago não configurado.", 400);
                }
                mercadopago.configure({
                    access_token: tokenRecord.token
                });
                return [2 /*return*/];
        }
    });
}); };
var cancelMercadoPagoPreference = function (invoice) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!invoice.paymentExternalId)
                    return [2 /*return*/];
                return [4 /*yield*/, configureMercadoPago(invoice.companyId)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, mercadopago.preferences.cancel(invoice.paymentExternalId)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                if ((error_3 === null || error_3 === void 0 ? void 0 : error_3.status) === 404) {
                    return [2 /*return*/];
                }
                throw error_3;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.cancelMercadoPagoPreference = cancelMercadoPagoPreference;
var cancelGatewayPayment = function (invoice) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!invoice.paymentProvider || !invoice.paymentExternalId) {
                    return [2 /*return*/];
                }
                if (!(invoice.paymentProvider === "asaas")) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.cancelAsaasPayment)(invoice)];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                if (!(invoice.paymentProvider === "mercadopago")) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.cancelMercadoPagoPreference)(invoice)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.cancelGatewayPayment = cancelGatewayPayment;
