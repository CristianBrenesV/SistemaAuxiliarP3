"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRolPantalla = exports.updateRolPantallas = exports.createRolPantalla = exports.getPantallasConEstado = exports.getPantallasPorRol = exports.getRolesPantallas = void 0;
const rolpantalla_service_1 = require("../services/rolpantalla.service");
const getRolesPantallas = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const data = await (0, rolpantalla_service_1.listarRolesPantallas)(limit, offset);
        const total = await (0, rolpantalla_service_1.contarRolesPantallas)();
        return res.json({
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        console.error('Error listando relaciones', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getRolesPantallas = getRolesPantallas;
const getPantallasPorRol = async (req, res) => {
    try {
        const idRol = req.params.idRol;
        const data = await (0, rolpantalla_service_1.listarPantallasPorRol)(idRol);
        return res.json(data);
    }
    catch (error) {
        console.error('Error obteniendo pantallas por rol', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getPantallasPorRol = getPantallasPorRol;
const getPantallasConEstado = async (req, res) => {
    try {
        const idRol = req.params.idRol;
        const data = await (0, rolpantalla_service_1.listarConEstado)(idRol);
        return res.json(data);
    }
    catch (error) {
        console.error('Error listando con estado', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getPantallasConEstado = getPantallasConEstado;
const createRolPantalla = async (req, res) => {
    try {
        const { idRol, idPantalla } = req.body;
        if (!idRol || !idPantalla) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        await (0, rolpantalla_service_1.insertarRolPantalla)(idRol, idPantalla);
        return res.status(201).json({ mensaje: 'Asignación creada' });
    }
    catch (error) {
        console.error('Error insertando relación', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.createRolPantalla = createRolPantalla;
const updateRolPantallas = async (req, res) => {
    try {
        const idRol = req.params.idRol;
        const { pantallas } = req.body;
        if (!Array.isArray(pantallas)) {
            return res.status(400).json({ mensaje: 'Formato inválido' });
        }
        const resultado = await (0, rolpantalla_service_1.actualizarRolPantallas)(idRol, pantallas);
        if (resultado === 1) {
            return res.json({ mensaje: 'Pantallas actualizadas' });
        }
        return res.status(400).json({ mensaje: 'Error al actualizar' });
    }
    catch (error) {
        console.error('Error actualizando relación', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.updateRolPantallas = updateRolPantallas;
const deleteRolPantalla = async (req, res) => {
    try {
        const idRol = req.params.idRol;
        const idPantalla = Number(req.params.idPantalla);
        const resultado = await (0, rolpantalla_service_1.eliminarRolPantalla)(idRol, idPantalla);
        if (resultado === 1) {
            return res.json({ mensaje: 'Asignación eliminada' });
        }
        return res.status(400).json({ mensaje: 'Error al eliminar' });
    }
    catch (error) {
        console.error('Error eliminando relación', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.deleteRolPantalla = deleteRolPantalla;
//# sourceMappingURL=rolpantalla.controller.js.map