"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../database"));
var IaWorkflow = /** @class */ (function (_super) {
    __extends(IaWorkflow, _super);
    function IaWorkflow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IaWorkflow;
}(sequelize_1.Model));
IaWorkflow.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    orchestratorPromptId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    agentPromptId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    alias: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1["default"],
    modelName: "IaWorkflow"
});
exports["default"] = IaWorkflow;
