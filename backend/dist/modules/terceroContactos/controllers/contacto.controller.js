"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarContactoController = exports.actualizarContactoController = exports.obtenerContactoController = exports.crearContactoController = exports.listarContactosController = void 0;
const contacto_service_1 = require("../services/contacto.service");
const bitacora_service_1 = require("../../bitacora/bitacora.service");
// 🔹 LISTAR
const listarContactosController = async (req, res) => {
    try {
        const idTercero = Number(req.params.idTercero);
        const data = await (0, contacto_service_1.listarContactosPorTercero)(idTercero);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error listando contactos' });
    }
};
exports.listarContactosController = listarContactosController;
// 🔹 CREAR
const crearContactoController = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const idTercero = Number(req.params.idTercero);
        const id = await (0, contacto_service_1.crearContacto)(idTercero, req.body);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Creación contacto de tercero', {
            id,
            idTercero,
            ...req.body
        });
        return res.json({ mensaje: 'Contacto creado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.crearContactoController = crearContactoController;
// 🔹 OBTENER
const obtenerContactoController = async (req, res) => {
    try {
        const idContacto = Number(req.params.idContacto);
        const data = await (0, contacto_service_1.obtenerContacto)(idContacto);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error obteniendo contacto' });
    }
};
exports.obtenerContactoController = obtenerContactoController;
// 🔹 ACTUALIZAR
const actualizarContactoController = async (req, res) => {
    try {
        const idTercero = Number(req.params.idTercero);
        const idContacto = Number(req.params.idContacto);
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        await (0, contacto_service_1.actualizarContacto)(idTercero, idContacto, req.body);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Actualización contacto de tercero', {
            idContacto,
            ...req.body
        });
        return res.json({ mensaje: 'Contacto actualizado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: 'Error actualizando contacto' });
    }
};
exports.actualizarContactoController = actualizarContactoController;
// 🔹 ELIMINAR
const eliminarContactoController = async (req, res) => {
    try {
        const idTercero = Number(req.params.idTercero);
        const idContacto = Number(req.params.idContacto);
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        await (0, contacto_service_1.eliminarContacto)(idTercero, idContacto);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Eliminación contacto de tercero', {
            idContacto
        });
        return res.json({ mensaje: 'Contacto eliminado' });
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.eliminarContactoController = eliminarContactoController;
//# sourceMappingURL=contacto.controller.js.map