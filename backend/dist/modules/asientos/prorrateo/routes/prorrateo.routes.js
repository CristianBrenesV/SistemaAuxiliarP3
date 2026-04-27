"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prorrateo_controller_1 = require("../controllers/prorrateo.controller");
const router = (0, express_1.Router)();
router.post('/', prorrateo_controller_1.guardarProrrateoController);
router.get('/detalle/:id', prorrateo_controller_1.obtenerDetallesController);
router.get('/cc/:id', prorrateo_controller_1.obtenerDistribucionCCController);
router.get('/terceros/:id', prorrateo_controller_1.obtenerDistribucionTercerosController);
exports.default = router;
//# sourceMappingURL=prorrateo.routes.js.map