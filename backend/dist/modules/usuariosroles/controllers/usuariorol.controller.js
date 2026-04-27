"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuarioRol = exports.createUsuarioRol = exports.getUsuariosPorRol = exports.getRolesActivosPorUsuario = exports.getRolesPorUsuario = exports.getUsuariosRoles = void 0;
const usuariorol_service_1 = require("../services/usuariorol.service");
const getUsuariosRoles = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const data = await (0, usuariorol_service_1.listarUsuariosRoles)(limit, offset);
        const total = await (0, usuariorol_service_1.contarUsuariosRoles)();
        return res.json({
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        console.error('Error listando usuarios-roles', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getUsuariosRoles = getUsuariosRoles;
const getRolesPorUsuario = async (req, res) => {
    try {
        const idUsuario = Number(req.params.idUsuario);
        const data = await (0, usuariorol_service_1.listarRolesPorUsuario)(idUsuario);
        return res.json(data);
    }
    catch (error) {
        console.error('Error obteniendo roles del usuario', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getRolesPorUsuario = getRolesPorUsuario;
const getRolesActivosPorUsuario = async (req, res) => {
    try {
        const idUsuario = Number(req.params.idUsuario);
        const data = await (0, usuariorol_service_1.listarRolesActivosPorUsuario)(idUsuario);
        return res.json(data);
    }
    catch (error) {
        console.error('Error obteniendo roles activos', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getRolesActivosPorUsuario = getRolesActivosPorUsuario;
const getUsuariosPorRol = async (req, res) => {
    try {
        const idRol = req.params.idRol;
        const data = await (0, usuariorol_service_1.listarUsuariosPorRol)(idRol);
        return res.json(data);
    }
    catch (error) {
        console.error('Error obteniendo usuarios por rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getUsuariosPorRol = getUsuariosPorRol;
const createUsuarioRol = async (req, res) => {
    try {
        const { idUsuario, idRol } = req.body;
        if (!idUsuario || !idRol) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        await (0, usuariorol_service_1.insertarUsuarioRol)(idUsuario, idRol);
        return res.status(201).json({ mensaje: 'Asignación creada' });
    }
    catch (error) {
        console.error('Error insertando usuario-rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.createUsuarioRol = createUsuarioRol;
const deleteUsuarioRol = async (req, res) => {
    try {
        const idUsuario = Number(req.params.idUsuario);
        const idRol = req.params.idRol;
        const resultado = await (0, usuariorol_service_1.eliminarUsuarioRol)(idUsuario, idRol);
        if (resultado === 1) {
            return res.json({ mensaje: 'Asignación eliminada' });
        }
        return res.status(400).json({ mensaje: 'Error al eliminar' });
    }
    catch (error) {
        console.error('Error eliminando usuario-rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.deleteUsuarioRol = deleteUsuarioRol;
//# sourceMappingURL=usuariorol.controller.js.map