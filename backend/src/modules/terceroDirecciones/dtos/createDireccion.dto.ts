export interface CreateDireccionDTO {
  alias: string;
  provincia: string;
  canton: string;
  distrito: string;
  direccionExacta: string;
  esPrincipal?: boolean;
  estado: number;
}

export interface UpdateDireccionDTO extends Partial<CreateDireccionDTO> {}