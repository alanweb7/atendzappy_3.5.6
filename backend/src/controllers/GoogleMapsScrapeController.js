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
exports.createListFromScrape = exports.downloadScrapeCsv = exports.getScrapeStatus = exports.startScrape = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var googleMapsScrapeQueue_1 = require("../queues/googleMapsScrapeQueue");
var CreateService_1 = __importDefault(require("../services/ContactListService/CreateService"));
var ContactListItem_1 = __importDefault(require("../models/ContactListItem"));
var startScrape = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keywords, locationQuery, language, maxResultsPerKeyword, maximumLeadsEnrichmentRecords, scrapeContacts, scrapeDirectories, scrapeImageAuthors, scrapeOrderOnline, scrapePlaceDetailPage, scrapeReviewsPersonalData, scrapeTableReservationProvider, scrapeSocialMediaProfiles, includeWebResults, skipClosedPlaces, verifyLeadsEnrichmentEmails, companyId, max, job;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, keywords = _a.keywords, locationQuery = _a.locationQuery, language = _a.language, maxResultsPerKeyword = _a.maxResultsPerKeyword, maximumLeadsEnrichmentRecords = _a.maximumLeadsEnrichmentRecords, scrapeContacts = _a.scrapeContacts, scrapeDirectories = _a.scrapeDirectories, scrapeImageAuthors = _a.scrapeImageAuthors, scrapeOrderOnline = _a.scrapeOrderOnline, scrapePlaceDetailPage = _a.scrapePlaceDetailPage, scrapeReviewsPersonalData = _a.scrapeReviewsPersonalData, scrapeTableReservationProvider = _a.scrapeTableReservationProvider, scrapeSocialMediaProfiles = _a.scrapeSocialMediaProfiles, includeWebResults = _a.includeWebResults, skipClosedPlaces = _a.skipClosedPlaces, verifyLeadsEnrichmentEmails = _a.verifyLeadsEnrichmentEmails;
                companyId = req.user.companyId;
                if (!Array.isArray(keywords) || keywords.length === 0) {
                    throw new AppError_1["default"]("Informe ao menos uma palavra-chave", 400);
                }
                max = Math.min(60, Math.max(1, Number(maxResultsPerKeyword) || 20));
                return [4 /*yield*/, (0, googleMapsScrapeQueue_1.addScrapeJob)({
                        keywords: keywords.map(function (k) { return k.trim(); }).filter(Boolean),
                        locationQuery: locationQuery || "",
                        language: language || "pt-BR",
                        maxResultsPerKeyword: max,
                        maximumLeadsEnrichmentRecords: Number(maximumLeadsEnrichmentRecords) || 0,
                        scrapeContacts: Boolean(scrapeContacts),
                        scrapeDirectories: Boolean(scrapeDirectories),
                        scrapeImageAuthors: Boolean(scrapeImageAuthors),
                        scrapeOrderOnline: Boolean(scrapeOrderOnline),
                        scrapePlaceDetailPage: Boolean(scrapePlaceDetailPage),
                        scrapeReviewsPersonalData: Boolean(scrapeReviewsPersonalData),
                        scrapeTableReservationProvider: Boolean(scrapeTableReservationProvider),
                        scrapeSocialMediaProfiles: scrapeSocialMediaProfiles || {},
                        includeWebResults: Boolean(includeWebResults),
                        skipClosedPlaces: Boolean(skipClosedPlaces),
                        verifyLeadsEnrichmentEmails: Boolean(verifyLeadsEnrichmentEmails),
                        companyId: companyId
                    })];
            case 1:
                job = _b.sent();
                return [2 /*return*/, res.status(200).json({ jobId: job.id })];
        }
    });
}); };
exports.startScrape = startScrape;
var getScrapeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, companyId, queue, job, state, progress, result, failedReason;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = req.params.jobId;
                companyId = req.user.companyId;
                queue = (0, googleMapsScrapeQueue_1.getGoogleMapsScrapeQueue)();
                return [4 /*yield*/, queue.getJob(jobId)];
            case 1:
                job = _a.sent();
                if (!job) {
                    throw new AppError_1["default"]("Job não encontrado", 404);
                }
                // garantir isolamento multi-tenant
                if (job.data.companyId !== companyId) {
                    throw new AppError_1["default"]("Acesso não autorizado", 403);
                }
                return [4 /*yield*/, job.getState()];
            case 2:
                state = _a.sent();
                progress = job._progress;
                result = state === "completed" ? job.returnvalue : null;
                failedReason = state === "failed" ? job.failedReason : null;
                return [2 /*return*/, res.status(200).json({ status: state, progress: progress, result: result, failedReason: failedReason })];
        }
    });
}); };
exports.getScrapeStatus = getScrapeStatus;
var downloadScrapeCsv = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, companyId, queue, job, state, result, filePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = req.params.jobId;
                companyId = req.user.companyId;
                queue = (0, googleMapsScrapeQueue_1.getGoogleMapsScrapeQueue)();
                return [4 /*yield*/, queue.getJob(jobId)];
            case 1:
                job = _a.sent();
                if (!job)
                    throw new AppError_1["default"]("Job não encontrado", 404);
                if (job.data.companyId !== companyId)
                    throw new AppError_1["default"]("Acesso não autorizado", 403);
                return [4 /*yield*/, job.getState()];
            case 2:
                state = _a.sent();
                if (state !== "completed")
                    throw new AppError_1["default"]("Extração ainda não concluída", 400);
                result = job.returnvalue;
                filePath = path_1["default"].resolve(__dirname, "../../public", result.csvPath);
                if (!fs_1["default"].existsSync(filePath)) {
                    throw new AppError_1["default"]("Arquivo CSV não encontrado", 404);
                }
                res.download(filePath, "contatos_google_maps_".concat(jobId, ".csv"));
                return [2 /*return*/];
        }
    });
}); };
exports.downloadScrapeCsv = downloadScrapeCsv;
var createListFromScrape = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, listName, companyId, queue, job, state, result, filePath, csvContent, lines, headers, nomeIdx, telefoneIdx, parseCsvRow, contactList, inserted, i, cols, nome, telefone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = req.params.jobId;
                listName = req.body.listName;
                companyId = req.user.companyId;
                if (!listName || !String(listName).trim()) {
                    throw new AppError_1["default"]("Informe o nome da lista", 400);
                }
                queue = (0, googleMapsScrapeQueue_1.getGoogleMapsScrapeQueue)();
                return [4 /*yield*/, queue.getJob(jobId)];
            case 1:
                job = _a.sent();
                if (!job)
                    throw new AppError_1["default"]("Job não encontrado", 404);
                if (job.data.companyId !== companyId)
                    throw new AppError_1["default"]("Acesso não autorizado", 403);
                return [4 /*yield*/, job.getState()];
            case 2:
                state = _a.sent();
                if (state !== "completed")
                    throw new AppError_1["default"]("Extração ainda não concluída", 400);
                result = job.returnvalue;
                filePath = path_1["default"].resolve(__dirname, "../../public", result.csvPath);
                if (!fs_1["default"].existsSync(filePath)) {
                    throw new AppError_1["default"]("Arquivo de resultados não encontrado", 404);
                }
                csvContent = fs_1["default"].readFileSync(filePath, "utf8");
                lines = csvContent.split("\n").filter(Boolean);
                if (lines.length < 2)
                    throw new AppError_1["default"]("Nenhum contato encontrado na extração", 400);
                headers = lines[0].split(",").map(function (h) { return h.replace(/"/g, "").trim(); });
                nomeIdx = headers.indexOf("nome");
                telefoneIdx = headers.indexOf("telefone");
                if (nomeIdx === -1 || telefoneIdx === -1) {
                    throw new AppError_1["default"]("Formato do CSV inválido", 400);
                }
                parseCsvRow = function (line) {
                    var result = [];
                    var current = "";
                    var inQuotes = false;
                    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                        var char = line_1[_i];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        }
                        else if (char === "," && !inQuotes) {
                            result.push(current);
                            current = "";
                        }
                        else {
                            current += char;
                        }
                    }
                    result.push(current);
                    return result;
                };
                return [4 /*yield*/, (0, CreateService_1["default"])({
                        name: String(listName).trim(),
                        companyId: companyId
                    })];
            case 3:
                contactList = _a.sent();
                inserted = 0;
                i = 1;
                _a.label = 4;
            case 4:
                if (!(i < lines.length)) return [3 /*break*/, 7];
                cols = parseCsvRow(lines[i]);
                nome = (cols[nomeIdx] || "").replace(/"/g, "").trim();
                telefone = (cols[telefoneIdx] || "").replace(/\D/g, "").trim();
                if (!nome || !telefone || telefone.length < 8)
                    return [3 /*break*/, 6];
                return [4 /*yield*/, ContactListItem_1["default"].findOrCreate({
                        where: { number: telefone, contactListId: contactList.id, companyId: companyId },
                        defaults: { name: nome, number: telefone, contactListId: contactList.id, companyId: companyId }
                    })];
            case 5:
                _a.sent();
                inserted++;
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/, res.status(200).json({ id: contactList.id, name: contactList.name, inserted: inserted })];
        }
    });
}); };
exports.createListFromScrape = createListFromScrape;
