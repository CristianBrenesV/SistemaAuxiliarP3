import { Request, Response } from 'express';
import { pool } from '../../config/db';

export const testDB = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT 1');

    res.json({
      mensaje: 'Conexión exitosa',
      rows
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error conectando a la base de datos',
      detalle: error
    });
  }
};