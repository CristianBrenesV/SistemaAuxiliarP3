"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/', user_controller_1.getUsuarios);
router.get('/:id', user_controller_1.getUsuarioById);
router.post('/', user_controller_1.createUsuario);
router.put('/:id', user_controller_1.updateUsuario);
router.delete('/:id', user_controller_1.deleteUsuario);
router.post('/estado', user_controller_1.cambiarEstadoUsuario);
router.post('/clave', user_controller_1.cambiarClaveUsuario);
exports.default = router;
//# sourceMappingURL=user.routes.js.map