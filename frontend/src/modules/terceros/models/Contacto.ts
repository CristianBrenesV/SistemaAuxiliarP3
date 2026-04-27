export interface Contacto {
  IdContacto: number;
  IdTercero: number;
  NombreContacto: string;
  Cargo: string | null;
  Email: string | null;
  Telefono: string | null;
  TipoContacto: 'Principal' | 'Facturación' | 'Cobros' | 'Soporte' | 'Otro';
  Estado: number;
  created_at: string;
  updated_at: string;
}

export type CreateContactoDTO = Omit<Contacto, 'IdContacto' | 'IdTercero' | 'created_at' | 'updated_at'>;
export type UpdateContactoDTO = Partial<CreateContactoDTO>;