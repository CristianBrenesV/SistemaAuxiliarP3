"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarDireccionController = exports.actualizarDireccionController = exports.obtenerDireccionController = exports.crearDireccionController = exports.listarDireccionesController = void 0;
const direccion_service_1 = require("../services/direccion.service");
const bitacora_service_1 = require("../../bitacora/bitacora.service");
// 🔹 LISTAR
const listarDireccionesController = async (req, res) => {
    try {
        const idTercero = Number(req.params.idTercero);
        const data = await (0, direccion_service_1.listarDireccionesPorTercero)(idTercero);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error listando direcciones' });
    }
};
exports.listarDireccionesController = listarDireccionesController;
// 🔹 CREAR
const crearDireccionController = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const idTercero = Number(req.params.idTercero);
        const id = await (0, direccion_service_1.crearDireccion)(idTercero, req.body);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Creación dirección de tercero', {
            id,
            idTercero,
            ...req.body
        });
        return res.json({ mensaje: 'Dirección creada' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.crearDireccionController = crearDireccionController;
// 🔹 OBTENER
const obtenerDireccionController = async (req, res) => {
    try {
        const idDireccion = Number(req.params.idDireccion);
        const data = await (0, direccion_service_1.obtenerDireccion)(idDireccion);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error obteniendo dirección' });
    }
};
exports.obtenerDireccionController = obtenerDireccionController;
// 🔹 ACTUALIZAR
const actualizarDireccionController = async (req, res) => {
    try {
        const idTercero = Number(req.params.idTercero);
        const idDireccion = Number(req.params.idDireccion);
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        await (0, direccion_service_1.actualizarDireccion)(idTercero, idDireccion, req.body);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Actualización dirección de tercero', {
            idDireccion,
            ...req.body
        });
        return res.json({ mensaje: 'Dirección actualizada' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: 'Error actualizando dirección' });
    }
};
exports.actualizarDireccionController = actualizarDireccionController;
// 🔹 ELIMINAR
const eliminarDireccionController = async (req, res) => {
    try {
        const idTercero = Number(req.params.idTercero);
        const idDireccion = Number(req.params.idDireccion);
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        await (0, direccion_service_1.eliminarDireccion)(idTercero, idDireccion);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Eliminación dirección de tercero', {
            idDireccion
        });
        return res.json({ mensaje: 'Dirección eliminada' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.eliminarDireccionController = eliminarDireccionController;
//# sourceMappingURL=direccion.controller.js.map