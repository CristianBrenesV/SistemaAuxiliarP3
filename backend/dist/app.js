"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const test_routes_1 = __importDefault(require("./modules/pruebas/test.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/usuarios/routes/user.routes"));
const prorrateo_routes_1 = __importDefault(require("./modules/asientos/prorrateo/routes/prorrateo.routes"));
const asiento_routes_1 = __importDefault(require("./modules/asientos/routes/asiento.routes"));
const centroCosto_routes_1 = __importDefault(require("./modules/centrosCosto/routes/centroCosto.routes"));
const tercero_routes_1 = __importDefault(require("./modules/terceros/routes/tercero.routes"));
const periodo_routes_1 = __importDefault(require("./modules/periodos/routes/periodo.routes"));
const reportes_routes_1 = __importDefault(require("./modules/reportes/routes/reportes.routes"));
const pantalla_routes_1 = __importDefault(require("./modules/pantallas/routes/pantalla.routes"));
const rol_routes_1 = __importDefault(require("./modules/roles/routes/rol.routes"));
const rolpantalla_routes_1 = __importDefault(require("./modules/rolespantallas/routes/rolpantalla.routes"));
const usuariorol_routes_1 = __importDefault(require("./modules/usuariosroles/routes/usuariorol.routes"));
const menu_routes_1 = __importDefault(require("./modules/menu/routes/menu.routes"));
const direccion_routes_1 = __importDefault(require("./modules/terceroDirecciones/routes/direccion.routes"));
const contacto_routes_1 = __importDefault(require("./modules/terceroContactos/routes/contacto.routes"));
const app = (0, express_1.default)();
//enlace al front
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
app.use(express_1.default.json());
app.use('/api/test', test_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/usuarios', user_routes_1.default);
app.use('/api/prorrateo', prorrateo_routes_1.default);
app.use('/api/asientos', asiento_routes_1.default);
app.use('/api/centros-costo', centroCosto_routes_1.default);
app.use('/api/terceros', tercero_routes_1.default);
app.use('/api', periodo_routes_1.default);
app.use('/api/reportes', reportes_routes_1.default);
app.use('/api/pantalla', pantalla_routes_1.default);
app.use('/api/rol', rol_routes_1.default);
app.use('/api/rolpantalla', rolpantalla_routes_1.default);
app.use('/api/usuariorol', usuariorol_routes_1.default);
app.use('/api', menu_routes_1.default);
app.use('/api/terceros/:idTercero/direcciones', direccion_routes_1.default);
app.use('/api/terceros/:idTercero/contactos', contacto_routes_1.default);
app.get('/', (req, res) => {
    res.send('Backend up');
});
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
//# sourceMappingURL=app.js.map