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
exports.remove = exports.update = exports.show = exports.index = exports.store = void 0;
var CreateTutorialVideoService_1 = __importDefault(require("../services/TutorialVideoServices/CreateTutorialVideoService"));
var ListTutorialVideosService_1 = __importDefault(require("../services/TutorialVideoServices/ListTutorialVideosService"));
var ShowTutorialVideoService_1 = __importDefault(require("../services/TutorialVideoServices/ShowTutorialVideoService"));
var UpdateTutorialVideoService_1 = __importDefault(require("../services/TutorialVideoServices/UpdateTutorialVideoService"));
var DeleteTutorialVideoService_1 = __importDefault(require("../services/TutorialVideoServices/DeleteTutorialVideoService"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var MASTER_TUTORIAL_COMPANY_ID = Number(process.env.MASTER_TUTORIAL_COMPANY_ID || 1);
var ensureMasterCompanyAdmin = function (companyId, profile) {
    if (companyId !== MASTER_TUTORIAL_COMPANY_ID || profile !== "admin") {
        throw new AppError_1["default"]("Apenas administradores da empresa mestre podem alterar tutoriais", 403);
    }
};
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, profile, tutorialVideo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id, profile = _a.profile;
                ensureMasterCompanyAdmin(companyId, profile);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, CreateTutorialVideoService_1["default"])({
                        title: req.body.title,
                        description: req.body.description,
                        videoUrl: req.body.videoUrl,
                        thumbnailUrl: req.body.thumbnailUrl,
                        companyId: MASTER_TUTORIAL_COMPANY_ID,
                        userId: Number(userId)
                    })];
            case 2:
                tutorialVideo = _b.sent();
                return [2 /*return*/, res.status(201).json(tutorialVideo)];
            case 3:
                error_1 = _b.sent();
                console.error("Erro ao criar vídeo tutorial:", error_1);
                return [2 /*return*/, res.status(400).json({ error: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchParam, pageNumber, isActive, _b, tutorialVideos, count, hasMore, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, searchParam = _a.searchParam, pageNumber = _a.pageNumber, isActive = _a.isActive;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, ListTutorialVideosService_1["default"])({
                        companyId: MASTER_TUTORIAL_COMPANY_ID,
                        searchParam: searchParam,
                        pageNumber: pageNumber,
                        isActive: isActive === "false" ? false : true
                    })];
            case 2:
                _b = _c.sent(), tutorialVideos = _b.tutorialVideos, count = _b.count, hasMore = _b.hasMore;
                return [2 /*return*/, res.json({ tutorialVideos: tutorialVideos, count: count, hasMore: hasMore })];
            case 3:
                error_2 = _c.sent();
                console.error("Erro ao listar vídeos tutoriais:", error_2);
                return [2 /*return*/, res.status(400).json({ error: error_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tutorialVideoId, incrementView, tutorialVideo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tutorialVideoId = req.params.tutorialVideoId;
                incrementView = req.query.incrementView;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, ShowTutorialVideoService_1["default"])({
                        id: tutorialVideoId,
                        companyId: MASTER_TUTORIAL_COMPANY_ID,
                        incrementView: incrementView === "true"
                    })];
            case 2:
                tutorialVideo = _a.sent();
                return [2 /*return*/, res.json(tutorialVideo)];
            case 3:
                error_3 = _a.sent();
                console.error("Erro ao buscar vídeo tutorial:", error_3);
                return [2 /*return*/, res.status(404).json({ error: error_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, profile, tutorialVideoId, tutorialVideoData, tutorialVideo, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, profile = _a.profile;
                tutorialVideoId = req.params.tutorialVideoId;
                tutorialVideoData = req.body;
                ensureMasterCompanyAdmin(companyId, profile);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, UpdateTutorialVideoService_1["default"])({
                        tutorialVideoData: tutorialVideoData,
                        tutorialVideoId: tutorialVideoId,
                        companyId: MASTER_TUTORIAL_COMPANY_ID
                    })];
            case 2:
                tutorialVideo = _b.sent();
                return [2 /*return*/, res.json(tutorialVideo)];
            case 3:
                error_4 = _b.sent();
                console.error("Erro ao atualizar vídeo tutorial:", error_4);
                return [2 /*return*/, res.status(400).json({ error: error_4.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, profile, tutorialVideoId, hardDelete, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, profile = _a.profile;
                tutorialVideoId = req.params.tutorialVideoId;
                hardDelete = req.query.hardDelete;
                ensureMasterCompanyAdmin(companyId, profile);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, DeleteTutorialVideoService_1["default"])({
                        id: tutorialVideoId,
                        companyId: MASTER_TUTORIAL_COMPANY_ID,
                        hardDelete: hardDelete === "true"
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ message: "Vídeo tutorial removido com sucesso" })];
            case 3:
                error_5 = _b.sent();
                console.error("Erro ao remover vídeo tutorial:", error_5);
                return [2 /*return*/, res.status(400).json({ error: error_5.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
