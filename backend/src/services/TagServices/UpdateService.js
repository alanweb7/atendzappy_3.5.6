"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var ShowService_1 = __importDefault(require("./ShowService"));
var UpdateUserService = function (_a) {
    var tagData = _a.tagData, id = _a.id, companyId = _a.companyId;
    return __awaiter(void 0, void 0, void 0, function () {
        var tag, schema, name, color, kanban, timeLane, _b, nextLaneId, greetingMessageLane, _c, rollbackLaneId, autoActions, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, ShowService_1["default"])(id, companyId)];
                case 1:
                    tag = _d.sent();
                    schema = Yup.object().shape({
                        name: Yup.string().min(3)
                    });
                    name = tagData.name, color = tagData.color, kanban = tagData.kanban, timeLane = tagData.timeLane, _b = tagData.nextLaneId, nextLaneId = _b === void 0 ? null : _b, greetingMessageLane = tagData.greetingMessageLane, _c = tagData.rollbackLaneId, rollbackLaneId = _c === void 0 ? null : _c, autoActions = tagData.autoActions;
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, schema.validate({ name: name })];
                case 3:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _d.sent();
                    throw new AppError_1["default"](err_1.message);
                case 5: return [4 /*yield*/, tag.update({
                        name: name,
                        color: color,
                        kanban: kanban,
                        timeLane: timeLane,
                        nextLaneId: String(nextLaneId) === "" ? null : nextLaneId,
                        greetingMessageLane: greetingMessageLane,
                        rollbackLaneId: String(rollbackLaneId) === "" ? null : rollbackLaneId,
                        autoActions: autoActions
                    })];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, tag.reload()];
                case 7:
                    _d.sent();
                    return [2 /*return*/, tag];
            }
        });
    });
};
exports["default"] = UpdateUserService;
