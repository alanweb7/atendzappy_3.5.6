"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useDate = void 0;
var moment_1 = __importDefault(require("moment"));
function useDate() {
    function dateToClient(strDate) {
        if ((0, moment_1["default"])(strDate).isValid()) {
            return (0, moment_1["default"])(strDate).format("DD/MM/YYYY");
        }
        return strDate;
    }
    function datetimeToClient(strDate) {
        if ((0, moment_1["default"])(strDate).isValid()) {
            return (0, moment_1["default"])(strDate).format("DD/MM/YYYY HH:mm");
        }
        return strDate;
    }
    function dateToDatabase(strDate) {
        if ((0, moment_1["default"])(strDate, "DD/MM/YYYY").isValid()) {
            return (0, moment_1["default"])(strDate).format("YYYY-MM-DD HH:mm:ss");
        }
        return strDate;
    }
    function returnDays(date) {
        var data1 = new Date();
        var data2 = new Date(date);
        var result = data2.getTime() - data1.getTime();
        var days = Math.ceil(result / (1000 * 60 * 60 * 24));
        if (days === -0) {
            days = 0;
        }
        return days;
    }
    return {
        dateToClient: dateToClient,
        datetimeToClient: datetimeToClient,
        dateToDatabase: dateToDatabase,
        returnDays: returnDays
    };
}
exports.useDate = useDate;
