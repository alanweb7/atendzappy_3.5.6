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
exports.ActionsWebhookFacebookService = void 0;
var Chatbot_1 = __importDefault(require("../../../models/Chatbot"));
var Contact_1 = __importDefault(require("../../../models/Contact"));
var Queue_1 = __importDefault(require("../../../models/Queue"));
var Ticket_1 = __importDefault(require("../../../models/Ticket"));
var Whatsapp_1 = __importDefault(require("../../../models/Whatsapp"));
var ShowTicketService_1 = __importDefault(require("../../TicketServices/ShowTicketService"));
var graphAPI_1 = require("../graphAPI");
var Mustache_1 = __importDefault(require("../../../helpers/Mustache"));
var mime_1 = __importDefault(require("mime"));
var path_1 = __importDefault(require("path"));
var socket_1 = require("../../../libs/socket");
var randomizador_1 = require("../../../utils/randomizador");
var CreateLogTicketService_1 = __importDefault(require("../../TicketServices/CreateLogTicketService"));
var UpdateTicketService_1 = __importDefault(require("../../TicketServices/UpdateTicketService"));
var FindOrCreateATicketTrakingService_1 = __importDefault(require("../../TicketServices/FindOrCreateATicketTrakingService"));
var ShowQueueService_1 = __importDefault(require("../../QueueService/ShowQueueService"));
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
fluent_ffmpeg_1["default"].setFfmpegPath(ffmpeg_1["default"].path);
var ActionsWebhookFacebookService = function (token, idFlowDb, companyId, nodes, connects, nextStage, dataWebhook, details, hashWebhookId, pressKey, idTicket, numberPhrase) { return __awaiter(void 0, void 0, void 0, function () {
    var io, next, createFieldJsonName, connectStatic, lengthLoop, getSession, execCount, execFn, ticket, noAlterNext, selectedQueueid, _loop_1, i, state_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("=== EXECUTANDO ActionsWebhookFacebookService ===");
                console.log("CompanyId:", companyId);
                console.log("NumberPhrase:", numberPhrase);
                io = (0, socket_1.getIO)();
                next = nextStage;
                createFieldJsonName = "";
                connectStatic = connects;
                lengthLoop = nodes.length;
                return [4 /*yield*/, Whatsapp_1["default"].findOne({
                        where: {
                            facebookPageUserId: token.facebookPageUserId
                        },
                        include: [
                            {
                                model: Queue_1["default"],
                                as: "queues",
                                attributes: ["id", "name", "color", "greetingMessage"],
                                include: [
                                    {
                                        model: Chatbot_1["default"],
                                        as: "chatbots",
                                        attributes: ["id", "name", "greetingMessage"]
                                    }
                                ]
                            }
                        ],
                        order: [
                            ["queues", "id", "ASC"],
                            ["queues", "chatbots", "id", "ASC"]
                        ]
                    })];
            case 1:
                getSession = _a.sent();
                execCount = 0;
                execFn = "";
                ticket = null;
                noAlterNext = false;
                selectedQueueid = null;
                _loop_1 = function () {
                    var nodeSelected, ticketInit, ticket_1, otherNode, queue_1, _loop_2, iLoc, mediaPath, fileExtension, fileNameWithoutExtension, mimeType, domain, contact, sendMessage, ticketDetails, mediaDirectory, contact, fileExtension, fileNameWithoutExtension, mimeType, domain, sendMessage, ticketDetails, timerSeconds_1, mediaDirectory, contact, fileExtension, fileNameWithoutExtension, mimeType, domain, sendMessage, ticketDetails, isRandomizer, selectedRandom, resultConnect, isMenu, filterOne, filterTwo, isNodeExist, optionsMenu_1, menuCreate, msg, ticketDetails, contact, isContinue, result, result, nextNode, ticket_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                ticketInit = void 0;
                                if (!idTicket) return [3 /*break*/, 4];
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { id: idTicket }
                                    })];
                            case 1:
                                ticketInit = _b.sent();
                                if (!(ticketInit.status === "closed")) return [3 /*break*/, 2];
                                return [2 /*return*/, "break"];
                            case 2: return [4 /*yield*/, ticketInit.update({
                                    dataWebhook: {
                                        status: "process"
                                    }
                                })];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                if (!pressKey) return [3 /*break*/, 9];
                                if (!(pressKey === "parar")) return [3 /*break*/, 8];
                                if (!idTicket) return [3 /*break*/, 7];
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { id: idTicket }
                                    })];
                            case 5:
                                ticket_1 = _b.sent();
                                return [4 /*yield*/, ticket_1.update({
                                        status: "closed"
                                    })];
                            case 6:
                                _b.sent();
                                _b.label = 7;
                            case 7: return [2 /*return*/, "break"];
                            case 8:
                                if (execFn === "") {
                                    nodeSelected = {
                                        type: "menu"
                                    };
                                }
                                else {
                                    nodeSelected = nodes.filter(function (node) { return node.id === execFn; })[0];
                                }
                                return [3 /*break*/, 10];
                            case 9:
                                otherNode = nodes.filter(function (node) { return node.id === next; })[0];
                                if (otherNode) {
                                    nodeSelected = otherNode;
                                }
                                _b.label = 10;
                            case 10:
                                console.log("[".concat(i, "] Processando node:"), {
                                    id: nodeSelected.id,
                                    type: nodeSelected.type,
                                    data: nodeSelected.data
                                });
                                if (!(nodeSelected.type === "ticket")) return [3 /*break*/, 12];
                                return [4 /*yield*/, (0, ShowQueueService_1["default"])(nodeSelected.data.data.id, companyId)];
                            case 11:
                                queue_1 = _b.sent();
                                console.clear();
                                console.log("====================================");
                                console.log("              TICKET                ");
                                console.log("====================================");
                                selectedQueueid = queue_1.id;
                                console.log({ selectedQueueid: selectedQueueid });
                                _b.label = 12;
                            case 12:
                                if (!(nodeSelected.type === "singleBlock")) return [3 /*break*/, 16];
                                _loop_2 = function () {
                                    var elementNowSelected, bodyFor, ticketDetails, contact, bodyBot, sentMessage, mediaPath, contact, fileExtension, fileNameWithoutExtension, mimeType, domain, sendMessage, ticketDetails, mediaDirectory, contact, fileExtension, fileNameWithoutExtension, mimeType, fileNotExists, folder, domain, sendMessage, ticketDetails, mediaDirectory, contact, fileExtension, fileNameWithoutExtension, mimeType, domain, sendMessage, ticketDetails;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                elementNowSelected = nodeSelected.data.seq[iLoc];
                                                console.log(elementNowSelected, "elementNowSelected");
                                                if (!elementNowSelected.includes("message")) return [3 /*break*/, 10];
                                                bodyFor = nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value;
                                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                                            case 1:
                                                ticketDetails = _c.sent();
                                                return [4 /*yield*/, Contact_1["default"].findOne({
                                                        where: { number: numberPhrase.number, companyId: companyId }
                                                    })];
                                            case 2:
                                                contact = _c.sent();
                                                bodyBot = (0, Mustache_1["default"])("".concat(bodyFor), ticket);
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                                            case 3:
                                                _c.sent();
                                                return [4 /*yield*/, intervalWhats("5")];
                                            case 4:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.sendText)(contact.number, bodyBot, getSession.facebookUserToken)];
                                            case 5:
                                                sentMessage = _c.sent();
                                                return [4 /*yield*/, ticketDetails.update({
                                                        lastMessage: (0, Mustache_1["default"])(bodyFor, ticket.contact)
                                                    })];
                                            case 6:
                                                _c.sent();
                                                return [4 /*yield*/, updateQueueId(ticket, companyId, selectedQueueid)];
                                            case 7:
                                                _c.sent();
                                                return [4 /*yield*/, intervalWhats("1")];
                                            case 8:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                                            case 9:
                                                _c.sent();
                                                _c.label = 10;
                                            case 10:
                                                if (!elementNowSelected.includes("interval")) return [3 /*break*/, 12];
                                                return [4 /*yield*/, intervalWhats(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)];
                                            case 11:
                                                _c.sent();
                                                _c.label = 12;
                                            case 12:
                                                if (!elementNowSelected.includes("img")) return [3 /*break*/, 20];
                                                mediaPath = process.env.BACKEND_URL === "https://localhost:8090"
                                                    ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)
                                                    : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value);
                                                return [4 /*yield*/, Contact_1["default"].findOne({
                                                        where: { number: numberPhrase.number, companyId: companyId }
                                                    })];
                                            case 13:
                                                contact = _c.sent();
                                                fileExtension = path_1["default"].extname(mediaPath);
                                                fileNameWithoutExtension = path_1["default"].basename(mediaPath, fileExtension);
                                                mimeType = mime_1["default"].lookup(mediaPath);
                                                domain = "".concat(process.env.BACKEND_URL, "/public/").concat(fileNameWithoutExtension).concat(fileExtension);
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                                            case 14:
                                                _c.sent();
                                                return [4 /*yield*/, intervalWhats("5")];
                                            case 15:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(contact.number, domain, "image", getSession.facebookUserToken)];
                                            case 16:
                                                sendMessage = _c.sent();
                                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                                            case 17:
                                                ticketDetails = _c.sent();
                                                return [4 /*yield*/, ticketDetails.update({
                                                        lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket.contact)
                                                    })];
                                            case 18:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                                            case 19:
                                                _c.sent();
                                                _c.label = 20;
                                            case 20:
                                                if (!elementNowSelected.includes("audio")) return [3 /*break*/, 30];
                                                mediaDirectory = process.env.BACKEND_URL === "https://localhost:8090"
                                                    ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)
                                                    : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value);
                                                return [4 /*yield*/, Contact_1["default"].findOne({
                                                        where: { number: numberPhrase.number, companyId: companyId }
                                                    })];
                                            case 21:
                                                contact = _c.sent();
                                                fileExtension = path_1["default"].extname(mediaDirectory);
                                                fileNameWithoutExtension = path_1["default"].basename(mediaDirectory, fileExtension);
                                                mimeType = mime_1["default"].lookup(mediaDirectory);
                                                fileNotExists = path_1["default"].resolve(__dirname, "..", "..", "..", "..", "public", fileNameWithoutExtension + ".mp4");
                                                if (!fileNotExists) return [3 /*break*/, 23];
                                                folder = path_1["default"].resolve(__dirname, "..", "..", "..", "..", "public", fileNameWithoutExtension + fileExtension);
                                                return [4 /*yield*/, convertAudio(folder)];
                                            case 22:
                                                _c.sent();
                                                _c.label = 23;
                                            case 23:
                                                domain = "".concat(process.env.BACKEND_URL, "/public/").concat(fileNameWithoutExtension, ".mp4");
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                                            case 24:
                                                _c.sent();
                                                return [4 /*yield*/, intervalWhats("5")];
                                            case 25:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(contact.number, domain, "audio", getSession.facebookUserToken)];
                                            case 26:
                                                sendMessage = _c.sent();
                                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                                            case 27:
                                                ticketDetails = _c.sent();
                                                return [4 /*yield*/, ticketDetails.update({
                                                        lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket.contact)
                                                    })];
                                            case 28:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                                            case 29:
                                                _c.sent();
                                                _c.label = 30;
                                            case 30:
                                                if (!elementNowSelected.includes("video")) return [3 /*break*/, 37];
                                                mediaDirectory = process.env.BACKEND_URL === "https://localhost:8090"
                                                    ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value)
                                                    : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.elements.filter(function (item) { return item.number === elementNowSelected; })[0].value);
                                                return [4 /*yield*/, Contact_1["default"].findOne({
                                                        where: { number: numberPhrase.number, companyId: companyId }
                                                    })];
                                            case 31:
                                                contact = _c.sent();
                                                fileExtension = path_1["default"].extname(mediaDirectory);
                                                fileNameWithoutExtension = path_1["default"].basename(mediaDirectory, fileExtension);
                                                mimeType = mime_1["default"].lookup(mediaDirectory);
                                                domain = "".concat(process.env.BACKEND_URL, "/public/").concat(fileNameWithoutExtension).concat(fileExtension);
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                                            case 32:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(contact.number, domain, "video", getSession.facebookUserToken)];
                                            case 33:
                                                sendMessage = _c.sent();
                                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                                            case 34:
                                                ticketDetails = _c.sent();
                                                return [4 /*yield*/, ticketDetails.update({
                                                        lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket.contact)
                                                    })];
                                            case 35:
                                                _c.sent();
                                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                                            case 36:
                                                _c.sent();
                                                _c.label = 37;
                                            case 37: return [2 /*return*/];
                                        }
                                    });
                                };
                                iLoc = 0;
                                _b.label = 13;
                            case 13:
                                if (!(iLoc < nodeSelected.data.seq.length)) return [3 /*break*/, 16];
                                return [5 /*yield**/, _loop_2()];
                            case 14:
                                _b.sent();
                                _b.label = 15;
                            case 15:
                                iLoc++;
                                return [3 /*break*/, 13];
                            case 16:
                                if (!(nodeSelected.type === "img")) return [3 /*break*/, 24];
                                mediaPath = process.env.BACKEND_URL === "https://localhost:8090"
                                    ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.url)
                                    : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.url);
                                fileExtension = path_1["default"].extname(mediaPath);
                                fileNameWithoutExtension = path_1["default"].basename(mediaPath, fileExtension);
                                mimeType = mime_1["default"].lookup(mediaPath);
                                domain = "".concat(process.env.BACKEND_URL, "/public/").concat(fileNameWithoutExtension).concat(fileExtension);
                                return [4 /*yield*/, Contact_1["default"].findOne({
                                        where: { number: numberPhrase.number, companyId: companyId }
                                    })];
                            case 17:
                                contact = _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                            case 18:
                                _b.sent();
                                return [4 /*yield*/, intervalWhats("5")];
                            case 19:
                                _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(contact.number, domain, "image", getSession.facebookUserToken)];
                            case 20:
                                sendMessage = _b.sent();
                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                            case 21:
                                ticketDetails = _b.sent();
                                return [4 /*yield*/, ticketDetails.update({
                                        lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket.contact)
                                    })];
                            case 22:
                                _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                            case 23:
                                _b.sent();
                                _b.label = 24;
                            case 24:
                                if (!(nodeSelected.type === "audio")) return [3 /*break*/, 30];
                                mediaDirectory = process.env.BACKEND_URL === "https://localhost:8090"
                                    ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.url)
                                    : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.url);
                                return [4 /*yield*/, Contact_1["default"].findOne({
                                        where: { number: numberPhrase.number, companyId: companyId }
                                    })];
                            case 25:
                                contact = _b.sent();
                                fileExtension = path_1["default"].extname(mediaDirectory);
                                fileNameWithoutExtension = path_1["default"].basename(mediaDirectory, fileExtension);
                                mimeType = mime_1["default"].lookup(mediaDirectory);
                                domain = "".concat(process.env.BACKEND_URL, "/public/").concat(fileNameWithoutExtension).concat(fileExtension);
                                return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(contact.number, domain, "audio", getSession.facebookUserToken)];
                            case 26:
                                sendMessage = _b.sent();
                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                            case 27:
                                ticketDetails = _b.sent();
                                return [4 /*yield*/, ticketDetails.update({
                                        lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket.contact)
                                    })];
                            case 28:
                                _b.sent();
                                return [4 /*yield*/, intervalWhats("1")];
                            case 29:
                                _b.sent();
                                _b.label = 30;
                            case 30:
                                if (!(nodeSelected.type === "interval")) return [3 /*break*/, 32];
                                timerSeconds_1 = parseInt(nodeSelected.data.sec, 10);
                                console.log("Iniciando timer de ".concat(timerSeconds_1, " segundos..."));
                                return [4 /*yield*/, new Promise(function (resolve) {
                                        setTimeout(function () {
                                            console.log("Timer de ".concat(timerSeconds_1, " segundos finalizado."));
                                            resolve(true);
                                        }, timerSeconds_1 * 1000);
                                    })];
                            case 31:
                                _b.sent();
                                console.log("Prosseguindo para pr\u00F3ximo node...");
                                _b.label = 32;
                            case 32:
                                if (!(nodeSelected.type === "video")) return [3 /*break*/, 39];
                                mediaDirectory = process.env.BACKEND_URL === "https://localhost:8090"
                                    ? "".concat(__dirname.split("src")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.url)
                                    : "".concat(__dirname.split("dist")[0].split("\\").join("/"), "public/").concat(nodeSelected.data.url);
                                return [4 /*yield*/, Contact_1["default"].findOne({
                                        where: { number: numberPhrase.number, companyId: companyId }
                                    })];
                            case 33:
                                contact = _b.sent();
                                fileExtension = path_1["default"].extname(mediaDirectory);
                                fileNameWithoutExtension = path_1["default"].basename(mediaDirectory, fileExtension);
                                mimeType = mime_1["default"].lookup(mediaDirectory);
                                domain = "".concat(process.env.BACKEND_URL, "/public/").concat(fileNameWithoutExtension).concat(fileExtension);
                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                            case 34:
                                _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.sendAttachmentFromUrl)(contact.number, domain, "video", getSession.facebookUserToken)];
                            case 35:
                                sendMessage = _b.sent();
                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                            case 36:
                                ticketDetails = _b.sent();
                                return [4 /*yield*/, ticketDetails.update({
                                        lastMessage: (0, Mustache_1["default"])("".concat(fileNameWithoutExtension).concat(fileExtension), ticket.contact)
                                    })];
                            case 37:
                                _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                            case 38:
                                _b.sent();
                                _b.label = 39;
                            case 39:
                                isRandomizer = void 0;
                                if (nodeSelected.type === "randomizer") {
                                    selectedRandom = (0, randomizador_1.randomizarCaminho)(nodeSelected.data.percent / 100);
                                    resultConnect = connects.filter(function (connect) { return connect.source === nodeSelected.id; });
                                    if (selectedRandom === "A") {
                                        next = resultConnect.filter(function (item) { return item.sourceHandle === "a"; })[0]
                                            .target;
                                        noAlterNext = true;
                                    }
                                    else {
                                        next = resultConnect.filter(function (item) { return item.sourceHandle === "b"; })[0]
                                            .target;
                                        noAlterNext = true;
                                    }
                                    isRandomizer = true;
                                }
                                isMenu = void 0;
                                if (!(nodeSelected.type === "menu")) return [3 /*break*/, 50];
                                if (!pressKey) return [3 /*break*/, 40];
                                filterOne = connectStatic.filter(function (confil) { return confil.source === next; });
                                filterTwo = filterOne.filter(function (filt2) { return filt2.sourceHandle === "a" + pressKey; });
                                if (filterTwo.length > 0) {
                                    execFn = filterTwo[0].target;
                                }
                                else {
                                    execFn = undefined;
                                }
                                // execFn =
                                //   connectStatic
                                //     .filter(confil => confil.source === next)
                                //     .filter(filt2 => filt2.sourceHandle === "a" + pressKey)[0]?.target ??
                                //   undefined;
                                if (execFn === undefined) {
                                    return [2 /*return*/, "break"];
                                }
                                pressKey = "999";
                                isNodeExist = nodes.filter(function (item) { return item.id === execFn; });
                                if (isNodeExist.length > 0) {
                                    isMenu = isNodeExist[0].type === "menu" ? true : false;
                                }
                                else {
                                    isMenu = false;
                                }
                                return [3 /*break*/, 50];
                            case 40:
                                optionsMenu_1 = "";
                                nodeSelected.data.arrayOption.map(function (item) {
                                    optionsMenu_1 += "[".concat(item.number, "] ").concat(item.value, "\n");
                                });
                                menuCreate = "".concat(nodeSelected.data.message, "\n\n").concat(optionsMenu_1);
                                msg = void 0;
                                return [4 /*yield*/, (0, ShowTicketService_1["default"])(ticket.id, companyId)];
                            case 41:
                                ticketDetails = _b.sent();
                                //await CreateMessageService({ messageData: messageData, companyId });
                                //await SendWhatsAppMessage({ body: bodyFor, ticket: ticketDetails, quotedMsg: null })
                                // await SendMessage(whatsapp, {
                                //   number: numberClient,
                                //   body: msg.body
                                // });
                                return [4 /*yield*/, ticketDetails.update({
                                        lastMessage: (0, Mustache_1["default"])(menuCreate, ticket.contact)
                                    })];
                            case 42:
                                //await CreateMessageService({ messageData: messageData, companyId });
                                //await SendWhatsAppMessage({ body: bodyFor, ticket: ticketDetails, quotedMsg: null })
                                // await SendMessage(whatsapp, {
                                //   number: numberClient,
                                //   body: msg.body
                                // });
                                _b.sent();
                                return [4 /*yield*/, Contact_1["default"].findOne({
                                        where: { number: numberPhrase.number, companyId: companyId }
                                    })];
                            case 43:
                                contact = _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_on")];
                            case 44:
                                _b.sent();
                                return [4 /*yield*/, intervalWhats("5")];
                            case 45:
                                _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.sendText)(numberPhrase.number, menuCreate, getSession.facebookUserToken)];
                            case 46:
                                _b.sent();
                                return [4 /*yield*/, (0, graphAPI_1.showTypingIndicator)(contact.number, getSession.facebookUserToken, "typing_off")];
                            case 47:
                                _b.sent();
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { id: idTicket, companyId: companyId }
                                    })];
                            case 48:
                                ticket = _b.sent();
                                return [4 /*yield*/, ticket.update({
                                        status: "pending",
                                        queueId: ticket.queueId ? ticket.queueId : null,
                                        userId: null,
                                        companyId: companyId,
                                        flowWebhook: true,
                                        lastFlowId: nodeSelected.type === "directOpenai" ? ticket.lastFlowId : nodeSelected.id,
                                        dataWebhook: dataWebhook,
                                        hashFlowId: hashWebhookId,
                                        flowStopped: idFlowDb.toString()
                                    })];
                            case 49:
                                _b.sent();
                                return [2 /*return*/, "break"];
                            case 50:
                                isContinue = false;
                                if (!(pressKey === "999" && execCount > 0)) return [3 /*break*/, 54];
                                pressKey = undefined;
                                result = connects.filter(function (connect) { return connect.source === execFn; })[0];
                                if (!(typeof result === "undefined")) return [3 /*break*/, 51];
                                next = "";
                                return [3 /*break*/, 53];
                            case 51:
                                if (!!noAlterNext) return [3 /*break*/, 53];
                                return [4 /*yield*/, ticket.reload()];
                            case 52:
                                _b.sent();
                                next = result.target;
                                _b.label = 53;
                            case 53: return [3 /*break*/, 55];
                            case 54:
                                result = void 0;
                                if (isMenu) {
                                    result = { target: execFn };
                                    isContinue = true;
                                    pressKey = undefined;
                                }
                                else if (isRandomizer) {
                                    isRandomizer = false;
                                    result = next;
                                }
                                else {
                                    result = connects.filter(function (connect) { return connect.source === next; })[0];
                                    console.log(512, "ActionsWebhookFacebookService");
                                }
                                if (typeof result === "undefined") {
                                    console.log(517, "ActionsWebhookFacebookService");
                                    next = "";
                                }
                                else {
                                    if (!noAlterNext) {
                                        console.log(520, "ActionsWebhookFacebookService");
                                        next = result.target;
                                    }
                                }
                                _b.label = 55;
                            case 55:
                                if (!(!pressKey && !isContinue)) return [3 /*break*/, 59];
                                nextNode = connects.filter(function (connect) { return connect.source === nodeSelected.id; }).length;
                                console.log(530, "ActionsWebhookFacebookService");
                                if (!(nextNode === 0)) return [3 /*break*/, 59];
                                console.log(532, "ActionsWebhookFacebookService");
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { id: idTicket, companyId: companyId }
                                    })];
                            case 56:
                                ticket_2 = _b.sent();
                                return [4 /*yield*/, ticket_2.update({
                                        lastFlowId: ticket_2.flowWebhook ? ticket_2.lastFlowId : null,
                                        dataWebhook: {
                                            status: "process"
                                        },
                                        queueId: ticket_2.queueId ? ticket_2.queueId : null,
                                        hashFlowId: ticket_2.flowWebhook ? ticket_2.hashFlowId : null,
                                        flowWebhook: false,
                                        flowStopped: idFlowDb.toString()
                                    })];
                            case 57:
                                _b.sent();
                                return [4 /*yield*/, ticket_2.reload()];
                            case 58:
                                _b.sent();
                                return [2 /*return*/, "break"];
                            case 59:
                                isContinue = false;
                                if (next === "") {
                                    return [2 /*return*/, "break"];
                                }
                                return [4 /*yield*/, Ticket_1["default"].findOne({
                                        where: { id: idTicket, companyId: companyId }
                                    })];
                            case 60:
                                ticket = _b.sent();
                                return [4 /*yield*/, ticket.update({
                                        queueId: null,
                                        userId: null,
                                        companyId: companyId,
                                        flowWebhook: true,
                                        lastFlowId: nodeSelected.type === "directOpenai" ? ticket.lastFlowId : nodeSelected.id,
                                        dataWebhook: dataWebhook,
                                        hashFlowId: hashWebhookId,
                                        flowStopped: idFlowDb.toString()
                                    })];
                            case 61:
                                _b.sent();
                                noAlterNext = false;
                                execCount++;
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < lengthLoop)) return [3 /*break*/, 5];
                return [5 /*yield**/, _loop_1()];
            case 3:
                state_1 = _a.sent();
                if (state_1 === "break")
                    return [3 /*break*/, 5];
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, "ds"];
        }
    });
}); };
exports.ActionsWebhookFacebookService = ActionsWebhookFacebookService;
var constructJsonLine = function (line, json) {
    var valor = json;
    var chaves = line.split(".");
    if (chaves.length === 1) {
        return valor[chaves[0]];
    }
    for (var _i = 0, chaves_1 = chaves; _i < chaves_1.length; _i++) {
        var chave = chaves_1[_i];
        valor = valor[chave];
    }
    return valor;
};
function removerNaoLetrasNumeros(texto) {
    // Substitui todos os caracteres que nÃ£o sÃ£o letras ou nÃºmeros por vazio
    return texto.replace(/[^a-zA-Z0-9]/g, "");
}
var intervalWhats = function (time) {
    var seconds = parseInt(time, 10) * 1000;
    console.log("IntervalWhats: aguardando ".concat(time, " segundos (").concat(seconds, "ms)"));
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log("IntervalWhats: ".concat(time, " segundos conclu\u00EDdo"));
            resolve(seconds);
        }, seconds);
    });
};
var replaceMessages = function (message, details, dataWebhook, dataNoWebhook) {
    var matches = message.match(/\{([^}]+)\}/g);
    if (dataWebhook) {
        var newTxt = message.replace(/{+nome}+/, dataNoWebhook.nome);
        newTxt = newTxt.replace(/{+numero}+/, dataNoWebhook.numero);
        newTxt = newTxt.replace(/{+email}+/, dataNoWebhook.email);
        return newTxt;
    }
    if (matches && matches.includes("inputs")) {
        var placeholders = matches.map(function (match) { return match.replace(/\{|\}/g, ""); });
        var newText_1 = message;
        placeholders.map(function (item) {
            var value = details["inputs"].find(function (itemLocal) { return itemLocal.keyValue === item; });
            var lineToData = details["keysFull"].find(function (itemLocal) {
                return itemLocal.endsWith(".".concat(value.data));
            });
            var createFieldJson = constructJsonLine(lineToData, dataWebhook);
            newText_1 = newText_1.replace("{".concat(item, "}"), createFieldJson);
        });
        return newText_1;
    }
    else {
        return message;
    }
};
function updateQueueId(ticket, companyId, queueId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ticket.update({
                        status: 'pending',
                        queueId: queueId,
                        userId: ticket.userId,
                        companyId: companyId
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({
                            ticketId: ticket.id,
                            companyId: companyId,
                            whatsappId: ticket.whatsappId,
                            userId: ticket.userId
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                            ticketData: {
                                status: "pending",
                                queueId: queueId
                            },
                            ticketId: ticket.id,
                            companyId: companyId
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, CreateLogTicketService_1["default"])({
                            ticketId: ticket.id,
                            type: "queue",
                            queueId: queueId
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function convertAudio(inputFile) {
    var outputFile;
    if (inputFile.endsWith(".mp3")) {
        outputFile = inputFile.replace(".mp3", ".mp4");
    }
    console.log("output", outputFile);
    return new Promise(function (resolve, reject) {
        (0, fluent_ffmpeg_1["default"])(inputFile)
            .toFormat('mp4')
            .save(outputFile)
            .on('end', function () {
            resolve(outputFile);
        })
            .on('error', function (err) {
            console.error('Error during conversion:', err);
            reject(err);
        });
    });
}
