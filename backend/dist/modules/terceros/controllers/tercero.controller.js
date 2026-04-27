"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTerceroController = exports.eliminarTerceroController = exports.actualizarTerceroController = exports.crearTerceroController = exports.listarTercerosController = void 0;
const tercero_service_1 = require("../services/tercero.service");
const bitacora_service_1 = require("../../bitacora/bitacora.service");
// 🔹 LISTAR
const listarTercerosController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const data = await (0, tercero_service_1.listarTerceros)(page);
        return res.json(data);
    }
    catch {
        return res.status(500).json({ mensaje: 'Error listando terceros' });
    }
};
exports.listarTercerosController = listarTercerosController;
// 🔹 CREAR
const crearTerceroController = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const id = await (0, tercero_service_1.crearTercero)(req.body);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Creación tercero', {
            id,
            ...req.body
        });
        return res.json({ mensaje: 'Tercero creado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.crearTerceroController = crearTerceroController;
// 🔹 ACTUALIZAR
const actualizarTerceroController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, tercero_service_1.actualizarTercero)(id, req.body);
        return res.json({ mensaje: 'Actualizado' });
    }
    catch {
        return res.status(400).json({ mensaje: 'Error actualizando' });
    }
};
exports.actualizarTerceroController = actualizarTerceroController;
// 🔹 ELIMINAR
const eliminarTerceroController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, tercero_service_1.eliminarTercero)(id);
        return res.json({ mensaje: 'Eliminado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.eliminarTerceroController = eliminarTerceroController;
// 🔹 OBTENER
const obtenerTerceroController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await (0, tercero_service_1.obtenerTercero)(id);
        return res.json(data);
    }
    catch {
        return res.status(500).json({ mensaje: 'Error obteniendo tercero' });
    }
};
exports.obtenerTerceroController = obtenerTerceroController;
//# sourceMappingURL=tercero.controller.js.map