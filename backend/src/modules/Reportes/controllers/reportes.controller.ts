import { Request, Response } from 'express';
import * as reporteService from '../services/reporte.service';
import { registrarBitacora } from '../../bitacora/bitacora.service';

export const obtenerReporteCentros = async (req: Request, res: Response) => {
    try {
        const filtros = req.query;
        const data = await reporteService.obtenerDataReporteCentros(filtros);

        // 1. Extraer ID de usuario (si tienes middleware de auth, vendría en req.user)
        // Por ahora usamos 1 como ejemplo, o 0 si es anónimo
        const idUsuario = 1; 

        // 2. Llamada a TU función de bitácora
        // idUsuario, descripcion, acciones (JSON)
        await registrarBitacora(
            idUsuario,
            "Consulta de reporte por centros de costo",
            {
                modulo: "ReporteCC",
                filtros_aplicados: filtros,
                fecha_consulta: new Date().toISOString()
            }
        );

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al generar reporte" });
    }
};

export const obtenerReporteTerceros = async (req: Request, res: Response) => {
    try {
        const filtros = req.query;
        const data = await reporteService.obtenerDataReporteTerceros(filtros);

        const idUsuario = 1;

        await registrarBitacora(
            idUsuario,
            "Consulta de reporte por terceros",
            {
                modulo: "ReporteTerceros",
                filtros_aplicados: filtros
            }
        );

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al generar reporte" });
    }
};