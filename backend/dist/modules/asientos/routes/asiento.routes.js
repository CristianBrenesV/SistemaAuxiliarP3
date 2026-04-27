"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asiento_controller_1 = require("../controllers/asiento.controller");
const router = (0, express_1.Router)();
router.get('/', asiento_controller_1.listarAsientosController);
router.get('/:id/detalles', asiento_controller_1.obtenerDetallesController);
exports.default = router;
//# sourceMappingURL=asiento.routes.js.map