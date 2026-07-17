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
var router = (0, express_1.Router)();
// Endpoint para proxy de consultas da API externa
router.post("/fipe", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, placa, link, apiKey, requestBody, response, data, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                console.log("[PROXY] POST /fipe - Requisição recebida");
                console.log("[PROXY] Headers completos:", JSON.stringify(req.headers, null, 2));
                console.log("[PROXY] Body completo:", JSON.stringify(req.body, null, 2));
                console.log("[PROXY] Body type:", typeof req.body);
                console.log("[PROXY] Body raw:", req.body);
                console.log("[PROXY] req.body.placa:", (_b = req.body) === null || _b === void 0 ? void 0 : _b.placa);
                console.log("[PROXY] req.body.link:", (_c = req.body) === null || _c === void 0 ? void 0 : _c.link);
                _a = req.body, placa = _a.placa, link = _a.link;
                console.log("[PROXY] Extraído:", { placa: placa, link: link });
                console.log("[PROXY] placa type:", typeof placa);
                console.log("[PROXY] link type:", typeof link);
                console.log("[PROXY] placa value:", placa);
                console.log("[PROXY] link value:", link);
                apiKey = "COLE_SEU_NOVO_TOKEN_AQUI";
                console.log("[PROXY] Token:", apiKey.substring(0, 30) + "...");
                if (!placa || !link) {
                    console.log("[PROXY] ERRO: placa ou link undefined");
                    return [2 /*return*/, res.status(400).json({
                            status: "erro",
                            mensagem: "Parâmetros 'placa' e 'link' são obrigatórios"
                        })];
                }
                requestBody = {
                    placa: placa.toUpperCase(),
                    link: link
                };
                console.log("[PROXY] Enviando para API externa:", requestBody);
                return [4 /*yield*/, fetch("https://api.apifull.com.br/api/fipe", {
                        method: 'POST',
                        headers: {
                            'Authorization': "Bearer ".concat(apiKey),
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    })];
            case 1:
                response = _d.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _d.sent();
                console.log("[PROXY] Resposta da API:", data);
                // Retornar resposta exata da API externa
                res.status(response.status).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                console.error("[PROXY] Erro na requisição:", error_1);
                res.status(500).json({
                    status: "erro",
                    mensagem: "Erro interno no proxy de consultas",
                    erro: error_1.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
