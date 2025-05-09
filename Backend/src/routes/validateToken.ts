import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const validateToken = (req:Request, res: Response, next: NextFunction) => {
    const headersTokens = req.headers['authorization']
    //console.log(headersTokens)

    if(headersTokens != undefined && headersTokens.startsWith('Bearer')){
        try {
            const token = headersTokens.slice(7)
            jwt.verify(token, process.env.SECRET_KEY || "Jdz237797TH1dp7zjFzM")
            next()
        } catch (error) {
            res.status(401).json({
                msg:'Token Invalido'
            })
        }
    }else{
        res.status(401).json({
            msg:'Acceso Denegado'
        })
    }

   
   
}

export default validateToken