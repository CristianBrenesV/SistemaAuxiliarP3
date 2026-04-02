import { Request, Response } from 'express';
import crypto from 'crypto';
import {
  listarUsuarios,
  contarUsuarios,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarEstado,
  cambiarClave
} from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { registrarBitacora } from '../bitacora/bitacora.service';

const AES_KEY = Buffer.from(process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k');

export const getUsuarios = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const usuarios = await listarUsuarios(limit, offset);
  const total = await contarUsuarios();

  res.json({
    data: usuarios,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
};

export const createUsuario = async (
  req: Request<{}, {}, CreateUserDTO>,
  res: Response
) => {
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

  res.status(201).json({ mensaje: 'Usuario creado' });
};

export const updateUsuario = async (
  req: Request<{ id: string }, {}, UpdateUserDTO>,
  res: Response
) => {
  const currentUser = (req as any).user;
  const idUsuario = currentUser?.id || 0;

  const id = Number(req.params.id);
  const resultado = await actualizarUsuario(id, req.body);

  if (resultado === 1) {
    await registrarBitacora(idUsuario, 'Actualización de usuario', {
      idUsuario: id,
      estado: req.body.estado
    });

    return res.json({ mensaje: 'Usuario actualizado' });
  }

  return res.status(400).json({ mensaje: 'Error al actualizar' });
};

export const deleteUsuario = async (req: Request, res: Response) => {
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
};

export const cambiarEstadoUsuario = async (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  const idUsuario = currentUser?.id || 0;

  const { id, estado } = req.body;

  await cambiarEstado(id, estado);

  await registrarBitacora(idUsuario, 'Cambio de estado de usuario', {
    idUsuario: id,
    nuevoEstado: estado
  });

  res.json({ mensaje: 'Estado actualizado' });
};

export const cambiarClaveUsuario = async (req: Request, res: Response) => {
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

  res.json({ mensaje: 'Clave actualizada' });
};