"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDB = void 0;
const db_1 = require("../../config/db");
const testDB = async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT 1');
        res.json({
            mensaje: 'Conexión exitosa',
            rows
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Error conectando a la base de datos',
            detalle: error
        });
    }
};
exports.testDB = testDB;
//# sourceMappingURL=test.controller.js.map