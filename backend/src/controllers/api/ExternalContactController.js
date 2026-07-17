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
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ListContactsService_1 = __importDefault(require("../../services/ContactServices/ListContactsService"));
var ShowContactService_1 = __importDefault(require("../../services/ContactServices/ShowContactService"));
var CreateContactService_1 = __importDefault(require("../../services/ContactServices/CreateContactService"));
var UpdateContactService_1 = __importDefault(require("../../services/ContactServices/UpdateContactService"));
var DeleteContactService_1 = __importDefault(require("../../services/ContactServices/DeleteContactService"));
var triggerExternalWebhook_1 = __importDefault(require("../../services/ExternalWebhook/triggerExternalWebhook"));
var ensureExternalAuth = function (req) {
    if (!req.externalAuth) {
        throw new AppError_1["default"]("ERR_EXTERNAL_AUTH_REQUIRED", 401);
    }
    return req.externalAuth;
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, searchParam, pageNumber, limit, isGroup, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber, limit = _a.limit, isGroup = _a.isGroup;
                return [4 /*yield*/, (0, ListContactsService_1["default"])({
                        companyId: companyId,
                        searchParam: searchParam,
                        pageNumber: pageNumber ? Number(pageNumber) : undefined,
                        limit: limit ? Number(limit) : undefined,
                        isGroup: isGroup
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = ensureExternalAuth(req).companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, ShowContactService_1["default"])(id, companyId)];
            case 1:
                contact = _a.sent();
                return [2 /*return*/, res.json(contact)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, data, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                data = req.body;
                return [4 /*yield*/, (0, CreateContactService_1["default"])(__assign(__assign({}, data), { companyId: externalAuth.companyId }))];
            case 1:
                contact = _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "contact.created",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            contact: contact
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).json(contact)];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id, data, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                data = req.body;
                return [4 /*yield*/, (0, UpdateContactService_1["default"])({
                        contactData: data,
                        contactId: id,
                        companyId: externalAuth.companyId
                    })];
            case 1:
                contact = _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "contact.updated",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            contact: contact
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json(contact)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var externalAuth, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                externalAuth = ensureExternalAuth(req);
                id = req.params.id;
                return [4 /*yield*/, (0, ShowContactService_1["default"])(id, externalAuth.companyId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, DeleteContactService_1["default"])(id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, triggerExternalWebhook_1["default"])({
                        url: externalAuth.webhookUrl,
                        secret: externalAuth.webhookSecret,
                        event: "contact.deleted",
                        data: {
                            apiKeyId: externalAuth.apiKeyId,
                            contactId: Number(id)
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
