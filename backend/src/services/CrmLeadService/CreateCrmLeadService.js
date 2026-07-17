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
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var CrmLead_1 = __importDefault(require("../../models/CrmLead"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var syncLeadToClient_1 = __importDefault(require("./helpers/syncLeadToClient"));
var normalizeNumber = function (phone) {
    if (!phone)
        return null;
    var digits = phone.replace(/\D/g, "");
    if (digits.length === 10 || digits.length === 11) {
        return digits.startsWith("55") ? digits : "55".concat(digits);
    }
    return digits || null;
};
var resolveContactId = function (companyId, providedContactId, phone, name, email) { return __awaiter(void 0, void 0, void 0, function () {
    var contact_1, normalizedPhone, contact, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!providedContactId) return [3 /*break*/, 2];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: { id: providedContactId, companyId: companyId }
                    })];
            case 1:
                contact_1 = _b.sent();
                if (!contact_1) {
                    throw new AppError_1["default"]("Contato informado não encontrado para esta empresa.");
                }
                return [2 /*return*/, contact_1.id];
            case 2:
                normalizedPhone = normalizeNumber(phone);
                if (!normalizedPhone) {
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            number: normalizedPhone
                        }
                    })];
            case 3:
                _a = (_b.sent());
                if (_a) return [3 /*break*/, 5];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            number: normalizedPhone.replace(/^55/, "")
                        }
                    })];
            case 4:
                _a = (_b.sent());
                _b.label = 5;
            case 5:
                contact = _a;
                if (!(!contact && email)) return [3 /*break*/, 7];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            email: email
                        }
                    })];
            case 6:
                contact = _b.sent();
                _b.label = 7;
            case 7:
                if (!(!contact && name)) return [3 /*break*/, 9];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            name: name,
                            number: normalizedPhone
                        }
                    })];
            case 8:
                contact = _b.sent();
                _b.label = 9;
            case 9:
                if (!!contact) return [3 /*break*/, 11];
                console.log("📝 Criando novo contato para o lead:", { name: name, phone: normalizedPhone, email: email });
                return [4 /*yield*/, Contact_1["default"].create({
                        name: name || "Contato Lead",
                        number: normalizedPhone,
                        email: email || null,
                        companyId: companyId,
                        active: true,
                        disableBot: false
                    })];
            case 10:
                contact = _b.sent();
                console.log("✅ Contato criado com ID:", contact.id);
                _b.label = 11;
            case 11: return [2 /*return*/, contact.id];
        }
    });
}); };
var resolvePrimaryTicketId = function (companyId, primaryTicketId) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!primaryTicketId)
                    return [2 /*return*/, undefined];
                return [4 /*yield*/, Ticket_1["default"].findOne({
                        where: { id: primaryTicketId, companyId: companyId }
                    })];
            case 1:
                ticket = _a.sent();
                if (!ticket) {
                    throw new AppError_1["default"]("Ticket informado não encontrado para esta empresa.");
                }
                return [2 /*return*/, ticket.id];
        }
    });
}); };
var CreateCrmLeadService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, existingLead, contactId, primaryTicketId, enrichedData, score, notes, insights, ownerUserId, lead;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                schema = Yup.object().shape({
                    companyId: Yup.number().required(),
                    name: Yup.string().required().min(2),
                    email: Yup.string().email().nullable(),
                    phone: Yup.string().nullable(),
                    status: Yup.string()
                        .oneOf(["new", "contacted", "qualified", "unqualified", "converted", "lost"])["default"]("new"),
                    leadStatus: Yup.string()["default"]("novo").nullable(),
                    score: Yup.number().min(0)["default"](0),
                    temperature: Yup.string().oneOf([null, "frio", "morno", "quente"]).nullable(),
                    contactId: Yup.number().nullable(),
                    primaryTicketId: Yup.number().nullable()
                });
                return [4 /*yield*/, schema.validate(data)];
            case 1:
                _c.sent();
                if (!data.email) return [3 /*break*/, 3];
                return [4 /*yield*/, CrmLead_1["default"].findOne({
                        where: {
                            companyId: data.companyId,
                            email: data.email
                        }
                    })];
            case 2:
                existingLead = _c.sent();
                if (existingLead) {
                    throw new AppError_1["default"]("Lead já cadastrado com esse e-mail para esta empresa.");
                }
                _c.label = 3;
            case 3: return [4 /*yield*/, resolveContactId(data.companyId, data.contactId, data.phone, data.name, data.email)];
            case 4:
                contactId = _c.sent();
                return [4 /*yield*/, resolvePrimaryTicketId(data.companyId, data.primaryTicketId)];
            case 5:
                primaryTicketId = _c.sent();
                enrichedData = __assign({}, data);
                score = data.score || 0;
                notes = data.notes || "";
                // **GARANTE CAMPOS SOURCE/CAMPAIGN/MEDIUM SEJAM PREENCHIDOS**
                if (!enrichedData.source || enrichedData.source === '') {
                    enrichedData.source = ((_a = data.adMetadata) === null || _a === void 0 ? void 0 : _a.platform) || 'Facebook/Instagram Ads';
                }
                if (!enrichedData.campaign || enrichedData.campaign === '') {
                    enrichedData.campaign = ((_b = data.adMetadata) === null || _b === void 0 ? void 0 : _b.adTitle) || 'Anúncio Patrocinado';
                }
                if (!enrichedData.medium || enrichedData.medium === '') {
                    enrichedData.medium = 'paid_social';
                }
                if (data.adMetadata) {
                    // Aumenta score baseado na qualidade do anúncio
                    if (data.adMetadata.adTitle && data.adMetadata.adDescription) {
                        score = Math.min(score + 20, 100);
                    }
                    // Força sobreescrever com dados do anúncio se existirem
                    if (data.adMetadata.platform) {
                        enrichedData.source = data.adMetadata.platform;
                    }
                    if (data.adMetadata.adTitle) {
                        enrichedData.campaign = data.adMetadata.adTitle;
                    }
                    insights = "\n\n\uD83D\uDCCA Insights do An\u00FAncio:\n" +
                        "\u2022 Plataforma: ".concat(data.adMetadata.platform, "\n") +
                        "\u2022 T\u00EDtulo: ".concat(data.adMetadata.adTitle, "\n") +
                        "\u2022 Descri\u00E7\u00E3o: ".concat(data.adMetadata.adDescription, "\n") +
                        "\u2022 Tracking: ".concat(data.adMetadata.trackingUrl, "\n") +
                        "\u2022 Tracking ID: ".concat(data.adMetadata.trackingId);
                    notes = notes + insights;
                }
                ownerUserId = data.ownerUserId || data.createdByUserId;
                return [4 /*yield*/, CrmLead_1["default"].create(__assign(__assign({}, enrichedData), { contactId: contactId, primaryTicketId: primaryTicketId, leadStatus: data.leadStatus || "novo", score: score, notes: notes, lastActivityAt: data.lastActivityAt || new Date(), ownerUserId: ownerUserId // **VINCULAÇÃO AUTOMÁTICA**
                     }))];
            case 6:
                lead = _c.sent();
                console.log("✅ Lead criado com sucesso:", {
                    id: lead.id,
                    name: lead.name,
                    ownerUserId: lead.ownerUserId,
                    contactId: lead.contactId
                });
                if (!(lead.status === "converted" || lead.leadStatus === "convertido")) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, syncLeadToClient_1["default"])(lead)];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8: return [2 /*return*/, lead];
        }
    });
}); };
exports["default"] = CreateCrmLeadService;
