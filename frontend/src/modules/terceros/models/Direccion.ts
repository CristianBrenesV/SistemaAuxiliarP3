export interface Direccion {
  IdDireccion: number;
  IdTercero: number;
  Alias: string;
  Provincia: string;
  Canton: string;
  Distrito: string;
  DireccionExacta: string;
  EsPrincipal: number;
  Estado: number;
  created_at: string;
  updated_at: string;
}

export type CreateDireccionDTO = Omit<Direccion, 'IdDireccion' | 'IdTercero' | 'created_at' | 'updated_at'>;
export type UpdateDireccionDTO = Partial<CreateDireccionDTO>;