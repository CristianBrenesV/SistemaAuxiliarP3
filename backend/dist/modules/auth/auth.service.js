"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reiniciarIntentos = exports.registrarIntentoFallido = exports.VerificarPorUsuario = void 0;
const db_1 = require("../../config/db");
const VerificarPorUsuario = async (usuario) => {
    const [rows] = await db_1.pool.query('CALL sp_VerificarCredencial(?)', [usuario]);
    return rows[0][0];
};
exports.VerificarPorUsuario = VerificarPorUsuario;
const registrarIntentoFallido = async (usuario) => {
    await db_1.pool.query('SET @resultado = 0');
    await db_1.pool.query('CALL sp_RegistrarIntentoFallido(?, @resultado)', [usuario]);
    const [rows] = await db_1.pool.query('SELECT @resultado as resultado');
    return rows[0].resultado ?? 0;
};
exports.registrarIntentoFallido = registrarIntentoFallido;
const reiniciarIntentos = async (usuario) => {
    await db_1.pool.query('CALL sp_ReiniciarIntentos(?)', [usuario]);
};
exports.reiniciarIntentos = reiniciarIntentos;
//# sourceMappingURL=auth.service.js.map