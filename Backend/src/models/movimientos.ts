import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Movimentos = sequelize.define(
    'movimientos',
    {  
        idMovimiento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} ,
        idUsuario: { type: DataTypes.INTEGER, allowNull:false} ,
        idProducto: { type: DataTypes.INTEGER, allowNull:false} ,
        tipoMovimiento: { type: DataTypes.STRING(1) ,allowNull:false } ,
         cantidad: { type: DataTypes.INTEGER, allowNull:false} ,
    })
