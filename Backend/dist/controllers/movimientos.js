"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovimientos = exports.register = void 0;
const movimientos_1 = require("../models/movimientos");
const products_1 = require("../models/products");
const user_1 = require("../models/user");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipoMovimiento, idUsuario, idProducto, cantidad } = req.body;
    const product = yield products_1.Product.findOne({ where: { idProducto: idProducto } });
    const user = yield user_1.User.findOne({ where: { idUsuario: idUsuario } });
    try {
        if (!product) {
            res.status(404).json({
                msg: `Accion cancelada - No existe el producto con el id:  ${idProducto}`
            });
        }
        else {
            if (cantidad < 0) {
                res.status(404).json({
                    msg: `Accion cancelada - La cantidad debe de ser mayor a 0`
                });
            }
            else {
                if (!user) {
                    res.status(404).json({
                        msg: `Accion cancelada - No existe el usuario con el id:  ${idUsuario}`
                    });
                }
                else { //ENTRADA E
                    if (tipoMovimiento == "E") {
                        if (user.idRol == 1) {
                            if (product.estatus == 1) { // Activo 1
                                const canTotal = product.cantidad + cantidad;
                                product.set({
                                    cantidad: canTotal,
                                });
                                yield product.save();
                                movimientos_1.Movimentos.create({
                                    idUsuario: idUsuario,
                                    idProducto: idProducto,
                                    tipoMovimiento: tipoMovimiento,
                                    cantidad: cantidad,
                                });
                            }
                            else {
                                res.json({
                                    msg: `Accion cancelada - Producto dado de baja:  ${product.nombre}`
                                });
                            }
                        }
                        else {
                            res.status(404).json({
                                msg: `Accion cancelada - No se permite la entrada a inventario para este rol:  ${user.idRol}`
                            });
                        }
                    }
                    else { //SALIDA S
                        if (user.idRol == 1) {
                            res.status(404).json({
                                msg: `Accion cancelada - No se permite la salida de inventario para este rol:  ${user.idRol}`
                            });
                        }
                        else {
                            const canTotal = product.cantidad - cantidad;
                            if (canTotal > 0) {
                                if (product.estatus == 1) { // Activo 1
                                    product.set({
                                        cantidad: canTotal,
                                    });
                                    yield product.save();
                                    movimientos_1.Movimentos.create({
                                        idUsuario: idUsuario,
                                        idProducto: idProducto,
                                        tipoMovimiento: tipoMovimiento,
                                        cantidad: cantidad,
                                    });
                                }
                                else {
                                    res.json({
                                        msg: `Accion cancelada - Producto dado de baja:  ${product.nombre}`
                                    });
                                }
                            }
                            else {
                                res.json({
                                    msg: `Accion cancelada - Cantidad a retirar mayor a la existente:  ${product.cantidad}`
                                });
                            }
                        }
                    }
                }
            }
        }
        res.json({
            msg: `El movimiento del producto ${idProducto} fue creado exitosamente...`
        });
    }
    catch (error) {
        res.status(404).json({
            msg: `Error al crear el movimiento del producto ${idProducto}`
        });
    }
});
exports.register = register;
const getMovimientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMovimientos = yield movimientos_1.Movimentos.findAll();
    res.json({ listMovimientos });
});
exports.getMovimientos = getMovimientos;
