"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerMenuPorRol = void 0;
const db_1 = require("../../../config/db");
const obtenerMenuPorRol = async (rol) => {
    const [rows] = await db_1.pool.query('CALL sp_MenuPorRol(?)', [rol]);
    return rows[0];
};
exports.obtenerMenuPorRol = obtenerMenuPorRol;
//# sourceMappingURL=menu.service.js.map