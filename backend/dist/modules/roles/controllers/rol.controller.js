"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRolById = exports.getRoles = void 0;
const rol_service_1 = require("../services/rol.service");
const getRoles = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const roles = await (0, rol_service_1.listarRoles)(limit, offset);
        const total = await (0, rol_service_1.contarRoles)();
        return res.json({
            data: roles,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        console.error('Error listando roles', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getRoles = getRoles;
const getRolById = async (req, res) => {
    try {
        const id = req.params.id;
        const rol = await (0, rol_service_1.obtenerRolPorId)(id);
        if (!rol) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        return res.json(rol);
    }
    catch (error) {
        console.error('Error obteniendo rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getRolById = getRolById;
const createRol = async (req, res) => {
    try {
        const { idRol, nombreRol, descripcion, estado } = req.body;
        if (!idRol || !nombreRol) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        await (0, rol_service_1.insertarRol)({
            idRol,
            nombreRol,
            descripcion,
            estado: estado || 'Activo'
        });
        return res.status(201).json({ mensaje: 'Rol creado' });
    }
    catch (error) {
        console.error('Error creando rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.createRol = createRol;
const updateRol = async (req, res) => {
    try {
        const id = req.params.id;
        const datos = req.body;
        const rolActual = await (0, rol_service_1.obtenerRolPorId)(id);
        if (!rolActual) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        const datosCompletos = {
            nombreRol: datos.nombreRol ?? rolActual.NombreRol,
            descripcion: datos.descripcion ?? rolActual.Descripcion,
            estado: datos.estado ?? rolActual.Estado
        };
        const resultado = await (0, rol_service_1.actualizarRol)(id, datosCompletos);
        if (resultado === 1) {
            return res.json({ mensaje: 'Rol actualizado' });
        }
        return res.status(400).json({ mensaje: 'Error al actualizar' });
    }
    catch (error) {
        console.error('Error actualizando rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.updateRol = updateRol;
const deleteRol = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await (0, rol_service_1.eliminarRol)(id);
        if (resultado === 1) {
            return res.json({ mensaje: 'Rol eliminado' });
        }
        return res.status(400).json({ mensaje: 'Error al eliminar' });
    }
    catch (error) {
        console.error('Error eliminando rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.deleteRol = deleteRol;
//# sourceMappingURL=rol.controller.js.map