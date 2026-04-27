"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_controller_1 = require("../controllers/contacto.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.get('/', contacto_controller_1.listarContactosController);
router.get('/:idContacto', contacto_controller_1.obtenerContactoController);
router.post('/', contacto_controller_1.crearContactoController);
router.put('/:idContacto', contacto_controller_1.actualizarContactoController);
router.delete('/:idContacto', contacto_controller_1.eliminarContactoController);
exports.default = router;
//# sourceMappingURL=contacto.routes.js.map