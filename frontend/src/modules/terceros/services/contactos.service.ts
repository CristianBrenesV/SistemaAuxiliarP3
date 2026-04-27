import api from '../../../core/api/axios';
import type { Contacto, CreateContactoDTO, UpdateContactoDTO } from '../models/Contacto';

export const obtenerContactos = async (idTercero: number): Promise<Contacto[]> => {
  const res = await api.get(`/terceros/${idTercero}/contactos`);
  return res.data;
};

export const obtenerContactoPorId = async (idTercero: number, idContacto: number): Promise<Contacto | null> => {
  try {
    const res = await api.get(`/terceros/${idTercero}/contactos/${idContacto}`);
    return res.data as Contacto;
  } catch {
    return null;
  }
};

export const crearContacto = async (idTercero: number, data: CreateContactoDTO): Promise<void> => {
  await api.post(`/terceros/${idTercero}/contactos`, data);
};

export const actualizarContacto = async (idTercero: number, idContacto: number, data: UpdateContactoDTO): Promise<void> => {
  await api.put(`/terceros/${idTercero}/contactos/${idContacto}`, data);
};

export const eliminarContacto = async (idTercero: number, idContacto: number): Promise<void> => {
  await api.delete(`/terceros/${idTercero}/contactos/${idContacto}`);
};