
import express, { Application } from 'express';
import sequelize from '../database/connection';
import RUser from '../routes/user';
import RProduct from '../routes/products';
import RMovimiento from '../routes/movimientos'
import user from '../routes/user';
import { User } from './user';
import { Product } from './products';
import { Movimentos } from './movimientos';

class Server{

    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();
        //console.log("Estas corriendo por el puerto:"+ this.port);
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log("Se esta ejecutando por el puerto: " + this.port);
      })
    }

    routes() {
                  
        this.app.use('/api/productos',RProduct)
       
    }

    router(){
        this.app.use(RUser)
        this.app.use(RProduct)
        this.app.use(RMovimiento)
    }
    
    midlewares(){
        this.app.use(express.json())
    }


    async DBconnect(){
        try{
       //await sequelize.authenticate();
       //await  User.sync({force: true});
       //await  Product.sync({force: true});
       await  User.sync({alter: true, force: false});
       await  Product.sync({alter: true, force: false});
       await Movimentos.sync({alter: true, force: false});
       console.log('La tabla del modelo de usuario fue (re)creada!');
       console.log("Conexion exitosa");
        }
        catch(error){
            console.log("Error de conexion: " + error);
            
        }
    }
}


export default Server