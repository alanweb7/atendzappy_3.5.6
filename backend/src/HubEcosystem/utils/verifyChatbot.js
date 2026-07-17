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
exports.makeid = exports.verifyChatbot = void 0;
var axios_1 = __importDefault(require("axios"));
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var string_similarity_1 = __importDefault(require("string-similarity"));
// import multer from 'multer';
var Mustache_1 = __importDefault(require("../../helpers/Mustache"));
var Setting_1 = __importDefault(require("../../models/Setting"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var UpdateTicketService_1 = __importDefault(require("../../services/TicketServices/UpdateTicketService"));
var TypebotServices_1 = require("../services/TypebotServices");
var ListUserQueueServices_1 = __importDefault(require("../../services/UserQueueServices/ListUserQueueServices"));
var SendMediaMessageService_1 = require("../services/SendMediaMessageService");
var SendTextMessageService_1 = require("../services/SendTextMessageService");
function verifyChatbot(connection, contents, ticket, contact) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var queues, maxUseBotQueues, selectedOption, whats, chosenQueue, buttonActive, typeBot, randomUserId, userQueue, error_1, settingsUserRandom, queueValues, queueId, nome, numero, receivedMessage, typeBotIn;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    queues = connection.queues, maxUseBotQueues = connection.maxUseBotQueues;
                    selectedOption = (_a = contents[0]) === null || _a === void 0 ? void 0 : _a.text;
                    if (!(maxUseBotQueues &&
                        maxUseBotQueues !== 0 &&
                        ticket.amountUsedBotQueues >= maxUseBotQueues)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Whatsapp_1["default"].findByPk(ticket.whatsappId)];
                case 1:
                    whats = _c.sent();
                    if (whats.maxUseBotQueues && whats.maxUseBotQueues != null && whats.maxUseBotQueues > 0) {
                        (0, UpdateTicketService_1["default"])({
                            ticketData: { queueId: whats.maxUseBotQueues },
                            ticketId: ticket.id,
                            companyId: ticket.companyId
                        });
                    }
                    return [2 /*return*/];
                case 2:
                    if (contact.disableBot) {
                        return [2 /*return*/];
                    }
                    chosenQueue = queues[+selectedOption - 1];
                    return [4 /*yield*/, Setting_1["default"].findOne({
                            where: { key: "chatBotType", companyId: ticket.companyId }
                        })];
                case 3:
                    buttonActive = _c.sent();
                    typeBot = (buttonActive === null || buttonActive === void 0 ? void 0 : buttonActive.value) || "text";
                    if (!chosenQueue) return [3 /*break*/, 7];
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, ListUserQueueServices_1["default"])(chosenQueue.id)];
                case 5:
                    userQueue = _c.sent();
                    if (userQueue.userId > -1) {
                        randomUserId = userQueue.userId;
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    console.error(error_1);
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, Setting_1["default"].findOne({
                        where: { key: "userRandom", companyId: ticket.companyId }
                    })];
                case 8:
                    settingsUserRandom = _c.sent();
                    queueValues = queues.map(function (queue) { return queue.name; });
                    queueId = queues.map(function (queue) { return queue.id; });
                    nome = contact.name;
                    numero = contact.number;
                    receivedMessage = (_b = contents[0]) === null || _b === void 0 ? void 0 : _b.text;
                    typeBotIn = function () { return __awaiter(_this, void 0, void 0, function () {
                        var resetFlux, urlTypeBot, nameTypeBot, apiUrl, token, typebotService, startChatResponse, ticketId, publicId, foundQueue, foundQueueError, foundQueueId, delayInMilliseconds_1, body, continueChatError_1, messages, _loop_1, _i, messages_1, message, input, formattedText, items, _a, items_1, item, error_2;
                        var _b, _c, _d, _e, _f;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    _g.trys.push([0, 24, , 25]);
                                    return [4 /*yield*/, Setting_1["default"].findOne({
                                            where: {
                                                key: "apiKeyTypeBot",
                                                companyId: ticket.companyId
                                            }
                                        })];
                                case 1:
                                    resetFlux = _g.sent();
                                    return [4 /*yield*/, Setting_1["default"].findOne({
                                            where: {
                                                key: "urlTypeBot",
                                                companyId: ticket.companyId
                                            }
                                        })];
                                case 2:
                                    urlTypeBot = _g.sent();
                                    return [4 /*yield*/, Setting_1["default"].findOne({
                                            where: {
                                                key: "viewerTypeBot",
                                                companyId: ticket.companyId
                                            }
                                        })];
                                case 3:
                                    nameTypeBot = _g.sent();
                                    apiUrl = urlTypeBot === null || urlTypeBot === void 0 ? void 0 : urlTypeBot.value;
                                    token = nameTypeBot === null || nameTypeBot === void 0 ? void 0 : nameTypeBot.value;
                                    if (!apiUrl || !token) {
                                        if (!apiUrl) {
                                            console.error("Url Inválido ou não fornecido");
                                        }
                                        if (!token) {
                                            console.error("Nome Inválido ou não fornecido");
                                        }
                                        return [2 /*return*/];
                                    }
                                    typebotService = new TypebotServices_1.TypebotService(apiUrl, token);
                                    startChatResponse = void 0;
                                    ticketId = ticket.id;
                                    publicId = token;
                                    foundQueue = queues.find(function (queue) {
                                        var similarity = string_similarity_1["default"].compareTwoStrings(queue.name.toLowerCase(), receivedMessage.toLowerCase());
                                        // Defina um limite de similaridade que considera aceitável
                                        var similarityThreshold = 0.5; // Pode ajustar conforme necessário
                                        return similarity >= similarityThreshold;
                                    });
                                    foundQueueError = false;
                                    if (!foundQueue) return [3 /*break*/, 8];
                                    foundQueueId = foundQueue.id;
                                    console.log("Fila encontrada - Nome: ".concat(foundQueue.name, ", ID: ").concat(foundQueueId));
                                    // Chame a função UpdateTicketService com o ID da fila
                                    return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                            ticketData: { queueId: foundQueueId },
                                            ticketId: ticket.id,
                                            companyId: ticket.companyId
                                        })];
                                case 4:
                                    // Chame a função UpdateTicketService com o ID da fila
                                    _g.sent();
                                    return [4 /*yield*/, ticket.update({
                                            typebotSessionId: null
                                        })];
                                case 5:
                                    _g.sent();
                                    delayInMilliseconds_1 = 3000;
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delayInMilliseconds_1); })];
                                case 6:
                                    _g.sent();
                                    body = (0, Mustache_1["default"])("".concat(foundQueue.greetingMessage), ticket);
                                    return [4 /*yield*/, (0, SendTextMessageService_1.SendTextMessageService)(body, ticket.id, ticket.contact, ticket.whatsapp)];
                                case 7:
                                    _g.sent();
                                    return [3 /*break*/, 23];
                                case 8:
                                    if (!(receivedMessage === (resetFlux === null || resetFlux === void 0 ? void 0 : resetFlux.value))) return [3 /*break*/, 11];
                                    console.log("Reiniciando Fluxo no TypeBot");
                                    return [4 /*yield*/, typebotService.startChat(token, receivedMessage, queueValues, nome, numero, ticketId)];
                                case 9:
                                    startChatResponse = _g.sent();
                                    return [4 /*yield*/, ticket.update({
                                            typebotSessionId: startChatResponse.sessionId
                                        })];
                                case 10:
                                    _g.sent();
                                    return [3 /*break*/, 17];
                                case 11:
                                    console.log("Verificando Se Fluxo Existe No TypeBot");
                                    _g.label = 12;
                                case 12:
                                    _g.trys.push([12, 14, , 17]);
                                    return [4 /*yield*/, typebotService.continueChat(ticket.typebotSessionId, receivedMessage)];
                                case 13:
                                    // Tente chamar continueChat
                                    startChatResponse = _g.sent();
                                    return [3 /*break*/, 17];
                                case 14:
                                    continueChatError_1 = _g.sent();
                                    // Se houver um erro no continueChat, chame startChat
                                    console.error("Erro ao continuar o TypeBot. Iniciando um novo TypeBot.", continueChatError_1);
                                    console.log("Criando Novo Fluxo No TypeBot");
                                    return [4 /*yield*/, typebotService.startChat(token, receivedMessage, queueValues, nome, numero, ticketId)];
                                case 15:
                                    startChatResponse = _g.sent();
                                    // Atualize o typebotToken no objeto Contact correspondente
                                    return [4 /*yield*/, ticket.update({
                                            typebotSessionId: startChatResponse.sessionId
                                        })];
                                case 16:
                                    // Atualize o typebotToken no objeto Contact correspondente
                                    _g.sent();
                                    return [3 /*break*/, 17];
                                case 17:
                                    messages = startChatResponse.messages;
                                    _loop_1 = function (message) {
                                        // if (message.type === "video") {
                                        //   console.log(`url do video: ${message.content?.url}`);
                                        //   try {
                                        //     const url = message.content?.url; // URL da imagem
                                        //     const caption = ""; // Substitua pela legenda desejada
                                        //     const localFilePath = `./public/company${
                                        //       ticket.companyId
                                        //     }/${makeid(10)}`;
                                        //     const fileName = localFilePath.substring(
                                        //       localFilePath.lastIndexOf("/") + 1
                                        //     );
                                        //     // await wbot.sendMessage(
                                        //     //   `${contact.number}@${
                                        //     //     ticket.isGroup ? "g.us" : "s.whatsapp.net"
                                        //     //   }`,
                                        //     //   {
                                        //     //     video: url
                                        //     //       ? { url }
                                        //     //       : fs.readFileSync(
                                        //     //           `./public/company${
                                        //     //             ticket.companyId
                                        //     //           }/${fileName}-${makeid(10)}`
                                        //     //         ),
                                        //     //     fileName: caption,
                                        //     //     caption: caption
                                        //     //     //mimetype: 'image/jpeg'
                                        //     //   }
                                        //     // );
                                        //   } catch (e) {}
                                        // }
                                        // if (message.type === "audio") {
                                        //   console.log(`url do audio: ${message.content?.url}`);
                                        //   try {
                                        //     const url = message.content?.url; // URL do arquivo de áudio
                                        //     const caption = ""; // Substitua pela legenda desejada
                                        //     const localFilePath = `./public/company${
                                        //       ticket.companyId
                                        //     }/${makeid(10)}.mp3`; // Nome do arquivo local
                                        //     // Baixar o arquivo de áudio da URL e salvar localmente
                                        //     const response = await axios.get(url, { responseType: "stream" });
                                        //     const audioStream = response.data;
                                        //     const fileStream = fs.createWriteStream(localFilePath);
                                        //     audioStream.pipe(fileStream);
                                        //     await new Promise((resolve, reject) => {
                                        //       fileStream.on("finish", resolve);
                                        //       fileStream.on("error", reject);
                                        //     });
                                        //     // await wbot.sendPresenceUpdate("recording", msg.key.remoteJid);
                                        //     // const delayInMilliseconds = 10000; // 1 segundo
                                        //     // await new Promise(resolve =>
                                        //     //   setTimeout(resolve, delayInMilliseconds)
                                        //     // );
                                        //     // await wbot.sendMessage(
                                        //     //   `${contact.number}@${
                                        //     //     ticket.isGroup ? "g.us" : "s.whatsapp.net"
                                        //     //   }`,
                                        //     //   {
                                        //     //     audio: fs.readFileSync(localFilePath),
                                        //     //     fileName: caption,
                                        //     //     caption: caption,
                                        //     //     mimetype: "audio/mp4", // Defina o tipo de mídia correto para arquivos de áudio
                                        //     //     ptt: true
                                        //     //   }
                                        //     // );
                                        //     // wbot.sendPresenceUpdate("available", msg.key.remoteJid);
                                        //     // Excluir o arquivo local após o envio (se necessário)
                                        //     // fs.unlinkSync(localFilePath);
                                        //   } catch (e) {
                                        //     console.error(e);
                                        //   }
                                        // }
                                        function wait(seconds) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); })];
                                                });
                                            });
                                        }
                                        var matchingAction, secondsToWait, matchingActionError_1, formattedText, _h, _j, richText, _k, _l, element, text, isBold, inlineText, linkUrl, _m, _o, childElement, linkUrl, delayInMilliseconds_2, url, response, imageStream, mimetype, _p, extension, localFilePath, fileStream, filename, media, e_1;
                                        return __generator(this, function (_q) {
                                            switch (_q.label) {
                                                case 0:
                                                    matchingAction = void 0;
                                                    _q.label = 1;
                                                case 1:
                                                    _q.trys.push([1, 4, , 5]);
                                                    matchingAction = startChatResponse.clientSideActions.find(function (action) { return action.lastBubbleBlockId === message.id; });
                                                    if (!matchingAction) return [3 /*break*/, 3];
                                                    secondsToWait = ((_b = matchingAction.wait) === null || _b === void 0 ? void 0 : _b.secondsToWaitFor) || 0;
                                                    console.log("Bloco de espera encontrado: ".concat(matchingAction.lastBubbleBlockId));
                                                    console.log("Espere por ".concat(secondsToWait, " segundos..."));
                                                    return [4 /*yield*/, wait(secondsToWait)];
                                                case 2:
                                                    _q.sent();
                                                    _q.label = 3;
                                                case 3: return [3 /*break*/, 5];
                                                case 4:
                                                    matchingActionError_1 = _q.sent();
                                                    try {
                                                        console.log("Nenhum Bloco de espera encontrado");
                                                    }
                                                    catch (nestedError) {
                                                        console.log("Prosseguindo");
                                                    }
                                                    return [3 /*break*/, 5];
                                                case 5:
                                                    if (!(message.type === "text")) return [3 /*break*/, 8];
                                                    formattedText = "";
                                                    for (_h = 0, _j = message.content.richText; _h < _j.length; _h++) {
                                                        richText = _j[_h];
                                                        for (_k = 0, _l = richText.children; _k < _l.length; _k++) {
                                                            element = _l[_k];
                                                            text = "";
                                                            isBold = false;
                                                            if (element.text) {
                                                                text = element.text;
                                                                isBold = element.bold || isBold;
                                                            }
                                                            else if (element.type === "inline-variable" &&
                                                                ((_d = (_c = element.children[0]) === null || _c === void 0 ? void 0 : _c.children[0]) === null || _d === void 0 ? void 0 : _d.text)) {
                                                                inlineText = element.children[0].children[0].text;
                                                                text = inlineText;
                                                                isBold = element.bold || isBold;
                                                            }
                                                            else if (element.type === "a") {
                                                                linkUrl = element.url;
                                                                text += "".concat(linkUrl);
                                                            }
                                                            else if (element.type === "p") {
                                                                for (_m = 0, _o = element.children; _m < _o.length; _m++) {
                                                                    childElement = _o[_m];
                                                                    if (childElement.text) {
                                                                        if (childElement.bold) {
                                                                            text += "*".concat(childElement.text, "*");
                                                                        }
                                                                        else {
                                                                            text += childElement.text;
                                                                        }
                                                                    }
                                                                    else if (childElement.type === "a") {
                                                                        linkUrl = childElement.url;
                                                                        text += "".concat(linkUrl);
                                                                    }
                                                                }
                                                            }
                                                            if (isBold) {
                                                                text = "*".concat(text, "*");
                                                            }
                                                            if (element.italic) {
                                                                text = "_".concat(text, "_");
                                                            }
                                                            if (element.underline) {
                                                                text = "~".concat(text, "~");
                                                            }
                                                            formattedText += text;
                                                        }
                                                        formattedText += "\n";
                                                    }
                                                    formattedText = formattedText.replace(/\n$/, "");
                                                    delayInMilliseconds_2 = 2000;
                                                    return [4 /*yield*/, new Promise(function (resolve) {
                                                            return setTimeout(resolve, delayInMilliseconds_2);
                                                        })];
                                                case 6:
                                                    _q.sent();
                                                    return [4 /*yield*/, (0, SendTextMessageService_1.SendTextMessageService)(formattedText, ticket.id, ticket.contact, ticket.whatsapp)];
                                                case 7:
                                                    _q.sent();
                                                    _q.label = 8;
                                                case 8:
                                                    if (!(message.type === "image")) return [3 /*break*/, 14];
                                                    console.log("url da imagem: ".concat((_e = message.content) === null || _e === void 0 ? void 0 : _e.url));
                                                    _q.label = 9;
                                                case 9:
                                                    _q.trys.push([9, 13, , 14]);
                                                    url = (_f = message.content) === null || _f === void 0 ? void 0 : _f.url;
                                                    return [4 /*yield*/, axios_1["default"].get(url, { responseType: 'stream' })];
                                                case 10:
                                                    response = _q.sent();
                                                    imageStream = response.data;
                                                    mimetype = response.headers['content-type'];
                                                    _p = mimetype.split('/'), extension = _p[1];
                                                    localFilePath = "./public/company".concat(ticket.companyId, "/").concat(makeid(10), ".").concat(extension);
                                                    fileStream = node_fs_1["default"].createWriteStream(localFilePath);
                                                    filename = localFilePath.substring(localFilePath.lastIndexOf("/") + 1);
                                                    return [4 /*yield*/, imageStream.pipe(fileStream)];
                                                case 11:
                                                    _q.sent();
                                                    media = {
                                                        fieldname: undefined,
                                                        originalname: undefined,
                                                        encoding: '7bit',
                                                        size: undefined,
                                                        stream: undefined,
                                                        destination: node_path_1["default"].join(__dirname, "public", "company".concat(ticket.companyId)),
                                                        buffer: undefined,
                                                        path: node_path_1["default"].resolve(localFilePath),
                                                        filename: filename,
                                                        mimetype: mimetype
                                                    };
                                                    return [4 /*yield*/, (0, SendMediaMessageService_1.SendMediaMessageService)(media, '', ticket.id, ticket.contact, ticket.whatsapp, true)];
                                                case 12:
                                                    _q.sent();
                                                    return [3 /*break*/, 14];
                                                case 13:
                                                    e_1 = _q.sent();
                                                    console.error(e_1);
                                                    return [3 /*break*/, 14];
                                                case 14: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, messages_1 = messages;
                                    _g.label = 18;
                                case 18:
                                    if (!(_i < messages_1.length)) return [3 /*break*/, 21];
                                    message = messages_1[_i];
                                    return [5 /*yield**/, _loop_1(message)];
                                case 19:
                                    _g.sent();
                                    _g.label = 20;
                                case 20:
                                    _i++;
                                    return [3 /*break*/, 18];
                                case 21:
                                    input = startChatResponse.input;
                                    if (!(input && input.type === "choice input")) return [3 /*break*/, 23];
                                    formattedText = "";
                                    items = input.items;
                                    for (_a = 0, items_1 = items; _a < items_1.length; _a++) {
                                        item = items_1[_a];
                                        formattedText += "\u25B6\uFE0F ".concat(item.content, "\n");
                                    }
                                    formattedText = formattedText.replace(/\n$/, "");
                                    return [4 /*yield*/, (0, SendTextMessageService_1.SendTextMessageService)(formattedText, ticket.id, ticket.contact, ticket.whatsapp)];
                                case 22:
                                    _g.sent();
                                    _g.label = 23;
                                case 23:
                                    if (foundQueueError) {
                                        // Se houve um erro na busca da fila, não execute este bloco
                                        return [2 /*return*/];
                                    }
                                    return [3 /*break*/, 25];
                                case 24:
                                    error_2 = _g.sent();
                                    // Trate qualquer erro que possa ocorrer durante a chamada da API
                                    console.error("Erro ao iniciar o chat:", error_2);
                                    return [3 /*break*/, 25];
                                case 25: return [2 /*return*/];
                            }
                        });
                    }); };
                    if (typeBot === "typeBot") {
                        return [2 /*return*/, typeBotIn()];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.verifyChatbot = verifyChatbot;
;
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.makeid = makeid;
