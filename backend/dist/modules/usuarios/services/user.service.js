"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarClave = exports.cambiarEstado = exports.eliminarUsuario = exports.actualizarUsuario = exports.insertarUsuario = exports.contarUsuarios = exports.obtenerUsuarioPorId = exports.listarUsuarios = void 0;
const db_1 = require("../../../config/db");
const mapUsuario = (u) => ({
    idUsuario: u.IdUsuario,
    usuario: u.Usuario,
    nombreUsuario: u.NombreUsuario,
    apellidoUsuario: u.ApellidoUsuario,
    correoElectronico: u.CorreoElectronico,
    estado: u.Estado,
    roles: u.Roles ? u.Roles.split(', ') : []
});
const listarUsuarios = async (limit, offset) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosListar10(?, ?)', [limit, offset]);
    const data = rows[0];
    return data.map(mapUsuario);
};
exports.listarUsuarios = listarUsuarios;
const obtenerUsuarioPorId = async (id) => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosListarPorIdUsuario(?)', [id]);
    const data = rows[0]?.[0];
    if (!data) {
        throw new Error('Usuario no encontrado');
    }
    return mapUsuario(data);
};
exports.obtenerUsuarioPorId = obtenerUsuarioPorId;
const contarUsuarios = async () => {
    const [rows] = await db_1.pool.query('CALL sp_UsuariosConteo()');
    const total = rows[0]?.[0];
    return total?.Total ?? 0;
};
exports.contarUsuarios = contarUsuarios;
const insertarUsuario = async (data) => {
    await db_1.pool.query('CALL sp_UsuariosInsertar(?, ?, ?, ?, ?, ?, ?, ?, @resultado, @idUsuario)', [
        data.usuario,
        data.claveCifrada,
        data.nombreUsuario,
        data.apellidoUsuario,
        data.correoElectronico,
        data.tag,
        data.nonce,
        data.estado
    ]);
};
exports.insertarUsuario = insertarUsuario;
const actualizarUsuario = async (id, data) => {
    await db_1.pool.query('SET @resultado = 0;');
    await db_1.pool.query('CALL sp_UsuariosActualizarPorIdUsuario(?,?,?,?,?,?,@resultado,@idUsuario)', [
        id,
        data.usuario,
        data.nombreUsuario,
        data.apellidoUsuario,
        data.correoElectronico,
        data.estado
    ]);
    const [rows] = await db_1.pool.query('SELECT @resultado as resultado');
    return rows[0]?.resultado ?? 0;
};
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = async (id) => {
    await db_1.pool.query('SET @resultado = 0;');
    await db_1.pool.query('CALL sp_UsuariosEliminarPorIdUsuario(?, @resultado)', [id]);
    const [rows] = await db_1.pool.query('SELECT @resultado as resultado');
    return rows[0]?.resultado ?? 0;
};
exports.eliminarUsuario = eliminarUsuario;
const cambiarEstado = async (id, estado) => {
    await db_1.pool.query('CALL sp_CambiarEstadoUsuario(?, ?)', [id, estado]);
};
exports.cambiarEstado = cambiarEstado;
const cambiarClave = async (id, claveCifrada, tag, nonce) => {
    await db_1.pool.query('CALL sp_CambiarClaveUsuario(?, ?, ?, ?)', [
        id,
        claveCifrada,
        tag,
        nonce
    ]);
};
exports.cambiarClave = cambiarClave;
//# sourceMappingURL=user.service.js.map