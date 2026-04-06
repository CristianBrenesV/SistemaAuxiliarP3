import { pool } from '../../../config/db';

export const obtenerDetalles = async (id: number) => {
  const connection = await pool.getConnection();

  try {
    const query = `
      SELECT 
        d.IdAsientoDetalle,
        d.IdCuentaContable,
        c.CodigoCuenta,
        c.Nombre,
        d.TipoMovimiento,
        d.Monto,
        d.Descripcion,
        COUNT(DISTINCT cc.IdDetalleCC) as tieneCC,
        COUNT(DISTINCT t.IdDetalleTercero) as tieneTercero
      FROM asientocontabledetalle d
      INNER JOIN cuentascontables c 
        ON c.IdCuenta = d.IdCuentaContable
      LEFT JOIN asientodetallecentrocosto cc 
        ON cc.IdAsientoDetalle = d.IdAsientoDetalle
      LEFT JOIN asientodetalletercero t 
        ON t.IdAsientoDetalle = d.IdAsientoDetalle
      WHERE d.IdAsiento = ?
      GROUP BY 
        d.IdAsientoDetalle,
        d.IdCuentaContable,
        c.CodigoCuenta,
        c.Nombre,
        d.TipoMovimiento,
        d.Monto,
        d.Descripcion
    `;

    const [rows]: any = await connection.query(query, [id]);

    return rows;

  } finally {
    connection.release();
  }
};

export const listarAsientos = async (
  idPeriodo: number,
  estado?: number,
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;
  const connection = await pool.getConnection();

  try {
    let query = `
      SELECT 
        IdAsiento,
        Consecutivo, -- 🔥 FIX
        Fecha,
        Referencia,
        IdEstadoAsiento
      FROM asientocontableencabezado
      WHERE IdPeriodo = ?
    `;

    const params: any[] = [idPeriodo];

    if (estado !== undefined && estado !== null) {
      query += ` AND IdEstadoAsiento = ?`;
      params.push(estado);
    }

    query += ` ORDER BY Fecha DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows]: any = await connection.query(query, params);

    let countQuery = `
      SELECT COUNT(*) as total
      FROM asientocontableencabezado
      WHERE IdPeriodo = ?
    `;

    const countParams: any[] = [idPeriodo];

    if (estado !== undefined && estado !== null) {
      countQuery += ` AND IdEstadoAsiento = ?`;
      countParams.push(estado);
    }

    const [countRows]: any = await connection.query(countQuery, countParams);

    return {
      data: rows,
      total: countRows[0].total,
      page,
      totalPages: Math.ceil(countRows[0].total / limit)
    };

  } finally {
    connection.release();
  }
};