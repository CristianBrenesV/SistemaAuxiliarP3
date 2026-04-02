import { createContext } from 'react';
import type { AuthUser } from '../../modules/auth/models/Auth';

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);