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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.buildKnowledgeBasePromptSection = exports.buildNamedKnowledgeBasesSection = exports.processKnowledgeBaseItems = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var crypto_1 = require("crypto");
var axios_1 = __importDefault(require("axios"));
var node_cache_1 = __importDefault(require("node-cache"));
// Pacotes sem typings oficiais
// eslint-disable-next-line @typescript-eslint/no-var-requires
var getLinkPreview = require("link-preview-js").getLinkPreview;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var Tesseract = require("tesseract.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var cheerio = require("cheerio");
var logger_1 = __importDefault(require("../../utils/logger"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var pdfParse = require("pdf-parse");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var Jimp = require("jimp");
var knowledgeCache = new node_cache_1["default"]({
    stdTTL: 60 * 30,
    checkperiod: 120,
    maxKeys: 500
});
var CACHE_VERSION = "kb_v3";
var PUBLIC_ROOT = path_1["default"].resolve(__dirname, "..", "..", "..", "public");
var OCR_LANGUAGES = process.env.AI_KNOWLEDGE_BASE_OCR_LANGS || "por+eng";
var LINK_REQUEST_HEADERS = {
    "user-agent": "Mozilla/5.0 (compatible; KnowledgeBaseBot/1.0)",
    accept: "text/html,application/xhtml+xml"
};
var normalizeWhitespace = function (text) {
    return (text || "")
        .replace(/\r/g, " ")
        .replace(/\t/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
};
var truncateText = function (text, limit) {
    if (!text)
        return "";
    if (text.length <= limit)
        return text;
    return "".concat(text.slice(0, limit), "... [trecho truncado]");
};
var extractTextFromHtml = function (html) {
    if (!html)
        return "";
    var $ = cheerio.load(html);
    ["script", "style", "noscript"].forEach(function (selector) { return $(selector).remove(); });
    var text = $("body").text();
    return normalizeWhitespace(text);
};
var fetchLinkFullText = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, extracted, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get(url, {
                        headers: LINK_REQUEST_HEADERS,
                        responseType: "text",
                        timeout: 15000,
                        maxRedirects: 5
                    })];
            case 1:
                response = _a.sent();
                if (typeof response.data !== "string") {
                    return [2 /*return*/, null];
                }
                extracted = extractTextFromHtml(response.data);
                return [2 /*return*/, extracted || null];
            case 2:
                error_1 = _a.sent();
                logger_1["default"].error("[AI][KnowledgeBase] Erro ao baixar conte\u00FAdo do link (".concat(url, "):"), error_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var isHttpUrl = function (value) {
    if (!value)
        return false;
    return value.startsWith("http://") || value.startsWith("https://");
};
var resolveLocalPath = function (reference, companyId) {
    if (!reference)
        return null;
    var sanitized = reference.replace(/^\/+/, "").replace(/^public\//i, "");
    var directCandidate = path_1["default"].join(PUBLIC_ROOT, sanitized);
    if (fs_1["default"].existsSync(directCandidate)) {
        return directCandidate;
    }
    if (!sanitized.startsWith("uploads/")) {
        var uploadsCandidate = path_1["default"].join(PUBLIC_ROOT, "uploads", sanitized);
        if (fs_1["default"].existsSync(uploadsCandidate)) {
            return uploadsCandidate;
        }
    }
    if (companyId) {
        var companyCandidate = path_1["default"].join(PUBLIC_ROOT, "company".concat(companyId), sanitized);
        if (fs_1["default"].existsSync(companyCandidate)) {
            return companyCandidate;
        }
    }
    return null;
};
var downloadFromUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"].get(url, { responseType: "arraybuffer" })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, Buffer.from(response.data)];
        }
    });
}); };
var loadBufferForItem = function (item, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var source, error_2, localPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                source = item.url || item.path;
                if (!source)
                    return [2 /*return*/, null];
                if (!isHttpUrl(source)) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, downloadFromUrl(source)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                logger_1["default"].error("[AI][KnowledgeBase] Falha ao baixar arquivo remoto (".concat(source, "):"), error_2);
                return [2 /*return*/, null];
            case 4:
                localPath = resolveLocalPath(source, companyId);
                if (!localPath) {
                    return [2 /*return*/, null];
                }
                try {
                    return [2 /*return*/, fs_1["default"].readFileSync(localPath)];
                }
                catch (error) {
                    logger_1["default"].error("[AI][KnowledgeBase] Falha ao ler arquivo local (".concat(localPath, "):"), error);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
var inferType = function (item) {
    if (item === null || item === void 0 ? void 0 : item.type)
        return item.type;
    var reference = "".concat((item === null || item === void 0 ? void 0 : item.mimeType) || "", " ").concat((item === null || item === void 0 ? void 0 : item.title) || "", " ").concat((item === null || item === void 0 ? void 0 : item.path) || "", " ").concat((item === null || item === void 0 ? void 0 : item.url) || "").toLowerCase();
    if (reference.includes("pdf") || /\.pdf($|\?)/.test(reference))
        return "pdf";
    if (reference.includes("image") || /\.(png|jpe?g|gif|bmp|webp|svg)($|\?)/.test(reference))
        return "image";
    if (reference.includes("http://") || reference.includes("https://"))
        return "link";
    return "link";
};
var processSpreadsheetItem = function (item, options) { return __awaiter(void 0, void 0, void 0, function () {
    var spreadsheetId, tokenId, sheetName, meta, CompanyGoogleSheetsToken, google, CheckCompanySetting, token, _a, clientId, clientSecret, redirectUri, sid, ss, _b, oauth2Client, sheetsApi, data, rows, headers_1, dataRows, lines, summary, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 11, , 12]);
                spreadsheetId = item.url;
                if (!spreadsheetId || !options.companyId)
                    return [2 /*return*/, buildFallbackEntry(item)];
                tokenId = void 0;
                sheetName = "Plan1";
                try {
                    meta = JSON.parse(item.description || "{}");
                    tokenId = meta.tokenId;
                    sheetName = meta.sheetName || "Plan1";
                }
                catch ( /* usa defaults */_d) { /* usa defaults */ }
                CompanyGoogleSheetsToken = require("../../models/CompanyGoogleSheetsToken")["default"];
                google = require("googleapis").google;
                CheckCompanySetting = require("../../helpers/CheckSettings").CheckCompanySetting;
                if (!tokenId) return [3 /*break*/, 2];
                return [4 /*yield*/, CompanyGoogleSheetsToken.findOne({ where: { id: tokenId, companyId: options.companyId } })];
            case 1:
                _a = _c.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, CompanyGoogleSheetsToken.findOne({ where: { companyId: options.companyId } })];
            case 3:
                _a = _c.sent();
                _c.label = 4;
            case 4:
                token = _a;
                if (!token)
                    return [2 /*return*/, buildFallbackEntry(item)];
                clientId = process.env.GOOGLE_CLIENT_ID;
                clientSecret = process.env.GOOGLE_CLIENT_SECRET;
                redirectUri = process.env.GOOGLE_SHEETS_REDIRECT_URI || "".concat(process.env.BACKEND_URL, "/google-sheets/oauth-callback");
                _c.label = 5;
            case 5:
                _c.trys.push([5, 8, , 9]);
                return [4 /*yield*/, CheckCompanySetting(options.companyId, "googleClientId", "")];
            case 6:
                sid = _c.sent();
                return [4 /*yield*/, CheckCompanySetting(options.companyId, "googleClientSecret", "")];
            case 7:
                ss = _c.sent();
                if (sid)
                    clientId = sid;
                if (ss)
                    clientSecret = ss;
                return [3 /*break*/, 9];
            case 8:
                _b = _c.sent();
                return [3 /*break*/, 9];
            case 9:
                oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
                oauth2Client.setCredentials({ access_token: token.accessToken, refresh_token: token.refreshToken });
                sheetsApi = google.sheets({ version: "v4", auth: oauth2Client });
                return [4 /*yield*/, sheetsApi.spreadsheets.values.get({
                        spreadsheetId: spreadsheetId,
                        range: "".concat(sheetName, "!A1:Z500")
                    })];
            case 10:
                data = (_c.sent()).data;
                rows = data.values || [];
                if (!rows.length)
                    return [2 /*return*/, buildFallbackEntry(item)];
                headers_1 = rows[0];
                dataRows = rows.slice(1);
                lines = dataRows.map(function (row, i) {
                    var pairs = headers_1.map(function (h, ci) { return "".concat(h, ": ").concat(row[ci] || ""); })
                        .filter(function (p) { return !p.endsWith(": "); })
                        .join(" | ");
                    return "Linha ".concat(i + 1, ": ").concat(pairs);
                });
                summary = "Planilha \"".concat(item.title || spreadsheetId, "\" (aba: ").concat(sheetName, ")\n") +
                    "Colunas: ".concat(headers_1.join(", "), "\n\n") +
                    truncateText(lines.join("\n"), 4000);
                return [2 /*return*/, {
                        id: item.id,
                        type: "spreadsheet",
                        title: item.title || spreadsheetId,
                        source: "https://docs.google.com/spreadsheets/d/".concat(spreadsheetId),
                        summary: summary,
                        metadata: { rows: dataRows.length, columns: headers_1.length, sheetName: sheetName }
                    }];
            case 11:
                err_1 = _c.sent();
                logger_1["default"].error("[AI][KnowledgeBase] Erro ao processar planilha (".concat(item.title || item.url, "):"), err_1.message);
                return [2 /*return*/, null];
            case 12: return [2 /*return*/];
        }
    });
}); };
var buildCacheKey = function (item, type, signature) {
    var _a;
    var parts = [
        CACHE_VERSION,
        type,
        item.id || "",
        item.path || "",
        item.url || "",
        item.title || "",
        item.updatedAt || "",
        ((_a = item.size) === null || _a === void 0 ? void 0 : _a.toString()) || "",
        signature || ""
    ];
    var hash = (0, crypto_1.createHash)("md5").update(parts.join("|")).digest("hex");
    return "kb:".concat(hash);
};
var computeItemSignature = function (item, type, companyId) {
    var signatureParts = [];
    if (item.updatedAt)
        signatureParts.push(String(item.updatedAt));
    if (item.size)
        signatureParts.push(String(item.size));
    if (item.mimeType)
        signatureParts.push(item.mimeType);
    var source = item.url || item.path;
    var isRemote = source ? isHttpUrl(source) : false;
    if (!isRemote && source) {
        var localPath = resolveLocalPath(source, companyId);
        if (localPath) {
            try {
                var stats = fs_1["default"].statSync(localPath);
                signatureParts.push(String(stats.mtimeMs), String(stats.size));
            }
            catch (error) {
                logger_1["default"].warn("[AI][KnowledgeBase] N\u00E3o foi poss\u00EDvel ler metadata para cache (".concat(localPath, "):"), (error === null || error === void 0 ? void 0 : error.message) || error);
            }
        }
    }
    if (type === "link" && item.description) {
        signatureParts.push(item.description);
    }
    return signatureParts.length ? signatureParts.join("|") : null;
};
var buildFallbackEntry = function (item) { return ({
    id: item.id,
    type: inferType(item),
    title: item.title,
    source: item.url || item.path,
    summary: "Conte\u00FAdo dispon\u00EDvel em ".concat(item.url || item.path || "origem desconhecida", ".")
}); };
var processPdfItem = function (item, buffer, options) { return __awaiter(void 0, void 0, void 0, function () {
    var data, sanitizedText, maxChars, truncated, error_3;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pdfParse(buffer)];
            case 1:
                data = _d.sent();
                sanitizedText = normalizeWhitespace((data === null || data === void 0 ? void 0 : data.text) || "");
                if (!sanitizedText) {
                    return [2 /*return*/, {
                            id: item.id,
                            type: "pdf",
                            title: item.title,
                            source: item.url || item.path,
                            summary: "PDF disponível, mas não foi possível extrair o texto."
                        }];
                }
                maxChars = (_a = options.maxPdfCharacters) !== null && _a !== void 0 ? _a : 4000;
                truncated = truncateText(sanitizedText, maxChars);
                return [2 /*return*/, {
                        id: item.id,
                        type: "pdf",
                        title: item.title,
                        source: item.url || item.path,
                        summary: truncated,
                        metadata: {
                            pages: data.numpages,
                            author: (_b = data.info) === null || _b === void 0 ? void 0 : _b.Author,
                            keywords: (_c = data.info) === null || _c === void 0 ? void 0 : _c.Keywords
                        }
                    }];
            case 2:
                error_3 = _d.sent();
                logger_1["default"].error("[AI][KnowledgeBase] Erro ao extrair PDF (".concat(item.title || item.path, "):"), error_3);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var describeImageItem = function (item, buffer, options) { return __awaiter(void 0, void 0, void 0, function () {
    var image, _a, width, height, sampleColor, rgba, colorHex, ocrText, ocrConfidence, preprocessed, result, error_4, summaryParts, truncated, summary, error_5;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 7, , 8]);
                return [4 /*yield*/, Jimp.read(buffer)];
            case 1:
                image = _e.sent();
                _a = image.bitmap, width = _a.width, height = _a.height;
                sampleColor = image.getPixelColor(Math.max(0, Math.floor(width / 2)), Math.max(0, Math.floor(height / 2)));
                rgba = Jimp.intToRGBA(sampleColor);
                colorHex = [rgba.r, rgba.g, rgba.b]
                    .map(function (value) { return value.toString(16).padStart(2, "0"); })
                    .join("")
                    .toUpperCase();
                ocrText = "";
                ocrConfidence = void 0;
                _e.label = 2;
            case 2:
                _e.trys.push([2, 5, , 6]);
                return [4 /*yield*/, image
                        .clone()
                        .resize(Math.min(width, 1200), Jimp.AUTO)
                        .greyscale()
                        .contrast(0.5)
                        .normalize()
                        .getBufferAsync(Jimp.MIME_PNG)];
            case 3:
                preprocessed = _e.sent();
                return [4 /*yield*/, Tesseract.recognize(preprocessed, OCR_LANGUAGES)];
            case 4:
                result = _e.sent();
                ocrText = normalizeWhitespace(((_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.text) || "");
                ocrConfidence = (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.confidence;
                return [3 /*break*/, 6];
            case 5:
                error_4 = _e.sent();
                logger_1["default"].warn("[AI][KnowledgeBase] OCR falhou (".concat(item.title || item.path || item.url || "imagem", "):"), (error_4 === null || error_4 === void 0 ? void 0 : error_4.message) || error_4);
                return [3 /*break*/, 6];
            case 6:
                summaryParts = [
                    "Imagem (".concat(width, "x").concat(height, "px). Cor aproximada no centro: #").concat(colorHex, ".")
                ];
                if (ocrText) {
                    truncated = truncateText(ocrText, (_d = options.maxImageCharacters) !== null && _d !== void 0 ? _d : 800);
                    summaryParts.push("Conte\u00FAdo detectado na imagem: ".concat(truncated));
                }
                else {
                    summaryParts.push("Não foi possível extrair texto da imagem automaticamente. Use a referência visual se precisar.");
                }
                summary = summaryParts.join("\n");
                return [2 /*return*/, {
                        id: item.id,
                        type: "image",
                        title: item.title,
                        source: item.url || item.path,
                        summary: summary,
                        metadata: {
                            width: width,
                            height: height,
                            dominantColor: "#".concat(colorHex),
                            ocrConfidence: ocrConfidence
                        }
                    }];
            case 7:
                error_5 = _e.sent();
                logger_1["default"].error("[AI][KnowledgeBase] Erro ao processar imagem (".concat(item.title || item.path, "):"), error_5);
                return [2 /*return*/, null];
            case 8: return [2 /*return*/];
        }
    });
}); };
var summarizeLinkItem = function (item, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullText, preview, maxChars, summaryParts, previewObj, details, error_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!item.url) {
                    return [2 /*return*/, null];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all([
                        fetchLinkFullText(item.url),
                        getLinkPreview(item.url, {
                            headers: {
                                "user-agent": "Mozilla/5.0 (compatible; KnowledgeBaseBot/1.0)"
                            }
                        })
                    ])];
            case 2:
                _a = _c.sent(), fullText = _a[0], preview = _a[1];
                maxChars = (_b = options.maxLinkCharacters) !== null && _b !== void 0 ? _b : 1000;
                summaryParts = [];
                if (typeof preview === "string") {
                    summaryParts.push(truncateText(preview, maxChars));
                }
                else {
                    previewObj = preview;
                    details = [
                        previewObj.title ? "T\u00EDtulo: ".concat(previewObj.title) : null,
                        previewObj.siteName ? "Site: ".concat(previewObj.siteName) : null,
                        previewObj.description ? "Descri\u00E7\u00E3o: ".concat(previewObj.description) : null,
                        previewObj.mediaType ? "Tipo de m\u00EDdia: ".concat(previewObj.mediaType) : null
                    ]
                        .filter(Boolean)
                        .join("\n");
                    if (details) {
                        summaryParts.push(truncateText(details, maxChars));
                    }
                }
                if (fullText) {
                    summaryParts.push("Conte\u00FAdo extra\u00EDdo: ".concat(truncateText(fullText, maxChars)));
                }
                if (!summaryParts.length) {
                    summaryParts.push("Link dispon\u00EDvel em ".concat(item.url, "."));
                }
                return [2 /*return*/, {
                        id: item.id,
                        type: "link",
                        title: item.title || (typeof preview === "string" ? item.url : preview === null || preview === void 0 ? void 0 : preview.title),
                        source: item.url,
                        summary: summaryParts.join("\n")
                    }];
            case 3:
                error_6 = _c.sent();
                logger_1["default"].error("[AI][KnowledgeBase] Erro ao resumir link (".concat(item.url, "):"), error_6);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var processKnowledgeBaseItems = function (items, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var results, _i, items_1, item, type, signature, cacheKey, cached, cachedPreview, processed, identifier, buffer, buffer, summaryPreview;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Array.isArray(items) || items.length === 0) {
                        return [2 /*return*/, []];
                    }
                    results = [];
                    _i = 0, items_1 = items;
                    _a.label = 1;
                case 1:
                    if (!(_i < items_1.length)) return [3 /*break*/, 15];
                    item = items_1[_i];
                    if (!item)
                        return [3 /*break*/, 14];
                    type = inferType(item);
                    signature = computeItemSignature(item, type, options.companyId);
                    cacheKey = buildCacheKey(item, type, signature);
                    cached = knowledgeCache.get(cacheKey);
                    if (cached) {
                        cachedPreview = normalizeWhitespace(cached.summary || "").slice(0, 160);
                        logger_1["default"].info("[AI][KnowledgeBase] Item recuperado do cache (".concat(cached.type.toUpperCase(), " - ").concat(cached.title || cached.source || cached.id || "sem identificação", "). Trecho: ").concat(cachedPreview).concat(cached.summary.length > 160 ? "..." : ""));
                        results.push(cached);
                        return [3 /*break*/, 14];
                    }
                    processed = null;
                    identifier = item.title || item.url || item.path || item.id || "sem identificação";
                    logger_1["default"].info("[AI][KnowledgeBase] Iniciando processamento ".concat(type.toUpperCase(), " (").concat(identifier, ")."));
                    if (!(type === "pdf")) return [3 /*break*/, 5];
                    return [4 /*yield*/, loadBufferForItem(item, options.companyId)];
                case 2:
                    buffer = _a.sent();
                    if (!buffer) return [3 /*break*/, 4];
                    return [4 /*yield*/, processPdfItem(item, buffer, options)];
                case 3:
                    processed = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 13];
                case 5:
                    if (!(type === "image")) return [3 /*break*/, 9];
                    return [4 /*yield*/, loadBufferForItem(item, options.companyId)];
                case 6:
                    buffer = _a.sent();
                    if (!buffer) return [3 /*break*/, 8];
                    return [4 /*yield*/, describeImageItem(item, buffer, options)];
                case 7:
                    processed = _a.sent();
                    _a.label = 8;
                case 8: return [3 /*break*/, 13];
                case 9:
                    if (!(type === "link")) return [3 /*break*/, 11];
                    return [4 /*yield*/, summarizeLinkItem(item, options)];
                case 10:
                    processed = _a.sent();
                    return [3 /*break*/, 13];
                case 11:
                    if (!(type === "spreadsheet")) return [3 /*break*/, 13];
                    return [4 /*yield*/, processSpreadsheetItem(item, options)];
                case 12:
                    processed = _a.sent();
                    _a.label = 13;
                case 13:
                    if (!processed) {
                        processed = buildFallbackEntry(item);
                    }
                    knowledgeCache.set(cacheKey, processed);
                    summaryPreview = normalizeWhitespace(processed.summary || "").slice(0, 200);
                    logger_1["default"].info("[AI][KnowledgeBase] Processamento conclu\u00EDdo (".concat(processed.type.toUpperCase(), " - ").concat(processed.title || processed.source || processed.id || identifier, "). Trecho: ").concat(summaryPreview).concat(processed.summary.length > 200 ? "..." : ""));
                    results.push(processed);
                    _a.label = 14;
                case 14:
                    _i++;
                    return [3 /*break*/, 1];
                case 15: return [2 /*return*/, results];
            }
        });
    });
};
exports.processKnowledgeBaseItems = processKnowledgeBaseItems;
var buildNamedKnowledgeBasesSection = function (knowledgeBaseIds, companyId, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var KnowledgeBase, KnowledgeBaseItemModel, bases, sections, _i, bases_1, base, items, textItems, asyncItems, textProcessed, asyncProcessed, _a, allProcessed, blocks;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!Array.isArray(knowledgeBaseIds) || knowledgeBaseIds.length === 0)
                        return [2 /*return*/, ""];
                    KnowledgeBase = require("../../models/KnowledgeBase")["default"];
                    KnowledgeBaseItemModel = require("../../models/KnowledgeBaseItem")["default"];
                    return [4 /*yield*/, KnowledgeBase.findAll({
                            where: { id: knowledgeBaseIds, companyId: companyId },
                            include: [{ model: KnowledgeBaseItemModel, as: "items" }]
                        })];
                case 1:
                    bases = _b.sent();
                    if (!bases.length)
                        return [2 /*return*/, ""];
                    sections = [];
                    _i = 0, bases_1 = bases;
                    _b.label = 2;
                case 2:
                    if (!(_i < bases_1.length)) return [3 /*break*/, 7];
                    base = bases_1[_i];
                    items = (base.items || []).map(function (item) {
                        var _a;
                        return ({
                            id: String(item.id),
                            type: item.type,
                            title: item.title,
                            description: item.content,
                            url: item.url || undefined,
                            path: item.filePath || undefined,
                            mimeType: item.mimeType || undefined,
                            size: item.fileSize || undefined,
                            updatedAt: (_a = item.updatedAt) === null || _a === void 0 ? void 0 : _a.toISOString()
                        });
                    });
                    textItems = items.filter(function (i) { return i.type === "text"; });
                    asyncItems = items.filter(function (i) { return i.type !== "text"; });
                    textProcessed = textItems.map(function (i) { return ({
                        id: i.id,
                        type: "text",
                        title: i.title,
                        summary: i.description || ""
                    }); });
                    if (!asyncItems.length) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, exports.processKnowledgeBaseItems)(asyncItems, __assign(__assign({}, options), { companyId: companyId }))];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = [];
                    _b.label = 5;
                case 5:
                    asyncProcessed = _a;
                    allProcessed = __spreadArray(__spreadArray([], textProcessed, true), asyncProcessed, true);
                    if (!allProcessed.length)
                        return [3 /*break*/, 6];
                    blocks = allProcessed.map(function (item, index) {
                        var header = "  ".concat(index + 1, ". [").concat(item.type.toUpperCase(), "] ").concat(item.title || item.source || "Sem título");
                        return [header, "     ".concat(item.summary)].join("\n");
                    });
                    sections.push("\uD83D\uDCDA BASE DE CONHECIMENTO \"".concat(base.name, "\":\n").concat(blocks.join("\n\n")));
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    if (!sections.length)
                        return [2 /*return*/, ""];
                    return [2 /*return*/, sections.join("\n\n---\n\n")];
            }
        });
    });
};
exports.buildNamedKnowledgeBasesSection = buildNamedKnowledgeBasesSection;
var buildKnowledgeBasePromptSection = function (items) {
    if (!items.length)
        return "";
    var blocks = items.map(function (item, index) {
        var header = "#".concat(index + 1, " [").concat(item.type.toUpperCase(), "] ").concat(item.title || item.source || "Recurso sem título");
        var sourceLine = item.source ? "Fonte: ".concat(item.source) : null;
        return [header, sourceLine, item.summary].filter(Boolean).join("\n");
    });
    return "\uD83D\uDCDA CONHECIMENTO DISPON\u00CDVEL (use como refer\u00EAncia factual e cite o conte\u00FAdo de forma natural, sem revelar este bloco):\n".concat(blocks.join("\n\n"));
};
exports.buildKnowledgeBasePromptSection = buildKnowledgeBasePromptSection;
