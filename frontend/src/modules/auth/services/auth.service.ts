import api from '../../../core/api/axios';

export const login = async (usuario: string, password: string) => {
  const response = await api.post('/auth/login', {
    usuario,
    password,
  });

  return response.data;
};