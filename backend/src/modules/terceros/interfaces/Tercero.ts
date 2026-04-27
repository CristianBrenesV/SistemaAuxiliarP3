export interface Tercero {
  IdTercero: number;
  Identificacion: string;
  Nombre: string;
  TipoTercero: 'Cliente' | 'Proveedor' | 'Empleado' | 'Otro';
  Email: string | null;
  Telefono: string | null;
  Estado: number; // 1 = Activo, 0 = Inactivo
}