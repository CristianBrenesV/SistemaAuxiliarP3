import { Request, Response } from 'express';
import { listarAsientos, obtenerDetalles } from '../services/asiento.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

export const obtenerDetallesController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID de asiento no válido' });
        }

        const detalles = await obtenerDetalles(id);

        if (!detalles || detalles.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron detalles para este asiento' });
        }

        return res.json(detalles);

    } catch (error) {
        console.error('Error al obtener detalles:', error);
        return res.status(500).json({
            mensaje: 'Error interno al obtener los detalles del asiento'
        });
    }
};

export const listarAsientosController = async (req: Request, res: Response) => {
    try {
        const currentUser = (req as any).user;
        const idUsuario = currentUser?.id || 0;

        const idPeriodo = req.query.id_periodo ? Number(req.query.id_periodo) : 1;
        const estado    = req.query.estado_id  ? Number(req.query.estado_id)  : undefined;
        const page      = req.query.page       ? Number(req.query.page)       : 1;

        const result = await listarAsientos(idPeriodo, estado, page);

        await registrarBitacora(
            idUsuario,
            'Consulta de lista de asientos',
            { idPeriodo, estado, pagina: page }
        );

        return res.json(result);

    } catch (error) {
        console.error('Error al listar asientos:', error);
        return res.status(500).json({
            mensaje: 'Error interno al listar los asientos contables'
        });
    }
};