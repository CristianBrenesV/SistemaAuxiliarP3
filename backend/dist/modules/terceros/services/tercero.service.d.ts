export declare const listarTerceros: (page?: number, limit?: number) => Promise<{
    data: any;
    total: any;
    page: number;
    totalPages: number;
}>;
export declare const crearTercero: (data: any) => Promise<any>;
export declare const obtenerTercero: (id: number) => Promise<any>;
export declare const actualizarTercero: (id: number, data: any) => Promise<void>;
export declare const eliminarTercero: (id: number) => Promise<void>;
//# sourceMappingURL=tercero.service.d.ts.map