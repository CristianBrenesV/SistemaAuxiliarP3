"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariorol_controller_1 = require("../controllers/usuariorol.controller");
const router = (0, express_1.Router)();
router.get('/', usuariorol_controller_1.getUsuariosRoles);
router.get('/usuario/:idUsuario', usuariorol_controller_1.getRolesPorUsuario);
router.get('/usuario/:idUsuario/activos', usuariorol_controller_1.getRolesActivosPorUsuario);
router.get('/rol/:idRol', usuariorol_controller_1.getUsuariosPorRol);
router.post('/', usuariorol_controller_1.createUsuarioRol);
router.delete('/:idUsuario/:idRol', usuariorol_controller_1.deleteUsuarioRol);
exports.default = router;
//# sourceMappingURL=usuariorol.routes.js.map