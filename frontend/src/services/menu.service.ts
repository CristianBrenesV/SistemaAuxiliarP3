import api from '../core/api/axios';

export const obtenerMenu = async () => {
  const res = await api.get('/menu');
  return res.data;
};