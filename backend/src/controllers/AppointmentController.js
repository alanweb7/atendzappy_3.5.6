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
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
var CreateAppointmentService_1 = __importDefault(require("../services/AppointmentServices/CreateAppointmentService"));
var ListAppointmentsService_1 = __importDefault(require("../services/AppointmentServices/ListAppointmentsService"));
var ShowAppointmentService_1 = __importDefault(require("../services/AppointmentServices/ShowAppointmentService"));
var UpdateAppointmentService_1 = __importDefault(require("../services/AppointmentServices/UpdateAppointmentService"));
var DeleteAppointmentService_1 = __importDefault(require("../services/AppointmentServices/DeleteAppointmentService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyId, userId, profile, userType, _b, scheduleId, status, startDate, endDate, pageNumber, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.user, companyId = _a.companyId, userId = _a.id, profile = _a.profile;
                userType = req.user.userType;
                _b = req.query, scheduleId = _b.scheduleId, status = _b.status, startDate = _b.startDate, endDate = _b.endDate, pageNumber = _b.pageNumber;
                return [4 /*yield*/, (0, ListAppointmentsService_1["default"])({
                        companyId: Number(companyId),
                        userId: Number(userId),
                        profile: profile,
                        userType: userType,
                        scheduleId: scheduleId,
                        status: status,
                        startDate: startDate,
                        endDate: endDate,
                        pageNumber: pageNumber
                    })];
            case 1:
                result = _c.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.index = index;
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, appointment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, ShowAppointmentService_1["default"])(id, Number(companyId))];
            case 1:
                appointment = _a.sent();
                return [2 /*return*/, res.json(appointment)];
        }
    });
}); };
exports.show = show;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, title, description, startDatetime, durationMinutes, status, scheduleId, serviceId, clientId, contactId, appointment, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, title = _a.title, description = _a.description, startDatetime = _a.startDatetime, durationMinutes = _a.durationMinutes, status = _a.status, scheduleId = _a.scheduleId, serviceId = _a.serviceId, clientId = _a.clientId, contactId = _a.contactId;
                console.log("Creating appointment:", {
                    title: title,
                    startDatetime: startDatetime,
                    durationMinutes: durationMinutes,
                    scheduleId: scheduleId,
                    companyId: companyId
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, CreateAppointmentService_1["default"])({
                        title: title,
                        description: description,
                        startDatetime: startDatetime,
                        durationMinutes: Number(durationMinutes),
                        status: status,
                        scheduleId: Number(scheduleId),
                        serviceId: serviceId ? Number(serviceId) : undefined,
                        clientId: clientId ? Number(clientId) : undefined,
                        contactId: contactId ? Number(contactId) : undefined,
                        companyId: Number(companyId)
                    })];
            case 2:
                appointment = _b.sent();
                return [2 /*return*/, res.status(201).json(appointment)];
            case 3:
                err_1 = _b.sent();
                console.error("Error creating appointment:", err_1);
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.store = store;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id, _a, title, description, startDatetime, durationMinutes, status, serviceId, clientId, contactId, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, startDatetime = _a.startDatetime, durationMinutes = _a.durationMinutes, status = _a.status, serviceId = _a.serviceId, clientId = _a.clientId, contactId = _a.contactId;
                return [4 /*yield*/, (0, UpdateAppointmentService_1["default"])({
                        id: id,
                        title: title,
                        description: description,
                        startDatetime: startDatetime,
                        durationMinutes: durationMinutes,
                        status: status,
                        serviceId: serviceId,
                        clientId: clientId,
                        contactId: contactId,
                        companyId: Number(companyId)
                    })];
            case 1:
                appointment = _b.sent();
                return [2 /*return*/, res.json(appointment)];
        }
    });
}); };
exports.update = update;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                id = req.params.id;
                return [4 /*yield*/, (0, DeleteAppointmentService_1["default"])(id, Number(companyId))];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
        }
    });
}); };
exports.remove = remove;
