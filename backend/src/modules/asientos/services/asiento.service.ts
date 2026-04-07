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
    const connection = await pool.getConnection();

    try {
        let whereConditions = 'WHERE IdPeriodo = ?';
        const params: any[] = [idPeriodo];

        if (estado !== undefined && estado !== null) {
            whereConditions += ' AND IdEstadoAsiento = ?';
            params.push(estado);
        }

        const dataQuery = `
            SELECT 
                IdAsiento,
                Consecutivo,
                Fecha,
                Referencia,
                IdEstadoAsiento
            FROM asientocontableencabezado
            ${whereConditions}
            ORDER BY Fecha DESC, IdAsiento DESC
            LIMIT ? OFFSET ?
        `;

        const countQuery = `
            SELECT COUNT(*) as total 
            FROM asientocontableencabezado 
            ${whereConditions}
        `;

        const [rows]: any = await connection.query(dataQuery, [...params, limit, offset]);
        const [countRows]: any = await connection.query(countQuery, params);

        const total = countRows[0].total;

        return {
            data: rows,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };

    } finally {
        connection.release();
    }
};