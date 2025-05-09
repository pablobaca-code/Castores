
import {Request, Response} from "express"
import { Movimentos } from "../models/movimientos"
import { Product } from "../models/products"
import { User} from "../models/user"

export const register = async (req: Request, res: Response) => {
    
    const {tipoMovimiento,idUsuario,idProducto, cantidad} = req.body
    const product:any = await Product.findOne({where: {idProducto:idProducto}})
    const user:any = await User.findOne({where: {idUsuario:idUsuario}})
  
   

    try {

        if(!product){
            res.status(404).json({
                msg: `Accion cancelada - No existe el producto con el id:  ${idProducto}`
            })
            
        }else{
            
            if(cantidad < 0){
                res.status(404).json({
                    msg: `Accion cancelada - La cantidad debe de ser mayor a 0`
                })
            }else{
                if(!user){
                    res.status(404).json({
                        msg: `Accion cancelada - No existe el usuario con el id:  ${idUsuario}`
                    })
                    
                }else{ //ENTRADA E
                    if(tipoMovimiento == "E"){
                        if(user.idRol ==1){
                            if(product.estatus == 1){ // Activo 1
                                const canTotal = product.cantidad + cantidad
                                product.set({
                                    cantidad: canTotal,
                                });
                                
                                await product.save();
                
                                Movimentos.create({
                                    idUsuario:idUsuario,
                                    idProducto:idProducto,
                                    tipoMovimiento:tipoMovimiento,
                                    cantidad:cantidad,
                                })
                            }else{
                                res.json({
                                    msg: `Accion cancelada - Producto dado de baja:  ${product.nombre}`
                                })
                            }
                           
                        }else{
                            res.status(404).json({
                                msg: `Accion cancelada - No se permite la entrada a inventario para este rol:  ${user.idRol}`
                            })
                        }
                    }else{ //SALIDA S
                        if(user.idRol ==1){
                            res.status(404).json({
                                msg: `Accion cancelada - No se permite la salida de inventario para este rol:  ${user.idRol}`
                            })
                        }else{
                            const canTotal = product.cantidad - cantidad
                            if(canTotal > 0){
                                if(product.estatus == 1){ // Activo 1
                                    product.set({
                                        cantidad: canTotal,
                                    });
                                    
                                    await product.save();
                    
                                    Movimentos.create({
                                        idUsuario:idUsuario,
                                        idProducto:idProducto,
                                        tipoMovimiento:tipoMovimiento,
                                        cantidad:cantidad,
                                    })
                                }else{
                                    res.json({
                                        msg: `Accion cancelada - Producto dado de baja:  ${product.nombre}`
                                    })
                                }
                               
                            }else{
                                res.json({
                                    msg: `Accion cancelada - Cantidad a retirar mayor a la existente:  ${product.cantidad}`
                                })
                            }
                           
                            
                        }

                    }
                    
                }  
            }   
        }         

        res.json({
            msg: `El movimiento del producto ${idProducto} fue creado exitosamente...`
        })     
    } catch (error) {
        res.status(404).json({
            msg: `Error al crear el movimiento del producto ${idProducto}`
        })
    }

   
}

export const getMovimientos = async (req: Request, res: Response) => {
    const listMovimientos = await Movimentos.findAll();
    res.json({listMovimientos})
}