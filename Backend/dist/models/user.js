"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.User = connection_1.default.define('Usuarios', {
    idUsuario: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    correo: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    contraseña: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    idRol: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    estatus: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
});
