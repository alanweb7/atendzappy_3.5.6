"use strict";
exports.__esModule = true;
var express_1 = require("express");
var PaymentGatewayWebhookController_1 = require("../controllers/PaymentGatewayWebhookController");
var paymentGatewayWebhookRoutes = (0, express_1.Router)();
paymentGatewayWebhookRoutes.post("/webhook/payments/mercadopago", PaymentGatewayWebhookController_1.mercadoPagoWebhook);
paymentGatewayWebhookRoutes.post("/webhook/payments/asaas", PaymentGatewayWebhookController_1.asaasWebhook);
exports["default"] = paymentGatewayWebhookRoutes;
