import api from '../../../core/api/axios';

export const login = async (usuario: string, password: string) => {
  const response = await api.post('/auth/login', {
    usuario,
    password,
  });

  //localStorage.setItem('token', response.data.token);
  //localStorage.setItem('user', JSON.stringify(response.data.user));

  return response.data;
};

export const keepAlive = async () => {
  const response = await api.get('/auth/keep-alive');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  window.location.href = '/login';
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};