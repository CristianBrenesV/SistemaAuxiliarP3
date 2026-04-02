import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { getToken } from '../utils/storage';

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const token = getToken();

  return token ? <>{children}</> : <Navigate to="/login" />;
}