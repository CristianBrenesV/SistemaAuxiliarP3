import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../../modules/auth/pages/Login';
import Test from '../../modules/pruebas/pages/Test';
import Principal from '../../modules/principal/pages/Principal';
import Usuarios from '../../modules/usuarios/pages/Usuarios';
import UsuariosCrear from '../../modules/usuarios/pages/UsuariosCreate';
import UsuariosEditar from '../../modules/usuarios/pages/UsuariosEdit';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layouts/MainLayout';

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
            <Route path="/usuarios/editar/:1" element={<UsuariosEditar />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}