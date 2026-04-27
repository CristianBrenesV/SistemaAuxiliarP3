import { Request, Response } from 'express';
import {
  listarPantallas,
  obtenerPantallaPorId,
  contarPantallas,
  insertarPantalla,
  actualizarPantalla,
  eliminarPantalla
} from '../services/pantalla.service';

export const getPantallas = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const pantallas = await listarPantallas(limit, offset);
    const total = await contarPantallas();

    return res.json({
      data: pantallas,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error listando pantallas', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getPantallaById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const pantalla = await obtenerPantallaPorId(id);

    if (!pantalla) {
      return res.status(404).json({ mensaje: 'Pantalla no encontrada' });
    }

    return res.json(pantalla);
  } catch (error) {
    console.error('Error obteniendo pantalla', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const createPantalla = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, ruta, estado } = req.body;

    if (!nombre || !ruta) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    await insertarPantalla({
      nombre,
      descripcion,
      ruta,
      estado: estado || 'Activa'
    });

    return res.status(201).json({ mensaje: 'Pantalla creada' });
  } catch (error) {
    console.error('Error creando pantalla', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const updatePantalla = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const datos = req.body;

    const pantallaActual = await obtenerPantallaPorId(id);

    if (!pantallaActual) {
      return res.status(404).json({ mensaje: 'Pantalla no encontrada' });
    }

    const datosCompletos = {
      nombre: datos.nombre ?? pantallaActual.Nombre,
      descripcion: datos.descripcion ?? pantallaActual.Descripcion,
      ruta: datos.ruta ?? pantallaActual.Ruta,
      estado: datos.estado ?? pantallaActual.Estado
    };

    const resultado = await actualizarPantalla(id, datosCompletos);

    if (resultado === 1) {
      return res.json({ mensaje: 'Pantalla actualizada' });
    }

    return res.status(400).json({ mensaje: 'Error al actualizar' });
  } catch (error) {
    console.error('Error actualizando pantalla', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const deletePantalla = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const resultado = await eliminarPantalla(id);

    if (resultado === 1) {
      return res.json({ mensaje: 'Pantalla eliminada' });
    }

    return res.status(400).json({ mensaje: 'Error al eliminar' });
  } catch (error) {
    console.error('Error eliminando pantalla', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};