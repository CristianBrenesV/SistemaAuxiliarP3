"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCentroCosto = exports.actualizarCentroCosto = exports.obtenerCentroCosto = exports.crearCentroCosto = exports.listarCentrosCosto = void 0;
const db_1 = require("../../../config/db");
const listarCentrosCosto = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const connection = await db_1.pool.getConnection();
    try {
        const [rows] = await connection.query(`
      SELECT IdCentroCosto, Codigo, Nombre, Descripcion, Estado
      FROM catalogocentroscostos
      ORDER BY IdCentroCosto DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
        const [count] = await connection.query(`
      SELECT COUNT(*) as total FROM catalogocentroscostos
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
exports.listarCentrosCosto = listarCentrosCosto;
const crearCentroCosto = async (data) => {
    const connection = await db_1.pool.getConnection();
    try {
        const { codigo, nombre, descripcion, estado } = data;
        const [result] = await connection.query(`
      INSERT INTO catalogocentroscostos
      (Codigo, Nombre, Descripcion, Estado)
      VALUES (?, ?, ?, ?)
    `, [codigo, nombre, descripcion, estado]);
        return result.insertId;
    }
    finally {
        connection.release();
    }
};
exports.crearCentroCosto = crearCentroCosto;
const obtenerCentroCosto = async (id) => {
    const [rows] = await db_1.pool.query(`
    SELECT * FROM catalogocentroscostos
    WHERE IdCentroCosto = ?
  `, [id]);
    return rows[0];
};
exports.obtenerCentroCosto = obtenerCentroCosto;
const actualizarCentroCosto = async (id, data) => {
    const connection = await db_1.pool.getConnection();
    try {
        const { codigo, nombre, descripcion, estado } = data;
        await connection.query(`
      UPDATE catalogocentroscostos
      SET Codigo = ?, Nombre = ?, Descripcion = ?, Estado = ?
      WHERE IdCentroCosto = ?
    `, [codigo, nombre, descripcion, estado, id]);
    }
    finally {
        connection.release();
    }
};
exports.actualizarCentroCosto = actualizarCentroCosto;
const eliminarCentroCosto = async (id) => {
    const connection = await db_1.pool.getConnection();
    try {
        const [rows] = await connection.query(`
      SELECT COUNT(*) as total
      FROM asientodetallecentrocosto
      WHERE IdCentroCosto = ?
    `, [id]);
        if (rows[0].total > 0) {
            throw new Error('No se puede eliminar, tiene registros asociados');
        }
        await connection.query(`
      DELETE FROM catalogocentroscostos
      WHERE IdCentroCosto = ?
    `, [id]);
    }
    finally {
        connection.release();
    }
};
exports.eliminarCentroCosto = eliminarCentroCosto;
//# sourceMappingURL=centroCosto.service.js.map