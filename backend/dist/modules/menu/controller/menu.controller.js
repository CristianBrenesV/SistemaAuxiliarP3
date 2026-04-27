"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerMenu = void 0;
const menu_service_1 = require("../services/menu.service");
const obtenerMenu = async (req, res) => {
    try {
        const { rol } = req.user;
        const menu = await (0, menu_service_1.obtenerMenuPorRol)(rol);
        res.json(menu);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error obteniendo menú' });
    }
};
exports.obtenerMenu = obtenerMenu;
//# sourceMappingURL=menu.controller.js.map