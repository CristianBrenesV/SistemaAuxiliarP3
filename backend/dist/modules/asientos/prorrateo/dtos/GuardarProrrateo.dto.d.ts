export interface GuardarProrrateoDTO {
    id_detalle: number;
    es_tercero: boolean;
    distribucion: {
        id_destino: number;
        monto: number;
        porcentaje: number;
        nota?: string;
    }[];
}
//# sourceMappingURL=GuardarProrrateo.dto.d.ts.map