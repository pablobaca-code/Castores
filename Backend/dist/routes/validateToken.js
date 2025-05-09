"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headersTokens = req.headers['authorization'];
    //console.log(headersTokens)
    if (headersTokens != undefined && headersTokens.startsWith('Bearer')) {
        try {
            const token = headersTokens.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "Jdz237797TH1dp7zjFzM");
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token Invalido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso Denegado'
        });
    }
};
exports.default = validateToken;
