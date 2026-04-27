interface MovimientoCentroDB {
    Consecutivo: number;
    Fecha: string;
    CentroCosto: string;
    CodigoCuenta: string;
    Cuenta: string;
    TipoMovimiento: 'D' | 'C';
    Monto: number;
}
interface MovimientoTerceroDB {
    Consecutivo: number;
    Fecha: string;
    Tercero: string;
    CodigoCuenta: string;
    Cuenta: string;
    TipoMovimiento: 'D' | 'C';
    Monto: number;
}
export declare const obtenerReporteCentros: (centro_id?: number, fecha_inicio?: string, fecha_fin?: string, estado_id?: number) => Promise<{
    movimientos: MovimientoCentroDB[];
    totalDebe: number;
    totalHaber: number;
    diferencia: number;
}>;
export declare const obtenerReporteTerceros: (tercero_id?: number, fecha_inicio?: string, fecha_fin?: string, estado_id?: number) => Promise<{
    movimientos: MovimientoTerceroDB[];
    totalDebe: number;
    totalHaber: number;
    diferencia: number;
}>;
export {};
//# sourceMappingURL=reporte.service.d.ts.map