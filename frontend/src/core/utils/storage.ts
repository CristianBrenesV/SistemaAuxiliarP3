import type { AuthUser } from '../../modules/auth/models/Auth';

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setUserStorage = (user: AuthUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserStorage = (): AuthUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUserStorage = () => {
  localStorage.removeItem('user');
};

export const clearSession = () => {
  removeToken();
  removeUserStorage();
};