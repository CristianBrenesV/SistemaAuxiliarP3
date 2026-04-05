import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/storage';

export default function PrivateRoute() {
  const token = getToken();

  return token ? (
  <Outlet />
) : (
  <Navigate
    to="/login"
    state={{ mensaje: 'Debes iniciar sesión para acceder' }}
    replace
  />
);
}