import { Request, Response } from 'express';
import crypto from 'crypto';
import {
  listarUsuarios,
  obtenerUsuarioPorId,
  contarUsuarios,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarEstado,
  cambiarClave
} from '../services/user.service';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { registrarBitacora } from '../../bitacora/bitacora.service';

const AES_KEY = Buffer.from(
  process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k'
);

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const usuarios = await listarUsuarios(limit, offset);
    const total = await contarUsuarios();

    return res.json({
      data: usuarios,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error listando usuarios', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const getUsuarioById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const usuario = await obtenerUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.json({
      idUsuario: usuario.idUsuario,
      usuario: usuario.usuario,
      nombreUsuario: usuario.nombreUsuario,
      apellidoUsuario: usuario.apellidoUsuario,
      correoElectronico: usuario.correoElectronico,
      estado: usuario.estado,
      roles: usuario.roles
    });
  } catch (error) {
    console.error('Error obteniendo usuario', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const createUsuario = async (
  req: Request<{}, {}, CreateUserDTO>,
  res: Response
) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const { usuario, password, nombreUsuario, apellidoUsuario, correoElectronico, estado } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const nonce = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', AES_KEY, nonce);

    const encrypted = Buffer.concat([
      cipher.update(password, 'utf8'),
      cipher.final()
    ]);

    const tag = cipher.getAuthTag();

    await insertarUsuario({
      usuario,
      claveCifrada: encrypted,
      nombreUsuario,
      apellidoUsuario,
      correoElectronico,
      tag,
      nonce,
      estado: estado || 'Activo'
    });

    await registrarBitacora(idUsuario, 'Creación de usuario', {
      usuario,
      correo: correoElectronico
    });

    return res.status(201).json({ mensaje: 'Usuario creado' });
  } catch (error) {
    console.error('Error creando usuario', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const updateUsuario = async (
  req: Request<{ id: string }, {}, UpdateUserDTO>,
  res: Response
) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const id = Number(req.params.id);
    const datos = req.body;

    const usuarioActual = await obtenerUsuarioPorId(id);

    const datosCompletos = {
      usuario: datos.usuario ?? usuarioActual.usuario,
      nombreUsuario: datos.nombreUsuario ?? usuarioActual.nombreUsuario,
      apellidoUsuario: datos.apellidoUsuario ?? usuarioActual.apellidoUsuario,
      correoElectronico: datos.correoElectronico ?? usuarioActual.correoElectronico,
      estado: datos.estado ?? usuarioActual.estado
    };

    const resultado = await actualizarUsuario(id, datosCompletos);

    if (resultado === 1) {
      await registrarBitacora(idUsuario, 'Actualización de usuario', {
        idUsuario: id,
        estado: datosCompletos.estado
      });

      return res.json({ mensaje: 'Usuario actualizado' });
    }

    return res.status(400).json({ mensaje: 'Error al actualizar' });

  } catch (error) {
    console.error('Error actualizando usuario', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const id = Number(req.params.id);
    const resultado = await eliminarUsuario(id);

    if (resultado === 1) {
      await registrarBitacora(idUsuario, 'Eliminación de usuario', {
        idUsuario: id
      });

      return res.json({ mensaje: 'Usuario eliminado' });
    }

    return res.status(400).json({ mensaje: 'Error al eliminar' });
  } catch (error) {
    console.error('Error eliminando usuario', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const cambiarEstadoUsuario = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const { id, estado } = req.body;

    await cambiarEstado(id, estado);

    await registrarBitacora(idUsuario, 'Cambio de estado de usuario', {
      idUsuario: id,
      nuevoEstado: estado
    });

    return res.json({ mensaje: 'Estado actualizado' });
  } catch (error) {
    console.error('Error cambiando estado', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const cambiarClaveUsuario = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const idUsuario = currentUser?.id || 0;

    const { id, password } = req.body;

    const nonce = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', AES_KEY, nonce);

    const encrypted = Buffer.concat([
      cipher.update(password, 'utf8'),
      cipher.final()
    ]);

    const tag = cipher.getAuthTag();

    await cambiarClave(id, encrypted, tag, nonce);

    await registrarBitacora(idUsuario, 'Cambio de clave', {
      idUsuario: id
    });

    return res.json({ mensaje: 'Clave actualizada' });
  } catch (error) {
    console.error('Error cambiando clave', error);
    return res.status(500).json({ mensaje: 'Error interno' });
  }
};