export interface CreateTerceroDTO {
  identificacion: string;
  nombre: string;
  tipo: 'Cliente' | 'Proveedor' | 'Empleado' | 'Otro';
  email?: string;
  telefono?: string;
  estado: number; // 1 = Activo, 0 = Inactivo
}

export interface UpdateTerceroDTO extends Partial<CreateTerceroDTO> {}