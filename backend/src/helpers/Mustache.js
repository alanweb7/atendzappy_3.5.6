"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.firstName = exports.hour = exports.date = exports.control = exports.msgsd = void 0;
var mustache_1 = __importDefault(require("mustache"));
function makeid(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
var msgsd = function () {
    var ms = "";
    var hh = new Date().getHours();
    if (hh >= 6) {
        ms = "Bom dia";
    }
    if (hh > 11) {
        ms = "Boa tarde";
    }
    if (hh > 17) {
        ms = "Boa noite";
    }
    if (hh > 23 || hh < 6) {
        ms = "Boa madrugada";
    }
    return ms;
};
exports.msgsd = msgsd;
var control = function () {
    var Hr = new Date();
    var dd = ("0" + Hr.getDate()).slice(-2);
    var mm = ("0" + (Hr.getMonth() + 1)).slice(-2);
    var yyyy = Hr.getFullYear().toString();
    var minute = Hr.getMinutes().toString();
    var second = Hr.getSeconds().toString();
    var millisecond = Hr.getMilliseconds().toString();
    var ctrl = yyyy + mm + dd + minute + second + millisecond;
    return ctrl;
};
exports.control = control;
var date = function () {
    var Hr = new Date();
    var dd = ("0" + Hr.getDate()).slice(-2);
    var mm = ("0" + (Hr.getMonth() + 1)).slice(-2);
    var yy = Hr.getFullYear().toString();
    var dates = dd + "-" + mm + "-" + yy;
    return dates;
};
exports.date = date;
var hour = function () {
    var Hr = new Date();
    var hh = Hr.getHours();
    var min = ("0" + Hr.getMinutes()).slice(-2);
    var ss = ("0" + Hr.getSeconds()).slice(-2);
    var hours = hh + ":" + min + ":" + ss;
    return hours;
};
exports.hour = hour;
var firstName = function (ticket) {
    var _a, _b;
    if (ticket && ((_a = ticket === null || ticket === void 0 ? void 0 : ticket.contact) === null || _a === void 0 ? void 0 : _a.name)) {
        var nameArr = (_b = ticket === null || ticket === void 0 ? void 0 : ticket.contact) === null || _b === void 0 ? void 0 : _b.name.split(" ");
        return nameArr[0];
    }
    return "";
};
exports.firstName = firstName;
exports["default"] = (function (body, ticket, extraVariables) {
    var _a, _b, _c, _d, _e;
    var view = __assign({ firstName: (0, exports.firstName)(ticket), name: ticket ? (_a = ticket === null || ticket === void 0 ? void 0 : ticket.contact) === null || _a === void 0 ? void 0 : _a.name : "", ticket_id: ticket ? ticket.id : "", userName: ticket ? (_b = ticket === null || ticket === void 0 ? void 0 : ticket.user) === null || _b === void 0 ? void 0 : _b.name : "", ms: (0, exports.msgsd)(), hour: (0, exports.hour)(), date: (0, exports.date)(), queue: ticket ? (_c = ticket === null || ticket === void 0 ? void 0 : ticket.queue) === null || _c === void 0 ? void 0 : _c.name : "", connection: ticket ? (_d = ticket === null || ticket === void 0 ? void 0 : ticket.whatsapp) === null || _d === void 0 ? void 0 : _d.name : "", data_hora: new Array((0, exports.date)(), (0, exports.hour)()).join(" às "), protocol: new Array((0, exports.control)(), ticket ? ticket.id.toString() : "").join(""), name_company: ticket ? (_e = ticket === null || ticket === void 0 ? void 0 : ticket.company) === null || _e === void 0 ? void 0 : _e.name : "" }, (extraVariables || {}));
    return mustache_1["default"].render(body, view);
});
