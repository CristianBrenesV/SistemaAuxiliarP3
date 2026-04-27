"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarTercero = exports.actualizarTercero = exports.obtenerTercero = exports.crearTercero = exports.listarTerceros = void 0;
const db_1 = require("../../../config/db");
// 🔹 LISTAR
const listarTerceros = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const connection = await db_1.pool.getConnection();
    try {
        const [rows] = await connection.query(`
      SELECT IdTercero, Identificacion, Nombre, TipoTercero, Email, Telefono, Estado
      FROM catalogoterceros
      ORDER BY IdTercero DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
        const [count] = await connection.query(`
      SELECT COUNT(*) as total FROM catalogoterceros
    `);
        return {
            data: rows,
            total: count[0].total,
            page,
            totalPages: Math.ceil(count[0].total / limit)
        };
    }
    finally {
        connection.release();
    }
};
exports.listarTerceros = listarTerceros;
// 🔹 CREAR
const crearTercero = async (data) => {
    const connection = await db_1.pool.getConnection();
    try {
        const { identificacion, nombre, tipo, email, telefono, estado } = data;
        const [result] = await connection.query(`
      INSERT INTO catalogoterceros
      (Identificacion, Nombre, TipoTercero, Email, Telefono, Estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [identificacion, nombre, tipo, email, telefono, estado]);
        return result.insertId;
    }
    finally {
        connection.release();
    }
};
exports.crearTercero = crearTercero;
// 🔹 OBTENER
const obtenerTercero = async (id) => {
    const [rows] = await db_1.pool.query(`
    SELECT * FROM catalogoterceros
    WHERE IdTercero = ?
  `, [id]);
    return rows[0];
};
exports.obtenerTercero = obtenerTercero;
// 🔹 ACTUALIZAR
const actualizarTercero = async (id, data) => {
    const connection = await db_1.pool.getConnection();
    try {
        const { identificacion, nombre, tipo, email, telefono, estado } = data;
        await connection.query(`
      UPDATE catalogoterceros
      SET Identificacion = ?, Nombre = ?, TipoTercero = ?, Email = ?, Telefono = ?, Estado = ?
      WHERE IdTercero = ?
    `, [identificacion, nombre, tipo, email, telefono, estado, id]);
    }
    finally {
        connection.release();
    }
};
exports.actualizarTercero = actualizarTercero;
// 🔹 ELIMINAR (validación)
const eliminarTercero = async (id) => {
    const connection = await db_1.pool.getConnection();
    try {
        const [rows] = await connection.query(`
      SELECT COUNT(*) as total
      FROM asientodetalletercero
      WHERE IdTercero = ?
    `, [id]);
        if (rows[0].total > 0) {
            throw new Error('No se puede eliminar, tiene registros asociados');
        }
        await connection.query(`
      DELETE FROM catalogoterceros
      WHERE IdTercero = ?
    `, [id]);
    }
    finally {
        connection.release();
    }
};
exports.eliminarTercero = eliminarTercero;
//# sourceMappingURL=tercero.service.js.map