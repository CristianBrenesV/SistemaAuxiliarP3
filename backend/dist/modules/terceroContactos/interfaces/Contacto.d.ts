export interface Contacto {
    IdContacto: number;
    IdTercero: number;
    NombreContacto: string;
    Cargo: string | null;
    Email: string | null;
    Telefono: string | null;
    TipoContacto: 'Principal' | 'Facturación' | 'Cobros' | 'Soporte' | 'Otro';
    Estado: number;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=Contacto.d.ts.map