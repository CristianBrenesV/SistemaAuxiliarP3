import { Usuario } from './Usuario';

export interface UsuarioResponse {
  data: Usuario[];
  total: number;
  page: number;
  totalPages: number;
}