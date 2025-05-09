import {Request, Response} from "express"
import { Product } from "../models/products"


export const register = async (req: Request, res: Response) => {
    
    const {nombre, precio, cantidad} = req.body

    try {
        Product.create({
            nombre:nombre,
            precio:precio,
            cantidad:0,
            estatus:1,
        })
    
        res.json({
            msg: `El Producto ${nombre} fue creado exitosamente...`
        })  
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrio un error al guardar`
        })  
    }
 
      
}

export const getProducts = async (req: Request, res: Response) => {

    const listProducts = await Product.findAll();

    res.json({listProducts})
}

export const getProduct = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);

    if(product){
        res.json(product)
    }else{
        res.status(404).json({
            msg: `No existe el producto con el id:  ${id}`
        })
    }
}

export const entradaProducto = async (req: Request, res: Response) => {
    const {body} = req
    const {id} = req.params;
    const {idUser} = req.params;
    const {cantidad} = req.body
    //const product = await Product.findByPk(id);
     const product:any = await Product.findOne({where: {idProducto:id}})
    const cantidadAnterior = product.cantidad;
 
 
       try {
        if(!product){
            res.status(404).json({
                msg: `No existe el producto con el id:  ${id}`
            })
            
        }else{
            
            
            if(cantidadAnterior > cantidad){
                res.status(404).json({
                    msg: `La cantidad debe de ser mayor a ${cantidadAnterior} `
                })
            }else{
                await product.update(body)
            res.json({
                msg: `La entrada del Producto ${id} fue actualizado exitosamente...`
            })
            }   
        }    
    } catch (error) {
        res.status(404).json({
            msg: `Error al actualizar: ${error}`
        })
    }  
    
}

export const salidaProducto = async (req: Request, res: Response) => {
    const {body} = req
    const {id} = req.params;
    const {cantidad} = req.body
    const product:any = await Product.findOne({where: {idProducto:id}})
    const cantidadAnterior = product.cantidad;

    try {
        if(!product){
            res.status(404).json({
                msg: `No existe el producto con el id:  ${id}` 
            })
        }else{
            if(cantidadAnterior > cantidad){
                res.status(404).json({
                    msg: `La cantidad debe de ser mayor a ${cantidadAnterior} `
                })
            }else{
                await product.update(body)
            res.json({
                msg: `La salida del Producto ${id} fue actualizado exitosamente...`
            })
            }   
        }    
    } catch (error) {
        res.status(404).json({
            msg: `No existe el producto con el id:  ${id}`
        })
    }
}

export const estatusProducto = async (req: Request, res: Response) => {
    const {body} = req
    const {id} = req.params;
    const {estatus} = req.body
    const product = await Product.findByPk(id);

    try {
        if(!product){
            res.status(404).json({
                msg: `No existe el producto con el id:  ${id}` 
            })
        }else{
            await product.update(body)
            res.json({
                msg: `El estatus de producto ${id} fue actualizado a ${estatus} exitosamente...`
            })
        }    
    } catch (error) {
        res.status(404).json({
            msg: `No existe el producto con el id:  ${id}`
        })
    }
   
}

