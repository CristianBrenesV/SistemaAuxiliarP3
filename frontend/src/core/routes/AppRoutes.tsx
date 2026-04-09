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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>

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

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}