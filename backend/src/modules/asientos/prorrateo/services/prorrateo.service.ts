import { pool } from '../../../../config/db';
import { GuardarProrrateoDTO } from '../dtos/GuardarProrrateo.dto';
import { registrarBitacora } from '../../../../modules/bitacora/bitacora.service';

export const obtenerLineaDetalle = async (idDetalle: number) => {
    const connection = await pool.getConnection();
    try {
        const [rows]: any = await connection.query(
            'SELECT IdAsientoDetalle, Monto FROM asientocontabledetalle WHERE IdAsientoDetalle = ?',
            [idDetalle]
        );
        return rows[0]; 
    } finally {
        connection.release();
    }
};

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
            JOIN catalogocentroscostos c ON c.IdCentroCosto = cc.IdCentroCosto
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
            JOIN catalogoterceros ct ON ct.IdTercero = t.IdTercero
            WHERE t.IdAsientoDetalle = ? AND ct.Estado = 1
        `, [idDetalle]);
        return rows;
    } finally {
        connection.release();
    }
};

export const guardarProrrateo = async (data: GuardarProrrateoDTO, idUsuario: number) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const { id_detalle, es_tercero, distribucion } = data;

        const [estadoRows]: any = await connection.query(`
            SELECT e.IdEstadoAsiento, d.Monto
            FROM asientocontabledetalle d
            JOIN asientocontableencabezado e ON e.IdAsiento = d.IdAsiento
            WHERE d.IdAsientoDetalle = ?
        `, [id_detalle]);

        if (!estadoRows.length) throw new Error('La línea del asiento no existe.');

        const IdEstadoAsiento = estadoRows[0].IdEstadoAsiento;
        const montoOriginal = Number(estadoRows[0].Monto); 

        if (![1, 2].includes(IdEstadoAsiento)) {
            throw new Error('Solo se puede prorratear asientos en estado Borrador o Pendiente.');
        }

        if (!distribucion || distribucion.length === 0) {
            throw new Error('Debe incluir al menos una línea de distribución.');
        }

        const totalEnviado = distribucion.reduce((acc, item) => acc + Number(item.monto), 0);

        if (Math.abs(totalEnviado - montoOriginal) > 0.01) {
            throw new Error(`Error de cuadre: El total (${totalEnviado.toFixed(2)}) no coincide con el monto de la línea (${montoOriginal.toFixed(2)}).`);
        }

        const tablaDestino = es_tercero ? 'asientodetalletercero' : 'asientodetallecentrocosto';
        await connection.query(`DELETE FROM ${tablaDestino} WHERE IdAsientoDetalle = ?`, [id_detalle]);

        for (const item of distribucion) {
            const query = es_tercero 
                ? `INSERT INTO asientodetalletercero (IdAsientoDetalle, IdTercero, Monto, Porcentaje, Nota) VALUES (?, ?, ?, ?, ?)`
                : `INSERT INTO asientodetallecentrocosto (IdAsientoDetalle, IdCentroCosto, Monto, Porcentaje, Nota) VALUES (?, ?, ?, ?, ?)`;
            
            await connection.query(query, [id_detalle, item.id_destino, item.monto, item.porcentaje, item.nota || null]);
        }

        await registrarBitacora(idUsuario, 
            es_tercero ? 'Prorrateo Terceros Guardado' : 'Prorrateo Costos Guardado', 
            { id_detalle, total: totalEnviado }
        );

        await connection.commit();

        return {
            id_detalle,
            es_tercero,
            total_prorrateado: totalEnviado,
            lineas_procesadas: distribucion.length,
            fecha: new Date().toISOString(),
            detalle: distribucion 
        };

    } catch (error) {
        await connection.rollback();
        throw error; 
    } finally {
        connection.release();
    }
};