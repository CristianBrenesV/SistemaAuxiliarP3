export interface AsientoDetalle {
  idAsientoDetalle?: number;
  idAsiento?: number;
  idCuentaContable: number;
  tipoMovimiento: 'D' | 'C';
  monto: number;
  descripcion?: string;
}