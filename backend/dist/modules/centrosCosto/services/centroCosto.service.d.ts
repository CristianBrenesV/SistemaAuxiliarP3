export declare const listarCentrosCosto: (page?: number, limit?: number) => Promise<{
    data: any;
    total: any;
    page: number;
    totalPages: number;
}>;
export declare const crearCentroCosto: (data: any) => Promise<any>;
export declare const obtenerCentroCosto: (id: number) => Promise<any>;
export declare const actualizarCentroCosto: (id: number, data: any) => Promise<void>;
export declare const eliminarCentroCosto: (id: number) => Promise<void>;
//# sourceMappingURL=centroCosto.service.d.ts.map