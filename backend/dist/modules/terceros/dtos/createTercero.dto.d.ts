export interface CreateTerceroDTO {
    identificacion: string;
    nombre: string;
    tipo: 'Cliente' | 'Proveedor' | 'Empleado' | 'Otro';
    email?: string;
    telefono?: string;
    estado: number;
}
export interface UpdateTerceroDTO extends Partial<CreateTerceroDTO> {
}
//# sourceMappingURL=createTercero.dto.d.ts.map