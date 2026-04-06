import { Request, Response } from 'express';
import { listarAsientos, obtenerDetalles } from '../services/asiento.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

export const obtenerDetallesController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const detalles = await obtenerDetalles(id);

    return res.json(detalles);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Error obteniendo detalles',
      error
    });
  }
};

export const listarAsientosController = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    // 🔥 FIX: evitar NaN (igual que en PHP con default)
    const idPeriodo = req.query.id_periodo
      ? Number(req.query.id_periodo)
      : 1;

    const estado = req.query.estado_id
      ? Number(req.query.estado_id)
      : undefined;

    const page = req.query.page
      ? Number(req.query.page)
      : 1;

    const result = await listarAsientos(idPeriodo, estado, page);

    await registrarBitacora(
      idUsuario,
      'Consulta de asientos para prorrateo',
      { idPeriodo, estado }
    );

    return res.json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Error listando asientos',
      error
    });
  }
};