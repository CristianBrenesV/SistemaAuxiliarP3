import { Request, Response } from 'express';
import { guardarProrrateo } from '../services/prorrateo.service';
import { GuardarProrrateoDTO } from '../dtos/GuardarProrrateo.dto';
import { obtenerDetallesAsiento } from '../services/prorrateo.service';
import { obtenerDistribucionCC, obtenerDistribucionTerceros} from '../services/prorrateo.service';

export const obtenerDistribucionCCController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const data = await obtenerDistribucionCC(id);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error obteniendo distribución CC' });
  }
};

export const obtenerDistribucionTercerosController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const data = await obtenerDistribucionTerceros(id);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error obteniendo distribución terceros' });
  }
};

export const obtenerDetallesController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const detalles = await obtenerDetallesAsiento(id);

    return res.json(detalles);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error obteniendo detalles' });
  }
};

export const guardarProrrateoController = async (
  req: Request<{}, {}, GuardarProrrateoDTO>,
  res: Response
) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const data = req.body;

    await guardarProrrateo(data, idUsuario);

    return res.json({
      mensaje: 'Prorrateo guardado correctamente'
    });

  } catch (error) {
    console.error('Error en prorrateo', error);

    return res.status(400).json({
      mensaje: (error as Error).message || 'Error en prorrateo'
    });
  }
};