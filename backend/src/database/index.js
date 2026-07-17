"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// @ts-nocheck
var sequelize_typescript_1 = require("sequelize-typescript");
var User_1 = __importDefault(require("../models/User"));
var Setting_1 = __importDefault(require("../models/Setting"));
var Contact_1 = __importDefault(require("../models/Contact"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
var ContactCustomField_1 = __importDefault(require("../models/ContactCustomField"));
var Message_1 = __importDefault(require("../models/Message"));
var Queue_1 = __importDefault(require("../models/Queue"));
var WhatsappQueue_1 = __importDefault(require("../models/WhatsappQueue"));
var UserQueue_1 = __importDefault(require("../models/UserQueue"));
var Company_1 = __importDefault(require("../models/Company"));
var Plan_1 = __importDefault(require("../models/Plan"));
var TicketNote_1 = __importDefault(require("../models/TicketNote"));
var QuickMessage_1 = __importDefault(require("../models/QuickMessage"));
var Help_1 = __importDefault(require("../models/Help"));
var TicketTraking_1 = __importDefault(require("../models/TicketTraking"));
var UserRating_1 = __importDefault(require("../models/UserRating"));
var Schedule_1 = __importDefault(require("../models/Schedule"));
var Tag_1 = __importDefault(require("../models/Tag"));
var Negocio_1 = __importDefault(require("../models/Negocio"));
var Produto_1 = __importDefault(require("../models/Produto"));
var ProdutoCategoria_1 = __importDefault(require("../models/ProdutoCategoria"));
var ProdutoVariacaoGrupo_1 = __importDefault(require("../models/ProdutoVariacaoGrupo"));
var ProdutoVariacaoOpcao_1 = __importDefault(require("../models/ProdutoVariacaoOpcao"));
var ProdutoVariacaoItem_1 = __importDefault(require("../models/ProdutoVariacaoItem"));
var Ferramenta_1 = __importDefault(require("../models/Ferramenta"));
var TicketTag_1 = __importDefault(require("../models/TicketTag"));
var TicketTagHistory_1 = __importDefault(require("../models/TicketTagHistory"));
var AiIntegrationSetting_1 = __importDefault(require("../models/AiIntegrationSetting"));
var Task_1 = __importDefault(require("../models/Task"));
var ImpersonationLog_1 = __importDefault(require("../models/ImpersonationLog"));
var EmailAccount_1 = __importDefault(require("../models/EmailAccount"));
var ContactList_1 = __importDefault(require("../models/ContactList"));
var ContactListItem_1 = __importDefault(require("../models/ContactListItem"));
var Campaign_1 = __importDefault(require("../models/Campaign"));
var CampaignSetting_1 = __importDefault(require("../models/CampaignSetting"));
var Baileys_1 = __importDefault(require("../models/Baileys"));
var CampaignShipping_1 = __importDefault(require("../models/CampaignShipping"));
var Announcement_1 = __importDefault(require("../models/Announcement"));
var Chat_1 = __importDefault(require("../models/Chat"));
var ChatUser_1 = __importDefault(require("../models/ChatUser"));
var ChatMessage_1 = __importDefault(require("../models/ChatMessage"));
var Chatbot_1 = __importDefault(require("../models/Chatbot"));
var DialogChatBots_1 = __importDefault(require("../models/DialogChatBots"));
var QueueIntegrations_1 = __importDefault(require("../models/QueueIntegrations"));
var Invoices_1 = __importDefault(require("../models/Invoices"));
var Fatura_1 = __importDefault(require("../models/Fatura"));
var Subscriptions_1 = __importDefault(require("../models/Subscriptions"));
var ApiUsages_1 = __importDefault(require("../models/ApiUsages"));
var AiCreditsUsage_1 = __importDefault(require("../models/AiCreditsUsage"));
var AiCreditPackage_1 = __importDefault(require("../models/AiCreditPackage"));
var AiCreditOrder_1 = __importDefault(require("../models/AiCreditOrder"));
var Files_1 = __importDefault(require("../models/Files"));
var FilesOptions_1 = __importDefault(require("../models/FilesOptions"));
var ContactTag_1 = __importDefault(require("../models/ContactTag"));
var CompaniesSettings_1 = __importDefault(require("../models/CompaniesSettings"));
var CompanyDocument_1 = __importDefault(require("../models/CompanyDocument"));
var LogTicket_1 = __importDefault(require("../models/LogTicket"));
var Prompt_1 = __importDefault(require("../models/Prompt"));
var PromptToolSetting_1 = __importDefault(require("../models/PromptToolSetting"));
var KnowledgeBase_1 = __importDefault(require("../models/KnowledgeBase"));
var KnowledgeBaseItem_1 = __importDefault(require("../models/KnowledgeBaseItem"));
var GoogleBusinessAccount_1 = __importDefault(require("../models/GoogleBusinessAccount"));
var CompanyFiscalConfig_1 = __importDefault(require("../models/CompanyFiscalConfig"));
var Partner_1 = __importDefault(require("../models/Partner"));
var UserPagePermission_1 = __importDefault(require("../models/UserPagePermission"));
var ContactWallet_1 = __importDefault(require("../models/ContactWallet"));
var ScheduledMessages_1 = __importDefault(require("../models/ScheduledMessages"));
var ScheduledMessagesEnvio_1 = __importDefault(require("../models/ScheduledMessagesEnvio"));
var Versions_1 = __importDefault(require("../models/Versions"));
var GoogleCalendarIntegration_1 = __importDefault(require("../models/GoogleCalendarIntegration"));
var FlowDefault_1 = require("../models/FlowDefault");
var FlowBuilder_1 = require("../models/FlowBuilder");
var FlowAudio_1 = require("../models/FlowAudio");
var FlowCampaign_1 = require("../models/FlowCampaign");
var FlowImg_1 = require("../models/FlowImg");
var Webhook_1 = require("../models/Webhook");
var MobileWebhook_1 = __importDefault(require("../models/MobileWebhook"));
var TutorialVideo_1 = __importDefault(require("../models/TutorialVideo"));
var SliderHome_1 = __importDefault(require("../models/SliderHome"));
var Profissional_1 = __importDefault(require("../models/Profissional"));
var Servico_1 = __importDefault(require("../models/Servico"));
var MediaFolder_1 = __importDefault(require("../models/MediaFolder"));
var MediaFile_1 = __importDefault(require("../models/MediaFile"));
var Automation_1 = __importDefault(require("../models/Automation"));
var AutomationAction_1 = __importDefault(require("../models/AutomationAction"));
var AutomationLog_1 = __importDefault(require("../models/AutomationLog"));
var AutomationExecution_1 = __importDefault(require("../models/AutomationExecution"));
var CrmLead_1 = __importDefault(require("../models/CrmLead"));
var CrmClient_1 = __importDefault(require("../models/CrmClient"));
var CrmClientOwner_1 = __importDefault(require("../models/CrmClientOwner"));
var FinanceiroFatura_1 = __importDefault(require("../models/FinanceiroFatura"));
var FinanceiroPagamento_1 = __importDefault(require("../models/FinanceiroPagamento"));
var FinanceiroCategoria_1 = __importDefault(require("../models/FinanceiroCategoria"));
var FinanceiroDespesa_1 = __importDefault(require("../models/FinanceiroDespesa"));
var FinanceiroFornecedor_1 = __importDefault(require("../models/FinanceiroFornecedor"));
var FinanceiroPagamentoDespesa_1 = __importDefault(require("../models/FinanceiroPagamentoDespesa"));
var FinanceiroContaBancaria_1 = __importDefault(require("../models/FinanceiroContaBancaria"));
var FinanceiroCentroCusto_1 = __importDefault(require("../models/FinanceiroCentroCusto"));
var CompanyPaymentSetting_1 = __importDefault(require("../models/CompanyPaymentSetting"));
var CompanyIntegrationSetting_1 = __importDefault(require("../models/CompanyIntegrationSetting"));
var CompanyIntegrationFieldMap_1 = __importDefault(require("../models/CompanyIntegrationFieldMap"));
var CompanyApiKey_1 = __importDefault(require("../models/CompanyApiKey"));
var CrmClientContact_1 = __importDefault(require("../models/CrmClientContact"));
var ScheduledDispatcher_1 = __importDefault(require("../models/ScheduledDispatcher"));
var ScheduledDispatchLog_1 = __importDefault(require("../models/ScheduledDispatchLog"));
var Project_1 = __importDefault(require("../models/Project"));
var ProjectService_1 = __importDefault(require("../models/ProjectService"));
var ProjectProduct_1 = __importDefault(require("../models/ProjectProduct"));
var ProjectUser_1 = __importDefault(require("../models/ProjectUser"));
var ProjectTask_1 = __importDefault(require("../models/ProjectTask"));
var ProjectTaskUser_1 = __importDefault(require("../models/ProjectTaskUser"));
var UserSchedule_1 = __importDefault(require("../models/UserSchedule"));
var Appointment_1 = __importDefault(require("../models/Appointment"));
var UserService_1 = __importDefault(require("../models/UserService"));
var UserGoogleCalendarIntegration_1 = __importDefault(require("../models/UserGoogleCalendarIntegration"));
var FollowUp_1 = __importDefault(require("../models/FollowUp"));
var CallRecord_1 = __importDefault(require("../models/CallRecord"));
var CompanyGoogleSheetsToken_1 = __importDefault(require("../models/CompanyGoogleSheetsToken"));
var CompanyConnectedSheet_1 = __importDefault(require("../models/CompanyConnectedSheet"));
var UserDevice_1 = __importDefault(require("../models/UserDevice"));
var Affiliate_1 = __importDefault(require("../models/Affiliate"));
var AffiliateLink_1 = __importDefault(require("../models/AffiliateLink"));
var Coupon_1 = __importDefault(require("../models/Coupon"));
var AffiliateCommission_1 = __importDefault(require("../models/AffiliateCommission"));
var AffiliateWithdrawal_1 = __importDefault(require("../models/AffiliateWithdrawal"));
var Language_1 = __importDefault(require("../models/Language"));
var Translation_1 = __importDefault(require("../models/Translation"));
var ServiceOrder_1 = __importDefault(require("../models/ServiceOrder"));
var ServiceOrderItem_1 = __importDefault(require("../models/ServiceOrderItem"));
var HostiNotasConfig_1 = __importDefault(require("../models/HostiNotasConfig"));
var ProdutoMarca_1 = __importDefault(require("../models/ProdutoMarca"));
var ProdutoCustomFieldDefinition_1 = __importDefault(require("../models/ProdutoCustomFieldDefinition"));
var ProdutoCustomFieldValue_1 = __importDefault(require("../models/ProdutoCustomFieldValue"));
var ProdutoWhatsappSync_1 = __importDefault(require("../models/ProdutoWhatsappSync"));
var WhatsappWidget_1 = __importDefault(require("../models/WhatsappWidget"));
// eslint-disable-next-line
var dbConfig = require("../config/database");
var sequelize = new sequelize_typescript_1.Sequelize(dbConfig);
var models = [
    Company_1["default"],
    User_1["default"],
    Contact_1["default"],
    ContactTag_1["default"],
    Ticket_1["default"],
    Message_1["default"],
    Whatsapp_1["default"],
    ContactCustomField_1["default"],
    Setting_1["default"],
    Queue_1["default"],
    WhatsappQueue_1["default"],
    UserQueue_1["default"],
    Plan_1["default"],
    TicketNote_1["default"],
    QuickMessage_1["default"],
    Help_1["default"],
    TicketTraking_1["default"],
    UserRating_1["default"],
    Schedule_1["default"],
    Tag_1["default"],
    Negocio_1["default"],
    Produto_1["default"],
    ProdutoCategoria_1["default"],
    ProdutoVariacaoGrupo_1["default"],
    ProdutoVariacaoOpcao_1["default"],
    ProdutoVariacaoItem_1["default"],
    Ferramenta_1["default"],
    TicketTag_1["default"],
    TicketTagHistory_1["default"],
    AiIntegrationSetting_1["default"],
    Task_1["default"],
    ImpersonationLog_1["default"],
    EmailAccount_1["default"],
    ContactList_1["default"],
    ContactListItem_1["default"],
    Campaign_1["default"],
    CampaignSetting_1["default"],
    Baileys_1["default"],
    CampaignShipping_1["default"],
    Announcement_1["default"],
    Chat_1["default"],
    ChatUser_1["default"],
    ChatMessage_1["default"],
    Chatbot_1["default"],
    DialogChatBots_1["default"],
    QueueIntegrations_1["default"],
    Invoices_1["default"],
    Fatura_1["default"],
    Subscriptions_1["default"],
    ApiUsages_1["default"],
    AiCreditsUsage_1["default"],
    AiCreditPackage_1["default"],
    AiCreditOrder_1["default"],
    Files_1["default"],
    FilesOptions_1["default"],
    CompaniesSettings_1["default"],
    LogTicket_1["default"],
    Prompt_1["default"],
    PromptToolSetting_1["default"],
    Partner_1["default"],
    ContactWallet_1["default"],
    ScheduledMessages_1["default"],
    ScheduledMessagesEnvio_1["default"],
    Versions_1["default"],
    FlowDefault_1.FlowDefaultModel,
    FlowBuilder_1.FlowBuilderModel,
    FlowAudio_1.FlowAudioModel,
    FlowCampaign_1.FlowCampaignModel,
    FlowImg_1.FlowImgModel,
    Webhook_1.WebhookModel,
    MobileWebhook_1["default"],
    GoogleCalendarIntegration_1["default"],
    TutorialVideo_1["default"],
    SliderHome_1["default"],
    Profissional_1["default"],
    Servico_1["default"],
    MediaFolder_1["default"],
    MediaFile_1["default"],
    Automation_1["default"],
    AutomationAction_1["default"],
    AutomationLog_1["default"],
    AutomationExecution_1["default"],
    CrmLead_1["default"],
    CrmClient_1["default"],
    CrmClientOwner_1["default"],
    FinanceiroFatura_1["default"],
    FinanceiroPagamento_1["default"],
    FinanceiroCategoria_1["default"],
    FinanceiroDespesa_1["default"],
    FinanceiroFornecedor_1["default"],
    FinanceiroPagamentoDespesa_1["default"],
    FinanceiroContaBancaria_1["default"],
    FinanceiroCentroCusto_1["default"],
    CrmClientContact_1["default"],
    CompanyPaymentSetting_1["default"],
    CompanyIntegrationSetting_1["default"],
    CompanyIntegrationFieldMap_1["default"],
    CompanyApiKey_1["default"],
    ScheduledDispatcher_1["default"],
    ScheduledDispatchLog_1["default"],
    Project_1["default"],
    ProjectService_1["default"],
    ProjectProduct_1["default"],
    ProjectUser_1["default"],
    ProjectTask_1["default"],
    ProjectTaskUser_1["default"],
    UserSchedule_1["default"],
    Appointment_1["default"],
    UserService_1["default"],
    UserGoogleCalendarIntegration_1["default"],
    FollowUp_1["default"],
    CompanyGoogleSheetsToken_1["default"],
    CompanyConnectedSheet_1["default"],
    UserDevice_1["default"],
    CallRecord_1["default"],
    Affiliate_1["default"],
    AffiliateLink_1["default"],
    Coupon_1["default"],
    AffiliateCommission_1["default"],
    AffiliateWithdrawal_1["default"],
    Language_1["default"],
    Translation_1["default"],
    ServiceOrder_1["default"],
    ServiceOrderItem_1["default"],
    UserPagePermission_1["default"],
    HostiNotasConfig_1["default"],
    CompanyDocument_1["default"],
    ProdutoMarca_1["default"],
    ProdutoCustomFieldDefinition_1["default"],
    ProdutoCustomFieldValue_1["default"],
    ProdutoWhatsappSync_1["default"],
    WhatsappWidget_1["default"],
    KnowledgeBase_1["default"],
    KnowledgeBaseItem_1["default"],
    GoogleBusinessAccount_1["default"],
    CompanyFiscalConfig_1["default"],
];
sequelize.addModels(models);
exports["default"] = sequelize;
