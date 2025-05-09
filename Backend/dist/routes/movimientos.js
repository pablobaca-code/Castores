"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movimientos_1 = require("../controllers/movimientos");
const router = (0, express_1.Router)();
router.post("/api/movimientos/register", movimientos_1.register);
//router.get("/api/movimientos/getMovimientos", validateToken, getProducts)
router.get("/api/movimientos/getMovimientos", movimientos_1.getMovimientos);
exports.default = router;
