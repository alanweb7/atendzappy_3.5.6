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
exports.adminDisable2FA = exports.disable2FA = exports.confirm2FA = exports.setup2FA = exports.checkEmail = exports.toggleChangeWidht = exports.mediaUpload = exports.list = exports.remove = exports.update = exports.showEmail = exports.show = exports.store = exports.index = void 0;
var Yup = __importStar(require("yup"));
var socket_1 = require("../libs/socket");
var CheckSettings_1 = require("../helpers/CheckSettings");
var AppError_1 = __importDefault(require("../errors/AppError"));
var Affiliate_1 = __importDefault(require("../models/Affiliate"));
var Coupon_1 = __importDefault(require("../models/Coupon"));
var AffiliateLink_1 = __importDefault(require("../models/AffiliateLink"));
var affiliateUtils_1 = require("../utils/affiliateUtils");
var CreateUserService_1 = __importDefault(require("../services/UserServices/CreateUserService"));
var ListUsersService_1 = __importDefault(require("../services/UserServices/ListUsersService"));
var UpdateUserService_1 = __importDefault(require("../services/UserServices/UpdateUserService"));
var ShowUserService_1 = __importDefault(require("../services/UserServices/ShowUserService"));
var DeleteUserService_1 = __importDefault(require("../services/UserServices/DeleteUserService"));
var SimpleListService_1 = __importDefault(require("../services/UserServices/SimpleListService"));
var CreateCompanyService_1 = __importDefault(require("../services/CompanyService/CreateCompanyService"));
var SendMail_1 = require("../helpers/SendMail");
var SendMailWithSettings_1 = require("../helpers/SendMailWithSettings");
var useDate_1 = require("../utils/useDate");
var Setting_1 = __importDefault(require("../models/Setting"));
var Plan_1 = __importDefault(require("../models/Plan"));
var ShowCompanyService_1 = __importDefault(require("../services/CompanyService/ShowCompanyService"));
var wbot_1 = require("../libs/wbot");
var FindCompaniesWhatsappService_1 = __importDefault(require("../services/CompanyService/FindCompaniesWhatsappService"));
var User_1 = __importDefault(require("../models/User"));
var lodash_1 = require("lodash");
var ToggleChangeWidthService_1 = __importDefault(require("../services/UserServices/ToggleChangeWidthService"));
var APIShowEmailUserService_1 = __importDefault(require("../services/UserServices/APIShowEmailUserService"));
var speakeasy = require("speakeasy");
var QRCode = require("qrcode");
var publicSignupSchema = Yup.object().shape({
    companyName: Yup.string()
        .trim()
        .min(2, "ERR_COMPANY_INVALID_NAME")
        .required("ERR_COMPANY_INVALID_NAME"),
    name: Yup.string()
        .trim()
        .min(2, "ERR_USER_INVALID_NAME")
        .required("ERR_USER_INVALID_NAME"),
    email: Yup.string()
        .trim()
        .email("ERR_INVALID_EMAIL")
        .required("ERR_INVALID_EMAIL"),
    password: Yup.string()
        .min(6, "ERR_INVALID_PASSWORD")
        .matches(/[a-z]/, "ERR_INVALID_PASSWORD")
        .matches(/[A-Z]/, "ERR_INVALID_PASSWORD")
        .matches(/[0-9]/, "ERR_INVALID_PASSWORD")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "ERR_INVALID_PASSWORD")
        .required("ERR_INVALID_PASSWORD"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "ERR_PASSWORD_CONFIRMATION")
        .required("ERR_PASSWORD_CONFIRMATION"),
    phone: Yup.string()
        .min(10, "ERR_INVALID_PHONE")
        .required("ERR_INVALID_PHONE"),
    type: Yup.string()
        .oneOf(["pf", "pj"], "ERR_INVALID_TYPE")["default"]("pf"),
    document: Yup.string()
        .when("type", {
        is: "pf",
        then: Yup.string()
            .matches(/^\d{11}$/, "ERR_INVALID_CPF")
            .required("ERR_CPF_REQUIRED"),
        otherwise: Yup.string()
            .matches(/^\d{14}$/, "ERR_INVALID_CNPJ")
            .required("ERR_CNPJ_REQUIRED")
    }),
    segment: Yup.string().optional(),
    planId: Yup.number()
        .typeError("ERR_INVALID_PLAN")
        .positive("ERR_INVALID_PLAN")
        .integer("ERR_INVALID_PLAN")
        .required("ERR_INVALID_PLAN"),
    affiliateCode: Yup.string().optional(),
    couponCode: Yup.string().optional()
});
var formatPhoneToWhatsappJid = function (rawPhone) {
    if (!rawPhone)
        return null;
    var digits = rawPhone.replace(/\D/g, "");
    if (!digits)
        return null;
    if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55")) {
        digits = "55".concat(digits);
    }
    if (digits.startsWith("55") && digits.length > 13) {
        // remove duplicated country code if user already included 55
        digits = digits.replace(/^55+/, "55");
    }
    return "".concat(digits, "@s.whatsapp.net");
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, _b, companyId, profile, _c, users, count, hasMore;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber;
                _b = req.user, companyId = _b.companyId, profile = _b.profile;
                return [4 /*yield*/, (0, ListUsersService_1["default"])({
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        companyId: companyId,
                        profile: profile
                    })];
            case 1:
                _c = _d.sent(), users = _c.users, count = _c.count, hasMore = _c.hasMore;
                return [2 /*return*/, res.json({ users: users, count: count, hasMore: hasMore })];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, companyName, phone, profile, bodyCompanyId, queueIds, planId, startWork, endWork, whatsappId, allTicket, defaultTheme, defaultMenu, allowGroup, allHistoric, allUserChat, userClosePendingTicket, showDashboard, _b, defaultTicketsManagerWidth, allowRealTime, allowConnections, confirmPassword, status, bodyDueDate, bodyRecurrence, campaignsEnabled, document, type, segment, affiliateCode, couponCode, userCompanyId, normalizedEmail, sanitizedPhone, error_1, errMap, generatedCompanyName, resolvedCompanyName, resolvedUserName, parsedPlanId, envPlanId, resolvedPlanId, dateToClient, cId, _c, companyUser, trialDays, trialDaysSetting, e_1, trialExpirationDate, date, resolvedStatus, resolvedDueDate, resolvedRecurrence, resolvedCampaignsEnabled, referredByCompanyId, resolvedAffiliateId, resolvedAffiliateLinkId, affiliateLink, affiliate, couponId, planAmount, plan, couponValidation, coupon, companyData, user, affiliateLink, trackingData, today, frontendUrl, planName, plan, e_2, appName, appNameSetting, e_3, messageVariables, welcomeEmailText, welcomeWhatsappText, welcomeSettings, e_4, emailBody, emailSubject, error_2, _email, fallbackError_1, company, whatsappCompany, firstWhatsapp, phoneJid, wbot, whatsappBody, sendOptions, error_3, user, io;
    var _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, name = _a.name, companyName = _a.companyName, phone = _a.phone, profile = _a.profile, bodyCompanyId = _a.companyId, queueIds = _a.queueIds, planId = _a.planId, startWork = _a.startWork, endWork = _a.endWork, whatsappId = _a.whatsappId, allTicket = _a.allTicket, defaultTheme = _a.defaultTheme, defaultMenu = _a.defaultMenu, allowGroup = _a.allowGroup, allHistoric = _a.allHistoric, allUserChat = _a.allUserChat, userClosePendingTicket = _a.userClosePendingTicket, showDashboard = _a.showDashboard, _b = _a.defaultTicketsManagerWidth, defaultTicketsManagerWidth = _b === void 0 ? 550 : _b, allowRealTime = _a.allowRealTime, allowConnections = _a.allowConnections, confirmPassword = _a.confirmPassword, status = _a.status, bodyDueDate = _a.dueDate, bodyRecurrence = _a.recurrence, campaignsEnabled = _a.campaignsEnabled, document = _a.document, type = _a.type, segment = _a.segment, affiliateCode = _a.affiliateCode, couponCode = _a.couponCode;
                userCompanyId = null;
                normalizedEmail = (email || "").trim().toLowerCase();
                if (!normalizedEmail) {
                    throw new AppError_1["default"]("ERR_EMAIL_REQUIRED", 400);
                }
                if (!password || String(password).trim().length === 0) {
                    throw new AppError_1["default"]("ERR_PASSWORD_REQUIRED", 400);
                }
                sanitizedPhone = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
                if (!(req.url === "/signup")) return [3 /*break*/, 4];
                console.log("[SIGNUP] Dados recebidos:", {
                    companyName: companyName,
                    name: name,
                    email: normalizedEmail,
                    phone: sanitizedPhone,
                    type: type,
                    document: document,
                    segment: segment,
                    planId: planId
                });
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, publicSignupSchema.validate({
                        companyName: companyName,
                        name: name,
                        email: normalizedEmail,
                        password: password,
                        confirmPassword: confirmPassword,
                        phone: sanitizedPhone,
                        type: type,
                        document: document,
                        segment: segment,
                        planId: planId
                    }, { abortEarly: false })];
            case 2:
                _g.sent();
                console.log("[SIGNUP] ✅ Validação passou");
                return [3 /*break*/, 4];
            case 3:
                error_1 = _g.sent();
                console.log("[SIGNUP] ❌ Erro de validação:", error_1.errors);
                errMap = {
                    "ERR_INVALID_TYPE": "Tipo inválido. Use 'pf' para pessoa física ou 'pj' para pessoa jurídica.",
                    "ERR_INVALID_CPF": "CPF inválido. Deve conter 11 dígitos numéricos.",
                    "ERR_INVALID_CNPJ": "CNPJ inválido. Deve conter 14 dígitos numéricos.",
                    "ERR_CPF_REQUIRED": "CPF é obrigatório para pessoa física.",
                    "ERR_CNPJ_REQUIRED": "CNPJ é obrigatório para pessoa jurídica.",
                    "ERR_INVALID_SEGMENT": "Segmento inválido. Escolha uma das opções disponíveis.",
                    "ERR_SEGMENT_REQUIRED": "Segmento é obrigatório.",
                    "ERR_COMPANY_INVALID_NAME": "Nome da empresa inválido (mínimo 2 caracteres).",
                    "ERR_USER_INVALID_NAME": "Nome do usuário inválido (mínimo 2 caracteres).",
                    "ERR_INVALID_EMAIL": "E-mail inválido.",
                    "ERR_INVALID_PASSWORD": "Senha inválida (mínimo 6 caracteres, com letras e números).",
                    "ERR_PASSWORD_CONFIRMATION": "Confirmação de senha não coincide.",
                    "ERR_INVALID_PHONE": "Telefone inválido (mínimo 10 dígitos).",
                    "ERR_INVALID_PLAN": "Plano inválido."
                };
                throw new AppError_1["default"](errMap[(_d = error_1.errors) === null || _d === void 0 ? void 0 : _d[0]] || "ERR_INVALID_SIGNUP_DATA");
            case 4:
                generatedCompanyName = (companyName && companyName.trim()) ||
                    (normalizedEmail.includes("@") ? normalizedEmail.split("@")[0] : "") ||
                    "empresa-".concat(Date.now());
                resolvedCompanyName = generatedCompanyName.length >= 2 ? generatedCompanyName : "empresa-".concat(Date.now());
                resolvedUserName = (name && name.trim()) || resolvedCompanyName;
                parsedPlanId = Number(planId);
                envPlanId = process.env.DEFAULT_PLAN_ID ? Number(process.env.DEFAULT_PLAN_ID) : undefined;
                resolvedPlanId = !Number.isNaN(parsedPlanId) && parsedPlanId > 0
                    ? parsedPlanId
                    : envPlanId && !Number.isNaN(envPlanId) && envPlanId > 0
                        ? envPlanId
                        : 1;
                dateToClient = (0, useDate_1.useDate)().dateToClient;
                if (req.user !== undefined) {
                    cId = req.user.companyId;
                    userCompanyId = cId;
                }
                _c = req.url === "/signup";
                if (!_c) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, CheckSettings_1.CheckSettings1)("userCreation", "enabled")];
            case 5:
                _c = (_g.sent()) === "disabled";
                _g.label = 6;
            case 6:
                if (_c) {
                    throw new AppError_1["default"]("ERR_USER_CREATION_DISABLED", 403);
                }
                else if (req.url !== "/signup" && req.user.profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                if (process.env.DEMO === "ON") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                companyUser = userCompanyId;
                if (!!companyUser) return [3 /*break*/, 49];
                trialDays = 7;
                _g.label = 7;
            case 7:
                _g.trys.push([7, 9, , 10]);
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: 1, key: "trialDays" }
                    })];
            case 8:
                trialDaysSetting = _g.sent();
                if (trialDaysSetting === null || trialDaysSetting === void 0 ? void 0 : trialDaysSetting.value) {
                    trialDays = parseInt(trialDaysSetting.value) || 7;
                }
                return [3 /*break*/, 10];
            case 9:
                e_1 = _g.sent();
                console.log("Error fetching trialDays setting, using default 7");
                return [3 /*break*/, 10];
            case 10:
                trialExpirationDate = new Date();
                trialExpirationDate.setDate(trialExpirationDate.getDate() + trialDays);
                date = trialExpirationDate.toISOString().split("T")[0];
                resolvedStatus = typeof status === "boolean"
                    ? status
                    : status === "t" || status === "true" || status === "1" || status === 1 || status === "active" || status === "on";
                resolvedDueDate = bodyDueDate || date;
                resolvedRecurrence = bodyRecurrence || "MENSAL";
                resolvedCampaignsEnabled = typeof campaignsEnabled === "boolean" ? campaignsEnabled : true;
                referredByCompanyId = null;
                resolvedAffiliateId = null;
                resolvedAffiliateLinkId = null;
                if (!affiliateCode) return [3 /*break*/, 13];
                return [4 /*yield*/, AffiliateLink_1["default"].findOne({
                        where: { code: affiliateCode.toUpperCase() }
                    })];
            case 11:
                affiliateLink = _g.sent();
                if (!affiliateLink) return [3 /*break*/, 13];
                return [4 /*yield*/, Affiliate_1["default"].findByPk(affiliateLink.affiliateId)];
            case 12:
                affiliate = _g.sent();
                if (affiliate && affiliate.status === "active") {
                    referredByCompanyId = affiliate.companyId;
                    resolvedAffiliateId = affiliate.id;
                    resolvedAffiliateLinkId = affiliateLink.id;
                }
                _g.label = 13;
            case 13:
                couponId = null;
                planAmount = 0;
                if (!couponCode) return [3 /*break*/, 18];
                return [4 /*yield*/, Plan_1["default"].findByPk(resolvedPlanId)];
            case 14:
                plan = _g.sent();
                if (!plan) return [3 /*break*/, 18];
                planAmount = parseFloat(plan.amount);
                return [4 /*yield*/, (0, affiliateUtils_1.validateCoupon)(couponCode, planAmount)];
            case 15:
                couponValidation = _g.sent();
                if (!couponValidation.valid) {
                    throw new AppError_1["default"](couponValidation.error || "Cupom inválido", 400);
                }
                return [4 /*yield*/, Coupon_1["default"].findOne({
                        where: { code: couponCode.toUpperCase() }
                    })];
            case 16:
                coupon = _g.sent();
                if (!coupon) return [3 /*break*/, 18];
                couponId = coupon.id;
                // Incrementar uso do cupom
                return [4 /*yield*/, coupon.increment("usedCount")];
            case 17:
                // Incrementar uso do cupom
                _g.sent();
                _g.label = 18;
            case 18:
                companyData = {
                    name: resolvedCompanyName,
                    email: normalizedEmail,
                    phone: sanitizedPhone,
                    planId: resolvedPlanId,
                    status: resolvedStatus !== undefined ? resolvedStatus : true,
                    dueDate: resolvedDueDate,
                    recurrence: resolvedRecurrence,
                    document: document || "",
                    paymentMethod: "",
                    password: password,
                    companyUserName: resolvedUserName,
                    startWork: startWork,
                    endWork: endWork,
                    defaultTheme: "light",
                    defaultMenu: "closed",
                    allowGroup: false,
                    allHistoric: false,
                    userClosePendingTicket: "enabled",
                    showDashboard: "disabled",
                    defaultTicketsManagerWidth: 550,
                    allowRealTime: "disabled",
                    allowConnections: "disabled",
                    campaignsEnabled: resolvedCampaignsEnabled,
                    type: type || "pf",
                    segment: segment || "outros",
                    referredBy: referredByCompanyId,
                    couponId: couponId,
                    affiliateId: resolvedAffiliateId,
                    affiliateLinkId: resolvedAffiliateLinkId
                };
                return [4 /*yield*/, (0, CreateCompanyService_1["default"])(companyData)];
            case 19:
                user = _g.sent();
                if (!(affiliateCode && referredByCompanyId)) return [3 /*break*/, 23];
                return [4 /*yield*/, AffiliateLink_1["default"].findOne({
                        where: { code: affiliateCode.toUpperCase() }
                    })];
            case 20:
                affiliateLink = _g.sent();
                if (!affiliateLink) return [3 /*break*/, 23];
                // Incrementar signups no link
                return [4 /*yield*/, affiliateLink.increment("signups")];
            case 21:
                // Incrementar signups no link
                _g.sent();
                trackingData = affiliateLink.trackingData || {};
                today = new Date().toISOString().split('T')[0];
                if (!trackingData[today])
                    trackingData[today] = { clicks: 0, signups: 0 };
                trackingData[today].signups++;
                return [4 /*yield*/, affiliateLink.update({ trackingData: trackingData })];
            case 22:
                _g.sent();
                _g.label = 23;
            case 23:
                frontendUrl = process.env.FRONTEND_URL || "";
                planName = "Plano Padrão";
                _g.label = 24;
            case 24:
                _g.trys.push([24, 26, , 27]);
                return [4 /*yield*/, Plan_1["default"].findByPk(resolvedPlanId)];
            case 25:
                plan = _g.sent();
                if (plan) {
                    planName = plan.name;
                }
                return [3 /*break*/, 27];
            case 26:
                e_2 = _g.sent();
                console.log("Error fetching plan name");
                return [3 /*break*/, 27];
            case 27:
                appName = "Sistema";
                _g.label = 28;
            case 28:
                _g.trys.push([28, 30, , 31]);
                return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { companyId: 1, key: "appName" }
                    })];
            case 29:
                appNameSetting = _g.sent();
                if (appNameSetting === null || appNameSetting === void 0 ? void 0 : appNameSetting.value) {
                    appName = appNameSetting.value;
                }
                return [3 /*break*/, 31];
            case 30:
                e_3 = _g.sent();
                console.log("Error fetching appName");
                return [3 /*break*/, 31];
            case 31:
                messageVariables = {
                    nome: name || resolvedUserName,
                    email: normalizedEmail,
                    empresa: resolvedCompanyName,
                    telefone: sanitizedPhone,
                    plano: planName,
                    senha: password,
                    diasTeste: String(trialDays),
                    dataVencimento: dateToClient(date),
                    link: frontendUrl,
                    sistema: appName
                };
                welcomeEmailText = "";
                welcomeWhatsappText = "";
                _g.label = 32;
            case 32:
                _g.trys.push([32, 34, , 35]);
                return [4 /*yield*/, Setting_1["default"].findAll({
                        where: { companyId: 1, key: ["welcomeEmailText", "welcomeWhatsappText"] }
                    })];
            case 33:
                welcomeSettings = _g.sent();
                welcomeEmailText = ((_e = welcomeSettings.find(function (s) { return s.key === "welcomeEmailText"; })) === null || _e === void 0 ? void 0 : _e.value) || "";
                welcomeWhatsappText = ((_f = welcomeSettings.find(function (s) { return s.key === "welcomeWhatsappText"; })) === null || _f === void 0 ? void 0 : _f.value) || "";
                return [3 /*break*/, 35];
            case 34:
                e_4 = _g.sent();
                console.log("Error fetching welcome message settings");
                return [3 /*break*/, 35];
            case 35:
                _g.trys.push([35, 37, , 42]);
                emailBody = "";
                emailSubject = "Bem-vindo ao ".concat(appName, "!");
                if (welcomeEmailText) {
                    // Usa texto personalizado
                    emailBody = (0, SendMailWithSettings_1.replaceVariables)(welcomeEmailText, messageVariables);
                }
                else {
                    // Usa texto padrão
                    emailBody = "Ol\u00E1 ".concat(name, ", este \u00E9 um email sobre o cadastro da ").concat(resolvedCompanyName, "!<br><br>\n        Segue os dados da sua empresa (teste v\u00E1lido por ").concat(trialDays, " dias):<br><br>\n        Nome: ").concat(resolvedCompanyName, "<br>\n        Email: ").concat(normalizedEmail, "<br>\n        Senha: ").concat(password, "<br>\n        V\u00E1lido at\u00E9: ").concat(dateToClient(date)).concat(frontendUrl ? "<br><br>Link de acesso \u00E0 plataforma: <a href=\"".concat(frontendUrl, "\" target=\"_blank\">").concat(frontendUrl, "</a>") : "");
                }
                return [4 /*yield*/, (0, SendMailWithSettings_1.SendMailWithSettings)({
                        to: normalizedEmail,
                        subject: emailSubject,
                        html: emailBody.replace(/\n/g, '<br>')
                    })];
            case 36:
                _g.sent();
                console.log("Welcome email sent successfully");
                return [3 /*break*/, 42];
            case 37:
                error_2 = _g.sent();
                console.log('Não consegui enviar o email:', error_2);
                _g.label = 38;
            case 38:
                _g.trys.push([38, 40, , 41]);
                _email = {
                    to: normalizedEmail,
                    subject: "Login e senha da Empresa ".concat(resolvedCompanyName),
                    text: "Ol\u00E1 ".concat(name, ", este \u00E9 um email sobre o cadastro da ").concat(resolvedCompanyName, "!<br><br>\n          Segue os dados da sua empresa (teste v\u00E1lido por ").concat(trialDays, " dias):<br><br>\n          Nome: ").concat(resolvedCompanyName, "<br>\n          Email: ").concat(normalizedEmail, "<br>\n          Senha: ").concat(password, "<br>\n          V\u00E1lido at\u00E9: ").concat(dateToClient(date)).concat(frontendUrl ? "<br><br>Link de acesso \u00E0 plataforma: <a href=\"".concat(frontendUrl, "\" target=\"_blank\">").concat(frontendUrl, "</a>") : "")
                };
                return [4 /*yield*/, (0, SendMail_1.SendMail)(_email)];
            case 39:
                _g.sent();
                return [3 /*break*/, 41];
            case 40:
                fallbackError_1 = _g.sent();
                console.log('Fallback email também falhou');
                return [3 /*break*/, 41];
            case 41: return [3 /*break*/, 42];
            case 42:
                _g.trys.push([42, 47, , 48]);
                return [4 /*yield*/, (0, ShowCompanyService_1["default"])(1)];
            case 43:
                company = _g.sent();
                return [4 /*yield*/, (0, FindCompaniesWhatsappService_1["default"])(company.id)];
            case 44:
                whatsappCompany = _g.sent();
                firstWhatsapp = whatsappCompany.whatsapps[0];
                phoneJid = formatPhoneToWhatsappJid(phone);
                if (!((firstWhatsapp === null || firstWhatsapp === void 0 ? void 0 : firstWhatsapp.status) === "CONNECTED" &&
                    phoneJid)) return [3 /*break*/, 46];
                wbot = (0, wbot_1.getWbot)(firstWhatsapp.id);
                whatsappBody = "";
                if (welcomeWhatsappText) {
                    // Usa texto personalizado
                    whatsappBody = (0, SendMailWithSettings_1.replaceVariables)(welcomeWhatsappText, messageVariables);
                }
                else {
                    // Usa texto padrão
                    whatsappBody = "Ol\u00E1 ".concat(name, ", este \u00E9 uma mensagem sobre o cadastro da ").concat(resolvedCompanyName, "!\n\nTeste v\u00E1lido por ").concat(trialDays, " dias. Segue os dados da sua empresa:\n\nNome: ").concat(resolvedCompanyName, "\nEmail: ").concat(normalizedEmail, "\nSenha: ").concat(password, "\nV\u00E1lido at\u00E9: ").concat(dateToClient(date)).concat(frontendUrl ? "\n\nLink de acesso \u00E0 plataforma: ".concat(frontendUrl) : "");
                }
                sendOptions = { createChat: false };
                return [4 /*yield*/, wbot.sendMessage(phoneJid, { text: whatsappBody }, sendOptions)];
            case 45:
                _g.sent();
                console.log("Welcome WhatsApp sent successfully");
                _g.label = 46;
            case 46: return [3 /*break*/, 48];
            case 47:
                error_3 = _g.sent();
                console.log('Não consegui enviar a mensagem WhatsApp:', error_3);
                return [3 /*break*/, 48];
            case 48: return [2 /*return*/, res.status(200).json(user)];
            case 49:
                if (!companyUser) return [3 /*break*/, 51];
                return [4 /*yield*/, (0, CreateUserService_1["default"])({
                        email: email,
                        password: password,
                        name: name,
                        profile: profile,
                        companyId: companyUser,
                        queueIds: queueIds,
                        startWork: startWork,
                        endWork: endWork,
                        whatsappId: whatsappId,
                        allTicket: allTicket,
                        defaultTheme: defaultTheme,
                        defaultMenu: defaultMenu,
                        allowGroup: allowGroup,
                        allHistoric: allHistoric,
                        allUserChat: allUserChat,
                        userClosePendingTicket: userClosePendingTicket,
                        showDashboard: showDashboard,
                        defaultTicketsManagerWidth: defaultTicketsManagerWidth,
                        allowRealTime: allowRealTime,
                        allowConnections: allowConnections
                    })];
            case 50:
                user = _g.sent();
                io = (0, socket_1.getIO)();
                io.of(userCompanyId.toString())
                    .emit("company-".concat(userCompanyId, "-user"), {
                    action: "create",
                    user: user
                });
                return [2 /*return*/, res.status(200).json(user)];
            case 51: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
// export const store = async (req: Request, res: Response): Promise<Response> => {
//   const {
//     email,
//     password,
//     name,
//     profile,
//     companyId: bodyCompanyId,
//     queueIds
//   } = req.body;
//   let userCompanyId: number | null = null;
//   if (req.user !== undefined) {
//     const { companyId: cId } = req.user;
//     userCompanyId = cId;
//   }
//   if (
//     req.url === "/signup" &&
//     (await CheckSettingsHelper("userCreation")) === "disabled"
//   ) {
//     throw new AppError("ERR_USER_CREATION_DISABLED", 403);
//   } else if (req.url !== "/signup" && req.user.profile !== "admin") {
//     throw new AppError("ERR_NO_PERMISSION", 403);
//   }
//   const user = await CreateUserService({
//     email,
//     password,
//     name,
//     profile,
//     companyId: bodyCompanyId || userCompanyId,
//     queueIds
//   });
//   const io = getIO();
//   io.of(String(companyId))
//  .emit(`company-${userCompanyId}-user`, {
//     action: "create",
//     user
//   });
//   return res.status(200).json(user);
// };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ShowUserService_1["default"])(userId, companyId)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
        }
    });
}); };
exports.show = show;
var showEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                return [4 /*yield*/, (0, APIShowEmailUserService_1["default"])(email)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
        }
    });
}); };
exports.showEmail = showEmail;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, requestUserId, companyId, userId, userData, user, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // if (req.user.profile !== "admin") {
                //   throw new AppError("ERR_NO_PERMISSION", 403);
                // }
                if (process.env.DEMO === "ON") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                _a = req.user, requestUserId = _a.id, companyId = _a.companyId;
                userId = req.params.userId;
                userData = req.body;
                console.log("Backend received userData:", userData);
                console.log("allowContacts value:", userData.allowContacts);
                return [4 /*yield*/, (0, UpdateUserService_1["default"])({
                        userData: userData,
                        userId: userId,
                        companyId: companyId,
                        requestUserId: +requestUserId
                    })];
            case 1:
                user = _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-user"), {
                    action: "update",
                    user: user
                });
                return [2 /*return*/, res.status(200).json(user)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, companyId, id, profile, user, io;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.user, companyId = _a.companyId, id = _a.id, profile = _a.profile;
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                if (process.env.DEMO === "ON") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: userId }
                    })];
            case 1:
                user = _b.sent();
                if (!(companyId !== user.companyId)) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({ error: "Você não possui permissão para acessar este recurso!" })];
            case 2: return [4 /*yield*/, (0, DeleteUserService_1["default"])(userId, companyId)];
            case 3:
                _b.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-user"), {
                    action: "delete",
                    userId: userId
                });
                return [2 /*return*/, res.status(200).json({ message: "User deleted" })];
        }
    });
}); };
exports.remove = remove;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userCompanyId, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userCompanyId = req.user.companyId;
                return [4 /*yield*/, (0, SimpleListService_1["default"])({
                        companyId: userCompanyId
                    })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
        }
    });
}); };
exports.list = list;
var mediaUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, files, file, user, io, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                companyId = req.user.companyId;
                files = req.files;
                file = (0, lodash_1.head)(files);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1["default"].findByPk(userId)];
            case 2:
                user = _a.sent();
                user.profileImage = file.filename.replace('/', '-');
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, ShowUserService_1["default"])(userId, companyId)];
            case 4:
                user = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-user"), {
                    action: "update",
                    user: user
                });
                return [2 /*return*/, res.status(200).json({ user: user, message: "Imagem atualizada" })];
            case 5:
                err_1 = _a.sent();
                throw new AppError_1["default"](err_1.message);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.mediaUpload = mediaUpload;
var toggleChangeWidht = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, defaultTicketsManagerWidth, companyId, user, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                defaultTicketsManagerWidth = req.body.defaultTicketsManagerWidth;
                companyId = req.user.companyId;
                return [4 /*yield*/, (0, ToggleChangeWidthService_1["default"])({ userId: userId, defaultTicketsManagerWidth: defaultTicketsManagerWidth })];
            case 1:
                user = _a.sent();
                io = (0, socket_1.getIO)();
                io.of(String(companyId))
                    .emit("company-".concat(companyId, "-user"), {
                    action: "update",
                    user: user
                });
                return [2 /*return*/, res.status(200).json(user)];
        }
    });
}); };
exports.toggleChangeWidht = toggleChangeWidht;
var checkEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, existingUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.query.email;
                if (!email || typeof email !== "string") {
                    return [2 /*return*/, res.status(400).json({ error: "E-mail é obrigatório." })];
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { email: email.trim().toLowerCase() }
                    })];
            case 1:
                existingUser = _a.sent();
                return [2 /*return*/, res.status(200).json({ exists: !!existingUser })];
        }
    });
}); };
exports.checkEmail = checkEmail;
// ==================== 2FA Endpoints ====================
var setup2FA = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, secret, qrCodeUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                return [4 /*yield*/, User_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_NO_USER_FOUND", 404);
                }
                if (user.twoFactorEnabled) {
                    throw new AppError_1["default"]("2FA já está ativado para este usuário.", 400);
                }
                secret = speakeasy.generateSecret({
                    name: "AtendZappy (".concat(user.email, ")"),
                    issuer: "AtendZappy"
                });
                // Salvar secret temporariamente (ainda não confirmado)
                return [4 /*yield*/, user.update({ twoFactorSecret: secret.base32 })];
            case 2:
                // Salvar secret temporariamente (ainda não confirmado)
                _a.sent();
                return [4 /*yield*/, QRCode.toDataURL(secret.otpauth_url)];
            case 3:
                qrCodeUrl = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        secret: secret.base32,
                        qrCode: qrCodeUrl
                    })];
        }
    });
}); };
exports.setup2FA = setup2FA;
var confirm2FA = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, token, user, verified;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                token = req.body.token;
                return [4 /*yield*/, User_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_NO_USER_FOUND", 404);
                }
                if (!user.twoFactorSecret) {
                    throw new AppError_1["default"]("Configure o 2FA primeiro.", 400);
                }
                verified = speakeasy.totp.verify({
                    secret: user.twoFactorSecret,
                    encoding: "base32",
                    token: token,
                    window: 1
                });
                if (!verified) {
                    throw new AppError_1["default"]("Código inválido. Tente novamente.", 401);
                }
                return [4 /*yield*/, user.update({ twoFactorEnabled: true })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "2FA ativado com sucesso!" })];
        }
    });
}); };
exports.confirm2FA = confirm2FA;
var disable2FA = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, token, user, verified;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                token = req.body.token;
                return [4 /*yield*/, User_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_NO_USER_FOUND", 404);
                }
                if (!user.twoFactorEnabled) {
                    throw new AppError_1["default"]("2FA não está ativado.", 400);
                }
                verified = speakeasy.totp.verify({
                    secret: user.twoFactorSecret,
                    encoding: "base32",
                    token: token,
                    window: 1
                });
                if (!verified) {
                    throw new AppError_1["default"]("Código inválido.", 401);
                }
                return [4 /*yield*/, user.update({ twoFactorSecret: null, twoFactorEnabled: false })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "2FA desativado com sucesso!" })];
        }
    });
}); };
exports.disable2FA = disable2FA;
var adminDisable2FA = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, companyId, profile, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.user, companyId = _a.companyId, profile = _a.profile;
                if (profile !== "admin") {
                    throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                }
                return [4 /*yield*/, User_1["default"].findOne({
                        where: { id: userId, companyId: companyId }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new AppError_1["default"]("ERR_NO_USER_FOUND", 404);
                }
                return [4 /*yield*/, user.update({ twoFactorSecret: null, twoFactorEnabled: false })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "2FA desativado pelo administrador." })];
        }
    });
}); };
exports.adminDisable2FA = adminDisable2FA;
