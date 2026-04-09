import { Request, Response } from 'express';
import {
  obtenerReporteCentros,
  obtenerReporteTerceros
} from '../services/reporte.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

export const getReporteCentros = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const {
      centro_id,
      fecha_inicio,
      fecha_fin,
      estado_id,
      page = 1
    } = req.query;

    const pageNumber = Number(page) || 1;
    const limit = 10;
    const offset = (pageNumber - 1) * limit;

    const data = await obtenerReporteCentros(
      centro_id ? Number(centro_id) : undefined,
      fecha_inicio ? String(fecha_inicio) : undefined,
      fecha_fin ? String(fecha_fin) : undefined,
      estado_id ? Number(estado_id) : undefined
    );

    const total = data.movimientos.length;

    const movimientosPaginados = data.movimientos.slice(offset, offset + limit);

    await registrarBitacora(idUsuario, 'Consulta reporte centros de costo', {
      modulo: 'Reportes',
      tipo: 'CentrosCosto',
      filtros: { centro_id, fecha_inicio, fecha_fin, estado_id }
    });

    return res.status(200).json({
      data: movimientosPaginados,
      total,
      totalDebe: data.totalDebe,
      totalHaber: data.totalHaber,
      diferencia: data.diferencia,
      page: pageNumber,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error('Error obteniendo reporte centros', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getReporteTerceros = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const {
      tercero_id,
      fecha_inicio,
      fecha_fin,
      estado_id,
      page = 1
    } = req.query;

    const pageNumber = Number(page) || 1;
    const limit = 10;
    const offset = (pageNumber - 1) * limit;

    const data = await obtenerReporteTerceros(
      tercero_id ? Number(tercero_id) : undefined,
      fecha_inicio ? String(fecha_inicio) : undefined,
      fecha_fin ? String(fecha_fin) : undefined,
      estado_id ? Number(estado_id) : undefined
    );

    const total = data.movimientos.length;

    const movimientosPaginados = data.movimientos.slice(offset, offset + limit);

    await registrarBitacora(idUsuario, 'Consulta reporte terceros', {
      modulo: 'Reportes',
      tipo: 'Terceros',
      filtros: { tercero_id, fecha_inicio, fecha_fin, estado_id }
    });

    return res.status(200).json({
      data: movimientosPaginados,
      total,
      totalDebe: data.totalDebe,
      totalHaber: data.totalHaber,
      diferencia: data.diferencia,
      page: pageNumber,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error('Error obteniendo reporte terceros', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};