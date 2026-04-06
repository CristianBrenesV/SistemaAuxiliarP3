import { Request, Response } from 'express';
import { listarPeriodos } from '../services/periodo.service';

export const listarPeriodosController = async (req: Request, res: Response) => {
  try {
    const data = await listarPeriodos();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error obteniendo periodos' });
  }
};