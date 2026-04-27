"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPantalla = exports.actualizarPantalla = exports.insertarPantalla = exports.contarPantallas = exports.obtenerPantallaPorId = exports.listarPantallas = void 0;
const db_1 = require("../../../config/db");
const listarPantallas = async (limit, offset) => {
    const [rows] = await db_1.pool.query('CALL sp_PantallasListar10(?, ?)', [limit, offset]);
    return rows[0];
};
exports.listarPantallas = listarPantallas;
const obtenerPantallaPorId = async (id) => {
    const [rows] = await db_1.pool.query('CALL sp_PantallasListarPorIdPantalla(?)', [id]);
    return rows[0][0];
};
exports.obtenerPantallaPorId = obtenerPantallaPorId;
const contarPantallas = async () => {
    const [rows] = await db_1.pool.query('CALL sp_PantallasConteo()');
    return rows[0][0].Total;
};
exports.contarPantallas = contarPantallas;
const insertarPantalla = async (pantalla) => {
    await db_1.pool.query('CALL sp_PantallasInsertar(?, ?, ?, ?, @resultado)', [
        pantalla.nombre,
        pantalla.descripcion,
        pantalla.ruta,
        pantalla.estado
    ]);
};
exports.insertarPantalla = insertarPantalla;
const actualizarPantalla = async (id, pantalla) => {
    await db_1.pool.query('CALL sp_PantallasActualizarPorIdPantalla(?, ?, ?, ?, ?, @resultado)', [
        id,
        pantalla.nombre,
        pantalla.descripcion,
        pantalla.ruta,
        pantalla.estado
    ]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.actualizarPantalla = actualizarPantalla;
const eliminarPantalla = async (id) => {
    await db_1.pool.query('CALL sp_PantallasEliminarPorIdPantalla(?, @resultado)', [id]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.eliminarPantalla = eliminarPantalla;
//# sourceMappingURL=pantalla.service.js.map