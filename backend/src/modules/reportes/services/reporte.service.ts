import { pool } from '../../../config/db';
import { RowDataPacket } from 'mysql2';

interface MovimientoCentroDB {
  Consecutivo: number;
  Fecha: string;
  CentroCosto: string;
  CodigoCuenta: string;
  Cuenta: string;
  TipoMovimiento: 'D' | 'C';
  Monto: number;
}

interface TotalesDB {
  totalDebe: number;
  totalHaber: number;
  diferencia: number;
}

interface MovimientoTerceroDB {
  Consecutivo: number;
  Fecha: string;
  Tercero: string;
  CodigoCuenta: string;
  Cuenta: string;
  TipoMovimiento: 'D' | 'C';
  Monto: number;
}

interface TotalesDB {
  totalDebe: number;
  totalHaber: number;
  diferencia: number;
}

export const obtenerReporteCentros = async (
  centro_id?: number,
  fecha_inicio?: string,
  fecha_fin?: string,
  estado_id?: number
) => {
  const [rows] = await pool.query<RowDataPacket[][]>(
    'CALL sp_ReporteCentrosCosto(?, ?, ?, ?)',
    [
      centro_id ?? null,
      fecha_inicio ?? null,
      fecha_fin ?? null,
      estado_id ?? null
    ]
  );

  const movimientos = rows[0] as MovimientoCentroDB[];
  const totales = (rows[1]?.[0] as TotalesDB) || {
    totalDebe: 0,
    totalHaber: 0,
    diferencia: 0
  };

  return {
    movimientos,
    totalDebe: totales?.totalDebe || 0,
    totalHaber: totales?.totalHaber || 0,
    diferencia: totales?.diferencia || 0
  };
};

export const obtenerReporteTerceros = async (
  tercero_id?: number,
  fecha_inicio?: string,
  fecha_fin?: string,
  estado_id?: number
) => {
  const [rows] = await pool.query<RowDataPacket[][]>(
    'CALL sp_ReporteTerceros(?, ?, ?, ?)',
    [
      tercero_id ?? null,
      fecha_inicio ?? null,
      fecha_fin ?? null,
      estado_id ?? null
    ]
  );

  const movimientos = rows[0] as MovimientoTerceroDB[];
  const totales = (rows[1]?.[0] as TotalesDB) || {
    totalDebe: 0,
    totalHaber: 0,
    diferencia: 0
  };
  return {
    movimientos,
    totalDebe: totales?.totalDebe || 0,
    totalHaber: totales?.totalHaber || 0,
    diferencia: totales?.diferencia || 0
  };
};