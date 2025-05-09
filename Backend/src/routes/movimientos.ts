import {Router} from "express";
import {getMovimientos, register} from "../controllers/movimientos";
import validateToken from "./validateToken";

const router = Router();

router.post("/api/movimientos/register", register)
//router.get("/api/movimientos/getMovimientos", validateToken, getProducts)
router.get("/api/movimientos/getMovimientos", getMovimientos)

export default router