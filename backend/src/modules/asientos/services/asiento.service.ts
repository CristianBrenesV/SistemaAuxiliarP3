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
                -- Convertimos a booleano real para facilitar el manejo en el frontend
                IF(COUNT(DISTINCT cc.IdDetalleCC) > 0, 1, 0) as tieneCC,
                IF(COUNT(DISTINCT t.IdDetalleTercero) > 0, 1, 0) as tieneTercero
            FROM asientocontabledetalle d
            INNER JOIN cuentascontables c ON c.IdCuenta = d.IdCuentaContable
            LEFT JOIN asientodetallecentrocosto cc ON cc.IdAsientoDetalle = d.IdAsientoDetalle
            LEFT JOIN asientodetalletercero t ON t.IdAsientoDetalle = d.IdAsientoDetalle
            WHERE d.IdAsiento = ?
            GROUP BY 
                d.IdAsientoDetalle, d.IdCuentaContable, c.CodigoCuenta, 
                c.Nombre, d.TipoMovimiento, d.Monto, d.Descripcion
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
  const [rows]: any = await pool.query('CALL sp_asientos_listar_filtro(?, ?, ?, ?)', [
    idPeriodo || null,
    estado || null,
    offset,
    limit
  ]);

  const data = rows[0];

  const [countRows]: any = await pool.query(`
    SELECT COUNT(*) AS total
    FROM asientocontableencabezado a
    WHERE (? IS NULL OR a.IdPeriodo = ?)
      AND (? IS NULL OR a.IdEstadoAsiento = ?)
  `, [idPeriodo || null, idPeriodo || null, estado || null, estado || null]);

  const total = countRows[0].total;

  return {
    data,
    page,
    totalPages: Math.ceil(total / limit)
  };
};