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
exports.indexWhatsappsId = exports.checkNumber = exports.indexImage = exports.index = exports.OnWhatsAppDto = void 0;
var Yup = __importStar(require("yup"));
var fs_1 = __importDefault(require("fs"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var GetDefaultWhatsApp_1 = __importDefault(require("../helpers/GetDefaultWhatsApp"));
var SetTicketMessagesAsRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsRead"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var CreateOrUpdateContactService_1 = __importDefault(require("../services/ContactServices/CreateOrUpdateContactService"));
var FindOrCreateTicketService_1 = __importDefault(require("../services/TicketServices/FindOrCreateTicketService"));
var CheckNumber_1 = __importDefault(require("../services/WbotServices/CheckNumber"));
var SendWhatsAppMedia_1 = __importStar(require("../services/WbotServices/SendWhatsAppMedia"));
var UpdateTicketService_1 = __importDefault(require("../services/TicketServices/UpdateTicketService"));
var wbot_1 = require("../libs/wbot");
var SendWhatsAppMessageAPI_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMessageAPI"));
var SendWhatsappMediaImage_1 = __importDefault(require("../services/WbotServices/SendWhatsappMediaImage"));
var ApiUsages_1 = __importDefault(require("../models/ApiUsages"));
var useDate_1 = require("../utils/useDate");
var moment_1 = __importDefault(require("moment"));
var CompaniesSettings_1 = __importDefault(require("../models/CompaniesSettings"));
var ShowUserService_1 = __importDefault(require("../services/UserServices/ShowUserService"));
var lodash_1 = require("lodash");
var wbotMessageListener_1 = require("../services/WbotServices/wbotMessageListener");
var ShowQueueService_1 = __importDefault(require("../services/QueueService/ShowQueueService"));
var path_1 = __importDefault(require("path"));
var FindOrCreateATicketTrakingService_1 = __importDefault(require("../services/TicketServices/FindOrCreateATicketTrakingService"));
var async_mutex_1 = require("async-mutex");
var OnWhatsAppDto = /** @class */ (function () {
    function OnWhatsAppDto(jid, exists) {
        this.jid = jid;
        this.exists = exists;
    }
    return OnWhatsAppDto;
}());
exports.OnWhatsAppDto = OnWhatsAppDto;
var createContact = function (whatsappId, companyId, newContact, userId, queueId, wbot) { return __awaiter(void 0, void 0, void 0, function () {
    var validNumber, contactData, contact_1, settings_1, whatsapp_1, mutex, createTicket, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4 /*yield*/, (0, CheckNumber_1["default"])(newContact, companyId, newContact.length > 17)];
            case 1:
                validNumber = _a.sent();
                contactData = {
                    name: "".concat(validNumber),
                    number: validNumber,
                    profilePicUrl: "",
                    isGroup: false,
                    companyId: companyId,
                    whatsappId: whatsappId,
                    remoteJid: validNumber.length > 17 ? "".concat(validNumber, "@g.us") : "".concat(validNumber, "@s.whatsapp.net"),
                    wbot: wbot
                };
                return [4 /*yield*/, (0, CreateOrUpdateContactService_1["default"])(contactData)];
            case 2:
                contact_1 = _a.sent();
                return [4 /*yield*/, CompaniesSettings_1["default"].findOne({
                        where: { companyId: companyId }
                    })]; // return contact;
            case 3:
                settings_1 = _a.sent() // return contact;
                ;
                if (!(whatsappId === undefined)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(whatsappId, companyId)];
            case 4:
                whatsapp_1 = _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Whatsapp_1["default"].findByPk(whatsappId)];
            case 6:
                whatsapp_1 = _a.sent();
                if (whatsapp_1 === null) {
                    throw new AppError_1["default"]("whatsapp #".concat(whatsappId, " not found"));
                }
                _a.label = 7;
            case 7:
                mutex = new async_mutex_1.Mutex();
                return [4 /*yield*/, mutex.runExclusive(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var ticket;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, FindOrCreateTicketService_1["default"])(contact_1, whatsapp_1, 0, companyId, queueId, userId, null, whatsapp_1.channel, null, false, settings_1, false, false)];
                                case 1:
                                    ticket = _a.sent();
                                    return [2 /*return*/, ticket];
                            }
                        });
                    }); })];
            case 8:
                createTicket = _a.sent();
                if (!(createTicket && createTicket.channel === "whatsapp")) return [3 /*break*/, 10];
                (0, SetTicketMessagesAsRead_1["default"])(createTicket);
                return [4 /*yield*/, (0, FindOrCreateATicketTrakingService_1["default"])({ ticketId: createTicket.id, companyId: companyId, whatsappId: whatsapp_1.id, userId: userId })];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [2 /*return*/, createTicket];
            case 11:
                error_1 = _a.sent();
                throw new AppError_1["default"](error_1.message);
            case 12: return [2 /*return*/];
        }
    });
}); };
function formatBRNumber(jid) {
    var regexp = new RegExp(/^(\d{2})(\d{2})\d{1}(\d{8})$/);
    if (regexp.test(jid)) {
        var match = regexp.exec(jid);
        if (match && match[1] === '55' && Number.isInteger(Number.parseInt(match[2]))) {
            var ddd = Number.parseInt(match[2]);
            if (ddd < 31) {
                return match[0];
            }
            else if (ddd >= 31) {
                return match[1] + match[2] + match[3];
            }
        }
    }
    else {
        return jid;
    }
}
function createJid(number) {
    if (number.includes('@g.us') || number.includes('@s.whatsapp.net')) {
        return formatBRNumber(number);
    }
    return number.includes('-')
        ? "".concat(number, "@g.us")
        : "".concat(formatBRNumber(number), "@s.whatsapp.net");
}
// export const indexLink = async (req: Request, res: Response): Promise<Response> => {
//   const newContact: ContactData = req.body;
//   const { whatsappId }: WhatsappData = req.body;
//   const { msdelay }: any = req.body;
//   const url = req.body.url;
//   const caption = req.body.caption;
//   const authHeader = req.headers.authorization;
//   const [, token] = authHeader.split(" ");
//   const whatsapp = await Whatsapp.findOne({ where: { token } });
//   const companyId = whatsapp.companyId;
//   newContact.number = newContact.number.replace("-", "").replace(" ", "");
//   const schema = Yup.object().shape({
//     number: Yup.string()
//       .required()
//       .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
//   });
//   try {
//     await schema.validate(newContact);
//   } catch (err: any) {
//     throw new AppError(err.message);
//   }
//   const contactAndTicket = await createContact(whatsappId, companyId, newContact.number);
//   if (!contactAndTicket) {
//     throw new AppError("Cliente em outro atendimento")
//   }
//   await SendWhatsAppMessageLink({ whatsappId, contact: contactAndTicket.contact, url, caption, msdelay });
//   setTimeout(async () => {
//     const { dateToClient } = useDate();
//     const hoje: string = dateToClient(new Date())
//     const timestamp = moment().format();
//     const exist = await ApiUsages.findOne({
//       where: {
//         dateUsed: hoje,
//         companyId: companyId
//       }
//     });
//     if (exist) {
//       await exist.update({
//         usedPDF: exist.dataValues["usedPDF"] + 1,
//         UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
//         updatedAt: timestamp
//       });
//     } else {
//       const usage = await ApiUsages.create({
//         companyId: companyId,
//         dateUsed: hoje,
//       });
//       await usage.update({
//         usedPDF: usage.dataValues["usedPDF"] + 1,
//         UsedOnDay: usage.dataValues["UsedOnDay"] + 1,
//         updatedAt: timestamp
//       });
//     }
//   }, 100);
//   return res.send({ status: "SUCCESS" });
// };
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newContact, whatsappId, msdelay, _a, number, body, quotedMsg, userId, queueId, _b, sendSignature, _c, closeTicket, _d, noRegister, medias, authHeader, _e, token, whatsapp, companyId, schema, err_1, wbot, convertBinToPdfIfNeeded, user, queue, bodyMessage, error_2, contactAndTicket_1, sentMessage_1, error_3;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                newContact = req.body;
                whatsappId = req.body.whatsappId;
                msdelay = req.body.msdelay;
                _a = req.body, number = _a.number, body = _a.body, quotedMsg = _a.quotedMsg, userId = _a.userId, queueId = _a.queueId, _b = _a.sendSignature, sendSignature = _b === void 0 ? false : _b, _c = _a.closeTicket, closeTicket = _c === void 0 ? false : _c, _d = _a.noRegister, noRegister = _d === void 0 ? true : _d;
                medias = req.files;
                authHeader = req.headers.authorization;
                _e = authHeader.split(" "), token = _e[1];
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { token: token } })];
            case 1:
                whatsapp = _f.sent();
                companyId = whatsapp.companyId;
                newContact.number = newContact.number.replace(" ", "");
                schema = Yup.object().shape({
                    number: Yup.string()
                        .required()
                        .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
                });
                _f.label = 2;
            case 2:
                _f.trys.push([2, 4, , 5]);
                return [4 /*yield*/, schema.validate(newContact)];
            case 3:
                _f.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _f.sent();
                throw new AppError_1["default"](err_1.message);
            case 5: return [4 /*yield*/, (0, wbot_1.getWbot)(whatsapp.id)];
            case 6:
                wbot = _f.sent();
                convertBinToPdfIfNeeded = function (media) {
                    var publicFolder = path_1["default"].resolve(__dirname, "..", "..", "public");
                    var originalPath = path_1["default"].join(publicFolder, "company".concat(companyId), media.filename);
                    var ext = path_1["default"].extname(media.originalname || media.filename || "").toLowerCase();
                    var isBinExt = ext === ".bin";
                    var isBinMime = media.mimetype === "application/octet-stream";
                    if (isBinExt || isBinMime) {
                        var baseName = path_1["default"].basename(media.filename, path_1["default"].extname(media.filename));
                        var newFilename = "".concat(baseName, ".pdf");
                        var newPath = path_1["default"].join(publicFolder, "company".concat(companyId), newFilename);
                        try {
                            if (fs_1["default"].existsSync(originalPath)) {
                                fs_1["default"].renameSync(originalPath, newPath);
                            }
                        }
                        catch (err) {
                            console.log("Erro ao renomear arquivo bin para pdf na API:", err);
                        }
                        media.filename = newFilename;
                        media.originalname = media.originalname
                            ? media.originalname.replace(ext || ".bin", ".pdf")
                            : newFilename;
                        media.mimetype = "application/pdf";
                        return { media: media, filePath: newPath };
                    }
                    return { media: media, filePath: originalPath };
                };
                if (!((userId === null || userId === void 0 ? void 0 : userId.toString()) !== "" && !isNaN(userId))) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, ShowUserService_1["default"])(userId, companyId)];
            case 7:
                user = _f.sent();
                _f.label = 8;
            case 8:
                if (!((queueId === null || queueId === void 0 ? void 0 : queueId.toString()) !== "" && !isNaN(queueId))) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, ShowQueueService_1["default"])(queueId, companyId)];
            case 9:
                queue = _f.sent();
                _f.label = 10;
            case 10:
                // @ts-ignore: Unreachable code error
                if (sendSignature && !(0, lodash_1.isNil)(user)) {
                    bodyMessage = "*".concat(user.name, ":*\n").concat(body.trim());
                }
                else {
                    bodyMessage = body.trim();
                }
                if (!noRegister) return [3 /*break*/, 18];
                if (!medias) return [3 /*break*/, 15];
                _f.label = 11;
            case 11:
                _f.trys.push([11, 13, , 14]);
                // console.log(medias)
                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, filePath, adjustedMedia, options, fileExists;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = convertBinToPdfIfNeeded(media), filePath = _a.filePath, adjustedMedia = _a.media;
                                    return [4 /*yield*/, (0, SendWhatsAppMedia_1.getMessageOptions)(adjustedMedia.filename, filePath, companyId.toString(), "\u200E ".concat(bodyMessage))];
                                case 1:
                                    options = _b.sent();
                                    return [4 /*yield*/, wbot.sendMessage("".concat(newContact.number, "@").concat(newContact.number.length > 17 ? "g.us" : "s.whatsapp.net"), options)];
                                case 2:
                                    _b.sent();
                                    fileExists = fs_1["default"].existsSync(filePath);
                                    if (fileExists) {
                                        fs_1["default"].unlinkSync(filePath);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 12:
                // console.log(medias)
                _f.sent();
                return [3 /*break*/, 14];
            case 13:
                error_2 = _f.sent();
                console.log(medias);
                throw new AppError_1["default"]("Error sending API media: " + error_2.message);
            case 14: return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, wbot.sendMessage("".concat(newContact.number, "@").concat(newContact.number.length > 17 ? "g.us" : "s.whatsapp.net"), {
                    text: "\u200E ".concat(bodyMessage)
                })];
            case 16:
                _f.sent();
                _f.label = 17;
            case 17: return [3 /*break*/, 29];
            case 18: return [4 /*yield*/, createContact(whatsapp.id, companyId, newContact.number, userId, queueId, wbot)];
            case 19:
                contactAndTicket_1 = _f.sent();
                if (!medias) return [3 /*break*/, 25];
                _f.label = 20;
            case 20:
                _f.trys.push([20, 23, , 24]);
                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                        var adjustedMedia, publicFolder, filePath, fileExists;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    adjustedMedia = convertBinToPdfIfNeeded(media).media;
                                    return [4 /*yield*/, (0, SendWhatsAppMedia_1["default"])({
                                            body: "\u200E ".concat(bodyMessage),
                                            media: adjustedMedia,
                                            ticket: contactAndTicket_1,
                                            isForwarded: false
                                        })];
                                case 1:
                                    sentMessage_1 = _a.sent();
                                    publicFolder = path_1["default"].resolve(__dirname, "..", "..", "public");
                                    filePath = path_1["default"].join(publicFolder, "company".concat(companyId), adjustedMedia.filename);
                                    fileExists = fs_1["default"].existsSync(filePath);
                                    if (fileExists) {
                                        fs_1["default"].unlinkSync(filePath);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 21:
                _f.sent();
                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMediaMessage)(sentMessage_1, contactAndTicket_1, contactAndTicket_1.contact, null, false, false, wbot)];
            case 22:
                _f.sent();
                return [3 /*break*/, 24];
            case 23:
                error_3 = _f.sent();
                throw new AppError_1["default"]("Error sending API media: " + error_3.message);
            case 24: return [3 /*break*/, 28];
            case 25: return [4 /*yield*/, (0, SendWhatsAppMessageAPI_1["default"])({ body: "\u200E ".concat(bodyMessage), whatsappId: whatsapp.id, contact: contactAndTicket_1.contact, quotedMsg: quotedMsg, msdelay: msdelay })];
            case 26:
                sentMessage_1 = _f.sent();
                return [4 /*yield*/, (0, wbotMessageListener_1.verifyMessage)(sentMessage_1, contactAndTicket_1, contactAndTicket_1.contact)];
            case 27:
                _f.sent();
                _f.label = 28;
            case 28:
                // @ts-ignore: Unreachable code error
                if (closeTicket) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketId: contactAndTicket_1.id,
                                        ticketData: { status: "closed", sendFarewellMessage: false, amountUsedBotQueues: 0, lastMessage: body },
                                        companyId: companyId
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 100);
                }
                else if ((userId === null || userId === void 0 ? void 0 : userId.toString()) !== "" && !isNaN(userId)) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                        ticketId: contactAndTicket_1.id,
                                        ticketData: { status: "open", amountUsedBotQueues: 0, lastMessage: body, userId: userId, queueId: queueId },
                                        companyId: companyId
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 100);
                }
                _f.label = 29;
            case 29:
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var dateToClient, hoje, timestamp, exist;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                dateToClient = (0, useDate_1.useDate)().dateToClient;
                                hoje = dateToClient(new Date());
                                timestamp = (0, moment_1["default"])().format();
                                return [4 /*yield*/, ApiUsages_1["default"].findOne({
                                        where: {
                                            dateUsed: hoje,
                                            companyId: companyId
                                        }
                                    })];
                            case 1:
                                exist = _a.sent();
                                if (!exist) return [3 /*break*/, 6];
                                if (!medias) return [3 /*break*/, 3];
                                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!media.mimetype.includes("pdf")) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, exist.update({
                                                            usedPDF: exist.dataValues["usedPDF"] + 1,
                                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                            updatedAt: timestamp
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 2:
                                                    if (!media.mimetype.includes("image")) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, exist.update({
                                                            usedImage: exist.dataValues["usedImage"] + 1,
                                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                            updatedAt: timestamp
                                                        })];
                                                case 3:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 4:
                                                    if (!media.mimetype.includes("video")) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, exist.update({
                                                            usedVideo: exist.dataValues["usedVideo"] + 1,
                                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                            updatedAt: timestamp
                                                        })];
                                                case 5:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 6: return [4 /*yield*/, exist.update({
                                                        usedOther: exist.dataValues["usedOther"] + 1,
                                                        UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                        updatedAt: timestamp
                                                    })];
                                                case 7:
                                                    _a.sent();
                                                    _a.label = 8;
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 3: return [4 /*yield*/, exist.update({
                                    usedText: exist.dataValues["usedText"] + 1,
                                    UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                    updatedAt: timestamp
                                })];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [3 /*break*/, 11];
                            case 6: return [4 /*yield*/, ApiUsages_1["default"].create({
                                    companyId: companyId,
                                    dateUsed: hoje
                                })];
                            case 7:
                                exist = _a.sent();
                                if (!medias) return [3 /*break*/, 9];
                                return [4 /*yield*/, Promise.all(medias.map(function (media) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!media.mimetype.includes("pdf")) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, exist.update({
                                                            usedPDF: exist.dataValues["usedPDF"] + 1,
                                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                            updatedAt: timestamp
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 2:
                                                    if (!media.mimetype.includes("image")) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, exist.update({
                                                            usedImage: exist.dataValues["usedImage"] + 1,
                                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                            updatedAt: timestamp
                                                        })];
                                                case 3:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 4:
                                                    if (!media.mimetype.includes("video")) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, exist.update({
                                                            usedVideo: exist.dataValues["usedVideo"] + 1,
                                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                            updatedAt: timestamp
                                                        })];
                                                case 5:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 6: return [4 /*yield*/, exist.update({
                                                        usedOther: exist.dataValues["usedOther"] + 1,
                                                        UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                                        updatedAt: timestamp
                                                    })];
                                                case 7:
                                                    _a.sent();
                                                    _a.label = 8;
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                            case 8:
                                _a.sent();
                                return [3 /*break*/, 11];
                            case 9: return [4 /*yield*/, exist.update({
                                    usedText: exist.dataValues["usedText"] + 1,
                                    UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                    updatedAt: timestamp
                                })];
                            case 10:
                                _a.sent();
                                _a.label = 11;
                            case 11: return [2 /*return*/];
                        }
                    });
                }); }, 100);
                return [2 /*return*/, res.send({ status: "SUCCESS" })];
        }
    });
}); };
exports.index = index;
var indexImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newContact, whatsappId, msdelay, url, caption, authHeader, _a, token, whatsapp, companyId, schema, err_2, contactAndTicket;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newContact = req.body;
                whatsappId = req.body.whatsappId;
                msdelay = req.body.msdelay;
                url = req.body.url;
                caption = req.body.caption;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { token: token } })];
            case 1:
                whatsapp = _b.sent();
                companyId = whatsapp.companyId;
                newContact.number = newContact.number.replace("-", "").replace(" ", "");
                schema = Yup.object().shape({
                    number: Yup.string()
                        .required()
                        .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
                });
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, schema.validate(newContact)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                throw new AppError_1["default"](err_2.message);
            case 5: return [4 /*yield*/, createContact(whatsappId, companyId, newContact.number)];
            case 6:
                contactAndTicket = _b.sent();
                if (!url) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, SendWhatsappMediaImage_1["default"])({ ticket: contactAndTicket, url: url, caption: caption, msdelay: msdelay })];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, UpdateTicketService_1["default"])({
                                    ticketId: contactAndTicket.id,
                                    ticketData: { status: "closed", sendFarewellMessage: false, amountUsedBotQueues: 0 },
                                    companyId: companyId
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 100);
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var dateToClient, hoje, timestamp, exist, usage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                dateToClient = (0, useDate_1.useDate)().dateToClient;
                                hoje = dateToClient(new Date());
                                timestamp = (0, moment_1["default"])().format();
                                return [4 /*yield*/, ApiUsages_1["default"].findOne({
                                        where: {
                                            dateUsed: hoje,
                                            companyId: companyId
                                        }
                                    })];
                            case 1:
                                exist = _a.sent();
                                if (!exist) return [3 /*break*/, 3];
                                return [4 /*yield*/, exist.update({
                                        usedImage: exist.dataValues["usedImage"] + 1,
                                        UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                        updatedAt: timestamp
                                    })];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 3: return [4 /*yield*/, ApiUsages_1["default"].create({
                                    companyId: companyId,
                                    dateUsed: hoje
                                })];
                            case 4:
                                usage = _a.sent();
                                return [4 /*yield*/, usage.update({
                                        usedImage: usage.dataValues["usedImage"] + 1,
                                        UsedOnDay: usage.dataValues["UsedOnDay"] + 1,
                                        updatedAt: timestamp
                                    })];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }, 100);
                return [2 /*return*/, res.send({ status: "SUCCESS" })];
        }
    });
}); };
exports.indexImage = indexImage;
var checkNumber = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newContact, authHeader, _a, token, whatsapp, companyId, number, whatsappDefault, wbot, jid, result, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newContact = req.body;
                authHeader = req.headers.authorization;
                _a = authHeader.split(" "), token = _a[1];
                return [4 /*yield*/, Whatsapp_1["default"].findOne({ where: { token: token } })];
            case 1:
                whatsapp = _b.sent();
                companyId = whatsapp.companyId;
                number = newContact.number.replace("-", "").replace(" ", "");
                return [4 /*yield*/, (0, GetDefaultWhatsApp_1["default"])(whatsapp.id, companyId)];
            case 2:
                whatsappDefault = _b.sent();
                wbot = (0, wbot_1.getWbot)(whatsappDefault.id);
                jid = createJid(number);
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, wbot.onWhatsApp(jid)];
            case 4:
                result = (_b.sent())[0];
                if (result.exists) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var dateToClient, hoje, timestamp, exist, usage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    dateToClient = (0, useDate_1.useDate)().dateToClient;
                                    hoje = dateToClient(new Date());
                                    timestamp = (0, moment_1["default"])().format();
                                    return [4 /*yield*/, ApiUsages_1["default"].findOne({
                                            where: {
                                                dateUsed: hoje,
                                                companyId: companyId
                                            }
                                        })];
                                case 1:
                                    exist = _a.sent();
                                    if (!exist) return [3 /*break*/, 3];
                                    return [4 /*yield*/, exist.update({
                                            usedCheckNumber: exist.dataValues["usedCheckNumber"] + 1,
                                            UsedOnDay: exist.dataValues["UsedOnDay"] + 1,
                                            updatedAt: timestamp
                                        })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 3: return [4 /*yield*/, ApiUsages_1["default"].create({
                                        companyId: companyId,
                                        dateUsed: hoje
                                    })];
                                case 4:
                                    usage = _a.sent();
                                    return [4 /*yield*/, usage.update({
                                            usedCheckNumber: usage.dataValues["usedCheckNumber"] + 1,
                                            UsedOnDay: usage.dataValues["UsedOnDay"] + 1,
                                            updatedAt: timestamp
                                        })];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); }, 100);
                    return [2 /*return*/, res.status(200).json({ existsInWhatsapp: true, number: number, numberFormatted: result.jid })];
                }
                return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                return [2 /*return*/, res.status(400).json({ existsInWhatsapp: false, number: jid, error: "Not exists on Whatsapp" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.checkNumber = checkNumber;
var indexWhatsappsId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).json('oi')];
    });
}); };
exports.indexWhatsappsId = indexWhatsappsId;
