import { Request, Response } from 'express';
import {
  listarRolesPantallas,
  contarRolesPantallas,
  listarPorRol,
  listarPantallasPorRol,
  listarConEstado,
  insertarRolPantalla,
  eliminarRolPantalla,
  actualizarRolPantallas
} from '../services/rolpantalla.service';

export const getRolesPantallas = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const data = await listarRolesPantallas(limit, offset);
    const total = await contarRolesPantallas();

    return res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error listando relaciones', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getPantallasPorRol = async (
  req: Request<{ idRol: string }>,
  res: Response
) => {
  try {
    const idRol = req.params.idRol;

    const data = await listarPantallasPorRol(idRol);

    return res.json(data);
  } catch (error) {
    console.error('Error obteniendo pantallas por rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getPantallasConEstado = async (
  req: Request<{ idRol: string }>,
  res: Response
) => {
  try {
    const idRol = req.params.idRol;

    const data = await listarConEstado(idRol);

    return res.json(data);
  } catch (error) {
    console.error('Error listando con estado', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const createRolPantalla = async (req: Request, res: Response) => {
  try {
    const { idRol, idPantalla } = req.body;

    if (!idRol || !idPantalla) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    await insertarRolPantalla(idRol, idPantalla);

    return res.status(201).json({ mensaje: 'Asignación creada' });
  } catch (error) {
    console.error('Error insertando relación', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const updateRolPantallas = async (
  req: Request<{ idRol: string }>,
  res: Response
) => {
  try {
    const idRol = req.params.idRol;
    const { pantallas } = req.body;

    if (!Array.isArray(pantallas)) {
      return res.status(400).json({ mensaje: 'Formato inválido' });
    }

    const resultado = await actualizarRolPantallas(idRol, pantallas);

    if (resultado === 1) {
      return res.json({ mensaje: 'Pantallas actualizadas' });
    }

    return res.status(400).json({ mensaje: 'Error al actualizar' });
  } catch (error) {
    console.error('Error actualizando relación', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const deleteRolPantalla = async (
  req: Request<{ idRol: string; idPantalla: string }>,
  res: Response
) => {
  try {
    const idRol = req.params.idRol;
    const idPantalla = Number(req.params.idPantalla);

    const resultado = await eliminarRolPantalla(idRol, idPantalla);

    if (resultado === 1) {
      return res.json({ mensaje: 'Asignación eliminada' });
    }

    return res.status(400).json({ mensaje: 'Error al eliminar' });
  } catch (error) {
    console.error('Error eliminando relación', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};