import {Request, Response} from "express"
import { User } from "../models/user"
import bcrypt from 'bcrypt'
import {Op} from "sequelize"
import jwt from 'jsonwebtoken'


export const register = async (req: Request, res: Response) => {
    
    const {nombre, correo, contraseña, idRol} = req.body

    const passwordHash = await bcrypt.hash(contraseña, 10)

    const user = await User.findOne({where: {correo:correo}})

    try {
        User.create({
            nombre:nombre,
            correo:correo,
            contraseña:passwordHash,
            idRol:idRol,
            estatus:1,
        })
    } catch (error) {
        res.status(400).json({
            msg:`Usuario ya existe con el mail ${correo}`
        })
    }
   
    res.json({
        msg: `User ${nombre} create sucess...`
    })
}

export const login = async (req: Request, res: Response) =>{

    const { correo, contraseña} = req.body
    const user:any = await User.findOne({where: {correo:correo}})

    if(!user){
      res.status(400).json({
         msg:`Usuario no existe con el mail ${correo}`
    })
   }

   const passwordValid = await bcrypt.compare(contraseña, user.contraseña)

   if(!passwordValid){
      res.status(400).json({
         msg:`Password incorrecto => ${contraseña}`
      })
    
    }

    const token = jwt.sign({
        correo: correo
    },process.env.SECRET_KEY ||'Jdz237797TH1dp7zjFzM',{
        expiresIn:'1h'
    })
    
    res.json(user)
}