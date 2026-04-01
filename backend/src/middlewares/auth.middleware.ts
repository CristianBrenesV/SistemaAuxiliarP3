import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }


  if (typeof token === 'string' && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'losadanp3');
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};