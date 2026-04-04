import axios from 'axios';
import { getToken } from '../../../core/utils/storage';
import type { Usuario } from '../models/Usuario';
import type { CrearUsuarioDTO, ActualizarUsuarioDTO } from '../models/UsuarioDTO';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

const API = 'http://localhost:3000/api/usuarios';

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const obtenerUsuarios = async (): Promise<ApiResponse<Usuario[]>> => {
  const res = await axios.get<ApiResponse<Usuario[]>>(API, authHeader());
  return res.data;
};

export const obtenerUsuarioPorId = async (id: number): Promise<Usuario | null> => {
  try {
    const res = await axios.get<Usuario>(`${API}/${id}`, authHeader());
    if (res.data && res.data.idUsuario) return res.data;
    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
};

export const crearUsuario = async (data: CrearUsuarioDTO): Promise<void> => {
  await axios.post(API, data, authHeader());
};

export const actualizarUsuario = async (
  id: number,
  data: ActualizarUsuarioDTO
): Promise<void> => {
  await axios.put(`${API}/${id}`, data, authHeader());
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  await axios.delete(`${API}/${id}`, authHeader());
};

export const cambiarEstadoUsuario = async (
  id: number,
  estado: Usuario['estado']
): Promise<void> => {
  await axios.patch(`${API}/estado/${id}`, { estado }, authHeader());
};