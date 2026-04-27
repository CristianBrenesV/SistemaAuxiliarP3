"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarRol = exports.actualizarRol = exports.insertarRol = exports.contarRoles = exports.obtenerRolPorId = exports.listarRoles = void 0;
const db_1 = require("../../../config/db");
const listarRoles = async (limit, offset) => {
    const [rows] = await db_1.pool.query('CALL sp_RolesListar10(?, ?)', [limit, offset]);
    return rows[0];
};
exports.listarRoles = listarRoles;
const obtenerRolPorId = async (id) => {
    const [rows] = await db_1.pool.query('CALL sp_RolesListarPorIdRol(?)', [id]);
    return rows[0][0];
};
exports.obtenerRolPorId = obtenerRolPorId;
const contarRoles = async () => {
    const [rows] = await db_1.pool.query('CALL sp_RolesConteo()');
    return rows[0][0].Total;
};
exports.contarRoles = contarRoles;
const insertarRol = async (rol) => {
    await db_1.pool.query('CALL sp_RolesInsertar(?, ?, ?, ?, @resultado)', [rol.idRol, rol.nombreRol, rol.descripcion, rol.estado]);
};
exports.insertarRol = insertarRol;
const actualizarRol = async (id, rol) => {
    await db_1.pool.query('CALL sp_RolesActualizarPorIdRol(?, ?, ?, ?, @resultado)', [id, rol.nombreRol, rol.descripcion, rol.estado]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.actualizarRol = actualizarRol;
const eliminarRol = async (id) => {
    await db_1.pool.query('CALL sp_RolesEliminarPorIdRol(?, @resultado)', [id]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.eliminarRol = eliminarRol;
//# sourceMappingURL=rol.service.js.map