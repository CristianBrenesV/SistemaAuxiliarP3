import { Request, Response } from 'express';
import {
  listarTerceros,
  crearTercero,
  actualizarTercero,
  eliminarTercero,
  obtenerTercero
} from '../services/tercero.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

// 🔹 LISTAR
export const listarTercerosController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const data = await listarTerceros(page);

    return res.json(data);

  } catch {
    return res.status(500).json({ mensaje: 'Error listando terceros' });
  }
};

// 🔹 CREAR
export const crearTerceroController = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const id = await crearTercero(req.body);

    await registrarBitacora(idUsuario, 'Creación tercero', {
      id,
      ...req.body
    });

    return res.json({ mensaje: 'Tercero creado' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};

// 🔹 ACTUALIZAR
export const actualizarTerceroController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await actualizarTercero(id, req.body);

    return res.json({ mensaje: 'Actualizado' });

  } catch {
    return res.status(400).json({ mensaje: 'Error actualizando' });
  }
};

// 🔹 ELIMINAR
export const eliminarTerceroController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await eliminarTercero(id);

    return res.json({ mensaje: 'Eliminado' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};

// 🔹 OBTENER
export const obtenerTerceroController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const data = await obtenerTercero(id);

    return res.json(data);

  } catch {
    return res.status(500).json({ mensaje: 'Error obteniendo tercero' });
  }
};