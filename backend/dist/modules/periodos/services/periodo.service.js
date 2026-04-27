"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPeriodos = void 0;
const db_1 = require("../../../config/db");
const listarPeriodos = async () => {
    const connection = await db_1.pool.getConnection();
    try {
        const [rows] = await connection.query(`
      SELECT 
        IdPeriodo,
        Anio,
        Mes,
        Estado
      FROM periodocontable
      ORDER BY Anio DESC, Mes DESC
    `);
        return rows;
    }
    finally {
        connection.release();
    }
};
exports.listarPeriodos = listarPeriodos;
//# sourceMappingURL=periodo.service.js.map