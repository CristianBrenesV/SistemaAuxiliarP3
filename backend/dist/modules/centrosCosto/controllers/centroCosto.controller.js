"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCentroCostoController = exports.eliminarCentroCostoController = exports.actualizarCentroCostoController = exports.crearCentroCostoController = exports.listarCentrosCostoController = void 0;
const centroCosto_service_1 = require("../services/centroCosto.service");
const bitacora_service_1 = require("../../bitacora/bitacora.service");
// 🔹 LISTAR
const listarCentrosCostoController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const data = await (0, centroCosto_service_1.listarCentrosCosto)(page);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error listando centros de costo' });
    }
};
exports.listarCentrosCostoController = listarCentrosCostoController;
// 🔹 CREAR
const crearCentroCostoController = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const id = await (0, centroCosto_service_1.crearCentroCosto)(req.body);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Creación centro costo', {
            id,
            ...req.body
        });
        return res.json({ mensaje: 'Centro creado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.crearCentroCostoController = crearCentroCostoController;
// 🔹 ACTUALIZAR
const actualizarCentroCostoController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, centroCosto_service_1.actualizarCentroCosto)(id, req.body);
        return res.json({ mensaje: 'Actualizado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: 'Error actualizando' });
    }
};
exports.actualizarCentroCostoController = actualizarCentroCostoController;
// 🔹 ELIMINAR
const eliminarCentroCostoController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, centroCosto_service_1.eliminarCentroCosto)(id);
        return res.json({ mensaje: 'Eliminado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.eliminarCentroCostoController = eliminarCentroCostoController;
// 🔹 OBTENER
const obtenerCentroCostoController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await (0, centroCosto_service_1.obtenerCentroCosto)(id);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error obteniendo centro' });
    }
};
exports.obtenerCentroCostoController = obtenerCentroCostoController;
//# sourceMappingURL=centroCosto.controller.js.map