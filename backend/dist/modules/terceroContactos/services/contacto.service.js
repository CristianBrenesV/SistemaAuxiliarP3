"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarContacto = exports.actualizarContacto = exports.obtenerContacto = exports.crearContacto = exports.listarContactosPorTercero = void 0;
const db_1 = require("../../../config/db");
// 🔹 LISTAR contactos de un tercero
const listarContactosPorTercero = async (idTercero) => {
    const [rows] = await db_1.pool.query(`
    SELECT IdContacto, NombreContacto, Cargo, Email, Telefono, TipoContacto, Estado
    FROM tercero_contactos
    WHERE IdTercero = ?
    ORDER BY IdContacto DESC
  `, [idTercero]);
    return rows;
};
exports.listarContactosPorTercero = listarContactosPorTercero;
// 🔹 CREAR contacto
const crearContacto = async (idTercero, data) => {
    const [result] = await db_1.pool.query(`
    INSERT INTO tercero_contactos
    (IdTercero, NombreContacto, Cargo, Email, Telefono, TipoContacto, Estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
        idTercero, data.nombreContacto, data.cargo || null,
        data.email || null, data.telefono || null, data.tipoContacto, data.estado
    ]);
    return result.insertId;
};
exports.crearContacto = crearContacto;
// 🔹 OBTENER contacto por ID
const obtenerContacto = async (idContacto) => {
    const [rows] = await db_1.pool.query(`
    SELECT * FROM tercero_contactos WHERE IdContacto = ?
  `, [idContacto]);
    return rows[0];
};
exports.obtenerContacto = obtenerContacto;
// 🔹 ACTUALIZAR contacto
const actualizarContacto = async (idTercero, idContacto, data) => {
    await db_1.pool.query(`
    UPDATE tercero_contactos
    SET NombreContacto = ?, Cargo = ?, Email = ?, Telefono = ?, TipoContacto = ?, Estado = ?
    WHERE IdContacto = ? AND IdTercero = ?
  `, [
        data.nombreContacto, data.cargo || null, data.email || null,
        data.telefono || null, data.tipoContacto, data.estado,
        idContacto, idTercero
    ]);
};
exports.actualizarContacto = actualizarContacto;
// 🔹 ELIMINAR contacto
const eliminarContacto = async (idTercero, idContacto) => {
    await db_1.pool.query(`
    DELETE FROM tercero_contactos WHERE IdContacto = ? AND IdTercero = ?
  `, [idContacto, idTercero]);
};
exports.eliminarContacto = eliminarContacto;
//# sourceMappingURL=contacto.service.js.map