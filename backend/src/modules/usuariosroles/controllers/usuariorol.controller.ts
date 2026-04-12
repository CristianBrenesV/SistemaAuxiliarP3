import { Request, Response } from 'express';
import {
  listarUsuariosRoles,
  contarUsuariosRoles,
  listarPorUsuario,
  listarPorRol,
  listarRolesPorUsuario,
  listarRolesActivosPorUsuario,
  listarUsuariosPorRol,
  insertarUsuarioRol,
  eliminarUsuarioRol
} from '../services/usuariorol.service';

export const getUsuariosRoles = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const data = await listarUsuariosRoles(limit, offset);
    const total = await contarUsuariosRoles();

    return res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error listando usuarios-roles', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getRolesPorUsuario = async (
  req: Request<{ idUsuario: string }>,
  res: Response
) => {
  try {
    const idUsuario = Number(req.params.idUsuario);

    const data = await listarRolesPorUsuario(idUsuario);

    return res.json(data);
  } catch (error) {
    console.error('Error obteniendo roles del usuario', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getRolesActivosPorUsuario = async (
  req: Request<{ idUsuario: string }>,
  res: Response
) => {
  try {
    const idUsuario = Number(req.params.idUsuario);

    const data = await listarRolesActivosPorUsuario(idUsuario);

    return res.json(data);
  } catch (error) {
    console.error('Error obteniendo roles activos', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getUsuariosPorRol = async (
  req: Request<{ idRol: string }>,
  res: Response
) => {
  try {
    const idRol = req.params.idRol;

    const data = await listarUsuariosPorRol(idRol);

    return res.json(data);
  } catch (error) {
    console.error('Error obteniendo usuarios por rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const createUsuarioRol = async (req: Request, res: Response) => {
  try {
    const { idUsuario, idRol } = req.body;

    if (!idUsuario || !idRol) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    await insertarUsuarioRol(idUsuario, idRol);

    return res.status(201).json({ mensaje: 'Asignación creada' });
  } catch (error) {
    console.error('Error insertando usuario-rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const deleteUsuarioRol = async (
  req: Request<{ idUsuario: string; idRol: string }>,
  res: Response
) => {
  try {
    const idUsuario = Number(req.params.idUsuario);
    const idRol = req.params.idRol;

    const resultado = await eliminarUsuarioRol(idUsuario, idRol);

    if (resultado === 1) {
      return res.json({ mensaje: 'Asignación eliminada' });
    }

    return res.status(400).json({ mensaje: 'Error al eliminar' });
  } catch (error) {
    console.error('Error eliminando usuario-rol', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};