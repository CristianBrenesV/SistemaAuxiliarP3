"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarClaveUsuario = exports.cambiarEstadoUsuario = exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuarioById = exports.getUsuarios = void 0;
const crypto_1 = __importDefault(require("crypto"));
const user_service_1 = require("../services/user.service");
const bitacora_service_1 = require("../../bitacora/bitacora.service");
const AES_KEY = Buffer.from(process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k');
const getUsuarios = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        if (page < 1) {
            return res.status(400).json({ mensaje: 'Página inválida' });
        }
        const limit = 10;
        const offset = (page - 1) * limit;
        const usuarios = await (0, user_service_1.listarUsuarios)(limit, offset);
        const total = await (0, user_service_1.contarUsuarios)();
        return res.status(200).json({
            data: usuarios,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        console.error('Error listando usuarios', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getUsuarios = getUsuarios;
const getUsuarioById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }
        const usuario = await (0, user_service_1.obtenerUsuarioPorId)(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.status(200).json({
            idUsuario: usuario.idUsuario,
            usuario: usuario.usuario,
            nombreUsuario: usuario.nombreUsuario,
            apellidoUsuario: usuario.apellidoUsuario,
            correoElectronico: usuario.correoElectronico,
            estado: usuario.estado,
            roles: usuario.roles
        });
    }
    catch (error) {
        console.error('Error obteniendo usuario', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
exports.getUsuarioById = getUsuarioById;
const createUsuario = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const { usuario, password, nombreUsuario, apellidoUsuario, correoElectronico, estado } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const nonce = crypto_1.default.randomBytes(12);
        const cipher = crypto_1.default.createCipheriv('aes-256-gcm', AES_KEY, nonce);
        const encrypted = Buffer.concat([
            cipher.update(password, 'utf8'),
            cipher.final()
        ]);
        const tag = cipher.getAuthTag();
        try {
            await (0, user_service_1.insertarUsuario)({
                usuario,
                claveCifrada: encrypted,
                nombreUsuario,
                apellidoUsuario,
                correoElectronico,
                tag,
                nonce,
                estado: estado || 'Activo'
            });
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ mensaje: 'El usuario ya existe' });
            }
            throw err;
        }
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Creación de usuario', {
            usuario,
            correo: correoElectronico
        });
        return res.status(201).json({ mensaje: 'Usuario creado' });
    }
    catch (error) {
        console.error('Error creando usuario', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.createUsuario = createUsuario;
const updateUsuario = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }
        const usuarioActual = await (0, user_service_1.obtenerUsuarioPorId)(id);
        if (!usuarioActual) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const datos = req.body;
        const datosCompletos = {
            usuario: datos.usuario ?? usuarioActual.usuario,
            nombreUsuario: datos.nombreUsuario ?? usuarioActual.nombreUsuario,
            apellidoUsuario: datos.apellidoUsuario ?? usuarioActual.apellidoUsuario,
            correoElectronico: datos.correoElectronico ?? usuarioActual.correoElectronico,
            estado: datos.estado ?? usuarioActual.estado
        };
        const resultado = await (0, user_service_1.actualizarUsuario)(id, datosCompletos);
        if (resultado === 1) {
            await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Actualización de usuario', {
                idUsuario: id,
                estado: datosCompletos.estado
            });
            return res.status(200).json({ mensaje: 'Usuario actualizado' });
        }
        return res.status(400).json({ mensaje: 'No se pudo actualizar' });
    }
    catch (error) {
        console.error('Error actualizando usuario', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.updateUsuario = updateUsuario;
const deleteUsuario = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }
        const resultado = await (0, user_service_1.eliminarUsuario)(id);
        if (resultado === 1) {
            await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Eliminación de usuario', {
                idUsuario: id
            });
            return res.status(204).send();
        }
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    catch (error) {
        console.error('Error eliminando usuario', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.deleteUsuario = deleteUsuario;
const cambiarEstadoUsuario = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const { id, estado } = req.body;
        if (!id || !estado) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        await (0, user_service_1.cambiarEstado)(id, estado);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Cambio de estado de usuario', {
            idUsuario: id,
            nuevoEstado: estado
        });
        return res.status(200).json({ mensaje: 'Estado actualizado' });
    }
    catch (error) {
        console.error('Error cambiando estado', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.cambiarEstadoUsuario = cambiarEstadoUsuario;
const cambiarClaveUsuario = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const { id, password } = req.body;
        if (!id || !password) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const nonce = crypto_1.default.randomBytes(12);
        const cipher = crypto_1.default.createCipheriv('aes-256-gcm', AES_KEY, nonce);
        const encrypted = Buffer.concat([
            cipher.update(password, 'utf8'),
            cipher.final()
        ]);
        const tag = cipher.getAuthTag();
        await (0, user_service_1.cambiarClave)(id, encrypted, tag, nonce);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Cambio de clave', {
            idUsuario: id
        });
        return res.status(200).json({ mensaje: 'Clave actualizada' });
    }
    catch (error) {
        console.error('Error cambiando clave', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.cambiarClaveUsuario = cambiarClaveUsuario;
//# sourceMappingURL=user.controller.js.map