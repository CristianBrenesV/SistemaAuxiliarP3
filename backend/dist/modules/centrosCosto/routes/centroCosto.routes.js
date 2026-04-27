"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const centroCosto_controller_1 = require("../controllers/centroCosto.controller");
const router = (0, express_1.Router)();
router.get('/', centroCosto_controller_1.listarCentrosCostoController);
router.get('/:id', centroCosto_controller_1.obtenerCentroCostoController);
router.post('/', centroCosto_controller_1.crearCentroCostoController);
router.put('/:id', centroCosto_controller_1.actualizarCentroCostoController);
router.delete('/:id', centroCosto_controller_1.eliminarCentroCostoController);
exports.default = router;
//# sourceMappingURL=centroCosto.routes.js.map