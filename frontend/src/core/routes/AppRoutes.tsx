import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../modules/auth/pages/Login';
import Test from '../../modules/pruebas/pages/Test';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* REDIRECCIÓN */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* RUTA PROTEGIDA */}
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}