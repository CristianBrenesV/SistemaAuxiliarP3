import { Request, Response } from 'express';
import {
  VerificarPorUsuario,
  registrarIntentoFallido,
  reiniciarIntentos
} from './auth.service';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { LoginDTO } from './dtos/login.dto';
import { registrarBitacora } from '../bitacora/bitacora.service';

export const login = async (
  req: Request<{}, {}, LoginDTO>,
  res: Response
) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
  }

  try {
    const user = await VerificarPorUsuario(usuario);

    if (!user) {
      await registrarIntentoFallido(usuario);

      await registrarBitacora(0, 'Login fallido - usuario no existe', {
        usuario
      });

      return res.status(401).json({ mensaje: 'Usuario no existe' });
    }

    if (user.Estado === 'Bloqueado') {
      await registrarBitacora(user.IdUsuario, 'Login bloqueado', {
        usuario: user.Usuario
      });

      return res.status(403).json({ mensaje: 'Usuario bloqueado' });
    }

    if (user.Estado === 'Inactivo') {
      await registrarBitacora(user.IdUsuario, 'Login inactivo', {
        usuario: user.Usuario
      });

      return res.status(403).json({ mensaje: 'Usuario inactivo' });
    }

    const nonce = Buffer.isBuffer(user.Nonce)
      ? user.Nonce
      : Buffer.from(user.Nonce, 'hex');

    const tag = Buffer.isBuffer(user.TagAutenticacion)
      ? user.TagAutenticacion
      : Buffer.from(user.TagAutenticacion, 'hex');

    const claveCifrada = Buffer.isBuffer(user.ClaveCifrada)
      ? user.ClaveCifrada
      : Buffer.from(user.ClaveCifrada, 'hex');

    const key = process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k';

    if (key.length !== 32) {
      throw new Error('AES_KEY inválida');
    }

    const SECRET_KEY = Buffer.from(key, 'utf8');

    const decipher = crypto.createDecipheriv('aes-256-gcm', SECRET_KEY, nonce);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(claveCifrada),
      decipher.final()
    ]);

    const passwordDescifrada = decrypted.toString('utf8').trim();

    if (passwordDescifrada !== password) {
      const intentos = await registrarIntentoFallido(usuario);

      await registrarBitacora(user.IdUsuario, 'Login fallido - contraseña incorrecta', {
        usuario: user.Usuario,
        intentos
      });

      return res.status(401).json({
        mensaje: `Contraseña incorrecta. Intentos: ${intentos}`
      });
    }

    await reiniciarIntentos(usuario);

    const token = jwt.sign(
      { id: user.IdUsuario, usuario: user.Usuario },
      process.env.JWT_SECRET || 'losadanp3',
      { expiresIn: '1h' }
    );

    await registrarBitacora(user.IdUsuario, 'Inico de sesión', {
      usuario: user.Usuario
    });

    return res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      user: {
        id: user.IdUsuario,
        usuario: user.Usuario,
        nombre: user.NombreUsuario,
        apellido: user.ApellidoUsuario
      }
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};