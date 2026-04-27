import api from '../../../core/api/axios';
import type { Direccion, CreateDireccionDTO, UpdateDireccionDTO } from '../models/Direccion';

export const obtenerDirecciones = async (idTercero: number): Promise<Direccion[]> => {
  const res = await api.get(`/terceros/${idTercero}/direcciones`);
  return res.data;
};

export const obtenerDireccionPorId = async (idTercero: number, idDireccion: number): Promise<Direccion | null> => {
  try {
    const res = await api.get(`/terceros/${idTercero}/direcciones/${idDireccion}`);
    return res.data as Direccion;
  } catch {
    return null;
  }
};

export const crearDireccion = async (idTercero: number, data: CreateDireccionDTO): Promise<void> => {
  await api.post(`/terceros/${idTercero}/direcciones`, data);
};

export const actualizarDireccion = async (idTercero: number, idDireccion: number, data: UpdateDireccionDTO): Promise<void> => {
  await api.put(`/terceros/${idTercero}/direcciones/${idDireccion}`, data);
};

export const eliminarDireccion = async (idTercero: number, idDireccion: number): Promise<void> => {
  await api.delete(`/terceros/${idTercero}/direcciones/${idDireccion}`);
};