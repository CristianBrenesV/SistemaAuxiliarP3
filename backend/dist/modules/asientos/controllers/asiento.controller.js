"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarAsientosController = exports.obtenerDetallesController = void 0;
const asiento_service_1 = require("../services/asiento.service");
const bitacora_service_1 = require("../../bitacora/bitacora.service");
const obtenerDetallesController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ mensaje: 'ID no válido' });
        const detalles = await (0, asiento_service_1.obtenerDetalles)(id);
        return res.json(detalles || []);
    }
    catch (error) {
        // ... error 500
    }
};
exports.obtenerDetallesController = obtenerDetallesController;
const listarAsientosController = async (req, res) => {
    try {
        const currentUser = req.user;
        const idUsuario = currentUser?.id || 0;
        const idPeriodo = req.query.id_periodo ? Number(req.query.id_periodo) : 1;
        const estado = req.query.estado_id ? Number(req.query.estado_id) : undefined;
        const page = req.query.page ? Number(req.query.page) : 1;
        const result = await (0, asiento_service_1.listarAsientos)(idPeriodo, estado, page);
        await (0, bitacora_service_1.registrarBitacora)(idUsuario, 'Consulta de lista de asientos', { idPeriodo, estado, pagina: page });
        return res.json(result);
    }
    catch (error) {
        console.error('Error al listar asientos:', error);
        return res.status(500).json({
            mensaje: 'Error interno al listar los asientos contables'
        });
    }
};
exports.listarAsientosController = listarAsientosController;
//# sourceMappingURL=asiento.controller.js.map