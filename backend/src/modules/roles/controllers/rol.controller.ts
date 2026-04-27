import { Request, Response } from 'express';
import {
  listarRoles,
  obtenerRolPorId,
  contarRoles,
  insertarRol,
  actualizarRol,
  eliminarRol
} from '../services/rol.service';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const roles = await listarRoles(limit, offset);
    const total = await contarRoles();

    return res.json({
      data: roles,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error listando roles', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getRolById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const rol = await obtenerRolPorId(id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    return res.json(rol);
  } catch (error) {
    console.error('Error obteniendo rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const { idRol, nombreRol, descripcion, estado } = req.body;

    if (!idRol || !nombreRol) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    await insertarRol({
      idRol,
      nombreRol,
      descripcion,
      estado: estado || 'Activo'
    });

    return res.status(201).json({ mensaje: 'Rol creado' });
  } catch (error) {
    console.error('Error creando rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const updateRol = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const rolActual = await obtenerRolPorId(id);

    if (!rolActual) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    const datosCompletos = {
      nombreRol: datos.nombreRol ?? rolActual.NombreRol,
      descripcion: datos.descripcion ?? rolActual.Descripcion,
      estado: datos.estado ?? rolActual.Estado
    };

    const resultado = await actualizarRol(id, datosCompletos);

    if (resultado === 1) {
      return res.json({ mensaje: 'Rol actualizado' });
    }

    return res.status(400).json({ mensaje: 'Error al actualizar' });
  } catch (error) {
    console.error('Error actualizando rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const deleteRol = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const resultado = await eliminarRol(id);

    if (resultado === 1) {
      return res.json({ mensaje: 'Rol eliminado' });
    }

    return res.status(400).json({ mensaje: 'Error al eliminar' });
  } catch (error) {
    console.error('Error eliminando rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};