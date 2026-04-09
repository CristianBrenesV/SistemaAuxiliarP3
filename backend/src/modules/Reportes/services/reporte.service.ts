import { pool } from '../../../config/db';

export const obtenerDataReporteCentros = async (filtros: any) => {
    const { centro_id, fecha_inicio, fecha_fin, estado_id } = filtros;
    
    let whereClause = '1=1';
    const params: any[] = [];

    if (centro_id) {
        whereClause += ' AND cc.IdCentroCosto = ?';
        params.push(centro_id);
    }
    if (fecha_inicio) {
        whereClause += ' AND a.Fecha >= ?';
        params.push(fecha_inicio);
    }
    if (fecha_fin) {
        whereClause += ' AND a.Fecha <= ?';
        params.push(fecha_fin);
    }
    if (estado_id) {
        whereClause += ' AND a.IdEstadoAsiento = ?';
        params.push(estado_id);
    }

    const sqlMovimientos = `
        SELECT a.Consecutivo, a.Fecha, c.Nombre as CentroCosto, 
               cu.CodigoCuenta, cu.Nombre as Cuenta, d.TipoMovimiento, cc.Monto
        FROM asientodetallecentrocosto cc
        JOIN asientocontabledetalle d ON d.IdAsientoDetalle = cc.IdAsientoDetalle
        JOIN asientocontableencabezado a ON a.IdAsiento = d.IdAsiento
        JOIN catalogocentroscostos c ON c.IdCentroCosto = cc.IdCentroCosto
        JOIN cuentascontables cu ON cu.IdCuenta = d.IdCuentaContable
        WHERE ${whereClause}
        ORDER BY a.Fecha DESC
    `;

    const sqlTotales = `
        SELECT 
            SUM(CASE WHEN d.TipoMovimiento = 'D' THEN cc.Monto ELSE 0 END) as totalDebe,
            SUM(CASE WHEN d.TipoMovimiento = 'C' THEN cc.Monto ELSE 0 END) as totalHaber
        FROM asientodetallecentrocosto cc
        JOIN asientocontabledetalle d ON d.IdAsientoDetalle = cc.IdAsientoDetalle
        JOIN asientocontableencabezado a ON a.IdAsiento = d.IdAsiento
        WHERE ${whereClause}
    `;

    // Cambio de db.query a pool.query
    const [movimientos]: any = await pool.query(sqlMovimientos, params);
    const [totales]: any = await pool.query(sqlTotales, params);

    return {
        movimientos,
        totalDebe: totales[0]?.totalDebe || 0,
        totalHaber: totales[0]?.totalHaber || 0,
        diferencia: (totales[0]?.totalDebe || 0) - (totales[0]?.totalHaber || 0)
    };
};

export const obtenerDataReporteTerceros = async (filtros: any) => {
    const { tercero_id, fecha_inicio, fecha_fin, estado_id } = filtros;
    
    let whereClause = '1=1';
    const params: any[] = [];

    if (tercero_id) {
        whereClause += ' AND t.IdTercero = ?';
        params.push(tercero_id);
    }
    if (fecha_inicio) {
        whereClause += ' AND a.Fecha >= ?';
        params.push(fecha_inicio);
    }
    if (fecha_fin) {
        whereClause += ' AND a.Fecha <= ?';
        params.push(fecha_fin);
    }
    if (estado_id) {
        whereClause += ' AND a.IdEstadoAsiento = ?';
        params.push(estado_id);
    }

    const sqlMovimientos = `
        SELECT a.Consecutivo, a.Fecha, te.Nombre as Tercero, 
               c.CodigoCuenta, c.Nombre as Cuenta, d.TipoMovimiento, t.Monto
        FROM asientodetalletercero t
        JOIN asientocontabledetalle d ON d.IdAsientoDetalle = t.IdAsientoDetalle
        JOIN asientocontableencabezado a ON a.IdAsiento = d.IdAsiento
        JOIN catalogoterceros te ON te.IdTercero = t.IdTercero
        JOIN cuentascontables c ON c.IdCuenta = d.IdCuentaContable
        WHERE ${whereClause}
        ORDER BY a.Fecha DESC
    `;

    const sqlTotales = `
        SELECT 
            SUM(CASE WHEN d.TipoMovimiento = 'D' THEN t.Monto ELSE 0 END) as totalDebe,
            SUM(CASE WHEN d.TipoMovimiento = 'C' THEN t.Monto ELSE 0 END) as totalHaber
        FROM asientodetalletercero t
        JOIN asientocontabledetalle d ON d.IdAsientoDetalle = t.IdAsientoDetalle
        JOIN asientocontableencabezado a ON a.IdAsiento = d.IdAsiento
        WHERE ${whereClause}
    `;

    const [movimientos]: any = await pool.query(sqlMovimientos, params);
    const [totales]: any = await pool.query(sqlTotales, params);

    return {
        movimientos,
        totalDebe: totales[0]?.totalDebe || 0,
        totalHaber: totales[0]?.totalHaber || 0,
        diferencia: (totales[0]?.totalDebe || 0) - (totales[0]?.totalHaber || 0)
    };
};