"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tercero_controller_1 = require("../controllers/tercero.controller");
const router = (0, express_1.Router)();
router.get('/', tercero_controller_1.listarTercerosController);
router.get('/:id', tercero_controller_1.obtenerTerceroController);
router.post('/', tercero_controller_1.crearTerceroController);
router.put('/:id', tercero_controller_1.actualizarTerceroController);
router.delete('/:id', tercero_controller_1.eliminarTerceroController);
exports.default = router;
//# sourceMappingURL=tercero.routes.js.map