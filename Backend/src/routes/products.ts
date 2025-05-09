import {Router} from "express";
import { entradaProducto, estatusProducto, getProduct, getProducts, register} from "../controllers/products";
import validateToken from "./validateToken";

const router = Router();

router.post("/api/productos/register", register)
//router.get("/api/productos/getProducts", validateToken, getProducts)
router.get("/api/productos", getProducts)
router.get("/api/productos/:id", getProduct)
router.get("/api/productos/getProductos", getProducts)
router.get("/api/productos/getProducto/:id", getProduct)
router.put("/api/productos/estatusProducto/:id", estatusProducto)


export default router