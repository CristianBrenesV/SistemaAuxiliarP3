import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../../modules/auth/pages/Login';
import Test from '../../modules/pruebas/pages/Test';
import Principal from '../../modules/principal/pages/Principal';
import Usuarios from '../../modules/usuarios/pages/Usuarios';
import UsuariosCrear from '../../modules/usuarios/pages/UsuariosCreate';
import UsuariosEditar from '../../modules/usuarios/pages/UsuariosEdit';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layouts/MainLayout';

import ProrrateoIndex from '../../modules/prorrateo/pages/ProrrateoIndex';
import ProrrateoCostos from '../../modules/prorrateo/pages/ProrrateoCostos';
import ProrrateoTerceros from '../../modules/prorrateo/pages/ProrrateoTerceros';
import ReporteCentros from '../../modules/Reportes/pages/ReporteCentros';
import ReporteTerceros from '../../modules/Reportes/pages/ReporteTerceros';

// ================= TERCEROS (AUX5) =================
import Terceros from '../../modules/terceros/pages/Terceros';
import TercerosCreate from '../../modules/terceros/pages/TercerosCreate';
import TercerosEdit from '../../modules/terceros/pages/TercerosEdit';

// ================= DIRECCIONES (AUX11) =================
import Direcciones from '../../modules/terceros/pages/Direcciones';
import DireccionesCreate from '../../modules/terceros/pages/DireccionesCreate';
import DireccionesEdit from '../../modules/terceros/pages/DireccionesEdit';

// ================= CONTACTOS (AUX12) =================
import Contactos from '../../modules/terceros/pages/Contactos';
import ContactosCreate from '../../modules/terceros/pages/ContactosCreate';
import ContactosEdit from '../../modules/terceros/pages/ContactosEdit';

// ================= CENTROS DE COSTO (AUX6) =================
import CentrosCosto from '../../modules/centrosCosto/pages/CentrosCosto';
import CentrosCostoCreate from '../../modules/centrosCosto/pages/CentrosCostoCreate';
import CentrosCostoEdit from '../../modules/centrosCosto/pages/CentrosCostoEdit';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rutas protegidas (requieren autenticación) */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Módulos existentes */}
            <Route path="/principal" element={<Principal />} />
            <Route path="/test" element={<Test />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/crear" element={<UsuariosCrear />} />
            <Route path="/usuarios/editar/:id" element={<UsuariosEditar />} />

            <Route path="/prorrateo" element={<ProrrateoIndex />} />
            <Route path="/prorrateo/costos/:idDetalle" element={<ProrrateoCostos />} />
            <Route path="/prorrateo/terceros/:idDetalle" element={<ProrrateoTerceros />} />

            <Route path="/reportes-centros" element={<ReporteCentros />} />
            <Route path="/reportes-terceros" element={<ReporteTerceros />} />

            {/* ================= TERCEROS (AUX5) ================= */}
            <Route path="/terceros" element={<Terceros />} />
            <Route path="/terceros/crear" element={<TercerosCreate />} />
            <Route path="/terceros/editar/:id" element={<TercerosEdit />} />

            {/* ================= DIRECCIONES (AUX11) ================= */}
            <Route path="/terceros/:idTercero/direcciones" element={<Direcciones />} />
            <Route path="/terceros/:idTercero/direcciones/crear" element={<DireccionesCreate />} />
            <Route path="/terceros/:idTercero/direcciones/editar/:idDireccion" element={<DireccionesEdit />} />

            {/* ================= CONTACTOS (AUX12) ================= */}
            <Route path="/terceros/:idTercero/contactos" element={<Contactos />} />
            <Route path="/terceros/:idTercero/contactos/crear" element={<ContactosCreate />} />
            <Route path="/terceros/:idTercero/contactos/editar/:idContacto" element={<ContactosEdit />} />

            {/* ================= CENTROS DE COSTO (AUX6) ================= */}
            <Route path="/centros-costo" element={<CentrosCosto />} />
            <Route path="/centros-costo/crear" element={<CentrosCostoCreate />} />
            <Route path="/centros-costo/editar/:id" element={<CentrosCostoEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}