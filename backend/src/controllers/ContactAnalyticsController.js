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
exports.exportData = exports.getTopContacts = exports.getSavingReport = exports.getDeduplicationReport = exports.getContactStats = void 0;
var logger_1 = __importDefault(require("../utils/logger"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var ContactScoringService_1 = require("../services/ContactServices/ContactScoringService");
var Contact_1 = __importDefault(require("../models/Contact"));
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var getContactStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, startDate, endDate, whereClause, totalStats, scoreDistribution, stabilityDistribution, thirtyDaysAgo, temporalEvolution, error_1;
    var _b;
    var _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _l.trys.push([0, 5, , 6]);
                companyId = req.user.companyId;
                _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
                whereClause = { companyId: companyId };
                // Adicionar filtro de datas se fornecido
                if (startDate || endDate) {
                    whereClause.createdAt = {};
                    if (startDate) {
                        whereClause.createdAt[sequelize_1.Op.gte] = new Date(startDate);
                    }
                    if (endDate) {
                        whereClause.createdAt[sequelize_1.Op.lte] = new Date(endDate);
                    }
                }
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: whereClause,
                        attributes: [
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalContacts'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "isPotential" = true THEN 1 END')), 'potentialContacts'],
                            [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('potentialScore')), 'averageScore'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "savedToPhone" = true THEN 1 END')), 'savedToPhone'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "lid" IS NOT NULL AND "lid" != \'\' THEN 1 END')), 'withLid'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "lidStability" = \'high\' THEN 1 END')), 'highStability'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "lidStability" = \'medium\' THEN 1 END')), 'mediumStability'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "lidStability" = \'low\' THEN 1 END')), 'lowStability']
                        ]
                    })];
            case 1:
                totalStats = _l.sent();
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: whereClause,
                        attributes: [
                            'potentialScore',
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'count']
                        ],
                        group: ['potentialScore'],
                        order: [['potentialScore', 'ASC']]
                    })];
            case 2:
                scoreDistribution = _l.sent();
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: whereClause,
                        attributes: [
                            'lidStability',
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'count']
                        ],
                        group: ['lidStability'],
                        order: [['lidStability', 'ASC']]
                    })];
            case 3:
                stabilityDistribution = _l.sent();
                thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            createdAt: (_b = {}, _b[sequelize_1.Op.gte] = thirtyDaysAgo, _b)
                        },
                        attributes: [
                            [(0, sequelize_2.fn)('DATE', (0, sequelize_2.col)('createdAt')), 'date'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'created'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "isPotential" = true THEN 1 END')), 'potential'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "savedToPhone" = true THEN 1 END')), 'savedToPhone']
                        ],
                        group: [(0, sequelize_2.fn)('DATE', (0, sequelize_2.col)('createdAt'))],
                        order: [[(0, sequelize_2.fn)('DATE', (0, sequelize_2.col)('createdAt')), 'ASC']]
                    })];
            case 4:
                temporalEvolution = _l.sent();
                return [2 /*return*/, res.status(200).json({
                        summary: {
                            totalContacts: parseInt(String(((_c = totalStats[0]) === null || _c === void 0 ? void 0 : _c.get('totalContacts')) || 0)),
                            potentialContacts: parseInt(String(((_d = totalStats[0]) === null || _d === void 0 ? void 0 : _d.get('potentialContacts')) || 0)),
                            averageScore: parseFloat(String(((_e = totalStats[0]) === null || _e === void 0 ? void 0 : _e.get('averageScore')) || 0)),
                            savedToPhone: parseInt(String(((_f = totalStats[0]) === null || _f === void 0 ? void 0 : _f.get('savedToPhone')) || 0)),
                            withLid: parseInt(String(((_g = totalStats[0]) === null || _g === void 0 ? void 0 : _g.get('withLid')) || 0)),
                            lidStability: {
                                high: parseInt(String(((_h = totalStats[0]) === null || _h === void 0 ? void 0 : _h.get('highStability')) || 0)),
                                medium: parseInt(String(((_j = totalStats[0]) === null || _j === void 0 ? void 0 : _j.get('mediumStability')) || 0)),
                                low: parseInt(String(((_k = totalStats[0]) === null || _k === void 0 ? void 0 : _k.get('lowStability')) || 0))
                            }
                        },
                        scoreDistribution: scoreDistribution.map(function (item) { return ({
                            score: item.potentialScore,
                            count: parseInt(String(item.get('count')))
                        }); }),
                        stabilityDistribution: stabilityDistribution.map(function (item) { return ({
                            stability: item.lidStability,
                            count: parseInt(String(item.get('count')))
                        }); }),
                        temporalEvolution: temporalEvolution.map(function (item) { return ({
                            date: item.get('date'),
                            created: parseInt(String(item.get('created'))),
                            potential: parseInt(String(item.get('potential'))),
                            savedToPhone: parseInt(String(item.get('savedToPhone')))
                        }); })
                    })];
            case 5:
                error_1 = _l.sent();
                logger_1["default"].error("Error getting contact stats:", error_1);
                throw new AppError_1["default"]("ERR_GET_CONTACT_STATS", 500);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getContactStats = getContactStats;
var getDeduplicationReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, limit, duplicateAnalysis, numberGroups_1, duplicateGroups, totalNumbers, duplicatedNumbers, duplicateRate, unstableLidContacts, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                companyId = req.user.companyId;
                _a = req.query.limit, limit = _a === void 0 ? 50 : _a;
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: { companyId: companyId },
                        attributes: ['number', 'lid', 'remoteJid', 'name', 'potentialScore', 'savedToPhone', 'lidStability', 'createdAt']
                    })];
            case 1:
                duplicateAnalysis = _c.sent();
                numberGroups_1 = {};
                duplicateAnalysis.forEach(function (contact) {
                    var _a;
                    var cleanNumber = ((_a = contact.number) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, '')) || '';
                    if (cleanNumber) {
                        if (!numberGroups_1[cleanNumber]) {
                            numberGroups_1[cleanNumber] = [];
                        }
                        numberGroups_1[cleanNumber].push(contact);
                    }
                });
                duplicateGroups = Object.entries(numberGroups_1)
                    .filter(function (_a) {
                    var _ = _a[0], contacts = _a[1];
                    return contacts.length > 1;
                })
                    .map(function (_a) {
                    var number = _a[0], contacts = _a[1];
                    return ({
                        number: number,
                        contacts: contacts.map(function (c) { return ({
                            id: c.id,
                            name: c.name,
                            lid: c.lid,
                            remoteJid: c.remoteJid,
                            potentialScore: c.potentialScore,
                            savedToPhone: c.savedToPhone,
                            lidStability: c.lidStability,
                            createdAt: c.createdAt
                        }); }),
                        count: contacts.length
                    });
                })
                    .sort(function (a, b) { return b.count - a.count; })
                    .slice(0, parseInt(String(limit)));
                totalNumbers = Object.keys(numberGroups_1).length;
                duplicatedNumbers = duplicateGroups.length;
                duplicateRate = totalNumbers > 0 ? (duplicatedNumbers / totalNumbers) * 100 : 0;
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            lidStability: 'low',
                            lid: (_b = {}, _b[sequelize_1.Op.ne] = null, _b)
                        },
                        limit: 20,
                        order: [['potentialScore', 'DESC'], ['createdAt', 'DESC']]
                    })];
            case 2:
                unstableLidContacts = _c.sent();
                return [2 /*return*/, res.status(200).json({
                        summary: {
                            totalNumbers: totalNumbers,
                            duplicatedNumbers: duplicatedNumbers,
                            duplicateRate: parseFloat(duplicateRate.toFixed(2)),
                            totalDuplicates: duplicateGroups.reduce(function (sum, group) { return sum + group.count - 1; }, 0)
                        },
                        duplicateGroups: duplicateGroups,
                        unstableLidContacts: unstableLidContacts.map(function (contact) { return ({
                            id: contact.id,
                            name: contact.name,
                            number: contact.number,
                            lid: contact.lid,
                            lidStability: contact.lidStability,
                            potentialScore: contact.potentialScore,
                            createdAt: contact.createdAt
                        }); })
                    })];
            case 3:
                error_2 = _c.sent();
                logger_1["default"].error("Error getting deduplication report:", error_2);
                throw new AppError_1["default"]("ERR_GET_DEDUPLICATION_REPORT", 500);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDeduplicationReport = getDeduplicationReport;
var getSavingReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, period, daysAgo, startDate, savingStats, recentSaves, totalPotential, totalSaved, conversionRate, error_3;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 5, , 6]);
                companyId = req.user.companyId;
                _a = req.query.period, period = _a === void 0 ? '7d' : _a;
                daysAgo = 7;
                if (period === '30d')
                    daysAgo = 30;
                if (period === '90d')
                    daysAgo = 90;
                startDate = new Date();
                startDate.setDate(startDate.getDate() - daysAgo);
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            savedToPhone: true,
                            savedToPhoneAt: (_b = {}, _b[sequelize_1.Op.gte] = startDate, _b)
                        },
                        attributes: [
                            [(0, sequelize_2.fn)('DATE', (0, sequelize_2.col)('savedToPhoneAt')), 'date'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'saved'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "potentialScore" >= 7 THEN 1 END')), 'highPotential'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "potentialScore" >= 5 AND "potentialScore" < 7 THEN 1 END')), 'mediumPotential'],
                            [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.literal)('CASE WHEN "potentialScore" < 5 THEN 1 END')), 'lowPotential']
                        ],
                        group: [(0, sequelize_2.fn)('DATE', (0, sequelize_2.col)('savedToPhoneAt'))],
                        order: [[(0, sequelize_2.fn)('DATE', (0, sequelize_2.col)('savedToPhoneAt')), 'ASC']]
                    })];
            case 1:
                savingStats = _f.sent();
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: {
                            companyId: companyId,
                            savedToPhone: true,
                            savedToPhoneAt: (_c = {}, _c[sequelize_1.Op.gte] = startDate, _c)
                        },
                        order: [['savedToPhoneAt', 'DESC']],
                        limit: 50
                    })];
            case 2:
                recentSaves = _f.sent();
                return [4 /*yield*/, Contact_1["default"].count({
                        where: {
                            companyId: companyId,
                            isPotential: true,
                            createdAt: (_d = {}, _d[sequelize_1.Op.gte] = startDate, _d)
                        }
                    })];
            case 3:
                totalPotential = _f.sent();
                return [4 /*yield*/, Contact_1["default"].count({
                        where: {
                            companyId: companyId,
                            savedToPhone: true,
                            savedToPhoneAt: (_e = {}, _e[sequelize_1.Op.gte] = startDate, _e)
                        }
                    })];
            case 4:
                totalSaved = _f.sent();
                conversionRate = totalPotential > 0 ? (totalSaved / totalPotential) * 100 : 0;
                return [2 /*return*/, res.status(200).json({
                        period: {
                            type: period,
                            days: daysAgo,
                            startDate: startDate.toISOString().split('T')[0],
                            endDate: new Date().toISOString().split('T')[0]
                        },
                        summary: {
                            totalPotential: totalPotential,
                            totalSaved: totalSaved,
                            conversionRate: parseFloat(conversionRate.toFixed(2)),
                            averagePerDay: parseFloat((totalSaved / daysAgo).toFixed(2))
                        },
                        dailyStats: savingStats.map(function (item) { return ({
                            date: item.get('date'),
                            saved: parseInt(String(item.get('saved'))),
                            highPotential: parseInt(String(item.get('highPotential'))),
                            mediumPotential: parseInt(String(item.get('mediumPotential'))),
                            lowPotential: parseInt(String(item.get('lowPotential')))
                        }); }),
                        recentSaves: recentSaves.map(function (contact) { return ({
                            id: contact.id,
                            name: contact.name,
                            number: contact.number,
                            potentialScore: contact.potentialScore,
                            savedToPhoneReason: contact.savedToPhoneReason,
                            savedToPhoneAt: contact.savedToPhoneAt
                        }); })
                    })];
            case 5:
                error_3 = _f.sent();
                logger_1["default"].error("Error getting saving report:", error_3);
                throw new AppError_1["default"]("ERR_GET_SAVING_REPORT", 500);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getSavingReport = getSavingReport;
var getTopContacts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, _b, type, _c, limit, contacts, orderBy, _d, error_4;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 10, , 11]);
                companyId = req.user.companyId;
                _a = req.query, _b = _a.type, type = _b === void 0 ? 'potential' : _b, _c = _a.limit, limit = _c === void 0 ? 20 : _c;
                contacts = void 0;
                orderBy = [];
                _d = type;
                switch (_d) {
                    case 'potential': return [3 /*break*/, 1];
                    case 'saved': return [3 /*break*/, 3];
                    case 'recent': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, (0, ContactScoringService_1.GetHighPotentialContacts)(companyId, parseInt(String(limit)))];
            case 2:
                contacts = _e.sent();
                return [3 /*break*/, 9];
            case 3: return [4 /*yield*/, Contact_1["default"].findAll({
                    where: {
                        companyId: companyId,
                        savedToPhone: true
                    },
                    order: [['savedToPhoneAt', 'DESC'], ['potentialScore', 'DESC']],
                    limit: parseInt(String(limit))
                })];
            case 4:
                contacts = _e.sent();
                return [3 /*break*/, 9];
            case 5: return [4 /*yield*/, Contact_1["default"].findAll({
                    where: { companyId: companyId },
                    order: [['createdAt', 'DESC']],
                    limit: parseInt(String(limit))
                })];
            case 6:
                contacts = _e.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, (0, ContactScoringService_1.GetHighPotentialContacts)(companyId, parseInt(String(limit)))];
            case 8:
                contacts = _e.sent();
                _e.label = 9;
            case 9: return [2 /*return*/, res.status(200).json({
                    type: type,
                    contacts: contacts.map(function (contact) { return ({
                        id: contact.id,
                        name: contact.name,
                        number: contact.number,
                        email: contact.email,
                        potentialScore: contact.potentialScore,
                        isPotential: contact.isPotential,
                        savedToPhone: contact.savedToPhone,
                        savedToPhoneAt: contact.savedToPhoneAt,
                        savedToPhoneReason: contact.savedToPhoneReason,
                        lidStability: contact.lidStability,
                        createdAt: contact.createdAt,
                        updatedAt: contact.updatedAt
                    }); })
                })];
            case 10:
                error_4 = _e.sent();
                logger_1["default"].error("Error getting top contacts:", error_4);
                throw new AppError_1["default"]("ERR_GET_TOP_CONTACTS", 500);
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.getTopContacts = getTopContacts;
var exportData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, format, contacts, csvHeader, csvData, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                companyId = req.user.companyId;
                _a = req.query.format, format = _a === void 0 ? 'json' : _a;
                return [4 /*yield*/, Contact_1["default"].findAll({
                        where: { companyId: companyId },
                        attributes: [
                            'id', 'name', 'number', 'email', 'potentialScore', 'isPotential',
                            'savedToPhone', 'savedToPhoneAt', 'savedToPhoneReason',
                            'lid', 'lidStability', 'createdAt', 'updatedAt'
                        ],
                        order: [['createdAt', 'DESC']]
                    })];
            case 1:
                contacts = _b.sent();
                if (format === 'csv') {
                    csvHeader = 'ID,Nome,Numero,Email,Score,É Potencial,Salvo no Celular,Data Salvamento,Motivo,LID,Estabilidade LID,Criação,Atualização\n';
                    csvData = contacts.map(function (contact) {
                        return "".concat(contact.id, ",\"").concat(contact.name || '', "\",\"").concat(contact.number, "\",\"").concat(contact.email || '', "\",").concat(contact.potentialScore, ",").concat(contact.isPotential, ",").concat(contact.savedToPhone, ",\"").concat(contact.savedToPhoneAt || '', "\",\"").concat(contact.savedToPhoneReason || '', "\",\"").concat(contact.lid || '', "\",\"").concat(contact.lidStability || '', "\",\"").concat(contact.createdAt, "\",\"").concat(contact.updatedAt, "\"");
                    }).join('\n');
                    res.setHeader('Content-Type', 'text/csv');
                    res.setHeader('Content-Disposition', "attachment; filename=\"contacts_".concat(companyId, ".csv\""));
                    return [2 /*return*/, res.send(csvHeader + csvData)];
                }
                // Default: JSON
                return [2 /*return*/, res.status(200).json({
                        total: contacts.length,
                        exportedAt: new Date().toISOString(),
                        contacts: contacts
                    })];
            case 2:
                error_5 = _b.sent();
                logger_1["default"].error("Error exporting contact data:", error_5);
                throw new AppError_1["default"]("ERR_EXPORT_CONTACT_DATA", 500);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.exportData = exportData;
