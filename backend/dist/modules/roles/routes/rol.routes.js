"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_controller_1 = require("../controllers/rol.controller");
const router = (0, express_1.Router)();
router.get('/', rol_controller_1.getRoles);
router.get('/:id', rol_controller_1.getRolById);
router.post('/', rol_controller_1.createRol);
router.put('/:id', rol_controller_1.updateRol);
router.delete('/:id', rol_controller_1.deleteRol);
exports.default = router;
//# sourceMappingURL=rol.routes.js.map