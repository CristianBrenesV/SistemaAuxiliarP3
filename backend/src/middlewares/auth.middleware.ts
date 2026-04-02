import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  usuario: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Formato de token inválido' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado correctamente' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'losadanp3'
    ) as unknown as JwtPayload;

    if (!decoded.id || !decoded.usuario) {
      return res.status(401).json({ mensaje: 'Token inválido (payload)' });
    }

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
};