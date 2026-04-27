import api from '../../../core/api/axios';
import type { CentroCosto, CreateCentroCostoDTO, UpdateCentroCostoDTO } from '../models/CentroCosto';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export const obtenerCentrosCosto = async (page: number = 1): Promise<ApiResponse<CentroCosto[]>> => {
  const res = await api.get<ApiResponse<CentroCosto[]>>(`/centros-costo?page=${page}`);
  return res.data;
};

export const obtenerCentroCostoPorId = async (id: number): Promise<CentroCosto | null> => {
  try {
    const res = await api.get(`/centros-costo/${id}`);
    return res.data as CentroCosto;
  } catch {
    return null;
  }
};

export const crearCentroCosto = async (data: CreateCentroCostoDTO): Promise<void> => {
  await api.post('/centros-costo', data);
};

export const actualizarCentroCosto = async (id: number, data: UpdateCentroCostoDTO): Promise<void> => {
  await api.put(`/centros-costo/${id}`, data);
};

export const eliminarCentroCosto = async (id: number): Promise<void> => {
  await api.delete(`/centros-costo/${id}`);
};