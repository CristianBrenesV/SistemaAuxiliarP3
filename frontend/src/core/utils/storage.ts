import type { AuthUser } from '../../models/Auth';

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// 👤 USER
export const setUserStorage = (user: AuthUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserStorage = (): AuthUser | null => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
};

export const setMenuStorage = (menu: unknown) => {
  localStorage.setItem('menu', JSON.stringify(menu));
};

export const getMenuStorage = () => {
  const menu = localStorage.getItem('menu');
  return menu ? JSON.parse(menu) : [];
};

export const removeMenuStorage = () => {
  localStorage.removeItem('menu');
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('menu'); 
};