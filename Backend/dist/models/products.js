"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Product = connection_1.default.define('productos', {
    idProducto: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize_1.DataTypes.STRING(40), allowNull: false },
    precio: { type: sequelize_1.DataTypes.DECIMAL(16, 2), allowNull: false },
    cantidad: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    estatus: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
});
