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
exports.updatePassword = exports.deleteCertificate = exports.uploadCertificate = exports.getConfig = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var crypto_1 = __importDefault(require("crypto"));
var CompanyFiscalConfig_1 = __importDefault(require("../models/CompanyFiscalConfig"));
var Company_1 = __importDefault(require("../models/Company"));
var Plan_1 = __importDefault(require("../models/Plan"));
var logger_1 = __importDefault(require("../utils/logger"));
var ENCRYPTION_KEY = process.env.APP_KEY || "atendzappy-fiscal-key-32chars!!";
var IV_LENGTH = 16;
var encrypt = function (text) {
    var key = Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32));
    var iv = crypto_1["default"].randomBytes(IV_LENGTH);
    var cipher = crypto_1["default"].createCipheriv("aes-256-cbc", key, iv);
    var encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
var decrypt = function (text) {
    try {
        var key = Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32));
        var _a = text.split(":"), ivHex = _a[0], encryptedHex = _a[1];
        var iv = Buffer.from(ivHex, "hex");
        var encrypted = Buffer.from(encryptedHex, "hex");
        var decipher = crypto_1["default"].createDecipheriv("aes-256-cbc", key, iv);
        var decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString();
    }
    catch (_b) {
        return "";
    }
};
// GET /fiscal/config — retorna config + dados do plano
var getConfig = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, config, company, plan, err_1;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0:
                companyId = req.user.companyId;
                _o.label = 1;
            case 1:
                _o.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all([
                        CompanyFiscalConfig_1["default"].findOne({ where: { companyId: companyId } }),
                        Company_1["default"].findByPk(companyId, { include: [{ model: Plan_1["default"], as: "plan" }] })
                    ])];
            case 2:
                _a = _o.sent(), config = _a[0], company = _a[1];
                plan = company === null || company === void 0 ? void 0 : company.plan;
                return [2 /*return*/, res.json({
                        // Configuração do certificado
                        hasCertificate: !!((config === null || config === void 0 ? void 0 : config.certificatePath) && fs_1["default"].existsSync(config.certificatePath)),
                        certificateExpiry: (config === null || config === void 0 ? void 0 : config.certificateExpiry) || null,
                        isActive: (_b = config === null || config === void 0 ? void 0 : config.isActive) !== null && _b !== void 0 ? _b : true,
                        // Dados do plano
                        nfLimit: (_c = plan === null || plan === void 0 ? void 0 : plan.nfLimit) !== null && _c !== void 0 ? _c : 0,
                        nfBillingEnabled: (_d = plan === null || plan === void 0 ? void 0 : plan.nfBillingEnabled) !== null && _d !== void 0 ? _d : false,
                        nfPricePerExtra: (_e = plan === null || plan === void 0 ? void 0 : plan.nfPricePerExtra) !== null && _e !== void 0 ? _e : 0,
                        nfCurrentCount: (_f = plan === null || plan === void 0 ? void 0 : plan.nfCurrentCount) !== null && _f !== void 0 ? _f : 0,
                        nfLastResetDate: (_g = plan === null || plan === void 0 ? void 0 : plan.nfLastResetDate) !== null && _g !== void 0 ? _g : null,
                        // Extras acumulados
                        nfExtraCount: (_h = config === null || config === void 0 ? void 0 : config.nfExtraCount) !== null && _h !== void 0 ? _h : 0,
                        nfExtraTotal: (((_j = config === null || config === void 0 ? void 0 : config.nfExtraCount) !== null && _j !== void 0 ? _j : 0) * ((_k = plan === null || plan === void 0 ? void 0 : plan.nfPricePerExtra) !== null && _k !== void 0 ? _k : 0)),
                        // Disponível
                        nfAvailable: Math.max(0, ((_l = plan === null || plan === void 0 ? void 0 : plan.nfLimit) !== null && _l !== void 0 ? _l : 0) - ((_m = plan === null || plan === void 0 ? void 0 : plan.nfCurrentCount) !== null && _m !== void 0 ? _m : 0))
                    })];
            case 3:
                err_1 = _o.sent();
                logger_1["default"].error("[Fiscal] getConfig error:", err_1.message);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao buscar configuração fiscal" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getConfig = getConfig;
// POST /fiscal/certificate — upload do certificado A1
var uploadCertificate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, password, file, destDir, destPath, encryptedPassword, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                password = req.body.password;
                file = req.file;
                if (!file)
                    return [2 /*return*/, res.status(400).json({ error: "Nenhum arquivo enviado" })];
                if (!password)
                    return [2 /*return*/, res.status(400).json({ error: "Senha do certificado é obrigatória" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                destDir = path_1["default"].resolve("public", "company".concat(companyId), "fiscal");
                if (!fs_1["default"].existsSync(destDir))
                    fs_1["default"].mkdirSync(destDir, { recursive: true });
                destPath = path_1["default"].join(destDir, "certificate_".concat(companyId, ".pfx"));
                // Move o arquivo para o destino final
                fs_1["default"].copyFileSync(file.path, destPath);
                fs_1["default"].unlinkSync(file.path);
                encryptedPassword = encrypt(password);
                return [4 /*yield*/, CompanyFiscalConfig_1["default"].upsert({
                        companyId: companyId,
                        certificatePath: destPath,
                        certificatePassword: encryptedPassword,
                        certificateExpiry: null,
                        isActive: true
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Certificado enviado com sucesso" })];
            case 3:
                err_2 = _a.sent();
                logger_1["default"].error("[Fiscal] uploadCertificate error:", err_2.message);
                return [2 /*return*/, res.status(500).json({ error: "Erro ao salvar certificado" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadCertificate = uploadCertificate;
// DELETE /fiscal/certificate — remove o certificado
var deleteCertificate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, config, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, CompanyFiscalConfig_1["default"].findOne({ where: { companyId: companyId } })];
            case 2:
                config = _a.sent();
                if ((config === null || config === void 0 ? void 0 : config.certificatePath) && fs_1["default"].existsSync(config.certificatePath)) {
                    fs_1["default"].unlinkSync(config.certificatePath);
                }
                return [4 /*yield*/, CompanyFiscalConfig_1["default"].update({ certificatePath: null, certificatePassword: null, certificateExpiry: null }, { where: { companyId: companyId } })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Certificado removido" })];
            case 4:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao remover certificado" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteCertificate = deleteCertificate;
// PUT /fiscal/password — atualiza apenas a senha
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, password, encryptedPassword, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                password = req.body.password;
                if (!password)
                    return [2 /*return*/, res.status(400).json({ error: "Senha obrigatória" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                encryptedPassword = encrypt(password);
                return [4 /*yield*/, CompanyFiscalConfig_1["default"].upsert({ companyId: companyId, certificatePassword: encryptedPassword })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ message: "Senha atualizada" })];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: "Erro ao atualizar senha" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
