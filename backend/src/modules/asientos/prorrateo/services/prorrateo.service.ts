import { pool } from '../../../../config/db';
import { GuardarProrrateoDTO } from '../dtos/GuardarProrrateo.dto';
import { registrarBitacora } from '../../../../modules/bitacora/bitacora.service';


export const obtenerDistribucionCC = async (idDetalle: number) => {
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT 
        cc.IdCentroCosto,
        cc.Monto,
        cc.Porcentaje,
        cc.Nota,
        c.Nombre,
        c.Codigo
      FROM asientodetallecentrocosto cc
      JOIN catalogocentroscostos c 
        ON c.IdCentroCosto = cc.IdCentroCosto
      WHERE cc.IdAsientoDetalle = ?
    `, [idDetalle]);

    return rows;

  } finally {
    connection.release();
  }
};

export const obtenerDistribucionTerceros = async (idDetalle: number) => {
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT 
        t.IdTercero,
        t.Monto,
        t.Porcentaje,
        t.Nota,
        ct.Nombre,
        ct.Identificacion
      FROM asientodetalletercero t
      JOIN catalogoterceros ct 
        ON ct.IdTercero = t.IdTercero
      WHERE t.IdAsientoDetalle = ?
        AND ct.Estado = 1
    `, [idDetalle]);

    return rows;

  } finally {
    connection.release();
  }
};

export const obtenerDetallesAsiento = async (idAsiento: number) => {
  const connection = await pool.getConnection();

  try {

    const [rows]: any = await connection.query(`
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
      JOIN cuentascontables c ON c.IdCuenta = d.IdCuentaContable
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
    `, [idAsiento]);

    return rows;

  } finally {
    connection.release();
  }
};

export const guardarProrrateo = async (
  data: GuardarProrrateoDTO,
  idUsuario: number
) => {

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { id_detalle, es_tercero, distribucion } = data;

    const [estadoRows]: any = await connection.query(`
        SELECT e.IdEstadoAsiento
        FROM asientocontabledetalle d
        JOIN asientocontableencabezado e 
            ON e.IdAsiento = d.IdAsiento
        WHERE d.IdAsientoDetalle = ?
        `, [id_detalle]);

        if (!estadoRows.length) {
        throw new Error('Detalle no encontrado');
        }

        const estado = estadoRows[0].IdEstadoAsiento;

        if (![1, 2].includes(estado)) {
        throw new Error('Solo se puede prorratear en estados Borrador o Pendiente');
        }

    // 🔹 1. Validar que exista distribución
    if (!distribucion || distribucion.length === 0) {
      throw new Error('Debe enviar al menos una distribución');
    }

    // 🔹 2. Obtener monto original
    const [rows]: any = await connection.query(
      'SELECT Monto FROM asientocontabledetalle WHERE IdAsientoDetalle = ?',
      [id_detalle]
    );

    if (!rows.length) {
      throw new Error('Detalle no encontrado');
    }

    const montoOriginal = rows[0].Monto;

    // 🔹 3. Sumar distribución
    const total = distribucion.reduce((acc, item) => acc + item.monto, 0);

    if (Math.abs(total - montoOriginal) > 0.01) {
      throw new Error('El total del prorrateo no coincide con el monto de la línea');
    }

    // 🔹 4. Limpiar registros previos
    if (es_tercero) {
      await connection.query(
        'DELETE FROM asientodetalletercero WHERE IdAsientoDetalle = ?',
        [id_detalle]
      );
    } else {
      await connection.query(
        'DELETE FROM asientodetallecentrocosto WHERE IdAsientoDetalle = ?',
        [id_detalle]
      );
    }

    // 🔹 5. Insertar nueva distribución
    for (const item of distribucion) {

      if (es_tercero) {
        await connection.query(
          `INSERT INTO asientodetalletercero
          (IdAsientoDetalle, IdTercero, Monto, Porcentaje, Nota)
          VALUES (?, ?, ?, ?, ?)`,
          [
            id_detalle,
            item.id_destino,
            item.monto,
            item.porcentaje,
            item.nota || null
          ]
        );
      } else {
        await connection.query(
          `INSERT INTO asientodetallecentrocosto
          (IdAsientoDetalle, IdCentroCosto, Monto, Porcentaje, Nota)
          VALUES (?, ?, ?, ?, ?)`,
          [
            id_detalle,
            item.id_destino,
            item.monto,
            item.porcentaje || 0,
            item.nota || null
          ]
        );
      }
    }
    
    // 🔹 6. Bitácora
    await registrarBitacora(idUsuario,
      es_tercero
        ? 'Prorrateo de terceros realizado'
        : 'Prorrateo de centros de costo realizado',
      {
        id_detalle,
        total,
        distribucion
      }
    );

    await connection.commit();

  } catch (error) {

    await connection.rollback();

    await registrarBitacora(idUsuario, 'Error en prorrateo', {
      error: (error as Error).message
    });

    throw error;

  } finally {
    connection.release();
  }
};