"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = require("./auth.service");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bitacora_service_1 = require("../bitacora/bitacora.service");
const login = async (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: 'Usuario y contraseña son requeridos'
        });
    }
    try {
        const user = await (0, auth_service_1.VerificarPorUsuario)(usuario);
        if (!user) {
            await (0, auth_service_1.registrarIntentoFallido)(usuario);
            await (0, bitacora_service_1.registrarBitacora)(0, 'Login fallido - usuario no existe', {
                usuario
            });
            return res.status(404).json({
                mensaje: 'Usuario no existe'
            });
        }
        if (user.Estado === 'Bloqueado') {
            await (0, bitacora_service_1.registrarBitacora)(user.IdUsuario, 'Login bloqueado', {
                usuario: user.Usuario
            });
            return res.status(403).json({
                mensaje: 'Usuario bloqueado'
            });
        }
        if (user.Estado === 'Inactivo') {
            await (0, bitacora_service_1.registrarBitacora)(user.IdUsuario, 'Login inactivo', {
                usuario: user.Usuario
            });
            return res.status(403).json({
                mensaje: 'Usuario inactivo'
            });
        }
        const nonce = Buffer.isBuffer(user.Nonce)
            ? user.Nonce
            : Buffer.from(user.Nonce, 'hex');
        const tag = Buffer.isBuffer(user.TagAutenticacion)
            ? user.TagAutenticacion
            : Buffer.from(user.TagAutenticacion, 'hex');
        const claveCifrada = Buffer.isBuffer(user.ClaveCifrada)
            ? user.ClaveCifrada
            : Buffer.from(user.ClaveCifrada, 'hex');
        const key = process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k';
        if (key.length !== 32) {
            throw new Error('AES_KEY inválida');
        }
        const SECRET_KEY = Buffer.from(key, 'utf8');
        const decipher = crypto_1.default.createDecipheriv('aes-256-gcm', SECRET_KEY, nonce);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([
            decipher.update(claveCifrada),
            decipher.final()
        ]);
        const passwordDescifrada = decrypted.toString('utf8').trim();
        if (passwordDescifrada !== password) {
            const intentos = await (0, auth_service_1.registrarIntentoFallido)(usuario);
            await (0, bitacora_service_1.registrarBitacora)(user.IdUsuario, 'Login fallido - contraseña incorrecta', {
                usuario: user.Usuario,
                intentos
            });
            return res.status(401).json({
                mensaje: `Contraseña incorrecta. Intentos: ${intentos}`
            });
        }
        await (0, auth_service_1.reiniciarIntentos)(usuario);
        const token = jsonwebtoken_1.default.sign({ id: user.IdUsuario, usuario: user.Usuario, rol: user.IdRol }, process.env.JWT_SECRET || 'losadanp3', { expiresIn: '5m' });
        await (0, bitacora_service_1.registrarBitacora)(user.IdUsuario, 'Inicio de sesión', {
            usuario: user.Usuario
        });
        return res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            user: {
                id: user.IdUsuario,
                usuario: user.Usuario,
                nombre: user.NombreUsuario,
                apellido: user.ApellidoUsuario
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map