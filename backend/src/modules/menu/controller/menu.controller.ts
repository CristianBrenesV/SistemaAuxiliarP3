// menu.controller.ts
import { Request, Response } from 'express';
import { obtenerMenuPorRol } from '../services/menu.service';

export const obtenerMenu = async (req: any, res: Response) => {
  try {
    const { rol } = req.user;

    const menu = await obtenerMenuPorRol(rol);

    res.json(menu);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error obteniendo menú' });
  }
};