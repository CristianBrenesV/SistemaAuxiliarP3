import { Request, Response } from 'express';
import { 
  VerificarPorUsuario, 
  registrarIntentoFallido, 
  reiniciarIntentos 
} from './auth.service';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { usuario, password } = req.body;

  try {
    const user = await VerificarPorUsuario(usuario);

    if (!user) {
      
      await registrarIntentoFallido(usuario);
      return res.status(401).json({ mensaje: 'Usuario no existe' });
    }

    const nonce = Buffer.isBuffer(user.Nonce) ? user.Nonce : Buffer.from(user.Nonce, 'hex');
    const tag = Buffer.isBuffer(user.TagAutenticacion) ? user.TagAutenticacion : Buffer.from(user.TagAutenticacion, 'hex');
    const claveCifrada = Buffer.isBuffer(user.ClaveCifrada) ? user.ClaveCifrada : Buffer.from(user.ClaveCifrada, 'hex');

    const SECRET_KEY = Buffer.from(process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k', 'utf8');

    const decipher = crypto.createDecipheriv('aes-256-gcm', SECRET_KEY, nonce);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(claveCifrada), decipher.final()]);
    const passwordDescifrada = decrypted.toString('utf8').trim();

    if (passwordDescifrada !== password) {
      const intentos = await registrarIntentoFallido(usuario);
      return res.status(401).json({ mensaje: `Contraseña incorrecta. Intentos: ${intentos}` });
    }

    await reiniciarIntentos(usuario);

    const token = jwt.sign(
      { id: user.IdUsuario, usuario: user.Usuario },
      process.env.JWT_SECRET || 'losadanp3',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      mensaje: 'Login exitoso',
      token
    });

  } catch (err: any) {
    return res.status(500).json({ mensaje: 'Error al descifrar contraseña', detalle: err.message || err });
  }
};