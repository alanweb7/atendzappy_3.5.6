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
var nodemailer_1 = __importDefault(require("nodemailer"));
var sequelize_1 = __importDefault(require("sequelize"));
var database_1 = __importDefault(require("../../database"));
var Setting_1 = __importDefault(require("../../models/Setting"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var getSmtpConfig = function () { return __awaiter(void 0, void 0, void 0, function () {
    var settings, smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, port, error_1;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Setting_1["default"].findAll({
                        where: {
                            companyId: 1,
                            key: ["smtpHost", "smtpPort", "smtpUser", "smtpPass", "smtpFrom"]
                        }
                    })];
            case 1:
                settings = _f.sent();
                smtpHost = (_a = settings.find(function (s) { return s.key === "smtpHost"; })) === null || _a === void 0 ? void 0 : _a.value;
                smtpPort = (_b = settings.find(function (s) { return s.key === "smtpPort"; })) === null || _b === void 0 ? void 0 : _b.value;
                smtpUser = (_c = settings.find(function (s) { return s.key === "smtpUser"; })) === null || _c === void 0 ? void 0 : _c.value;
                smtpPass = (_d = settings.find(function (s) { return s.key === "smtpPass"; })) === null || _d === void 0 ? void 0 : _d.value;
                smtpFrom = (_e = settings.find(function (s) { return s.key === "smtpFrom"; })) === null || _e === void 0 ? void 0 : _e.value;
                if (smtpHost && smtpUser && smtpPass) {
                    port = parseInt(smtpPort || "587");
                    return [2 /*return*/, {
                            host: smtpHost,
                            port: port,
                            secure: port === 465,
                            user: smtpUser,
                            pass: smtpPass,
                            from: smtpFrom || smtpUser
                        }];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _f.sent();
                console.log("Error fetching SMTP settings from database, using env vars");
                return [3 /*break*/, 3];
            case 3: 
            // Fallback para variáveis de ambiente
            return [2 /*return*/, {
                    host: process.env.MAIL_HOST || "",
                    port: Number(process.env.MAIL_PORT) || 465,
                    secure: true,
                    user: process.env.MAIL_USER || "",
                    pass: process.env.MAIL_PASS || "",
                    from: process.env.MAIL_FROM || ""
                }];
        }
    });
}); };
var SendMail = function (email, tokenSenha) { return __awaiter(void 0, void 0, void 0, function () {
    function sendEmail() {
        return __awaiter(this, void 0, void 0, function () {
            var mailOptions, info, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        mailOptions = {
                            from: fromEmail,
                            to: email,
                            subject: "Redefinição de Senha",
                            html: " <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html dir=\"ltr\" lang=\"pt\">\n <head>\n  <meta charset=\"UTF-8\">\n  <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\">\n  <meta name=\"x-apple-disable-message-reformatting\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta content=\"telephone=no\" name=\"format-detection\">\n  <title>Novo modelo</title><!--[if (mso 16)]>\n    <style type=\"text/css\">\n    a {text-decoration: none;}\n    </style>\n    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>\n<xml>\n    <o:OfficeDocumentSettings>\n    <o:AllowPNG></o:AllowPNG>\n    <o:PixelsPerInch>96</o:PixelsPerInch>\n    </o:OfficeDocumentSettings>\n</xml>\n<![endif]--><!--[if !mso]><!-- -->\n  <link href=\"https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i\" rel=\"stylesheet\"><!--<![endif]-->\n  <style type=\"text/css\">\n.rollover:hover .rollover-first {\n\tmax-height:0px!important;\n\tdisplay:none!important;\n}\n.rollover:hover .rollover-second {\n\tmax-height:none!important;\n\tdisplay:block!important;\n}\n#outlook a {\n\tpadding:0;\n}\n.es-button {\n\tmso-style-priority:100!important;\n\ttext-decoration:none!important;\n}\na[x-apple-data-detectors] {\n\tcolor:inherit!important;\n\ttext-decoration:none!important;\n\tfont-size:inherit!important;\n\tfont-family:inherit!important;\n\tfont-weight:inherit!important;\n\tline-height:inherit!important;\n}\n.es-desk-hidden {\n\tdisplay:none;\n\tfloat:left;\n\toverflow:hidden;\n\twidth:0;\n\tmax-height:0;\n\tline-height:0;\n\tmso-hide:all;\n}\n.es-button-border:hover {\n\tborder-style:solid solid solid solid!important;\n\tbackground:#0b317e!important;\n\tborder-color:#42d159 #42d159 #42d159 #42d159!important;\n}\n.es-button-border:hover a.es-button,\n.es-button-border:hover button.es-button {\n\tbackground:#0b317e!important;\n}\n@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .st-br { padding-left:10px!important; padding-right:10px!important } h1 a { text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } h2 a { text-align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } h3 a { text-align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class=\"gmail-fix\"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:16px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }\n@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }\n</style>\n </head>\n <body data-new-gr-c-s-check-loaded=\"14.1021.0\" data-gr-ext-installed style=\"width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0\">\n  <div dir=\"ltr\" class=\"es-wrapper-color\" lang=\"pt\" style=\"background-color:#F8F9FD\"><!--[if gte mso 9]>\n\t\t\t<v:background xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"t\">\n\t\t\t\t<v:fill type=\"tile\" color=\"#f8f9fd\"></v:fill>\n\t\t\t</v:background>\n\t\t<![endif]-->\n   <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F8F9FD\">\n     <tr>\n      <td valign=\"top\" style=\"padding:0;Margin:0\">\n       <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-header\" align=\"center\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top\">\n         <tr>\n          <td align=\"center\" style=\"padding:0;Margin:0\">\n           <table bgcolor=\"#ffffff\" class=\"es-header-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\">\n             <tr>\n              <td align=\"left\" style=\"Margin:0;padding-top:10px;padding-bottom:15px;padding-left:30px;padding-right:30px\">\n               <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                 <tr>\n                  <td align=\"center\" valign=\"top\" style=\"padding:0;Margin:0;width:540px\">\n                   <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                     <tr>\n                      <td align=\"center\" style=\"padding:0;Margin:0;font-size:0px\"><img src=\"https://coresistemas.com/imagens/logokmenu01.png\" alt style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\" width=\"205\"></td>\n                     </tr>\n                   </table></td>\n                 </tr>\n               </table></td>\n             </tr>\n           </table></td>\n         </tr>\n       </table>\n       <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\">\n         <tr>\n          <td align=\"center\" bgcolor=\"#f8f9fd\" style=\"padding:0;Margin:0;background-color:#f8f9fd\">\n           <table bgcolor=\"transparent\" class=\"es-content-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" role=\"none\">\n             <tr>\n              <td align=\"left\" style=\"Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px\">\n               <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                 <tr>\n                  <td align=\"center\" valign=\"top\" style=\"padding:0;Margin:0;width:560px\">\n                   <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                     <tr>\n                      <td align=\"center\" style=\"padding:0;Margin:0;padding-bottom:10px\"><h1 style=\"Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#212121\">Bem-vindo</h1></td>\n                     </tr>\n                     <tr>\n                      <td align=\"center\" style=\"padding:0;Margin:0;padding-top:10px;padding-bottom:10px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#131313;font-size:16px\">Voc\u00EA solicitou recupera\u00E7\u00E3o de senha!</p></td>\n                     </tr>\n                   </table></td>\n                 </tr>\n               </table></td>\n             </tr>\n             <tr>\n              <td class=\"es-m-p15t es-m-p0b es-m-p0r es-m-p0l\" align=\"left\" style=\"padding:0;Margin:0;padding-top:15px\">\n               <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                 <tr>\n                  <td align=\"center\" valign=\"top\" style=\"padding:0;Margin:0;width:600px\">\n                   <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                     <tr>\n                      <td align=\"center\" style=\"padding:0;Margin:0;font-size:0px\"><img class=\"adapt-img\" src=\"https://coresistemas.com/imagens/recsenha.png\" alt style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic\" width=\"600\"></td>\n                     </tr>\n                   </table></td>\n                 </tr>\n               </table></td>\n             </tr>\n           </table></td>\n         </tr>\n       </table>\n       <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\">\n         <tr>\n          <td align=\"center\" bgcolor=\"#071f4f\" style=\"padding:0;Margin:0;background-color:#071f4f;background-image:url();background-repeat:no-repeat;background-position:center top\" background=\"\">\n           <table bgcolor=\"#ffffff\" class=\"es-content-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\">\n             <tr>\n              <td align=\"left\" style=\"Margin:0;padding-left:30px;padding-right:30px;padding-top:40px;padding-bottom:40px\">\n               <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                 <tr>\n                  <td align=\"center\" valign=\"top\" style=\"padding:0;Margin:0;width:540px\">\n                   <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                     <tr>\n                      <td align=\"center\" height=\"20\" style=\"padding:0;Margin:0\"></td>\n                     </tr>\n                     <tr>\n                      <td align=\"left\" style=\"padding:0;Margin:0;padding-bottom:10px\"><h1 style=\"Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center\">C\u00F3digo de Verifica\u00E7\u00E3o:</h1></td>\n                     </tr>\n                     <tr>\n                      <td align=\"center\" style=\"padding:0;Margin:0;padding-top:10px;padding-bottom:10px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#ffffff;font-size:16px\">".concat(tokenSenha, "</p></td>\n                     </tr>\n                   </table></td>\n                 </tr>\n               </table></td>\n             </tr>\n           </table></td>\n         </tr>\n       </table>\n       <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\">\n         <tr>\n          <td align=\"center\" bgcolor=\"#f8f9fd\" style=\"padding:0;Margin:0;background-color:#f8f9fd;background-image:url();background-repeat:no-repeat;background-position:center center\" background=\"\">\n           <table bgcolor=\"#ffffff\" class=\"es-content-body\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\">\n             <tr>\n              <td align=\"left\" style=\"Margin:0;padding-bottom:15px;padding-left:20px;padding-right:20px;padding-top:40px\">\n               <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"none\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                 <tr>\n                  <td align=\"center\" valign=\"top\" style=\"padding:0;Margin:0;width:281px\">\n                   <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\">\n                     <tr>\n                      <td align=\"left\" style=\"padding:0;Margin:0\"><h1 style=\"Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#212121;text-align:center\">Est\u00E1 com d\u00FAvidas?</h1></td>\n                     </tr>\n                     <tr>\n<td align=\"center\" class=\"es-m-txt-c\" style=\"padding:0;Margin:0;padding-top:15px\">\n  <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#131313;font-size:16px\">\n    Entre em contato agora mesmo conosco via \n    <a href=\"https://wa.me/552433540335\" target=\"_blank\" style=\"text-decoration:none;color:#25D366;\">\n\n    </a>\n    <a href=\"https://wa.me/552433540335\" target=\"_blank\" style=\"text-decoration:none;color:#25D366;\">WhatsApp</a>.\n  </p>\n</td>\n                   </table></td>\n                 </tr>\n               </table></td>\n             </tr>\n           </table></td>\n         </tr>\n       </table></td>\n     </tr>\n   </table>\n  </div>\n </body>\n</html>")
                        };
                        return [4 /*yield*/, transporter.sendMail(mailOptions)];
                    case 1:
                        info = _a.sent();
                        console.log("E-mail enviado: " + info.response);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var _a, hasResult, data, userData, companyId, smtpConfig, transporterOptions, transporter, fromEmail, _b, hasResults, datas;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, filterEmail(email)];
            case 1:
                _a = _c.sent(), hasResult = _a.hasResult, data = _a.data;
                if (!hasResult) {
                    return [2 /*return*/, { status: 404, message: "Email não encontrado" }];
                }
                userData = data[0][0];
                if (!userData || userData.companyId === undefined) {
                    return [2 /*return*/, { status: 404, message: "Dados do usuário não encontrados" }];
                }
                companyId = userData.companyId;
                return [4 /*yield*/, getSmtpConfig()];
            case 2:
                smtpConfig = _c.sent();
                transporterOptions = {
                    host: smtpConfig.host,
                    port: smtpConfig.port,
                    secure: smtpConfig.secure,
                    auth: { user: smtpConfig.user, pass: smtpConfig.pass }
                };
                // Para portas não seguras, usar TLS
                if (!smtpConfig.secure) {
                    transporterOptions.tls = {
                        rejectUnauthorized: false
                    };
                }
                transporter = nodemailer_1["default"].createTransport(transporterOptions);
                fromEmail = smtpConfig.from;
                if (!(hasResult === true)) return [3 /*break*/, 4];
                return [4 /*yield*/, insertToken(email, tokenSenha)];
            case 3:
                _b = _c.sent(), hasResults = _b.hasResults, datas = _b.datas;
                sendEmail();
                _c.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var filterEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT * FROM \"Users\"  WHERE email ='".concat(email, "'");
                return [4 /*yield*/, database_1["default"].query(sql, {
                        type: sequelize_1["default"].QueryTypes.SELECT
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, { hasResult: result.length > 0, data: [result] }];
        }
    });
}); };
var insertToken = function (email, tokenSenha) { return __awaiter(void 0, void 0, void 0, function () {
    var sqls, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqls = "UPDATE \"Users\" SET \"resetPassword\"= '".concat(tokenSenha, "' WHERE email ='").concat(email, "'");
                return [4 /*yield*/, database_1["default"].query(sqls, {
                        type: sequelize_1["default"].QueryTypes.UPDATE
                    })];
            case 1:
                results = _a.sent();
                return [2 /*return*/, { hasResults: results.length > 0, datas: results }];
        }
    });
}); };
exports["default"] = SendMail;
