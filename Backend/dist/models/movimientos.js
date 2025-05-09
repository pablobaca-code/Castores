"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movimentos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Movimentos = connection_1.default.define('movimientos', {
    idMovimiento: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUsuario: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    idProducto: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    tipoMovimiento: { type: sequelize_1.DataTypes.STRING(1), allowNull: false },
    cantidad: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
