"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pantalla_controller_1 = require("../controllers/pantalla.controller");
const router = (0, express_1.Router)();
router.get('/', pantalla_controller_1.getPantallas);
router.get('/:id', pantalla_controller_1.getPantallaById);
router.post('/', pantalla_controller_1.createPantalla);
router.put('/:id', pantalla_controller_1.updatePantalla);
router.delete('/:id', pantalla_controller_1.deletePantalla);
exports.default = router;
//# sourceMappingURL=pantalla.routes.js.map