"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const products_1 = __importDefault(require("../routes/products"));
const movimientos_1 = __importDefault(require("../routes/movimientos"));
const user_2 = require("./user");
const products_2 = require("./products");
const movimientos_2 = require("./movimientos");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();
        //console.log("Estas corriendo por el puerto:"+ this.port);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Se esta ejecutando por el puerto: " + this.port);
        });
    }
    routes() {
        this.app.use('/api/productos', products_1.default);
    }
    router() {
        this.app.use(user_1.default);
        this.app.use(products_1.default);
        this.app.use(movimientos_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //await sequelize.authenticate();
                //await  User.sync({force: true});
                //await  Product.sync({force: true});
                yield user_2.User.sync({ alter: true, force: false });
                yield products_2.Product.sync({ alter: true, force: false });
                yield movimientos_2.Movimentos.sync({ alter: true, force: false });
                console.log('La tabla del modelo de usuario fue (re)creada!');
                console.log("Conexion exitosa");
            }
            catch (error) {
                console.log("Error de conexion: " + error);
            }
        });
    }
}
exports.default = Server;
