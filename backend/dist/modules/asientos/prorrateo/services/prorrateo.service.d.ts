import { GuardarProrrateoDTO } from '../dtos/GuardarProrrateo.dto';
export declare const obtenerLineaDetalle: (idDetalle: number) => Promise<any>;
export declare const obtenerDistribucionCC: (idDetalle: number) => Promise<any>;
export declare const obtenerDistribucionTerceros: (idDetalle: number) => Promise<any>;
export declare const guardarProrrateo: (data: GuardarProrrateoDTO, idUsuario: number) => Promise<{
    id_detalle: number;
    es_tercero: boolean;
    total_prorrateado: number;
    lineas_procesadas: number;
    fecha: string;
    detalle: {
        id_destino: number;
        monto: number;
        porcentaje: number;
        nota?: string;
    }[];
}>;
//# sourceMappingURL=prorrateo.service.d.ts.map