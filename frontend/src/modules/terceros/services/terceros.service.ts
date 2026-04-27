import api from '../../../core/api/axios';
import type { Tercero, CreateTerceroDTO, UpdateTerceroDTO } from '../models/Tercero';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export const obtenerTerceros = async (page: number = 1): Promise<ApiResponse<Tercero[]>> => {
  const res = await api.get<ApiResponse<Tercero[]>>(`/terceros?page=${page}`);
  return res.data;
};

export const obtenerTerceroPorId = async (id: number): Promise<Tercero | null> => {
  try {
    const res = await api.get(`/terceros/${id}`);
    return res.data as Tercero;
  } catch {
    return null;
  }
};

export const crearTercero = async (data: CreateTerceroDTO): Promise<void> => {
  await api.post('/terceros', data);
};

export const actualizarTercero = async (id: number, data: UpdateTerceroDTO): Promise<void> => {
  await api.put(`/terceros/${id}`, data);
};

export const eliminarTercero = async (id: number): Promise<void> => {
  await api.delete(`/terceros/${id}`);
};