import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthUser } from '../../modules/auth/models/Auth';
import { getUserStorage } from '../utils/storage';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<AuthUser | null>(() => {
    return getUserStorage();
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};