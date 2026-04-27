"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarRolPantallas = exports.eliminarRolPantalla = exports.insertarRolPantalla = exports.listarConEstado = exports.listarPantallasPorRol = exports.listarPorRol = exports.contarRolesPantallas = exports.listarRolesPantallas = void 0;
const db_1 = require("../../../config/db");
const listarRolesPantallas = async (limit, offset) => {
    const [rows] = await db_1.pool.query('CALL sp_RolesPantallasListar10(?, ?)', [limit, offset]);
    return rows[0];
};
exports.listarRolesPantallas = listarRolesPantallas;
const contarRolesPantallas = async () => {
    const [rows] = await db_1.pool.query('CALL sp_RolesPantallasConteo()');
    return rows[0][0].Total;
};
exports.contarRolesPantallas = contarRolesPantallas;
const listarPorRol = async (idRol) => {
    const [rows] = await db_1.pool.query('CALL sp_RolesPantallasListarPorIdRol(?)', [idRol]);
    return rows[0];
};
exports.listarPorRol = listarPorRol;
const listarPantallasPorRol = async (idRol) => {
    const [rows] = await db_1.pool.query('CALL sp_RolesPantallasListarPantallasPorIdRol(?)', [idRol]);
    return rows[0];
};
exports.listarPantallasPorRol = listarPantallasPorRol;
const listarConEstado = async (idRol) => {
    const [rows] = await db_1.pool.query('CALL sp_RolesPantallasListarConEstado(?)', [idRol]);
    return rows[0];
};
exports.listarConEstado = listarConEstado;
const insertarRolPantalla = async (idRol, idPantalla) => {
    await db_1.pool.query('CALL sp_RolesPantallasInsertar(?, ?, @resultado)', [idRol, idPantalla]);
};
exports.insertarRolPantalla = insertarRolPantalla;
const eliminarRolPantalla = async (idRol, idPantalla) => {
    await db_1.pool.query('CALL sp_RolesPantallasEliminarPorIdRolIdPantalla(?, ?, @resultado)', [idRol, idPantalla]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.eliminarRolPantalla = eliminarRolPantalla;
const actualizarRolPantallas = async (idRol, pantallas) => {
    const lista = pantallas.join(',');
    await db_1.pool.query('CALL sp_RolesPantallasActualizar(?, ?, @resultado)', [idRol, lista]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.actualizarRolPantallas = actualizarRolPantallas;
//# sourceMappingURL=rolpantalla.service.js.map