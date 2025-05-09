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
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, contraseña, idRol } = req.body;
    const passwordHash = yield bcrypt_1.default.hash(contraseña, 10);
    const user = yield user_1.User.findOne({ where: { correo: correo } });
    try {
        user_1.User.create({
            nombre: nombre,
            correo: correo,
            contraseña: passwordHash,
            idRol: idRol,
            estatus: 1,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Usuario ya existe con el mail ${correo}`
        });
    }
    res.json({
        msg: `User ${nombre} create sucess...`
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contraseña } = req.body;
    const user = yield user_1.User.findOne({ where: { correo: correo } });
    if (!user) {
        res.status(400).json({
            msg: `Usuario no existe con el mail ${correo}`
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(contraseña, user.contraseña);
    if (!passwordValid) {
        res.status(400).json({
            msg: `Password incorrecto => ${contraseña}`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        correo: correo
    }, process.env.SECRET_KEY || 'Jdz237797TH1dp7zjFzM', {
        expiresIn: '1h'
    });
    res.json(user);
});
exports.login = login;
