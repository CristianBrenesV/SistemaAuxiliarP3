"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarProrrateoController = exports.obtenerDetallesController = exports.obtenerDistribucionTercerosController = exports.obtenerDistribucionCCController = void 0;
const prorrateo_service_1 = require("../services/prorrateo.service");
const obtenerDistribucionCCController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ mensaje: 'ID de detalle inválido' });
        const data = await (0, prorrateo_service_1.obtenerDistribucionCC)(id);
        return res.json(data);
    }
    catch (error) {
        console.error('Error CC:', error);
        return res.status(500).json({ mensaje: 'Error obteniendo distribución de centros de costo' });
    }
};
exports.obtenerDistribucionCCController = obtenerDistribucionCCController;
const obtenerDistribucionTercerosController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ mensaje: 'ID de detalle inválido' });
        const data = await (0, prorrateo_service_1.obtenerDistribucionTerceros)(id);
        return res.json(data);
    }
    catch (error) {
        console.error('Error Terceros:', error);
        return res.status(500).json({ mensaje: 'Error obteniendo distribución de terceros' });
    }
};
exports.obtenerDistribucionTercerosController = obtenerDistribucionTercerosController;
const obtenerDetallesController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ mensaje: 'ID de detalle inválido' });
        const detalle = await (0, prorrateo_service_1.obtenerLineaDetalle)(id);
        if (!detalle) {
            return res.status(404).json({ mensaje: 'La línea de asiento no existe' });
        }
        return res.json(detalle);
    }
    catch (error) {
        console.error('Error Detalle Linea:', error);
        return res.status(500).json({ mensaje: 'Error al obtener los datos de la línea' });
    }
};
exports.obtenerDetallesController = obtenerDetallesController;
const guardarProrrateoController = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const data = req.body;
        // "resultado" ahora contiene el objeto con datos, no solo un booleano
        const resultado = await (0, prorrateo_service_1.guardarProrrateo)(data, idUsuario);
        // Cumplimos con el Profe: Status 200 y Body con información útil
        return res.status(200).json(resultado);
    }
    catch (error) {
        return res.status(400).json({ mensaje: error.message });
    }
};
exports.guardarProrrateoController = guardarProrrateoController;
//# sourceMappingURL=prorrateo.controller.js.map