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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.asaaswebhook = exports.mercadopagowebhook = exports.stripewebhook = exports.webhook = exports.createWebhook = exports.createSubscription = exports.index = void 0;
var Yup = __importStar(require("yup"));
var gn_api_sdk_typescript_1 = __importDefault(require("gn-api-sdk-typescript"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var Gn_1 = __importDefault(require("../config/Gn"));
var Company_1 = __importDefault(require("../models/Company"));
var Invoices_1 = __importDefault(require("../models/Invoices"));
var socket_1 = require("../libs/socket");
var Setting_1 = __importDefault(require("../models/Setting"));
var stripe_1 = __importDefault(require("stripe"));
var axios = require('axios');
var ListWhatsAppsService_1 = __importDefault(require("../services/WhatsappService/ListWhatsAppsService"));
var StartWhatsAppSession_1 = require("../services/WbotServices/StartWhatsAppSession");
var Sentry = __importStar(require("@sentry/node"));
// const app = express();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gerencianet;
    return __generator(this, function (_a) {
        gerencianet = new gn_api_sdk_typescript_1["default"](Gn_1["default"]);
        return [2 /*return*/, res.json(gerencianet.getSubscriptions())];
    });
}); };
exports.index = index;
var createSubscription = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function createMercadoPagoPreference() {
        return __awaiter(this, void 0, void 0, function () {
            var mercadopago, preference, response, mercadopagoURLb, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!key_MP_ACCESS_TOKEN) return [3 /*break*/, 4];
                        mercadopago = require("mercadopago");
                        mercadopago.configure({
                            access_token: key_MP_ACCESS_TOKEN
                        });
                        preference = {
                            external_reference: String(invoiceId),
                            notification_url: String(process.env.MP_NOTIFICATION_URL),
                            items: [
                                {
                                    title: "#Fatura:".concat(invoiceId),
                                    unit_price: valor,
                                    quantity: 1
                                }
                            ]
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mercadopago.preferences.create(preference)];
                    case 2:
                        response = _a.sent();
                        mercadopagoURLb = response.body.init_point;
                        //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                        //console.log(mercadopagoURLb);
                        return [2 /*return*/, mercadopagoURLb]; // Retorna o valor para uso externo
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, null]; // Em caso de erro, retorna null ou um valor padrão adequado
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var stripeURL, pix, qrcode, asaasURL, key_STRIPE_PRIVATE, key_MP_ACCESS_TOKEN, key_GERENCIANET_PIX_KEY, key_ASAAS_TOKEN, buscacompanyId, getasaastoken, getmptoken, getstripetoken, getpixchave, error_1, gerencianet, companyId, schema, _a, firstName, price, users, connections, address2, city, state, zipcode, country, plan, invoiceId, valor, valorext, mercadopagoURL, optionsGetAsaas, response, error_2, stripe, sessionStripe, invoicesX, invoiX, body, error_3, updateCompany;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                key_STRIPE_PRIVATE = null;
                key_MP_ACCESS_TOKEN = null;
                key_GERENCIANET_PIX_KEY = null;
                key_ASAAS_TOKEN = null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                buscacompanyId = 1;
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: buscacompanyId, key: "asaastoken" }
                    })];
            case 2:
                getasaastoken = _b.sent();
                key_ASAAS_TOKEN = getasaastoken === null || getasaastoken === void 0 ? void 0 : getasaastoken.value;
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: buscacompanyId, key: "mpaccesstoken" }
                    })];
            case 3:
                getmptoken = _b.sent();
                key_MP_ACCESS_TOKEN = getmptoken === null || getmptoken === void 0 ? void 0 : getmptoken.value;
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: buscacompanyId, key: "stripeprivatekey" }
                    })];
            case 4:
                getstripetoken = _b.sent();
                key_STRIPE_PRIVATE = getstripetoken === null || getstripetoken === void 0 ? void 0 : getstripetoken.value;
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: buscacompanyId, key: "efichavepix" }
                    })];
            case 5:
                getpixchave = _b.sent();
                key_GERENCIANET_PIX_KEY = getpixchave === null || getpixchave === void 0 ? void 0 : getpixchave.value;
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.error("Error retrieving settings:", error_1);
                return [3 /*break*/, 7];
            case 7:
                gerencianet = new gn_api_sdk_typescript_1["default"](Gn_1["default"]);
                companyId = req.user.companyId;
                schema = Yup.object().shape({
                    price: Yup.string().required(),
                    users: Yup.string().required(),
                    connections: Yup.string().required()
                });
                return [4 /*yield*/, schema.isValid(req.body)];
            case 8:
                if (!(_b.sent())) {
                    console.log("Erro linha 32");
                    throw new AppError_1["default"]("Dados Incorretos - Contate o Suporte!", 400);
                }
                _a = req.body, firstName = _a.firstName, price = _a.price, users = _a.users, connections = _a.connections, address2 = _a.address2, city = _a.city, state = _a.state, zipcode = _a.zipcode, country = _a.country, plan = _a.plan, invoiceId = _a.invoiceId;
                valor = Number(price.toLocaleString("pt-br", { minimumFractionDigits: 2 }).replace(",", "."));
                valorext = price;
                return [4 /*yield*/, createMercadoPagoPreference()];
            case 9:
                mercadopagoURL = _b.sent();
                console.log(mercadopagoURL);
                if (!(key_ASAAS_TOKEN && valor > 10)) return [3 /*break*/, 15];
                optionsGetAsaas = {
                    method: 'POST',
                    url: "https://api.asaas.com/v3/paymentLinks",
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': key_ASAAS_TOKEN
                    },
                    data: {
                        "name": "#Fatura:".concat(invoiceId),
                        "description": "#Fatura:".concat(invoiceId),
                        //"endDate": "2021-02-05",
                        "value": price.toLocaleString("pt-br", { minimumFractionDigits: 2 }).replace(",", "."),
                        //"value": "50",
                        "billingType": "UNDEFINED",
                        "chargeType": "DETACHED",
                        "dueDateLimitDays": 1,
                        "subscriptionCycle": null,
                        "maxInstallmentCount": 1,
                        "notificationEnabled": true
                    }
                };
                _b.label = 10;
            case 10:
                if (!(asaasURL === undefined)) return [3 /*break*/, 15];
                _b.label = 11;
            case 11:
                _b.trys.push([11, 13, , 14]);
                return [4 /*yield*/, axios.request(optionsGetAsaas)];
            case 12:
                response = _b.sent();
                asaasURL = response.data.url;
                console.log('asaasURL:', asaasURL);
                return [3 /*break*/, 14];
            case 13:
                error_2 = _b.sent();
                console.error('Error:', error_2);
                return [3 /*break*/, 14];
            case 14: return [3 /*break*/, 10];
            case 15:
                if (!key_STRIPE_PRIVATE) return [3 /*break*/, 19];
                stripe = new stripe_1["default"](key_STRIPE_PRIVATE, {
                    apiVersion: '2022-11-15'
                });
                return [4 /*yield*/, stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: [
                            {
                                price_data: {
                                    currency: 'brl',
                                    product_data: {
                                        name: "#Fatura:".concat(invoiceId)
                                    },
                                    unit_amount: price.toLocaleString("pt-br", { minimumFractionDigits: 2 }).replace(",", "").replace(".", "")
                                },
                                quantity: 1
                            },
                        ],
                        mode: 'payment',
                        success_url: process.env.STRIPE_OK_URL,
                        cancel_url: process.env.STRIPE_CANCEL_URL
                    })];
            case 16:
                sessionStripe = _b.sent();
                return [4 /*yield*/, Invoices_1["default"].findByPk(invoiceId)];
            case 17:
                invoicesX = _b.sent();
                return [4 /*yield*/, invoicesX.update({
                        id: invoiceId,
                        stripe_id: sessionStripe.id
                    })];
            case 18:
                invoiX = _b.sent();
                //console.log(sessionStripe);
                stripeURL = sessionStripe.url;
                _b.label = 19;
            case 19:
                if (!key_GERENCIANET_PIX_KEY) return [3 /*break*/, 24];
                body = {
                    calendario: {
                        expiracao: 3600
                    },
                    valor: {
                        original: price.toLocaleString("pt-br", { minimumFractionDigits: 2 }).replace(",", ".")
                    },
                    chave: key_GERENCIANET_PIX_KEY,
                    solicitacaoPagador: "#Fatura:".concat(invoiceId)
                };
                _b.label = 20;
            case 20:
                _b.trys.push([20, 23, , 24]);
                return [4 /*yield*/, gerencianet.pixCreateImmediateCharge(null, body)];
            case 21:
                pix = _b.sent();
                return [4 /*yield*/, gerencianet.pixGenerateQRCode({
                        id: pix.loc.id
                    })];
            case 22:
                qrcode = _b.sent();
                return [3 /*break*/, 24];
            case 23:
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 24];
            case 24: return [4 /*yield*/, Company_1["default"].findOne()];
            case 25:
                updateCompany = _b.sent();
                if (!updateCompany) {
                    throw new AppError_1["default"]("Company not found", 404);
                }
                return [2 /*return*/, res.json(__assign(__assign({}, pix), { valorext: valorext, qrcode: qrcode, stripeURL: stripeURL, mercadopagoURL: mercadopagoURL, asaasURL: asaasURL }))];
        }
    });
}); };
exports.createSubscription = createSubscription;
var createWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, err_1, errors, _a, chave, url, body, params, gerencianet, create, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schema = Yup.object().shape({
                    chave: Yup.string().required(),
                    url: Yup.string().required()
                });
                console.log(req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(req.body, { abortEarly: false })];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                if (err_1 instanceof Yup.ValidationError) {
                    errors = err_1.errors.join('\n');
                    throw new AppError_1["default"]("Validation error(s):\n".concat(errors), 400);
                }
                else {
                    throw err_1;
                }
                return [3 /*break*/, 4];
            case 4:
                _a = req.body, chave = _a.chave, url = _a.url;
                body = {
                    webhookUrl: url
                };
                params = {
                    chave: chave
                };
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                gerencianet = new gn_api_sdk_typescript_1["default"](Gn_1["default"]);
                return [4 /*yield*/, gerencianet.pixConfigWebhook(params, body)];
            case 6:
                create = _b.sent();
                return [2 /*return*/, res.json(create)];
            case 7:
                error_5 = _b.sent();
                console.log(error_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createWebhook = createWebhook;
var webhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, evento, gerencianet_1;
    return __generator(this, function (_a) {
        type = req.params.type;
        evento = req.body.evento;
        //console.log(req.body);
        //console.log(req.params);
        if (evento === "teste_webhook") {
            return [2 /*return*/, res.json({ ok: true })];
        }
        if (req.body.pix) {
            gerencianet_1 = new gn_api_sdk_typescript_1["default"](Gn_1["default"]);
            req.body.pix.forEach(function (pix) { return __awaiter(void 0, void 0, void 0, function () {
                var detahe, solicitacaoPagador, invoiceID, invoices, companyId, company, expiresAt, date, invoi, io, companyUpdate, companyId_1, whatsapps, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, gerencianet_1.pixDetailCharge({
                                txid: pix.txid
                            })];
                        case 1:
                            detahe = _a.sent();
                            if (!(detahe.status === "CONCLUIDA")) return [3 /*break*/, 12];
                            solicitacaoPagador = detahe.solicitacaoPagador;
                            invoiceID = solicitacaoPagador.replace("#Fatura:", "");
                            return [4 /*yield*/, Invoices_1["default"].findByPk(invoiceID)];
                        case 2:
                            invoices = _a.sent();
                            companyId = invoices.companyId;
                            return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
                        case 3:
                            company = _a.sent();
                            expiresAt = new Date(company.dueDate);
                            expiresAt.setDate(expiresAt.getDate() + 30);
                            date = expiresAt.toISOString().split("T")[0];
                            if (!company) return [3 /*break*/, 12];
                            return [4 /*yield*/, company.update({
                                    dueDate: date
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, invoices.update({
                                    id: invoiceID,
                                    txid: pix.txid,
                                    status: 'paid'
                                })];
                        case 5:
                            invoi = _a.sent();
                            return [4 /*yield*/, company.reload()];
                        case 6:
                            _a.sent();
                            io = (0, socket_1.getIO)();
                            return [4 /*yield*/, Company_1["default"].findOne({
                                    where: {
                                        id: companyId
                                    }
                                })];
                        case 7:
                            companyUpdate = _a.sent();
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, 10, , 11]);
                            companyId_1 = company.id;
                            return [4 /*yield*/, (0, ListWhatsAppsService_1["default"])({ companyId: companyId_1 })];
                        case 9:
                            whatsapps = _a.sent();
                            if (whatsapps.length > 0) {
                                whatsapps.forEach(function (whatsapp) {
                                    (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, companyId_1);
                                });
                            }
                            return [3 /*break*/, 11];
                        case 10:
                            e_1 = _a.sent();
                            Sentry.captureException(e_1);
                            return [3 /*break*/, 11];
                        case 11:
                            io.emit("company-".concat(companyId, "-payment"), {
                                action: detahe.status,
                                company: companyUpdate
                            });
                            _a.label = 12;
                        case 12: return [2 /*return*/];
                    }
                });
            }); });
        }
        return [2 /*return*/, res.json({ ok: true })];
    });
}); };
exports.webhook = webhook;
var stripewebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, evento, stripe_id, invoices, invoiceID, companyId, company, expiresAt, date, invoi, io, companyUpdate, companyId_2, whatsapps, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.params.type;
                evento = req.body.evento;
                if (!req.body.data.object.id) return [3 /*break*/, 11];
                if (!(req.body.type === "checkout.session.completed")) return [3 /*break*/, 11];
                stripe_id = req.body.data.object.id;
                return [4 /*yield*/, Invoices_1["default"].findOne({ where: { stripe_id: stripe_id } })];
            case 1:
                invoices = _a.sent();
                invoiceID = invoices.id;
                companyId = invoices.companyId;
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 2:
                company = _a.sent();
                expiresAt = new Date(company.dueDate);
                expiresAt.setDate(expiresAt.getDate() + 30);
                date = expiresAt.toISOString().split("T")[0];
                if (!company) return [3 /*break*/, 11];
                return [4 /*yield*/, company.update({
                        dueDate: date
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, invoices.update({
                        id: invoiceID,
                        status: 'paid'
                    })];
            case 4:
                invoi = _a.sent();
                return [4 /*yield*/, company.reload()];
            case 5:
                _a.sent();
                io = (0, socket_1.getIO)();
                return [4 /*yield*/, Company_1["default"].findOne({
                        where: {
                            id: companyId
                        }
                    })];
            case 6:
                companyUpdate = _a.sent();
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                companyId_2 = company.id;
                return [4 /*yield*/, (0, ListWhatsAppsService_1["default"])({ companyId: companyId_2 })];
            case 8:
                whatsapps = _a.sent();
                if (whatsapps.length > 0) {
                    whatsapps.forEach(function (whatsapp) {
                        (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, companyId_2);
                    });
                }
                return [3 /*break*/, 10];
            case 9:
                e_2 = _a.sent();
                Sentry.captureException(e_2);
                return [3 /*break*/, 10];
            case 10:
                io.emit("company-".concat(companyId, "-payment"), {
                    action: 'CONCLUIDA',
                    company: companyUpdate
                });
                _a.label = 11;
            case 11: return [2 /*return*/, res.json({ ok: true })];
        }
    });
}); };
exports.stripewebhook = stripewebhook;
var mercadopagowebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key_MP_ACCESS_TOKEN, buscacompanyId, getmptoken, error_6, mercadopago, payment, invoices, invoiceID, companyId, company, expiresAt, date, invoi, io, companyUpdate, companyId_3, whatsapps, e_3, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key_MP_ACCESS_TOKEN = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                buscacompanyId = 1;
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: buscacompanyId, key: "mpaccesstoken" }
                    })];
            case 2:
                getmptoken = _a.sent();
                key_MP_ACCESS_TOKEN = getmptoken === null || getmptoken === void 0 ? void 0 : getmptoken.value;
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Error retrieving settings:", error_6);
                return [3 /*break*/, 4];
            case 4:
                mercadopago = require("mercadopago");
                mercadopago.configure({
                    access_token: key_MP_ACCESS_TOKEN
                });
                if (!(req.body.action === "payment.updated")) return [3 /*break*/, 19];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 18, , 19]);
                return [4 /*yield*/, mercadopago.payment.get(req.body.data.id)];
            case 6:
                payment = _a.sent();
                console.log('DETALHES DO PAGAMENTO:', payment.body);
                console.log('ID DA FATURA:', payment.body.external_reference);
                if (!payment.body.transaction_details.transaction_id) {
                    console.log('SEM PAGAMENTO:', payment.body.external_reference);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Invoices_1["default"].findOne({ where: { id: payment.body.external_reference } })];
            case 7:
                invoices = _a.sent();
                invoiceID = invoices.id;
                if (invoices && invoices.status === "paid") {
                    console.log('FATURA JÁ PAGA');
                    return [2 /*return*/];
                }
                companyId = invoices.companyId;
                return [4 /*yield*/, Company_1["default"].findByPk(companyId)];
            case 8:
                company = _a.sent();
                expiresAt = new Date(company.dueDate);
                expiresAt.setDate(expiresAt.getDate() + 30);
                date = expiresAt.toISOString().split("T")[0];
                if (!company) return [3 /*break*/, 17];
                return [4 /*yield*/, company.update({
                        dueDate: date
                    })];
            case 9:
                _a.sent();
                return [4 /*yield*/, invoices.update({
                        id: invoiceID,
                        txid: payment.body.transaction_details.transaction_id,
                        status: 'paid'
                    })];
            case 10:
                invoi = _a.sent();
                return [4 /*yield*/, company.reload()];
            case 11:
                _a.sent();
                io = (0, socket_1.getIO)();
                return [4 /*yield*/, Company_1["default"].findOne({
                        where: {
                            id: companyId
                        }
                    })];
            case 12:
                companyUpdate = _a.sent();
                _a.label = 13;
            case 13:
                _a.trys.push([13, 15, , 16]);
                companyId_3 = company.id;
                return [4 /*yield*/, (0, ListWhatsAppsService_1["default"])({ companyId: companyId_3 })];
            case 14:
                whatsapps = _a.sent();
                if (whatsapps.length > 0) {
                    whatsapps.forEach(function (whatsapp) {
                        (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, companyId_3);
                    });
                }
                return [3 /*break*/, 16];
            case 15:
                e_3 = _a.sent();
                Sentry.captureException(e_3);
                return [3 /*break*/, 16];
            case 16:
                io.emit("company-".concat(companyId, "-payment"), {
                    action: 'CONCLUIDA',
                    company: companyUpdate
                });
                _a.label = 17;
            case 17:
                res.status(200).json(payment.body);
                return [3 /*break*/, 19];
            case 18:
                error_7 = _a.sent();
                console.error('Erro ao tentar ler o pagamento:', error_7);
                res.status(500).json({ error: 'Erro ao identificar o pagamento' });
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); };
exports.mercadopagowebhook = mercadopagowebhook;
var asaaswebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json(req.body);
        return [2 /*return*/];
    });
}); };
exports.asaaswebhook = asaaswebhook;
