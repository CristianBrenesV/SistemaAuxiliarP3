import { Request, Response } from 'express';
import {
  listarContactosPorTercero,
  crearContacto,
  actualizarContacto,
  eliminarContacto,
  obtenerContacto
} from '../services/contacto.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

// 🔹 LISTAR
export const listarContactosController = async (req: Request, res: Response) => {
  try {
    const idTercero = Number(req.params.idTercero);
    const data = await listarContactosPorTercero(idTercero);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error listando contactos' });
  }
};

// 🔹 CREAR
export const crearContactoController = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;
    const idTercero = Number(req.params.idTercero);

    const id = await crearContacto(idTercero, req.body);

    await registrarBitacora(idUsuario, 'Creación contacto de tercero', {
      id,
      idTercero,
      ...req.body
    });

    return res.json({ mensaje: 'Contacto creado' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};

// 🔹 OBTENER
export const obtenerContactoController = async (req: Request, res: Response) => {
  try {
    const idContacto = Number(req.params.idContacto);
    const data = await obtenerContacto(idContacto);

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error obteniendo contacto' });
  }
};

// 🔹 ACTUALIZAR
export const actualizarContactoController = async (req: Request, res: Response) => {
  try {
    const idTercero = Number(req.params.idTercero);
    const idContacto = Number(req.params.idContacto);
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    await actualizarContacto(idTercero, idContacto, req.body);

    await registrarBitacora(idUsuario, 'Actualización contacto de tercero', {
      idContacto,
      ...req.body
    });

    return res.json({ mensaje: 'Contacto actualizado' });

  } catch (error) {
    return res.status(400).json({ mensaje: 'Error actualizando contacto' });
  }
};

// 🔹 ELIMINAR
export const eliminarContactoController = async (req: Request, res: Response) => {
  try {
    const idTercero = Number(req.params.idTercero);
    const idContacto = Number(req.params.idContacto);
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    await eliminarContacto(idTercero, idContacto);

    await registrarBitacora(idUsuario, 'Eliminación contacto de tercero', {
      idContacto
    });

    return res.json({ mensaje: 'Contacto eliminado' });

  } catch (error) {
    return res.status(400).json({ mensaje: (error as Error).message });
  }
};