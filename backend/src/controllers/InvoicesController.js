"use strict";
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
exports.remove = exports.sendBillingNotification = exports.adminManualPay = exports.pay = exports.update = exports.list = exports.store = exports.show = exports.index = void 0;
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var Invoices_1 = __importDefault(require("../models/Invoices"));
var Company_1 = __importDefault(require("../models/Company"));
var Setting_1 = __importDefault(require("../models/Setting"));
var SendMailWithSettings_1 = require("../helpers/SendMailWithSettings");
var ShowCompanyService_1 = __importDefault(require("../services/CompanyService/ShowCompanyService"));
var FindCompaniesWhatsappService_1 = __importDefault(require("../services/CompanyService/FindCompaniesWhatsappService"));
var wbot_1 = require("../libs/wbot");
var moment_1 = __importDefault(require("moment"));
var FindAllInvoiceService_1 = __importDefault(require("../services/InvoicesService/FindAllInvoiceService"));
var ListInvoicesServices_1 = __importDefault(require("../services/InvoicesService/ListInvoicesServices"));
var ShowInvoiceService_1 = __importDefault(require("../services/InvoicesService/ShowInvoiceService"));
var UpdateInvoiceService_1 = __importDefault(require("../services/InvoicesService/UpdateInvoiceService"));
var DeleteInvoiceService_1 = __importDefault(require("../services/InvoicesService/DeleteInvoiceService"));
var CreateInvoiceService_1 = __importDefault(require("../services/InvoicesService/CreateInvoiceService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, _b, invoices, count, hasMore;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                return [4 /*yield*/, (0, ListInvoicesServices_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber
                    })];
            case 1:
                _b = _c.sent(), invoices = _b.invoices, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ invoices: invoices, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, invoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, ShowInvoiceService_1["default"])(id)];
            case 1:
                invoice = _a.sent();
                return [2 /*return*/, res.status(200).json(invoice)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlan, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPlan = req.body;
                return [4 /*yield*/, (0, CreateInvoiceService_1["default"])(newPlan)];
            case 1:
                plan = _a.sent();
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.store = store;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, allInvoices, invoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                if (!(+companyId === 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, Invoices_1["default"].findAll({
                        include: [{ model: Company_1["default"], as: "company", attributes: ["id", "name"] }],
                        order: [["id", "ASC"]]
                    })];
            case 1:
                allInvoices = _a.sent();
                return [2 /*return*/, res.status(200).json(allInvoices)];
            case 2: return [4 /*yield*/, (0, FindAllInvoiceService_1["default"])(+companyId)];
            case 3:
                invoice = _a.sent();
                return [2 /*return*/, res.status(200).json(invoice)];
        }
    });
}); };
exports.list = list;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var InvoiceData, schema, err_1, id, status, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                InvoiceData = req.body;
                schema = Yup.object().shape({
                    name: Yup.string()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(InvoiceData)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 4:
                id = InvoiceData.id, status = InvoiceData.status;
                return [4 /*yield*/, (0, UpdateInvoiceService_1["default"])({
                        id: id,
                        status: status
                    })];
            case 5:
                plan = _a.sent();
                // const io = getIO();
                // io.of(companyId.toString())
                // .emit("plan", {
                //   action: "update",
                //   plan
                // });
                return [2 /*return*/, res.status(200).json(plan)];
        }
    });
}); };
exports.update = update;
var pay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, invoiceId, amount, description, dueDate, companyId, userId, invoice, paymentLink, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, invoiceId = _a.invoiceId, amount = _a.amount, description = _a.description, dueDate = _a.dueDate, companyId = _a.companyId;
                userId = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, UpdateInvoiceService_1["default"])({
                        id: invoiceId,
                        status: "paid"
                    })];
            case 2:
                invoice = _b.sent();
                paymentLink = "https://checkout.pagamento.com.br/pay/".concat(invoiceId);
                // 3. Retornar dados do pagamento
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        invoiceId: invoiceId,
                        paymentLink: paymentLink,
                        amount: amount,
                        status: "paid",
                        message: "Pagamento processado com sucesso"
                    })];
            case 3:
                err_2 = _b.sent();
                throw new AppError_1["default"]("Erro ao processar pagamento: " + err_2.message);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.pay = pay;
var adminManualPay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, invoice, Company_2, company, moment_2, currentDueDate, today, baseDate, newDueDate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                id = req.params.id;
                return [4 /*yield*/, Invoices_1["default"].findByPk(id)];
            case 1:
                invoice = _a.sent();
                if (!invoice) {
                    throw new AppError_1["default"]("ERR_NO_INVOICE_FOUND", 404);
                }
                return [4 /*yield*/, invoice.update({ status: "paid" })];
            case 2:
                _a.sent();
                if (!invoice.companyId) return [3 /*break*/, 5];
                Company_2 = require("../models/Company")["default"];
                return [4 /*yield*/, Company_2.findByPk(invoice.companyId)];
            case 3:
                company = _a.sent();
                if (!company) return [3 /*break*/, 5];
                moment_2 = require("moment");
                currentDueDate = moment_2(company.dueDate);
                today = moment_2();
                baseDate = currentDueDate.isAfter(today) ? currentDueDate : today;
                newDueDate = baseDate.add(30, "days").format("YYYY-MM-DD");
                return [4 /*yield*/, company.update({ dueDate: newDueDate })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(200).json({
                    message: "Fatura marcada como paga com sucesso!",
                    invoice: invoice
                })];
        }
    });
}); };
exports.adminManualPay = adminManualPay;
var formatPhoneToWhatsappJid = function (rawPhone) {
    if (!rawPhone)
        return null;
    var digits = rawPhone.replace(/\D/g, "");
    if (!digits)
        return null;
    if (!digits.startsWith("55")) {
        digits = "55" + digits;
    }
    return digits + "@s.whatsapp.net";
};
var sendBillingNotification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, invoice, targetCompany, appName, setting, e_1, dueDate, value, hoje, venc, dias, settingKey, msgTemplate, msgSetting, e_2, replaceVars, defaultWhatsappBody, whatsappBody, results, emailBody, sent, error_1, adminCompany, whatsappCompany, firstWhatsapp, phoneJid, wbot, sendOptions, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                if (companyId !== 1) {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                id = req.params.id;
                return [4 /*yield*/, Invoices_1["default"].findByPk(id, {
                        include: [{ model: Company_1["default"], as: "company" }]
                    })];
            case 1:
                invoice = _a.sent();
                if (!invoice) {
                    throw new AppError_1["default"]("ERR_NO_INVOICE_FOUND", 404);
                }
                targetCompany = invoice.company;
                if (!targetCompany) {
                    throw new AppError_1["default"]("ERR_COMPANY_NOT_FOUND", 404);
                }
                appName = "Sistema";
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: 1, key: "appName" }
                    })];
            case 3:
                setting = _a.sent();
                appName = (setting === null || setting === void 0 ? void 0 : setting.value) || "Sistema";
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                return [3 /*break*/, 5];
            case 5:
                dueDate = (0, moment_1["default"])(invoice.dueDate).format("DD/MM/YYYY");
                value = Number(invoice.value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });
                hoje = (0, moment_1["default"])().startOf("day");
                venc = (0, moment_1["default"])(invoice.dueDate).startOf("day");
                dias = venc.diff(hoje, "days");
                settingKey = "invoiceMsgAviso";
                if (dias < 0) {
                    settingKey = "invoiceMsgAtrasada"; // vencida
                }
                else if (dias === 0) {
                    settingKey = "invoiceMsgDia"; // vence hoje
                }
                msgTemplate = "";
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: 1, key: settingKey }
                    })];
            case 7:
                msgSetting = _a.sent();
                msgTemplate = (msgSetting === null || msgSetting === void 0 ? void 0 : msgSetting.value) || "";
                return [3 /*break*/, 9];
            case 8:
                e_2 = _a.sent();
                return [3 /*break*/, 9];
            case 9:
                replaceVars = function (text) {
                    return text
                        .replace(/\{empresa\}/g, targetCompany.name || "")
                        .replace(/\{plano\}/g, invoice.detail || "")
                        .replace(/\{valor\}/g, value)
                        .replace(/\{vencimento\}/g, dueDate)
                        .replace(/\{link\}/g, "");
                };
                defaultWhatsappBody = "*Aviso de Cobran\u00E7a - ".concat(appName, "*\n\nOl\u00E1 *").concat(targetCompany.name, "*,\n\nIdentificamos que a fatura abaixo encontra-se em aberto:\n\n*Detalhes:* ").concat(invoice.detail, "\n*Valor:* ").concat(value, "\n*Vencimento:* ").concat(dueDate, "\n\nPor favor, regularize o pagamento o mais breve poss\u00EDvel para evitar a suspens\u00E3o dos servi\u00E7os.\n\nEm caso de d\u00FAvidas, entre em contato conosco.\n\nAtenciosamente,\n*").concat(appName, "*");
                whatsappBody = msgTemplate ? replaceVars(msgTemplate) : defaultWhatsappBody;
                results = { email: false, whatsapp: false };
                if (!targetCompany.email) return [3 /*break*/, 13];
                _a.label = 10;
            case 10:
                _a.trys.push([10, 12, , 13]);
                emailBody = "\n        <h2>Aviso de Cobran\u00E7a - ".concat(appName, "</h2>\n        <p>Ol\u00E1 <strong>").concat(targetCompany.name, "</strong>,</p>\n        <p>Identificamos que a fatura abaixo encontra-se em aberto:</p>\n        <table style=\"border-collapse: collapse; margin: 16px 0;\">\n          <tr><td style=\"padding: 8px; border: 1px solid #ddd;\"><strong>Detalhes</strong></td><td style=\"padding: 8px; border: 1px solid #ddd;\">").concat(invoice.detail, "</td></tr>\n          <tr><td style=\"padding: 8px; border: 1px solid #ddd;\"><strong>Valor</strong></td><td style=\"padding: 8px; border: 1px solid #ddd;\">").concat(value, "</td></tr>\n          <tr><td style=\"padding: 8px; border: 1px solid #ddd;\"><strong>Vencimento</strong></td><td style=\"padding: 8px; border: 1px solid #ddd;\">").concat(dueDate, "</td></tr>\n        </table>\n        <p>Por favor, regularize o pagamento o mais breve poss\u00EDvel para evitar a suspens\u00E3o dos servi\u00E7os.</p>\n        <p>Em caso de d\u00FAvidas, entre em contato conosco.</p>\n        <br>\n        <p>Atenciosamente,<br><strong>").concat(appName, "</strong></p>\n      ");
                return [4 /*yield*/, (0, SendMailWithSettings_1.SendMailWithSettings)({
                        to: targetCompany.email,
                        subject: "Aviso de Cobran\u00E7a - Fatura ".concat(invoice.detail, " - ").concat(appName),
                        html: emailBody
                    })];
            case 11:
                sent = _a.sent();
                results.email = sent;
                return [3 /*break*/, 13];
            case 12:
                error_1 = _a.sent();
                console.error("Error sending billing email:", error_1);
                return [3 /*break*/, 13];
            case 13:
                if (!targetCompany.phone) return [3 /*break*/, 20];
                _a.label = 14;
            case 14:
                _a.trys.push([14, 19, , 20]);
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(1)];
            case 15:
                adminCompany = _a.sent();
                return [4 /*yield*/, (0, FindCompaniesWhatsappService_1["default"])(adminCompany.id)];
            case 16:
                whatsappCompany = _a.sent();
                firstWhatsapp = whatsappCompany.whatsapps[0];
                phoneJid = formatPhoneToWhatsappJid(targetCompany.phone);
                if (!((firstWhatsapp === null || firstWhatsapp === void 0 ? void 0 : firstWhatsapp.status) === "CONNECTED" && phoneJid)) return [3 /*break*/, 18];
                wbot = (0, wbot_1.getWbot)(firstWhatsapp.id);
                sendOptions = { createChat: false };
                return [4 /*yield*/, wbot.sendMessage(phoneJid, { text: whatsappBody }, sendOptions)];
            case 17:
                _a.sent();
                results.whatsapp = true;
                _a.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                error_2 = _a.sent();
                console.error("Error sending billing WhatsApp:", error_2);
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/, res.status(200).json({
                    message: "Notificação de cobrança enviada!",
                    results: results
                })];
        }
    });
}); };
exports.sendBillingNotification = sendBillingNotification;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, invoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, DeleteInvoiceService_1["default"])(id)];
            case 1:
                invoice = _a.sent();
                return [2 /*return*/, res.status(200).json(invoice)];
        }
    });
}); };
exports.remove = remove;
