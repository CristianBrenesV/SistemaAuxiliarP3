"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPeriodosController = void 0;
const periodo_service_1 = require("../services/periodo.service");
const listarPeriodosController = async (req, res) => {
    try {
        const data = await (0, periodo_service_1.listarPeriodos)();
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error obteniendo periodos' });
    }
};
exports.listarPeriodosController = listarPeriodosController;
//# sourceMappingURL=periodo.controller.js.map