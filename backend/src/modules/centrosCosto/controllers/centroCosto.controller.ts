import { Request, Response } from 'express';
import {
  listarCentrosCosto,
  crearCentroCosto,
  actualizarCentroCosto,
  eliminarCentroCosto,
  obtenerCentroCosto
} from '../services/centroCosto.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

// 🔹 LISTAR
export const listarCentrosCostoController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const data = await listarCentrosCosto(page);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error listando centros de costo' });
  }
};

// 🔹 CREAR
export const crearCentroCostoController = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const id = await crearCentroCosto(req.body);

    await registrarBitacora(idUsuario, 'Creación centro costo', {
      id,
      ...req.body
    });

    return res.json({ mensaje: 'Centro creado' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};

// 🔹 ACTUALIZAR
export const actualizarCentroCostoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await actualizarCentroCosto(id, req.body);

    return res.json({ mensaje: 'Actualizado' });

  } catch (error) {
    return res.status(400).json({ mensaje: 'Error actualizando' });
  }
};

// 🔹 ELIMINAR
export const eliminarCentroCostoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await eliminarCentroCosto(id);

    return res.json({ mensaje: 'Eliminado' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};

// 🔹 OBTENER
export const obtenerCentroCostoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const data = await obtenerCentroCosto(id);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error obteniendo centro' });
  }
};