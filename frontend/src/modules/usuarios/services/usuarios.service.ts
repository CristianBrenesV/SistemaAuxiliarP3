import api from '../../../core/api/axios';
import type { Usuario } from '../models/Usuario';
import type { CrearUsuarioDTO, ActualizarUsuarioDTO } from '../models/UsuarioDTO';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export const obtenerUsuarios = async (page: number = 1): Promise<ApiResponse<Usuario[]>> => {
  const res = await api.get<ApiResponse<Usuario[]>>(`/usuarios?page=${page}`);
  return res.data;
};

export const obtenerUsuarioPorId = async (id: number): Promise<Usuario | null> => {
  try {
    const res = await api.get(`/usuarios/${id}`);

    return res.data as Usuario;

  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearUsuario = async (data: CrearUsuarioDTO): Promise<void> => {
  await api.post('/usuarios', data);
};

export const actualizarUsuario = async (
  id: number,
  data: ActualizarUsuarioDTO
): Promise<void> => {
  await api.put(`/usuarios/${id}`, data);
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};

export const cambiarEstadoUsuario = async (
  id: number,
  estado: Usuario['estado']
): Promise<void> => {
  await api.patch(`/usuarios/estado/${id}`, { estado });
};