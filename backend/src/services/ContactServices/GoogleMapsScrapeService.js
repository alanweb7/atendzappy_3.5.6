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
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var puppeteer_core_1 = __importDefault(require("puppeteer-core"));
var CreateOrUpdateContactServiceForImport_1 = __importDefault(require("./CreateOrUpdateContactServiceForImport"));
var logger_1 = __importDefault(require("../../utils/logger"));
var USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var cleanPhone = function (raw) { return raw.replace(/[^0-9]/g, ""); };
var isValidPhone = function (phone) {
    return phone.length >= 8 && phone.length <= 13;
};
var dismissConsent = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var consentBtn, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, page.$('button[aria-label*="Accept"], form[action*="consent"] button')];
            case 1:
                consentBtn = _a.sent();
                if (!consentBtn) return [3 /*break*/, 4];
                logger_1["default"].info("[GoogleMapsScrape] Dialog de consentimento encontrado — clicando");
                return [4 /*yield*/, consentBtn.click()];
            case 2:
                _a.sent();
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1200); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                logger_1["default"].info("[GoogleMapsScrape] Sem dialog de consentimento");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                logger_1["default"].warn("[GoogleMapsScrape] Erro ao fechar consent: ".concat(err_1.message));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var extractPlaceDetails = function (page, url) { return __awaiter(void 0, void 0, void 0, function () {
    var afterUrl, name_1, phoneAttr, phone, category, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                logger_1["default"].info("[GoogleMapsScrape]   \u2192 Abrindo estabelecimento: ".concat(url.substring(0, 80), "..."));
                return [4 /*yield*/, page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })];
            case 1:
                _a.sent();
                afterUrl = page.url();
                logger_1["default"].info("[GoogleMapsScrape]   \u2192 URL ap\u00F3s navega\u00E7\u00E3o: ".concat(afterUrl.substring(0, 80)));
                return [4 /*yield*/, page.waitForSelector("h1", { timeout: 10000 })];
            case 2:
                _a.sent();
                return [4 /*yield*/, page
                        .$eval("h1", function (el) { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; })["catch"](function () { return ""; })];
            case 3:
                name_1 = _a.sent();
                logger_1["default"].info("[GoogleMapsScrape]   \u2192 Nome: \"".concat(name_1, "\""));
                return [4 /*yield*/, page
                        .$eval('[data-item-id^="phone:tel"]', function (el) { return el.getAttribute("data-item-id") || ""; })["catch"](function () { return ""; })];
            case 4:
                phoneAttr = _a.sent();
                phone = cleanPhone(phoneAttr.replace("phone:tel:", ""));
                logger_1["default"].info("[GoogleMapsScrape]   \u2192 Telefone raw: \"".concat(phoneAttr, "\" \u2192 limpo: \"").concat(phone, "\""));
                return [4 /*yield*/, page
                        .$eval('button[jsaction*="pane.rating.category"], [jsaction*="category"]', function (el) { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; })["catch"](function () { return ""; })];
            case 5:
                category = _a.sent();
                logger_1["default"].info("[GoogleMapsScrape]   \u2192 Categoria: \"".concat(category, "\""));
                return [2 /*return*/, { name: name_1, phone: phone, category: category }];
            case 6:
                err_2 = _a.sent();
                logger_1["default"].warn("[GoogleMapsScrape]   \u2192 Falha ao extrair detalhes: ".concat(err_2.message));
                return [2 /*return*/, null];
            case 7: return [2 /*return*/];
        }
    });
}); };
var collectPlaceLinks = function (page, maxResults) { return __awaiter(void 0, void 0, void 0, function () {
    var links, stale, iteration, found, before;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                links = new Set();
                stale = 0;
                iteration = 0;
                _a.label = 1;
            case 1:
                if (!(links.size < maxResults && stale < 4)) return [3 /*break*/, 5];
                iteration++;
                return [4 /*yield*/, page.$$eval('a[href*="/maps/place/"]', function (anchors) { return anchors.map(function (a) { return a.href; }); })];
            case 2:
                found = _a.sent();
                before = links.size;
                found.forEach(function (l) { return links.add(l.split("?")[0]); });
                logger_1["default"].info("[GoogleMapsScrape]   scroll #".concat(iteration, " \u2014 ").concat(found.length, " \u00E2ncoras no DOM, ").concat(links.size, " links \u00FAnicos acumulados"));
                if (links.size === before)
                    stale++;
                else
                    stale = 0;
                return [4 /*yield*/, page.evaluate(function () {
                        var feed = document.querySelector('div[role="feed"]');
                        if (feed)
                            feed.scrollTop = feed.scrollHeight;
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
            case 4:
                _a.sent();
                return [3 /*break*/, 1];
            case 5:
                logger_1["default"].info("[GoogleMapsScrape]   Total de links coletados: ".concat(links.size));
                return [2 /*return*/, Array.from(links).slice(0, maxResults)];
        }
    });
}); };
var scrapeKeyword = function (browser, keyword, maxResults) { return __awaiter(void 0, void 0, void 0, function () {
    var results, page, searchUrl, err_3, currentUrl, title, bodySnippet, feedOk, urlAfter, titleAfter, bodyAfter, placeLinks, _loop_1, _i, placeLinks_1, link, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                results = [];
                logger_1["default"].info("[GoogleMapsScrape] Abrindo nova aba para: \"".concat(keyword, "\""));
                return [4 /*yield*/, browser.newPage()];
            case 1:
                page = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 20, 21, 23]);
                return [4 /*yield*/, page.setUserAgent(USER_AGENT)];
            case 3:
                _a.sent();
                searchUrl = "https://www.google.com/maps/search/".concat(encodeURIComponent(keyword), "?hl=pt-BR");
                logger_1["default"].info("[GoogleMapsScrape] Navegando para: ".concat(searchUrl));
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 })];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                logger_1["default"].error("[GoogleMapsScrape] FALHA no page.goto \u2014 ".concat(err_3.message));
                logger_1["default"].error("[GoogleMapsScrape] URL tentada: ".concat(searchUrl));
                return [2 /*return*/, results];
            case 7:
                currentUrl = page.url();
                return [4 /*yield*/, page.title()];
            case 8:
                title = _a.sent();
                logger_1["default"].info("[GoogleMapsScrape] URL atual ap\u00F3s goto: ".concat(currentUrl));
                logger_1["default"].info("[GoogleMapsScrape] T\u00EDtulo da p\u00E1gina: \"".concat(title, "\""));
                return [4 /*yield*/, page
                        .evaluate(function () { var _a, _b; return ((_b = (_a = document.body) === null || _a === void 0 ? void 0 : _a.innerHTML) === null || _b === void 0 ? void 0 : _b.substring(0, 500)) || "BODY VAZIO"; })["catch"](function () { return "ERRO AO LER BODY"; })];
            case 9:
                bodySnippet = _a.sent();
                logger_1["default"].info("[GoogleMapsScrape] HTML inicial (500 chars): ".concat(bodySnippet));
                return [4 /*yield*/, dismissConsent(page)];
            case 10:
                _a.sent();
                logger_1["default"].info("[GoogleMapsScrape] Aguardando div[role=\"feed\"]...");
                return [4 /*yield*/, page
                        .waitForSelector('div[role="feed"]', { timeout: 30000 })
                        .then(function () { return true; })["catch"](function () { return false; })];
            case 11:
                feedOk = _a.sent();
                if (!!feedOk) return [3 /*break*/, 14];
                urlAfter = page.url();
                return [4 /*yield*/, page.title()];
            case 12:
                titleAfter = _a.sent();
                return [4 /*yield*/, page
                        .evaluate(function () { var _a, _b; return ((_b = (_a = document.body) === null || _a === void 0 ? void 0 : _a.innerHTML) === null || _b === void 0 ? void 0 : _b.substring(0, 800)) || ""; })["catch"](function () { return ""; })];
            case 13:
                bodyAfter = _a.sent();
                logger_1["default"].error("[GoogleMapsScrape] Feed N\u00C3O encontrado para: \"".concat(keyword, "\""));
                logger_1["default"].error("[GoogleMapsScrape] URL quando feed falhou: ".concat(urlAfter));
                logger_1["default"].error("[GoogleMapsScrape] T\u00EDtulo quando feed falhou: \"".concat(titleAfter, "\""));
                logger_1["default"].error("[GoogleMapsScrape] HTML quando feed falhou: ".concat(bodyAfter));
                return [2 /*return*/, results];
            case 14:
                logger_1["default"].info("[GoogleMapsScrape] Feed encontrado! Coletando links...");
                return [4 /*yield*/, collectPlaceLinks(page, maxResults)];
            case 15:
                placeLinks = _a.sent();
                logger_1["default"].info("[GoogleMapsScrape] \"".concat(keyword, "\" \u2014 ").concat(placeLinks.length, " link(s) para visitar"));
                _loop_1 = function (link) {
                    var data, duplicate;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, extractPlaceDetails(page, link)];
                            case 1:
                                data = _b.sent();
                                if (!data)
                                    return [2 /*return*/, "continue"];
                                if (!data.phone || !isValidPhone(data.phone)) {
                                    logger_1["default"].info("[GoogleMapsScrape]   \u2192 Ignorado (sem telefone v\u00E1lido): \"".concat(data.name, "\" phone=\"").concat(data.phone, "\""));
                                    return [2 /*return*/, "continue"];
                                }
                                duplicate = results.some(function (r) { return r.phone === data.phone; });
                                if (!duplicate) {
                                    results.push(data);
                                    logger_1["default"].info("[GoogleMapsScrape]   \u2192 Salvo: \"".concat(data.name, "\" | ").concat(data.phone, " | ").concat(data.category));
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, placeLinks_1 = placeLinks;
                _a.label = 16;
            case 16:
                if (!(_i < placeLinks_1.length)) return [3 /*break*/, 19];
                link = placeLinks_1[_i];
                return [5 /*yield**/, _loop_1(link)];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18:
                _i++;
                return [3 /*break*/, 16];
            case 19: return [3 /*break*/, 23];
            case 20:
                err_4 = _a.sent();
                logger_1["default"].error("[GoogleMapsScrape] Erro inesperado em scrapeKeyword: ".concat(err_4.message));
                logger_1["default"].error(err_4.stack || "");
                return [3 /*break*/, 23];
            case 21:
                logger_1["default"].info("[GoogleMapsScrape] Fechando aba de \"".concat(keyword, "\""));
                return [4 /*yield*/, page.close()];
            case 22:
                _a.sent();
                return [7 /*endfinally*/];
            case 23: return [2 /*return*/, results];
        }
    });
}); };
var buildCsv = function (businesses) {
    var header = "nome,telefone,segmento";
    var rows = businesses.map(function (b) {
        return [
            "\"".concat(b.name.replace(/"/g, '""'), "\""),
            b.phone,
            "\"".concat(b.category.replace(/"/g, '""'), "\"")
        ].join(",");
    });
    return __spreadArray([header], rows, true).join("\n");
};
var GoogleMapsScrapeService = function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keywords, maxResultsPerKeyword, companyId, CHROME_PATHS, chromeExe, browser, err_5, allBusinesses, i, keyword, found, seen, unique, csvContent, uploadsDir, csvFileName, csvPath, imported, skipped, i, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = job.data, keywords = _a.keywords, maxResultsPerKeyword = _a.maxResultsPerKeyword, companyId = _a.companyId;
                logger_1["default"].info("[GoogleMapsScrape] ===== Job ".concat(job.id, " iniciado ====="));
                logger_1["default"].info("[GoogleMapsScrape] Keywords: ".concat(JSON.stringify(keywords)));
                logger_1["default"].info("[GoogleMapsScrape] Max por keyword: ".concat(maxResultsPerKeyword));
                logger_1["default"].info("[GoogleMapsScrape] CompanyId: ".concat(companyId));
                CHROME_PATHS = [
                    // Linux (produção)
                    "/usr/bin/google-chrome-stable",
                    "/usr/bin/google-chrome",
                    "/usr/bin/chromium-browser",
                    "/usr/bin/chromium",
                    "/snap/bin/chromium",
                    // Windows (desenvolvimento)
                    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                    // Variável de ambiente (override manual)
                    process.env.PUPPETEER_EXECUTABLE_PATH || ""
                ].filter(Boolean);
                chromeExe = CHROME_PATHS.find(function (p) {
                    try {
                        return require("fs").existsSync(p);
                    }
                    catch (_a) {
                        return false;
                    }
                });
                logger_1["default"].info("[GoogleMapsScrape] Lan\u00E7ando browser... (execut\u00E1vel: ".concat(chromeExe || "bundled Chromium", ")"));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, puppeteer_core_1["default"].launch({
                        headless: true,
                        defaultViewport: { width: 1280, height: 800 },
                        executablePath: chromeExe || undefined,
                        args: [
                            "--no-sandbox",
                            "--disable-setuid-sandbox",
                            "--no-first-run",
                            "--no-default-browser-check",
                            "--disable-gpu",
                            "--disable-extensions",
                            "--disable-dev-shm-usage"
                        ]
                    })];
            case 2:
                browser = _b.sent();
                logger_1["default"].info("[GoogleMapsScrape] Browser lançado com sucesso");
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                logger_1["default"].error("[GoogleMapsScrape] FALHA ao lan\u00E7ar browser: ".concat(err_5.message));
                throw err_5;
            case 4:
                allBusinesses = [];
                _b.label = 5;
            case 5:
                _b.trys.push([5, , 11, 13]);
                i = 0;
                _b.label = 6;
            case 6:
                if (!(i < keywords.length)) return [3 /*break*/, 10];
                keyword = keywords[i];
                return [4 /*yield*/, job.progress(Math.round((i / keywords.length) * 50))];
            case 7:
                _b.sent();
                logger_1["default"].info("[GoogleMapsScrape] ----- Keyword ".concat(i + 1, "/").concat(keywords.length, ": \"").concat(keyword, "\" -----"));
                return [4 /*yield*/, scrapeKeyword(browser, keyword, maxResultsPerKeyword)];
            case 8:
                found = _b.sent();
                logger_1["default"].info("[GoogleMapsScrape] \"".concat(keyword, "\" \u2192 ").concat(found.length, " resultado(s) com telefone v\u00E1lido"));
                allBusinesses.push.apply(allBusinesses, found);
                _b.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 6];
            case 10: return [3 /*break*/, 13];
            case 11:
                logger_1["default"].info("[GoogleMapsScrape] Fechando browser...");
                return [4 /*yield*/, browser.close()];
            case 12:
                _b.sent();
                logger_1["default"].info("[GoogleMapsScrape] Browser fechado");
                return [7 /*endfinally*/];
            case 13:
                seen = new Set();
                unique = allBusinesses.filter(function (b) {
                    if (seen.has(b.phone))
                        return false;
                    seen.add(b.phone);
                    return true;
                });
                logger_1["default"].info("[GoogleMapsScrape] Total ap\u00F3s deduplica\u00E7\u00E3o: ".concat(unique.length));
                csvContent = buildCsv(unique);
                uploadsDir = path_1["default"].resolve(__dirname, "../../../public/uploads");
                if (!fs_1["default"].existsSync(uploadsDir))
                    fs_1["default"].mkdirSync(uploadsDir, { recursive: true });
                csvFileName = "scrape_".concat(job.id, ".csv");
                csvPath = path_1["default"].join(uploadsDir, csvFileName);
                fs_1["default"].writeFileSync(csvPath, csvContent, "utf8");
                logger_1["default"].info("[GoogleMapsScrape] CSV salvo: ".concat(csvPath));
                imported = 0;
                skipped = 0;
                i = 0;
                _b.label = 14;
            case 14:
                if (!(i < unique.length)) return [3 /*break*/, 20];
                return [4 /*yield*/, job.progress(50 + Math.round((i / Math.max(unique.length, 1)) * 50))];
            case 15:
                _b.sent();
                _b.label = 16;
            case 16:
                _b.trys.push([16, 18, , 19]);
                return [4 /*yield*/, (0, CreateOrUpdateContactServiceForImport_1["default"])({
                        name: unique[i].name,
                        number: unique[i].phone,
                        isGroup: false,
                        companyId: companyId
                    })];
            case 17:
                _b.sent();
                imported++;
                return [3 /*break*/, 19];
            case 18:
                err_6 = _b.sent();
                logger_1["default"].warn("[GoogleMapsScrape] Falha ao importar \"".concat(unique[i].name, "\": ").concat(err_6.message));
                skipped++;
                return [3 /*break*/, 19];
            case 19:
                i++;
                return [3 /*break*/, 14];
            case 20:
                logger_1["default"].info("[GoogleMapsScrape] ===== Job ".concat(job.id, " conclu\u00EDdo \u2014 ").concat(imported, " importados, ").concat(skipped, " ignorados ====="));
                return [2 /*return*/, { imported: imported, skipped: skipped, csvPath: "uploads/".concat(csvFileName) }];
        }
    });
}); };
exports["default"] = GoogleMapsScrapeService;
