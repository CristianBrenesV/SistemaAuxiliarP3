"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolpantalla_controller_1 = require("../controllers/rolpantalla.controller");
const router = (0, express_1.Router)();
router.get('/', rolpantalla_controller_1.getRolesPantallas);
router.get('/:idRol/pantallas', rolpantalla_controller_1.getPantallasPorRol);
router.get('/:idRol/pantallas-estado', rolpantalla_controller_1.getPantallasConEstado);
router.post('/', rolpantalla_controller_1.createRolPantalla);
router.put('/:idRol', rolpantalla_controller_1.updateRolPantallas);
router.delete('/:idRol/:idPantalla', rolpantalla_controller_1.deleteRolPantalla);
exports.default = router;
//# sourceMappingURL=rolpantalla.routes.js.map