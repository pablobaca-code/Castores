
import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Product = sequelize.define(
    'productos',
    {  
        idProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} ,
        nombre: { type: DataTypes.STRING(40) ,allowNull:false } ,
        precio: { type: DataTypes.DECIMAL(16,2), allowNull:false} ,
        cantidad: { type: DataTypes.INTEGER, allowNull:false} ,
        estatus: { type: DataTypes.BOOLEAN, allowNull:false} ,
    })


