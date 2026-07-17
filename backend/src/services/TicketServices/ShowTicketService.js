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
var Ticket_1 = __importDefault(require("../../models/Ticket"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var Contact_1 = __importDefault(require("../../models/Contact"));
var User_1 = __importDefault(require("../../models/User"));
var Queue_1 = __importDefault(require("../../models/Queue"));
var Plan_1 = __importDefault(require("../../models/Plan"));
var Tag_1 = __importDefault(require("../../models/Tag"));
var Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
var Company_1 = __importDefault(require("../../models/Company"));
var QueueIntegrations_1 = __importDefault(require("../../models/QueueIntegrations"));
var TicketTag_1 = __importDefault(require("../../models/TicketTag"));
var CrmLead_1 = __importDefault(require("../../models/CrmLead"));
var CrmClient_1 = __importDefault(require("../../models/CrmClient"));
var ShowUserService_1 = __importDefault(require("../UserServices/ShowUserService"));
var normalizeEnabled = function (value) {
    if (typeof value === "string") {
        var normalized = value.toLowerCase();
        return ["enabled", "enable", "true", "1"].includes(normalized);
    }
    return Boolean(value);
};
var ShowTicketService = function (id, companyId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, user, hasAllTicketPermission, hasAllUserChatPermission, hasAllQueuesPermission, canSeeOtherUsersTickets, userQueueIds, belongsToAllowedQueue, isTicketAssignedToAnotherUser, cannotSeeTicket, ticketJSON, safeTicket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Ticket_1["default"].findOne({
                    where: {
                        id: id,
                        companyId: companyId
                    },
                    attributes: [
                        "id",
                        "uuid",
                        "queueId",
                        "lastFlowId",
                        "flowStopped",
                        "dataWebhook",
                        "flowWebhook",
                        "isGroup",
                        "channel",
                        "status",
                        "contactId",
                        "useIntegration",
                        "lastMessage",
                        "updatedAt",
                        "unreadMessages",
                        "companyId",
                        "whatsappId",
                        "imported",
                        "lgpdAcceptedAt",
                        "amountUsedBotQueues",
                        "useIntegration",
                        "integrationId",
                        "userId",
                        "amountUsedBotQueuesNPS",
                        "lgpdSendMessageAt",
                        "isBot",
                        "typebotSessionId",
                        "typebotStatus",
                        "sendInactiveMessage",
                        "queueId",
                        "fromMe",
                        "isOutOfHour",
                        "isActiveDemand",
                        "typebotSessionTime",
                        "crmLeadId",
                        "crmClientId",
                        "leadValue"
                    ],
                    include: [
                        {
                            model: Contact_1["default"],
                            as: "contact",
                            attributes: [
                                "id",
                                "companyId",
                                "name",
                                "number",
                                "email",
                                "profilePicUrl",
                                "acceptAudioMessage",
                                "active",
                                "disableBot",
                                "remoteJid",
                                "urlPicture",
                                "lgpdAcceptedAt",
                                "cpfCnpj",
                                "address",
                                "birthday",
                                "anniversary"
                            ],
                            include: [
                                "extraInfo",
                                "tags",
                                {
                                    association: "wallets",
                                    attributes: ["id", "name"]
                                }
                            ]
                        },
                        {
                            model: Queue_1["default"],
                            as: "queue",
                            attributes: ["id", "name", "color"],
                            include: ["chatbots"]
                        },
                        {
                            model: User_1["default"],
                            as: "user",
                            attributes: ["id", "name"]
                        },
                        {
                            model: Tag_1["default"],
                            as: "tags",
                            attributes: ["id", "name", "color", "kanban"]
                        },
                        {
                            model: Whatsapp_1["default"],
                            as: "whatsapp",
                            attributes: [
                                "id",
                                "name",
                                "groupAsTicket",
                                "greetingMediaAttachment",
                                "facebookUserToken",
                                "facebookUserId",
                                "status",
                                "wavoip",
                                "channel",
                                "coexistencePhoneNumberId",
                                "coexistenceWabaId",
                                "coexistencePermanentToken",
                                "companyId"
                            ]
                        },
                        {
                            model: Company_1["default"],
                            as: "company",
                            attributes: ["id", "name"],
                            include: [
                                {
                                    model: Plan_1["default"],
                                    as: "plan",
                                    attributes: ["id", "name", "useKanban"]
                                }
                            ]
                        },
                        {
                            model: QueueIntegrations_1["default"],
                            as: "queueIntegration",
                            attributes: ["id", "name"]
                        },
                        {
                            model: TicketTag_1["default"],
                            as: "ticketTags",
                            attributes: ["tagId"]
                        },
                        {
                            model: CrmLead_1["default"],
                            as: "crmLead",
                            attributes: [
                                "id",
                                "name",
                                "email",
                                "phone",
                                "leadStatus",
                                "status",
                                "convertedClientId"
                            ]
                        },
                        {
                            model: CrmClient_1["default"],
                            as: "crmClient",
                            attributes: [
                                "id",
                                "name",
                                "document",
                                "email",
                                "phone",
                                "status",
                                "contactId"
                            ]
                        }
                    ]
                })];
            case 1:
                ticket = _a.sent();
                // Validando se o ticket foi encontrado
                if (!ticket) {
                    throw new AppError_1["default"]("ERR_NO_TICKET_FOUND", 404);
                }
                // Validando se a consulta é para a empresa certa
                if (ticket.companyId !== companyId) {
                    throw new AppError_1["default"]("Não é possível consultar registros de outra empresa");
                }
                if (!userId) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ShowUserService_1["default"])(userId, companyId)];
            case 2:
                user = _a.sent();
                // **REGRAS ESPECIAIS PARA GRUPOS**: Permitir acesso a grupos para usuários com allowGroup
                if (ticket.isGroup === true && normalizeEnabled(user.allowGroup)) {
                    // Usuários com allowGroup podem acessar qualquer grupo, independentemente de outras permissões
                    // Pula as verificações de permissão normais
                }
                else {
                    hasAllTicketPermission = normalizeEnabled(user.allTicket);
                    hasAllUserChatPermission = normalizeEnabled(user.allUserChat);
                    hasAllQueuesPermission = normalizeEnabled(user.allHistoric);
                    canSeeOtherUsersTickets = hasAllUserChatPermission || hasAllTicketPermission;
                    userQueueIds = (user.queues || []).map(function (queue) { return queue.id; });
                    belongsToAllowedQueue = ticket.queueId === null
                        ? hasAllTicketPermission
                        : userQueueIds.includes(ticket.queueId) || hasAllQueuesPermission;
                    isTicketAssignedToAnotherUser = ticket.userId && ticket.userId !== user.id;
                    cannotSeeTicket = (!belongsToAllowedQueue && !canSeeOtherUsersTickets) ||
                        (isTicketAssignedToAnotherUser && !canSeeOtherUsersTickets);
                    if (cannotSeeTicket) {
                        throw new AppError_1["default"]("ERR_NO_PERMISSION", 403);
                    }
                }
                _a.label = 3;
            case 3:
                // Exibindo dados do WhatsApp
                if (ticket === null || ticket === void 0 ? void 0 : ticket.whatsapp) {
                    // Acessando o wavoip do WhatsApp associado ao ticket
                    console.log("Whatsapp wavoip:", ticket.whatsapp.wavoip);
                }
                else {
                    console.log("Whatsapp não encontrado.");
                }
                ticketJSON = ticket.toJSON();
                // Se user for null, criar objeto placeholder
                if (!ticketJSON.user) {
                    ticketJSON.user = { id: null, name: "Sem usuário" };
                }
                // Se queue for null, criar objeto placeholder
                if (!ticketJSON.queue) {
                    ticketJSON.queue = { id: null, name: "Sem fila", color: "#999", chatbots: [] };
                }
                // Se contact for null, criar objeto placeholder completo
                if (!ticketJSON.contact) {
                    ticketJSON.contact = {
                        id: null,
                        name: "Contato removido",
                        number: "",
                        email: null,
                        profilePicUrl: null,
                        acceptAudioMessage: false,
                        active: true,
                        disableBot: false,
                        remoteJid: null,
                        urlPicture: null,
                        lgpdAcceptedAt: null,
                        extraInfo: [],
                        tags: [],
                        wallets: []
                    };
                }
                else {
                    // Garantir que arrays dentro de contact existam
                    if (!ticketJSON.contact.extraInfo)
                        ticketJSON.contact.extraInfo = [];
                    if (!ticketJSON.contact.tags)
                        ticketJSON.contact.tags = [];
                    if (!ticketJSON.contact.wallets)
                        ticketJSON.contact.wallets = [];
                }
                // Garantir que tags seja sempre um array e filtrar nulls
                if (!ticketJSON.tags || !Array.isArray(ticketJSON.tags)) {
                    ticketJSON.tags = [];
                }
                else {
                    // Filtrar tags nulas ou inválidas e garantir que tenham os campos necessários
                    ticketJSON.tags = ticketJSON.tags
                        .filter(function (tag) { return tag && tag.name; })
                        .map(function (tag) { return ({
                        id: tag.id || null,
                        name: tag.name || "Tag sem nome",
                        color: tag.color || "#999999",
                        kanban: tag.kanban || 0
                    }); });
                }
                // Garantir que whatsapp não seja null
                if (!ticketJSON.whatsapp) {
                    ticketJSON.whatsapp = {
                        id: null,
                        name: "WhatsApp desconectado",
                        groupAsTicket: null,
                        greetingMediaAttachment: null,
                        facebookUserToken: null,
                        facebookUserId: null,
                        status: "DISCONNECTED",
                        wavoip: null
                    };
                }
                // Garantir que company e plan existam
                if (!ticketJSON.company) {
                    ticketJSON.company = {
                        id: companyId,
                        name: "Empresa",
                        plan: { id: null, name: "Plano", useKanban: false }
                    };
                }
                else if (!ticketJSON.company.plan) {
                    ticketJSON.company.plan = { id: null, name: "Plano", useKanban: false };
                }
                // Garantir que queueIntegration exista
                if (!ticketJSON.queueIntegration) {
                    ticketJSON.queueIntegration = null;
                }
                // Garantir que ticketTags seja um array
                if (!ticketJSON.ticketTags || !Array.isArray(ticketJSON.ticketTags)) {
                    ticketJSON.ticketTags = [];
                }
                safeTicket = Object.create(ticket);
                safeTicket.toJSON = function () {
                    return ticketJSON;
                };
                return [2 /*return*/, safeTicket];
        }
    });
}); };
exports["default"] = ShowTicketService;
