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
exports.BatchUpdateContactScores = exports.GetHighPotentialContacts = exports.GetContactStats = exports.UpdateContactScore = exports.CalculatePotentialScore = void 0;
var logger_1 = __importDefault(require("../../utils/logger"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var CalculatePotentialScore = function (messageBody) {
    try {
        var score_1 = 0;
        // Palavras-chave positivas que indicam interesse real
        var positiveKeywords = [
            'quero', 'gostaria', 'preciso', 'necessito', 'interesse',
            'preço', 'valor', 'custo', 'quanto', 'quanto custa', 'valor é',
            'contratar', 'contratação', 'serviço', 'servicos', 'atendimento',
            'produto', 'produtos', 'comprar', 'compra', 'adquirir',
            'orçamento', 'orcamento', 'cotação', 'cotacao',
            'agendar', 'agendamento', 'marcar', 'visitar', 'visita',
            'saber mais', 'informações', 'informacoes', 'detalhes',
            'como funciona', 'funciona', 'demonstração', 'demonstracao',
            'consulta', 'reunião', 'encontro', 'conversar'
        ];
        // Palavras de alta intenção
        var highIntentKeywords = [
            'quero contratar', 'quero comprar', 'quero orçamento',
            'quanto custa', 'qual o preço', 'agendar agora',
            'preciso de', 'necessito urgentemente'
        ];
        var messageText_1 = messageBody.toLowerCase().trim();
        // +3 pontos para palavras de alta intenção
        highIntentKeywords.forEach(function (keyword) {
            if (messageText_1.includes(keyword)) {
                score_1 += 3;
            }
        });
        // +2 pontos para cada palavra positiva
        positiveKeywords.forEach(function (keyword) {
            if (messageText_1.includes(keyword)) {
                score_1 += 2;
            }
        });
        // +3 pontos se menciona dinheiro/valor específico
        if (messageText_1.includes('quanto custa') ||
            messageText_1.includes('qual o preço') ||
            messageText_1.includes('quanto vale') ||
            messageText_1.includes('valor é') ||
            messageText_1.includes('custa quanto')) {
            score_1 += 3;
        }
        // +2 pontos se menciona tempo (indica urgência)
        if (messageText_1.includes('agora') ||
            messageText_1.includes('hoje') ||
            messageText_1.includes('urgente') ||
            messageText_1.includes('rápido')) {
            score_1 += 2;
        }
        // +1 ponto se mensagem tem mais de 10 palavras (indica interesse)
        var wordCount = messageText_1.split(/\s+/).length;
        if (wordCount > 10) {
            score_1 += 1;
        }
        // +2 pontos se horário comercial (8h-18h)
        var hour = new Date().getHours();
        if (hour >= 8 && hour <= 18) {
            score_1 += 2;
        }
        // +1 ponto se tem números (indica interesse específico)
        if (/\d/.test(messageText_1)) {
            score_1 += 1;
        }
        // -1 ponto se for mensagem muito curta sem intenção
        if (wordCount <= 2 && !positiveKeywords.some(function (kw) { return messageText_1.includes(kw); })) {
            score_1 = Math.max(0, score_1 - 1);
        }
        // -2 pontos se contém palavras de baixo interesse
        var lowInterestKeywords = ['ok', 'oi', 'ola', 'bom dia', 'boa tarde', 'tchau'];
        if (lowInterestKeywords.some(function (kw) { return messageText_1 === kw; })) {
            score_1 = Math.max(0, score_1 - 2);
        }
        return Math.min(Math.max(score_1, 0), 10); // Limitar entre 0 e 10
    }
    catch (error) {
        logger_1["default"].error("Error calculating potential score:", error);
        return 0;
    }
};
exports.CalculatePotentialScore = CalculatePotentialScore;
var UpdateContactScore = function (_a) {
    var contactId = _a.contactId, messageBody = _a.messageBody, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var score, updatedRowsCount, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    score = (0, exports.CalculatePotentialScore)(messageBody);
                    return [4 /*yield*/, Contact_1["default"].update({
                            potentialScore: score,
                            isPotential: score >= 5
                        }, {
                            where: {
                                id: contactId,
                                companyId: companyId
                            }
                        })];
                case 1:
                    updatedRowsCount = (_b.sent())[0];
                    if (updatedRowsCount > 0) {
                        logger_1["default"].info("Contact ".concat(contactId, " score updated: ").concat(score, " (isPotential: ").concat(score >= 5, ")"));
                    }
                    else {
                        logger_1["default"].warn("Contact ".concat(contactId, " not found for score update"));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    logger_1["default"].error("Error updating contact score:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.UpdateContactScore = UpdateContactScore;
var GetContactStats = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var stats, scoreDistribution, lidStabilityDistribution, error_2;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: { companyId: companyId },
                        attributes: [
                            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.col('id')), 'totalContacts'],
                            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.literal('CASE WHEN "isPotential" = true THEN 1 END')), 'potentialContacts'],
                            [sequelize_2.Sequelize.fn('AVG', sequelize_2.Sequelize.col('potentialScore')), 'averageScore'],
                            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.literal('CASE WHEN "savedToPhone" = true THEN 1 END')), 'savedToPhone'],
                            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.literal('CASE WHEN "lid" IS NOT NULL AND "lid" != \'\' THEN 1 END')), 'withLid']
                        ]
                    })];
            case 1:
                stats = _f.sent();
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: { companyId: companyId },
                        attributes: [
                            'potentialScore',
                            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.col('id')), 'count']
                        ],
                        group: ['potentialScore'],
                        order: [['potentialScore', 'ASC']]
                    })];
            case 2:
                scoreDistribution = _f.sent();
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: { companyId: companyId },
                        attributes: [
                            'lidStability',
                            [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.col('id')), 'count']
                        ],
                        group: ['lidStability'],
                        order: [['lidStability', 'ASC']]
                    })];
            case 3:
                lidStabilityDistribution = _f.sent();
                return [2 /*return*/, {
                        totalContacts: parseInt(String(((_a = stats[0]) === null || _a === void 0 ? void 0 : _a.get('totalContacts')) || 0)),
                        potentialContacts: parseInt(String(((_b = stats[0]) === null || _b === void 0 ? void 0 : _b.get('potentialContacts')) || 0)),
                        averageScore: parseFloat(String(((_c = stats[0]) === null || _c === void 0 ? void 0 : _c.get('averageScore')) || 0)),
                        savedToPhone: parseInt(String(((_d = stats[0]) === null || _d === void 0 ? void 0 : _d.get('savedToPhone')) || 0)),
                        withLid: parseInt(String(((_e = stats[0]) === null || _e === void 0 ? void 0 : _e.get('withLid')) || 0)),
                        scoreDistribution: scoreDistribution.map(function (item) { return ({
                            score: item.potentialScore,
                            count: parseInt(String(item.get('count')))
                        }); }),
                        lidStabilityDistribution: lidStabilityDistribution.map(function (item) { return ({
                            stability: item.lidStability,
                            count: parseInt(String(item.get('count')))
                        }); })
                    }];
            case 4:
                error_2 = _f.sent();
                logger_1["default"].error("Error getting contact stats:", error_2);
                throw error_2;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.GetContactStats = GetContactStats;
var GetHighPotentialContacts = function (companyId, limit) {
    if (limit === void 0) { limit = 50; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contacts, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Contact_1["default"].findAll({
                            where: {
                                companyId: companyId,
                                isPotential: true,
                                potentialScore: (_a = {}, _a[sequelize_1.Op.gte] = 7, _a)
                            },
                            order: [['potentialScore', 'DESC'], ['updatedAt', 'DESC']],
                            limit: limit
                        })];
                case 1:
                    contacts = _b.sent();
                    return [2 /*return*/, contacts];
                case 2:
                    error_3 = _b.sent();
                    logger_1["default"].error("Error getting high potential contacts:", error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.GetHighPotentialContacts = GetHighPotentialContacts;
var BatchUpdateContactScores = function (contacts) { return __awaiter(void 0, void 0, void 0, function () {
    var updates, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                updates = contacts.map(function (_a) {
                    var id = _a.id, messageBody = _a.messageBody, companyId = _a.companyId;
                    var score = (0, exports.CalculatePotentialScore)(messageBody);
                    return Contact_1["default"].update({
                        potentialScore: score,
                        isPotential: score >= 5
                    }, {
                        where: { id: id, companyId: companyId }
                    });
                });
                return [4 /*yield*/, Promise.all(updates)];
            case 1:
                _a.sent();
                logger_1["default"].info("Batch updated ".concat(contacts.length, " contact scores"));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                logger_1["default"].error("Error in batch contact score update:", error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.BatchUpdateContactScores = BatchUpdateContactScores;
