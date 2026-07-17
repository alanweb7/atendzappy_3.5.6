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
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var CrmClientOwner_1 = __importDefault(require("../../models/CrmClientOwner"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var normalizePhone = function (phone) {
    if (!phone)
        return null;
    var digits = phone.replace(/\D/g, "");
    if (digits.length === 10 || digits.length === 11) {
        return digits.startsWith("55") ? digits : "55".concat(digits);
    }
    return digits || null;
};
var resolveOrCreateContact = function (companyId, name, phone, email) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedPhone, contact, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                normalizedPhone = normalizePhone(phone);
                if (!normalizedPhone) return [3 /*break*/, 4];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            number: normalizedPhone
                        }
                    })];
            case 1:
                _a = (_b.sent());
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            number: normalizedPhone.replace(/^55/, "")
                        }
                    })];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                contact = _a;
                _b.label = 4;
            case 4:
                if (!(!contact && email)) return [3 /*break*/, 6];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            email: email
                        }
                    })];
            case 5:
                contact = _b.sent();
                _b.label = 6;
            case 6:
                if (!(!contact && name && normalizedPhone)) return [3 /*break*/, 8];
                return [4 /*yield*/, Contact_1["default"].findOne({
                        where: {
                            companyId: companyId,
                            name: name,
                            number: normalizedPhone
                        }
                    })];
            case 7:
                contact = _b.sent();
                _b.label = 8;
            case 8:
                if (!(!contact && (normalizedPhone || email))) return [3 /*break*/, 10];
                console.log("📝 Criando novo contato para o cliente:", { name: name, phone: normalizedPhone, email: email });
                return [4 /*yield*/, Contact_1["default"].create({
                        name: name || "Contato Cliente",
                        number: normalizedPhone,
                        email: email || null,
                        companyId: companyId,
                        active: true,
                        disableBot: false
                    })];
            case 9:
                contact = _b.sent();
                console.log("✅ Contato criado com ID:", contact.id);
                _b.label = 10;
            case 10: return [2 /*return*/, contact === null || contact === void 0 ? void 0 : contact.id];
        }
    });
}); };
var CreateCrmClientService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, duplicateConditions, sanitizedPhone, Op, existingClient, duplicateField, sanitizedPhone, clientData, client, contactId, ownerUserId, ownerIds;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schema = Yup.object().shape({
                    companyId: Yup.number().required(),
                    type: Yup.string().oneOf(["pf", "pj"])["default"]("pf"),
                    name: Yup.string().required().min(2),
                    email: Yup.string().email().nullable(),
                    status: Yup.string()
                        .oneOf(["active", "inactive", "blocked"])["default"]("active"),
                    state: Yup.string().transform(function (value) { return value === "" ? null : value; }).length(2).nullable()
                });
                return [4 /*yield*/, schema.validate(data)];
            case 1:
                _b.sent();
                duplicateConditions = [];
                if (data.document) {
                    duplicateConditions.push({ document: data.document });
                }
                if (data.email) {
                    duplicateConditions.push({ email: data.email });
                }
                if (data.phone) {
                    sanitizedPhone = data.phone.replace(/\D/g, "");
                    if (sanitizedPhone) {
                        duplicateConditions.push({ phone: sanitizedPhone });
                    }
                }
                if (!(duplicateConditions.length > 0)) return [3 /*break*/, 3];
                Op = require("sequelize").Op;
                return [4 /*yield*/, CrmClient_1["default"].findOne({
                        where: (_a = {
                                companyId: data.companyId
                            },
                            _a[Op.or] = duplicateConditions,
                            _a)
                    })];
            case 2:
                existingClient = _b.sent();
                if (existingClient) {
                    duplicateField = "";
                    if (data.document && existingClient.document === data.document) {
                        duplicateField = "documento";
                    }
                    else if (data.email && existingClient.email === data.email) {
                        duplicateField = "email";
                    }
                    else if (data.phone) {
                        sanitizedPhone = data.phone.replace(/\D/g, "");
                        if (existingClient.phone === sanitizedPhone) {
                            duplicateField = "telefone";
                        }
                    }
                    throw new AppError_1["default"]("Cliente j\u00E1 cadastrado com este ".concat(duplicateField, " nesta empresa."));
                }
                _b.label = 3;
            case 3:
                clientData = __assign(__assign({}, data), { type: data.type || "pf", status: data.status || "active", phone: data.phone ? data.phone.replace(/\D/g, "") : undefined });
                return [4 /*yield*/, CrmClient_1["default"].create(clientData)];
            case 4:
                client = _b.sent();
                return [4 /*yield*/, resolveOrCreateContact(data.companyId, data.name, data.phone, data.email)];
            case 5:
                contactId = _b.sent();
                ownerUserId = data.ownerUserId || data.createdByUserId;
                ownerIds = data.ownerUserIds || (ownerUserId ? [ownerUserId] : []);
                if (!(ownerIds && ownerIds.length > 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, Promise.all(ownerIds.map(function (userId) {
                        return CrmClientOwner_1["default"].create({
                            clientId: client.id,
                            userId: userId
                        });
                    }))];
            case 6:
                _b.sent();
                // **ATUALIZAR CAMPO ownerUserId principal**
                return [4 /*yield*/, client.update({ ownerUserId: ownerUserId })];
            case 7:
                // **ATUALIZAR CAMPO ownerUserId principal**
                _b.sent();
                _b.label = 8;
            case 8:
                if (!contactId) return [3 /*break*/, 10];
                return [4 /*yield*/, client.update({ contactId: contactId })];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10:
                console.log("✅ Cliente criado com sucesso:", {
                    id: client.id,
                    name: client.name,
                    ownerUserId: client.ownerUserId,
                    contactId: client.contactId
                });
                return [2 /*return*/, client];
        }
    });
}); };
exports["default"] = CreateCrmClientService;
