"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarDireccion = exports.actualizarDireccion = exports.obtenerDireccion = exports.crearDireccion = exports.listarDireccionesPorTercero = void 0;
const db_1 = require("../../../config/db");
// 🔹 LISTAR direcciones de un tercero
const listarDireccionesPorTercero = async (idTercero) => {
    const [rows] = await db_1.pool.query(`
    SELECT IdDireccion, Alias, Provincia, Canton, Distrito, DireccionExacta, EsPrincipal, Estado
    FROM tercero_direcciones
    WHERE IdTercero = ?
    ORDER BY EsPrincipal DESC, IdDireccion DESC
  `, [idTercero]);
    return rows;
};
exports.listarDireccionesPorTercero = listarDireccionesPorTercero;
// 🔹 CREAR dirección
const crearDireccion = async (idTercero, data) => {
    const connection = await db_1.pool.getConnection();
    try {
        await connection.beginTransaction();
        if (data.esPrincipal) {
            await connection.query(`
        UPDATE tercero_direcciones SET EsPrincipal = 0 WHERE IdTercero = ?
      `, [idTercero]);
        }
        const [result] = await connection.query(`
      INSERT INTO tercero_direcciones
      (IdTercero, Alias, Provincia, Canton, Distrito, DireccionExacta, EsPrincipal, Estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            idTercero, data.alias, data.provincia, data.canton,
            data.distrito, data.direccionExacta, data.esPrincipal ? 1 : 0, data.estado
        ]);
        await connection.commit();
        return result.insertId;
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
};
exports.crearDireccion = crearDireccion;
// 🔹 OBTENER dirección por ID
const obtenerDireccion = async (idDireccion) => {
    const [rows] = await db_1.pool.query(`
    SELECT * FROM tercero_direcciones WHERE IdDireccion = ?
  `, [idDireccion]);
    return rows[0];
};
exports.obtenerDireccion = obtenerDireccion;
// 🔹 ACTUALIZAR dirección
const actualizarDireccion = async (idTercero, idDireccion, data) => {
    const connection = await db_1.pool.getConnection();
    try {
        await connection.beginTransaction();
        if (data.esPrincipal) {
            await connection.query(`
        UPDATE tercero_direcciones SET EsPrincipal = 0 WHERE IdTercero = ? AND IdDireccion != ?
      `, [idTercero, idDireccion]);
        }
        await connection.query(`
      UPDATE tercero_direcciones
      SET Alias = ?, Provincia = ?, Canton = ?, Distrito = ?, DireccionExacta = ?, EsPrincipal = ?, Estado = ?
      WHERE IdDireccion = ? AND IdTercero = ?
    `, [
            data.alias, data.provincia, data.canton, data.distrito,
            data.direccionExacta, data.esPrincipal ? 1 : 0, data.estado,
            idDireccion, idTercero
        ]);
        await connection.commit();
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
};
exports.actualizarDireccion = actualizarDireccion;
// 🔹 ELIMINAR dirección
const eliminarDireccion = async (idTercero, idDireccion) => {
    const connection = await db_1.pool.getConnection();
    try {
        // Verificar si tiene asignaciones
        const [rows] = await connection.query(`
      SELECT COUNT(*) as total FROM asientodetalletercero_direccion WHERE IdDireccion = ?
    `, [idDireccion]);
        if (rows[0].total > 0) {
            throw new Error('No se puede eliminar, tiene registros asociados');
        }
        await connection.query(`
      DELETE FROM tercero_direcciones WHERE IdDireccion = ? AND IdTercero = ?
    `, [idDireccion, idTercero]);
    }
    finally {
        connection.release();
    }
};
exports.eliminarDireccion = eliminarDireccion;
//# sourceMappingURL=direccion.service.js.map