import { Request, Response } from 'express';
import {
  listarDireccionesPorTercero,
  crearDireccion,
  actualizarDireccion,
  eliminarDireccion,
  obtenerDireccion
} from '../services/direccion.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

// 🔹 LISTAR
export const listarDireccionesController = async (req: Request, res: Response) => {
  try {
    const idTercero = Number(req.params.idTercero);
    const data = await listarDireccionesPorTercero(idTercero);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error listando direcciones' });
  }
};

// 🔹 CREAR
export const crearDireccionController = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;
    const idTercero = Number(req.params.idTercero);

    const id = await crearDireccion(idTercero, req.body);

    await registrarBitacora(idUsuario, 'Creación dirección de tercero', {
      id,
      idTercero,
      ...req.body
    });

    return res.json({ mensaje: 'Dirección creada' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};

// 🔹 OBTENER
export const obtenerDireccionController = async (req: Request, res: Response) => {
  try {
    const idDireccion = Number(req.params.idDireccion);
    const data = await obtenerDireccion(idDireccion);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error obteniendo dirección' });
  }
};

// 🔹 ACTUALIZAR
export const actualizarDireccionController = async (req: Request, res: Response) => {
  try {
    const idTercero = Number(req.params.idTercero);
    const idDireccion = Number(req.params.idDireccion);
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    await actualizarDireccion(idTercero, idDireccion, req.body);

    await registrarBitacora(idUsuario, 'Actualización dirección de tercero', {
      idDireccion,
      ...req.body
    });

    return res.json({ mensaje: 'Dirección actualizada' });

  } catch (error) {
    return res.status(400).json({ mensaje: 'Error actualizando dirección' });
  }
};

// 🔹 ELIMINAR
export const eliminarDireccionController = async (req: Request, res: Response) => {
  try {
    const idTercero = Number(req.params.idTercero);
    const idDireccion = Number(req.params.idDireccion);
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    await eliminarDireccion(idTercero, idDireccion);

    await registrarBitacora(idUsuario, 'Eliminación dirección de tercero', {
      idDireccion
    });

    return res.json({ mensaje: 'Dirección eliminada' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};