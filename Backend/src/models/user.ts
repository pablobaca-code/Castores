
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const User = sequelize.define(
    'Usuarios',
    {  
        idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} ,
        nombre: { type: DataTypes.STRING(100) ,allowNull:false } ,
        correo: { type: DataTypes.STRING(50), allowNull:false} ,
        contraseña: { type: DataTypes.STRING(100), allowNull:false} ,
        idRol: { type: DataTypes.INTEGER,allowNull:false} ,
        estatus: { type: DataTypes.BOOLEAN,allowNull:false} ,

    })


