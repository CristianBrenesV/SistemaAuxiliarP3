export interface Direccion {
  IdDireccion: number;
  IdTercero: number;
  Alias: string;
  Provincia: string;
  Canton: string;
  Distrito: string;
  DireccionExacta: string;
  EsPrincipal: number; // 0 o 1
  Estado: number; // 0 o 1
  created_at: Date;
  updated_at: Date;
}