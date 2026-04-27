import { Request, Response } from 'express';
import { 
    guardarProrrateo, 
    obtenerDistribucionCC, 
    obtenerDistribucionTerceros, 
    obtenerLineaDetalle 
} from '../services/prorrateo.service';
import { GuardarProrrateoDTO } from '../dtos/GuardarProrrateo.dto';

export const obtenerDistribucionCCController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ mensaje: 'ID de detalle inválido' });

        const data = await obtenerDistribucionCC(id);
        return res.json(data);
    } catch (error) {
        console.error('Error CC:', error);
        return res.status(500).json({ mensaje: 'Error obteniendo distribución de centros de costo' });
    }
};

export const obtenerDistribucionTercerosController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ mensaje: 'ID de detalle inválido' });

        const data = await obtenerDistribucionTerceros(id);
        return res.json(data);
    } catch (error) {
        console.error('Error Terceros:', error);
        return res.status(500).json({ mensaje: 'Error obteniendo distribución de terceros' });
    }
};

export const obtenerDetallesController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ mensaje: 'ID de detalle inválido' });

        const detalle = await obtenerLineaDetalle(id);
        
        if (!detalle) {
            return res.status(404).json({ mensaje: 'La línea de asiento no existe' });
        }

        return res.json(detalle);
    } catch (error) {
        console.error('Error Detalle Linea:', error);
        return res.status(500).json({ mensaje: 'Error al obtener los datos de la línea' });
    }
};

export const guardarProrrateoController = async (req: Request, res: Response) => {
    try {
        const currentUser = (req as any).user;
        const idUsuario = currentUser?.id || 0;
        const data = req.body;

        // "resultado" ahora contiene el objeto con datos, no solo un booleano
        const resultado = await guardarProrrateo(data, idUsuario);

        // Cumplimos con el Profe: Status 200 y Body con información útil
        return res.status(200).json(resultado); 

    } catch (error) {
        return res.status(400).json({ mensaje: (error as Error).message });
    }
};