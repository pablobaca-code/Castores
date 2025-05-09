"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
router.post("/api/productos/register", products_1.register);
//router.get("/api/productos/getProducts", validateToken, getProducts)
router.get("/api/productos", products_1.getProducts);
router.get("/api/productos/:id", products_1.getProduct);
router.get("/api/productos/getProductos", products_1.getProducts);
router.get("/api/productos/getProducto/:id", products_1.getProduct);
router.put("/api/productos/estatusProducto/:id", products_1.estatusProducto);
exports.default = router;
