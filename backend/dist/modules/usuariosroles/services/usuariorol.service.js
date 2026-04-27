"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuarioRol = exports.insertarUsuarioRol = exports.listarUsuariosPorRol = exports.listarRolesActivosPorUsuario = exports.listarRolesPorUsuario = exports.listarPorRol = exports.listarPorUsuario = exports.contarUsuariosRoles = exports.listarUsuariosRoles = void 0;
const db_1 = require("../../../config/db");
const listarUsuariosRoles = async (limit, offset) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesListar10(?, ?)', [limit, offset]);
    return rows[0];
};
exports.listarUsuariosRoles = listarUsuariosRoles;
const contarUsuariosRoles = async () => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesConteo()');
    return rows[0][0].Total;
};
exports.contarUsuariosRoles = contarUsuariosRoles;
const listarPorUsuario = async (idUsuario) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesListarPorIdUsuario(?)', [idUsuario]);
    return rows[0];
};
exports.listarPorUsuario = listarPorUsuario;
const listarPorRol = async (idRol) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesListarPorIdRol(?)', [idRol]);
    return rows[0];
};
exports.listarPorRol = listarPorRol;
const listarRolesPorUsuario = async (idUsuario) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesListarRolesPorIdUsuario(?)', [idUsuario]);
    return rows[0];
};
exports.listarRolesPorUsuario = listarRolesPorUsuario;
const listarRolesActivosPorUsuario = async (idUsuario) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesListarRolesActivosPorIdUsuario(?)', [idUsuario]);
    return rows[0];
};
exports.listarRolesActivosPorUsuario = listarRolesActivosPorUsuario;
const listarUsuariosPorRol = async (idRol) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosRolesListarUsuariosPorIdRol(?)', [idRol]);
    return rows[0];
};
exports.listarUsuariosPorRol = listarUsuariosPorRol;
const insertarUsuarioRol = async (idUsuario, idRol) => {
    await db_1.pool.query('CALL sp_UsuariosRolesInsertar(?, ?, @resultado)', [idUsuario, idRol]);
};
exports.insertarUsuarioRol = insertarUsuarioRol;
const eliminarUsuarioRol = async (idUsuario, idRol) => {
    await db_1.pool.query('CALL sp_UsuariosRolesEliminarPorIdUsuarioIdRol(?, ?, @resultado)', [idUsuario, idRol]);
    const [res] = await db_1.pool.query('SELECT @resultado as resultado');
    return res[0].resultado;
};
exports.eliminarUsuarioRol = eliminarUsuarioRol;
//# sourceMappingURL=usuariorol.service.js.map