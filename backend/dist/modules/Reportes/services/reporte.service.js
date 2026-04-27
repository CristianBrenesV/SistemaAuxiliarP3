"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerReporteTerceros = exports.obtenerReporteCentros = void 0;
const db_1 = require("../../../config/db");
const obtenerReporteCentros = async (centro_id, fecha_inicio, fecha_fin, estado_id) => {
    const [rows] = await db_1.pool.query('CALL sp_ReporteCentrosCosto(?, ?, ?, ?)', [
        centro_id ?? null,
        fecha_inicio ?? null,
        fecha_fin ?? null,
        estado_id ?? null
    ]);
    const movimientos = rows[0];
    const totales = rows[1]?.[0] || {
        totalDebe: 0,
        totalHaber: 0,
        diferencia: 0
    };
    return {
        movimientos,
        totalDebe: totales?.totalDebe || 0,
        totalHaber: totales?.totalHaber || 0,
        diferencia: totales?.diferencia || 0
    };
};
exports.obtenerReporteCentros = obtenerReporteCentros;
const obtenerReporteTerceros = async (tercero_id, fecha_inicio, fecha_fin, estado_id) => {
    const [rows] = await db_1.pool.query('CALL sp_ReporteTerceros(?, ?, ?, ?)', [
        tercero_id ?? null,
        fecha_inicio ?? null,
        fecha_fin ?? null,
        estado_id ?? null
    ]);
    const movimientos = rows[0];
    const totales = rows[1]?.[0] || {
        totalDebe: 0,
        totalHaber: 0,
        diferencia: 0
    };
    return {
        movimientos,
        totalDebe: totales?.totalDebe || 0,
        totalHaber: totales?.totalHaber || 0,
        diferencia: totales?.diferencia || 0
    };
};
exports.obtenerReporteTerceros = obtenerReporteTerceros;
//# sourceMappingURL=reporte.service.js.map