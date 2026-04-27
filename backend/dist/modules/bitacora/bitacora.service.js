"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarBitacora = void 0;
const db_1 = require("../../config/db");
const registrarBitacora = async (idUsuario, descripcion, acciones) => {
    try {
        await db_1.pool.query('CALL sp_BitacoraInsertar(?, ?, ?)', [
            idUsuario || 0,
            descripcion,
            JSON.stringify(acciones)
        ]);
    }
    catch (error) {
        console.error('Error al registrar bitácora:', error);
    }
};
exports.registrarBitacora = registrarBitacora;
//# sourceMappingURL=bitacora.service.js.map