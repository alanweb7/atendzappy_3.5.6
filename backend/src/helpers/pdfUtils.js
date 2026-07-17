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
exports.fetchPdfBufferFromUrl = exports.validateAndFixPdfBuffer = exports.decodeBase64IfPdf = void 0;
var axios_1 = __importDefault(require("axios"));
var looksLikePdfBuffer = function (buffer) {
    if (!buffer || buffer.length < 4)
        return false;
    return buffer.slice(0, 4).toString("utf-8") === "%PDF";
};
var decodeBase64IfPdf = function (buffer) {
    if (!buffer || buffer.length === 0)
        return buffer;
    if (looksLikePdfBuffer(buffer)) {
        return buffer;
    }
    var asString = buffer.toString("utf-8").trim();
    if (!asString)
        return buffer;
    var base64Candidate = asString.replace(/\s+/g, "");
    var base64Regex = /^[A-Za-z0-9+/=]+$/;
    if (!base64Regex.test(base64Candidate)) {
        return buffer;
    }
    try {
        var decoded = Buffer.from(base64Candidate, "base64");
        if (looksLikePdfBuffer(decoded)) {
            return decoded;
        }
    }
    catch (err) {
        console.error("[pdfUtils] Falha ao decodificar base64 para PDF:", err);
    }
    return buffer;
};
exports.decodeBase64IfPdf = decodeBase64IfPdf;
var validateAndFixPdfBuffer = function (buffer) {
    if (!buffer || buffer.length === 0) {
        throw new Error("Buffer do PDF está vazio");
    }
    // Verificar se é um PDF válido
    if (!looksLikePdfBuffer(buffer)) {
        console.error("[pdfUtils] Buffer não parece ser um PDF válido");
        throw new Error("Arquivo não é um PDF válido");
    }
    // Verificar tamanho mínimo (PDFs muito pequenos podem estar corrompidos)
    if (buffer.length < 100) {
        console.error("[pdfUtils] PDF muito pequeno, possivelmente corrompido");
        throw new Error("PDF muito pequeno ou corrompido");
    }
    console.log("[pdfUtils] PDF validado com sucesso: ".concat(buffer.length, " bytes"));
    return buffer;
};
exports.validateAndFixPdfBuffer = validateAndFixPdfBuffer;
var fetchPdfBufferFromUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, rawBuffer, normalizedBuffer, validatedBuffer, contentType, finalContentType, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log("[pdfUtils] Baixando PDF de: ".concat(url));
                return [4 /*yield*/, axios_1["default"].get(url, {
                        responseType: "arraybuffer",
                        timeout: 30000,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                            'Accept': 'application/pdf,*/*'
                        }
                    })];
            case 1:
                response = _b.sent();
                rawBuffer = Buffer.from(response.data);
                console.log("[pdfUtils] Buffer baixado: ".concat(rawBuffer.length, " bytes"));
                normalizedBuffer = (0, exports.decodeBase64IfPdf)(rawBuffer);
                validatedBuffer = (0, exports.validateAndFixPdfBuffer)(normalizedBuffer);
                contentType = (_a = response.headers) === null || _a === void 0 ? void 0 : _a["content-type"];
                finalContentType = typeof contentType === "string" && contentType.includes("pdf")
                    ? contentType
                    : "application/pdf";
                console.log("[pdfUtils] ContentType final: ".concat(finalContentType));
                return [2 /*return*/, {
                        buffer: validatedBuffer,
                        contentType: finalContentType
                    }];
            case 2:
                error_1 = _b.sent();
                console.error("[pdfUtils] Erro ao baixar PDF:", error_1.message);
                throw new Error("Falha ao baixar PDF: ".concat(error_1.message));
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchPdfBufferFromUrl = fetchPdfBufferFromUrl;
