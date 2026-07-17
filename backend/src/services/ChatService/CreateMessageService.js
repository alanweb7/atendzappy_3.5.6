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
var Chat_1 = __importDefault(require("../../models/Chat"));
var ChatMessage_1 = __importDefault(require("../../models/ChatMessage"));
var ChatUser_1 = __importDefault(require("../../models/ChatUser"));
var User_1 = __importDefault(require("../../models/User"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function CreateMessageService(_a) {
    var senderId = _a.senderId, chatId = _a.chatId, message = _a.message, medias = _a.medias;
    return __awaiter(this, void 0, void 0, function () {
        var mediaPath, mediaName, media, dir, filePath, newMessage, sender, chatUsers, _i, chatUsers_1, chatUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mediaPath = "";
                    mediaName = "";
                    // Processar mídia se existir
                    if (medias && medias.length > 0) {
                        media = medias[0];
                        dir = path_1["default"].join(__dirname, "..", "..", "..", "public", "chat-media");
                        // Garantir que o diretório existe
                        if (!fs_1["default"].existsSync(dir)) {
                            fs_1["default"].mkdirSync(dir, { recursive: true });
                        }
                        // Criar nome de arquivo único
                        mediaName = "".concat(new Date().getTime(), "-").concat(media.originalname.replace(/\s/g, "_"));
                        filePath = path_1["default"].join(dir, mediaName);
                        // Salvar arquivo
                        fs_1["default"].writeFileSync(filePath, media.buffer);
                        // Definir caminho da mídia para salvar no banco de dados
                        mediaPath = "/chat-media/".concat(mediaName);
                    }
                    return [4 /*yield*/, ChatMessage_1["default"].create({
                            senderId: senderId,
                            chatId: chatId,
                            message: message,
                            mediaPath: mediaPath,
                            mediaName: mediaName
                        })];
                case 1:
                    newMessage = _b.sent();
                    return [4 /*yield*/, newMessage.reload({
                            include: [
                                { model: User_1["default"], as: "sender", attributes: ["id", "name"] },
                                {
                                    model: Chat_1["default"],
                                    as: "chat",
                                    include: [{ model: ChatUser_1["default"], as: "users" }]
                                }
                            ]
                        })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, User_1["default"].findByPk(senderId)];
                case 3:
                    sender = _b.sent();
                    return [4 /*yield*/, newMessage.chat.update({ lastMessage: "".concat(sender.name, ": ").concat(message) })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, ChatUser_1["default"].findAll({
                            where: { chatId: chatId }
                        })];
                case 5:
                    chatUsers = _b.sent();
                    _i = 0, chatUsers_1 = chatUsers;
                    _b.label = 6;
                case 6:
                    if (!(_i < chatUsers_1.length)) return [3 /*break*/, 11];
                    chatUser = chatUsers_1[_i];
                    if (!(chatUser.userId === senderId)) return [3 /*break*/, 8];
                    return [4 /*yield*/, chatUser.update({ unreads: 0 })];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, chatUser.update({ unreads: chatUser.unreads + 1 })];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11: return [2 /*return*/, newMessage];
            }
        });
    });
}
exports["default"] = CreateMessageService;
