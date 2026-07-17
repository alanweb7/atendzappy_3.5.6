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
exports.trackClick = exports.embedScript = exports.remove = exports.store = exports.index = void 0;
var CreateWhatsappWidgetService_1 = __importDefault(require("../services/WhatsappWidgetService/CreateWhatsappWidgetService"));
var ListWhatsappWidgetsService_1 = __importDefault(require("../services/WhatsappWidgetService/ListWhatsappWidgetsService"));
var DeleteWhatsappWidgetService_1 = __importDefault(require("../services/WhatsappWidgetService/DeleteWhatsappWidgetService"));
var GetWidgetByCodeService_1 = __importDefault(require("../services/WhatsappWidgetService/GetWidgetByCodeService"));
var TrackWidgetClickService_1 = __importDefault(require("../services/WhatsappWidgetService/TrackWidgetClickService"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, whatsappId, widgets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                whatsappId = req.query.whatsappId;
                return [4 /*yield*/, (0, ListWhatsappWidgetsService_1["default"])({
                        companyId: companyId,
                        whatsappId: whatsappId ? Number(whatsappId) : undefined
                    })];
            case 1:
                widgets = _a.sent();
                return [2 /*return*/, res.json(widgets)];
        }
    });
}); };
exports.index = index;
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, whatsappId, name, welcomeMessage, buttonColor, buttonPosition, widget;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                companyId = req.user.companyId;
                _a = req.body, whatsappId = _a.whatsappId, name = _a.name, welcomeMessage = _a.welcomeMessage, buttonColor = _a.buttonColor, buttonPosition = _a.buttonPosition;
                return [4 /*yield*/, (0, CreateWhatsappWidgetService_1["default"])({
                        companyId: companyId,
                        whatsappId: Number(whatsappId),
                        name: name,
                        welcomeMessage: welcomeMessage,
                        buttonColor: buttonColor,
                        buttonPosition: buttonPosition
                    })];
            case 1:
                widget = _b.sent();
                return [2 /*return*/, res.status(201).json(widget)];
        }
    });
}); };
exports.store = store;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, widgetId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.user.companyId;
                widgetId = req.params.widgetId;
                return [4 /*yield*/, (0, DeleteWhatsappWidgetService_1["default"])({ widgetId: Number(widgetId), companyId: companyId })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Widget removido com sucesso." })];
        }
    });
}); };
exports.remove = remove;
var embedScript = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, widget, whatsapp, phone, message, color, position, apiBase, js, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = req.params.code;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, GetWidgetByCodeService_1["default"])(code)];
            case 2:
                widget = _b.sent();
                whatsapp = widget.whatsapp;
                phone = (whatsapp === null || whatsapp === void 0 ? void 0 : whatsapp.number) || "";
                message = encodeURIComponent(widget.welcomeMessage || "");
                color = widget.buttonColor || "#25D366";
                position = widget.buttonPosition || "bottom-right";
                apiBase = process.env.BACKEND_URL || "";
                js = "(function(){\n  var cfg={code:\"".concat(code, "\",phone:\"").concat(phone, "\",message:\"").concat(message, "\",color:\"").concat(color, "\",position:\"").concat(position, "\",api:\"").concat(apiBase, "\"};\n  var s=document.createElement(\"style\");\n  s.innerHTML=\"#wz-widget{position:fixed;").concat(position === "bottom-right" ? "right:20px" : "left:20px", ";bottom:20px;z-index:9999;cursor:pointer;width:56px;height:56px;border-radius:50%;background:\"+cfg.color+\";display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:transform .2s;}#wz-widget:hover{transform:scale(1.1);}#wz-widget svg{width:32px;height:32px;fill:#fff;}\";\n  document.head.appendChild(s);\n  var d=document.createElement(\"div\");\n  d.id=\"wz-widget\";\n  d.title=\"Fale pelo WhatsApp\";\n  d.innerHTML='<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\"/></svg>';\n  d.addEventListener(\"click\",function(){\n    try{fetch(cfg.api+\"/w/\"+cfg.code+\"/click\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({referrer:document.referrer,url:location.href}),keepalive:true});}catch(e){}\n    var url=\"https://wa.me/\"+cfg.phone+(cfg.message?\"?text=\"+cfg.message:\"\");\n    window.open(url,\"_blank\");\n  });\n  document.body.appendChild(d);\n})();");
                res.setHeader("Content-Type", "application/javascript");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Cache-Control", "public, max-age=300");
                res.send(js);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.setHeader("Content-Type", "application/javascript");
                res.send("/* widget not found */");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.embedScript = embedScript;
var trackClick = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, ip, userAgent, referrer, _a;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                code = req.params.code;
                ip = ((_c = (_b = req.headers["x-forwarded-for"]) === null || _b === void 0 ? void 0 : _b.split(",")[0]) === null || _c === void 0 ? void 0 : _c.trim()) || req.ip;
                userAgent = req.headers["user-agent"] || "";
                referrer = ((_d = req.body) === null || _d === void 0 ? void 0 : _d.referrer) || req.headers.referer || "";
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, TrackWidgetClickService_1["default"])({ code: code, ip: ip, userAgent: userAgent, referrer: referrer })];
            case 2:
                _e.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = _e.sent();
                return [3 /*break*/, 4];
            case 4:
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({ ok: true });
                return [2 /*return*/];
        }
    });
}); };
exports.trackClick = trackClick;
