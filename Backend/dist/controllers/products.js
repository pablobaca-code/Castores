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
exports.estatusProducto = exports.salidaProducto = exports.entradaProducto = exports.getProduct = exports.getProducts = exports.register = void 0;
const products_1 = require("../models/products");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, precio, cantidad } = req.body;
    try {
        products_1.Product.create({
            nombre: nombre,
            precio: precio,
            cantidad: 0,
            estatus: 1,
        });
        res.json({
            msg: `El Producto ${nombre} fue creado exitosamente...`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrio un error al guardar`
        });
    }
});
exports.register = register;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield products_1.Product.findAll();
    res.json({ listProducts });
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield products_1.Product.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe el producto con el id:  ${id}`
        });
    }
});
exports.getProduct = getProduct;
const entradaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const { idUser } = req.params;
    const { cantidad } = req.body;
    //const product = await Product.findByPk(id);
    const product = yield products_1.Product.findOne({ where: { idProducto: id } });
    const cantidadAnterior = product.cantidad;
    try {
        if (!product) {
            res.status(404).json({
                msg: `No existe el producto con el id:  ${id}`
            });
        }
        else {
            if (cantidadAnterior > cantidad) {
                res.status(404).json({
                    msg: `La cantidad debe de ser mayor a ${cantidadAnterior} `
                });
            }
            else {
                yield product.update(body);
                res.json({
                    msg: `La entrada del Producto ${id} fue actualizado exitosamente...`
                });
            }
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Error al actualizar: ${error}`
        });
    }
});
exports.entradaProducto = entradaProducto;
const salidaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const { cantidad } = req.body;
    const product = yield products_1.Product.findOne({ where: { idProducto: id } });
    const cantidadAnterior = product.cantidad;
    try {
        if (!product) {
            res.status(404).json({
                msg: `No existe el producto con el id:  ${id}`
            });
        }
        else {
            if (cantidadAnterior > cantidad) {
                res.status(404).json({
                    msg: `La cantidad debe de ser mayor a ${cantidadAnterior} `
                });
            }
            else {
                yield product.update(body);
                res.json({
                    msg: `La salida del Producto ${id} fue actualizado exitosamente...`
                });
            }
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `No existe el producto con el id:  ${id}`
        });
    }
});
exports.salidaProducto = salidaProducto;
const estatusProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const { estatus } = req.body;
    const product = yield products_1.Product.findByPk(id);
    try {
        if (!product) {
            res.status(404).json({
                msg: `No existe el producto con el id:  ${id}`
            });
        }
        else {
            yield product.update(body);
            res.json({
                msg: `El estatus de producto ${id} fue actualizado a ${estatus} exitosamente...`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `No existe el producto con el id:  ${id}`
        });
    }
});
exports.estatusProducto = estatusProducto;
