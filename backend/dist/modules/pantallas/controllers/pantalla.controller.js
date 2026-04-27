"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePantalla = exports.updatePantalla = exports.createPantalla = exports.getPantallaById = exports.getPantallas = void 0;
const pantalla_service_1 = require("../services/pantalla.service");
const getPantallas = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const pantallas = await (0, pantalla_service_1.listarPantallas)(limit, offset);
        const total = await (0, pantalla_service_1.contarPantallas)();
        return res.json({
            data: pantallas,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        console.error('Error listando pantallas', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getPantallas = getPantallas;
const getPantallaById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const pantalla = await (0, pantalla_service_1.obtenerPantallaPorId)(id);
        if (!pantalla) {
            return res.status(404).json({ mensaje: 'Pantalla no encontrada' });
        }
        return res.json(pantalla);
    }
    catch (error) {
        console.error('Error obteniendo pantalla', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getPantallaById = getPantallaById;
const createPantalla = async (req, res) => {
    try {
        const { nombre, descripcion, ruta, estado } = req.body;
        if (!nombre || !ruta) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        await (0, pantalla_service_1.insertarPantalla)({
            nombre,
            descripcion,
            ruta,
            estado: estado || 'Activa'
        });
        return res.status(201).json({ mensaje: 'Pantalla creada' });
    }
    catch (error) {
        console.error('Error creando pantalla', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.createPantalla = createPantalla;
const updatePantalla = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const datos = req.body;
        const pantallaActual = await (0, pantalla_service_1.obtenerPantallaPorId)(id);
        if (!pantallaActual) {
            return res.status(404).json({ mensaje: 'Pantalla no encontrada' });
        }
        const datosCompletos = {
            nombre: datos.nombre ?? pantallaActual.Nombre,
            descripcion: datos.descripcion ?? pantallaActual.Descripcion,
            ruta: datos.ruta ?? pantallaActual.Ruta,
            estado: datos.estado ?? pantallaActual.Estado
        };
        const resultado = await (0, pantalla_service_1.actualizarPantalla)(id, datosCompletos);
        if (resultado === 1) {
            return res.json({ mensaje: 'Pantalla actualizada' });
        }
        return res.status(400).json({ mensaje: 'Error al actualizar' });
    }
    catch (error) {
        console.error('Error actualizando pantalla', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.updatePantalla = updatePantalla;
const deletePantalla = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await (0, pantalla_service_1.eliminarPantalla)(id);
        if (resultado === 1) {
            return res.json({ mensaje: 'Pantalla eliminada' });
        }
        return res.status(400).json({ mensaje: 'Error al eliminar' });
    }
    catch (error) {
        console.error('Error eliminando pantalla', error);
        return res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.deletePantalla = deletePantalla;
//# sourceMappingURL=pantalla.controller.js.map