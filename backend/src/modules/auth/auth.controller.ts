import { Request, Response } from 'express';
import { VerificarPorUsuario } from './auth.service';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { usuario, password } = req.body;

  const user = await VerificarPorUsuario(usuario);

  if (!user) {
    return res.status(401).json({ mensaje: 'Usuario no existe' });
  }


  const SECRET_KEY = Buffer.from(process.env.AES_KEY || 'dsCNm5YzHL9xV8wPR1aXbKfT2oG3jQ7k'); 

  try {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      SECRET_KEY,
      user.Nonce
    );
    decipher.setAuthTag(user.TagAutenticacion);

    const decrypted = Buffer.concat([
      decipher.update(user.ClaveCifrada),
      decipher.final()
    ]);

    const passwordDescifrada = decrypted.toString();

    if (passwordDescifrada !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.IdUsuario, usuario: user.Usuario },
      process.env.JWT_SECRET || 'losadanp3',
      { expiresIn: '1h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token
    });

  } catch (err) {
    return res.status(500).json({ mensaje: 'Error al descifrar contraseña', detalle: err });
  }
};