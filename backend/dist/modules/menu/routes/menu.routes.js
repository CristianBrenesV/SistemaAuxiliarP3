"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controller/menu.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/menu', auth_middleware_1.verificarToken, menu_controller_1.obtenerMenu);
exports.default = router;
//# sourceMappingURL=menu.routes.js.map