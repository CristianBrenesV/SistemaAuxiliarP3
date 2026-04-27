"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const periodo_controller_1 = require("../controllers/periodo.controller");
const router = (0, express_1.Router)();
router.get('/periodos', periodo_controller_1.listarPeriodosController);
exports.default = router;
//# sourceMappingURL=periodo.routes.js.map