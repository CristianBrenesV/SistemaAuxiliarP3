"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("./test.controller");
const router = (0, express_1.Router)();
router.get('/db', test_controller_1.testDB);
exports.default = router;
//# sourceMappingURL=test.routes.js.map