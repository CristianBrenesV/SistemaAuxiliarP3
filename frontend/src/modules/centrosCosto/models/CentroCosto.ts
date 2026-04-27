export interface CentroCosto {
  IdCentroCosto: number;
  Codigo: string;
  Nombre: string;
  Descripcion: string | null;
  Estado: number;
}

export type CreateCentroCostoDTO = Omit<CentroCosto, 'IdCentroCosto'>;
export type UpdateCentroCostoDTO = Partial<CreateCentroCostoDTO>;