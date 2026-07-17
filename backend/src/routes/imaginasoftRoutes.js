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
exports.__esModule = true;
var express_1 = require("express");
var imaginasoftApi_1 = require("../services/imaginasoftApi");
var router = (0, express_1.Router)();
// --- Rotas de Clinics ---
router.get('/clinics', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clinics, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.getClinics)()];
            case 1:
                clinics = _a.sent();
                res.json(clinics);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Erro ao obter clínicas:', error_1);
                res.status(500).json({ error: 'Erro ao obter clínicas', details: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/clinics/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clinic, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.getClinicById)(req.params.id)];
            case 1:
                clinic = _a.sent();
                res.json(clinic);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Erro ao obter detalhes da clínica:', error_2);
                res.status(500).json({ error: 'Erro ao obter detalhes da clínica', details: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// --- Rotas de Patients ---
router.get('/patients', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patients, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.getPatients)(req.query)];
            case 1:
                patients = _a.sent();
                res.json(patients);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Erro ao obter pacientes:', error_3);
                res.status(500).json({ error: 'Erro ao obter pacientes', details: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/patients/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patient, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.getPatientById)(req.params.id)];
            case 1:
                patient = _a.sent();
                res.json(patient);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Erro ao obter detalhes do paciente:', error_4);
                res.status(500).json({ error: 'Erro ao obter detalhes do paciente', details: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/patients', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPatient, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.createPatient)(req.body)];
            case 1:
                newPatient = _a.sent();
                res.status(201).json(newPatient);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Erro ao criar paciente:', error_5);
                res.status(500).json({ error: 'Erro ao criar paciente', details: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/patients/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedPatient, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.updatePatient)(req.params.id, req.body)];
            case 1:
                updatedPatient = _a.sent();
                res.json(updatedPatient);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Erro ao atualizar paciente:', error_6);
                res.status(500).json({ error: 'Erro ao atualizar paciente', details: error_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// --- Rotas de Appointments ---
router.get('/appointments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appointments, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.getAppointments)(req.query)];
            case 1:
                appointments = _a.sent();
                res.json(appointments);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error('Erro ao obter agendamentos:', error_7);
                res.status(500).json({ error: 'Erro ao obter agendamentos', details: error_7.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/appointments/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appointment, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.getAppointmentById)(req.params.id)];
            case 1:
                appointment = _a.sent();
                res.json(appointment);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Erro ao obter detalhes do agendamento:', error_8);
                res.status(500).json({ error: 'Erro ao obter detalhes do agendamento', details: error_8.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/appointments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newAppointment, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.createAppointment)(req.body)];
            case 1:
                newAppointment = _a.sent();
                res.status(201).json(newAppointment);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error('Erro ao criar agendamento:', error_9);
                res.status(500).json({ error: 'Erro ao criar agendamento', details: error_9.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/appointments/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedAppointment, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, imaginasoftApi_1.updateAppointment)(req.params.id, req.body)];
            case 1:
                updatedAppointment = _a.sent();
                res.json(updatedAppointment);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error('Erro ao atualizar agendamento:', error_10);
                res.status(500).json({ error: 'Erro ao atualizar agendamento', details: error_10.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
