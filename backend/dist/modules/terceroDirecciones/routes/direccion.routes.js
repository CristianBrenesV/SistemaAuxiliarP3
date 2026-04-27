"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const direccion_controller_1 = require("../controllers/direccion.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.get('/', direccion_controller_1.listarDireccionesController);
router.get('/:idDireccion', direccion_controller_1.obtenerDireccionController);
router.post('/', direccion_controller_1.crearDireccionController);
router.put('/:idDireccion', direccion_controller_1.actualizarDireccionController);
router.delete('/:idDireccion', direccion_controller_1.eliminarDireccionController);
exports.default = router;
//# sourceMappingURL=direccion.routes.js.map