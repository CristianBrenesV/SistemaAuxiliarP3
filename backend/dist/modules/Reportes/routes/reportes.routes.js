"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportes_controller_1 = require("../controllers/reportes.controller");
const router = (0, express_1.Router)();
// GET /api/reportes/centros
router.get('/centros', reportes_controller_1.getReporteCentros);
// GET /api/reportes/terceros
router.get('/terceros', reportes_controller_1.getReporteTerceros);
exports.default = router;
//# sourceMappingURL=reportes.routes.js.map