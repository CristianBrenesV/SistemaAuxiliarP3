export interface Tercero {
  IdTercero: number;
  Identificacion: string;
  Nombre: string;
  TipoTercero: 'Cliente' | 'Proveedor' | 'Empleado' | 'Otro';
  Email: string | null;
  Telefono: string | null;
  Estado: number;
}

export type CreateTerceroDTO = Omit<Tercero, 'IdTercero'>;
export type UpdateTerceroDTO = Partial<CreateTerceroDTO>;